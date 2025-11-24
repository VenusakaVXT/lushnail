# Phân Tích UI - Form Đăng Ký Khóa Học

## 1. CẤU TRÚC LAYOUT

### 1.1. Layout Tổng Thể
- **Kiểu layout**: 2 cột (2-column grid)
- **Bố cục**: 
  - **Bên trái (40-45%)**: Hình ảnh tay cầm ly champagne với nail art
  - **Bên phải (55-60%)**: Form đăng ký khóa học
- **Căn chỉnh**: 
  - Hình ảnh bên trái căn dưới (items-end)
  - Form bên phải căn giữa theo chiều dọc
- **Responsive**: 
  - Mobile: Stack vertical (1 cột)
  - Desktop: 2 cột ngang

### 1.2. Golden Swirl Decoration
- **Vị trí**: Absolute positioning, z-index thấp
- **Hướng**: Từ góc trên trái, quét qua phía trên, tạo vòng lặp lớn bên phải
- **Kích thước**: Rất lớn, vượt ra ngoài viewport (900px - 1600px width)
- **Transform**: translate-x và translate-y để căn chỉnh

## 2. MÀU SẮC (COLOR SCHEME)

### 2.1. Background
- **Màu chính**: `#000000` (Black - solid black)
- **Không có gradient**, nền đen thuần

### 2.2. Accent Colors (Vàng/Gold)
- **Gold chính**: `#D4AF37` (Rich gold)
- **Gold nhạt**: `rgba(212, 175, 55, 0.4-0.85)` (Với opacity)
- **Gold button**: `#8B6914` (Matte gold/brown)
- **Gold hover**: `#7A5A12`
- **Gold active**: `#6B5A10`

### 2.3. Form Elements
- **Input background**: `#1a1a1a` (Dark grey, gần đen)
- **Input border**: `#2a2a2a` (Lighter dark grey)
- **Input text**: `#e0e0e0` (Light grey)
- **Placeholder**: `#999999` (Medium grey)
- **Focus border**: `#D4AF37/40` (Gold với 40% opacity)

### 2.4. Text Colors
- **Heading lớn**: `#FFFFFF` (White) với golden glow
- **Heading nhỏ**: `#D4AF37` (Light gold)
- **Button text**: `#FFFFFF` (White)

## 3. TYPOGRAPHY (FONTS)

### 3.1. Heading Lớn - "ĐĂNG KÝ KHÓA HỌC"
- **Font family**: `'BricolageGrotesque', 'Montserrat', sans-serif`
- **Font weight**: `bold` (700)
- **Font size**: 
  - Mobile: `42px`
  - Tablet: `52px`
  - Desktop: `62px`
  - Large: `72px`
- **Line height**: `1.1` (Tight)
- **Letter spacing**: `-0.02em` (Tight tracking)
- **Text shadow**: Golden glow effect
  - `0 0 15px rgba(212, 175, 55, 0.4)`
  - `0 0 30px rgba(212, 175, 55, 0.25)`
  - `0 0 45px rgba(212, 175, 55, 0.15)`

### 3.2. Heading Nhỏ - "Tham gia khóa học của chúng tôi"
- **Font family**: `'Playfair Display', serif` (Elegant serif)
- **Font weight**: `light` (300)
- **Font size**: 
  - Mobile: `17px`
  - Tablet: `19px`
  - Desktop: `21px`
- **Letter spacing**: `0.02em` (Slightly wider)
- **Color**: `#D4AF37`

### 3.3. Form Inputs
- **Font family**: `'Montserrat', 'Avenir', sans-serif`
- **Font size**: 
  - Mobile: `15px`
  - Desktop: `16px` (base)
- **Font weight**: Regular (400)

### 3.4. Button
- **Font family**: `'Montserrat', 'BricolageGrotesque', sans-serif`
- **Font size**: `16px`
- **Font weight**: `semibold` (600)

## 4. KÍCH THƯỚC & SPACING

### 4.1. Container
- **Max width**: `1280px` (max-w-7xl)
- **Padding**: 
  - Mobile: `16px` (px-4)
  - Tablet: `24px` (px-6)
  - Desktop: `32px` (px-8)
  - Large: `48px` (px-12)

### 4.2. Grid Gap
- **Mobile**: `24px` (gap-6)
- **Desktop**: `48px` (gap-12)
- **Large**: `64px` (gap-16)

### 4.3. Form Spacing
- **Field spacing**: `18px` (mobile) / `20px` (desktop)
- **Input padding**: `16px` (mobile) / `16px` (desktop) vertical, `20px` horizontal
- **Input border radius**: `12px`
- **Button padding**: `16px` vertical, `32px` horizontal

### 4.4. Image Container
- **Max width**: 
  - Mobile: `400px`
  - Tablet: `450px`
  - Desktop: `500px`
  - Large: `550px`

## 5. HÌNH ẢNH & DECORATION

### 5.1. Main Image (Left Side)
- **Nội dung**: Tay cầm ly champagne với nail art
- **Position**: Relative, căn dưới (items-end)
- **Z-index**: 10 (trên background)

### 5.2. Golden Swirl Images
- **Glitter 2** (Main swirl):
  - Width: `900px` - `1600px` (responsive)
  - Position: Top-right
  - Transform: `translate-x-[25%] -translate-y-[12%]`
  
- **Glitter 1** (Additional swirl):
  - Width: `700px` - `1100px` (responsive)
  - Position: Top-left
  - Transform: `translate-x-[-25%] -translate-y-[20%]`
  - Opacity: `85%`

### 5.3. Glitter Particles
- **Vị trí**: Xung quanh base của glass
- **Kích thước**: `64px` - `96px` (w-16, w-24)
- **Effect**: Radial gradient với blur
- **Opacity**: `40-50%`

## 6. FORM ELEMENTS

### 6.1. Input Fields
- **Background**: Dark grey (`#1a1a1a`)
- **Border**: `1px solid #2a2a2a`
- **Border radius**: `12px`
- **Focus state**: Border chuyển sang gold với opacity 40%
- **Transition**: `200ms` cho tất cả properties

### 6.2. Textarea (Notes Field)
- **Rows**: `4`
- **Resize**: `none` (không cho resize)
- **Styling**: Giống input fields

### 6.3. Submit Button
- **Background**: Matte gold (`#8B6914`)
- **Hover**: Darker gold (`#7A5A12`)
- **Active**: Darkest gold (`#6B5A10`)
- **Shadow**: `0 4px 12px rgba(139,105,20,0.3)`
- **Arrow icon**: SVG inline, có animation translate-x khi hover

## 7. EFFECTS & ANIMATIONS

### 7.1. Text Shadow (Golden Glow)
- Multiple layers để tạo hiệu ứng glow mềm mại
- 3 layers với opacity giảm dần

### 7.2. Button Hover
- Background color transition
- Arrow icon translate-x animation
- Shadow enhancement

### 7.3. Input Focus
- Border color transition sang gold
- Smooth 200ms transition

## 8. Z-INDEX LAYERING

- **Background decorations**: `z-0`
- **Main content container**: `z-10`
- **Form section**: `z-20`
- **Image**: `z-10` (trong container)

## 9. RESPONSIVE BREAKPOINTS

- **Mobile**: Default (< 768px)
- **Tablet**: `md:` (≥ 768px)
- **Desktop**: `lg:` (≥ 1024px)
- **Large**: `xl:` (≥ 1280px)

