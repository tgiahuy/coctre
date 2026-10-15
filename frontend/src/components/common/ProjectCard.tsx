import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, ArrowRight, Layers, Building } from "lucide-react";
import { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group hover:-translate-y-1">
      {/* PROJECT IMAGE */}
      <Link
        href={`/du-an/${project.slug}`}
        className="relative block aspect-[16/10] overflow-hidden bg-gray-900"
      >
        <Image
          src={project.coverImage}
          alt={project.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Volume badge */}
        <div className="absolute top-3 right-3 bg-[#E57C23] text-white text-xs font-black px-3 py-1 rounded-lg shadow-md">
          {project.totalQuantity}
        </div>

        {/* Year */}
        <div className="absolute top-3 left-3 bg-[#18231C]/80 backdrop-blur-sm text-[#CDAA63] text-[11px] font-bold px-2.5 py-1 rounded-md border border-[#CDAA63]/30">
          {project.completionYear}
        </div>
      </Link>

      {/* PROJECT CONTENT */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Location & Type */}
          <div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-xs text-gray-500 mb-2">
            <span className="flex items-center gap-1 text-[#214E34] font-medium">
              <MapPin className="w-3.5 h-3.5 text-[#CDAA63] shrink-0" />
              {project.location.split(',')[0]}
            </span>
            <span>•</span>
            <span className="truncate">{project.projectType}</span>
          </div>

          <Link href={`/du-an/${project.slug}`} className="block">
            <h3 className="text-base sm:text-lg font-bold text-[#18231C] leading-snug group-hover:text-[#214E34] transition-colors line-clamp-2">
              {project.title}
            </h3>
          </Link>

          <p className="mt-2.5 text-xs sm:text-sm text-[#686868] line-clamp-2 leading-relaxed">
            {project.shortDescription}
          </p>
        </div>

        {/* FOOTER LINK */}
        <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
          <span className="text-xs text-gray-500 font-medium">
            Cung cấp: <strong className="text-gray-800">{project.bambooSupplied.split('&')[0]}</strong>
          </span>

          <Link
            href={`/du-an/${project.slug}`}
            className="inline-flex items-center gap-1 text-xs font-bold text-[#214E34] hover:text-[#183B27] group-hover:translate-x-0.5 transition-transform"
          >
            <span>Xem dự án</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#CDAA63]" />
          </Link>
        </div>
      </div>
    </div>
  );
}
