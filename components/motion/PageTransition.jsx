"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

const overlayVariants = {
  initial: { y: "100%" },
  enter: { y: "-100%" },
};

export default function PageTransition({ children }) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {mounted && (
        <AnimatePresence mode="wait">
          <motion.div
            key={`overlay-${pathname}`}
            className="page-transition"
            initial={overlayVariants.initial}
            animate={overlayVariants.enter}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          />
        </AnimatePresence>
      )}
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={false}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
