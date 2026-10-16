"use client";

import React, { useState, useMemo } from "react";
import { Search, Filter, Layers, CheckCircle2, ShieldCheck, Ruler, HelpCircle } from "lucide-react";
import Breadcrumb from "@/components/common/Breadcrumb";
import ProductCard from "@/components/common/ProductCard";
import SectionHeading from "@/components/common/SectionHeading";
import QuoteFormSection from "@/components/common/QuoteFormSection";
import { useProducts } from "@/lib/productStore";

export default function ProductsPage() {
  const products = useProducts();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLength, setSelectedLength] = useState<string>("all");

  const filterOptions = [
    { label: "Tất cả quy cách", value: "all" },
    { label: "Cọc 1,5m", value: "1.5" },
    { label: "Cọc 2m", value: "2.0" },
    { label: "Cọc 2,5m", value: "2.5" },
    { label: "Cọc 3m", value: "3.0" },
    { label: "Cọc 4m", value: "4.0" },
    { label: "Theo yêu cầu", value: "custom" },
  ];

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Filter by length
      if (selectedLength !== "all") {
        if (selectedLength === "custom" && p.slug !== "coc-tre-theo-yeu-cau") {
          return false;
        }
        if (selectedLength !== "custom") {
          const targetMeter = parseFloat(selectedLength);
          if (p.lengthMeters !== targetMeter) return false;
        }
      }

      // Filter by search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchName = p.name.toLowerCase().includes(q);
        const matchDesc = p.description.toLowerCase().includes(q);
        const matchDia = p.diameter.toLowerCase().includes(q);
        const matchApp = p.applications.some((app) => app.toLowerCase().includes(q));
        if (!matchName && !matchDesc && !matchDia && !matchApp) {
          return false;
        }
      }

      return true;
    });
  }, [searchQuery, selectedLength]);

  return (
    <div className="bg-[#F7F5EF] min-h-screen">
      {/* Breadcrumb */}
      <Breadcrumb items={[{ name: "Sản phẩm cọc tre" }]} />

      {/* Hero Title Section */}
      <div className="bg-[#18231C] text-white py-12 border-b border-[#2A3930]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-bold text-[#CDAA63] uppercase tracking-widest">
              BẢNG QUY CÁCH TIÊU CHUẨN
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-white">
              DANH MỤC CỌC TRE CÔNG TRÌNH
            </h1>
            <p className="text-sm sm:text-base text-gray-300">
              Cung cấp cọc tre già đực từ 1,5m đến 4m & gia công theo bản vẽ. Sẵn hàng số lượng lớn tại tổng kho, giao hàng nhanh 24/7.
            </p>
          </div>
        </div>
      </div>

      {/* FILTER & SEARCH BAR */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white p-4 sm:p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
          {/* Length Pills Filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            <Filter className="w-4 h-4 text-gray-400 shrink-0 mr-1 hidden sm:block" />
            {filterOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setSelectedLength(opt.value)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedLength === opt.value
                    ? "bg-[#214E34] text-white shadow-sm"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {/* Realtime Search Input */}
          <div className="relative w-full md:w-80 shrink-0">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Tìm theo kích thước, ứng dụng..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#214E34]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-3 text-xs text-gray-400 hover:text-gray-600"
              >
                Xóa
              </button>
            )}
          </div>
        </div>

        {/* RESULTS GRID */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-6">
            <span className="text-xs sm:text-sm font-bold text-gray-600">
              Hiển thị: <strong className="text-[#214E34]">{filteredProducts.length}</strong> quy cách cọc tre
            </span>
            <span className="text-xs text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full font-semibold border border-emerald-200">
              ✓ Sẵn hàng tại 2 bãi tập kết
            </span>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-300 p-8">
              <HelpCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-gray-800">
                Không tìm thấy quy cách phù hợp với từ khóa &ldquo;{searchQuery}&rdquo;
              </h3>
              <p className="text-xs text-gray-500 mt-1 max-w-md mx-auto">
                Chúng tôi nhận cưa cắt cọc tre theo mọi chiều dài và đường kính riêng biệt theo hồ sơ thiết kế của bạn.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedLength("all");
                }}
                className="mt-4 px-4 py-2 rounded-lg bg-[#214E34] text-white text-xs font-bold"
              >
                Xem tất cả cọc tre
              </button>
            </div>
          )}
        </div>

        {/* TECHNICAL NOTE BOX */}
        <div className="mt-16 bg-white p-6 sm:p-8 rounded-2xl border border-[#CDAA63]/40 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#214E34] text-[#CDAA63] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#18231C]">
                Tiêu chuẩn kỹ thuật cọc tre công trình tại Cọc Tre Huyền Dương
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 mt-1.5 leading-relaxed">
                Tất cả các loại cọc tre tại bãi chúng tôi đều được tuyển chọn từ tre đực già trên 3-5 năm tuổi, thân thẳng, thịt tre dày đặc ruột, không sâu mọt. Đầu cọc được máy vát nhọn 3 cạnh dài 15-25cm sắc bén, đầu trên cắt phẳng vuông góc đảm bảo không dập nát khi ép bằng máy cuốc hoặc búa đóng.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA SECTION */}
      <QuoteFormSection />
    </div>
  );
}
