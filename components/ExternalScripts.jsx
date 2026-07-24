"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";

const particlesConfig = {
  particles: {
    number: { value: 80, density: { enable: true, value_area: 800 } },
    color: { value: "#00eeff" },
    shape: { type: "circle" },
    opacity: { value: 0.5, random: true },
    size: { value: 3, random: true },
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
      onhover: { enable: true, mode: "grab" },
      onclick: { enable: true, mode: "push" },
    },
  },
};

export default function ExternalScripts() {
  const [particlesReady, setParticlesReady] = useState(false);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (initializedRef.current || !particlesReady) return;
    if (typeof window === "undefined" || !window.particlesJS) return;
    initializedRef.current = true;
    window.particlesJS("particles-js", particlesConfig);
  }, [particlesReady]);

  return (
    <Script
      src="https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js"
      strategy="afterInteractive"
      onLoad={() => setParticlesReady(true)}
    />
  );
}
