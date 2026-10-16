import { NextRequest, NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE, fetchBackendAsAdmin } from "@/lib/serverAuth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { currentPassword, newPassword } = body || {};

    if (typeof newPassword !== "string" || newPassword.length < 12) {
      return NextResponse.json(
        { success: false, message: "Mật khẩu mới phải có ít nhất 12 ký tự" },
        { status: 400 }
      );
    }

    try {
      const backendRes = await fetchBackendAsAdmin(request, "/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
        signal: AbortSignal.timeout(5000),
      });

      const backendData = await backendRes.json().catch(() => ({ success: false, message: "Phản hồi không hợp lệ" }));
      const response = NextResponse.json(backendData, { status: backendRes.status });
      if (backendRes.ok) {
        response.cookies.delete(ADMIN_SESSION_COOKIE);
      }
      return response;
    } catch {
      return NextResponse.json(
        { success: false, message: "Dịch vụ xác thực tạm thời không khả dụng" },
        { status: 503 }
      );
    }
  } catch {
    return NextResponse.json(
      { success: false, message: "Yêu cầu đổi mật khẩu không hợp lệ" },
      { status: 400 }
    );
  }
}
