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
    id: "du-an-chong-ung-ngap-cuc-bo-noi-do-ha-noi",
    slug: "du-an-chong-ung-ngap-cuc-bo-noi-do-ha-noi",
    title: "DỰ ÁN CHỐNG ÚNG NGẬP CỤC BỘ NỘI ĐÔ HÀ NỘI",
    location: "Các quận nội thành (Ba Đình, Đống Đa, Cầu Giấy, Hoàn Kiếm), TP. Hà Nội",
    projectType: "Hạ tầng kỹ thuật thoát nước đô thị & Xử lý úng ngập cục bộ",
    bambooSupplied: "Cọc tre 2.5m & Cọc tre 3.0m già đực đặc ruột",
    totalQuantity: "220.000 cọc tre",
    completionYear: "2023 - 2024",
    coverImage: "/images/projects/du-an-chong-ung-ngap-noi-do-ha-noi-1.jpg",
    gallery: [
      "/images/projects/du-an-chong-ung-ngap-noi-do-ha-noi-1.jpg",
      "/images/projects/du-an-chong-ung-ngap-noi-do-ha-noi-2.jpg"
    ],
    shortDescription: "Cung cấp hơn 220.000 cọc tre già 2.5m - 3.0m gia cố nền móng cống hộp bê tông và hố ga thu nước, giải quyết triệt để các điểm nghẽn úng ngập cục bộ tại nội đô Hà Nội.",
    overview: "Thực hiện kế hoạch của UBND TP. Hà Nội và Sở Xây dựng về xử lý các điểm nghẽn ngập úng mùa mưa bão, dự án tập trung đào lắp đặt hệ thống cống hộp bê tông cốt thép khẩu độ lớn kết nối đồng bộ mạng lưới tiêu thoát nước các tuyến phố nội đô ra sông Tô Lịch và các hồ điều hòa.",
    challenge: "Mặt bằng thi công chật hẹp trong lòng đường đô thị đông đúc, địa chất nền nhiều lớp bùn cát pha sét yếu, mực nước ngầm cao và yêu cầu tiến độ thi công cuốn chiếu nhanh gọn để hoàn trả mặt bằng giao thông.",
    solution: "Sử dụng cọc tre đực già chọn lọc đường kính gốc 70-90mm, ép cơ giới mật độ 25 cọc/m² ngập sâu dưới mực nước ngầm tạo khối đệm gia cố móng cống hộp vững chắc; vận chuyển bằng đội xe chuyên dụng luân phiên ban đêm liên tục đến chân công trình.",
    results: "Toàn bộ hệ thống móng cống hộp sau gia cố đạt chuẩn nghiệm thu kỹ thuật theo TCVN 9361:2012, vận hành tiêu thoát nước nhanh chóng trong các đợt mưa lớn, chấm dứt hoàn toàn tình trạng ngập úng cục bộ kéo dài.",
    productsUsed: ["coc-tre-25m", "coc-tre-3m"],
    featured: true,
  },
  {
    id: "du-an-cai-tao-cong-hoa-muong-vinh-tuy",
    slug: "du-an-cai-tao-cong-hoa-muong-vinh-tuy",
    title: "DỰ ÁN CẢI TẠO, CỐNG HÓA MƯƠNG VĨNH TUY",
    location: "Phường Vĩnh Tuy, Quận Hai Bà Trưng, TP. Hà Nội",
    projectType: "Công trình cải tạo môi trường & Cống hóa mương thoát nước đô thị",
    bambooSupplied: "Cọc tre 3.0m & Cọc tre 4.0m gốc to chịu tải cao",
    totalQuantity: "180.000 cọc tre",
    completionYear: "2024",
    coverImage: "/images/projects/du-an-cai-tao-cong-hoa-muong-vinh-tuy-1.jpg",
    gallery: [
      "/images/projects/du-an-cai-tao-cong-hoa-muong-vinh-tuy-1.jpg",
      "/images/projects/du-an-cai-tao-cong-hoa-muong-vinh-tuy-2.jpg"
    ],
    shortDescription: "Cung cấp 180.000 cọc tre 3m và 4m xử lý nền đất bùn đáy mương, phục vụ cống hóa đôi và cải tạo cảnh quan môi trường tuyến mương Vĩnh Tuy (Hai Bà Trưng, Hà Nội).",
    overview: "Dự án Cải tạo, cống hóa mương Vĩnh Tuy (đoạn từ đường Minh Khai đến phố Vĩnh Tuy, quận Hai Bà Trưng) theo quyết định phê duyệt của UBND TP. Hà Nội nhằm xóa bỏ điểm đen ô nhiễm môi trường, nâng cao năng lực thoát nước và mở rộng không gian hạ tầng đô thị phục vụ đời sống dân sinh.",
    challenge: "Lớp bùn đáy mương tích tụ lâu năm dày và lỏng, áp lực sạt lở bờ hai bên lớn, yêu cầu vật liệu cọc tre đóng móng cống đôi phải có độ già đanh, thân thẳng, không mục rỗng khi ngâm bùn nước lâu năm.",
    solution: "Cọc Tre Huyền Dương cung cấp chủng loại cọc tre gai, tre đực tuyển chọn kỹ lưỡng từ vùng tre già Hòa Bình - Phú Thọ, đóng gia cố chân kè bờ và đáy mương chịu lực cho kết cấu cống hộp đôi bê tông đúc sẵn.",
    results: "Dự án hoàn thành đúng tiến độ, tổ chức Lễ khánh thành gắn biển công trình chào mừng thành công tốt đẹp; tuyến mương hở ô nhiễm trước đây đã trở thành tuyến cống ngầm hiện đại, sạch đẹp và đồng bộ hạ tầng kỹ thuật.",
    productsUsed: ["coc-tre-3m", "coc-tre-4m"],
    featured: true,
  },
  {
    id: "cung-cap-coc-tre-cho-cac-cong-trinh-xay-dung-ha-tang",
    slug: "cung-cap-coc-tre-cho-cac-cong-trinh-xay-dung-ha-tang",
    title: "CUNG CẤP CỌC TRE CHO CÁC CÔNG TRÌNH XÂY DỰNG & HẠ TẦNG",
    location: "Hà Nội và các tỉnh thành trọng điểm miền Bắc (Bắc Ninh, Hưng Yên, Hải Phòng, Hà Nam, Nam Định...)",
    projectType: "Tổng thầu cung ứng vật tư cọc tre gia cố nền móng công trình & hạ tầng kỹ thuật",
    bambooSupplied: "Đầy đủ quy cách cọc tre 1.5m - 2.0m - 2.5m - 3.0m - 4.0m và cọc cưa khúc theo thiết kế",
    totalQuantity: "500.000+ cọc tre / năm",
    completionYear: "2023 - 2025 (Liên tục)",
    coverImage: "/images/projects/cung-cap-coc-tre-cong-trinh-ha-tang-1.jpg",
    gallery: [
      "/images/projects/cung-cap-coc-tre-cong-trinh-ha-tang-1.jpg",
      "/images/projects/cung-cap-coc-tre-cong-trinh-ha-tang-2.jpg"
    ],
    shortDescription: "Hệ thống kho bãi quy mô lớn tại làng nghề Dân Hòa cung ứng hơn 500.000 cọc tre/năm cho hàng trăm dự án nhà xưởng, giao thông, thủy lợi và dân dụng khắp miền Bắc.",
    overview: "Cọc Tre Huyền Dương tự hào là đơn vị uy tín hàng đầu từ năm 1990 chuyên khai thác, chọn lọc và cung ứng cọc tre cho các tổng thầu xây dựng, dự án khu công nghiệp, kè sông đê điều và các công trình nhà ở dân dụng trên toàn miền Bắc.",
    challenge: "Các dự án quy mô lớn đòi hỏi khối lượng cọc tre rất lớn trong thời gian ngắn, cọc phải đều thân, thẳng, đạt chuẩn đường kính gốc/ngọn và xuất hóa đơn VAT, chứng chỉ nguồn gốc xuất xứ đầy đủ.",
    solution: "Duy trì tổng kho bãi luôn sẵn từ hàng chục nghìn đến hàng trăm nghìn cọc tre tươi các kích thước; kết hợp đội xe tải và xe cẩu tự hành vận chuyển tận chân công trình 24/7 theo đúng tiến độ cam kết.",
    results: "Cung cấp ổn định cho hơn 1.000+ dự án lớn nhỏ, luôn được các đối tác nhà thầu đánh giá cao về chất lượng tre già đặc ruột, giá thành cạnh tranh trực tiếp tại xưởng và phong cách làm việc chuyên nghiệp.",
    productsUsed: ["coc-tre-2m", "coc-tre-25m", "coc-tre-3m", "coc-tre-4m", "coc-tre-theo-yeu-cau"],
    featured: true,
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getRelatedProjects(currentSlug: string, limit = 3): Project[] {
  return projects.filter((p) => p.slug !== currentSlug).slice(0, limit);
}
