// GSAP Animations
gsap.registerPlugin(ScrollTrigger);


// Scroll animations
function initScrollAnimations() {
    // Work cards animation
    gsap.utils.toArray('.work-card').forEach(card => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: "top bottom-=100",
                toggleActions: "play none none reverse"
            },
            y: 100,
            opacity: 0,
            duration: 1
        });
    });
    
    // Service cards animation
    gsap.utils.toArray('.service-card').forEach(card => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: "top bottom-=100",
                toggleActions: "play none none reverse"
            },
            y: 50,
            opacity: 0,
            duration: 1
        });
    });
}

// Magnetic button effect
function initMagneticButtons() {
    const buttons = document.querySelectorAll('.magnetic');
    
    buttons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            gsap.to(button, {
                duration: 0.3,
                x: x * 0.2,
                y: y * 0.2,
                ease: "power2.out"
            });
        });
        
        button.addEventListener('mouseleave', () => {
            gsap.to(button, {
                duration: 0.3,
                x: 0,
                y: 0,
                ease: "power2.out"
            });
        });
    });
}

// Particle effect for buttons
function initParticleEffect() {
    document.querySelectorAll('.primary-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const particle = document.createElement('div');
            particle.className = 'btn-particle';
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            
            button.appendChild(particle);
            
            setTimeout(() => particle.remove(), 1000);
        });
    });
}

// Text split animation
function initTextSplit() {
    const splitText = document.querySelectorAll('.split-text');
    
    splitText.forEach(text => {
        const words = text.textContent.split(' ');
        text.textContent = '';
        
        words.forEach(word => {
            const span = document.createElement('span');
            span.className = 'word';
            span.textContent = word + ' ';
            text.appendChild(span);
        });
    });
}

// Initialize all animations
document.addEventListener('DOMContentLoaded', () => {
    initHeroAnimations();
    initScrollAnimations();
    initMagneticButtons();
    initParticleEffect();
    initTextSplit();
});

// Smooth scroll animation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            gsap.to(window, {
                duration: 1,
                scrollTo: {
                    y: target,
                    offsetY: 80
                },
                ease: "power4.inOut"
            });
        }
    });
});

// Counter Animation for Stats
function initCounterAnimation() {
    const stats = document.querySelectorAll('.stat-number');
    
    stats.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        let current = 0;
        const increment = target / 50; // Adjust speed here
        
        const updateCount = () => {
            if (current < target) {
                current += increment;
                stat.textContent = Math.round(current);
                requestAnimationFrame(updateCount);
            } else {
                stat.textContent = target;
            }
        };
        
        // Start animation when element is in view
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                updateCount();
                observer.disconnect();
            }
        });
        
        observer.observe(stat);
    });
}

// Initialize counter animation
document.addEventListener('DOMContentLoaded', () => {
    initCounterAnimation();
});

