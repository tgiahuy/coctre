import { MetadataRoute } from "next";
import { siteConfig } from "@/data/config";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = (siteConfig.website || "https://coctrehuyenduong.com").replace(/\/$/, "");
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/admin/", "/api/"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
