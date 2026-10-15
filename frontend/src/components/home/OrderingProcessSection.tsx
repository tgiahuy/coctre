"use client";

import React from "react";
import { MessageSquareText, FileSpreadsheet, Truck, CheckCheck, ArrowRight, FileText } from "lucide-react";
import SectionHeading from "@/components/common/SectionHeading";
import { useQuoteModal } from "@/context/QuoteModalContext";

export default function OrderingProcessSection() {
  const { openQuoteModal } = useQuoteModal();

  const steps = [
    {
      step: "01",
      title: "Gửi Nhu Cầu",
      desc: "Quý khách gửi kích thước cọc, số lượng dự kiến và địa điểm công trình qua Form/Zalo/Hotline.",
      icon: MessageSquareText,
    },
    {
      step: "02",
      title: "Tư Vấn Kỹ Thuật",
      desc: "Kỹ sư tư vấn chủng loại cọc tre (1.5m - 4m) và phương án xe vận chuyển phù hợp địa hình.",
      icon: CheckCheck,
    },
    {
      step: "03",
      title: "Nhận Báo Giá",
      desc: "Nhận bảng báo giá chi tiết gồm đơn giá tại bãi + cước vận chuyển đến tận chân hố móng.",
      icon: FileSpreadsheet,
    },
    {
      step: "04",
      title: "Giao Công Trình",
      desc: "Bốc xếp, vận chuyển đúng giờ hẹn, kiểm đếm bó cọc thực tế và bàn giao hóa đơn biên bản.",
      icon: Truck,
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#18231C] text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          eyebrow="QUY TRÌNH HỢP TÁC"
          title="QUY TRÌNH ĐẶT CỌC TRE NHANH CHÓNG"
          subtitle="4 bước đơn giản từ khi tiếp nhận thông tin đến khi cọc tre được hạ an toàn tại chân công trình của bạn."
          alignment="center"
          theme="dark"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 relative">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-[#212E26] rounded-2xl p-6 border border-[#2F4436] hover:border-[#CDAA63] transition-all duration-300 relative group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-[#214E34] text-[#CDAA63] flex items-center justify-center font-bold text-lg border border-[#3A5744]">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-3xl font-black text-[#CDAA63]/40 group-hover:text-[#CDAA63] transition-colors">
                      {item.step}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#CDAA63] transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-[#2A3A2F] text-[11px] text-[#CDAA63] font-semibold flex items-center gap-1">
                  <span>Bước {idx + 1} của quy trình</span>
                  <ArrowRight className="w-3 h-3 ml-auto" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Button */}
        <div className="mt-12 text-center">
          <button
            onClick={() => openQuoteModal()}
            className="px-8 py-4 bg-[#E57C23] hover:bg-[#CC6914] text-white font-extrabold text-sm sm:text-base rounded-xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-0.5 inline-flex items-center gap-2 cursor-pointer"
          >
            <FileText className="w-5 h-5" />
            <span>YÊU CẦU BÁO GIÁ NGAY BÂY GIỜ</span>
          </button>
        </div>
      </div>
    </section>
  );
}
