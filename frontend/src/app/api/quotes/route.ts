import { NextRequest, NextResponse } from "next/server";
import { backendApiUrl } from "@/lib/serverAuth";

function isValidIp(ip: string): boolean {
  if (!ip) return false;
  // IPv4 simple check
  if (/^(\d{1,3}\.){3}\d{1,3}$/.test(ip)) return true;
  // IPv6 simple check
  if (ip.includes(":") && ip.length >= 2) return true;
  return false;
}

function resolveClientIp(request: NextRequest): string {
  // 1. Cloudflare CDN connecting IP (overwritten by Cloudflare edge, cannot be spoofed by client)
  const cfIp = request.headers.get("cf-connecting-ip")?.trim();
  if (cfIp && isValidIp(cfIp)) return cfIp;

  // 2. Reverse proxy / Nginx real-ip
  const realIp = request.headers.get("x-real-ip")?.trim();
  if (realIp && isValidIp(realIp)) return realIp;

  // 3. Next.js / Vercel runtime client IP
  // @ts-expect-error ip property is populated in production NextRequest
  const nextIp = typeof request.ip === "string" ? request.ip.trim() : "";
  if (nextIp && isValidIp(nextIp)) return nextIp;

  // 4. Fallback to right-most or first valid IP from X-Forwarded-For
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    const list = forwardedFor.split(",").map((s) => s.trim()).filter(Boolean);
    // Prefer the first entry
    if (list.length > 0 && isValidIp(list[0])) {
      return list[0];
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
    return NextResponse.json(data, { status: backendRes.status });
  } catch {
    return NextResponse.json(
      { success: false, message: "Không thể gửi yêu cầu. Vui lòng thử lại hoặc gọi hotline." },
      { status: 503 }
    );
  }
}
