"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const PROFILE_IMAGE = {
  src: "/Imagens/Perfil.png",
  width: 313,
  height: 313,
};

const rotatingRoles = [
  "Desenvolvedor",
  "Técnico de Software",
  "Back-End Java",
  "Front-End Web",
];

const cascade = {
  hidden: { opacity: 0, y: 28 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: 0.4 + i * 0.12,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export default function Home() {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return undefined;

    const id = setInterval(() => {
      setRoleIndex((i) => (i + 1) % rotatingRoles.length);
    }, 2600);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="home" id="home" aria-labelledby="home-title">
      <div className="home-content">
        <motion.h3 custom={0} initial="hidden" animate="visible" variants={cascade}>
          Olá, sou
        </motion.h3>
        <motion.h1
          id="home-title"
          custom={1}
          initial="hidden"
          animate="visible"
          variants={cascade}
        >
          Roland Bittencourt
        </motion.h1>
        <motion.h3 custom={2} initial="hidden" animate="visible" variants={cascade}>
          Tecnólogo em <span>Análise e Desenvolvimento de Sistemas</span> e
          Bacharelando em <span>Sistemas de Informação</span>
        </motion.h3>

        <motion.p
          custom={3}
          initial="hidden"
          animate="visible"
          variants={cascade}
          className="home-role"
          aria-live="polite"
        >
          <span className="home-role__label">Atuo como&nbsp;</span>
          <span className="home-role__word-wrap">
            <AnimatePresence mode="wait">
              <motion.span
                key={rotatingRoles[roleIndex]}
                className="home-role__word"
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                exit={{ y: "-100%", opacity: 0 }}
                transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
              >
                {rotatingRoles[roleIndex]}
              </motion.span>
            </AnimatePresence>
          </span>
        </motion.p>

        <motion.div
          className="social-media"
          custom={4}
          initial="hidden"
          animate="visible"
          variants={cascade}
        >
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
        </motion.div>

        <motion.div
          custom={5}
          initial="hidden"
          animate="visible"
          variants={cascade}
        >
          <a
            href="https://drive.google.com/uc?export=download&id=1iCUbbQ-RUVfq2AUekSB5e4RQU1_ooWpW"
            className="btn"
            target="_blank"
            rel="noopener noreferrer"
            data-cur="download"
          >
            Download CV
          </a>
        </motion.div>
      </div>

      <motion.div
        className="home-img"
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image
          src={PROFILE_IMAGE.src}
          alt="Foto de perfil"
          width={PROFILE_IMAGE.width}
          height={PROFILE_IMAGE.height}
          sizes="(max-width: 576px) 90vw, (max-width: 991px) 80vw, 380px"
          priority
        />
      </motion.div>
    </section>
  );
}
