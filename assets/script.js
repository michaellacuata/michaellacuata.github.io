document.addEventListener('DOMContentLoaded', () => {
    
    // ============================================
    // MODERN NAVIGATION INTERACTIONS
    // ============================================
    
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li');
    const body = document.body;

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (navLinks.classList.contains('active')) {
                body.style.overflow = 'hidden';
            } else {
                body.style.overflow = '';
            }
        });
    }

    // Close mobile menu when a link is clicked
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            if (hamburger) {
                hamburger.classList.remove('active');
            }
            body.style.overflow = '';
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navLinks.classList.contains('active') && 
            !e.target.closest('.nav-links') && 
            !e.target.closest('.hamburger')) {
            navLinks.classList.remove('active');
            if (hamburger) {
                hamburger.classList.remove('active');
            }
            body.style.overflow = '';
        }
    });

    // ============================================
    // GLASSMORPHISM NAVBAR ON SCROLL
    // ============================================
    
    const navbar = document.querySelector('.navbar');
    const navIndicator = document.querySelector('.nav-indicator');
    
    window.addEventListener('scroll', () => {
        // Add scrolled class for glassmorphism effect
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Update progress indicator
        if (navIndicator) {
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (window.scrollY / windowHeight) * 100;
            navIndicator.style.width = scrolled + '%';
        }
    });

    // ============================================
    // SMOOTH SCROLL WITH OFFSET FOR FIXED NAVBAR
    // ============================================
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================================
    // ACTIVE LINK HIGHLIGHTING ON SCROLL
    // ============================================
    
    const sections = document.querySelectorAll('section[id]');
    const navLinksArray = document.querySelectorAll('.nav-link');
    
    function highlightNavigation() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinksArray.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavigation);

    // ============================================
    // PROJECT IMAGE DYNAMIC SCROLL
    // ============================================
    
    const projectImages = document.querySelectorAll('.project-image');
    
    projectImages.forEach(container => {
        const img = container.querySelector('img');
        
        if (img.complete) {
            calculateAndSetHoverScroll(container, img);
        } else {
            img.addEventListener('load', () => {
                calculateAndSetHoverScroll(container, img);
            });
        }
    });
    
    function calculateAndSetHoverScroll(container, img) {
        const containerHeight = container.offsetHeight;
        const imageHeight = img.offsetHeight;
        const scrollDistance = imageHeight - containerHeight;
        
        if (scrollDistance > 0) {
            container.addEventListener('mouseenter', () => {
                img.style.top = `-${scrollDistance}px`;
            });
            
            container.addEventListener('mouseleave', () => {
                img.style.top = '0px';
            });
        }
    }

    // ============================================
    // PROJECT DETAILS MODAL
    // ============================================
    
    const detailsButtons = document.querySelectorAll('.project-details-btn');
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.modal-close');

    detailsButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const projectId = button.getAttribute('data-project');
            const modal = document.getElementById(projectId);
            if (modal) {
                modal.classList.add('active');
                body.style.overflow = 'hidden';
            }
        });
    });

    closeButtons.forEach(closeBtn => {
        closeBtn.addEventListener('click', () => {
            const modal = closeBtn.closest('.modal');
            modal.classList.remove('active');
            body.style.overflow = '';
        });
    });

    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                body.style.overflow = '';
            }
        });
    });

    // ============================================
    // INTERSECTION OBSERVER FOR ANIMATIONS
    // ============================================
    
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
    document.querySelectorAll('.skill-category, .strength-card, .tool-card').forEach(el => {
        observer.observe(el);
    });

    // ============================================
    // PARTICLE BACKGROUND (Optional Enhancement)
    // ============================================
    
    function createParticles() {
        const hero = document.querySelector('.hero');
        if (!hero) return;
        
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 3 + 1}px;
                height: ${Math.random() * 3 + 1}px;
                background: rgba(0, 212, 255, ${Math.random() * 0.5 + 0.2});
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: float-particle ${Math.random() * 10 + 10}s linear infinite;
                pointer-events: none;
            `;
            hero.appendChild(particle);
        }
    }

    // Add particle CSS animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float-particle {
            0% {
                transform: translateY(0) translateX(0);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Uncomment to enable particles
    // createParticles();

    // ============================================
    // CONTACT FORM HANDLING
    // ============================================
    
    const contactForm = document.querySelector('.contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            
            fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    contactForm.reset();
                    if (formStatus) {
                        formStatus.textContent = 'Thanks! Your message has been sent.';
                        formStatus.style.color = '#10b981';
                    }
                } else {
                    if (formStatus) {
                        formStatus.textContent = 'Oops! Something went wrong.';
                        formStatus.style.color = '#ef4444';
                    }
                }
            })
            .catch(() => {
                if (formStatus) {
                    formStatus.textContent = 'Network error. Please try again.';
                    formStatus.style.color = '#ef4444';
                }
            });
        });
    }

    // ============================================
    // TYPING EFFECT FOR HERO (Optional)
    // ============================================
    
    function typeWriter(element, text, speed = 50) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    // Uncomment to enable typing effect
    // const heroTitle = document.querySelector('.hero-text h1');
    // if (heroTitle) {
    //     const originalText = heroTitle.textContent;
    //     typeWriter(heroTitle, originalText, 50);
    // }

    // ============================================
    // PERFORMANCE: Debounce scroll events
    // ============================================
    
    function debounce(func, wait = 10) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Use debounced scroll for better performance
    window.addEventListener('scroll', debounce(() => {
        highlightNavigation();
    }, 10));

    console.log('🚀 Modern navigation initialized successfully!');
});