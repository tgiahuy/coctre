"use client";

import React, { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  MapPin,
  Calendar,
  Layers,
  CheckCircle2,
  FileText,
  Building2,
  ArrowRight,
  ShieldCheck,
  Truck
} from "lucide-react";
import Breadcrumb from "@/components/common/Breadcrumb";
import ProductCard from "@/components/common/ProductCard";
import ProjectCard from "@/components/common/ProjectCard";
import QuoteFormSection from "@/components/common/QuoteFormSection";
import { getProjectBySlug, getRelatedProjects, projects } from "@/data/projects";
import { products } from "@/data/products";
import { useQuoteModal } from "@/context/QuoteModalContext";

export default function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = use(params);
  const project = getProjectBySlug(resolvedParams.slug);

  if (!project) {
    notFound();
  }

  const { openQuoteModal } = useQuoteModal();
  const relatedProjects = getRelatedProjects(project.slug, 3);
  const matchedProducts = products.filter((p) =>
    project.productsUsed.includes(p.id) || project.productsUsed.includes(p.slug)
  );

  return (
    <div className="bg-[#F7F5EF] min-h-screen">
      {/* BREADCRUMB */}
      <Breadcrumb
        items={[
          { name: "Dự án tiêu biểu", href: "/du-an" },
          { name: project.title },
        ]}
      />

      {/* PROJECT HERO BANNER */}
      <div className="bg-[#18231C] text-white py-12 sm:py-16 relative overflow-hidden border-b border-[#2A3930]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-[#CDAA63]/20 text-[#CDAA63] border border-[#CDAA63]/40">
              {project.projectType}
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
              {project.title}
            </h1>

            <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs sm:text-sm text-gray-300 pt-2">
              <span className="flex items-center gap-1.5 text-[#CDAA63] font-bold">
                <MapPin className="w-4 h-4 text-[#CDAA63]" />
                {project.location}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-gray-400" />
                Năm hoàn thành: {project.completionYear}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                <Layers className="w-4 h-4" />
                Khối lượng: {project.totalQuantity}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* MAIN ARTICLE CONTENT */}
          <div className="lg:col-span-8 space-y-10">
            {/* COVER IMAGE */}
            <div className="relative aspect-[16/10] rounded-3xl overflow-hidden shadow-xl border border-gray-200">
              <Image
                src={project.coverImage}
                alt={project.title}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* CASE STUDY SECTIONS */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-8 text-gray-800 leading-relaxed text-sm sm:text-base">
              {/* 1. Tổng quan */}
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-[#18231C] mb-3 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#214E34]"></span>
                  1. Tổng Quan Dự Án
                </h2>
                <p className="text-gray-600 leading-relaxed">{project.overview}</p>
              </div>

              {/* 2. Thách thức địa chất */}
              <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200">
                <h3 className="text-lg font-bold text-amber-950 mb-2">
                  2. Thách Thức Địa Chất & Tiến Độ
                </h3>
                <p className="text-xs sm:text-sm text-amber-900 leading-relaxed">
                  {project.challenge}
                </p>
              </div>

              {/* 3. Giải pháp cung ứng */}
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-[#18231C] mb-3 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#CDAA63]"></span>
                  3. Giải Pháp Cung Ứng Cọc Tre
                </h2>
                <p className="text-gray-600 leading-relaxed">{project.solution}</p>
              </div>

              {/* 4. Kết quả nghiệm thu */}
              <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200">
                <h3 className="text-lg font-bold text-emerald-950 mb-2 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  4. Kết Quả Nghiệm Thu Thực Tế
                </h3>
                <p className="text-xs sm:text-sm text-emerald-900 leading-relaxed">
                  {project.results}
                </p>
              </div>
            </div>

            {/* PROJECT GALLERY */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-4">
              <h3 className="text-xl font-black text-[#18231C]">
                Hình Ảnh Thực Tế Tại Công Trường
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.gallery.map((img, idx) => (
                  <div
                    key={idx}
                    className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-gray-100 shadow group"
                  >
                    <Image
                      src={img}
                      alt={`${project.title} - Ảnh ${idx + 1}`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* PRODUCTS USED IN THIS PROJECT */}
            {matchedProducts.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-xl font-black text-[#18231C]">
                  Sản Phẩm Cọc Tre Đã Sử Dụng Trong Dự Án
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {matchedProducts.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* SIDEBAR: PROJECT SUMMARY & CTA */}
          <div className="lg:col-span-4 space-y-6">
            {/* Quick Fact Box */}
            <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-4">
              <h3 className="text-lg font-black text-[#18231C] border-b border-gray-100 pb-3">
                THÔNG TIN HỢP ĐỒNG DỰ ÁN
              </h3>

              <div className="space-y-3 text-xs sm:text-sm">
                <div>
                  <span className="text-gray-400 block text-xs">Loại cọc tre cấp:</span>
                  <strong className="text-[#214E34]">{project.bambooSupplied}</strong>
                </div>

                <div>
                  <span className="text-gray-400 block text-xs">Tổng khối lượng:</span>
                  <strong className="text-lg text-[#E57C23] font-black">{project.totalQuantity}</strong>
                </div>

                <div>
                  <span className="text-gray-400 block text-xs">Địa điểm thi công:</span>
                  <span className="font-semibold text-gray-800">{project.location}</span>
                </div>

                <div>
                  <span className="text-gray-400 block text-xs">Tiêu chuẩn nghiệm thu:</span>
                  <span className="font-semibold text-emerald-700">TCVN 9361:2012 Đạt 100%</span>
                </div>
              </div>
            </div>

            {/* BIG DEDICATED CTA BANNER */}
            <div className="bg-[#18231C] text-white rounded-3xl p-6 sm:p-8 border-2 border-[#CDAA63]/50 shadow-xl space-y-5 text-center">
              <div className="w-14 h-14 rounded-2xl bg-[#214E34] text-[#CDAA63] flex items-center justify-center mx-auto border border-[#CDAA63]/30">
                <Building2 className="w-7 h-7" />
              </div>

              <h3 className="text-xl font-black text-white leading-tight">
                BẠN ĐANG CÓ CÔNG TRÌNH CẦN CỌC TRE?
              </h3>

              <p className="text-xs text-gray-300 leading-relaxed">
                Liên hệ ngay với chúng tôi để nhận bảng báo giá tại bãi cạnh tranh nhất cùng phương án vận chuyển tối ưu đến chân công trình.
              </p>

              <button
                onClick={() => openQuoteModal()}
                className="w-full py-3.5 bg-[#E57C23] hover:bg-[#CC6914] text-white font-extrabold text-sm rounded-xl shadow-lg transition-all cursor-pointer"
              >
                NHẬN BÁO GIÁ CÔNG TRÌNH
              </button>
            </div>
          </div>
        </div>

        {/* RELATED PROJECTS */}
        <div className="mt-16 pt-10 border-t border-gray-200">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs font-bold text-[#CDAA63] uppercase tracking-wider">
                HỒ SƠ THỰC HIỆN
              </span>
              <h2 className="text-2xl font-black text-[#18231C]">
                CÁC DỰ ÁN TIÊU BIỂU KHÁC
              </h2>
            </div>
            <Link
              href="/du-an"
              className="text-xs font-bold text-[#214E34] hover:text-[#183B27] flex items-center gap-1"
            >
              Xem tất cả dự án
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedProjects.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        </div>
      </div>

      {/* CTA SECTION */}
      <QuoteFormSection />
    </div>
  );
}
