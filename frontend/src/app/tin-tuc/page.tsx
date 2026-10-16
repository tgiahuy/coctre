"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Search, BookOpen, Calendar, Clock, ArrowRight, ShieldAlert } from "lucide-react";
import Breadcrumb from "@/components/common/Breadcrumb";
import ArticleCard from "@/components/common/ArticleCard";
import QuoteFormSection from "@/components/common/QuoteFormSection";
import { useArticles } from "@/lib/articleStore";

export default function NewsPage() {
  const articlesList = useArticles();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { label: "Tất cả bài viết", value: "all" },
    { label: "Kỹ thuật thi công", value: "Kỹ thuật thi công" },
    { label: "Kinh nghiệm chọn cọc", value: "Kinh nghiệm chọn cọc" },
    { label: "Kiến thức nền móng", value: "Kiến thức nền móng" },
    { label: "Tin công trình", value: "Tin công trình" },
  ];

  const filteredArticles = useMemo(() => {
    return articlesList.filter((a) => {
      if (selectedCategory !== "all" && a.category !== selectedCategory) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchTitle = a.title.toLowerCase().includes(q);
        const matchExcerpt = a.excerpt.toLowerCase().includes(q);
        if (!matchTitle && !matchExcerpt) return false;
      }
      return true;
    });
  }, [articlesList, selectedCategory, searchQuery]);

  return (
    <div className="bg-[#F7F5EF] min-h-screen">
      {/* Breadcrumb */}
      <Breadcrumb items={[{ name: "Tin tức & Cẩm nang kỹ thuật" }]} />

      {/* Hero Banner */}
      <div className="bg-[#18231C] text-white py-12 border-b border-[#2A3930]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-bold text-[#CDAA63] uppercase tracking-widest">
              GÓC CHUYÊN GIA NỀN MÓNG & BÃI CỌC
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-white">
              TIN TỨC & KỸ THUẬT ĐÓNG CỌC TRE
            </h1>
            <p className="text-sm sm:text-base text-gray-300">
              Tổng hợp cẩm nang kỹ thuật thi công ép cọc móng, tiêu chuẩn TCVN, kinh nghiệm phân biệt cọc già và cập nhật hoạt động bãi cọc.
            </p>
          </div>
        </div>
      </div>

      {/* SEARCH & CATEGORY BAR */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white p-4 sm:p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat.value
                    ? "bg-[#214E34] text-white shadow-sm"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Tìm kiếm bài viết..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#214E34]"
            />
          </div>
        </div>

        {/* ARTICLES GRID */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredArticles.length === 0 ? (
            <div className="col-span-full py-16 px-6 text-center bg-white rounded-3xl border border-gray-200 shadow-sm max-w-xl mx-auto w-full">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[#214E34]/10 text-[#214E34] flex items-center justify-center">
                <BookOpen className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-[#18231C] mb-2">Chưa Có Bài Viết Nào</h3>
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed mb-6">
                Các bài viết chia sẻ cẩm nang kỹ thuật thi công móng và kinh nghiệm chọn cọc đang được biên tập.
              </p>
              <Link
                href="/san-pham"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#214E34] hover:bg-[#183B27] text-white text-xs font-bold transition-all shadow-sm"
              >
                <span>Xem danh mục sản phẩm cọc tre</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#CDAA63]" />
              </Link>
            </div>
          ) : (
            filteredArticles.map((art) => (
              <ArticleCard key={art.id} article={art} />
            ))
          )}
        </div>
      </div>

      {/* CTA SECTION */}
      <QuoteFormSection />
    </div>
  );
}
