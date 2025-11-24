# Các Bước Xây Dựng UI - Form Đăng Ký Khóa Học

## BƯỚC 1: Tạo Container Chính

```html
<section class="bg-black relative w-full overflow-hidden min-h-screen flex items-center py-12 md:py-16 lg:py-20">
  <!-- Content sẽ được thêm vào đây -->
</section>
```

**Giải thích:**
- `bg-black`: Nền đen thuần
- `relative`: Để absolute elements bên trong có thể position
- `overflow-hidden`: Ẩn phần decoration vượt ra ngoài
- `min-h-screen`: Chiều cao tối thiểu bằng viewport
- `flex items-center`: Căn giữa theo chiều dọc

---

## BƯỚC 2: Thêm Golden Swirl Decorations (Background Layer)

```html
<!-- Large Golden Swirl - Main Decorative Element -->
<div class="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
  <!-- Glitter 2 - Large golden ribbon swirl forming loop on right side -->
  <img src="./assets/images/glitter2.png" 
       alt="Golden Swirl Decoration" 
       class="absolute top-0 right-0 w-[900px] md:w-[1100px] lg:w-[1400px] xl:w-[1600px] h-auto opacity-100 translate-x-[25%] -translate-y-[12%] lg:translate-x-[18%] lg:-translate-y-[8%]">
  
  <!-- Glitter 1 - Additional swirl from top-left -->
  <img src="./assets/images/glitter1.png" 
       alt="Golden Glitter Decoration" 
       class="absolute top-0 left-0 w-[700px] md:w-[900px] lg:w-[1100px] h-auto opacity-85 -translate-x-[25%] -translate-y-[20%] lg:-translate-x-[15%] lg:-translate-y-[15%]">
</div>
```

**Giải thích:**
- `absolute top-0 left-0`: Position absolute ở góc trên trái
- `pointer-events-none`: Không chặn click events
- `z-0`: Layer thấp nhất
- `translate-x` và `translate-y`: Dịch chuyển để căn chỉnh vị trí
- Responsive width: Tăng kích thước theo breakpoint

---

## BƯỚC 3: Tạo Main Content Container

```html
<div class="container mx-auto px-4 md:px-6 lg:px-8 xl:px-12 relative z-10 w-full max-w-7xl">
  <!-- Grid container sẽ được thêm vào đây -->
</div>
```

**Giải thích:**
- `container mx-auto`: Container với margin auto
- `relative z-10`: Layer trên decorations
- `max-w-7xl`: Giới hạn chiều rộng tối đa 1280px

---

## BƯỚC 4: Tạo Grid Layout (2 Cột)

```html
<div class="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 xl:gap-16 items-end">
  <!-- Left side: Image -->
  <!-- Right side: Form -->
</div>
```

**Giải thích:**
- `grid-cols-1`: 1 cột trên mobile
- `lg:grid-cols-2`: 2 cột từ desktop trở lên
- `items-end`: Căn các items xuống dưới (để image căn dưới)
- `gap-*`: Khoảng cách giữa các cột

---

## BƯỚC 5: Xây Dựng Phần Bên Trái (Hình Ảnh)

```html
<!-- Left Side - Hand with Champagne Glass -->
<div class="relative flex justify-center lg:justify-start items-end order-2 lg:order-1 pb-4 lg:pb-0">
  <div class="relative w-full max-w-[400px] md:max-w-[450px] lg:max-w-[500px] xl:max-w-[550px]">
    <!-- Champagne Glass Image -->
    <img src="./assets/images/shutterstock.jpg" 
         alt="Hand holding champagne glass with nail art" 
         class="w-full h-auto object-contain relative z-10">
    
    <!-- Small golden glitter particles scattered around base of glass -->
    <div class="absolute bottom-0 left-0 w-24 h-24 pointer-events-none z-0 opacity-50">
      <div class="w-full h-full rounded-full blur-2xl" 
           style="background: radial-gradient(circle, rgba(212, 175, 55, 0.4) 0%, rgba(212, 175, 55, 0.2) 50%, transparent 100%);"></div>
    </div>
    <div class="absolute top-8 right-4 w-16 h-16 pointer-events-none z-0 opacity-40">
      <div class="w-full h-full rounded-full blur-xl" 
           style="background: radial-gradient(circle, rgba(212, 175, 55, 0.35) 0%, rgba(212, 175, 55, 0.15) 50%, transparent 100%);"></div>
    </div>
  </div>
</div>
```

