# KẾ HOẠCH CHUYỂN ĐỔI & DEPLOY WEBSITE CỌC TRE HUYỀN DƯƠNG VỚI CHI PHÍ HOSTING 0 ĐỒNG

> **Dự án:** Cọc Tre Huyền Dương (Coctre)  
> **Repository:** <https://github.com/tgiahuy/coctre>  
> **Ngày lập kế hoạch:** 19/10/2026  
> **Phương án đề xuất:** Next.js Static Export → Cloudflare Pages Free  
> **Trạng thái:** Kế hoạch triển khai; **chưa** xác nhận build static và deploy thành công.

---

## 1. MỤC TIÊU & PHẠM VI

### 1.1. Mục tiêu

- Đưa website giới thiệu **Cọc Tre Huyền Dương** hoạt động công khai với **chi phí lưu trữ website dự kiến 0 đồng/tháng**.
- Giữ trải nghiệm và nội dung có giá trị kinh doanh: giới thiệu doanh nghiệp, sản phẩm cọc tre, dự án đã thực hiện, tin tức/cẩm nang kỹ thuật, SEO, hotline, Zalo và bản đồ.
- Vẫn tiếp nhận nhu cầu báo giá của khách hàng mà **không cần vận hành backend riêng**.
- Giảm chi phí và gánh nặng vận hành; chấp nhận việc cập nhật nội dung qua mã nguồn/Git thay vì trang quản trị trực tuyến.
- Bảo toàn phiên bản full-stack để có thể khôi phục hoặc nâng cấp khi doanh nghiệp có ngân sách.

### 1.2. Bối cảnh sử dụng

- Website giới thiệu doanh nghiệp và sản phẩm, **không có giỏ hàng/thanh toán online**.
- Khách hàng dự kiến chỉ có **vài chục đến vài trăm lượt truy cập/ngày**.
- Nội dung ít thay đổi; các yêu cầu báo giá không cần lưu trữ vào database riêng của website.
- Chủ website có thể chấp nhận cách cập nhật nội dung định kỳ thông qua người quản trị kỹ thuật/GitHub.

### 1.3. Phạm vi không bao gồm

- Không xây dựng hệ thống CMS mới miễn phí ở giai đoạn đầu.
- Không vận hành Spring Boot, PostgreSQL, Docker trên môi trường production miễn phí.
- Không cam kết chi phí **tổng sở hữu** bằng 0: tên miền riêng, công bảo trì, dịch vụ bên thứ ba và các giới hạn gói miễn phí có thể phát sinh chi phí.

---

## 2. ĐÁNH GIÁ KIẾN TRÚC HIỆN TẠI

Các nhận định sau dựa trên việc kiểm tra các file trong nhánh `main` của repository tại thời điểm lập kế hoạch; chưa phải báo cáo chạy thử toàn bộ ứng dụng.

| Thành phần | Hiện trạng trong repository | Hướng chuyển đổi |
|---|---|---|
| Frontend | Next.js 16, React 19, TypeScript, Tailwind CSS 4 | Giữ, chuyển sang Static Export |
| Backend | Spring Boot, Java 21 | Không triển khai production |
| Cơ sở dữ liệu | PostgreSQL 16; JPA/Flyway | Không triển khai production |
| CMS | `/admin`, xác thực bằng API và backend | Không đưa vào bản static |
| Nội dung | Có dữ liệu trong `frontend/src/data/`, nhưng các store vẫn gọi API | Chuyển hoàn toàn sang dữ liệu tĩnh |
| Ảnh | Ảnh trong `frontend/public/` và luồng upload từ backend/storage | Đưa các ảnh cần dùng vào `public/` |
| Yêu cầu báo giá | `POST /api/quotes` → backend → lưu dữ liệu → gửi thông báo email | Thay bằng Google Forms hoặc liên hệ trực tiếp |
| SEO | Metadata, structured data, sitemap, robots | Giữ, làm cho hoạt động với static build |
| Triển khai | Docker Compose gồm frontend/backend/PostgreSQL | Cloudflare Pages (chỉ deploy thư mục `out`) |

### 2.1. Các điểm nghẽn kỹ thuật đã thấy

