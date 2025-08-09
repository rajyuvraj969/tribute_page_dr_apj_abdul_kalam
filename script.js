// Quotes Carousel Functionality
const quotes = [
    "Dream, dream, dream. Dreams transform into thoughts and thoughts result in action.",
    "You have to dream before your dreams can come true.",
    "Excellence is a continuous process and not an accident.",
    "Let us sacrifice our today so that our children can have a better tomorrow.",
    "If you want to shine like a sun, first burn like a sun.",
    "Great dreams of great dreamers are always transcended."
];

let currentQuoteIndex = 0;
let quoteInterval;

// Function to show a specific quote
function showQuote(index) {
    currentQuoteIndex = index;
    const quoteText = document.getElementById('quote-text');
    const dots = document.querySelectorAll('.dot');
    
    // Update quote text with fade effect
    quoteText.style.opacity = '0';
    setTimeout(() => {
        quoteText.textContent = `"${quotes[currentQuoteIndex]}"`;
        quoteText.style.opacity = '1';
    }, 200);
    
    // Update active dot
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentQuoteIndex);
    });
    
    // Reset interval
    clearInterval(quoteInterval);
    startQuoteCarousel();
}

// Function to show next quote
function nextQuote() {
    currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
    showQuote(currentQuoteIndex);
}

// Function to start automatic carousel
function startQuoteCarousel() {
    quoteInterval = setInterval(nextQuote, 4000);
}

// Smooth scrolling for anchor links
function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Intersection Observer for animations
function createObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll(
        '.stat-item, .bio-item, .achievement-card, .timeline-item, .legacy-item'
    );
    
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// Add CSS for animations
function addAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .stat-item,
        .bio-item,
        .achievement-card,
        .timeline-item,
        .legacy-item {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease;
        }
        
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        
        .quote-text {
            transition: opacity 0.3s ease;
        }
        
        /* Stagger animation delays */
        .stat-item:nth-child(1) { transition-delay: 0.1s; }
        .stat-item:nth-child(2) { transition-delay: 0.2s; }
        .stat-item:nth-child(3) { transition-delay: 0.3s; }
        .stat-item:nth-child(4) { transition-delay: 0.4s; }
        
        .achievement-card:nth-child(1) { transition-delay: 0.1s; }
        .achievement-card:nth-child(2) { transition-delay: 0.2s; }
        .achievement-card:nth-child(3) { transition-delay: 0.3s; }
        .achievement-card:nth-child(4) { transition-delay: 0.4s; }
        .achievement-card:nth-child(5) { transition-delay: 0.5s; }
        .achievement-card:nth-child(6) { transition-delay: 0.6s; }
    `;
    document.head.appendChild(style);
}

// Counter animation for stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = counter.textContent;
                
                // Only animate numbers, not text like "Millions"
                if (!isNaN(parseInt(target))) {
                    const targetNum = parseInt(target.replace('+', ''));
                    let current = 0;
                    const increment = targetNum / 50;
                    
                    const updateCounter = () => {
                        if (current < targetNum) {
                            current += increment;
                            counter.textContent = Math.ceil(current) + (target.includes('+') ? '+' : '');
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.textContent = target;
                        }
                    };
                    
                    updateCounter();
                }
                
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
}

// Parallax effect for hero section
function addParallaxEffect() {
    const hero = document.querySelector('.hero');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (hero) {
            hero.style.transform = `translateY(${rate}px)`;
        }
    });
}

// Add loading animation
function addLoadingAnimation() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    window.addEventListener('load', () => {
        document.body.style.opacity = '1';
    });
}

// Button click handlers
function addButtonHandlers() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Add ripple effect
            const ripple = document.createElement('span');
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            button.style.position = 'relative';
            button.style.overflow = 'hidden';
            button.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
    
    // Add ripple animation CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Start quote carousel
    startQuoteCarousel();
    
    // Add animation styles
    addAnimationStyles();
    
    // Create intersection observer for animations
    createObserver();
    
    // Animate counters
    animateCounters();
    
    // Add parallax effect
    addParallaxEffect();
    
    // Add loading animation
    addLoadingAnimation();
    
    // Add button handlers
    addButtonHandlers();
    
    // Add smooth scrolling to all internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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
});

// Handle window resize
window.addEventListener('resize', () => {
    // Recalculate any position-dependent elements
    clearInterval(quoteInterval);
    startQuoteCarousel();
});

// Add keyboard navigation for quotes
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        const prevIndex = currentQuoteIndex === 0 ? quotes.length - 1 : currentQuoteIndex - 1;
        showQuote(prevIndex);
    } else if (e.key === 'ArrowRight') {
        const nextIndex = (currentQuoteIndex + 1) % quotes.length;
        showQuote(nextIndex);
    }
});

// Pause carousel on hover
document.querySelector('.quote-card')?.addEventListener('mouseenter', () => {
    clearInterval(quoteInterval);
});

document.querySelector('.quote-card')?.addEventListener('mouseleave', () => {
    startQuoteCarousel();
});