**Giải thích:**
- `order-2 lg:order-1`: Trên mobile hiển thị sau, desktop hiển thị trước
- `items-end`: Căn hình ảnh xuống dưới
- `max-w-*`: Giới hạn kích thước responsive
- Glitter particles: Tạo bằng radial gradient với blur effect

---

## BƯỚC 6: Xây Dựng Phần Bên Phải (Form Container)

```html
<!-- Right Side - Registration Form -->
<div class="relative order-1 lg:order-2 z-20">
  <div class="max-w-[500px] mx-auto lg:mx-0">
    <!-- Form content sẽ được thêm vào đây -->
  </div>
</div>
```

**Giải thích:**
- `order-1 lg:order-2`: Trên mobile hiển thị trước, desktop hiển thị sau
- `z-20`: Layer cao nhất
- `max-w-[500px]`: Giới hạn chiều rộng form

---

## BƯỚC 7: Tạo Form Heading

```html
<!-- Form Heading -->
<div class="mb-8 md:mb-10 text-center lg:text-left">
  <!-- Smaller elegant serif text in light gold -->
  <p class="text-[#D4AF37] text-[17px] md:text-[19px] lg:text-[21px] mb-3 md:mb-4 tracking-[0.02em] font-light" 
     style="font-family: 'Playfair Display', serif;">
    Tham gia khóa học của chúng tôi
  </p>
  
  <!-- Larger bold sans-serif text in white with golden glow -->
  <h2 class="text-white text-[42px] md:text-[52px] lg:text-[62px] xl:text-[72px] font-bold mb-0 tracking-[-0.02em] leading-[1.1]" 
      style="font-family: 'BricolageGrotesque', 'Montserrat', sans-serif; text-shadow: 0 0 15px rgba(212, 175, 55, 0.4), 0 0 30px rgba(212, 175, 55, 0.25), 0 0 45px rgba(212, 175, 55, 0.15);">
    ĐĂNG KÝ KHÓA HỌC
  </h2>
</div>
```

**Giải thích:**
- Heading nhỏ: Serif font, màu gold, font-light
- Heading lớn: Sans-serif, bold, white với text-shadow tạo golden glow
- `text-shadow`: 3 layers để tạo hiệu ứng glow mềm mại
- Responsive font sizes: Tăng dần theo breakpoint

---

## BƯỚC 8: Tạo Form Fields

### 8.1. Input Field Template

```html
<div>
  <input 
    type="text" 
    name="fullName" 
    id="fullName"
    placeholder="Họ và Tên" 
    required
    class="w-full px-5 py-[16px] md:py-4 bg-[#1a1a1a] border border-[#2a2a2a] rounded-[12px] text-[#e0e0e0] placeholder-[#999999] text-[15px] md:text-base focus:outline-none focus:border-[#D4AF37]/40 focus:ring-0 transition-all duration-200"
    style="font-family: 'Montserrat', 'Avenir', sans-serif;">
</div>
```

**Giải thích:**
- `bg-[#1a1a1a]`: Background dark grey
- `border-[#2a2a2a]`: Border màu xám đen
- `rounded-[12px]`: Bo góc 12px
- `focus:border-[#D4AF37]/40`: Border chuyển sang gold khi focus
- `transition-all duration-200`: Smooth transition

### 8.2. Tất Cả Form Fields

