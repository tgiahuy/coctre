"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Building2,
  PlusCircle,
  Edit3,
  Trash2,
  Eye,
  RotateCcw,
  CheckCircle,
  Save,
  ArrowLeft,
  Search,
  MapPin,
  Calendar,
  Layers,
  Image as ImageIcon
} from "lucide-react";
import { Project } from "@/data/projects";
import {
  requestProjects,
  saveProject,
  deleteProject
} from "@/lib/projectStore";
import ImageUploader from "@/components/admin/ImageUploader";

const PRESET_PROJECT_IMAGES = [
  { label: "Tỉnh Lộ 489C", url: "/images/projects/du-an-tinh-lo-489c-1.webp" },
  { label: "Cầu Văn Đức", url: "/images/projects/du-an-cau-van-duc-1.webp" },
  { label: "Kè Đê Hà Nam", url: "/images/projects/du-an-ke-de-ha-nam-1.webp" },
  { label: "Kinh Tế Biển", url: "/images/projects/du-an-kinh-te-bien-1.webp" },
  { label: "CCN Đồng Văn", url: "/images/projects/du-an-nha-xuong-dong-van-1.webp" },
  { label: "Bãi tập kết cọc", url: "/images/banner/bamboo-poles.jpg" },
];

function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[đĐ]/g, "d")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function ProjectManager() {
  const [projectsList, setProjectsList] = useState<Project[]>([]);
  const [viewMode, setViewMode] = useState<"list" | "form">("list");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState<Project>({
    id: "",
    slug: "",
    title: "",
    location: "Hà Nội",
    projectType: "Công trình hạ tầng giao thông đường bộ",
    bambooSupplied: "Cọc tre 2,5m & 3m chọn lọc",
    totalQuantity: "150.000 cọc tre",
    completionYear: "2024",
    coverImage: "/images/projects/du-an-tinh-lo-489c-1.webp",
    gallery: ["/images/projects/du-an-tinh-lo-489c-1.webp"],
    shortDescription: "",
    overview: "",
    challenge: "",
    solution: "",
    results: "",
    productsUsed: ["coc-tre-25m", "coc-tre-3m"],
    featured: true,
  });

  const [customImageUrl, setCustomImageUrl] = useState("");

  const loadProjects = async () => {
    setProjectsList(await requestProjects());
  };

  useEffect(() => {
    void loadProjects();
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleCreateNew = () => {
    const newId = "project-" + Date.now();
    const initData: Project = {
      id: newId,
      slug: "",
      title: "",
      location: "",
      projectType: "Công trình hạ tầng giao thông đường bộ",
      bambooSupplied: "Cọc tre 2,5m & 3m",
      totalQuantity: "100.000 cọc tre",
      completionYear: new Date().getFullYear().toString(),
      coverImage: "/images/projects/du-an-tinh-lo-489c-1.webp",
      gallery: ["/images/projects/du-an-tinh-lo-489c-1.webp"],
      shortDescription: "",
      overview: "",
      challenge: "",
      solution: "",
      results: "",
      productsUsed: ["coc-tre-25m", "coc-tre-3m"],
      featured: true,
    };
    setFormData(initData);
    setEditingId(null);
    setViewMode("form");
  };

  const handleEdit = (p: Project) => {
    setFormData(p);
    setEditingId(p.id);
    setViewMode("form");
  };

  const handleDelete = async (idOrSlug: string, title: string) => {
    if (confirm(`Bạn có chắc chắn muốn xóa dự án "${title}"?`)) {
      if (!await deleteProject(idOrSlug)) return alert("Không thể xóa dự án. Phiên đăng nhập có thể đã hết hạn.");
      await loadProjects();
      showToast(`Đã xóa dự án "${title}" thành công!`);
    }
  };

  const handleReset = () => {
    void loadProjects();
    showToast("Đã tải lại dự án từ máy chủ.");
  };

  const handleTitleChange = (title: string) => {
    setFormData((prev) => ({
      ...prev,
      title,
      slug: editingId ? prev.slug : slugify(title),
    }));
  };

  const handleAddPresetImage = (url: string) => {
    setFormData((prev) => ({
      ...prev,
      coverImage: url,
      gallery: prev.gallery.includes(url) ? prev.gallery : [...prev.gallery, url],
    }));
  };

  const handleSaveForm = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      alert("Vui lòng nhập tên dự án");
      return;
    }

    const finalSlug = formData.slug.trim() || slugify(formData.title);

    const projectToSave: Project = {
      ...formData,
      slug: finalSlug,
      coverImage: formData.coverImage || "/images/projects/du-an-tinh-lo-489c-1.webp",
      gallery: formData.gallery.length > 0 ? formData.gallery : [formData.coverImage || "/images/projects/du-an-tinh-lo-489c-1.webp"],
    };

    if (!await saveProject(projectToSave)) return alert("Không thể lưu dự án. Phiên đăng nhập có thể đã hết hạn.");
    await loadProjects();
    setViewMode("list");
    showToast(`Đã lưu dự án "${projectToSave.title}" thành công!`);
  };

  const filteredProjects = projectsList.filter((p) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      p.title.toLowerCase().includes(q) ||
      p.location.toLowerCase().includes(q) ||
      p.projectType.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center gap-3 animate-in fade-in">
          <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
          <span className="font-medium text-sm">{toastMessage}</span>
        </div>
      )}

      {/* Mode: LIST */}
      {viewMode === "list" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#214E34] flex items-center gap-2">
                <Building2 className="w-6 h-6 text-[#CDAA63]" />
                Quản Lý Dự Án & Công Trình ({projectsList.length})
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Thêm mới, cập nhật tiến độ, khối lượng cọc tre cung ứng và xóa dự án thi công.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition"
              >
                <RotateCcw className="w-4 h-4 text-gray-500" />
                Tải lại
              </button>

              <button
                type="button"
                onClick={handleCreateNew}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-bold text-white bg-[#214E34] hover:bg-[#183B27] rounded-lg shadow-sm hover:shadow transition"
              >
                <PlusCircle className="w-4 h-4 text-[#CDAA63]" />
                Thêm dự án mới
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm dự án theo tên, vị trí địa lý, hạng mục..."
              className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#214E34] focus:outline-none bg-white"
            />
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((p) => (
              <div
                key={p.id || p.slug}
                className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col hover:border-[#214E34]/40 transition group"
              >
                <div className="relative h-44 bg-gray-100 overflow-hidden">
                  <Image
                    src={p.coverImage || "/images/projects/du-an-tinh-lo-489c-1.webp"}
                    alt={p.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 text-xs font-bold rounded-lg bg-[#214E34] text-white shadow-sm flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-[#CDAA63]" />
                      {p.completionYear}
                    </span>
                  </div>
                  {p.featured && (
                    <div className="absolute top-3 right-3">
                      <span className="px-2 py-0.5 text-[11px] font-semibold rounded-md bg-[#CDAA63] text-[#18231C]">
                        Tiêu biểu
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] font-bold text-[#CDAA63] uppercase tracking-wider block">
                      {p.projectType}
                    </span>
                    <h3 className="font-bold text-gray-900 text-base mt-1 group-hover:text-[#214E34] transition line-clamp-2">
                      {p.title}
                    </h3>

                    <div className="mt-3 space-y-1.5 text-xs text-gray-600 bg-[#F7F5EF] p-2.5 rounded-lg">
                      <p className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#214E34] shrink-0" />
                        <span className="truncate">{p.location}</span>
                      </p>
                      <p className="flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5 text-[#CDAA63] shrink-0" />
                        <span className="font-semibold text-gray-800">{p.totalQuantity}</span>
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                    <Link
                      href={`/du-an/${p.slug}`}
                      target="_blank"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-gray-600 hover:text-[#214E34] transition"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      Xem trên web
                    </Link>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleEdit(p)}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-[#214E34] bg-emerald-50 hover:bg-emerald-100 rounded-lg transition"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        Sửa
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(p.id || p.slug, p.title)}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-lg transition"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        Xóa
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-12 bg-white rounded-2xl border border-gray-200">
              <Building2 className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-600 font-medium">Không tìm thấy dự án nào</p>
            </div>
          )}
        </div>
      )}

      {/* Mode: FORM */}
      {viewMode === "form" && (
        <form onSubmit={handleSaveForm} className="space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-gray-200">
            <button
              type="button"
              onClick={() => setViewMode("list")}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-600 hover:text-[#214E34]"
            >
              <ArrowLeft className="w-4 h-4" />
              Quay lại danh sách dự án
            </button>

            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-2 text-sm font-bold text-white bg-[#214E34] hover:bg-[#183B27] rounded-lg shadow"
            >
              <Save className="w-4 h-4 text-[#CDAA63]" />
              {editingId ? "Lưu thay đổi dự án" : "Tạo dự án mới"}
            </button>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-3">
              {editingId ? "Chỉnh Sửa Thông Tin Dự Án" : "Thêm Dự Án Công Trình Mới"}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                  Tên dự án công trình *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="Ví dụ: Dự Án Gia Cố Kè Đê Sông Đáy"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#214E34] focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                  Đường dẫn (Slug URL) *
                </label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value }))}
                  placeholder="du-an-gia-co-ke-de"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#214E34] focus:outline-none font-mono text-xs"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                  Địa điểm thi công
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
                  placeholder="Nam Định, Hà Nam, Hải Dương..."
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#214E34] focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                  Loại công trình
                </label>
                <input
                  type="text"
                  value={formData.projectType}
                  onChange={(e) => setFormData((prev) => ({ ...prev, projectType: e.target.value }))}
                  placeholder="Công trình hạ tầng giao thông đường bộ"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#214E34] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                  Tổng khối lượng cọc tre đã cấp
                </label>
                <input
                  type="text"
                  value={formData.totalQuantity}
                  onChange={(e) => setFormData((prev) => ({ ...prev, totalQuantity: e.target.value }))}
                  placeholder="180.000 cọc tre"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#214E34] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                  Quy cách cọc tre cung ứng
                </label>
                <input
                  type="text"
                  value={formData.bambooSupplied}
                  onChange={(e) => setFormData((prev) => ({ ...prev, bambooSupplied: e.target.value }))}
                  placeholder="Cọc tre 2,5m & Cọc tre 3m già chọn lọc"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#214E34] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                  Năm hoàn thành / Tiến độ
                </label>
                <input
                  type="text"
                  value={formData.completionYear}
                  onChange={(e) => setFormData((prev) => ({ ...prev, completionYear: e.target.value }))}
                  placeholder="2023 - 2024"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#214E34] focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                  Tóm tắt ngắn (Hiển thị thẻ Card)
                </label>
                <textarea
                  rows={2}
                  value={formData.shortDescription}
                  onChange={(e) => setFormData((prev) => ({ ...prev, shortDescription: e.target.value }))}
                  placeholder="Cung cấp hơn 180.000 cọc tre xử lý nền đất yếu..."
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#214E34] focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                  Tổng quan dự án (Overview)
                </label>
                <textarea
                  rows={3}
                  value={formData.overview}
                  onChange={(e) => setFormData((prev) => ({ ...prev, overview: e.target.value }))}
                  placeholder="Thông tin chi tiết quy mô dự án, chủ đầu tư, tuyến đường..."
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#214E34] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                  Thách thức & Địa chất
                </label>
                <textarea
                  rows={3}
                  value={formData.challenge}
                  onChange={(e) => setFormData((prev) => ({ ...prev, challenge: e.target.value }))}
                  placeholder="Mực nước ngầm cao, nền đất bùn sét yếu..."
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#214E34] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                  Giải pháp & Cung ứng của công ty
                </label>
                <textarea
                  rows={3}
                  value={formData.solution}
                  onChange={(e) => setFormData((prev) => ({ ...prev, solution: e.target.value }))}
                  placeholder="Huy động đội xe luân phiên vận chuyển cấp 10.000 cọc/ngày..."
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#214E34] focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                  Kết quả & Nghiệm thu
                </label>
                <textarea
                  rows={2}
                  value={formData.results}
                  onChange={(e) => setFormData((prev) => ({ ...prev, results: e.target.value }))}
                  placeholder="Nghiệm thu 100% đạt chuẩn chất lượng theo TCVN..."
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#214E34] focus:outline-none"
                />
              </div>
            </div>

            {/* Images selection via ImageUploader */}
            <div className="pt-4 border-t border-gray-100">
              <ImageUploader
                images={
                  formData.gallery && formData.gallery.length > 0
                    ? formData.gallery
                    : formData.coverImage
                    ? [formData.coverImage]
                    : []
                }
                onChange={(imgs) => {
                  setFormData((prev) => ({
                    ...prev,
                    coverImage: imgs[0] || "",
                    gallery: imgs,
                  }));
                }}
                presetImages={PRESET_PROJECT_IMAGES}
                label="Hình ảnh & Ảnh bìa dự án (Tải ảnh từ máy tính/điện thoại hoặc chọn mẫu)"
                maxFiles={6}
              />
            </div>

            <div className="pt-4 border-t border-gray-100 flex items-center gap-3">
              <input
                type="checkbox"
                id="project-featured"
                checked={formData.featured}
                onChange={(e) => setFormData((prev) => ({ ...prev, featured: e.target.checked }))}
                className="w-4 h-4 text-[#214E34] focus:ring-[#214E34] rounded"
              />
              <label htmlFor="project-featured" className="text-sm font-semibold text-gray-800 cursor-pointer">
                Đánh dấu là Dự án tiêu biểu (Hiển thị trang chủ)
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setViewMode("list")}
              className="px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50"
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 text-sm font-bold text-white bg-[#214E34] hover:bg-[#183B27] rounded-xl shadow hover:shadow-lg transition flex items-center gap-2"
            >
              <Save className="w-4 h-4 text-[#CDAA63]" />
              {editingId ? "Lưu thay đổi dự án" : "Xác nhận tạo dự án"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
