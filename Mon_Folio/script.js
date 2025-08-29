// Gestion du Dark Mode
const darkModeToggle = document.getElementById("darkModeToggle");
const darkModeToggleMobile = document.getElementById("darkModeToggleMobile");
const body = document.body;

// Vérifier le thème sauvegardé
const savedTheme = localStorage.getItem("theme") || "light";
if (savedTheme === "dark") {
  body.setAttribute("data-theme", "dark");
}

// Fonction pour mettre à jour l'icône LinkedIn
function updateLinkedInIcon() {
  const currentTheme = body.getAttribute("data-theme") || "light";
  const linkedinImg = document.getElementById("LinkedIn");

  if (linkedinImg) {
    linkedinImg.src =
      currentTheme === "dark"
        ? "../Mon_Folio/Public/InBug-White.png"
        : "../Mon_Folio/Public/LI-In-Bug.png";
  }
}

// Fonction pour basculer le thème
function toggleDarkMode() {
  const currentTheme = body.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";

  body.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);

  // Mise à jour de la navbar selon le thème
  updateNavbarForTheme(newTheme);

  // Mise à jour de l'icône LinkedIn
  updateLinkedInIcon();
}

// Mettre à jour la navbar selon le thème
function updateNavbarForTheme(theme) {
  const navbar = document.querySelector("nav");
  const currentScroll = window.pageYOffset;

  if (theme === "dark") {
    if (currentScroll > 100) {
      navbar.style.background = "rgba(0, 0, 0, 0.3)";
      navbar.style.borderBottom = "1px solid rgba(255, 255, 255, 0.2)";
    } else {
      navbar.style.background = "rgba(0, 0, 0, 0.2)";
      navbar.style.borderBottom = "1px solid rgba(255, 255, 255, 0.1)";
    }
  } else {
    if (currentScroll > 100) {
      navbar.style.background = "rgba(255, 255, 255, 0.15)";
      navbar.style.borderBottom = "1px solid rgba(255, 255, 255, 0.3)";
    } else {
      navbar.style.background = "rgba(255, 255, 255, 0.1)";
      navbar.style.borderBottom = "1px solid rgba(255, 255, 255, 0.2)";
    }
  }
}

// Event listeners pour les boutons de dark mode
darkModeToggle.addEventListener("click", toggleDarkMode);
darkModeToggleMobile.addEventListener("click", toggleDarkMode);

// Gestion du menu hamburger mobile
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");
const mobileLinks = document.querySelectorAll(".mobile-link");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  mobileMenu.classList.toggle("active");

  // Empêcher le scroll du body quand le menu est ouvert
  if (mobileMenu.classList.contains("active")) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }
});

// Fermer le menu mobile quand on clique sur un lien
mobileLinks.forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    mobileMenu.classList.remove("active");
    document.body.style.overflow = "auto";
  });
});

// Fermer le menu mobile si on clique en dehors
mobileMenu.addEventListener("click", (e) => {
  if (e.target === mobileMenu) {
    hamburger.classList.remove("active");
    mobileMenu.classList.remove("active");
    document.body.style.overflow = "auto";
  }
});

// Gérer le redimensionnement de la fenêtre
window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    hamburger.classList.remove("active");
    mobileMenu.classList.remove("active");
    document.body.style.overflow = "auto";
  }
});

// Effet parallaxe
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const parallaxBg = document.querySelector(".parallax-bg");
  const layer1 = document.querySelector(".layer1");
  const layer2 = document.querySelector(".layer2");

  if (parallaxBg) {
    parallaxBg.style.transform = `translateY(${scrolled * 0.5}px)`;
  }
  if (layer1) {
    layer1.style.transform = `translateY(${scrolled * 0.3}px)`;
  }
  if (layer2) {
    layer2.style.transform = `translateY(${scrolled * 0.7}px)`;
  }
});

// Animation au scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

document.querySelectorAll(".fade-in-up").forEach((el) => {
  observer.observe(el);
});

// Navigation fluide
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Gestion du formulaire de contact
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // Récupération des données du formulaire
  const formData = new FormData(this);
  const data = Object.fromEntries(formData);

  // Simulation d'envoi (remplacez par votre logique d'envoi réelle)
  alert(
    "Merci pour votre message ! Je vous répondrai dans les plus brefs délais."
  );

  // Reset du formulaire
  this.reset();
});

// Effet de typing pour le titre hero
const heroTitle = document.querySelector(".hero h1");
const originalText = heroTitle.textContent;
let index = 0;

function typeWriter() {
  if (index < originalText.length) {
    heroTitle.textContent = originalText.slice(0, index + 1);
    index++;
    setTimeout(typeWriter, 100);
  }
}

// Démarrer l'effet de typing après le chargement
window.addEventListener("load", () => {
  heroTitle.textContent = "";
  setTimeout(typeWriter, 1000);

  // Mettre à jour l'icône LinkedIn au chargement
  updateLinkedInIcon();
});

// Navbar transparente au scroll avec support dark mode
let lastScroll = 0;
window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;
  const navbar = document.querySelector("nav");
  const currentTheme = body.getAttribute("data-theme") || "light";

  updateNavbarForTheme(currentTheme);

  lastScroll = currentScroll;
});

// Particles effet pour le background
function createParticle() {
  const particle = document.createElement("div");
  particle.style.cssText = `
        position: fixed;
        width: 4px;
        height: 4px;
        background: rgba(100, 255, 218, 0.6);
        border-radius: 50%;
        pointer-events: none;
        z-index: -1;
        left: ${Math.random() * window.innerWidth}px;
        top: ${window.innerHeight + 10}px;
        animation: particleFloat ${5 + Math.random() * 10}s linear forwards;
    `;

  document.body.appendChild(particle);

  setTimeout(() => {
    particle.remove();
  }, 15000);
}

// Ajouter des particules périodiquement
setInterval(createParticle, 2000);

// Style pour l'animation des particules
const style = document.createElement("style");
style.textContent = `
    @keyframes particleFloat {
        to {
            transform: translateY(-${
              window.innerHeight + 100
            }px) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
