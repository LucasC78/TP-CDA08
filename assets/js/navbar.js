// Script pour le menu burger
document.addEventListener("DOMContentLoaded", () => {
    const burger = document.querySelector(".burger");
    const navLinks = document.querySelector(".nav-links");

    burger.addEventListener("click", () => {
        navLinks.classList.toggle("active"); // Toggle la classe active pour afficher/masquer les liens
    });
});
