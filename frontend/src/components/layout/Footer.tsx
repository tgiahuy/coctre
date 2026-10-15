"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Warehouse,
  ShieldCheck,
  ChevronRight,
  TreeDeciduous,
  Truck,
  ExternalLink
} from "lucide-react";
import { useSiteConfig } from "@/lib/configStore";
import { useProducts } from "@/lib/productStore";

export default function Footer() {
  const siteConfig = useSiteConfig();
  const products = useProducts();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#121B15] text-[#D1DCD5] border-t-4 border-[#CDAA63] pt-16 pb-24 md:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* TOP HIGHLIGHT BAR */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-12 mb-12 border-b border-[#24362A]">
          <div className="flex items-start gap-4 p-4 rounded-xl bg-[#18261E] border border-[#2B3E32]">
            <div className="w-12 h-12 rounded-lg bg-[#214E34] text-[#CDAA63] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-base">Tre Già Tuyển Chọn 100%</h4>
              <p className="text-xs text-gray-400 mt-1">
                Khai thác chính vụ, thân thẳng, thịt dày, vát nhọn 3 cạnh chuẩn TCVN 9361:2012.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 rounded-xl bg-[#18261E] border border-[#2B3E32]">
            <div className="w-12 h-12 rounded-lg bg-[#214E34] text-[#CDAA63] flex items-center justify-center shrink-0">
              <Warehouse className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-base">Tổng Kho 5.000m² Sẵn Hàng</h4>
              <p className="text-xs text-gray-400 mt-1">
                Luôn có sẵn 100.000 - 300.000 cọc tại bãi tập kết Hà Nội & Hòa Bình.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 rounded-xl bg-[#18261E] border border-[#2B3E32]">
            <div className="w-12 h-12 rounded-lg bg-[#214E34] text-[#CDAA63] flex items-center justify-center shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-base">Vận Chuyển 24/7 Tận Móng</h4>
              <p className="text-xs text-gray-400 mt-1">
                Đội xe 2.5T đến 15T giao hàng nhanh trong ngày mọi ngõ ngách, tỉnh thành.
              </p>
            </div>
          </div>
        </div>

        {/* 4 MAIN COLUMNS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* COL 1: ABOUT COMPANY */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-12 h-12 shrink-0 rounded-full shadow-lg overflow-hidden ring-2 ring-[#CDAA63] bg-white p-0.5 group-hover:scale-105 transition-transform">
                <Image
                  src="/images/logo.png"
                  alt="Logo Cọc Tre Hòa Bình"
                  width={48}
                  height={48}
                  className="w-full h-full object-contain rounded-full"
                />
              </div>
              <div>
                <span className="text-xl font-extrabold text-white tracking-tight">
                  CỌC TRE <span className="text-[#CDAA63]">HÒA BÌNH</span>
                </span>
              </div>
            </Link>

            <p className="text-sm text-gray-400 leading-relaxed">
              {siteConfig.legalName} – Đơn vị tiên phong và uy tín hàng đầu trong lĩnh vực khai thác, gia công và cung cấp cọc tre công trình cho các dự án giao thông, thủy lợi, móng nhà dân dụng & công nghiệp.
            </p>

            <div className="pt-2 text-xs text-gray-400 space-y-1 border-t border-[#24362A]">
              <p><strong className="text-gray-300">Năng lực cung ứng:</strong> 500.000 cọc/tháng</p>
              <p><strong className="text-gray-300">Hóa đơn chứng từ:</strong> Đầy đủ VAT & hồ sơ lâm sản</p>
            </div>
          </div>

          {/* COL 2: QUICK LINKS */}
          <div>
            <h3 className="text-white text-base font-bold uppercase tracking-wider mb-5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#CDAA63]"></span>
              LIÊN KẾT NHANH
            </h3>
            <ul className="space-y-2.5 text-sm">
              {[
                { name: "Trang chủ", href: "/" },
                { name: "Giới thiệu doanh nghiệp", href: "/gioi-thieu" },
                { name: "Danh mục sản phẩm cọc tre", href: "/san-pham" },
                { name: "Dự án công trình tiêu biểu", href: "/du-an" },
                { name: "Kiến thức & Kỹ thuật thi công", href: "/tin-tuc" },
                { name: "Liên hệ & Hệ thống kho bãi", href: "/lien-he" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-1.5 text-gray-300 hover:text-[#CDAA63] hover:translate-x-1 transition-all"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-[#CDAA63]" />
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COL 3: PRODUCTS */}
          <div>
            <h3 className="text-white text-base font-bold uppercase tracking-wider mb-5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#CDAA63]"></span>
              SẢN PHẨM CỌC TRE
            </h3>
            <ul className="space-y-2.5 text-sm">
              {products.map((p) => (
                <li key={p.id}>
                  <Link
                    href={`/san-pham/${p.slug}`}
                    className="flex items-center justify-between text-gray-300 hover:text-[#CDAA63] hover:translate-x-1 transition-all group"
                  >
                    <span className="flex items-center gap-1.5">
                      <ChevronRight className="w-3.5 h-3.5 text-[#CDAA63]" />
                      {p.name}
                    </span>
                    <span className="text-[11px] text-gray-500 group-hover:text-emerald-400">
                      {p.diameter}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COL 4: CONTACT & WAREHOUSE */}
          <div className="space-y-3.5">
            <h3 className="text-white text-base font-bold uppercase tracking-wider mb-5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#CDAA63]"></span>
              THÔNG TIN LIÊN HỆ
            </h3>

            <div className="flex items-start gap-3 text-xs text-gray-300">
              <MapPin className="w-4 h-4 text-[#CDAA63] shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block">Văn phòng chính:</strong>
                <span>{siteConfig.headquarters}</span>
              </div>
            </div>

            <div className="flex items-start gap-3 text-xs text-gray-300">
              <Warehouse className="w-4 h-4 text-[#CDAA63] shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block">Bãi tập kết cọc tre 1:</strong>
                <span>{siteConfig.warehouse1}</span>
              </div>
            </div>

            <div className="flex items-start gap-3 text-xs text-gray-300">
              <Warehouse className="w-4 h-4 text-[#CDAA63] shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block">Kho trung chuyển Hà Nội:</strong>
                <span>{siteConfig.warehouse2}</span>
              </div>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <a
                href={`tel:${siteConfig.hotline}`}
                className="flex items-center gap-2.5 p-2.5 rounded-lg bg-[#214E34] hover:bg-[#183B27] text-white font-bold text-sm transition-colors"
              >
                <Phone className="w-4 h-4 text-[#E57C23]" />
                <span>Hotline: {siteConfig.hotlineFormatted}</span>
              </a>

              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-2.5 text-xs text-gray-300 hover:text-[#CDAA63] transition-colors"
              >
                <Mail className="w-4 h-4 text-[#CDAA63]" />
                <span>{siteConfig.email}</span>
              </a>
            </div>
          </div>
        </div>

        {/* BOTTOM COPYRIGHT */}
        <div className="mt-14 pt-6 border-t border-[#24362A] flex flex-col sm:flex-row justify-between items-center text-xs text-gray-400 gap-3">
          <p>© {currentYear} {siteConfig.companyName}. Bản quyền thuộc về {siteConfig.legalName}.</p>
          <div className="flex items-center gap-4">
            <span>Tiêu chuẩn TCVN 9361:2012</span>
            <span>•</span>
            <span>Lâm sản hợp pháp</span>
            <span>•</span>
            <Link
              href="/admin"
              className="text-gray-500 hover:text-[#CDAA63] transition-colors"
              title="Đăng nhập quản trị bài viết"
            >
              Quản trị (Admin)
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
