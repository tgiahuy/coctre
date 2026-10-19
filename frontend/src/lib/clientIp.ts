import { NextRequest } from "next/server";
import { isIP } from "node:net";

export function isValidIp(ip: string | null | undefined): boolean {
  if (!ip) return false;
  const clean = ip.trim();
  return isIP(clean) !== 0;
}

/**
 * Trích xuất địa chỉ IP của Client một cách an toàn và chống giả mạo:
 * - Khi chạy sau Reverse Proxy được cấu hình (TRUST_PROXY=true hoặc PROXY_SECRET khớp):
 *   tin cậy header do Reverse Proxy (Nginx / Cloudflare) gắn kèm.
 * - Khi truy cập trực tiếp hoặc không có proxy tin cậy:
 *   Ưu tiên socket IP từ runtime (request.ip) và KHÔNG chấp nhận header do client tự ý chèn vào.
 */
export function resolveClientIp(request: NextRequest): string {
  // 1. Socket IP thực tế từ Next.js runtime (Vercel / Node server socket) - Client không thể giả mạo
  // @ts-expect-error ip property is populated in NextRequest runtime
  const nextSocketIp = typeof request.ip === "string" ? request.ip.trim() : "";
  if (nextSocketIp && isValidIp(nextSocketIp)) {
    return nextSocketIp;
  }

  // 2. Chỉ tin cậy các header của reverse proxy khi được cấu hình rõ ràng qua TRUST_PROXY
  const trustProxy = process.env.TRUST_PROXY === "true";
  const proxySecret = process.env.PROXY_SECRET;
  const requestSecret = request.headers.get("x-proxy-secret");
  const isSecretVerified = Boolean(proxySecret && requestSecret && proxySecret === requestSecret);


  // 3. Nếu là Reverse Proxy tin cậy (hoặc Cloudflare có secret)
  if (trustProxy || isSecretVerified) {
    // Ưu tiên CF-Connecting-IP nếu có cấu hình Cloudflare và header CF-Ray
    const cfIp = request.headers.get("cf-connecting-ip")?.trim();
    const cfRay = request.headers.get("cf-ray");
    if (cfIp && cfRay && isValidIp(cfIp)) {
      return cfIp;
    }

    // Header do Nginx proxy_set_header X-Real-IP $remote_addr gắn
    const realIp = request.headers.get("x-real-ip")?.trim();
    if (realIp && isValidIp(realIp)) {
      return realIp;
    }

    // X-Forwarded-For từ chuỗi proxy
    const forwardedFor = request.headers.get("x-forwarded-for");
    if (forwardedFor) {
      const list = forwardedFor.split(",").map((s) => s.trim()).filter(Boolean);
      for (let i = list.length - 1; i >= 0; i--) {
        if (isValidIp(list[i])) {
          return list[i];
        }
      }
    }
  }

  return "127.0.0.1";
}
