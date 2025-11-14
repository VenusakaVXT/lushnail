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
});

