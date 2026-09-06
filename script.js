// ===============================
// WHATSAPP ORDER
// ===============================

function orderProduct(productName, price) {

    const phone = "212652527938";

    const message =
        `Hello, I would like to order:\n\n` +
        `Product: ${productName}\n` +
        `Price: ${price}\n\n` +
        `Please send me more information about sizes and availability.`;

    const whatsappURL =
        `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

    window.open(whatsappURL, "_blank");
}


// ===============================
// MOBILE MENU
// ===============================

const menuBtn = document.getElementById("menuBtn");
const closeMenu = document.getElementById("closeMenu");
const mobileMenu = document.getElementById("mobileMenu");

menuBtn.addEventListener("click", function () {

    mobileMenu.classList.add("active");

});

closeMenu.addEventListener("click", function () {

    mobileMenu.classList.remove("active");

});


// Close menu when clicking a link

const mobileLinks =
    document.querySelectorAll(".mobile-menu a");

mobileLinks.forEach(function(link) {

    link.addEventListener("click", function() {

        mobileMenu.classList.remove("active");

    });

});


// ===============================
// HEADER EFFECT
// ===============================

window.addEventListener("scroll", function() {

    const header =
        document.querySelector(".header");

    if (window.scrollY > 50) {

        header.style.background = "#000";

    } else {

        header.style.background = "#050505";

    }

});


// ===============================
// SIMPLE REVEAL ANIMATION
// ===============================

const elements =
    document.querySelectorAll(
        ".product, .intro, .brand-text, .size-section, .contact"
    );

const observer =
    new IntersectionObserver(

        function(entries) {

            entries.forEach(function(entry) {

                if (entry.isIntersecting) {

                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translateY(0)";

                }

            });

        },

        {
            threshold: 0.12
        }

    );


elements.forEach(function(element) {

    element.style.opacity = "0";

    element.style.transform = "translateY(30px)";

    element.style.transition =
        "opacity 0.8s ease, transform 0.8s ease";

    observer.observe(element);

});
