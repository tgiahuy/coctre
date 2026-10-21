"use client";

import React, { useState } from "react";
import { Send, Phone, CheckCircle2, AlertCircle } from "lucide-react";
import { sendQuoteRequest } from "@/lib/api";
import { siteConfig } from "@/data/config";
import { useProducts } from "@/lib/productStore";

export default function AboutQuoteForm() {
  const products = useProducts();
  const productOptions = products.length > 0
    ? products.map((p) => ({ value: p.slug, label: p.name }))
    : [
        { value: "coc-tre-15m", label: "Cọc Tre 1,5m" },
        { value: "coc-tre-2m", label: "Cọc Tre 2m" },
        { value: "coc-tre-25m", label: "Cọc Tre 2,5m" },
        { value: "coc-tre-3m", label: "Cọc Tre 3m" },
        { value: "coc-tre-4m", label: "Cọc Tre 4m" },
        { value: "coc-tre-theo-yeu-cau", label: "Cọc Tre Theo Yêu Cầu" }
      ];

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    productType: "coc-tre-2m",
    quantity: "",
    location: "",
    notes: ""
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!formData.fullName.trim()) {
      errs.fullName = "Vui lòng nhập họ và tên";
    }
    const cleanPhone = formData.phone.replace(/[\s.-]/g, "");
    if (!cleanPhone) {
      errs.phone = "Vui lòng nhập số điện thoại";
    } else if (!/^(03|05|07|08|09)[0-9]{8}$/.test(cleanPhone)) {
      errs.phone = "Số điện thoại không hợp lệ (cần 10 chữ số)";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const selectedOption = productOptions.find((p) => p.value === formData.productType);
      const specLabel = selectedOption ? selectedOption.label : formData.productType;

      await sendQuoteRequest({
        customerName: formData.fullName.trim(),
        phone: formData.phone.replace(/[\s.-]/g, "").trim(),
        deliveryAddress: formData.location.trim() || "Chưa xác định",
        bambooSpecs: `${specLabel}${formData.quantity ? ` - Số lượng: ${formData.quantity}` : ""}`,
        notes: `[Trang Giới thiệu] ${formData.notes.trim()}`
      });

      setIsSuccess(true);
      setFormData({
        fullName: "",
        phone: "",
        productType: "coc-tre-2m",
        quantity: "",
        location: "",
        notes: ""
      });
      setErrors({});
    } catch (err: unknown) {
      setIsSuccess(false);
      setSubmitError(err instanceof Error ? err.message : "Không thể gửi yêu cầu. Vui lòng thử lại hoặc gọi Hotline.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-[#FAF8F5] border border-gray-200 rounded-xl p-6 text-center space-y-3 my-6">
        <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
        <h4 className="text-base font-bold text-gray-900">
          Đã mở kênh gửi yêu cầu
        </h4>
        <p className="text-sm text-gray-600">
          Vui lòng kiểm tra thông tin và bấm <strong>Gửi</strong> trong Google Form hoặc ứng dụng email vừa mở. Yêu cầu chỉ được ghi nhận sau khi Quý khách hoàn tất bước đó.
        </p>
        <button
          type="button"
          onClick={() => {
            setIsSuccess(false);
            setSubmitError(null);
          }}
          className="text-xs text-[#214E34] hover:underline font-semibold pt-1"
        >
          Gửi yêu cầu khác
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-[#FAF8F5] border border-gray-200 rounded-xl p-5 sm:p-6 space-y-4 my-6">
      <div className="border-b border-gray-200 pb-2">
        <h3 className="text-lg font-bold text-gray-900">
          Đăng ký nhận báo giá & tư vấn cọc tre
        </h3>
        <p className="text-xs text-gray-600 mt-0.5">
          Nhập thông tin bên dưới, chúng tôi sẽ liên hệ báo giá nhanh cho công trình của bạn.
        </p>
      </div>

      {submitError && (
        <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{submitError}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            Họ và tên <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            placeholder="Họ tên của bạn"
            className="w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#214E34] focus:border-[#214E34]"
          />
          {errors.fullName && (
            <p className="text-[11px] text-red-500 mt-1">{errors.fullName}</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            Số điện thoại <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="Số điện thoại liên hệ"
            className="w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#214E34] focus:border-[#214E34]"
          />
          {errors.phone && (
            <p className="text-[11px] text-red-500 mt-1">{errors.phone}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            Quy cách cọc
          </label>
          <select
            value={formData.productType}
            onChange={(e) => setFormData({ ...formData, productType: e.target.value })}
            className="w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#214E34] focus:border-[#214E34]"
          >
            {productOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            Số lượng dự kiến
          </label>
          <input
            type="text"
            value={formData.quantity}
            onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
            placeholder="Ví dụ: 500 cọc, 1000 cọc"
            className="w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#214E34] focus:border-[#214E34]"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-1">
          Địa điểm công trình (Tỉnh / Thành / Quận huyện)
        </label>
        <input
          type="text"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          placeholder="Ví dụ: Dân Hòa, Thanh Oai, Hà Nội"
          className="w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#214E34] focus:border-[#214E34]"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-1">
          Ghi chú thêm
        </label>
        <textarea
          rows={2}
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          placeholder="Yêu cầu riêng về kỹ thuật, thời gian giao hàng..."
          className="w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#214E34] focus:border-[#214E34] resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-2.5 px-4 bg-[#214E34] hover:bg-[#183a27] text-white text-sm font-bold rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
      >
        {isSubmitting ? (
          <span>Đang gửi...</span>
        ) : (
          <>
            <Send className="w-4 h-4 text-[#CDAA63]" />
            <span>MỞ BIỂU MẪU BÁO GIÁ</span>
          </>
        )}
      </button>
    </form>
  );
}
