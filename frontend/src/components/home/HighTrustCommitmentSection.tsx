"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  CheckCircle2,
  Truck,
  Warehouse,
  FileCheck,
  Phone,
  ArrowRight,
  TreeDeciduous,
  Ruler
} from "lucide-react";
import { siteConfig } from "@/data/config";

export default function HighTrustCommitmentSection() {
  const commitments = [
    {
      num: "01",
      title: "100% Tre Già Đực 3 – 6 Năm Tuổi",
      desc: "Khai thác trực tiếp từ rừng tre luồng Hòa Bình. Thân thẳng, thịt dày đặc ruột, chịu lực ép máy cuốc và búa rung cực tốt.",
      icon: TreeDeciduous,
      color: "bg-[#214E34] text-[#CDAA63]",
    },
    {
      num: "02",
      title: "Vát Nhọn 3 Cạnh Chuẩn Kỹ Thuật TCVN",
      desc: "Đầu cọc được vát nhọn 3 cạnh dài 15-20cm để dễ xuyên đất móng. Đầu trên cắt phẳng vuông góc chống toác khi ép.",
      icon: Ruler,
      color: "bg-[#214E34] text-[#CDAA63]",
    },
    {
      num: "03",
      title: "Giao Hàng Tận Chân Hố Móng 24/7",
      desc: "Hệ thống kho bãi rộng lớn tại Hòa Bình & Hà Nội luôn sẵn 50.000+ cọc. Đội xe tải từ 2.5T đến 15T giao xuyên đêm.",
      icon: Truck,
      color: "bg-[#214E34] text-[#CDAA63]",
    },
    {
      num: "04",
      title: "Kiểm Tra Cọc Thoải Mái Trước Khi Nhận",
      desc: "Khách hàng được kiểm tra đường kính và độ già của cọc ngay tại công trình trước khi hạ tải. Đầy đủ hóa đơn VAT.",
      icon: ShieldCheck,
      color: "bg-[#214E34] text-[#CDAA63]",
    },
  ];

  return (
    <section className="py-14 sm:py-20 bg-white" id="cam-ket-uy-tin">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
          <span className="inline-block px-4 py-1 rounded-full bg-[#214E34]/10 text-[#214E34] text-xs sm:text-sm font-black uppercase tracking-wider">
            UY TÍN & CHẤT LƯỢNG TẠI BÃI CỌC
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-[#18231C] tracking-tight">
            4 CAM KẾT VÀNG KHI MUA CỌC TRE CỦA CHÚNG TÔI
          </h2>
          <p className="text-sm sm:text-base text-gray-600 font-medium">
            Với hơn 12 năm phục vụ các nhà thầu và bà con xây dựng, chúng tôi luôn đặt chất lượng cây cọc và sự an tâm của khách hàng lên hàng đầu.
          </p>
        </div>

        {/* 4 Large Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-12">
          {commitments.map((c) => {
            const Icon = c.icon;
            return (
              <div
                key={c.num}
                className="p-6 sm:p-8 rounded-3xl bg-[#F7F5EF] border-2 border-[#E7E3D8] hover:border-[#214E34] transition-all flex flex-col sm:flex-row items-start gap-5 shadow-sm"
              >
                <div className={`w-14 h-14 rounded-2xl ${c.color} flex items-center justify-center font-black shrink-0 shadow-md`}>
                  <Icon className="w-7 h-7" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-[#8C6219] uppercase">
                      Cam kết {c.num}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-black text-[#18231C]">
                    {c.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed font-normal">
                    {c.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Real Photos of Yard & Facilities */}
        <div className="rounded-3xl bg-[#18261E] text-white p-6 sm:p-10 border border-[#2B3E32] shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-bold text-[#CDAA63] uppercase tracking-wider block">
                HÌNH ẢNH KHO BÃI THỰC TẾ
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                Tổng Kho Cọc Tre Hòa Bình & Hà Nội
              </h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                Mời quý khách hàng và các bác cai thầu có thể qua trực tiếp bãi cọc để xem chất lượng tre già và đặt xe giao hàng tận nơi.
              </p>
              
              <div className="pt-2 space-y-2 text-xs sm:text-sm text-gray-200">
                <p>📍 <strong>Bãi 1:</strong> {siteConfig.warehouse1}</p>
                <p>📍 <strong>Bãi 2:</strong> {siteConfig.warehouse2}</p>
              </div>

              <div className="pt-3">
                <a
                  href={`tel:${siteConfig.hotline}`}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#E57C23] hover:bg-[#CC6914] text-white font-extrabold text-sm shadow-md transition-transform active:scale-95"
                >
                  <Phone className="w-4 h-4" />
                  <span>Gọi Chỉ Đường Tới Bãi: {siteConfig.hotlineFormatted}</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-2 gap-3 sm:gap-4">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border-2 border-white/20">
                <Image
                  src="/images/banner/bamboo-poles.jpg"
                  alt="Bãi tập kết cọc tre"
                  fill
                  sizes="300px"
                  className="object-cover"
                />
                <div className="absolute bottom-2 left-2 right-2 bg-black/60 text-[11px] font-bold text-center py-1 rounded text-white backdrop-blur-sm">
                  Cọc xếp gọn sẵn giao
                </div>
              </div>

              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border-2 border-white/20">
                <Image
                  src="/images/banner/bamboo-vertical.jpg"
                  alt="Rừng tre già nguyên liệu"
                  fill
                  sizes="300px"
                  className="object-cover"
                />
                <div className="absolute bottom-2 left-2 right-2 bg-black/60 text-[11px] font-bold text-center py-1 rounded text-white backdrop-blur-sm">
                  Tre già đực chọn lọc
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
