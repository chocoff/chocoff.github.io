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

// AUTO SCROLL
const slider = document.querySelector('.projects-slider');
let speed = 1.2; // Adjust this for overall speed
let direction = 1;
let isPaused = false;

let currentX = slider.scrollLeft;

function autoScroll() {
    if (!isPaused) {
        const maxScroll = slider.scrollWidth - slider.clientWidth;

        // update the virtual currentX position (firefox workaround)
        currentX += speed * direction;

        slider.scrollLeft = currentX;

        // handle Direction Reversal
        if (currentX >= maxScroll) {
            currentX = maxScroll; 
            direction = -1;
        } else if (currentX <= 0) {
            currentX = 0; 
            direction = 1;
        }
    }
    requestAnimationFrame(autoScroll);
}

// Update our virtual position if the user scrolls manually
slider.addEventListener('scroll', () => {
    // This syncs the virtual X with the user's manual movement
    currentX = slider.scrollLeft;
    
    const maxScroll = slider.scrollWidth - slider.clientWidth;
    if (currentX >= maxScroll - 1) direction = -1;
    if (currentX <= 0) direction = 1;
});

slider.addEventListener('mouseenter', () => isPaused = true);
slider.addEventListener('mouseleave', () => isPaused = false);

autoScroll();

// copy mail either by clicking contact or the mail icon
function setupMailCopy(element){
    if (element){
        element.addEventListener("click", function (e) {
            e.preventDefault();
            const email = this.getAttribute("data-email");
            navigator.clipboard.writeText(email).then(() => {
                alert("Email copied: " + email);
            });
        });
    }
}
const navMailLink = document.getElementById("mail-link");
setupMailCopy(navMailLink);

const mailIcon = document.querySelector(".mail-icon");
setupMailCopy(mailIcon);

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
