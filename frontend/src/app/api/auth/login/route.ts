import { NextRequest, NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE, backendApiUrl } from "@/lib/serverAuth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, rememberMe } = body || {};

    const cleanEmail = (email || "").trim().toLowerCase();
    const cleanPassword = typeof password === "string" ? password : "";

    if (!cleanEmail || !cleanPassword) {
      return NextResponse.json(
        { success: false, message: "Vui lòng nhập đầy đủ Email và Mật khẩu" },
        { status: 400 }
      );
    }

    try {
      const backendRes = await fetch(backendApiUrl("/auth/login"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: cleanEmail, password: cleanPassword, rememberMe }),
        signal: AbortSignal.timeout(5000),
        cache: "no-store",
      });

      if (backendRes.ok) {
        const backendData = await backendRes.json();
        const token = backendData?.data?.token;
        if (!backendData?.success || !token) {
          return NextResponse.json({ success: false, message: "Phản hồi xác thực không hợp lệ" }, { status: 502 });
        }
        const response = NextResponse.json({
          ...backendData,
          data: { ...backendData.data, token: undefined },
        });
        response.cookies.set(ADMIN_SESSION_COOKIE, token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          path: "/",
          maxAge: rememberMe ? 60 * 60 * 24 * 30 : 60 * 60 * 24,
        });
        return response;
      }
      const errData = await backendRes.json().catch(() => null);
      return NextResponse.json(
        { success: false, message: errData?.message || "Email hoặc mật khẩu không chính xác" },
        { status: backendRes.status }
      );
    } catch {
      return NextResponse.json(
        { success: false, message: "Dịch vụ xác thực tạm thời không khả dụng" },
        { status: 503 }
      );
    }
  } catch {
    return NextResponse.json(
      { success: false, message: "Yêu cầu đăng nhập không hợp lệ" },
      { status: 400 }
    );
  }
}
