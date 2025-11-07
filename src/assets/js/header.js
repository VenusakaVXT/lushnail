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
            // Remove all classes
            el.classList.remove("fixed");
            el.classList.remove("top-0");
            el.classList.remove("left-0");
            el.classList.remove("right-0");
            el.classList.remove("z-[100]");
            el.classList.remove("shadow-md");
            el.classList.remove("nav-bg-blur");
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
            // Remove all classes
            mobileNav.classList.remove("fixed");
            mobileNav.classList.remove("top-0");
            mobileNav.classList.remove("left-0");
            mobileNav.classList.remove("right-0");
            mobileNav.classList.remove("z-[100]");
            mobileNav.classList.remove("shadow-md");
            mobileNav.classList.remove("nav-bg-blur");
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

    // Language Switcher Logic
    const languageToggle = document.getElementById("language-toggle");
    const languageDropdown = document.getElementById("language-dropdown");
    const languageOptions = document.querySelectorAll(".language-option");
    const languageContainer = languageToggle?.closest('.relative');

    if (languageToggle && languageDropdown) {
        // Function to position dropdown
        const positionDropdown = () => {
            if (!languageDropdown.classList.contains("hidden")) {
                const toggleRect = languageToggle.getBoundingClientRect();
                languageDropdown.style.top = `${toggleRect.bottom + window.scrollY + 8}px`;
                languageDropdown.style.right = `${window.innerWidth - toggleRect.right}px`;
            }
        };

        // Show dropdown on hover
        if (languageContainer) {
            let hoverTimeout;
            
            const showDropdown = () => {
                clearTimeout(hoverTimeout);
                languageDropdown.classList.remove("hidden");
                positionDropdown();
            };

            const hideDropdown = () => {
                hoverTimeout = setTimeout(() => {
                    languageDropdown.classList.add("hidden");
                }, 100);
            };

            languageContainer.addEventListener("mouseenter", showDropdown);
            languageContainer.addEventListener("mouseleave", hideDropdown);
            
            // Keep dropdown open when hovering over it
            languageDropdown.addEventListener("mouseenter", showDropdown);
            languageDropdown.addEventListener("mouseleave", hideDropdown);
        }
        
        // Reposition on scroll and resize
        window.addEventListener("scroll", positionDropdown);
        window.addEventListener("resize", positionDropdown);

        // Handle language selection
        languageOptions.forEach(option => {
            option.addEventListener("click", (e) => {
                e.preventDefault();
                e.stopPropagation();
                const selectedLang = option.getAttribute("data-lang");
                
                if (selectedLang) {
                    localStorage.setItem("language", selectedLang);
                    
                    // Update active state
                    languageOptions.forEach(opt => {
                        opt.classList.remove("bg-[#FFF9F2]", "font-semibold");
                    });
                    option.classList.add("bg-[#FFF9F2]", "font-semibold");
                    
                    // Close dropdown
                    languageDropdown.classList.add("hidden");
                    
                    // Reload page to apply language changes
                    window.location.reload();
                }
            });
        });

        // Highlight current language on load
        const currentLang = localStorage.getItem("language") || "vi";
        languageOptions.forEach(option => {
            if (option.getAttribute("data-lang") === currentLang) {
                option.classList.add("bg-[#FFF9F2]", "font-semibold");
            }
        });
    }

    // Language Switcher Logic for Mobile
    const languageToggleMobile = document.getElementById("language-toggle-mobile");
    const languageDropdownMobile = document.getElementById("language-dropdown-mobile");
    const languageOptionsMobile = languageDropdownMobile ? languageDropdownMobile.querySelectorAll(".language-option") : [];
    const languageContainerMobile = languageToggleMobile?.closest('.relative');

    if (languageToggleMobile && languageDropdownMobile) {
        // Show dropdown on hover
        if (languageContainerMobile) {
            let hoverTimeoutMobile;
            
            const showDropdownMobile = () => {
                clearTimeout(hoverTimeoutMobile);
                languageDropdownMobile.style.display = "block";
            };

            const hideDropdownMobile = () => {
                hoverTimeoutMobile = setTimeout(() => {
                    languageDropdownMobile.style.display = "none";
                }, 100);
            };

            languageContainerMobile.addEventListener("mouseenter", showDropdownMobile);
            languageContainerMobile.addEventListener("mouseleave", hideDropdownMobile);
            
            // Keep dropdown open when hovering over it
            languageDropdownMobile.addEventListener("mouseenter", showDropdownMobile);
            languageDropdownMobile.addEventListener("mouseleave", hideDropdownMobile);
        }

        // Handle language selection for mobile
        languageOptionsMobile.forEach(option => {
            option.addEventListener("click", (e) => {
                e.preventDefault();
                e.stopPropagation();
                const selectedLang = option.getAttribute("data-lang");
                
                if (selectedLang) {
                    localStorage.setItem("language", selectedLang);
                    
                    // Update active state
                    languageOptionsMobile.forEach(opt => {
                        opt.classList.remove("bg-[#FFF9F2]", "font-semibold");
                    });
                    option.classList.add("bg-[#FFF9F2]", "font-semibold");
                    
                    // Close dropdown
                    languageDropdownMobile.style.display = "none";
                    
                    // Reload page to apply language changes
                    window.location.reload();
                }
            });
        });

        // Highlight current language on load for mobile
        const currentLangMobile = localStorage.getItem("language") || "vi";
        languageOptionsMobile.forEach(option => {
            if (option.getAttribute("data-lang") === currentLangMobile) {
                option.classList.add("bg-[#FFF9F2]", "font-semibold");
            }
        });
    }
});

