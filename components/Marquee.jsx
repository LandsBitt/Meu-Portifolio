const MARQUEE_ITEMS = [
  "Java",
  "Python",
  "JavaScript",
  "HTML",
  "CSS",
  "PostgreSQL",
  "Next.js",
  "Front-End",
  "Back-End",
  "Manutenção de PCs",
];

export default function Marquee() {
  const loop = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <section className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {loop.map((item, i) => (
          <span className="marquee__item" key={`${item}-${i}`}>
            {item}
            <span className="marquee__dot" aria-hidden="true" />
          </span>
        ))}
      </div>
    </section>
  );
}
