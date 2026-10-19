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
    excerpt: "Hướng dẫn chi tiết quy trình đóng cọc tre bằng máy cuốc và búa rung, tiêu chuẩn mật độ 25 cọc/m² và xử lý đầu cọc ngập nước.",
    tableOfContents: [
      { id: "nguyen-ly", text: "1. Nguyên lý gia cố nền móng bằng cọc tre" },
      { id: "tieu-chuan-chon-coc", text: "2. Tiêu chuẩn chọn cọc tre công trình" },
      { id: "quy-trinh-thi-cong", text: "3. Quy trình thi công ép và đóng cọc" },
      { id: "luu-y-quan-trong", text: "4. Lưu ý quan trọng khi nghiệm thu móng" },
    ],
    content: `## 1. Nguyên lý gia cố nền móng bằng cọc tre

Gia cố nền đất yếu bằng cọc tre là giải pháp truyền thống lâu đời nhưng mang lại hiệu quả kinh tế và kỹ thuật rất cao trong xây dựng công trình dân dụng, nhà xưởng và công trình thủy lợi.

### Tiêu chuẩn kỹ thuật áp dụng
Theo TCVN 9361:2012, cọc tre được sử dụng để nén chặt các lớp đất dính yếu (bùn sét, cát pha bùn) có mực nước ngầm cao. Cọc tre chỉ bền lâu khi luôn nằm trong môi trường bão hòa nước ngầm hoặc bùn yếm khí.

## 2. Tiêu chuẩn chọn cọc tre công trình
- Tre dùng làm cọc phải là tre đực già (từ 3-5 năm tuổi), đặc thịt ruột nhỏ.
- Thân cọc thẳng, độ cong không vượt quá 1cm trên 1m chiều dài cọc.
- Không bị dập vỡ đầu cọc, không nứt toác dọc thân hay bị mối mọt xâm nhập.
- Đường kính gốc từ 60mm đến 110mm tùy quy cách thiết kế tải trọng.

## 3. Quy trình thi công ép và đóng cọc
1. Đào hố móng đến cao trình thiết kế đáy đài móng.
2. Bố trí lưới cọc theo mật độ quy định (thường từ 25 cọc/m² theo hình xoắn ốc từ ngoài vào trong để nén chặt đất).
3. Ép cọc bằng gầu máy đào hoặc búa rung có đệm đầu cọc bằng gỗ để tránh dập đầu cọc tre.
4. Sau khi đóng đủ chiều sâu, cưa phẳng đầu cọc và trải lớp cát đệm 10-15cm trước khi đổ bê tông lót móng.

## 4. Lưu ý quan trọng khi nghiệm thu móng
Đầu cọc tre bắt buộc phải nằm dưới mực nước ngầm thấp nhất trong năm. Nếu đầu cọc tiếp xúc với không khí khô hoặc ngập - khô xen kẽ, cọc sẽ nhanh chóng bị mục ải trong vòng 2-3 năm.`,
    tags: ["Cọc tre", "Kỹ thuật thi công", "Nền móng", "TCVN 9361"],
    featured: true,
  },
  {
    id: "kinh-nghiem-chon-coc-tre-gia-dac-ruot-chat-luong",
    slug: "kinh-nghiem-chon-coc-tre-gia-dac-ruot-chat-luong",
    title: "Kinh Nghiệm Chọn Mua Cọc Tre Già Đặc Ruột Không Bị Vỡ Đầu Khi Đóng",
    category: "Kinh nghiệm chọn cọc",
    coverImage: "/images/blog/kinh-nghiem-chon-coc-tre.webp",
    publishDate: "2024-04-02",
    author: "Chuyên viên Vật liệu Nguyễn Văn Dương",
    readTime: "5 phút đọc",
    excerpt: "Cách phân biệt cọc tre đực già Hòa Bình với tre non, tre xốp xơ giúp nhà thầu không bị hao hụt đầu cọc khi thi công cơ giới.",
    tableOfContents: [
      { id: "tai-sao-vo-dau", text: "1. Tại sao cọc tre bị dập đầu khi đóng máy?" },
      { id: "dau-hieu-tre-gia", text: "2. Dấu hiệu nhận biết tre đực già chất lượng cao" },
      { id: "kiem-tra-khi-giao-hang", text: "3. Các bước kiểm tra nghiệm thu tại chân công trình" },
    ],
    content: `## 1. Tại sao cọc tre bị dập đầu khi đóng máy?

Nhiều nhà thầu phản ánh cọc mua về khi ép bằng máy cuốc thường bị toác đầu, nứt dọc thân khiến lãng phí chi phí nhân công và vật tư. Nguyên nhân 90% là do mua phải cọc tre non (tre chưa đủ tuổi) hoặc tre ngâm quá lâu bị mủn xơ.

## 2. Dấu hiệu nhận biết tre đực già chất lượng cao
- **Màu sắc vỏ:** Vỏ tre vàng óng hoặc xanh đậm có lớp phấn xám tự nhiên, đốt tre dày và mắt tre nổi rõ.
- **Độ dày thịt tre:** Lớp cùi thịt tre dày từ 12-18mm, ống ruột nhỏ hẹp đặc quánh.
- **Độ già khai thác:** Tre phải đạt từ 4 năm tuổi trở lên khai thác từ các vùng núi đá vôi Hòa Bình có thớ gỗ dẻo đanh chắc chắn.

## 3. Các bước kiểm tra nghiệm thu tại chân công trình
Khi xe chở cọc đến công trình, chỉ huy trưởng hoặc cán bộ kỹ thuật cần bốc ngẫu nhiên 3-5 bó để kiểm tra:
1. Đo đường kính gốc và ngọn bằng thước kẹp hoặc thước dây.
2. Kiểm tra vết cắt đầu cọc xem có vết nứt chân chim hay không.
3. Cọc phải được vát nhọn sẵn 3-4 cạnh đều đặn để dễ dàng cắm sâu vào tầng đất móng.`,
    tags: ["Kinh nghiệm chọn cọc", "Cọc tre Hòa Bình", "Vật liệu xây dựng"],
    featured: true,
  },
  {
    id: "so-sanh-mong-coc-tre-va-coc-be-tong-cot-thep",
    slug: "so-sanh-mong-coc-tre-va-coc-be-tong-cot-thep",
    title: "So Sánh Hiệu Quả Kinh Tế Giữa Móng Cọc Tre Và Cọc Bê Tông Cốt Thép",
    category: "Kiến thức nền móng",
    coverImage: "/images/blog/so-sanh-coc-tre-be-tong.webp",
    publishDate: "2024-04-20",
    author: "Kỹ sư Kết cấu Lê Thanh Tùng",
    readTime: "6 phút đọc",
    excerpt: "Phân tích chi phí thực tế và phạm vi ứng dụng thích hợp giữa phương án cọc tre truyền thống và cọc bê tông đúc sẵn cho nhà phố 2-4 tầng.",
    tableOfContents: [
      { id: "bai-toan-chi-phi", text: "1. Bài toán chi phí trên mỗi mét vuông nền móng" },
      { id: "uu-the-ngo-nho", text: "2. Ưu thế vượt trội của cọc tre ở ngõ nhỏ đô thị" },
      { id: "khi-nao-dung-be-tong", text: "3. Khi nào bắt buộc phải dùng cọc bê tông?" },
    ],
    content: `## 1. Bài toán chi phí trên mỗi mét vuông nền móng

Với các công trình nhà ở gia đình dưới 4 tầng xây trên đất ao, ruộng san lấp có mực nước ngầm cao quanh năm, móng cọc tre có chi phí chỉ bằng 1/3 đến 1/4 so với cọc bê tông cốt thép đúc sẵn.

## 2. Ưu thế vượt trội của cọc tre ở ngõ nhỏ đô thị
Xe cẩu bê tông và giàn ép tĩnh tải trọng lớn không thể vào các ngõ hẻm phố cổ hoặc đường làng hẹp dưới 2.5m. Cọc tre vận chuyển linh hoạt bằng xe tải nhẹ, bốc xếp thủ công nhanh gọn và thi công ép dễ dàng bằng máy cuốc mini hoặc búa rung cầm tay.

## 3. Khi nào bắt buộc phải dùng cọc bê tông?
- Nhà cao từ 5 tầng trở lên hoặc công trình có tầng hầm sâu chịu tải trọng đứng và mô-men uốn lớn.
- Địa chất không có mực nước ngầm thường xuyên (đất đồi dốc khô cằn, sỏi sạn).
- Công trình cần truyền tải trọng xuống tầng đá gốc sâu trên 15-20m.`,
    tags: ["Kiến thức nền móng", "Chi phí xây dựng", "Nhà phố"],
    featured: false,
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getRelatedArticles(currentSlug: string, limit = 3): Article[] {
  return articles.filter((a) => a.slug !== currentSlug).slice(0, limit);
}
