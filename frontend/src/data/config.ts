export interface SiteConfig {
  companyName: string;
  shortName: string;
  legalName: string;
  slogan: string;
  logoUrl?: string;
  faviconUrl?: string;
  hotline: string;
  hotlineFormatted: string;
  hotlineSecondary?: string;
  hotline2?: string;
  hotline2Formatted?: string;
  zalo: string;
  zaloUrl: string;
  email: string;
  headquarters: string;
  address?: string;
  warehouse1: string;
  warehouse2: string;
  workHours: string;
  website: string;
  facebook: string;
  mapEmbedUrl: string;
  experienceYears: number;
  warehouseArea: string;
  completedProjects: string;
  supplyCapacity: string;
  deliveryCoverage: string;
}

export const siteConfig: SiteConfig = {
  companyName: "Cọc Tre Huyền Dương",
  shortName: "Cọc Tre Công Trình",
  legalName: "Công ty TNHH Xây Dựng & TM Huyền Dương",
  slogan: "Giao hàng tận chân công trình trong ngày – Hỗ trợ bốc xếp – Chiết khấu cao cho đơn hàng lớn",
  logoUrl: "/images/logo.png?v=3",
  faviconUrl: "/favicon.ico?v=3",
  hotline: "0369928040",
  hotlineFormatted: "0369.928.040",
  hotlineSecondary: "0912.468.203",
  hotline2: "0912468203",
  hotline2Formatted: "0912.468.203",
  zalo: "0912468203",
  zaloUrl: "https://zalo.me/0912468203",
  email: "huyenduong70@gmail.com",
  headquarters: "331 Phố Vác, Dân Hòa, Hà Nội",
  address: "331 Phố Vác, Dân Hòa, Hà Nội",
  warehouse1: "Tổng kho & Xưởng chế biến cọc tre 331 Phố Vác, Dân Hòa, Hà Nội",
  warehouse2: "Đội xe chuyên dụng giao hàng tận chân công trình trong ngày toàn miền Bắc",
  workHours: "Thứ 2 - Chủ Nhật: 8:00 - 22:00",
  website: "https://coctre-huyen-duong.pages.dev",
  facebook: "https://facebook.com/coctrehuyenduong",
  mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3729.6590783231222!2d105.7768899!3d20.8050759!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31344b16832a57e1%3A0x50d7c89128659d32!2zQ-G7rWEgSMOgbmcgQ-G7jWMgVHJlIETGsMahbmcgSHV54buBbg!5e0!3m2!1svi!2s!4v1792139837819!5m2!1svi!2s",
  experienceYears: 34,
  warehouseArea: "10.000m²+",
  completedProjects: "1.500+",
  supplyCapacity: "Hàng sẵn kho – Giao trong ngày",
  deliveryCoverage: "Giao tận chân công trình toàn miền Bắc"
};
