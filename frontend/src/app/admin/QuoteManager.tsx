"use client";

import React, { useEffect, useMemo, useState } from "react";
import { AlertCircle, CheckCircle2, Loader2, Mail, Phone, RefreshCw, Search, Send, Trash2 } from "lucide-react";

type QuoteStatus = "NEW" | "CONTACTED" | "CLOSED" | "CANCELLED";
type EmailStatus = "PENDING" | "SENT" | "FAILED" | "SKIPPED";

interface QuoteRequest {
  id: string;
  customerName?: string;
  phone: string;
  email?: string;
  company?: string;
  location?: string;
  productType?: string;
  quantity?: string;
  notes?: string;
  status: QuoteStatus;
  emailStatus?: EmailStatus;
  emailError?: string;
  emailRetryCount?: number;
  createdAt: string;
}

const STATUS_OPTIONS: { value: QuoteStatus; label: string }[] = [
  { value: "NEW", label: "Mới" },
  { value: "CONTACTED", label: "Đã liên hệ" },
  { value: "CLOSED", label: "Đã chốt" },
  { value: "CANCELLED", label: "Đã hủy" },
];

function getAuthHeaders(): HeadersInit {
  return {};
}

export default function QuoteManager() {
  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<"ALL" | QuoteStatus>("ALL");
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [resendingId, setResendingId] = useState<string | null>(null);

  const loadQuotes = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/content/quotes", {
        cache: "no-store",
        credentials: "include",
        headers: getAuthHeaders(),
      });
      const body = await res.json().catch(() => null);
      if (!res.ok || !body?.success || !Array.isArray(body.data)) {
        throw new Error(body?.message || "Không thể tải danh sách báo giá");
      }
      setQuotes(body.data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Không thể tải danh sách báo giá");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    queueMicrotask(() => void loadQuotes());
  }, []);

  const filteredQuotes = useMemo(() => {
    const keyword = search.trim().toLowerCase();
    return quotes.filter((quote) => {
      if (status !== "ALL" && quote.status !== status) return false;
      if (!keyword) return true;
      return [quote.customerName, quote.phone, quote.email, quote.company, quote.location, quote.productType]
        .some((value) => value?.toLowerCase().includes(keyword));
    });
  }, [quotes, search, status]);

  const updateStatus = async (id: string, nextStatus: QuoteStatus) => {
    setUpdatingId(id);
    setError(null);
    try {
      const res = await fetch(`/api/content/quotes/${encodeURIComponent(id)}/status?status=${nextStatus}`, {
        method: "PATCH",
        credentials: "include",
        headers: getAuthHeaders(),
      });
      const body = await res.json().catch(() => null);
      if (!res.ok || !body?.success) throw new Error(body?.message || "Không thể cập nhật trạng thái");
      setQuotes((current) => current.map((quote) => quote.id === id ? body.data : quote));
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Không thể cập nhật trạng thái");
    } finally {
      setUpdatingId(null);
    }
  };

  const resendEmail = async (quote: QuoteRequest) => {
    setResendingId(quote.id);
    setError(null);
    setSuccessMsg(null);
    try {
      const res = await fetch("/api/quotes/resend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(quote),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.success) {
        throw new Error(data?.message || "Gửi email thất bại");
      }
      setSuccessMsg(`Đã gửi lại email báo giá cho khách ${quote.customerName || quote.phone} thành công!`);
      if (data.data) {
        setQuotes((current) => current.map((q) => q.id === quote.id ? data.data : q));
      } else {
        await loadQuotes();
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Lỗi khi gửi lại email");
      await loadQuotes();
    } finally {
      setResendingId(null);
    }
  };

  const deleteQuote = async (quote: QuoteRequest) => {
    if (!confirm(`Xóa yêu cầu của ${quote.customerName || quote.phone}?`)) return;
    setUpdatingId(quote.id);
    try {
      const res = await fetch(`/api/content/quotes/${encodeURIComponent(quote.id)}`, {
        method: "DELETE",
        credentials: "include",
        headers: getAuthHeaders(),
      });
      const body = await res.json().catch(() => null);
      if (!res.ok || !body?.success) throw new Error(body?.message || "Không thể xóa yêu cầu");
      setQuotes((current) => current.filter((item) => item.id !== quote.id));
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Không thể xóa yêu cầu");
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="space-y-5 p-3 sm:p-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-black text-[#214E34]">Khách hàng yêu cầu báo giá</h2>
          <p className="text-sm text-gray-500">Theo dõi, cập nhật tiến độ tư vấn và trạng thái gửi email thông báo.</p>
        </div>
        <button type="button" onClick={() => void loadQuotes()} className="inline-flex items-center gap-2 px-3 py-2 border rounded-xl text-sm font-bold bg-white hover:bg-gray-50 transition-colors">
          <RefreshCw className="w-4 h-4" /> Tải lại
        </button>
      </div>

      <div className="grid sm:grid-cols-[1fr_200px] gap-3">
        <div className="relative">
          <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Tìm tên, điện thoại, công ty, địa điểm..." className="w-full pl-9 pr-3 py-2.5 border rounded-xl text-sm" />
        </div>
        <select value={status} onChange={(e) => setStatus(e.target.value as "ALL" | QuoteStatus)} className="px-3 py-2.5 border rounded-xl text-sm bg-white">
          <option value="ALL">Tất cả trạng thái</option>
          {STATUS_OPTIONS.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
        </select>
      </div>

      {error && <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm flex gap-2"><AlertCircle className="w-4 h-4 shrink-0" />{error}</div>}
      {successMsg && <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl text-sm flex gap-2"><CheckCircle2 className="w-4 h-4 shrink-0" />{successMsg}</div>}

      {isLoading ? (
        <div className="py-16 flex justify-center"><Loader2 className="w-7 h-7 animate-spin text-[#214E34]" /></div>
      ) : filteredQuotes.length === 0 ? (
        <div className="py-16 text-center text-gray-500 border border-dashed rounded-2xl">Chưa có yêu cầu phù hợp.</div>
      ) : (
        <div className="space-y-3">
          {filteredQuotes.map((quote) => (
            <article key={quote.id} className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm hover:border-[#214E34]/30 transition-all">
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                <div className="space-y-2 min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-extrabold text-gray-900">{quote.customerName || "Khách chưa cung cấp tên"}</h3>
                    <span className="text-[11px] text-gray-500">{new Date(quote.createdAt).toLocaleString("vi-VN")}</span>

                    {/* Email Status Badge */}
                    {quote.emailStatus === "SENT" && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Email đã gửi
                      </span>
                    )}
                    {quote.emailStatus === "FAILED" && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-red-100 text-red-800 px-2 py-0.5 rounded-full" title={quote.emailError || "Lỗi gửi email"}>
                        <AlertCircle className="w-3 h-3 text-red-600" /> Email lỗi {quote.emailRetryCount ? `(${quote.emailRetryCount} lần)` : ""}
                      </span>
                    )}
                    {(!quote.emailStatus || quote.emailStatus === "PENDING") && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                        <Mail className="w-3 h-3 text-amber-600" /> Chờ gửi email
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
                    <a href={`tel:${quote.phone}`} className="font-bold text-[#214E34] inline-flex items-center gap-1"><Phone className="w-3.5 h-3.5" />{quote.phone}</a>
                    {quote.email && <a href={`mailto:${quote.email}`} className="text-blue-700">{quote.email}</a>}
                    {quote.company && <span className="text-gray-600">Công ty: {quote.company}</span>}
                  </div>

                  <div className="text-sm text-gray-600 space-y-1">
                    {quote.productType && <p><strong>Sản phẩm:</strong> {quote.productType}{quote.quantity ? ` · Số lượng: ${quote.quantity}` : ""}</p>}
                    {quote.location && <p><strong>Địa điểm:</strong> {quote.location}</p>}
                    {quote.notes && <p className="whitespace-pre-wrap text-gray-700 bg-gray-50 p-2 rounded-lg"><strong>Ghi chú:</strong> {quote.notes}</p>}
                    {quote.emailError && quote.emailStatus === "FAILED" && (
                      <p className="text-xs text-red-600 bg-red-50 p-1.5 rounded">
                        <strong>Lỗi email:</strong> {quote.emailError}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap lg:flex-nowrap items-center gap-2 shrink-0">
                  {/* Resend Email Button */}
                  <button
                    type="button"
                    disabled={resendingId === quote.id}
                    onClick={() => void resendEmail(quote)}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1.5 border border-gray-300 rounded-lg text-xs font-semibold text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 transition-colors"
                    title="Gửi lại email thông báo tới hòm thư quản trị"
                  >
                    {resendingId === quote.id ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-[#214E34]" />
                    ) : (
                      <Send className="w-3.5 h-3.5 text-[#214E34]" />
                    )}
                    Gửi lại email
                  </button>

                  <select disabled={updatingId === quote.id} value={quote.status} onChange={(e) => void updateStatus(quote.id, e.target.value as QuoteStatus)} className="px-3 py-2 border rounded-lg text-xs font-bold bg-white">
                    {STATUS_OPTIONS.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                  </select>
                  {quote.status === "CLOSED" && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
                  <button type="button" disabled={updatingId === quote.id} onClick={() => void deleteQuote(quote)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg" aria-label="Xóa yêu cầu"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