1. `frontend/src/lib/productStore.ts`: `useProductsState()` gọi `/api/content/products` và có trạng thái lỗi khi API không chạy.
2. `frontend/src/lib/articleStore.ts`: gọi `/api/content/articles`.
3. `frontend/src/lib/projectStore.ts`: gọi `/api/content/projects`.
4. `frontend/src/lib/configStore.ts`: gọi `/api/content/config`.
5. `frontend/src/lib/serverData.ts`: ưu tiên gọi backend nội bộ rồi mới fallback sang dữ liệu tĩnh. Với static build, luồng này phải được làm deterministic, không phụ thuộc một backend bên ngoài.
6. Các trang chi tiết động hiện **chưa định nghĩa** `generateStaticParams()`:
   - `frontend/src/app/san-pham/[slug]/page.tsx`
   - `frontend/src/app/du-an/[slug]/page.tsx`
   - `frontend/src/app/tin-tuc/[slug]/page.tsx`
7. `frontend/src/components/common/QuoteModal.tsx`, `frontend/src/components/common/QuoteFormSection.tsx` và `frontend/src/app/lien-he/page.tsx` vẫn phụ thuộc `sendQuoteRequest()` → `/api/quotes`.
8. `frontend/next.config.ts` chưa bật `output: 'export'` và ảnh cần được cấu hình phù hợp với static export.
9. Các route API, admin và chức năng đọc/ghi upload không thể chỉ được giữ nguyên như trên bản có server rồi kỳ vọng chạy được trên static hosting.

**Kết luận:** Không thể chỉ đổi nhà cung cấp hosting và tắt backend; phải chuyển luồng dữ liệu và biểu mẫu trước khi build tĩnh.

---

## 3. KIẾN TRÚC ĐỀ XUẤT

```text
                     KHÁCH TRUY CẬP WEBSITE
                               |
                               v
                  Tên miền riêng (nếu có)
                               |
                               v
                   CLOUDFLARE PAGES FREE
                 HTML + CSS + JavaScript + ảnh
                               |
              +----------------+-----------------+
              |                |                 |
              v                v                 v
       Nội dung tĩnh       Hotline / Zalo    Google Forms
       từ source code       liên hệ ngay      yêu cầu báo giá
                                                |
                                                v
                                         Google Sheets
                                         Email thông báo

Cập nhật nội dung: sửa source → GitHub → build/deploy tự động
```

**Nguyên tắc:** Không còn các request đến API nội bộ bắt buộc cho việc hiển thị hoặc gửi form trong bản production. Các hiệu ứng, tìm kiếm và lọc có thể chạy ở phía trình duyệt.

---

## 4. MA TRẬN GIỮ / SỬA / LOẠI BỎ CHỨC NĂNG

| Tính năng | Quyết định | Ghi chú |
|---|---|---|
| Trang chủ, banner, bố cục, responsive | **Giữ** | Không thiết kế lại nếu không cần |
| Giới thiệu doanh nghiệp | **Giữ** | Dữ liệu tĩnh |
| Danh sách & chi tiết sản phẩm | **Giữ** | Render nội dung từ `src/data/products.ts` |
| Danh sách & chi tiết dự án | **Giữ** | Render nội dung từ `src/data/projects.ts` |
| Tin tức / cẩm nang | **Giữ** | Render nội dung từ `src/data/articles.ts` |
| Tìm kiếm, lọc sản phẩm | **Giữ** | Xử lý client-side trên dữ liệu cục bộ |
| Hotline, Zalo, bản đồ, email liên hệ | **Giữ** | Liên kết trực tiếp; kiểm tra lại URL |
| Form yêu cầu báo giá | **Thay đổi** | Mở Google Forms (có thể điền sẵn loại sản phẩm) |
| Email thông báo có khách gửi báo giá | **Thay đổi** | Bật thông báo phản hồi trên Google Forms; liên kết Sheets |
| Admin CMS `/admin` | **Loại khỏi bản deploy** | Không để giao diện đăng nhập không sử dụng được |
| Đăng nhập, session, quản lý người dùng | **Loại khỏi bản deploy** | Không có backend xác thực |
| Thêm/sửa/xóa sản phẩm, dự án, tin tức từ CMS | **Loại khỏi bản deploy** | Thao tác qua source/Git |
| Upload ảnh từ CMS | **Loại khỏi bản deploy** | Ảnh được version hóa trong `public/` |
| Lưu yêu cầu báo giá vào PostgreSQL | **Loại khỏi bản deploy** | Dữ liệu do Google Forms/Sheets quản lý |
| API Spring Boot, PostgreSQL, Docker | **Không triển khai** | Giữ mã nguồn ở nhánh lưu trữ |
| Review/đánh giá sản phẩm | **Rà soát** | Không cho gửi đánh giá giả tạo; chỉ hiển thị dữ liệu có căn cứ |
| SEO, sitemap, robots, metadata, schema | **Giữ & kiểm tra** | Cập nhật URL và thời gian sửa đổi hợp lý |

