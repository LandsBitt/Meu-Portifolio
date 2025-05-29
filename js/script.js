// Menu hamburguer
const menuHamburguer = document.querySelector('.menu-hamburguer');
menuHamburguer.addEventListener('click', () => {
    toggleMenu();
});

function toggleMenu() {
    const nav = document.querySelector('.nav-responsive');
    menuHamburguer.classList.toggle('change');

    if (menuHamburguer.classList.contains('change')) {
        nav.style.display = 'block';
    } else {
        nav.style.display = 'none';
    }
}

// Inicializa o AOS
AOS.init({
    duration: 800, // Duração da animação (800ms para suavidade)
    once: true,    // Anima apenas uma vez ao rolar
    easing: 'ease-in-out', // Suavização natural
    offset: 100,   // Inicia 100px antes do elemento entrar na tela
});

document.querySelectorAll('.saiba-mais').forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const popupId = button.getAttribute('data-popup');
      const popup = document.getElementById(popupId);
      popup.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  document.querySelectorAll('.close-popup').forEach(button => {
    button.addEventListener('click', () => {
      const popup = button.closest('.popup-overlay');
      popup.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  document.querySelectorAll('.popup-overlay').forEach(popup => {
    popup.addEventListener('click', (e) => {
      if (e.target === popup) {
        popup.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });
  gsap.registerPlugin(ScrollTrigger);

// Animações para as seções
gsap.utils.toArray("section").forEach(section => {
  gsap.from(section, {
    scrollTrigger: {
      trigger: section,
      start: "top 80%",
      toggleActions: "play none none none"
    },
    opacity: 0,
    y: 50,
    duration: 1,
    ease: "power2.out"
  });
});

particlesJS("particles-js", {
  "particles": {
    "number": {
      "value": 80,
      "density": {
        "enable": true,
        "value_area": 800
      }
    },
    "color": {
      "value": "#00eeff"
    },
    "shape": {
      "type": "circle"
    },
    "opacity": {
      "value": 0.5,
      "random": true
    },
    "size": {
      "value": 3,
      "random": true
    },
    "line_linked": {
      "enable": true,
      "distance": 150,
      "color": "#00eeff",
      "opacity": 0.4,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 2,
      "direction": "none",
      "random": true,
      "straight": false,
      "out_mode": "out",
      "bounce": false
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": true,
        "mode": "grab"
      },
      "onclick": {
        "enable": true,
        "mode": "push"
      }
    }
  }
});