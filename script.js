// ===============================
// WHATSAPP ORDER
// ===============================

function orderProduct(productName, price) {

    const phone = "212650527938";

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
let cart = [];

function addToCart(name, price, size) {

    const existingProduct =
        cart.find(item => item.name === name && item.size === size);

    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({
            name: name,
            price: price,
            size: size,
            quantity: 1
        });

    }

    updateCart();

    document
        .getElementById("cartOverlay")
        .classList.add("active");
}


function updateCart() {

    const cartItems =
        document.getElementById("cartItems");

    const cartCount =
        document.getElementById("cartCount");

    const cartTotal =
        document.getElementById("cartTotal");

    cartItems.innerHTML = "";

    let total = 0;
    let count = 0;

    cart.forEach((item, index) => {

        total += item.price * item.quantity;
        count += item.quantity;

        cartItems.innerHTML += `

            <div class="cart-item">

                <div class="cart-item-info">

                    <h3>${item.name}</h3>

                    <p>
                        Size: ${item.size} · ${item.price} DH × ${item.quantity}
                    </p>

                </div>

                <button
                    class="remove-item"
                    onclick="removeFromCart(${index})">

                    REMOVE

                </button>

            </div>

        `;

    });

    cartCount.textContent = count;

    cartTotal.textContent =
        total + " DH";
}


function removeFromCart(index) {

    cart.splice(index, 1);

    updateCart();
}


function startCheckout() {

    if (cart.length === 0) {

        alert("Your cart is empty.");

        return;
    }

    document.getElementById("orderForm").hidden = false;
    document.getElementById("checkoutBtn").hidden = true;
    document.getElementById("customerName").focus();
}


function checkoutWhatsApp(event) {

    event.preventDefault();

    if (cart.length === 0) {

        alert("Your cart is empty.");

        return;
    }

    const form = document.getElementById("orderForm");

    if (!form.checkValidity()) {

        form.reportValidity();

        return;
    }

    const customer = new FormData(form);

    let message =
        "Hello, I would like to place an order:\n\n" +
        `Name: ${customer.get("name")}\n` +
        `Phone: ${customer.get("phone")}\n` +
        `City: ${customer.get("city")}\n` +
        `Address: ${customer.get("address")}\n\n` +
        "Order:\n";

    let total = 0;

    cart.forEach(item => {

        message +=
            `• ${item.name} (Size ${item.size}) — ${item.quantity} × ${item.price} DH\n`;

        total += item.price * item.quantity;

    });

    message +=
        `\nTotal: ${total} DH`;

    const phone = "212650527938";

    const url =
        `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank");
}


document
    .getElementById("cartBtn")
    .addEventListener("click", function() {

        document
            .getElementById("cartOverlay")
            .classList.add("active");

    });


document
    .getElementById("checkoutBtn")
    .addEventListener("click", startCheckout);


document
    .getElementById("orderForm")
    .addEventListener("submit", checkoutWhatsApp);


document
    .getElementById("cartClose")
    .addEventListener("click", function() {

        document
            .getElementById("cartOverlay")
            .classList.remove("active");

    });
