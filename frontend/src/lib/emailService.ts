/**
 * Dịch vụ gửi email thông báo khi có yêu cầu báo giá mới qua Resend API.
 * Mặc định nhận thông báo tại: huyenduong70@gmail.com
 */

export interface QuoteEmailPayload {
  customerName?: string;
  phone: string;
  email?: string;
  company?: string;
  location?: string;
  productType?: string;
  quantity?: string;
  notes?: string;
}

export interface SendEmailResult {
  success: boolean;
  id?: string;
  error?: string;
}

function escapeHtml(text?: string): string {
  if (!text) return "";
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function formatCurrentDateTime(): string {
  try {
    return new Intl.DateTimeFormat("vi-VN", {
      timeZone: "Asia/Ho_Chi_Minh",
      dateStyle: "full",
      timeStyle: "medium",
    }).format(new Date());
  } catch {
    return new Date().toLocaleString("vi-VN");
  }
}

/**
 * Tạo nội dung HTML cho email thông báo báo giá
 */
function buildQuoteEmailHtml(quote: QuoteEmailPayload, submittedAt: string): string {
  const customerName = escapeHtml(quote.customerName?.trim() || "Khách hàng");
  const phone = escapeHtml(quote.phone?.trim() || "Chưa cung cấp");
  const email = quote.email?.trim() ? escapeHtml(quote.email.trim()) : null;
  const company = quote.company?.trim() ? escapeHtml(quote.company.trim()) : null;
  const location = escapeHtml(quote.location?.trim() || "Chưa cung cấp");
  const productType = escapeHtml(quote.productType?.trim() || "Cọc tre theo yêu cầu");
  const quantity = escapeHtml(quote.quantity?.trim() || "Chưa xác định");
  const notes = quote.notes?.trim() ? escapeHtml(quote.notes.trim()) : null;

  return `
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Yêu Cầu Báo Giá Mới</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f5f6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1f2937;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f4f5f6; padding: 24px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.06); border: 1px solid #e5e7eb;">
          
          <!-- HEADER -->
          <tr>
            <td style="background: linear-gradient(135deg, #214E34 0%, #153422 100%); padding: 28px 24px; text-align: center; color: #ffffff;">
              <span style="display: inline-block; background-color: rgba(205, 170, 99, 0.25); color: #F5E6BE; border: 1px solid #CDAA63; border-radius: 9999px; padding: 4px 14px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 10px;">
                🔔 Thông báo đơn mới
              </span>
              <h1 style="margin: 8px 0 4px; font-size: 22px; font-weight: 800; color: #ffffff; letter-spacing: -0.3px;">
                YÊU CẦU BÁO GIÁ CỌC TRE
              </h1>
              <p style="margin: 0; font-size: 13px; color: #d1fae5; font-weight: 500;">
                Cọc Tre Huyền Dương • Làng nghề Dân Hòa, Hà Nội
              </p>
            </td>
          </tr>

          <!-- BODY -->
          <tr>
            <td style="padding: 24px;">
              <p style="margin-top: 0; margin-bottom: 16px; font-size: 14px; line-height: 1.5; color: #4b5563;">
                Hệ thống website vừa nhận được một yêu cầu báo giá mới từ khách hàng. Dưới đây là thông tin chi tiết:
              </p>

              <!-- INFO CARD -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #FAF9F6; border: 1px solid #e5e7eb; border-radius: 12px; margin-bottom: 20px; border-collapse: separate;">
                <tr>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #e5e7eb; font-size: 13px; font-weight: 600; color: #6b7280; width: 35%;">
                    Khách hàng:
                  </td>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #e5e7eb; font-size: 14px; font-weight: 700; color: #111827;">
                    ${customerName}
                  </td>
                </tr>

                <tr>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #e5e7eb; font-size: 13px; font-weight: 600; color: #6b7280;">
                    Số điện thoại:
                  </td>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #e5e7eb; font-size: 16px; font-weight: 800; color: #214E34;">
                    <a href="tel:${phone}" style="color: #214E34; text-decoration: none;">
                      📞 ${phone}
                    </a>
                  </td>
                </tr>

                ${email ? `
                <tr>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #e5e7eb; font-size: 13px; font-weight: 600; color: #6b7280;">
                    Email khách:
                  </td>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #e5e7eb; font-size: 13px; color: #111827;">
                    <a href="mailto:${email}" style="color: #2563eb; text-decoration: underline;">${email}</a>
                  </td>
                </tr>
                ` : ""}

                ${company ? `
                <tr>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #e5e7eb; font-size: 13px; font-weight: 600; color: #6b7280;">
                    Đơn vị / Công ty:
                  </td>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #e5e7eb; font-size: 13px; color: #111827;">
                    ${company}
                  </td>
                </tr>
                ` : ""}

                <tr>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #e5e7eb; font-size: 13px; font-weight: 600; color: #6b7280;">
                    Quy cách cọc:
                  </td>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #e5e7eb; font-size: 14px; font-weight: 700; color: #111827;">
                    🎋 ${productType}
                  </td>
                </tr>

                <tr>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #e5e7eb; font-size: 13px; font-weight: 600; color: #6b7280;">
                    Số lượng:
                  </td>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #e5e7eb; font-size: 14px; font-weight: 700; color: #b45309;">
                    ${quantity}
                  </td>
                </tr>

                <tr>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #e5e7eb; font-size: 13px; font-weight: 600; color: #6b7280;">
                    Địa chỉ công trình:
                  </td>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #e5e7eb; font-size: 13px; color: #111827;">
                    📍 ${location}
                  </td>
                </tr>

                ${notes ? `
                <tr>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #e5e7eb; font-size: 13px; font-weight: 600; color: #6b7280; vertical-align: top;">
                    Ghi chú khách gửi:
                  </td>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #e5e7eb; font-size: 13px; color: #374151; font-style: italic;">
                    &ldquo;${notes}&rdquo;
                  </td>
                </tr>
                ` : ""}

                <tr>
                  <td style="padding: 12px 16px; font-size: 13px; font-weight: 600; color: #6b7280;">
                    Thời gian gửi:
                  </td>
                  <td style="padding: 12px 16px; font-size: 12px; color: #6b7280;">
                    ⏱️ ${submittedAt}
                  </td>
                </tr>
              </table>

              <!-- ACTION BUTTONS -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin: 20px 0;">
                <tr>
                  <td align="center">
                    <a href="tel:${phone}" style="display: inline-block; background-color: #214E34; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 10px; font-weight: 700; font-size: 14px; margin: 4px;">
                      📞 Bấm gọi khách ngay: ${phone}
                    </a>
                  </td>
                </tr>
              </table>

              <p style="font-size: 12px; color: #6b7280; text-align: center; margin: 16px 0 0;">
                Bạn có thể cập nhật trạng thái liên hệ hoặc xóa yêu cầu này trực tiếp tại trang Quản trị:
                <br>
                <a href="https://coctrehuyenduong.vn/admin" style="color: #214E34; font-weight: 600; text-decoration: underline;">
                  Truy cập Trang Quản Trị Website (/admin)
                </a>
              </p>
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="background-color: #f9fafb; padding: 16px 24px; text-align: center; border-top: 1px solid #e5e7eb; font-size: 11px; color: #9ca3af;">
              Email thông báo tự động từ Website <strong>Cọc Tre Huyền Dương</strong>.<br>
              Làng nghề Dân Hòa, Thanh Oai, Hà Nội • Hotline: 0973.914.809
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

/**
 * Gửi email thông báo yêu cầu báo giá đến hòm thư huyenduong70@gmail.com
 */
export async function sendQuoteEmailNotification(
  quote: QuoteEmailPayload
): Promise<SendEmailResult> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const recipient = (process.env.NOTIFICATION_EMAIL || "huyenduong70@gmail.com").trim();
  const sender = (process.env.RESEND_FROM_EMAIL || "Cọc Tre Huyền Dương <onboarding@resend.dev>").trim();

  if (!apiKey) {
    console.warn(
      "[Resend Email] RESEND_API_KEY chưa được cấu hình. Bỏ qua gửi email thông báo tới " + recipient
    );
    return {
      success: false,
      error: "RESEND_API_KEY_NOT_CONFIGURED",
    };
  }

  const submittedAt = formatCurrentDateTime();
  const customerName = quote.customerName?.trim() || "Khách hàng";
  const phone = quote.phone?.trim() || "Không có SĐT";
  const productType = quote.productType?.trim() || "Cọc tre";
  const subject = `[Báo giá mới] ${customerName} (${phone}) - ${productType}`;

  const htmlContent = buildQuoteEmailHtml(quote, submittedAt);

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: sender,
        to: [recipient],
        subject,
        html: htmlContent,
      }),
      signal: AbortSignal.timeout(10000),
    });

    const data = await res.json().catch(() => null);

    // Xử lý tự động khi Resend ở chế độ dùng thử (chưa xác minh domain riêng):
    // Resend chỉ cho phép gửi về email đăng ký tài khoản (ví dụ: tgiahuy.shu@gmail.com)
    if (!res.ok && res.status === 403 && typeof data?.message === "string") {
      const match = data.message.match(/to your own email address \(([^)]+)\)/i);
      const fallbackEmail = match?.[1]?.trim();
      if (fallbackEmail && fallbackEmail.toLowerCase() !== recipient.toLowerCase()) {
        console.warn(
          `[Resend Email] Tài khoản Resend chưa xác thực domain riêng để gửi tới ${recipient}. Tự động chuyển tiếp tới email chủ tài khoản Resend: ${fallbackEmail}`
        );
        const noticeBanner = `
          <div style="background-color: #FEF3C7; border: 1px solid #F59E0B; padding: 14px 18px; border-radius: 10px; margin-bottom: 20px; font-size: 13px; color: #92400E; font-family: sans-serif; line-height: 1.5;">
            ⚠️ <strong>Lưu ý Resend (Chế độ thử nghiệm):</strong><br>
            Email này được gửi đến <strong>${fallbackEmail}</strong> vì tài khoản Resend chưa xác minh tên miền riêng để gửi trực tiếp tới <strong>${recipient}</strong>.<br>
            👉 Khi sẵn sàng, bạn hãy vào <a href="https://resend.com/domains" target="_blank" style="color: #B45309; font-weight: bold; text-decoration: underline;">resend.com/domains</a> để xác thực domain, sau đó email sẽ gửi thẳng về <strong>${recipient}</strong>.
          </div>
        `;
        const retryRes = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: sender,
            to: [fallbackEmail],
            subject: `[Báo giá mới cho ${recipient}] ${customerName} (${phone}) - ${productType}`,
            html: htmlContent.replace("<!-- INFO CARD -->", `${noticeBanner}<!-- INFO CARD -->`),
          }),
          signal: AbortSignal.timeout(10000),
        });
        const retryData = await retryRes.json().catch(() => null);
        if (retryRes.ok) {
          console.log(`[Resend Email Fallback Success] Đã gửi thông báo tới ${fallbackEmail}, Email ID: ${retryData?.id}`);
          return { success: true, id: retryData?.id };
        }
      }
    }

    if (!res.ok) {
      const errorMsg = data?.message || data?.error || `HTTP ${res.status}`;
      console.error("[Resend Email Error]", errorMsg);
      return { success: false, error: String(errorMsg) };
    }

    console.log(`[Resend Email Success] Đã gửi thông báo báo giá tới ${recipient}, Email ID: ${data?.id}`);
    return { success: true, id: data?.id };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.error("[Resend Email Exception]", errorMsg);
    return { success: false, error: errorMsg };
  }
}
