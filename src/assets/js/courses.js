/**
 * Courses Page JavaScript
 * Handles load more courses functionality and other interactive features
 */

document.addEventListener('DOMContentLoaded', function () {
  // Initialize Lucide icons after they're loaded
  function initIcons() {
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    } else {
      // Retry if lucide is not ready yet
      setTimeout(initIcons, 100);
    }
  }
  initIcons();

  // Load More Courses Functionality
  const loadMoreBtn = document.getElementById('load-more-btn');
  const loadMoreText = document.getElementById('load-more-text');
  const loadMoreLoading = document.getElementById('load-more-loading');
  const courseCardsGrid = document.getElementById('course-cards-grid');

  if (loadMoreBtn && courseCardsGrid) {
    // Sample additional courses data
    const additionalCourses = [
      {
        title: 'Nail Chuyên Nghiệp',
        description: 'Khóa học dành cho thợ nail chuyên nghiệp',
        image: 'https://m.media-amazon.com/images/I/51YC56BJ0WL._SL1024_.jpg',
        tags: ['30 bài học', 'Chứng chỉ quốc tế', 'Hỗ trợ việc làm'],
        price: '8,500,000đ',
        priceOld: '17,000,000đ',
        discount: '-50%'
      },
      {
        title: 'Nail Nghệ Thuật',
        description: 'Kỹ thuật nail art và thiết kế sáng tạo',
        image: 'https://m.media-amazon.com/images/I/7159sUj7TNL._SL1500_.jpg',
        tags: ['20 bài học', 'Nghệ thuật sáng tạo', 'Portfolio review'],
        price: '5,500,000đ',
        priceOld: '11,000,000đ',
        discount: '-50%'
      },
      {
        title: 'Nail Kỹ Thuật Số',
        description: 'Ứng dụng công nghệ trong nail',
        image: 'https://m.media-amazon.com/images/I/71vPZFCTi8L._SL1500_.jpg',
        tags: ['15 bài học', 'Công nghệ hiện đại', 'Tài liệu số'],
        price: '6,500,000đ',
        priceOld: '13,000,000đ',
        discount: '-50%'
      },
      {
        title: 'Nail Thương Mại',
        description: 'Quản trị và phát triển doanh nghiệp nail',
        image: 'https://m.media-amazon.com/images/I/71jqxWepZvL._SL1500_.jpg',
        tags: ['25 bài học', 'Quản trị doanh nghiệp', 'Tư vấn kinh doanh'],
        price: '9,000,000đ',
        priceOld: '18,000,000đ',
        discount: '-50%'
      }
    ];

    let currentPage = 1;
    const coursesPerPage = 4;
    const totalCourses = additionalCourses.length;
    let loadedCourses = 0;

    // Function to create course card HTML
    function createCourseCard(course) {
      return `
        <div class="course-card group">
          <div class="course-card__badge">
            <p class="  text-[13px]  emibold" style="font-variation-settings:'opsz' 14, 'wdth' 100">${course.discount}</p>
          </div>
          <div class="course-card__image-container">
            <img src="${course.image}" alt="${course.title}" class="course-card__image" loading="lazy">
            <div class="course-card__overlay">
              <a href="single-course.html" class="course-card__detail-button  " style="font-variation-settings:'opsz' 14, 'wdth' 100">CHI TIẾT</a>
            </div>
          </div>
          <div class="course-card__body">
            <div class="course-card__title-section">
              <a href="single-course.html"><h3 class="course-card__title   hover:text-[#ae873e] transition-colors cursor-pointer" style="font-variation-settings:'opsz' 14, 'wdth' 100">${course.title}</h3></a>
              <p class="course-card__description font-['Bricolage_Grotesque:Regular',_sans-serif]" style="font-variation-settings:'opsz' 14, 'wdth' 100">${course.description}</p>
            </div>
            <div class="course-card__tags">
              ${course.tags.map(tag => `<span class="course-card__tag font-['Bricolage_Grotesque:Medium',_sans-serif]" style="font-variation-settings:'opsz' 14, 'wdth' 100">${tag}</span>`).join('')}
            </div>
            <div class="course-card__price-section">
              <p class="course-card__price  " style="font-variation-settings:'opsz' 14, 'wdth' 100">${course.price}</p>
              <p class="course-card__price-old font-['Bricolage_Grotesque:Regular',_sans-serif]" style="font-variation-settings:'opsz' 14, 'wdth' 100">${course.priceOld}</p>
            </div>
            <a href="single-course.html" class="course-card__button  " style="font-variation-settings:'opsz' 14, 'wdth' 100">ĐĂNG KÝ NGAY</a>
          </div>
        </div>
      `;
    }

    // Function to load more courses
    function loadMoreCourses() {
      // Show loading state
      loadMoreBtn.disabled = true;
      loadMoreText.classList.add('hidden');
      loadMoreLoading.classList.remove('hidden');

      // Simulate API call delay
      setTimeout(() => {
        const coursesToLoad = additionalCourses.slice(loadedCourses, loadedCourses + coursesPerPage);
        
        if (coursesToLoad.length > 0) {
          coursesToLoad.forEach((course, index) => {
            const courseCardHTML = createCourseCard(course);
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = courseCardHTML.trim();
            const courseCardElement = tempDiv.firstChild;
            
            // Add fade-in animation class
            courseCardElement.style.opacity = '0';
            courseCardElement.style.transform = 'translateY(20px)';
            courseCardElement.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
            
            courseCardsGrid.appendChild(courseCardElement);
            
            // Trigger animation
            setTimeout(() => {
              courseCardElement.style.opacity = '1';
              courseCardElement.style.transform = 'translateY(0)';
            }, index * 100);
          });

          loadedCourses += coursesToLoad.length;
          currentPage++;

          // Check if all courses are loaded
          if (loadedCourses >= totalCourses) {
            // Hide button after animation
            setTimeout(() => {
              loadMoreBtn.style.display = 'none';
            }, 500);
          } else {
            // Reset button state
            loadMoreBtn.disabled = false;
            loadMoreText.classList.remove('hidden');
            loadMoreLoading.classList.add('hidden');
          }
        } else {
          // No more courses to load
          loadMoreBtn.style.display = 'none';
        }
      }, 800); // Simulate loading delay
    }

    // Add click event listener
    loadMoreBtn.addEventListener('click', loadMoreCourses);
  }

  // Scroll Animation Observer
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all elements with scroll animation classes
  const animatedElements = document.querySelectorAll('.scroll-fade-in, .scroll-slide-up, .scroll-slide-left, .scroll-slide-right');
  animatedElements.forEach(el => {
    observer.observe(el);
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // FAQ Interactive functionality
  const faqItems = document.querySelectorAll('.faq-item');
  const faqAnswer = document.querySelector('.faq-answer-content');

  if (faqItems.length > 0 && faqAnswer) {
    // Function to update answer with animation
    function updateAnswer(item) {
      // Remove active from all items
      faqItems.forEach(i => i.classList.remove('active'));

      // Add active to clicked item
      item.classList.add('active');

      // Get the answer content
      const answerText = item.getAttribute('data-answer');
      const answerTitle = item.querySelector('.faq-item-title').textContent;

      // Remove show class for animation
      faqAnswer.classList.remove('show-answer');

      // Wait for fade out
      setTimeout(() => {
        // Update content
        faqAnswer.querySelector('.faq-answer-title').textContent = answerTitle;
        faqAnswer.querySelector('.faq-answer-text').textContent = answerText;

        // Trigger animation
        setTimeout(() => {
          faqAnswer.classList.add('show-answer');
        }, 50);
      }, 300);
    }

    faqItems.forEach((item, index) => {
      item.addEventListener('click', function () {
        updateAnswer(this);
      });

      // Show first answer by default
      if (index === 0) {
        item.classList.add('active');
        const answerText = item.getAttribute('data-answer');
        const answerTitle = item.querySelector('.faq-item-title').textContent;
        faqAnswer.querySelector('.faq-answer-title').textContent = answerTitle;
        faqAnswer.querySelector('.faq-answer-text').textContent = answerText;

        // Trigger initial animation
        setTimeout(() => {
          faqAnswer.classList.add('show-answer');
        }, 500);
      }
    });
  }

  // Setup Image Slider Pagination - Click thumbnail to change main slide
  function setupImageSliderPagination() {
    const sliders = document.querySelectorAll('.blaze-slider.bslider-image');

    sliders.forEach(function (slider) {
      const paginationContainer = slider.querySelector('.blaze-pagination-image');
      if (!paginationContainer) return;

      const paginationItems = paginationContainer.querySelectorAll('.blaze-pagination-item');
      if (paginationItems.length === 0) return;

      // Wait for BlazeSlider to initialize
      setTimeout(function () {
        // Get BlazeSlider instance
        let blazeInstance = slider.blazeSlider;

        if (!blazeInstance) {
          // Retry after a bit longer delay
          setTimeout(function() {
            blazeInstance = slider.blazeSlider;
            if (blazeInstance) {
              initSliderPagination(slider, blazeInstance, paginationItems);
            }
          }, 500);
          return;
        }

        initSliderPagination(slider, blazeInstance, paginationItems);
      }, 300);
    });
  }

  // Initialize slider pagination functionality
  function initSliderPagination(slider, blazeInstance, paginationItems) {
    // Update active pagination item
    function updateActivePagination() {
      // Get current state index from BlazeSlider
      const currentStateIndex = blazeInstance.stateIndex || 0;

      paginationItems.forEach(function (item, index) {
        // Remove all active states first
        item.classList.remove('active');
        item.classList.remove('ring-1', 'ring-blue-500', 'ring-[#a5834a]', 'ring-[#ae873e]');
        item.classList.remove('border-[#ae873e]', 'border-[#a5834a]');
        
        // Add active state to current item
        if (index === currentStateIndex) {
          item.classList.add('active');
          item.classList.add('border-[#a5834a]');
        }
      });
    }

    // Listen for slide changes using BlazeSlider's onSlide callback
    if (blazeInstance.onSlide) {
      blazeInstance.onSlide(function(stateIndex, firstSlideIndex, lastSlideIndex) {
        updateActivePagination();
      });
    }

    // Setup click handlers for pagination items
    paginationItems.forEach(function (item, index) {
      item.addEventListener('click', function (e) {
        e.preventDefault();
        
        if (!blazeInstance || blazeInstance.isTransitioning) {
          return;
        }

        try {
          const currentStateIndex = blazeInstance.stateIndex || 0;
          const targetIndex = index;
          const loop = blazeInstance.config.loop;
          const totalStates = blazeInstance.states ? blazeInstance.states.length : paginationItems.length;
          
          // Calculate the difference
          const diff = Math.abs(targetIndex - currentStateIndex);
          const inverseDiff = totalStates - diff;
          const isDiffLargerThanHalf = diff > totalStates / 2;
          const scrollOpposite = isDiffLargerThanHalf && loop;

          // If target state is ahead of current state
          if (targetIndex > currentStateIndex) {
            // But the diff is too large
            if (scrollOpposite) {
              // Scroll in opposite direction to reduce scrolling
              blazeInstance.prev(inverseDiff);
            } else {
              // Scroll normally
              blazeInstance.next(diff);
            }
          }
          // If target state is before current state
          else if (targetIndex < currentStateIndex) {
            // But the diff is too large
            if (scrollOpposite) {
              // Scroll in opposite direction
              blazeInstance.next(inverseDiff);
            } else {
              // Scroll normally
              blazeInstance.prev(diff);
            }
          }
          // If already at target, do nothing
        } catch (error) {
          console.error('Error changing slide:', error);
        }
      });
    });

    // Initial update
    updateActivePagination();
  }

  // Initialize image slider pagination
  setupImageSliderPagination();

  // Also setup after a delay to ensure BlazeSlider is fully initialized
  setTimeout(function() {
    setupImageSliderPagination();
  }, 1000);
});

// Add CSS animations via style tag
const style = document.createElement('style');
style.textContent = `
    /* Fade in animation */
    .scroll-fade-in {
        opacity: 0;
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }
    
    .scroll-fade-in.animated {
        opacity: 1;
        transform: translateY(0);
    }

    /* Slide up animation */
    .scroll-slide-up {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.8s ease-out, transform 0.8s ease-out;
    }
    
    .scroll-slide-up.animated {
        opacity: 1;
        transform: translateY(0);
    }

    /* Slide left animation */
    .scroll-slide-left {
        opacity: 0;
        transform: translateX(-50px);
        transition: opacity 0.8s ease-out, transform 0.8s ease-out;
    }
    
    .scroll-slide-left.animated {
        opacity: 1;
        transform: translateX(0);
    }

    /* Slide right animation */
    .scroll-slide-right {
        opacity: 0;
        transform: translateX(50px);
        transition: opacity 0.8s ease-out, transform 0.8s ease-out;
    }
    
    .scroll-slide-right.animated {
        opacity: 1;
        transform: translateX(0);
    }

    /* FAQ Item Styles */
    .faq-item {
        cursor: pointer;
        transition: all 0.3s ease;
        position: relative;
    }

    .faq-item:hover {
        transform: translateX(8px);
        background: #FFF9F2;
    }

    .faq-item.active {
        background: #FFF9F2;
        border-left: 4px solid #a5834a;
    }

    .faq-item.active .faq-item-title {
        color: #a5834a;
    }

    .faq-item.active .faq-icon-wrapper {
        background: linear-gradient(to bottom right, #FFF9F2, #a5834a/20);
        border: 2px solid #a5834a/30;
    }

    /* FAQ Answer Styles */
    .faq-answer-content {
        transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        opacity: 0;
        transform: translateY(30px) scale(0.95);
        position: relative;
    }
    
    .faq-answer-content.show-answer {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
    
    /* Animated border for FAQ Answer */
    .faq-answer-content::before {
        content: '';
        position: absolute;
        top: -2px;
        left: -2px;
        right: -2px;
        bottom: -2px;
        border-radius: 24px;
        background: linear-gradient(90deg, #a5834a 0%, #a5834a 100%);
        z-index: -1;
        opacity: 0.1;
    }
    
    .faq-answer-content::after {
        content: '';
        position: absolute;
        top: -2px;
        left: -2px;
        right: -2px;
        bottom: -2px;
        border-radius: 24px;
        background: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.8) 50%, transparent 100%);
        background-size: 200% 100%;
        z-index: 1;
        pointer-events: none;
        animation: borderShimmer 3s linear infinite;
        opacity: 0;
        transition: opacity 0.3s;
    }
    
    .faq-answer-content.show-answer::after {
        opacity: 1;
    }
    
    @keyframes borderShimmer {
        0% {
            background-position: -200% 0;
        }
        100% {
            background-position: 200% 0;
        }
    }
    
    /* FAQ Decorative Line Animation */
    .faq-decorative-line {
        position: relative;
        overflow: visible;
    }
    
    .faq-decorative-line::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.9) 50%, transparent 100%);
        animation: lineShimmer 2s linear infinite;
    }
    
    .faq-decorative-line::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 100%;
        background: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.6) 30%, rgba(255, 255, 255, 0.9) 50%, rgba(255, 255, 255, 0.6) 70%, transparent 100%);
        animation: lineGlow 3s ease-in-out infinite;
    }
    
    @keyframes lineShimmer {
        0% {
            left: -100%;
        }
        100% {
            left: 100%;
        }
    }
    
    @keyframes lineGlow {
        0%, 100% {
            opacity: 0;
            transform: scaleX(0);
        }
        50% {
            opacity: 1;
            transform: scaleX(1);
        }
    }
    
    /* FAQ Answer Animation for text */
    .faq-answer-content.show-answer .faq-answer-text {
        animation: fadeInUp 0.6s ease-out 0.3s both;
    }
    
    .faq-answer-content.show-answer .faq-answer-title {
        animation: fadeInUp 0.5s ease-out 0.1s both;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(15px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    /* Decorative pulse for active FAQ */
    .faq-item.active .faq-icon-wrapper {
        animation: pulseIcon 2s ease-in-out infinite;
    }
    
    @keyframes pulseIcon {
        0%, 100% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(165, 131, 74, 0.4);
        }
        50% {
            transform: scale(1.05);
            box-shadow: 0 0 0 8px rgba(165, 131, 74, 0);
        }
    }
`;
document.head.appendChild(style);

