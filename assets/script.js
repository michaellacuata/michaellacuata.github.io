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

    // Auto-Scroll Project Images on Hover
    const projectImages = document.querySelectorAll('.project-image img');
    
    projectImages.forEach(img => {
        const projectImage = img.closest('.project-image');
        let isScrolling = false;
        
        // Start auto-scroll animation on hover
        projectImage.addEventListener('mouseenter', () => {
            if (isScrolling) return; // Prevent retriggering while scrolling
            
            const imageHeight = img.naturalHeight;
            const containerHeight = projectImage.offsetHeight;
            
            // Only scroll if image is actually taller than container
            if (imageHeight && imageHeight > containerHeight) {
                isScrolling = true;
                const maxScroll = imageHeight - containerHeight;
                img.style.transform = `translateY(-${maxScroll}px)`;
            }
        });
        
        // Reset animation on leave
        projectImage.addEventListener('mouseleave', () => {
            isScrolling = false;
            img.style.transform = 'translateY(0)';
        });
    });
});