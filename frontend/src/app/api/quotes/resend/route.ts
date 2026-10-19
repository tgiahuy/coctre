import { NextRequest, NextResponse } from "next/server";
import { backendApiUrl } from "@/lib/serverAuth";
import { sendQuoteEmailNotification } from "@/lib/emailService";
import { resolveClientIp } from "@/lib/clientIp";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, customerName, phone, email, company, location, productType, quantity, notes } = body;

    if (!id || !phone) {
      return NextResponse.json({ success: false, message: "Thiếu thông tin báo giá" }, { status: 400 });
    }

    const clientIp = resolveClientIp(request);

    // Gửi email thông báo
    const emailResult = await sendQuoteEmailNotification({
      customerName,
      phone,
      email,
      company,
      location,
      productType,
      quantity,
      notes,
    });

    const isSuccess = !!emailResult?.success;
    const errorMsg = isSuccess ? "" : (emailResult?.error || "Gửi email thất bại");
    const status = isSuccess ? "SENT" : "FAILED";

    // Cập nhật trạng thái email vào Backend
    const updateUrl = backendApiUrl(
      `/quotes/${encodeURIComponent(id)}/email-status?emailStatus=${status}${
        errorMsg ? `&emailError=${encodeURIComponent(errorMsg)}` : ""
      }`
    );

    const backendRes = await fetch(updateUrl, {
      method: "PATCH",
      headers: {
        "X-Real-IP": clientIp,
        "X-Forwarded-For": clientIp,
      },
      cache: "no-store",
    });

    const updatedData = await backendRes.json().catch(() => null);

    if (isSuccess) {
      return NextResponse.json({
        success: true,
        message: "Đã gửi lại email thành công!",
        data: updatedData?.data,
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          message: `Gửi email thất bại: ${errorMsg}`,
          data: updatedData?.data,
        },
        { status: 500 }
      );
    }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Lỗi hệ thống khi gửi lại email";
    return NextResponse.json({ success: false, message: msg }, { status: 500 });
  }
}
