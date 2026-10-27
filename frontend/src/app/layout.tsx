import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingContact from "@/components/layout/FloatingContact";
import QuoteModal from "@/components/common/QuoteModal";
import DynamicFavicon from "@/components/common/DynamicFavicon";
import { QuoteModalProvider } from "@/context/QuoteModalContext";
import { siteConfig } from "@/data/config";

const beVietnamPro = Be_Vietnam_Pro({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin", "vietnamese"],
  display: "swap",
  variable: "--font-be-vietnam-pro",
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.companyName} | Tổng Kho Cọc Tre Công Trình Giá Tận Xưởng`,
    template: `%s | ${siteConfig.companyName}`,
  },
  description:
    "Công Ty TNHH Xây Dựng & TM Huyền Dương - Hơn 30 năm kinh nghiệm cung cấp cọc tre công trình (1.5m - 4m & theo yêu cầu) gia cố nền móng tại miền Bắc. Giao hàng tận chân công trình trong ngày, chiết khấu cao.",
  keywords: [
    "cọc tre",
    "cọc tre công trình",
    "cọc tre huyền dương",
    "giá cọc tre",
    "cọc tre 1.5m",
    "cọc tre 2m",
    "cọc tre 2.5m",
    "cọc tre 3m",
    "cọc tre 4m",
    "cọc tre theo yêu cầu",
    "cọc tre đóng móng",
    "gia cố nền móng cọc tre",
    "kỹ thuật đóng cọc tre",
    "cọc tre dân hòa",
  ],
  authors: [{ name: siteConfig.legalName }],
  creator: siteConfig.legalName,
  publisher: siteConfig.companyName,
  metadataBase: new URL(siteConfig.website || "https://coctrehuyenduong.com"),
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: siteConfig.website || "https://coctrehuyenduong.com",
    siteName: siteConfig.companyName,
    title: `${siteConfig.companyName} - Tổng Kho Cọc Tre Công Trình Miền Bắc`,
    description:
      "Giao hàng tận chân công trình trong ngày – Hỗ trợ bốc xếp – Chiết khấu cao cho đơn hàng lớn. Hơn 30 năm kinh nghiệm từ năm 1990.",
    images: [
      {
        url: "/images/products/warehouse/kho-coctre-08.jpg",
        width: 1050,
        height: 1400,
        alt: "Cọc tre công trình Huyền Dương",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.companyName} - Cọc Tre Công Trình`,
    description: "Cung cấp cọc tre số lượng lớn giao tận chân công trình trong ngày.",
    images: ["/images/products/warehouse/kho-coctre-08.jpg"],
  },
  icons: {
    icon: [
      { url: "/icon.png?v=3", type: "image/png" },
      { url: "/images/logo.png?v=3", type: "image/png" },
      { url: "/favicon.ico?v=3" },
    ],
    apple: [
      { url: "/apple-icon.png?v=3" },
      { url: "/apple-touch-icon.png?v=3" },
    ],
    shortcut: "/icon.png?v=3",
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
    image: "/images/logo-full.png",
    logo: "/images/logo-full.png",
    telephone: siteConfig.hotline,
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "331 Phố Vác, Dân Hòa",
      addressLocality: "Thanh Oai",
      addressRegion: "Hà Nội",
      addressCountry: "VN",
    },
    priceRange: "$$",
    description: siteConfig.slogan,
    url: siteConfig.website,
  };

  return (
    <html lang="vi" data-scroll-behavior="smooth" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${beVietnamPro.className} ${beVietnamPro.variable} font-sans antialiased bg-[#F7F5EF] text-[#232323] min-h-screen flex flex-col selection:bg-[#CDAA63]/30 selection:text-[#214E34]`} suppressHydrationWarning>
        <QuoteModalProvider>
          <DynamicFavicon />
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
