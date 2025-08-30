"use client";

import { motion, AnimatePresence, Variants } from "framer-motion";
import { usePathname } from "next/navigation";

interface PageTransitionProps {
  children: React.ReactNode;
}

const smoothSlideLeftVariants: Variants = {
  hidden: { x: -100 }, // start slightly off-screen left
  enter: {
    x: 0,
    transition: {
      duration: 0.7,               // a bit slower for smoothness
      ease: [0.42, 0, 0.58, 1],    // natural "easeInOut" cubic bezier
    },
  },
  exit: { x: 0 }, // no exit animation needed
};

export default function PageTransitionWrapper({ children }: PageTransitionProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname} // triggers animation on route change
        variants={smoothSlideLeftVariants}
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
