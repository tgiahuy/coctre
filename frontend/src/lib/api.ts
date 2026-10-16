import { Article } from "@/data/articles";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "/api/content";

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  count?: number;
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

/**
 * 1. Báo giá: chỉ báo thành công sau khi backend đã lưu dữ liệu.
 */
export async function sendQuoteRequest(data: QuoteFormData): Promise<ApiResponse<unknown>> {
  const cleanPhone = (data.phone || "").replace(/[\s.-]/g, "").trim();
  const res = await fetch("/api/quotes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      customerName: data.customerName?.trim(),
      phone: cleanPhone,
      email: data.email?.trim(),
      company: data.company?.trim(),
      location: data.deliveryAddress?.trim(),
      productType: data.bambooSpecs?.trim(),
      quantity: data.quantity?.trim(),
      notes: data.notes?.trim(),
    }),
  });
  const result = await res.json().catch(() => ({ success: false, message: "Phản hồi máy chủ không hợp lệ" }));
  if (!res.ok || !result.success) throw new Error(result.message || "Không thể gửi yêu cầu");
  return result;
}

/**
 * 2. Bài viết: Lấy từ API nếu có, hoặc trả về null để dùng dữ liệu nội bộ
 */
export async function fetchArticlesFromApi(category?: string, search?: string): Promise<Article[] | null> {
  if (!API_BASE_URL) return null;

  try {
    const params = new URLSearchParams();
    if (category && category !== "all") params.append("category", category);
    if (search) params.append("search", search);

    const res = await fetch(`${API_BASE_URL}/articles?${params.toString()}`);
    if (!res.ok) return null;
    const json = await res.json();
    return json.success ? json.data : null;
  } catch (err) {
    return null;
  }
}

/**
 * 3. Đăng bài viết: Gửi API nếu có backend
 */
export async function createArticleOnApi(article: Article): Promise<boolean> {
  if (!API_BASE_URL) return true;

  try {
    const res = await fetch(`${API_BASE_URL}/articles`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(article),
    });
    const json = await res.json();
    return Boolean(json.success);
  } catch (err) {
    return false;
  }
}

/**
 * 4. Xóa bài viết trên API nếu có backend
 */
export async function deleteArticleOnApi(slugOrId: string): Promise<boolean> {
  if (!API_BASE_URL) return true;

  try {
    const res = await fetch(`${API_BASE_URL}/articles/${slugOrId}`, {
      method: "DELETE",
    });
    const json = await res.json();
    return Boolean(json.success);
  } catch (err) {
    return false;
  }
}
