import Image from "next/image";

export default function About() {
  return (
    <section className="about" id="about" aria-labelledby="about-title">
      <div className="about-img" data-aos="fade-right" data-aos-delay="100">
        <Image
          src="/Imagens/Perfil.png"
          alt="Sobre mim"
          width={313}
          height={313}
        />
      </div>
      <div className="about-content" data-aos="fade-left" data-aos-delay="100">
        <h3>Sobre mim</h3>
        <h1 id="about-title">
          Estudante de <span>Análise e Desenvolvimento de Sistemas</span>
        </h1>
        <p>
          Sou um profissional apaixonado por tecnologia, com facilidade para
          trabalhar em equipe e me adaptar a novos desafios. Sempre de mente
          aberta a novas soluções, tenho experiência tanto no desenvolvimento
          web (Front-End e Back-End) quanto em aplicações desktop com Java.
          Também possuo experiência básica em PostgreSQL e sou especializado em
          montagem e manutenção de computadores. Estou sempre em evolução nos
          meus estudos de linguagens como Java e Python.
        </p>
      </div>
    </section>
  );
}