---

## 5. KẾ HOẠCH TRIỂN KHAI THEO GIAI ĐOẠN

### Giai đoạn 0 — Sao lưu và chốt nguồn dữ liệu

**Việc cần làm**

- [ ] Xác nhận code nguồn mới nhất trên `main`.
- [ ] Tạo nhánh lưu trữ, ví dụ `archive/fullstack`, tại commit ổn định trước khi chuyển đổi.
- [ ] Tạo nhánh triển khai `feat/static-free-deploy` từ `main`.
- [ ] Kiểm kê tất cả dữ liệu từng được tạo/sửa qua CMS và ảnh upload, nếu có.
- [ ] **Xuất dữ liệu CMS mới nhất khỏi database** trước khi thay thế dữ liệu bằng `frontend/src/data/`; không mặc định dữ liệu mẫu trong source đã là dữ liệu thực tế mới nhất.
- [ ] Kiểm tra các tệp `.env`, khóa API, mật khẩu; không commit thông tin bí mật.
- [ ] Chốt tên miền production và tên miền chính (canonical).

**Đầu ra:** Có bản sao lưu có thể khôi phục và bộ dữ liệu/ảnh được xác nhận là đúng với khách hàng.

### Giai đoạn 1 — Chuyển dữ liệu frontend sang tĩnh

**File trọng tâm**

```text
frontend/src/lib/serverData.ts
frontend/src/lib/productStore.ts
frontend/src/lib/articleStore.ts
frontend/src/lib/projectStore.ts
frontend/src/lib/configStore.ts
frontend/src/data/products.ts
frontend/src/data/projects.ts
frontend/src/data/articles.ts
frontend/src/data/config.ts
```

**Việc cần làm**

- [ ] Thay logic fetch backend trong `serverData.ts` bằng dữ liệu cục bộ, không thực hiện request network tại build time.
- [ ] Cho các hook/store trả dữ liệu cục bộ đồng bộ hoặc bằng trạng thái React ổn định; không fetch các endpoint `/api/content/...`.
- [ ] Bỏ các trạng thái lỗi và loading chỉ do việc chờ backend ở những nơi đã chuyển sang static.
- [ ] Rà soát trang chủ, trang danh sách, trang chi tiết, widget “sản phẩm/dự án liên quan”, phần header/footer, favicon.
- [ ] Bảo đảm việc thêm sản phẩm/dự án/bài viết bằng cách sửa file dữ liệu thực sự hiển thị sau build mới.

**Tiêu chí hoàn tất:** Mở các trang chính vẫn thấy nội dung, kể cả khi Spring Boot và PostgreSQL đã dừng.

### Giai đoạn 2 — Bật Next.js Static Export

**File trọng tâm:** `frontend/next.config.ts`.

Bổ sung vào **cấu hình hiện có**, không xóa tùy tiện các lựa chọn an toàn/ảnh khác:

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
    // Giữ các thiết lập cần thiết khác trong file cấu hình hiện tại.
  },
};

export default nextConfig;
```

> Đoạn trên minh họa các trường cần thêm, **không phải** bản thay thế toàn bộ `next.config.ts` hiện tại.

**Thêm `generateStaticParams()` cho cả ba trang chi tiết động**, ví dụ với sản phẩm:

```tsx
import { products } from "@/data/products";

