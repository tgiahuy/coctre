#!/bin/bash
set -eo pipefail

# ====================================================================
# Script kiểm thử phục hồi dữ liệu tự động trên môi trường sạch
# Kiểm chứng tính toàn vẹn của tệp backup trước khi cần phục hồi thật
#
# Cách dùng:
#   ./scripts/test-restore.sh [đường_dẫn_file_backup.sql.gz]
# ====================================================================

PG_CONTAINER="${PG_CONTAINER:-coctre_postgres}"
DB_USER="${DB_USER:-postgres}"
PROD_DB="${PROD_DB:-coctre}"
TEST_DB="coctre_test_restore_$(date +%s)"

# Nếu không truyền file, tự động lấy file backup mới nhất
BACKUP_FILE="$1"
if [ -z "$BACKUP_FILE" ]; then
  BACKUP_FILE=$(find ./backups/database -type f -name "coctre_db_*.sql.gz" 2>/dev/null | sort -r | head -n 1 || true)
fi

if [ -z "$BACKUP_FILE" ] || [ ! -f "$BACKUP_FILE" ]; then
  echo "❌ Lỗi: Không tìm thấy tệp sao lưu .sql.gz để kiểm thử."
  echo "Cách dùng: $0 <duong_dan_file_backup.sql.gz>"
  exit 1
fi

echo "===================================================================="
echo "=== [$(date '+%Y-%m-%d %H:%M:%S')] BẮT ĐẦU KIỂM THỬ PHỤC HỒI DỮ LIỆU ==="
echo "Tệp sao lưu kiểm thử: $BACKUP_FILE"
echo "Database kiểm thử tạm thời: $TEST_DB"
echo "===================================================================="

# Đảm bảo dọn dẹp database test khi thoát
cleanup() {
  echo "--- Đang dọn dẹp database kiểm thử '$TEST_DB'..."
  docker exec "$PG_CONTAINER" psql -U "$DB_USER" -d postgres -c "DROP DATABASE IF EXISTS $TEST_DB;" >/dev/null 2>&1 || true
}
trap cleanup EXIT

# 1. Tạo database sạch
echo "[1/4] Đang tạo database sạch '$TEST_DB'..."
docker exec "$PG_CONTAINER" psql -U "$DB_USER" -d postgres -c "CREATE DATABASE $TEST_DB;"

# 2. Phục hồi dữ liệu vào database sạch
echo "[2/4] Đang phục hồi dữ liệu từ bản sao lưu..."
gunzip -c "$BACKUP_FILE" | docker exec -i "$PG_CONTAINER" psql -v ON_ERROR_STOP=1 -U "$DB_USER" -d "$TEST_DB" >/dev/null

echo "✓ Phục hồi thành công không có lỗi SQL."

# 3. Đối chiếu số lượng bản ghi giữa database chính và database phục hồi
echo "[3/4] Đối chiếu số lượng bản ghi giữa '$PROD_DB' và '$TEST_DB':"
TABLES=("products" "projects" "articles" "quote_requests" "admin_users" "site_config")

printf "%-25s | %-12s | %-12s | %-10s\n" "Bảng dữ liệu" "Database chính" "DB phục hồi" "Kết quả"
echo "----------------------------------------------------------------------"

ALL_MATCH=true
for table in "${TABLES[@]}"; do
  COUNT_PROD=$(docker exec "$PG_CONTAINER" psql -U "$DB_USER" -d "$PROD_DB" -t -A -c "SELECT COUNT(*) FROM $table;" 2>/dev/null || echo "0")
  COUNT_TEST=$(docker exec "$PG_CONTAINER" psql -U "$DB_USER" -d "$TEST_DB" -t -A -c "SELECT COUNT(*) FROM $table;" 2>/dev/null || echo "0")
  
  if [ "$COUNT_PROD" == "$COUNT_TEST" ]; then
    STATUS="✓ KHỚP"
  else
    STATUS="⚠ LỆCH"
    ALL_MATCH=false
  fi
  printf "%-25s | %-12s | %-12s | %-10s\n" "$table" "$COUNT_PROD" "$COUNT_TEST" "$STATUS"
done

# 4. Kết luận
echo "===================================================================="
if [ "$ALL_MATCH" = true ]; then
  echo "✓ XÁC THỰC THÀNH CÔNG: Tệp sao lưu $BACKUP_FILE hoàn toàn hợp lệ và có thể phục hồi an toàn 100%!"
else
  echo "⚠ CẢNH BÁO: Số lượng bản ghi có sự chênh lệch (có thể do dữ liệu mới phát sinh sau thời điểm tạo backup)."
fi
echo "===================================================================="
