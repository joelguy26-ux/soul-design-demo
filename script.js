// Enhanced JavaScript for Souls Media Group website with lazy loading

document.addEventListener('DOMContentLoaded', function() {
    console.log('Souls Media Group website loaded successfully');
    
    // Update copyright year
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    
    // Enhanced Lazy Loading with Intersection Observer
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    
                    // Add loading class for smooth transition
                    img.classList.add('loading');
                    
                    // Load the image
                    img.src = img.src;
                    
                    // Remove loading class when image loads
                    img.addEventListener('load', () => {
                        img.classList.remove('loading');
                        img.classList.add('loaded');
                    });
                    
                    // Stop observing this image
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px', // Start loading 50px before image enters viewport
            threshold: 0.01
        });
        
        // Observe all lazy images
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback for older browsers
        lazyImages.forEach(img => {
            img.src = img.src;
        });
    }
    
    // Portfolio hover effects with enhanced animations
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px) scale(1.02)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Smooth scrolling for navigation (simplified)
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                // Use native smooth scrolling
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Prevent scroll jumping on mobile
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        lastScrollTop = scrollTop;
    }, { passive: true });
    
    // Slideshow functionality
    initializeSlideshows();
    
    // Services slideshow functionality
    initializeServicesSlideshow();

    // Glass radio group functionality
    initializeGlassRadioGroup();

    // Performance monitoring
    if ('performance' in window) {
        window.addEventListener('load', () => {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            console.log(`Page loaded in ${loadTime}ms`);
        });
    }
});

// Global slideshow functionality
function initializeSlideshows() {
    const slideshows = document.querySelectorAll('.slideshow-container');
    
    slideshows.forEach((slideshow, index) => {
        const slides = slideshow.querySelectorAll('.slide');
        const dots = slideshow.querySelectorAll('.slide-dots .dot');
        const prevBtn = slideshow.querySelector('.slide-prev');
        const nextBtn = slideshow.querySelector('.slide-next');
        
        let currentSlide = 0;
        const totalSlides = slides.length;
        
        // Auto-play functionality
        setInterval(() => {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateSlide(slideshow, currentSlide);
        }, 5000); // Change slide every 5 seconds
        
        // Dot navigation
        dots.forEach((dot, dotIndex) => {
            dot.addEventListener('click', () => {
                currentSlide = dotIndex;
                updateSlide(slideshow, currentSlide);
            });
        });
        
        // Arrow navigation
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
                updateSlide(slideshow, currentSlide);
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                currentSlide = (currentSlide + 1) % totalSlides;
                updateSlide(slideshow, currentSlide);
            });
        }
    });
}

function updateSlide(slideshow, slideIndex) {
    const slides = slideshow.querySelectorAll('.slide');
    const dots = slideshow.querySelectorAll('.slide-dots .dot');
    
    // Hide all slides
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Show current slide
    if (slides[slideIndex]) {
        slides[slideIndex].classList.add('active');
    }
    if (dots[slideIndex]) {
        dots[slideIndex].classList.add('active');
    }
}

// Global function for arrow navigation
function changeSlide(sectionId, direction) {
    const section = document.getElementById(sectionId);
    const slideshow = section.querySelector('.slideshow-container');
    const slides = slideshow.querySelectorAll('.slide');
    const dots = slideshow.querySelectorAll('.slide-dots .dot');
    
    let currentSlide = 0;
    dots.forEach((dot, index) => {
        if (dot.classList.contains('active')) {
            currentSlide = index;
        }
    });
    
    const totalSlides = slides.length;
    currentSlide = (currentSlide + direction + totalSlides) % totalSlides;
    updateSlide(slideshow, currentSlide);
}

// Services slideshow functionality
function initializeServicesSlideshow() {
    const servicesSlideshow = document.querySelector('.services-slideshow');
    if (!servicesSlideshow) return;
    
    const slides = servicesSlideshow.querySelectorAll('.service-slide');
    const navButtons = servicesSlideshow.querySelectorAll('.service-nav-btn');
    
    let currentSlideIndex = 0;
    const totalSlides = slides.length;
    
    // Auto-play functionality
    setInterval(() => {
        currentSlideIndex = (currentSlideIndex + 1) % totalSlides;
        updateServicesSlide(currentSlideIndex);
    }, 4000); // Change slide every 4 seconds
    
    // Navigation button functionality
    navButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            currentSlideIndex = index;
            updateServicesSlide(currentSlideIndex);
        });
    });
}

