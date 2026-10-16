"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Calendar,
  Layers,
  Building2,
  ArrowRight,
  Loader2,
  AlertCircle,
} from "lucide-react";
import Breadcrumb from "@/components/common/Breadcrumb";
import ProductCard from "@/components/common/ProductCard";
import ProjectCard from "@/components/common/ProjectCard";
import QuoteFormSection from "@/components/common/QuoteFormSection";
import { useProjectsState } from "@/lib/projectStore";
import { useProducts } from "@/lib/productStore";
import { useQuoteModal } from "@/context/QuoteModalContext";
import { Project } from "@/data/projects";

interface ProjectDetailClientProps {
  slug: string;
  initialProject?: Project;
}

export default function ProjectDetailClient({
  slug,
  initialProject,
}: ProjectDetailClientProps) {
  const { data: allProjects, isLoading, error } = useProjectsState();
  const allProducts = useProducts();
  const liveProject = allProjects.find((item) => item.slug === slug || item.id === slug);
  const project = initialProject
    ? (isLoading ? initialProject : (liveProject || initialProject))
    : liveProject;
  const { openQuoteModal } = useQuoteModal();

  if (isLoading && !project) {
    return (
      <div className="min-h-screen bg-[#F7F5EF] flex items-center justify-center p-4">
        <div className="text-center space-y-3 max-w-md bg-white p-8 rounded-3xl border border-gray-200 shadow-sm">
          <Loader2 className="w-8 h-8 animate-spin text-[#214E34] mx-auto" />
          <h3 className="text-base font-bold text-gray-900">Đang tải thông tin dự án...</h3>
          <p className="text-xs text-gray-500">Vui lòng chờ trong giây lát.</p>
        </div>
      </div>
    );
  }

  if (error && !project) {
    return (
      <div className="min-h-screen bg-[#F7F5EF] flex items-center justify-center p-4">
        <div className="text-center space-y-4 max-w-md bg-white p-8 rounded-3xl border border-red-200 shadow-sm">
          <AlertCircle className="w-8 h-8 text-red-600 mx-auto" />
          <h3 className="text-base font-bold text-red-900">Lỗi khi tải dữ liệu dự án</h3>
          <p className="text-xs text-red-600">{error}</p>
          <Link
            href="/du-an"
            className="inline-block px-5 py-2.5 rounded-xl bg-[#214E34] text-white font-bold text-xs"
          >
            Quay lại danh mục dự án
          </Link>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-[#F7F5EF] flex items-center justify-center p-4">
        <div className="text-center space-y-4 max-w-md bg-white p-8 rounded-3xl border border-gray-200 shadow-sm">
          <AlertCircle className="w-8 h-8 text-amber-500 mx-auto" />
          <h2 className="text-xl font-black text-gray-900">Không tìm thấy dự án</h2>
          <p className="text-xs text-gray-600">Dự án bạn đang tìm kiếm có thể đã bị gỡ hoặc đường dẫn không chính xác.</p>
          <Link
            href="/du-an"
            className="inline-block px-5 py-2.5 rounded-xl bg-[#214E34] text-white font-bold text-xs"
          >
            Quay lại danh sách dự án
          </Link>
        </div>
      </div>
    );
  }

  const relatedProjects = allProjects.filter((p) => p.slug !== project.slug && p.id !== project.id).slice(0, 3);
  const matchedProducts = allProducts.filter((p) =>
    project.productsUsed?.includes(p.id) || project.productsUsed?.includes(p.slug)
  );

  const displayImage = project.coverImage || "/images/products/coc-tre-2m-1.webp";

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
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-widest bg-[#CDAA63]/20 text-[#CDAA63] border border-[#CDAA63]/40">
              <span className="w-2 h-2 rounded-full bg-[#CDAA63]"></span>
              {project.projectType}
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight">
              {project.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm text-gray-300 pt-2">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#CDAA63]" />
                <span>{project.location}</span>
              </div>
              {project.completionYear && (
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-[#CDAA63]" />
                  <span>Năm hoàn thành: {project.completionYear}</span>
                </div>
              )}
              {project.bambooSupplied && (
                <div className="flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-[#CDAA63]" />
                  <span>Chủng loại: {project.bambooSupplied}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* MAIN CONTENT (8 COLS) */}
          <div className="lg:col-span-8 space-y-10">
            {/* PRIMARY IMAGE */}
            <div className="relative aspect-[16/9] rounded-3xl overflow-hidden border border-gray-200 shadow-md">
              <Image
                src={displayImage}
                alt={project.title}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* DESCRIPTION */}
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-200 shadow-sm space-y-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-[#18231C] mb-3">
                  TỔNG QUAN VÀ GIẢI PHÁP THI CÔNG NỀN MÓNG
                </h2>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed whitespace-pre-line">
                  {project.overview || project.shortDescription}
                </p>
              </div>

              {project.challenge && (
                <div>
                  <h3 className="text-base font-bold text-[#18231C] mb-2">Thách thức địa chất</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{project.challenge}</p>
                </div>
              )}

              {project.solution && (
                <div>
                  <h3 className="text-base font-bold text-[#214E34] mb-2">Giải pháp của Huyền Dương</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{project.solution}</p>
                </div>
              )}

              {/* SPEC SHEET */}
              <div className="p-5 rounded-2xl bg-[#F7F5EF] border border-[#E7E3D8] space-y-3">
                <h3 className="font-extrabold text-xs text-[#214E34] uppercase tracking-wider">
                  THÔNG SỐ VẬT TƯ CUNG ỨNG
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                  <div>
                    <span className="text-gray-500 block">Địa điểm:</span>
                    <strong className="text-gray-900">{project.location}</strong>
                  </div>
                  <div>
                    <span className="text-gray-500 block">Khối lượng cọc cấp:</span>
                    <strong className="text-[#214E34] font-black">{project.totalQuantity || "Theo tiến độ"}</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* MATCHED PRODUCTS USED IN THIS PROJECT */}
            {matchedProducts.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-black text-[#18231C]">
                    CHỦNG LOẠI CỌC TRE SỬ DỤNG TRONG DỰ ÁN
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {matchedProducts.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* SIDEBAR (4 COLS) */}
          <div className="lg:col-span-4 space-y-6">
            {/* PROJECT HIGHLIGHTS CARD */}
            <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-4">
              <h3 className="text-base font-extrabold text-[#18231C] border-b border-gray-100 pb-3">
                ĐIỂM NỔI BẬT DỰ ÁN
              </h3>

              <div className="space-y-3 text-xs sm:text-sm">
                <div className="p-3 rounded-xl bg-gray-50 flex items-center justify-between">
                  <span className="text-gray-500">Khối lượng:</span>
                  <span className="font-bold text-gray-900">{project.totalQuantity || "Số lượng lớn"}</span>
                </div>
                <div className="p-3 rounded-xl bg-gray-50 flex items-center justify-between">
                  <span className="text-gray-500">Tiến độ giao xe:</span>
                  <span className="font-bold text-emerald-700">Đúng cam kết</span>
                </div>
                <div className="p-3 rounded-xl bg-gray-50 flex items-center justify-between">
                  <span className="text-gray-500">Nghiệm thu:</span>
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
                type="button"
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
