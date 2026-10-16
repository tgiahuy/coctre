import React from "react";
import Image from "next/image";
import { siteConfig } from "@/data/config";

export default function AboutSection() {
  return (
    <section className="py-12 sm:py-16 bg-white" id="gioi-thieu">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* SECTION HEADER: VỀ CHÚNG TÔI with horizontal rule */}
        <div className="border-b border-gray-300 pb-2 mb-8 sm:mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-[#1F4E3D] uppercase tracking-wide">
            VỀ CHÚNG TÔI
          </h2>
        </div>

        {/* 2-ROW ALTERNATING LAYOUT AS IN THE REFERENCE SCREENSHOT */}
        <div className="space-y-10 sm:space-y-14">
          
          {/* ROW 1: TEXT (GIỚI THIỆU & GIÁ TRỊ CỐT LÕI) ON LEFT | IMAGE ON RIGHT */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Left Content */}
            <div className="space-y-6 text-gray-700 leading-relaxed text-sm sm:text-[14.5px]">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-[#1F4E3D] uppercase mb-2.5">
                  GIỚI THIỆU VỀ CÔNG TY
                </h3>
                <p className="text-gray-600 font-normal leading-relaxed text-justify">
                  Hoạt động từ năm 1990 tại làng nghề Dân Hòa (Hà Nội), <strong>{siteConfig.legalName}</strong> tự hào có hơn 30 năm kinh nghiệm chuyên cung cấp cọc tre công trình và giải pháp gia cố nền móng tại miền Bắc. Sở hữu kho bãi quy mô lớn cùng hệ thống xe vận chuyển tận chân công trình, chúng tôi là đối tác tin cậy của hàng trăm nhà thầu và công trình dân dụng. Mỗi cọc tre Huyền Dương cung cấp là một lời cam kết về độ bền vững, giá tận xưởng và giao hàng siêu tốc trong ngày.
                </p>
              </div>

              <div>
                <h3 className="text-base sm:text-lg font-bold text-[#1F4E3D] uppercase mb-2.5">
                  GIÁ TRỊ CỐT LÕI
                </h3>
                <ul className="space-y-2 list-disc pl-5 text-gray-600 text-justify marker:text-gray-500">
                  <li>
                    <strong className="text-gray-900">CHẤT LƯỢNG :</strong> Chỉ cung cấp tre già, tươi, thân thẳng, không mối mọt, cong vênh. Đảm bảo khả năng chịu lực vượt trội dưới lòng đất.
                  </li>
                  <li>
                    <strong className="text-gray-900">TỐC ĐỘ:</strong> &ldquo;Hàng sẵn kho - Giao trong ngày&rdquo;. Chúng tôi hiểu rằng trong xây dựng, tiến độ là vàng bạc.
                  </li>
                  <li>
                    <strong className="text-gray-900">UY TÍN:</strong> Đếm đủ số lượng, đúng quy cách đường kính và chiều dài theo hợp đồng. Nói không với việc pha tạp tre non, tre mục.
                  </li>
                  <li>
                    <strong className="text-gray-900">TẬN TÂM:</strong> Luôn tư vấn giải pháp tối ưu nhất cho khách hàng, hỗ trợ bốc xếp và vận chuyển tận chân công trình.
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100 shadow-sm border border-gray-100">
              <Image
                src="/images/banner/bamboo-vertical.jpg"
                alt="Rừng tre già nguyên liệu cọc tre Huyền Dương"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>

          {/* ROW 2: IMAGE ON LEFT | TEXT (SỨ MỆNH) ON RIGHT */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Left Image (Desktop: Col 1, Mobile: order-2) */}
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100 shadow-sm border border-gray-100 order-2 lg:order-1">
              <Image
                src="/images/banner/bamboo-sunlight.jpg"
                alt="Tre tự nhiên thân thiện môi trường"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            {/* Right Content (Desktop: Col 2, Mobile: order-1) */}
            <div className="space-y-3 text-gray-700 leading-relaxed text-sm sm:text-[14.5px] order-1 lg:order-2">
              <h3 className="text-base sm:text-lg font-bold text-[#1F4E3D] uppercase mb-2.5">
                SỨ MỆNH
              </h3>
              <ul className="space-y-3 list-disc pl-5 text-gray-600 text-justify marker:text-gray-500">
                <li>
                  <strong className="text-gray-900">Đối với công trình:</strong> Mang đến giải pháp gia cố nền móng hiệu quả, an toàn và tiết kiệm chi phí tối đa cho các công trình xây dựng dân dụng cũng như công nghiệp.
                </li>
                <li>
                  <strong className="text-gray-900">Đối với khách hàng &amp; Đối tác:</strong> Cung cấp nguồn vật liệu cọc tre đạt chuẩn, đáp ứng đúng tiến độ thi công, làm việc với tinh thần trung thực, trách nhiệm và tôn trọng cam kết.
                </li>
                <li>
                  <strong className="text-gray-900">Đối với môi trường &amp; Tự nhiên:</strong> Khai thác và sử dụng hiệu quả nguồn nguyên liệu tre tự nhiên – giải pháp xây dựng xanh thân thiện với môi trường, góp phần phát triển kinh tế sinh thái bền vững.
                </li>
                <li>
                  <strong className="text-gray-900">{siteConfig.legalName}</strong> luôn chú trọng việc đổi mới công nghệ khai thác, phân loại nghiêm ngặt và hỗ trợ vận chuyển tận chân công trình trong ngày.
                </li>
                <li>
                  Tất cả các mục tiêu trên nhằm nâng cao giá trị bền vững cho công trình của khách hàng, đem lại sự an tâm, tin tưởng tuyệt đối và đóng góp vào sự phồn vinh của xã hội.
                </li>
              </ul>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
