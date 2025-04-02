import { gsap } from 'gsap';

document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation toggle
    setupMobileNav();
    
    // Project carousel
    setupProjectCarousel();
    
    // Contact form
    setupContactForm();
    
    // Animations
    setupAnimations();
});

function setupMobileNav() {
    const burger = document.querySelector('.burger-menu');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    const body = document.querySelector('body');
    
    if (burger) {
        burger.addEventListener('click', () => {
            // Toggle nav
            nav.classList.toggle('active');
            
            // Animate links
            navLinks.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });
            
            // Burger animation
            burger.classList.toggle('toggle');
            
            // Prevent body scroll when menu is open
            if (nav.classList.contains('active')) {
                body.style.overflow = 'hidden';
            } else {
                body.style.overflow = 'auto';
            }
        });
        
        // Close mobile menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    burger.classList.remove('toggle');
                    body.style.overflow = 'auto';
                    
                    navLinks.forEach(link => {
                        link.style.animation = '';
                    });
                }
            });
        });
    }
}

function setupProjectCarousel() {
    const carousels = document.querySelectorAll('.project-carousel');
    
    carousels.forEach(carousel => {
        const slides = carousel.querySelectorAll('.carousel-slide');
        const dots = carousel.querySelectorAll('.dot');
        const prevBtn = carousel.querySelector('.carousel-prev');
        const nextBtn = carousel.querySelector('.carousel-next');
        
        if (slides.length > 0) {
            let currentSlide = 0;
            
            // Function to show a specific slide
            function showSlide(n) {
                // Remove active class from all slides and dots
                slides.forEach(slide => slide.classList.remove('active'));
                dots.forEach(dot => dot.classList.remove('active'));
                
                // Update current slide index
                currentSlide = (n + slides.length) % slides.length;
                
                // Add active class to current slide and dot
                slides[currentSlide].classList.add('active');
                dots[currentSlide].classList.add('active');
            }
            
            // Event listeners for prev/next buttons
            if (prevBtn) {
                prevBtn.addEventListener('click', () => {
                    showSlide(currentSlide - 1);
                });
            }
            
            if (nextBtn) {
                nextBtn.addEventListener('click', () => {
                    showSlide(currentSlide + 1);
                });
            }
            
            // Event listeners for dot indicators
            dots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    showSlide(index);
                });
            });
        }
    });
}

function setupContactForm() {
    const contactForm = document.getElementById('contact-form');
    const formSuccess = document.getElementById('form-success');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Validate the captcha (simple example, would need more security in production)
            const captchaValue = document.getElementById('captcha').value.trim().toUpperCase();
            if (captchaValue !== 'A7X3') {
                alert('Code de vérification incorrect. Veuillez réessayer.');
                return;
            }
            
            // Simulate form submission
            contactForm.style.display = 'none';
            formSuccess.style.display = 'block';
            
            // Scroll to form success message
            formSuccess.scrollIntoView({ behavior: 'smooth' });
        });
    }
}

function setupAnimations() {
    // Animate elements as they come into view
    const animElements = document.querySelectorAll('.project-card, .skill-card, .skill-item, .certification-card, .availability-type');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    animElements.forEach(element => {
        observer.observe(element);
    });
    
    // GSAP animations for hero section
    if (document.querySelector('.hero-content')) {
        gsap.from('.hero-content h1', { 
            opacity: 0, 
            y: 50, 
            duration: 1, 
            ease: 'power3.out' 
        });
        
        gsap.from('.hero-content p', { 
            opacity: 0, 
            y: 30, 
            duration: 1, 
            delay: 0.3, 
            ease: 'power3.out' 
        });
        
        gsap.from('.hero-content .cta-button', { 
            opacity: 0, 
            y: 30, 
            duration: 1, 
            delay: 0.6, 
            ease: 'power3.out' 
        });
        
        gsap.from('.hero-illustration', { 
            opacity: 0, 
            scale: 0.8, 
            duration: 1.2, 
            delay: 0.3, 
            ease: 'back.out(1.7)' 
        });
    }
    
    // Animate skill bars
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(item => {
        const progress = item.querySelector('.skill-progress');
        
        gsap.from(progress, {
            scrollTrigger: {
                trigger: item,
                start: "top 80%",
            },
            width: 0,
            duration: 1.5,
            ease: "power3.out"
        });
    });
    
    // Header scroll effect
    const header = document.querySelector('header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop) {
            // Scrolling down
            header.style.transform = `translateY(-${header.offsetHeight}px)`;
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        
        if (scrollTop === 0) {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
        } else {
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
        
        lastScrollTop = scrollTop;
    });
}