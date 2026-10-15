"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Lock,
  Unlock,
  PlusCircle,
  FileText,
  Trash2,
  Edit3,
  Eye,
  CheckCircle,
  Download,
  Copy,
  ArrowLeft,
  Sparkles,
  TreeDeciduous,
  Image as ImageIcon,
  Tag,
  BookOpen
} from "lucide-react";
import { Article } from "@/data/articles";
import {
  getAllArticles,
  saveCustomArticle,
  deleteCustomArticle,
  getCustomArticles
} from "@/lib/articleStore";
import { createArticleOnApi, deleteArticleOnApi, fetchArticlesFromApi } from "@/lib/api";

const DEFAULT_PIN = "8888";

const PRESET_IMAGES = [
  { label: "Kỹ thuật đóng cọc", url: "/images/blog/ky-thuat-dong-coc-tre.webp" },
  { label: "Kinh nghiệm chọn cọc", url: "/images/blog/kinh-nghiem-chon-coc-tre.webp" },
  { label: "So sánh cọc tre - bê tông", url: "/images/blog/so-sanh-coc-tre-be-tong.webp" },
  { label: "Rừng tre luồng", url: "/images/banner/bamboo-vertical.jpg" },
  { label: "Bãi tập kết cọc tre", url: "/images/banner/bamboo-poles.jpg" },
];

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState(false);

  const [articlesList, setArticlesList] = useState<Article[]>([]);
  const [activeTab, setActiveTab] = useState<"list" | "create" | "preview">("list");
  const [editingArticleId, setEditingArticleId] = useState<string | null>(null);
  const [copiedNotification, setCopiedNotification] = useState(false);

  // Form State
  const [formData, setFormData] = useState<Article>({
    id: "",
    slug: "",
    title: "",
    category: "Kỹ thuật thi công",
    coverImage: "/images/blog/ky-thuat-dong-coc-tre.webp",
    publishDate: new Date().toISOString().split("T")[0],
    author: "Ban Biên Tập Cọc Tre Hòa Bình",
    readTime: "5 phút đọc",
    excerpt: "",
    tableOfContents: [],
    content: "",
    tags: ["Cọc tre", "Nền móng"],
    featured: false
  });

  const [tagInput, setTagInput] = useState("Cọc tre, Nền móng");

  // Check auth session
  useEffect(() => {
    const authSession = sessionStorage.getItem("coctre_admin_auth");
    if (authSession === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  // Reload articles
  const refreshArticles = async () => {
    // 1. Try to fetch from backend API
    const apiArticles = await fetchArticlesFromApi();
    if (apiArticles && apiArticles.length > 0) {
      setArticlesList(apiArticles);
      return;
    }
    // 2. Fallback to localStorage / static
    setArticlesList(getAllArticles());
  };

  useEffect(() => {
    if (isAuthenticated) {
      refreshArticles();
    }
  }, [isAuthenticated]);

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
  };

  const handleCreateNew = () => {
    const newId = "post-" + Date.now();
    setFormData({
      id: newId,
      slug: "",
      title: "",
      category: "Kỹ thuật thi công",
      coverImage: "/images/blog/ky-thuat-dong-coc-tre.webp",
      publishDate: new Date().toISOString().split("T")[0],
      author: "Ban Biên Tập Cọc Tre Hòa Bình",
      readTime: "5 phút đọc",
      excerpt: "",
      tableOfContents: [],
      content: "",
      tags: ["Cọc tre", "Kỹ thuật"],
      featured: false
    });
    setTagInput("Cọc tre, Kỹ thuật");
    setEditingArticleId(null);
    setActiveTab("create");
  };

  const handleEdit = (art: Article) => {
    setFormData(art);
    setTagInput(art.tags.join(", "));
    setEditingArticleId(art.id);
    setActiveTab("create");
  };

  const handleDelete = (slugOrId: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa bài viết này?")) {
      deleteCustomArticle(slugOrId);
      deleteArticleOnApi(slugOrId, pinInput || DEFAULT_PIN).catch(() => {});
      refreshArticles();
    }
  };

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[đĐ]/g, "d")
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");
  };

  const handleTitleChange = (title: string) => {
    const slug = generateSlug(title);
    setFormData((prev) => ({
      ...prev,
      title,
      slug: editingArticleId ? prev.slug : slug,
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert("Vui lòng nhập tiêu đề bài viết!");
      return;
    }

    const finalSlug = formData.slug || generateSlug(formData.title);
    const finalTags = tagInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    // Auto extract TOC from headers in content (## Header)
    const lines = formData.content.split("\n");
    const extractedToc: { id: string; text: string }[] = [];
    lines.forEach((line) => {
      if (line.startsWith("## ")) {
        const text = line.replace("## ", "").trim();
        const id = generateSlug(text);
        extractedToc.push({ id, text });
      }
    });

    const articleToSave: Article = {
      ...formData,
      id: formData.id || "post-" + Date.now(),
      slug: finalSlug,
      tags: finalTags,
      tableOfContents: extractedToc.length > 0 ? extractedToc : formData.tableOfContents,
    };

    const ok = saveCustomArticle(articleToSave);
    createArticleOnApi(articleToSave, pinInput || DEFAULT_PIN).catch((err) => {
      console.warn("Could not sync to backend API:", err);
    });

    if (ok) {
      alert("Đã lưu bài viết thành công!");
      refreshArticles();
      setActiveTab("list");
    } else {
      alert("Có lỗi khi lưu bài viết.");
    }
  };

  const handleCopyJSON = () => {
    const all = getAllArticles();
    navigator.clipboard.writeText(JSON.stringify(all, null, 2));
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 3000);
  };

  // 1. PIN LOGIN SCREEN
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#132018] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-[#18261E] rounded-3xl p-8 border border-[#2A3F32] shadow-2xl space-y-6 text-center text-white">
          <div className="w-16 h-16 rounded-2xl bg-[#214E34] text-[#CDAA63] flex items-center justify-center mx-auto shadow-inner border border-[#3E7351]">
            <Lock className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-black text-white">Khu Vực Quản Trị</h1>
            <p className="text-xs sm:text-sm text-gray-400">
              Nhập mã PIN để đăng nhập và quản lý bài viết Blog / Tin tức.
            </p>
            <div className="p-2 rounded-lg bg-black/30 border border-white/5 text-[11px] text-[#CDAA63]">
              Mã PIN mặc định: <strong>8888</strong>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1 text-left">
              <label className="text-xs font-bold text-gray-300 uppercase tracking-wider">
                MÃ PIN BẢO MẬT
              </label>
              <input
                type="password"
                placeholder="Nhập 8888..."
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                maxLength={8}
                className="w-full px-4 py-3 rounded-xl bg-black/40 border border-gray-700 text-white text-center text-xl tracking-widest focus:outline-none focus:border-[#CDAA63]"
                autoFocus
              />
              {pinError && (
                <p className="text-xs text-red-400 font-semibold pt-1 text-center">
                  Mã PIN không đúng, vui lòng thử lại!
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#214E34] hover:bg-[#183B27] text-[#CDAA63] hover:text-white font-extrabold rounded-xl border border-[#4A7C59] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
            >
              <Unlock className="w-4 h-4" />
              <span>XÁC NHẬN VÀO TRANG QUẢN TRỊ</span>
            </button>
          </form>

          <div className="pt-2">
            <Link
              href="/"
              className="text-xs text-gray-400 hover:text-white flex items-center justify-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Quay lại trang chủ website</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 2. AUTHENTICATED ADMIN DASHBOARD
  return (
    <div className="min-h-screen bg-[#F7F5EF] text-gray-900 pb-24">
      {/* Top Header */}
      <div className="bg-[#18231C] text-white border-b border-[#2A3930] py-5 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#214E34] text-[#CDAA63] flex items-center justify-center font-bold">
              <TreeDeciduous className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
                HỆ THỐNG QUẢN TRỊ BÀI VIẾT (ADMIN CMS)
                <span className="text-[10px] bg-[#CDAA63] text-black px-2 py-0.5 rounded font-extrabold uppercase">
                  Đã Đăng Nhập
                </span>
              </h1>
              <p className="text-xs text-gray-400">
                Thêm bài viết mới, cập nhật tin tức công trình & kinh nghiệm nền móng
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/tin-tuc"
              target="_blank"
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-gray-200 flex items-center gap-1.5 transition-all"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Xem trang Blog thực tế</span>
            </Link>

            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-xl bg-red-900/60 hover:bg-red-800 text-xs font-bold text-red-200 transition-all cursor-pointer"
            >
              Đăng Xuất
            </button>
          </div>
        </div>
      </div>

      {/* Action Subbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-8">
        <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab("list")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === "list"
                  ? "bg-[#214E34] text-white shadow-sm"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Danh Sách Bài Viết ({articlesList.length})
            </button>

            <button
              onClick={handleCreateNew}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === "create"
                  ? "bg-[#214E34] text-white shadow-sm"
                  : "bg-[#E57C23] text-white hover:bg-[#CC6914]"
              }`}
            >
              <PlusCircle className="w-4 h-4" />
              <span>+ Viết Bài Mới</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyJSON}
              className="px-3.5 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
              title="Sao chép toàn bộ dữ liệu bài viết dạng JSON để lưu vào code"
            >
              <Copy className="w-3.5 h-3.5 text-[#214E34]" />
              <span>{copiedNotification ? "Đã copy JSON!" : "Sao Chép JSON Data"}</span>
            </button>
          </div>
        </div>

        {/* TAB 1: ARTICLES LIST */}
        {activeTab === "list" && (
          <div className="mt-6 space-y-4">
            <div className="grid grid-cols-1 gap-4">
              {articlesList.map((art) => (
                <div
                  key={art.id}
                  className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:border-[#214E34] transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="relative w-24 h-20 rounded-xl overflow-hidden shrink-0 border border-gray-100 bg-gray-100">
                      <Image
                        src={art.coverImage}
                        alt={art.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#214E34]/10 text-[#214E34]">
                          {art.category}
                        </span>
                        <span className="text-xs text-gray-400">
                          {art.publishDate}
                        </span>
                      </div>
                      <h3 className="font-extrabold text-base text-gray-900 line-clamp-1">
                        {art.title}
                      </h3>
                      <p className="text-xs text-gray-500 line-clamp-1">
                        {art.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                    <Link
                      href={`/tin-tuc/${art.slug}`}
                      target="_blank"
                      className="p-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold flex items-center gap-1"
                    >
                      <Eye className="w-4 h-4" />
                      <span>Xem</span>
                    </Link>

                    <button
                      onClick={() => handleEdit(art)}
                      className="p-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <Edit3 className="w-4 h-4" />
                      <span>Sửa</span>
                    </button>

                    <button
                      onClick={() => handleDelete(art.slug)}
                      className="p-2.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Xóa</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: CREATE / EDIT FORM */}
        {activeTab === "create" && (
          <form onSubmit={handleSave} className="mt-6 bg-white rounded-3xl p-6 sm:p-10 border border-gray-200 shadow-sm space-y-6">
            <div className="border-b border-gray-100 pb-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-black text-gray-900">
                  {editingArticleId ? "Chỉnh Sửa Bài Viết" : "Soạn Thảo Bài Viết Mới"}
                </h2>
                <p className="text-xs text-gray-500">
                  Điền thông tin và nội dung bài viết dưới đây
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveTab("list")}
                className="text-xs font-bold text-gray-500 hover:text-gray-800"
              >
                Hủy bỏ
              </button>
            </div>

            {/* Title & Slug */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-extrabold text-gray-700 uppercase">
                  Tiêu đề bài viết *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Hướng Dẫn Kỹ Thuật Đóng Cọc Tre Gia Cố Móng..."
                  value={formData.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#214E34]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-extrabold text-gray-700 uppercase">
                  Đường dẫn tĩnh (Slug URL)
                </label>
                <input
                  type="text"
                  required
                  placeholder="huong-dan-ky-thuat-dong-coc-tre..."
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-mono text-gray-600 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#214E34]"
                />
              </div>
            </div>

            {/* Category & Author & ReadTime */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-extrabold text-gray-700 uppercase">
                  Chuyên mục
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#214E34]"
                >
                  <option value="Kỹ thuật thi công">Kỹ thuật thi công</option>
                  <option value="Kinh nghiệm chọn cọc">Kinh nghiệm chọn cọc</option>
                  <option value="Kiến thức nền móng">Kiến thức nền móng</option>
                  <option value="Tin công trình">Tin công trình</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-extrabold text-gray-700 uppercase">
                  Tác giả
                </label>
                <input
                  type="text"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#214E34]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-extrabold text-gray-700 uppercase">
                  Thời gian đọc
                </label>
                <input
                  type="text"
                  value={formData.readTime}
                  onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#214E34]"
                />
              </div>
            </div>

            {/* Cover Image Picker */}
            <div className="space-y-2">
              <label className="text-xs font-extrabold text-gray-700 uppercase flex items-center gap-1.5">
                <ImageIcon className="w-4 h-4 text-[#214E34]" />
                Ảnh đại diện bài viết
              </label>
              
              {/* Preset Image Options */}
              <div className="flex flex-wrap items-center gap-2">
                {PRESET_IMAGES.map((preset) => (
                  <button
                    key={preset.url}
                    type="button"
                    onClick={() => setFormData({ ...formData, coverImage: preset.url })}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                      formData.coverImage === preset.url
                        ? "bg-[#214E34] text-white border-[#214E34]"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-200"
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>

              <input
                type="text"
                placeholder="Hoặc nhập đường dẫn ảnh (URL hoặc /images/...)"
                value={formData.coverImage}
                onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs font-mono text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#214E34]"
              />
            </div>

            {/* Excerpt */}
            <div className="space-y-1.5">
              <label className="text-xs font-extrabold text-gray-700 uppercase">
                Tóm tắt ngắn (Excerpt)
              </label>
              <textarea
                rows={2}
                placeholder="Tóm tắt ngắn gọn nội dung bài viết hiển thị ở trang danh sách..."
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#214E34]"
              />
            </div>

            {/* Content Body Editor */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-extrabold text-gray-700 uppercase flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-[#214E34]" />
                  Nội dung chi tiết bài viết (Hỗ trợ Markdown / Tiêu đề ##)
                </label>
                <div className="text-[11px] text-gray-400">
                  Dùng <strong>## Tiêu đề mục</strong> để hệ thống tự tạo Mục Lục
                </div>
              </div>

              {/* Quick formatting buttons */}
              <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-xl border border-gray-200 text-xs">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, content: formData.content + "\n\n## 1. Tiêu đề mục mới\nNội dung chi tiết..." })}
                  className="px-2.5 py-1 rounded bg-white border border-gray-300 font-bold hover:bg-gray-100"
                >
                  + Tiêu đề ##
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, content: formData.content + "\n- Gạch đầu dòng 1\n- Gạch đầu dòng 2" })}
                  className="px-2.5 py-1 rounded bg-white border border-gray-300 font-bold hover:bg-gray-100"
                >
                  + Danh sách (-)
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, content: formData.content + "\n**Văn bản in đậm**" })}
                  className="px-2.5 py-1 rounded bg-white border border-gray-300 font-bold hover:bg-gray-100"
                >
                  In đậm (**)
                </button>
              </div>

              <textarea
                rows={12}
                required
                placeholder="Viết nội dung bài viết tại đây...
## 1. Mở đầu vấn đề
Giải thích nguyên lý...

## 2. Các bước thực hiện
- Bước 1: Chuẩn bị cọc...
- Bước 2: Ép cọc..."
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="w-full p-4 rounded-xl border border-gray-200 text-sm font-sans leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#214E34]"
              />
            </div>

            {/* Tags */}
            <div className="space-y-1.5">
              <label className="text-xs font-extrabold text-gray-700 uppercase flex items-center gap-1.5">
                <Tag className="w-4 h-4 text-gray-400" />
                Thẻ từ khóa (Cách nhau bằng dấu phẩy)
              </label>
              <input
                type="text"
                placeholder="Cọc tre, Ép cọc, Nền móng, Báo giá"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#214E34]"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4 flex items-center justify-end gap-3 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setActiveTab("list")}
                className="px-6 py-3 rounded-xl border border-gray-300 text-gray-700 text-xs font-bold hover:bg-gray-100 cursor-pointer"
              >
                Hủy
              </button>

              <button
                type="submit"
                className="px-8 py-3.5 rounded-xl bg-[#214E34] hover:bg-[#183B27] text-white text-sm font-extrabold shadow-lg transition-all flex items-center gap-2 cursor-pointer"
              >
                <CheckCircle className="w-4 h-4 text-[#CDAA63]" />
                <span>XUẤT BẢN BÀI VIẾT</span>
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}
