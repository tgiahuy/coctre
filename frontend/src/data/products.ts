export interface Product {
  id: string;
  slug: string;
  name: string;
  length: string; // e.g. "1.5m", "2m", "2.5m", "3m", "4m", "Theo yêu cầu"
  lengthMeters: number; // numeric length for filtering
  diameter: string; // e.g. "Ø 60 - 80mm", "Ø 70 - 100mm"
  bambooType: string; // Tre đực già / Tre Luồng / Tre gai
  origin: string; // Hòa Bình / Thanh Hóa / Phú Thọ
  stockStatus: "Còn hàng" | "Sẵn hàng số lượng lớn" | "Đặt hàng 1-2 ngày";
  shortDescription: string;
  description: string;
  specs: {
    label: string;
    value: string;
  }[];
  applications: string[];
  advantages: string[];
  packaging: string;
  images: string[];
  featured?: boolean;
  videoUrl?: string;
  rating: number;
  reviewCount: number;
}

export const products: Product[] = [
  {
    id: "coc-tre-15m",
    slug: "coc-tre-15m",
    name: "Cọc Tre 1,5m (Ø 6 - 8cm)",
    length: "1,5m",
    lengthMeters: 1.5,
    diameter: "Ø 60 – 80 mm",
    bambooType: "Tre đực già, tre gai, tre luồng Hòa Bình",
    origin: "Vùng tre già Hòa Bình tuyển chọn",
    stockStatus: "Sẵn hàng số lượng lớn",
    shortDescription: "Cọc tre 1,5m cọc đặc, thịt dày, vát nhọn đầu sẵn, chuyên dùng gia cố móng hào, hố móng nông, công trình phụ và đường dẫn nước.",
    description: `Cọc tre 1,5m là loại cọc tre chiều dài ngắn, được khai thác từ những bụi tre già trên 3-4 năm tuổi. Cọc có độ bền dẻo cao, thành ống dày đặc, được xử lý vắt nhọn đầu cọc và cắt phẳng gốc giúp quá trình thi công ép cọc bằng máy cuốc hoặc vồ đóng không bị dập nát đầu cọc.

Đặc tính cọc tre khi ngập hoàn toàn trong môi trường nước ngầm hoặc bùn yếm khí sẽ tăng độ bền qua nhiều thập kỷ, không bị mối mọt xâm hại, đóng vai trò tạo mạng lưới liên kết đất bùn cát chặt chẽ.`,
    specs: [
      { label: "Chiều dài tiêu chuẩn", value: "1,45m – 1,55m (Đủ quy cách)" },
      { label: "Đường kính gốc", value: "Ø 60mm – 80mm" },
      { label: "Đường kính ngọn", value: "Tối thiểu ≥ 50mm" },
      { label: "Độ tuổi tre", value: "3 – 5 năm tuổi (Thịt tre già đanh, xanh sẫm)" },
      { label: "Gia công đầu cọc", value: "Đã vát nhọn 3 cạnh dài 15-20cm, cắt phẳng đầu" },
      { label: "Độ ẩm", value: "Tươi tự nhiên, giữ độ dẻo dai nguyên bản" },
      { label: "Tiêu chuẩn kỹ thuật", value: "Phù hợp TCVN 9361:2012 thi công gia cố móng cọc cừ" }
    ],
    applications: [
      "Gia cố móng nhà cấp 4, nhà 1-2 tầng trên nền đất yếu, đất bùn ven kênh.",
      "Thi công gia cố móng kè ao hồ, rãnh thoát nước, kênh mương nội đồng.",
      "Lót móng đường giao thông nông thôn, đường nội bộ nhà xưởng.",
      "Chặn sạt lở bờ rãnh, gia cố vách hào chống sụt lún trong thi công."
    ],
    advantages: [
      "Tre đực già đặc ruột, không dập nứt khi ép máy xúc.",
      "Nguồn hàng có sẵn hàng vạn cọc tại kho bãi 331 Phố Vác, Dân Hòa, Hà Nội.",
      "Chi phí tiết kiệm nhất trong các quy cách cọc tre.",
      "Vận chuyển tận chân công trình trong ngày bằng xe tải đa dạng tải trọng."
    ],
    packaging: "Bó 25 cây hoặc 50 cây buộc dây thép chặt chẽ, dễ dàng kiểm đếm và bốc xếp.",
    images: [
      "/images/products/coc-tre-15m-1.webp",
      "/images/products/coc-tre-15m-2.webp",
      "/images/products/coc-tre-15m-3.webp"
    ],
    featured: true,
    rating: 0,
    reviewCount: 0
  },
  {
    id: "coc-tre-2m",
    slug: "coc-tre-2m",
    name: "Cọc Tre 2m (Ø 6 - 9cm)",
    length: "2m",
    lengthMeters: 2.0,
    diameter: "Ø 65 – 90 mm",
    bambooType: "Tre luồng / Tre gai già đanh",
    origin: "Vùng nguyên liệu tre già chọn lọc miền Bắc",
    stockStatus: "Sẵn hàng số lượng lớn",
    shortDescription: "Quy cách phổ biến nhất cho công trình nhà dân dụng, móng băng, móng bè trên nền đất ruộng, ao hồ san lấp.",
    description: `Cọc tre 2m là quy cách được sử dụng nhiều nhất trên 70% các công trình xây dựng dân dụng tại khu vực miền Bắc. Với chiều dài 2 mét tiêu chuẩn, cọc xuyên qua lớp đất bùn yếu bề mặt để cắm sâu vào tầng đất dẻo chặt, phân tán lực ép móng đều và chống lún nghiêng hiệu quả.

Sản phẩm được tuyển chọn kỹ: thân thẳng, mắt tre nhẵn, không bị sâu mọt hoặc cụt ngọn non. Đầu cọc được tiện phẳng để chịu lực va đập khi máy ép thủy lực hoặc búa đóng hoạt động.`,
    specs: [
      { label: "Chiều dài tiêu chuẩn", value: "1,95m – 2,05m" },
      { label: "Đường kính gốc", value: "Ø 65mm – 90mm" },
      { label: "Đường kính ngọn", value: "Tối thiểu ≥ 55mm" },
      { label: "Độ tuổi tre", value: "Tre già 4 – 6 năm tuổi" },
      { label: "Xử lý bề mặt", value: "Tỉa sạch cành mắt, đầu vát nhọn 3 khía chống lệch hướng" },
      { label: "Khả năng chịu tải", value: "Đạt chuẩn tính toán 0.6 - 0.8 tấn/cọc (tùy địa chất)" },
      { label: "Quy cách đóng bó", value: "Bó 20 - 25 cây bằng dây đai chắc chắn" }
    ],
    applications: [
      "Thi công ép cọc móng nhà phố từ 2 – 5 tầng trên nền đất ao, đất lấp.",
      "Gia cố móng cầu, móng mố đường dẫn, cống hộp qua đường.",
      "Lót móng đài móng, dầm móng chống sụt lún không đều.",
      "Gia cố đê điều, bờ kênh thủy lợi, chống trượt lở đất nền mùa mưa lũ."
    ],
    advantages: [
      "Quy cách chuẩn mực, dễ thi công với mật độ tiêu chuẩn 25 cọc/m².",
      "Thân cọc dày dặn, độ uốn dẻo và chịu nén dọc trục cực tốt.",
      "Giá xuất bãi trực tiếp không qua trung gian, rẻ hơn thị trường 10-15%.",
      "Cung cấp kèm giấy biên bản giao nhận và hóa đơn VAT theo yêu cầu."
    ],
    packaging: "Bó 25 cây xếp ngay ngắn, kiểm kê số lượng nhanh chóng khi hạ hàng.",
    images: [
      "/images/products/coc-tre-2m-1.webp",
      "/images/products/coc-tre-2m-2.webp",
      "/images/products/coc-tre-2m-3.webp"
    ],
    featured: true,
    rating: 0,
    reviewCount: 0
  },
  {
    id: "coc-tre-25m",
    slug: "coc-tre-25m",
    name: "Cọc Tre 2,5m (Ø 7 - 9.5cm)",
    length: "2,5m",
    lengthMeters: 2.5,
    diameter: "Ø 70 – 95 mm",
    bambooType: "Tre đực đặc ruột, tre luồng già tuyển chọn",
    origin: "Vùng nguyên liệu tre già chọn lọc",
    stockStatus: "Sẵn hàng số lượng lớn",
    shortDescription: "Lựa chọn tối ưu cho địa tầng có lớp bùn dày 2m - 2.3m, gia cố kè đê sông, đầm lầy, móng trạm biến áp và nhà xưởng công nghiệp.",
    description: `Cọc tre 2,5m chuyên phục vụ các công trình đòi hỏi độ sâu cắm cọc lớn hơn mặt bằng thông thường. Nhờ lấy từ thân tre luồng khúc gốc và thân giữa, cọc có độ côn đều, thành tre dày từ 1.2 - 1.8cm tạo lực ma sát thành cọc với lớp đất xung quanh rất cao.

Được khai thác chính vụ vào mùa hanh khô nên tre đạt hàm lượng chất xơ cao nhất, dẻo dai và chống mục rỗng tối đa khi nằm trong lòng đất ngậm nước.`,
    specs: [
      { label: "Chiều dài tiêu chuẩn", value: "2,45m – 2,55m" },
      { label: "Đường kính gốc", value: "Ø 70mm – 95mm" },
      { label: "Đường kính ngọn", value: "Tối thiểu ≥ 60mm" },
      { label: "Độ tuổi tre", value: "Trên 4 năm tuổi (Vỏ bóng sẫm, thịt tre già cứng)" },
      { label: "Gia công", value: "Vát nhọn sắc bén, đầu trên cắt vuông góc 90 độ" },
      { label: "Độ thẳng thân", value: "Độ cong võng < 1.5% chiều dài cọc" },
      { label: "Chứng nhận nguồn gốc", value: "Rừng trồng bền vững có hóa đơn xuất xứ lâm sản" }
    ],
    applications: [
      "Công trình hạ tầng giao thông, nền đường đắp qua vùng trũng ngập úng.",
      "Gia cố chân kè bê tông, rọ đá bờ sông, bờ biển chống xói lở chân khay.",
      "Gia cố nền móng nhà xưởng khu công nghiệp tải trọng lớn.",
      "Móng hố ga, cống tròn, cống bản thoát nước đô thị."
    ],
    advantages: [
      "Khả năng cắm sâu vượt trội, gia tăng độ liên kết của khối đất móng.",
      "Thân cọc thẳng tắp, hạn chế tối đa nguy cơ bị xiên lệch khi ép cọc.",
      "Kho luôn sẵn từ 50.000 đến 100.000 cọc phục vụ ngay lập tức.",
      "Hỗ trợ đội xe tải thùng dài hạ tận chân hố móng không ngại đường hẹp."
    ],
    packaging: "Bó 20 cây chắc chắn, đầu ngọn cùng chiều.",
    images: [
      "/images/products/coc-tre-25m-1.webp",
      "/images/products/coc-tre-25m-2.webp",
      "/images/products/coc-tre-25m-3.webp"
    ],
    featured: true,
    rating: 0,
    reviewCount: 0
  },
  {
    id: "coc-tre-3m",
    slug: "coc-tre-3m",
    name: "Cọc Tre 3m (Ø 7 - 10cm)",
    length: "3m",
    lengthMeters: 3.0,
    diameter: "Ø 70 – 100 mm",
    bambooType: "Tre luồng già tuyển chọn loại 1",
    origin: "Khai thác tuyển chọn từ vùng tre già đạt chuẩn",
    stockStatus: "Sẵn hàng số lượng lớn",
    shortDescription: "Cọc tre 3m thân to dày, chuyên trị nền đất yếu sâu, công trình kè sông, đê kè kè biển, mương thủy lợi và cầu cống giao thông.",
    description: `Cọc tre 3m là sản phẩm chất lượng cao thuộc phân khúc cọc tre cỡ lớn của Cọc Tre Huyền Dương. Toàn bộ cọc được chặt từ phần gốc tre già trên 4-5 năm tuổi, đường kính gốc từ 7cm đến hơn 10cm, ruột đặc và thành tre dày chịu lực cực lớn.

Sản phẩm thường được chỉ định trong các hồ sơ thiết kế kỹ thuật của Viện thiết kế giao thông, thủy lợi phục vụ gia cố chân taluy âm, chân khay kè đá và móng cống hộp qua vùng trũng thấp.`,
    specs: [
      { label: "Chiều dài tiêu chuẩn", value: "2,95m – 3,05m" },
      { label: "Đường kính gốc", value: "Ø 70mm – 100mm (Đường kính to đều)" },
      { label: "Đường kính ngọn", value: "Tối thiểu ≥ 65mm" },
      { label: "Độ tuổi tre", value: "5 – 7 năm tuổi (Tre già đanh, không mọt)" },
      { label: "Vát nhọn", value: "Vát 3 mặt sắc dài 25cm hỗ trợ máy đóng xuyên tầng đất cứng" },
      { label: "Khối lượng", value: "Nặng, chắc tay, độ tươi dẻo cao" }
    ],
    applications: [
      "Công trình thủy lợi: Đập tràn, kè kênh mương tưới tiêu, trạm bơm.",
      "Gia cố nền móng đê biển, đê sông chống xâm thực và sạt lở mùa mưa bão.",
      "Nền móng các tuyến đường tránh, đường cao tốc đoạn qua đầm lầy.",
      "Móng bể xử lý nước thải, bể ngầm dung tích hàng ngàn m³."
    ],
    advantages: [
      "Độ bền nén dọc trục và lực ma sát bề mặt đất cực lớn.",
      "Cọc tuyển 100% không cong võng, không dập vỡ khi dùng máy gầu ép mạnh.",
      "Giá cả trực tiếp từ lâm trường, xuất hóa đơn chứng từ đầy đủ.",
      "Đội xe ben, xe đầu kéo chuyên dụng chở số lượng lớn đến 20.000 cọc/chuyến."
    ],
    packaging: "Bó 15 - 20 cây / bó hoặc xếp cây gọn gàng trên thùng xe.",
    images: [
      "/images/products/coc-tre-3m-1.webp",
      "/images/products/coc-tre-3m-2.webp",
      "/images/products/coc-tre-3m-3.webp"
    ],
    featured: true,
    rating: 0,
    reviewCount: 0
  },
  {
    id: "coc-tre-4m",
    slug: "coc-tre-4m",
    name: "Cọc Tre 4m (Ø 8 - 11cm)",
    length: "4m",
    lengthMeters: 4.0,
    diameter: "Ø 80 – 110 mm",
    bambooType: "Tre luồng đại thụ, tre gai già Hòa Bình",
    origin: "Vùng tre già Hòa Bình chọn lọc",
    stockStatus: "Sẵn hàng số lượng lớn",
    shortDescription: "Cọc tre 4m thân khủng, độ bền cao, chuyên dùng cho các dự án thủy lợi quy mô lớn, kè sông sâu và gia cố móng đường cao tốc.",
    description: `Cọc tre 4m là dòng cọc tre dài nhất trong danh mục sản phẩm tiêu chuẩn. Việc khai thác và vận chuyển cọc 4m đòi hỏi quy trình tuyển chọn khắt khe tại các khu rừng tre luồng lâu năm để đảm bảo cọc giữ được độ thẳng tự nhiên, không bị vặn xoắn và thành thân dầy đặc.

Cọc có khả năng xuyên sâu qua nhiều lớp bùn lầy, giúp tạo liên kết chặt chẽ giữa tầng đất bùn và nền cát sỏi bên dưới, ngăn ngừa lún nghiêng móng vĩnh viễn.`,
    specs: [
      { label: "Chiều dài tiêu chuẩn", value: "3,95m – 4,05m" },
      { label: "Đường kính gốc", value: "Ø 80mm – 110mm" },
      { label: "Đường kính ngọn", value: "Tối thiểu ≥ 70mm" },
      { label: "Đặc tính", value: "Cắt sát gốc tre già, thân đanh cứng" },
      { label: "Gia công", value: "Vát nhọn chống va lệch móng, cắt phẳng mặt nhận lực ép" },
      { label: "Sức chịu tải", value: "Chịu lực ép cơ giới cao không dập gãy" }
    ],
    applications: [
      "Công trình kè chống sạt lở bờ sông lớn, bờ biển, cửa sông nước sâu.",
      "Gia cố nền móng cầu đường, móng cọc đường dẫn cao tốc qua vùng đất yếu.",
      "Móng cọc đập thủy điện nhỏ, cống thoát lũ và âu thuyền.",
      "Gia cố nền móng nhà máy, khu bến cảng, kho bãi tải trọng nặng."
    ],
    advantages: [
      "Chiều dài 4m tạo diện tích tiếp xúc ma sát lớn nhất với nền đất.",
      "Cọc nguyên khối không chắp nối, đảm bảo phân bổ tải trọng liên tục.",
      "Kho bãi rộng có xe cẩu chuyên dụng hỗ trợ bốc xếp hàng siêu tốc.",
      "Cam kết bảo đảm chất lượng theo quy chuẩn hồ sơ nghiệm thu dự án nhà nước."
    ],
    packaging: "Xếp cây gọn gàng theo kiện 10 - 15 cây, buộc đai nâng hạ xe cẩu.",
    images: [
      "/images/products/coc-tre-4m-1.webp",
      "/images/products/coc-tre-4m-2.webp",
      "/images/products/coc-tre-4m-3.webp"
    ],
    featured: true,
    rating: 0,
    reviewCount: 0
  },
  {
    id: "coc-tre-theo-yeu-cau",
    slug: "coc-tre-theo-yeu-cau",
    name: "Cọc Tre Theo Yêu Cầu (Đặt Cắt Quy Cách Riêng)",
    length: "Theo yêu cầu",
    lengthMeters: 0,
    diameter: "Ø 50 – 120 mm tùy chọn",
    bambooType: "Tre luồng, tre gai, tre đực Hòa Bình tuyển chọn",
    origin: "Vùng nguyên liệu tuyển chọn Hòa Bình",
    stockStatus: "Đặt hàng 1-2 ngày",
    shortDescription: "Cắt theo kích thước bản vẽ kỹ thuật: 1.2m, 1.8m, 2.2m, 3.5m, 5m, vát nhọn hoặc để thẳng, phân loại đường kính riêng.",
    description: `Dịch vụ gia công và cung cấp Cọc Tre Theo Yêu Cầu đáp ứng trọn vẹn các yêu cầu kỹ thuật đặc biệt trong hồ sơ thiết kế công trình xây dựng. Chúng tôi nhận cắt cọc theo mọi kích thước lẻ (như 1.2m, 1.8m, 2.2m, 2.7m, 3.2m, 3.6m...), chọn lọc đường kính gốc/ngọn theo chỉ định của tư vấn giám sát, hoặc yêu cầu xử lý chống mối mọt, vát nhọn theo góc đặc thù.

Với xưởng chế biến và kho bãi trực tiếp tại 331 Phố Vác, Dân Hòa, Hà Nội, chúng tôi có thể đáp ứng tiến độ gia công hàng vạn cọc chỉ trong 24 - 48 giờ.`,
    specs: [
      { label: "Chiều dài tùy biến", value: "Cắt chuẩn xác từ 1,0m đến 6,0m theo bản vẽ" },
      { label: "Đường kính phân loại", value: "Tuyển chọn theo dải kích thước yêu cầu (Ví dụ: Ø80-100mm đồng đều)" },
      { label: "Yêu cầu vát cọc", value: "Vát nhọn 3 cạnh / 4 cạnh hoặc giữ nguyên đầu phẳng" },
      { label: "Thời gian đáp ứng", value: "1 – 2 ngày kể từ khi chốt số lượng đơn hàng" },
      { label: "Chứng chỉ hồ sơ", value: "Cung cấp mẫu thí nghiệm nén uốn, hồ sơ xuất xứ lâm sản hợp pháp" }
    ],
    applications: [
      "Công trình có thiết kế địa chất chuyên biệt cần chiều dài cọc lẻ.",
      "Dự án xây dựng cầu cảng, công trình cảnh quan sinh thái, resort cao cấp.",
      "Các dự án ODA, công trình vốn ngân sách đòi hỏi nghiêm ngặt về sai số kích thước.",
      "Gia cố hố móng sâu, giếng chìm, công trình ngầm đô thị."
    ],
    advantages: [
      "Cắt đúng 100% kích thước yêu cầu, không gây lãng phí đầu mẩu tại công trường.",
      "Chất lượng đồng đều cao nhờ phân loại thủ công kết hợp máy cắt chuyên dụng.",
      "Tư vấn kỹ thuật thực tế giúp chủ đầu tư tối ưu chi phí vật liệu.",
      "Chiết khấu giá cực tốt cho các nhà thầu lớn và dự án khối lượng dài hạn."
    ],
    packaging: "Đóng bó theo quy cách yêu cầu của khách hàng hoặc bốc trần lên xe tải.",
    images: [
      "/images/products/coc-tre-theo-yeu-cau-1.webp",
      "/images/products/coc-tre-theo-yeu-cau-2.webp",
      "/images/products/coc-tre-theo-yeu-cau-3.webp"
    ],
    featured: true,
    rating: 0,
    reviewCount: 0
  }
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getRelatedProducts(currentSlug: string, limit = 4): Product[] {
  return products.filter((p) => p.slug !== currentSlug).slice(0, limit);
}
