import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      // Cloudflare R2 public buckets
      {
        protocol: "https",
        hostname: "**.r2.dev",
      },
      // Amazon S3 buckets
      {
        protocol: "https",
        hostname: "**.amazonaws.com",
      },
      // Google user content (avatars/maps)
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      // Production domains
      {
        protocol: "https",
        hostname: "coctrehuyenduong.com",
      },
      {
        protocol: "https",
        hostname: "coctrehuyenduong.vn",
      },
    ],
  },
};

export default nextConfig;
