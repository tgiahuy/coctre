"use client";

import React from "react";
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
} from "lucide-react";
import { useSiteConfig } from "@/lib/configStore";

function cleanMapUrl(input: string): string {
  if (!input) {
    return "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3725.1953284097457!2d105.7820123!3d20.9848149!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135accf12b7a977%3A0x4a9b407ebaf42f1b!2zMjI4IFRoYW5oIELDrG5oLCBN4buZIExhbywgSMOgIMSQw7RuZywgSMOgIE7hu5lp!5e0!3m2!1svi!2s!4v1700000000000!5m2!1svi!2s";
  }
  const match = input.match(/src=["'](.*?)["']/);
  if (match && match[1]) {
    return match[1];
  }
  return input.trim();
}

export default function DirectContactSection() {
  const siteConfig = useSiteConfig();
  const mapSrc = cleanMapUrl(siteConfig.mapEmbedUrl);
  const googleMapsDirectionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    siteConfig.headquarters || "Số 16, ngõ 228 Thanh Bình, Mộ Lao, Hà Đông, Hà Nội"
  )}`;

  return (
    <section className="py-12 sm:py-18 bg-[#14261B] text-white" id="lien-he-truc-tiep">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 2-COLUMN GRID: Ô BÁO GIÁ (BÊN TRÁI) & GOOGLE MAPS (BÊN PHẢI) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          
          {/* CỘT 1: Ô BÁO GIÁ VÀ TƯ VẤN (7 COLS) */}
          <div className="lg:col-span-7 bg-[#1C3325] border-2 border-[#CDAA63]/50 rounded-3xl p-6 sm:p-10 shadow-2xl flex flex-col justify-between space-y-6">
            <div className="space-y-5 text-center lg:text-left">
              
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#CDAA63]/20 border border-[#CDAA63]/40 text-[#CDAA63] text-xs sm:text-sm font-extrabold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                <span>TƯ VẤN & BÁO GIÁ TRỰC TIẾP 24/7</span>
              </div>

              <h2 className="text-2xl sm:text-3xl xl:text-4xl font-black text-white leading-tight">
                Bác Cần Báo Giá Cọc Tre Hoặc Tư Vấn Kỹ Thuật Nền Móng?
              </h2>

              <p className="text-sm sm:text-base text-gray-300 font-medium leading-relaxed">
                Không cần điền form phức tạp! Quý khách chỉ cần bấm gọi trực tiếp hoặc nhắn tin Zalo, kỹ sư của chúng tôi sẽ tư vấn loại cọc phù hợp và báo giá tại chân công trình ngay lập tức.
              </p>

              {/* 2 BIG ACTION BUTTONS */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3.5">
                <a
                  href={`tel:${siteConfig.hotline}`}
                  className="flex-1 py-4 px-5 rounded-2xl bg-[#E57C23] hover:bg-[#CC6914] text-white font-black text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-xl transition-all active:scale-95 group"
                >
                  <Phone className="w-5 h-5 animate-pulse shrink-0" />
                  <span className="truncate">GỌI ĐIỆN NGAY: {siteConfig.hotlineFormatted}</span>
                </a>

                <a
                  href={siteConfig.zaloUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-4 px-5 rounded-2xl bg-[#0068FF] hover:bg-[#0052cc] text-white font-black text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-xl transition-all active:scale-95 group"
                >
                  <MessageCircle className="w-5 h-5 shrink-0" />
                  <span className="truncate">NHẮN TIN ZALO NHẬN BÁO GIÁ</span>
                </a>
              </div>
            </div>

            {/* Warehouse addresses */}
            <div className="pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-left text-xs sm:text-sm text-gray-300">
              <div className="p-3.5 rounded-xl bg-black/25 border border-white/5 space-y-1">
                <div className="flex items-center gap-2 font-bold text-[#CDAA63]">
                  <Warehouse className="w-4 h-4 shrink-0" />
                  <span>Tổng Kho Hòa Bình:</span>
                </div>
                <p className="text-gray-300 line-clamp-2">{siteConfig.warehouse1}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-black/25 border border-white/5 space-y-1">
                <div className="flex items-center gap-2 font-bold text-[#CDAA63]">
                  <Warehouse className="w-4 h-4 shrink-0" />
                  <span>Kho Trung Chuyển Hà Nội:</span>
                </div>
                <p className="text-gray-300 line-clamp-2">{siteConfig.warehouse2}</p>
              </div>
            </div>

          </div>

          {/* CỘT 2: ĐỊA CHỈ DOANH NGHIỆP TRÊN GOOGLE MAPS (5 COLS) */}
          <div className="lg:col-span-5 bg-[#1C3325] border-2 border-[#CDAA63]/50 rounded-3xl p-5 sm:p-7 shadow-2xl flex flex-col justify-between space-y-4">
            
            {/* Header info */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between gap-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#CDAA63]/20 border border-[#CDAA63]/40 text-[#CDAA63] text-xs font-bold uppercase tracking-wider">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>VỊ TRÍ TRÊN BẢN ĐỒ</span>
                </div>

                <a
                  href={googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#CDAA63] hover:text-white font-bold flex items-center gap-1 hover:underline transition-colors"
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
              <div className="flex items-center gap-1.5 text-gray-400">
                <Clock className="w-3.5 h-3.5 text-[#CDAA63] shrink-0" />
                <span className="truncate">{siteConfig.workHours}</span>
              </div>
              <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30 shrink-0">
                ● Đang mở cửa
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
