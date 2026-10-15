import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  Target,
  Compass,
  HeartHandshake,
  Warehouse,
  Truck,
  Users,
  Award,
  CheckCircle2,
  TreeDeciduous,
  ArrowRight,
  Phone,
  HardHat,
  MapPin,
  FileCheck,
  Clock
} from "lucide-react";
import Breadcrumb from "@/components/common/Breadcrumb";
import SectionHeading from "@/components/common/SectionHeading";
import QuoteFormSection from "@/components/common/QuoteFormSection";
import { siteConfig } from "@/data/config";

export const metadata: Metadata = {
  title: "Giới Thiệu Doanh Nghiệp | Năng Lực Cung Ứng Cọc Tre Hòa Bình",
  description:
    "Quá trình hình thành và phát triển của Công ty TNHH khai thác và chế biến lâm sản Hòa Bình - Tổng kho cọc tre công trình hàng đầu miền Bắc và miền Trung.",
};

export default function AboutPage() {
  const values = [
    {
      title: "Định Hướng Khách Hàng",
      desc: "Nắm bắt và đáp ứng hoàn hảo nhu cầu của khách hàng bằng việc cung cấp các sản phẩm và dịch vụ phù hợp với từng chất đất và tải trọng móng công trình.",
      icon: Target,
    },
    {
      title: "Phương Châm Làm Việc",
      desc: "Luôn luôn sáng tạo, chuyên nghiệp và có tinh thần trách nhiệm cao, phục vụ 24/24 gọi là có mặt, giao nhanh kịp tiến độ thi công.",
      icon: HeartHandshake,
    },
    {
      title: "Chất Lượng Là Sống Còn",
      desc: "Là yếu tố quan trọng nhất cho sự tồn tại và phát triển của công ty, áp dụng hệ thống kiểm tra chất lượng nghiêm ngặt tại mọi thời điểm.",
      icon: ShieldCheck,
    },
  ];

  const operationalSectors = [
    "Bán buôn gỗ cây, tre, nứa cho xây dựng",
    "Bán buôn sản phẩm cọc tre gia công, sơ chế vát đầu cọc",
    "Khai thác lâm sản hợp pháp từ rừng tự nhiên Hòa Bình",
    "Tư vấn kỹ thuật gia cố nền móng và thi công đóng cọc tre",
  ];

  const regions = [
    "Hà Nội", "Bắc Ninh", "Hưng Yên", "Hải Phòng", "Hải Dương", 
    "Nam Định", "Hà Nam", "Hòa Bình", "Sơn La", "Thanh Hóa", "Nghệ An", "Hà Tĩnh", "Quảng Bình"
  ];

  return (
    <div className="bg-[#F7F5EF]">
      {/* BREADCRUMB */}
      <Breadcrumb items={[{ name: "Giới thiệu doanh nghiệp" }]} />

      {/* 1. HERO BANNER */}
      <section className="bg-[#18231C] text-white py-14 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-[#182B1F]/80 to-transparent z-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-[#CDAA63]/20 text-[#CDAA63] border border-[#CDAA63]/40">
              HỒ SƠ NĂNG LỰC DOANH NGHIỆP
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight text-white">
              CÔNG TY TNHH KHAI THÁC & CHẾ BIẾN LÂM SẢN HÒA BÌNH
            </h1>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed font-normal">
              Đơn vị tiên phong và uy tín hàng đầu trong lĩnh vực khai thác, sơ chế và cung ứng cọc tre công trình tại miền Bắc và miền Trung.
            </p>
          </div>
        </div>
      </section>

      {/* 2. QUÁ TRÌNH HÌNH THÀNH & PHÁT TRIỂN */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-[#214E34]/10 text-[#214E34]">
                LỊCH SỬ HÌNH THÀNH & PHÁT TRIỂN
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-[#18231C] leading-tight">
                Quá trình hình thành và phát triển doanh nghiệp
              </h2>

              <p className="text-sm sm:text-base text-gray-700 leading-relaxed text-justify">
                <strong>{siteConfig.legalName}</strong> được thành lập vào ngày <strong>20/05/2020</strong>. Công ty hoạt động chuyên sâu trong các lĩnh vực khai thác lâm sản, chế biến và bán buôn vật liệu tre nứa trong xây dựng.
              </p>

              <div className="p-4 rounded-2xl bg-[#F7F5EF] border border-[#E7E3D8] space-y-2">
                <h4 className="font-extrabold text-sm text-[#18231C] uppercase tracking-wide">
                  Lĩnh vực hoạt động chính:
                </h4>
                <ul className="space-y-1.5 text-xs sm:text-sm text-gray-600">
                  {operationalSectors.map((sector, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#214E34] shrink-0" />
                      <span>{sector}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="text-sm sm:text-base text-gray-700 leading-relaxed text-justify">
                Với sự phát triển không ngừng của nền kinh tế xây dựng, công ty không ngừng đầu tư mở rộng diện tích kho bãi hơn <strong>5.000m²</strong>, trang bị hệ thống máy móc cắt vát hiện đại và ô tô vận tải để cung cấp nhanh chóng tới chân công trình kịp thời, đúng số lượng và chất lượng theo yêu cầu.
              </p>
            </div>

            {/* Right Image */}
            <div className="lg:col-span-6">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-[#E7E3D8] bg-[#18231C]">
                <Image
                  src="/images/banner/bamboo-poles.jpg"
                  alt="Tổng kho cọc tre Hòa Bình"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-gray-100 shadow-xl flex items-center justify-between">
                  <div>
                    <h4 className="font-extrabold text-sm text-[#18231C]">Tổng Kho Bãi Tập Kết Cọc Tre</h4>
                    <p className="text-xs text-gray-500">Lương Sơn (Hòa Bình) & Thanh Trì (Hà Nội)</p>
                  </div>
                  <span className="text-xs font-black text-[#214E34] bg-emerald-100 px-3 py-1 rounded-full">
                    5.000m² Sẵn Hàng
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. TẠI SAO BẠN NÊN LỰA CHỌN CHÚNG TÔI? (Chi tiết từ coctrehoabinh.com) */}
      <section className="py-16 sm:py-20 bg-[#F7F5EF] border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="NĂNG LỰC CẠNH TRANH"
            title="TẠI SAO BẠN NÊN LỰA CHỌN CỌC TRE HÒA BÌNH?"
            subtitle="Những ưu thế vượt trội về chất lượng cọc, giá thành tại bãi, đội ngũ kỹ thuật và năng lực giao vận."
            alignment="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-10">
            {/* Card 1 */}
            <div className="p-6 rounded-3xl bg-white border border-gray-200 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#214E34] text-[#CDAA63] flex items-center justify-center font-black">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-[#18231C]">Chất Lượng Đạt Chuẩn 100%</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed text-justify">
                Cọc tre già đực trên 3-6 năm tuổi, thịt dày đặc ruột, thân thẳng đanh chắc, không dập vỡ khi thi công ép máy cuốc hay búa rung.
              </p>
            </div>

            {/* Card 2 */}
            <div className="p-6 rounded-3xl bg-white border border-gray-200 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#214E34] text-[#CDAA63] flex items-center justify-center font-black">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-[#18231C]">Giá Cạnh Tranh Nhất Tại Bãi</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed text-justify">
                Khai thác trực tiếp từ rừng Hòa Bình, tối ưu hóa toàn bộ khâu trung gian, đem lại giá thành rẻ nhất cho bà con và các nhà thầu.
              </p>
            </div>

            {/* Card 3 */}
            <div className="p-6 rounded-3xl bg-white border border-gray-200 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#214E34] text-[#CDAA63] flex items-center justify-center font-black">
                <HardHat className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-[#18231C]">Đội Ngũ Hơn 100 Nhân Sự</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed text-justify">
                Đội ngũ kỹ sư kết cấu, cán bộ kỹ thuật và thợ thi công đóng cọc chuyên nghiệp trên 100 người, tận tình và phục vụ chu đáo.
              </p>
            </div>

            {/* Card 4 */}
            <div className="p-6 rounded-3xl bg-white border border-gray-200 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#214E34] text-[#CDAA63] flex items-center justify-center font-black">
                <FileCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-[#18231C]">Khảo Sát Miễn Phí 100%</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed text-justify">
                Trước khi thi công, chúng tôi cử cán bộ kỹ thuật giỏi xuống tận công trình để khảo sát địa chất, thăm thử cọc và tư vấn loại cọc phù hợp hoàn toàn miễn phí.
              </p>
            </div>

            {/* Card 5 */}
            <div className="p-6 rounded-3xl bg-white border border-gray-200 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#214E34] text-[#CDAA63] flex items-center justify-center font-black">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-[#18231C]">Tiến Độ Phục Vụ 24/24</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed text-justify">
                Gọi là có ngay! Sẵn sàng điều xe vận tải và tổ đội thi công làm việc xuyên đêm, đảm bảo an toàn tuyệt đối và đúng tiến độ cam kết.
              </p>
            </div>

            {/* Card 6 */}
            <div className="p-6 rounded-3xl bg-white border border-gray-200 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#214E34] text-[#CDAA63] flex items-center justify-center font-black">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-[#18231C]">Xe Vận Tải Đa Dạng Ngõ Hẻm</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed text-justify">
                Đầy đủ dòng xe Suzuki 750kg, xe ba gác có thể luồn lách vào mọi ngõ ngách sâu xa, cùng xe cẩu 5T – 15T phục vụ công trình lớn.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. ĐỊA BÀN PHỤC VỤ (MIỀN BẮC & MIỀN TRUNG) */}
      <section className="py-14 sm:py-18 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#18261E] text-white rounded-3xl p-6 sm:p-10 border border-[#2B3E32] shadow-xl">
            <div className="max-w-3xl mx-auto text-center space-y-4">
              <span className="text-xs font-bold text-[#CDAA63] uppercase tracking-wider block">
                MẠNG LƯỚI PHỦ SÓNG TOÀN DIỆN
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                Địa Bàn Cung Cấp & Thi Công Cọc Tre
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                Chúng tôi chuyên cung cấp cọc tre gai tươi cho các công trình xây dựng trên địa bàn các tỉnh miền Bắc và miền Trung:
              </p>

              <div className="flex flex-wrap items-center justify-center gap-2 pt-3">
                {regions.map((reg) => (
                  <span
                    key={reg}
                    className="px-3.5 py-1.5 rounded-full bg-white/10 text-xs font-bold text-gray-100 border border-white/10"
                  >
                    📍 {reg}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. GIÁ TRỊ CỐT LÕI & SỨ MỆNH */}
      <section className="py-16 sm:py-20 bg-[#F7F5EF] border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="TẦM NHÌN & GIÁ TRỊ"
            title="SỨ MỆNH & NGUYÊN TẮC HOẠT ĐỘNG"
            subtitle="Định hướng chiến lược hướng tới sự tin cậy lâu dài của mọi nhà thầu và bà con xây dựng."
            alignment="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mt-10">
            {values.map((val, idx) => {
              const Icon = val.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-7 border border-gray-200 shadow-sm hover:shadow-xl transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#214E34] text-[#CDAA63] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-black text-[#18231C] mb-2.5">
                    {val.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed text-justify">
                    {val.desc}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#214E34] text-white p-8 rounded-2xl relative overflow-hidden space-y-3">
              <div className="flex items-center gap-3">
                <Compass className="w-7 h-7 text-[#CDAA63]" />
                <h3 className="text-xl font-black text-white">MỤC TIÊU CỦA CÔNG TY</h3>
              </div>
              <p className="text-xs sm:text-sm text-gray-200 leading-relaxed text-justify">
                Trở thành nhà cung cấp uy tín hàng đầu trong lĩnh vực cọc tre và vật liệu nền móng, cung cấp cho khách hàng đúng số lượng và chất lượng như đã cam kết, đem lại lợi ích cao nhất cho khách hàng và đối tác.
              </p>
            </div>

            <div className="bg-[#18231C] text-white p-8 rounded-2xl border border-[#2B3E32] space-y-3">
              <div className="flex items-center gap-3">
                <Target className="w-7 h-7 text-[#CDAA63]" />
                <h3 className="text-xl font-black text-white">SỨ MỆNH PHỤC VỤ</h3>
              </div>
              <p className="text-xs sm:text-sm text-gray-200 leading-relaxed text-justify">
                Nơi hội tụ của những trái tim đầy nhiệt huyết, bản lĩnh nghề nghiệp, luôn nỗ lực hết mình để cung cấp cho khách hàng những sản phẩm với chất lượng tốt nhất, góp phần tạo dựng sự thịnh vượng và phồn vinh cho xã hội.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CTA QUOTE FORM */}
      <QuoteFormSection />
    </div>
  );
}
