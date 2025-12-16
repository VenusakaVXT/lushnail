/**
 * Products Page JavaScript
 * Handles scroll animations and interactive features
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

  // Scroll Animation Observer
  // const observerOptions = {
  //   threshold: 0.1,
  //   rootMargin: '0px 0px -100px 0px'
  // };

  // const observer = new IntersectionObserver(function (entries) {
  //   entries.forEach(entry => {
  //     if (entry.isIntersecting) {
  //       entry.target.classList.add('animated');
  //       observer.unobserve(entry.target);
  //     }
  //   });
  // }, observerOptions);

  // Observe all elements with scroll animation classes
  // const animatedElements = document.querySelectorAll('.scroll-fade-in, .scroll-slide-up, .scroll-slide-left, .scroll-slide-right');
  // animatedElements.forEach(el => {
  //   observer.observe(el);
  // });

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

  // Commented: Hero Section Scroll Buttons - Now using anchor links with CSS scroll-margin-top
  // const heroScrollButtons = document.querySelectorAll('.hero-scroll-btn[data-scroll-to]');
  // heroScrollButtons.forEach(button => {
  //   button.addEventListener('click', function (e) {
  //     e.preventDefault();
  //     const targetSectionName = this.getAttribute('data-scroll-to');
  //     const targetSection = document.querySelector(`section[data-name="${targetSectionName}"], [data-name="${targetSectionName}"]`);
  //
  //     if (targetSection) {
  //       const offset = 80; // Offset for fixed header if any
  //       const elementPosition = targetSection.getBoundingClientRect().top;
  //       const offsetPosition = elementPosition + window.pageYOffset - offset;
  //
  //       window.scrollTo({
  //         top: offsetPosition,
  //         behavior: 'smooth'
  //       });
  //     } else {
  //       console.warn(`Section with data-name="${targetSectionName}" not found`);
  //     }
  //   });
  // });

  // Initialize Add to Cart Modal
  const addToCartModal = document.getElementById('add-to-cart-modal');
  if (addToCartModal && window.jModal) {
    window.jModal.init('#add-to-cart-modal', {
      closeOnBackdrop: true,
      closeOnEscape: true,
      preventScroll: true
    });
  }

  // Initialize Quantity Selector for Modal
  function initModalQuantitySelector() {
    const quantityContainer = addToCartModal?.querySelector('.flex.items-center.gap-3');
    if (!quantityContainer) return;

    const decreaseBtn = quantityContainer.querySelector('.modal-quantity-btn.decrease');
    const increaseBtn = quantityContainer.querySelector('.modal-quantity-btn.increase');
    const quantityInput = quantityContainer.querySelector('.modal-quantity-input');

    if (!quantityInput) return;

    const min = parseInt(quantityInput.getAttribute('min')) || 1;
    const max = parseInt(quantityInput.getAttribute('max')) || 99;

    function updateQuantity(value) {
      let newValue = parseInt(value) || min;
      if (newValue < min) newValue = min;
      if (newValue > max) newValue = max;
      quantityInput.value = newValue;
      updateModalTotalPrice();
    }

    if (decreaseBtn) {
      decreaseBtn.addEventListener('click', function () {
        let currentValue = parseInt(quantityInput.value) || min;
        if (currentValue > min) {
          updateQuantity(currentValue - 1);
        }
      });
    }

    if (increaseBtn) {
      increaseBtn.addEventListener('click', function () {
        let currentValue = parseInt(quantityInput.value) || min;
        if (currentValue < max) {
          updateQuantity(currentValue + 1);
        }
      });
    }

    quantityInput.addEventListener('change', function () {
      updateQuantity(this.value);
    });
  }

  // Update Modal Total Price
  function updateModalTotalPrice() {
    if (!addToCartModal) return;
    
    const quantityInput = addToCartModal.querySelector('.modal-quantity-input');
    const totalPriceEl = document.getElementById('modal-total-price');
    const unitPriceEl = addToCartModal.querySelector('.flex-1 .text-\\[\\#ae873e\\]');

    if (quantityInput && totalPriceEl && unitPriceEl) {
      const quantity = parseInt(quantityInput.value) || 1;
      const unitPriceText = unitPriceEl.textContent.trim();
      // Extract price number (remove currency symbols, spaces, and dots - dots are thousands separators in VN)
      // Remove all non-digit characters except for potential decimal comma
      let priceStr = unitPriceText.replace(/[^\d,]/g, '');
      // If there's a comma, it might be decimal separator, otherwise remove all commas
      // For VN format: "891.000₫" -> remove dots, no decimal -> 891000
      // For format with comma as decimal: "891,50" -> keep comma -> 891.50
      if (priceStr.includes(',')) {
        // Check if comma is decimal separator (usually 1-2 digits after comma)
        const parts = priceStr.split(',');
        if (parts.length === 2 && parts[1].length <= 2) {
          // Decimal separator
          priceStr = parts[0] + '.' + parts[1];
        } else {
          // Thousands separator, remove it
          priceStr = priceStr.replace(/,/g, '');
        }
      }
      // Remove all dots (thousands separators in VN format)
      priceStr = priceStr.replace(/\./g, '');
      const unitPrice = parseFloat(priceStr) || 0;
      const total = quantity * unitPrice;
      totalPriceEl.textContent = total.toLocaleString('vi-VN') + '₫';
    }
  }

  // Initialize Design Pattern Selection
  function initModalDesignPatterns() {
    const designOptions = addToCartModal?.querySelectorAll('.modal-design-option');
    if (!designOptions) return;

    designOptions.forEach(option => {
      option.addEventListener('click', function () {
        const container = this.closest('#modal-design-patterns');
        if (container) {
          container.querySelectorAll('.modal-design-option').forEach(opt => {
            opt.classList.remove('active', 'border-[#ae873e]');
            opt.classList.add('border-transparent');
          });

          this.classList.add('active', 'border-[#ae873e]');
          this.classList.remove('border-transparent');

          // Update selected pattern name in modal
          const patternName = this.querySelector('p')?.textContent;
          const patternNameEl = document.getElementById('selected-pattern-name');
          if (patternNameEl && patternName) {
            patternNameEl.textContent = patternName;
          }
        }
      });
    });
  }

  // Initialize Size Selection
  function initModalSizeOptions() {
    const sizeOptions = addToCartModal?.querySelectorAll('.modal-size-option');
    if (!sizeOptions) return;

    sizeOptions.forEach(option => {
      option.addEventListener('click', function () {
        const container = this.closest('#modal-size-options');
        if (container) {
          container.querySelectorAll('.modal-size-option').forEach(opt => {
            opt.classList.remove('active', 'border-[#ae873e]');
            opt.classList.add('border-[#ececf0]');
            opt.classList.remove('border-transparent');
          });

          this.classList.add('active', 'border-[#ae873e]');
          this.classList.remove('border-[#ececf0]', 'border-transparent');

          // Update selected size name in modal
          const sizeName = this.textContent.trim();
          const sizeNameEl = document.getElementById('selected-size-name');
          if (sizeNameEl && sizeName) {
            sizeNameEl.textContent = sizeName;
          }
        }
      });
    });
  }

  // Handle Buy Now Button Click - Update Modal with Product Info
  const buyNowButtons = document.querySelectorAll('.buy-now-btn');
  buyNowButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      const productName = this.getAttribute('data-product-name');
      const productPrice = this.getAttribute('data-product-price');
      const productImage = this.getAttribute('data-product-image');

      // Update modal product info
      if (addToCartModal) {
        const modalProductImg = addToCartModal.querySelector('.flex.gap-4 img');
        const modalProductName = addToCartModal.querySelector('.flex-1 h4');
        const modalProductPrice = addToCartModal.querySelector('.flex-1 .text-\\[\\#ae873e\\]');

        if (modalProductImg && productImage) {
          modalProductImg.src = productImage;
          modalProductImg.alt = productName || 'Product';
        }
        if (modalProductName && productName) {
          modalProductName.textContent = productName;
        }
        if (modalProductPrice && productPrice) {
          modalProductPrice.textContent = productPrice;
        }

        // Reset quantity to 1
        const quantityInput = addToCartModal.querySelector('.modal-quantity-input');
        if (quantityInput) {
          quantityInput.value = 1;
        }

        // Update total price
        updateModalTotalPrice();

        // Reinitialize icons after modal opens
        setTimeout(() => {
          if (typeof lucide !== 'undefined') {
            lucide.createIcons();
          }
        }, 100);
      }
    });
  });

  // Add to Cart Button (Thêm vào giỏ hàng)
  const addToCartBtn = document.getElementById('add-to-cart-btn');
  if (addToCartBtn) {
    addToCartBtn.addEventListener('click', function () {
      const quantity = addToCartModal?.querySelector('.modal-quantity-input')?.value || 1;
      const pattern = addToCartModal?.querySelector('.modal-design-option.active p')?.textContent || 'Mẫu 1';
      const size = addToCartModal?.querySelector('.modal-size-option.active')?.textContent.trim() || 'M';

      if (window.fastNotice) {
        window.fastNotice.success(`Đã thêm ${quantity} sản phẩm "${pattern}" - Size ${size} vào giỏ hàng!`);
      }

      // Don't close modal, allow user to continue shopping or proceed to checkout
    });
  }

  // Confirm Add to Cart Button (Thanh Toán)
  const confirmAddToCartBtn = document.getElementById('confirm-add-to-cart');
  if (confirmAddToCartBtn) {
    confirmAddToCartBtn.addEventListener('click', function () {
      const quantity = addToCartModal?.querySelector('.modal-quantity-input')?.value || 1;
      const pattern = addToCartModal?.querySelector('.modal-design-option.active p')?.textContent || 'Mẫu 1';
      const size = addToCartModal?.querySelector('.modal-size-option.active')?.textContent.trim() || 'M';

      if (window.fastNotice) {
        window.fastNotice.success(`Đã thêm ${quantity} sản phẩm "${pattern}" - Size ${size} vào giỏ hàng!`);
      }

      // Close modal using jModal
      if (window.jModal) {
        window.jModal.close('#add-to-cart-modal');
      }

      // Redirect to checkout page (you can change this URL)
      // window.location.href = '/checkout.html';
    });
  }

  // Initialize modal functionality when modal is available
  if (addToCartModal) {
    initModalQuantitySelector();
    initModalDesignPatterns();
    initModalSizeOptions();
  }

  // Load More Products Functionality
  const loadMoreBtn = document.getElementById('load-more-products-btn');
  const productsGrid = document.getElementById('products-grid');

  if (loadMoreBtn && productsGrid) {
    const allProducts = productsGrid.querySelectorAll('.product-card');
    const initialDisplayCount = 12; // Show 12 products initially
    const productsPerLoad = 8; // Load 8 products per click

    // Hide button if there are 12 or fewer products
    if (allProducts.length <= initialDisplayCount) {
      loadMoreBtn.style.display = 'none';
    } else {
      // Show button if there are more than 12 products
      loadMoreBtn.style.display = 'inline-block';
    }

    // Function to show more products (8 at a time)
    function loadMoreProducts() {
      const hiddenProducts = productsGrid.querySelectorAll('.product-card-hidden');
      
      if (hiddenProducts.length > 0) {
        // Get products to show (max 8)
        const productsToShow = Array.from(hiddenProducts).slice(0, productsPerLoad);

        productsToShow.forEach((product, index) => {
          setTimeout(() => {
            product.classList.remove('product-card-hidden');
            // Add fade-in animation
            product.style.opacity = '0';
            product.style.transform = 'translateY(20px)';
            setTimeout(() => {
              product.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
              product.style.opacity = '1';
              product.style.transform = 'translateY(0)';
            }, 10);
          }, index * 50); // Stagger animation
        });

        // Check if there are more products to load
        setTimeout(() => {
          const remainingHidden = productsGrid.querySelectorAll('.product-card-hidden');
          if (remainingHidden.length === 0) {
            loadMoreBtn.style.display = 'none';
          }
        }, productsToShow.length * 50 + 500);
      } else {
        // No more products to load, hide button
        loadMoreBtn.style.display = 'none';
      }
    }

    // Add click event listener
    loadMoreBtn.addEventListener('click', loadMoreProducts);
  }

  // Products Transition Section Parallax Animation
  const transitionSection = document.querySelector('[data-name="products-transition-section"]');
  if (transitionSection) {
    const bottles = transitionSection.querySelectorAll('.nail-bottle');
    const glitterParticles = transitionSection.querySelectorAll('.glitter-particle');

    // Store initial positions and rotations
    bottles.forEach((bottle, index) => {
      const rect = bottle.getBoundingClientRect();
      bottle.dataset.initialTop = rect.top + window.scrollY;
      bottle.dataset.initialLeft = rect.left;

      // Get initial rotation from CSS variable or inline style
      const style = window.getComputedStyle(bottle);
      const initialRotate = style.getPropertyValue('--initial-rotate');
      if (initialRotate) {
        const match = initialRotate.match(/(-?\d+(?:\.\d+)?)deg/);
        if (match) {
          bottle.dataset.initialRotate = parseFloat(match[1]);
        } else {
          bottle.dataset.initialRotate = 0;
        }
      } else {
        bottle.dataset.initialRotate = 0;
      }
    });

    let ticking = false;

    function updateParallax() {
      if (!transitionSection) return;

      const rect = transitionSection.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const sectionTop = rect.top;
      const sectionBottom = rect.bottom;

      // Check if section is in viewport
      if (sectionBottom < 0 || sectionTop > windowHeight) {
        ticking = false;
        return;
      }

      // Calculate scroll progress (0 to 1)
      const scrollProgress = Math.max(0, Math.min(1,
        (windowHeight - sectionTop) / (windowHeight + rect.height)
      ));

      // Animate bottles with parallax effect
      bottles.forEach((bottle) => {
        const speed = parseFloat(bottle.dataset.speed) || 0.5;
        const initialRotate = parseFloat(bottle.dataset.initialRotate) || 0;

        // Parallax movement based on scroll
        const parallaxY = scrollProgress * 200 * speed;
        const parallaxX = Math.sin(scrollProgress * Math.PI) * 50 * speed;
        const rotate = initialRotate + (scrollProgress * 360 * speed);

        // Fade out as scrolling
        const opacity = 1 - scrollProgress * 0.8;
        const scale = 1 - scrollProgress * 0.3;

        bottle.style.transform = `
          translateY(${parallaxY}px) 
          translateX(${parallaxX}px) 
          rotate(${rotate}deg) 
          scale(${scale})
        `;
        bottle.style.opacity = Math.max(0.2, opacity);
      });

      // Animate glitter particles
      glitterParticles.forEach((particle, index) => {
        const delay = index * 0.1;
        const particleProgress = Math.max(0, Math.min(1, scrollProgress + delay));
        const particleY = particleProgress * 300;
        const particleOpacity = 1 - particleProgress * 0.9;

        particle.style.transform = `translateY(${particleY}px)`;
        particle.style.opacity = Math.max(0.1, particleOpacity);
      });

      ticking = false;
    }

    function requestTick() {
      if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
      }
    }

    // Throttled scroll event
    window.addEventListener('scroll', requestTick, { passive: true });
    window.addEventListener('resize', requestTick, { passive: true });

    // Initial update
    updateParallax();
  }
});

// Add CSS animations via style tag
// const style = document.createElement('style');
// style.textContent = `
//     /* Fade in animation */
//     .scroll-fade-in {
//         opacity: 0;
//         transition: opacity 0.6s ease-out, transform 0.6s ease-out;
//     }
//
//     .scroll-fade-in.animated {
//         opacity: 1;
//         transform: translateY(0);
//     }

//     /* Slide up animation */
//     .scroll-slide-up {
//         opacity: 0;
//         transform: translateY(30px);
//         transition: opacity 0.8s ease-out, transform 0.8s ease-out;
//     }
//
//     .scroll-slide-up.animated {
//         opacity: 1;
//         transform: translateY(0);
//     }

//     /* Slide left animation */
//     .scroll-slide-left {
//         opacity: 0;
//         transform: translateX(-50px);
//         transition: opacity 0.8s ease-out, transform 0.8s ease-out;
//     }
//
//     .scroll-slide-left.animated {
//         opacity: 1;
//         transform: translateX(0);
//     }

//     /* Slide right animation */
//     .scroll-slide-right {
//         opacity: 0;
//         transform: translateX(50px);
//         transition: opacity 0.8s ease-out, transform 0.8s ease-out;
//     }
//
//     .scroll-slide-right.animated {
//         opacity: 1;
//         transform: translateX(0);
//     }
// `;
// document.head.appendChild(style);

