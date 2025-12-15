/**
 * Home.js - Homepage JavaScript Logic
 * Slider initialization is handled in sliders.js
 */

document.addEventListener('DOMContentLoaded', function () {
    initContactForm();
    initScrollAnimations();
    initMostPopularNailGallery();
    initReviewSlider();
    initReviewSlider2();
    initFeedbackGalleryModal();
    // initFeedbackImagesSlider(); // Removed - now using BlazeSlider
});

function initScrollAnimations() {
    // Scroll Animation Observer for statistical items
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all statistical items
    const statisticalItems = document.querySelectorAll('.statistical-item');
    statisticalItems.forEach(item => {
        observer.observe(item);
    });
}

function initMostPopularNailGallery() {
    const gallery = document.querySelector('.most-popular-nail-gallery');
    if (!gallery) return;

    const items = gallery.querySelectorAll('.nail-image-item');

    items.forEach(item => {
        item.addEventListener('mouseenter', function () {
            // Remove active from all items
            items.forEach(i => i.classList.remove('active'));
            // Add active to hovered item
            this.classList.add('active');
        });
    });

    // Reset to first item when mouse leaves gallery
    gallery.addEventListener('mouseleave', function () {
        items.forEach(i => i.classList.remove('active'));
        items[0].classList.add('active');
    });
}

