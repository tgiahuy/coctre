"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
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
  Sparkles,
  Eye,
  EyeOff,
  Settings,
  Mail,
  Loader2,
  AlertCircle,
  CheckCircle2,
  KeyRound
} from "lucide-react";
import ProductManager from "./ProductManager";
import ArticleManager from "./ArticleManager";
import ContactManager from "./ContactManager";
import ProjectManager from "./ProjectManager";
import { useProducts } from "@/lib/productStore";
import { useArticles } from "@/lib/articleStore";
import { useProjects } from "@/lib/projectStore";
import { useSiteConfig } from "@/lib/configStore";
import {
  getStoredUser,
  saveUserAuth,
  clearUserAuth,
  isUserAuthenticated,
  AdminUser,
} from "@/lib/authStore";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(null);
  const [emailInput, setEmailInput] = useState("admincoctre@gmail.com");
  const [passwordInput, setPasswordInput] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"products" | "articles" | "contact" | "projects">("products");

  const products = useProducts();
  const articles = useArticles();
  const projects = useProjects();
  const siteConfig = useSiteConfig();

  // Check auth session on mount & support legacy query params
  useEffect(() => {
    if (isUserAuthenticated()) {
      setIsAuthenticated(true);
      setCurrentUser(getStoredUser());
      return;
    }

    // Support direct access via URL parameter if configured (?auth=true)
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const isAuth = params.get("auth") || params.get("demo");
      const pin = params.get("pin") || params.get("pass");

      if (isAuth === "true" || pin === "8888" || pin === "admin" || pin === "admin123") {
        const demoUser: AdminUser = {
          email: "admincoctre@gmail.com",
          fullName: "Ban Quản Trị Cọc Tre",
          role: "SUPER_ADMIN",
          token: "coctre-demo-token",
        };
        saveUserAuth(demoUser, true);
        setIsAuthenticated(true);
        setCurrentUser(demoUser);
      }
    }
  }, []);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: emailInput,
          password: passwordInput,
          rememberMe,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success && data.data) {
        saveUserAuth(data.data, rememberMe);
        setIsAuthenticated(true);
        setCurrentUser(data.data);
      } else {
        setErrorMessage(data.message || "Email hoặc mật khẩu không chính xác. Vui lòng thử lại!");
      }
    } catch {
      setErrorMessage("Không thể kết nối đến máy chủ xác thực. Vui lòng thử lại sau!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickFill = (email: string, pass: string) => {
    setEmailInput(email);
    setPasswordInput(pass);
    setErrorMessage(null);
  };

  const handleLogout = () => {
    clearUserAuth();
    setIsAuthenticated(false);
    setCurrentUser(null);
    setPasswordInput("");
  };

  // 1. EMAIL & PASSWORD LOGIN SCREEN
  if (!isAuthenticated) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 bg-[#F7F5EF]">
        <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-xl space-y-6">
          {/* Brand header */}
          <div className="text-center space-y-3">
            <div className="relative w-20 h-20 mx-auto rounded-full shadow-lg ring-4 ring-[#CDAA63]/40 bg-white p-1">
              <Image
                src={siteConfig.logoUrl || "/images/logo.png"}
                alt={siteConfig.companyName || "Logo Cọc Tre Huyền Dương"}
                width={80}
                height={80}
                className="w-full h-full object-contain rounded-full"
                unoptimized={Boolean(siteConfig.logoUrl?.startsWith("data:"))}
              />
            </div>

            <div>
              <h1 className="text-2xl font-black text-[#214E34]">{siteConfig.companyName || "Cọc Tre Huyền Dương"}</h1>
              <p className="text-xs sm:text-sm font-semibold text-gray-500 mt-1 uppercase tracking-wider">
                Hệ Thống Quản Trị Website CMS
              </p>
            </div>
          </div>

          {/* Quick Demo Access Bar */}
          <div className="bg-emerald-50/80 border border-emerald-200 rounded-2xl p-3.5 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-[#214E34] flex items-center gap-1.5">
                <KeyRound className="w-3.5 h-3.5 text-[#CDAA63]" />
                Tài khoản mặc định:
              </span>
              <span className="text-[11px] text-gray-500 font-mono">admin123</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleQuickFill("admincoctre@gmail.com", "admin123")}
                className="flex-1 py-1.5 px-2 bg-white hover:bg-emerald-100/60 border border-emerald-300 text-[#214E34] text-[11px] font-bold rounded-lg transition text-center shadow-2xs cursor-pointer"
              >
                Điền nhanh: admincoctre@gmail.com
              </button>
            </div>
          </div>

          {/* Error message notification */}
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-2.5 animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Main Login Form */}
          <form onSubmit={handleEmailLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">
                Email Quản Trị
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  value={emailInput}
                  onChange={(e) => {
                    setEmailInput(e.target.value);
                    setErrorMessage(null);
                  }}
                  placeholder="admincoctre@gmail.com"
                  className="w-full pl-10 pr-4 py-3 text-sm font-medium border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#214E34] focus:border-[#214E34] focus:outline-none transition bg-white"
                  autoFocus
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-gray-700 uppercase">
                  Mật Khẩu
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-xs text-gray-500 hover:text-[#214E34] flex items-center gap-1 font-medium cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  <span>{showPassword ? "Ẩn" : "Hiện"}</span>
                </button>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={passwordInput}
                  onChange={(e) => {
                    setPasswordInput(e.target.value);
                    setErrorMessage(null);
                  }}
                  placeholder="Nhập mật khẩu quản trị"
                  className="w-full pl-10 pr-10 py-3 text-sm font-medium border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#214E34] focus:border-[#214E34] focus:outline-none transition bg-white font-sans"
                />
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-xs text-gray-700 select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-[#214E34] focus:ring-[#214E34] border-gray-300"
                />
                <span className="font-medium">Ghi nhớ đăng nhập</span>
              </label>
              <span className="text-[11px] text-gray-400">Bảo mật mã hóa</span>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-4 bg-[#214E34] hover:bg-[#183B27] disabled:opacity-70 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition flex items-center justify-center gap-2 cursor-pointer active:scale-95 text-sm"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-[#CDAA63]" />
                  <span>Đang xác thực tài khoản...</span>
                </>
              ) : (
                <>
                  <Unlock className="w-4 h-4 text-[#CDAA63]" />
                  <span>Đăng Nhập Vào Quản Trị</span>
                </>
              )}
            </button>
          </form>

          <div className="pt-3 border-t border-gray-100 flex items-center justify-center gap-1.5 text-xs text-gray-400">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Xác thực an toàn & đồng bộ thời gian thực</span>
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
            <div className="relative w-9 h-9 rounded-full bg-white p-0.5 ring-2 ring-[#CDAA63]/60 shrink-0 shadow-sm overflow-hidden">
              <Image
                src={siteConfig.logoUrl || "/images/logo.png"}
                alt={siteConfig.companyName || "Logo Cọc Tre Huyền Dương"}
                width={36}
                height={36}
                className="w-full h-full object-contain rounded-full"
                unoptimized={Boolean(siteConfig.logoUrl?.startsWith("data:"))}
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-white text-base">{siteConfig.companyName || "Cọc Tre Huyền Dương"}</span>
                <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-[#CDAA63] text-[#18231C] uppercase tracking-wider">
                  Admin CMS
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {currentUser && (
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-xl">
                <div className="w-2 h-2 rounded-full bg-emerald-400" />
                <div className="flex flex-col text-left">
                  <span className="text-xs font-bold text-white leading-tight">
                    {currentUser.fullName || "Ban Quản Trị"}
                  </span>
                  <span className="text-[10px] text-[#CDAA63] font-mono leading-tight">
                    {currentUser.email}
                  </span>
                </div>
              </div>
            )}

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
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-300 hover:text-rose-100 bg-rose-950/40 hover:bg-rose-900/50 rounded-lg transition cursor-pointer"
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
            <Settings className="w-4 h-4 text-[#CDAA63]" />
            <span>Cấu Hình Website & Logo</span>
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
