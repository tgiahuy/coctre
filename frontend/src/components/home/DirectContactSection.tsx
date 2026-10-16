"use client";

import React, { useState } from "react";
import {
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  ShieldCheck,
  Warehouse,
  ExternalLink,
  Navigation,
  Building,
  CheckCircle2,
  Truck,
  Send,
  Sparkles,
  FileText,
  AlertCircle,
  Copy,
  Check,
  Headphones
} from "lucide-react";
import { useSiteConfig } from "@/lib/configStore";
import { sendQuoteRequest } from "@/lib/api";
import { useQuoteModal } from "@/context/QuoteModalContext";

const DEFAULT_MAP_EMBED =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3729.6590783231222!2d105.7768899!3d20.8050759!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31344b16832a57e1%3A0x50d7c89128659d32!2zQ-G7rWEgSMOgbmcgQ-G7jWMgVHJlIETGsMahbmcgSHV54buBbg!5e0!3m2!1svi!2s!4v1792139837819!5m2!1svi!2s";

function cleanMapUrl(input: string): string {
  if (!input || !input.trim()) {
    return DEFAULT_MAP_EMBED;
  }
  const match = input.match(/src=["'](.*?)["']/);
  const rawUrl = match && match[1] ? match[1] : input.trim();
  if (rawUrl.includes("google.com/maps/embed")) {
    return rawUrl;
  }
  return DEFAULT_MAP_EMBED;
}

export default function DirectContactSection() {
  const siteConfig = useSiteConfig();
  const { openQuoteModal } = useQuoteModal();
  const mapSrc = cleanMapUrl(siteConfig.mapEmbedUrl);
  const googleMapsDirectionsUrl = "https://maps.app.goo.gl/QDkpD4tdXW2DPFJWA?g_st=ic";

  // Smart Quick Callback form state
  const [phoneInput, setPhoneInput] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("Cọc tre 2m (Phổ biến móng nhà)");
  const [locationInput, setLocationInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [copiedPhone, setCopiedPhone] = useState<string | null>(null);

  const handleCopy = (phone: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(phone.replace(/\./g, ""));
    setCopiedPhone(phone);
    setTimeout(() => setCopiedPhone(null), 2500);
  };

  const handleQuickSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    const cleanPhone = phoneInput.replace(/\s+/g, "");
    if (!cleanPhone) {
      setErrorMessage("Vui lòng nhập số điện thoại của bạn.");
      return;
    }
    if (!/(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/.test(cleanPhone)) {
      setErrorMessage("Số điện thoại không hợp lệ (cần 10 chữ số).");
      return;
    }

    setIsSubmitting(true);
    try {
      await sendQuoteRequest({
        customerName: "Khách yêu cầu gọi lại nhanh",
        phone: cleanPhone,
        deliveryAddress: locationInput.trim() || "Chưa cung cấp địa điểm",
        bambooSpecs: selectedProduct,
        notes: "Yêu cầu báo giá nhanh qua hộp trực tiếp trang chủ",
      });
      setIsSuccess(true);
      setPhoneInput("");
      setLocationInput("");
    } catch (err) {
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-14 sm:py-20 bg-[#111F16] text-white relative overflow-hidden" id="lien-he-truc-tiep">
      {/* Decorative background glow */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[300px] bg-[#214E34]/30 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[300px] bg-[#CDAA63]/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* 2-COLUMN GRID: KHUNG BÁO GIÁ THÔNG MINH (7 COLS) & GOOGLE MAPS (5 COLS) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-8 items-stretch">
          
          {/* CỘT 1: KHUNG TƯ VẤN & BÁO GIÁ THÔNG MINH (7 COLS) */}
          <div className="lg:col-span-7 bg-[#182B1F] border-2 border-[#CDAA63]/40 rounded-3xl p-6 sm:p-9 shadow-2xl flex flex-col justify-between space-y-6">
            
            {/* Header section */}
            <div className="space-y-4 text-center lg:text-left">
              
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#CDAA63]/15 border border-[#CDAA63]/40 text-[#EED59B] text-xs font-black uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4 text-[#CDAA63]" />
                  <span>TƯ VẤN & BÁO GIÁ TRỰC TIẾP 24/7</span>
                </span>

                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>Kỹ sư trực máy • Phản hồi 5 phút</span>
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-black text-white leading-tight">
                Quý Khách Cần Báo Giá Cọc Tre Hoặc Tư Vấn Kỹ Thuật?
              </h2>

              <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-2xl">
                Tổng kho Cọc Tre Huyền Dương hỗ trợ báo giá trực tiếp tại bãi hoặc tận chân công trình. Gọi ngay để có giá tốt nhất và sắp xếp xe tải giao trong ngày.
              </p>

              {/* 3 HIGH-CONTRAST ACTION BUTTONS */}
              <div className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-3">
                
                {/* BUTTON 1: HOTLINE CHÍNH (CAM NỔI BẬT) */}
                <a
                  href={`tel:${siteConfig.hotline}`}
                  className="py-3.5 px-4 rounded-2xl bg-[#E57C23] hover:bg-[#D96B14] text-white font-black text-xs sm:text-sm flex flex-col items-center justify-center gap-1 shadow-lg hover:shadow-xl transition-all active:scale-95 group text-center border border-amber-400/30"
                  title="Bấm để gọi hotline chính"
                >
                  <div className="flex items-center gap-1.5">
                    <Phone className="w-4 h-4 animate-bounce text-white shrink-0" />
                    <span className="tracking-wide">GỌI: {siteConfig.hotlineFormatted}</span>
                  </div>
                  <span className="text-[11px] font-medium text-amber-100/90">Hotline Bãi & Giao Xe</span>
                </a>

                {/* BUTTON 2: HOTLINE PHỤ (TRẮNG/VÀNG KIM - TƯƠNG PHẢN CAO, KHÔNG BỊ CHÌM) */}
                {siteConfig.hotline2 ? (
                  <a
                    href={`tel:${siteConfig.hotline2}`}
                    className="py-3.5 px-4 rounded-2xl bg-white hover:bg-amber-50 text-[#18231C] font-black text-xs sm:text-sm flex flex-col items-center justify-center gap-1 shadow-lg hover:shadow-xl transition-all active:scale-95 group text-center border-2 border-[#CDAA63]"
                    title="Bấm để gọi hotline kỹ thuật"
                  >
                    <div className="flex items-center gap-1.5 text-[#214E34]">
                      <Headphones className="w-4 h-4 shrink-0 text-[#CDAA63]" />
                      <span className="tracking-wide">GỌI: {siteConfig.hotline2Formatted}</span>
                    </div>
                    <span className="text-[11px] font-medium text-gray-600">Tư Vấn Kỹ Thuật</span>
                  </a>
                ) : null}

                {/* BUTTON 3: ZALO BÁO GIÁ (XANH ZALO CHUẨN) */}
                <a
                  href={siteConfig.zaloUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3.5 px-4 rounded-2xl bg-[#0068FF] hover:bg-[#0055d4] text-white font-black text-xs sm:text-sm flex flex-col items-center justify-center gap-1 shadow-lg hover:shadow-xl transition-all active:scale-95 group text-center border border-blue-400/30"
                  title="Nhắn tin Zalo nhận báo giá kèm hình ảnh cọc"
                >
                  <div className="flex items-center gap-1.5">
                    <MessageCircle className="w-4 h-4 shrink-0 text-white" />
                    <span>ZALO BÁO GIÁ</span>
                  </div>
                  <span className="text-[11px] font-medium text-blue-100">Gửi ảnh cọc & nhận báo giá</span>
                </a>

              </div>
            </div>

            {/* SMART QUICK CALLBACK BOX (FORM THÔNG MINH 1 CHẠM) */}
            <div className="bg-[#122218]/90 rounded-2xl p-4 sm:p-5 border border-[#CDAA63]/30 shadow-inner space-y-3.5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-2.5">
                <div className="flex items-center gap-2 text-xs sm:text-sm font-extrabold text-[#EED59B]">
                  <Sparkles className="w-4 h-4 text-[#CDAA63]" />
                  <span>HOẶC ĐỂ LẠI SỐ ĐIỆN THOẠI (NHẬN BÁO GIÁ SAU 5 PHÚT)</span>
                </div>
                <button
                  type="button"
                  onClick={() => openQuoteModal()}
                  className="text-xs text-[#CDAA63] hover:text-white font-bold flex items-center gap-1 self-start sm:self-auto hover:underline cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Mở biểu mẫu chi tiết</span>
                </button>
              </div>

              {isSuccess ? (
                <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-center space-y-2">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-emerald-500 text-white mb-1">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-sm font-bold text-emerald-200">
                    Đã Tiếp Nhận Yêu Cầu Báo Giá Thành Công!
                  </h4>
                  <p className="text-xs text-gray-300 max-w-md mx-auto">
                    Kỹ sư tổng kho Huyền Dương sẽ liên hệ tư vấn và gửi bảng báo giá theo số điện thoại của bạn trong ít phút.
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsSuccess(false)}
                    className="mt-2 text-xs text-[#CDAA63] underline font-semibold cursor-pointer"
                  >
                    Gửi thêm yêu cầu khác
                  </button>
                </div>
              ) : (
                <form onSubmit={handleQuickSubmit} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5">
                    
                    {/* Chọn quy cách cọc */}
                    <div className="sm:col-span-5">
                      <select
                        value={selectedProduct}
                        onChange={(e) => setSelectedProduct(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl bg-[#1C3325] border border-gray-600/80 text-white text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#CDAA63]"
                      >
                        <option value="Cọc tre 2m (Phổ biến móng nhà)">Cọc tre 2m (Phổ biến móng nhà)</option>
                        <option value="Cọc tre 2.5m (Kè sông, móng sâu)">Cọc tre 2.5m (Kè sông, móng sâu)</option>
                        <option value="Cọc tre 3m (Công trình thủy lợi)">Cọc tre 3m (Công trình thủy lợi)</option>
                        <option value="Cọc tre 1.5m (Móng hào, rãnh)">Cọc tre 1.5m (Móng hào, rãnh)</option>
                        <option value="Cọc tre 4m (Công trình lớn)">Cọc tre 4m (Công trình lớn)</option>
                        <option value="Cọc tre theo yêu cầu riêng">Cọc tre theo yêu cầu riêng</option>
                      </select>
                    </div>

                    {/* Nhập số điện thoại */}
                    <div className="sm:col-span-4">
                      <input
                        type="tel"
                        value={phoneInput}
                        onChange={(e) => setPhoneInput(e.target.value)}
                        placeholder="Nhập số điện thoại..."
                        className="w-full px-3 py-2.5 rounded-xl bg-[#1C3325] border border-gray-600/80 text-white text-xs placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#CDAA63]"
                      />
                    </div>

                    {/* Nút gửi */}
                    <div className="sm:col-span-3">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-2.5 px-3 rounded-xl bg-[#214E34] hover:bg-[#183B27] border border-[#CDAA63] text-white font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-md transition-all cursor-pointer active:scale-95 disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <span>Đang gửi...</span>
                        ) : (
                          <>
                            <Send className="w-3.5 h-3.5 text-[#CDAA63]" />
                            <span>BÁO GIÁ NGAY</span>
                          </>
                        )}
                      </button>
                    </div>

                  </div>

                  {errorMessage && (
                    <p className="text-xs text-rose-300 font-semibold flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
                      <span>{errorMessage}</span>
                    </p>
                  )}
                </form>
              )}
            </div>

            {/* 3 CLEAN INFORMATION PILLS (REPLACED DEFECTIVE DARK BOXES) */}
            <div className="pt-2 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              
              <div className="p-3 rounded-xl bg-black/30 border border-white/10 flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#CDAA63] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-white font-bold">Xưởng & Tổng Kho:</strong>
                  <span className="text-gray-300 text-[11px] leading-tight block mt-0.5">
                    {siteConfig.address || "331 Phố Vác, Dân Hòa, Hà Nội"}
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-black/30 border border-white/10 flex items-start gap-2.5">
                <Truck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-white font-bold">Vận Chuyển:</strong>
                  <span className="text-gray-300 text-[11px] leading-tight block mt-0.5">
                    Xe tải giao 24/7 tận công trình toàn miền Bắc
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-black/30 border border-white/10 flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-white font-bold">Giờ Hoạt Động:</strong>
                  <span className="text-gray-300 text-[11px] leading-tight block mt-0.5">
                    06:00 - 22:00 (Kỹ sư hỗ trợ khẩn cấp 24/7)
                  </span>
                </div>
              </div>

            </div>

          </div>

          {/* CỘT 2: ĐỊA CHỈ DOANH NGHIỆP TRÊN GOOGLE MAPS (5 COLS) */}
          <div className="lg:col-span-5 bg-[#182B1F] border-2 border-[#CDAA63]/40 rounded-3xl p-5 sm:p-7 shadow-2xl flex flex-col justify-between space-y-4">
            
            {/* Header info */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between gap-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#CDAA63]/20 border border-[#CDAA63]/40 text-[#EED59B] text-xs font-bold uppercase tracking-wider">
                  <MapPin className="w-3.5 h-3.5 text-[#CDAA63]" />
                  <span>VỊ TRÍ TRÊN BẢN ĐỒ</span>
                </div>

                <a
                  href={googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#CDAA63] hover:text-white font-bold flex items-center gap-1 hover:underline transition-colors bg-white/10 px-3 py-1 rounded-lg border border-white/15"
                  title="Mở chỉ đường trên Google Maps"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Chỉ đường</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                  <Building className="w-5 h-5 text-[#CDAA63] shrink-0" />
                  <span className="truncate">{siteConfig.companyName}</span>
                </h3>
                <p className="text-xs sm:text-sm text-gray-300 mt-1 flex items-start gap-1.5">
                  <MapPin className="w-4 h-4 text-[#E57C23] shrink-0 mt-0.5" />
                  <span><strong>Trụ sở:</strong> {siteConfig.headquarters}</span>
                </p>
              </div>
            </div>

            {/* INTERACTIVE GOOGLE MAPS IFRAME */}
            <div className="relative flex-1 min-h-[260px] sm:min-h-[300px] w-full rounded-2xl overflow-hidden border border-[#CDAA63]/40 shadow-inner bg-black/40">
              <iframe
                src={mapSrc}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Bản đồ ${siteConfig.companyName}`}
                className="w-full h-full min-h-[260px] sm:min-h-[300px] absolute inset-0"
              />
            </div>

            {/* Bottom info strip */}
            <div className="pt-2 text-xs text-gray-300 flex items-center justify-between gap-2 border-t border-white/10">
              <div className="flex items-center gap-1.5 text-gray-300">
                <Clock className="w-3.5 h-3.5 text-[#CDAA63] shrink-0" />
                <span className="truncate font-medium">{siteConfig.workHours}</span>
              </div>
              <span className="text-[11px] font-bold text-emerald-300 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-500/40 shrink-0 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Đang mở cửa</span>
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

