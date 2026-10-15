import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, ArrowRight, BookOpen } from "lucide-react";
import { Article } from "@/data/articles";

interface ArticleCardProps {
  article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <article className="bg-white rounded-2xl overflow-hidden border border-gray-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group hover:-translate-y-1">
      {/* ARTICLE COVER */}
      <Link
        href={`/tin-tuc/${article.slug}`}
        className="relative block aspect-[16/10] overflow-hidden bg-[#18231C]/10"
      >
        <Image
          src={article.coverImage}
          alt={article.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Category Pill */}
        <div className="absolute top-3 left-3 bg-[#214E34]/95 backdrop-blur-sm text-[#CDAA63] text-xs font-bold px-3 py-1 rounded-lg border border-[#CDAA63]/30 shadow-sm">
          {article.category}
        </div>
      </Link>

      {/* CONTENT */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Metadata */}
          <div className="flex items-center gap-3 text-xs text-gray-400 mb-2.5">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-[#CDAA63]" />
              {article.publishDate}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-gray-400" />
              {article.readTime}
            </span>
          </div>

          <Link href={`/tin-tuc/${article.slug}`} className="block">
            <h3 className="text-base sm:text-lg font-bold text-[#18231C] leading-snug group-hover:text-[#214E34] transition-colors line-clamp-2">
              {article.title}
            </h3>
          </Link>

          <p className="mt-2.5 text-xs sm:text-sm text-[#686868] line-clamp-2 leading-relaxed">
            {article.excerpt}
          </p>
        </div>

        {/* FOOTER */}
        <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
          <span className="text-xs text-gray-500 font-medium truncate max-w-[180px]">
            {article.author}
          </span>

          <Link
            href={`/tin-tuc/${article.slug}`}
            className="inline-flex items-center gap-1 text-xs font-bold text-[#214E34] hover:text-[#183B27] group-hover:translate-x-0.5 transition-transform"
          >
            <span>Đọc tiếp</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#CDAA63]" />
          </Link>
        </div>
      </div>
    </article>
  );
}
