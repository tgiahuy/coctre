"use client";

import React from "react";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden bg-[#183925]" id="banner-chinh">
      <div className="w-full relative aspect-[1920/700] max-h-[700px] shadow-sm">
        <Image
          src="/images/banner/banner-coctre-viet.webp"
          alt="Cọc Tre Việt - Nền Móng Tương Lai - Giá Rẻ Cho Mọi Công Trình"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center w-full h-full"
        />
      </div>
    </section>
  );
}
