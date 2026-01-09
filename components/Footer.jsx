import Image from "next/image";

const footerLinks = [
  { href: "#home", label: "Home" },
  { href: "#services", label: "Serviços" },
  { href: "#portfolio", label: "Projetos" },
  { href: "#contact", label: "Contato" },
  { href: "#about", label: "Sobre mim" },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <Image src="/Imagens/Icon-Photoroom.png" alt="Logo" width={130} height={130} />
        </div>
        <div className="footer-links">
          <h3>Navegação</h3>
          <ul>
            {footerLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </div>
        <div className="footer-contact">
          <h3>Contato Rápido</h3>
          <p>
            <i className="fas fa-phone-alt" aria-hidden="true"></i> (12)
            99786-4956
          </p>
          <p>
            <i className="fas fa-map-marker-alt" aria-hidden="true"></i>
            lands.bitt@gmail.com
          </p>
        </div>
        <div className="footer-social">
          <div className="social-icons">
            <a
              href="https://www.linkedin.com/in/roland-bittencourt-513b81163"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <i className="bx bxl-linkedin" aria-hidden="true"></i>
            </a>
            <a
              href="https://github.com/LandsBitt"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <i className="bx bxl-github" aria-hidden="true"></i>
            </a>
            <a
              href="https://www.instagram.com/roland.sbitt/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <i className="bx bxl-instagram" aria-hidden="true"></i>
            </a>
            <a
              href="https://wa.me/551299864956"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
            >
              <i className="bx bxl-whatsapp" aria-hidden="true"></i>
            </a>
          </div>
        </div>
      </div>
      <div className="footer__content">
        <p className="footer__copyright">
          © 2025 Portfolio. Todos os direitos reservados.
        </p>
        <p className="footer__credit">
          Desenvolvido por{" "}
          <a
            href="https://github.com/LandsBitt"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__link"
          >
            Roland Bittencourt
          </a>
        </p>
      </div>
    </footer>
  );
}
