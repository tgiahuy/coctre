"use client";

import React, { useState } from "react";
import { Building2 } from "lucide-react";
import Breadcrumb from "@/components/common/Breadcrumb";
import ProjectCard from "@/components/common/ProjectCard";
import SectionHeading from "@/components/common/SectionHeading";
import QuoteFormSection from "@/components/common/QuoteFormSection";
import { useProjects } from "@/lib/projectStore";

export default function ProjectsPage() {
  const projects = useProjects();
  const [filterType, setFilterType] = useState<string>("all");

  const categories = [
    { label: "Tất cả dự án", value: "all" },
    { label: "Giao thông & Cầu đường", value: "giao-thong" },
    { label: "Thủy lợi & Kè sông đê điều", value: "thuy-loi" },
    { label: "Khu công nghiệp & Nhà xưởng", value: "cong-nghiep" },
  ];

  const filteredProjects = projects.filter((p) => {
    if (filterType === "all") return true;
    if (filterType === "giao-thong") return p.projectType.toLowerCase().includes("giao thông") || p.projectType.toLowerCase().includes("đường") || p.projectType.toLowerCase().includes("cầu");
    if (filterType === "thuy-loi") return p.projectType.toLowerCase().includes("thủy lợi") || p.projectType.toLowerCase().includes("kè");
    if (filterType === "cong-nghiep") return p.projectType.toLowerCase().includes("công nghiệp") || p.projectType.toLowerCase().includes("nhà xưởng");
    return true;
  });

  return (
    <div className="bg-[#F7F5EF] min-h-screen">
      {/* Breadcrumb */}
      <Breadcrumb items={[{ name: "Dự án tiêu biểu" }]} />

      {/* Header Banner */}
      <div className="bg-[#18231C] text-white py-12 border-b border-[#2A3930]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-bold text-[#CDAA63] uppercase tracking-widest">
              HỒ SƠ NĂNG LỰC THỰC TẾ
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-white">
              CÁC DỰ ÁN ĐÃ CUNG CẤP CỌC TRE
            </h1>
            <p className="text-sm sm:text-base text-gray-300">
              Tổng hợp những công trình trọng điểm cấp quốc gia và địa phương mà Cọc Tre Huyền Dương vinh dự là nhà cung ứng vật tư nền móng.
            </p>
          </div>
        </div>
      </div>

      {/* FILTER BUTTONS & GRID */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none mb-8">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setFilterType(cat.value)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                filterType === cat.value
                  ? "bg-[#214E34] text-white shadow-sm"
                  : "bg-white hover:bg-gray-100 text-gray-700 border border-gray-200"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* PROJECTS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.length === 0 ? (
            <div className="col-span-full py-16 px-6 text-center bg-white rounded-3xl border border-gray-200 shadow-sm max-w-xl mx-auto w-full">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[#214E34]/10 text-[#214E34] flex items-center justify-center">
                <Building2 className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-[#18231C] mb-2">Đang Cập Nhật Danh Sách Dự Án</h3>
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                Hồ sơ các dự án và công trình thực tế đang được tổng hợp và chuẩn hóa thông tin để cập nhật lên hệ thống.
              </p>
            </div>
          ) : (
            filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))
          )}
        </div>
      </div>

      {/* CTA SECTION */}
      <QuoteFormSection />
    </div>
  );
}
