import { MetadataRoute } from "next";
import { siteConfig } from "@/data/config";
import { getServerProducts, getServerArticles, getServerProjects } from "@/lib/serverData";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = (siteConfig.website || "https://coctrehuyenduong.vn").replace(/\/$/, "");
  const now = new Date();

  // 1. Static Core Pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/san-pham`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/du-an`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tin-tuc`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/gioi-thieu`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/lien-he`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  // 2. Dynamic Product Pages
  const products = await getServerProducts();
  const productRoutes: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${baseUrl}/san-pham/${product.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  // 3. Dynamic Article Pages
  const articles = await getServerArticles();
  const articleRoutes: MetadataRoute.Sitemap = articles.map((article) => {
    let lastMod = now;
    if (article.publishDate) {
      const parsed = new Date(article.publishDate);
      if (!isNaN(parsed.getTime())) lastMod = parsed;
    }
    return {
      url: `${baseUrl}/tin-tuc/${article.slug}`,
      lastModified: lastMod,
      changeFrequency: "monthly",
      priority: 0.75,
    };
  });

  // 4. Dynamic Project Pages
  const projects = await getServerProjects();
  const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${baseUrl}/du-an/${project.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  return [...staticRoutes, ...productRoutes, ...articleRoutes, ...projectRoutes];
}
