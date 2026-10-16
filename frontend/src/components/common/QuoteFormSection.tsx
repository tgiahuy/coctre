"use client";

import React, { useState } from "react";
import {
  Send,
  Phone,
  CheckCircle2,
  AlertCircle,
  FileText,
  MapPin,
  Building,
  User,
  Calculator,
  ShieldCheck,
  Truck
} from "lucide-react";
import { products } from "@/data/products";
import { siteConfig } from "@/data/config";

export default function QuoteFormSection() {
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
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!formData.fullName.trim()) {
      errs.fullName = "Vui lòng nhập họ và tên";
    }
    if (!formData.phone.trim()) {
      errs.phone = "Vui lòng nhập số điện thoại";
    } else if (!/^(03|05|07|08|09)[0-9]{8}$/.test(formData.phone.replace(/\s+/g, ""))) {
      errs.phone = "Số điện thoại không hợp lệ (10 số)";
    }
    if (!formData.location.trim()) {
      errs.location = "Vui lòng nhập địa điểm công trình";
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
      const { sendQuoteRequest } = await import("@/lib/api");
      await sendQuoteRequest({
        customerName: formData.fullName,
        phone: formData.phone,
        company: formData.company,
        deliveryAddress: formData.location,
        bambooSpecs: formData.productType,
        quantity: formData.quantity,
        notes: formData.notes,
      });
      setIsSuccess(true);
    } catch (err) {
      setIsSuccess(false);
      setSubmitError(err instanceof Error ? err.message : "Không thể gửi yêu cầu. Vui lòng thử lại.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="bao-gia-section" className="py-16 sm:py-24 bg-[#18231C] text-white relative overflow-hidden">
      {/* Background visual accents */}
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-[#214E34]/50 blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-[#CDAA63]/10 blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* LEFT COLUMN: VALUE PROPOSITION */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-[#CDAA63]/20 text-[#CDAA63] border border-[#CDAA63]/40">
              <span className="w-1.5 h-1.5 rounded-full bg-[#CDAA63]"></span>
              BÁO GIÁ NHANH TRONG 10 PHÚT
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight">
              CẦN BÁO GIÁ CỌC TRE CHO CÔNG TRÌNH?
            </h2>

            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              Gửi thông tin để nhận tư vấn chủng loại cọc phù hợp nhất với địa chất nền móng và nhận bảng báo giá cạnh tranh trực tiếp từ tổng kho cọc tre Huyền Dương.
            </p>

            {/* Guarantees */}
            <div className="space-y-4 pt-4 border-t border-[#2A3930]">
              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-lg bg-[#214E34] text-[#CDAA63] flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">Cam kết cọc già đúng thỏa thuận</h4>
                  <p className="text-xs text-gray-400">Không pha trộn tre non, tre nứt toác, 1 đổi 1 tại công trường.</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-lg bg-[#214E34] text-[#CDAA63] flex items-center justify-center shrink-0">
                  <Truck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">Bao trọn gói xe vận chuyển</h4>
                  <p className="text-xs text-gray-400">Điều phối xe tải các trọng tải từ 2.5T đến 15T giao hàng 24/7.</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-lg bg-[#214E34] text-[#CDAA63] flex items-center justify-center shrink-0">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">Đầy đủ hợp đồng & hóa đơn VAT</h4>
                  <p className="text-xs text-gray-400">Đáp ứng hồ sơ thanh quyết toán dự án đầu tư công và công ty.</p>
                </div>
              </div>
            </div>

            {/* Direct hotline callout */}
            <div className="p-4 rounded-xl bg-[#214E34]/60 border border-[#2B6443] flex items-center justify-between">
              <div>
                <span className="text-xs text-gray-300 block">Cần tư vấn kỹ thuật ngay lập tức?</span>
                <span className="text-lg font-black text-[#CDAA63]">
                  {siteConfig.hotlineFormatted}
                </span>
              </div>
              <a
                href={`tel:${siteConfig.hotline}`}
                className="px-4 py-2 bg-[#E57C23] hover:bg-[#CC6914] text-white font-bold text-xs rounded-lg flex items-center gap-1.5 shadow"
              >
                <Phone className="w-3.5 h-3.5" />
                Gọi ngay
              </a>
            </div>
          </div>

          {/* RIGHT COLUMN: FORM CARD */}
          <div className="lg:col-span-7">
            <div className="bg-white text-gray-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#CDAA63]/30">
              {isSuccess ? (
                <div className="text-center py-8 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto animate-bounce">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-black text-[#214E34]">GỬI YÊU CẦU THÀNH CÔNG!</h3>
                  <p className="text-gray-600 text-sm max-w-md mx-auto leading-relaxed">
                    Cảm ơn anh/chị <strong>{formData.fullName}</strong>. Chúng tôi đã nhận được thông tin và sẽ liên hệ tư vấn kèm gửi báo giá trong thời gian sớm nhất.
                  </p>
                  <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                    <a
                      href={`tel:${siteConfig.hotline}`}
                      className="px-6 py-3 rounded-xl bg-[#214E34] text-white font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#183B27]"
                    >
                      <Phone className="w-4 h-4 text-[#CDAA63]" />
                      Gọi điện: {siteConfig.hotlineFormatted}
                    </a>
                    <button
                      onClick={() => {
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
                      }}
                      className="px-6 py-3 rounded-xl bg-gray-100 text-gray-700 font-bold text-sm hover:bg-gray-200"
                    >
                      Gửi yêu cầu khác
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {submitError && (
                    <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{submitError}</span>
                    </div>
                  )}
                  <div className="border-b border-gray-100 pb-3 mb-2">
                    <h3 className="text-xl font-black text-[#18231C]">
                      PHIẾU YÊU CẦU BÁO GIÁ CỌC TRE
                    </h3>
                    <p className="text-xs text-gray-500">
                      Điền thông tin dưới đây để nhận báo giá chi tiết tận công trình
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Họ và tên <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                        <input
                          type="text"
                          placeholder="Nguyễn Văn A"
                          value={formData.fullName}
                          onChange={(e) =>
                            setFormData({ ...formData, fullName: e.target.value })
                          }
                          className={`w-full pl-9 pr-3 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[#214E34] ${
                            errors.fullName ? "border-red-500 bg-red-50/50" : "border-gray-200"
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
                          placeholder="0912 345 678"
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                          className={`w-full pl-9 pr-3 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[#214E34] ${
                            errors.phone ? "border-red-500 bg-red-50/50" : "border-gray-200"
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
                    {/* Company */}
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Tên công ty / Nhà thầu
                      </label>
                      <div className="relative">
                        <Building className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                        <input
                          type="text"
                          placeholder="Công ty Xây dựng XYZ"
                          value={formData.company}
                          onChange={(e) =>
                            setFormData({ ...formData, company: e.target.value })
                          }
                          className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#214E34]"
                        />
                      </div>
                    </div>

                    {/* Location */}
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Địa điểm công trình <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <MapPin className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                        <input
                          type="text"
                          placeholder="Quận/Huyện, Tỉnh thành"
                          value={formData.location}
                          onChange={(e) =>
                            setFormData({ ...formData, location: e.target.value })
                          }
                          className={`w-full pl-9 pr-3 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[#214E34] ${
                            errors.location ? "border-red-500 bg-red-50/50" : "border-gray-200"
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
                    {/* Product Type Dropdown */}
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Loại cọc quan tâm
                      </label>
                      <select
                        value={formData.productType}
                        onChange={(e) =>
                          setFormData({ ...formData, productType: e.target.value })
                        }
                        className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#214E34] bg-white"
                      >
                        {products.map((p) => (
                          <option key={p.id} value={p.slug}>
                            {p.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Quantity */}
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Số lượng dự kiến
                      </label>
                      <div className="relative">
                        <Calculator className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                        <input
                          type="text"
                          placeholder="VD: 2.000 cọc, 1 vạn..."
                          value={formData.quantity}
                          onChange={(e) =>
                            setFormData({ ...formData, quantity: e.target.value })
                          }
                          className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#214E34]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Notes */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Nội dung yêu cầu chi tiết
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Mô tả yêu cầu đường kính, thời gian cần hàng, xuất hóa đơn VAT..."
                      value={formData.notes}
                      onChange={(e) =>
                        setFormData({ ...formData, notes: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#214E34]"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-[#E57C23] hover:bg-[#CC6914] text-white rounded-xl font-black text-base tracking-wide flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer disabled:opacity-70 mt-2"
                  >
                    {isSubmitting ? (
                      <span>Đang gửi thông tin...</span>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>GỬI YÊU CẦU BÁO GIÁ</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
