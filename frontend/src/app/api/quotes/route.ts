import { NextRequest, NextResponse } from "next/server";
import { backendApiUrl } from "@/lib/serverAuth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const backendRes = await fetch(backendApiUrl("/quotes"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(7000),
      cache: "no-store",
    });
    const data = await backendRes.json().catch(() => ({ success: false, message: "Phản hồi không hợp lệ" }));
    return NextResponse.json(data, { status: backendRes.status });
  } catch {
    return NextResponse.json({ success: false, message: "Không thể gửi yêu cầu. Vui lòng thử lại hoặc gọi hotline." }, { status: 503 });
  }
}