function initReviewSlider() {
    const slider = document.querySelector('.review-slider');
    if (!slider) return;

    const track = slider.querySelector('.review-content-track');
    const profileTrack = slider.querySelector('.review-profiles-track');
    const prevBtn = slider.querySelector('.review-prev-btn');
    const nextBtn = slider.querySelector('.review-next-btn');
    let profileItems = slider.querySelectorAll('.review-profile-item');
    const reviewItems = slider.querySelectorAll('.review-item');

    if (!track || !profileTrack || !prevBtn || !nextBtn || profileItems.length === 0 || reviewItems.length === 0) return;

    const totalItems = profileItems.length;
    const visibleCount = 5; // Always show 5 items
    const centerIndex = 2; // Center position (0-indexed, so 2 is the 3rd item)

    // Clone last 2 items to the beginning and first 2 items to the end for infinite loop
    const cloneCount = 2;
    const lastItems = Array.from(profileItems).slice(-cloneCount);
    const firstItems = Array.from(profileItems).slice(0, cloneCount);

    // Clone items to beginning
    lastItems.forEach((item, idx) => {
        const clone = item.cloneNode(true);
        clone.setAttribute('data-index', (totalItems - cloneCount + idx).toString());
        clone.setAttribute('data-clone', 'start');
        clone.style.display = 'none'; // Initially hidden
        profileTrack.insertBefore(clone, profileTrack.firstChild);
    });

    // Clone items to end
    firstItems.forEach((item, idx) => {
        const clone = item.cloneNode(true);
        clone.setAttribute('data-index', idx.toString());
        clone.setAttribute('data-clone', 'end');
        clone.style.display = 'none'; // Initially hidden
        profileTrack.appendChild(clone);
    });

    // Update profileItems after cloning
    profileItems = slider.querySelectorAll('.review-profile-item');

    let currentIndex = 2; // Start with the middle item (index 2)

    // Function to calculate visible range with infinite loop support
    function getVisibleRange(activeIndex) {
        // Always show 5 items: 2 before, 1 active, 2 after
        // Calculate indices with wrap-around
        const indices = [];

        for (let i = -centerIndex; i <= centerIndex; i++) {
            let idx = activeIndex + i;
            // Wrap around using modulo for infinite loop
            if (idx < 0) {
                idx = totalItems + idx; // Wrap from end (e.g., -1 -> 9, -2 -> 8)
            } else if (idx >= totalItems) {
                idx = idx % totalItems; // Wrap to beginning (e.g., 10 -> 0, 11 -> 1)
            }
            indices.push(idx);
        }

        return { indices };
    }

    // Function to update slider with smooth loop
    function updateSlider(index, isLooping = false) {
        // Handle loop: wrap around smoothly
        if (index < 0) {
            index = reviewItems.length - 1;
            isLooping = true;
        }
        if (index >= reviewItems.length) {
            index = 0;
            isLooping = true;
        }

        currentIndex = index;

        // Update content track position with transition
        if (isLooping) {
            // For loop, temporarily disable transition for instant jump
            track.style.transition = 'none';
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
            // Re-enable transition after a brief moment
            setTimeout(() => {
                track.style.transition = '';
            }, 50);
        } else {
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
        }

        // Calculate visible range
        const { indices } = getVisibleRange(currentIndex);

        // First, determine which clone indices should be shown
        const cloneIndicesToShow = new Set();
        if (currentIndex === 0) {
            // Show: [8, 9, 0, 1, 2] - need clones for 8, 9
            cloneIndicesToShow.add(totalItems - 2);
            cloneIndicesToShow.add(totalItems - 1);
        } else if (currentIndex === 1) {
            // Show: [9, 0, 1, 2, 3] - need clone for 9
            cloneIndicesToShow.add(totalItems - 1);
        } else if (currentIndex === totalItems - 1) {
            // Show: [7, 8, 9, 0, 1] - need clones for 0, 1
            cloneIndicesToShow.add(0);
            cloneIndicesToShow.add(1);
        } else if (currentIndex === totalItems - 2) {
            // Show: [6, 7, 8, 9, 0] - need clone for 0
            cloneIndicesToShow.add(0);
        }

        // Update profile items visibility and active state
        profileItems.forEach((item, i) => {
            const itemIndex = parseInt(item.getAttribute('data-index'));
            const isClone = item.hasAttribute('data-clone');

            // Show items that match the calculated indices
            // For clones, show them only when needed for wrap-around
            let shouldShow = false;

            if (isClone) {
                // Show clones only when we need wrap-around
                const cloneType = item.getAttribute('data-clone');
                const realIndex = parseInt(item.getAttribute('data-index'));

                if (cloneType === 'start') {
                    // Start clones represent items at the end (totalItems-2, totalItems-1)
                    shouldShow = cloneIndicesToShow.has(realIndex);
                } else if (cloneType === 'end') {
                    // End clones represent items at the beginning (0, 1)
                    shouldShow = cloneIndicesToShow.has(realIndex);
                }
            } else {
                // Show original items based on indices, but hide if clone is showing instead
                const shouldHideBecauseClone = cloneIndicesToShow.has(itemIndex);
                shouldShow = indices.includes(itemIndex) && !shouldHideBecauseClone;
            }

            if (shouldShow) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }

            // Update active state
            item.classList.remove('active');
            if (itemIndex === currentIndex) {
                item.classList.add('active');
                // Update size and border for active item
                item.classList.remove('w-16', 'h-16', 'sm:w-20', 'sm:h-20', 'border-2', 'border-transparent', 'opacity-60');
                item.classList.add('w-20', 'h-20', 'sm:w-24', 'sm:h-24', 'border-4', 'border-white', 'opacity-100', 'shadow-lg');
            } else {
                item.classList.remove('w-20', 'h-20', 'sm:w-24', 'sm:h-24', 'border-4', 'border-white', 'opacity-100', 'shadow-lg');
                item.classList.add('w-16', 'h-16', 'sm:w-20', 'sm:h-20', 'border-2', 'border-transparent', 'opacity-60');
            }
        });

        // Calculate scroll position to center the active item
        // Scroll profile track so active item is in the center
        setTimeout(() => {
            // Find the active item (prefer original, fallback to clone)
            let activeItem = null;
            let originalItem = null;

            profileItems.forEach(item => {
                const itemIndex = parseInt(item.getAttribute('data-index'));
                const isClone = item.hasAttribute('data-clone');

                if (itemIndex === currentIndex && item.style.display !== 'none') {
                    if (!isClone) {
                        originalItem = item;
                    } else if (!activeItem) {
                        activeItem = item; // Fallback to clone if no original found
                    }
                }
            });

            // Prefer original over clone
            activeItem = originalItem || activeItem;

            if (activeItem && activeItem.style.display !== 'none') {
                const wrapper = slider.querySelector('.review-profiles-wrapper');
                if (!wrapper) return;

                // For loop transitions, temporarily disable transition for smoother jump
                if (isLooping) {
                    profileTrack.style.transition = 'none';
                }

                // Reset transform first to calculate natural positions
                profileTrack.style.transform = 'translateX(0px)';

                // Wait for layout to update
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        const wrapperRect = wrapper.getBoundingClientRect();
                        const wrapperCenter = wrapperRect.width / 2;

                        const activeItemRect = activeItem.getBoundingClientRect();
                        const trackRect = profileTrack.getBoundingClientRect();

                        // Calculate active item center position relative to track
                        const itemLeftRelativeToTrack = activeItemRect.left - trackRect.left;
                        const itemCenterRelativeToTrack = itemLeftRelativeToTrack + activeItemRect.width / 2;

                        // Calculate offset needed to center the active item
                        const offset = wrapperCenter - itemCenterRelativeToTrack;

                        profileTrack.style.transform = `translateX(${offset}px)`;

                        // Re-enable transition after loop jump
                        if (isLooping) {
                            setTimeout(() => {
                                profileTrack.style.transition = '';
                            }, 50);
                        }
                    });
                });
            }
        }, isLooping ? 10 : 50);
    }

    // Previous button
    prevBtn.addEventListener('click', () => {
        updateSlider(currentIndex - 1);
    });

    // Next button
    nextBtn.addEventListener('click', () => {
        updateSlider(currentIndex + 1);
    });

    // Profile items click
    profileItems.forEach((item) => {
        item.addEventListener('click', () => {
            const index = parseInt(item.getAttribute('data-index'));
            updateSlider(index);
        });
    });

    // Initialize
    updateSlider(currentIndex);
}

