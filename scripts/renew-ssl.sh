#!/bin/bash
set -eo pipefail

# ====================================================================
# Script tự động gia hạn SSL Let's Encrypt & Reload Nginx
# Thêm vào crontab máy chủ:
#   0 3 1 * * cd /path/to/coctre && ./scripts/renew-ssl.sh >> ./backups/ssl-renew.log 2>&1
# ====================================================================

COMPOSE_CMD="docker compose -f docker-compose.yml -f docker-compose.prod.yml"

echo "=== [$(date '+%Y-%m-%d %H:%M:%S')] Bắt đầu kiểm tra gia hạn chứng chỉ SSL ==="

# Chạy certbot renew
$COMPOSE_CMD run --rm --entrypoint "certbot renew --webroot -w /var/www/certbot --quiet" certbot

# Reload Nginx để áp dụng chứng chỉ mới nếu vừa được gia hạn
if docker ps --format '{{.Names}}' | grep -q "^coctre_nginx$"; then
  $COMPOSE_CMD exec nginx nginx -s reload
  echo "✓ Đã reload cấu hình Nginx thành công."
fi

echo "✓ Hoàn tất kiểm tra SSL."
