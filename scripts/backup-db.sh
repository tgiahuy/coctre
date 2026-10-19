#!/bin/bash
set -eo pipefail

# ====================================================================
# Script sao lưu toàn diện PostgreSQL & Ảnh CMS cho Cọc Tre Huyền Dương
#
# Cách chạy thủ công:
#   ./scripts/backup-db.sh
#
# Thiết lập Cron tự động (chạy 02:00 sáng mỗi ngày):
#   crontab -e
#   0 2 * * * cd /path/to/coctre && ./scripts/backup-db.sh >> ./backups/backup.log 2>&1
# ====================================================================

BACKUP_ROOT="${BACKUP_ROOT:-./backups}"
DB_BACKUP_DIR="$BACKUP_ROOT/database"
UPLOADS_BACKUP_DIR="$BACKUP_ROOT/uploads"
PG_CONTAINER="${PG_CONTAINER:-coctre_postgres}"
FRONTEND_CONTAINER="${FRONTEND_CONTAINER:-coctre_frontend}"
DB_NAME="${DB_NAME:-coctre}"
DB_USER="${DB_USER:-postgres}"
RETENTION_DAYS="${RETENTION_DAYS:-7}"

mkdir -p "$DB_BACKUP_DIR"
mkdir -p "$UPLOADS_BACKUP_DIR"

TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
DB_BACKUP_FILE="$DB_BACKUP_DIR/coctre_db_${TIMESTAMP}.sql.gz"
UPLOADS_BACKUP_FILE="$UPLOADS_BACKUP_DIR/coctre_uploads_${TIMESTAMP}.tar.gz"

echo "===================================================================="
echo "=== [$(date '+%Y-%m-%d %H:%M:%S')] BẮT ĐẦU CHU TRÌNH SAO LƯU DỰ ÁN ==="
echo "===================================================================="

# 1. SAO LƯU POSTGRESQL VỚI KIỂM SOÁT LỖI NGHIÊM NGẶT
echo "[1/3] Đang sao lưu cơ sở dữ liệu PostgreSQL..."
if ! docker ps --format '{{.Names}}' | grep -q "^${PG_CONTAINER}$"; then
  echo "❌ LỖI: Container PostgreSQL '${PG_CONTAINER}' không đang hoạt động!" >&2
  exit 1
fi

# Chạy pg_dump với pipefail và kiểm tra mã lỗi của pg_dump
docker exec "$PG_CONTAINER" pg_dump -U "$DB_USER" -d "$DB_NAME" --clean --if-exists --no-owner --no-privileges | gzip > "$DB_BACKUP_FILE"
PIPE_STATUS=("${PIPESTATUS[@]}")
DUMP_STATUS="${PIPE_STATUS[0]}"
GZIP_STATUS="${PIPE_STATUS[1]}"

if [ "$DUMP_STATUS" -ne 0 ] || [ "$GZIP_STATUS" -ne 0 ]; then
  echo "❌ LỖI: pg_dump hoặc gzip thất bại (DUMP_STATUS=$DUMP_STATUS, GZIP_STATUS=$GZIP_STATUS)!" >&2
  rm -f "$DB_BACKUP_FILE"
  exit 1
fi

# Kiểm tra dung lượng file sao lưu (phải lớn hơn 500 bytes)
FILE_SIZE_BYTES=$(wc -c < "$DB_BACKUP_FILE" | tr -d ' ')
if [ "$FILE_SIZE_BYTES" -lt 500 ]; then
  echo "❌ LỖI: Tệp sao lưu cơ sở dữ liệu quá nhỏ ($FILE_SIZE_BYTES bytes), có thể dữ liệu bị lỗi!" >&2
  rm -f "$DB_BACKUP_FILE"
  exit 1
fi

# Kiểm tra tính toàn vẹn của tệp nén gzip
gzip -t "$DB_BACKUP_FILE"
DB_FILE_SIZE=$(ls -lh "$DB_BACKUP_FILE" | awk '{print $5}')
echo "✓ Sao lưu DB thành công: $DB_BACKUP_FILE ($DB_FILE_SIZE, toàn vẹn gzip)"

# 2. SAO LƯU VOLUME ẢNH UPLOADS CMS
echo "[2/3] Đang sao lưu thư mục ảnh tải lên CMS (/app/public/uploads)..."
if docker ps --format '{{.Names}}' | grep -q "^${FRONTEND_CONTAINER}$"; then
  docker exec "$FRONTEND_CONTAINER" tar -czf - -C /app/public/uploads . > "$UPLOADS_BACKUP_FILE"
else
  # Tự động phát hiện tên volume chuẩn coctre_uploads_data
  UPLOADS_VOL=$(docker volume ls -q | grep -E '(^coctre_uploads_data$|_uploads_data$|^uploads_data$)' | head -n 1 || echo "coctre_uploads_data")
  echo "Container frontend không chạy, sao lưu trực tiếp từ Docker volume '$UPLOADS_VOL'..."
  docker run --rm -v "$UPLOADS_VOL":/data alpine tar -czf - -C /data . > "$UPLOADS_BACKUP_FILE"
fi

if [ -f "$UPLOADS_BACKUP_FILE" ]; then
  tar -tzf "$UPLOADS_BACKUP_FILE" > /dev/null 2>&1
  UPLOADS_FILE_SIZE=$(ls -lh "$UPLOADS_BACKUP_FILE" | awk '{print $5}')
  echo "✓ Sao lưu ảnh CMS thành công: $UPLOADS_BACKUP_FILE ($UPLOADS_FILE_SIZE)"
else
  echo "⚠ Cảnh báo: Không thể tạo tệp sao lưu thư mục ảnh uploads."
fi

# 3. DỌN DẸP BẢN SAO LƯU CŨ (XOAY VÒNG SAU RETENTION_DAYS)
echo "[3/3] Dọn dẹp các bản sao lưu cũ hơn ${RETENTION_DAYS} ngày..."
find "$DB_BACKUP_DIR" -type f -name "coctre_db_*.sql.gz" -mtime +"$RETENTION_DAYS" -exec rm -vf {} \;
find "$UPLOADS_BACKUP_DIR" -type f -name "coctre_uploads_*.tar.gz" -mtime +"$RETENTION_DAYS" -exec rm -vf {} \;

# 4. TÙY CHỌN: ĐỒNG BỘ OFFSITE (R2 / S3 / RCLONE / REMOTE STORAGE)
if [ -n "$RCLONE_REMOTE" ]; then
  echo "Đang đồng bộ bản sao lưu ra Cloud Offsite qua rclone ($RCLONE_REMOTE)..."
  rclone copy "$DB_BACKUP_FILE" "$RCLONE_REMOTE/database/" || echo "⚠ Cảnh báo: Lỗi sao lưu offsite database"
  rclone copy "$UPLOADS_BACKUP_FILE" "$RCLONE_REMOTE/uploads/" || echo "⚠ Cảnh báo: Lỗi sao lưu offsite uploads"
  echo "✓ Đồng bộ offsite hoàn tất."
elif [ -n "$OFFSITE_BACKUP_CMD" ]; then
  echo "Thực thi lệnh sao lưu offsite tùy biến..."
  eval "$OFFSITE_BACKUP_CMD" || echo "⚠ Cảnh báo: Lỗi thực thi lệnh offsite tùy biến."
fi


echo "===================================================================="
echo "✓ HOÀN TẤT SAO LƯU: Cả Database và Media Assets đều đã được lưu an toàn."
echo "===================================================================="
