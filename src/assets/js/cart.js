/**
 * Cart Page JavaScript
 * Handles sticky bar, load more (show/hide), and cart interactions
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

  // Get elements
  const cartItemsList = document.getElementById('cart-items-list');
  const stickyBar = document.getElementById('cart-sticky-bar');
  const relatedProductsSection = document.querySelector('[data-name="related-products"]');

  if (!cartItemsList || !stickyBar) return;

  // Get all cart items
  const allCartItems = Array.from(cartItemsList.querySelectorAll('.cart-item'));

  // Hide related products section initially
  if (relatedProductsSection) {
    relatedProductsSection.style.display = 'none';
  }

  // Update cart totals
  function updateCartTotals() {
    const visibleItems = cartItemsList.querySelectorAll('.cart-item');
    let subtotal = 0;
    let discount = 0;
    let totalItems = 0;

    visibleItems.forEach(item => {
      const priceText = item.querySelector('.cart-item-price')?.textContent.trim();
      if (!priceText) return;
      const price = parseFloat(priceText.replace('$', ''));
      const quantityInput = item.querySelector('.cart-item-quantity-input');
      const quantity = quantityInput ? parseInt(quantityInput.value) || 1 : 1;
      const oldPriceText = item.querySelector('.cart-item-price-old')?.textContent.trim();

      totalItems += quantity;

      if (oldPriceText) {
        const oldPrice = parseFloat(oldPriceText.replace('$', ''));
        discount += (oldPrice - price) * quantity;
      }

      subtotal += price * quantity;
    });

    const total = subtotal - discount;

    // Update sticky bar
    const stickyTotalItems = document.getElementById('sticky-total-items');
    const stickyProductCount = document.getElementById('sticky-product-count');
    const stickyTotal = document.getElementById('sticky-total');

    if (stickyTotalItems) {
      stickyTotalItems.textContent = totalItems;
    }
    if (stickyProductCount) {
      stickyProductCount.textContent = `(${totalItems} sản phẩm):`;
    }
    if (stickyTotal) {
      stickyTotal.textContent = `$${total.toFixed(0)}`;
    }
  }

  // Handle scroll for sticky bar
  let lastScrollTop = 0;
  let stickyBarState = 'fixed'; // 'fixed', 'not-sticky'

  function handleScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    // Get the last cart item
    const lastCartItem = allCartItems.length > 0 ? allCartItems[allCartItems.length - 1] : null;

    if (lastCartItem) {
      const lastCartItemRect = lastCartItem.getBoundingClientRect();
      // If last cart item is above viewport (scrolled past it)
      if (lastCartItemRect.bottom < windowHeight) {
        // Check if related products section is visible
        if (relatedProductsSection && relatedProductsSection.style.display !== 'none') {
          const relatedProductsRect = relatedProductsSection.getBoundingClientRect();
          // If related products is in viewport, make sticky bar not sticky
          if (relatedProductsRect.top < windowHeight + 100) {
            if (stickyBarState !== 'not-sticky') {
              stickyBar.classList.remove('visible');
              stickyBar.classList.add('not-sticky');
              stickyBarState = 'not-sticky';
            }
            return;
          }
        }
      }
    }

    // Sticky bar should be fixed (visible) by default and when scrolling
    if (stickyBarState !== 'fixed') {
      stickyBar.classList.add('visible');
      stickyBar.classList.remove('not-sticky');
      stickyBarState = 'fixed';
    }

    // Show related products when scrolled to end of cart items
    if (relatedProductsSection && relatedProductsSection.style.display === 'none') {
      const cartContentSection = document.querySelector('[data-name="cart-content"]');
      if (cartContentSection) {
        const cartContentRect = cartContentSection.getBoundingClientRect();
        // If cart content section bottom is above viewport, show related products
        if (cartContentRect.bottom < windowHeight + 200) {
          relatedProductsSection.style.display = 'block';
        }
      }
    }

    lastScrollTop = scrollTop;
  }

  // Throttle scroll event for sticky bar to prevent flickering
  let scrollTimeout;
  let isScrolling = false;

  window.addEventListener('scroll', function () {
    if (!isScrolling) {
      window.requestAnimationFrame(function () {
        handleScroll();
        isScrolling = false;
      });
      isScrolling = true;
    }

    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
    }
    scrollTimeout = setTimeout(handleScroll, 50);
  }, { passive: true });

  // Initial setup - sticky bar visible by default
  stickyBar.classList.add('visible');
  handleScroll();

  // Quantity controls
  function setupQuantityControls() {
    cartItemsList.addEventListener('click', function (e) {
      const item = e.target.closest('.cart-item');
      if (!item) return;

      const input = item.querySelector('.cart-item-quantity-input');
      if (!input) return;

      let quantity = parseInt(input.value) || 1;

      if (e.target.closest('.increase')) {
        quantity = Math.min(quantity + 1, 99);
        input.value = quantity;
        updateCartTotals();
      } else if (e.target.closest('.decrease')) {
        quantity = Math.max(quantity - 1, 1);
        input.value = quantity;
        updateCartTotals();
      } else if (e.target.closest('.cart-item-remove')) {
        item.remove();
        updateCartTotals();
      }
    });

    // Handle manual input
    cartItemsList.addEventListener('input', function (e) {
      if (e.target.classList.contains('cart-item-quantity-input')) {
        let value = parseInt(e.target.value) || 1;
        value = Math.max(1, Math.min(99, value));
        e.target.value = value;
        updateCartTotals();
      }
    });
  }

  // Sticky bar actions
  const stickySelectAll = document.getElementById('sticky-select-all');
  const stickyDeleteBtn = document.getElementById('sticky-delete-btn');
  const stickyCheckoutBtn = document.getElementById('sticky-checkout-btn');

  // Function to update "Select All" checkbox state
  function updateSelectAllState() {
    if (!stickySelectAll) return;
    const visibleItems = cartItemsList.querySelectorAll('.cart-item');
    const allCheckboxes = Array.from(visibleItems).map(item => item.querySelector('.cart-item-checkbox'));
    const checkedCheckboxes = allCheckboxes.filter(cb => cb && cb.checked);

    if (allCheckboxes.length === 0) {
      stickySelectAll.checked = false;
      stickySelectAll.indeterminate = false;
    } else if (checkedCheckboxes.length === allCheckboxes.length) {
      stickySelectAll.checked = true;
      stickySelectAll.indeterminate = false;
    } else {
      stickySelectAll.checked = false;
      stickySelectAll.indeterminate = false;
    }
  }

  if (stickySelectAll) {
    stickySelectAll.addEventListener('change', function () {
      const visibleItems = cartItemsList.querySelectorAll('.cart-item');
      visibleItems.forEach(item => {
        const checkbox = item.querySelector('.cart-item-checkbox');
        if (checkbox) {
          checkbox.checked = stickySelectAll.checked;
        }
      });
      updateCartTotals();
    });
  }

  // Add event listeners to individual cart item checkboxes
  function setupCartItemCheckboxes() {
    cartItemsList.addEventListener('change', function (e) {
      if (e.target.classList.contains('cart-item-checkbox')) {
        updateSelectAllState();
        updateCartTotals();
      }
    });
  }

  if (stickyDeleteBtn) {
    stickyDeleteBtn.addEventListener('click', function () {
      const visibleItems = cartItemsList.querySelectorAll('.cart-item');
      visibleItems.forEach(item => {
        const checkbox = item.querySelector('.cart-item-checkbox');
        if (checkbox && checkbox.checked) {
          item.remove();
        }
      });
      updateSelectAllState();
      updateCartTotals();
    });
  }

  if (stickyCheckoutBtn) {
    stickyCheckoutBtn.addEventListener('click', function () {
      window.location.href = 'payment.html';
    });
  }

  // Initialize
  setupQuantityControls();
  setupCartItemCheckboxes();
  updateCartTotals();

  // Scroll Animation Observer for related products
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

