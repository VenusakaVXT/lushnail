/**
 * Product Detail Page JavaScript
 * Handles product gallery, modal, tabs, reviews, and interactions
 */

document.addEventListener('DOMContentLoaded', function () {
  // Initialize Lucide icons after they're loaded
  function initIcons() {
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    } else {
      setTimeout(initIcons, 100);
    }
  }
  initIcons();

  // Product Gallery Thumbnail Selection
  const thumbnailItems = document.querySelectorAll('.thumbnail-item');
  const mainProductImage = document.getElementById('main-product-image');

  thumbnailItems.forEach(item => {
    item.addEventListener('click', function () {
      // Remove active class from all thumbnails
      thumbnailItems.forEach(thumb => thumb.classList.remove('active', 'border-[#ae873e]'));
      thumbnailItems.forEach(thumb => thumb.classList.add('border-transparent'));

      // Add active class to clicked thumbnail
      this.classList.add('active', 'border-[#ae873e]');
      this.classList.remove('border-transparent');

      // Update main image
      const thumbnailImg = this.querySelector('img');
      if (thumbnailImg && thumbnailImg.dataset.mainImage) {
        mainProductImage.src = thumbnailImg.dataset.mainImage;
        mainProductImage.alt = thumbnailImg.alt;
      }
    });
  });

  // Quantity Selector - Main Product Page
  const quantityInput = document.getElementById('quantity-input');
  const quantityDecrease = document.getElementById('quantity-decrease');
  const quantityIncrease = document.getElementById('quantity-increase');

  if (quantityDecrease && quantityInput) {
    quantityDecrease.addEventListener('click', function () {
      let currentValue = parseInt(quantityInput.value) || 1;
      if (currentValue > 1) {
        quantityInput.value = currentValue - 1;
      }
    });
  }

  if (quantityIncrease && quantityInput) {
    quantityIncrease.addEventListener('click', function () {
      let currentValue = parseInt(quantityInput.value) || 1;
      if (currentValue < 99) {
        quantityInput.value = currentValue + 1;
      }
    });
  }

  if (quantityInput) {
    quantityInput.addEventListener('change', function () {
      let value = parseInt(this.value) || 1;
      if (value < 1) value = 1;
      if (value > 99) value = 99;
      this.value = value;
    });
  }

  // Quantity Selector - Modal
  const quantityInputs = document.querySelectorAll('.modal-quantity-input');
  const quantityBtns = document.querySelectorAll('.modal-quantity-btn');

  quantityBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      const isIncrease = this.classList.contains('increase');
      const isDecrease = this.classList.contains('decrease');
      const input = this.closest('.flex').querySelector('input[type="number"]');

      if (input) {
        let currentValue = parseInt(input.value) || 1;

        if (isIncrease && currentValue < 99) {
          input.value = currentValue + 1;
        } else if (isDecrease && currentValue > 1) {
          input.value = currentValue - 1;
        }

        // Update modal total price
        updateModalTotalPrice();
      }
    });
  });

  quantityInputs.forEach(input => {
    input.addEventListener('change', function () {
      let value = parseInt(this.value) || 1;
      if (value < 1) value = 1;
      if (value > 99) value = 99;
      this.value = value;

      if (this.classList.contains('modal-quantity-input')) {
        updateModalTotalPrice();
      }
    });

    input.addEventListener('input', function () {
      let value = parseInt(this.value) || 1;
      if (value < 1) value = 1;
      if (value > 99) value = 99;
      this.value = value;

      if (this.classList.contains('modal-quantity-input')) {
        updateModalTotalPrice();
      }
    });
  });

  // Design Pattern Selection
  const designOptions = document.querySelectorAll('.design-option, .modal-design-option');

  designOptions.forEach(option => {
    option.addEventListener('click', function () {
      const container = this.closest('#design-patterns, #modal-design-patterns');
      if (container) {
        container.querySelectorAll('.design-option, .modal-design-option').forEach(opt => {
          opt.classList.remove('active', 'border-[#ae873e]');
          opt.classList.add('border-transparent');
        });

        this.classList.add('active', 'border-[#ae873e]');
        this.classList.remove('border-transparent');

        // Update selected pattern name in modal
        const patternName = this.querySelector('p').textContent;
        const patternNameEl = document.getElementById('selected-pattern-name');
        if (patternNameEl) {
          patternNameEl.textContent = patternName;
        }
      }
    });
  });

  // Add to Cart Modal - Initialize with jModal
  if (window.jModal) {
    window.jModal.init('#add-to-cart-modal', {
      closeOnBackdrop: true,
      closeOnEscape: true,
      preventScroll: true
    });
  }

  function updateModalTotalPrice() {
    const quantityInput = document.querySelector('.modal-quantity-input');
    const totalPriceEl = document.getElementById('modal-total-price');

    if (quantityInput && totalPriceEl) {
      const quantity = parseInt(quantityInput.value) || 1;
      const unitPrice = 27; // Price per unit
      const total = quantity * unitPrice;
      totalPriceEl.textContent = `$${total}`;
    }
  }

  // Confirm Add to Cart - Close modal using jModal
  const confirmAddToCartBtn = document.getElementById('confirm-add-to-cart');
  if (confirmAddToCartBtn) {
    confirmAddToCartBtn.addEventListener('click', function () {
      const quantity = document.querySelector('.modal-quantity-input')?.value || 1;
      const pattern = document.querySelector('.modal-design-option.active p')?.textContent || 'Mẫu 1';

      if (window.fastNotice) {
        window.fastNotice.success(`Đã thêm ${quantity} sản phẩm "${pattern}" vào giỏ hàng!`);
      }

      // Close modal using jModal
      if (window.jModal) {
        const modalId = document.getElementById('add-to-cart-modal')?.id;
        if (modalId) {
          window.jModal.close(modalId);
        }
      }
    });
  }

  // Product Tabs - Handled by tabs.js

  // Review Form
  const writeReviewBtn = document.getElementById('write-review-btn');
  const reviewFormContainer = document.getElementById('review-form-container');
  const cancelReviewBtn = document.getElementById('cancel-review-btn');
  const reviewForm = document.getElementById('review-form');
  const starBtns = document.querySelectorAll('.star-btn');
  const ratingValue = document.getElementById('rating-value');

  function toggleReviewForm() {
    if (reviewFormContainer) {
      reviewFormContainer.classList.toggle('hidden');
      initIcons();
    }
  }

  if (writeReviewBtn) {
    writeReviewBtn.addEventListener('click', toggleReviewForm);
  }

  if (cancelReviewBtn) {
    cancelReviewBtn.addEventListener('click', toggleReviewForm);
  }

  // Star Rating
  starBtns.forEach((btn, index) => {
    btn.addEventListener('click', function () {
      const rating = parseInt(this.dataset.rating);

      // Update visual stars
      starBtns.forEach((starBtn, i) => {
        const starIcon = starBtn.querySelector('i[data-lucide="star"]');
        if (i < rating) {
          starBtn.classList.add('text-[#fbbf24]');
          starBtn.classList.remove('text-[#e5e7eb]');
          if (starIcon) {
            starIcon.classList.add('fill-[#fbbf24]');
          }
        } else {
          starBtn.classList.remove('text-[#fbbf24]');
          starBtn.classList.add('text-[#e5e7eb]');
          if (starIcon) {
            starIcon.classList.remove('fill-[#fbbf24]');
          }
        }
      });

      // Update hidden input
      if (ratingValue) {
        ratingValue.value = rating;
      }

      initIcons();
    });
  });

  // Image Upload Preview
  const reviewImagesInput = document.getElementById('review-images');
  const uploadedImagesPreview = document.getElementById('uploaded-images-preview');
  const maxImages = 5;

  if (reviewImagesInput && uploadedImagesPreview) {
    reviewImagesInput.addEventListener('change', function (e) {
      const files = Array.from(e.target.files).slice(0, maxImages);

      uploadedImagesPreview.innerHTML = '';

      files.forEach((file, index) => {
        if (file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = function (e) {
            const imgContainer = document.createElement('div');
            imgContainer.className = 'relative w-24 h-24 rounded-lg overflow-hidden border-2 border-[#ececf0]';
            imgContainer.innerHTML = `
              <img src="${e.target.result}" alt="Preview ${index + 1}" class="w-full h-full object-cover" />
              <button type="button" class="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-[10px] hover:bg-red-600 remove-image-btn">
                <i data-lucide="x" class="w-3 h-3"></i>
              </button>
            `;
            uploadedImagesPreview.appendChild(imgContainer);
            initIcons();

            // Remove image button
            const removeBtn = imgContainer.querySelector('.remove-image-btn');
            if (removeBtn) {
              removeBtn.addEventListener('click', function () {
                imgContainer.remove();
              });
            }
          };
          reader.readAsDataURL(file);
        }
      });
    });
  }

  // Submit Review Form
  if (reviewForm) {
    reviewForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const rating = ratingValue.value;
      const reviewText = document.getElementById('review-text').value;

      if (!rating || rating === '0') {
        if (window.fastNotice) {
          window.fastNotice.error('Vui lòng chọn đánh giá sao!');
        }
        return;
      }

      if (!reviewText.trim()) {
        if (window.fastNotice) {
          window.fastNotice.error('Vui lòng nhập nhận xét!');
        }
        return;
      }

      if (window.fastNotice) {
        window.fastNotice.success('Cảm ơn bạn đã đánh giá! Đánh giá của bạn đang được xử lý.');
      }

      // Reset form
      reviewForm.reset();
      uploadedImagesPreview.innerHTML = '';
      starBtns.forEach(btn => {
        btn.classList.remove('text-[#fbbf24]');
        btn.classList.add('text-[#e5e7eb]');
      });
      ratingValue.value = '0';
      toggleReviewForm();
      initIcons();
    });
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

  const animatedElements = document.querySelectorAll('.scroll-fade-in, .scroll-slide-up');
  animatedElements.forEach(el => {
    observer.observe(el);
  });
});

// Add CSS animations via style tag
const style = document.createElement('style');
style.textContent = `
    .scroll-fade-in {
        opacity: 0;
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }
    
    .scroll-fade-in.animated {
        opacity: 1;
        transform: translateY(0);
    }

    .scroll-slide-up {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.8s ease-out, transform 0.8s ease-out;
    }
    
    .scroll-slide-up.animated {
        opacity: 1;
        transform: translateY(0);
    }

    .thumbnail-item.active {
        border-color: #ae873e !important;
    }

    .design-option.active,
    .modal-design-option.active {
        border-color: #ae873e !important;
        background-color: #FFF9F2;
    }

    .tab-content.active {
        display: block;
    }

`;

document.head.appendChild(style);

