import { Article } from "@/data/articles";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

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
  deliveryAddress?: string;
  bambooSpecs?: string;
  notes?: string;
}

/**
 * 1. Báo giá: Lưu vào LocalStorage và gửi API (nếu có cấu hình Backend)
 */
export async function sendQuoteRequest(data: QuoteFormData): Promise<ApiResponse<any>> {
  // Luôn lưu bản sao vào localStorage để không bao giờ bị mất khách
  if (typeof window !== "undefined") {
    try {
      if (!localStorage.getItem("coctre_purged_mock_quotes_v1")) {
        localStorage.removeItem("coctre_quote_requests");
        localStorage.setItem("coctre_purged_mock_quotes_v1", "true");
      }
      const existing = JSON.parse(localStorage.getItem("coctre_quote_requests") || "[]");
      existing.unshift({
        ...data,
        id: "quote-" + Date.now(),
        createdAt: new Date().toISOString(),
      });
      localStorage.setItem("coctre_quote_requests", JSON.stringify(existing));
    } catch (e) {
      // Ignore
    }
  }

  // Nếu có API backend được cấu hình, gửi tiếp lên server
  if (API_BASE_URL) {
    try {
      const res = await fetch(`${API_BASE_URL}/quotes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      return await res.json();
    } catch (error) {
      // Ignore error and return success from local save
    }
  }

  return {
    success: true,
    message: "Đã lưu yêu cầu báo giá thành công! Đội ngũ tư vấn sẽ liên hệ sớm nhất.",
  };
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
export async function createArticleOnApi(article: Article, pin = "8888"): Promise<boolean> {
  if (!API_BASE_URL) return true;

  try {
    const res = await fetch(`${API_BASE_URL}/articles`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-admin-pin": pin,
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
export async function deleteArticleOnApi(slugOrId: string, pin = "8888"): Promise<boolean> {
  if (!API_BASE_URL) return true;

  try {
    const res = await fetch(`${API_BASE_URL}/articles/${slugOrId}`, {
      method: "DELETE",
      headers: { "x-admin-pin": pin },
    });
    const json = await res.json();
    return Boolean(json.success);
  } catch (err) {
    return false;
  }
}
