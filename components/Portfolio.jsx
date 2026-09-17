"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

const projects = [
  {
    id: "ligno",
    image: "/Imagens/Ligno.png",
    alt: "Ligno, leitor de EPUB no tema escuro",
    title: "Ligno",
    summary:
      "Leitor de EPUB que roda inteiro no navegador, offline e sem servidor.",
    popup: {
      title: "Ligno",
      description:
        "Leitor de EPUB que roda inteiro no navegador: sem servidor, sem upload e sem conta. A biblioteca fica no dispositivo e funciona offline. Tem paginação por colunas, tipografia ajustável, temas, destaques, notas de rodapé em popup e busca no livro. O mesmo código gera um site estático, um PWA instalável e um app desktop com Tauri.",
      stack: ["React 18", "TypeScript", "Vite", "IndexedDB", "PWA", "Tauri"],
      highlights: [
        "Parser de EPUB, motor de paginação, store de estado e persistência escritos à mão; as únicas dependências de runtime são React e JSZip.",
        "A posição de leitura é salva como offset de caractere e remapeada para o layout atual, então não se perde ao trocar fonte, girar a tela ou mudar de modo.",
        "Livros, capas, progresso e destaques ficam no IndexedDB; nada sai do dispositivo.",
      ],
      links: [
        { href: "https://lignoreader.netlify.app/", label: "Ver Projeto" },
        { href: "https://github.com/LandsBitt/Ligno", label: "GitHub" },
      ],
    },
  },
  {
    id: "oficina-box23",
    image: "/Imagens/Box23.png",
    alt: "Site da Oficina Box23 no desktop e no celular",
    title: "Oficina Box23",
    summary:
      "Site institucional para a Oficina Box23, oficina mecânica em Pindamonhangaba.",
    popup: {
      title: "Oficina Box23",
      description:
        "Site institucional da Oficina Box23, oficina mecânica em Pindamonhangaba. Layout moderno e responsivo, com apresentação da empresa, catálogo de serviços, CTA direto para o WhatsApp e formulário de contato integrado ao Telegram via Netlify Functions.",
      stack: ["React", "Vite", "Tailwind CSS", "Netlify Functions"],
      links: [{ href: "https://box23.netlify.app/", label: "Ver Projeto" }],
    },
  },
  {
    id: "mochila-launcher",
    image: "/Imagens/Mochila.png",
    alt: "Mochila Launcher mostrando a grade de capas e a tela de detalhes de um jogo",
    title: "Mochila Launcher",
    badge: "Beta",
    summary:
      "Launcher de jogos portátil para Windows que roda direto do HD externo, sem instalação.",
    popup: {
      title: "Mochila Launcher",
      description:
        "Launcher de jogos que vive no HD externo junto com os jogos. Mostra o acervo numa grade de capas, encontra sozinho o executável certo de cada pasta e abre o jogo. É um único executável de ~400 KB, sem instalador, sem registro e sem serviço em segundo plano: todo caminho é salvo relativo à pasta do launcher, então o HD funciona em qualquer PC, mesmo quando a letra do drive muda.",
      stack: ["C#", ".NET Framework 4.8", "WinForms", "SteamGridDB API", "XInput"],
      highlights: [
        "Scanner que encontra o executável de cada jogo e ignora instaladores e redistribuíveis, com revisão antes de salvar.",
        "Capas baixadas da API do SteamGridDB, histórico de tempo jogado, notas, tags e navegação por controle.",
        "Enquanto o jogo roda, o launcher fica escondido usando 0 ms de CPU e cerca de 4 MB de RAM.",
        "1124 testes automatizados embutidos na build de desenvolvimento.",
      ],
      links: [
        {
          href: "https://github.com/LandsBitt/mochila-launcher/releases",
          label: "Baixar",
          icon: "bx-download",
        },
        { href: "https://github.com/LandsBitt/mochila-launcher", label: "GitHub" },
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
        { href: "https://unitau.br/foconamente/", label: "Ver Projeto" },
        { href: "#", label: "Certificado" },
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
          label: "GitHub",
        },
      ],
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
          label: "GitHub",
        },
      ],
    },
  },
];

const gridContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Portfolio() {
  const [activePopup, setActivePopup] = useState(null);

  const closePopup = () => setActivePopup(null);

  useEffect(() => {
    document.body.style.overflow = activePopup ? "hidden" : "";
    if (activePopup) window.__lenis?.stop();
    return () => {
      document.body.style.overflow = "";
      window.__lenis?.start();
    };
  }, [activePopup]);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") closePopup();
    };
    if (activePopup) {
      window.addEventListener("keydown", handleEscape);
    }
    return () => window.removeEventListener("keydown", handleEscape);
  }, [activePopup]);

  const activeIndex = projects.findIndex((p) => p.id === activePopup);
  const activeProject = projects[activeIndex];

  return (
    <section
      className="portfolio"
      id="portfolio"
      aria-labelledby="portfolio-title"
    >
      <motion.h2
        id="portfolio-title"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        Últimos <span>Projetos</span>
      </motion.h2>
      <motion.div
        className="portfolio-container"
        variants={gridContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        {projects.map((project) => (
          <motion.div
            key={project.id}
            className="portfolio-box"
            variants={cardVariant}
            layoutId={`card-${project.id}`}
            data-cur="view"
            whileHover={{ y: -12 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src={project.image}
              alt={project.alt}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 450px"
              style={{ objectFit: "cover" }}
              priority={project.id === "ligno"}
            />
            <div className="portfolio-layer">
              <h4>
                {project.title}
                {project.badge && (
                  <span className="portfolio-badge">{project.badge}</span>
                )}
              </h4>
              <p>{project.summary}</p>
              <button
                type="button"
                className="btn saiba-mais"
                onClick={() => setActivePopup(project.id)}
                data-cur="view"
              >
                Saiba Mais
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <AnimatePresence>
        {activeProject && (
          <motion.div
            key={`${activeProject.id}-popup`}
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={(event) => {
              if (event.target === event.currentTarget) closePopup();
            }}
          >
            <motion.div
              className="modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby={`popup-${activeProject.id}-title`}
              initial={{ opacity: 0, y: 32, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.98 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <button
                type="button"
                className="modal__close"
                aria-label="Fechar"
                onClick={closePopup}
                data-cur="fechar"
                autoFocus
              >
                <i className="bx bx-x" aria-hidden="true"></i>
              </button>

              <div className="modal__media">
                <Image
                  src={activeProject.image}
                  alt={activeProject.alt}
                  fill
                  sizes="(max-width: 860px) 100vw, 420px"
                  style={{ objectFit: "cover" }}
                />
              </div>

              <div className="modal__body">
                <div className="modal__scroll" data-lenis-prevent>
                  <span className="modal__eyebrow">
                    Projeto {String(activeIndex + 1).padStart(2, "0")}
                    {activeProject.badge && ` · ${activeProject.badge}`}
                  </span>
                  <h3
                    id={`popup-${activeProject.id}-title`}
                    className="modal__title"
                  >
                    {activeProject.popup.title}
                  </h3>
                  <p className="modal__text">
                    {activeProject.popup.description}
                  </p>

                  {activeProject.popup.stack && (
                    <ul className="modal__tags" aria-label="Tecnologias">
                      {activeProject.popup.stack.map((tech) => (
                        <li key={tech}>{tech}</li>
                      ))}
                    </ul>
                  )}

                  {activeProject.popup.highlights && (
                    <div className="modal__section">
                      <h4 className="modal__label">Destaques técnicos</h4>
                      <ul className="modal__notes">
                        {activeProject.popup.highlights.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {activeProject.popup.endpoints && (
                    <div className="modal__section">
                      <h4 className="modal__label">Endpoints</h4>
                      <ul className="modal__endpoints">
                        {activeProject.popup.endpoints.map((endpoint) => {
                          const [method, path] = endpoint.split(" ");
                          return (
                            <li key={endpoint} className="modal__endpoint">
                              <span
                                className={`modal__method modal__method--${method.toLowerCase()}`}
                              >
                                {method}
                              </span>
                              <code>{path}</code>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}

                  {activeProject.popup.examples && (
                    <div className="modal__section">
                      <h4 className="modal__label">Exemplos com curl</h4>
                      {activeProject.popup.examples.map((example) => (
                        <div key={example.label} className="modal__code">
                          <p className="modal__code-label">{example.label}</p>
                          <pre>
                            <code>{example.code}</code>
                          </pre>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeProject.popup.notes && (
                    <div className="modal__section">
                      <h4 className="modal__label">Observações</h4>
                      <ul className="modal__notes">
                        {activeProject.popup.notes.map((note) => (
                          <li key={note}>{note}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {activeProject.popup.links?.length > 0 && (
                  <div className="modal__footer">
                    {activeProject.popup.links.map((link, index) => (
                      <a
                        key={link.href + link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`modal__action ${
                          index === 0
                            ? "modal__action--primary"
                            : "modal__action--ghost"
                        }`}
                        data-cur="open"
                      >
                        {link.label}
                        <i
                          className={`bx ${
                            link.icon ??
                            (link.href.includes("github.com")
                              ? "bxl-github"
                              : "bx-link-external")
                          }`}
                          aria-hidden="true"
                        ></i>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
