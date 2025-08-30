"use client";

import { motion, AnimatePresence, Variants } from "framer-motion";
import { usePathname } from "next/navigation";

interface PageTransitionProps {
  children: React.ReactNode;
}

const slideFadeVariants: Variants = {
  hidden: { opacity: 0, x: -50 },           // start slightly left and transparent
  enter: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeInOut" } }, // slide to place
  exit: { opacity: 0, transition: { duration: 0.4, ease: "easeInOut" } },       // fade out only
};

export default function PageTransitionWrapper({ children }: PageTransitionProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}            // triggers animation on route change
        variants={slideFadeVariants}
        initial="hidden"
        animate="enter"
        exit="exit"
        style={{ width: "100%", minHeight: "100vh" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
