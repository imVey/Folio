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

// Fonctionnalités du carousel de projets
document.addEventListener("DOMContentLoaded", function () {
  let currentSlide = 0;
  const projects = document.querySelectorAll(".project-card");
  const indicators = document.querySelectorAll(".indicator");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const projectsWrapper = document.querySelector(".projects-wrapper");

  // URLs des projets (à personnaliser selon vos projets réels)
  const projectUrls = [
    "projet1.html", // E-commerce Modern
    "projet2.html", // Dashboard Analytics
    "projet3.html", // Application Mobile
    "projet4.html", // Web App Collaborative
    "projet5.html", // Portfolio Interactif
  ];

  function updateCarousel() {
    // Mettre à jour les cartes actives
    projects.forEach((card, index) => {
      card.classList.remove("active");
      // Masquer toutes les cartes d'abord
      card.style.display = "none";

      if (index === currentSlide) {
        card.classList.add("active");
      }
    });

    // Afficher seulement 3 cartes : précédente, actuelle, suivante
    const prevIndex = (currentSlide - 1 + projects.length) % projects.length;
    const nextIndex = (currentSlide + 1) % projects.length;

    // Afficher les 3 cartes visibles
    projects[prevIndex].style.display = "block";
    projects[currentSlide].style.display = "block";
    projects[nextIndex].style.display = "block";

    // Mettre à jour les indicateurs
    indicators.forEach((indicator, index) => {
      indicator.classList.remove("active");
      if (index === currentSlide) {
        indicator.classList.add("active");
      }
    });

    // Positionner les cartes : précédente à gauche, active au centre, suivante à droite
    const cardWidth = 300;
    const cardGap = 32;
    const centerOffset = 0; // La carte active reste au centre

    if (projectsWrapper) {
      // Réorganiser l'ordre des cartes dans le DOM pour l'affichage
      projectsWrapper.innerHTML = "";
      projectsWrapper.appendChild(projects[prevIndex]);
      projectsWrapper.appendChild(projects[currentSlide]);
      projectsWrapper.appendChild(projects[nextIndex]);

      // Centrer le groupe de 3 cartes
      projectsWrapper.style.transform = `translateX(${centerOffset}px)`;
    }
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % projects.length;
    updateCarousel();
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + projects.length) % projects.length;
    updateCarousel();
  }

  // Event listeners pour les boutons
  if (nextBtn) {
    nextBtn.addEventListener("click", nextSlide);
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", prevSlide);
  }

  // Event listeners pour les indicateurs
  indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => {
      currentSlide = index;
      updateCarousel();
    });
  });

  // Navigation au clavier
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      prevSlide();
    } else if (e.key === "ArrowRight") {
      nextSlide();
    }
  });

  // Auto-play (optionnel - décommentez si vous voulez un défilement automatique)
  /*
    setInterval(() => {
        nextSlide();
    }, 5000); // Change toutes les 5 secondes
    */

  // Gestion du clic sur les cartes pour redirection
  projects.forEach((card, index) => {
    card.addEventListener("click", () => {
      // Ajouter effet de clic
      card.style.transform = card.classList.contains("active")
        ? "scale(0.95) translateY(-10px)"
        : "scale(0.75) translateY(-10px)";

      setTimeout(() => {
        card.style.transform = "";
      }, 150);

      // Redirection après un court délai pour l'animation
      setTimeout(() => {
        window.open(projectUrls[index], "_blank");
      }, 200);
    });
  });

  // Gestion du survol des cartes
  projects.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      if (!card.classList.contains("active")) {
        card.style.transform = "scale(0.85) translateY(-10px)";
      }
    });

    card.addEventListener("mouseleave", () => {
      if (!card.classList.contains("active")) {
        card.style.transform = "scale(0.8)";
      }
    });
  });

  // Initialiser le carousel
  updateCarousel();

  // Gestion du responsive - recalculer les positions lors du redimensionnement
  let resizeTimeout;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      updateCarousel();
    }, 250);
  });

  // Animation d'entrée progressive des cartes
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const cards = entry.target.querySelectorAll(".project-card");
        cards.forEach((card, index) => {
          setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform =
              index === currentSlide ? "scale(1)" : "scale(0.8)";
          }, index * 100);
        });
        observer.unobserve(entry.target);
      }
    });
  });

  const projectsSection = document.querySelector(".projects-carousel");
  if (projectsSection) {
    observer.observe(projectsSection);
  }

  // Gestion du touch/swipe sur mobile
  let touchStartX = 0;
  let touchEndX = 0;

  if (projectsWrapper) {
    projectsWrapper.addEventListener("touchstart", (e) => {
      touchStartX = e.changedTouches[0].screenX;
    });

    projectsWrapper.addEventListener("touchend", (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    });
  }

  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        // Swipe gauche - slide suivant
        nextSlide();
      } else {
        // Swipe droite - slide précédent
        prevSlide();
      }
    }
  }
});
