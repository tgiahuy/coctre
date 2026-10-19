import { siteConfig } from "@/data/config";

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
}

export interface QuoteFormData {
  customerName?: string;
  phone: string;
  email?: string;
  company?: string;
  deliveryAddress?: string;
  bambooSpecs?: string;
  quantity?: string;
  notes?: string;
}

export type QuoteHandoff = {
  channel: "google-form" | "email";
  url: string;
};

const defaultGoogleFormUrl =
  "https://docs.google.com/forms/d/e/1FAIpQLSefT_o4W2ABiz4xMdc7WJjNNtU8k0iLwR2GvDEHKCF8mua7EQ/viewform";

const googleFormUrl = process.env.NEXT_PUBLIC_GOOGLE_FORM_URL?.trim() || defaultGoogleFormUrl;
const googleFormFields = {
  customerName: process.env.NEXT_PUBLIC_GOOGLE_FORM_FIELD_NAME?.trim() || "entry.1532961624",
  phone: process.env.NEXT_PUBLIC_GOOGLE_FORM_FIELD_PHONE?.trim() || "entry.1998010128",
  email: process.env.NEXT_PUBLIC_GOOGLE_FORM_FIELD_EMAIL?.trim() || "entry.2085342272",
  company: process.env.NEXT_PUBLIC_GOOGLE_FORM_FIELD_COMPANY?.trim() || "entry.233242103",
  deliveryAddress: process.env.NEXT_PUBLIC_GOOGLE_FORM_FIELD_ADDRESS?.trim() || "entry.785649356",
  bambooSpecs: process.env.NEXT_PUBLIC_GOOGLE_FORM_FIELD_PRODUCT?.trim() || "entry.1077567526",
  quantity: process.env.NEXT_PUBLIC_GOOGLE_FORM_FIELD_QUANTITY?.trim() || "entry.1103630816",
  notes: process.env.NEXT_PUBLIC_GOOGLE_FORM_FIELD_NOTES?.trim() || "entry.258662212",
} as const;

function buildGoogleFormUrl(data: QuoteFormData): string | null {
  if (!googleFormUrl) return null;
  const url = new URL(googleFormUrl);
  url.searchParams.set("usp", "pp_url");

  for (const [key, fieldId] of Object.entries(googleFormFields)) {
    const value = data[key as keyof QuoteFormData];
    if (fieldId && value) url.searchParams.set(fieldId, value);
  }

  return url.toString();
}

function buildEmailUrl(data: QuoteFormData): string {
  const subject = `Yêu cầu báo giá cọc tre - ${data.customerName || data.phone}`;
  const body = [
    `Họ và tên: ${data.customerName || "Chưa cung cấp"}`,
    `Số điện thoại/Zalo: ${data.phone}`,
    `Email: ${data.email || "Chưa cung cấp"}`,
    `Công ty/đội thi công: ${data.company || "Chưa cung cấp"}`,
    `Quy cách cọc: ${data.bambooSpecs || "Chưa xác định"}`,
    `Số lượng: ${data.quantity || "Chưa xác định"}`,
    `Địa điểm giao: ${data.deliveryAddress || "Chưa xác định"}`,
    `Ghi chú: ${data.notes || "Không có"}`,
  ].join("\n");
  return `mailto:${encodeURIComponent(siteConfig.email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/**
 * Chuyển khách sang Google Forms do doanh nghiệp sở hữu. Khi Form chưa được
 * cấu hình, mở email đã điền sẵn để website tĩnh vẫn có một kênh liên hệ thật.
 * Hàm này không tuyên bố rằng dữ liệu đã được lưu.
 */
export async function sendQuoteRequest(data: QuoteFormData): Promise<ApiResponse<QuoteHandoff>> {
  if (typeof window === "undefined") {
    throw new Error("Biểu mẫu chỉ có thể mở trên trình duyệt.");
  }

  const normalizedData = {
    ...data,
    phone: (data.phone || "").replace(/[\s.-]/g, "").trim(),
  };
  const formUrl = buildGoogleFormUrl(normalizedData);
  const handoff: QuoteHandoff = formUrl
    ? { channel: "google-form", url: formUrl }
    : { channel: "email", url: buildEmailUrl(normalizedData) };

  if (handoff.channel === "google-form") {
    const opened = window.open(handoff.url, "_blank", "noopener,noreferrer");
    if (!opened) window.location.assign(handoff.url);
  } else {
    window.location.href = handoff.url;
  }

  return {
    success: true,
    message:
      handoff.channel === "google-form"
        ? "Đã mở Google Form. Vui lòng kiểm tra và bấm Gửi trên biểu mẫu."
        : "Đã mở ứng dụng email. Vui lòng kiểm tra và bấm Gửi.",
    data: handoff,
  };
}
