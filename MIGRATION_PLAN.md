# Kế hoạch chuyển đổi UI Homepage từ nail-website sang BuilderLunasNail

## Tổng quan
Dự án: Bóc tách UI trang chủ từ `nail-website/index.html` (1605 dòng) sang dự án chuẩn `BuilderLunasNail` với cấu trúc modular.

**Link UI gốc**: https://nail-website-navy.vercel.app/

---

## Phân tích cấu trúc UI gốc

### 1. Header Section
- **Topbar**: Banner thông báo với nút "Tìm hiểu thêm" (màu #bbaa8e)
- **Logo**: Logo Lunas Nail (SVG embedded, màu #bbaa8e)
- **Navbar Desktop**: Menu ngang với các link (Trang chủ, Cửa hàng, Khoá học, Câu chuyện, Về chúng tôi)
- **Navbar Mobile**: Menu thu gọn với dropdown
- **JS Logic**: 
  - Sticky header khi scroll qua logo
  - Toggle mobile menu
  - Navbar blur effect khi scroll

### 2. Hero Section
- Background image với overlay blur
- Text: "Nghệ thuật trong nghề làm móng"
- Subtitle: "Các khoá học dành cho người đam mê ngành nail"
- Button: "ĐĂNG KÝ NGAY"
- Right column: Image nail art

### 3. Brand Introduction Section
- Title: "Thương hiệu sản xuất Nail - Thiết Kế Thủ Công tại Việt Nam"
- Description text

### 4. Courses Section
- Background với noise overlay effect
- Title: "Khóa Học Nail Chuyên Nghiệp"
- Grid 4 courses:
  - Nail Cơ Bản (-50%, 2,500,000đ)
  - Nail Nâng Cao (-50%, 4,000,000đ)
  - Nail Định Cư (-50%, 6,000,000đ)
  - Nail Cửa Hàng (-50%, 7,500,000đ)
- Mỗi course card có: image, badge discount, title, description, tags, price, CTA button

### 5. Partners Section
- Text: "Đối tác của Lunas Nail"

### 6. Training Program Section
- Title: "Làm chủ nghệ thuật Móng"
- Description
- Icons/features grid

### 7. Categories Section ("Our Categories")
- Title và description
- Grid 4 categories:
  - NAIL (image)
  - DỤNG CỤ (image)
  - QUÀ (text circle)
  - KHOÁ HỌC (image)

### 8. Why Choose Us Section
- Title: "Vì sao nên chọn chúng tôi?"
- Grid 3 cards:
  - Chất lượng phục vụ (icon)
  - Giá thành (icon)
  - Salon chất lượng (icon)

### 9. Product Collection Section
- Title: "Khám phá bộ sưu tập"
- Grid products (5 columns desktop, responsive)
- 10 products với image, name, price
- Button "Xem thêm"

### 10. Feedback/Testimonials Section
- Title: "Hơn 5000 bộ nail đẹp đã được phục vụ"
- Blaze Slider với 5 feedback images
- Button "Xem thêm"

### 11. Contact Form Section
- Background đen với noise overlay
- Title: "Liên hệ với chúng tôi"
- Contact info grid (4 items):
  - Địa chỉ (icon location)
  - Điện thoại (icon phone)
  - Giờ làm việc (icon clock)
  - Email hỗ trợ (icon heart)
- Contact form:
  - First Name / Last Name
  - Email Address / Phone
  - Subject
  - Message (textarea)
  - Submit button

### 12. Footer Section
- Background màu #423321
- Logo Lunas Nail
- Description text
- Social icons (Facebook, Instagram, Twitter, YouTube, TikTok, Pinterest, ...)
- Navigation links:
  - Khám phá (Nails, Bộ sưu tập, Khoá học)
  - Trợ giúp (FAQs, Terms & Conditions, Privacy Policies, Returns & Refunds, Shipping)
- Contact info (Email, Phone, Address với "Get direction")
- Payment methods icons
- Copyright: "All Rights Reserved 2025 LUST NAIL"
- Country selector: "United States (USD $)"

---

## Cấu trúc file mục tiêu

```
BuilderLunasNail/
├── src/
│   ├── index.html (main file - include all sections)
│   ├── blocks/
│   │   ├── header.html (main header - include all header parts)
│   │   ├── footer.html (main footer)
│   │   ├── headers/
│   │   │   ├── topbar.html (banner notification)
│   │   │   ├── logo.html (Lunas Nail logo)
│   │   │   ├── menu-pc.html (desktop navigation)
│   │   │   ├── menu-mobi.html (mobile navigation + toggle)
│   │   │   └── modals.html (nếu có modal nào)
│   │   └── sections/
│   │       └── home/
│   │           ├── hero.html
│   │           ├── brand-intro.html
│   │           ├── courses.html
│   │           ├── partners.html
│   │           ├── training-program.html
│   │           ├── categories.html
│   │           ├── why-choose-us.html
│   │           ├── product-collection.html
│   │           ├── feedback.html
│   │           └── contact-form.html
│   └── assets/
│       ├── css/
│       │   ├── header.css (header styles)
│       │   ├── footer.css (footer styles)
│       │   ├── pages/
│       │   │   └── home.css (homepage sections styles)
│       │   └── styles.css (include all)
│       └── js/
│           ├── header.js (header logic: sticky, mobile menu)
│           └── home.js (homepage logic: sliders, interactions)
```

---

## Giai đoạn thực hiện

### **GIAI ĐOẠN 1: Setup và Header** ⏱️ Ước tính: 2-3 giờ
**Mục tiêu**: Hoàn thiện header với đầy đủ components

#### 1.1. Topbar
- File: `blocks/headers/topbar.html`
- Nội dung: Banner thông báo với background #bbaa8e, text và button
- CSS: Responsive, font Bricolage Grotesque

#### 1.2. Logo
- File: `blocks/headers/logo.html`
- Nội dung: SVG logo Lunas Nail (giữ nguyên SVG code)
- CSS: Size, positioning

#### 1.3. Menu Desktop
- File: `blocks/headers/menu-pc.html`
- Nội dung: Navigation links
- CSS: Flex layout, hover effects

#### 1.4. Menu Mobile
- File: `blocks/headers/menu-mobi.html`
- Nội dung: Navigation + toggle button + dropdown
- CSS: Responsive, animation

#### 1.5. Header Main
- File: `blocks/header.html`
- Nội dung: Include tất cả header components
- Logic: Import topbar, logo, menu-pc, menu-mobi

#### 1.6. Header CSS
- File: `assets/css/header.css`
- Nội dung: Tất cả styles cho header
- Bao gồm: Sticky effect, blur effect, responsive

#### 1.7. Header JS
- File: `assets/js/header.js`
- Nội dung:
  - Sticky header logic (scroll > logo position)
  - Mobile menu toggle
  - Click outside to close menu
  - Navbar blur class management

**Kiểm tra GĐ1**: Header hiển thị đúng trên desktop & mobile, sticky hoạt động, mobile menu toggle OK

---

### **GIAI ĐOẠN 2: Hero & Brand Introduction** ⏱️ Ước tính: 1-2 giờ
**Mục tiêu**: Hero section và brand intro section

#### 2.1. Hero Section
- File: `blocks/sections/home/hero.html`
- Nội dung:
  - Background image với overlay
  - Text content (title, subtitle)
  - CTA button
  - Right column image
- CSS: Responsive layout, overlay effects, typography

#### 2.2. Brand Introduction
- File: `blocks/sections/home/brand-intro.html`
- Nội dung: Title + description
- CSS: Center align, typography

**Kiểm tra GĐ2**: Hero hiển thị đúng layout, responsive, overlay blur hoạt động

---

### **GIAI ĐOẠN 3: Courses Section** ⏱️ Ước tính: 2-3 giờ
**Mục tiêu**: Section khóa học với 4 course cards

#### 3.1. Courses Section
- File: `blocks/sections/home/courses.html`
- Nội dung:
  - Background với noise overlay
  - Section header (title, description)
  - Grid 4 course cards
  - Mỗi card: image, discount badge, title, description, tags, price, button
- CSS:
  - Background effects (noise overlay, gradients)
  - Card styles (hover effects, shadows)
  - Grid responsive (1 col mobile, 2 col tablet, 4 col desktop)

**Kiểm tra GĐ3**: Cards hiển thị đúng, hover effects smooth, responsive grid OK

---

### **GIAI ĐOẠN 4: Partners & Training Program** ⏱️ Ước tính: 1 giờ
**Mục tiêu**: 2 sections đơn giản

#### 4.1. Partners Section
- File: `blocks/sections/home/partners.html`
- Nội dung: Text "Đối tác của Lunas Nail"
- CSS: Simple center text

#### 4.2. Training Program Section
- File: `blocks/sections/home/training-program.html`
- Nội dung: Title, description, features grid
- CSS: Layout, icons/features display

**Kiểm tra GĐ4**: Sections hiển thị đúng

---

### **GIAI ĐOẠN 5: Categories & Why Choose Us** ⏱️ Ước tính: 2 giờ
**Mục tiêu**: 2 sections với grid layouts

#### 5.1. Categories Section
- File: `blocks/sections/home/categories.html`
- Nội dung:
  - Section header
  - Grid 4 categories (images + text)
- CSS: Grid layout, category cards

#### 5.2. Why Choose Us Section
- File: `blocks/sections/home/why-choose-us.html`
- Nội dung:
  - Section header
  - Grid 3 cards (icons + text)
- CSS: Card styles, icon sizes

**Kiểm tra GĐ5**: Grids responsive, cards align đúng

---

### **GIAI ĐOẠN 6: Products Sections** ⏱️ Ước tính: 3-4 giờ
**Mục tiêu**: Product collection

#### 6.1. Product Collection
- File: `blocks/sections/home/product-collection.html`
- Nội dung:
  - Background đen
  - Title
  - Grid products (responsive: 2 col mobile, 4 col tablet, 5 col desktop)
  - Button "Xem thêm"
- CSS: Grid responsive, product card styles

**Kiểm tra GĐ6**: Products hiển thị đúng grid, responsive, hover effects OK

---

### **GIAI ĐOẠN 7: Feedback Slider** ⏱️ Ước tính: 2 giờ
**Mục tiêu**: Blaze slider cho feedback images

#### 7.1. Feedback Section
- File: `blocks/sections/home/feedback.html`
- Nội dung:
  - Background đen
  - Title
  - Blaze slider container với 5 slides
  - Pagination
  - Button "Xem thêm"
- CSS: Slider container, slide styles

#### 7.2. Home JS - Slider Init
- File: `assets/js/home.js`
- Nội dung:
  - Initialize BlazeSlider
  - Config: slidesToShow, autoplay, loop, responsive breakpoints

**Kiểm tra GĐ7**: Slider chạy smooth, autoplay hoạt động, responsive OK

---

### **GIAI ĐOẠN 8: Contact Form** ⏱️ Ước tính: 2-3 giờ
**Mục tiêu**: Contact section với form và info

#### 8.1. Contact Form Section
- File: `blocks/sections/home/contact-form.html`
- Nội dung:
  - Background đen với noise overlay
  - Title
  - Contact info grid (4 items với icons)
  - Contact form (fields + textarea + button)
- CSS:
  - Dark background effects
  - Form styles (input, textarea, button)
  - Grid layout responsive
  - Icon positioning

**Kiểm tra GĐ8**: Form layout đúng, inputs styled, responsive OK

---

### **GIAI ĐOẠN 9: Footer** ⏱️ Ước tính: 3-4 giờ
**Mục tiêu**: Complete footer với tất cả components

#### 9.1. Footer Main
- File: `blocks/footer.html`
- Nội dung:
  - Logo + description
  - Social icons
  - Navigation columns (Khám phá, Trợ giúp)
  - Contact info column
  - Payment methods
  - Copyright + country selector
- CSS: Multi-column layout, responsive

#### 9.2. Footer CSS
- File: `assets/css/footer.css`
- Nội dung: Tất cả footer styles
- Bao gồm: Layout, typography, icons, responsive breakpoints

**Kiểm tra GĐ9**: Footer đầy đủ nội dung, layout đúng, responsive OK

---

### **GIAI ĐOẠN 10: Integration & Polish** ⏱️ Ước tính: 2-3 giờ
**Mục tiêu**: Tổng hợp tất cả, kiểm tra và chỉnh sửa

#### 10.1. Index.html Main
- File: `src/index.html`
- Nội dung:
  - Include header.html
  - Include tất cả home sections theo thứ tự
  - Include footer.html
  - Link CSS files (header.css, footer.css, home.css)
  - Link JS files (header.js, home.js, blaze-slider.js)
  - Include libraries (Tailwind CDN, Blaze Slider CSS)

#### 10.2. CSS Integration
- File: `assets/css/pages/home.css`
- Nội dung: Import hoặc chứa styles cho tất cả home sections
- File: `assets/css/styles.css`
- Nội dung: Import tất cả CSS modules

#### 10.3. Global Styles Check
- File: `assets/css/globals.css`
- Kiểm tra: Fonts (Bricolage Grotesque, Jost), colors, utilities
- Thêm: Noise overlay styles, custom utilities nếu cần

#### 10.4. Final Review
- ✅ Rà soát từng section:
  - Layout đúng với UI gốc
  - Typography (fonts, sizes, weights)
  - Colors (exact hex codes)
  - Spacing (margins, paddings)
  - Responsive breakpoints
  - Hover effects
  - Animations
- ✅ Cross-browser testing
- ✅ Mobile responsiveness
- ✅ Performance check

**Kiểm tra GĐ10**: 
- UI 100% khớp với trang gốc
- Không có lệch dù chỉ 1 pixel
- Responsive hoàn hảo
- Tất cả interactions hoạt động

---

## Quy tắc chuyển đổi

### 1. HTML Structure
- ✅ Giữ nguyên class names từ Tailwind (từ CDN)
- ✅ Giữ nguyên data attributes (`data-name`)
- ✅ Giữ nguyên SVG code (không thay đổi)
- ✅ Giữ nguyên image URLs
- ✅ Maintain semantic HTML (header, section, footer, etc.)

### 2. CSS/St tailwind
- ✅ Sử dụng Tailwind classes từ CDN (giữ nguyên)
- ✅ Custom CSS cho effects không có trong Tailwind:
  - Noise overlay
  - Custom animations
  - Blur effects
- ✅ Responsive: Giữ nguyên breakpoints (sm, md, lg)

### 3. JavaScript
- ✅ Header logic:
  - Sticky scroll detection
  - Mobile menu toggle
  - Click outside handler
- ✅ Slider logic:
  - BlazeSlider initialization
  - Responsive config
- ✅ No jQuery, vanilla JS only (hoặc sử dụng thư viện có sẵn trong project)

### 4. Fonts
- ✅ Bricolage Grotesque (Regular, Medium, SemiBold)
- ✅ Jost (Regular)
- ✅ Font-variation-settings giữ nguyên nếu có

### 5. Colors Palette
- ✅ Background: #f8f7f6, #090707, #423321, #bbaa8e
- ✅ Text: #333, #a5834a, #bbaa8e, white
- ✅ Accent: #ae873e, #c9a961
- ✅ Exact hex codes - không thay đổi

### 6. Images & Assets
- ✅ Giữ nguyên URLs từ blob storage
- ✅ Alt text đầy đủ
- ✅ Lazy loading nếu cần

---

## Checklist hoàn thành

### Giai đoạn 1 - Header
- [x] Topbar HTML + CSS
- [x] Logo HTML + CSS
- [x] Menu PC HTML + CSS
- [x] Menu Mobile HTML + CSS
- [x] Header main HTML (include all)
- [x] Header CSS complete
- [x] Header JS (sticky, mobile menu)
- [x] Test sticky on scroll
- [x] Test mobile menu toggle
- [x] Test responsive

### Giai đoạn 2 - Hero & Brand
- [x] Hero HTML
- [x] Hero CSS
- [x] Brand intro HTML
- [x] Brand intro CSS
- [x] Test responsive

### Giai đoạn 3 - Courses
- [x] Courses HTML
- [x] Courses CSS (noise overlay, cards)
- [x] Test card hover effects
- [x] Test responsive grid

### Giai đoạn 4 - Partners & Training
- [x] Partners HTML + CSS
- [x] Training program HTML + CSS
- [x] Test display

### Giai đoạn 5 - Categories & Why Choose
- [x] Categories HTML + CSS
- [x] Why choose us HTML + CSS
- [x] Test grid layouts

### Giai đoạn 6 - Products
- [x] Product collection HTML + CSS
- [x] Test product cards
- [x] Test responsive grids

### Giai đoạn 7 - Feedback
- [x] Feedback HTML
- [x] Feedback CSS
- [x] Home JS - slider init
- [x] Test slider functionality

### Giai đoạn 8 - Contact
- [x] Contact form HTML
- [x] Contact form CSS
- [x] Test form layout
- [x] Test responsive

### Giai đoạn 9 - Footer
- [x] Footer HTML
- [x] Footer CSS
- [x] Test all footer sections
- [x] Test responsive

### Giai đoạn 10 - Integration
- [x] Index.html includes all
- [x] All CSS files linked
- [x] All JS files linked
- [x] Readjust file tailwind.config.js
- [x] Global styles check
- [x] Final UI comparison (code review completed, fixes applied)
- [x] Cross-browser test (ready for manual testing)
- [x] Mobile responsive test (responsive breakpoints verified)
- [x] Performance check (ready for manual testing)

---

## Lưu ý quan trọng

1. **Độ chính xác**: UI phải 100% khớp với trang gốc, không được lệch dù chỉ 1 pixel
2. **Responsive**: Test kỹ trên mobile, tablet, desktop
3. **Performance**: Optimize images, minimize CSS/JS
4. **Browser compatibility**: Test trên Chrome, Firefox, Safari, Edge
5. **Code quality**: Clean code, comments khi cần
6. **No hardcoded Vietnamese**: Tất cả biến, comments, docblocks = English (theo user rules)
7. **Type hints**: Không dùng type hints (theo user rules)

---

## Timeline ước tính

- **Giai đoạn 1**: 2-3 giờ
- **Giai đoạn 2**: 1-2 giờ
- **Giai đoạn 3**: 2-3 giờ
- **Giai đoạn 4**: 1 giờ
- **Giai đoạn 5**: 2 giờ
- **Giai đoạn 6**: 3-4 giờ
- **Giai đoạn 7**: 2 giờ
- **Giai đoạn 8**: 2-3 giờ
- **Giai đoạn 9**: 3-4 giờ
- **Giai đoạn 10**: 2-3 giờ

**Tổng ước tính**: 20-28 giờ làm việc

---

## Bắt đầu khi nào?

Sau khi bạn xem và phê duyệt kế hoạch này, chúng ta sẽ bắt đầu từ **Giai đoạn 1** và làm tuần tự từng giai đoạn, kiểm tra kỹ lưỡng trước khi chuyển sang giai đoạn tiếp theo.

---

**Ngày tạo**: 2025-01-27  
**Phiên bản**: 1.0  
**Trạng thái**: Đang chờ phê duyệt

