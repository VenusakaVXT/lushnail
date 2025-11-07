/**
 * Home.js - Homepage JavaScript Logic
 * Slider initialization is handled in sliders.js
 */

document.addEventListener('DOMContentLoaded', function () {
    initContactForm();
    initRegisterCourseScroll();
    initCourseCardRegisterButtons();
});

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

function initRegisterCourseScroll() {
    const registerBtn = document.getElementById('register-course-btn');
    const registerFormSection = document.getElementById('register-course-form');

    if (!registerBtn || !registerFormSection) return;

    registerBtn.addEventListener('click', function (e) {
        e.preventDefault();

        registerFormSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
}

function initCourseCardRegisterButtons() {
    const courseRegisterButtons = document.querySelectorAll('.course-register-btn');
    const registerFormSection = document.getElementById('register-course-form');

    if (!courseRegisterButtons.length || !registerFormSection) return;

    courseRegisterButtons.forEach(function (button) {
        button.addEventListener('click', function (e) {
            e.preventDefault();

            registerFormSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });
}
