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
        ? "Public/InBug-White.png"
        : "Public/LI-In-Bug.png";
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

// Carrousel horizontal simple - 3 cartes côte à côte avec navigation infinie
document.addEventListener("DOMContentLoaded", function () {
  let currentIndex = 0;
  const originalProjects = document.querySelectorAll(".project-card");
  const indicators = document.querySelectorAll(".indicator");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const projectsWrapper = document.querySelector(".projects-wrapper");

  if (!projectsWrapper || originalProjects.length === 0) {
    console.error("Éléments du carrousel non trouvés");
    return;
  }

  const totalProjects = originalProjects.length;
  let projects = [];
  let isTransitioning = false;

  // Configuration pour le défilement par groupe de 3
  const cardsPerView = 3;
  const cardWidth = 100 / cardsPerView; // Pourcentage par carte

  // Créer le carrousel infini avec clones
  function createInfiniteCarousel() {
    projectsWrapper.innerHTML = "";
    const allProjects = [];

    // Cloner toutes les cartes pour créer un effet infini fluide
    // Ajouter les cartes à la fin au début (pour le défilement vers la gauche)
    for (let i = 0; i < totalProjects; i++) {
      const clone = originalProjects[i].cloneNode(true);
      clone.classList.add("clone", "clone-start");
      allProjects.push(clone);
    }

    // Ajouter les cartes originales
    originalProjects.forEach((project) => {
      allProjects.push(project);
    });

    // Ajouter les cartes du début à la fin (pour le défilement vers la droite)
    for (let i = 0; i < totalProjects; i++) {
      const clone = originalProjects[i].cloneNode(true);
      clone.classList.add("clone", "clone-end");
      allProjects.push(clone);
    }

    // Ajouter toutes les cartes au DOM
    allProjects.forEach((project) => {
      projectsWrapper.appendChild(project);
    });

    projects = allProjects;

    // Position initiale : démarrer sur les vraies cartes (après les premiers clones)
    currentIndex = totalProjects;
    updateCarousel(false);
  }

  function updateCarousel(withTransition = true) {
    if (isTransitioning && withTransition) return;

    if (withTransition) {
      isTransitioning = true;
      projectsWrapper.style.transition =
        "transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
    } else {
      projectsWrapper.style.transition = "none";
    }

    // Calculer le déplacement (chaque groupe de 3 cartes)
    const movePercentage = -(currentIndex * cardWidth);
    projectsWrapper.style.transform = `translateX(${movePercentage}%)`;

    // Mettre à jour les indicateurs basés sur l'index réel
    const realIndex =
      (((currentIndex - totalProjects) % totalProjects) + totalProjects) %
      totalProjects;
    indicators.forEach((indicator, index) => {
      indicator.classList.toggle("active", index === realIndex);
    });

    if (withTransition) {
      setTimeout(() => {
        // Gérer les boucles infinies
        if (currentIndex <= 0) {
          // Si on est au début, revenir à la fin des vraies cartes
          currentIndex = totalProjects;
          updateCarousel(false);
        } else if (currentIndex >= totalProjects * 2) {
          // Si on est à la fin, revenir au début des vraies cartes
          currentIndex = totalProjects;
          updateCarousel(false);
        }
        isTransitioning = false;
      }, 600);
    }
  }

  function nextGroup() {
    if (isTransitioning) return;
    currentIndex++;
    updateCarousel();
  }

  function prevGroup() {
    if (isTransitioning) return;
    currentIndex--;
    updateCarousel();
  }

  function goToGroup(index) {
    if (isTransitioning) return;
    currentIndex = totalProjects + index;
    updateCarousel();
  }

  // Event listeners pour les boutons
  if (nextBtn) {
    nextBtn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      nextGroup();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      prevGroup();
    });
  }

  // Event listeners pour les indicateurs
  indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      goToGroup(index);
    });
  });

  // Navigation au clavier
  document.addEventListener("keydown", (e) => {
    if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;

    if (e.key === "ArrowLeft") {
      e.preventDefault();
      prevGroup();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      nextGroup();
    }
  });

  // Gestion tactile pour mobile
  let touchStartX = 0;
  let touchEndX = 0;
  let isDragging = false;

  projectsWrapper.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.touches[0].clientX;
      isDragging = true;
    },
    { passive: true }
  );

  projectsWrapper.addEventListener(
    "touchmove",
    (e) => {
      if (!isDragging) return;
      // Permettre le scroll vertical mais prévenir le horizontal
      const touchCurrentX = e.touches[0].clientX;
      const diffX = Math.abs(touchCurrentX - touchStartX);
      if (diffX > 10) {
        e.preventDefault();
      }
    },
    { passive: false }
  );

  projectsWrapper.addEventListener(
    "touchend",
    (e) => {
      if (!isDragging) return;
      touchEndX = e.changedTouches[0].clientX;
      handleSwipe();
      isDragging = false;
    },
    { passive: true }
  );

  function handleSwipe() {
    const swipeThreshold = 80;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        nextGroup(); // Swipe gauche = suivant
      } else {
        prevGroup(); // Swipe droite = précédent
      }
    }
  }

  // Auto-play optionnel (décommentez pour activer)
  /*
  let autoPlayInterval;
  const autoPlayDelay = 5000;
  
  function startAutoPlay() {
    autoPlayInterval = setInterval(() => {
      if (!isTransitioning) {
        nextGroup();
      }
    }, autoPlayDelay);
  }
  
  function stopAutoPlay() {
    clearInterval(autoPlayInterval);
  }
  
  // Pause auto-play au survol
  projectsWrapper.addEventListener("mouseenter", stopAutoPlay);
  projectsWrapper.addEventListener("mouseleave", startAutoPlay);
  
  // Pause auto-play pendant l'interaction tactile
  projectsWrapper.addEventListener("touchstart", stopAutoPlay);
  projectsWrapper.addEventListener("touchend", () => {
    setTimeout(startAutoPlay, 3000); // Reprendre après 3s
  });
  
  startAutoPlay();
  */

  // Gestion du responsive
  let resizeTimeout;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      updateCarousel(false);
    }, 200);
  });

  // Initialisation
  createInfiniteCarousel();

  // Animation d'entrée
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const cards = projectsWrapper.querySelectorAll(".project-card");
          cards.forEach((card, index) => {
            card.style.opacity = "0";
            card.style.transform = "translateY(30px)";
            setTimeout(() => {
              card.style.opacity = "1";
              card.style.transform = "translateY(0)";
              card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
            }, index * 100);
          });
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  const projectsSection = document.querySelector(".projects-carousel");
  if (projectsSection) {
    observer.observe(projectsSection);
  }

  // Fonction pour déboguer (développement uniquement)
  window.carouselDebug = {
    currentIndex: () => currentIndex,
    totalProjects: () => totalProjects,
    realIndex: () =>
      (((currentIndex - totalProjects) % totalProjects) + totalProjects) %
      totalProjects,
    next: nextGroup,
    prev: prevGroup,
    goto: goToGroup,
  };
});
