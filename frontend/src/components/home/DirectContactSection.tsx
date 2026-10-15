"use client";

import React from "react";
import { Phone, MessageCircle, MapPin, Clock, ShieldCheck, Warehouse } from "lucide-react";
import { useSiteConfig } from "@/lib/configStore";

export default function DirectContactSection() {
  const siteConfig = useSiteConfig();
  return (
    <section className="py-14 sm:py-20 bg-[#14261B] text-white" id="lien-he-truc-tiep">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#1C3325] border-2 border-[#CDAA63]/50 rounded-3xl p-6 sm:p-12 shadow-2xl">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#CDAA63]/20 border border-[#CDAA63]/40 text-[#CDAA63] text-xs sm:text-sm font-extrabold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              TƯ VẤN & BÁO GIÁ TRỰC TIẾP 24/7
            </div>

            <h2 className="text-2xl sm:text-4xl font-black text-white leading-tight">
              Bác Cần Báo Giá Cọc Tre Hoặc Tư Vấn Kỹ Thuật Nền Móng?
            </h2>

            <p className="text-sm sm:text-base text-gray-300 font-medium">
              Không cần điền form phức tạp! Quý khách chỉ cần bấm gọi trực tiếp hoặc nhắn tin Zalo, kỹ sư của chúng tôi sẽ tư vấn loại cọc phù hợp và báo giá tại chân công trình ngay lập tức.
            </p>

            {/* 2 BIG ACTION BUTTONS */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={`tel:${siteConfig.hotline}`}
                className="w-full sm:w-auto px-8 py-4 sm:py-5 rounded-2xl bg-[#E57C23] hover:bg-[#CC6914] text-white font-black text-base sm:text-lg flex items-center justify-center gap-3 shadow-xl transform transition-transform active:scale-95"
              >
                <Phone className="w-6 h-6 animate-pulse" />
                <span>GỌI ĐIỆN NGAY: {siteConfig.hotlineFormatted}</span>
              </a>

              <a
                href={siteConfig.zaloUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-4 sm:py-5 rounded-2xl bg-[#0068FF] hover:bg-[#0052cc] text-white font-black text-base sm:text-lg flex items-center justify-center gap-3 shadow-xl transform transition-transform active:scale-95"
              >
                <MessageCircle className="w-6 h-6" />
                <span>NHẮN TIN ZALO NHẬN BÁO GIÁ</span>
              </a>
            </div>

            {/* Warehouse addresses */}
            <div className="pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-4 text-left text-xs sm:text-sm text-gray-300">
              <div className="p-4 rounded-xl bg-black/20 border border-white/5 space-y-1">
                <div className="flex items-center gap-2 font-bold text-[#CDAA63]">
                  <Warehouse className="w-4 h-4" />
                  <span>Tổng Kho Hòa Bình:</span>
                </div>
                <p className="text-gray-300">{siteConfig.warehouse1}</p>
              </div>

              <div className="p-4 rounded-xl bg-black/20 border border-white/5 space-y-1">
                <div className="flex items-center gap-2 font-bold text-[#CDAA63]">
                  <Warehouse className="w-4 h-4" />
                  <span>Kho Trung Chuyển Hà Nội:</span>
                </div>
                <p className="text-gray-300">{siteConfig.warehouse2}</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
