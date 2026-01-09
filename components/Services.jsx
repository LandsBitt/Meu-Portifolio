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
      "Sou técnico especializado em montagem, manutenção e formatação de computadores. Ofereço serviços de alta qualidade, garantindo o funcionamento ideal dos equipamentos.",
  },
];

export default function Services() {
  return (
    <section className="services" id="services" aria-labelledby="services-title">
      <h2 id="services-title">
        Meus <span>Serviços</span>
      </h2>
      <div className="services-container">
        {services.map((service, index) => (
          <div
            key={service.title}
            className="services-box"
            data-aos="zoom-in"
            data-aos-delay={(index + 1) * 100}
          >
            <i className={service.icon} aria-hidden="true"></i>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
