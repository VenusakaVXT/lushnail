/**
 * TAILWIND CSS CONFIGURATION
 * File cấu hình chính của Tailwind CSS cho dự án BuilderVangBac
 */

const config = {
  // ========================================================================
  // DARK MODE CONFIGURATION
  // ========================================================================
  // "class" = Sử dụng class-based dark mode
  // Cách hoạt động:
  // 1. Thêm class "dark" vào <html> hoặc <body> để bật dark mode
  // 2. Sử dụng classes: dark:bg-gray-900, dark:text-white, etc.
  // 3. Ví dụ: <div class="bg-white dark:bg-gray-900 text-black dark:text-white">
  darkMode: ["class"],

  // ========================================================================
  // CONTENT CONFIGURATION
  // ========================================================================
  // Đường dẫn file HTML để Tailwind scan classes (chỉ classes được dùng mới build)
  content: process.env.TAILWIND_CONTENT
    ? [process.env.TAILWIND_CONTENT]
    : [
      "src/index.html",
      "src/blocks/**/*.html",
      "src/blocks/**/**/*.html",
    ],

  // Prefix cho classes (để tránh xung đột CSS)
  prefix: "",

  // ========================================================================
  // SAFELIST CONFIGURATION
  // ========================================================================
  // Danh sách các class luôn được giữ lại trong CSS output
  // Ngay cả khi không tìm thấy trong file HTML đang scan
  // Đảm bảo các component class luôn có sẵn
  safelist: [
    // Badge classes (badge, badge-primary, badge-secondary, badge-primary-gradient, badge-classic, badge-feature, badge-hot)
    { pattern: /^badge(-[a-z0-9-]+)*$/ },
    // Button classes (btn, btn-primary, btn-secondary, btn-outline, btn-primary-gradient, etc.)
    { pattern: /^btn(-[a-z0-9-]+)*$/ },
    // Product card classes (product-card, product-card__image, product-card__body, product-card__title, product-card__price, product-card__price-original)
    { pattern: /^product-card(__[a-z0-9-]+)?$/ },
    // Course card classes (course-card, course-card__image, course-card__body, course-card__title, etc.)
    { pattern: /^course-card(__[a-z0-9-]+)?$/ },
    // Review card classes (review__card, review__card-body, review__card-ratings, review__card-quote, etc.)
    { pattern: /^review__(card|[a-z0-9-]+)?$/ },
    // Tabs classes (tabs, tabs-btn, tab-menu, tab-content, tab-menu-wrapper)
    { pattern: /^tabs(-[a-z0-9-]+)*$/ },
    { pattern: /^tab(-[a-z0-9-]+)*$/ },
    // Pagination classes (pagination, pagination-btn, pagination-btn-active, pagination-btn-prev, pagination-btn-next, pagination-btn-number)
    { pattern: /^pagination(-[a-z0-9-]+)*$/ },
    // Modal classes (jmodal, jmodal-content)
    { pattern: /^jmodal(-[a-z0-9-]+)*$/ },
    // Input classes (input, input-outline, input-outline-dark, input-lg, input-sm, input-icon)
    { pattern: /^input(-[a-z0-9-]+)*$/ },
    // Textarea classes (textarea, textarea-outline, textarea-outline-dark)
    { pattern: /^textarea(-[a-z0-9-]+)*$/ },
    // Select classes (select-white, select-outline, select-outline-dark)
    { pattern: /^select(-[a-z0-9-]+)*$/ },
    // Label classes
    { pattern: /^label(-[a-z0-9-]+)*$/ },
    // Section classes (section__button, title-section, title-section-dark, bg-section-white-yellow, bg-section-yellow-white)
    { pattern: /^section__(.+)?$/ },
    { pattern: /^title-section(-[a-z0-9-]+)*$/ },
    { pattern: /^bg-section(-[a-z0-9-]+)*$/ },
    // Overlay classes (overlay-dark, overlay-light, noise-overlay)
    { pattern: /^overlay(-[a-z0-9-]+)*$/ },
    { pattern: /^noise-overlay$/ },
    // FAQ classes (faq-item)
    { pattern: /^faq(-[a-z0-9-]+)*$/ },
    // Map classes (map-iframe)
    { pattern: /^map-([a-z0-9-]+)?$/ },
    // Location classes (location-card)
    { pattern: /^location-card(-[a-z0-9-]+)*$/ },
    // Scrollbar classes (scrollbar-hide)
    { pattern: /^scrollbar-hide$/ },
    // Container class
    { pattern: /^container$/ },
  ],

  // ========================================================================
  // THEME CONFIGURATION
  // ========================================================================
  theme: {
    // ========================================================================
    // CONTAINER CONFIGURATION
    // ========================================================================
    // Cấu hình responsive container (thay thế CSS trong globals.css)
    container: {
      center: true,                    // Tự động center
      padding: {
        DEFAULT: "1rem",              // px-4 (16px) mặc định
        sm: "1.5rem",                 // px-6 (24px) từ 640px
        lg: "2rem",                   // px-8 (32px) từ 1024px
      },
      screens: {
        sm: "640px",                  // max-width: 640px
        md: "768px",                  // max-width: 768px  
        lg: "1240px",                 // max-width: 1240px
        xl: "1280px",                 // max-width: 1280px
        "2xl": "1536px",              // max-width: 1536px
      },
    },

    // ========================================================================
    // EXTEND THEME (Mở rộng theme mặc định)
    // ========================================================================
    extend: {
      // ========================================================================
      // CUSTOM COLORS (Màu sắc tùy chỉnh)
      // ========================================================================
      colors: {
        // === CORE COLORS (Màu cơ bản) ===
        // Các màu này được định nghĩa trong globals.css và sử dụng CSS variables
        border: "var(--border)",                    // Màu border mặc định
        input: "var(--input)",                      // Màu border input
        ring: "var(--ring)",                        // Màu focus ring
        background: "var(--background)",            // Màu nền chính
        foreground: "var(--foreground)",            // Màu chữ chính

        // === PRIMARY COLORS (Màu chính) ===
        primary: {
          DEFAULT: "var(--primary)",                // Màu chính (emerald-600)
          foreground: "var(--primary-foreground)", // Màu chữ trên nền primary
        },

        // === TITLE COLORS (Màu tiêu đề) ===
        title: {
          DEFAULT: "var(--title)",                // Màu tiêu đề (emerald-700)
          foreground: "var(--title-foreground)", // Màu chữ trên nền title
        },

        // === SECONDARY COLORS (Màu phụ) ===
        secondary: {
          DEFAULT: "var(--secondary)",              // Màu phụ (gray-100)
          foreground: "var(--secondary-foreground)", // Màu chữ trên nền secondary
        },

        // === DESTRUCTIVE COLORS (Màu cảnh báo) ===
        destructive: {
          DEFAULT: "var(--destructive)",            // Màu nguy hiểm (red-500)
          foreground: "var(--destructive-foreground)", // Màu chữ trên nền destructive
        },

        // === MUTED COLORS (Màu nhạt) ===
        muted: {
          DEFAULT: "var(--muted)",                  // Màu nền nhạt
          foreground: "var(--muted-foreground)",   // Màu chữ nhạt
        },

        // === ACCENT COLORS (Màu nhấn) ===
        accent: {
          DEFAULT: "var(--accent)",                 // Màu nhấn
          foreground: "var(--accent-foreground)",  // Màu chữ trên nền accent
        },

        // === POPOVER COLORS (Màu popup) ===
        popover: {
          DEFAULT: "var(--popover)",                // Màu nền popup
          foreground: "var(--popover-foreground)", // Màu chữ trong popup
        },

        // === CARD COLORS (Màu thẻ) ===
        card: {
          DEFAULT: "var(--card)",                   // Màu nền thẻ
          foreground: "var(--card-foreground)",    // Màu chữ trong thẻ
        },

        // === DARK COLOR (Màu tối) ===
        dark: "var(--dark)",                         // Màu tối (#333)

        // === CUSTOM BRAND COLORS (Màu thương hiệu tùy chỉnh) ===
        // Các màu này được định nghĩa trong globals.css
        "brand-primary": "var(--brand-primary)",     // Màu chính thương hiệu
        "brand-secondary": "var(--brand-secondary)", // Màu phụ thương hiệu
        "brand-accent": "var(--brand-accent)",       // Màu nhấn thương hiệu
        "brand-success": "var(--brand-success)",     // Màu thành công
        "brand-warning": "var(--brand-warning)",     // Màu cảnh báo
        "brand-danger": "var(--brand-danger)",       // Màu nguy hiểm

        // === CUSTOM TEXT COLORS (Màu chữ tùy chỉnh) ===
        "text-primary": "var(--text-primary)",       // Màu chữ chính
        "text-secondary": "var(--text-secondary)",   // Màu chữ phụ
        "text-muted": "var(--text-muted)",           // Màu chữ nhạt
        "text-on-brand": "var(--text-on-brand)",     // Màu chữ trên nền thương hiệu

        // === CUSTOM SURFACE COLORS (Màu bề mặt tùy chỉnh) ===
        "surface-primary": "var(--surface-primary)",     // Bề mặt chính
        "surface-secondary": "var(--surface-secondary)", // Bề mặt phụ
        "surface-tertiary": "var(--surface-tertiary)",   // Bề mặt thứ 3
        "surface-brand": "var(--surface-brand)",         // Bề mặt thương hiệu
      },

      // ========================================================================
      // CUSTOM BORDER RADIUS (Bo góc tùy chỉnh)
      // ========================================================================
      // Các giá trị này sử dụng CSS variable --radius từ globals.css
      borderRadius: {
        lg: "var(--radius)",                    // Bo góc lớn (0.5rem)
        md: "calc(var(--radius) - 2px)",       // Bo góc vừa (0.375rem)
        sm: "calc(var(--radius) - 4px)",       // Bo góc nhỏ (0.25rem)
      },

      // ========================================================================
      // CUSTOM KEYFRAMES (Animation keyframes tùy chỉnh)
      // ========================================================================
      keyframes: {
        // === ACCORDION ANIMATIONS (Animation accordion) ===
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },

        // === MARQUEE ANIMATION (Animation chạy chữ) ===
        marquee: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(-100%)" },
        },

        // === FLOAT ANIMATION (Animation nổi lên xuống) ===
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },

        // === PULSE GLOW ANIMATION (Animation nhấp nháy phát sáng) ===
        // Sử dụng CSS variables để dễ dàng thay đổi màu sắc
        "pulse-glow": {
          "0%, 100%": {
            boxShadow: "0 0 20px color-mix(in srgb, var(--brand-warning) 30%, transparent)"
          },
          "50%": {
            boxShadow: "0 0 40px color-mix(in srgb, var(--brand-warning) 60%, transparent)"
          },
        },
      },

      // ========================================================================
      // CUSTOM ANIMATIONS (Animation tùy chỉnh)
      // ========================================================================
      animation: {
        // === ACCORDION ANIMATIONS ===
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",

        // === MARQUEE ANIMATION ===
        // Chạy chữ từ phải sang trái, lặp vô hạn
        marquee: "marquee 30s linear infinite",

        // === FLOAT ANIMATION ===
        // Nổi lên xuống nhẹ nhàng, lặp vô hạn
        float: "float 6s ease-in-out infinite",

        // === PULSE GLOW ANIMATION ===
        // Nhấp nháy phát sáng, lặp vô hạn
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
      },
    },
  },

  // ========================================================================
  // PLUGINS (Các plugin bổ sung)
  // ========================================================================
  // tailwindcss-animate: Plugin cung cấp các animation utilities
  plugins: [require("tailwindcss-animate")],
};

export default config;
