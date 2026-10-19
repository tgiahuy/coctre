import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteConfig } from "@/data/config";
import { products } from "@/data/products";
import { getServerProductBySlug } from "@/lib/serverData";
import ProductDetailClient from "./ProductDetailClient";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getServerProductBySlug(slug);

  if (!product) {
    return {
      title: "Không tìm thấy sản phẩm",
      description: "Sản phẩm cọc tre công trình không tồn tại hoặc đã thay đổi.",
    };
  }

  const baseUrl = (siteConfig.website || "https://coctrehuyenduong.com").replace(/\/$/, "");
  const canonicalUrl = `${baseUrl}/san-pham/${product.slug}`;
  const title = `${product.name} - Giá Bãi & Tiêu Chuẩn Kỹ Thuật`;
  const description =
    product.shortDescription ||
    product.description ||
    `Báo giá ${product.name} chất lượng cao, tre đực già, bao kiểm tra 1 đổi 1 tận công trình. Tổng kho Huyền Dương giao hàng 24/7.`;

  const coverImage = product.images?.[0] || "/images/products/coc-tre-2m-1.webp";

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
      type: "website",
      images: [
        {
          url: coverImage,
          width: 800,
          height: 600,
          alt: product.name,
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

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getServerProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const baseUrl = (siteConfig.website || "https://coctrehuyenduong.vn").replace(/\/$/, "");
  const coverImage = product.images?.[0] || "/images/products/coc-tre-2m-1.webp";

  const rawPrice = (product as unknown as Record<string, unknown>).price;
  const numericPrice = typeof rawPrice === "number" ? rawPrice : Number(rawPrice);
  const hasRealPrice = !isNaN(numericPrice) && numericPrice > 0;

  const hasRealRating =
    typeof product.reviewCount === "number" &&
    product.reviewCount > 0 &&
    typeof product.rating === "number" &&
    product.rating > 0;

  // Schema.org Product structured data for rich snippets in Google Search
  const productSchema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image:
      product.images && product.images.length > 0
        ? product.images.map((img) => (img.startsWith("http") ? img : `${baseUrl}${img}`))
        : [`${baseUrl}${coverImage}`],
    description: product.description,
    sku: product.id,
    brand: {
      "@type": "Brand",
      name: siteConfig.companyName,
    },
    offers: {
      "@type": "Offer",
      url: `${baseUrl}/san-pham/${product.slug}`,
      ...(hasRealPrice ? { priceCurrency: "VND", price: String(numericPrice), priceValidUntil: "2027-12-31" } : {}),
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: {
        "@type": "Organization",
        name: siteConfig.companyName,
      },
    },
    ...(hasRealRating
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: String(product.rating),
            reviewCount: String(product.reviewCount),
          },
        }
      : {}),
  };

  // Breadcrumb Schema for search engine navigation
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
        name: "Sản phẩm",
        item: `${baseUrl}/san-pham`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: product.name,
        item: `${baseUrl}/san-pham/${product.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ProductDetailClient slug={slug} initialProduct={product} />
    </>
  );
}
