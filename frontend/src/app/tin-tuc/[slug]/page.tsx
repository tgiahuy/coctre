import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteConfig } from "@/data/config";
import { getServerArticleBySlug } from "@/lib/serverData";
import ArticleDetailClient from "./ArticleDetailClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getServerArticleBySlug(slug);

  if (!article) {
    return {
      title: "Không tìm thấy bài viết",
      description: "Bài viết cẩm nang kỹ thuật thi công không tồn tại hoặc đã thay đổi.",
    };
  }

  const baseUrl = (siteConfig.website || "https://coctrehuyenduong.com").replace(/\/$/, "");
  const canonicalUrl = `${baseUrl}/tin-tuc/${article.slug}`;
  const title = `${article.title} | Cẩm Nang Kỹ Thuật Cọc Tre`;
  const description =
    article.excerpt?.slice(0, 160) ||
    `Bài viết kỹ thuật: ${article.title}. Chia sẻ kinh nghiệm chọn cọc tre già, định mức đóng cọc và tiêu chuẩn TCVN từ chuyên gia bãi cọc Huyền Dương.`;

  const coverImage = article.coverImage || "/images/products/coc-tre-2m-1.webp";

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${title} | ${siteConfig.companyName}`,
      description,
      url: canonicalUrl,
      type: "article",
      publishedTime: article.publishDate,
      authors: [article.author || siteConfig.companyName],
      images: [
        {
          url: coverImage,
          width: 800,
          height: 600,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [coverImage],
    },
  };
}

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getServerArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const baseUrl = (siteConfig.website || "https://coctrehuyenduong.vn").replace(/\/$/, "");
  const coverImage = article.coverImage || "/images/products/coc-tre-2m-1.webp";

  // Schema.org NewsArticle / BlogPosting Schema
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    image: [coverImage.startsWith("http") ? coverImage : `${baseUrl}${coverImage}`],
    datePublished: article.publishDate,
    dateModified: article.publishDate,
    description: article.excerpt,
    author: {
      "@type": "Person",
      name: article.author || "Kỹ sư nền móng Huyền Dương",
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.companyName,
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/icon.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${baseUrl}/tin-tuc/${article.slug}`,
    },
  };

  // Breadcrumb Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Trang chủ",
        item: baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Tin tức & Cẩm nang kỹ thuật",
        item: `${baseUrl}/tin-tuc`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: article.title,
        item: `${baseUrl}/tin-tuc/${article.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ArticleDetailClient slug={slug} initialArticle={article} />
    </>
  );
}
