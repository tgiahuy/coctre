"use client";

import React, { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Award } from "lucide-react";
import ProjectCard from "@/components/common/ProjectCard";
import { useProjects } from "@/lib/projectStore";

export default function FeaturedProjectsSection() {
  const projects = useProjects();
  const scrollRef = useRef<HTMLDivElement>(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);

  // Update scroll buttons and pagination dots
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

    const card = scrollRef.current.querySelector(".project-card-item") as HTMLElement | null;
    const cardWidth = card ? card.offsetWidth + 24 : 340;
    const visibleCards = Math.max(1, Math.round(clientWidth / cardWidth));

    const pages = Math.max(2, Math.ceil(projects.length / visibleCards));
    setPageCount(pages);

    const progress = Math.max(0, Math.min(1, scrollLeft / maxScroll));
    const active = Math.min(Math.round(progress * (pages - 1)), pages - 1);
    setCurrentPage(active);
  };

  useEffect(() => {
    updateScrollState();
    window.addEventListener("resize", updateScrollState);
    return () => window.removeEventListener("resize", updateScrollState);
  }, [projects]);

  // Smooth scroll Left or Right
  const handleScroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const { scrollWidth, clientWidth, scrollLeft } = container;
    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll <= 0) return;

    const card = container.querySelector(".project-card-item") as HTMLElement | null;
    const cardWidth = card ? card.offsetWidth + 24 : 340;
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

  // Scroll to a specific page
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

  if (!projects || projects.length === 0) {
    return null;
  }

  return (
    <section className="py-16 sm:py-24 bg-[#F7F5EF] border-t border-gray-200 relative overflow-hidden" id="du-an-tieu-bieu">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* HEADER SECTION WITH TITLE */}
        <div className="mb-8 sm:mb-12 max-w-3xl">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#214E34]/10 text-[#214E34] text-xs font-black uppercase tracking-wider">
              <Award className="w-3.5 h-3.5 text-[#CDAA63]" />
              <span>CÔNG TRÌNH TIÊU BIỂU</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#18231C] tracking-tight uppercase">
              DỰ ÁN ĐÃ CUNG CẤP CỌC TRE
            </h2>

            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Những dự án giao thông, kè đê điều, cầu đường và công trình xây dựng trọng điểm tin tưởng lựa chọn cọc tre Huyền Dương.
            </p>
          </div>
        </div>

        {/* SLIDER CAROUSEL TRACK WRAPPER */}
        <div className="relative group/projectSlider">

          {/* FLOATING LEFT ARROW BUTTON */}
          <button
            onClick={() => handleScroll("left")}
            aria-label="Cuộn dự án sang trái"
            className={`absolute -left-3 sm:-left-5 lg:-left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/95 backdrop-blur-sm border-2 border-[#214E34]/40 text-[#214E34] hover:bg-[#214E34] hover:text-white shadow-xl flex items-center justify-center transition-all duration-300 cursor-pointer active:scale-90 hover:scale-110 hidden sm:flex ${!canScrollLeft ? "opacity-75 hover:opacity-100" : "opacity-95"
              }`}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* FLOATING RIGHT ARROW BUTTON */}
          <button
            onClick={() => handleScroll("right")}
            aria-label="Cuộn dự án sang phải"
            className={`absolute -right-3 sm:-right-5 lg:-right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/95 backdrop-blur-sm border-2 border-[#214E34]/40 text-[#214E34] hover:bg-[#214E34] hover:text-white shadow-xl flex items-center justify-center transition-all duration-300 cursor-pointer active:scale-90 hover:scale-110 hidden sm:flex ${!canScrollRight ? "opacity-75 hover:opacity-100" : "opacity-95"
              }`}
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* HORIZONTAL SCROLL CONTAINER */}
          <div
            ref={scrollRef}
            onScroll={updateScrollState}
            className="flex items-stretch gap-5 sm:gap-6 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory pb-4 pt-1 px-1 -mx-1"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {projects.map((project) => (
              <div
                key={project.id || project.slug}
                className="project-card-item shrink-0 snap-start w-[85vw] sm:w-[350px] md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] flex flex-col"
              >
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        </div>

        {/* DOTS / PROGRESS INDICATOR */}
        {pageCount > 1 && (
          <div className="flex items-center justify-center gap-1 sm:gap-2 mt-6 sm:mt-8">
            {Array.from({ length: pageCount }).map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => scrollToPage(idx)}
                aria-label={`Chuyển đến trang dự án ${idx + 1}`}
                className="p-2 group cursor-pointer focus:outline-none"
              >
                <span
                  className={`block h-2.5 rounded-full transition-all duration-300 ${currentPage === idx
                      ? "w-8 bg-[#214E34] shadow-sm"
                      : "w-2.5 bg-gray-300 group-hover:bg-[#214E34]/50"
                    }`}
                />
              </button>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
