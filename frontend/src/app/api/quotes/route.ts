import { NextRequest, NextResponse } from "next/server";
import { backendApiUrl } from "@/lib/serverAuth";
import { sendQuoteEmailNotification } from "@/lib/emailService";
import { resolveClientIp } from "@/lib/clientIp";

// Rate limiting tại tầng Edge/Frontend: Tối đa 5 yêu cầu / 15 phút cho mỗi IP
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;
const ipRequestTimestamps = new Map<string, number[]>();

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
      const quoteId = data?.data?.id;
      let emailSuccess = false;
      let emailErrorMsg: string | null = null;

      try {
        const emailResult = await sendQuoteEmailNotification({
          customerName: body.customerName,
          phone: body.phone,
          email: body.email,
          company: body.company,
          location: body.location,
          productType: body.productType,
          quantity: body.quantity,
          notes: body.notes,
        });

        if (emailResult.success) {
          emailSuccess = true;
        } else {
          emailErrorMsg = emailResult.error || "Gửi email thất bại";
          console.warn("[Email Notification Error]", emailErrorMsg);
        }
      } catch (emailErr) {
        emailErrorMsg = emailErr instanceof Error ? emailErr.message : "Ngoại lệ khi gửi email";
        console.error("[Email Notification Exception]", emailErr);
      }

      // Cập nhật trạng thái gửi email vào cơ sở dữ liệu để quản trị viên theo dõi & retry
      if (quoteId) {
        const status = emailSuccess ? "SENT" : "FAILED";
        const emailStatusUrl = backendApiUrl(
          `/quotes/${encodeURIComponent(quoteId)}/email-status?emailStatus=${status}${
            emailErrorMsg ? `&emailError=${encodeURIComponent(emailErrorMsg)}` : ""
          }`
        );

        try {
          await fetch(emailStatusUrl, {
            method: "PATCH",
            headers: {
              "X-Real-IP": clientIp,
              "X-Forwarded-For": clientIp,
              "X-Internal-Secret": process.env.INTERNAL_SECRET || "coctre-internal-shared-secret-key-2026",
            },
            signal: AbortSignal.timeout(3500),
            cache: "no-store",
          });
        } catch (updateErr) {
          console.error("[Update Email Status Error]", updateErr);
        }

        if (data.data) {
          data.data.emailStatus = status;
          data.data.emailError = emailErrorMsg;
        }
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
