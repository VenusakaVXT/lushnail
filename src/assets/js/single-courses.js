/**
 * Single Course Page JavaScript
 * Handles read more functionality and gallery load more
 */

document.addEventListener('DOMContentLoaded', function() {
    // Hide scrollbar arrows
    function hideScrollbarArrows() {
        const style = document.createElement('style');
        style.textContent = `
            .course-content-scroll::-webkit-scrollbar-button,
            .course-content-scroll::-webkit-scrollbar-button:start:decrement,
            .course-content-scroll::-webkit-scrollbar-button:end:increment,
            .course-content-scroll::-webkit-scrollbar-button:vertical:start:decrement,
            .course-content-scroll::-webkit-scrollbar-button:vertical:end:increment,
            .course-content-scroll::-webkit-scrollbar-button:single-button,
            .course-content-scroll::-webkit-scrollbar-button:double-button:start:decrement,
            .course-content-scroll::-webkit-scrollbar-button:double-button:end:increment,
            .learning-path-scroll::-webkit-scrollbar-button,
            .learning-path-scroll::-webkit-scrollbar-button:start:decrement,
            .learning-path-scroll::-webkit-scrollbar-button:end:increment,
            .learning-path-scroll::-webkit-scrollbar-button:vertical:start:decrement,
            .learning-path-scroll::-webkit-scrollbar-button:vertical:end:increment,
            .learning-path-scroll::-webkit-scrollbar-button:single-button,
            .learning-path-scroll::-webkit-scrollbar-button:double-button:start:decrement,
            .learning-path-scroll::-webkit-scrollbar-button:double-button:end:increment {
                display: none !important;
                height: 0px !important;
                width: 0px !important;
                background: transparent !important;
                -webkit-appearance: none !important;
                appearance: none !important;
                opacity: 0 !important;
                visibility: hidden !important;
                pointer-events: none !important;
                margin: 0 !important;
                padding: 0 !important;
                border: none !important;
            }
        `;
        document.head.appendChild(style);
    }
    hideScrollbarArrows();

    // Initialize Lucide icons after they're loaded
    function initIcons() {
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        } else {
            setTimeout(initIcons, 100);
        }
    }
    initIcons();

    // Course Content Read More Functionality
    const readMoreBtn = document.querySelector('.course-read-more-btn');
    const contentShort = document.querySelector('.course-content-short');
    const contentFull = document.querySelector('.course-content-full');
    const readMoreText = document.querySelector('.read-more-text');
    const readLessText = document.querySelector('.read-less-text');
    const arrowIcon = document.querySelector('.course-arrow-icon');

    if (readMoreBtn && contentShort && contentFull && arrowIcon) {
        readMoreBtn.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            
            if (isExpanded) {
                // Collapse
                contentFull.classList.add('hidden');
                contentShort.classList.remove('hidden');
                readMoreText.classList.remove('hidden');
                readLessText.classList.add('hidden');
                arrowIcon.style.transform = 'rotate(0deg)';
                this.setAttribute('aria-expanded', 'false');
            } else {
                // Expand
                contentShort.classList.add('hidden');
                contentFull.classList.remove('hidden');
                readMoreText.classList.add('hidden');
                readLessText.classList.remove('hidden');
                arrowIcon.style.transform = 'rotate(180deg)';
                this.setAttribute('aria-expanded', 'true');
            }
        });
    }

    // Gallery Load More Functionality
    const galleryGrid = document.querySelector('.course-gallery-grid');
    const loadMoreBtn = document.getElementById('gallery-load-more-btn');
    
    if (galleryGrid && loadMoreBtn) {
        // Additional gallery items
        const additionalImages = [
            {
                src: 'https://m.media-amazon.com/images/I/71vPZFCTi8L._SL1500_.jpg',
                alt: 'Khóa học nail - Hình ảnh 7',
                caption: 'Kỹ thuật nâng cao'
            },
            {
                src: 'https://m.media-amazon.com/images/I/71jqxWepZvL._SL1500_.jpg',
                alt: 'Khóa học nail - Hình ảnh 8',
                caption: 'Thực hành chuyên nghiệp'
            },
            {
                src: 'https://m.media-amazon.com/images/I/7159sUj7TNL._SL1500_.jpg',
                alt: 'Khóa học nail - Hình ảnh 9',
                caption: 'Tác phẩm học viên'
            }
        ];

        let loadedImages = 0;
        const imagesPerLoad = 3;

        function createGalleryItem(image) {
            return `
                <div class="course-gallery-item group relative overflow-hidden rounded-[16px] aspect-square cursor-pointer">
                    <img 
                        src="${image.src}" 
                        alt="${image.alt}"
                        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                        onerror="this.onerror=null; this.src='assets/images/placeholder.jpg';"
                    />
                    <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                        <p class="text-white text-[14px] font-medium">${image.caption}</p>
                    </div>
                </div>
            `;
        }

        function loadMoreImages() {
            const imagesToLoad = additionalImages.slice(loadedImages, loadedImages + imagesPerLoad);
            
            if (imagesToLoad.length > 0) {
                imagesToLoad.forEach((image) => {
                    const galleryItemHTML = createGalleryItem(image);
                    const tempDiv = document.createElement('div');
                    tempDiv.innerHTML = galleryItemHTML.trim();
                    const galleryItemElement = tempDiv.firstChild;
                    galleryGrid.appendChild(galleryItemElement);
                });

                loadedImages += imagesToLoad.length;

                // Check if all images are loaded
                if (loadedImages >= additionalImages.length) {
                    loadMoreBtn.style.display = 'none';
                }
            } else {
                loadMoreBtn.style.display = 'none';
            }

            // Reinitialize icons for new elements
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
        }

        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', loadMoreImages);
        }
    }

    // Learning Path Register Button - Scroll to Registration Form
    const learningPathRegisterBtn = document.getElementById('learning-path-register-btn');
    const registerFormSection = document.getElementById('register-course-form');

    if (learningPathRegisterBtn && registerFormSection) {
        learningPathRegisterBtn.addEventListener('click', function(e) {
            e.preventDefault();
            registerFormSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    }

    // Course Gallery Modal with Slider
    const galleryItems = document.querySelectorAll('.course-gallery-item');
    const galleryModal = document.getElementById('course-gallery-modal');
    
    if (galleryModal && galleryItems.length > 0) {
        const gallerySlider = document.getElementById('course-gallery-slider');
        const galleryTrack = gallerySlider ? gallerySlider.querySelector('.blaze-track') : null;
        const galleryPrevBtn = document.getElementById('gallery-prev-btn');
        const galleryNextBtn = document.getElementById('gallery-next-btn');
        const galleryCurrentIndex = document.getElementById('gallery-current-index');
        const galleryTotalCount = document.getElementById('gallery-total-count');
        
        let gallerySliderInstance = null;
        let currentImageIndex = 0;
        const galleryImages = [];

        // Collect all gallery images
        galleryItems.forEach((item, index) => {
            const img = item.querySelector('img');
            if (img) {
                galleryImages.push({
                    src: img.src,
                    alt: img.alt
                });
            }
        });

        console.log('Gallery found:', galleryItems.length, 'items,', galleryImages.length, 'images');
        
        // Update "More Images" count
        const moreCountElement = document.getElementById('gallery-more-count');
        if (moreCountElement) {
            const visibleItems = 4; // Number of visible items in grid
            const totalItems = galleryItems.length;
            const moreCount = totalItems > visibleItems ? totalItems - visibleItems : 0;
            
            if (moreCount > 0) {
                moreCountElement.textContent = `+${moreCount} More Images`;
                // Show overlay
                const overlay = moreCountElement.closest('.absolute');
                if (overlay) {
                    overlay.style.display = 'flex';
                }
            } else {
                // Hide the overlay if no more images
                const overlay = moreCountElement.closest('.absolute');
                if (overlay) {
                    overlay.style.display = 'none';
                }
            }
        }

        // Initialize gallery slider
        function initGallerySlider(startIndex = 0) {
            if (!galleryTrack || galleryImages.length === 0) {
                console.warn('Cannot init slider: track or images missing');
                return;
            }

            // Clear existing slides
            galleryTrack.innerHTML = '';

            // Create slides
            galleryImages.forEach((image, index) => {
                const slide = document.createElement('div');
                slide.className = 'blaze-slide';
            slide.innerHTML = `
                <div class="flex items-center justify-center h-full w-full">
                    <img 
                        src="${image.src}" 
                        alt="${image.alt}"
                        class="w-auto h-auto max-w-full max-h-[85vh] object-contain"
                        loading="lazy"
                    />
                </div>
            `;
                galleryTrack.appendChild(slide);
            });

            // Initialize BlazeSlider
            if (typeof BlazeSlider !== 'undefined') {
                // Destroy existing instance if any
                if (gallerySliderInstance) {
                    try {
                        gallerySliderInstance.destroy();
                    } catch (e) {
                        console.warn('Error destroying slider:', e);
                    }
                }

                try {
                    gallerySliderInstance = new BlazeSlider(gallerySlider, {
                        all: {
                            enableAutoplay: false,
                            stopAutoplayOnInteraction: true,
                            enablePagination: false,
                            draggable: true,
                            loop: true,
                            transitionDuration: 300,
                            transitionTimingFunction: 'ease-in-out',
                            slideGap: '0px',
                            slidesToShow: 1,
                            slidesToScroll: 1
                        }
                    });

                    // Go to start index
                    if (startIndex > 0) {
                        setTimeout(() => {
                            gallerySliderInstance.next(startIndex);
                        }, 100);
                    }

                    // Update counter
                    updateGalleryCounter(startIndex + 1);

                    // Listen for slide changes
                    if (gallerySliderInstance.onSlide) {
                        gallerySliderInstance.onSlide(function(stateIndex, firstSlideIndex, lastSlideIndex) {
                            // Use firstSlideIndex for accurate tracking when loop is enabled
                            let actualIndex = firstSlideIndex !== undefined ? firstSlideIndex : stateIndex;
                            
                            // Ensure index is within bounds (handle loop wrapping)
                            if (actualIndex < 0) {
                                actualIndex = galleryImages.length + actualIndex;
                            } else if (actualIndex >= galleryImages.length) {
                                actualIndex = actualIndex % galleryImages.length;
                            }
                            
                            currentImageIndex = actualIndex;
                            updateGalleryCounter(actualIndex + 1);
                        });
                    }
                } catch (e) {
                    console.error('Error initializing BlazeSlider:', e);
                }
            } else {
                console.warn('BlazeSlider not available');
            }
        }

        // Update gallery counter
        function updateGalleryCounter(index) {
            if (galleryCurrentIndex) {
                galleryCurrentIndex.textContent = index;
            }
            if (galleryTotalCount) {
                galleryTotalCount.textContent = galleryImages.length;
            }
        }

        // Open gallery modal
        function openGalleryModal(index = 0) {
            console.log('Opening gallery modal at index:', index);
            if (galleryImages.length === 0) {
                console.warn('No images to show');
                return;
            }

            currentImageIndex = index;
            
            // Force show modal immediately
            galleryModal.classList.remove('hidden');
            galleryModal.classList.add('flex');
            galleryModal.style.display = 'flex';
            galleryModal.style.visibility = 'visible';
            galleryModal.style.opacity = '1';
            document.body.style.overflow = 'hidden';
            
            // Add jmodal-active class to content for animation
            const modalContent = galleryModal.querySelector('.jmodal-content');
            if (modalContent) {
                modalContent.classList.add('jmodal-active');
            }
            
            console.log('Modal forced to show, classes:', galleryModal.className);
            
            // Also try jModal if available (but don't rely on it)
            if (window.jModal && window.jModal.open) {
                try {
                    window.jModal.open('#course-gallery-modal');
                    console.log('jModal.open() called');
                } catch (e) {
                    console.error('Error opening modal with jModal:', e);
                }
            }

            // Initialize slider after modal is shown
            setTimeout(() => {
                initGallerySlider(index);
                
                // Reinitialize icons
                if (typeof lucide !== 'undefined') {
                    lucide.createIcons();
                }
            }, 200);
        }

        // Close gallery modal
        function closeGalleryModal() {
            if (window.jModal && window.jModal.close) {
                try {
                    window.jModal.close('#course-gallery-modal');
                } catch (e) {
                    console.error('Error closing modal with jModal:', e);
                }
            }
            
            // Force hide modal
            galleryModal.classList.add('hidden');
            galleryModal.classList.remove('flex');
            galleryModal.style.display = 'none';
            document.body.style.overflow = '';
        }

        // Add click handlers to gallery items
        galleryItems.forEach((item, index) => {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('Gallery item clicked:', index);
                openGalleryModal(index);
            });
        });
        
        console.log('Click handlers attached to', galleryItems.length, 'items');

        // Navigation buttons
        if (galleryPrevBtn) {
            galleryPrevBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                if (gallerySliderInstance) {
                    gallerySliderInstance.prev();
                }
            });
        }

        if (galleryNextBtn) {
            galleryNextBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                if (gallerySliderInstance) {
                    gallerySliderInstance.next();
                }
            });
        }

        // Keyboard navigation
        document.addEventListener('keydown', function(e) {
            if (galleryModal && !galleryModal.classList.contains('hidden')) {
                if (e.key === 'ArrowLeft' && gallerySliderInstance) {
                    e.preventDefault();
                    gallerySliderInstance.prev();
                } else if (e.key === 'ArrowRight' && gallerySliderInstance) {
                    e.preventDefault();
                    gallerySliderInstance.next();
                } else if (e.key === 'Escape') {
                    closeGalleryModal();
                }
            }
        });

        // Initialize jModal for gallery modal
        if (window.jModal) {
            try {
                window.jModal.init('#course-gallery-modal', {
                    closeOnBackdrop: true,
                    closeOnEscape: true,
                    preventScroll: true
                });
                console.log('jModal initialized for gallery');
            } catch (e) {
                console.error('Error initializing jModal:', e);
            }
        } else {
            console.warn('jModal not available');
        }
        
        // Also add close handler for data-jmodal-close button
        const closeBtn = galleryModal.querySelector('[data-jmodal-close]');
        if (closeBtn) {
            closeBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                closeGalleryModal();
            });
        }
        
        // Close on backdrop click
        galleryModal.addEventListener('click', function(e) {
            if (e.target === galleryModal) {
                closeGalleryModal();
            }
        });
    } else {
        console.warn('Gallery modal or items not found');
    }

    // Initialize Course Video Modal
    initCourseVideoModal();
});

