import { NextRequest, NextResponse } from "next/server";
import { isIP } from "node:net";
import { backendApiUrl } from "@/lib/serverAuth";
import { sendQuoteEmailNotification } from "@/lib/emailService";

function isValidIp(ip: string | null | undefined): boolean {
  if (!ip) return false;
  const clean = ip.trim();
  // isIP returns 4 for valid IPv4 (0-255 per octet), 6 for valid IPv6, 0 for invalid
  return isIP(clean) !== 0;
}

function resolveClientIp(request: NextRequest): string {
  // 1. Cloudflare CDN connecting IP (overwritten by Cloudflare edge, cannot be spoofed by client)
  const cfIp = request.headers.get("cf-connecting-ip")?.trim();
  if (cfIp && isValidIp(cfIp)) return cfIp;

  // 2. Reverse proxy / Nginx real-ip (set by Nginx proxy_set_header X-Real-IP $remote_addr)
  const realIp = request.headers.get("x-real-ip")?.trim();
  if (realIp && isValidIp(realIp)) return realIp;

  // 3. Next.js / Vercel runtime client socket IP
  // @ts-expect-error ip property is populated in production NextRequest
  const nextIp = typeof request.ip === "string" ? request.ip.trim() : "";
  if (nextIp && isValidIp(nextIp)) return nextIp;

  // 4. Fallback to right-most valid IP from X-Forwarded-For (the one appended by the nearest reverse proxy)
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    const list = forwardedFor.split(",").map((s) => s.trim()).filter(Boolean);
    // When proxies chain, nearest proxy appends to the end
    for (let i = list.length - 1; i >= 0; i--) {
      if (isValidIp(list[i])) {
        return list[i];
      }
    }
  }

  return "127.0.0.1";
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const clientIp = resolveClientIp(request);

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
