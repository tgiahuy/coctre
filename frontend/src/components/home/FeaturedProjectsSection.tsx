import React from "react";
import Link from "next/link";
import { ArrowRight, Building2 } from "lucide-react";
import SectionHeading from "@/components/common/SectionHeading";
import ProjectCard from "@/components/common/ProjectCard";
import { projects } from "@/data/projects";

export default function FeaturedProjectsSection() {
  const featuredProjects = projects.slice(0, 3);

  return (
    <section className="py-16 sm:py-24 bg-[#F7F5EF] border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="CÔNG TRÌNH TIÊU BIỂU"
          title="DỰ ÁN ĐÃ CUNG CẤP CỌC TRE"
          subtitle="Những dự án giao thông, kè đê điều, cầu đường và khu công nghiệp trọng điểm tin tưởng lựa chọn cọc tre Hòa Bình."
          alignment="center"
        />

        {/* 3 Cards / Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* Action Link */}
        <div className="mt-12 text-center">
          <Link
            href="/du-an"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#214E34] hover:bg-[#183B27] text-white font-bold text-sm sm:text-base shadow-md hover:shadow-xl transition-all"
          >
            <Building2 className="w-5 h-5 text-[#CDAA63]" />
            <span>XEM TẤT CẢ DỰ ÁN ĐÃ THỰC HIỆN</span>
            <ArrowRight className="w-4 h-4 text-[#CDAA63]" />
          </Link>
        </div>
      </div>
    </section>
  );
}
