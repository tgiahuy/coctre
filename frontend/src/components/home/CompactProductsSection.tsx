"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Phone, MessageCircle, ArrowRight, CheckCircle2 } from "lucide-react";
import { siteConfig } from "@/data/config";
import { useQuoteModal } from "@/context/QuoteModalContext";

export default function CompactProductsSection() {
  const { openQuoteModal } = useQuoteModal();

  const products = [
    {
      id: "coc-tre-3m",
      slug: "coc-tre-3m",
      title: "CỌC TRE 3M",
      spec: "Ø 80 - 100 mm",
      image: "/images/products/coc-tre-3m-1.webp",
      highlight: "Kè sông, móng sâu",
    },
    {
      id: "coc-tre-25m",
      slug: "coc-tre-25m",
      title: "CỌC TRE 2.5M",
      spec: "Ø 70 - 90 mm",
      image: "/images/products/coc-tre-25m-1.webp",
      highlight: "Móng nhà phố 3-4 tầng",
    },
    {
      id: "coc-tre-2m",
      slug: "coc-tre-2m",
      title: "CỌC TRE 2M",
      spec: "Ø 60 - 80 mm",
      image: "/images/products/coc-tre-2m-1.webp",
      highlight: "Phổ biến móng nhà dân",
    },
    {
      id: "coc-tre-15m",
      slug: "coc-tre-15m",
      title: "CỌC TRE 1.5M",
      spec: "Ø 50 - 70 mm",
      image: "/images/products/coc-tre-15m-1.webp",
      highlight: "Gia cố mương rãnh",
    },
  ];

  return (
    <section className="py-10 sm:py-14 bg-[#FAF9F5] border-t border-b border-gray-200" id="san-pham-noi-bat">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* GREEN RIBBON HEADER (Exact style as user's photo) */}
        <div className="relative flex items-center justify-center mb-8 sm:mb-10">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t-2 border-[#214E34]/30" />
          </div>
          <div className="relative">
            {/* Hexagon/Ribbon shaped badge */}
            <div className="relative bg-[#214E34] text-white px-8 sm:px-12 py-2 sm:py-2.5 font-black text-sm sm:text-base tracking-wider uppercase shadow-md flex items-center gap-2 clip-ribbon">
              <span>SẢN PHẨM NỔI BẬT</span>
            </div>
          </div>
        </div>

        {/* 4 HORIZONTAL COMPACT PRODUCT CARDS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {products.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-3 sm:p-4 border border-gray-200 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between text-center group"
            >
              {/* Product Image */}
              <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 mb-3 border border-gray-100">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm text-white text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded">
                  {item.spec}
                </div>
              </div>

              {/* Title & Info */}
              <div className="space-y-1 mb-3">
                <h3 className="text-sm sm:text-base font-black text-[#18231C] uppercase tracking-wide">
                  {item.title}
                </h3>
                <p className="text-[11px] sm:text-xs text-gray-500 font-medium">
                  {item.highlight}
                </p>
              </div>

              {/* Order Pill Button (Like in photo) */}
              <div className="space-y-2 pt-1">
                <button
                  onClick={() => openQuoteModal()}
                  className="w-full py-2 sm:py-2.5 px-3 rounded-full border-2 border-[#214E34] text-[#214E34] hover:bg-[#214E34] hover:text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer group-hover:bg-[#214E34] group-hover:text-white shadow-sm"
                >
                  <ShoppingCart className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span>BÁO GIÁ NGAY</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Small Bottom Info Bar */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm text-gray-600 bg-white p-3.5 rounded-xl border border-gray-200 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
            <span>Có sẵn cọc 4m, 5m hoặc nhận chặt vát theo yêu cầu kỹ thuật từng công trình.</span>
          </div>
          <a
            href={`tel:${siteConfig.hotline}`}
            className="font-bold text-[#E57C23] hover:underline flex items-center gap-1 shrink-0"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Hotline bãi cọc: {siteConfig.hotlineFormatted}</span>
          </a>
        </div>

      </div>
    </section>
  );
}
