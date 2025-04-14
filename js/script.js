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