// ====================================
// MEHZ STUDIO - MAIN JAVASCRIPT
// Modern Architectural Portfolio
// ====================================

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    
    // ====================================
    // PRELOADER
    // ====================================
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('hidden');
        }, 1000);
    }

    // ====================================
    // CUSTOM CURSOR (Desktop only)
    // ====================================
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');

    if (cursor && follower && window.innerWidth > 768) {
        document.addEventListener('mousemove', function(e) {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            
            follower.style.left = e.clientX + 'px';
            follower.style.top = e.clientY + 'px';
        });

        // Hover effect on links
        const links = document.querySelectorAll('a, button');
        links.forEach(link => {
            link.addEventListener('mouseenter', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
                follower.style.transform = 'translate(-50%, -50%) scale(1.2)';
                follower.style.borderColor = 'var(--color-clay-light)';
            });
            
            link.addEventListener('mouseleave', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                follower.style.transform = 'translate(-50%, -50%) scale(1)';
                follower.style.borderColor = 'var(--color-clay)';
            });
        });
    }

    // ====================================
    // NAVIGATION SCROLL EFFECT
    // ====================================
    const navbar = document.querySelector('.navbar');
    
    function updateNavbar() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', updateNavbar);
    updateNavbar(); // Initial check

    // ====================================
    // MOBILE MENU TOGGLE
    // ====================================
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger
            this.classList.toggle('active');
            const spans = this.querySelectorAll('span');
            if (this.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
                spans[1].style.transform = 'rotate(-45deg) translate(6px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.transform = 'none';
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target) && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                const spans = navToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.transform = 'none';
            }
        });
    }

    // ====================================
    // PROJECT FILTER
    // ====================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');

    if (filterButtons.length && projectItems.length) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Update active state
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                
                // Filter projects
                projectItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.classList.remove('hide');
                    } else {
                        item.classList.add('hide');
                    }
                });
            });
        });
    }

    // ====================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ====================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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

    // ====================================
    // REVEAL ANIMATIONS ON SCROLL
    // ====================================
    const revealElements = document.querySelectorAll('.reveal');
    
    function checkReveal() {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('active');
            }
        });
    }
    
    // Add reveal class to elements
    document.querySelectorAll('.project-item, .stat-item, .about-grid').forEach(el => {
        el.classList.add('reveal');
    });
    
    window.addEventListener('scroll', checkReveal);
    window.addEventListener('load', checkReveal);
    checkReveal(); // Initial check

    // ====================================
    // PARALLAX EFFECT FOR HERO
    // ====================================
    const heroImage = document.querySelector('.hero-img');
    
    if (heroImage) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;
            heroImage.style.transform = `scale(1.1) translateY(${scrollPosition * 0.2}px)`;
        });
    }

    // ====================================
    // PROJECT PAGE - IMAGE GALLERY LIGHTBOX
    // ====================================
    const galleryItems = document.querySelectorAll('.gallery-item img');
    
    if (galleryItems.length) {
        galleryItems.forEach(img => {
            img.addEventListener('click', function() {
                // Create lightbox
                const lightbox = document.createElement('div');
                lightbox.classList.add('lightbox');
                lightbox.style.cssText = `
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0,0,0,0.95);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 9999;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                    cursor: pointer;
                `;
                
                const lightboxImg = document.createElement('img');
                lightboxImg.src = this.src;
                lightboxImg.style.cssText = `
                    max-width: 90%;
                    max-height: 90%;
                    object-fit: contain;
                `;
                
                lightbox.appendChild(lightboxImg);
                document.body.appendChild(lightbox);
                
                // Fade in
                setTimeout(() => {
                    lightbox.style.opacity = '1';
                }, 10);
                
                // Close on click
                lightbox.addEventListener('click', function() {
                    lightbox.style.opacity = '0';
                    setTimeout(() => {
                        document.body.removeChild(lightbox);
                    }, 300);
                });
            });
        });
    }

    // ====================================
    // DYNAMIC YEAR IN FOOTER
    // ====================================
    const footerYear = document.querySelector('.footer-bottom p:first-child');
    if (footerYear) {
        const currentYear = new Date().getFullYear();
        footerYear.innerHTML = `© ${currentYear} Mehz Studio. All rights reserved.`;
    }
});

// ====================================
// PROJECT DETAIL PAGE - SPECIFIC
// ====================================
// Add this to individual project pages for image sliders if needed
function initProjectSlider() {
    // Optional: Add simple image slider for project galleries
}