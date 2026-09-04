// JVOG Landing Page Logic

document.addEventListener('DOMContentLoaded', () => {
    // 1. Sticky Navbar & Scroll Events
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Mobile Drawer Toggle
    const mobileToggle = document.getElementById('mobileToggle');
    const drawerClose = document.getElementById('drawerClose');
    const mobileDrawer = document.getElementById('mobileDrawer');
    const drawerLinks = mobileDrawer.querySelectorAll('a');

    mobileToggle.addEventListener('click', () => {
        mobileDrawer.classList.add('open');
        document.body.style.overflow = 'hidden'; // Prevent background scroll
    });

    const closeDrawer = () => {
        mobileDrawer.classList.remove('open');
        document.body.style.overflow = '';
    };

    drawerClose.addEventListener('click', closeDrawer);
    
    drawerLinks.forEach(link => {
        link.addEventListener('click', closeDrawer);
    });

    // 3. Dark/Light Theme Toggle
    const themeToggle = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;

    // Check Local Storage
    const savedTheme = localStorage.getItem('jvog-theme');
    if (savedTheme) {
        htmlElement.setAttribute('data-theme', savedTheme);
        themeToggle.textContent = savedTheme === 'dark' ? '🌙' : '☀️';
    }

    themeToggle.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('jvog-theme', newTheme);
        
        themeToggle.textContent = newTheme === 'dark' ? '🌙' : '☀️';
    });

    // 4. Scroll Reveal Animations (Intersection Observer)
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: stop observing once it's visible
                // observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    animatedElements.forEach(el => observer.observe(el));
});