export function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}
```

Áp dụng tương tự cho dự án và bài viết, sử dụng đúng bộ dữ liệu đã chốt ở Giai đoạn 0.

**Việc cần làm**

- [ ] Thêm `output: 'export'`.
- [ ] Sử dụng ảnh tương thích static export (`images.unoptimized: true` nếu tiếp tục dùng `next/image` mặc định).
- [ ] Tạo đủ các URL slug cần build trước.
- [ ] Rà soát dynamic routes, route handlers và các tính năng dùng request-time server logic không được hỗ trợ khi export tĩnh.
- [ ] Kiểm tra `sitemap.xml`, `robots.txt`, trang 404 và trailing slash khi deploy lên Cloudflare.
- [ ] Cập nhật canonical/metadata theo tên miền đích thực tế.

**Tiêu chí hoàn tất:** `npm run build` tạo thư mục `frontend/out` và chứa HTML cho các đường dẫn chi tiết.

### Giai đoạn 3 — Thay thế chức năng nhận báo giá

**File trọng tâm**

```text
frontend/src/components/common/QuoteModal.tsx
frontend/src/components/common/QuoteFormSection.tsx
frontend/src/app/lien-he/page.tsx
frontend/src/lib/api.ts
```

**Phương án mặc định: Google Forms + Google Sheets**

- [ ] Tạo Google Form bằng tài khoản do khách hàng sở hữu.
- [ ] Các trường: Họ và tên, số điện thoại, email (tùy chọn), công ty (tùy chọn), quy cách cọc, số lượng, địa điểm giao, ghi chú.
- [ ] Liên kết Form với Google Sheets để chủ doanh nghiệp tiện tra cứu.
- [ ] Bật thông báo khi có phản hồi mới cho người quản lý theo khả năng của Google Forms.
- [ ] Thay CTA “Nhận báo giá” thành nút mở Google Form. Nếu cần, sử dụng URL điền sẵn loại cọc từ trang sản phẩm.
- [ ] Giữ nút **Gọi ngay**, **Zalo**, và **Email** làm kênh dự phòng.
- [ ] Nếu vẫn giữ giao diện modal, chỉ sử dụng nó để hiển thị thông tin và chuyển người dùng sang biểu mẫu; không giả lập “Đã gửi thành công” nếu chưa có dữ liệu được lưu.
- [ ] Có ghi chú bảo vệ dữ liệu cá nhân phù hợp khi thu thập tên, số điện thoại và địa chỉ liên hệ.

**Ràng buộc:** Không gửi request tới `/api/quotes` trên bản website tĩnh. Không nhúng khóa API Google vào JavaScript client. Nếu cần form hoàn toàn nằm trong giao diện và tự gửi không rời trang, phải thiết kế giải pháp serverless riêng, có bảo vệ spam và kiểm tra hạn mức gói miễn phí.

**Tiêu chí hoàn tất:** Gửi thử ít nhất một yêu cầu trên website; phản hồi xuất hiện trong Forms/Sheets, chủ website nhận được thông báo theo cấu hình đã chọn.

### Giai đoạn 4 — Loại bỏ chức năng server-only khỏi production

- [ ] Không xuất bản trang `/admin`, không hiển thị đường dẫn quản trị ở giao diện công khai.
- [ ] Loại trừ/xử lý các route API hiện có trong `frontend/src/app/api/` để static build không bị lỗi; giữ mã full-stack ở nhánh archive.
- [ ] Rà soát code dùng `cookies()`, `headers()`, xác thực server, phương thức POST/PUT/DELETE và filesystem runtime.
- [ ] Ngừng phụ thuộc AWS SDK/S3/R2 trong runtime nếu không còn cần thiết; tối giản dependency **sau khi** xác nhận không còn sử dụng.
- [ ] Kiểm tra ảnh CMS từng upload có tồn tại trong `frontend/public/`; chuyển các ảnh đang lưu ở volume/cloud storage về đây nếu được sử dụng.
- [ ] Không xóa dữ liệu/sao lưu backend trước khi khách hàng nghiệm thu bản static.

**Tiêu chí hoàn tất:** Website không còn chức năng công khai nào bắt buộc chạy Node.js server, Java server hoặc database.

### Giai đoạn 5 — Rà soát SEO, chất lượng và bảo mật

- [ ] Giữ các đường dẫn hiện có: `/san-pham`, `/du-an`, `/tin-tuc`, `/gioi-thieu`, `/lien-he` và slug chi tiết.
- [ ] Không để canonical trỏ đến sai tên miền; xác nhận chọn một domain chính.
- [ ] Sitemap liệt kê đúng trang thực sự được xuất tĩnh; kiểm tra `lastModified` không bị làm mới giả trên mọi trang nếu nội dung không thay đổi.
- [ ] Giữ metadata, Open Graph, JSON-LD; rà soát dữ liệu đánh giá, giá và tình trạng hàng để tránh thông tin sai lệch.
- [ ] Kiểm tra đường dẫn ảnh, alt text, tiêu đề H1/H2, mobile, khả năng điều hướng bàn phím.
- [ ] Kiểm tra trực tiếp đường dẫn sâu sau deploy: ví dụ `/san-pham/coc-tre-2m` (không chỉ click từ trang chủ).
- [ ] Không để API key, secret, credentials, dữ liệu người gửi báo giá trong tài nguyên public.
- [ ] Đảm bảo bản build trả về đúng 404 cho các trang không tồn tại.
- [ ] Kiểm thử hành trình người dùng: Trang chủ → Sản phẩm → Chi tiết → Liên hệ/báo giá.

---

## 6. QUY TRÌNH BUILD & TEST TẠI MÁY

Từ thư mục gốc của repository:

```bash
cd frontend
npm ci
npx tsc --noEmit
npm run lint
npm run build
```

Sau build, xác nhận có thư mục `frontend/out` và kiểm tra các HTML chi tiết cùng thư mục assets.

Nên thử phục vụ bản build tĩnh bằng một static file server tại máy (ví dụ `npx serve out`) rồi truy cập trực tiếp các URL. Kết quả chạy `next dev` **không thay thế** cho việc test bản static export.

**Checklist lỗi thường gặp**

| Hiện tượng | Nguyên nhân cần kiểm tra |
|---|---|
| Build báo route động không export được | Thiếu/sai `generateStaticParams()` |
| Trang trống sau khi tải | Store vẫn gọi `/api/content/...` |
| Ấn gửi báo giá báo lỗi | UI vẫn gọi `/api/quotes` |
| Lỗi khi build ảnh | Chưa cấu hình ảnh cho static export |
| Ảnh 404 | Ảnh ở Docker volume nhưng chưa copy sang `public` |
| Trang `/admin` lỗi sau deploy | Chưa loại bỏ route hoặc phụ thuộc xác thực |
| Sitemap/canonical sai | Domain hoặc logic sitemap chưa cập nhật |
| Trang chi tiết 404 khi mở trực tiếp | Đường dẫn output/deploy hoặc slug chưa được xuất tĩnh |

---

## 7. HƯỚNG DẪN DEPLOY CLOUDFLARE PAGES

### 7.1. Chuẩn bị

- GitHub đã được push nhánh static và merge vào `main` sau khi nghiệm thu.
- Tài khoản Cloudflare do khách hàng sở hữu hoặc được bàn giao quyền quản trị.
- Không cần cấu hình database, backend hoặc biến môi trường chứa mật khẩu cho production static.

### 7.2. Cấu hình project

Vào **Cloudflare Dashboard → Workers & Pages → Create → Pages → Connect to Git** (tên các mục có thể thay đổi theo giao diện mới) và cấu hình:

| Thuộc tính | Giá trị đề xuất |
|---|---|
| Repository | `tgiahuy/coctre` |
| Production branch | `main` |
| Root directory | `frontend` |
| Build command | `npm run build` |
| Build output directory | `out` |
| Node.js build runtime | Phiên bản được Next.js 16 hỗ trợ; ưu tiên Node.js 22 nếu tương thích dự án |
| Framework preset | Next.js (Static HTML Export) hoặc cấu hình tương đương |

> Đây là **cấu hình dự kiến**, cần đối chiếu giao diện Cloudflare tại thời điểm triển khai. Nếu Cloudflare diễn giải thư mục output theo đường dẫn gốc repo, sử dụng `frontend/out` tương ứng thay vì `out`.

### 7.3. Kiểm tra sau deploy

- [ ] Trang chủ hoạt động qua HTTPS.
- [ ] Tất cả trang điều hướng/chi tiết truy cập trực tiếp được.
- [ ] Ảnh, CSS, JavaScript tải thành công, không lỗi console nghiêm trọng.
- [ ] Đầy đủ chức năng lọc sản phẩm, hotline, Zalo, Google Forms.
- [ ] Sitemap/robots/canonical đúng domain thực tế.
- [ ] Trình duyệt điện thoại và máy tính hiển thị ổn định.
- [ ] Sau khi push một thay đổi nội dung nhỏ, Cloudflare tự build và phát hành bản cập nhật đúng.

### 7.4. Tên miền

**Trường hợp A — Đã sở hữu tên miền:** Gắn tên miền riêng vào Pages, cấu hình DNS/Cloudflare theo hướng dẫn nền tảng; xác nhận HTTPS, redirect và canonical domain. Phí gia hạn tên miền **không** nằm trong hosting 0 đồng.

**Trường hợp B — Chưa mua tên miền:** Dùng subdomain `*.pages.dev` do Cloudflare cung cấp; cập nhật `siteConfig.website`, metadata và sitemap theo URL thực tế. Tên cụ thể phụ thuộc khả năng đăng ký.

**Lưu ý:** Trong source hiện có `https://coctrehuyenduong.com` làm URL website. Không tự coi tên miền này là đã thuộc sở hữu khách hàng cho đến khi xác nhận.

