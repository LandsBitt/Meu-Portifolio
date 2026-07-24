"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#services", label: "Serviços" },
  { href: "#portfolio", label: "Projetos" },
  { href: "#contact", label: "Contato" },
  { href: "#about", label: "Sobre mim" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleToggleMenu = () => setMenuOpen((open) => !open);
  const handleNavClick = () => setMenuOpen(false);

  return (
    <header className={scrolled ? "is-scrolled" : ""}>
      <a
        href="#home"
        className="logo"
        aria-label="Voltar ao início"
        data-cur="home"
      >
        <Image
          src="/Imagens/Icon-Photoroom.png"
          alt="Logo"
          width={60}
          height={60}
          priority
        />
      </a>

      <nav className="nav" aria-label="Navegação principal">
        {navLinks.map((link) => (
          <a key={link.href} href={link.href} data-cur="ir">
            {link.label}
          </a>
        ))}
      </nav>

      <nav
        id="mobile-nav"
        className={`nav-responsive ${menuOpen ? "open" : ""}`}
        aria-label="Navegação mobile"
      >
        {navLinks.map((link) => (
          <a key={link.href} href={link.href} onClick={handleNavClick}>
            {link.label}
          </a>
        ))}
      </nav>

      <button
        type="button"
        className={`menu-hamburguer ${menuOpen ? "change" : ""}`}
        aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
        aria-expanded={menuOpen}
        aria-controls="mobile-nav"
        onClick={handleToggleMenu}
      >
        <span className="bar1" aria-hidden="true"></span>
        <span className="bar2" aria-hidden="true"></span>
        <span className="bar3" aria-hidden="true"></span>
      </button>
    </header>
  );
}
