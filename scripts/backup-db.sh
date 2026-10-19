#!/bin/sh
set -e

# ====================================================================
# Script sao lưu tự động PostgreSQL cho Cọc Tre Huyền Dương
# Chạy thủ công: ./scripts/backup-db.sh
# Hoặc thiết lập Cron: 0 2 * * * /path/to/scripts/backup-db.sh
# ====================================================================

BACKUP_DIR="${BACKUP_DIR:-./backups/postgres}"
CONTAINER_NAME="${CONTAINER_NAME:-coctre_postgres}"
DB_NAME="${DB_NAME:-coctre}"
DB_USER="${DB_USER:-postgres}"
RETENTION_DAYS="${RETENTION_DAYS:-7}"

mkdir -p "$BACKUP_DIR"

TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_FILE="$BACKUP_DIR/coctre_${TIMESTAMP}.sql.gz"

echo "=== [$(date)] Bắt đầu sao lưu cơ sở dữ liệu ${DB_NAME} ==="

if ! docker ps --format '{{.Names}}' | grep -q "^${CONTAINER_NAME}$"; then
  echo "LỖI: Container ${CONTAINER_NAME} không hoạt động!"
  exit 1
fi

docker exec "$CONTAINER_NAME" pg_dump -U "$DB_USER" -d "$DB_NAME" --clean --if-exists | gzip > "$BACKUP_FILE"

FILE_SIZE=$(ls -lh "$BACKUP_FILE" | awk '{print $5}')
echo "✓ Sao lưu thành công: $BACKUP_FILE (Kích thước: $FILE_SIZE)"

# Tự động dọn dẹp các bản sao lưu cũ hơn RETENTION_DAYS
echo "Dọn dẹp các bản sao lưu cũ hơn ${RETENTION_DAYS} ngày..."
find "$BACKUP_DIR" -type f -name "coctre_*.sql.gz" -mtime +"$RETENTION_DAYS" -exec rm -f {} \;
echo "✓ Hoàn tất chu trình sao lưu."
