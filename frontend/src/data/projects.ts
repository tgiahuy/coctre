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
    completionYear: "2022 - 2023",
    coverImage: "/images/projects/du-an-tinh-lo-489c-1.webp",
    gallery: [
      "/images/projects/du-an-tinh-lo-489c-1.webp",
      "/images/projects/du-an-tinh-lo-489c-2.webp",
      "/images/projects/du-an-tinh-lo-489c-3.webp"
    ],
    shortDescription: "Cung cấp hơn 180.000 cọc tre 2,5m và 3m xử lý nền đất yếu, gia cố chân taluy và móng cống thoát nước qua vùng đất trũng ngập mặn ven biển.",
    overview: `Dự án đầu tư xây dựng tuyến đường tỉnh lộ 489C (đoạn từ cầu Lạc Quần đến phà Sa Cao) có vai trò chiến lược trong việc kết nối hạ tầng giao thông các huyện phía nam tỉnh Nam Định với tỉnh Thái Bình. Tuyến đường chạy qua nhiều vùng đất ruộng trũng, đất bãi bồi ven sông có địa tầng bùn sét yếu dày từ 2 đến 3,5 mét.`,
    challenge: `Địa chất công trình phân tầng không đồng nhất, mực nước ngầm cao và tiến độ thi công tuyến đường đòi hỏi cấp tập để phục vụ thông xe kỹ thuật. Khối lượng cọc tre cần cấp đồng bộ mỗi ngày lên tới 10.000 - 15.000 cọc với yêu cầu độ già nghiêm ngặt để chịu được búa rung thủy lực.`,
    solution: `Cọc Tre Hòa Bình đã huy động đồng thời 2 kho bãi và đội xe vận tải 8 chiếc luân phiên cung ứng liên tục trong 20 ngày. Toàn bộ cọc tre 2,5m và 3m đều được vát nhọn 3 cạnh chuẩn xác, thân tre thẳng đều giúp tốc độ ép cọc đạt bình quân 1.200 cọc/máy/ngày.`,
    results: `Khối lượng 180.000 cọc tre đã được nghiệm thu 100% đạt chuẩn chất lượng theo TCVN, không có hiện tượng nứt toác đầu cọc khi ép máy. Nền đường sau khi gia cố đạt độ đầm chặt K95 theo đúng thiết kế ban đầu.`,
    productsUsed: ["coc-tre-25m", "coc-tre-3m"],
    featured: true
  },
  {
    id: "du-an-nang-cap-duong-va-xay-dung-cau",
    slug: "du-an-nang-cap-duong-va-xay-dung-cau",
    title: "Dự Án Nâng Cấp Đường & Xây Cầu Từ Xã Nguyễn Huệ Sang Văn Đức",
    location: "Chí Linh (Hải Dương) – Văn Đức (Quảng Ninh)",
    projectType: "Công trình cầu cống & đường dẫn đầu cầu",
    bambooSupplied: "Cọc tre 2m & Cọc tre 2,5m tre luồng loại 1",
    totalQuantity: "120.000 cọc tre",
    completionYear: "2022",
    coverImage: "/images/projects/du-an-cau-van-duc-1.webp",
    gallery: [
      "/images/projects/du-an-cau-van-duc-1.webp",
      "/images/projects/du-an-cau-van-duc-2.webp",
      "/images/projects/du-an-cau-van-duc-3.webp"
    ],
    shortDescription: "Gia cố móng mố cầu, đường dẫn hai đầu cầu và kè bảo vệ bờ sông chống sạt lở mố đường với hơn 120.000 cọc tre chất lượng cao.",
    overview: `Dự án nâng cấp đường và xây dựng cầu vượt nối đôi bờ xã Nguyễn Huệ sang xã Văn Đức nhằm xóa bỏ cảnh đò ngang cách trở, thúc đẩy giao thương vùng ven sông. Hạng mục xử lý móng mố cầu và đường dẫn hai đầu cầu đòi hỏi cọc tre có khả năng chống phân rã trong môi trường nước ngọt phù sa.`,
    challenge: `Mặt bằng thi công chật hẹp, xe tải lớn khó tiếp cận trực tiếp đến mép nước mố cầu. Yêu cầu cọc tre phải giao chia nhỏ theo từng đợt để máy xúc ép ngay, tránh việc tồn bãi bị khô nỏ dưới nắng hè.`,
    solution: `Chúng tôi bố trí xe tải 5 tấn và 8 tấn vận chuyển linh hoạt theo lịch trình thi công hàng ngày của nhà thầu. Cung ứng cọc tre tươi nguyên bản, bảo quản ẩm ướt tự nhiên trong quá trình vận chuyển.`,
    results: `Hoàn thành bàn giao toàn bộ 120.000 cọc tre trước tiến độ 5 ngày. Đội ngũ giám sát nghiệm thu đánh giá cao độ già đanh và độ đồng đều kích thước của cọc tre Hòa Bình.`,
    productsUsed: ["coc-tre-2m", "coc-tre-25m"],
    featured: true
  },
  {
    id: "du-an-xay-dung-duong-truc-kinh-te-bien-nam-dinh",
    slug: "du-an-xay-dung-duong-truc-kinh-te-bien-nam-dinh",
    title: "Dự Án Đường Trục Phát Triển Vùng Kinh Tế Biển Nam Định Nối Cao Tốc Cầu Giẽ – Ninh Bình",
    location: "Huyện Ý Yên – Nghĩa Hưng, Tỉnh Nam Định",
    projectType: "Tuyến cao tốc trục xương sống liên kết vùng",
    bambooSupplied: "Cọc tre 3m & Cọc tre 4m thân to đường kính ≥ 8cm",
    totalQuantity: "350.000 cọc tre",
    completionYear: "2021 - 2023",
    coverImage: "/images/projects/du-an-kinh-te-bien-1.webp",
    gallery: [
      "/images/projects/du-an-kinh-te-bien-1.webp",
      "/images/projects/du-an-kinh-te-bien-2.webp",
      "/images/projects/du-an-kinh-te-bien-3.webp"
    ],
    shortDescription: "Đại dự án trọng điểm với hơn 350.000 cọc tre 3m - 4m được cung ứng để gia cố móng hào sâu và chân khay kè mái kênh dọc tuyến cao tốc.",
    overview: `Tuyến đường trục kết nối khu kinh tế biển Ninh Cơ với cao tốc Bắc Nam là dự án giao thông trọng điểm quốc gia có chiều dài hơn 46km. Tuyến đi qua các vùng đồng chiêm trũng, kênh rạch chằng chịt yêu cầu xử lý móng mềm trên diện rộng.`,
    challenge: `Khối lượng cọc tre cực lớn, đòi hỏi tiêu chuẩn gắt gao về độ thẳng và đường kính cọc tre ≥ 80mm để đảm bảo hệ số an toàn tính toán cho nền đường chịu tải trọng xe container nặng.`,
    solution: `Cọc Tre Hòa Bình ký hợp đồng cung ứng chiến lược với tổng thầu. Chúng tôi khai thác chọn lọc từ 3 lâm trường lớn tại vùng núi cao Hòa Bình, sử dụng dàn xe đầu kéo và xe ben 3 chân vận chuyển xuyên đêm vào công trường.`,
    results: `Dự án thi công thuận lợi, đạt giải thưởng công trình giao thông tiêu biểu. Móng đường ổn định tuyệt đối sau hơn 2 năm đưa vào vận hành khai thác.`,
    productsUsed: ["coc-tre-3m", "coc-tre-4m"],
    featured: true
  },
  {
    id: "du-an-ke-de-song-day-ha-nam",
    slug: "du-an-ke-de-song-day-ha-nam",
    title: "Dự Án Kè Đê & Cống Xả Thủy Lợi Sông Đáy Hà Nam",
    location: "Thanh Liêm – Phủ Lý, Tỉnh Hà Nam",
    projectType: "Công trình thủy lợi phòng chống lụt bão",
    bambooSupplied: "Cọc tre 2,5m & Cọc tre 3m tre đực vát nhọn",
    totalQuantity: "95.000 cọc tre",
    completionYear: "2023",
    coverImage: "/images/projects/du-an-ke-de-ha-nam-1.webp",
    gallery: [
      "/images/projects/du-an-ke-de-ha-nam-1.webp",
      "/images/projects/du-an-ke-de-ha-nam-2.webp",
      "/images/projects/du-an-ke-de-ha-nam-3.webp"
    ],
    shortDescription: "Gia cố mái đê sông Đáy và chân khay cống tiêu úng, đảm bảo độ an toàn tuyệt đối cho hệ thống thoát lũ mùa mưa bão.",
    overview: `Kè mái đê sông Đáy là tuyến phòng thủ lũ xung yếu của tỉnh Hà Nam. Đoạn kè cần đóng cọc tre tạo lưới chắn giữ lớp vải địa kỹ thuật và đá hộc trước khi đổ bê tông tấm lát bờ đê.`,
    challenge: `Mực nước sông lên xuống theo triều và lũ đầu nguồn, nhà thầu phải ép cọc tre ngay khi con nước rút trong vài giờ mỗi ngày.`,
    solution: `Đáp ứng giao hàng nhanh trong ngày, cọc tre được bó sẵn theo từng vựa 25 cây giúp công nhân bốc thả ngay xuống chân kè nhanh chóng.`,
    results: `Công trình đã hoàn thành xuất sắc trước mùa mưa lũ, kè đứng vững qua các đợt lũ lớn không xảy ra sạt trượt sụt lún.`,
    productsUsed: ["coc-tre-25m", "coc-tre-3m"],
    featured: false
  },
  {
    id: "du-an-mong-nha-xuong-ccn-dong-van",
    slug: "du-an-mong-nha-xuong-ccn-dong-van",
    title: "Gia Cố Nền Móng Cụm Nhà Xưởng CCN Đồng Văn IV",
    location: "KCN Đồng Văn, Thị xã Duy Tiên, Hà Nam",
    projectType: "Công trình công nghiệp – Móng nhà xưởng",
    bambooSupplied: "Cọc tre 2m & Cọc tre theo yêu cầu 2.2m",
    totalQuantity: "140.000 cọc tre",
    completionYear: "2023 - 2024",
    coverImage: "/images/projects/du-an-nha-xuong-dong-van-1.webp",
    gallery: [
      "/images/projects/du-an-nha-xuong-dong-van-1.webp",
      "/images/projects/du-an-nha-xuong-dong-van-2.webp",
      "/images/projects/du-an-nha-xuong-dong-van-3.webp"
    ],
    shortDescription: "Cung cấp cọc tre phục vụ ép cọc móng bè cho cụm 4 nhà xưởng may mặc và cơ khí diện tích 22.000m² trên nền đất ruộng lấp.",
    overview: `Dự án xây dựng cụm nhà xưởng sản xuất hiện đại trên khu đất nguyên là ruộng trũng có lớp bùn hữu cơ dày 1.8m. Giải pháp gia cố bằng cọc tre kết hợp đệm cát giúp tiết kiệm 45% chi phí so với phương án cọc bê tông ép sâu mà vẫn đảm bảo độ lún cho phép.`,
    challenge: `Yêu cầu nghiêm ngặt về mật độ đóng cọc 25 cọc/m² với tổng diện tích móng bè hơn 5.500m², cọc phải đều tăm tắp về đường kính để phân bổ ứng suất nền đều.`,
    solution: `Cọc Tre Hòa Bình gia công phân loại riêng lô cọc tre đường kính đồng đều Ø70-85mm, giao đều đặn theo tiến độ đào móng của 3 máy xúc đào.`,
    results: `Chủ đầu tư FDI Hàn Quốc cùng đơn vị tư vấn giám sát nghiệm thu tuyệt đối hài lòng. Công trình đã đi vào vận hành an toàn ổn định.`,
    productsUsed: ["coc-tre-2m", "coc-tre-theo-yeu-cau"],
    featured: false
  }
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getRelatedProjects(currentSlug: string, limit = 3): Project[] {
  return projects.filter((p) => p.slug !== currentSlug).slice(0, limit);
}
