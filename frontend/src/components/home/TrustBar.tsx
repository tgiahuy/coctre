import React from "react";
import { Award, Warehouse, Users, Clock, Globe } from "lucide-react";
import { siteConfig } from "@/data/config";

export default function TrustBar() {
  const stats = [
    {
      value: "12+",
      label: "Năm kinh nghiệm",
      desc: "Khai thác & phân phối cọc tre",
      icon: Award,
    },
    {
      value: "5.000m²+",
      label: "Diện tích kho bãi",
      desc: "Kho Hòa Bình & Hà Nội",
      icon: Warehouse,
    },
    {
      value: "100+",
      label: "Nhân sự & xe tải",
      desc: "Vận chuyển bốc dỡ 24/7",
      icon: Users,
    },
    {
      value: "24/7",
      label: "Hỗ trợ công trình",
      desc: "Tư vấn kỹ thuật tận tâm",
      icon: Clock,
    },
    {
      value: "Toàn Miền Bắc",
      label: "Phạm vi giao hàng",
      desc: "Hà Nội, Nam Định, Hải Dương...",
      icon: Globe,
    },
  ];

  return (
    <div className="bg-[#214E34] text-white border-y border-[#2B6443] shadow-md relative z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-4 divide-y lg:divide-y-0 lg:divide-x divide-[#2E6B48]">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className={`flex flex-col items-center text-center p-3 sm:p-4 group ${
                  idx > 0 && idx % 2 === 0 ? "pt-6 lg:pt-4" : ""
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-[#183B27] text-[#CDAA63] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-inner">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-2xl sm:text-3xl font-black text-white tracking-tight group-hover:text-[#CDAA63] transition-colors">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm font-bold text-[#EED59B] mt-0.5">
                  {stat.label}
                </div>
                <div className="text-[11px] text-gray-300 mt-0.5">
                  {stat.desc}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
