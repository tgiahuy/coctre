import { NextRequest, NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE, fetchBackendAsAdmin } from "@/lib/serverAuth";

export async function GET(request: NextRequest) {
  try {
    const backendRes = await fetchBackendAsAdmin(request, "/auth/me", {
      signal: AbortSignal.timeout(5000),
    });
    const body = await backendRes.json().catch(() => ({ success: false }));
    const response = NextResponse.json(body, { status: backendRes.status });
    if (backendRes.status === 401) response.cookies.delete(ADMIN_SESSION_COOKIE);
    return response;
  } catch {
    return NextResponse.json({ success: false, message: "Dịch vụ xác thực tạm thời không khả dụng" }, { status: 503 });
  }
}
