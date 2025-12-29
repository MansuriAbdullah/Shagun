
document.addEventListener('DOMContentLoaded', () => {
    
    // --- Mobile Navigation ---
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            if(navLinks.style.display === 'flex') {
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '70px';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.background = 'rgba(232, 246, 239, 0.95)';
                navLinks.style.padding = '20px';
                navLinks.style.textAlign = 'center';
            }
        });
    }

    // --- Scroll Animations (Intersection Observer) ---
    const scrollElements = document.querySelectorAll('[data-scroll]');

    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;
        return (elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend);
    };

    const displayScrollElement = (element) => {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
    };

    const hideScrollElement = (element) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(50px)';
        element.style.transition = 'all 0.6s ease-out';
    };

    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.25)) {
                displayScrollElement(el);
            } else {
               // Optional: hide on scroll up to re-animate
               // hideScrollElement(el);
            }
        });
    }

    // Initialize hidden state
    scrollElements.forEach((el) => {
        hideScrollElement(el);
    });

    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });

    // Trigger once on load
    handleScrollAnimation();


    // --- 3D Mouse Parallax on Hero ---
    const heroSection = document.querySelector('.hero');
    const heroVisual = document.querySelector('.hero-visual');
    
    if (heroSection && heroVisual) {
        heroSection.addEventListener('mousemove', (e) => {
            const x = (window.innerWidth - e.pageX * 2) / 90;
            const y = (window.innerHeight - e.pageY * 2) / 90;
            
            heroVisual.style.transform = `translateX(${x}px) translateY(${y}px)`;
        });
        
        // Reset on leave
        heroSection.addEventListener('mouseleave', () => {
             heroVisual.style.transform = `translateX(0) translateY(0)`;
        });
    }


    // --- Bangles Carousel ---
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.next-btn');
    const prevButton = document.querySelector('.prev-btn');
    
    if (track && slides.length > 0) {
        const slideWidth = slides[0].getBoundingClientRect().width;
        
        // Arrange slides next to one another
        /* 
           Note: CSS flex handles positioning, we just need to translate the track.
           However, for infinite loop or proper sliding tailored to width, we need to calculate.
           Let's implement a simple index-based shift.
        */
       
        let currentIndex = 0;
        
        // For responsive, we might show 1, 2, or 3 items. 
        // Let's assume we slide one item at a time.
        
        const moveToSlide = (index) => {
            // Check bounds
            // This logic assumes we want to stop at ends.
            // Responsive check: how many visible?
            const containerWidth = document.querySelector('.carousel-track-container').offsetWidth;
            const itemsVisible = Math.floor(containerWidth / slideWidth) || 1;
            const maxIndex = slides.length - itemsVisible;
            
            if (index < 0) index = 0;
            if (index > maxIndex) index = maxIndex; // Stop at end

            const amountToMove = slides[0].offsetWidth * index;
            track.style.transform = 'translateX(-' + amountToMove + 'px)';
            currentIndex = index;
        }

        nextButton.addEventListener('click', () => {
            moveToSlide(currentIndex + 1);
        });

        prevButton.addEventListener('click', () => {
            moveToSlide(currentIndex - 1);
        });
        
        // Handle Resize
        window.addEventListener('resize', () => {
            // Re-calc slide width if purely CSS based it adjusts, but translation might be off.
            // Ideally reset position.
            track.style.transform = 'translateX(0)';
            currentIndex = 0;
        });
    }

});
