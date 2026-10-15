"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Send,
  Phone,
  CheckCircle2,
  AlertCircle,
  FileText,
  MapPin,
  Building,
  User,
  Calculator
} from "lucide-react";
import { useQuoteModal } from "@/context/QuoteModalContext";
import { products } from "@/data/products";
import { siteConfig } from "@/data/config";

export default function QuoteModal() {
  const { isOpen, selectedProduct, closeQuoteModal } = useQuoteModal();

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    company: "",
    location: "",
    productType: "coc-tre-2m",
    quantity: "",
    notes: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (selectedProduct) {
      // Find matching product slug or fallback
      const found = products.find(
        (p) => p.slug === selectedProduct || p.name.includes(selectedProduct) || p.id === selectedProduct
      );
      if (found) {
        setFormData((prev) => ({ ...prev, productType: found.slug }));
      }
    }
  }, [selectedProduct]);

  if (!isOpen) return null;

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!formData.fullName.trim()) {
      errs.fullName = "Vui lòng nhập họ và tên";
    }
    if (!formData.phone.trim()) {
      errs.phone = "Vui lòng nhập số điện thoại";
    } else if (!/(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/.test(formData.phone.replace(/\s+/g, ""))) {
      errs.phone = "Số điện thoại không hợp lệ (gồm 10 chữ số)";
    }
    if (!formData.location.trim()) {
      errs.location = "Vui lòng nhập địa điểm công trình (để tính cước xe)";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const { sendQuoteRequest } = await import("@/lib/api");
      await sendQuoteRequest({
        customerName: formData.fullName,
        phone: formData.phone,
        deliveryAddress: formData.location,
        bambooSpecs: `${formData.productType} - Số lượng: ${formData.quantity || "Chưa rõ"}`,
        notes: `${formData.company ? `Công ty: ${formData.company}. ` : ""}${formData.notes}`
      });
      setIsSuccess(true);
    } catch (err) {
      console.error(err);
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetAndClose = () => {
    setIsSuccess(false);
    setFormData({
      fullName: "",
      phone: "",
      company: "",
      location: "",
      productType: "coc-tre-2m",
      quantity: "",
      notes: "",
    });
    setErrors({});
    closeQuoteModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-[#CDAA63]/30 max-h-[90vh] flex flex-col">
        {/* MODAL HEADER */}
        <div className="bg-[#214E34] text-white p-5 flex items-center justify-between border-b border-[#183B27]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#CDAA63] text-[#18231C] flex items-center justify-center font-bold">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg text-white">YÊU CẦU BÁO GIÁ CỌC TRE</h3>
              <p className="text-xs text-[#CDAA63]">
                Cam kết giá tại bãi • Báo giá sau 5 - 10 phút
              </p>
            </div>
          </div>
          <button
            onClick={handleResetAndClose}
            className="w-8 h-8 rounded-full bg-black/20 hover:bg-black/40 text-gray-200 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* MODAL BODY */}
        <div className="p-6 overflow-y-auto">
          {isSuccess ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-2xl font-black text-[#214E34]">GỬI YÊU CẦU THÀNH CÔNG!</h4>
              <p className="text-gray-600 text-sm max-w-md mx-auto leading-relaxed">
                Cảm ơn anh/chị <strong>{formData.fullName}</strong>. Kỹ sư kinh doanh của <strong>Cọc Tre Hòa Bình</strong> sẽ gọi điện thoại hoặc gửi bảng báo giá qua Zalo số <strong>{formData.phone}</strong> trong vòng 5–15 phút.
              </p>

              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 max-w-md mx-auto text-xs text-gray-700 text-left space-y-1">
                <p>• <strong>Sản phẩm:</strong> {products.find(p => p.slug === formData.productType)?.name}</p>
                <p>• <strong>Địa điểm giao:</strong> {formData.location}</p>
                {formData.quantity && <p>• <strong>Số lượng dự kiến:</strong> {formData.quantity} cọc</p>}
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href={`tel:${siteConfig.hotline}`}
                  className="px-6 py-3 rounded-xl bg-[#214E34] text-white font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#183B27]"
                >
                  <Phone className="w-4 h-4 text-[#CDAA63]" />
                  Gọi gấp: {siteConfig.hotlineFormatted}
                </a>
                <button
                  onClick={handleResetAndClose}
                  className="px-6 py-3 rounded-xl bg-gray-200 text-gray-700 font-bold text-sm hover:bg-gray-300"
                >
                  Đóng cửa sổ
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full name */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Họ và tên của bạn <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      placeholder="Ví dụ: Nguyễn Văn Tuấn"
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData({ ...formData, fullName: e.target.value })
                      }
                      className={`w-full pl-9 pr-3 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-[#214E34] ${
                        errors.fullName ? "border-red-500 bg-red-50/50" : "border-gray-300"
                      }`}
                    />
                  </div>
                  {errors.fullName && (
                    <p className="text-red-500 text-[11px] mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.fullName}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Số điện thoại / Zalo <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                    <input
                      type="tel"
                      placeholder="0912 xxx xxx"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className={`w-full pl-9 pr-3 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-[#214E34] ${
                        errors.phone ? "border-red-500 bg-red-50/50" : "border-gray-300"
                      }`}
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-red-500 text-[11px] mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.phone}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Company / Contractor */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Tên công ty / Đội thi công (nếu có)
                  </label>
                  <div className="relative">
                    <Building className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      placeholder="Công ty Xây Dựng ABC / Thầu tư nhân"
                      value={formData.company}
                      onChange={(e) =>
                        setFormData({ ...formData, company: e.target.value })
                      }
                      className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#214E34]"
                    />
                  </div>
                </div>

                {/* Project Location */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Địa điểm giao hàng công trình <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      placeholder="Quận/Huyện, Tỉnh thành (VD: Đông Anh, HN)"
                      value={formData.location}
                      onChange={(e) =>
                        setFormData({ ...formData, location: e.target.value })
                      }
                      className={`w-full pl-9 pr-3 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-[#214E34] ${
                        errors.location ? "border-red-500 bg-red-50/50" : "border-gray-300"
                      }`}
                    />
                  </div>
                  {errors.location && (
                    <p className="text-red-500 text-[11px] mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.location}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Product Select */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Loại cọc tre cần báo giá
                  </label>
                  <select
                    value={formData.productType}
                    onChange={(e) =>
                      setFormData({ ...formData, productType: e.target.value })
                    }
                    className="w-full px-3 py-2.5 rounded-lg border border-gray-300 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#214E34] bg-white"
                  >
                    {products.map((p) => (
                      <option key={p.id} value={p.slug}>
                        {p.name} ({p.diameter})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Quantity */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Số lượng dự kiến (cây / cọc)
                  </label>
                  <div className="relative">
                    <Calculator className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      placeholder="VD: 500 cọc, 3.000 cọc, 2 vạn..."
                      value={formData.quantity}
                      onChange={(e) =>
                        setFormData({ ...formData, quantity: e.target.value })
                      }
                      className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#214E34]"
                    />
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Yêu cầu thêm (kích thước riêng, tiến độ, hóa đơn...)
                </label>
                <textarea
                  rows={2}
                  placeholder="Ghi chú thêm về quy cách đường kính, thời gian giao hàng cần thiết..."
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#214E34]"
                ></textarea>
              </div>

              {/* Notice */}
              <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
                <span className="font-bold text-[#E57C23]">✓</span>
                <span>
                  Báo giá trực tiếp từ kho cọc tre Hòa Bình, hỗ trợ hóa đơn VAT & chứng chỉ lâm sản hợp pháp cho nhà thầu.
                </span>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-[#E57C23] hover:bg-[#CC6914] text-white rounded-xl font-extrabold text-base tracking-wide flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer disabled:opacity-70"
              >
                {isSubmitting ? (
                  <span>Đang xử lý gửi thông tin...</span>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>GỬI YÊU CẦU BÁO GIÁ NGAY</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
