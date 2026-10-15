import React from "react";
import Image from "next/image";
import { Star, Quote, Building, CheckCircle } from "lucide-react";
import { Testimonial } from "@/data/testimonials";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between relative group hover:-translate-y-1">
      {/* Decorative Quote mark */}
      <div className="absolute top-4 right-4 text-emerald-100 group-hover:text-[#CDAA63]/20 transition-colors">
        <Quote className="w-10 h-10 stroke-1" />
      </div>

      <div>
        {/* Rating Stars */}
        <div className="flex items-center gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < testimonial.rating
                  ? "text-[#E57C23] fill-[#E57C23]"
                  : "text-gray-300"
              }`}
            />
          ))}
          <span className="text-xs font-bold text-gray-700 ml-1.5">
            5.0 / 5.0
          </span>
        </div>

        {/* Content */}
        <p className="text-sm text-gray-700 leading-relaxed italic relative z-10">
          &ldquo;{testimonial.content}&rdquo;
        </p>
      </div>

      {/* Author Details */}
      <div className="mt-6 pt-4 border-t border-gray-100 flex items-center gap-3.5">
        <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-[#CDAA63] shrink-0 bg-emerald-900">
          <Image
            src={testimonial.avatar}
            alt={testimonial.name}
            fill
            className="object-cover"
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1">
            <h4 className="font-bold text-sm text-[#18231C] truncate">
              {testimonial.name}
            </h4>
            <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          </div>
          <p className="text-xs text-[#214E34] font-medium truncate">
            {testimonial.role}
          </p>
          <p className="text-[11px] text-gray-500 truncate flex items-center gap-1 mt-0.5">
            <Building className="w-3 h-3 text-gray-400 shrink-0" />
            <span className="truncate">{testimonial.company}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
