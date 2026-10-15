export interface ProductReview {
  id: string;
  productId: string;
  author: string;
  company?: string;
  rating: number;
  date: string;
  comment: string;
  verified?: boolean;
}

export const initialReviews: ProductReview[] = [
  {
    id: "r1",
    productId: "coc-tre-2m",
    author: "Nguyễn Văn Hùng",
    company: "Xây Dựng Nam Cường",
    rating: 5,
    date: "12/03/2024",
    comment: "Cọc tre 2m rất già và thẳng, giao đúng hẹn cho công trình móng bè 4 tầng ở Hoài Đức. Bó cọc đều, không có cọc non hay nứt.",
    verified: true
  },
  {
    id: "r2",
    productId: "coc-tre-2m",
    author: "Bùi Tuấn Anh",
    company: "Đội thi công móng Thanh Trì",
    rating: 5,
    date: "28/02/2024",
    comment: "Hàng chất lượng, đầu vát nhọn 3 cạnh ép xuống đất rất êm. Đã lấy hơn 15.000 cọc của bên này, giá cả hợp lý.",
    verified: true
  },
  {
    id: "r3",
    productId: "coc-tre-25m",
    author: "Đặng Văn Lâm",
    company: "Nhà thầu cầu đường Hải Hưng",
    rating: 5,
    date: "05/01/2024",
    comment: "Cọc 2.5m thân to chắc, đường kính gốc đạt 8-9cm. Bên tư vấn giám sát đo kiểm tra đạt 100% yêu cầu kỹ thuật hồ sơ thầu.",
    verified: true
  },
  {
    id: "r4",
    productId: "coc-tre-3m",
    author: "Hoàng Minh Quân",
    company: "Công ty CP Thủy Lợi Sông Hồng",
    rating: 5,
    date: "18/12/2023",
    comment: "Đã lấy 30.000 cọc tre 3m cho dự án kè đê sông. Cọc luồng già đanh, chuyển xe ben 3 chân tới công trường nhanh gọn.",
    verified: true
  },
  {
    id: "r5",
    productId: "coc-tre-15m",
    author: "Trần Trọng Nghĩa",
    company: "Nhà thầu dân dụng Gia Lâm",
    rating: 5,
    date: "20/02/2024",
    comment: "Cọc tre 1.5m nhỏ gọn nhưng thịt dày, chuyên dùng lót rãnh móng và hố ga rất tiện, giá rẻ hơn các bên khác.",
    verified: true
  },
  {
    id: "r6",
    productId: "coc-tre-4m",
    author: "Lê Đức Long",
    company: "Công ty Xây Dựng Cầu Cảng 1",
    rating: 5,
    date: "14/01/2024",
    comment: "Cọc 4m chuẩn kích thước, cọc tre gốc to khủng, chịu lực dằn máy cuốc 0.8m³ không hề bị dập.",
    verified: true
  }
];
