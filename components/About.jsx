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
          Desenvolvedor formado em <span>Análise e Desenvolvimento de Sistemas</span>
        </motion.h1>
        <motion.p variants={fadeUp} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
          Sou apaixonado por tecnologia, com facilidade para trabalhar em
          equipe e me adaptar a novos desafios. Me formei Tecnólogo em Análise
          e Desenvolvimento de Sistemas pela UNITAU em 2026 e sigo no
          Bacharelado em Sistemas de Informação, com conclusão prevista para
          2027. Atuo como Técnico de Software Júnior na Elec, onde comecei como
          estagiário de TI. Tenho experiência em desenvolvimento web (Front-End
          e Back-End), aplicações desktop com Java e PostgreSQL, e continuo
          evoluindo em linguagens como Java e Python. Também faço montagem e
          manutenção de computadores sob demanda.
        </motion.p>
      </motion.div>
    </section>
  );
}
