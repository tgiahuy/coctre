import type { Metadata } from "next";
import { siteConfig } from "@/data/config";
import { getServerProductBySlug } from "@/lib/serverData";
import ProductDetailClient from "./ProductDetailClient";

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

  const baseUrl = (siteConfig.website || "https://coctrehuyenduong.vn").replace(/\/$/, "");
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
  const baseUrl = (siteConfig.website || "https://coctrehuyenduong.vn").replace(/\/$/, "");

  const coverImage = product?.images?.[0] || "/images/products/coc-tre-2m-1.webp";

  // Schema.org Product structured data for rich snippets in Google Search
  const productSchema = product
    ? {
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.name,
        image: product.images && product.images.length > 0
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
          priceCurrency: "VND",
          price: "0",
          priceValidUntil: "2027-12-31",
          availability: "https://schema.org/InStock",
          itemCondition: "https://schema.org/NewCondition",
          seller: {
            "@type": "Organization",
            name: siteConfig.companyName,
          },
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: product.rating ? String(product.rating) : "5.0",
          reviewCount: product.reviewCount ? String(product.reviewCount) : "28",
        },
      }
    : null;

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
        name: product?.name || slug,
        item: `${baseUrl}/san-pham/${slug}`,
      },
    ],
  };

  return (
    <>
      {productSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ProductDetailClient slug={slug} initialProduct={product} />
    </>
  );
}
