"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  Clock,
  User,
  Tag,
  BookOpen,
  ArrowRight,
  Loader2,
  AlertCircle,
} from "lucide-react";
import Breadcrumb from "@/components/common/Breadcrumb";
import ArticleCard from "@/components/common/ArticleCard";
import QuoteFormSection from "@/components/common/QuoteFormSection";
import { useArticlesState } from "@/lib/articleStore";
import { siteConfig } from "@/data/config";
import { useQuoteModal } from "@/context/QuoteModalContext";
import { Article } from "@/data/articles";

interface ArticleDetailClientProps {
  slug: string;
  initialArticle?: Article;
}

export default function ArticleDetailClient({
  slug,
  initialArticle,
}: ArticleDetailClientProps) {
  const { data: allArticles, isLoading, error } = useArticlesState();
  const article =
    allArticles.find((item) => item.slug === slug || item.id === slug) || initialArticle;
  const relatedArticles = allArticles.filter((item) => item.slug !== slug).slice(0, 3);
  const { openQuoteModal } = useQuoteModal();

  if (isLoading && !article) {
    return (
      <div className="min-h-screen bg-[#F7F5EF] flex items-center justify-center p-4">
        <div className="text-center space-y-3 max-w-md bg-white p-8 rounded-3xl border border-gray-200 shadow-sm">
          <Loader2 className="w-8 h-8 animate-spin text-[#214E34] mx-auto" />
          <h3 className="text-base font-bold text-gray-900">Đang tải bài viết...</h3>
          <p className="text-xs text-gray-500">Vui lòng chờ trong giây lát.</p>
        </div>
      </div>
    );
  }

  if (error && !article) {
    return (
      <div className="min-h-screen bg-[#F7F5EF] flex items-center justify-center p-4">
        <div className="text-center space-y-4 max-w-md bg-white p-8 rounded-3xl border border-red-200 shadow-sm">
          <AlertCircle className="w-8 h-8 text-red-600 mx-auto" />
          <h3 className="text-base font-bold text-red-900">Lỗi khi tải bài viết</h3>
          <p className="text-xs text-red-600">{error}</p>
          <Link
            href="/tin-tuc"
            className="inline-block px-5 py-2.5 rounded-xl bg-[#214E34] text-white font-bold text-xs"
          >
            Quay lại trang tin tức
          </Link>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-[#F7F5EF] flex items-center justify-center p-4">
        <div className="text-center space-y-4 max-w-md bg-white p-8 rounded-3xl border border-gray-200 shadow-sm">
          <AlertCircle className="w-8 h-8 text-amber-500 mx-auto" />
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

  const displayImage = article.coverImage || "/images/products/coc-tre-2m-1.webp";

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

                <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 pt-2 border-t border-gray-100">
                  <div className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#CDAA63]" />
                    <span>{article.author}</span>
                  </div>
                  {article.publishDate && (
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#CDAA63]" />
                      <span>{article.publishDate}</span>
                    </div>
                  )}
                  {article.readTime && (
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#CDAA63]" />
                      <span>{article.readTime}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Excerpt Lead Card */}
              {article.excerpt && (
                <div className="p-4 sm:p-5 rounded-2xl bg-[#F7F5EF] border-l-4 border-[#214E34] text-gray-800 text-sm sm:text-base font-medium leading-relaxed italic">
                  {article.excerpt}
                </div>
              )}

              {/* Cover Image */}
              <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-gray-200">
                <Image
                  src={displayImage}
                  alt={article.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Formatted Content */}
              <div className="prose prose-green max-w-none text-sm sm:text-base text-gray-700 leading-relaxed space-y-4">
                {article.content ? (
                  article.content.split("\n\n").map((para, i) => {
                    if (para.startsWith("## ")) {
                      return (
                        <h2 key={i} className="text-xl sm:text-2xl font-black text-[#18231C] pt-4 border-b border-gray-100 pb-2">
                          {para.replace("## ", "")}
                        </h2>
                      );
                    }
                    if (para.startsWith("### ")) {
                      return (
                        <h3 key={i} className="text-lg font-bold text-[#214E34] pt-2">
                          {para.replace("### ", "")}
                        </h3>
                      );
                    }
                    if (para.startsWith("- ") || para.startsWith("* ")) {
                      const items = para.split("\n").filter((l) => l.trim().length > 0);
                      return (
                        <ul key={i} className="list-disc list-inside space-y-1.5 pl-2">
                          {items.map((item, idx) => (
                            <li key={idx} className="text-gray-700">
                              {item.replace(/^[-*]\s+/, "")}
                            </li>
                          ))}
                        </ul>
                      );
                    }
                    return <p key={i}>{para}</p>;
                  })
                ) : (
                  <p>{article.excerpt}</p>
                )}
              </div>

              {/* Tags */}
              {article.tags && article.tags.length > 0 && (
                <div className="pt-6 border-t border-gray-100 flex flex-wrap items-center gap-2">
                  <Tag className="w-3.5 h-3.5 text-gray-400 mr-1" />
                  {article.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-gray-100 text-gray-600 text-xs font-semibold hover:bg-gray-200 transition-colors"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* SIDEBAR */}
          <div className="lg:col-span-4 space-y-6">
            {/* CTA CARD */}
            <div className="bg-[#18231C] text-white rounded-3xl p-6 sm:p-8 border-2 border-[#CDAA63]/50 shadow-xl space-y-4 text-center">
              <div className="w-12 h-12 rounded-2xl bg-[#214E34] text-[#CDAA63] flex items-center justify-center mx-auto border border-[#CDAA63]/30">
                <BookOpen className="w-6 h-6" />
              </div>

              <h3 className="text-lg font-black text-white leading-tight">
                CẦN TƯ VẤN KỸ THUẬT & BÁO GIÁ CỌC?
              </h3>

              <p className="text-xs text-gray-300 leading-relaxed">
                Đội ngũ kỹ sư kinh doanh Huyền Dương sẵn sàng tính toán định mức và gửi báo giá cạnh tranh nhất cho công trình của bạn.
              </p>

              <button
                type="button"
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
