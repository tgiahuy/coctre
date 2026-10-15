import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
  name: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="py-3 px-4 bg-white/70 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto flex items-center space-x-2 text-xs sm:text-sm text-gray-500 overflow-x-auto whitespace-nowrap">
        <Link
          href="/"
          className="flex items-center gap-1 hover:text-[#214E34] transition-colors"
        >
          <Home className="w-3.5 h-3.5 text-[#214E34]" />
          <span>Trang chủ</span>
        </Link>

        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <React.Fragment key={idx}>
              <ChevronRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="hover:text-[#214E34] transition-colors"
                >
                  {item.name}
                </Link>
              ) : (
                <span className="font-semibold text-[#214E34] truncate">
                  {item.name}
                </span>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </nav>
  );
}
