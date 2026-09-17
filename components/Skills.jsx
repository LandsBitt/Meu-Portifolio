"use client";

import { motion } from "framer-motion";

const groups = [
  {
    title: "Linguagens",
    icon: "bx bx-code-alt",
    items: [
      { label: "Java", icon: "bxl-java" },
      { label: "JavaScript", icon: "bxl-javascript" },
      { label: "TypeScript", icon: "bxl-typescript" },
      { label: "C#" },
      { label: "Python", icon: "bxl-python" },
      { label: "SQL" },
    ],
  },
  {
    title: "Front-end",
    icon: "bx bx-layout",
    items: [
      { label: "React", icon: "bxl-react" },
      { label: "Next.js" },
      { label: "Vite" },
      { label: "Tailwind CSS", icon: "bxl-tailwind-css" },
      { label: "HTML", icon: "bxl-html5" },
      { label: "CSS", icon: "bxl-css3" },
    ],
  },
  {
    title: "Back-end e dados",
    icon: "bx bx-data",
    items: [
      { label: "Node.js", icon: "bxl-nodejs" },
      { label: "Express.js" },
      { label: "APIs REST" },
      { label: "PostgreSQL", icon: "bxl-postgresql" },
      { label: "MySQL" },
    ],
  },
  {
    title: "DevOps",
    icon: "bx bx-git-branch",
    items: [
      { label: "Git", icon: "bxl-git" },
      { label: "GitHub", icon: "bxl-github" },
      { label: "Docker", icon: "bxl-docker" },
      { label: "Docker Compose" },
      { label: "Nginx" },
    ],
  },
  {
    title: "Infraestrutura",
    icon: "bx bx-server",
    items: [
      { label: "Linux (Ubuntu Server)", icon: "bxl-tux" },
      { label: "Windows Server", icon: "bxl-windows" },
      { label: "Active Directory" },
      { label: "Hyper-V" },
    ],
  },
];

const grid = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const card = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Skills() {
  return (
    <section className="skills" id="skills" aria-labelledby="skills-title">
      <motion.h2
        id="skills-title"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        Minhas <span>Habilidades</span>
      </motion.h2>

      <motion.div
        className="skills-grid"
        variants={grid}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        {groups.map((group) => (
          <motion.div key={group.title} className="skills-card" variants={card}>
            <h3 className="skills-card__title">
              <i className={group.icon} aria-hidden="true"></i>
              {group.title}
            </h3>
            <ul className="skills-card__list">
              {group.items.map((item) => (
                <li key={item.label} className="skills-chip" data-cur="tech">
                  {item.icon && (
                    <i className={`bx ${item.icon}`} aria-hidden="true"></i>
                  )}
                  {item.label}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
