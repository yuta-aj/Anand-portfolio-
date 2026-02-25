// Preloader
window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    preloader.classList.add('fade-out');
    setTimeout(() => {
        preloader.style.display = 'none';
    }, 500);
});

// Sticky Header
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    header.classList.toggle('sticky', window.scrollY > 0);
});

// Mobile Menu
const hamburger = document.querySelector('.hamburger');
const navList = document.querySelector('.nav-list');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', function() {
    this.classList.toggle('active');
    navList.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', function() {
        hamburger.classList.remove('active');
        navList.classList.remove('active');
    });
});

// Smooth Scrolling for Navigation Links
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        window.scrollTo({
            top: targetSection.offsetTop - 80,
            behavior: 'smooth'
        });
    });
});

// Back to Top Button
const backToTopBtn = document.querySelector('.back-to-top');

window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('active');
    } else {
        backToTopBtn.classList.remove('active');
    }
});

backToTopBtn.addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Skills Animation
const skillItems = document.querySelectorAll('.skill-item');

function animateSkills() {
    skillItems.forEach(item => {
        const progress = item.querySelector('.progress');
        const width = progress.style.width;
        progress.style.width = '0';
        
        setTimeout(() => {
            progress.style.width = width;
        }, 100);
    });
}

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.id === 'skills') {
                animateSkills();
            }
            
            entry.target.classList.add('animated');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

const sections = document.querySelectorAll('section');
sections.forEach(section => {
    observer.observe(section);
});

// Project Filter
const filterBtns = document.querySelectorAll('.filter-btn');
const projectItems = document.querySelectorAll('.project-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        // Remove active class from all buttons
        filterBtns.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        this.classList.add('active');
        
        const filterValue = this.getAttribute('data-filter');
        
        projectItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Contact Form
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Here you would typically send the form data to a server
    // For this example, we'll just log it and show an alert
    console.log({ name, email, subject, message });
    
    alert('Thank you for your message! I will get back to you soon.');
    this.reset();
});

// Typing Animation for Hero Text
const professions = ['Web Developer', 'UI Designer', 'Frontend Developer'];
let professionIndex = 0;
let charIndex = 0;
let isDeleting = false;
const professionElement = document.querySelector('.profession');

function type() {
    const currentProfession = professions[professionIndex];
    
    if (isDeleting) {
        professionElement.textContent = currentProfession.substring(0, charIndex - 1);
        charIndex--;
    } else {
        professionElement.textContent = currentProfession.substring(0, charIndex + 1);
        charIndex++;
    }
    
    if (!isDeleting && charIndex === currentProfession.length) {
        isDeleting = true;
        setTimeout(type, 1000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        professionIndex = (professionIndex + 1) % professions.length;
        setTimeout(type, 500);
    } else {
        const typingSpeed = isDeleting ? 100 : 200;
        setTimeout(type, typingSpeed);
    }
}

// Start typing animation after initial delay
setTimeout(type, 2000);

// Dark Mode Toggle (Bonus Feature)
const darkModeToggle = document.createElement('div');
darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
darkModeToggle.classList.add('dark-mode-toggle');
document.body.appendChild(darkModeToggle);

darkModeToggle.addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    
    if (document.body.classList.contains('dark-mode')) {
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
});

// Add dark mode styles dynamically
const darkModeStyles = `
.dark-mode {
    --dark-color: #ecf0f1;
    --light-color: #2c3e50;
    --gray: #bdc3c7;
    --dark-gray: #ecf0f1;
    --light-gray: #34495e;
    background-color: var(--light-color);
    color: var(--dark-color);
}

.dark-mode .header {
    background-color: var(--light-color);
}

.dark-mode .header.sticky {
    background-color: var(--light-color);
}

.dark-mode .logo,
.dark-mode .nav-link {
    color: var(--dark-color);
}

.dark-mode .project-item,
.dark-mode .education-item,
.dark-mode .contact-form,
.dark-mode .tool-item {
    background-color: var(--light-gray);
    color: var(--dark-color);
}

.dark-mode .footer {
    background-color: #1a252f;
}

.dark-mode .footer-links a,
.dark-mode .footer-bottom p {
    color: var(--light-gray);
}

.dark-mode .form-group input,
.dark-mode .form-group textarea {
    background-color: var(--light-gray);
    color: var(--dark-color);
    border-color: var(--gray);
}
`;

const styleElement = document.createElement('style');
styleElement.innerHTML = darkModeStyles;
document.head.appendChild(styleElement);
