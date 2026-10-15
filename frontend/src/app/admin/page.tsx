"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Lock,
  Unlock,
  Package,
  FileText,
  Phone,
  Building2,
  ExternalLink,
  LogOut,
  ShieldCheck,
  TreeDeciduous,
  Sparkles
} from "lucide-react";
import ProductManager from "./ProductManager";
import ArticleManager from "./ArticleManager";
import ContactManager from "./ContactManager";
import ProjectManager from "./ProjectManager";
import { useProducts } from "@/lib/productStore";
import { useArticles } from "@/lib/articleStore";
import { useProjects } from "@/lib/projectStore";
import { useSiteConfig } from "@/lib/configStore";

const DEFAULT_PIN = "8888";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState(false);
  const [activeTab, setActiveTab] = useState<"products" | "articles" | "contact" | "projects">("products");

  const products = useProducts();
  const articles = useArticles();
  const projects = useProjects();
  const siteConfig = useSiteConfig();

  // Check auth session
  useEffect(() => {
    const authSession = sessionStorage.getItem("coctre_admin_auth");
    if (authSession === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.trim() === DEFAULT_PIN) {
      setIsAuthenticated(true);
      sessionStorage.setItem("coctre_admin_auth", "true");
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("coctre_admin_auth");
    setPinInput("");
  };

  // 1. PIN LOGIN SCREEN
  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-16 bg-[#F7F5EF]">
        <div className="w-full max-w-md bg-white p-8 rounded-3xl border border-gray-200 shadow-xl space-y-6 text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#214E34] text-[#CDAA63] flex items-center justify-center mx-auto shadow-md">
            <Lock className="w-8 h-8" />
          </div>

          <div>
            <h1 className="text-2xl font-extrabold text-[#214E34]">Cọc Tre Hòa Bình</h1>
            <p className="text-sm font-semibold text-gray-500 mt-1 uppercase tracking-wider">
              Hệ Thống Quản Trị Website CMS
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-2">
                Nhập mã PIN quản trị
              </label>
              <input
                type="password"
                maxLength={10}
                value={pinInput}
                onChange={(e) => {
                  setPinInput(e.target.value);
                  setPinError(false);
                }}
                placeholder="Nhập mã PIN (Mặc định: 8888)"
                className={`w-full px-4 py-3 text-center text-xl font-mono tracking-widest border rounded-xl focus:ring-2 focus:ring-[#214E34] focus:outline-none transition ${
                  pinError ? "border-rose-500 bg-rose-50/50" : "border-gray-300"
                }`}
                autoFocus
              />
              {pinError && (
                <p className="text-xs text-rose-600 mt-1.5 font-medium text-center">
                  Mã PIN không chính xác. Vui lòng thử lại với mã PIN mặc định là 8888.
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#214E34] hover:bg-[#183B27] text-white font-bold rounded-xl shadow hover:shadow-lg transition flex items-center justify-center gap-2"
            >
              <Unlock className="w-5 h-5 text-[#CDAA63]" />
              <span>Đăng Nhập Quản Trị</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setPinInput("8888");
                setIsAuthenticated(true);
                sessionStorage.setItem("coctre_admin_auth", "true");
              }}
              className="w-full py-2.5 text-xs text-gray-500 hover:text-[#214E34] text-center block transition font-medium"
            >
              Mở nhanh với mã PIN thử nghiệm: <span className="font-bold underline text-[#214E34]">8888</span>
            </button>
          </form>

          <div className="pt-4 border-t border-gray-100 flex items-center justify-center gap-1.5 text-xs text-gray-400">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Toàn bộ dữ liệu được quản lý và đồng bộ trực tiếp</span>
          </div>
        </div>
      </div>
    );
  }

  // 2. AUTHENTICATED DASHBOARD
  return (
    <div className="bg-[#F7F5EF] min-h-screen pb-20">
      {/* Top Navbar */}
      <header className="bg-[#18231C] text-white sticky top-0 z-40 border-b border-[#2B3E32] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#214E34] text-[#CDAA63] flex items-center justify-center shrink-0">
              <TreeDeciduous className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-white text-base">Cọc Tre Hòa Bình</span>
                <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-[#CDAA63] text-[#18231C] uppercase tracking-wider">
                  Admin CMS
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-gray-300 hover:text-white bg-white/10 hover:bg-white/15 rounded-lg transition"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#CDAA63]" />
              <span className="hidden sm:inline">Xem website</span>
            </Link>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-300 hover:text-rose-100 bg-rose-950/40 hover:bg-rose-900/50 rounded-lg transition"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Đăng xuất</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
        {/* Quick Stats Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div
            onClick={() => setActiveTab("products")}
            className={`p-4 rounded-2xl border transition cursor-pointer ${
              activeTab === "products"
                ? "bg-white border-[#214E34] shadow-md ring-2 ring-[#214E34]/20"
                : "bg-white/80 border-gray-200 hover:bg-white"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-500 uppercase">Sản phẩm</span>
              <Package className="w-4 h-4 text-[#214E34]" />
            </div>
            <p className="text-2xl font-extrabold text-gray-900 mt-2">{products.length}</p>
            <p className="text-[11px] text-gray-500 mt-0.5">Quy cách cọc tre đang quản lý</p>
          </div>

          <div
            onClick={() => setActiveTab("articles")}
            className={`p-4 rounded-2xl border transition cursor-pointer ${
              activeTab === "articles"
                ? "bg-white border-[#214E34] shadow-md ring-2 ring-[#214E34]/20"
                : "bg-white/80 border-gray-200 hover:bg-white"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-500 uppercase">Tin tức</span>
              <FileText className="w-4 h-4 text-[#214E34]" />
            </div>
            <p className="text-2xl font-extrabold text-gray-900 mt-2">{articles.length}</p>
            <p className="text-[11px] text-gray-500 mt-0.5">Bài viết & cẩm nang kỹ thuật</p>
          </div>

          <div
            onClick={() => setActiveTab("projects")}
            className={`p-4 rounded-2xl border transition cursor-pointer ${
              activeTab === "projects"
                ? "bg-white border-[#214E34] shadow-md ring-2 ring-[#214E34]/20"
                : "bg-white/80 border-gray-200 hover:bg-white"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-500 uppercase">Dự án</span>
              <Building2 className="w-4 h-4 text-[#214E34]" />
            </div>
            <p className="text-2xl font-extrabold text-gray-900 mt-2">{projects.length}</p>
            <p className="text-[11px] text-gray-500 mt-0.5">Công trình giao thông & kè móng</p>
          </div>

          <div
            onClick={() => setActiveTab("contact")}
            className={`p-4 rounded-2xl border transition cursor-pointer ${
              activeTab === "contact"
                ? "bg-white border-[#214E34] shadow-md ring-2 ring-[#214E34]/20"
                : "bg-white/80 border-gray-200 hover:bg-white"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-500 uppercase">Hotline</span>
              <Phone className="w-4 h-4 text-[#214E34]" />
            </div>
            <p className="text-xl font-extrabold text-gray-900 mt-2 truncate">
              {siteConfig.hotlineFormatted}
            </p>
            <p className="text-[11px] text-gray-500 mt-0.5">Zalo: {siteConfig.zalo}</p>
          </div>
        </div>

        {/* Tab Navigation Buttons */}
        <div className="flex flex-wrap gap-2 p-1.5 bg-white rounded-2xl border border-gray-200 shadow-sm">
          <button
            type="button"
            onClick={() => setActiveTab("products")}
            className={`flex-1 min-w-[140px] py-3 px-4 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition ${
              activeTab === "products"
                ? "bg-[#214E34] text-white shadow"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            }`}
          >
            <Package className="w-4 h-4 text-[#CDAA63]" />
            <span>Sản Phẩm ({products.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("articles")}
            className={`flex-1 min-w-[140px] py-3 px-4 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition ${
              activeTab === "articles"
                ? "bg-[#214E34] text-white shadow"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            }`}
          >
            <FileText className="w-4 h-4 text-[#CDAA63]" />
            <span>Tin Tức ({articles.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("contact")}
            className={`flex-1 min-w-[140px] py-3 px-4 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition ${
              activeTab === "contact"
                ? "bg-[#214E34] text-white shadow"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            }`}
          >
            <Phone className="w-4 h-4 text-[#CDAA63]" />
            <span>Thông Tin Liên Hệ</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("projects")}
            className={`flex-1 min-w-[140px] py-3 px-4 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition ${
              activeTab === "projects"
                ? "bg-[#214E34] text-white shadow"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            }`}
          >
            <Building2 className="w-4 h-4 text-[#CDAA63]" />
            <span>Dự Án ({projects.length})</span>
          </button>
        </div>

        {/* Content of Active Tab */}
        <div className="bg-white/60 p-1 sm:p-2 rounded-3xl">
          {activeTab === "products" && <ProductManager />}
          {activeTab === "articles" && <ArticleManager />}
          {activeTab === "contact" && <ContactManager />}
          {activeTab === "projects" && <ProjectManager />}
        </div>
      </div>
    </div>
  );
}
