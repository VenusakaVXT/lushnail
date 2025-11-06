// ===========================================
// STICKY HEADER & MOBILE MENU LOGIC
// ===========================================
document.addEventListener("DOMContentLoaded", () => {
    // Get header elements
    const header = document.querySelector("header[data-name='Nav']");
    const logo = header ? header.querySelector("[data-name='Asset 1 1']") : null;
    const desktopNav = document.getElementById("main-navbar");
    const mobileNav = document.getElementById("mobile-navbar");
    const mobileMenuToggle = document.getElementById("mobile-menu-toggle");

    if (!header || !logo) return;

    // Calculate initial trigger point - when logo bottom is scrolled past
    const getInitialTriggerPoint = () => {
        const logoRect = logo.getBoundingClientRect();
        const scrollY = window.scrollY || window.pageYOffset;
        return scrollY + logoRect.bottom;
    };

    // Store initial trigger point
    let triggerPoint = getInitialTriggerPoint();

    // Recalculate trigger point on window resize
    const recalculateTriggerPoint = () => {
        triggerPoint = getInitialTriggerPoint();
    };

    window.addEventListener("resize", recalculateTriggerPoint);

    // Apply sticky to navbar with blur background
    const applySticky = (el) => {
        if (!el) return;

        if (window.scrollY > triggerPoint) {
            el.classList.add(
                "fixed",
                "top-0",
                "left-0",
                "right-0",
                "z-[100]",
                "shadow-md",
                "nav-bg-blur"
            );
        } else {
            el.classList.remove(
                "fixed",
                "top-0",
                "left-0",
                "right-0",
                "z-[100]",
                "shadow-md",
                "nav-bg-blur"
            );
        }
    };

    // Apply sticky to mobile navbar with relative class handling
    const applyMobileSticky = () => {
        if (!mobileNav) return;

        if (window.scrollY > triggerPoint) {
            mobileNav.classList.add(
                "fixed",
                "top-0",
                "left-0",
                "right-0",
                "z-[100]",
                "shadow-md",
                "nav-bg-blur"
            );
            mobileNav.classList.remove("relative");
        } else {
            mobileNav.classList.remove(
                "fixed",
                "top-0",
                "left-0",
                "right-0",
                "z-[100]",
                "shadow-md",
                "nav-bg-blur"
            );
            mobileNav.classList.add("relative");
        }
    };

    // Listen to scroll event to apply sticky for both desktop & mobile
    const handleScroll = () => {
        applySticky(desktopNav);
        applyMobileSticky();
    };

    // Use throttled scroll for better performance
    let ticking = false;
    window.addEventListener("scroll", () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    });

    // Apply on initial load to ensure correct state
    handleScroll();

    // Mobile Drawer Logic
    const mobileDrawer = document.getElementById("mobile-drawer");
    const mobileDrawerOverlay = document.getElementById("mobile-drawer-overlay");
    const mobileDrawerClose = document.getElementById("mobile-drawer-close");

    // Function to open drawer
    const openDrawer = () => {
        if (mobileDrawer) {
            mobileDrawer.classList.add("active");
            document.body.style.overflow = "hidden"; // Prevent body scroll
        }
    };

    // Function to close drawer
    const closeDrawer = () => {
        if (mobileDrawer) {
            mobileDrawer.classList.remove("active");
            document.body.style.overflow = ""; // Restore body scroll
        }
    };

    // Toggle drawer on menu button click
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener("click", (e) => {
            e.stopPropagation();
            if (mobileDrawer && mobileDrawer.classList.contains("active")) {
                closeDrawer();
            } else {
                openDrawer();
            }
        });
    }

    // Close drawer on close button click
    if (mobileDrawerClose) {
        mobileDrawerClose.addEventListener("click", (e) => {
            e.stopPropagation();
            closeDrawer();
        });
    }

    // Close drawer on overlay click
    if (mobileDrawerOverlay) {
        mobileDrawerOverlay.addEventListener("click", (e) => {
            e.stopPropagation();
            closeDrawer();
        });
    }

    // Close drawer when clicking on drawer links
    if (mobileDrawer) {
        const drawerLinks = mobileDrawer.querySelectorAll(".header-mobile-drawer-link");
        drawerLinks.forEach(link => {
            link.addEventListener("click", () => {
                closeDrawer();
            });
        });
    }

    // Prevent drawer content click from closing drawer
    if (mobileDrawer) {
        const drawerContent = mobileDrawer.querySelector(".header-mobile-drawer-content");
        if (drawerContent) {
            drawerContent.addEventListener("click", (e) => {
                e.stopPropagation();
            });
        }
    }
});

