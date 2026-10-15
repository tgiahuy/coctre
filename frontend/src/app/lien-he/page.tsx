"use client";

import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Warehouse,
  Send,
  CheckCircle2,
  AlertCircle,
  Building,
  User,
  MessageSquare
} from "lucide-react";
import Breadcrumb from "@/components/common/Breadcrumb";
import { siteConfig } from "@/data/config";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    company: "",
    message: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!formData.fullName.trim()) errs.fullName = "Vui lòng nhập họ và tên";
    if (!formData.phone.trim()) {
      errs.phone = "Vui lòng nhập số điện thoại";
    } else if (!/(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/.test(formData.phone.replace(/\s+/g, ""))) {
      errs.phone = "Số điện thoại không hợp lệ";
    }
    if (!formData.message.trim()) errs.message = "Vui lòng nhập nội dung liên hệ";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      setIsSuccess(true);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#F7F5EF] min-h-screen">
      {/* BREADCRUMB */}
      <Breadcrumb items={[{ name: "Liên hệ & Kho bãi" }]} />

      {/* HERO BANNER */}
      <div className="bg-[#18231C] text-white py-12 border-b border-[#2A3930]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-bold text-[#CDAA63] uppercase tracking-widest">
              KẾT NỐI VỚI CHÚNG TÔI
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-white">
              LIÊN HỆ & HỆ THỐNG KHO BÃI CỌC TRE
            </h1>
            <p className="text-sm sm:text-base text-gray-300">
              Quý khách hàng, nhà thầu xây dựng có nhu cầu đặt hàng hoặc tư vấn kỹ thuật xin vui lòng liên hệ theo các kênh dưới đây.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* LEFT: COMPANY INFORMATION & MAP */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6">
              <div>
                <span className="text-xs font-bold text-[#CDAA63] uppercase tracking-wider block">
                  TRỤ SỞ & KHO BÃI
                </span>
                <h2 className="text-xl font-black text-[#18231C] mt-1">
                  {siteConfig.legalName}
                </h2>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-gray-700">
                <div className="flex items-start gap-3.5">
                  <MapPin className="w-5 h-5 text-[#214E34] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-gray-900 block font-bold">Văn phòng đại diện:</strong>
                    <span>{siteConfig.headquarters}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Warehouse className="w-5 h-5 text-[#CDAA63] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-gray-900 block font-bold">Bãi tập kết Hòa Bình (5.000m²):</strong>
                    <span>{siteConfig.warehouse1}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Warehouse className="w-5 h-5 text-[#CDAA63] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-gray-900 block font-bold">Kho trung chuyển Hà Nội:</strong>
                    <span>{siteConfig.warehouse2}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Phone className="w-5 h-5 text-[#E57C23] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-gray-900 block font-bold">Hotline / Zalo:</strong>
                    <a
                      href={`tel:${siteConfig.hotline}`}
                      className="text-base font-extrabold text-[#214E34] hover:text-[#E57C23] transition-colors"
                    >
                      {siteConfig.hotlineFormatted}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Mail className="w-5 h-5 text-[#214E34] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-gray-900 block font-bold">Hộp thư điện tử:</strong>
                    <span>{siteConfig.email}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Clock className="w-5 h-5 text-gray-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-gray-900 block font-bold">Thời gian làm việc:</strong>
                    <span>{siteConfig.workHours}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* GOOGLE MAPS EMBED */}
            <div className="bg-white rounded-3xl p-4 border border-gray-200 shadow-sm overflow-hidden">
              <h3 className="text-xs font-bold text-gray-600 uppercase mb-3 px-2">
                Bản đồ vị trí văn phòng & kho bãi
              </h3>
              <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-gray-100 border border-gray-200">
                <iframe
                  src={siteConfig.mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Google Maps Location"
                  className="w-full h-full"
                ></iframe>
              </div>
            </div>
          </div>

          {/* RIGHT: CONTACT FORM */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-200 shadow-sm">
              {isSuccess ? (
                <div className="text-center py-10 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto animate-bounce">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-black text-[#214E34]">GỬI LIÊN HỆ THÀNH CÔNG!</h3>
                  <p className="text-gray-600 text-sm max-w-md mx-auto leading-relaxed">
                    Cảm ơn anh/chị <strong>{formData.fullName}</strong> đã liên hệ. Bộ phận kinh doanh và kỹ thuật của <strong>Cọc Tre Hòa Bình</strong> sẽ phản hồi trong thời gian sớm nhất.
                  </p>
                  <button
                    onClick={() => {
                      setIsSuccess(false);
                      setFormData({ fullName: "", phone: "", email: "", company: "", message: "" });
                    }}
                    className="px-6 py-2.5 bg-[#214E34] text-white rounded-xl text-xs font-bold"
                  >
                    Gửi tin nhắn khác
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <h2 className="text-xl font-black text-[#18231C]">
                      GỬI YÊU CẦU TƯ VẤN & BÁO GIÁ
                    </h2>
                    <p className="text-xs text-gray-500 mt-1">
                      Chúng tôi cam kết bảo mật thông tin và phản hồi nhanh chóng
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Họ và tên của bạn <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                        <input
                          type="text"
                          placeholder="Nguyễn Văn A"
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          className={`w-full pl-9 pr-3 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[#214E34] ${
                            errors.fullName ? "border-red-500 bg-red-50" : "border-gray-300"
                          }`}
                        />
                      </div>
                      {errors.fullName && (
                        <p className="text-red-500 text-[11px] mt-1">{errors.fullName}</p>
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
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className={`w-full pl-9 pr-3 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[#214E34] ${
                            errors.phone ? "border-red-500 bg-red-50" : "border-gray-300"
                          }`}
                        />
                      </div>
                      {errors.phone && (
                        <p className="text-red-500 text-[11px] mt-1">{errors.phone}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Email */}
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Địa chỉ Email
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                        <input
                          type="email"
                          placeholder="example@gmail.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#214E34]"
                        />
                      </div>
                    </div>

                    {/* Company */}
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Tên công ty / Dự án
                      </label>
                      <div className="relative">
                        <Building className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                        <input
                          type="text"
                          placeholder="Công ty Xây dựng ABC"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#214E34]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Nội dung yêu cầu chi tiết <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <MessageSquare className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                      <textarea
                        rows={4}
                        placeholder="Quý khách cần báo giá loại cọc tre nào, số lượng bao nhiêu cọc và địa chỉ công trình cụ thể ở đâu?..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className={`w-full pl-9 pr-3 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[#214E34] ${
                          errors.message ? "border-red-500 bg-red-50" : "border-gray-300"
                        }`}
                      ></textarea>
                    </div>
                    {errors.message && (
                      <p className="text-red-500 text-[11px] mt-1">{errors.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-[#E57C23] hover:bg-[#CC6914] text-white rounded-xl font-black text-base tracking-wide flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <span>Đang gửi thông tin...</span>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>GỬI LIÊN HỆ NGAY</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
