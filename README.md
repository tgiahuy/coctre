# Website Doanh Nghiệp & Quản Trị Cọc Tre Hòa Bình

Hệ thống website giới thiệu sản phẩm cọc tre, dự án công trình nền móng và cẩm nang kỹ thuật thi công chuẩn TCVN 9361:2012 cho **Công ty Cọc Tre Hòa Bình**.

---

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router) + React 19 + TypeScript 5
- **Giao diện:** Tailwind CSS v4 + Lucide React Icons
- **Tối ưu hình ảnh:** `next/image` + Sharp (Toàn bộ ảnh chụp thực tế chất lượng cao nén chuẩn WebP)
- **Quản trị nội dung:** Trang Admin CMS nội bộ tại `/admin` (Mã PIN: `8888`) hỗ trợ soạn thảo Markdown, trích xuất mục lục tự động, lưu trữ an toàn.

---

## 🏗️ Cấu Trúc Dự Án

```text
Coctre/
├── frontend/             # Toàn bộ mã nguồn giao diện (Next.js App Router)
│   ├── src/
│   │   ├── app/          # Dynamic routes & các trang chính:
│   │   │   ├── admin/       # Khu vực quản trị bài viết & dữ liệu
│   │   │   ├── du-an/       # Danh sách & chi tiết dự án công trình
│   │   │   ├── san-pham/    # Danh mục & chi tiết cọc tre 1.5m - 4m
│   │   │   ├── tin-tuc/     # Cẩm nang kỹ thuật & tin tức
│   │   │   ├── gioi-thieu/  # Giới thiệu doanh nghiệp & bãi cọc
│   │   │   └── lien-he/     # Bản đồ, hotline, form liên hệ
│   │   ├── components/   # Header, Footer, Cards, Modal báo giá
│   │   ├── context/      # QuoteModalContext (Popup báo giá toàn site)
│   │   ├── data/         # Dữ liệu chuẩn về cọc tre, dự án, bài viết, công ty
│   │   └── lib/          # Tiện ích & bộ lưu trữ
│   ├── public/           # Hình ảnh thực tế (WebP)
│   ├── package.json
│   ├── tsconfig.json
│   └── next.config.ts
├── package.json          # Root scripts điều phối (dev, build, start, lint)
└── README.md
```

---

## 🚀 Khởi Chạy Dự Án

Bạn có thể chạy trực tiếp từ thư mục gốc:

```bash
npm run dev
```

Hoặc vào thư mục `frontend`:

```bash
cd frontend
npm run dev
```

Mở trình duyệt truy cập:
- **Trang chủ:** [http://localhost:3000](http://localhost:3000)
- **Sản phẩm:** [http://localhost:3000/san-pham](http://localhost:3000/san-pham)
- **Dự án:** [http://localhost:3000/du-an](http://localhost:3000/du-an)
- **Tin tức & Cẩm nang:** [http://localhost:3000/tin-tuc](http://localhost:3000/tin-tuc)
- **Trang quản trị (Admin):** [http://localhost:3000/admin](http://localhost:3000/admin) (PIN mặc định: `8888`)