---

## 8. CHI PHÍ & GIỚI HẠN

| Hạng mục | Chi phí dự kiến | Lưu ý |
|---|---:|---|
| Hosting frontend tĩnh Cloudflare Pages Free | **0đ/tháng** | Trong giới hạn và điều khoản gói Free |
| Backend Spring Boot | **0đ** | Vì không triển khai |
| PostgreSQL | **0đ** | Vì không triển khai |
| Google Forms + Google Sheets cá nhân | **0đ** | Trong hạn mức và chính sách dịch vụ Google |
| HTTPS từ nền tảng | **0đ** | Khi cấu hình domain/Pages đúng |
| Subdomain `*.pages.dev` | **0đ** | Phụ thuộc tính khả dụng |
| Tên miền riêng | **Có thể phát sinh** | Mua/gia hạn nếu muốn dùng tên miền doanh nghiệp |
| Công chỉnh sửa và bảo trì | **Không tính trong hosting** | Cần thỏa thuận riêng với khách hàng |

Các giới hạn gói miễn phí có thể thay đổi, vì vậy cần kiểm tra trực tiếp bảng giá và tài liệu chính thức trước ngày deploy. Không dùng Vercel Hobby làm phương án mặc định cho website thương mại khi điều khoản gói này không cho phép mục đích thương mại.

