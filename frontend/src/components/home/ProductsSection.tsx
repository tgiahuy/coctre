import React from "react";
import Link from "next/link";
import { ArrowRight, Layers } from "lucide-react";
import SectionHeading from "@/components/common/SectionHeading";
import ProductCard from "@/components/common/ProductCard";
import { products } from "@/data/products";

export default function ProductsSection() {
  return (
    <section className="py-16 sm:py-24 bg-[#F7F5EF] border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="DANH MỤC SẢN PHẨM"
          title="CỌC TRE CÔNG TRÌNH"
          subtitle="Đa dạng kích thước, đáp ứng từng loại địa tầng nền móng, bờ kè và yêu cầu kỹ thuật thi công."
          alignment="center"
        />

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* View all button */}
        <div className="mt-12 text-center">
          <Link
            href="/san-pham"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#214E34] hover:bg-[#183B27] text-white font-bold text-sm sm:text-base shadow-md hover:shadow-xl transition-all"
          >
            <Layers className="w-5 h-5 text-[#CDAA63]" />
            <span>XEM TẤT CẢ QUY CÁCH CỌC TRE</span>
            <ArrowRight className="w-4 h-4 text-[#CDAA63]" />
          </Link>
        </div>
      </div>
    </section>
  );
}