function initContactForm() {
    // Contact form (if exists)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);

            console.log('Form data:', data);

            fetch(contactForm.action || window.location.href, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            }).then(response => {
                if (response.ok) {
                    alert('Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất có thể.');
                    contactForm.reset();
                } else {
                    alert('Có lỗi xảy ra. Vui lòng thử lại sau.');
                }
            }).catch(error => {
                console.error('Error:', error);
                alert('Có lỗi xảy ra. Vui lòng thử lại sau.');
            });
        });
    }

    // Course registration form
    const courseForm = document.getElementById('course-registration-form');
    if (courseForm) {
        courseForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const formData = new FormData(courseForm);
            const data = Object.fromEntries(formData);

            console.log('Course registration data:', data);

            // Show success notification if FastNotice is available
            if (window.fastNotice) {
                window.fastNotice.success('Cảm ơn bạn đã đăng ký khóa học! Chúng tôi sẽ liên hệ với bạn sớm nhất có thể.');
            } else {
                alert('Cảm ơn bạn đã đăng ký khóa học! Chúng tôi sẽ liên hệ với bạn sớm nhất có thể.');
            }

            courseForm.reset();
        });
    }
}

function initFeedbackImagesSlider() {
    const slider = document.querySelector('.feedback-images-slider');
    if (!slider) return;

    const track = slider.querySelector('.feedback-images-track');
    if (!track) return;

    // Get all image items
    const items = track.querySelectorAll('.feedback-image-item');
    if (items.length === 0) return;

    // Calculate total width: 8 images * 160px + 7 gaps * 8px (gap between images)
    const imageWidth = 160;
    const gap = 8;
    const originalSetWidth = (8 * imageWidth) + (7 * gap); // 8 images + 7 gaps
    const totalWidth = originalSetWidth * 3; // 3 sets for seamless loop

    // Set track width
    track.style.width = totalWidth + 'px';

    // The CSS animation will handle the scrolling
    // Animation moves exactly one set width, then loops seamlessly
    // With 3 sets, when animation completes, it resets to show the same visual position
}

