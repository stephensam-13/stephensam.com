// --- Typing Effect ---
const words = ["Site Reliability & Devops Engineer.", "Content Creator", "Technical Educator"];
let i = 0;
let timer;
const typingText = document.querySelector('.typing-text');
const speedWait = 2000;
const speedType = 100;

function typingEffect() {
    let word = words[i].split("");
    let loopTyping = function() {
        if (word.length > 0) {
            typingText.innerHTML += word.shift();
        } else {
            setTimeout(deletingEffect, speedWait);
            return false;
        }
        timer = setTimeout(loopTyping, speedType);
    };
    loopTyping();
}

function deletingEffect() {
    let word = words[i].split("");
    let loopDeleting = function() {
        if (word.length > 0) {
            word.pop();
            typingText.innerHTML = word.join("");
        } else {
            if (words.length > (i + 1)) {
                i++;
            } else {
                i = 0;
            }
            typingEffect();
            return false;
        }
        timer = setTimeout(loopDeleting, speedType / 2);
    };
    loopDeleting();
}

// Start typing effect
if(typingText) {
    setTimeout(typingEffect, 1000);
}

// --- Scroll Reveal Animations ---
const revealElements = document.querySelectorAll('.scroll-reveal');

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            // Optional: unobserve after revealing if you only want it to reveal once
            // scrollObserver.unobserve(entry.target);
        }
    });
}, {
    root: null,
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
});

revealElements.forEach(el => scrollObserver.observe(el));

// --- Mobile Navigation Toggle ---
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
        }
    });
});

// --- Highlight active nav link on scroll ---
const sections = document.querySelectorAll('.section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('highlight');
        if (item.getAttribute('href').substring(1) === current) {
            item.style.color = 'var(--accent-primary)';
        } else {
            item.style.color = ''; // Reset to default
        }
    });
});
