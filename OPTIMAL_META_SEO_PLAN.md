# Optimal Meta SEO Plan - Developer Checklist

## Tổng quan

Dưới góc độ dev (kỹ thuật) — không nói về nội dung, từ khóa hay text — một page chuẩn SEO cần đảm bảo các yếu tố sau. Đây là checklist bạn có thể áp dụng khi làm bất cứ page nào.

---

## ✅ 1. Cấu trúc HTML chuẩn & semantic

Dùng đúng thẻ HTML để Google hiểu bố cục:

- **Chỉ 1 thẻ `<h1>` trên mỗi trang**
- **Các thẻ cấu trúc**: `<header>`, `<main>`, `<footer>`, `<section>`, `<article>`, `<nav>`
- **Heading phân cấp logic**: `<h2>`, `<h3>`, …
- **Dùng đúng thẻ**: `<ul>`, `<li>`, `<strong>`, `<em>` …

---

## ✅ 2. Title, meta tags (dev setup)

- **`<title>`** — render đúng, không trùng nhau
- **`<meta name="description">`** — dynamic nếu là site CMS
- **canonical** — tránh trùng lặp nội dung
- **robots** — nếu cần index/noindex theo logic PHP/JS/Framework
- **Open Graph (OG tags)** cho social media
- **Twitter Card**

---

## ✅ 3. Image SEO (dev)

Không nói về ALT, mà về cấu hình dev:

- **Tạo nhiều size ảnh** và dùng `<img srcset>` + `<picture>` → responsive & tiết kiệm bandwidth
- **WebP/AVIF fallback** sang JPEG
- **Tối ưu dung lượng ảnh** tự động
- **Lazyload** (`loading="lazy"`)
- **CDN** nếu có

---

## ✅ 4. URL & Routing

- **URL thân thiện** (slug tự động tạo)
- **Không chứa ký tự lạ**
- **Remove querystring** không cần thiết
- **Redirect 301** khi đổi slug
- **Tự động thêm sitemap** khi có page mới

---

## ✅ 5. Sitemap & Robots

- **`/sitemap.xml`** sinh tự động
  - page, post, category, tags
  - update thời gian lastmod
- **`/robots.txt`** chuẩn, mở cho Googlebot trừ khi staging

---

## ✅ 6. Schema / Structured Data

Nên có JSON-LD:

- **Article**, **Product**, **FAQ**, **Breadcrumb**, **Organization**
- **Tạo dynamic** theo nội dung trong website
- **Kiểm tra structured data error** khi render

---

## ✅ 7. Performance & Core Web Vitals

**(Quan trọng nhất SEO kỹ thuật)**

### PageSpeed:

- **Minify HTML, CSS, JS**
- **Delay JS** không cần thiết (defer)
- **Critical CSS**
- **Cache header**
- **GZIP/Brotli**
- **HTTP/2** hoặc **HTTP/3**
- **Preload font**
- **Preload CSS critical** nếu cần

### Core Web Vitals:

- **LCP (Largest Contentful Paint)** < 2.5s
- **CLS (layout shift)** thấp → set width/height cho ảnh
- **FID/INP** tốt → JS nhẹ, không block UI

---

## ✅ 8. Server-side & Security

- **HTTPS (SSL)**
- **Content Security Policy**
- **Redirect non-www → www** (hoặc ngược lại)
- **Redirect http → https**
- **Cache layer**: Redis, Cloudflare, Nginx Cache

---

## ✅ 9. Mobile Friendly

- **Responsive full**
- **Font size tối thiểu 14px**
- **Khoảng cách giữa các nút > 48px**
- **Không lỗi khi dùng zoom** trên mobile

---

## ✅ 10. Internal Logic chống trùng lặp nội dung

- **Unique slug validator**
- **Meta canonical tự động**
- **Khi copy page** cần tránh duplicate meta/title
- **Pagination chuẩn SEO** (`rel="next" prev"` nếu cần)

---

## 🔥 Checklist tóm gọn cho Dev SEO

### Front-end

- ✔ Semantic HTML
- ✔ 1 H1
- ✔ Responsive images
- ✔ Lazyload
- ✔ Render meta đúng
- ✔ Render OG đúng
- ✔ Không lỗi CLS
- ✔ PageSpeed > 90

### Back-end

- ✔ Slug auto-generated
- ✔ Canonical
- ✔ Sitemap & Robots
- ✔ Schema JSON-LD
- ✔ Redirect 301
- ✔ Clean URL
- ✔ Cache optimization

---

## Ghi chú

- Checklist này tập trung vào **kỹ thuật**, không bao gồm nội dung, từ khóa hay text
- Áp dụng cho mọi page trong website
- Ưu tiên **Performance & Core Web Vitals** vì đây là yếu tố quan trọng nhất cho SEO kỹ thuật

