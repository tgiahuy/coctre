"use client";

import React from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Truck,
  CheckCircle2,
  ArrowRight,
  Ruler,
  FileCheck,
  Building,
  HardHat
} from "lucide-react";
import SectionHeading from "@/components/common/SectionHeading";
import { useQuoteModal } from "@/context/QuoteModalContext";

export default function TechnicalSpecsSection() {
  const { openQuoteModal } = useQuoteModal();

  return (
    <section className="py-16 sm:py-24 bg-[#112017] text-white relative overflow-hidden">
      {/* Decorative background grid and lighting */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:3rem_3rem]" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#214E34]/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          eyebrow="TIÊU CHUẨN KỸ THUẬT & QUY CÁCH"
          title="CAM KẾT CHẤT LƯỢNG TẠI BÃI CỌC"
          subtitle="Tất cả sản phẩm cọc tre xuất kho đều qua quy trình chọn lọc nghiêm ngặt theo tiêu chuẩn thi công nền móng TCVN 9361:2012."
          alignment="center"
          theme="dark"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mt-12">
          {/* LEFT: Specification Table & Commitment Box (Moved from Hero / Image 2) */}
          <div className="lg:col-span-7">
            <div className="bg-[#18261E]/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 border-2 border-[#CDAA63]/50 shadow-2xl space-y-6 relative">
              <div className="absolute top-0 right-0 bg-[#CDAA63] text-[#18231C] text-xs font-black px-5 py-2 rounded-bl-2xl uppercase tracking-wider shadow-md">
                Cam Kết Tại Bãi
              </div>

              <div className="space-y-1">
                <span className="text-xs font-bold text-[#CDAA63] uppercase tracking-wider flex items-center gap-1.5">
                  <Ruler className="w-4 h-4" />
                  BẢNG THÔNG SỐ KỸ THUẬT TIÊU CHUẨN
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  Cọc Tre Luồng & Tre Gai Già Tuyển Chọn
                </h3>
              </div>

              {/* Spec Rows */}
              <div className="space-y-3 text-xs sm:text-sm text-gray-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-xl bg-black/30 border border-white/10 gap-1">
                  <span className="text-gray-400 font-medium">Chiều dài cọc:</span>
                  <span className="font-extrabold text-white text-sm">1.5m – 2m – 2.5m – 3m – 4m – 5m</span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-xl bg-black/30 border border-white/10 gap-1">
                  <span className="text-gray-400 font-medium">Đường kính gốc (Ø):</span>
                  <span className="font-extrabold text-[#CDAA63] text-sm sm:text-base">Ø 60mm đến Ø 110mm (Thân thẳng)</span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-xl bg-black/30 border border-white/10 gap-1">
                  <span className="text-gray-400 font-medium">Độ tuổi tre:</span>
                  <span className="font-extrabold text-white text-sm">3 – 6 năm tuổi (Tre đực đặc ruột, không mọt)</span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-xl bg-black/30 border border-white/10 gap-1">
                  <span className="text-gray-400 font-medium">Gia công đầu cọc:</span>
                  <span className="font-extrabold text-emerald-400 text-sm">Vát nhọn 3 cạnh chuẩn TCVN (Dài 15-20cm)</span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-xl bg-black/30 border border-white/10 gap-1">
                  <span className="text-gray-400 font-medium">Đầu đóng cọc:</span>
                  <span className="font-extrabold text-white text-sm">Cắt vuông góc, cách mắt tre 5cm chống toác</span>
                </div>
              </div>

              {/* Logistics Callout */}
              <div className="p-4 rounded-2xl bg-[#214E34]/80 border border-[#4A7C59] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <Truck className="w-5 h-5 text-[#CDAA63] shrink-0" />
                  <span className="text-xs sm:text-sm font-semibold text-gray-100">
                    Sẵn sàng điều 10+ xe tải giao tận chân hố móng trong ngày
                  </span>
                </div>
                <Link
                  href="/san-pham"
                  className="text-xs font-bold text-[#CDAA63] hover:text-white flex items-center gap-1 shrink-0"
                >
                  Xem bảng giá chi tiết
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* RIGHT: 4 PILLARS OF ASSURANCE */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#214E34] text-[#CDAA63] flex items-center justify-center font-bold shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h4 className="font-black text-base text-white">100% Cọc Tre Già Không Dập Nát</h4>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed pl-12">
                Không pha trộn tre non, tre cong queo hay tre ải. Thân tre đanh chắc, chịu lực ép máy cuốc hoặc búa rung cực tốt.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#214E34] text-[#CDAA63] flex items-center justify-center font-bold shrink-0">
                  <FileCheck className="w-5 h-5" />
                </div>
                <h4 className="font-black text-base text-white">Đầy Đủ Hóa Đơn VAT & Chứng Từ</h4>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed pl-12">
                Cung cấp đầy đủ hợp đồng kinh tế, hóa đơn giá trị gia tăng (VAT), biên bản giao nhận và chứng nhận nguồn gốc xuất xứ lâm sản hợp pháp.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#214E34] text-[#CDAA63] flex items-center justify-center font-bold shrink-0">
                  <HardHat className="w-5 h-5" />
                </div>
                <h4 className="font-black text-base text-white">Tư Vấn Biện Pháp Thi Công Miễn Phí</h4>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed pl-12">
                Hỗ trợ tính toán mật độ đóng cọc (25 cọc/m²), khối lượng cọc cần dùng cho từng loại địa chất nền đất yếu, móng bè, móng băng.
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={() => openQuoteModal()}
                className="w-full py-4 rounded-xl bg-[#E57C23] hover:bg-[#CC6914] text-white font-black text-sm sm:text-base shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>YÊU CẦU BÁO GIÁ THEO QUY CÁCH</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