### Tài liệu tham khảo chính thức

- Next.js Static Export: <https://nextjs.org/docs/app/guides/static-exports>
- Cloudflare Pages và Next.js Static HTML Export: <https://developers.cloudflare.com/pages/framework-guides/nextjs/deploy-a-static-nextjs-site/>
- Cloudflare Pages pricing: <https://www.cloudflare.com/developer-platform/products/pages/>
- Cloudflare Pages limits: <https://developers.cloudflare.com/pages/platform/limits/>
- Cloudflare custom domains: <https://developers.cloudflare.com/pages/configuration/custom-domains/>
- Google Forms: <https://support.google.com/docs/answer/6281888>

---

## 9. QUẢN TRỊ NỘI DUNG SAU KHI DEPLOY

### Thêm hoặc sửa sản phẩm

1. Chỉnh `frontend/src/data/products.ts`.
2. Thêm/chỉnh ảnh trong `frontend/public/images/...`.
3. Kiểm tra `slug`, tiêu đề, mô tả, ảnh và tính chính xác của thông tin kỹ thuật.
4. Commit/push lên GitHub.
5. Cloudflare Pages build lại; kiểm tra trang sản phẩm đã được tạo và cập nhật.

### Thêm hoặc sửa dự án, bài viết

- Dự án: `frontend/src/data/projects.ts`.
- Tin tức: `frontend/src/data/articles.ts`.
- Thông tin doanh nghiệp/hotline/domain: `frontend/src/data/config.ts`.
- Trước khi cập nhật, xác nhận nội dung và ảnh được phép công bố.

**Hệ quả cần thông báo cho khách hàng:** Không còn đăng nhập `/admin` để chỉnh sửa tức thì. Mỗi lần sửa nội dung sẽ cần thay đổi source và chờ deploy theo hệ thống Git/Cloudflare.

---

## 10. RỦI RO VÀ BIỆN PHÁP

