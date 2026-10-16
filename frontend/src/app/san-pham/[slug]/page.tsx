"use client";

import React, { useState, use, useRef } from "react";
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
  AlertCircle
} from "lucide-react";
import Breadcrumb from "@/components/common/Breadcrumb";
import ProductCard from "@/components/common/ProductCard";
import QuoteFormSection from "@/components/common/QuoteFormSection";
import { useProducts } from "@/lib/productStore";
import { initialReviews, ProductReview } from "@/data/reviews";
import { useSiteConfig } from "@/lib/configStore";
import { useQuoteModal } from "@/context/QuoteModalContext";

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = use(params);
  const siteConfig = useSiteConfig();
  const products = useProducts();
  const product = products.find((item) => item.slug === resolvedParams.slug || item.id === resolvedParams.slug);
  const { openQuoteModal } = useQuoteModal();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<"desc" | "specs" | "apps" | "shipping" | "reviews">("desc");

  // Reviews state
  const [submittedReviews, setSubmittedReviews] = useState<ProductReview[]>([]);
  const reviewIdCounter = useRef(0);
  const [reviewAuthor, setReviewAuthor] = useState("");
  const [reviewCompany, setReviewCompany] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");
  const [reviewSuccess, setReviewSuccess] = useState(false);
  const [reviewError, setReviewError] = useState("");

  if (!product) {
    return <div className="min-h-screen py-24 text-center text-gray-500">Không tìm thấy sản phẩm.</div>;
  }

  const relatedProducts = products.filter((p) => p.slug !== product.slug && p.id !== product.id).slice(0, 4);
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
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border-2 border-gray-100 bg-[#18231C]/5 shadow-inner">
              <Image
                src={product.images[activeImageIndex] || product.images[0]}
                alt={product.name}
                fill
                className="object-cover transition-all duration-300"
                priority
              />

              {/* Stock badge */}
              <div className="absolute top-4 left-4 bg-[#214E34] text-[#EED59B] text-xs font-black px-3.5 py-1.5 rounded-full flex items-center gap-1.5 shadow-md border border-[#CDAA63]/30">
                <CheckCircle2 className="w-4 h-4 text-[#CDAA63]" />
                <span>{product.stockStatus.toUpperCase()}</span>
              </div>
            </div>

            {/* Thumbnail Selectors */}
            <div className="grid grid-cols-3 gap-3">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                    activeImageIndex === idx
                      ? "border-[#214E34] ring-2 ring-[#CDAA63]"
                      : "border-gray-200 opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${product.name} view ${idx + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>

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
                <strong className="text-[#214E34] font-bold">{product.diameter}</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-200/80">
                <span className="text-gray-500">Chủng loại tre:</span>
                <strong className="text-gray-900">{product.bambooType}</strong>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-gray-500">Quy cách đầu cọc:</span>
                <strong className="text-emerald-700">Vát nhọn 3 cạnh dài 15-20cm</strong>
              </div>
            </div>

            {/* Price Note (No Fixed Price - Direct Quotation) */}
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-900 uppercase tracking-wider">
                  Đơn giá cọc tre:
                </span>
                <span className="text-lg font-extrabold text-[#E57C23]">
                  Liên hệ nhận báo giá tại bãi
                </span>
              </div>
              <p className="text-[11px] text-amber-800 leading-relaxed">
                * Giá cọc tre thay đổi theo số lượng đơn hàng, quy cách đường kính và cự ly vận chuyển xe tải đến công trình. Quý khách vui lòng yêu cầu báo giá để có mức giá tốt nhất hôm nay.
              </p>
            </div>

            {/* 3 BIG CTA BUTTONS */}
            <div className="space-y-3 pt-2">
              <button
                onClick={() => openQuoteModal(product.slug)}
                className="w-full py-4 px-6 bg-[#E57C23] hover:bg-[#CC6914] text-white rounded-xl font-black text-base tracking-wide flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all cursor-pointer transform hover:-translate-y-0.5"
              >
                <FileText className="w-5 h-5" />
                <span>YÊU CẦU BÁO GIÁ SẢN PHẨM NÀY</span>
              </button>

              <div className="grid grid-cols-2 gap-3">
                <a
                  href={`tel:${siteConfig.hotline}`}
                  className="py-3.5 px-4 bg-[#214E34] hover:bg-[#183B27] text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#CDAA63]" />
                  <span>GỌI NGAY: {siteConfig.hotlineFormatted}</span>
                </a>

                <a
                  href={siteConfig.zaloUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3.5 px-4 bg-[#0068FF] hover:bg-[#0052cc] text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>CHAT QUA ZALO</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* TABS SECTION */}
        <div className="mt-12 bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-gray-200 shadow-sm">
          {/* TAB HEADERS */}
          <div className="flex items-center gap-2 border-b border-gray-200 overflow-x-auto pb-px scrollbar-none">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`py-3 px-5 text-xs sm:text-sm font-extrabold whitespace-nowrap transition-all border-b-2 cursor-pointer ${
                  activeTab === tab.key
                    ? "border-[#214E34] text-[#214E34] bg-[#EBF3EE]/50 rounded-t-lg"
                    : "border-transparent text-gray-500 hover:text-gray-800"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* TAB CONTENTS */}
          <div className="pt-8">
            {/* 1. DESCRIPTION TAB */}
            {activeTab === "desc" && (
              <div className="space-y-6 text-sm text-gray-700 leading-relaxed max-w-4xl">
                <h3 className="text-xl font-bold text-[#18231C]">
                  Đặc điểm nổi bật của {product.name}
                </h3>
                <p className="whitespace-pre-line">{product.description}</p>

                <div className="pt-4">
                  <h4 className="text-base font-bold text-[#18231C] mb-3">
                    Ưu thế chất lượng vượt trội:
                  </h4>
                  <ul className="space-y-2">
                    {product.advantages.map((adv, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{adv}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* 2. SPECS TAB */}
            {activeTab === "specs" && (
              <div className="max-w-3xl space-y-6">
                <h3 className="text-xl font-bold text-[#18231C]">
                  Bảng thông số kỹ thuật chi tiết
                </h3>
                <div className="border border-gray-200 rounded-2xl overflow-hidden">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <tbody className="divide-y divide-gray-200">
                      {product.specs.map((s, idx) => (
                        <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-[#F7F5EF]"}>
                          <th className="py-3 px-4 font-bold text-gray-700 w-1/3">
                            {s.label}
                          </th>
                          <td className="py-3 px-4 text-gray-900">{s.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 3. APPLICATIONS TAB */}
            {activeTab === "apps" && (
              <div className="space-y-6 max-w-4xl text-sm text-gray-700">
                <h3 className="text-xl font-bold text-[#18231C]">
                  Các hạng mục công trình sử dụng {product.name}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {product.applications.map((app, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-[#F7F5EF] border border-[#E7E3D8] flex items-start gap-3"
                    >
                      <span className="w-6 h-6 rounded-full bg-[#214E34] text-[#CDAA63] flex items-center justify-center text-xs font-bold shrink-0">
                        {idx + 1}
                      </span>
                      <p className="text-xs sm:text-sm text-gray-800 leading-relaxed font-medium">
                        {app}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. SHIPPING TAB */}
            {activeTab === "shipping" && (
              <div className="space-y-6 max-w-4xl text-sm text-gray-700">
                <h3 className="text-xl font-bold text-[#18231C]">
                  Quy cách đóng gói & Vận chuyển đến công trình
                </h3>
                <div className="p-4 rounded-2xl bg-[#F7F5EF] border border-[#E7E3D8] space-y-3">
                  <p><strong>Đóng gói:</strong> {product.packaging}</p>
                  <p><strong>Hình thức giao nhận:</strong> Kiểm đếm số lượng bó cọc trực tiếp tại thùng xe hoặc hạ bãi tại chân hố móng.</p>
                  <p><strong>Thời gian giao hàng:</strong> 2 - 4 giờ đối với khu vực Hà Nội & các tỉnh lân cận; 12 - 24 giờ đối với các tỉnh miền Trung.</p>
                </div>
              </div>
            )}

            {/* 5. REVIEWS TAB */}
            {activeTab === "reviews" && (
              <div className="space-y-8 max-w-4xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[#F7F5EF] border border-[#E7E3D8]">
                  <div>
                    <h3 className="text-lg font-bold text-[#18231C]">
                      Đánh giá từ khách hàng & nhà thầu
                    </h3>
                    <p className="text-xs text-gray-500">
                      {reviewsList.length > 0
                        ? `Điểm trung bình ${(reviewsList.reduce((acc, r) => acc + r.rating, 0) / reviewsList.length).toFixed(1)} / 5 (${reviewsList.length} lượt đánh giá)`
                        : "Chưa có lượt đánh giá nào"}
                    </p>
                  </div>

                  {reviewsList.length > 0 && (
                    <div className="flex items-center gap-1 text-[#E57C23]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-current" />
                      ))}
                    </div>
                  )}
                </div>

                {/* Reviews List */}
                <div className="space-y-4">
                  {reviewsList.length === 0 ? (
                    <div className="p-8 rounded-2xl bg-white border border-gray-200 text-center text-gray-500 text-xs sm:text-sm">
                      Chưa có đánh giá nào cho sản phẩm này. Hãy là người đầu tiên để lại đánh giá thực tế bên dưới!
                    </div>
                  ) : (
                    reviewsList.map((rev) => (
                      <div
                        key={rev.id}
                        className="p-5 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <strong className="text-sm text-gray-900">{rev.author}</strong>
                            <span className="text-xs text-gray-500">({rev.company})</span>
                            {rev.verified && (
                              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                                Đã mua hàng
                              </span>
                            )}
                          </div>
                          <span className="text-xs text-gray-400">{rev.date}</span>
                        </div>

                        <div className="flex text-[#E57C23]">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-current" />
                          ))}
                        </div>

                        <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                          {rev.comment}
                        </p>
                      </div>
                    ))
                  )}
                </div>

                {/* Submit New Review Form */}
                <div className="p-6 rounded-2xl bg-[#F7F5EF] border border-[#E7E3D8]">
                  <h4 className="font-bold text-base text-[#18231C] mb-4">
                    Gửi nhận xét đánh giá của bạn
                  </h4>

                  {reviewSuccess && (
                    <div className="p-3 mb-4 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Cảm ơn bạn! Đánh giá đã được ghi nhận thành công.</span>
                    </div>
                  )}

                  {reviewError && (
                    <div className="p-3 mb-4 rounded-xl bg-red-100 text-red-700 text-xs font-bold flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      <span>{reviewError}</span>
                    </div>
                  )}

                  <form onSubmit={handleReviewSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">
                          Họ và tên của bạn *
                        </label>
                        <input
                          type="text"
                          placeholder="Ví dụ: Lê Tuấn Anh"
                          value={reviewAuthor}
                          onChange={(e) => setReviewAuthor(e.target.value)}
                          className="w-full px-3 py-2 rounded-lg border border-gray-300 text-xs bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">
                          Tên công ty / Đội thầu
                        </label>
                        <input
                          type="text"
                          placeholder="Ví dụ: Công ty XD Nam Thắng"
                          value={reviewCompany}
                          onChange={(e) => setReviewCompany(e.target.value)}
                          className="w-full px-3 py-2 rounded-lg border border-gray-300 text-xs bg-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Mức độ hài lòng (sao)
                      </label>
                      <select
                        value={reviewRating}
                        onChange={(e) => setReviewRating(Number(e.target.value))}
                        className="px-3 py-2 rounded-lg border border-gray-300 text-xs bg-white"
                      >
                        <option value={5}>5 sao - Rất hài lòng (Tre già đực, đúng tiến độ)</option>
                        <option value={4}>4 sao - Hài lòng</option>
                        <option value={3}>3 sao - Bình thường</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Nội dung đánh giá thực tế *
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
