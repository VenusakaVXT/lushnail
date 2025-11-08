/**
 * About Us Page JavaScript
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

  // Location card hover effects
  // const locationCards = document.querySelectorAll('.location-card');
  // locationCards.forEach(card => {
  //   card.addEventListener('mouseenter', function () {
  //     // Add pulse effect to map pin icon
  //     const icon = this.querySelector('i[data-lucide="map-pin"]');
  //     if (icon) {
  //       icon.style.animation = 'pulse 1s ease-in-out infinite';
  //     }
  //   });

  //   card.addEventListener('mouseleave', function () {
  //     const icon = this.querySelector('i[data-lucide="map-pin"]');
  //     if (icon) {
  //       icon.style.animation = 'none';
  //     }
  //   });

  //   // Click to highlight on map (placeholder functionality)
  //   card.addEventListener('click', function () {
  //     locationCards.forEach(c => c.classList.remove('active'));
  //     this.classList.add('active');
  //   });
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

  // About Transition Section Parallax Animation
  const transitionSection = document.querySelector('[data-name="about-transition-section"]');
  if (transitionSection) {
    const bottleImages = transitionSection.querySelectorAll('.bottle-collection-image');
    const glitterStreaks = transitionSection.querySelectorAll('.glitter-streak');

    // Store original transforms for glitter streaks
    glitterStreaks.forEach((streak) => {
      const originalTransform = streak.style.transform || '';
      if (originalTransform) {
        streak.setAttribute('data-original-transform', originalTransform);
      }
    });

    let ticking = false;

    function updateParallax() {
      if (!transitionSection || bottleImages.length === 0) return;

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

      // Parallax effect for all bottle images - each with different speed
      bottleImages.forEach((bottleImage, index) => {
        const speed = 0.8 + (index * 0.15);
        const parallaxY = scrollProgress * 100 * speed;
        const scale = 1 - scrollProgress * 0.1;
        const opacity = 1 - scrollProgress * 0.3;

        bottleImage.style.transform = `translateY(${parallaxY}px) scale(${scale})`;
        bottleImage.style.opacity = Math.max(0.7, opacity);
      });

      // Parallax effect for glitter streaks - move at different speeds
      glitterStreaks.forEach((streak, index) => {
        const speed = 0.3 + (index * 0.1);
        const glitterY = scrollProgress * 60 * speed;
        const glitterRotate = scrollProgress * 5 * (index % 2 === 0 ? 1 : -1);

        // Get original transform from stored value
        const baseTransform = streak.getAttribute('data-original-transform') || '';

        // Combine original transform with parallax
        streak.style.transform = `${baseTransform} translateY(${glitterY}px) rotate(${glitterRotate}deg)`;
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

//     /* Pulse animation for location pins */
//     @keyframes pulse {
//         0%, 100% {
//             transform: scale(1);
//         }
//         50% {
//             transform: scale(1.1);
//         }
//     }

//     /* Active location card */
//     .location-card.active {
//         border-color: #a5834a !important;
//         background: #FFF9F2;
//     }
// `;
// document.head.appendChild(style);

