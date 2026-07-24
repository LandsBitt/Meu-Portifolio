"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const footerLinks = [
  { href: "#home", label: "Home" },
  { href: "#services", label: "Serviços" },
  { href: "#portfolio", label: "Projetos" },
  { href: "#contact", label: "Contato" },
  { href: "#about", label: "Sobre mim" },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Footer() {
  return (
    <footer className="footer">
      <motion.div
        className="footer-container"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div className="footer-logo" variants={fadeUp}>
          <Image
            src="/Imagens/Icon-Photoroom.png"
            alt="Logo"
            width={130}
            height={130}
          />
        </motion.div>
        <motion.div className="footer-links" variants={fadeUp}>
          <h3>Navegação</h3>
          <ul>
            {footerLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} data-cur="ir">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>
        <motion.div className="footer-contact" variants={fadeUp}>
          <h3>Contato Rápido</h3>
          <p>
            <i className="fas fa-phone-alt" aria-hidden="true"></i> (12)
            99786-4956
          </p>
          <p>
            <i className="fas fa-map-marker-alt" aria-hidden="true"></i>
            lands.bitt@gmail.com
          </p>
        </motion.div>
        <motion.div className="footer-social" variants={fadeUp}>
          <div className="social-icons">
            <a
              href="https://www.linkedin.com/in/roland-bittencourt-513b81163"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              data-cur="open"
            >
              <i className="bx bxl-linkedin" aria-hidden="true"></i>
            </a>
            <a
              href="https://github.com/LandsBitt"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              data-cur="open"
            >
              <i className="bx bxl-github" aria-hidden="true"></i>
            </a>
            <a
              href="https://www.instagram.com/roland.sbitt/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              data-cur="open"
            >
              <i className="bx bxl-instagram" aria-hidden="true"></i>
            </a>
            <a
              href="https://wa.me/551299864956"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              data-cur="open"
            >
              <i className="bx bxl-whatsapp" aria-hidden="true"></i>
            </a>
          </div>
        </motion.div>
      </motion.div>
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
            data-cur="open"
          >
            Roland Bittencourt
          </a>
        </p>
      </div>
    </footer>
  );
}
