export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  project: string;
  avatar: string;
  rating: number;
  content: string;
  date: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Nguyễn Văn Tuấn",
    role: "Chỉ huy trưởng công trình",
    company: "Công ty CP Đầu Tư & Xây Dựng Hạ Tầng Hải Phát",
    project: "Tuyến Tỉnh lộ 489C Nam Định",
    avatar: "/images/avatars/contractor-1.webp",
    rating: 5,
    content: "Đơn vị chúng tôi đã hợp tác với Cọc Tre Hòa Bình qua 4 dự án giao thông lớn. Cọc tre chuyển đến công trường đều tăm tắp, tre đực già đanh, vát nhọn chuẩn nên máy ép cọc thi công rất nhanh, không bị dập toác đầu. Đặc biệt tiến độ giao hàng cực kỳ chuẩn xác ngay cả khi công trường gọi khẩn cấp trong đêm.",
    date: "Tháng 08/2023"
  },
  {
    id: "2",
    name: "Trần Đức Thắng",
    role: "Giám đốc kỹ thuật",
    company: "Công ty TNHH Xây Dựng & San Lấp Nền Móng Hà Nội",
    project: "Cụm nhà xưởng KCN Đồng Văn IV",
    avatar: "/images/avatars/contractor-2.webp",
    rating: 5,
    content: "Giá cọc tre xuất bãi rất cạnh tranh, xuất hóa đơn VAT và hồ sơ lâm sản rõ ràng, đầy đủ thủ tục thanh quyết toán công trình vốn ngân sách và FDI. Cọc tre 2m và 2.5m của bên Hòa Bình có chất lượng thịt tre dày vượt trội so với các mối hàng trôi nổi ngoài thị trường.",
    date: "Tháng 11/2023"
  },
  {
    id: "3",
    name: "Phạm Quốc Hùng",
    role: "Đội trưởng thi công móng ép cọc",
    company: "Đội Thi Công Nền Móng Quốc Hùng",
    project: "Kè sông và cống thoát lũ Phủ Lý",
    avatar: "/images/avatars/contractor-3.webp",
    rating: 5,
    content: "Anh em thợ ép máy rất thích cọc tre của kho Hòa Bình vì thân cọc thẳng, ít mắt thừa, khi gầu máy cuốc dằn xuống cọc cắm ngọt lịm vào tầng đất dẻo. Bó cọc 25 cây buộc gọn gàng, kiểm đếm 1 vạn cọc chỉ mất 15 phút là bàn giao xong.",
    date: "Tháng 02/2024"
  },
  {
    id: "4",
    name: "Lê Minh Trí",
    role: "Chủ thầu xây dựng dân dụng",
    company: "Công ty Tư Vấn Thiết Kế & Xây Dựng Minh Trí (Hà Đông)",
    project: "Khu liền kề biệt thự ven sông Đáy",
    avatar: "/images/avatars/contractor-4.webp",
    rating: 5,
    content: "Các công trình nhà dân 3 - 5 tầng trên đất ao mượn tôi đều tin tưởng gọi cọc tre Hòa Bình. Tư vấn kỹ thuật rất có tâm, đo đạc tầng đất bùn bao nhiêu mét là tư vấn đúng loại cọc 2m hay 2.5m, không vẽ vời phát sinh. Xe tải 3.5 tấn luồn lách vào tận ngõ hẻm.",
    date: "Tháng 04/2024"
  }
];
