document.addEventListener('DOMContentLoaded', function () {
    function initSlider(selector, config) {
        var nodes = document.querySelectorAll(selector);
        if (!nodes || nodes.length === 0) return;
        nodes.forEach(function (node) {
            try {
                new BlazeSlider(node, config);
            } catch (e) {
                console.error('BlazeSlider init failed for', selector, e);
            }
        });
    }

    var commonAll = {
        enableAutoplay: false,
        stopAutoplayOnInteraction: true,
        enablePagination: true,
        draggable: true,
        loop: true,
        transitionDuration: 300,
        transitionTimingFunction: 'ease',
        slideGap: '16px',
        slidesToShow: 1,
        slidesToScroll: 1
    };

    // 6-per-view on very large desktop
    initSlider('.bslider-6', {
        all: commonAll,
        '(min-width: 500px) and (max-width: 768px)': { slidesToShow: 2, slidesToScroll: 2 },
        '(min-width: 768px) and (max-width: 1023px)': { slidesToShow: 3, slidesToScroll: 3 },
        '(min-width: 1023px) and (max-width: 1360px)': { slidesToShow: 4, slidesToScroll: 4 },
        '(min-width: 1360px) and (max-width: 1590px)': { slidesToShow: 5, slidesToScroll: 5 },
        '(min-width: 1590px)': { slidesToShow: 6, slidesToScroll: 6 }
    });

    // 5-per-view on desktop
    initSlider('.bslider-5', {
        all: commonAll,
        '(min-width: 500px) and (max-width: 768px)': { slidesToShow: 2, slidesToScroll: 2 },
        '(min-width: 768px) and (max-width: 1023px)': { slidesToShow: 3, slidesToScroll: 3 },
        '(min-width: 1023px) and (max-width: 1360px)': { slidesToShow: 4, slidesToScroll: 4 },
        '(min-width: 1360px)': { slidesToShow: 5, slidesToScroll: 5 }
    });

    // 4-per-view on desktop
    initSlider('.bslider-4', {
        all: commonAll,
        '(min-width: 500px) and (max-width: 768px)': { slidesToShow: 2, slidesToScroll: 2 },
        '(min-width: 768px) and (max-width: 1023px)': { slidesToShow: 3, slidesToScroll: 3 },
        '(min-width: 1023px)': { slidesToShow: 4, slidesToScroll: 4 }
    });

    // 3-per-view on desktop
    initSlider('.bslider-3', {
        all: commonAll,
        '(min-width: 600px) and (max-width: 1023px)': { slidesToShow: 2, slidesToScroll: 2 },
        '(min-width: 1023px)': { slidesToShow: 3, slidesToScroll: 3 }
    });

    // Image carousel slider - 1 image per slide
    initSlider('.bslider-image', {
        all: {
            enableAutoplay: false,
            stopAutoplayOnInteraction: true,
            enablePagination: false, // Disable default pagination
            draggable: true,
            loop: true,
            transitionDuration: 500,
            transitionTimingFunction: 'ease-in-out',
            slideGap: '0px',
            slidesToShow: 1,
            slidesToScroll: 1
        }
    });

    // Setup image pagination for bslider-image
    setupImagePagination('.bslider-image');

    // Also setup after a longer delay to ensure BlazeSlider is fully initialized
    setTimeout(function () {
        setupImagePagination('.bslider-image');
    }, 1000);

    // Testimonials/Feedback slider - 1 slide on mobile, 2 on tablet, 3 on desktop
    initSlider('.bslider-testimonials', {
        all: {
            slidesToShow: 1,
            slidesToScroll: 1,
            transitionDuration: 500,
            transitionTimingFunction: 'ease',
            loop: true,
            loopRepeats: -1,
            slideGap: '6px',
            enablePagination: true,
            enableAutoplay: true,
            autoplayInterval: 2000,
            stopAutoplayOnInteraction: true,
            draggable: true,
        },
        '(min-width: 641px)': {
            slidesToShow: 2,
            slideGap: '8px',
        },
        '(min-width: 1024px)': {
            slidesToShow: 3,
            slideGap: '10px',
        }
    });

    // Hero slider - Full width banner with autoplay
    initSlider('.bslider-hero', {
        all: {
            slidesToShow: 1,
            slidesToScroll: 1,
            transitionDuration: 600,
            transitionTimingFunction: 'ease-in-out',
            loop: true,
            loopRepeats: -1,
            slideGap: '0px',
            enablePagination: true,
            enableAutoplay: true,
            autoplayInterval: 5000,
            stopAutoplayOnInteraction: true,
            draggable: true,
        }
    });
});

// Setup image pagination functionality
function setupImagePagination(selector) {
    const sliders = document.querySelectorAll(selector);

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
                console.warn('BlazeSlider instance not found for', selector);
                return;
            }

            // Update active pagination item
            function updateActivePagination() {
                // Get current state index from BlazeSlider
                const currentStateIndex = blazeInstance.stateIndex || 0;

                paginationItems.forEach(function (item, index) {
                    // Remove all active states first
                    item.classList.remove('active');
                    item.classList.remove('ring-2', 'ring-blue-500');
                    item.classList.remove('border-[#ae873e]');
                    
                    // Add active state to current item
                    if (index === currentStateIndex) {
                        item.classList.add('active');
                        item.classList.add('ring-2', 'ring-[#ae873e]');
                        item.classList.add('border-[#ae873e]');
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
        }, 200);
    });
}