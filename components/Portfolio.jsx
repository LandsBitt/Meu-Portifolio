"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const projects = [
  {
    id: "montagem-pc",
    image: "/Imagens/01.jpg",
    alt: "Montagem de PC",
    title: "Montagem de Computador",
    summary:
      "Realizei a montagem do computador com instalação do sistema operacional e softwares essenciais.",
    popup: {
      title: "Montagem de Computador",
      description:
        "Realizei a montagem do computador com instalação do sistema operacional solicitado e softwares essenciais.",
    },
  },
  {
    id: "oficina-box23",
    image: "/Imagens/02.png",
    alt: "Site Oficina Box23",
    title: "Oficina Box23",
    summary:
      "Desenvolvi um site responsivo para a Oficina Box23, com layout moderno e objetivo.",
    popup: {
      title: "Oficina Box23",
      description:
        "Desenvolvi um site responsivo para a Oficina Box23, com layout moderno e objetivo. O projeto foi feito com HTML, CSS e JavaScript.",
      links: [
        {
          href: "https://box23.netlify.app/",
          label: "Ver Projeto",
        },
      ],
    },
  },
  {
    id: "bst-library",
    image: "/Imagens/BSTAVL.png",
    alt: "Projeto AVLEventScheduler",
    title: "Agenda de Eventos com AVL",
    summary: "Sistema em Java para gerenciar eventos com estrutura de árvore AVL.",
    popup: {
      title: "Agenda de Eventos com AVL",
      description:
        "Aplicação desenvolvida em Java que permite o cadastro, busca e remoção de eventos ordenados por data. Utiliza uma estrutura de árvore AVL para manter os dados balanceados, garantindo performance estável mesmo com grande volume de dados. Ideal para fins educacionais e demonstração de estruturas de dados aplicadas a situações reais.",
      links: [
        {
          href: "https://github.com/LandsBitt/AVLEventScheduler",
          label: "Ver Projeto",
        },
      ],
    },
  },
  {
    id: "foco-na-mente",
    image: "/Imagens/FocoNaMente.png",
    alt: "Foco Na Mente",
    title: "Foco Na Mente",
    summary:
      'Site do "Foco na Mente" (UNITAU) para promover saúde mental, com front-end em HTML, CSS e JavaScript.',
    popup: {
      title: "Foco Na Mente",
      description:
        'Site do "Foco na Mente" (UNITAU) para promover saúde mental, com front-end em HTML, CSS e JavaScript. Inclui navegação, carrossel de vídeos, artigos e formulário com integração ao Telegram. Em breve, back-end com Java e banco de dados.',
      links: [
        {
          href: "https://unitau.br/foconamente/",
          label: "Ver Projeto",
        },
        {
          href: "#",
          label: "Certificado",
        },
      ],
    },
  },
  {
    id: "prototipo-frontend",
    image: "/Imagens/04.jpg",
    alt: "Protótipo Front-End",
    title: "Protótipo Front-End",
    summary:
      "Protótipo de interface para site institucional de uma clínica odontológica, focado em UX.",
    popup: {
      title: "Protótipo Front-End",
      description:
        "Protótipo de interface para site institucional de uma clínica odontológica. Desenvolvido com foco em responsividade e UX.",
    },
  },
  {
    id: "phonebook-api",
    image: "/Imagens/06.jpg",
    alt: "Phonebook API",
    title: "Phonebook API",
    summary: "API simples de lista telefônica usando Express.js e SQLite.",
    popup: {
      title: "Phonebook API",
      description: "API simples de lista telefônica usando Express.js e SQLite.",
      endpoints: [
        "GET /contacts",
        "GET /contacts/:id",
        "POST /contacts",
        "PUT /contacts/:id",
        "DELETE /contacts/:id",
      ],
      examples: [
        {
          label: "Criar contato",
          code:
            "curl -X POST http://localhost:3000/contacts -H \"Content-Type: application/json\" -d '{\"nome\":\"João\",\"email\":\"joao@example.com\",\"telefone\":\"123456789\"}'",
        },
        { label: "Listar contatos", code: "curl http://localhost:3000/contacts" },
        { label: "Obter por id", code: "curl http://localhost:3000/contacts/1" },
        {
          label: "Atualizar",
          code:
            "curl -X PUT http://localhost:3000/contacts/1 -H \"Content-Type: application/json\" -d '{\"telefone\":\"987654321\"}'",
        },
        {
          label: "Deletar",
          code: "curl -X DELETE http://localhost:3000/contacts/1",
        },
      ],
      notes: [
        "O arquivo database.sqlite será criado automaticamente na raiz do projeto quando o servidor for iniciado.",
        "Nome e telefone são campos obrigatórios ao criar um contato.",
      ],
      links: [
        {
          href: "https://github.com/LandsBitt/BackPhoneBookJS",
          label: "Ver Projeto no GitHub",
        },
      ],
    },
  },
];

