"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Package,
  PlusCircle,
  Edit3,
  Trash2,
  Eye,
  RotateCcw,
  CheckCircle,
  Save,
  ArrowLeft,
  Search,
  Sparkles,
  Layers,
  Ruler,
  Image as ImageIcon,
  Check
} from "lucide-react";
import { Product } from "@/data/products";
import {
  getAllProducts,
  saveProduct,
  deleteProduct,
  resetProductsToDefault
} from "@/lib/productStore";

const PRESET_PRODUCT_IMAGES = [
  { label: "Cọc 1.5m", url: "/images/products/coc-tre-15m-1.webp" },
  { label: "Cọc 2m", url: "/images/products/coc-tre-2m-1.webp" },
  { label: "Cọc 2.5m", url: "/images/products/coc-tre-25m-1.webp" },
  { label: "Cọc 3m", url: "/images/products/coc-tre-3m-1.webp" },
  { label: "Cọc 4m", url: "/images/products/coc-tre-4m-1.webp" },
  { label: "Theo yêu cầu", url: "/images/products/coc-tre-theo-yeu-cau-1.webp" },
  { label: "Bãi tập kết cọc", url: "/images/banner/bamboo-poles.jpg" },
  { label: "Rừng tre luồng", url: "/images/banner/bamboo-vertical.jpg" },
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

export default function ProductManager() {
  const [productsList, setProductsList] = useState<Product[]>([]);
  const [viewMode, setViewMode] = useState<"list" | "form">("list");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState<Product>({
    id: "",
    slug: "",
    name: "",
    length: "2m",
    lengthMeters: 2.0,
    diameter: "Ø 60 – 80 mm",
    bambooType: "Tre đực già, tre gai tuyển chọn",
    origin: "Rừng tre già Hòa Bình, Phú Thọ",
    stockStatus: "Sẵn hàng số lượng lớn",
    shortDescription: "",
    description: "",
    specs: [
      { label: "Chiều dài tiêu chuẩn", value: "2,0m (Đủ quy cách)" },
      { label: "Đường kính gốc", value: "Ø 60mm – 80mm" },
      { label: "Độ tuổi tre", value: "3 – 5 năm tuổi (Thịt tre già đanh)" },
    ],
    applications: [
      "Gia cố móng nhà cấp 4, nhà 1-3 tầng trên nền đất yếu.",
      "Thi công gia cố móng kè ao hồ, rãnh thoát nước.",
    ],
    advantages: [
      "Tre đực già đặc ruột, không dập nứt khi ép máy xúc.",
      "Nguồn hàng có sẵn số lượng lớn tại bãi tập kết.",
    ],
    packaging: "Bó 25 cây hoặc 50 cây buộc dây thép chặt chẽ.",
    images: ["/images/products/coc-tre-2m-1.webp"],
    featured: true,
    rating: 5.0,
    reviewCount: 25,
  });

  const [appsInput, setAppsInput] = useState("");
  const [advsInput, setAdvsInput] = useState("");
  const [customImageUrl, setCustomImageUrl] = useState("");

  const loadProducts = () => {
    setProductsList(getAllProducts());
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleCreateNew = () => {
    const newId = "product-" + Date.now();
    const initData: Product = {
      id: newId,
      slug: "",
      name: "",
      length: "2m",
      lengthMeters: 2.0,
      diameter: "Ø 60 – 80 mm",
      bambooType: "Tre đực già Hòa Bình",
      origin: "Hòa Bình",
      stockStatus: "Sẵn hàng số lượng lớn",
      shortDescription: "",
      description: "",
      specs: [
        { label: "Chiều dài tiêu chuẩn", value: "2,0m" },
        { label: "Đường kính gốc", value: "Ø 60mm – 80mm" },
        { label: "Độ tuổi tre", value: "Tre già 4 - 5 năm" },
      ],
      applications: ["Gia cố móng nhà dân dụng, móng kè ao hồ."],
      advantages: ["Tre già thịt dày, không nứt toác."],
      packaging: "Bó 25 cây đai thép chắc chắn.",
      images: ["/images/products/coc-tre-2m-1.webp"],
      featured: true,
      rating: 5.0,
      reviewCount: 15,
    };
    setFormData(initData);
    setAppsInput(initData.applications.join("\n"));
    setAdvsInput(initData.advantages.join("\n"));
    setEditingId(null);
    setViewMode("form");
  };

  const handleEdit = (p: Product) => {
    setFormData(p);
    setAppsInput(p.applications.join("\n"));
    setAdvsInput(p.advantages.join("\n"));
    setEditingId(p.id);
    setViewMode("form");
  };

  const handleDelete = (idOrSlug: string, name: string) => {
    if (confirm(`Bạn có chắc chắn muốn xóa sản phẩm "${name}"?`)) {
      deleteProduct(idOrSlug);
      loadProducts();
      showToast(`Đã xóa sản phẩm "${name}" thành công!`);
    }
  };

  const handleReset = () => {
    if (confirm("Khôi phục danh sách sản phẩm về mẫu gốc của hệ thống?")) {
      resetProductsToDefault();
      loadProducts();
      showToast("Đã khôi phục danh mục sản phẩm về mặc định!");
    }
  };

  const handleNameChange = (name: string) => {
    setFormData((prev) => ({
      ...prev,
      name,
      slug: editingId ? prev.slug : slugify(name),
    }));
  };

  const handleAddPresetImage = (url: string) => {
    if (!formData.images.includes(url)) {
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, url],
      }));
    }
  };

  const handleRemoveImage = (indexToRemove: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, idx) => idx !== indexToRemove),
    }));
  };

  const handleAddCustomImage = () => {
    if (customImageUrl.trim() && !formData.images.includes(customImageUrl.trim())) {
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, customImageUrl.trim()],
      }));
      setCustomImageUrl("");
    }
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert("Vui lòng nhập tên sản phẩm");
      return;
    }

    const finalSlug = formData.slug.trim() || slugify(formData.name);
    const finalApps = appsInput
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);
    const finalAdvs = advsInput
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);

    const productToSave: Product = {
      ...formData,
      slug: finalSlug,
      applications: finalApps.length > 0 ? finalApps : ["Gia cố nền móng công trình"],
      advantages: finalAdvs.length > 0 ? finalAdvs : ["Chất lượng cao, giá tại bãi"],
      images: formData.images.length > 0 ? formData.images : ["/images/products/coc-tre-2m-1.webp"],
    };

    saveProduct(productToSave);
    loadProducts();
    setViewMode("list");
    showToast(`Đã lưu sản phẩm "${productToSave.name}" thành công!`);
  };

  const filteredProducts = productsList.filter((p) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.length.toLowerCase().includes(q) ||
      p.diameter.toLowerCase().includes(q)
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
          {/* Top action header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#214E34] flex items-center gap-2">
                <Package className="w-6 h-6 text-[#CDAA63]" />
                Quản Lý Sản Phẩm Cọc Tre ({productsList.length})
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Thêm mới, chỉnh sửa thông số kỹ thuật, hình ảnh và xóa quy cách cọc tre.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                title="Khôi phục dữ liệu ban đầu"
              >
                <RotateCcw className="w-4 h-4 text-gray-500" />
                Khôi phục gốc
              </button>

              <button
                type="button"
                onClick={handleCreateNew}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-bold text-white bg-[#214E34] hover:bg-[#183B27] rounded-lg shadow-sm hover:shadow transition"
              >
                <PlusCircle className="w-4 h-4 text-[#CDAA63]" />
                Thêm sản phẩm mới
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
              placeholder="Tìm kiếm sản phẩm theo tên, chiều dài, đường kính..."
              className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#214E34] focus:outline-none bg-white"
            />
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((p) => (
              <div
                key={p.id || p.slug}
                className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col hover:border-[#214E34]/40 transition group"
              >
                {/* Image */}
                <div className="relative h-44 bg-gray-100 overflow-hidden">
                  <Image
                    src={p.images[0] || "/images/products/coc-tre-2m-1.webp"}
                    alt={p.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    <span className="px-2.5 py-1 text-xs font-bold rounded-lg bg-[#214E34] text-white shadow-sm">
                      {p.length}
                    </span>
                    {p.featured && (
                      <span className="px-2 py-0.5 text-[11px] font-semibold rounded-md bg-[#CDAA63] text-[#18231C]">
                        Nổi bật
                      </span>
                    )}
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="px-2 py-1 text-[11px] font-medium rounded-md bg-white/90 text-emerald-800 shadow-sm">
                      {p.stockStatus}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-gray-900 text-base group-hover:text-[#214E34] transition">
                      {p.name}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                      {p.shortDescription || p.description}
                    </p>

                    <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-gray-600 bg-[#F7F5EF] p-2.5 rounded-lg">
                      <div>
                        <span className="text-gray-400 block text-[10px] uppercase">Đường kính:</span>
                        <span className="font-semibold">{p.diameter}</span>
                      </div>
                      <div>
                        <span className="text-gray-400 block text-[10px] uppercase">Loại tre:</span>
                        <span className="font-semibold truncate block">{p.bambooType}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                    <Link
                      href={`/san-pham/${p.slug}`}
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
                        onClick={() => handleDelete(p.id || p.slug, p.name)}
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

          {filteredProducts.length === 0 && (
            <div className="text-center py-12 bg-white rounded-2xl border border-gray-200">
              <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-600 font-medium">Không tìm thấy sản phẩm nào</p>
            </div>
          )}
        </div>
      )}

      {/* Mode: FORM (ADD / EDIT) */}
      {viewMode === "form" && (
        <form onSubmit={handleSaveForm} className="space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-gray-200">
            <button
              type="button"
              onClick={() => setViewMode("list")}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-600 hover:text-[#214E34]"
            >
              <ArrowLeft className="w-4 h-4" />
              Quay lại danh sách sản phẩm
            </button>

            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-2 text-sm font-bold text-white bg-[#214E34] hover:bg-[#183B27] rounded-lg shadow"
            >
              <Save className="w-4 h-4 text-[#CDAA63]" />
              {editingId ? "Lưu thay đổi sản phẩm" : "Tạo sản phẩm mới"}
            </button>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-3">
              {editingId ? "Chỉnh Sửa Thông Tin Sản Phẩm" : "Thêm Sản Phẩm Cọc Tre Mới"}
            </h3>

            {/* Basic Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                  Tên sản phẩm *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="Ví dụ: Cọc Tre 2m (Ø 6 - 9cm)"
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
                  placeholder="coc-tre-2m"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#214E34] focus:outline-none font-mono text-xs"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                  Chiều dài hiển thị & (số mét)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={formData.length}
                    onChange={(e) => setFormData((prev) => ({ ...prev, length: e.target.value }))}
                    placeholder="2m"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#214E34] focus:outline-none"
                    required
                  />
                  <input
                    type="number"
                    step="0.1"
                    value={formData.lengthMeters}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, lengthMeters: parseFloat(e.target.value) || 0 }))
                    }
                    placeholder="2.0"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#214E34] focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                  Đường kính cọc (Ø)
                </label>
                <input
                  type="text"
                  value={formData.diameter}
                  onChange={(e) => setFormData((prev) => ({ ...prev, diameter: e.target.value }))}
                  placeholder="Ø 60 – 80 mm"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#214E34] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                  Loại tre
                </label>
                <input
                  type="text"
                  value={formData.bambooType}
                  onChange={(e) => setFormData((prev) => ({ ...prev, bambooType: e.target.value }))}
                  placeholder="Tre đực già, tre gai tuyển chọn"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#214E34] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                  Nguồn gốc / Xuất xứ
                </label>
                <input
                  type="text"
                  value={formData.origin}
                  onChange={(e) => setFormData((prev) => ({ ...prev, origin: e.target.value }))}
                  placeholder="Rừng tre già Hòa Bình, Phú Thọ"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#214E34] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                  Tình trạng hàng hóa
                </label>
                <select
                  value={formData.stockStatus}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      stockStatus: e.target.value as Product["stockStatus"],
                    }))
                  }
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#214E34] focus:outline-none bg-white"
                >
                  <option value="Sẵn hàng số lượng lớn">Sẵn hàng số lượng lớn</option>
                  <option value="Còn hàng">Còn hàng</option>
                  <option value="Đặt hàng 1-2 ngày">Đặt hàng 1-2 ngày</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                  Mô tả ngắn (Hiển thị ở Card sản phẩm)
                </label>
                <textarea
                  rows={2}
                  value={formData.shortDescription}
                  onChange={(e) => setFormData((prev) => ({ ...prev, shortDescription: e.target.value }))}
                  placeholder="Mô tả tóm tắt quy cách và ứng dụng chính..."
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#214E34] focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                  Mô tả chi tiết kỹ thuật
                </label>
                <textarea
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="Mô tả kỹ tính năng, độ tuổi cọc tre, khả năng chịu lực..."
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#214E34] focus:outline-none"
                />
              </div>
            </div>

            {/* Applications & Advantages */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-gray-100">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                  Ứng dụng thi công (Mỗi ứng dụng 1 dòng)
                </label>
                <textarea
                  rows={4}
                  value={appsInput}
                  onChange={(e) => setAppsInput(e.target.value)}
                  placeholder="Gia cố móng nhà phố&#10;Gia cố móng kè ao hồ"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#214E34] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                  Ưu điểm vượt trội (Mỗi ưu điểm 1 dòng)
                </label>
                <textarea
                  rows={4}
                  value={advsInput}
                  onChange={(e) => setAdvsInput(e.target.value)}
                  placeholder="Thân tre già đanh, đặc ruột&#10;Giao hàng tận chân công trình 24/7"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#214E34] focus:outline-none"
                />
              </div>
            </div>

            {/* Images selection */}
            <div className="pt-4 border-t border-gray-100 space-y-3">
              <label className="block text-xs font-semibold text-gray-700 uppercase">
                Hình ảnh sản phẩm (Click chọn ảnh mẫu bên dưới hoặc dán link ảnh)
              </label>

              {/* Current chosen images */}
              <div className="flex flex-wrap gap-3 p-3 bg-gray-50 rounded-xl border border-gray-200">
                {formData.images.map((img, idx) => (
                  <div key={idx} className="relative w-20 h-20 rounded-lg overflow-hidden border border-gray-300 group">
                    <Image src={img} alt="Product img" fill className="object-cover" />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(idx)}
                      className="absolute inset-0 bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition text-xs font-bold"
                    >
                      Xóa
                    </button>
                  </div>
                ))}
                {formData.images.length === 0 && (
                  <p className="text-xs text-gray-400 py-3">Chưa có ảnh nào được chọn.</p>
                )}
              </div>

              {/* Preset picker */}
              <div>
                <p className="text-xs text-gray-500 mb-2">Ảnh mẫu có sẵn trong kho:</p>
                <div className="flex flex-wrap gap-2">
                  {PRESET_PRODUCT_IMAGES.map((preset) => (
                    <button
                      key={preset.url}
                      type="button"
                      onClick={() => handleAddPresetImage(preset.url)}
                      className="px-2.5 py-1.5 rounded-lg border border-gray-200 hover:border-[#214E34] text-xs font-medium bg-white hover:bg-emerald-50 transition flex items-center gap-1.5"
                    >
                      <ImageIcon className="w-3.5 h-3.5 text-gray-400" />
                      <span>{preset.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Image URL input */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={customImageUrl}
                  onChange={(e) => setCustomImageUrl(e.target.value)}
                  placeholder="Hoặc nhập đường dẫn ảnh (URL hoặc /images/...)"
                  className="flex-1 px-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#214E34] focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleAddCustomImage}
                  className="px-4 py-2 bg-gray-800 hover:bg-black text-white text-xs font-bold rounded-lg transition"
                >
                  Thêm ảnh
                </button>
              </div>
            </div>

            {/* Featured toggle */}
            <div className="pt-4 border-t border-gray-100 flex items-center gap-3">
              <input
                type="checkbox"
                id="product-featured"
                checked={formData.featured}
                onChange={(e) => setFormData((prev) => ({ ...prev, featured: e.target.checked }))}
                className="w-4 h-4 text-[#214E34] focus:ring-[#214E34] rounded"
              />
              <label htmlFor="product-featured" className="text-sm font-semibold text-gray-800 cursor-pointer">
                Đánh dấu là Sản phẩm nổi bật (Hiển thị trang chủ)
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
              {editingId ? "Lưu thay đổi sản phẩm" : "Xác nhận tạo sản phẩm"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
