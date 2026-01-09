import Image from "next/image";

export default function Home() {
  return (
    <section className="home" id="home" aria-labelledby="home-title">
      <div className="home-content" data-aos="fade-right" data-aos-delay="300">
        <h3>Olá, sou</h3>
        <h1 id="home-title">Roland Bittencourt</h1>
        <h3>
          Técnico de{" "}
          <span>Montagem e manutenção de Computadores</span> e Graduando em{" "}
          <span>Tecnologia em Análise e Desenvolvimento de sistemas</span>
        </h3>

        <div className="social-media">
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
        </div>

        <div>
          <a
            href="https://drive.google.com/uc?export=download&id=1iCUbbQ-RUVfq2AUekSB5e4RQU1_ooWpW"
            className="btn"
            target="_blank"
            rel="noopener noreferrer"
          >
            Download CV
          </a>
        </div>
      </div>

      <div className="home-img" data-aos="fade-left" data-aos-delay="350">
        <Image
          src="/Imagens/Perfil.png"
          alt="Foto de perfil"
          width={313}
          height={313}
          priority
        />
      </div>
    </section>
  );
}
