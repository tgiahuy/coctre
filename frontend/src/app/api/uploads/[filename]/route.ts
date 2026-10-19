import { NextRequest, NextResponse } from "next/server";
import { readFile, stat } from "fs/promises";
import path from "path";

const MIME_TYPES: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
};

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ filename: string }> }
) {
  try {
    const { filename } = await context.params;

    // Ngăn chặn tấn công Path Traversal: Chỉ cho phép tên file hợp lệ (chữ cái, số, gạch nối, gạch dưới, chấm)
    if (!filename || !/^[a-zA-Z0-9_\-.]+\.[a-zA-Z0-9]+$/.test(filename) || filename.includes("..")) {
      return new NextResponse("Tên tệp không hợp lệ", { status: 400 });
    }

    const ext = path.extname(filename).toLowerCase();
    const contentType = MIME_TYPES[ext] || "application/octet-stream";

    // Tìm file trong UPLOAD_DIR (nếu có cấu hình) hoặc fallback public/uploads
    const baseDir = process.env.UPLOAD_DIR
      ? path.resolve(process.env.UPLOAD_DIR)
      : path.join(process.cwd(), "public", "uploads");

    const filePath = path.join(baseDir, filename);

    try {
      const fileStat = await stat(filePath);
      if (!fileStat.isFile()) {
        return new NextResponse("Không tìm thấy ảnh", { status: 404 });
      }

      const fileBuffer = await readFile(filePath);

      return new NextResponse(fileBuffer, {
        status: 200,
        headers: {
          "Content-Type": contentType,
          "Content-Length": fileStat.size.toString(),
          "Cache-Control": "public, max-age=31536000, immutable",
        },
      });
    } catch {
      return new NextResponse("Không tìm thấy ảnh", { status: 404 });
    }
  } catch (error) {
    console.error("Error serving uploaded file:", error);
    return new NextResponse("Lỗi máy chủ", { status: 500 });
  }
}
