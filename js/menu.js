// 1 Header und Menü-Knopf holen
const header = document.querySelector(".site-header");
const menuButton = document.querySelector(".menu-toggle");

// 2 Menü öffnen oder schliessen
function setOpen(open) {
    header.classList.toggle("is-open", open);
    menuButton.setAttribute("aria-expanded", open ? "true" : "false");
}

// 3 Klick auf den Knopf: Gegenteil des aktuellen Zustands
menuButton.addEventListener("click", function () {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    setOpen(!isOpen);
});

// 4 Escape schliesst das offene Menü
document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
        setOpen(false);
        menuButton.focus();
    }
});