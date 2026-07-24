"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function LenisProvider({ children }) {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      return undefined;
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.2,
    });

    gsap.registerPlugin(ScrollTrigger);

    const onScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onScroll);

    const rafTick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(rafTick);
    gsap.ticker.lagSmoothing(0);

    window.__lenis = lenis;

    return () => {
      lenis.off("scroll", onScroll);
      gsap.ticker.remove(rafTick);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  return children;
}
