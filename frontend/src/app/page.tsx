import React from "react";
import HeroSection from "@/components/home/HeroSection";
import AboutSection from "@/components/home/AboutSection";
import CompactProductsSection from "@/components/home/CompactProductsSection";
import FeaturedProjectsSection from "@/components/home/FeaturedProjectsSection";
import DirectContactSection from "@/components/home/DirectContactSection";

export default function HomePage() {
  return (
    <>
      {/* 1. HERO BANNER: Banner Xanh Tre Thiên Nhiên, Chữ To Rõ Ràng & Hotline 1 Chạm */}
      <HeroSection />

      {/* 2. SẢN PHẨM NỔI BẬT: 4 Ô Nhỏ Xếp Theo Chiều Ngang Tinh Gọn */}
      <CompactProductsSection />

      {/* 3. DỰ ÁN TIÊU BIỂU: Các Công Trình Đã Cung Cấp Cọc Tre */}
      <FeaturedProjectsSection />

      {/* 4. GIỚI THIỆU VỀ CÔNG TY & SỨ MỆNH: Về Chúng Tôi */}
      <AboutSection />

      {/* 5. LIÊN HỆ TRỰC TIẾP: Hộp Gọi Điện / Zalo 1 Chạm Nhanh Gọn */}
      <DirectContactSection />
    </>
  );
}
