"use client";

import React from "react";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden bg-[#183925]" id="banner-chinh">
      <div className="w-full relative aspect-[2/1] shadow-sm">
        <Image
          src="/images/banner/coc-tre-cong-trinh.png"
          alt="Cọc Tre Việt - Vững Chắc Mọi Công Trình - Cung Cấp Số Lượng Lớn Giá Cạnh Tranh"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center w-full h-full"
        />
      </div>
    </section>
  );
}
