// ===========================================
// STICKY HEADER & MOBILE MENU LOGIC
// ===========================================
document.addEventListener("DOMContentLoaded", () => {
    // Get header elements
    const header = document.querySelector("header[data-name='Nav']");
    const headerWrapper = header ? header.querySelector(".header-wrapper") : header;
    const logo = header ? header.querySelector("[data-name='Asset 1 1']") : null;
    const desktopNav = document.getElementById("main-navbar");
    const mobileNav = document.getElementById("mobile-navbar");
    const mobileMenuToggle = document.getElementById("mobile-menu-toggle");

    if (!header) return;

    // Get topbar element to calculate its height
    const topbar = header.querySelector(".header-topbar");
    const topbarHeight = topbar ? topbar.offsetHeight : 0;

    // Set trigger point - when topbar is scrolled past
    const triggerPoint = topbarHeight;

    // Apply sticky to navbar with blur background (desktop)
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
                "nav-bg-white"
            );
        } else {
            // Remove all classes
            el.classList.remove("fixed");
            el.classList.remove("top-0");
            el.classList.remove("left-0");
            el.classList.remove("right-0");
            el.classList.remove("z-[100]");
            el.classList.remove("shadow-md");
            el.classList.remove("nav-bg-white");
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
                "nav-bg-white"
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
            mobileNav.classList.remove("nav-bg-white");
            mobileNav.classList.add("relative");
        }
    };

    // Listen to scroll event to apply sticky for desktop & mobile navbar only
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

    // Calculate and set header height for drawer positioning
    const updateHeaderHeight = () => {
        if (header) {
            const headerHeight = header.offsetHeight;
            document.documentElement.style.setProperty('--header-height', `${headerHeight}px`);
        }
    };

    // Update header height on load and resize
    updateHeaderHeight();
    window.addEventListener('resize', updateHeaderHeight);

    // Function to get icon elements (works with lucide-replaced elements)
    const getIconElements = () => {
        const menuIcon = document.getElementById("menu-icon");
        const closeIcon = document.getElementById("close-icon");
        return { menuIcon, closeIcon };
    };

    // Function to toggle menu icons
    const toggleMenuIcons = (isOpen) => {
        const { menuIcon, closeIcon } = getIconElements();

        if (menuIcon && closeIcon) {
            if (isOpen) {
                // Hide menu icon, show close icon
                menuIcon.classList.add("hidden");
                closeIcon.classList.remove("hidden");
                // Reinitialize lucide icons if needed
                if (typeof lucide !== 'undefined') {
                    setTimeout(() => {
                        lucide.createIcons({ root: closeIcon.closest('#mobile-menu-toggle') });
                    }, 50);
                }
            } else {
                // Show menu icon, hide close icon
                menuIcon.classList.remove("hidden");
                closeIcon.classList.add("hidden");
                // Reinitialize lucide icons if needed
                if (typeof lucide !== 'undefined') {
                    setTimeout(() => {
                        lucide.createIcons({ root: menuIcon.closest('#mobile-menu-toggle') });
                    }, 50);
                }
            }
        }
    };

    // Initialize icon state - ensure menu icon is visible, close icon is hidden
    const initializeIcons = () => {
        // Wait for lucide to initialize, then ensure correct state
        setTimeout(() => {
            const { menuIcon, closeIcon } = getIconElements();
            if (menuIcon && closeIcon) {
                // Ensure initial state: menu visible, close hidden
                menuIcon.classList.remove("hidden");
                closeIcon.classList.add("hidden");
            }
        }, 300);
    };

    // Initialize icons after page loads
    initializeIcons();

    // Function to open drawer
    const openDrawer = () => {
        if (mobileDrawer) {
            updateHeaderHeight(); // Update height before opening
            mobileDrawer.classList.add("active");
            document.body.style.overflow = "hidden"; // Prevent body scroll
            toggleMenuIcons(true);
        }
    };

    // Function to close drawer
    const closeDrawer = () => {
        if (mobileDrawer) {
            mobileDrawer.classList.remove("active");
            document.body.style.overflow = ""; // Restore body scroll
            toggleMenuIcons(false);
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

    // Handle logout button in drawer
    const logoutBtnDrawer = document.getElementById("logout-btn-drawer");
    if (logoutBtnDrawer) {
        logoutBtnDrawer.addEventListener("click", (e) => {
            e.stopPropagation();
            // Add your logout logic here
            // For example: window.location.href = '/logout.html';
            closeDrawer();
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
                        opt.classList.remove("bg-[#FFF9F2]");
                    });
                    option.classList.add("bg-[#FFF9F2]");

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
                option.classList.add("bg-[#FFF9F2]");
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
                        opt.classList.remove("bg-[#FFF9F2]");
                    });
                    option.classList.add("bg-[#FFF9F2]");

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
                option.classList.add("bg-[#FFF9F2]");
            }
        });
    }

    // Language Switcher Logic for Topbar
    const languageToggleTopbar = document.getElementById("language-toggle-topbar");
    const languageDropdownTopbar = document.getElementById("language-dropdown-topbar");
    const languageOptionsTopbar = languageDropdownTopbar ? languageDropdownTopbar.querySelectorAll(".language-option") : [];
    const languageContainerTopbar = languageToggleTopbar?.closest('.relative');

    if (languageToggleTopbar && languageDropdownTopbar) {
        // Show dropdown on hover
        if (languageContainerTopbar) {
            let hoverTimeoutTopbar;

            const showDropdownTopbar = () => {
                clearTimeout(hoverTimeoutTopbar);
                languageDropdownTopbar.style.display = "block";
                languageDropdownTopbar.classList.remove("hidden");
            };

            const hideDropdownTopbar = () => {
                hoverTimeoutTopbar = setTimeout(() => {
                    languageDropdownTopbar.style.display = "none";
                    languageDropdownTopbar.classList.add("hidden");
                }, 100);
            };

            languageContainerTopbar.addEventListener("mouseenter", showDropdownTopbar);
            languageContainerTopbar.addEventListener("mouseleave", hideDropdownTopbar);

            // Keep dropdown open when hovering over it
            languageDropdownTopbar.addEventListener("mouseenter", showDropdownTopbar);
            languageDropdownTopbar.addEventListener("mouseleave", hideDropdownTopbar);
        }

        // Handle language selection for topbar
        languageOptionsTopbar.forEach(option => {
            option.addEventListener("click", (e) => {
                e.preventDefault();
                e.stopPropagation();
                const selectedLang = option.getAttribute("data-lang");

                if (selectedLang) {
                    localStorage.setItem("language", selectedLang);

                    // Update active state
                    languageOptionsTopbar.forEach(opt => {
                        opt.classList.remove("bg-[#FFF9F2]");
                    });
                    option.classList.add("bg-[#FFF9F2]");

                    // Close dropdown
                    languageDropdownTopbar.style.display = "none";
                    languageDropdownTopbar.classList.add("hidden");

                    // Reload page to apply language changes
                    window.location.reload();
                }
            });
        });

        // Highlight current language on load for topbar
        const currentLangTopbar = localStorage.getItem("language") || "vi";
        languageOptionsTopbar.forEach(option => {
            if (option.getAttribute("data-lang") === currentLangTopbar) {
                option.classList.add("bg-[#FFF9F2]");
            }
        });
    }

    // Search Dropdown Logic
    const searchToggle = document.getElementById("search-toggle");
    const searchDropdown = document.getElementById("search-dropdown");
    const searchInput = document.getElementById("search-input");
    const searchContainer = searchToggle?.closest('.relative');

    if (searchToggle && searchDropdown) {
        // Toggle dropdown on click
        searchToggle.addEventListener("click", (e) => {
            e.stopPropagation();
            if (searchDropdown.style.display === "block") {
                searchDropdown.style.display = "none";
            } else {
                searchDropdown.style.display = "block";
                // Focus input when dropdown opens
                if (searchInput) {
                    setTimeout(() => searchInput.focus(), 100);
                }
            }
        });

        // Close dropdown when clicking outside
        document.addEventListener("click", (e) => {
            if (searchContainer && !searchContainer.contains(e.target)) {
                searchDropdown.style.display = "none";
            }
        });

        // Prevent dropdown from closing when clicking inside it
        searchDropdown.addEventListener("click", (e) => {
            e.stopPropagation();
        });

        // Handle search input enter key
        if (searchInput) {
            searchInput.addEventListener("keydown", (e) => {
                if (e.key === "Enter") {
                    const query = searchInput.value.trim();
                    if (query) {
                        // Redirect to search page or perform search
                        window.location.href = `/products.html?search=${encodeURIComponent(query)}`;
                    }
                }
            });
        }
    }
});