| Rủi ro | Mức độ | Giải pháp |
|---|---|---|
| Dữ liệu CMS mới nhất không trùng `src/data` | Cao | Backup và export database trước chuyển đổi; đối soát dữ liệu |
| Một số nơi vẫn gọi backend và gây lỗi runtime | Cao | Kiểm tra toàn bộ `/api/`, `fetch()`, actions và stores |
| Form báo giá mất dữ liệu/không gửi được | Cao | Thử gửi E2E vào Google Forms/Sheets trước bàn giao |
| Không thể xuất một số dynamic routes | Cao | Bổ sung `generateStaticParams`, rà soát API route & server runtime |
| SEO giảm do thay URL, thiếu metadata | Trung bình/cao | Giữ slug, canonical, sitemap và kiểm thử URL trực tiếp |
| Khách muốn sửa nội dung mà không biết Git | Trung bình | Hướng dẫn quy trình hoặc ký bảo trì nội dung |
| Thay đổi chính sách dịch vụ miễn phí | Trung bình | Lưu mã nguồn và quy trình deploy để có thể chuyển host tĩnh |
| Tên miền chưa thuộc sở hữu khách | Trung bình | Xác minh tài khoản quản lý domain trước go-live |
| Khóa bí mật cũ vô tình được nhúng vào frontend | Cao | Rà soát environment, client bundle, lịch sử commit cần thiết |

---

## 11. TIÊU CHÍ NGHIỆM THU CUỐI CÙNG

Dự án chỉ được coi là **sẵn sàng deploy/đã chuyển đổi thành công** khi tất cả tiêu chí sau hoàn tất:

- [ ] Đã sao lưu nhánh full-stack và tất cả dữ liệu CMS cần giữ.
- [ ] Build Next.js Static Export thành công, có thư mục `frontend/out`.
- [ ] Frontend hoạt động khi **không có** backend Java và PostgreSQL.
- [ ] Không còn lỗi request bắt buộc tới API nội bộ từ các trang công khai.
- [ ] Các trang sản phẩm/dự án/tin tức chi tiết có HTML đầy đủ và mở trực tiếp được.
- [ ] Form báo giá/CTA liên hệ hoạt động và kiểm tra thông báo thực tế thành công.
- [ ] Không có trang quản trị chết, API lộ hoặc dữ liệu bí mật trên website.
- [ ] Tất cả ảnh, logo, favicon, hotline, Zalo, bản đồ và thông tin doanh nghiệp đúng.
- [ ] SEO: title, description, canonical, sitemap, robots và schema được kiểm tra.
- [ ] Cloudflare Pages hoạt động qua HTTPS, với subdomain miễn phí hoặc tên miền riêng đã xác nhận.
- [ ] GitHub push dẫn đến build/deploy mới thành công.
- [ ] Tài khoản GitHub, Cloudflare và Google Forms được bàn giao/quản lý theo thỏa thuận với khách hàng.

---

## 12. THỨ TỰ ƯU TIÊN CHO NGƯỜI PHÁT TRIỂN / AI CODING AGENT

**P0 — Bắt buộc:** Backup dữ liệu → chuyển stores & `serverData` sang static → thêm `generateStaticParams` → sửa form báo giá → vô hiệu server-only pages/API → chạy build export.

**P1 — Trước go-live:** Rà soát ảnh, SEO, responsive, URL sâu, các luồng liên hệ; xác thực tính đúng đắn dữ liệu và kiểm tra bảo mật.

**P2 — Sau go-live:** Viết hướng dẫn cập nhật nội dung, thiết lập quyền truy cập và quy trình rollback, theo dõi lỗi thực tế và cân nhắc CMS nhẹ nếu tần suất cập nhật tăng.

### Định nghĩa thành công

Website phục vụ khách truy cập thực tế **không cần VPS, hosting trả phí, Spring Boot hoặc PostgreSQL**, giữ các trang giới thiệu và kênh tiếp nhận yêu cầu báo giá, hoạt động ổn định trên nền tảng hosting tĩnh miễn phí trong phạm vi điều khoản sử dụng.

**Trạng thái tại thời điểm viết:** Đã rà soát một số file nguồn trên GitHub và lập kế hoạch. **Chưa sửa repository, chưa build kiểm thử, chưa triển khai lên Cloudflare Pages.**
