import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingContact from "@/components/layout/FloatingContact";
import QuoteModal from "@/components/common/QuoteModal";
import { QuoteModalProvider } from "@/context/QuoteModalContext";
import { siteConfig } from "@/data/config";

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["vietnamese", "latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-be-vietnam-pro",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.companyName} | Tổng Kho Cọc Tre Công Trình Giá Tại Bãi`,
    template: `%s | ${siteConfig.companyName}`,
  },
  description:
    "Cung cấp cọc tre công trình chất lượng cao (1.5m - 4m & theo yêu cầu) số lượng lớn cho gia cố nền móng, cầu đường, kè cống, nhà dân dụng & công nghiệp. Giao tận công trình 24/7.",
  keywords: [
    "cọc tre",
    "cọc tre công trình",
    "cọc tre hòa bình",
    "giá cọc tre",
    "cọc tre 2m",
    "cọc tre 2.5m",
    "cọc tre 3m",
    "cọc tre 4m",
    "cọc tre đóng móng",
    "gia cố nền móng cọc tre",
    "kỹ thuật đóng cọc tre",
  ],
  authors: [{ name: siteConfig.legalName }],
  creator: siteConfig.legalName,
  publisher: siteConfig.companyName,
  metadataBase: new URL("https://coctrehoabinh.com"),
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: "https://coctrehoabinh.com",
    siteName: siteConfig.companyName,
    title: `${siteConfig.companyName} - Tổng Kho Cọc Tre Công Trình`,
    description:
      "Cung cấp cọc tre số lượng lớn cho các công trình xây dựng, nền móng, cầu đường, cống, kè và dân dụng. Giao tận chân công trình.",
    images: [
      {
        url: "/images/products/coc-tre-2m-1.webp",
        width: 800,
        height: 600,
        alt: "Cọc tre công trình Hòa Bình",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.companyName} - Cọc Tre Công Trình`,
    description: "Cung cấp cọc tre số lượng lớn giao tận công trình 24/7.",
    images: ["/images/products/coc-tre-2m-1.webp"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/images/logo.png", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png" },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteConfig.companyName,
    legalName: siteConfig.legalName,
    image: "https://coctrehoabinh.com/images/logo.png",
    logo: "https://coctrehoabinh.com/images/logo.png",
    telephone: siteConfig.hotline,
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Số 16, ngõ 228 Thanh Bình, Mộ Lao",
      addressLocality: "Hà Đông",
      addressRegion: "Hà Nội",
      addressCountry: "VN",
    },
    priceRange: "$$",
    description: siteConfig.slogan,
    url: siteConfig.website,
  };

  return (
    <html lang="vi" data-scroll-behavior="smooth" className={`${beVietnamPro.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased bg-[#F7F5EF] text-[#232323] min-h-screen flex flex-col selection:bg-[#CDAA63]/30 selection:text-[#214E34]">
        <QuoteModalProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <FloatingContact />
          <QuoteModal />
        </QuoteModalProvider>
      </body>
    </html>
  );
}