const animationDelays = [100, 200, 600, 300, 400, 500];

export default function Portfolio() {
  const [activePopup, setActivePopup] = useState(null);

  const projectList = projects.map((project, index) => ({
    ...project,
    delay: animationDelays[index] || 100,
  }));

  const closePopup = () => setActivePopup(null);

  useEffect(() => {
    document.body.style.overflow = activePopup ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [activePopup]);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        closePopup();
      }
    };
    if (activePopup) {
      window.addEventListener("keydown", handleEscape);
    }
    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [activePopup]);

  return (
    <section className="portfolio" id="portfolio" aria-labelledby="portfolio-title">
      <h2 id="portfolio-title">
        Últimos <span>Projetos</span>
      </h2>
      <div className="portfolio-container">
        {projectList.map((project) => (
          <div
            key={project.id}
            className="portfolio-box"
            data-aos="zoom-in"
            data-aos-delay={project.delay}
          >
            <Image
              src={project.image}
              alt={project.alt}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 450px"
              style={{ objectFit: "cover" }}
              priority={project.id === "montagem-pc"}
            />
            <div className="portfolio-layer">
              <h4>{project.title}</h4>
              <p>{project.summary}</p>
              <button
                type="button"
                className="btn saiba-mais"
                onClick={() => setActivePopup(project.id)}
              >
                Saiba Mais
              </button>
            </div>
          </div>
        ))}
      </div>

      {projectList.map((project) => {
        const isOpen = activePopup === project.id;
        return (
          <div
            key={`${project.id}-popup`}
            className={`popup-overlay ${isOpen ? "active" : ""}`}
            onClick={(event) => {
              if (event.target === event.currentTarget) {
                closePopup();
              }
            }}
            role="dialog"
            aria-modal="true"
            aria-hidden={!isOpen}
            aria-labelledby={`popup-${project.id}-title`}
          >
            <div className="popup-content">
              <button
                type="button"
                className="close-popup"
                aria-label="Fechar popup"
                onClick={closePopup}
              >
                ×
              </button>
              <h4 id={`popup-${project.id}-title`}>{project.popup.title}</h4>
              <p>{project.popup.description}</p>

              {project.popup.endpoints && (
                <ul>
                  {project.popup.endpoints.map((endpoint) => (
                    <li key={endpoint}>
                      <code>{endpoint}</code>
                    </li>
                  ))}
                </ul>
              )}

              {project.popup.examples && (
                <>
                  <h5>Exemplos com curl no PowerShell:</h5>
                  {project.popup.examples.map((example) => (
                    <div key={example.label}>
                      <p>{example.label}</p>
                      <pre>
                        <code>{example.code}</code>
                      </pre>
                    </div>
                  ))}
                </>
              )}

              {project.popup.notes && (
                <>
                  <h5>Observações:</h5>
                  <ul>
                    {project.popup.notes.map((note) => (
                      <li key={note}>{note}</li>
                    ))}
                  </ul>
                </>
              )}

              {project.popup.links?.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        );
      })}
    </section>
  );
}
