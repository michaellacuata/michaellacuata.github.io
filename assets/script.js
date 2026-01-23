document.addEventListener('DOMContentLoaded', () => {
    
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        
        // Hamburger animation toggle
        hamburger.classList.toggle('toggle');
    });

    // Close mobile menu when a link is clicked
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // Sticky Navbar Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.boxShadow = "0 5px 15px rgba(0,0,0,0.1)";
        } else {
            navbar.style.boxShadow = "0 2px 10px rgba(0,0,0,0.1)";
        }
    });

    // Smooth Scroll for Anchor Links (Backup for older browsers)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Dynamic Image Scroll on Hover Based on Image Height
    const projectImages = document.querySelectorAll('.project-image');
    
    projectImages.forEach(container => {
        const img = container.querySelector('img');
        
        // Wait for image to load before calculating dimensions
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
        
        // Calculate the maximum scroll distance based on rendered height
        const scrollDistance = imageHeight - containerHeight;
        
        if (scrollDistance > 0) {
            // Add hover listener
            container.addEventListener('mouseenter', () => {
                img.style.top = `-${scrollDistance}px`;
            });
            
            // Reset on mouse leave
            container.addEventListener('mouseleave', () => {
                img.style.top = '0px';
            });
        }
    }

    // Project Details Modal Functionality
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
                document.body.style.overflow = 'hidden';
            }
        });
    });

    closeButtons.forEach(closeBtn => {
        closeBtn.addEventListener('click', () => {
            const modal = closeBtn.closest('.modal');
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });

    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    });

    // Project image scroll on hover is handled by CSS
    // The .project-image:hover img selector in CSS handles the scroll effect
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});