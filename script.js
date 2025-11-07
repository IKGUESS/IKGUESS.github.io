const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

const fadeElements = document.querySelectorAll('.fade-in-left, .fade-in-right, .fade-in-up');
fadeElements.forEach(el => observer.observe(el));

window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

const sections = document.querySelectorAll('section[id]');

function activateNavLink() {
    let scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector(`.nav-link[href*=${sectionId}]`)?.classList.add('active');
        } else {
            document.querySelector(`.nav-link[href*=${sectionId}]`)?.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', activateNavLink);

const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    const mailtoLink = `mailto:ikramguessous2003@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
    
    window.location.href = mailtoLink;
    
    contactForm.reset();
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
// Language Switch Functionality
const langSwitch = document.getElementById('lang-switch');
const translatableElements = document.querySelectorAll('[data-fr][data-en]');

langSwitch.addEventListener('change', () => {
    const isEnglish = langSwitch.checked;
    translatableElements.forEach(el => {
        el.textContent = isEnglish ? el.dataset.en : el.dataset.fr;
    });
    document.documentElement.lang = isEnglish ? 'en' : 'fr';
});

// Keep current state on load
window.addEventListener('load', () => {
    const savedLang = localStorage.getItem('language');
    if (savedLang === 'en') {
        langSwitch.checked = true;
        translatableElements.forEach(el => {
            el.textContent = el.dataset.en;
        });
        document.documentElement.lang = 'en';
    }
});

// Save preference
langSwitch.addEventListener('change', () => {
    localStorage.setItem('language', langSwitch.checked ? 'en' : 'fr');
});
