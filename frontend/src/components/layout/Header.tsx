"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Phone,
  Mail,
  Clock,
  ChevronDown,
  Menu as MenuIcon,
  X,
  FileText,
  Truck,
  ShieldCheck,
  Building2,
  TreeDeciduous,
  ArrowRight
} from "lucide-react";
import { useSiteConfig } from "@/lib/configStore";
import { useProducts } from "@/lib/productStore";
import { useQuoteModal } from "@/context/QuoteModalContext";

export default function Header() {
  const siteConfig = useSiteConfig();
  const products = useProducts();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productDropdownOpen, setProductDropdownOpen] = useState(false);
  const pathname = usePathname();
  const { openQuoteModal } = useQuoteModal();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setProductDropdownOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: "TRANG CHỦ", href: "/" },
    { name: "GIỚI THIỆU", href: "/gioi-thieu" },
    {
      name: "SẢN PHẨM",
      href: "/san-pham",
      hasDropdown: true,
    },
    { name: "DỰ ÁN", href: "/du-an" },
    { name: "TIN TỨC", href: "/tin-tuc" },
    { name: "LIÊN HỆ", href: "/lien-he" },
  ];

  const isActive = (href: string) => {
    if (href === "/" && pathname === "/") return true;
    if (href !== "/" && pathname.startsWith(href)) return true;
    return false;
  };

  return (
    <>
      {/* TOPBAR */}
      <div className="bg-[#18231C] text-[#E7E3D8] text-xs py-2 px-4 border-b border-[#2A3930] hidden md:block transition-all">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-4">
          {/* Left info */}
          <div className="flex items-center space-x-6">
            <span className="flex items-center gap-1.5 text-[#CDAA63] font-medium">
              <Truck className="w-3.5 h-3.5 text-[#CDAA63]" />
              Giao hàng tận chân công trình – Tư vấn kỹ thuật 24/7
            </span>
            <span className="hidden lg:flex items-center gap-1.5 text-gray-300">
              <Clock className="w-3.5 h-3.5 text-gray-400" />
              6:00 - 22:00 (Thứ 2 - CN)
            </span>
          </div>

          {/* Right contacts */}
          <div className="flex items-center space-x-6">
            <a
              href={`mailto:${siteConfig.email}`}
              className="flex items-center gap-1.5 hover:text-[#CDAA63] transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-[#CDAA63]" />
              <span>{siteConfig.email}</span>
            </a>
            <a
              href={`tel:${siteConfig.hotline}`}
              className="flex items-center gap-1.5 font-bold text-white hover:text-[#CDAA63] transition-colors bg-[#214E34]/80 px-2.5 py-1 rounded"
            >
              <Phone className="w-3.5 h-3.5 text-[#E57C23] animate-pulse" />
              <span>Hotline: {siteConfig.hotlineFormatted}</span>
            </a>
          </div>
        </div>
      </div>

      {/* MAIN HEADER (STICKY) */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-md py-3 border-b border-gray-100"
            : "bg-white py-4 border-b border-gray-200"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* LOGO */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-11 h-11 sm:w-12 sm:h-12 shrink-0 rounded-full shadow-md group-hover:scale-105 transition-transform overflow-hidden ring-2 ring-[#CDAA63]/30 bg-white p-0.5">
                <Image
                  src="/images/logo.png"
                  alt="Logo Cọc Tre Hòa Bình"
                  width={48}
                  height={48}
                  className="w-full h-full object-contain rounded-full"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-[#214E34] leading-tight flex items-center gap-1">
                  CỌC TRE <span className="text-[#CDAA63]">HÒA BÌNH</span>
                </span>
                <span className="text-[10px] sm:text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                  Tổng Kho Cọc Tre Công Trình
                </span>
              </div>
            </Link>

            {/* DESKTOP NAV */}
            <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
              {navLinks.map((link) => {
                if (link.hasDropdown) {
                  return (
                    <div
                      key={link.name}
                      className="relative group py-2"
                      onMouseEnter={() => setProductDropdownOpen(true)}
                      onMouseLeave={() => setProductDropdownOpen(false)}
                    >
                      <Link
                        href={link.href}
                        className={`px-3 py-2 text-sm font-bold tracking-wide rounded-md transition-colors flex items-center gap-1 ${
                          isActive(link.href)
                            ? "text-[#214E34] bg-[#EBF3EE]"
                            : "text-[#232323] hover:text-[#214E34] hover:bg-gray-50"
                        }`}
                      >
                        {link.name}
                        <ChevronDown className="w-4 h-4 text-gray-500 group-hover:rotate-180 transition-transform duration-200" />
                      </Link>

                      {/* Dropdown Menu */}
                      <div className="absolute top-full left-0 w-72 bg-white rounded-xl shadow-xl border border-gray-100 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-2 group-hover:translate-y-0 z-50">
                        <div className="px-4 py-2 border-b border-gray-100 bg-gray-50/70">
                          <span className="text-xs font-bold text-[#214E34] uppercase tracking-wider">
                            Kích Thước Cọc Tiêu Chuẩn
                          </span>
                        </div>
                        {products.map((prod) => (
                          <Link
                            key={prod.id}
                            href={`/san-pham/${prod.slug}`}
                            className="flex items-center justify-between px-4 py-2.5 text-sm text-[#232323] hover:text-[#214E34] hover:bg-[#EBF3EE]/60 transition-colors group/item"
                          >
                            <div>
                              <div className="font-semibold text-gray-900 group-hover/item:text-[#214E34]">
                                {prod.name}
                              </div>
                              <div className="text-xs text-gray-500">
                                {prod.diameter}
                              </div>
                            </div>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                              Sẵn kho
                            </span>
                          </Link>
                        ))}
                        <div className="p-2 border-t border-gray-100 mt-1">
                          <Link
                            href="/san-pham"
                            className="flex items-center justify-center gap-1 text-xs font-bold text-[#214E34] hover:text-[#183B27] py-1 text-center bg-gray-50 rounded hover:bg-gray-100"
                          >
                            Xem tất cả sản phẩm
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`px-3 py-2 text-sm font-bold tracking-wide rounded-md transition-colors ${
                      isActive(link.href)
                        ? "text-[#214E34] bg-[#EBF3EE]"
                        : "text-[#232323] hover:text-[#214E34] hover:bg-gray-50"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* HEADER CTA BUTTON */}
            <div className="hidden sm:flex items-center gap-3">
              <button
                onClick={() => openQuoteModal()}
                className="flex items-center gap-2 bg-[#E57C23] hover:bg-[#CC6914] text-white px-5 py-2.5 rounded-lg text-sm font-bold tracking-wide shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                <FileText className="w-4 h-4" />
                <span>NHẬN BÁO GIÁ</span>
              </button>
            </div>

            {/* MOBILE HAMBURGER BUTTON */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                onClick={() => openQuoteModal()}
                className="bg-[#E57C23] text-white p-2 rounded-lg text-xs font-bold sm:hidden"
                aria-label="Nhận báo giá"
              >
                BÁO GIÁ
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-gray-700 hover:text-[#214E34] hover:bg-gray-100 rounded-lg focus:outline-none"
                aria-label="Mở menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-7 h-7" />
                ) : (
                  <MenuIcon className="w-7 h-7" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* MOBILE MENU DRAWER */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-x-0 top-[60px] sm:top-[70px] bg-white border-b border-gray-200 shadow-2xl max-h-[calc(100vh-70px)] overflow-y-auto z-50">
            <div className="px-4 pt-3 pb-6 space-y-2">
              {/* Quick hotline bar in mobile menu */}
              <a
                href={`tel:${siteConfig.hotline}`}
                className="flex items-center justify-between p-3 rounded-xl bg-[#214E34] text-white font-bold mb-4 shadow-sm"
              >
                <div className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-[#CDAA63]" />
                  <span>Gọi Hotline Tư Vấn</span>
                </div>
                <span className="text-[#CDAA63]">{siteConfig.hotlineFormatted}</span>
              </a>

              {navLinks.map((link) => {
                if (link.hasDropdown) {
                  return (
                    <div key={link.name} className="border-b border-gray-100 pb-2">
                      <div className="flex items-center justify-between py-2 text-base font-bold text-[#232323]">
                        <Link
                          href={link.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className={isActive(link.href) ? "text-[#214E34]" : ""}
                        >
                          {link.name}
                        </Link>
                        <button
                          onClick={() => setProductDropdownOpen(!productDropdownOpen)}
                          className="p-1.5 text-gray-500 hover:text-[#214E34]"
                        >
                          <ChevronDown
                            className={`w-5 h-5 transition-transform ${
                              productDropdownOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                      </div>

                      {productDropdownOpen && (
                        <div className="pl-3 py-1 space-y-1.5 bg-gray-50 rounded-lg mb-2">
                          {products.map((p) => (
                            <Link
                              key={p.id}
                              href={`/san-pham/${p.slug}`}
                              onClick={() => setMobileMenuOpen(false)}
                              className="flex items-center justify-between py-2 px-3 text-sm text-gray-700 hover:text-[#214E34] hover:bg-emerald-50 rounded-md"
                            >
                              <span>{p.name}</span>
                              <span className="text-xs text-gray-500">{p.diameter}</span>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block py-3 px-2 text-base font-bold border-b border-gray-100 ${
                      isActive(link.href)
                        ? "text-[#214E34] bg-emerald-50/50 rounded-md"
                        : "text-[#232323]"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}

              <div className="pt-4">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openQuoteModal();
                  }}
                  className="w-full py-3.5 bg-[#E57C23] hover:bg-[#CC6914] text-white rounded-xl font-bold text-center flex items-center justify-center gap-2 shadow-md"
                >
                  <FileText className="w-5 h-5" />
                  YÊU CẦU BÁO GIÁ NHANH
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
