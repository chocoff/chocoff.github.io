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

// --- PROJECTS INFINITE SCROLL & WHEEL LOGIC ---
const wrapper = document.querySelector('.projects-wrapper');
const track = document.querySelector('.projects-track');

if (wrapper && track) {
    let scrollSpeed = 1; 
    let isHovered = false;
    let animationId;

    const cards = Array.from(track.children);
    cards.forEach(card => {
        const clone = card.cloneNode(true);
        track.appendChild(clone);
    });

    const scrollWidth = track.scrollWidth / 2;

    const animate = () => {
        if (!isHovered) {
            wrapper.scrollLeft += scrollSpeed;
            if (wrapper.scrollLeft >= scrollWidth) {
                wrapper.scrollLeft -= scrollWidth;
            }
        }
        animationId = requestAnimationFrame(animate);
    };

    animate();

    wrapper.addEventListener('mouseenter', () => {
        isHovered = true;
    });

    wrapper.addEventListener('mouseleave', () => {
        isHovered = false;
    });

    wrapper.addEventListener('wheel', (e) => {
        e.preventDefault();

        wrapper.scrollLeft += e.deltaY;

        if (wrapper.scrollLeft >= scrollWidth) {
            wrapper.scrollLeft -= scrollWidth;
        } else if (wrapper.scrollLeft <= 0) {
            wrapper.scrollLeft += scrollWidth;
        }
    }, { passive: false });

    wrapper.addEventListener('touchstart', () => {
        isHovered = true;
    }, { passive: true });

    wrapper.addEventListener('touchend', () => {
        isHovered = false;
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
