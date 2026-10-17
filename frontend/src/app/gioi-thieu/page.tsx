import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Breadcrumb from "@/components/common/Breadcrumb";
import AboutQuoteForm from "@/components/about/AboutQuoteForm";
import { siteConfig } from "@/data/config";

export const metadata: Metadata = {
  title: "Giới Thiệu | Cọc Tre Huyền Dương - Uy Tín Từ 1990",
  description:
    "Bắt đầu hoạt động từ năm 1990 tại làng nghề truyền thống Dân Hòa, Hà Nội, Công ty TNHH Xây Dựng & TM Huyền Dương là đơn vị đi đầu trong lĩnh vực cung cấp cọc tre công trình và giải pháp gia cố nền móng tại miền Bắc.",
};

export default function AboutPage() {
  return (
    <div className="bg-[#FAF9F6] min-h-screen py-6 sm:py-10 text-gray-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-6">
        
        {/* Breadcrumb */}
        <Breadcrumb items={[{ name: "Giới thiệu" }]} />

        {/* Khung nội dung chính dạng bài viết văn bản đơn giản */}
        <article className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-10 lg:p-12 space-y-8">
          
          {/* Tiêu đề trang */}
          <header className="border-b border-gray-200 pb-5">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-snug">
              Giới thiệu {siteConfig.legalName}
            </h1>
            <p className="text-sm text-gray-500 mt-2">
              Làng nghề truyền thống Dân Hòa, Hà Nội • Uy tín hoạt động từ năm 1990
            </p>
          </header>

          {/* 1. Quá trình hình thành và phát triển */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 border-b border-gray-100 pb-2">
              Quá trình hình thành và phát triển
            </h2>

            <p className="text-base sm:text-lg text-gray-700 leading-relaxed text-justify">
              Bắt đầu hoạt động từ năm <strong>1990</strong> tại làng nghề truyền thống Dân Hòa, Hà Nội, <strong>{siteConfig.legalName}</strong> được thành lập với định hướng trở thành đơn vị đi đầu trong lĩnh vực cung cấp cọc tre công trình và giải pháp gia cố nền móng tại khu vực miền Bắc.
            </p>

            {/* (Ảnh 1) */}
            <figure className="my-6 text-center space-y-2">
              <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden border border-gray-200 bg-gray-100">
                <Image
                  src="/images/banner/bamboo-poles.jpg"
                  alt={`Kho bãi và xưởng chế biến cọc tre ${siteConfig.companyName} tại Dân Hòa, Hà Nội`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 1024px"
                  className="object-cover"
                  priority
                />
              </div>
              <figcaption className="text-sm italic text-gray-500">
                (Hình ảnh: Tổng kho bãi và xưởng chế biến cọc tre Huyền Dương tại 331 Phố Vác, Dân Hòa, Hà Nội)
              </figcaption>
            </figure>

            <p className="text-base sm:text-lg text-gray-700 leading-relaxed text-justify">
              Trải qua nhiều năm hoạt động và phát triển liên tục, từ một xưởng thu mua và chế biến nhỏ lẻ, Huyền Dương đã từng bước mở rộng quy mô kho bãi, đầu tư hệ thống phương tiện vận chuyển hiện đại và thiết lập chuỗi cung ứng tre nguyên liệu tận gốc.
            </p>

            <p className="text-base sm:text-lg text-gray-700 leading-relaxed text-justify">
              Đến nay, chúng tôi tự hào là đối tác chiến lược tin cậy của hàng trăm nhà thầu, công ty xây dựng và hàng nghìn chủ hộ gia đình trong các dự án xử lý móng yếu, kè bờ sông hồ, làm hàng rào và giàn giáo thi công. Mỗi cọc tre Huyền Dương cung cấp ra thị trường đều là lời cam kết về độ bền vững cho mọi nền móng công trình.
            </p>
          </section>

          {/* 2. Mục tiêu & Sứ mệnh */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 border-b border-gray-100 pb-2">
              Mục tiêu &amp; Sứ mệnh
            </h2>

            <ul className="list-disc pl-6 space-y-2.5 text-base sm:text-lg text-gray-700 leading-relaxed">
              <li>
                <strong>Đối với công trình:</strong> Mang đến giải pháp gia cố nền móng hiệu quả, an toàn và tiết kiệm chi phí tối đa cho các công trình xây dựng.
              </li>
              <li>
                <strong>Đối với khách hàng &amp; đối tác:</strong> Cung cấp nguồn vật liệu cọc tre đạt chuẩn, đáp ứng đúng tiến độ thi công, làm việc với tinh thần trung thực, trách nhiệm và tôn trọng cam kết.
              </li>
              <li>
                <strong>Đối với môi trường:</strong> Khai thác và sử dụng hiệu quả nguồn nguyên liệu tre tự nhiên – giải pháp xây dựng xanh thân thiện với môi trường, góp phần phát triển kinh tế bền vững.
              </li>
            </ul>
          </section>

          {/* 3. Giá trị cốt lõi */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 border-b border-gray-100 pb-2">
              Giá trị cốt lõi
            </h2>

            <ul className="list-disc pl-6 space-y-2.5 text-base sm:text-lg text-gray-700 leading-relaxed">
              <li>
                <strong>Chất lượng:</strong> Chỉ cung cấp tre già, tươi, thân thẳng, không mối mọt, cong vênh.
              </li>
              <li>
                <strong>Tốc độ:</strong> &quot;Hàng sẵn kho - Giao trong ngày&quot;. Chúng tôi hiểu rằng trong xây dựng, tiến độ là vàng bạc.
              </li>
              <li>
                <strong>Uy tín:</strong> Đếm đủ số lượng, đúng quy cách đường kính và chiều dài theo hợp đồng.
              </li>
              <li>
                <strong>Tận tâm:</strong> Luôn tư vấn giải pháp tối ưu nhất cho khách hàng, hỗ trợ bốc xếp và vận chuyển tận chân công trình.
              </li>
            </ul>
          </section>

          {/* 4. Các sản phẩm cọc tre của chúng tôi */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 border-b border-gray-100 pb-2">
              Các sản phẩm cọc tre của chúng tôi
            </h2>

            <p className="text-base sm:text-lg text-gray-700 leading-relaxed text-justify">
              Chúng tôi cung cấp đa dạng các loại cọc tre để góp phần tạo nên những công trình vững chắc nhất cho quý khách hàng. Cọc tre còn gọi là cọc nêm. Là loại cọc đứng lưng chừng trong lớp đất xấu, sức chống đỡ chính là lực ma sát quanh thân cọc và có tác dụng nêm chặt đất. Dùng loại tre tươi, già, loại tre đực, chọn đoạn sát gốc có đường kính 60-100mm, dài 1500-3000mm, chặt vát ở mũi cọc. Thông thường đóng 25 cọc/m2. Cọc tre phải đóng trong đất ẩm, dưới mực ngầm. Nếu nền đất khô, tre sẽ mau bị phá huỷ. Là loại cọc nêm, thường dùng cho nhà dân dụng ít tầng: 3 tầng đến 5 tầng.
            </p>

            <p className="text-base sm:text-lg text-gray-800 font-semibold pt-1">
              Các quy cách cọc tre hiện có tại kho Huyền Dương:
            </p>

            <ul className="list-disc pl-6 space-y-2 text-base sm:text-lg text-gray-700 leading-relaxed">
              <li>
                <Link href="/san-pham/coc-tre-15m" className="text-[#214E34] font-semibold hover:underline">
                  Cọc tre 1.5m
                </Link>
                : Phù hợp cho các công trình nhỏ, móng rãnh, kè bờ mương hoặc làm hàng rào tạm.
              </li>
              <li>
                <Link href="/san-pham/coc-tre-2m" className="text-[#214E34] font-semibold hover:underline">
                  Cọc tre 2.0m
                </Link>
                : Sử dụng phổ biến cho móng nhà cấp 4, móng tường rào, xử lý nền đất yếu nhẹ.
              </li>
              <li>
                <Link href="/san-pham/coc-tre-25m" className="text-[#214E34] font-semibold hover:underline">
                  Cọc tre 2.5m
                </Link>
                : Quy cách chuẩn cho móng nhà dân từ 2 - 3 tầng, đảm bảo chiều sâu chịu tải hiệu quả.
              </li>
              <li>
                <Link href="/san-pham/coc-tre-3m" className="text-[#214E34] font-semibold hover:underline">
                  Cọc tre 3.0m
                </Link>
                : Dùng cho các công trình có lớp đất yếu dày, móng công trình dân dụng lớn, kè sông hồ chống sạt lở.
              </li>
              <li>
                <Link href="/san-pham/coc-tre-4m" className="text-[#214E34] font-semibold hover:underline">
                  Cọc tre 4.0m
                </Link>
                : Dùng cho các dự án thủy lợi, gia cố chân bờ kè lớn hoặc các vị trí địa chất phức tạp.
              </li>
              <li>
                <Link href="/san-pham/coc-tre-theo-yeu-cau" className="text-[#214E34] font-semibold hover:underline">
                  Cọc tre theo yêu cầu
                </Link>
                : Cưa khúc, chọn đường kính ngọn/gốc theo đúng bản vẽ thiết kế kỹ thuật của chủ đầu tư.
              </li>
            </ul>
          </section>

          {/* 5. Tại sao bạn nên lựa chọn chúng tôi? */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 border-b border-gray-100 pb-2">
              Tại sao bạn nên lựa chọn chúng tôi?
            </h2>

            {/* (Ảnh 2) */}
            <figure className="my-6 text-center space-y-2">
              <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden border border-gray-200 bg-gray-100">
                <Image
                  src="/images/banner/bamboo-sunlight.jpg"
                  alt={`Nguồn nguyên liệu tre già chọn lọc khắt khe và hệ thống vận chuyển Cọc Tre Huyền Dương`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 1024px"
                  className="object-cover"
                />
              </div>
              <figcaption className="text-sm italic text-gray-500">
                (Hình ảnh: Nguồn tre già đực chọn lọc khắt khe và phương tiện vận chuyển cọc tre Huyền Dương)
              </figcaption>
            </figure>

            <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
              Trong nhiều năm hoạt động, chúng tôi luôn nhận được sự tin tưởng và đồng hành của hàng nghìn nhà thầu và khách hàng nhờ vào:
            </p>

            <ul className="list-disc pl-6 space-y-3 text-base sm:text-lg text-gray-700 leading-relaxed">
              <li>
                <strong>Nguồn nguyên liệu chọn lọc khắt khe:</strong> Tre được thu mua từ các vùng nguyên liệu tre già đạt tiêu chuẩn (tre đực, tre gai đặc ruột), tuổi tre đủ già để đảm bảo không bị mục hay vỡ đầu khi đóng máy.
              </li>
              <li>
                <strong>Giá tận gốc – Không qua trung gian:</strong> Đơn vị sở hữu xưởng chế biến và kho bãi trực tiếp tại 331 Phố Vác, Dân Hòa, mang đến mức giá cạnh tranh nhất thị trường và chính sách chiết khấu tốt cho đơn hàng lớn.
              </li>
              <li>
                <strong>Năng lực cung ứng lớn &amp; Nhanh chóng:</strong> Kho bãi luôn có sẵn từ hàng chục nghìn đến hàng trăm nghìn cọc. Đội ngũ xe tải đa dạng tải trọng sẵn sàng vận chuyển tận công trình ngay khi có lệnh.
              </li>
              <li>
                <strong>Minh bạch &amp; Kiểm tra trước khi thanh toán:</strong> Khách hàng hoàn toàn được kiểm tra chất lượng, đếm số lượng cọc tre trực tiếp tại công trình trước khi tiến hành nghiệm thu và thanh toán.
              </li>
              <li>
                <strong>Đội ngũ tư vấn am hiểu kỹ thuật:</strong> Chúng tôi không chỉ bán cọc tre, chúng tôi tư vấn cho bạn quy cách và mật độ đóng cọc phù hợp nhất với bản vẽ địa chất của công trình.
              </li>
            </ul>
          </section>

          {/* 6. Thông tin liên hệ */}
          <section className="space-y-4 pt-4 border-t border-gray-200">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 border-b border-gray-100 pb-2">
              Thông tin liên hệ
            </h2>

            <ul className="list-disc pl-6 space-y-2 text-base sm:text-lg text-gray-700 leading-relaxed">
              <li>
                <strong>Đơn vị:</strong> {siteConfig.legalName}
              </li>
              <li>
                <strong>Địa chỉ trụ sở &amp; kho bãi:</strong> {siteConfig.headquarters}
              </li>
              <li>
                <strong>Hotline / Zalo:</strong>{" "}
                <a href={`tel:${siteConfig.hotline}`} className="text-[#214E34] font-bold hover:underline">
                  {siteConfig.hotlineFormatted}
                </a>
                {siteConfig.hotlineSecondary && (
                  <span>
                    {" "}–{" "}
                    <a href={`tel:${siteConfig.hotline2 || siteConfig.hotlineSecondary}`} className="text-[#214E34] font-bold hover:underline">
                      {siteConfig.hotlineSecondary}
                    </a>
                  </span>
                )}
              </li>
              <li>
                <strong>Email:</strong>{" "}
                <a href={`mailto:${siteConfig.email}`} className="text-gray-700 hover:underline">
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <strong>Thời gian làm việc:</strong> {siteConfig.workHours}
              </li>
            </ul>

            {/* Form đăng ký báo giá gọn gàng */}
            <div className="pt-4">
              <AboutQuoteForm />
            </div>
          </section>

        </article>

      </div>
    </div>
  );
}
