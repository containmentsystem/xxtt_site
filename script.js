// Mobile Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', function() {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 20;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all work items
document.querySelectorAll('.work-item').forEach(item => {
    observer.observe(item);
});

// Video background optimization
document.addEventListener('DOMContentLoaded', function() {
    const heroVideo = document.querySelector('.hero-video');
    
    if (heroVideo) {
        // Ensure video plays properly
        heroVideo.muted = true;
        heroVideo.playsInline = true;
        
        // Handle video load errors
        heroVideo.addEventListener('error', function(e) {
            console.warn('Video failed to load:', e);
            // Fallback: hide video and show gradient background
            const heroSection = document.querySelector('.hero');
            if (heroSection) {
                heroSection.style.background = 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)';
            }
        });
        
        // Optimize video playback
        heroVideo.addEventListener('loadeddata', function() {
            // Video is loaded and ready to play
            heroVideo.play().catch(function(error) {
                console.warn('Autoplay prevented:', error);
                // This is normal on some browsers/devices
            });
        });
        
        // Pause video when not visible (performance optimization)
        const videoObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    heroVideo.play().catch(e => console.warn('Video play failed:', e));
                } else {
                    heroVideo.pause();
                }
            });
        });
        
        videoObserver.observe(heroVideo);
    }
});

// Preload images for better performance (excluding removed hero image)
const imageUrls = [
    //image pathing here
];

function preloadImages() {
    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

// Start preloading after page load
window.addEventListener('load', preloadImages);

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Add focus management for accessibility
const focusableElements = 'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])';

function trapFocus(element) {
    const focusableContent = element.querySelectorAll(focusableElements);
    const firstFocusable = focusableContent[0];
    const lastFocusable = focusableContent[focusableContent.length - 1];

    element.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstFocusable) {
                    lastFocusable.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastFocusable) {
                    firstFocusable.focus();
                    e.preventDefault();
                }
            }
        }
    });
}

// Apply focus trapping to mobile menu when it's active
navToggle.addEventListener('click', function() {
    if (navMenu.classList.contains('active')) {
        trapFocus(navMenu);
    }
});

// Handle reduced motion preferences for video
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const heroVideo = document.querySelector('.hero-video');
    if (heroVideo) {
        heroVideo.style.animationPlayState = 'paused';
    }
}
