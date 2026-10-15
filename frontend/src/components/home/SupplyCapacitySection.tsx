import React from "react";
import Image from "next/image";
import { Warehouse, Trees, Ruler, Truck, MapPin, ReceiptText } from "lucide-react";
import SectionHeading from "@/components/common/SectionHeading";

export default function SupplyCapacitySection() {
  const capabilities = [
    {
      title: "Tổng Kho 5.000m²+",
      desc: "Bãi tập kết quy mô lớn tại Lương Sơn (Hòa Bình) và Lĩnh Nam (Hà Nội), luôn sẵn trên 200.000 cọc.",
      icon: Warehouse,
    },
    {
      title: "Nguồn Cung Chủ Động",
      desc: "Khai thác trực tiếp từ các cánh rừng tre luồng lâu năm, không phụ thuộc đại lý trung gian.",
      icon: Trees,
    },
    {
      title: "Đa Dạng Quy Cách",
      desc: "Đầy đủ kích thước 1.5m, 2m, 2.5m, 3m, 4m và nhận cưa cắt theo chiều dài bản vẽ kỹ thuật.",
      icon: Ruler,
    },
    {
      title: "Đội Xe Vận Tải 24/7",
      desc: "Sở hữu và liên kết hơn 15 xe tải đủ loại tải trọng từ 2.5 tấn luồn ngõ nhỏ đến xe 15 tấn chở đại dự án.",
      icon: Truck,
    },
    {
      title: "Phục Vụ Đa Tỉnh Thành",
      desc: "Giao hàng thần tốc khắp Hà Nội, Nam Định, Ninh Bình, Hà Nam, Hải Dương, Hưng Yên, Bắc Ninh...",
      icon: MapPin,
    },
    {
      title: "Hóa Đơn & Hồ Sơ Đầy Đủ",
      desc: "Cung cấp hóa đơn GTGT (VAT), bảng kê lâm sản hợp pháp, phục vụ nghiệm thu quyết toán công trình.",
      icon: ReceiptText,
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="NĂNG LỰC DOANH NGHIỆP"
          title="SẴN SÀNG ĐÁP ỨNG NHỮNG ĐƠN HÀNG LỚN"
          subtitle="Hệ thống kho bãi rộng lớn và năng lực vận tải chuyên nghiệp giúp chúng tôi đồng hành cùng các nhà thầu lớn nhất miền Bắc."
          alignment="center"
        />

        {/* 6 Capabilities Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {capabilities.map((cap, idx) => {
            const Icon = cap.icon;
            return (
              <div
                key={idx}
                className="flex items-start gap-4 p-5 rounded-2xl bg-[#F7F5EF] border border-[#E7E3D8] hover:border-[#214E34] transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#214E34] text-[#CDAA63] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-sm">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-base text-[#18231C] group-hover:text-[#214E34] transition-colors">
                    {cap.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#686868] mt-1 leading-relaxed">
                    {cap.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Visual Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-md group">
            <Image
              src="/images/products/coc-tre-3m-1.webp"
              alt="Bãi tập kết cọc tre Hòa Bình"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-4">
              <span className="text-xs font-bold text-white">Bãi tập kết cọc tre 5.000m²</span>
            </div>
          </div>

          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-md group">
            <Image
              src="/images/products/coc-tre-2m-2.webp"
              alt="Bó cọc tre xếp gọn gàng"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-4">
              <span className="text-xs font-bold text-white">Xếp bó 25 cây chuẩn quy cách</span>
            </div>
          </div>

          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-md group">
            <Image
              src="/images/projects/du-an-tinh-lo-489c-2.webp"
              alt="Xe tải giao cọc tre tận móng"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-4">
              <span className="text-xs font-bold text-white">Vận chuyển giao tận chân công trình</span>
            </div>
          </div>

          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-md group">
            <Image
              src="/images/projects/du-an-cau-van-duc-2.webp"
              alt="Thi công ép cọc móng bờ sông"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-4">
              <span className="text-xs font-bold text-white">Máy cuốc ép cọc gia cố móng kè</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
