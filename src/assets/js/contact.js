/**
 * Contact Page JavaScript
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

  // FAQ Interactive functionality
  const faqItems = document.querySelectorAll('.faq-item');
  const faqAnswer = document.querySelector('.faq-answer-content');

  if (faqItems.length > 0 && faqAnswer) {
    // Function to update answer with animation
    function updateAnswer(item) {
      // Remove active from all items
      faqItems.forEach(i => i.classList.remove('active'));

      // Add active to clicked item
      item.classList.add('active');

      // Get the answer content
      const answerText = item.getAttribute('data-answer');
      const answerTitle = item.querySelector('.faq-item-title').textContent;

      // Remove show class for animation
      faqAnswer.classList.remove('show-answer');

      // Wait for fade out
      setTimeout(() => {
        // Update content
        faqAnswer.querySelector('.faq-answer-title').textContent = answerTitle;
        faqAnswer.querySelector('.faq-answer-text').textContent = answerText;

        // Trigger animation
        setTimeout(() => {
          faqAnswer.classList.add('show-answer');
        }, 50);
      }, 300);
    }

    faqItems.forEach((item, index) => {
      item.addEventListener('click', function () {
        updateAnswer(this);
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

  // Location card hover effects
  // const locationCards = document.querySelectorAll('.location-card');
  // locationCards.forEach(card => {
  //   card.addEventListener('mouseenter', function () {
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

//     /* FAQ Item Styles */
//     .faq-item {
//         cursor: pointer;
//         transition: all 0.3s ease;
//         position: relative;
//     }

//     .faq-item:hover {
//         transform: translateX(8px);
//         background: #FFF9F2;
//     }

//     .faq-item.active {
//         background: #FFF9F2;
//         border-left: 4px solid #a5834a;
//     }

//     .faq-item.active .faq-item-title {
//         color: #a5834a;
//     }

//     .faq-item.active .faq-icon-wrapper {
//         background: linear-gradient(to bottom right, #FFF9F2, #a5834a/20);
//         border: 2px solid #a5834a/30;
//     }

//     /* FAQ Answer Styles */
//     .faq-answer-content {
//         transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
//         opacity: 0;
//         transform: translateY(30px) scale(0.95);
//         position: relative;
//     }
//
//     .faq-answer-content.show-answer {
//         opacity: 1;
//         transform: translateY(0) scale(1);
//     }
//
//     /* Animated border for FAQ Answer */
//     .faq-answer-content::before {
//         content: '';
//         position: absolute;
//         top: -2px;
//         left: -2px;
//         right: -2px;
//         bottom: -2px;
//         border-radius: 24px;
//         background: linear-gradient(90deg, #a5834a 0%, #a5834a 100%);
//         z-index: -1;
//         opacity: 0.1;
//     }
//
//     .faq-answer-content::after {
//         content: '';
//         position: absolute;
//         top: -2px;
//         left: -2px;
//         right: -2px;
//         bottom: -2px;
//         border-radius: 24px;
//         background: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.8) 50%, transparent 100%);
//         background-size: 200% 100%;
//         z-index: 1;
//         pointer-events: none;
//         animation: borderShimmer 3s linear infinite;
//         opacity: 0;
//         transition: opacity 0.3s;
//     }
//
//     .faq-answer-content.show-answer::after {
//         opacity: 1;
//     }
//
//     @keyframes borderShimmer {
//         0% {
//             background-position: -200% 0;
//         }
//         100% {
//             background-position: 200% 0;
//         }
//     }
//
//     /* FAQ Decorative Line Animation */
//     .faq-decorative-line {
//         position: relative;
//         overflow: visible;
//     }
//
//     .faq-decorative-line::before {
//         content: '';
//         position: absolute;
//         top: 0;
//         left: -100%;
//         width: 100%;
//         height: 100%;
//         background: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.9) 50%, transparent 100%);
//         animation: lineShimmer 2s linear infinite;
//     }
//
//     .faq-decorative-line::after {
//         content: '';
//         position: absolute;
//         top: 0;
//         left: 0;
//         right: 0;
//         height: 100%;
//         background: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.6) 30%, rgba(255, 255, 255, 0.9) 50%, rgba(255, 255, 255, 0.6) 70%, transparent 100%);
//         animation: lineGlow 3s ease-in-out infinite;
//     }
//
//     @keyframes lineShimmer {
//         0% {
//             left: -100%;
//         }
//         100% {
//             left: 100%;
//         }
//     }
//
//     @keyframes lineGlow {
//         0%, 100% {
//             opacity: 0;
//             transform: scaleX(0);
//         }
//         50% {
//             opacity: 1;
//             transform: scaleX(1);
//         }
//     }
//
//     /* FAQ Answer Animation for text */
//     .faq-answer-content.show-answer .faq-answer-text {
//         animation: fadeInUp 0.6s ease-out 0.3s both;
//     }
//
//     .faq-answer-content.show-answer .faq-answer-title {
//         animation: fadeInUp 0.5s ease-out 0.1s both;
//     }
//
//     @keyframes fadeInUp {
//         from {
//             opacity: 0;
//             transform: translateY(15px);
//         }
//         to {
//             opacity: 1;
//             transform: translateY(0);
//         }
//     }
//
//     /* Decorative pulse for active FAQ */
//     .faq-item.active .faq-icon-wrapper {
//         animation: pulseIcon 2s ease-in-out infinite;
//     }
//
//     @keyframes pulseIcon {
//         0%, 100% {
//             transform: scale(1);
//             box-shadow: 0 0 0 0 rgba(165, 131, 74, 0.4);
//         }
//         50% {
//             transform: scale(1.05);
//             box-shadow: 0 0 0 8px rgba(165, 131, 74, 0);
//         }
//     }
// `;
// document.head.appendChild(style);

