// Modern Tire Recycling Website - JavaScript
// Smooth scrolling and animations

document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = document.querySelector('.nav').offsetHeight;
                const targetPosition = target.offsetTop - navHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar background on scroll
    const nav = document.querySelector('.nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        } else {
            nav.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
        }
    });

    // Animate stats counter
    const animateCounter = (element, target) => {
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target + (target === 100 ? '%' : target === 30 ? '%' : '%');
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + (element.textContent.includes('%') ? '%' : '');
            }
        }, 30);
    };

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all cards and sections
    document.querySelectorAll('.card, .product-card, .benefit, .spec, .revenue-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

    // Add loading class to body
    document.body.classList.add('loaded');

    // Gallery tabs functionality
    const galleryTabs = document.querySelectorAll('.gallery-tab');
    galleryTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            galleryTabs.forEach(t => t.classList.remove('gallery-tab--active'));
            // Add active class to clicked tab
            tab.classList.add('gallery-tab--active');
            
            // Hide all galleries
            document.querySelectorAll('.gallery').forEach(g => g.style.display = 'none');
            
            // Show selected gallery
            const galleryId = 'gallery-' + tab.dataset.gallery;
            document.getElementById(galleryId).style.display = 'block';
        });
    });
});
