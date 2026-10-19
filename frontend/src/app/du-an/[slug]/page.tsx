import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteConfig } from "@/data/config";
import { projects } from "@/data/projects";
import { getServerProjectBySlug } from "@/lib/serverData";
import ProjectDetailClient from "./ProjectDetailClient";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getServerProjectBySlug(slug);

  if (!project) {
    return {
      title: "Không tìm thấy dự án",
      description: "Dự án công trình tiêu biểu không tồn tại hoặc đã thay đổi.",
    };
  }

  const baseUrl = (siteConfig.website || "https://coctrehuyenduong.com").replace(/\/$/, "");
  const canonicalUrl = `${baseUrl}/du-an/${project.slug}`;
  const title = `${project.title} - Hồ Sơ Năng Lực Dự Án`;
  const description =
    project.shortDescription ||
    project.overview?.slice(0, 160) ||
    `Dự án ${project.title} tại ${project.location}. Cọc Tre Huyền Dương cung cấp ${project.totalQuantity || "khối lượng lớn"} cọc tre chất lượng cao, đúng tiến độ.`;

  const coverImage = project.coverImage || "/images/products/coc-tre-2m-1.webp";

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
      images: [
        {
          url: coverImage,
          width: 800,
          height: 600,
          alt: project.title,
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

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getServerProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const baseUrl = (siteConfig.website || "https://coctrehuyenduong.vn").replace(/\/$/, "");
  const coverImage = project.coverImage || "/images/products/coc-tre-2m-1.webp";

  // Schema.org Article / Project Schema
  const projectSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: project.title,
    image: [coverImage.startsWith("http") ? coverImage : `${baseUrl}${coverImage}`],
    description: project.overview || project.shortDescription,
    author: {
      "@type": "Organization",
      name: siteConfig.companyName,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.companyName,
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/icon.png`,
      },
    },
    about: {
      "@type": "Place",
      name: project.location,
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
        name: "Dự án tiêu biểu",
        item: `${baseUrl}/du-an`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: project.title,
        item: `${baseUrl}/du-an/${project.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ProjectDetailClient slug={slug} initialProject={project} />
    </>
  );
}
