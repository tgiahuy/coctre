#!/bin/bash
set -eo pipefail

# ====================================================================
# Script Bootstrap SSL Let's Encrypt lần đầu cho Cọc Tre Huyền Dương
# Giải quyết triệt để lỗi "Nginx crash vì thiếu SSL certificate" khi deploy máy chủ mới
#
# Cách dùng:
#   chmod +x ./scripts/init-ssl.sh
#   ./scripts/init-ssl.sh [staging|production]
# ====================================================================

COMPOSE_CMD="docker compose -f docker-compose.yml -f docker-compose.prod.yml"
DOMAINS=("coctrehuyenduong.com" "www.coctrehuyenduong.com")
RSA_KEY_SIZE=4096
DATA_PATH="./certbot"
EMAIL="huyenduong70@gmail.com" # Thay bằng email quản trị nhận thông báo hết hạn
STAGING=0 # Đặt thành 1 nếu đang test để không bị chạm rate limit của Let's Encrypt

if [ "$1" == "staging" ]; then
  STAGING=1
fi

PRIMARY_DOMAIN="${DOMAINS[0]}"
CERT_PATH="$DATA_PATH/conf/live/$PRIMARY_DOMAIN"

echo "=== [1/5] Kiểm tra chứng chỉ SSL hiện có cho $PRIMARY_DOMAIN ==="
if [ -d "$CERT_PATH" ] && [ -f "$CERT_PATH/fullchain.pem" ]; then
  read -p "Chứng chỉ SSL đã tồn tại. Bạn có muốn cấp mới lại không? (y/N) " decision
  if [ "$decision" != "y" ] && [ "$decision" != "Y" ]; then
    echo "Giữ nguyên chứng chỉ hiện tại. Khởi động toàn bộ dịch vụ..."
    $COMPOSE_CMD up -d
    exit 0
  fi
fi

echo "=== [2/5] Tạo chứng chỉ Dummy (Self-Signed) tạm thời để Nginx có thể khởi động ==="
mkdir -p "$DATA_PATH/conf/live/$PRIMARY_DOMAIN"
mkdir -p "$DATA_PATH/www"

openssl req -x509 -nodes -newkey rsa:2048 -days 1 \
  -keyout "$CERT_PATH/privkey.pem" \
  -out "$CERT_PATH/fullchain.pem" \
  -subj "/CN=localhost" 2>/dev/null

echo "✓ Đã tạo chứng chỉ tạm thời."

echo "=== [3/5] Khởi động Nginx với chứng chỉ tạm thời để phục vụ HTTP-01 Challenge ==="
$COMPOSE_CMD up --force-recreate -d nginx

echo "=== [4/5] Xóa chứng chỉ tạm thời và yêu cầu chứng chỉ thật từ Let's Encrypt ==="
rm -rf "$CERT_PATH"

DOMAIN_ARGS=""
for domain in "${DOMAINS[@]}"; do
  DOMAIN_ARGS="$DOMAIN_ARGS -d $domain"
done

EMAIL_ARG="--email $EMAIL"
if [ -z "$EMAIL" ]; then
  EMAIL_ARG="--register-unsafely-without-email"
fi

STAGING_ARG=""
if [ $STAGING != "0" ]; then
  STAGING_ARG="--staging"
fi

$COMPOSE_CMD run --rm --entrypoint "\
  certbot certonly --webroot -w /var/www/certbot \
    $STAGING_ARG \
    $EMAIL_ARG \
    $DOMAIN_ARGS \
    --rsa-key-size $RSA_KEY_SIZE \
    --agree-tos \
    --force-renewal \
    --non-interactive" certbot

echo "=== [5/5] Nạp lại chứng chỉ SSL chính thức vào Nginx ==="
$COMPOSE_CMD exec nginx nginx -s reload

# Khởi động toàn bộ stack production (Postgres, Backend, Frontend, Nginx, Certbot)
echo "Khởi động toàn bộ hệ thống..."
$COMPOSE_CMD up -d

echo "===================================================================="
echo "✓ HOÀN TẤT: Toàn bộ hệ thống và HTTPS đã sẵn sàng hoạt động!"
echo "Website: https://$PRIMARY_DOMAIN"
echo "===================================================================="
