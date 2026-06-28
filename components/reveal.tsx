"use client";

import { motion, type HTMLMotionProps } from "framer-motion";

type RevealProps = HTMLMotionProps<"div"> & {
  delay?: number;
  y?: number;
  /** animate on mount instead of on scroll-into-view */
  immediate?: boolean;
};

const EASE = [0.16, 1, 0.3, 1] as const;

export function Reveal({
  children,
  delay = 0,
  y = 26,
  immediate = false,
  ...props
}: RevealProps) {
  const animateProps = immediate
    ? { animate: { opacity: 1, y: 0 } }
    : { whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-12% 0px" } };

  return (
    <motion.div
      initial={{ opacity: 0, y }}
      transition={{ duration: 0.8, delay, ease: EASE }}
      {...animateProps}
      {...props}
    >
      {children}
    </motion.div>
  );
}
