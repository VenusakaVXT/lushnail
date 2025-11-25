/**
 * Home.js - Homepage JavaScript Logic
 * Slider initialization is handled in sliders.js
 */

document.addEventListener('DOMContentLoaded', function () {
    initContactForm();
    initScrollAnimations();
    initMostPopularNailGallery();
    initReviewSlider();
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
        item.addEventListener('mouseenter', function() {
            // Remove active from all items
            items.forEach(i => i.classList.remove('active'));
            // Add active to hovered item
            this.classList.add('active');
        });
    });

    // Reset to first item when mouse leaves gallery
    gallery.addEventListener('mouseleave', function() {
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