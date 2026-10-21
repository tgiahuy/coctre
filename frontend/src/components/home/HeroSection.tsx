"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  Truck,
  PhoneCall,
  FileText,
  CheckCircle2,
  Phone,
  ArrowRight,
  Sparkles,
  TreeDeciduous,
  Layers
} from "lucide-react";
import { useSiteConfig } from "@/lib/configStore";
import { useQuoteModal } from "@/context/QuoteModalContext";

export default function HeroSection() {
  const siteConfig = useSiteConfig();
  const { openQuoteModal } = useQuoteModal();

  return (
    <section className="relative min-h-[580px] lg:min-h-[640px] flex items-center bg-[#183925] text-white overflow-hidden">
      {/* Background Natural Bamboo Forest */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/banner/hero-bg.jpg"
          alt="Rừng tre già nguyên liệu cọc tre Huyền Dương"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-40 scale-105 transition-transform duration-1000"
        />
        {/* Soft Green Gradient Overlay for readability and fresh natural tone */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0E2417]/95 via-[#183B26]/85 to-[#0E2417]/60 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#13281C] via-transparent to-[#0E2417]/40 z-10" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-14 relative z-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
          
          {/* LEFT: BRANDING & HEADLINE */}
          <div className="lg:col-span-7 space-y-3.5 sm:space-y-6">
            
            {/* Tagline / Badge */}
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-[#3D794E]/40 border border-[#7BB661]/40 text-[#A3E635] text-[10.5px] sm:text-xs font-black tracking-wider uppercase backdrop-blur-md shadow-sm">
              <TreeDeciduous className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#84CC16]" />
              <span>HƠN 30 NĂM KINH NGHIỆM • DÂN HÒA, HÀ NỘI</span>
            </div>

            {/* Artistic Main Heading */}
            <div className="space-y-1 sm:space-y-2">
              <h1 className="text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-black tracking-tight text-white leading-tight drop-shadow-md">
                <span className="block text-[#CBEA7B] font-black tracking-tight mb-0.5">
                  Cọc Tre Huyền Dương
                </span>
                <span className="text-white drop-shadow-sm">
                  Gia Cố Nền Móng Vững Chắc
                </span>
              </h1>

              {/* Green Pill Badge with Customer Main Message (Desktop & Tablet) */}
              <div className="hidden sm:inline-block mt-3 px-5 py-2.5 rounded-full bg-[#3B7A33]/90 text-white font-extrabold text-xs sm:text-sm md:text-base border border-[#68B854]/60 shadow-lg backdrop-blur-sm">
                Giao Hàng Tận Chân Công Trình &bull; Hỗ Trợ Bốc Xếp &bull; Chiết Khấu Cao
              </div>
            </div>

            {/* Subheadline / Intro */}
            <p className="text-xs sm:text-base text-gray-200 max-w-xl leading-relaxed font-medium">
              Chuyên cung cấp cọc tre già tuyển chọn từ 1.5m – 4m & theo yêu cầu. Giao hàng tận chân công trình trong ngày toàn miền Bắc, giá tận xưởng, đủ quy cách.
            </p>

            {/* DESKTOP ONLY: 3 Value Highlights */}
            <div className="hidden lg:grid grid-cols-3 gap-3 pt-1">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-100 bg-white/10 px-3 py-2 rounded-xl backdrop-blur-sm border border-white/10">
                <CheckCircle2 className="w-4 h-4 text-[#A3E635] shrink-0" />
                <span>Giao hàng trong ngày</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-100 bg-white/10 px-3 py-2 rounded-xl backdrop-blur-sm border border-white/10">
                <CheckCircle2 className="w-4 h-4 text-[#A3E635] shrink-0" />
                <span>Hỗ trợ bốc xếp tận nơi</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-100 bg-white/10 px-3 py-2 rounded-xl backdrop-blur-sm border border-white/10">
                <CheckCircle2 className="w-4 h-4 text-[#A3E635] shrink-0" />
                <span>Chiết khấu cao đơn lớn</span>
              </div>
            </div>

            {/* DESKTOP ONLY: CTA BUTTONS */}
            <div className="hidden lg:flex flex-wrap items-center gap-3.5 pt-3">
              <button
                onClick={() => openQuoteModal()}
                className="px-6 sm:px-8 py-3.5 sm:py-4 bg-[#E57C23] hover:bg-[#CC6914] text-white font-black text-sm sm:text-base rounded-xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer"
              >
                <FileText className="w-5 h-5" />
                <span>NHẬN BÁO GIÁ TẬN XƯỞNG</span>
              </button>

              <Link
                href="/gioi-thieu"
                className="px-5 sm:px-6 py-3.5 sm:py-4 bg-[#234E34]/80 hover:bg-[#183B27] text-white font-bold text-sm sm:text-base rounded-xl border border-[#528C63] transition-all flex items-center justify-center gap-2 backdrop-blur-sm"
              >
                <span>VỀ CHÚNG TÔI</span>
                <ArrowRight className="w-4 h-4 text-[#A3E635]" />
              </Link>
            </div>

            {/* DESKTOP ONLY: Hotline Quick Callout */}
            <div className="hidden lg:flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-300 pt-1">
              <span>Hotline / Zalo tư vấn 24/7:</span>
              <a
                href={`tel:${siteConfig.hotline}`}
                className="font-extrabold text-[#CDAA63] hover:text-white transition-colors flex items-center gap-1"
              >
                <Phone className="w-3.5 h-3.5 text-[#E57C23]" />
                {siteConfig.hotlineFormatted}
              </a>
              <span className="text-gray-400">•</span>
              <a
                href={`tel:${siteConfig.hotline2 || "0912468203"}`}
                className="font-extrabold text-[#CDAA63] hover:text-white transition-colors flex items-center gap-1"
              >
                <Phone className="w-3.5 h-3.5 text-[#E57C23]" />
                {siteConfig.hotline2Formatted || "0912.468.203"}
              </a>
            </div>

            {/* MOBILE & TABLET: SIDE-BY-SIDE (COMPACT HIGHLIGHTS & VISUAL SLICES) */}
            <div className="grid grid-cols-12 gap-2 sm:gap-4 items-stretch lg:hidden pt-1">
              {/* Left Column: 3 Highlights + 2 Buttons + Hotline */}
              <div className="col-span-7 flex flex-col justify-between space-y-2">
                {/* 3 Value Highlights */}
                <div className="space-y-1">
                  <div className="flex items-center gap-1 text-[10px] min-[380px]:text-[11px] font-semibold text-gray-100 bg-white/10 px-2 py-1 rounded-lg backdrop-blur-sm border border-white/10">
                    <CheckCircle2 className="w-3 h-3 text-[#A3E635] shrink-0" />
                    <span className="truncate">Giao hàng trong ngày</span>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] min-[380px]:text-[11px] font-semibold text-gray-100 bg-white/10 px-2 py-1 rounded-lg backdrop-blur-sm border border-white/10">
                    <CheckCircle2 className="w-3 h-3 text-[#A3E635] shrink-0" />
                    <span className="truncate">Hỗ trợ bốc xếp tận nơi</span>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] min-[380px]:text-[11px] font-semibold text-gray-100 bg-white/10 px-2 py-1 rounded-lg backdrop-blur-sm border border-white/10">
                    <CheckCircle2 className="w-3 h-3 text-[#A3E635] shrink-0" />
                    <span className="truncate">Chiết khấu cao đơn lớn</span>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="space-y-1.5 pt-0.5">
                  <button
                    onClick={() => openQuoteModal()}
                    className="w-full py-2 px-2 bg-[#E57C23] hover:bg-[#CC6914] text-white font-black text-[11.5px] min-[380px]:text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-1 cursor-pointer leading-tight text-center"
                  >
                    <FileText className="w-3.5 h-3.5 shrink-0" />
                    <span>BÁO GIÁ TẬN XƯỞNG</span>
                  </button>

                  <Link
                    href="/gioi-thieu"
                    className="w-full py-1.5 px-2 bg-[#234E34]/80 hover:bg-[#183B27] text-white font-bold text-[11px] min-[380px]:text-[11.5px] rounded-xl border border-[#528C63] transition-all flex items-center justify-center gap-1 backdrop-blur-sm leading-tight text-center"
                  >
                    <span>VỀ CHÚNG TÔI</span>
                    <ArrowRight className="w-3 h-3 text-[#A3E635] shrink-0" />
                  </Link>
                </div>

                {/* Hotline Quick Callout */}
                <div className="text-[9.5px] min-[380px]:text-[10.5px] text-gray-300 leading-tight">
                  <span className="text-gray-400 block text-[8.5px]">Hotline 24/7:</span>
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 pt-0.5">
                    <a
                      href={`tel:${siteConfig.hotline}`}
                      className="font-extrabold text-[#CDAA63] hover:text-white transition-colors flex items-center gap-1 whitespace-nowrap"
                    >
                      <Phone className="w-2.5 h-2.5 text-[#E57C23] shrink-0" />
                      {siteConfig.hotlineFormatted}
                    </a>
                    <a
                      href={`tel:${siteConfig.hotline2 || "0912468203"}`}
                      className="font-extrabold text-[#CDAA63] hover:text-white transition-colors flex items-center gap-1 whitespace-nowrap"
                    >
                      <Phone className="w-2.5 h-2.5 text-[#CDAA63] shrink-0" />
                      {siteConfig.hotline2Formatted || "0912.468.203"}
                    </a>
                  </div>
                </div>
              </div>

              {/* Right Column: 2 Overlapping Bamboo Images & Badge */}
              <div className="col-span-5 relative min-h-[220px] sm:min-h-[260px] flex items-center justify-end">
                {/* First Diagonal Image Slice */}
                <div 
                  className="absolute right-8 min-[380px]:right-10 sm:right-14 top-0 bottom-5 w-[65px] min-[380px]:w-[76px] sm:w-[100px] rounded-xl overflow-hidden shadow-xl border-2 border-white/85 transform -skew-x-6 z-10"
                >
                  <Image
                    src="/images/banner/bamboo-vertical.jpg"
                    alt="Rừng tre cọc già tuyển chọn"
                    fill
                    sizes="(max-width: 640px) 100px, 150px"
                    className="object-cover transform skew-x-6 scale-115"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-1 inset-x-0.5 text-center text-[6.5px] min-[380px]:text-[7.5px] font-bold text-white bg-black/50 py-0.5 rounded backdrop-blur-sm truncate">
                    Cọc Tuyển Chọn
                  </div>
                </div>

                {/* Second Diagonal Image Slice */}
                <div 
                  className="absolute right-0 top-2.5 bottom-2.5 w-[70px] min-[380px]:w-[82px] sm:w-[110px] rounded-xl overflow-hidden shadow-2xl border-2 border-[#7BB661]/90 transform -skew-x-6 z-20"
                >
                  <Image
                    src="/images/banner/bamboo-poles.jpg"
                    alt="Bó cọc tre tại bãi tập kết"
                    fill
                    sizes="(max-width: 640px) 120px, 160px"
                    className="object-cover transform skew-x-6 scale-115"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#13281C]/80 via-transparent to-transparent" />
                  <div className="absolute bottom-1 inset-x-0.5 text-center text-[6.5px] min-[380px]:text-[7.5px] font-bold text-[#A3E635] bg-black/60 py-0.5 rounded backdrop-blur-sm truncate">
                    Bãi 50.000+ Cọc
                  </div>
                </div>

                {/* Quality Badge */}
                <div className="absolute -bottom-1 left-0 right-0 z-30 bg-[#14261B]/95 border border-[#7BB661] p-1 min-[380px]:p-1.5 rounded-xl shadow-xl backdrop-blur-md flex items-center gap-1">
                  <div className="w-4 h-4 min-[380px]:w-5 min-[380px]:h-5 rounded bg-[#2D663B] text-[#A3E635] flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-3 h-3 min-[380px]:w-3.5 min-[380px]:h-3.5" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[6.5px] min-[380px]:text-[7px] uppercase tracking-wider text-[#A3E635] font-black block leading-none">
                      Chất lượng cao
                    </span>
                    <span className="text-[7.5px] min-[380px]:text-[8.5px] font-bold text-white leading-tight block truncate">
                      Tre Đực Đặc Ruột
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* DESKTOP ONLY: RIGHT DIAGONAL VISUAL SLICES */}
          <div className="hidden lg:block lg:col-span-5 relative">
            <div className="relative h-[340px] sm:h-[400px] w-full flex items-center justify-center">
              
              {/* First Diagonal Image Slice */}
              <div 
                className="absolute right-24 sm:right-32 top-0 bottom-0 w-[140px] sm:w-[180px] rounded-2xl overflow-hidden shadow-2xl border-4 border-white/80 transform -skew-x-12 hover:skew-x-0 transition-all duration-500 z-10 group"
              >
                <Image
                  src="/images/banner/bamboo-vertical.jpg"
                  alt="Rừng tre cọc già tuyển chọn"
                  fill
                  sizes="200px"
                  className="object-cover transform skew-x-12 group-hover:skew-x-0 scale-125 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-2 right-2 text-center text-[10px] sm:text-xs font-bold text-white bg-black/40 py-1 rounded backdrop-blur-sm">
                  Cọc Thẳng Tuyển Chọn
                </div>
              </div>

              {/* Second Diagonal Image Slice */}
              <div 
                className="absolute right-0 top-6 bottom-6 w-[150px] sm:w-[190px] rounded-2xl overflow-hidden shadow-2xl border-4 border-[#7BB661]/80 transform -skew-x-12 hover:skew-x-0 transition-all duration-500 z-20 group"
              >
                <Image
                  src="/images/banner/bamboo-poles.jpg"
                  alt="Bó cọc tre tại bãi tập kết"
                  fill
                  sizes="220px"
                  className="object-cover transform skew-x-12 group-hover:skew-x-0 scale-125 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#13281C]/70 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-2 right-2 text-center text-[10px] sm:text-xs font-bold text-[#A3E635] bg-black/50 py-1 rounded backdrop-blur-sm">
                  Bãi Tập Kết 50.000+ Cọc
                </div>
              </div>

              {/* Floating Quality Badge */}
              <div className="absolute -bottom-2 left-4 sm:left-12 z-30 bg-[#14261B]/95 border-2 border-[#7BB661] p-3.5 rounded-2xl shadow-2xl backdrop-blur-md flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#2D663B] text-[#A3E635] flex items-center justify-center font-black">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-[#A3E635] font-black block">
                    Đảm bảo chất lượng
                  </span>
                  <span className="text-xs font-bold text-white">
                    Tre Đực Đặc Ruột 100%
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
