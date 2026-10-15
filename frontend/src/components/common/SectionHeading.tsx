import React from "react";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  alignment?: "left" | "center";
  theme?: "light" | "dark";
}

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  alignment = "center",
  theme = "light",
}: SectionHeadingProps) {
  const isCenter = alignment === "center";
  const isDark = theme === "dark";

  return (
    <div className={`mb-10 sm:mb-14 ${isCenter ? "text-center max-w-3xl mx-auto" : "max-w-3xl"}`}>
      {eyebrow && (
        <div
          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-widest mb-3 ${
            isDark
              ? "bg-[#CDAA63]/15 text-[#CDAA63] border border-[#CDAA63]/30"
              : "bg-[#214E34]/10 text-[#214E34] border border-[#214E34]/20"
          }`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${isDark ? "bg-[#CDAA63]" : "bg-[#214E34]"}`}></span>
          {eyebrow}
        </div>
      )}

      <h2
        className={`text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight ${
          isDark ? "text-white" : "text-[#18231C]"
        }`}
      >
        {title}
      </h2>

      {subtitle && (
        <p
          className={`mt-3 sm:mt-4 text-sm sm:text-base leading-relaxed ${
            isDark ? "text-gray-300" : "text-[#686868]"
          }`}
        >
          {subtitle}
        </p>
      )}

      {isCenter && (
        <div className="flex items-center justify-center gap-1.5 mt-4">
          <div className={`h-1 w-12 rounded-full ${isDark ? "bg-[#CDAA63]" : "bg-[#214E34]"}`}></div>
          <div className={`h-1 w-3 rounded-full ${isDark ? "bg-[#CDAA63]/60" : "bg-[#CDAA63]"}`}></div>
        </div>
      )}
    </div>
  );
}
