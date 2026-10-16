"use client";

import React, { use, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Calendar,
  Clock,
  User,
  Tag,
  Share2,
  BookOpen,
  ArrowRight,
  Phone,
  FileText,
  CheckCircle2
} from "lucide-react";
import Breadcrumb from "@/components/common/Breadcrumb";
import ArticleCard from "@/components/common/ArticleCard";
import QuoteFormSection from "@/components/common/QuoteFormSection";
import { getAllArticles, findArticleBySlug } from "@/lib/articleStore";
import { Article } from "@/data/articles";
import { siteConfig } from "@/data/config";
import { useQuoteModal } from "@/context/QuoteModalContext";

export default function ArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = use(params);
  const [article, setArticle] = useState<Article | null | undefined>(undefined);
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);

  useEffect(() => {
    const found = findArticleBySlug(resolvedParams.slug);
    setArticle(found || null);

    const all = getAllArticles();
    const related = all.filter((a) => a.slug !== resolvedParams.slug).slice(0, 3);
    setRelatedArticles(related);
  }, [resolvedParams.slug]);

  const { openQuoteModal } = useQuoteModal();

  if (article === null) {
    return (
      <div className="min-h-screen bg-[#F7F5EF] flex items-center justify-center p-4">
        <div className="text-center space-y-4 max-w-md bg-white p-8 rounded-3xl border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-black text-gray-900">Không tìm thấy bài viết</h2>
          <p className="text-sm text-gray-600">Bài viết bạn đang tìm kiếm có thể đã bị xóa hoặc không tồn tại.</p>
          <Link
            href="/tin-tuc"
            className="inline-block px-6 py-3 rounded-xl bg-[#214E34] text-white font-bold text-xs"
          >
            Quay lại trang tin tức
          </Link>
        </div>
      </div>
    );
  }

  if (!article) {
    return <div className="min-h-screen bg-[#F7F5EF] py-24 text-center text-gray-500">Đang tải bài viết...</div>;
  }

  return (
    <div className="bg-[#F7F5EF] min-h-screen">
      {/* BREADCRUMB */}
      <Breadcrumb
        items={[
          { name: "Tin tức & Kỹ thuật", href: "/tin-tuc" },
          { name: article.title },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* MAIN ARTICLE BODY */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-200 shadow-sm space-y-6">
              {/* Category & Metadata */}
              <div className="space-y-3">
                <div>
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-[#214E34]/10 text-[#214E34]">
                    {article.category}
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#18231C] leading-tight">
                  {article.title}
                </h1>

                <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-gray-500 pt-2 border-b border-gray-100 pb-4">
                  <span className="flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-[#CDAA63]" />
                    {article.author}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-gray-400" />
                    {article.publishDate}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-gray-400" />
                    {article.readTime}
                  </span>
                </div>
              </div>

              {/* COVER IMAGE */}
              <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-gray-100 bg-gray-100">
                <Image
                  src={article.coverImage}
                  alt={article.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* TABLE OF CONTENTS */}
              {article.tableOfContents && article.tableOfContents.length > 0 && (
                <div className="p-5 rounded-2xl bg-[#F7F5EF] border border-[#E7E3D8] space-y-2.5">
                  <h4 className="font-extrabold text-sm text-[#18231C] flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-[#214E34]" />
                    MỤC LỤC BÀI VIẾT
                  </h4>
                  <ul className="space-y-1.5 text-xs sm:text-sm text-[#214E34] font-semibold">
                    {article.tableOfContents.map((toc) => (
                      <li key={toc.id}>
                        <a
                          href={`#${toc.id}`}
                          className="hover:underline flex items-center gap-1.5"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#CDAA63]"></span>
                          {toc.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* ARTICLE CONTENT */}
              <div className="prose prose-emerald max-w-none text-gray-800 text-sm sm:text-base leading-relaxed space-y-4">
                <div className="whitespace-pre-line font-normal text-gray-700">
                  {article.content}
                </div>
              </div>

              {/* TAGS */}
              <div className="pt-6 border-t border-gray-100 flex flex-wrap items-center gap-2">
                <Tag className="w-4 h-4 text-gray-400" />
                {article.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* SIDEBAR */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-[#18231C] text-white rounded-3xl p-6 sm:p-8 border-2 border-[#CDAA63]/40 shadow-xl space-y-5 text-center">
              <span className="text-xs font-bold text-[#CDAA63] uppercase tracking-wider block">
                TƯ VẤN KỸ THUẬT MÓNG
              </span>

              <h3 className="text-xl font-extrabold text-white">
                Cần tính toán số lượng cọc tre cho hố móng?
              </h3>

              <p className="text-xs text-gray-300 leading-relaxed">
                Đội ngũ kỹ thuật của Cọc Tre Huyền Dương sẵn sàng hỗ trợ bạn tính toán mật độ cọc tre (cọc/m²), chủng loại và báo giá tại xưởng trong ngày.
              </p>

              <button
                onClick={() => openQuoteModal()}
                className="w-full py-3.5 bg-[#E57C23] hover:bg-[#CC6914] text-white font-extrabold text-sm rounded-xl shadow-lg transition-all cursor-pointer"
              >
                NHẬN BÁO GIÁ CỌC TRE
              </button>

              <a
                href={`tel:${siteConfig.hotline}`}
                className="block py-3 px-4 bg-[#214E34] hover:bg-[#183B27] text-white font-bold text-xs rounded-xl border border-[#4A7C59] transition-colors"
              >
                Hotline Kỹ Thuật: {siteConfig.hotlineFormatted}
              </a>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-3">
              <h4 className="font-extrabold text-sm text-[#18231C] border-b border-gray-100 pb-2">
                THÔNG TIN KHO BÃI
              </h4>
              <p className="text-xs text-gray-600">
                <strong className="text-gray-900 block">Trụ sở & Kho bãi chính:</strong>
                {siteConfig.address}
              </p>
              <p className="text-xs text-gray-600">
                <strong className="text-gray-900 block">Hotline / Zalo liên hệ:</strong>
                {siteConfig.hotlineFormatted} – {siteConfig.hotline2Formatted || "0369.928.040"}
              </p>
            </div>
          </div>
        </div>

        {/* RELATED ARTICLES */}
        {relatedArticles.length > 0 && (
          <div className="mt-16 pt-10 border-t border-gray-200">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-bold text-[#CDAA63] uppercase tracking-wider">
                  CHUYÊN MỤC LIÊN QUAN
                </span>
                <h2 className="text-2xl font-black text-[#18231C]">
                  BÀI VIẾT KỸ THUẬT KHÁC
                </h2>
              </div>
              <Link
                href="/tin-tuc"
                className="text-xs font-bold text-[#214E34] hover:text-[#183B27] flex items-center gap-1"
              >
                Xem tất cả
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((art) => (
                <ArticleCard key={art.id} article={art} />
              ))}
            </div>
          </div>
        )}
      </div>

      <QuoteFormSection />
    </div>
  );
}
