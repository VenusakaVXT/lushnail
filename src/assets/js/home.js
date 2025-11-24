/**
 * Home.js - Homepage JavaScript Logic
 * Slider initialization is handled in sliders.js
 */

document.addEventListener('DOMContentLoaded', function () {
    initContactForm();
    initScrollAnimations();
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

function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        console.log('Form data:', data);

        fetch(form.action || window.location.href, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }).then(response => {
            if (response.ok) {
                alert('Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất có thể.');
                form.reset();
            } else {
                alert('Có lỗi xảy ra. Vui lòng thử lại sau.');
            }
        }).catch(error => {
            console.error('Error:', error);
            alert('Có lỗi xảy ra. Vui lòng thử lại sau.');
        });
    });
}