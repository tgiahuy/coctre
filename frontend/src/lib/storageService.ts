import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export interface UploadResult {
  url: string;
  provider: "r2" | "s3" | "local";
}

/**
 * Kiểm tra xem môi trường có cấu hình Cloudflare R2 hay không
 */
function isR2Configured(): boolean {
  return Boolean(
    process.env.R2_ACCOUNT_ID &&
    process.env.R2_ACCESS_KEY_ID &&
    process.env.R2_SECRET_ACCESS_KEY &&
    process.env.R2_BUCKET_NAME
  );
}

/**
 * Kiểm tra xem môi trường có cấu hình AWS S3 hay không
 */
function isS3Configured(): boolean {
  return Boolean(
    process.env.AWS_S3_BUCKET &&
    process.env.AWS_ACCESS_KEY_ID &&
    process.env.AWS_SECRET_ACCESS_KEY
  );
}

/**
 * Lưu trữ ảnh lên Cloudflare R2, AWS S3 hoặc ổ cứng máy chủ bền vững
 */
export async function uploadImageFile(
  buffer: Buffer,
  filename: string,
  contentType: string
): Promise<UploadResult> {
  // 1. Thử tải lên Cloudflare R2 (ưu tiên cao nhất cho hosting Vercel / serverless)
  if (isR2Configured()) {
    const accountId = process.env.R2_ACCOUNT_ID!;
    const bucketName = process.env.R2_BUCKET_NAME!;
    const publicUrl = process.env.R2_PUBLIC_URL?.replace(/\/$/, "");

    const s3Client = new S3Client({
      region: "auto",
      endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID!,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
      },
    });

    await s3Client.send(
      new PutObjectCommand({
        Bucket: bucketName,
        Key: filename,
        Body: buffer,
        ContentType: contentType,
        CacheControl: "public, max-age=31536000, immutable",
      })
    );

    const fileUrl = publicUrl ? `${publicUrl}/${filename}` : `https://${bucketName}.r2.dev/${filename}`;
    return { url: fileUrl, provider: "r2" };
  }

  // 2. Thử tải lên Amazon S3 / MinIO
  if (isS3Configured()) {
    const bucketName = process.env.AWS_S3_BUCKET!;
    const region = process.env.AWS_S3_REGION || "ap-southeast-1";
    const publicUrl = process.env.AWS_S3_PUBLIC_URL?.replace(/\/$/, "");

    const s3Client = new S3Client({
      region,
      endpoint: process.env.AWS_S3_ENDPOINT,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      },
    });

    await s3Client.send(
      new PutObjectCommand({
        Bucket: bucketName,
        Key: filename,
        Body: buffer,
        ContentType: contentType,
        CacheControl: "public, max-age=31536000, immutable",
      })
    );

    const fileUrl = publicUrl
      ? `${publicUrl}/${filename}`
      : `https://${bucketName}.s3.${region}.amazonaws.com/${filename}`;
    return { url: fileUrl, provider: "s3" };
  }

  // 3. Fallback lưu vào thư mục lưu trữ cục bộ cố định (UPLOAD_DIR hoặc public/uploads)
  const targetDir = process.env.UPLOAD_DIR
    ? path.resolve(process.env.UPLOAD_DIR)
    : path.join(process.cwd(), "public", "uploads");

  await mkdir(targetDir, { recursive: true });
  const filePath = path.join(targetDir, filename);
  await writeFile(filePath, buffer);

  // Phục vụ qua route /api/uploads/ để bảo đảm Next.js phục vụ được ngay lập tức trong production standalone
  return {
    url: `/api/uploads/${filename}`,
    provider: "local",
  };
}
