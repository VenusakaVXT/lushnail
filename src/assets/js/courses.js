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

  // Initialize Course Sliders (similar to review-2.php)
  initCourseSlider('course-cards-slider');
  initCourseSlider('online-courses-slider');
});

// Course Slider Functionality (similar to review-2.php)
function initCourseSlider(sliderId) {
  const slider = document.getElementById(sliderId);
  if (!slider) return;

  const track = slider.querySelector('.course-content-track');
  const prevBtn = slider.querySelector('.course-prev-btn');
  const nextBtn = slider.querySelector('.course-next-btn');
  const courseItems = slider.querySelectorAll('.course-item');
  
  // Find pagination elements - they are outside the slider container, in the same parent container
  // The pagination is a sibling of the slider, both inside a container div
  // Try multiple ways to find the pagination container
  let paginationContainer = null;
  let sliderParent = slider.parentElement;
  
  // First try: find in immediate parent
  if (sliderParent) {
    paginationContainer = sliderParent.querySelector('.course-pagination');
  }
  
  // Second try: find in parent's parent (if pagination is in a different level)
  if (!paginationContainer && sliderParent && sliderParent.parentElement) {
    paginationContainer = sliderParent.parentElement.querySelector('.course-pagination');
  }
  
  // Third try: find by going up to container and then searching
  if (!paginationContainer) {
    const container = slider.closest('.container');
    if (container) {
      paginationContainer = container.querySelector('.course-pagination');
    }
  }
  
  const prevBtnPagination = paginationContainer ? paginationContainer.querySelector('.course-prev-btn-pagination') : null;
  const nextBtnPagination = paginationContainer ? paginationContainer.querySelector('.course-next-btn-pagination') : null;
  const dotsContainer = paginationContainer ? paginationContainer.querySelector('.course-dots-container') : null;
  
  // Debug logging
  if (!paginationContainer) {
    console.warn('Pagination container not found for slider:', sliderId);
  } else if (!dotsContainer) {
    console.warn('Dots container not found in pagination container for slider:', sliderId);
  }

  if (!track || !prevBtn || !nextBtn || courseItems.length === 0) return;

  const totalItems = courseItems.length;
  
  // Calculate itemsPerView based on screen size
  function getItemsPerView() {
    return window.innerWidth < 640 ? 1 : 3; // 1 item on mobile, 3 items on desktop
  }
  
  let itemsPerView = getItemsPerView();
  
  // Clone count should match itemsPerView for optimal loop
  // This ensures we have enough cloned items to show when looping
  function getCloneCount() {
    return getItemsPerView();
  }
  
  let cloneCount = getCloneCount();
  let currentIndex = cloneCount; // Start at first real item (after cloned start items)
  let autoPlayInterval = null;
  let isPaused = false;
  let isTransitioning = false;
  let isDragging = false;
  let paginationDots = [];

  // Create pagination dots dynamically
  function createPaginationDots() {
    if (!dotsContainer) {
      console.warn('Dots container not found for slider:', sliderId);
      return;
    }
    dotsContainer.innerHTML = '';
    paginationDots = [];
    for (let i = 0; i < totalItems; i++) {
      const dot = document.createElement('button');
      dot.className = `course-dot w-2 h-2 rounded-full transition-all duration-300 ${i === 0 ? 'active' : 'bg-gray-300'}`;
      dot.setAttribute('data-index', i);
      dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
      dotsContainer.appendChild(dot);
      paginationDots.push(dot);
    }
  }

  createPaginationDots();
  
  // Re-query dots after creation to ensure they're found
  if (dotsContainer) {
    const createdDots = dotsContainer.querySelectorAll('.course-dot');
    if (createdDots.length > 0) {
      paginationDots = Array.from(createdDots);
    }
  }

  // Duplicate items multiple times for infinite scroll (like Swiper, Glide.js)
  // This allows continuous scrolling without visible jumps
  function setupClones() {
    // Remove existing clones first
    const existingClones = track.querySelectorAll('[data-clone]');
    existingClones.forEach(clone => clone.remove());
    
    // Duplicate items 3 times: original + 2 duplicates
    // This gives us enough items to scroll infinitely
    const duplicateCount = 3; // Total: original + 2 duplicates = 3 sets
    
    // Clone all items to the beginning (duplicate set 1)
    Array.from(courseItems).forEach((item, index) => {
      const clone = item.cloneNode(true);
      clone.setAttribute('data-clone', 'start');
      clone.setAttribute('data-set', '1');
      track.insertBefore(clone, track.firstChild);
    });
    
    // Clone all items to the end (duplicate set 2)
    Array.from(courseItems).forEach((item, index) => {
      const clone = item.cloneNode(true);
      clone.setAttribute('data-clone', 'end');
      clone.setAttribute('data-set', '2');
      track.appendChild(clone);
    });
    
    // Start at the beginning of the original set
    // Structure: [Duplicate Set 1] [Original Set] [Duplicate Set 2]
    cloneCount = totalItems; // Number of cloned items at start
    currentIndex = cloneCount; // Start at first item of original set
  }
  
  // Initial clone setup
  setupClones();

  // Update courseItems after cloning
  let allItems = track.querySelectorAll('.course-item');
  
  // Calculate maxIndex - now we have duplicate sets, so we can scroll further
  function getMaxIndex() {
    const currentItemsPerView = getItemsPerView();
    // We have: [Duplicate Set 1] [Original Set] [Duplicate Set 2]
    // Total items in track = cloneCount (start) + totalItems (original) + totalItems (end) = cloneCount + totalItems * 2
    // Max index should allow scrolling into duplicate set 2, but not too far
    // Allow scrolling to the end of original set + a bit into duplicate set 2
    return cloneCount + totalItems - currentItemsPerView;
  }
  
  let maxIndex = getMaxIndex();

  function getItemWidth() {
    if (allItems.length === 0) return 0;
    const firstItem = allItems[0];
    return firstItem.offsetWidth;
  }

  function getGap() {
    const trackStyle = window.getComputedStyle(track);
    return parseFloat(trackStyle.gap) || 16;
  }

  function updateSlider(skipTransition = false) {
    if (allItems.length === 0) return;
    
    const itemWidth = getItemWidth();
    const gap = getGap();
    const translateX = -currentIndex * (itemWidth + gap);
    
    if (skipTransition) {
      track.style.transition = 'none';
      track.style.transform = `translateX(${translateX}px)`;
      void track.offsetHeight;
      requestAnimationFrame(() => {
        track.style.transition = 'transform 0.5s ease-in-out';
      });
    } else {
      track.style.transform = `translateX(${translateX}px)`;
    }
  }

  function updatePagination() {
    if (paginationDots.length === 0) return;
    
    const realIndex = currentIndex - cloneCount;
    const activeDotIndex = realIndex % totalItems;
    
    paginationDots.forEach((dot, index) => {
      if (index === activeDotIndex) {
        dot.classList.remove('bg-gray-300');
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
        dot.classList.add('bg-gray-300');
      }
    });
  }

  function goToNext() {
    if (isTransitioning) return;
    isTransitioning = true;
    
    itemsPerView = getItemsPerView();
    
    currentIndex++;
    
    // Structure: [Duplicate Set 1] [Original Set] [Duplicate Set 2]
    // cloneCount = totalItems (duplicate set 1)
    // Original set: cloneCount to cloneCount + totalItems - 1
    // Duplicate set 2: cloneCount + totalItems to cloneCount + totalItems * 2 - 1
    const endOfOriginalSet = cloneCount + totalItems;
    const startOfDuplicateSet2 = endOfOriginalSet;
    const endOfDuplicateSet2 = cloneCount + totalItems * 2;
    
    // Check if we've scrolled into duplicate set 2
    if (currentIndex >= startOfDuplicateSet2) {
      // We've scrolled into duplicate set 2
      const overshoot = currentIndex - startOfDuplicateSet2;
      
      // Only jump when we're at the end of duplicate set 2 or close to it
      // This ensures we can scroll through all items in original set
      if (currentIndex >= endOfDuplicateSet2 - itemsPerView) {
        // We're near the end of duplicate set 2, jump back to equivalent position in original set
        updateSlider(); // Scroll into duplicate set 2 with transition
        const handleTransitionEnd = (e) => {
          if (e.propertyName !== 'transform') return;
          track.removeEventListener('transitionend', handleTransitionEnd);
          requestAnimationFrame(() => {
            // Jump to equivalent position in original set (seamless)
            // Map overshoot back to original set position
            const equivalentIndex = cloneCount + (overshoot % totalItems);
            currentIndex = equivalentIndex;
            updateSlider(true); // No transition for jump
            isTransitioning = false;
            updatePagination();
          });
        };
        track.addEventListener('transitionend', handleTransitionEnd, { once: true });
      } else {
        // Still within duplicate set 2, continue scrolling
        updateSlider();
        const handleTransitionEnd = (e) => {
          if (e.propertyName !== 'transform') return;
          track.removeEventListener('transitionend', handleTransitionEnd);
          isTransitioning = false;
        };
        track.addEventListener('transitionend', handleTransitionEnd, { once: true });
      }
    } else {
      // Normal scrolling within original set
      updateSlider();
      const handleTransitionEnd = (e) => {
        if (e.propertyName !== 'transform') return;
        track.removeEventListener('transitionend', handleTransitionEnd);
        isTransitioning = false;
      };
      track.addEventListener('transitionend', handleTransitionEnd, { once: true });
    }
    updatePagination();
  }

  function goToPrev() {
    if (isTransitioning) return;
    isTransitioning = true;
    
    itemsPerView = getItemsPerView();
    
    currentIndex--;
    
    // Structure: [Duplicate Set 1] [Original Set] [Duplicate Set 2]
    // cloneCount = totalItems (duplicate set 1)
    // Check if we've scrolled into duplicate set 1
    if (currentIndex < cloneCount) {
      // We've scrolled into duplicate set 1
      const overshoot = cloneCount - currentIndex;
      
      // Only jump when we're at the beginning of duplicate set 1 or close to it
      // This ensures we can scroll through all items in original set
      if (currentIndex < itemsPerView) {
        // We're near the beginning of duplicate set 1, jump to equivalent position in original set
        updateSlider(); // Scroll into duplicate set 1 with transition
        const handleTransitionEnd = (e) => {
          if (e.propertyName !== 'transform') return;
          track.removeEventListener('transitionend', handleTransitionEnd);
          requestAnimationFrame(() => {
            // Jump to equivalent position in original set (seamless)
            // Map overshoot back to original set position
            const equivalentIndex = cloneCount + totalItems - (overshoot % totalItems);
            currentIndex = equivalentIndex;
            updateSlider(true); // No transition for jump
            isTransitioning = false;
            updatePagination();
          });
        };
        track.addEventListener('transitionend', handleTransitionEnd, { once: true });
      } else {
        // Still within duplicate set 1, continue scrolling
        updateSlider();
        const handleTransitionEnd = (e) => {
          if (e.propertyName !== 'transform') return;
          track.removeEventListener('transitionend', handleTransitionEnd);
          isTransitioning = false;
        };
        track.addEventListener('transitionend', handleTransitionEnd, { once: true });
      }
    } else {
      // Normal scrolling within original set
      updateSlider();
      const handleTransitionEnd = (e) => {
        if (e.propertyName !== 'transform') return;
        track.removeEventListener('transitionend', handleTransitionEnd);
        isTransitioning = false;
      };
      track.addEventListener('transitionend', handleTransitionEnd, { once: true });
    }
    updatePagination();
  }

  function startAutoPlay() {
    if (autoPlayInterval) return;
    autoPlayInterval = setInterval(() => {
      if (!isPaused && !isDragging) {
        goToNext();
      }
    }, 3000); // Auto play every 3 seconds
  }

  function stopAutoPlay() {
    if (autoPlayInterval) {
      clearInterval(autoPlayInterval);
      autoPlayInterval = null;
    }
  }

  // Previous button
  prevBtn.addEventListener('click', () => {
    stopAutoPlay();
    goToPrev();
    setTimeout(() => startAutoPlay(), 5000);
  });

  // Next button
  nextBtn.addEventListener('click', () => {
    stopAutoPlay();
    goToNext();
    setTimeout(() => startAutoPlay(), 5000);
  });

  // Pagination buttons
  if (prevBtnPagination) {
    prevBtnPagination.addEventListener('click', () => {
      stopAutoPlay();
      goToPrev();
      setTimeout(() => startAutoPlay(), 5000);
    });
  }

  if (nextBtnPagination) {
    nextBtnPagination.addEventListener('click', () => {
      stopAutoPlay();
      goToNext();
      setTimeout(() => startAutoPlay(), 5000);
    });
  }

  // Pagination dots - attach event listeners
  function attachDotListeners() {
    if (paginationDots.length === 0) return;
    
    paginationDots.forEach((dot, index) => {
      // Remove existing listeners by cloning
      const newDot = dot.cloneNode(true);
      dot.parentNode.replaceChild(newDot, dot);
      paginationDots[index] = newDot;
      
      newDot.addEventListener('click', () => {
        if (isTransitioning) return;
        isTransitioning = true;
        stopAutoPlay();
        
        const targetIndex = cloneCount + index;
        currentIndex = targetIndex;
        updateSlider();
        updatePagination();
        
        setTimeout(() => {
          isTransitioning = false;
          startAutoPlay();
        }, 500);
      });
    });
  }
  
  // Attach dot listeners after dots are created
  attachDotListeners();

  // Pause on hover
  slider.addEventListener('mouseenter', () => {
    isPaused = true;
  });

  slider.addEventListener('mouseleave', () => {
    isPaused = false;
  });

  // Touch/Swipe functionality
  let startX = 0;
  let currentX = 0;
  let baseTranslate = 0;
  let dragOffset = 0;

  function updateDragPosition() {
    if (!isDragging) return;
    
    const itemWidth = getItemWidth();
    const gap = getGap();
    baseTranslate = -currentIndex * (itemWidth + gap);
    dragOffset = currentX - startX;
    track.style.transform = `translateX(${baseTranslate + dragOffset}px)`;
  }

  track.addEventListener('touchstart', (e) => {
    stopAutoPlay();
    isDragging = true;
    startX = e.touches[0].clientX;
    currentX = startX;
    track.style.transition = 'none';
  });

  track.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    currentX = e.touches[0].clientX;
    updateDragPosition();
  });

  track.addEventListener('touchend', () => {
    if (!isDragging) return;
    isDragging = false;
    track.style.transition = 'transform 0.5s ease-in-out';
    
    const itemWidth = getItemWidth();
    const gap = getGap();
    const threshold = (itemWidth + gap) / 3;
    
    if (Math.abs(dragOffset) > threshold) {
      if (dragOffset > 0) {
        goToPrev();
      } else {
        goToNext();
      }
    } else {
      updateSlider();
    }
    
    setTimeout(() => startAutoPlay(), 2000);
  });

  // Mouse drag functionality
  track.addEventListener('mousedown', (e) => {
    stopAutoPlay();
    isDragging = true;
    startX = e.clientX;
    currentX = startX;
    track.style.transition = 'none';
    e.preventDefault();
  });

  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    currentX = e.clientX;
    updateDragPosition();
  });

  document.addEventListener('mouseup', () => {
    if (!isDragging) return;
    isDragging = false;
    track.style.transition = 'transform 0.5s ease-in-out';
    
    const itemWidth = getItemWidth();
    const gap = getGap();
    const threshold = (itemWidth + gap) / 3;
    
    if (Math.abs(dragOffset) > threshold) {
      if (dragOffset > 0) {
        goToPrev();
      } else {
        goToNext();
      }
    } else {
      updateSlider();
    }
    
    setTimeout(() => startAutoPlay(), 2000);
  });

  // Handle window resize
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      const newItemsPerView = getItemsPerView();
      if (newItemsPerView !== itemsPerView) {
        // Screen size changed, need to re-setup clones
        itemsPerView = newItemsPerView;
        setupClones();
        // Update allItems reference after cloning
        allItems = track.querySelectorAll('.course-item');
        maxIndex = getMaxIndex();
        currentIndex = cloneCount;
        updateSlider(true);
      } else {
        // Just recalculate maxIndex
        itemsPerView = newItemsPerView;
        maxIndex = getMaxIndex();
        updateSlider(true);
      }
    }, 250);
  });

  // Initialize slider position
  updateSlider(true);
  updatePagination();
  
  // Start autoplay
  startAutoPlay();
}

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

