"use client";

import { useEffect, useRef, useState } from "react";

const LERP = 0.15;

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const target = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const rafRef = useRef(null);
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const hoverCapable = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!hoverCapable || prefersReducedMotion) {
      setEnabled(false);
      return undefined;
    }

    setEnabled(true);

    const onMove = (e) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }
    };

    const loop = () => {
      ringPos.current.x += (target.current.x - ringPos.current.x) * LERP;
      ringPos.current.y += (target.current.y - ringPos.current.y) * LERP;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`;
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    const interactiveSelector = 'a, button, [data-cur], input, textarea, label[for], select, summary';

    const onOver = (e) => {
      const t = e.target.closest(interactiveSelector);
      if (!t) return;
      setHovering(true);
      const cur = t.getAttribute("data-cur");
      setLabel(cur && cur !== "true" ? cur : "");
    };
    const onOut = (e) => {
      const t = e.target.closest(interactiveSelector);
      if (!t) return;
      setHovering(false);
      setLabel("");
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div className="cursor" aria-hidden="true">
      <div
        ref={dotRef}
        className={`cursor__dot${hovering ? " is-hover" : ""}`}
      />
      <div
        ref={ringRef}
        className={`cursor__ring${hovering ? " is-hover" : ""}${
          label ? " has-label" : ""
        }`}
      >
        {label && <span className="cursor__label">{label}</span>}
      </div>
    </div>
  );
}
