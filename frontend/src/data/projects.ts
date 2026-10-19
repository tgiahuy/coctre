export interface Project {
  id: string;
  slug: string;
  title: string;
  location: string;
  projectType: string;
  bambooSupplied: string;
  totalQuantity: string;
  completionYear: string;
  coverImage: string;
  gallery: string[];
  shortDescription: string;
  overview: string;
  challenge: string;
  solution: string;
  results: string;
  productsUsed: string[];
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: "du-an-xay-dung-tinh-lo-489c-nam-dinh",
    slug: "du-an-xay-dung-tinh-lo-489c-nam-dinh",
    title: "Dự Án Xây Dựng Tuyến Tỉnh Lộ 489C Nam Định",
    location: "Xuân Trường – Giao Thủy, Tỉnh Nam Định",
    projectType: "Công trình hạ tầng giao thông đường bộ",
    bambooSupplied: "Cọc tre 2,5m & Cọc tre 3m già chọn lọc",
    totalQuantity: "180.000 cọc tre",
    completionYear: "2023 - 2024",
    coverImage: "/images/projects/du-an-tinh-lo-489c-1.webp",
    gallery: [
      "/images/projects/du-an-tinh-lo-489c-1.webp",
      "/images/projects/du-an-tinh-lo-489c-2.webp"
    ],
    shortDescription: "Cung cấp hơn 180.000 cọc tre 2,5m và 3m xử lý nền đất yếu, gia cố chân taluy và móng cống thoát nước.",
    overview: "Dự án đầu tư xây dựng tuyến đường tỉnh lộ 489C có vai trò chiến lược kết nối hạ tầng giao thông liên huyện ven biển Nam Định.",
    challenge: "Địa chất bùn sét yếu, mạch nước ngầm nông và tiến độ thi công cấp bách theo cam kết thông xe.",
    solution: "Cung ứng đồng bộ 10.000 - 15.000 cọc/ngày liên tục bằng đội xe tải và xe cẩu luân phiên, bảo đảm cọc tươi đặc ruột đến thẳng chân công trình.",
    results: "Nghiệm thu 100% đạt chuẩn chất lượng TCVN 9361:2012, bảo đảm độ chịu tải thiết kế móng nền đường.",
    productsUsed: ["coc-tre-25m", "coc-tre-3m"],
    featured: true,
  },
  {
    id: "ke-bo-song-day-chong-sat-lo-ha-noi",
    slug: "ke-bo-song-day-chong-sat-lo-ha-noi",
    title: "Kè Bờ Sông Đáy Chống Sạt Lở Mùa Mưa Lũ",
    location: "Huyện Thanh Oai – Ứng Hòa, TP. Hà Nội",
    projectType: "Công trình thủy lợi & kè sông chống sạt lở",
    bambooSupplied: "Cọc tre 4m thân to gốc già & Cọc tre 3m",
    totalQuantity: "250.000 cọc tre",
    completionYear: "2024",
    coverImage: "/images/projects/ke-song-day-1.webp",
    gallery: [
      "/images/projects/ke-song-day-1.webp",
      "/images/projects/ke-song-day-2.webp"
    ],
    shortDescription: "Gia cố toàn tuyến chân đê bao sông Đáy với cọc tre 4m đường kính lớn, chống xói lở dòng chảy ngầm.",
    overview: "Tuyến kè chống sạt lở xung yếu sông Đáy đi qua khu vực địa chất đất pha cát và bùn lỏng sâu.",
    challenge: "Mực nước biến đổi liên tục, yêu cầu cọc tre ngâm bùn không bị mục rỗng và chịu va đập cơ giới mạnh.",
    solution: "Sử dụng tre gai già tuyển chọn đường kính gốc 80-110mm, vận chuyển bằng sà lan và xe ben chuyên dụng.",
    results: "Hệ thống chân kè ổn định vững chắc, vượt qua 2 đợt lũ lớn mà không phát sinh sụt trượt.",
    productsUsed: ["coc-tre-3m", "coc-tre-4m"],
    featured: true,
  },
  {
    id: "gia-co-mong-nha-xuong-kcn-pho-noi-hung-yen",
    slug: "gia-co-mong-nha-xuong-kcn-pho-noi-hung-yen",
    title: "Gia Cố Nền Móng Cụm Nhà Xưởng KCN Phố Nối",
    location: "Khu Công Nghiệp Phố Nối A, Tỉnh Hưng Yên",
    projectType: "Công trình nhà xưởng công nghiệp",
    bambooSupplied: "Cọc tre 2m & Cọc tre 2,5m đặc ruột",
    totalQuantity: "120.000 cọc tre",
    completionYear: "2024",
    coverImage: "/images/projects/nha-xuong-hung-yen-1.webp",
    gallery: [
      "/images/projects/nha-xuong-hung-yen-1.webp"
    ],
    shortDescription: "Cung cấp 120.000 cọc tre ép mật độ 25 cọc/m² xử lý tầng đất ruộng san lấp cho cụm nhà xưởng kho vận.",
    overview: "Khu đất dự án trước đây là đất trũng trồng lúa nước, lớp bùn dẻo dày từ 1.8m đến 2.6m.",
    challenge: "Yêu cầu tiến độ ép cọc đồng loạt để kịp bàn giao mặt bằng đổ bê tông móng đài.",
    solution: "Bố trí 5 xe vận tải giao cọc trực tiếp trong đêm, đáp ứng công suất thi công 3 máy ép liên tục.",
    results: "Độ lún dư sau thi công hoàn toàn nằm trong giới hạn cho phép của hồ sơ thiết kế.",
    productsUsed: ["coc-tre-2m", "coc-tre-25m"],
    featured: true,
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getRelatedProjects(currentSlug: string, limit = 3): Project[] {
  return projects.filter((p) => p.slug !== currentSlug).slice(0, limit);
}
