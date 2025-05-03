document.addEventListener('DOMContentLoaded', () => {
    console.log('App is running');

    initButton();
    initHamburgerMenu();
    highlightActiveNavLink();
    initScrollToTopButton();
    initNavLinkClickHighlight();  // New function for click-based active link highlighting
});

function initButton() {
    const button = document.getElementById('myButton');
    if (button) {
        button.addEventListener('click', fetchData);
    }
}

function fetchData() {
    fetch('/api/data')
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then(data => {
            console.log('Data received:', data);
            // Further processing goes here
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

function initHamburgerMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }
}

function highlightActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop().split('?')[0] || 'index.html';

    document.querySelectorAll('.nav-menu a').forEach(link => {
        const linkPage = link.getAttribute('href').split('/').pop();
        if (linkPage === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

function initNavLinkClickHighlight() {
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Remove 'active' class from all links
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            
            // Add 'active' class to the clicked link
            this.classList.add('active');
        });
    });
}

function initScrollToTopButton() {
    const scrollBtn = document.querySelector('.scroll-to-top');
    if (!scrollBtn) return;

    window.addEventListener('scroll', () => {
        scrollBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
    });

    scrollBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}