```html
<form class="space-y-[18px] md:space-y-5" id="course-registration-form">
  <!-- Full Name Field -->
  <div>
    <input 
      type="text" 
      name="fullName" 
      id="fullName"
      placeholder="Họ và Tên" 
      required
      class="w-full px-5 py-[16px] md:py-4 bg-[#1a1a1a] border border-[#2a2a2a] rounded-[12px] text-[#e0e0e0] placeholder-[#999999] text-[15px] md:text-base focus:outline-none focus:border-[#D4AF37]/40 focus:ring-0 transition-all duration-200"
      style="font-family: 'Montserrat', 'Avenir', sans-serif;">
  </div>

  <!-- Phone Number (Zalo) Field -->
  <div>
    <input 
      type="tel" 
      name="phone" 
      id="phone"
      placeholder="SĐT (Zalo)" 
      required
      class="w-full px-5 py-[16px] md:py-4 bg-[#1a1a1a] border border-[#2a2a2a] rounded-[12px] text-[#e0e0e0] placeholder-[#999999] text-[15px] md:text-base focus:outline-none focus:border-[#D4AF37]/40 focus:ring-0 transition-all duration-200"
      style="font-family: 'Montserrat', 'Avenir', sans-serif;">
  </div>

  <!-- Email Field -->
  <div>
    <input 
      type="email" 
      name="email" 
      id="email"
      placeholder="Email" 
      required
      class="w-full px-5 py-[16px] md:py-4 bg-[#1a1a1a] border border-[#2a2a2a] rounded-[12px] text-[#e0e0e0] placeholder-[#999999] text-[15px] md:text-base focus:outline-none focus:border-[#D4AF37]/40 focus:ring-0 transition-all duration-200"
      style="font-family: 'Montserrat', 'Avenir', sans-serif;">
  </div>

  <!-- Notes Field (taller, multi-line text area) -->
  <div>
    <textarea 
      name="notes" 
      id="notes"
      rows="4" 
      placeholder="Ghi chú" 
      class="w-full px-5 py-[16px] md:py-4 bg-[#1a1a1a] border border-[#2a2a2a] rounded-[12px] text-[#e0e0e0] placeholder-[#999999] text-[15px] md:text-base focus:outline-none focus:border-[#D4AF37]/40 focus:ring-0 transition-all duration-200 resize-none"
      style="font-family: 'Montserrat', 'Avenir', sans-serif;"></textarea>
  </div>
</form>
```

**Giải thích:**
- `space-y-[18px]`: Khoảng cách giữa các fields
- Textarea: `rows="4"` và `resize-none` để giữ kích thước cố định

---

## BƯỚC 9: Tạo Submit Button

```html
<!-- Submit Button (warm matte gold/brown, white text with arrow) -->
<div class="pt-1 md:pt-2">
  <button 
    type="submit"
    class="w-full px-8 py-[16px] md:py-4 bg-[#8B6914] hover:bg-[#7A5A12] active:bg-[#6B5A10] text-white font-semibold rounded-[12px] transition-all duration-200 flex items-center justify-center gap-2 group shadow-[0_4px_12px_rgba(139,105,20,0.3)]"
    style="font-family: 'Montserrat', 'BricolageGrotesque', sans-serif; font-size: 16px;">
    <span>GỬI</span>
    <svg class="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-200" 
         fill="none" 
         stroke="currentColor" 
         viewBox="0 0 24 24" 
         stroke-width="2.5">
      <path stroke-linecap="round" 
            stroke-linejoin="round" 
            d="M9 5l7 7-7 7" />
    </svg>
  </button>
</div>
```

**Giải thích:**
- `bg-[#8B6914]`: Matte gold background
- `hover:bg-[#7A5A12]`: Darker khi hover
- `active:bg-[#6B5A10]`: Darkest khi click
- `shadow-*`: Box shadow với màu gold
- `group`: Để arrow icon có thể animate khi hover button
- `group-hover:translate-x-1`: Arrow dịch sang phải khi hover

---

## BƯỚC 10: Tổng Hợp Toàn Bộ Code

Kết hợp tất cả các bước trên vào một section hoàn chỉnh. Xem file `src/blocks/sections/home/contact-form.html` để tham khảo code đầy đủ.

---

## TIPS & BEST PRACTICES

### 1. Z-Index Management
- Background decorations: `z-0`
- Main content: `z-10`
- Form section: `z-20`

### 2. Responsive Design
- Luôn test trên mobile trước
- Sử dụng `order-*` để thay đổi thứ tự hiển thị
- Font sizes và spacing nên responsive

### 3. Color Consistency
- Sử dụng custom colors với bracket notation: `bg-[#1a1a1a]`
- Opacity với slash: `border-[#D4AF37]/40`

### 4. Typography
- Font families nên được define trong style attribute hoặc CSS
- Text shadows cho effects phức tạp

### 5. Performance
- Images nên được optimize
- Sử dụng `object-contain` cho images
- `pointer-events-none` cho decorative elements

### 6. Accessibility
- Luôn có `alt` text cho images
- Proper `label` hoặc `placeholder` cho form fields
- `required` attribute cho required fields

