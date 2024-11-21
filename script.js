document.addEventListener('DOMContentLoaded', () => {
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // Initialize typing animation
    const typedName = new Typed('.typed-text', {
        strings: [
            'Wadie Coder',
            'a content creator',
            'a developer',
            'a tech enthusiast'
        ],
        typeSpeed: 50,
        backSpeed: 30,
        loop: true,
        startDelay: 500
    });

    // Go to top functionality
    const goToTop = document.querySelector('.go-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 200) {
            goToTop.classList.add('visible');
        } else {
            goToTop.classList.remove('visible');
        }
    });

    goToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Mobile menu functionality
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuBtn.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuBtn.classList.remove('active');
        });
    });

    // Enhanced 3D Profile Image Animation
    const profileImage = document.querySelector('.profile-image');
    let isAnimating = true;

    // Initial animation
    setTimeout(() => {
        isAnimating = false;
        profileImage.style.animation = 'none';
    }, 6000);

    profileImage.addEventListener('mousemove', (e) => {
        if (!isAnimating) {
            const rect = profileImage.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const angleX = (y - centerY) / 10;
            const angleY = (centerX - x) / 10;
            
            profileImage.style.transform = `rotateX(${angleX}deg) rotateY(${angleY}deg)`;
        }
    });
    
    profileImage.addEventListener('mouseleave', () => {
        if (!isAnimating) {
            profileImage.style.transform = '';
        }
    });

    // Restart animation on click
    profileImage.addEventListener('click', () => {
        if (!isAnimating) {
            isAnimating = true;
            profileImage.style.animation = 'float 6s ease-in-out';
            setTimeout(() => {
                isAnimating = false;
                profileImage.style.animation = 'none';
            }, 6000);
        }
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});
