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

  // Observe all elements with scroll animation classes
  const animatedElements = document.querySelectorAll('.scroll-fade-in, .scroll-slide-up, .scroll-slide-left, .scroll-slide-right');
  animatedElements.forEach(el => {
    observer.observe(el);
  });

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

  // Hero Section Scroll Buttons
  const heroScrollButtons = document.querySelectorAll('.hero-scroll-btn[data-scroll-to]');
  heroScrollButtons.forEach(button => {
    button.addEventListener('click', function (e) {
      e.preventDefault();
      const targetSectionName = this.getAttribute('data-scroll-to');
      const targetSection = document.querySelector(`section[data-name="${targetSectionName}"], [data-name="${targetSectionName}"]`);

      if (targetSection) {
        const offset = 80; // Offset for fixed header if any
        const elementPosition = targetSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      } else {
        console.warn(`Section with data-name="${targetSectionName}" not found`);
      }
    });
  });

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
const style = document.createElement('style');
style.textContent = `
    /* Fade in animation */
    .scroll-fade-in {
        opacity: 0;
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }
    
    .scroll-fade-in.animated {
        opacity: 1;
        transform: translateY(0);
    }

    /* Slide up animation */
    .scroll-slide-up {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.8s ease-out, transform 0.8s ease-out;
    }
    
    .scroll-slide-up.animated {
        opacity: 1;
        transform: translateY(0);
    }

    /* Slide left animation */
    .scroll-slide-left {
        opacity: 0;
        transform: translateX(-50px);
        transition: opacity 0.8s ease-out, transform 0.8s ease-out;
    }
    
    .scroll-slide-left.animated {
        opacity: 1;
        transform: translateX(0);
    }

    /* Slide right animation */
    .scroll-slide-right {
        opacity: 0;
        transform: translateX(50px);
        transition: opacity 0.8s ease-out, transform 0.8s ease-out;
    }
    
    .scroll-slide-right.animated {
        opacity: 1;
        transform: translateX(0);
    }
`;
document.head.appendChild(style);

