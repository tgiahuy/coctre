"use client";

import React, { useState, useEffect } from "react";
import { Phone, MessageCircle, ArrowUp } from "lucide-react";
import { useSiteConfig } from "@/lib/configStore";
import { useQuoteModal } from "@/context/QuoteModalContext";

export default function FloatingContact() {
  const siteConfig = useSiteConfig();
  const [showBackToTop, setShowBackToTop] = useState(false);
  const { openQuoteModal } = useQuoteModal();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {/* DESKTOP & TABLET FLOATING BUTTONS (RIGHT SIDE) */}
      <div className="fixed right-4 sm:right-6 bottom-24 md:bottom-8 z-40 flex flex-col items-end space-y-3 pointer-events-auto">
        {/* Zalo Button */}
        <a
          href={siteConfig.zaloUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2 bg-[#0068FF] hover:bg-[#0052cc] text-white p-3.5 sm:px-5 sm:py-3.5 rounded-full shadow-2xl transition-all transform hover:scale-105 border-2 border-white cursor-pointer"
          title="Chat Zalo nhận báo giá ngay"
        >
          <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
          <span className="hidden sm:inline-block font-extrabold text-sm uppercase tracking-wider">
            Chat Zalo Báo Giá
          </span>
        </a>

        {/* Phone Button */}
        <a
          href={`tel:${siteConfig.hotline}`}
          className="ring-pulse-btn flex items-center gap-2 bg-[#E57C23] hover:bg-[#CC6914] text-white p-3.5 sm:px-5 sm:py-3.5 rounded-full shadow-2xl transition-all transform hover:scale-105 border-2 border-white cursor-pointer"
          title="Gọi Hotline tư vấn"
        >
          <Phone className="w-5 h-5 sm:w-6 sm:h-6 animate-bounce" />
          <div className="hidden sm:flex flex-col text-left">
            <span className="text-[11px] font-bold text-orange-100 uppercase tracking-wider leading-none">
              Hotline 24/7 (Gọi Ngay)
            </span>
            <span className="text-base font-black leading-tight">
              {siteConfig.hotlineFormatted}
            </span>
          </div>
        </a>

        {/* Back to top button */}
        {showBackToTop && (
          <button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-full bg-[#18231C]/90 hover:bg-[#18231C] text-[#CDAA63] flex items-center justify-center shadow-lg transition-all transform hover:-translate-y-1 border border-gray-700 cursor-pointer"
            aria-label="Về đầu trang"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* MOBILE STICKY BOTTOM BAR (Tối ưu riêng cho người lớn tuổi: Nút to, chữ rõ, 2 nút chính) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#121E16] border-t-2 border-[#CDAA63] px-3 py-2.5 flex items-center justify-between gap-3 shadow-[0_-6px_25px_rgba(0,0,0,0.5)]">
        {/* Call Button: Large & High Contrast */}
        <a
          href={`tel:${siteConfig.hotline}`}
          className="flex-1 bg-[#E57C23] text-white py-3 px-3 rounded-xl font-black text-sm flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-transform"
        >
          <Phone className="w-5 h-5 text-white animate-pulse" />
          <span>GỌI: {siteConfig.hotlineFormatted}</span>
        </a>

        {/* Zalo Button: Large */}
        <a
          href={siteConfig.zaloUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 bg-[#0068FF] text-white py-3 px-3 rounded-xl font-black text-sm flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-transform"
        >
          <MessageCircle className="w-5 h-5" />
          <span>NHẮN ZALO</span>
        </a>
      </div>
    </>
  );
}