// Course Video Modal Functionality
function initCourseVideoModal() {
    const videoThumbnail = document.querySelector('.course-video-thumbnail');
    const videoPlayOverlay = document.querySelector('.course-video-play-overlay');
    const videoModal = document.getElementById('course-video-modal');
    const videoModalClose = document.getElementById('course-video-modal-close');
    const videoModalIframe = document.getElementById('course-video-modal-iframe');
    const videoModalTitle = document.getElementById('course-video-modal-title');

    if (!videoThumbnail || !videoModal || !videoModalIframe || !videoModalTitle) {
        return;
    }

    // Function to open video modal
    function openVideoModal(videoUrl, videoTitle) {
        if (!videoModal || !videoModalIframe || !videoModalTitle) return;
        
        videoModalTitle.textContent = videoTitle || 'Course Video';
        videoModalIframe.src = videoUrl;
        videoModal.classList.remove('hidden');
        videoModal.classList.add('flex');
        document.body.style.overflow = 'hidden';
        
        // Reinitialize icons
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }

    // Function to close video modal
    function closeVideoModal() {
        if (!videoModal || !videoModalIframe) return;
        
        videoModal.classList.add('hidden');
        videoModal.classList.remove('flex');
        videoModalIframe.src = '';
        document.body.style.overflow = '';
    }

    // Add click event to video thumbnail
    if (videoThumbnail) {
        videoThumbnail.addEventListener('click', function(e) {
            e.stopPropagation();
            const videoUrl = this.getAttribute('data-video-url');
            const videoTitle = this.getAttribute('data-video-title');
            if (videoUrl) {
                openVideoModal(videoUrl, videoTitle);
            }
        });
    }

    // Add click event to play overlay
    if (videoPlayOverlay) {
        videoPlayOverlay.addEventListener('click', function(e) {
            e.stopPropagation();
            const videoContainer = this.closest('.course-video-thumbnail');
            if (videoContainer) {
                const videoUrl = videoContainer.getAttribute('data-video-url');
                const videoTitle = videoContainer.getAttribute('data-video-title');
                if (videoUrl) {
                    openVideoModal(videoUrl, videoTitle);
                }
            }
        });
    }

    // Close modal when clicking close button
    if (videoModalClose) {
        videoModalClose.addEventListener('click', closeVideoModal);
    }

    // Close modal when clicking outside
    if (videoModal) {
        videoModal.addEventListener('click', function(e) {
            if (e.target === videoModal) {
                closeVideoModal();
            }
        });
    }

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && videoModal && !videoModal.classList.contains('hidden')) {
            closeVideoModal();
        }
    });
}

