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

// Glass Radio Group Functionality
function initializeGlassRadioGroup() {
    const interactiveHero = document.getElementById('interactive-hero');
    const radioButtons = document.querySelectorAll('input[name="glass-radio"]');
    
    if (!interactiveHero || !radioButtons.length) return;
    
    function updateHeroColor(selectedId) {
        // Remove all color classes
        interactiveHero.classList.remove('hero-marketing', 'hero-photography', 'hero-videography');
        
        // Add the appropriate color class based on selection
        if (selectedId.includes('marketing')) {
            interactiveHero.classList.add('hero-marketing');
        } else if (selectedId.includes('photography')) {
            interactiveHero.classList.add('hero-photography');
        } else if (selectedId.includes('videography')) {
            interactiveHero.classList.add('hero-videography');
        }
    }
    
    // Radio group event listeners
    radioButtons.forEach(radio => {
        radio.addEventListener('change', function() {
            updateHeroColor(this.id);
        });
    });
    
    // Set initial state
    interactiveHero.classList.add('hero-marketing');
}