function updateServicesSlide(slideIndex) {
    const servicesSlideshow = document.querySelector('.services-slideshow');
    if (!servicesSlideshow) return;
    
    const slides = servicesSlideshow.querySelectorAll('.service-slide');
    const navButtons = servicesSlideshow.querySelectorAll('.service-nav-btn');
    
    // Hide all slides
    slides.forEach(slide => slide.classList.remove('active'));
    navButtons.forEach(button => button.classList.remove('active'));
    
    // Show current slide
    if (slides[slideIndex]) {
        slides[slideIndex].classList.add('active');
    }
    if (navButtons[slideIndex]) {
        navButtons[slideIndex].classList.add('active');
    }
}

// Global Theme Management
function applyTheme(theme) {
    // Remove all theme classes from body
    document.body.classList.remove('theme-marketing', 'theme-photography', 'theme-videography');
    
    // Add the appropriate theme class
    if (theme === 'marketing') {
        document.body.classList.add('theme-marketing');
    } else if (theme === 'photography') {
        document.body.classList.add('theme-photography');
    } else if (theme === 'videography') {
        document.body.classList.add('theme-videography');
    }
    
    // Store theme in localStorage
    localStorage.setItem('soulsMediaTheme', theme);
}

// Initialize theme on page load (for all pages)
function initializeTheme() {
    // Get saved theme from localStorage or default to marketing
    const savedTheme = localStorage.getItem('soulsMediaTheme') || 'marketing';
    applyTheme(savedTheme);
}

