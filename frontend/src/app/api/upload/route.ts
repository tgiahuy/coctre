import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";
import { fetchBackendAsAdmin } from "@/lib/serverAuth";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const FILE_TYPES: Record<string, { extension: string; signatures: number[][] }> = {
  "image/jpeg": { extension: "jpg", signatures: [[0xff, 0xd8, 0xff]] },
  "image/png": { extension: "png", signatures: [[0x89, 0x50, 0x4e, 0x47]] },
  "image/webp": { extension: "webp", signatures: [[0x52, 0x49, 0x46, 0x46]] },
  "image/gif": { extension: "gif", signatures: [[0x47, 0x49, 0x46, 0x38]] },
};

export async function POST(request: NextRequest) {
  try {
    const authResponse = await fetchBackendAsAdmin(request, "/auth/me", {
      signal: AbortSignal.timeout(5000),
    });
    if (!authResponse.ok) {
      return NextResponse.json({ success: false, message: "Bạn cần đăng nhập quản trị để tải ảnh" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, message: "Không tìm thấy file tải lên" },
        { status: 400 }
      );
    }

    // Validate mime type
    const fileType = FILE_TYPES[file.type];
    if (!fileType) {
      return NextResponse.json(
        { success: false, message: "Định dạng file không hợp lệ. Chỉ chấp nhận JPG, PNG, WEBP hoặc GIF" },
        { status: 400 }
      );
    }

    if (file.size <= 0 || file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ success: false, message: "Kích thước ảnh phải từ 1 byte đến 5 MB" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const signatureValid = fileType.signatures.some((signature) =>
      signature.every((byte, index) => buffer[index] === byte)
    );
    const webpValid = file.type !== "image/webp" || buffer.subarray(8, 12).toString("ascii") === "WEBP";
    if (!signatureValid || !webpValid) {
      return NextResponse.json({ success: false, message: "Nội dung tệp không khớp với định dạng ảnh" }, { status: 400 });
    }

    const filename = `${randomUUID()}.${fileType.extension}`;

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
  } catch (error: unknown) {
    console.error("Upload handler error:", error);
    return NextResponse.json(
      { success: false, message: "Không thể xử lý tệp tải lên" },
      { status: 500 }
    );
  }
}
