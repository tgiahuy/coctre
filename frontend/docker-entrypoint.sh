#!/bin/sh
set -e

# Đảm bảo thư mục lưu trữ uploads được cấp quyền ghi đầy đủ cho user nextjs (1001)
if [ -d "/app/public/uploads" ]; then
  chown -R nextjs:nodejs /app/public/uploads 2>/dev/null || true
  chmod -R 775 /app/public/uploads 2>/dev/null || true
fi

# Chuyển quyền thực thi sang user nextjs (không chạy dưới root)
if [ "$(id -u)" = "0" ]; then
  exec su-exec nextjs "$@"
else
  exec "$@"
fi
