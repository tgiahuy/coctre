"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle, ArrowRight, FileText, Ruler, CircleDot } from "lucide-react";
import { Product } from "@/data/products";
import { useQuoteModal } from "@/context/QuoteModalContext";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { openQuoteModal } = useQuoteModal();

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group hover:-translate-y-1">
      {/* CARD IMAGE CONTAINER */}
      <Link
        href={`/san-pham/${product.slug}`}
        className="relative block aspect-[4/3] overflow-hidden bg-[#18231C]/10"
      >
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Stock Badge */}
        <div className="absolute top-3 left-3 bg-[#214E34]/90 backdrop-blur-sm text-[#EED59B] text-[11px] font-bold px-3 py-1 rounded-full flex items-center gap-1 border border-[#CDAA63]/40 shadow-sm">
          <CheckCircle className="w-3.5 h-3.5 text-[#CDAA63]" />
          <span>{product.stockStatus}</span>
        </div>

        {/* Length Pill */}
        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm text-[#214E34] text-xs font-extrabold px-3 py-1 rounded-lg shadow-sm border border-gray-100">
          Dài {product.length}
        </div>
      </Link>

      {/* CARD CONTENT */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <Link href={`/san-pham/${product.slug}`} className="block group-hover:text-[#214E34]">
            <h3 className="text-lg font-bold text-[#18231C] leading-snug group-hover:text-[#214E34] transition-colors">
              {product.name}
            </h3>
          </Link>

          {/* Key specs highlight */}
          <div className="mt-3 grid grid-cols-2 gap-2 text-xs py-2.5 px-3 bg-[#F7F5EF] rounded-xl border border-[#E7E3D8]">
            <div className="flex items-center gap-1.5 text-gray-700">
              <Ruler className="w-3.5 h-3.5 text-[#214E34] shrink-0" />
              <span>Đ.kính: <strong>{product.diameter}</strong></span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-700">
              <CircleDot className="w-3.5 h-3.5 text-[#CDAA63] shrink-0" />
              <span className="truncate">Loại: <strong>{product.bambooType.split(',')[0]}</strong></span>
            </div>
          </div>

          <p className="mt-3 text-xs sm:text-sm text-[#686868] line-clamp-2 leading-relaxed">
            {product.shortDescription}
          </p>
        </div>

        {/* ACTIONS (NO ADD TO CART - ONLY DETAILS & QUOTE) */}
        <div className="mt-5 pt-4 border-t border-gray-100 grid grid-cols-2 gap-2">
          <Link
            href={`/san-pham/${product.slug}`}
            className="w-full py-2.5 px-3 rounded-lg border border-[#214E34] text-[#214E34] hover:bg-[#214E34] hover:text-white font-bold text-xs text-center flex items-center justify-center gap-1 transition-colors"
          >
            <span>XEM CHI TIẾT</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          <button
            onClick={() => openQuoteModal(product.slug)}
            className="w-full py-2.5 px-3 rounded-lg bg-[#E57C23] hover:bg-[#CC6914] text-white font-bold text-xs text-center flex items-center justify-center gap-1 transition-colors shadow-sm cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>BÁO GIÁ</span>
          </button>
        </div>
      </div>
    </div>
  );
}