function initReviewSlider2() {
    const slider = document.querySelector('.review-slider');
    if (!slider) return;

    const track = slider.querySelector('.review-content-track');
    const prevBtn = slider.querySelector('.review-prev-btn');
    const nextBtn = slider.querySelector('.review-next-btn');
    const prevBtnMobile = slider.querySelector('.review-prev-btn-mobile');
    const nextBtnMobile = slider.querySelector('.review-next-btn-mobile');
    const prevBtnPagination = slider.querySelector('.review-prev-btn-pagination');
    const nextBtnPagination = slider.querySelector('.review-next-btn-pagination');
    const reviewItems = slider.querySelectorAll('.review-item');
    const paginationDots = slider.querySelectorAll('.review-dot');

    // Check if this is review-2 (no profile track)
    const profileTrack = slider.querySelector('.review-profiles-track');
    if (profileTrack) return; // This is review.html, not review-2.html

    if (!track || !prevBtn || !nextBtn || reviewItems.length === 0) return;

    const totalItems = reviewItems.length;
    
    // Calculate itemsPerView based on screen size
    function getItemsPerView() {
        return window.innerWidth < 640 ? 1 : 3; // 1 item on mobile, 3 items on desktop
    }
    
    let itemsPerView = getItemsPerView();
    const cloneCount = 3; // Always clone 3 items for seamless loop
    let currentIndex = cloneCount; // Start at first real item (after cloned start items)
    let autoPlayInterval = null;
    let isPaused = false;
    let isTransitioning = false;

    // Clone items for infinite loop
    const firstItems = Array.from(reviewItems).slice(0, cloneCount);
    const lastItems = Array.from(reviewItems).slice(-cloneCount);
    
    // Clone last items to beginning
    lastItems.forEach((item) => {
        const clone = item.cloneNode(true);
        clone.setAttribute('data-clone', 'start');
        track.insertBefore(clone, track.firstChild);
    });
    
    // Clone first items to end
    firstItems.forEach((item) => {
        const clone = item.cloneNode(true);
        clone.setAttribute('data-clone', 'end');
        track.appendChild(clone);
    });

    // Update reviewItems after cloning
    const allItems = track.querySelectorAll('.review-item');
    
    // Calculate maxIndex dynamically based on current itemsPerView
    function getMaxIndex() {
        const currentItemsPerView = getItemsPerView();
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
            // Force reflow to apply immediately
            void track.offsetHeight;
            // Restore transition after a frame
            requestAnimationFrame(() => {
                track.style.transition = 'transform 0.5s ease-in-out';
            });
        } else {
            track.style.transform = `translateX(${translateX}px)`;
        }
    }

    function updatePagination() {
        if (paginationDots.length === 0) return;
        
        // Calculate current slide index
        // currentIndex is based on itemsPerView (3), but we need to convert to item index
        const realIndex = currentIndex - cloneCount; // Get real index (0-based)
        const activeDotIndex = realIndex % totalItems;
        
        // Update dots
        paginationDots.forEach((dot, index) => {
            if (index === activeDotIndex) {
                dot.classList.remove('bg-gray-300');
                dot.classList.add('bg-[#424242]');
            } else {
                dot.classList.remove('bg-[#424242]');
                dot.classList.add('bg-gray-300');
            }
        });
    }

    function goToNext() {
        if (isTransitioning) return;
        isTransitioning = true;
        
        // Update itemsPerView and maxIndex based on current screen size
        itemsPerView = getItemsPerView();
        maxIndex = getMaxIndex();
        
        currentIndex++;
        
        // If we've scrolled past real items into cloned items
        if (currentIndex > maxIndex) {
            // Calculate how far into cloned items we are
            const overshoot = currentIndex - maxIndex;
            
            // If we're just one step into cloned items, scroll then jump seamlessly
            if (overshoot === 1) {
                updateSlider();
                // Use transitionend event for precise timing
                const handleTransitionEnd = (e) => {
                    // Only handle transform transitions
                    if (e.propertyName !== 'transform') return;
                    track.removeEventListener('transitionend', handleTransitionEnd);
                    // Use requestAnimationFrame to ensure jump happens after paint
                    requestAnimationFrame(() => {
                        currentIndex = cloneCount;
                        updateSlider(true);
                        isTransitioning = false;
                        updatePagination();
                    });
                };
                track.addEventListener('transitionend', handleTransitionEnd, { once: true });
            } else {
                // Already too far, jump immediately
                currentIndex = cloneCount + (overshoot - 1);
                if (currentIndex > maxIndex) {
                    currentIndex = cloneCount;
                }
                updateSlider(true);
                isTransitioning = false;
            }
        } else {
            // Normal scrolling within real items
            updateSlider();
            setTimeout(() => {
                isTransitioning = false;
                updatePagination();
            }, 500);
        }
        updatePagination();
    }

    function goToPrev() {
        if (isTransitioning) return;
        isTransitioning = true;
        
        // Update itemsPerView and maxIndex based on current screen size
        itemsPerView = getItemsPerView();
        maxIndex = getMaxIndex();
        
        currentIndex--;
        
        // If we've scrolled before real items into cloned items
        if (currentIndex < cloneCount) {
            // Calculate how far before real items we are
            const overshoot = cloneCount - currentIndex;
            
            // If we're just one step before real items, scroll then jump seamlessly
            if (overshoot === 1) {
                updateSlider();
                // Use transitionend event for precise timing
                const handleTransitionEnd = (e) => {
                    // Only handle transform transitions
                    if (e.propertyName !== 'transform') return;
                    track.removeEventListener('transitionend', handleTransitionEnd);
                    // Use requestAnimationFrame to ensure jump happens after paint
                    requestAnimationFrame(() => {
                        currentIndex = maxIndex;
                        updateSlider(true);
                        isTransitioning = false;
                        updatePagination();
                    });
                };
                track.addEventListener('transitionend', handleTransitionEnd, { once: true });
            } else {
                // Already too far, jump immediately
                currentIndex = maxIndex - (overshoot - 1);
                if (currentIndex < cloneCount) {
                    currentIndex = maxIndex;
                }
                updateSlider(true);
                isTransitioning = false;
            }
        } else {
            // Normal scrolling within real items
            updateSlider();
            setTimeout(() => {
                isTransitioning = false;
                updatePagination();
            }, 500);
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
        setTimeout(() => startAutoPlay(), 5000); // Resume after 5 seconds
    });

    // Next button
    nextBtn.addEventListener('click', () => {
        stopAutoPlay();
        goToNext();
        setTimeout(() => startAutoPlay(), 5000); // Resume after 5 seconds
    });

    // Mobile buttons
    if (prevBtnMobile) {
        prevBtnMobile.addEventListener('click', () => {
            stopAutoPlay();
            goToPrev();
            setTimeout(() => startAutoPlay(), 5000); // Resume after 5 seconds
        });
    }

    if (nextBtnMobile) {
        nextBtnMobile.addEventListener('click', () => {
            stopAutoPlay();
            goToNext();
            setTimeout(() => startAutoPlay(), 5000); // Resume after 5 seconds
        });
    }

    // Pagination buttons
    if (prevBtnPagination) {
        prevBtnPagination.addEventListener('click', () => {
            stopAutoPlay();
            goToPrev();
            setTimeout(() => startAutoPlay(), 5000); // Resume after 5 seconds
        });
    }

    if (nextBtnPagination) {
        nextBtnPagination.addEventListener('click', () => {
            stopAutoPlay();
            goToNext();
            setTimeout(() => startAutoPlay(), 5000); // Resume after 5 seconds
        });
    }

    // Pagination dots
    paginationDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            if (isTransitioning) return;
            isTransitioning = true;
            stopAutoPlay();
            
            // Go directly to the item index
            // On mobile, this will center the item; on desktop, it will show the item as the first of 3
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

    // Pause on hover
    slider.addEventListener('mouseenter', () => {
        isPaused = true;
    });

    slider.addEventListener('mouseleave', () => {
        isPaused = false;
    });

    // Touch/Swipe functionality
    let isDragging = false;
    let startX = 0;
    let currentX = 0;
    let baseTranslate = 0;
    let dragOffset = 0;

    function getCurrentTranslate() {
        const itemWidth = getItemWidth();
        const gap = getGap();
        return -currentIndex * (itemWidth + gap);
    }

    function updateDragPosition() {
        if (!isDragging) return;
        
        const itemWidth = getItemWidth();
        const gap = getGap();
        
        // Calculate base position from currentIndex
        baseTranslate = -currentIndex * (itemWidth + gap);
        
        // Add drag offset
        dragOffset = currentX - startX;
        
        // Apply transform
        track.style.transform = `translateX(${baseTranslate + dragOffset}px)`;
    }

    // Touch events
    track.addEventListener('touchstart', (e) => {
        stopAutoPlay();
        isDragging = true;
        startX = e.touches[0].clientX;
        currentX = startX;
        baseTranslate = getCurrentTranslate();
        track.style.transition = 'none';
        track.style.cursor = 'grabbing';
    });

    track.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        currentX = e.touches[0].clientX;
        updateDragPosition();
    });

    track.addEventListener('touchend', () => {
        if (!isDragging) return;
        isDragging = false;
        track.style.transition = 'transform 0.5s ease-in-out';
        track.style.cursor = 'grab';

        const moved = currentX - startX;
        const threshold = 30; // Minimum distance to trigger slide
        const itemWidth = getItemWidth();
        const gap = getGap();
        const itemStep = itemWidth + gap;

        // Update itemsPerView and maxIndex based on current screen size
        itemsPerView = getItemsPerView();
        maxIndex = getMaxIndex();

        if (Math.abs(moved) > threshold) {
            // Calculate how many items to scroll based on drag distance
            const itemsToScroll = Math.round(Math.abs(moved) / itemStep);
            const scrollCount = Math.max(1, itemsToScroll); // At least 1 item
            
            if (moved > 0) {
                // Swipe right - go to previous
                currentIndex -= scrollCount;
                // Handle infinite loop
                if (currentIndex < cloneCount) {
                    // Scroll to cloned items first
                    const overshoot = cloneCount - currentIndex;
                    if (overshoot <= cloneCount) {
                        // Still within cloned items, allow it
                        updateSlider();
                    } else {
                        // Too far, jump to end
                        currentIndex = maxIndex;
                        updateSlider();
                        setTimeout(() => {
                            currentIndex = maxIndex - (overshoot - cloneCount - 1);
                            if (currentIndex < cloneCount) currentIndex = maxIndex;
                            updateSlider(true);
                        }, 500);
                    }
                } else {
                    updateSlider();
                }
            } else {
                // Swipe left - go to next
                currentIndex += scrollCount;
                // Handle infinite loop
                if (currentIndex > maxIndex) {
                    // Scroll to cloned items first
                    const overshoot = currentIndex - maxIndex;
                    if (overshoot <= cloneCount) {
                        // Still within cloned items, allow it
                        updateSlider();
                        // Then jump seamlessly to start
                        setTimeout(() => {
                            currentIndex = cloneCount + (overshoot - 1);
                            if (currentIndex > maxIndex) currentIndex = cloneCount;
                            updateSlider(true);
                        }, 500);
                    } else {
                        // Too far, jump to start
                        currentIndex = cloneCount;
                        updateSlider(true);
                    }
                } else {
                    updateSlider();
                }
            }
        } else {
            // Snap back to current position
            updateSlider();
        }
        
        setTimeout(() => startAutoPlay(), 5000); // Resume after 5 seconds
    });

    // Mouse events for desktop drag
    track.addEventListener('mousedown', (e) => {
        stopAutoPlay();
        isDragging = true;
        startX = e.clientX;
        currentX = startX;
        baseTranslate = getCurrentTranslate();
        track.style.transition = 'none';
        track.style.cursor = 'grabbing';
    });

    track.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        currentX = e.clientX;
        updateDragPosition();
    });

    track.addEventListener('mouseup', () => {
        if (!isDragging) return;
        isDragging = false;
        track.style.transition = 'transform 0.5s ease-in-out';
        track.style.cursor = 'grab';

        const moved = currentX - startX;
        const threshold = 30; // Minimum distance to trigger slide
        const itemWidth = getItemWidth();
        const gap = getGap();
        const itemStep = itemWidth + gap;

        // Update itemsPerView and maxIndex based on current screen size
        itemsPerView = getItemsPerView();
        maxIndex = getMaxIndex();

        if (Math.abs(moved) > threshold) {
            // Calculate how many items to scroll based on drag distance
            const itemsToScroll = Math.round(Math.abs(moved) / itemStep);
            const scrollCount = Math.max(1, itemsToScroll); // At least 1 item
            
            if (moved > 0) {
                // Drag right - go to previous
                currentIndex -= scrollCount;
                // Handle infinite loop
                if (currentIndex < cloneCount) {
                    // Scroll to cloned items first
                    const overshoot = cloneCount - currentIndex;
                    if (overshoot <= cloneCount) {
                        // Still within cloned items, allow it
                        updateSlider();
                    } else {
                        // Too far, jump to end
                        currentIndex = maxIndex;
                        updateSlider();
                        setTimeout(() => {
                            currentIndex = maxIndex - (overshoot - cloneCount - 1);
                            if (currentIndex < cloneCount) currentIndex = maxIndex;
                            updateSlider(true);
                        }, 500);
                    }
                } else {
                    updateSlider();
                }
            } else {
                // Drag left - go to next
                currentIndex += scrollCount;
                // Handle infinite loop
                if (currentIndex > maxIndex) {
                    // Scroll to cloned items first
                    const overshoot = currentIndex - maxIndex;
                    if (overshoot <= cloneCount) {
                        // Still within cloned items, allow it
                        updateSlider();
                        // Then jump seamlessly to start
                        setTimeout(() => {
                            currentIndex = cloneCount + (overshoot - 1);
                            if (currentIndex > maxIndex) currentIndex = cloneCount;
                            updateSlider(true);
                        }, 500);
                    } else {
                        // Too far, jump to start
                        currentIndex = cloneCount;
                        updateSlider(true);
                    }
                } else {
                    updateSlider();
                }
            }
        } else {
            // Snap back to current position
            updateSlider();
        }
        
        setTimeout(() => startAutoPlay(), 5000); // Resume after 5 seconds
    });

    track.addEventListener('mouseleave', () => {
        if (isDragging) {
            isDragging = false;
            track.style.transition = 'transform 0.5s ease-in-out';
            track.style.cursor = 'grab';
            // Snap back to current position
            updateSlider();
            setTimeout(() => startAutoPlay(), 5000); // Resume after 5 seconds
        }
    });

    // Set cursor style
    track.style.cursor = 'grab';
    track.style.userSelect = 'none';

    // Initialize - start at first real items (after cloned start items)
    updateSlider();
    updatePagination();
    
    // Start auto-play
    startAutoPlay();

    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            // Update itemsPerView and maxIndex based on new screen size
            itemsPerView = getItemsPerView();
            maxIndex = getMaxIndex();
            updateSlider();
            updatePagination();
        }, 250);
    });
}

