"use client";

import { motion } from "framer-motion";

const services = [
  {
    icon: "bx bx-server",
    title: "Desenvolvedor Back-End",
    description:
      "Minha principal linguagem de programação é Java. Atualmente, estou ampliando meus conhecimentos com o estudo de Python.",
  },
  {
    icon: "bx bx-code-curly",
    title: "Desenvolvedor Front-End",
    description:
      "Desenvolvo sites institucionais com foco na apresentação profissional de empresas.",
  },
  {
    icon: "bx bx-wrench",
    title: "Montagem e manutenção",
    description:
      "Também faço montagem, manutenção e formatação de computadores sob demanda, garantindo o funcionamento ideal dos equipamentos.",
  },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Services() {
  return (
    <section className="services" id="services" aria-labelledby="services-title">
      <motion.h2
        id="services-title"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        Meus <span>Serviços</span>
      </motion.h2>
      <motion.div
        className="services-container"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {services.map((service) => (
          <motion.div
            key={service.title}
            className="services-box"
            variants={item}
            data-cur="hover"
          >
            <i className={service.icon} aria-hidden="true"></i>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
