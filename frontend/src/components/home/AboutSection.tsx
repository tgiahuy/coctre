import React from "react";
import Image from "next/image";
import { siteConfig } from "@/data/config";

export default function AboutSection() {
  return (
    <section className="py-14 sm:py-20 bg-white" id="gioi-thieu">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14 sm:space-y-18">
        
        {/* ROW 1: GIỚI THIỆU VỀ CÔNG TY & GIÁ TRỊ CỐT LÕI */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Text */}
          <div className="lg:col-span-6 space-y-6 text-gray-700 leading-relaxed text-sm sm:text-base">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-[#1F4E3D] tracking-tight uppercase mb-4">
                GIỚI THIỆU VỀ CÔNG TY
              </h2>
              <p className="text-gray-600 font-normal leading-relaxed text-justify">
                <strong>{siteConfig.legalName}</strong> là một trong những công ty đi tiên phong trong lĩnh vực cung cấp các sản phẩm về tre. Với phương châm làm việc: <em>&ldquo;Luôn luôn sáng tạo, chuyên nghiệp và có tinh thần trách nhiệm cao&rdquo;</em>, công ty luôn cố gắng nỗ lực để mang đến những sản phẩm chất lượng cao nhất, đáp ứng trọn vẹn nhu cầu của quý khách hàng.
              </p>
            </div>

            <div className="pt-2">
              <h3 className="text-xl sm:text-2xl font-black text-[#1F4E3D] tracking-tight uppercase mb-4">
                GIÁ TRỊ CỐT LÕI
              </h3>
              <ul className="space-y-3 list-disc pl-5 text-gray-600 text-justify">
                <li>
                  <strong className="text-gray-900">Định hướng khách hàng:</strong> Nắm bắt và đáp ứng hoàn hảo nhu cầu của khách hàng bằng việc cung cấp các sản phẩm và dịch vụ phù hợp với từng đối tượng khách hàng.
                </li>
                <li>
                  <strong className="text-gray-900">Phương châm làm việc:</strong> Luôn luôn sáng tạo, chuyên nghiệp và có tinh thần trách nhiệm cao.
                </li>
                <li>
                  <strong className="text-gray-900">Chất lượng:</strong> Là yếu tố quan trọng nhất cho sự tồn tại và phát triển của công ty, áp dụng hệ thống kiểm tra chất lượng nghiêm ngặt và luôn đề cao yếu tố chất lượng tại mọi sản phẩm và mọi thời điểm.
                </li>
              </ul>
            </div>
          </div>

          {/* Right Image */}
          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border border-gray-100 group">
              <Image
                src="/images/banner/bamboo-vertical.jpg"
                alt="Rừng tre già nguyên liệu Hòa Bình"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>

        {/* ROW 2: SỨ MỆNH */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Image */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border border-gray-100 group">
              <Image
                src="/images/banner/hero-bg.jpg"
                alt="Khát vọng cống hiến và phát triển lâm sản"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>

          {/* Right Text */}
          <div className="lg:col-span-6 order-1 lg:order-2 space-y-4 text-gray-700 leading-relaxed text-sm sm:text-base">
            <h2 className="text-2xl sm:text-3xl font-black text-[#1F4E3D] tracking-tight uppercase mb-4">
              SỨ MỆNH
            </h2>
            <ul className="space-y-3.5 list-disc pl-5 text-gray-600 text-justify">
              <li>
                <strong>{siteConfig.legalName}</strong> nơi hội tụ của những trái tim trẻ tuổi đầy nhiệt huyết, nơi tập hợp những con người với bản lĩnh nghề nghiệp, tài năng và tri thức luôn được trau dồi và luôn phấn đấu vươn lên đỉnh cao.
              </li>
              <li>
                Nơi mà mọi người ở đó luôn được tự hào cống hiến hết mình cho xã hội, được đóng góp cho đời những sản phẩm chất lượng cao; nơi luôn mang lại sự hài lòng và tin tưởng cao nhất cho khách hàng của mình.
              </li>
              <li>
                Công ty luôn chú trọng việc sáng tạo và đổi mới công nghệ.
              </li>
              <li>
                Luôn nỗ lực hết mình để cung cấp cho khách hàng những sản phẩm với chất lượng tốt nhất, ổn định nhất.
              </li>
              <li>
                Tất cả các mục tiêu trên nhằm nâng cao giá trị thương hiệu của khách hàng, góp phần đáp ứng tối đa nhu cầu khách hàng, tiện ích cho khách hàng, sự thịnh vượng, phồn vinh cho xã hội.
              </li>
            </ul>
          </div>
        </div>

      </div>
    </section>
  );
}
