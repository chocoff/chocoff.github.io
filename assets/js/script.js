// Smooth Scroll for Navigation
document.querySelectorAll('.navbar a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Only trigger smooth scroll for internal links
        if (href.startsWith('#')) {
            e.preventDefault();
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Offset for header
                    behavior: 'smooth'
                });
            }
        }
    });
});

// --- PROJECTS INFINITE SCROLL & DRAG LOGIC ---
const wrapper = document.querySelector('.projects-wrapper');
const track = document.querySelector('.projects-track');

if (wrapper && track) {
    let isDown = false;
    let startX;
    let scrollLeft;
    let scrollSpeed = 1; // Speed of auto-scroll
    let animationId;

    // dup cards for loop effect
    const cards = Array.from(track.children);
    cards.forEach(card => {
        const clone = card.cloneNode(true);
        track.appendChild(clone);
    });

    // auto-scroll function
    const startAutoScroll = () => {
        wrapper.scrollLeft += scrollSpeed;
        
        // reset to start when halfway point is reached
        if (wrapper.scrollLeft >= track.offsetWidth / 2) {
            wrapper.scrollLeft = 0;
        }
        animationId = requestAnimationFrame(startAutoScroll);
    };

    // start auto-scroll initially
    startAutoScroll();

    // Mouse Events (Desktop Drag)
    wrapper.addEventListener('mousedown', (e) => {
        isDown = true;
        cancelAnimationFrame(animationId); // Stop auto-scroll
        startX = e.pageX - wrapper.offsetLeft;
        scrollLeft = wrapper.scrollLeft;
    });

    wrapper.addEventListener('mouseleave', () => {
        if (isDown) {
            isDown = false;
            startAutoScroll();
        }
    });

    wrapper.addEventListener('mouseup', () => {
        isDown = false;
        startAutoScroll();
    });

    wrapper.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - wrapper.offsetLeft;
        const walk = (x - startX) * 1.5; // Drag sensitivity
        wrapper.scrollLeft = scrollLeft - walk;
    });

    // Touch Events (Mobile)
    wrapper.addEventListener('touchstart', () => {
        cancelAnimationFrame(animationId);
    }, { passive: true });

    wrapper.addEventListener('touchend', () => {
        startAutoScroll();
    }, { passive: true });
}

// Gmail Copy Script 
const gmailLink = document.getElementById("gmail-link");
if (gmailLink) {
    gmailLink.addEventListener("click", function (e) {
        e.preventDefault();
        const email = this.getAttribute("data-email");
        navigator.clipboard.writeText(email).then(() => {
            alert("Email copied: " + email);
        });
    });
}

// Active Link Switching logic (Enhanced)
window.addEventListener("scroll", () => {
    let current = "";
    const sections = document.querySelectorAll("section");
    const navItems = document.querySelectorAll(".navbar a");

    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 150) {
            current = section.getAttribute("id");
        }
    });

    navItems.forEach((a) => {
        a.classList.remove("active");
        if (a.getAttribute("href").includes(current)) {
            a.classList.add("active");
        }
    });
});
