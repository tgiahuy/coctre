import { NextRequest, NextResponse } from "next/server";
import { fetchBackendAsAdmin, getAdminToken } from "@/lib/serverAuth";
import { sendQuoteEmailNotification } from "@/lib/emailService";
import { resolveClientIp } from "@/lib/clientIp";

// Rate limiting dành cho tác vụ gửi lại email Admin: Tối đa 10 lượt / 1 phút
const RESEND_RATE_LIMIT_WINDOW_MS = 60 * 1000;
const MAX_RESENDS_PER_WINDOW = 10;
const adminResendTimestamps: number[] = [];

function checkResendRateLimit(): boolean {
  const now = Date.now();
  const cutoff = now - RESEND_RATE_LIMIT_WINDOW_MS;
  while (adminResendTimestamps.length > 0 && adminResendTimestamps[0] < cutoff) {
    adminResendTimestamps.shift();
  }
  if (adminResendTimestamps.length >= MAX_RESENDS_PER_WINDOW) {
    return false;
  }
  adminResendTimestamps.push(now);
  return true;
}

export async function POST(request: NextRequest) {
  try {
    // 1. BẮT BUỘC xác thực quyền Quản trị viên
    const token = getAdminToken(request);
    if (!token) {
      return NextResponse.json(
        { success: false, message: "Bạn phải đăng nhập tài khoản quản trị để thực hiện chức năng này." },
        { status: 401 }
      );
    }

    // 2. Giới hạn tần suất gọi chức năng gửi lại email
    if (!checkResendRateLimit()) {
      return NextResponse.json(
        { success: false, message: "Thao tác gửi lại email quá nhanh. Vui lòng đợi 1 phút trước khi thử lại." },
        { status: 429, headers: { "Retry-After": "60" } }
      );
    }

    // 3. Chỉ nhận ID báo giá, TUYỆT ĐỐI KHÔNG tin tưởng dữ liệu người dùng tự gửi lên
    const body = await request.json().catch(() => ({}));
    const quoteId = typeof body?.id === "string" ? body.id.trim() : "";

    if (!quoteId) {
      return NextResponse.json({ success: false, message: "ID báo giá không hợp lệ" }, { status: 400 });
    }

    const clientIp = resolveClientIp(request);

    // 4. Lấy dữ liệu báo giá GỐC trực tiếp từ Cơ sở dữ liệu backend với quyền Admin
    const quoteRes = await fetchBackendAsAdmin(request, `/quotes/${encodeURIComponent(quoteId)}`, {
      method: "GET",
      headers: {
        "X-Real-IP": clientIp,
        "X-Forwarded-For": clientIp,
      },
    });

    if (quoteRes.status === 401) {
      return NextResponse.json({ success: false, message: "Phiên quản trị đã hết hạn. Vui lòng đăng nhập lại." }, { status: 401 });
    }

    if (!quoteRes.ok) {
      return NextResponse.json({ success: false, message: "Không tìm thấy yêu cầu báo giá trong hệ thống." }, { status: 404 });
    }

    const quoteData = await quoteRes.json().catch(() => null);
    const quote = quoteData?.data;

    if (!quote || !quote.phone) {
      return NextResponse.json({ success: false, message: "Dữ liệu báo giá không hợp lệ." }, { status: 400 });
    }

    // 5. Kiểm tra giới hạn số lần gửi lại (Tối đa 10 lần để bảo vệ tài khoản Resend)
    const currentRetryCount = typeof quote.emailRetryCount === "number" ? quote.emailRetryCount : 0;
    if (currentRetryCount >= 10) {
      return NextResponse.json(
        {
          success: false,
          message: "Báo giá này đã thử gửi lại quá 10 lần. Vui lòng kiểm tra lại cấu hình hòm thư hoặc gọi trực tiếp khách hàng.",
        },
        { status: 400 }
      );
    }

    // 6. Gửi email thông báo từ dữ liệu xác thực trong cơ sở dữ liệu
    const emailResult = await sendQuoteEmailNotification({
      customerName: quote.customerName,
      phone: quote.phone,
      email: quote.email,
      company: quote.company,
      location: quote.location,
      productType: quote.productType,
      quantity: quote.quantity,
      notes: quote.notes,
    });

    const isSuccess = Boolean(emailResult?.success);
    const errorMsg = isSuccess ? "" : (emailResult?.error || "Gửi email thất bại");
    const status = isSuccess ? "SENT" : "FAILED";

    // 7. Cập nhật trạng thái email vào Backend với quyền Admin và AWAIT kết quả
    const updatePath = `/quotes/${encodeURIComponent(quoteId)}/email-status?emailStatus=${status}${
      errorMsg ? `&emailError=${encodeURIComponent(errorMsg)}` : ""
    }`;

    const updateRes = await fetchBackendAsAdmin(request, updatePath, {
      method: "PATCH",
      headers: {
        "X-Real-IP": clientIp,
        "X-Forwarded-For": clientIp,
      },
    });

    const updatedData = await updateRes.json().catch(() => null);

    if (isSuccess) {
      return NextResponse.json({
        success: true,
        message: "Đã gửi lại email thông báo báo giá thành công!",
        data: updatedData?.data || { ...quote, emailStatus: "SENT", emailError: null },
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          message: `Gửi email thất bại: ${errorMsg}`,
          data: updatedData?.data || { ...quote, emailStatus: "FAILED", emailError: errorMsg },
        },
        { status: 500 }
      );
    }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Lỗi hệ thống khi gửi lại email";
    return NextResponse.json({ success: false, message: msg }, { status: 500 });
  }
}
