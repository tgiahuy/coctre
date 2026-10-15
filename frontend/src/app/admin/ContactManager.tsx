"use client";

import React, { useState, useEffect } from "react";
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
  Info
} from "lucide-react";
import { SiteConfig } from "@/data/config";
import { getSiteConfig, saveSiteConfig, resetSiteConfigToDefault } from "@/lib/configStore";

export default function ContactManager() {
  const [config, setConfig] = useState<SiteConfig>(getSiteConfig());
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    setConfig(getSiteConfig());
  }, []);

  const handleChange = (field: keyof SiteConfig, value: string | number) => {
    setConfig((prev) => ({
      ...prev,
      [field]: value,
    }));
    setSavedSuccess(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    saveSiteConfig(config);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 4000);
  };

  const handleReset = () => {
    if (confirm("Bạn có chắc chắn muốn khôi phục toàn bộ thông tin liên hệ về mặc định ban đầu?")) {
      resetSiteConfigToDefault();
      setConfig(getSiteConfig());
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
            <Phone className="w-6 h-6 text-[#CDAA63]" />
            Quản Lý Thông Tin Liên Hệ & Doanh Nghiệp
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Chỉnh sửa Hotline, Zalo, Email, Địa chỉ trụ sở và kho bãi hiển thị trên toàn bộ website.
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
          {/* Section 1: Hotline, Zalo, Email */}
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
                  Bãi tập kết cọc tre 1 (Hòa Bình)
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

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                  Google Maps Embed URL (Thẻ iframe nhúng bản đồ)
                </label>
                <input
                  type="text"
                  value={config.mapEmbedUrl}
                  onChange={(e) => handleChange("mapEmbedUrl", e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#214E34] focus:outline-none"
                />
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
              <div>
                <p className="text-xs text-gray-400">Tên doanh nghiệp:</p>
                <p className="text-lg font-bold text-white">{config.companyName}</p>
                <p className="text-xs text-[#CDAA63]">{config.slogan}</p>
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
