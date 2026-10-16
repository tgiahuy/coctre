import React from "react";
import {
  Warehouse,
  ShieldCheck,
  BadgeDollarSign,
  Truck,
  Wrench,
  HeadphonesIcon
} from "lucide-react";
import SectionHeading from "@/components/common/SectionHeading";

export default function WhyChooseUsSection() {
  const reasons = [
    {
      number: "01",
      title: "Nguồn Nguyên Liệu Chọn Lọc Khắt Khe",
      description: "Tre được thu mua từ các vùng nguyên liệu tre già đạt tiêu chuẩn (tre đực, tre gai đặc ruột), tuổi tre đủ già để đảm bảo không bị mục hay vỡ đầu khi đóng máy.",
      icon: ShieldCheck,
    },
    {
      number: "02",
      title: "Giá Tận Gốc – Không Qua Trung Gian",
      description: "Sở hữu xưởng chế biến và kho bãi trực tiếp tại 331 Phố Vác, Dân Hòa, Hà Nội, mang đến mức giá cạnh tranh nhất thị trường và chiết khấu cực tốt cho đơn lớn.",
      icon: BadgeDollarSign,
    },
    {
      number: "03",
      title: "Năng Lực Cung Ứng Lớn & Nhanh Chóng",
      description: "Kho bãi luôn có sẵn từ hàng chục nghìn đến hàng trăm nghìn cọc. Đội ngũ xe tải đa dạng tải trọng sẵn sàng vận chuyển tận chân công trình ngay khi có lệnh.",
      icon: Warehouse,
    },
    {
      number: "04",
      title: "Minh Bạch & Kiểm Tra Trước Khi Thanh Toán",
      description: "Khách hàng hoàn toàn được kiểm tra chất lượng, đếm số lượng cọc tre trực tiếp tại công trình trước khi tiến hành nghiệm thu và thanh toán.",
      icon: Truck,
    },
    {
      number: "05",
      title: "Đội Ngũ Tư Vấn Am Hiểu Kỹ Thuật",
      description: "Chúng tôi không chỉ bán cọc tre, chúng tôi tư vấn quy cách và mật độ đóng cọc phù hợp nhất với bản vẽ địa chất và móng công trình của bạn.",
      icon: Wrench,
    },
    {
      number: "06",
      title: "Hỗ Trợ Bốc Xếp & Giao Trong Ngày",
      description: "Giao hàng siêu tốc trong ngày tại Hà Nội và các tỉnh lân cận, hỗ trợ bốc dỡ xếp gọn gàng ngay tại hố móng công trường.",
      icon: HeadphonesIcon,
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="GIÁ TRỊ VƯỢT TRỘI"
          title="TẠI SAO BẠN NÊN LỰA CHỌN CỌC TRE HUYỀN DƯƠNG?"
          subtitle="Hơn 30 năm kinh nghiệm từ làng nghề Dân Hòa, mang đến nền móng vững bền cho hàng nghìn công trình."
          alignment="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {reasons.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="relative bg-[#F7F5EF] rounded-2xl p-7 border border-[#E7E3D8] hover:border-[#CDAA63] shadow-sm hover:shadow-xl transition-all duration-300 group hover:-translate-y-1"
              >
                {/* Number Watermark */}
                <div className="absolute top-4 right-5 text-3xl font-black text-gray-300/70 group-hover:text-[#CDAA63]/30 transition-colors">
                  {item.number}
                </div>

                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-[#214E34] text-[#CDAA63] flex items-center justify-center mb-5 group-hover:bg-[#183B27] group-hover:scale-105 transition-all shadow-md">
                  <Icon className="w-6 h-6" />
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-[#18231C] mb-2.5 group-hover:text-[#214E34] transition-colors">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-[#686868] leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
