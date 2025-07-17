document.addEventListener('DOMContentLoaded', () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    const header = document.querySelector('header');

    // Toggle Nav
    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');
        burger.classList.toggle('toggle'); // Burger animation

        // Animate links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
    });

    // Smooth Scrolling for Navigation Links & Close Nav on Click
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = e.target.getAttribute('href');

            // If it's an internal link
            if (targetId && targetId.startsWith('#')) {
                e.preventDefault(); // Prevent default jump
                const targetSection = document.querySelector(targetId);

                if (targetSection) {
                    // Close mobile nav if open
                    if (nav.classList.contains('nav-active')) {
                        nav.classList.remove('nav-active');
                        burger.classList.remove('toggle');
                        navLinks.forEach(link => {
                            link.style.animation = ''; // Reset animation
                        });
                    }

                    // Smooth scroll
                    window.scrollTo({
                        top: targetSection.offsetTop - header.offsetHeight, // Adjust for fixed header
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Highlight active nav link on scroll (Optional, but good for UX)
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - header.offsetHeight;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.querySelector('a').classList.remove('active');
            if (link.querySelector('a').getAttribute('href').includes(current)) {
                link.querySelector('a').classList.add('active');
            }
        });
    });

    // Add a simple scroll-reveal effect (optional, but enhances modern feel)
    const fadeInElements = document.querySelectorAll('.common-section h2, .common-section .section-tagline, .service-card, .portfolio-item, .testimonial-card, .contact-form-wrapper, .contact-info');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeInElements.forEach(el => {
        el.classList.add('fade-in-on-scroll'); // Add initial class for styling
        observer.observe(el);
    });
});

/* Add these to your style.css for the scroll-reveal effect */
/*
.fade-in-on-scroll {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

.fade-in-on-scroll.fade-in {
    opacity: 1;
    transform: translateY(0);
}
*/