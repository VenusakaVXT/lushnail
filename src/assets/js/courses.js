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

  // if (loadMoreBtn && courseCardsGrid) {
  //   // Sample additional courses data
  //   const additionalCourses = [
  //     {
  //       title: 'Nail Chuyên Nghiệp',
  //       description: 'Khóa học dành cho thợ nail chuyên nghiệp',
  //       image: 'https://m.media-amazon.com/images/I/51YC56BJ0WL._SL1024_.jpg',
  //       tags: ['30 bài học', 'Chứng chỉ quốc tế', 'Hỗ trợ việc làm'],
  //       price: '8,500,000đ',
  //       priceOld: '17,000,000đ',
  //       discount: '-50%'
  //     },
  //     {
  //       title: 'Nail Nghệ Thuật',
  //       description: 'Kỹ thuật nail art và thiết kế sáng tạo',
  //       image: 'https://m.media-amazon.com/images/I/7159sUj7TNL._SL1500_.jpg',
  //       tags: ['20 bài học', 'Nghệ thuật sáng tạo', 'Portfolio review'],
  //       price: '5,500,000đ',
  //       priceOld: '11,000,000đ',
  //       discount: '-50%'
  //     },
  //     {
  //       title: 'Nail Kỹ Thuật Số',
  //       description: 'Ứng dụng công nghệ trong nail',
  //       image: 'https://m.media-amazon.com/images/I/71vPZFCTi8L._SL1500_.jpg',
  //       tags: ['15 bài học', 'Công nghệ hiện đại', 'Tài liệu số'],
  //       price: '6,500,000đ',
  //       priceOld: '13,000,000đ',
  //       discount: '-50%'
  //     },
  //     {
  //       title: 'Nail Thương Mại',
  //       description: 'Quản trị và phát triển doanh nghiệp nail',
  //       image: 'https://m.media-amazon.com/images/I/71jqxWepZvL._SL1500_.jpg',
  //       tags: ['25 bài học', 'Quản trị doanh nghiệp', 'Tư vấn kinh doanh'],
  //       price: '9,000,000đ',
  //       priceOld: '18,000,000đ',
  //       discount: '-50%'
  //     }
  //   ];

  //   let currentPage = 1;
  //   const coursesPerPage = 4;
  //   const totalCourses = additionalCourses.length;
  //   let loadedCourses = 0;

  //   // Function to create course card HTML
  //   function createCourseCard(course) {
  //     return `
  //       <div class="course-card group shadow-[0px_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0px_12px_40px_rgba(174,135,62,0.25)]">
  //         <div class="course-card__badge">
  //           <p class="  text-[13px]  emibold" >${course.discount}</p>
  //         </div>
  //         <div class="course-card__image-container">
  //           <img src="${course.image}" alt="${course.title}" class="course-card__image" loading="lazy">
  //           <div class="course-card__overlay">
  //             <a href="single-course.html" class="course-card__detail-button  " >CHI TIẾT</a>
  //           </div>
  //         </div>
  //         <div class="course-card__body">
  //           <div class="course-card__title-section">
  //             <a href="single-course.html"><h3 class="course-card__title   hover:text-[#ae873e] transition-colors cursor-pointer" >${course.title}</h3></a>
  //             <p class="course-card__description font-['Bricolage_Grotesque:Regular',_sans-serif]" >${course.description}</p>
  //           </div>
  //           <div class="course-card__tags">
  //             ${course.tags.map(tag => `<span class="course-card__tag font-['Bricolage_Grotesque:Medium',_sans-serif]" >${tag}</span>`).join('')}
  //           </div>
  //           <div class="course-card__price-section">
  //             <p class="course-card__price  " >${course.price}</p>
  //             <p class="course-card__price-old font-['Bricolage_Grotesque:Regular',_sans-serif]" >${course.priceOld}</p>
  //           </div>
  //           <a href="single-course.html" class="course-card__button  " >ĐĂNG KÝ NGAY</a>
  //         </div>
  //       </div>
  //     `;
  //   }

  //   // Function to load more courses
  //   function loadMoreCourses() {
  //     // Show loading state
  //     loadMoreBtn.disabled = true;
  //     loadMoreText.classList.add('hidden');
  //     loadMoreLoading.classList.remove('hidden');

  //     // Simulate API call delay
  //     setTimeout(() => {
  //       const coursesToLoad = additionalCourses.slice(loadedCourses, loadedCourses + coursesPerPage);

  //       if (coursesToLoad.length > 0) {
  //         coursesToLoad.forEach((course) => {
  //           const courseCardHTML = createCourseCard(course);
  //           const tempDiv = document.createElement('div');
  //           tempDiv.innerHTML = courseCardHTML.trim();
  //           const courseCardElement = tempDiv.firstChild;

  //           courseCardsGrid.appendChild(courseCardElement);
  //         });

  //         loadedCourses += coursesToLoad.length;
  //         currentPage++;

  //         // Check if all courses are loaded
  //         if (loadedCourses >= totalCourses) {
  //           loadMoreBtn.style.display = 'none';
  //         } else {
  //           // Reset button state
  //           loadMoreBtn.disabled = false;
  //           loadMoreText.classList.remove('hidden');
  //           loadMoreLoading.classList.add('hidden');
  //         }
  //       } else {
  //         // No more courses to load
  //         loadMoreBtn.style.display = 'none';
  //       }
  //     }, 800); // Simulate loading delay
  //   }

  //   // Add click event listener
  //   loadMoreBtn.addEventListener('click', loadMoreCourses);
  // }


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
    // Function to update answer
    function updateAnswer(item) {
      // Remove active from all items
      faqItems.forEach(i => i.classList.remove('active'));

      // Add active to clicked item
      item.classList.add('active');

      // Get the answer content
      const answerText = item.getAttribute('data-answer');
      const answerTitle = item.querySelector('.faq-item-title').textContent;

      // Update content immediately
      faqAnswer.querySelector('.faq-answer-title').textContent = answerTitle;
      faqAnswer.querySelector('.faq-answer-text').textContent = answerText;

      // Ensure answer is visible
      faqAnswer.classList.add('show-answer');
    }

    faqItems.forEach((item, index) => {
      item.addEventListener('click', function () {
        updateAnswer(this);

        // Scroll to answer section on mobile
        const isMobile = window.innerWidth < 1024; // lg breakpoint
        if (isMobile) {
          const answerSection = document.getElementById('faq-answer-section');
          if (answerSection) {
            answerSection.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
              inline: 'nearest'
            });
          }
        }
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
          setTimeout(function () {
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
      blazeInstance.onSlide(function (stateIndex, firstSlideIndex, lastSlideIndex) {
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
  setTimeout(function () {
    setupImageSliderPagination();
  }, 1000);
});

// Add CSS styles via style tag
const style = document.createElement('style');
style.textContent = `
    /* FAQ Item Styles */
    .faq-item {
        cursor: pointer;
        transition: all 0.3s ease;
        position: relative;
        box-shadow: 0px 4px 20px rgba(0,0,0,, 0.08);
    }

    .faq-item:hover {
        transform: translateX(8px);
        background: #FFF9F2;
        box-shadow: 0px 12px 40px rgba(174, 135, 62, 0.25);
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