function initFeedbackGalleryModal() {
    const feedbackItems = document.querySelectorAll('.feedback-image-item');
    const modal = document.getElementById('feedback-gallery-modal');
    const modalTrack = modal?.querySelector('.blaze-track');
    const counter = document.getElementById('feedback-image-counter');
    
    if (!feedbackItems.length || !modal || !modalTrack) return;

    // Feedback images array
    const feedbackImages = [
        'assets/images/feedback/feedback1.png',
        'assets/images/feedback/feedback2.png',
        'assets/images/feedback/feedback3.png',
        'assets/images/feedback/feedback4.png',
        'assets/images/feedback/feedback5.png',
        'assets/images/feedback/feedback6.png',
        'assets/images/feedback/feedback7.png',
        'assets/images/feedback/feedback8.png'
    ];

    // Build modal slides
    function buildModalSlides() {
        modalTrack.innerHTML = '';
        feedbackImages.forEach((src, index) => {
            const slide = document.createElement('div');
            slide.className = 'blaze-slide h-full flex items-center justify-center p-4';
            slide.innerHTML = `
                <img src="${src}" alt="Nail Design ${index + 1}" 
                     class="max-w-full max-h-[85vh] w-auto h-auto object-contain rounded-lg">
            `;
            modalTrack.appendChild(slide);
        });
    }

    // Initialize modal slider
    let modalSlider = null;
    function initModalSlider(startIndex = 0) {
        buildModalSlides();
        
        // Wait for DOM update
        setTimeout(() => {
            const sliderEl = modal.querySelector('.blaze-slider');
            if (sliderEl && window.BlazeSlider) {
                // Destroy existing slider if any
                if (modalSlider) {
                    try {
                        modalSlider.destroy?.();
                    } catch (e) {
                        console.warn('Error destroying modal slider:', e);
                    }
                }

                // Initialize new slider
                try {
                    modalSlider = new BlazeSlider(sliderEl, {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        loop: true,
                        enablePagination: false,
                        draggable: true,
                        transitionDuration: 400,
                        transitionTimingFunction: 'ease-in-out',
                        slideGap: '0px'
                    });

                    // Navigate to start index
                    if (startIndex > 0) {
                        modalSlider.next(startIndex);
                    }

                    // Update counter on slide change
                    if (modalSlider.onSlide) {
                        modalSlider.onSlide((stateIndex) => {
                            if (counter) {
                                counter.textContent = `${stateIndex + 1} / ${feedbackImages.length}`;
                            }
                        });
                    }

                    // Update icons
                    if (typeof lucide !== 'undefined') {
                        lucide.createIcons();
                    }
                } catch (e) {
                    console.error('Error initializing modal slider:', e);
                }
            }
        }, 100);
    }

    // Open modal
    function openModal(index) {
        if (!modal) return;

        // Initialize slider with start index
        initModalSlider(index);

        // Show modal
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        document.body.style.overflow = 'hidden';

        // Update counter
        if (counter) {
            counter.textContent = `${index + 1} / ${feedbackImages.length}`;
        }

        // Initialize jModal if available
        if (window.jModal && window.jModal.open) {
            try {
                window.jModal.open('#feedback-gallery-modal');
            } catch (e) {
                console.warn('Error opening modal with jModal:', e);
            }
        }
    }

    // Close modal
    function closeModal() {
        if (!modal) return;

        modal.classList.add('hidden');
        modal.classList.remove('flex');
        document.body.style.overflow = '';

        if (window.jModal && window.jModal.close) {
            try {
                window.jModal.close('#feedback-gallery-modal');
            } catch (e) {
                console.warn('Error closing modal with jModal:', e);
            }
        }
    }

    // Add click handlers to feedback items
    feedbackItems.forEach((item, index) => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const itemIndex = parseInt(item.getAttribute('data-feedback-index')) || index;
            openModal(itemIndex);
        });
    });

    // Initialize jModal
    if (window.jModal) {
        try {
            window.jModal.init('#feedback-gallery-modal', {
                closeOnBackdrop: true,
                closeOnEscape: true
            });
        } catch (e) {
            console.warn('Error initializing jModal:', e);
        }
    }

    // Close button handler
    const closeBtn = modal.querySelector('[data-jmodal-close]');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    // Close on backdrop click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
            closeModal();
        }
    });
}