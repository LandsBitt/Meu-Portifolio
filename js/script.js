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