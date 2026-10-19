import { NextRequest, NextResponse } from "next/server";
import { isIP } from "node:net";
import { backendApiUrl } from "@/lib/serverAuth";
import { sendQuoteEmailNotification } from "@/lib/emailService";

// Rate limiting tại tầng Edge/Frontend: Tối đa 5 yêu cầu / 15 phút cho mỗi IP
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;
const ipRequestTimestamps = new Map<string, number[]>();

function isValidIp(ip: string | null | undefined): boolean {
  if (!ip) return false;
  const clean = ip.trim();
  return isIP(clean) !== 0;
}

/**
 * Xác định địa chỉ IP của Client một cách an toàn, chống giả mạo header:
 * - Chỉ tin cậy CF-Connecting-IP khi có header CF-Ray do Cloudflare Edge gắn kèm.
 * - Loại trừ các header giả mạo từ client thông thường.
 */
function resolveClientIp(request: NextRequest): string {
  // 1. Nếu có Cloudflare Ray ID hợp lệ -> Tin cậy CF-Connecting-IP từ Cloudflare Edge
  const cfRay = request.headers.get("cf-ray");
  const cfIp = request.headers.get("cf-connecting-ip")?.trim();
  if (cfRay && cfIp && isValidIp(cfIp)) {
    return cfIp;
  }

  // 2. Next.js runtime socket remote address (Vercel/Node runtime - không thể bị client giả mạo)
  // @ts-expect-error ip property is populated in NextRequest runtime
  const nextIp = typeof request.ip === "string" ? request.ip.trim() : "";
  if (nextIp && isValidIp(nextIp)) {
    return nextIp;
  }

  // 3. Fallback theo chuỗi X-Forwarded-For nếu đi qua Reverse Proxy (Nginx/Docker)
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    const list = forwardedFor.split(",").map((s) => s.trim()).filter(Boolean);
    // Lấy IP gần nhất từ proxy tin cậy
    for (let i = list.length - 1; i >= 0; i--) {
      if (isValidIp(list[i])) {
        return list[i];
      }
    }
  }

  const realIp = request.headers.get("x-real-ip")?.trim();
  if (realIp && isValidIp(realIp)) {
    return realIp;
  }

  return "127.0.0.1";
}

function checkEdgeRateLimit(clientIp: string): boolean {
  const now = Date.now();
  const cutoff = now - RATE_LIMIT_WINDOW_MS;

  // Dọn dẹp định kỳ nếu map quá lớn
  if (ipRequestTimestamps.size > 5000) {
    for (const [key, timestamps] of ipRequestTimestamps.entries()) {
      const active = timestamps.filter((t) => t > cutoff);
      if (active.length === 0) {
        ipRequestTimestamps.delete(key);
      } else {
        ipRequestTimestamps.set(key, active);
      }
    }
  }

  const timestamps = ipRequestTimestamps.get(clientIp) || [];
  const validTimestamps = timestamps.filter((t) => t > cutoff);

  if (validTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }

  validTimestamps.push(now);
  ipRequestTimestamps.set(clientIp, validTimestamps);
  return true;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const clientIp = resolveClientIp(request);

    // 1. Honeypot Anti-Spam: Nếu bot điền vào trường ẩn này -> Từ chối ngay lập tức
    if (body._gotcha || body.website_url || body.fax) {
      console.warn(`[Anti-Spam] Phát hiện bot gửi form báo giá qua honeypot từ IP: ${clientIp}`);
      return NextResponse.json(
        { success: true, message: "Đã nhận yêu cầu báo giá thành công!" },
        { status: 200 }
      );
    }

    // 2. Kiểm tra định dạng số điện thoại Việt Nam hợp lệ
    const cleanPhone = typeof body.phone === "string" ? body.phone.trim() : "";
    const phoneRegex = /^(03|05|07|08|09)[0-9]{8}$/;
    if (!phoneRegex.test(cleanPhone)) {
      return NextResponse.json(
        { success: false, message: "Số điện thoại không hợp lệ (cần 10 chữ số, bắt đầu bằng 03, 05, 07, 08 hoặc 09)" },
        { status: 400 }
      );
    }

    // 3. Giới hạn tần suất gửi tại Edge (5 lượt / 15 phút)
    if (!checkEdgeRateLimit(clientIp)) {
      return NextResponse.json(
        { success: false, message: "Bạn đã gửi quá nhiều yêu cầu trong thời gian ngắn. Vui lòng thử lại sau 15 phút hoặc gọi trực tiếp Hotline." },
        {
          status: 429,
          headers: { "Retry-After": "900" }
        }
      );
    }

    // 4. Chuyển tiếp tới backend kèm IP đã xác thực
    const backendRes = await fetch(backendApiUrl("/quotes"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Real-IP": clientIp,
        "X-Forwarded-For": clientIp,
      },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(7000),
      cache: "no-store",
    });

    const data = await backendRes.json().catch(() => ({ success: false, message: "Phản hồi không hợp lệ" }));

    // Tự động gửi email thông báo khi báo giá được lưu thành công
    if (backendRes.ok && data?.success) {
      try {
        await sendQuoteEmailNotification({
          customerName: body.customerName,
          phone: body.phone,
          email: body.email,
          company: body.company,
          location: body.location,
          productType: body.productType,
          quantity: body.quantity,
          notes: body.notes,
        });
      } catch (emailErr) {
        console.error("[Email Notification Error]", emailErr);
      }
    }

    return NextResponse.json(data, { status: backendRes.status });
  } catch {
    return NextResponse.json(
      { success: false, message: "Không thể gửi yêu cầu. Vui lòng thử lại hoặc gọi hotline." },
      { status: 503 }
    );
  }
}
