/**
 * Home.js - Homepage JavaScript Logic
 * Slider initialization is handled in sliders.js
 */

document.addEventListener('DOMContentLoaded', function () {
    initContactForm();
    initScrollAnimations();
    initMostPopularNailGallery();
});

function initScrollAnimations() {
    // Scroll Animation Observer for statistical items
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all statistical items
    const statisticalItems = document.querySelectorAll('.statistical-item');
    statisticalItems.forEach(item => {
        observer.observe(item);
    });
}

function initMostPopularNailGallery() {
    const gallery = document.querySelector('.most-popular-nail-gallery');
    if (!gallery) return;

    const items = gallery.querySelectorAll('.nail-image-item');
    
    items.forEach(item => {
        item.addEventListener('mouseenter', function() {
            // Remove active from all items
            items.forEach(i => i.classList.remove('active'));
            // Add active to hovered item
            this.classList.add('active');
        });
    });

    // Reset to first item when mouse leaves gallery
    gallery.addEventListener('mouseleave', function() {
        items.forEach(i => i.classList.remove('active'));
        items[0].classList.add('active');
    });
}

function initContactForm() {
    // Contact form (if exists)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);

            console.log('Form data:', data);

            fetch(contactForm.action || window.location.href, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            }).then(response => {
                if (response.ok) {
                    alert('Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất có thể.');
                    contactForm.reset();
                } else {
                    alert('Có lỗi xảy ra. Vui lòng thử lại sau.');
                }
            }).catch(error => {
                console.error('Error:', error);
                alert('Có lỗi xảy ra. Vui lòng thử lại sau.');
            });
        });
    }

    // Course registration form
    const courseForm = document.getElementById('course-registration-form');
    if (courseForm) {
        courseForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const formData = new FormData(courseForm);
            const data = Object.fromEntries(formData);

            console.log('Course registration data:', data);

            // Show success notification if FastNotice is available
            if (window.fastNotice) {
                window.fastNotice.success('Cảm ơn bạn đã đăng ký khóa học! Chúng tôi sẽ liên hệ với bạn sớm nhất có thể.');
            } else {
                alert('Cảm ơn bạn đã đăng ký khóa học! Chúng tôi sẽ liên hệ với bạn sớm nhất có thể.');
            }

            courseForm.reset();
        });
    }
}