// Glass Radio Group Functionality
function initializeGlassRadioGroup() {
    const interactiveHero = document.getElementById('interactive-hero');
    const radioButtons = document.querySelectorAll('input[name="glass-radio"]');
    
    if (!interactiveHero || !radioButtons.length) {
        return; // Page doesn't have radio group, but theme is already applied
    }
    
    function updateHeroColor(selectedId) {
        // Remove all color classes from hero sections
        interactiveHero.classList.remove('hero-marketing', 'hero-photography', 'hero-videography');
        
        // Determine theme based on selection
        let theme = 'marketing';
        if (selectedId.includes('marketing')) {
            theme = 'marketing';
            interactiveHero.classList.add('hero-marketing');
        } else if (selectedId.includes('photography')) {
            theme = 'photography';
            interactiveHero.classList.add('hero-photography');
        } else if (selectedId.includes('videography')) {
            theme = 'videography';
            interactiveHero.classList.add('hero-videography');
        }
        
        // Apply theme globally
        applyTheme(theme);
    }
    
    // Get saved theme and select the appropriate radio button
    const savedTheme = localStorage.getItem('soulsMediaTheme') || 'marketing';
    const radioToSelect = document.getElementById(`glass-${savedTheme}`);
    if (radioToSelect) {
        radioToSelect.checked = true;
        updateHeroColor(radioToSelect.id);
    }
    
    // Radio group event listeners
    radioButtons.forEach(radio => {
        radio.addEventListener('change', function() {
            updateHeroColor(this.id);
        });
    });
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Initialize theme first (applies to all pages)
    initializeTheme();
    
    // Focus buttons in navigation (new design) with two-way sync
    const focusButtons = document.querySelectorAll('.focus-btn');
    const glassRadios = {
        'marketing': document.getElementById('glass-marketing'),
        'photography': document.getElementById('glass-photography'),
        'videography': document.getElementById('glass-videography')
    };
    
    if (focusButtons.length > 0) {
        // Focus button click handler
        focusButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons
                focusButtons.forEach(b => b.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Get theme from data attribute
                const theme = this.getAttribute('data-theme');
                
                // Apply theme
                applyTheme(theme);
                
                // Sync with glass radio group in hero section
                if (glassRadios[theme]) {
                    glassRadios[theme].checked = true;
                    
                    // Trigger change event to update glider position
                    const event = new Event('change', { bubbles: true });
                    glassRadios[theme].dispatchEvent(event);
                    
                    // Add sync animation
                    const glassRadioGroup = document.querySelector('.glass-radio-group');
                    if (glassRadioGroup) {
                        glassRadioGroup.classList.add('syncing');
                        setTimeout(() => glassRadioGroup.classList.remove('syncing'), 400);
                    }
                    
                    // Optional: Smooth scroll to hero section to show the sync
                    const heroSection = document.getElementById('interactive-hero');
                    if (heroSection && window.scrollY < 100) {
                        heroSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }
            });
        });
        
        // Set initial active state based on current theme
        const currentTheme = localStorage.getItem('soulsMediaTheme') || 'marketing';
        focusButtons.forEach(btn => {
            if (btn.getAttribute('data-theme') === currentTheme) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }
    
    // Glass radio buttons - sync back to focus buttons
    Object.keys(glassRadios).forEach(theme => {
        const radio = glassRadios[theme];
        if (radio) {
            radio.addEventListener('change', function() {
                if (this.checked) {
                    // Apply theme
                    applyTheme(theme);
                    
                    // Update focus buttons in nav with animation
                    focusButtons.forEach(btn => {
                        if (btn.getAttribute('data-theme') === theme) {
                            btn.classList.add('active');
                            btn.classList.add('syncing');
                            setTimeout(() => btn.classList.remove('syncing'), 400);
                        } else {
                            btn.classList.remove('active');
                        }
                    });
                }
            });
        }
    });
    
    // Sidebar Navigation - Tab always visible, hover to reveal
    const sidebarTab = document.getElementById('sidebarTab');
    const pagesSidebar = document.getElementById('pagesSidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    
    if (sidebarTab && pagesSidebar && sidebarOverlay) {
        let sidebarTimeout;
        
        // Open sidebar on hover over tab
        sidebarTab.addEventListener('mouseenter', function() {
            clearTimeout(sidebarTimeout);
            pagesSidebar.classList.add('open');
            sidebarTab.classList.add('active');
            sidebarOverlay.classList.add('show');
        });
        
        // Keep sidebar open when hovering over it
        pagesSidebar.addEventListener('mouseenter', function() {
            clearTimeout(sidebarTimeout);
            pagesSidebar.classList.add('open');
            sidebarTab.classList.add('active');
            sidebarOverlay.classList.add('show');
        });
        
        // Close sidebar with delay when mouse leaves tab
        sidebarTab.addEventListener('mouseleave', function(e) {
            if (!pagesSidebar.contains(e.relatedTarget)) {
                sidebarTimeout = setTimeout(() => {
                    pagesSidebar.classList.remove('open');
                    sidebarTab.classList.remove('active');
                    sidebarOverlay.classList.remove('show');
                }, 300);
            }
        });
        
        // Close sidebar with delay when mouse leaves sidebar
        pagesSidebar.addEventListener('mouseleave', function() {
            sidebarTimeout = setTimeout(() => {
                pagesSidebar.classList.remove('open');
                sidebarTab.classList.remove('active');
                sidebarOverlay.classList.remove('show');
            }, 300);
        });
        
        // Toggle sidebar on tab click (for touch devices)
        sidebarTab.addEventListener('click', function() {
            pagesSidebar.classList.toggle('open');
            sidebarTab.classList.toggle('active');
            sidebarOverlay.classList.toggle('show');
        });
        
        // Close sidebar when clicking overlay
        sidebarOverlay.addEventListener('click', function() {
            pagesSidebar.classList.remove('open');
            sidebarTab.classList.remove('active');
            sidebarOverlay.classList.remove('show');
        });
        
        // Close sidebar on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && pagesSidebar.classList.contains('open')) {
                pagesSidebar.classList.remove('open');
                sidebarTab.classList.remove('active');
                sidebarOverlay.classList.remove('show');
            }
        });
        
        // Highlight active page in sidebar
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const pageLinks = pagesSidebar.querySelectorAll('.page-link');
        pageLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPage || (currentPage === '' && href === 'index.html')) {
                link.classList.add('active');
            }
        });
    }
    
    // Initialize other features
    initializeSlideshows();
    initializeServicesSlideshow();
    initializeGlassRadioGroup();
});