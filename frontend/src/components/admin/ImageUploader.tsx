"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import {
  Upload,
  Image as ImageIcon,
  Trash2,
  Star,
  Plus,
  Loader2,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  MoveLeft,
  MoveRight
} from "lucide-react";

export interface PresetImage {
  label: string;
  url: string;
}

interface ImageUploaderProps {
  images: string[];
  onChange: (images: string[]) => void;
  presetImages?: PresetImage[];
  label?: string;
  maxFiles?: number;
}

export default function ImageUploader({
  images,
  onChange,
  presetImages = [],
  label = "Hình ảnh sản phẩm",
  maxFiles = 10,
}: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [customUrl, setCustomUrl] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Upload single file via /api/upload with fallback to base64
  const uploadSingleFile = async (file: File): Promise<string> => {
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
          return data.url;
        }
      }
      throw new Error("Không thể lưu ảnh lên máy chủ");
    } catch (err) {
      console.warn("Server upload failed, converting to Data URL fallback:", err);
      // Fallback: Read as Base64 Data URL so the user is never blocked
      return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
      });
    }
  };

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    setUploadError(null);
    setIsUploading(true);

    try {
      const validFiles: File[] = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.type.startsWith("image/")) {
          validFiles.push(file);
        }
      }

      if (validFiles.length === 0) {
        setUploadError("Vui lòng chọn file hình ảnh hợp lệ (JPG, PNG, WEBP, GIF).");
        setIsUploading(false);
        return;
      }

      const uploadPromises = validFiles.map((file) => uploadSingleFile(file));
      const uploadedUrls = await Promise.all(uploadPromises);

      // Merge avoiding duplicates
      const newImages = [...images];
      uploadedUrls.forEach((url) => {
        if (!newImages.includes(url)) {
          newImages.push(url);
        }
      });

      onChange(newImages.slice(0, maxFiles));
    } catch (err: any) {
      setUploadError("Lỗi tải ảnh: " + (err.message || "Vui lòng thử lại"));
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleAddCustomUrl = () => {
    const trimmed = customUrl.trim();
    if (!trimmed) return;
    if (images.includes(trimmed)) {
      setCustomUrl("");
      return;
    }
    onChange([...images, trimmed]);
    setCustomUrl("");
  };

  const handleRemoveImage = (index: number) => {
    onChange(images.filter((_, idx) => idx !== index));
  };

  const handleSetPrimary = (index: number) => {
    if (index === 0) return;
    const target = images[index];
    const remaining = images.filter((_, idx) => idx !== index);
    onChange([target, ...remaining]);
  };

  const handleMove = (index: number, direction: "left" | "right") => {
    const newIdx = direction === "left" ? index - 1 : index + 1;
    if (newIdx < 0 || newIdx >= images.length) return;
    const copy = [...images];
    const temp = copy[index];
    copy[index] = copy[newIdx];
    copy[newIdx] = temp;
    onChange(copy);
  };

  const handleAddPreset = (url: string) => {
    if (!images.includes(url)) {
      onChange([...images, url]);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
          {label} ({images.length}/{maxFiles})
        </label>
        <span className="text-[11px] text-gray-500">
          Ảnh đầu tiên sẽ là <strong>Ảnh đại diện</strong> chính
        </span>
      </div>

      {/* ERROR ALERT */}
      {uploadError && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
          <span>{uploadError}</span>
        </div>
      )}

      {/* DRAG & DROP UPLOAD ZONE */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-2xl p-6 text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-3 relative ${
          isDragging
            ? "border-[#214E34] bg-emerald-50/70 scale-[0.99]"
            : "border-gray-300 hover:border-[#214E34] bg-gray-50/60 hover:bg-emerald-50/30"
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          className="hidden"
        />

        {isUploading ? (
          <div className="flex flex-col items-center gap-2 py-4 text-[#214E34]">
            <Loader2 className="w-8 h-8 animate-spin" />
            <span className="text-xs font-bold">Đang tải và xử lý ảnh lên hệ thống...</span>
          </div>
        ) : (
          <>
            <div className="w-12 h-12 rounded-full bg-white shadow-sm border border-gray-200 flex items-center justify-center text-[#214E34] group-hover:scale-110 transition-transform">
              <Upload className="w-6 h-6" />
            </div>

            <div>
              <p className="text-sm font-bold text-gray-800">
                Nhấn để chọn ảnh từ máy tính / điện thoại
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Hoặc kéo thả file ảnh vào đây (Hỗ trợ JPG, PNG, WEBP, chọn nhiều ảnh cùng lúc)
              </p>
            </div>
          </>
        )}
      </div>

      {/* CURRENT IMAGES GALLERY */}
      {images.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-semibold text-gray-600">Danh sách ảnh đã chọn ({images.length}):</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3">
            {images.map((img, idx) => (
              <div
                key={idx}
                className={`relative aspect-square rounded-xl overflow-hidden border-2 bg-gray-100 group shadow-sm transition-all ${
                  idx === 0
                    ? "border-[#214E34] ring-2 ring-[#214E34]/20"
                    : "border-gray-200 hover:border-gray-400"
                }`}
              >
                <Image
                  src={img}
                  alt={`Ảnh ${idx + 1}`}
                  fill
                  sizes="150px"
                  className="object-cover"
                />

                {/* Primary Badge */}
                {idx === 0 && (
                  <div className="absolute top-1.5 left-1.5 bg-[#214E34] text-white text-[10px] font-black px-2 py-0.5 rounded shadow flex items-center gap-1 z-10">
                    <Star className="w-2.5 h-2.5 fill-current text-[#CDAA63]" />
                    <span>ẢNH ĐẠI DIỆN</span>
                  </div>
                )}

                {/* Hover overlay with action buttons */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2 z-20">
                  <div className="flex items-center justify-between">
                    {/* Move Left / Right buttons */}
                    <div className="flex gap-1">
                      {idx > 0 && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleMove(idx, "left");
                          }}
                          className="p-1 rounded bg-black/70 hover:bg-white hover:text-black text-white text-xs"
                          title="Di chuyển sang trái"
                        >
                          <MoveLeft className="w-3.5 h-3.5" />
                        </button>
                      )}
                      {idx < images.length - 1 && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleMove(idx, "right");
                          }}
                          className="p-1 rounded bg-black/70 hover:bg-white hover:text-black text-white text-xs"
                          title="Di chuyển sang phải"
                        >
                          <MoveRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>

                    {/* Delete button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveImage(idx);
                      }}
                      className="p-1 rounded bg-red-600 hover:bg-red-700 text-white text-xs"
                      title="Xóa ảnh này"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Make Primary button */}
                  {idx !== 0 && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSetPrimary(idx);
                      }}
                      className="w-full py-1 px-1.5 rounded bg-[#214E34] hover:bg-[#183B27] text-white text-[10px] font-bold flex items-center justify-center gap-1 transition"
                    >
                      <Star className="w-3 h-3 text-[#CDAA63]" />
                      <span>Đặt làm ảnh chính</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* QUICK PRESETS & MANUAL URL */}
      <div className="bg-gray-50/80 rounded-xl p-3.5 border border-gray-200/80 space-y-3">
        {/* Preset Photos */}
        {presetImages.length > 0 && (
          <div>
            <p className="text-[11px] font-bold text-gray-600 mb-2 uppercase tracking-wide">
              Hoặc chọn nhanh ảnh mẫu có sẵn trong kho:
            </p>
            <div className="flex flex-wrap gap-2">
              {presetImages.map((preset) => {
                const isSelected = images.includes(preset.url);
                return (
                  <button
                    key={preset.url}
                    type="button"
                    onClick={() => handleAddPreset(preset.url)}
                    className={`px-2.5 py-1.5 rounded-lg border text-xs font-medium transition flex items-center gap-1.5 cursor-pointer ${
                      isSelected
                        ? "border-[#214E34] bg-emerald-50 text-[#214E34] font-bold shadow-sm"
                        : "border-gray-300 bg-white hover:border-[#214E34] text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <ImageIcon className="w-3.5 h-3.5 text-gray-500" />
                    <span>{preset.label}</span>
                    {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Manual URL Input */}
        <div className="pt-2 border-t border-gray-200/60">
          <p className="text-[11px] font-bold text-gray-600 mb-1.5 uppercase tracking-wide">
            Hoặc dán trực tiếp đường dẫn ảnh (URL):
          </p>
          <div className="flex gap-2">
            <input
              type="text"
              value={customUrl}
              onChange={(e) => setCustomUrl(e.target.value)}
              placeholder="https://... hoặc /images/..."
              className="flex-1 px-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#214E34] focus:outline-none bg-white"
            />
            <button
              type="button"
              onClick={handleAddCustomUrl}
              disabled={!customUrl.trim()}
              className="px-4 py-2 bg-gray-800 hover:bg-black disabled:bg-gray-300 text-white text-xs font-bold rounded-lg transition shrink-0 cursor-pointer"
            >
              Thêm URL
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
