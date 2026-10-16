"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import SectionHeading from "@/components/common/SectionHeading";
import ArticleCard from "@/components/common/ArticleCard";
import { useArticles } from "@/lib/articleStore";

export default function LatestNewsSection() {
  const articlesList = useArticles().slice(0, 3);

  return (
    <section className="py-16 sm:py-24 bg-[#F7F5EF] border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="TƯ VẤN & KIẾN THỨC NỀN MÓNG"
          title="TIN TỨC & KỸ THUẬT THI CÔNG"
          subtitle="Tổng hợp cẩm nang kỹ thuật đóng cọc tre, tiêu chuẩn TCVN và kinh nghiệm lựa chọn cọc tre già đạt chuẩn nghiệm thu."
          alignment="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {articlesList.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/tin-tuc"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#214E34] hover:bg-[#183B27] text-white font-bold text-sm sm:text-base shadow-md hover:shadow-xl transition-all"
          >
            <BookOpen className="w-5 h-5 text-[#CDAA63]" />
            <span>XEM TẤT CẢ BÀI VIẾT KỸ THUẬT</span>
            <ArrowRight className="w-4 h-4 text-[#CDAA63]" />
          </Link>
        </div>
      </div>
    </section>
  );
}
