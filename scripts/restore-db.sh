#!/bin/bash
set -eo pipefail

# ====================================================================
# Script phục hồi Database & Ảnh CMS từ tệp sao lưu cho Cọc Tre Huyền Dương
#
# Cách dùng:
#   ./scripts/restore-db.sh <đường_dẫn_file_db.sql.gz> [đường_dẫn_file_uploads.tar.gz] [tên_db_đích]
#
# Ví dụ:
#   ./scripts/restore-db.sh ./backups/database/coctre_db_20261019_120000.sql.gz ./backups/uploads/coctre_uploads_20261019_120000.tar.gz
# ====================================================================

DB_BACKUP_FILE="$1"
UPLOADS_BACKUP_FILE="$2"
TARGET_DB="${3:-coctre}"
PG_CONTAINER="${PG_CONTAINER:-coctre_postgres}"
FRONTEND_CONTAINER="${FRONTEND_CONTAINER:-coctre_frontend}"
DB_USER="${DB_USER:-postgres}"

if [ -z "$DB_BACKUP_FILE" ] || [ ! -f "$DB_BACKUP_FILE" ]; then
  echo "❌ Lỗi: Vui lòng cung cấp đường dẫn tệp sao lưu cơ sở dữ liệu (.sql.gz) hợp lệ."
  echo "Cách dùng: $0 <duong_dan_db.sql.gz> [duong_dan_uploads.tar.gz] [ten_db_dich]"
  exit 1
fi

echo "===================================================================="
echo "⚠ CẢNH BÁO QUAN TRỌNG: Thao tác này sẽ GHI ĐÈ toàn bộ dữ liệu hiện tại"
echo "trên cơ sở dữ liệu '$TARGET_DB' trong container '$PG_CONTAINER'!"
echo "===================================================================="
read -p "Bạn có chắc chắn muốn tiếp tục phục hồi? (nhập 'yes' để xác nhận): " CONFIRM

if [ "$CONFIRM" != "yes" ]; then
  echo "Đã hủy thao tác phục hồi."
  exit 0
fi

# 1. PHỤC HỒI CƠ SỞ DỮ LIỆU
echo "=== [1/2] Đang khôi phục cơ sở dữ liệu từ $DB_BACKUP_FILE ==="
gunzip -c "$DB_BACKUP_FILE" | docker exec -i "$PG_CONTAINER" psql -v ON_ERROR_STOP=1 -U "$DB_USER" -d "$TARGET_DB"

echo "✓ Khôi phục cơ sở dữ liệu '$TARGET_DB' thành công!"


# 2. PHỤC HỒI ẢNH TẢI LÊN CMS (NẾU CÓ)
if [ -n "$UPLOADS_BACKUP_FILE" ] && [ -f "$UPLOADS_BACKUP_FILE" ]; then
  echo "=== [2/2] Đang khôi phục tệp ảnh tải lên từ $UPLOADS_BACKUP_FILE ==="
  if docker ps --format '{{.Names}}' | grep -q "^${FRONTEND_CONTAINER}$"; then
    cat "$UPLOADS_BACKUP_FILE" | docker exec -i "$FRONTEND_CONTAINER" tar -xzf - -C /app/public/uploads
  else
    docker run --rm -i -v uploads_data:/data alpine tar -xzf - -C /data < "$UPLOADS_BACKUP_FILE"
  fi
  echo "✓ Khôi phục thư mục ảnh tải lên thành công!"
fi

echo "===================================================================="
echo "✓ HOÀN TẤT PHỤC HỒI DỮ LIỆU DỰ ÁN CỌC TRE HUYỀN DƯƠNG."
echo "===================================================================="
