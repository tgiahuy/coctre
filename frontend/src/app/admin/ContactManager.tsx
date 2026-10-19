"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Warehouse,
  Save,
  RotateCcw,
  CheckCircle,
  Globe,
  Share2,
  Building,
  Sparkles,
  Info,
  Upload,
  Image as ImageIcon,
  Trash2,
  Loader2,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  KeyRound,
  ShieldCheck
} from "lucide-react";
import { SiteConfig, siteConfig as defaultSiteConfig } from "@/data/config";
import { getSiteConfig, requestConfig, saveSiteConfig } from "@/lib/configStore";
import { clearUserAuth, getStoredUser } from "@/lib/authStore";

export default function ContactManager() {
  const [config, setConfig] = useState<SiteConfig>(getSiteConfig());
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [customLogoUrl, setCustomLogoUrl] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Favicon states
  const [isUploadingFavicon, setIsUploadingFavicon] = useState(false);
  const [faviconUploadError, setFaviconUploadError] = useState<string | null>(null);
  const [customFaviconUrl, setCustomFaviconUrl] = useState("");
  const faviconInputRef = useRef<HTMLInputElement>(null);

  // Change password states
  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [isChangingPass, setIsChangingPass] = useState(false);
  const [changePassMsg, setChangePassMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    void requestConfig().then(setConfig).catch(() => undefined);
  }, []);

  const handleChange = (field: keyof SiteConfig, value: string | number) => {
    setConfig((prev) => ({
      ...prev,
      [field]: value,
    }));
    setSavedSuccess(false);
  };

  const handleLogoUpload = async (file: File) => {
    if (!file) return;
    if (!["image/jpeg", "image/png", "image/webp", "image/gif"].includes(file.type) || file.size > 5 * 1024 * 1024) {
      setUploadError("Chỉ chấp nhận JPG, PNG, WEBP hoặc GIF tối đa 5 MB");
      return;
    }
    setUploadError(null);
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success && data.url) {
          handleChange("logoUrl", data.url);
          setIsUploading(false);
          return;
        }
      }
      throw new Error("Không thể lưu ảnh lên máy chủ");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Không thể tải ảnh. Vui lòng thử lại!";
      setUploadError(message);
      setIsUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleLogoUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFaviconUpload = async (file: File) => {
    if (!file) return;
    if (!["image/jpeg", "image/png", "image/webp", "image/gif"].includes(file.type) || file.size > 5 * 1024 * 1024) {
      setFaviconUploadError("Chỉ chấp nhận JPG, PNG, WEBP hoặc GIF tối đa 5 MB");
      return;
    }
    setFaviconUploadError(null);
    setIsUploadingFavicon(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success && data.url) {
          handleChange("faviconUrl", data.url);
          setIsUploadingFavicon(false);
          return;
        }
      }
      throw new Error("Không thể lưu favicon lên máy chủ");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Không thể tải favicon. Vui lòng thử lại!";
      setFaviconUploadError(message);
      setIsUploadingFavicon(false);
    }
  };

  const handleChangePassword = async () => {
    if (!currentPass || !newPass) {
      setChangePassMsg({ type: "error", text: "Vui lòng nhập đầy đủ mật khẩu hiện tại và mật khẩu mới" });
      return;
    }
    if (newPass.length < 12) {
      setChangePassMsg({ type: "error", text: "Mật khẩu mới phải có tối thiểu 12 ký tự" });
      return;
    }
    if (newPass !== confirmPass) {
      setChangePassMsg({ type: "error", text: "Mật khẩu mới và xác nhận mật khẩu không khớp" });
      return;
    }

    setIsChangingPass(true);
    setChangePassMsg(null);

    try {
      const res = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: currentPass,
          newPassword: newPass,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setChangePassMsg({ type: "success", text: "Đổi mật khẩu thành công. Bạn cần đăng nhập lại." });
        setCurrentPass("");
        setNewPass("");
        setConfirmPass("");
        clearUserAuth();
        setTimeout(() => window.location.assign("/admin"), 1500);
      } else {
        setChangePassMsg({ type: "error", text: data.message || "Mật khẩu hiện tại không chính xác" });
      }
    } catch {
      setChangePassMsg({ type: "error", text: "Không thể kết nối máy chủ để đổi mật khẩu. Vui lòng thử lại!" });
    } finally {
      setIsChangingPass(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!await saveSiteConfig(config)) {
      alert("Không thể lưu cấu hình. Phiên đăng nhập có thể đã hết hạn.");
      return;
    }
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 4000);
  };

  const handleReset = async () => {
    if (confirm("Bạn có chắc chắn muốn khôi phục toàn bộ logo và thông tin website về mặc định ban đầu?")) {
      if (!await saveSiteConfig(defaultSiteConfig)) {
        alert("Không thể khôi phục cấu hình. Phiên đăng nhập có thể đã hết hạn.");
        return;
      }
      setConfig(defaultSiteConfig);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#214E34] flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-[#CDAA63]" />
            Quản Lý Logo & Cấu Hình Website
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Tải lên thay đổi Logo, Hotline, Zalo, Email, Địa chỉ trụ sở và kho bãi hiển thị trên toàn bộ website.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition"
          >
            <RotateCcw className="w-4 h-4 text-gray-500" />
            Khôi phục mặc định
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="inline-flex items-center gap-1.5 px-5 py-2 text-sm font-bold text-white bg-[#214E34] hover:bg-[#183B27] rounded-lg shadow-sm hover:shadow transition"
          >
            <Save className="w-4 h-4 text-[#CDAA63]" />
            Lưu thay đổi
          </button>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center gap-3 animate-in fade-in">
          <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
          <span className="font-medium text-sm">
            Đã lưu thông tin liên hệ thành công! Toàn bộ website (Header, Footer, Nút gọi, Trang liên hệ) đã được cập nhật ngay lập tức.
          </span>
        </div>
      )}

      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (2 cols): Input fields */}
        <div className="lg:col-span-2 space-y-6">
          {/* Section 1: Logo & Bộ Nhận Diện Thương Hiệu */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
                  <ImageIcon className="w-5 h-5 text-[#214E34]" />
                  Logo Website & Bộ Nhận Diện Thương Hiệu
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Logo chính thức hiển thị tại Thanh điều hướng (Header), Chân trang (Footer), Màn hình đăng nhập và Giới thiệu.
                </p>
              </div>
              {config.logoUrl && config.logoUrl !== "/images/logo.png" ? (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 self-start sm:self-auto">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Đang dùng Logo tùy chỉnh
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-600 border border-gray-200 self-start sm:self-auto">
                  Logo mặc định hệ thống
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              {/* Dual preview: Light mode & Dark mode */}
              <div className="md:col-span-5 space-y-3">
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide">
                  Xem trước hiển thị thực tế
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {/* On Light Background (Header/Admin) */}
                  <div className="p-4 rounded-xl border border-gray-200 bg-gradient-to-b from-gray-50 to-white flex flex-col items-center justify-center text-center space-y-2 shadow-sm">
                    <div className="relative w-16 h-16 rounded-full bg-white p-1 ring-2 ring-[#CDAA63]/50 shadow-md overflow-hidden flex items-center justify-center">
                      <Image
                        src={config.logoUrl || "/images/logo.png"}
                        alt="Logo Header Preview"
                        width={64}
                        height={64}
                        className="w-full h-full object-contain rounded-full"
                        unoptimized={Boolean(config.logoUrl?.startsWith("data:"))}
                      />
                    </div>
                    <span className="text-[11px] font-semibold text-gray-600">Nền sáng (Header)</span>
                  </div>

                  {/* On Dark Background (Footer/Banner) */}
                  <div className="p-4 rounded-xl border border-[#2B3E32] bg-[#18231C] flex flex-col items-center justify-center text-center space-y-2 shadow-sm">
                    <div className="relative w-16 h-16 rounded-full bg-white p-1 ring-2 ring-[#CDAA63] shadow-md overflow-hidden flex items-center justify-center">
                      <Image
                        src={config.logoUrl || "/images/logo.png"}
                        alt="Logo Footer Preview"
                        width={64}
                        height={64}
                        className="w-full h-full object-contain rounded-full"
                        unoptimized={Boolean(config.logoUrl?.startsWith("data:"))}
                      />
                    </div>
                    <span className="text-[11px] font-semibold text-[#CDAA63]">Nền tối (Footer)</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      handleChange("logoUrl", "/images/logo.png");
                      setUploadError(null);
                    }}
                    disabled={!config.logoUrl || config.logoUrl === "/images/logo.png"}
                    className="text-xs text-gray-600 hover:text-red-600 disabled:opacity-40 disabled:hover:text-gray-600 flex items-center gap-1 font-medium transition"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Khôi phục logo mặc định
                  </button>
                </div>
              </div>

              {/* Actions: Upload file or URL */}
              <div className="md:col-span-7 space-y-4">
                {/* Drag & Drop Upload Box */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-1.5">
                    Tải logo mới từ máy tính / điện thoại
                  </label>
                  <div
                    onDragOver={(e) => {
                      e.preventDefault();
                      setIsDragging(true);
                    }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`relative border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition ${
                      isDragging
                        ? "border-[#214E34] bg-emerald-50/50 scale-[1.01]"
                        : "border-gray-300 hover:border-[#214E34] bg-gray-50/50 hover:bg-emerald-50/20"
                    }`}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/png,image/jpeg,image/webp,image/svg+xml,image/gif"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          handleLogoUpload(e.target.files[0]);
                        }
                      }}
                    />

                    {isUploading ? (
                      <div className="flex flex-col items-center justify-center py-2 space-y-2">
                        <Loader2 className="w-7 h-7 text-[#214E34] animate-spin" />
                        <p className="text-xs font-bold text-[#214E34]">Đang xử lý tải ảnh lên...</p>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center space-y-2">
                        <div className="w-10 h-10 rounded-full bg-[#214E34]/10 flex items-center justify-center text-[#214E34]">
                          <Upload className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-xs sm:text-sm font-bold text-gray-800">
                            Nhấn để chọn ảnh hoặc kéo thả vào đây
                          </p>
                          <p className="text-[11px] text-gray-500 mt-0.5">
                            Hỗ trợ PNG, WEBP, JPG, SVG (Khuyên dùng PNG trong suốt 512x512px)
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {uploadError && (
                    <div className="mt-2 p-2.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{uploadError}</span>
                    </div>
                  )}
                </div>

                {/* Or enter direct URL */}
                <div className="space-y-1.5 pt-2 border-t border-gray-100">
                  <label className="block text-xs font-semibold text-gray-700 uppercase">
                    Hoặc nhập đường dẫn ảnh (URL)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={customLogoUrl}
                      onChange={(e) => setCustomLogoUrl(e.target.value)}
                      placeholder="Ví dụ: https://.../my-logo.png hoặc /images/logo.png"
                      className="flex-1 px-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#214E34] focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (customLogoUrl.trim()) {
                          handleChange("logoUrl", customLogoUrl.trim());
                          setCustomLogoUrl("");
                          setUploadError(null);
                        }
                      }}
                      disabled={!customLogoUrl.trim()}
                      className="px-3.5 py-2 text-xs font-bold text-white bg-[#214E34] hover:bg-[#183B27] disabled:opacity-50 disabled:hover:bg-[#214E34] rounded-lg transition"
                    >
                      Áp dụng
                    </button>
                  </div>
                </div>

                {/* Preset templates */}
                <div className="pt-2 border-t border-gray-100 flex flex-wrap items-center gap-2">
                  <span className="text-[11px] text-gray-500 font-medium">Logo mẫu có sẵn:</span>
                  <button
                    type="button"
                    onClick={() => handleChange("logoUrl", "/images/logo.png")}
                    className={`px-2.5 py-1 rounded-md text-xs font-medium border transition ${
                      config.logoUrl === "/images/logo.png"
                        ? "bg-[#214E34] text-white border-[#214E34]"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    Logo gốc (Tiêu chuẩn)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleChange("logoUrl", "/images/logo-256.png")}
                    className={`px-2.5 py-1 rounded-md text-xs font-medium border transition ${
                      config.logoUrl === "/images/logo-256.png"
                        ? "bg-[#214E34] text-white border-[#214E34]"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    Logo gọn 256px
                  </button>
                </div>
              </div>
            </div>

            {/* SUBSECTION: FAVICON (BIỂU TƯỢNG TAB TRÌNH DUYỆT) */}
            <div className="pt-6 border-t border-gray-100 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                    <Globe className="w-4 h-4 text-[#CDAA63]" />
                    Biểu Tượng Favicon (Hiển thị trên Tab Trình Duyệt)
                  </h4>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Biểu tượng nhỏ hiển thị cạnh tiêu đề trang web trên Google Chrome, Cốc Cốc, Safari, v.v.
                  </p>
                </div>
                {config.faviconUrl && config.faviconUrl !== "/favicon.ico" ? (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 self-start sm:self-auto">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Favicon tùy chỉnh
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-600 border border-gray-200 self-start sm:self-auto">
                    Favicon mặc định (/favicon.ico)
                  </span>
                )}
              </div>

              {/* Simulated Browser Tab Preview */}
              <div className="p-3.5 bg-gray-100/90 rounded-xl border border-gray-200 space-y-2">
                <div className="text-[11px] font-semibold text-gray-500 uppercase flex items-center justify-between">
                  <span>Mô phỏng Tab trình duyệt Chrome / Safari</span>
                  <span className="text-[10px] text-emerald-700 font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Tự động đổi tab icon ngay khi lưu
                  </span>
                </div>
                <div className="bg-white rounded-t-lg border-t border-x border-gray-300 p-2 max-w-md flex items-center gap-2 shadow-sm">
                  <div className="relative w-4 h-4 shrink-0 rounded overflow-hidden flex items-center justify-center">
                    <Image
                      src={config.faviconUrl || config.logoUrl || "/favicon.ico"}
                      alt="Favicon Tab Preview"
                      width={16}
                      height={16}
                      className="w-full h-full object-contain"
                      unoptimized={Boolean(config.faviconUrl?.startsWith("data:") || config.logoUrl?.startsWith("data:"))}
                    />
                  </div>
                  <span className="text-xs font-medium text-gray-800 truncate">
                    {config.companyName || "Cọc Tre Huyền Dương"} - Cọc Tre Công Trình
                  </span>
                  <span className="text-gray-400 text-xs ml-auto">✕</span>
                </div>
              </div>

              {/* Favicon Upload Actions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start pt-1">
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-gray-700 uppercase">
                    Tải file Favicon riêng (.ico, .png, .svg)
                  </label>
                  <div className="flex flex-wrap gap-2">
                    <input
                      ref={faviconInputRef}
                      type="file"
                      accept="image/x-icon,image/vnd.microsoft.icon,image/png,image/svg+xml,image/webp"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          handleFaviconUpload(e.target.files[0]);
                        }
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => faviconInputRef.current?.click()}
                      disabled={isUploadingFavicon}
                      className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg shadow-sm transition"
                    >
                      {isUploadingFavicon ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 text-[#214E34] animate-spin" />
                          <span>Đang tải...</span>
                        </>
                      ) : (
                        <>
                          <Upload className="w-3.5 h-3.5 text-[#214E34]" />
                          <span>Chọn file Favicon mới</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        handleChange("faviconUrl", config.logoUrl || "/images/logo.png");
                        setFaviconUploadError(null);
                      }}
                      className="px-3 py-2 text-xs font-semibold text-[#214E34] bg-[#214E34]/10 hover:bg-[#214E34]/20 rounded-lg transition"
                      title="Lấy luôn ảnh Logo hiện tại làm icon trình duyệt"
                    >
                      Dùng ảnh Logo
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        handleChange("faviconUrl", "/favicon.ico");
                        setFaviconUploadError(null);
                      }}
                      disabled={!config.faviconUrl || config.faviconUrl === "/favicon.ico"}
                      className="px-2.5 py-2 text-xs text-gray-500 hover:text-red-600 disabled:opacity-40 rounded-lg transition"
                      title="Khôi phục favicon.ico gốc"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {faviconUploadError && (
                    <p className="text-xs text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {faviconUploadError}
                    </p>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-gray-700 uppercase">
                    Hoặc dán link Favicon (URL)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={customFaviconUrl}
                      onChange={(e) => setCustomFaviconUrl(e.target.value)}
                      placeholder="Ví dụ: /favicon.ico hoặc https://.../icon.png"
                      className="flex-1 px-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#214E34] focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (customFaviconUrl.trim()) {
                          handleChange("faviconUrl", customFaviconUrl.trim());
                          setCustomFaviconUrl("");
                          setFaviconUploadError(null);
                        }
                      }}
                      disabled={!customFaviconUrl.trim()}
                      className="px-3.5 py-2 text-xs font-bold text-white bg-[#214E34] hover:bg-[#183B27] disabled:opacity-50 rounded-lg transition"
                    >
                      Áp dụng
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Hotline, Zalo, Email */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-3">
              <Phone className="w-5 h-5 text-[#214E34]" />
              Kênh Liên Hệ Trực Tiếp (Hotline, Zalo, Email)
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                  Hotline chính (dùng cho tel: link)
                </label>
                <input
                  type="text"
                  value={config.hotline}
                  onChange={(e) => handleChange("hotline", e.target.value)}
                  placeholder="0325401407"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#214E34] focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                  Hotline hiển thị (có dấu chấm)
                </label>
                <input
                  type="text"
                  value={config.hotlineFormatted}
                  onChange={(e) => handleChange("hotlineFormatted", e.target.value)}
                  placeholder="0325.401.407"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#214E34] focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                  Hotline phụ (tùy chọn)
                </label>
                <input
                  type="text"
                  value={config.hotlineSecondary || ""}
                  onChange={(e) => handleChange("hotlineSecondary", e.target.value)}
                  placeholder="0988.666.888"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#214E34] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                  Số Zalo
                </label>
                <input
                  type="text"
                  value={config.zalo}
                  onChange={(e) => {
                    const val = e.target.value;
                    handleChange("zalo", val);
                    handleChange("zaloUrl", `https://zalo.me/${val.replace(/\D/g, "")}`);
                  }}
                  placeholder="0325401407"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#214E34] focus:outline-none"
                  required
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                  Địa chỉ Email nhận báo giá & hợp đồng
                </label>
                <input
                  type="email"
                  value={config.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  placeholder="hoabinh271159@gmail.com"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#214E34] focus:outline-none"
                  required
                />
              </div>
            </div>
          </div>

          {/* Section 2: Trụ sở & Bãi tập kết cọc */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-3">
              <MapPin className="w-5 h-5 text-[#214E34]" />
              Địa Chỉ Trụ Sở & Bãi Tập Kết Cọc Tre
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                  Trụ sở chính công ty
                </label>
                <input
                  type="text"
                  value={config.headquarters}
                  onChange={(e) => handleChange("headquarters", e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#214E34] focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                  Kho bãi chính / Xưởng sản xuất
                </label>
                <input
                  type="text"
                  value={config.warehouse1}
                  onChange={(e) => handleChange("warehouse1", e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#214E34] focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                  Kho trung chuyển 2 (Hà Nội)
                </label>
                <input
                  type="text"
                  value={config.warehouse2}
                  onChange={(e) => handleChange("warehouse2", e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#214E34] focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                  Giờ làm việc & hỗ trợ
                </label>
                <input
                  type="text"
                  value={config.workHours}
                  onChange={(e) => handleChange("workHours", e.target.value)}
                  placeholder="Thứ 2 - Chủ Nhật: 06:00 - 22:00 (Hỗ trợ khẩn cấp 24/7)"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#214E34] focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Doanh nghiệp, Bản đồ & Mạng xã hội */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-3">
              <Building className="w-5 h-5 text-[#214E34]" />
              Tên Doanh Nghiệp & Bản Đồ Google Maps
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                  Tên thương hiệu công ty
                </label>
                <input
                  type="text"
                  value={config.companyName}
                  onChange={(e) => handleChange("companyName", e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#214E34] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                  Tên pháp lý đầy đủ
                </label>
                <input
                  type="text"
                  value={config.legalName}
                  onChange={(e) => handleChange("legalName", e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#214E34] focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                  Khẩu hiệu / Slogan
                </label>
                <input
                  type="text"
                  value={config.slogan}
                  onChange={(e) => handleChange("slogan", e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#214E34] focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-semibold text-gray-700 uppercase">
                    Mã nhúng bản đồ Google Maps (Embed Iframe)
                  </label>
                  <button
                    type="button"
                    onClick={() =>
                      handleChange(
                        "mapEmbedUrl",
                        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3725.1953284097457!2d105.7820123!3d20.9848149!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135accf12b7a977%3A0x4a9b407ebaf42f1b!2zMjI4IFRoYW5oIELDrG5oLCBN4buZIExhbywgSMOgIMSQw7RuZywgSMOgIE7hu5lp!5e0!3m2!1svi!2s!4v1700000000000!5m2!1svi!2s"
                      )
                    }
                    className="text-xs text-[#214E34] hover:underline font-semibold"
                  >
                    Dùng bản đồ mẫu trụ sở Hà Đông
                  </button>
                </div>

                <textarea
                  rows={2}
                  value={config.mapEmbedUrl}
                  onChange={(e) => {
                    const val = e.target.value.trim();
                    const match = val.match(/src=["'](.*?)["']/);
                    const clean = match && match[1] ? match[1] : val;
                    handleChange("mapEmbedUrl", clean);
                  }}
                  placeholder='Dán mã nhúng iframe từ Google Maps (Ví dụ: <iframe src="https://www.google.com/maps/embed?pb=..." ...></iframe>)'
                  className="w-full px-3 py-2 text-xs font-mono border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#214E34] focus:outline-none"
                />

                {/* Warning if user pasted non-embed link */}
                {config.mapEmbedUrl &&
                  (config.mapEmbedUrl.includes("maps.app.goo.gl") ||
                    config.mapEmbedUrl.includes("google.com/maps/place") ||
                    !config.mapEmbedUrl.includes("google.com/maps/embed")) && (
                    <div className="p-3 bg-amber-50 border border-amber-300 rounded-xl text-amber-900 text-xs space-y-1.5">
                      <p className="font-bold flex items-center gap-1.5">
                        ⚠️ Cảnh báo: Bạn đang dán Link chia sẻ thông thường, Google sẽ báo lỗi &quot;Từ chối kết nối&quot;!
                      </p>
                      <p className="text-[11px] leading-relaxed">
                        Google Maps không cho phép nhúng link dạng <code>maps.app.goo.gl</code> hay <code>maps/place</code> vào website.
                        <br />
                        <strong>Cách lấy đúng link nhúng:</strong>
                        <br />
                        1. Mở Google Maps và tìm vị trí doanh nghiệp của bạn.
                        <br />
                        2. Bấm nút <strong>&quot;Chia sẻ&quot; (Share)</strong> ➔ Chọn tab <strong>&quot;Nhúng bản đồ&quot; (Embed a map)</strong>.
                        <br />
                        3. Bấm <strong>&quot;Sao chép HTML&quot; (Copy HTML)</strong> và dán thẳng vào ô phía trên!
                      </p>
                    </div>
                  )}

                {/* Live Map Preview inside Admin */}
                {config.mapEmbedUrl && config.mapEmbedUrl.includes("google.com/maps/embed") && (
                  <div className="mt-2 border border-gray-200 rounded-xl overflow-hidden">
                    <div className="bg-gray-100 px-3 py-1.5 text-[11px] font-bold text-gray-700 flex items-center justify-between">
                      <span>Xem trước bản đồ:</span>
                      <span className="text-emerald-700">✓ Link nhúng hợp lệ</span>
                    </div>
                    <div className="h-44 w-full bg-gray-50">
                      <iframe
                        src={config.mapEmbedUrl}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        loading="lazy"
                        title="Xem trước bản đồ"
                      />
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                  Facebook Fanpage URL
                </label>
                <input
                  type="text"
                  value={config.facebook}
                  onChange={(e) => handleChange("facebook", e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#214E34] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                  Năng lực cung ứng
                </label>
                <input
                  type="text"
                  value={config.supplyCapacity}
                  onChange={(e) => handleChange("supplyCapacity", e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#214E34] focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Section 6: Tài Khoản Quản Trị & Đổi Mật Khẩu */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-3">
              <KeyRound className="w-5 h-5 text-[#214E34]" />
              Bảo Mật & Đổi Mật Khẩu Quản Trị
            </h3>

            <div className="p-3.5 bg-emerald-50/70 border border-emerald-200 rounded-xl text-xs text-emerald-900 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#214E34] shrink-0" />
                <span>
                  Tài khoản đang đăng nhập: <strong>{getStoredUser()?.email || "admin@coctrehuyenduong.com"}</strong>
                </span>
              </div>
              <span className="text-[11px] font-semibold text-[#214E34] bg-white px-2.5 py-0.5 rounded-full border border-emerald-300 self-start sm:self-auto">
                {getStoredUser()?.role || "SUPER_ADMIN"}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                  Mật khẩu hiện tại
                </label>
                <input
                  type="password"
                  value={currentPass}
                  onChange={(e) => setCurrentPass(e.target.value)}
                  placeholder="Mật khẩu đang dùng"
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#214E34] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                  Mật khẩu mới
                </label>
                <input
                  type="password"
                  value={newPass}
                  onChange={(e) => setNewPass(e.target.value)}
                  placeholder="Tối thiểu 6 ký tự"
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#214E34] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                  Xác nhận mật khẩu mới
                </label>
                <input
                  type="password"
                  value={confirmPass}
                  onChange={(e) => setConfirmPass(e.target.value)}
                  placeholder="Nhập lại mật khẩu mới"
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#214E34] focus:outline-none"
                />
              </div>
            </div>

            {changePassMsg && (
              <div
                className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
                  changePassMsg.type === "success"
                    ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                    : "bg-rose-50 text-rose-800 border border-rose-200"
                }`}
              >
                {changePassMsg.type === "success" ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                )}
                <span>{changePassMsg.text}</span>
              </div>
            )}

            <div className="flex justify-end pt-1">
              <button
                type="button"
                onClick={handleChangePassword}
                disabled={isChangingPass || !currentPass || !newPass}
                className="px-4 py-2.5 text-xs font-bold text-white bg-[#214E34] hover:bg-[#183B27] disabled:opacity-50 rounded-lg shadow-sm transition flex items-center gap-2 cursor-pointer"
              >
                {isChangingPass ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-[#CDAA63]" />
                    <span>Đang cập nhật...</span>
                  </>
                ) : (
                  <>
                    <KeyRound className="w-3.5 h-3.5 text-[#CDAA63]" />
                    <span>Đổi Mật Khẩu Quản Trị</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-white bg-[#214E34] hover:bg-[#183B27] rounded-xl shadow hover:shadow-lg transition"
            >
              <Save className="w-4 h-4 text-[#CDAA63]" />
              Lưu toàn bộ thay đổi
            </button>
          </div>
        </div>

        {/* Right Column (1 col): Live Preview Card */}
        <div className="space-y-6">
          <div className="bg-[#18231C] text-white p-6 rounded-2xl border border-[#2B3E32] shadow-sm space-y-5 sticky top-24">
            <div className="flex items-center justify-between border-b border-[#2A3930] pb-3">
              <span className="text-xs font-bold text-[#CDAA63] tracking-widest uppercase flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                Xem trước giao diện
              </span>
              <span className="text-xs text-gray-400">Live Preview</span>
            </div>

            <div className="space-y-4 text-sm">
              {/* Header preview with Logo */}
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="relative w-12 h-12 shrink-0 rounded-full bg-white p-0.5 ring-2 ring-[#CDAA63] shadow-md overflow-hidden">
                  <Image
                    src={config.logoUrl || "/images/logo.png"}
                    alt="Logo Preview"
                    width={48}
                    height={48}
                    className="w-full h-full object-contain rounded-full"
                    unoptimized={Boolean(config.logoUrl?.startsWith("data:"))}
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-white truncate">{config.companyName}</p>
                  <p className="text-[11px] text-[#CDAA63] truncate">{config.slogan}</p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#214E34]/50 border border-[#2E6847]">
                <p className="text-xs text-[#CDAA63] font-semibold mb-1">Hotline tư vấn:</p>
                <p className="text-xl font-extrabold text-white tracking-wide">{config.hotlineFormatted}</p>
                {config.hotlineSecondary && (
                  <p className="text-xs text-gray-300 mt-0.5">Phụ: {config.hotlineSecondary}</p>
                )}
              </div>

              <div className="space-y-2 text-xs text-gray-300">
                <p className="flex items-start gap-2">
                  <Mail className="w-4 h-4 text-[#CDAA63] shrink-0 mt-0.5" />
                  <span>{config.email}</span>
                </p>
                <p className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#CDAA63] shrink-0 mt-0.5" />
                  <span>{config.headquarters}</span>
                </p>
                <p className="flex items-start gap-2">
                  <Warehouse className="w-4 h-4 text-[#CDAA63] shrink-0 mt-0.5" />
                  <span>{config.warehouse1}</span>
                </p>
                <p className="flex items-start gap-2">
                  <Clock className="w-4 h-4 text-[#CDAA63] shrink-0 mt-0.5" />
                  <span>{config.workHours}</span>
                </p>
              </div>

              <div className="pt-2 border-t border-[#2A3930] flex items-center justify-between text-xs text-gray-400">
                <span>Zalo: {config.zalo}</span>
                <span className="text-emerald-400 font-semibold">Tự động đồng bộ 100%</span>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
