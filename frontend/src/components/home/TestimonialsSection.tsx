import React from "react";
import SectionHeading from "@/components/common/SectionHeading";
import TestimonialCard from "@/components/common/TestimonialCard";
import { testimonials } from "@/data/testimonials";

export default function TestimonialsSection() {
  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  return (
    <section className="py-16 sm:py-24 bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="ĐÁNH GIÁ CỦA ĐỐI TÁC"
          title="KHÁCH HÀNG NÓI GÌ VỀ CHÚNG TÔI?"
          subtitle="Sự hài lòng của các chủ đầu tư, chỉ huy trưởng công trình và đội thợ ép cọc là thước đo uy tín lớn nhất của chúng tôi."
          alignment="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t) => (
            <TestimonialCard key={t.id} testimonial={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
