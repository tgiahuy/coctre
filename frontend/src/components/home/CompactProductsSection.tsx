"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShoppingCart,
  Phone,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Layers,
  Ruler,
} from "lucide-react";
import { useSiteConfig } from "@/lib/configStore";
import { useQuoteModal } from "@/context/QuoteModalContext";
import { useProducts } from "@/lib/productStore";
import { Product } from "@/data/products";

export default function CompactProductsSection() {
  const siteConfig = useSiteConfig();
  const { openQuoteModal } = useQuoteModal();
  const allProducts = useProducts();

  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);

  // Update scroll buttons visibility, total pages & active page
  const updateScrollState = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    const maxScroll = scrollWidth - clientWidth;

    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < maxScroll - 10);

    if (maxScroll <= 10) {
      setPageCount(1);
      setCurrentPage(0);
      return;
    }

    const card = scrollRef.current.querySelector(".product-card-item") as HTMLElement | null;
    const cardWidth = card ? card.offsetWidth + 16 : 280;
    const visibleCards = Math.max(1, Math.round(clientWidth / cardWidth));

    // Dynamic page count matching visible screen views
    const pages = Math.max(2, Math.ceil(allProducts.length / visibleCards));
    setPageCount(pages);

    // Calculate active page based on scroll progress
    const progress = Math.max(0, Math.min(1, scrollLeft / maxScroll));
    const active = Math.min(Math.round(progress * (pages - 1)), pages - 1);
    setCurrentPage(active);
  };

  useEffect(() => {
    updateScrollState();
    window.addEventListener("resize", updateScrollState);
    return () => window.removeEventListener("resize", updateScrollState);
  }, [allProducts]);

  // Handle smooth scroll Left or Right
  const handleScroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const { scrollWidth, clientWidth, scrollLeft } = container;
    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll <= 0) return;

    const card = container.querySelector(".product-card-item") as HTMLElement | null;
    const cardWidth = card ? card.offsetWidth + 16 : 280;
    const scrollAmount = Math.max(cardWidth, clientWidth * 0.75);

    if (direction === "left") {
      if (scrollLeft <= 10) {
        container.scrollTo({ left: maxScroll, behavior: "smooth" });
      } else {
        container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      }
    } else {
      if (scrollLeft >= maxScroll - 10) {
        container.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        container.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }
  };

  // Scroll to a specific page index
  const scrollToPage = (pageIndex: number) => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const { scrollWidth, clientWidth } = container;
    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll <= 0) return;

    if (pageCount <= 1) {
      container.scrollTo({ left: 0, behavior: "smooth" });
      return;
    }

    const targetScroll = (pageIndex / (pageCount - 1)) * maxScroll;
    container.scrollTo({ left: targetScroll, behavior: "smooth" });
  };

  // Helper to extract a friendly short highlight
  const getProductHighlight = (p: Product) => {
    if (p.applications && p.applications.length > 0) {
      return p.applications[0];
    }
    return p.shortDescription || "Cọc tre tự nhiên già tuyển chọn";
  };

  return (
    <section
      className="py-10 sm:py-16 bg-[#FAF9F5] border-t border-b border-gray-200 relative overflow-hidden"
      id="san-pham-noi-bat"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* GREEN RIBBON HEADER & NAVIGATION CONTROLS */}
        <div className="relative flex flex-col sm:flex-row items-center justify-between mb-8 sm:mb-10 gap-4">
          
          {/* Background horizontal line */}
          <div
            className="absolute inset-0 flex items-center hidden sm:flex"
            aria-hidden="true"
          >
            <div className="w-full border-t-2 border-[#214E34]/25" />
          </div>

          {/* Left spacer for balance on desktop */}
          <div className="hidden sm:flex items-center gap-2 text-xs text-gray-500 bg-[#FAF9F5] px-3 z-10 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
            <span>Sẵn hàng tại bãi: <strong>500.000+ cọc</strong></span>
          </div>

          {/* Center Hexagon/Ribbon Badge */}
          <div className="relative z-10">
            <div className="bg-[#214E34] text-white px-8 sm:px-12 py-2.5 sm:py-3 font-black text-sm sm:text-base tracking-wider uppercase shadow-lg flex items-center gap-2.5 clip-ribbon">
              <Sparkles className="w-4 h-4 text-[#CDAA63]" />
              <span>SẢN PHẨM NỔI BẬT</span>
            </div>
          </div>

          {/* Right Header Controls: Prev / Next Buttons */}
          <div className="relative z-10 flex items-center gap-2 bg-[#FAF9F5] sm:pl-3">
            <span className="text-xs text-gray-500 font-semibold hidden md:inline-block mr-1">
              Xem thêm các quy cách:
            </span>
            <button
              onClick={() => handleScroll("left")}
              aria-label="Xem sản phẩm trước"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#214E34]/30 bg-white text-[#214E34] hover:bg-[#214E34] hover:text-white shadow-sm flex items-center justify-center transition-all cursor-pointer active:scale-95 hover:shadow-md"
              title="Xem sản phẩm trước (Sang trái)"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleScroll("right")}
              aria-label="Xem sản phẩm kế tiếp"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#214E34]/30 bg-white text-[#214E34] hover:bg-[#214E34] hover:text-white shadow-sm flex items-center justify-center transition-all cursor-pointer active:scale-95 hover:shadow-md"
              title="Xem sản phẩm tiếp theo (Sang phải)"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* SLIDER CAROUSEL TRACK WRAPPER */}
        <div className="relative group/carousel">
          
          {/* FLOATING LEFT ARROW BUTTON (Desktop & Tablet) */}
          <button
            onClick={() => handleScroll("left")}
            aria-label="Cuộn sang trái"
            className={`absolute -left-3 sm:-left-5 lg:-left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/95 backdrop-blur-sm border-2 border-[#214E34]/40 text-[#214E34] hover:bg-[#214E34] hover:text-white shadow-xl flex items-center justify-center transition-all duration-300 cursor-pointer active:scale-90 hover:scale-110 hidden sm:flex ${
              !canScrollLeft ? "opacity-75 hover:opacity-100" : "opacity-95"
            }`}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* FLOATING RIGHT ARROW BUTTON (Desktop & Tablet) */}
          <button
            onClick={() => handleScroll("right")}
            aria-label="Cuộn sang phải"
            className={`absolute -right-3 sm:-right-5 lg:-right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/95 backdrop-blur-sm border-2 border-[#214E34]/40 text-[#214E34] hover:bg-[#214E34] hover:text-white shadow-xl flex items-center justify-center transition-all duration-300 cursor-pointer active:scale-90 hover:scale-110 hidden sm:flex ${
              !canScrollRight ? "opacity-75 hover:opacity-100" : "opacity-95"
            }`}
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* HORIZONTAL SCROLL CONTAINER */}
          <div
            ref={scrollRef}
            onScroll={updateScrollState}
            className="flex items-stretch gap-4 sm:gap-5 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory pb-4 pt-1 px-1 -mx-1"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {allProducts.map((item) => {
              const imageSrc =
                item.images && item.images.length > 0
                  ? item.images[0]
                  : "/images/products/coc-tre-3m-1.webp";

              return (
                <div
                  key={item.id || item.slug}
                  className="product-card-item shrink-0 snap-start w-[78vw] xs:w-[280px] sm:w-[270px] md:w-[280px] lg:w-[calc(25%-15px)] bg-white rounded-2xl p-3.5 sm:p-4 border border-gray-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between text-center group/card hover:-translate-y-1"
                >
                  {/* Top Image Section */}
                  <Link
                    href={`/san-pham/${item.slug}`}
                    className="relative block aspect-square rounded-xl overflow-hidden bg-gray-100 mb-3 border border-gray-100 group/img"
                  >
                    <Image
                      src={imageSrc}
                      alt={item.name}
                      fill
                      sizes="(max-width: 640px) 78vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-cover group-hover/card:scale-108 transition-transform duration-500"
                    />

                    {/* Length Tag */}
                    <div className="absolute top-2.5 right-2.5 bg-[#214E34]/90 backdrop-blur-sm text-[#EED59B] text-[10px] sm:text-xs font-extrabold px-2.5 py-1 rounded-md border border-[#CDAA63]/30 shadow-sm">
                      {item.length ? `Dài ${item.length}` : "Quy cách chuẩn"}
                    </div>

                    {/* Stock Pill */}
                    <div className="absolute bottom-2 left-2.5 bg-emerald-600/90 backdrop-blur-sm text-white text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded">
                      ● Sẵn hàng bãi
                    </div>
                  </Link>

                  {/* Title & Specs */}
                  <div className="space-y-1.5 mb-3 px-1 text-left">
                    <Link
                      href={`/san-pham/${item.slug}`}
                      className="block group-hover/card:text-[#214E34] transition-colors"
                    >
                      <h3 className="text-sm sm:text-base font-black text-[#18231C] uppercase tracking-wide line-clamp-1 group-hover/card:text-[#214E34]">
                        {item.name}
                      </h3>
                    </Link>

                    <p className="text-[11px] sm:text-xs text-gray-500 font-medium line-clamp-2 min-h-[32px] leading-relaxed">
                      {getProductHighlight(item)}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2 pt-2 border-t border-gray-100 mt-auto">
                    {/* Báo giá ngay */}
                    <button
                      onClick={() => openQuoteModal(item.name)}
                      className="w-full py-2.5 px-3 rounded-full border-2 border-[#214E34] text-[#214E34] hover:bg-[#214E34] hover:text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer group-hover/card:bg-[#214E34] group-hover/card:text-white shadow-sm active:scale-95"
                    >
                      <ShoppingCart className="w-4 h-4 shrink-0" />
                      <span>BÁO GIÁ NGAY</span>
                    </button>

                    {/* Chi tiết link */}
                    <Link
                      href={`/san-pham/${item.slug}`}
                      className="inline-flex items-center justify-center gap-1 text-[11px] font-bold text-gray-500 hover:text-[#214E34] transition-colors py-0.5"
                    >
                      <span>Xem thông số kỹ thuật</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* DOTS / PROGRESS INDICATOR (Fixed, Responsive, Easy to click) */}
        {pageCount > 1 && (
          <div className="flex items-center justify-center gap-1 sm:gap-2 mt-5 sm:mt-7">
            {Array.from({ length: pageCount }).map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => scrollToPage(idx)}
                aria-label={`Chuyển đến trang sản phẩm ${idx + 1}`}
                className="p-2 group cursor-pointer focus:outline-none"
              >
                <span
                  className={`block h-2.5 rounded-full transition-all duration-300 ${
                    currentPage === idx
                      ? "w-8 bg-[#214E34] shadow-sm"
                      : "w-2.5 bg-gray-300 group-hover:bg-[#214E34]/50"
                  }`}
                />
              </button>
            ))}
          </div>
        )}

        {/* BOTTOM HELPFUL INFO & CTA BAR */}
        <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-gray-600 bg-white p-4 sm:p-5 rounded-2xl border border-gray-200/90 shadow-sm">
          <div className="flex items-center gap-2.5 text-center md:text-left">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
            <span>
              Chúng tôi nhận cắt theo kích thước yêu cầu (1.5m - 5m) và giao tận chân công trình.
            </span>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/san-pham"
              className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-[#214E34] hover:text-white text-gray-800 font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-all shadow-sm"
            >
              <Layers className="w-4 h-4 text-[#CDAA63]" />
              <span>Xem tất cả ({allProducts.length}) quy cách</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <a
              href={`tel:${siteConfig.hotline}`}
              className="px-4 py-2 rounded-xl bg-[#E57C23] hover:bg-[#CC6914] text-white font-black text-xs sm:text-sm flex items-center gap-1.5 transition-all shadow-md active:scale-95"
            >
              <Phone className="w-4 h-4" />
              <span>{siteConfig.hotlineFormatted}</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
