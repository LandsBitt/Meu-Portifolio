"use client";

import { motion } from "framer-motion";

const experience = {
  company: "Elec",
  companyFull: "Elec Indústria e Comércio de Equipamentos de Medição",
  roles: [
    {
      title: "Técnico de Software Júnior",
      type: "CLT · Tempo integral",
      period: "jul 2025 — atual",
      current: true,
    },
    {
      title: "Estagiário de TI",
      type: "Estágio",
      period: "set 2024 — jul 2025",
    },
  ],
};

const education = [
  {
    title: "Bacharelado em Sistemas de Informação",
    school: "UNITAU",
    period: "Conclusão prevista: jul 2027",
    status: "Em andamento",
    current: true,
  },
  {
    title: "Tecnólogo em Análise e Desenvolvimento de Sistemas",
    school: "UNITAU",
    period: "Concluído em jul 2026",
    status: "Concluído",
  },
];

const presentations = [
  {
    title: "Desenvolvedor voluntário · Projeto de Extensão Foco na Mente",
    event: "UNITAU · 220 horas",
    track: "Site institucional do projeto de saúde mental",
    period: "ago 2024 — jul 2025",
  },
  {
    title:
      "Protótipo de aplicativo para localização e rotas em pontos turísticos de Tremembé-SP",
    event: "XIV CICTED · UNITAU",
    track: "Iniciação Científica (ENIC) · apresentação em painel",
    period: "out 2025",
  },
  {
    title: "Foco na Mente Tecnológico: relato de experiência do website",
    event: "XIV CICTED · UNITAU",
    track: "Projetos de Extensão (SEMEX) · apresentação em painel",
    period: "out 2025",
  },
];

const column = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Journey() {
  return (
    <section className="journey" id="journey" aria-labelledby="journey-title">
      <motion.h2
        id="journey-title"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        Minha <span>Trajetória</span>
      </motion.h2>

      <div className="journey-grid">
        <motion.div
          className="journey-card"
          custom={0}
          variants={column}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
        >
          <p className="journey-card__label">
            <i className="bx bx-briefcase" aria-hidden="true"></i> Experiência
          </p>
          <div className="journey-company">
            <h3>{experience.company}</h3>
            <p>{experience.companyFull}</p>
          </div>
          <ol className="journey-timeline">
            {experience.roles.map((role) => (
              <li
                key={role.title}
                className={role.current ? "is-current" : undefined}
              >
                <h4>{role.title}</h4>
                <p className="journey-meta">{role.type}</p>
                <p className="journey-period">
                  {role.period}
                  {role.current && <em className="journey-badge">Atual</em>}
                </p>
              </li>
            ))}
          </ol>
        </motion.div>

        <motion.div
          className="journey-card"
          custom={1}
          variants={column}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
        >
          <p className="journey-card__label">
            <i className="bx bxs-graduation" aria-hidden="true"></i> Formação
          </p>
          <ol className="journey-timeline">
            {education.map((item) => (
              <li
                key={item.title}
                className={item.current ? "is-current" : undefined}
              >
                <h4>{item.title}</h4>
                <p className="journey-meta">{item.school}</p>
                <p className="journey-period">
                  {item.period}
                  <em className="journey-badge">{item.status}</em>
                </p>
              </li>
            ))}
          </ol>
        </motion.div>

        <motion.div
          className="journey-card journey-card--wide"
          custom={2}
          variants={column}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
        >
          <p className="journey-card__label">
            <i className="bx bx-microphone" aria-hidden="true"></i> Extensão e apresentações
          </p>
          <ol className="journey-timeline journey-timeline--grid">
            {presentations.map((item) => (
              <li key={item.title}>
                <h4>{item.title}</h4>
                <p className="journey-meta">{item.event}</p>
                <p className="journey-period">
                  {item.track}
                  <em className="journey-badge">{item.period}</em>
                </p>
              </li>
            ))}
          </ol>
        </motion.div>
      </div>
    </section>
  );
}
