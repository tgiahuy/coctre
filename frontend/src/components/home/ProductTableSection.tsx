"use client";

import React from "react";
import Link from "next/link";
import { Phone, MessageCircle, Check, ArrowRight, Ruler, CheckCircle2 } from "lucide-react";
import { siteConfig } from "@/data/config";
import { useQuoteModal } from "@/context/QuoteModalContext";

export default function ProductTableSection() {
  const { openQuoteModal } = useQuoteModal();

  const productRows = [
    {
      id: "coc-2m",
      name: "Cọc tre 2.0m",
      badge: "Phổ biến nhất",
      badgeColor: "bg-emerald-600 text-white",
      length: "2.0 mét (Đủ chiều dài)",
      diameter: "Ø 60mm – Ø 80mm",
      usage: "Móng nhà phố 1-3 tầng, móng bè, nhà dân dụng",
      stock: "Có sẵn 20.000+ cây tại bãi",
    },
    {
      id: "coc-25m",
      name: "Cọc tre 2.5m",
      badge: "Công trình chọn nhiều",
      badgeColor: "bg-[#214E34] text-white",
      length: "2.5 mét (Đủ chiều dài)",
      diameter: "Ø 70mm – Ø 90mm",
      usage: "Nền đất yếu, móng nhà 3-4 tầng, cống hộp",
      stock: "Có sẵn 15.000+ cây tại bãi",
    },
    {
      id: "coc-3m",
      name: "Cọc tre 3.0m",
      badge: "Tre già đực tuyển",
      badgeColor: "bg-[#8C6219] text-white",
      length: "3.0 mét (Đủ chiều dài)",
      diameter: "Ø 80mm – Ø 100mm",
      usage: "Kè bờ kênh, bờ ao sông, móng sâu nền bùn",
      stock: "Có sẵn 15.000+ cây tại bãi",
    },
    {
      id: "coc-15m",
      name: "Cọc tre 1.5m",
      badge: "Tiết kiệm",
      badgeColor: "bg-gray-600 text-white",
      length: "1.5 mét (Đủ chiều dài)",
      diameter: "Ø 50mm – Ø 70mm",
      usage: "Gia cố rãnh mương, bờ bao ngắn, phụ trợ",
      stock: "Có sẵn 10.000+ cây tại bãi",
    },
    {
      id: "coc-4m",
      name: "Cọc tre 4.0m & Cọc Theo Yêu Cầu",
      badge: "Hàng đặt",
      badgeColor: "bg-[#E57C23] text-white",
      length: "4.0m – 5.0m hoặc cắt theo yêu cầu",
      diameter: "Ø 80mm – Ø 110mm (Gốc to)",
      usage: "Dự án đê kè lớn, cầu đường, hạ tầng khu công nghiệp",
      stock: "Giao ngay 1-2 ngày",
    },
  ];

  return (
    <section className="py-12 sm:py-16 bg-[#F7F5EF] border-t border-b border-gray-200" id="bang-gia-coc">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Header: Clean & Big text */}
        <div className="text-center max-w-3xl mx-auto mb-8 space-y-2">
          <span className="inline-block px-4 py-1 rounded-full bg-[#214E34]/10 text-[#214E34] text-xs sm:text-sm font-black uppercase tracking-wider">
            BẢNG QUY CÁCH & KÍCH THƯỚC CỌC TRE TẠI BÃI
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-[#18231C] tracking-tight">
            CÁC LOẠI CỌC TRE CÓ SẴN TẠI TỔNG KHO
          </h2>
          <p className="text-sm sm:text-base text-gray-600 font-medium">
            100% tre già đực Hòa Bình, thân thẳng, cắt vát nhọn 3 cạnh chuẩn TCVN 9361:2012. Quý khách có thể xem bảng dưới đây và bấm nút gọi để nhận giá tại bãi tốt nhất.
          </p>
        </div>

        {/* Big Table / List (Highly readable on Desktop & Mobile) */}
        <div className="bg-white rounded-2xl sm:rounded-3xl border-2 border-gray-200 shadow-md overflow-hidden">
          
          {/* Desktop Table Header */}
          <div className="hidden lg:grid grid-cols-12 gap-4 bg-[#18261E] text-white p-4 font-black text-sm uppercase tracking-wider">
            <div className="col-span-3">Loại Cọc Tre</div>
            <div className="col-span-2">Kích Thước</div>
            <div className="col-span-2">Đường Kính (Ø)</div>
            <div className="col-span-3">Mục Đích Sử Dụng</div>
            <div className="col-span-2 text-right">Liên Hệ Đặt Hàng</div>
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-gray-200">
            {productRows.map((item, idx) => (
              <div
                key={item.id}
                className={`p-4 sm:p-6 transition-colors hover:bg-emerald-50/50 ${
                  idx % 2 === 0 ? "bg-white" : "bg-[#FAF8F5]"
                }`}
              >
                {/* Large Screen Layout */}
                <div className="hidden lg:grid grid-cols-12 gap-4 items-center">
                  {/* Col 1: Name & Badge */}
                  <div className="col-span-3 space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-black text-[#18231C]">
                        {item.name}
                      </h3>
                      <span className={`text-[11px] font-extrabold px-2 py-0.5 rounded-full ${item.badgeColor}`}>
                        {item.badge}
                      </span>
                    </div>
                    <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {item.stock}
                    </span>
                  </div>

                  {/* Col 2: Length */}
                  <div className="col-span-2 font-bold text-gray-900 text-base">
                    {item.length}
                  </div>

                  {/* Col 3: Diameter */}
                  <div className="col-span-2 font-extrabold text-[#214E34] text-base">
                    {item.diameter}
                  </div>

                  {/* Col 4: Usage */}
                  <div className="col-span-3 text-xs sm:text-sm text-gray-600 font-medium">
                    {item.usage}
                  </div>

                  {/* Col 5: Actions */}
                  <div className="col-span-2 flex items-center justify-end gap-2">
                    <a
                      href={`tel:${siteConfig.hotline}`}
                      className="px-3.5 py-2.5 rounded-xl bg-[#E57C23] hover:bg-[#CC6914] text-white font-extrabold text-xs flex items-center gap-1 shadow-sm transition-transform active:scale-95"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Gọi Báo Giá</span>
                    </a>
                    <a
                      href={siteConfig.zaloUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl bg-[#0068FF] hover:bg-[#0052cc] text-white font-bold text-xs flex items-center justify-center shadow-sm"
                      title="Nhắn Zalo nhận báo giá"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                {/* Mobile / Tablet Card Layout (Very clean & large text) */}
                <div className="lg:hidden space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-black text-[#18231C]">
                          {item.name}
                        </h3>
                        <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${item.badgeColor}`}>
                          {item.badge}
                        </span>
                      </div>
                      <p className="text-xs text-emerald-700 font-semibold mt-0.5">
                        {item.stock}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-gray-500 block">Đường kính</span>
                      <span className="font-black text-[#214E34] text-sm sm:text-base">
                        {item.diameter}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-gray-600 bg-black/5 p-2.5 rounded-xl">
                    <strong>Mục đích:</strong> {item.usage}
                  </p>

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <a
                      href={`tel:${siteConfig.hotline}`}
                      className="py-3 rounded-xl bg-[#E57C23] text-white font-black text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-md active:scale-95"
                    >
                      <Phone className="w-4 h-4" />
                      <span>Gọi: {siteConfig.hotlineFormatted}</span>
                    </a>
                    <a
                      href={siteConfig.zaloUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-3 rounded-xl bg-[#0068FF] text-white font-black text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-md active:scale-95"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Nhắn Tin Zalo</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Notification */}
          <div className="p-4 sm:p-5 bg-[#18261E] text-white flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <div className="text-xs sm:text-sm text-gray-200">
              <strong className="text-[#CDAA63]">Lưu ý:</strong> Chúng tôi nhận chặt và sơ chế cọc tre theo đúng kích thước bản vẽ kỹ thuật của mọi công trình.
            </div>
            <button
              onClick={() => openQuoteModal()}
              className="px-6 py-2.5 rounded-xl bg-[#214E34] hover:bg-[#2c6845] text-white font-bold text-xs sm:text-sm border border-[#4A7C59] cursor-pointer whitespace-nowrap"
            >
              Yêu Cầu Báo Giá Nhanh Theo Số Lượng
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
