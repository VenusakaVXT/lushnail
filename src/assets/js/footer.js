/**
 * Footer Form Overlap Handler
 * Automatically adds padding-bottom to the last section/div in main
 * to prevent the registration form from overlapping content
 */
(function () {
  'use strict';

  function addPaddingToLastSection() {
    // Find main element
    const mainElement = document.querySelector('main');

    if (!mainElement) {
      console.warn('Footer.js: Main element not found');
      return;
    }

    // Get all direct children of main that are div or section elements
    const children = Array.from(mainElement.children);
    const sectionsAndDivs = children.filter(child =>
      child.tagName === 'DIV' || child.tagName === 'SECTION'
    );

    if (sectionsAndDivs.length === 0) {
      console.warn('Footer.js: No div or section elements found in main');
      return;
    }

    // Get the last section/div
    const lastSection = sectionsAndDivs[sectionsAndDivs.length - 1];

    // Check if registration form exists (to only apply padding when needed)
    const registrationForm = document.getElementById('register-course-form');

    if (!registrationForm) {
      // Form doesn't exist, no need to add padding
      return;
    }

    // Add padding-bottom with responsive values
    // Using inline style to ensure it takes precedence
    let paddingValue = '300px'; // Default for mobile

    if (window.innerWidth >= 640) {
      paddingValue = '350px'; // sm breakpoint
    }
    if (window.innerWidth >= 768) {
      paddingValue = '400px'; // md breakpoint
    }
    if (window.innerWidth >= 1024) {
      paddingValue = '450px'; // lg breakpoint
    }

    lastSection.style.paddingBottom = paddingValue;

    // Also add a class for easier CSS override if needed
    lastSection.classList.add('has-footer-form-overlap');
  }

  // Run on DOM ready
  document.addEventListener('DOMContentLoaded', function () {
    addPaddingToLastSection();
  });

  // Also run on window load in case content is loaded dynamically
  window.addEventListener('load', function () {
    addPaddingToLastSection();
  });

  // Handle resize to adjust padding if needed
  let resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      addPaddingToLastSection();
    }, 250);
  });
})();

