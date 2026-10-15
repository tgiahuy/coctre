export interface Article {
  id: string;
  slug: string;
  title: string;
  category: "Kỹ thuật thi công" | "Kinh nghiệm chọn cọc" | "Kiến thức nền móng" | "Tin công trình";
  coverImage: string;
  publishDate: string;
  author: string;
  readTime: string;
  excerpt: string;
  tableOfContents: {
    id: string;
    text: string;
  }[];
  content: string; // Markdown or rich HTML-like paragraphs
  tags: string[];
  featured?: boolean;
}

export const articles: Article[] = [
  {
    id: "ky-thuat-dong-coc-tre-gia-co-mong-chuan-tcvn",
    slug: "ky-thuat-dong-coc-tre-gia-co-mong-chuan-tcvn",
    title: "Quy Trình & Kỹ Thuật Đóng Cọc Tre Gia Cố Nền Móng Chuẩn TCVN 9361:2012",
    category: "Kỹ thuật thi công",
    coverImage: "/images/blog/ky-thuat-dong-coc-tre.webp",
    publishDate: "2024-03-15",
    author: "Kỹ sư Kết cấu Vũ Hải Nam",
    readTime: "7 phút đọc",
    excerpt: "Hướng dẫn chi tiết quy trình đóng cọc tre bằng máy cuốc và búa rung, tiêu chuẩn khoảng cách mật độ 25 cọc/m², và cách xử lý đầu cọc tránh dập vỡ.",
    tableOfContents: [
      { id: "tong-quan", text: "1. Nguyên lý gia cố nền móng bằng cọc tre" },
      { id: "dieu-kien-ap-dung", text: "2. Điều kiện địa chất bắt buộc khi dùng cọc tre" },
      { id: "mat-do-dong-coc", text: "3. Mật độ đóng cọc tre tiêu chuẩn (cọc/m²)" },
      { id: "quy-trinh-thi-cong", text: "4. Quy trình thi công ép cọc 5 bước chuẩn kỹ thuật" },
      { id: "luu-y-nghiem-thu", text: "5. Các lưu ý quan trọng trong nghiệm thu móng cọc tre" }
    ],
    content: `## 1. Nguyên lý gia cố nền móng bằng cọc tre
Gia cố nền đất yếu bằng cọc tre là giải pháp truyền thống lâu đời nhưng mang lại hiệu quả kinh tế và kỹ thuật rất cao trong xây dựng dân dụng, thủy lợi và giao thông. Khi đóng cọc tre xuống đất bùn yếu, cọc tre thực hiện hai nhiệm vụ cốt lõi:
- **Đầm chặt khối đất:** Cọc chiếm chỗ trong lòng đất làm giảm hệ số rỗng, ép nước ngầm thoát ra ngoài và tăng góc ma sát trong của lớp đất.
- **Tạo thành khối móng composite liên hợp:** Tập hợp hàng trăm cọc tre đan kết cùng khối đất bùn và lớp đệm cát sỏi bên trên tạo thành một khối móng bè vững chắc, tăng khả năng chịu tải của đất từ 0.5 kg/cm² lên đến 1.2 – 1.5 kg/cm².

## 2. Điều kiện địa chất bắt buộc khi dùng cọc tre
Cọc tre chỉ phát huy độ bền vĩnh cửu khi và chỉ khi:
- **Ngập hoàn toàn dưới mực nước ngầm thấp nhất:** Trong môi trường ngập nước yếm khí (không có oxy), vi khuẩn và nấm phá hoại xenlulozo không thể tồn tại. Cọc tre có thể bền vững trên 50 – 70 năm.
- **Không dùng ở vùng đất khô cằn hoặc mực nước ngầm dao động lớn:** Nếu cọc tre bị chu kỳ ướt - khô xen kẽ, tre sẽ nhanh chóng bị mục ải trong vòng 2-3 năm.

## 3. Mật độ đóng cọc tre tiêu chuẩn (cọc/m²)
Theo kinh nghiệm thiết kế và tiêu chuẩn xây dựng:
- Mật độ phổ biến nhất là **25 cọc/m²** (khoảng cách tâm cọc cách tâm cọc là **20cm x 20cm** hoặc **22cm x 22cm** theo hình mắt cáo so le).
- Với nền đất cực yếu bùn nhão, mật độ có thể tăng lên **36 cọc/m²** (khoảng cách cọc 16cm - 18cm).
- Không nên đóng quá dày (> 40 cọc/m²) vì sẽ gây hiện tượng trồi đất và đẩy các cọc xung quanh bật lên.

## 4. Quy trình thi công ép cọc 5 bước chuẩn kỹ thuật
- **Bước 1: Đào hố móng đến cao trình thiết kế:** Đào sâu hơn cao trình đáy móng khoảng 20-30cm để chừa chỗ cho lớp đệm cát lót.
- **Bước 2: Chuẩn bị cọc tre đạt chuẩn:** Cọc phải là tre già đực, thân thẳng, đã được vát nhọn 3 cạnh dài 15-20cm ở đầu cắm và cắt phẳng vuông góc ở đầu đóng.
- **Bước 3: Hướng đóng cọc:** Thi công đóng từ **ngoài viền vào trong tâm móng** hoặc từ chỗ sâu đến chỗ nông để gom bùn nén chặt dần.
- **Bước 4: Sử dụng thiết bị ép phù hợp:** Khuyến khích dùng máy đào bánh xích có gắn gầu phẳng hoặc búa rung thủy lực. Ép thẳng đứng vuông góc 90 độ so với đáy móng.
- **Bước 5: Chặt đầu cọc dập và rải đệm cát:** Sau khi ép xong, chặt bỏ phần đầu cọc bị dập nát (nếu có), rải lớp vải địa kỹ thuật và đổ cát vàng đầm chặt dày 15-20cm trước khi đổ bê tông lót.

## 5. Các lưu ý quan trọng trong nghiệm thu móng cọc tre
Tư vấn giám sát cần kiểm tra:
1. Độ sâu cắm cọc có chạm lớp đất chịu lực hay không.
2. Cao độ đầu cọc phải thấp hơn mực nước ngầm tối thiểu.
3. Số lượng cọc thực tế nghiệm thu trên diện tích hố móng.`,
    tags: ["Kỹ thuật thi công", "TCVN 9361:2012", "Đóng cọc tre", "Nền móng"],
    featured: true
  },
  {
    id: "kinh-nghiem-chon-coc-tre-gia-chat-luong",
    slug: "kinh-nghiem-chon-coc-tre-gia-chat-luong",
    title: "Kinh Nghiệm Phân Biệt Cọc Tre Già Đực Chuẩn Công Trình Tránh Bị Nứt Toác",
    category: "Kinh nghiệm chọn cọc",
    coverImage: "/images/blog/kinh-nghiem-chon-coc-tre.webp",
    publishDate: "2024-02-28",
    author: "Chuyên gia Lâm sản Nguyễn Văn Hòa",
    readTime: "5 phút đọc",
    excerpt: "Cách nhận biết tre già trên 4 năm tuổi qua màu vỏ, vân mắt, độ dày thịt tre và tiếng gõ âm thanh, giúp chủ thầu không mua phải tre non phế phẩm.",
    tableOfContents: [
      { id: "nhan-biet-ngoai-quan", text: "1. Nhận biết cọc tre già qua màu sắc vỏ ngoài" },
      { id: "do-day-thit-tre", text: "2. Kiểm tra độ dày thịt tre và ruột cọc" },
      { id: "am-thanh-go", text: "3. Nghe tiếng gõ kiểm tra độ đanh của thân cọc" },
      { id: "tre-duc-vs-tre-cai", text: "4. Tại sao công trình nên ưu tiên chọn tre đực?" },
      { id: "luu-kho-bao-quan", text: "5. Cách bảo quản cọc tre tại bãi công trường" }
    ],
    content: `## 1. Nhận biết cọc tre già qua màu sắc vỏ ngoài
Tre già đạt tuổi khai thác từ 4 - 6 năm tuổi sẽ có lớp vỏ ngoài màu xanh lục sẫm ánh vàng hoặc phủ một lớp phấn xám mốc tự nhiên. Ngược lại, tre non thường có màu xanh nõn chuối bóng loáng, vỏ mỏng và mềm.

## 2. Kiểm tra độ dày thịt tre và ruột cọc
Khi cắt ngang cọc tre già, thịt tre rất dày, chiếm từ 60% đến 80% bán kính thân cọc đối với đoạn gốc. Phần ruột rỗng (lòng ống) rất nhỏ. Các sợi xơ tre đan xen dày đặc, màu vàng ngà chắc nịch.

## 3. Nghe tiếng gõ kiểm tra độ đanh của thân cọc
Dùng một thanh sắt hoặc thân tre gõ nhẹ vào thân cọc:
- **Cọc tre già:** Phát ra âm thanh đanh, vang dội như gõ vào khúc gỗ lim.
- **Cọc tre non hoặc bị ải rỗng:** Phát ra âm thanh trầm đục, bồm bộp.

## 4. Tại sao công trình nên ưu tiên chọn tre đực?
Tre đực là những cây tre mọc từ thân ngầm đơn lẻ, có lóng ngắn, mắt dày, thân thẳng và thịt đặc hơn hẳn tre cái. Khi ép cọc bằng máy múc tải trọng 15 - 20 tấn, tre đực chịu nén dọc cực tốt và hầu như không bị toác dọc thân cây.

## 5. Cách bảo quản cọc tre tại bãi công trường
Nếu cọc tre chưa thi công ngay trong vài ngày:
- Tập kết tại nơi râm mát hoặc dùng bạt phủ kín.
- Tưới nước ẩm định kỳ giữ cho cọc luôn tươi dẻo. Tránh phơi nắng gắt làm tre khô giòn dẫn đến dễ nứt khi đóng.`,
    tags: ["Kinh nghiệm", "Cọc tre già", "Tre luồng", "Chất lượng cọc"],
    featured: true
  },
  {
    id: "so-sanh-mong-coc-tre-va-coc-be-tong",
    slug: "so-sanh-mong-coc-tre-va-coc-be-tong",
    title: "So Sánh Móng Cọc Tre & Cọc Bê Tông: Khi Nào Nên Sử Dụng Giải Pháp Nào?",
    category: "Kiến thức nền móng",
    coverImage: "/images/blog/so-sanh-coc-tre-be-tong.webp",
    publishDate: "2024-01-20",
    author: "Kỹ sư Kết cấu Lê Văn Thắng",
    readTime: "6 phút đọc",
    excerpt: "Phân tích bài toán kinh tế - kỹ thuật giữa móng cọc tre và cọc ép bê tông cốt thép, bảng so sánh chi phí, tải trọng và tính ứng dụng thực tế.",
    tableOfContents: [
      { id: "bang-so-sanh", text: "1. Bảng so sánh tổng quan cọc tre vs cọc bê tông" },
      { id: "uu-diem-coc-tre", text: "2. Ưu thế vượt trội của cọc tre cho nhà thấp tầng" },
      { id: "truong-hop-ap-dung", text: "3. Khi nào bắt buộc phải dùng cọc bê tông?" },
      { id: "bai-toan-chi-phi", text: "4. Bài toán tối ưu hóa chi phí cho chủ đầu tư" }
    ],
    content: `## 1. Bảng so sánh tổng quan cọc tre vs cọc bê tông
- **Chi phí vật tư & nhân công:** Cọc tre rẻ hơn từ **50% - 70%** so với cọc bê tông cốt thép.
- **Tính cơ động mặt bằng:** Cọc tre có thể vận chuyển vào mọi ngõ ngách chật hẹp, phố cổ, bờ kênh mà xe ép cọc bê tông không thể vào được.
- **Khả năng chịu tải:** Cọc tre phù hợp cho công trình tải trọng vừa và nhỏ (nhà 1-4 tầng, đường nội bộ, bờ kè), cọc bê tông phục vụ nhà cao tầng > 5 tầng.
- **Yêu cầu môi trường:** Cọc tre cần môi trường ngập nước ngầm để đạt tuổi thọ tối đa, cọc bê tông không phụ thuộc mực nước.

## 2. Ưu thế vượt trội của cọc tre cho nhà thấp tầng
Với các công trình dân dụng quy mô dưới 4 tầng xây trên nền đất ruộng, ao bùn ven sông có mực nước ngầm cao quanh năm, việc sử dụng cọc tre kết hợp móng bè móng băng là giải pháp vừa an toàn tuyệt đối vừa tiết kiệm hàng trăm triệu đồng chi phí móng.

## 3. Khi nào bắt buộc phải dùng cọc bê tông?
- Công trình có tải trọng thẳng đứng quá lớn (> 5 tầng, móng trụ cầu lớn).
- Địa tầng có lớp bùn quá dày (> 6m) mà cọc tre không thể xuyên tới tầng đất chịu lực tốt.
- Mực nước ngầm xuống quá sâu (> 3m so với đáy móng) khiến cọc tre bị khô.

## 4. Bài toán tối ưu hóa chi phí cho chủ đầu tư
Việc khảo sát địa chất kỹ lưỡng trước khi quyết định phương án móng giúp chủ đầu tư lựa chọn đúng vật liệu, tránh lãng phí chi phí đầu tư móng cọc bê tông không cần thiết.`,
    tags: ["So sánh", "Nền móng", "Chi phí xây dựng", "Cọc bê tông"],
    featured: false
  }
];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getRelatedArticles(currentSlug: string, limit = 3): Article[] {
  return articles.filter((a) => a.slug !== currentSlug).slice(0, limit);
}
