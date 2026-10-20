"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  CheckCircle2,
  Phone,
  MessageCircle,
  FileText,
  Truck,
  ShieldCheck,
  Star,
  ArrowRight,
  Send,
  AlertCircle,
  Loader2,
  ChevronLeft,
  ChevronRight,
  Camera,
} from "lucide-react";
import Breadcrumb from "@/components/common/Breadcrumb";
import ProductCard from "@/components/common/ProductCard";
import QuoteFormSection from "@/components/common/QuoteFormSection";
import { useProductsState } from "@/lib/productStore";
import { initialReviews, ProductReview } from "@/data/reviews";
import { useSiteConfig } from "@/lib/configStore";
import { useQuoteModal } from "@/context/QuoteModalContext";
import { Product } from "@/data/products";

interface ProductDetailClientProps {
  slug: string;
  initialProduct?: Product;
}

export default function ProductDetailClient({
  slug,
  initialProduct,
}: ProductDetailClientProps) {
  const siteConfig = useSiteConfig();
  const { data: products, isLoading, error } = useProductsState();
  const liveProduct = products.find((item) => item.slug === slug || item.id === slug);
  const product = initialProduct
    ? (isLoading ? initialProduct : (liveProduct || initialProduct))
    : liveProduct;
  const { openQuoteModal } = useQuoteModal();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<"desc" | "specs" | "apps" | "shipping" | "reviews">("desc");

  const nextImage = () => {
    if (!product?.images?.length) return;
    setActiveImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    if (!product?.images?.length) return;
    setActiveImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  // Reviews state
  const [submittedReviews, setSubmittedReviews] = useState<ProductReview[]>([]);
  const reviewIdCounter = useRef(0);
  const [reviewAuthor, setReviewAuthor] = useState("");
  const [reviewCompany, setReviewCompany] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");
  const [reviewSuccess, setReviewSuccess] = useState(false);
  const [reviewError, setReviewError] = useState("");

  if (isLoading && !product) {
    return (
      <div className="min-h-screen bg-[#F7F5EF] flex items-center justify-center p-4">
        <div className="text-center space-y-3 max-w-md bg-white p-8 rounded-3xl border border-gray-200 shadow-sm">
          <Loader2 className="w-8 h-8 animate-spin text-[#214E34] mx-auto" />
          <h3 className="text-base font-bold text-gray-900">Đang tải thông tin sản phẩm...</h3>
          <p className="text-xs text-gray-500">Vui lòng chờ trong giây lát.</p>
        </div>
      </div>
    );
  }

  if (error && !product) {
    return (
      <div className="min-h-screen bg-[#F7F5EF] flex items-center justify-center p-4">
        <div className="text-center space-y-4 max-w-md bg-white p-8 rounded-3xl border border-red-200 shadow-sm">
          <AlertCircle className="w-8 h-8 text-red-600 mx-auto" />
          <h3 className="text-base font-bold text-red-900">Lỗi khi tải dữ liệu sản phẩm</h3>
          <p className="text-xs text-red-600">{error}</p>
          <Link
            href="/san-pham"
            className="inline-block px-5 py-2.5 rounded-xl bg-[#214E34] text-white font-bold text-xs"
          >
            Quay lại danh mục sản phẩm
          </Link>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#F7F5EF] flex items-center justify-center p-4">
        <div className="text-center space-y-4 max-w-md bg-white p-8 rounded-3xl border border-gray-200 shadow-sm">
          <AlertCircle className="w-8 h-8 text-amber-500 mx-auto" />
          <h2 className="text-xl font-black text-gray-900">Không tìm thấy sản phẩm</h2>
          <p className="text-xs text-gray-600">Sản phẩm bạn đang tìm kiếm có thể đã bị thay đổi hoặc không tồn tại.</p>
          <Link
            href="/san-pham"
            className="inline-block px-5 py-2.5 rounded-xl bg-[#214E34] text-white font-bold text-xs"
          >
            Quay lại danh mục sản phẩm
          </Link>
        </div>
      </div>
    );
  }

  const relatedProducts = products
    .filter((p) => p.slug !== product.slug && p.id !== product.id)
    .slice(0, 3);

  const reviewsList = [
    ...submittedReviews,
    ...initialReviews.filter((review) => review.productId === product.id || review.productId === product.slug),
  ];

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewAuthor.trim() || !reviewComment.trim()) {
      setReviewError("Vui lòng nhập họ tên và nội dung đánh giá");
      return;
    }

    const newRev: ProductReview = {
      id: `${product.id}-local-${++reviewIdCounter.current}`,
      productId: product.id,
      author: reviewAuthor.trim(),
      company: reviewCompany.trim() || "Nhà thầu xây dựng",
      rating: reviewRating,
      date: new Date().toLocaleDateString("vi-VN"),
      comment: reviewComment.trim(),
      verified: true,
    };

    setSubmittedReviews([newRev, ...submittedReviews]);
    setReviewAuthor("");
    setReviewCompany("");
    setReviewComment("");
    setReviewError("");
    setReviewSuccess(true);
    setTimeout(() => setReviewSuccess(false), 5000);
  };

  const tabs: { key: "desc" | "specs" | "apps" | "shipping" | "reviews"; label: string }[] = [
    { key: "desc", label: "MÔ TẢ CHI TIẾT" },
    { key: "specs", label: "THÔNG SỐ KỸ THUẬT" },
    { key: "apps", label: "ỨNG DỤNG THI CÔNG" },
    { key: "shipping", label: "VẬN CHUYỂN & KHO BÃI" },
    { key: "reviews", label: `ĐÁNH GIÁ (${reviewsList.length})` },
  ];

  return (
    <div className="bg-[#F7F5EF] min-h-screen">
      {/* BREADCRUMB */}
      <Breadcrumb
        items={[
          { name: "Sản phẩm cọc tre", href: "/san-pham" },
          { name: product.name },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* PRODUCT TOP HERO SECTION */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-gray-200 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* LEFT: IMAGE GALLERY */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border-2 border-gray-100 bg-[#18231C]/5 shadow-inner group/preview">
              <Image
                src={product.images?.[activeImageIndex] || product.images?.[0] || "/images/products/warehouse/kho-coctre-08.jpg"}
                alt={product.name}
                fill
                className="object-cover transition-all duration-300"
                priority
              />

              {/* Stock badge */}
              <div className="absolute top-4 left-4 bg-[#214E34] text-[#EED59B] text-xs font-black px-3.5 py-1.5 rounded-full flex items-center gap-1.5 shadow-md border border-[#CDAA63]/30">
                <CheckCircle2 className="w-4 h-4 text-[#CDAA63]" />
                <span>{(product.stockStatus || "còn hàng").toUpperCase()}</span>
              </div>

              {/* Image counter badge */}
              {product.images && product.images.length > 1 && (
                <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-md">
                  <Camera className="w-3.5 h-3.5 text-[#CDAA63]" />
                  <span>Ảnh {activeImageIndex + 1} / {product.images.length}</span>
                </div>
              )}

              {/* Next/Prev Navigation Buttons */}
              {product.images && product.images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      prevImage();
                    }}
                    className="absolute left-2.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-all opacity-80 hover:opacity-100 cursor-pointer shadow-md"
                    aria-label="Ảnh trước"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      nextImage();
                    }}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-all opacity-80 hover:opacity-100 cursor-pointer shadow-md"
                    aria-label="Ảnh tiếp theo"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Selectors */}
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-5 sm:grid-cols-6 gap-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                      activeImageIndex === idx
                        ? "border-[#214E34] ring-2 ring-[#CDAA63] scale-105"
                        : "border-gray-200 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} ảnh ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Quick Guarantees bar under gallery */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3 bg-[#F7F5EF] rounded-xl border border-[#E7E3D8] text-xs flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#214E34] shrink-0" />
                <span className="font-semibold text-gray-700">Chuẩn TCVN 9361:2012</span>
              </div>
              <div className="p-3 bg-[#F7F5EF] rounded-xl border border-[#E7E3D8] text-xs flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#CDAA63] shrink-0" />
                <span className="font-semibold text-gray-700">Xe tải giao 24/7 tận nơi</span>
              </div>
            </div>
          </div>

          {/* RIGHT: PRODUCT INFO & CTAS */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-widest bg-[#214E34]/10 text-[#214E34] mb-2">
                CỌC TRE CÔNG TRÌNH
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#18231C] leading-tight">
                {product.name}
              </h1>

              {/* Rating summary */}
              {reviewsList.length > 0 ? (
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex text-[#E57C23]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-gray-700">
                    {(reviewsList.reduce((acc, r) => acc + r.rating, 0) / reviewsList.length).toFixed(1)} / 5.0
                  </span>
                  <span className="text-xs text-gray-400">
                    ({reviewsList.length} đánh giá thực tế từ nhà thầu)
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                  <div className="flex text-gray-300">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span>Chưa có đánh giá nào từ khách hàng</span>
                </div>
              )}
            </div>

            {/* Key Specs Matrix */}
            <div className="p-4 bg-[#F7F5EF] rounded-2xl border border-[#E7E3D8] space-y-2 text-xs sm:text-sm">
              <div className="flex justify-between py-1 border-b border-gray-200/80">
                <span className="text-gray-500">Xuất xứ khai thác:</span>
                <strong className="text-gray-900">{product.origin}</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-200/80">
                <span className="text-gray-500">Chiều dài tiêu chuẩn:</span>
                <strong className="text-[#214E34] font-bold">{product.length}</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-200/80">
                <span className="text-gray-500">Đường kính gốc:</span>
                <strong className="text-gray-900">{product.diameter}</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-200/80">
                <span className="text-gray-500">Chủng loại tre:</span>
                <strong className="text-gray-900">{product.bambooType}</strong>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-gray-500">Đơn giá tham khảo:</span>
                <div className="text-right">
                  <span className="text-lg font-black text-[#E57C23]">
                    Liên hệ báo giá tại bãi
                  </span>
                  <span className="block text-[10px] text-gray-400 font-normal">
                    (Giá tốt theo khối lượng công trình)
                  </span>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="space-y-3 pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => openQuoteModal(product.slug)}
                  className="w-full py-4 px-6 rounded-2xl bg-[#214E34] hover:bg-[#183B27] text-white font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all cursor-pointer border border-[#CDAA63]/30"
                >
                  <FileText className="w-5 h-5 text-[#CDAA63]" />
                  <span>NHẬN BÁO GIÁ CỌC</span>
                </button>

                <a
                  href={`tel:${siteConfig.hotline}`}
                  className="w-full py-4 px-6 rounded-2xl bg-[#E57C23] hover:bg-[#D96B14] text-white font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all cursor-pointer text-center"
                >
                  <Phone className="w-5 h-5 animate-bounce" />
                  <span>GỌI: {siteConfig.hotlineFormatted}</span>
                </a>
              </div>

              <a
                href={`https://zalo.me/${siteConfig.zalo.replace(/\s+/g, "")}`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-[#0068FF]/10 hover:bg-[#0068FF]/20 text-[#0068FF] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 border border-[#0068FF]/30 transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat Zalo tư vấn kỹ thuật đóng móng</span>
              </a>
            </div>
          </div>
        </div>

        {/* TABS SECTION */}
        <div className="mt-12 bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-gray-200 shadow-sm">
          {/* TAB HEADERS */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 border-b border-gray-200 scrollbar-none">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`py-3 px-5 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all cursor-pointer ${
                  activeTab === tab.key
                    ? "bg-[#214E34] text-white shadow-sm"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* TAB CONTENTS */}
          <div className="pt-8">
            {/* 1. MÔ TẢ CHI TIẾT */}
            {activeTab === "desc" && (
              <div className="space-y-6 text-sm text-gray-700 leading-relaxed">
                <div>
                  <h3 className="text-lg font-black text-[#18231C] mb-2">Đặc điểm nhận diện và chất lượng</h3>
                  <p>{product.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                  <div className="p-4 rounded-2xl bg-[#F7F5EF] border border-[#E7E3D8]">
                    <h4 className="font-bold text-gray-900 mb-1 flex items-center gap-1.5 text-xs">
                      <CheckCircle2 className="w-4 h-4 text-[#214E34]" /> Cọc tre đực già tự nhiên
                    </h4>
                    <p className="text-xs text-gray-600">
                      Được tuyển chọn từ vùng tre đá, tre đực Hòa Bình, Phú Thọ. Cọc từ 2.5 - 3 năm tuổi, thịt tre dày, dẻo dai và không bị mục giòn.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#F7F5EF] border border-[#E7E3D8]">
                    <h4 className="font-bold text-gray-900 mb-1 flex items-center gap-1.5 text-xs">
                      <CheckCircle2 className="w-4 h-4 text-[#214E34]" /> Gia công vát nhọn chuẩn kỹ thuật
                    </h4>
                    <p className="text-xs text-gray-600">
                      Gốc cọc được vát nhọn 3 cạnh dài 15 - 20cm hỗ trợ cắm xuyên các lớp đất sét bùn dễ dàng. Đầu ngọn phẳng vuông góc hạn chế toác đầu cọc khi đóng.
                    </p>
                  </div>
                </div>

                {/* Real Warehouse Photos Gallery */}
                {product.images && product.images.length > 1 && (
                  <div className="pt-6 border-t border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-base font-bold text-[#18231C] flex items-center gap-2">
                        <Camera className="w-4 h-4 text-[#214E34]" />
                        <span>Hình ảnh thực tế tại kho cọc tre & xưởng chế biến 331 Phố Vác</span>
                      </h4>
                      <span className="text-xs text-[#214E34] font-semibold bg-[#EBF3EE] px-2.5 py-1 rounded-full">
                        {product.images.length} ảnh thực tế
                      </span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {product.images.map((img, idx) => (
                        <div
                          key={idx}
                          onClick={() => {
                            setActiveImageIndex(idx);
                            window.scrollTo({ top: 120, behavior: "smooth" });
                          }}
                          className="group relative aspect-[4/3] rounded-2xl overflow-hidden border border-gray-200 shadow-sm cursor-pointer hover:shadow-md transition-all"
                        >
                          <Image
                            src={img}
                            alt={`${product.name} kho hàng ảnh ${idx + 1}`}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2.5">
                            <span className="text-white text-xs font-semibold flex items-center gap-1">
                              Xem ảnh {idx + 1}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 italic mt-3 text-center">
                      * Hình ảnh thực tế được chụp trực tiếp tại tổng kho Cọc Tre Dương Huyền (331 Phố Vác, Dân Hòa, Hà Nội). Khách hàng có thể đến trực tiếp kiểm tra hàng trước khi bốc xe.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* 2. THÔNG SỐ KỸ THUẬT */}
            {activeTab === "specs" && (
              <div className="space-y-4">
                <table className="w-full text-xs sm:text-sm text-left border-collapse">
                  <tbody>
                    <tr className="border-b border-gray-200">
                      <td className="py-3 px-4 font-bold text-gray-600 bg-gray-50/70 w-1/3">Chiều dài cọc</td>
                      <td className="py-3 px-4 text-gray-900">{product.length} (Dung sai ± 5cm)</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-3 px-4 font-bold text-gray-600 bg-gray-50/70">Đường kính gốc (D)</td>
                      <td className="py-3 px-4 text-gray-900">{product.diameter}</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-3 px-4 font-bold text-gray-600 bg-gray-50/70">Chủng loại tre</td>
                      <td className="py-3 px-4 text-gray-900">{product.bambooType}</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-3 px-4 font-bold text-gray-600 bg-gray-50/70">Độ ẩm bảo quản</td>
                      <td className="py-3 px-4 text-gray-900">Tre tươi giữ ẩm bảo bãi, sẵn sàng đóng móng</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-3 px-4 font-bold text-gray-600 bg-gray-50/70">Tiêu chuẩn nghiệm thu</td>
                      <td className="py-3 px-4 text-gray-900">TCVN 9361:2012 (Tiêu chuẩn thi công & nghiệm thu cọc nền)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {/* 3. ỨNG DỤNG THI CÔNG */}
            {activeTab === "apps" && (
              <div className="space-y-4">
                <h3 className="text-base font-bold text-[#18231C]">Các loại hình công trình phù hợp:</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {product.applications.map((app, i) => (
                    <div key={i} className="p-3 bg-gray-50 rounded-xl border border-gray-200 flex items-center gap-2.5 text-xs text-gray-800 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-[#214E34] shrink-0" />
                      <span>{app}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. VẬN CHUYỂN & KHO BÃI */}
            {activeTab === "shipping" && (
              <div className="space-y-4 text-xs sm:text-sm text-gray-700 leading-relaxed">
                <div className="p-4 bg-amber-50/60 rounded-2xl border border-amber-200/70 space-y-2">
                  <h4 className="font-bold text-amber-900">Cam kết giao hàng từ Tổng kho Huyền Dương:</h4>
                  <ul className="list-disc list-inside space-y-1 text-amber-950/80">
                    <li>Đội xe tải trọng tải 1.25T - 15T giao hàng 24/7 đến các ngõ ngách, phố cấm tại Hà Nội và các tỉnh phía Bắc.</li>
                    <li>Có dịch vụ bốc xếp cọc xuống chân công trình theo yêu cầu của nhà thầu.</li>
                    <li>Kiểm tra số lượng và chất lượng cọc ngay tại công trường trước khi thanh toán.</li>
                  </ul>
                </div>
              </div>
            )}

            {/* 5. ĐÁNH GIÁ THỰC TẾ */}
            {activeTab === "reviews" && (
              <div className="space-y-8">
                {/* List of reviews */}
                <div className="space-y-4">
                  {reviewsList.map((rev) => (
                    <div key={rev.id} className="p-4 rounded-2xl border border-gray-200 bg-gray-50/50 space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <div>
                          <strong className="text-gray-900 font-bold block">{rev.author}</strong>
                          <span className="text-gray-500 text-[11px]">{rev.company}</span>
                        </div>
                        <span className="text-gray-400 text-[11px]">{rev.date}</span>
                      </div>
                      <div className="flex text-[#E57C23]">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                      <p className="text-gray-700">{rev.comment}</p>
                    </div>
                  ))}
                </div>

                {/* Form to submit review */}
                <div className="p-6 rounded-2xl border border-gray-200 bg-white space-y-4">
                  <h4 className="font-bold text-sm text-[#18231C]">Gửi đánh giá của bạn</h4>

                  {reviewSuccess && (
                    <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Cảm ơn bạn! Đánh giá đã được ghi nhận.</span>
                    </div>
                  )}

                  {reviewError && (
                    <div className="p-3 bg-red-50 border border-red-200 text-red-800 rounded-xl text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-red-600" />
                      <span>{reviewError}</span>
                    </div>
                  )}

                  <form onSubmit={handleReviewSubmit} className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-gray-700 mb-1">
                          Họ và tên *
                        </label>
                        <input
                          type="text"
                          value={reviewAuthor}
                          onChange={(e) => setReviewAuthor(e.target.value)}
                          placeholder="Nguyễn Văn A"
                          className="w-full px-3 py-2 rounded-lg border border-gray-300 text-xs bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-gray-700 mb-1">
                          Đơn vị / Công ty (tùy chọn)
                        </label>
                        <input
                          type="text"
                          value={reviewCompany}
                          onChange={(e) => setReviewCompany(e.target.value)}
                          placeholder="Công ty Xây Dựng ABC"
                          className="w-full px-3 py-2 rounded-lg border border-gray-300 text-xs bg-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-gray-700 mb-1">
                        Chấm điểm chất lượng cọc
                      </label>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            type="button"
                            key={star}
                            onClick={() => setReviewRating(star)}
                            className="cursor-pointer"
                          >
                            <Star
                              className={`w-5 h-5 ${
                                star <= reviewRating
                                  ? "text-[#E57C23] fill-[#E57C23]"
                                  : "text-gray-300"
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-gray-700 mb-1">
                        Nhận xét thực tế *
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Chia sẻ về độ già của cọc, đường kính, quy cách vát nhọn và thái độ phục vụ..."
                        value={reviewComment}
                        onChange={(e) => setReviewComment(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 text-xs bg-white"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-[#214E34] hover:bg-[#183B27] text-white rounded-lg font-bold text-xs flex items-center gap-2 cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>GỬI ĐÁNH GIÁ</span>
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RELATED PRODUCTS SECTION */}
        <div className="mt-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs font-bold text-[#CDAA63] uppercase tracking-wider">
                GỢI Ý QUY CÁCH KHÁC
              </span>
              <h2 className="text-2xl font-black text-[#18231C]">
                SẢN PHẨM CỌC TRE LIÊN QUAN
              </h2>
            </div>
            <Link
              href="/san-pham"
              className="text-xs font-bold text-[#214E34] hover:text-[#183B27] flex items-center gap-1"
            >
              Xem tất cả
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>

      {/* CTA SECTION */}
      <QuoteFormSection />
    </div>
  );
}
