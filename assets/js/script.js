//  scroll for Navigation
document.querySelectorAll('.navbar a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        if (href.startsWith('#')) {
            e.preventDefault();
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, 
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ABOUT SECTION HOVER LOGIC
const aboutIcons = document.querySelectorAll('.about-icon');
const aboutContents = document.querySelectorAll('.about-content');
const defaultInfo = document.getElementById('default-info');

aboutIcons.forEach(icon => {
    icon.addEventListener('mouseenter', () => {
        // Hide everything first
        aboutContents.forEach(content => content.classList.remove('active'));
        // Show specific target
        const targetId = icon.getAttribute('data-target');
        document.getElementById(targetId).classList.add('active');
    });

    // Revert to default when mouse leaves (may change in the future)
    icon.addEventListener('mouseleave', () => {
        aboutContents.forEach(content => content.classList.remove('active'));
        defaultInfo.classList.add('active');
    });
});

// Copy mail either by clicking contact or the mail icon
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

// Active link switching logic
window.addEventListener("scroll", () => {
    let current = "";
    const sections = document.querySelectorAll("section");
    const navItems = document.querySelectorAll(".navbar a");

    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
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