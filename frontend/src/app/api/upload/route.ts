import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, message: "Không tìm thấy file tải lên" },
        { status: 400 }
      );
    }

    // Validate mime type
    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"];
    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        { success: false, message: "Định dạng file không hợp lệ. Vui lòng tải file ảnh (JPG, PNG, WEBP, GIF, SVG)" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Sanitize filename & create unique filename
    const timestamp = Date.now();
    const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const filename = `${timestamp}-${originalName}`;

    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await mkdir(uploadDir, { recursive: true });

    const filePath = path.join(uploadDir, filename);
    await writeFile(filePath, buffer);

    const publicUrl = `/uploads/${filename}`;

    return NextResponse.json({
      success: true,
      message: "Tải ảnh lên máy chủ thành công",
      url: publicUrl,
    });
  } catch (error: any) {
    console.error("Upload handler error:", error);
    return NextResponse.json(
      { success: false, message: "Lỗi xử lý tải ảnh: " + (error?.message || "Không xác định") },
      { status: 500 }
    );
  }
}
