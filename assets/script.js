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

    // Get Project Image Sizes and Display Below Links
    function getProjectImageSizes() {
        const projectImages = document.querySelectorAll('.project-image img');
        const imageSizes = [];

        projectImages.forEach((img, index) => {
            const container = img.closest('.project-image');
            const projectInfo = container.closest('.project-card').querySelector('.project-info');
            
            const size = {
                index: index + 1,
                imgWidth: img.offsetWidth,
                imgHeight: img.offsetHeight,
                naturalWidth: img.naturalWidth,
                naturalHeight: img.naturalHeight,
                containerWidth: container.offsetWidth,
                containerHeight: container.offsetHeight
            };
            imageSizes.push(size);
            console.log(`Project Image ${index + 1}:`, size);

            // Create and display size info below the visit website link
            const projectLink = projectInfo.querySelector('.project-link');
            let sizeDisplay = projectInfo.querySelector('.image-size-info');
            
            if (!sizeDisplay) {
                sizeDisplay = document.createElement('p');
                sizeDisplay.className = 'image-size-info';
                projectLink.after(sizeDisplay);
            }
            
            sizeDisplay.innerHTML = `<small style="color: #94a3b8; margin-top: 10px; display: block;">Image: ${size.naturalWidth}x${size.naturalHeight}px | Container: ${size.containerWidth}x${size.containerHeight}px</small>`;
        });

        return imageSizes;
    }

    // Call the function and log sizes
    getProjectImageSizes();

    // Auto-Scroll Project Images on Hover
    const projectImages = document.querySelectorAll('.project-image img');
    
    projectImages.forEach(img => {
        const projectImage = img.closest('.project-image');
        let isScrolling = false;
        
        // Start auto-scroll animation on hover only
        projectImage.addEventListener('mouseenter', () => {
            if (isScrolling) return;
            
            const imageHeight = img.naturalHeight || img.offsetHeight;
            const containerHeight = projectImage.offsetHeight;
            
            if (imageHeight > containerHeight) {
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