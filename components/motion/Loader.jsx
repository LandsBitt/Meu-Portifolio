"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const DURATION_MS = 1500;
const FAILSAFE_MS = 3200;

export default function Loader() {
  const [mounted, setMounted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setMounted(true);

    if (typeof window === "undefined") {
      return undefined;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      setVisible(false);
      return undefined;
    }

    setVisible(true);
    document.body.style.overflow = "hidden";
    const start = performance.now();
    let rafId = 0;
    let hideTimer = 0;
    let failsafeTimer = 0;
    let done = false;

    const tick = () => {
      const elapsed = performance.now() - start;
      const pct = Math.min(100, Math.round((elapsed / DURATION_MS) * 100));
      setProgress(pct);
      if (elapsed >= DURATION_MS) {
        done = true;
        hideTimer = window.setTimeout(() => setVisible(false), 220);
        return;
      }
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    failsafeTimer = window.setTimeout(() => {
      setProgress(100);
      setVisible(false);
    }, FAILSAFE_MS);

    return () => {
      if (!done) cancelAnimationFrame(rafId);
      if (hideTimer) clearTimeout(hideTimer);
      if (failsafeTimer) clearTimeout(failsafeTimer);
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (!visible) {
      document.body.style.overflow = "";
    }
  }, [visible]);

  if (!mounted) {
    return null;
  }

  const label = String(progress).padStart(3, "0");

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="site-loader"
          role="status"
          aria-live="polite"
          aria-label={`Carregando ${progress}%`}
          initial={{ y: 0 }}
          animate={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="site-loader__inner">
            <span className="site-loader__count" aria-hidden="true">
              {label}
            </span>
            <span className="site-loader__bar" aria-hidden="true">
              <span
                className="site-loader__bar-fill"
                style={{ transform: `scaleX(${progress / 100})` }}
              />
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
