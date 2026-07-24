"use client";

import { useEffect, useRef, useState } from "react";

const skills = [
  { icon: "bx bxl-java", label: "Java", levelClass: "java" },
  { icon: "bx bxl-postgresql", label: "PostgreSQL", levelClass: "postgresql" },
  { icon: "bx bxl-python", label: "Python", levelClass: "python" },
  { icon: "bx bxl-html5", label: "HTML", levelClass: "html" },
  { icon: "bx bxl-css3", label: "CSS", levelClass: "css" },
  { icon: "bx bxl-javascript", label: "JavaScript", levelClass: "javascript" },
];

export default function Skills() {
  const containerRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="skills" id="skills" aria-labelledby="skills-title">
      <h2 id="skills-title">
        Minhas <span>Habilidades</span>
      </h2>
      <div className="skills-container" ref={containerRef}>
        {skills.map((skill, index) => (
          <div
            key={skill.label}
            className={`skill-box${visible ? " is-visible" : ""}`}
            style={{ transitionDelay: `${index * 70}ms` }}
            data-cur="tech"
          >
            <i className={skill.icon} aria-hidden="true"></i>
            <h3>{skill.label}</h3>
            <div className={`progress-bar ${skill.levelClass}`}></div>
          </div>
        ))}
      </div>
    </section>
  );
}
