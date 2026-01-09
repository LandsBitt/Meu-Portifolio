"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";

const particlesConfig = {
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 800,
      },
    },
    color: {
      value: "#00eeff",
    },
    shape: {
      type: "circle",
    },
    opacity: {
      value: 0.5,
      random: true,
    },
    size: {
      value: 3,
      random: true,
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: "#00eeff",
      opacity: 0.4,
      width: 1,
    },
    move: {
      enable: true,
      speed: 2,
      direction: "none",
      random: true,
      straight: false,
      out_mode: "out",
      bounce: false,
    },
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: {
        enable: true,
        mode: "grab",
      },
      onclick: {
        enable: true,
        mode: "push",
      },
    },
  },
};

export default function ExternalScripts() {
  const [ready, setReady] = useState({
    aos: false,
    gsap: false,
    scrollTrigger: false,
    particles: false,
  });
  const initializedRef = useRef(false);

  useEffect(() => {
    if (initializedRef.current) {
      return;
    }

    if (!ready.aos || !ready.gsap || !ready.scrollTrigger || !ready.particles) {
      return;
    }

    initializedRef.current = true;

    // Inicializa as bibliotecas externas quando todas estiverem carregadas.
    if (window.AOS) {
      window.AOS.init({
        duration: 800,
        once: true,
        easing: "ease-in-out",
        offset: 100,
      });
    }

    if (window.gsap && window.ScrollTrigger) {
      window.gsap.registerPlugin(window.ScrollTrigger);
      window.gsap.utils.toArray("section").forEach((section) => {
        window.gsap.from(section, {
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none none",
          },
          opacity: 0,
          y: 50,
          duration: 1,
          ease: "power2.out",
        });
      });
    }

    if (window.particlesJS) {
      window.particlesJS("particles-js", particlesConfig);
    }
  }, [ready]);

  return (
    <>
      <Script
        src="https://unpkg.com/aos@2.3.1/dist/aos.js"
        strategy="afterInteractive"
        onLoad={() => setReady((prev) => ({ ...prev, aos: true }))}
      />
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.4/gsap.min.js"
        strategy="afterInteractive"
        onLoad={() => setReady((prev) => ({ ...prev, gsap: true }))}
      />
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.4/ScrollTrigger.min.js"
        strategy="afterInteractive"
        onLoad={() => setReady((prev) => ({ ...prev, scrollTrigger: true }))}
      />
      <Script
        src="https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js"
        strategy="afterInteractive"
        onLoad={() => setReady((prev) => ({ ...prev, particles: true }))}
      />
    </>
  );
}
