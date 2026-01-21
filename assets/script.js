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

    // Draggable Project Images - Scroll effect
    const projectImages = document.querySelectorAll('.project-image img');
    
    projectImages.forEach(img => {
        let isDown = false;
        let startY = 0;
        let currentScroll = 0;
        
        img.style.cursor = 'grab';
        img.addEventListener('mousedown', (e) => {
            isDown = true;
            startY = e.clientY;
            img.style.cursor = 'grabbing';
        });

        document.addEventListener('mousemove', (e) => {
            if (!isDown || !img.closest('.project-card')) return;
            
            e.preventDefault();
            const walk = (e.clientY - startY) * -1;
            const imageHeight = img.naturalHeight || img.height;
            const containerHeight = img.closest('.project-image').offsetHeight;
            
            // Calculate the maximum scroll distance
            const maxScroll = imageHeight - containerHeight;
            
            // Apply scroll with limits
            let scrollValue = currentScroll + walk;
            scrollValue = Math.max(0, Math.min(scrollValue, maxScroll));
            
            img.style.objectPosition = `center ${-scrollValue}px`;
        });

        document.addEventListener('mouseup', () => {
            if (isDown) {
                currentScroll = parseInt(img.style.objectPosition.split(' ')[1]) || 0;
                currentScroll = Math.abs(currentScroll);
            }
            isDown = false;
            img.style.cursor = 'grab';
        });

        // Touch support for mobile
        img.addEventListener('touchstart', (e) => {
            isDown = true;
            startY = e.touches[0].clientY;
            img.style.cursor = 'grabbing';
        });

        document.addEventListener('touchmove', (e) => {
            if (!isDown || !img.closest('.project-card')) return;
            
            const walk = (e.touches[0].clientY - startY) * -1;
            const imageHeight = img.naturalHeight || img.height;
            const containerHeight = img.closest('.project-image').offsetHeight;
            
            const maxScroll = imageHeight - containerHeight;
            
            let scrollValue = currentScroll + walk;
            scrollValue = Math.max(0, Math.min(scrollValue, maxScroll));
            
            img.style.objectPosition = `center ${-scrollValue}px`;
        });

        document.addEventListener('touchend', () => {
            if (isDown) {
                currentScroll = parseInt(img.style.objectPosition.split(' ')[1]) || 0;
                currentScroll = Math.abs(currentScroll);
            }
            isDown = false;
            img.style.cursor = 'grab';
        });
    });
});