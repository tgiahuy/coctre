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
      title: "Nguồn Hàng Lớn",
      description: "Kho bãi và nguồn cung ổn định, đáp ứng các đơn hàng dự án lớn từ hàng vạn đến hàng chục vạn cọc.",
      icon: Warehouse,
    },
    {
      number: "02",
      title: "Chất Lượng Đảm Bảo",
      description: "Cọc tre già đực trên 3-5 năm, thân thẳng, thịt dày, vát nhọn 3 cạnh chuẩn, hạn chế tối đa nứt vỡ khi ép máy.",
      icon: ShieldCheck,
    },
    {
      number: "03",
      title: "Giá Tại Bãi Tốt Nhất",
      description: "Khai thác trực tiếp từ rừng Hòa Bình, xuất bán trực tiếp không qua trung gian, chiết khấu hấp dẫn cho nhà thầu.",
      icon: BadgeDollarSign,
    },
    {
      number: "04",
      title: "Giao Tận Chân Công Trình",
      description: "Hệ thống phương tiện vận chuyển đa dạng từ xe 2.5T đến xe 15T, giao hàng xuyên đêm vào tận hố móng ngõ nhỏ.",
      icon: Truck,
    },
    {
      number: "05",
      title: "Tư Vấn Kỹ Thuật Chuyên Sâu",
      description: "Tư vấn chính xác chiều dài và mật độ cọc phù hợp với địa tầng đất bùn và tải trọng từng loại công trình.",
      icon: Wrench,
    },
    {
      number: "06",
      title: "Hỗ Trợ Nhanh Chóng 24/7",
      description: "Tiếp nhận đơn hàng, lập báo giá trong 10 phút, hỗ trợ cấp bù cọc khẩn cấp cho công trường đang đổ bê tông.",
      icon: HeadphonesIcon,
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="GIÁ TRỊ VƯỢT TRỘI"
          title="TẠI SAO NÊN CHỌN CỌC TRE HÒA BÌNH?"
          subtitle="Chúng tôi hiểu rằng chất lượng nền móng quyết định sự vững chãi của cả công trình qua hàng thập kỷ."
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
