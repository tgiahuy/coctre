import Link from "next/link";
import { ArrowLeft, Home, Package, PhoneCall } from "lucide-react";
import { siteConfig } from "@/data/config";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] bg-[#F7F5EF] flex items-center justify-center px-4 py-16">
      <div className="max-w-xl w-full text-center bg-white border border-gray-200/80 rounded-3xl p-8 sm:p-12 shadow-sm space-y-6">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#214E34]/10 text-[#214E34] font-black text-3xl">
          404
        </div>
        
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
            Không tìm thấy trang yêu cầu
          </h1>
          <p className="text-sm text-gray-600 leading-relaxed max-w-md mx-auto">
            Địa chỉ bạn vừa truy cập không tồn tại, đã được thay đổi hoặc không còn khả dụng trên hệ thống Tổng kho Cọc Tre Huyền Dương.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#214E34] text-white font-bold text-sm hover:bg-[#1a3e29] transition-colors shadow-sm"
          >
            <Home className="w-4 h-4" />
            Về trang chủ
          </Link>
          <Link
            href="/san-pham"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white border border-gray-300 text-gray-800 font-bold text-sm hover:bg-gray-50 transition-colors"
          >
            <Package className="w-4 h-4" />
            Xem các sản phẩm
          </Link>
          <a
            href={`tel:${siteConfig.hotline}`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#E76F51]/10 text-[#E76F51] border border-[#E76F51]/20 font-bold text-sm hover:bg-[#E76F51]/20 transition-colors"
          >
            <PhoneCall className="w-4 h-4" />
            Hỗ trợ: {siteConfig.hotline}
          </a>
        </div>
      </div>
    </div>
  );
}
