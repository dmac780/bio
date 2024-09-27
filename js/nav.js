const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');
const navClose = document.getElementById('nav-close');
const navLinks = document.querySelectorAll('.nav ul li a');
let lastScrollTop = 0;

hamburger.addEventListener('click', () => {
    nav.style.transform = 'translateY(0)';
    navClose.style.display = 'block';
});

navClose.addEventListener('click', () => {
    nav.style.transform = 'translateY(-100%)';
    navClose.style.display = 'none';
});

navLinks.forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: 'smooth'
            });
        }

        nav.style.transform = 'translateY(-100%)';

        // Update URL after scroll
        setTimeout(() => {
            window.location.hash = targetId;
        }, 200); // Adjust timeout to match scroll duration
    });
});

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    if (currentScroll > lastScrollTop) {
        document.querySelector('header').style.top = '-100px';
    } else {
        document.querySelector('header').style.top = '0';
    }
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});