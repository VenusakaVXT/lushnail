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
          coursesToLoad.forEach((course) => {
            const courseCardHTML = createCourseCard(course);
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = courseCardHTML.trim();
            const courseCardElement = tempDiv.firstChild;
            
            courseCardsGrid.appendChild(courseCardElement);
          });

          loadedCourses += coursesToLoad.length;
          currentPage++;

          // Check if all courses are loaded
          if (loadedCourses >= totalCourses) {
            loadMoreBtn.style.display = 'none';
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

// Add CSS styles via style tag
const style = document.createElement('style');
style.textContent = `
    /* FAQ Item Styles */
    .faq-item {
        cursor: pointer;
        position: relative;
    }

    .faq-item:hover {
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
`;
document.head.appendChild(style);

