"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const PROFILE_IMAGE = {
  src: "/Imagens/Perfil.png",
  width: 313,
  height: 313,
};

const leftIn = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0 },
};

const rightIn = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0 },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function About() {
  return (
    <section className="about" id="about" aria-labelledby="about-title">
      <motion.div
        className="about-img"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        variants={leftIn}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image
          src={PROFILE_IMAGE.src}
          alt="Sobre mim"
          width={PROFILE_IMAGE.width}
          height={PROFILE_IMAGE.height}
          sizes="(max-width: 576px) 90vw, (max-width: 991px) 80vw, 360px"
        />
      </motion.div>
      <motion.div
        className="about-content"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
        }}
      >
        <motion.h3 variants={fadeUp} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
          Sobre mim
        </motion.h3>
        <motion.h1
          id="about-title"
          variants={fadeUp}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          Estudante de <span>Análise e Desenvolvimento de Sistemas</span>
        </motion.h1>
        <motion.p variants={fadeUp} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
          Sou um profissional apaixonado por tecnologia, com facilidade para
          trabalhar em equipe e me adaptar a novos desafios. Sempre de mente
          aberta a novas soluções, tenho experiência tanto no desenvolvimento
          web (Front-End e Back-End) quanto em aplicações desktop com Java.
          Também possuo experiência básica em PostgreSQL e sou especializado em
          montagem e manutenção de computadores. Estou sempre em evolução nos
          meus estudos de linguagens como Java e Python.
        </motion.p>
      </motion.div>
    </section>
  );
}
