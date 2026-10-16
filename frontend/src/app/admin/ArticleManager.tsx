"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FileText,
  PlusCircle,
  Edit3,
  Trash2,
  Eye,
  RotateCcw,
  CheckCircle,
  Save,
  ArrowLeft,
  Search,
  Calendar,
  User,
  Tag,
  BookOpen,
  Image as ImageIcon,
  Sparkles
} from "lucide-react";
import { Article } from "@/data/articles";
import {
  getAllArticles,
  saveCustomArticle,
  deleteCustomArticle,
  resetArticlesToDefault
} from "@/lib/articleStore";
import ImageUploader from "@/components/admin/ImageUploader";

const PRESET_BLOG_IMAGES = [
  { label: "Kỹ thuật đóng cọc", url: "/images/blog/ky-thuat-dong-coc-tre.webp" },
  { label: "Kinh nghiệm chọn cọc", url: "/images/blog/kinh-nghiem-chon-coc-tre.webp" },
  { label: "So sánh cọc tre - bê tông", url: "/images/blog/so-sanh-coc-tre-be-tong.webp" },
  { label: "Rừng tre luồng", url: "/images/banner/bamboo-vertical.jpg" },
  { label: "Bãi tập kết cọc tre", url: "/images/banner/bamboo-poles.jpg" },
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

function extractTableOfContents(markdown: string): { id: string; text: string }[] {
  const lines = markdown.split("\n");
  const toc: { id: string; text: string }[] = [];
  lines.forEach((line) => {
    if (line.startsWith("## ")) {
      const headingText = line.replace("## ", "").trim();
      const id = slugify(headingText);
      toc.push({ id, text: headingText });
    }
  });
  return toc;
}

export default function ArticleManager() {
  const [articlesList, setArticlesList] = useState<Article[]>([]);
  const [viewMode, setViewMode] = useState<"list" | "form" | "preview">("list");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState<Article>({
    id: "",
    slug: "",
    title: "",
    category: "Kỹ thuật thi công",
    coverImage: "/images/blog/ky-thuat-dong-coc-tre.webp",
    publishDate: new Date().toISOString().split("T")[0],
    author: "Ban Biên Tập Cọc Tre Huyền Dương",
    readTime: "5 phút đọc",
    excerpt: "",
    tableOfContents: [],
    content: "",
    tags: ["Cọc tre", "Nền móng"],
    featured: false,
  });

  const [tagInput, setTagInput] = useState("Cọc tre, Nền móng");

  const loadArticles = () => {
    setArticlesList(getAllArticles());
  };

  useEffect(() => {
    loadArticles();
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleCreateNew = () => {
    const newId = "post-" + Date.now();
    const initData: Article = {
      id: newId,
      slug: "",
      title: "",
      category: "Kỹ thuật thi công",
      coverImage: "/images/blog/ky-thuat-dong-coc-tre.webp",
      publishDate: new Date().toISOString().split("T")[0],
      author: "Ban Biên Tập Cọc Tre Huyền Dương",
      readTime: "5 phút đọc",
      excerpt: "",
      tableOfContents: [],
      content: `## 1. Tổng quan về kỹ thuật thi công
Nội dung chi tiết giới thiệu về tiêu chuẩn và phương pháp...

## 2. Tiêu chuẩn chọn lựa cọc tre
Yêu cầu cọc tre phải đủ tuổi, đường kính từ 60mm - 90mm...

## 3. Quy trình nghiệm thu công trình
Kiểm tra độ chối và cao trình đầu cọc sau khi đóng...`,
      tags: ["Cọc tre", "Kỹ thuật thi công"],
      featured: false,
    };
    setFormData(initData);
    setTagInput(initData.tags.join(", "));
    setEditingId(null);
    setViewMode("form");
  };

  const handleEdit = (art: Article) => {
    setFormData(art);
    setTagInput(art.tags.join(", "));
    setEditingId(art.id);
    setViewMode("form");
  };

  const handleDelete = (slugOrId: string, title: string) => {
    if (confirm(`Bạn có chắc chắn muốn xóa bài viết "${title}"?`)) {
      deleteCustomArticle(slugOrId);
      loadArticles();
      showToast(`Đã xóa bài viết "${title}" thành công!`);
    }
  };

  const handleReset = () => {
    if (confirm("Khôi phục danh sách bài viết về mặc định của hệ thống?")) {
      resetArticlesToDefault();
      loadArticles();
      showToast("Đã khôi phục tin tức về danh sách mẫu!");
    }
  };

  const handleTitleChange = (title: string) => {
    setFormData((prev) => ({
      ...prev,
      title,
      slug: editingId ? prev.slug : slugify(title),
    }));
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      alert("Vui lòng nhập tiêu đề bài viết");
      return;
    }

    const finalSlug = formData.slug.trim() || slugify(formData.title);
    const finalTags = tagInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    const autoToc = extractTableOfContents(formData.content);

    const articleToSave: Article = {
      ...formData,
      slug: finalSlug,
      tags: finalTags.length > 0 ? finalTags : ["Cọc tre"],
      tableOfContents: autoToc.length > 0 ? autoToc : formData.tableOfContents,
    };

    saveCustomArticle(articleToSave);
    loadArticles();
    setViewMode("list");
    showToast(`Đã lưu bài viết "${articleToSave.title}" thành công!`);
  };

  const filteredArticles = articlesList.filter((a) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      a.title.toLowerCase().includes(q) ||
      a.category.toLowerCase().includes(q) ||
      a.author.toLowerCase().includes(q)
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
                <FileText className="w-6 h-6 text-[#CDAA63]" />
                Quản Lý Tin Tức & Cẩm Nang ({articlesList.length})
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Đăng bài viết mới, chỉnh sửa nội dung chuyên mục và xóa bài viết kỹ thuật.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition"
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
                Viết bài mới
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
              placeholder="Tìm kiếm bài viết theo tiêu đề, chuyên mục, tác giả..."
              className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#214E34] focus:outline-none bg-white"
            />
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((art) => (
              <div
                key={art.id || art.slug}
                className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col hover:border-[#214E34]/40 transition group"
              >
                <div className="relative h-44 bg-gray-100 overflow-hidden">
                  <Image
                    src={art.coverImage || "/images/blog/ky-thuat-dong-coc-tre.webp"}
                    alt={art.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-[#214E34] text-white shadow-sm">
                      {art.category}
                    </span>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-gray-900 text-base group-hover:text-[#214E34] transition line-clamp-2">
                      {art.title}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                      {art.excerpt}
                    </p>

                    <div className="mt-3 flex items-center justify-between text-xs text-gray-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {art.publishDate}
                      </span>
                      <span>{art.readTime}</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                    <Link
                      href={`/tin-tuc/${art.slug}`}
                      target="_blank"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-gray-600 hover:text-[#214E34] transition"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      Xem trên web
                    </Link>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleEdit(art)}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-[#214E34] bg-emerald-50 hover:bg-emerald-100 rounded-lg transition"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        Sửa
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(art.id || art.slug, art.title)}
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

          {filteredArticles.length === 0 && (
            <div className="text-center py-12 bg-white rounded-2xl border border-gray-200">
              <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-600 font-medium">Không tìm thấy bài viết nào</p>
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
              Quay lại danh sách bài viết
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setViewMode("preview")}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-1.5"
              >
                <Eye className="w-4 h-4 text-gray-500" />
                Xem trước
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-5 py-2 text-sm font-bold text-white bg-[#214E34] hover:bg-[#183B27] rounded-lg shadow"
              >
                <Save className="w-4 h-4 text-[#CDAA63]" />
                {editingId ? "Lưu thay đổi bài viết" : "Xuất bản bài viết"}
              </button>
            </div>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-3">
              {editingId ? "Chỉnh Sửa Bài Viết" : "Soạn Thảo Bài Viết Mới"}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                  Tiêu đề bài viết *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="Ví dụ: Hướng Dẫn Quy Trình Đóng Cọc Tre Chuẩn TCVN 9361:2012"
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
                  placeholder="huong-dan-dong-coc-tre"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#214E34] focus:outline-none font-mono text-xs"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                  Chuyên mục
                </label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      category: e.target.value as Article["category"],
                    }))
                  }
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#214E34] focus:outline-none bg-white"
                >
                  <option value="Kỹ thuật thi công">Kỹ thuật thi công</option>
                  <option value="Kinh nghiệm chọn cọc">Kinh nghiệm chọn cọc</option>
                  <option value="Kiến thức nền móng">Kiến thức nền móng</option>
                  <option value="Tin công trình">Tin công trình</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                  Tác giả bài viết
                </label>
                <input
                  type="text"
                  value={formData.author}
                  onChange={(e) => setFormData((prev) => ({ ...prev, author: e.target.value }))}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#214E34] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                  Ngày xuất bản & Thời gian đọc
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="date"
                    value={formData.publishDate}
                    onChange={(e) => setFormData((prev) => ({ ...prev, publishDate: e.target.value }))}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#214E34] focus:outline-none"
                  />
                  <input
                    type="text"
                    value={formData.readTime}
                    onChange={(e) => setFormData((prev) => ({ ...prev, readTime: e.target.value }))}
                    placeholder="7 phút đọc"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#214E34] focus:outline-none"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                  Tóm tắt bài viết (Excerpt)
                </label>
                <textarea
                  rows={2}
                  value={formData.excerpt}
                  onChange={(e) => setFormData((prev) => ({ ...prev, excerpt: e.target.value }))}
                  placeholder="Tóm tắt ngắn gọn 1-2 câu để thu hút người đọc..."
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#214E34] focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                  Thẻ từ khóa (Cách nhau bằng dấu phẩy)
                </label>
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  placeholder="Cọc tre, Kỹ thuật thi công, Đất yếu"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#214E34] focus:outline-none"
                />
              </div>
            </div>

            {/* Images selection via ImageUploader */}
            <div className="pt-4 border-t border-gray-100">
              <ImageUploader
                images={formData.coverImage ? [formData.coverImage] : []}
                onChange={(imgs) => setFormData((prev) => ({ ...prev, coverImage: imgs[0] || "" }))}
                presetImages={PRESET_BLOG_IMAGES}
                label="Ảnh bìa bài viết (Tải ảnh từ máy tính/điện thoại hoặc chọn mẫu)"
                maxFiles={1}
              />
            </div>

            {/* Markdown Editor */}
            <div className="pt-4 border-t border-gray-100 space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-semibold text-gray-700 uppercase">
                  Nội dung bài viết (Hỗ trợ Markdown)
                </label>
                <span className="text-xs text-[#214E34] font-medium">
                  Mẹo: Dùng ## Tiêu đề mục để tự động sinh Mục lục
                </span>
              </div>
              <textarea
                rows={12}
                value={formData.content}
                onChange={(e) => setFormData((prev) => ({ ...prev, content: e.target.value }))}
                placeholder="Nhập nội dung bài viết..."
                className="w-full px-4 py-3 text-sm font-mono border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#214E34] focus:outline-none leading-relaxed"
                required
              />
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
              {editingId ? "Lưu thay đổi bài viết" : "Xuất bản bài viết"}
            </button>
          </div>
        </form>
      )}

      {/* Mode: PREVIEW */}
      {viewMode === "preview" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-gray-200">
            <button
              type="button"
              onClick={() => setViewMode("form")}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-600 hover:text-[#214E34]"
            >
              <ArrowLeft className="w-4 h-4" />
              Tiếp tục chỉnh sửa
            </button>
            <button
              type="button"
              onClick={handleSaveForm}
              className="px-5 py-2 text-sm font-bold text-white bg-[#214E34] hover:bg-[#183B27] rounded-lg shadow"
            >
              Lưu bài viết ngay
            </button>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm max-w-4xl mx-auto space-y-6">
            <div className="space-y-3">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-[#214E34] border border-emerald-200">
                {formData.category}
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight">
                {formData.title || "Tiêu đề bài viết"}
              </h1>
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span>{formData.author}</span>
                <span>•</span>
                <span>{formData.publishDate}</span>
                <span>•</span>
                <span>{formData.readTime}</span>
              </div>
            </div>

            <div className="relative h-72 rounded-xl overflow-hidden bg-gray-100">
              <Image src={formData.coverImage || "/images/blog/ky-thuat-dong-coc-tre.webp"} alt="Preview" fill className="object-cover" />
            </div>

            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 italic text-sm text-gray-700">
              {formData.excerpt || "Chưa có đoạn tóm tắt bài viết."}
            </div>

            <div className="prose max-w-none text-gray-800 text-sm sm:text-base leading-relaxed whitespace-pre-line">
              {formData.content || "Chưa có nội dung bài viết."}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
