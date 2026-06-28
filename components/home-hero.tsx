"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { site } from "@/lib/site";

const EASE = [0.16, 1, 0.3, 1] as const;

export function HomeHero() {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--x", `${((e.clientX - r.left) / r.width) * 100}%`);
    el.style.setProperty("--y", `${((e.clientY - r.top) / r.height) * 100}%`);
  };

  return (
    <section
      ref={ref}
      onPointerMove={onMove}
      className="relative isolate flex min-h-[86vh] items-center overflow-hidden"
      style={{ "--x": "50%", "--y": "38%" } as React.CSSProperties}
    >
      {/* cursor-follow light — echoes "light shapes perspective" */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-70 transition-opacity duration-500"
        style={{
          background:
            "radial-gradient(38vw 38vw at var(--x) var(--y), rgba(180,88,60,0.16), rgba(217,138,110,0.05) 40%, transparent 62%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60vw 60vw at 50% 120%, rgba(23,20,15,0.05), transparent 60%)",
        }}
      />

      <div className="wrap w-full py-20">
        <motion.p
          className="label"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          {site.role} — Portfolio
        </motion.p>

        <h1 className="display mt-6 text-[clamp(2.9rem,12vw,11rem)]">
          {["Julia", "Schvarzberg"].map((word, i) => (
            <span key={word} className="block overflow-hidden">
              <motion.span
                className="block"
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1, delay: 0.08 + i * 0.09, ease: EASE }}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.div
          className="mt-8 flex max-w-3xl flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
        >
          <p className="max-w-md font-serif text-xl italic leading-snug text-ink-soft sm:text-2xl">
            {site.tagline}
          </p>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-7 left-0 right-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <div className="wrap flex items-center gap-3 text-muted">
          <span className="label">Selected work</span>
          <span className="h-px w-12 bg-line" />
          <motion.span
            aria-hidden
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            ↓
          </motion.span>
        </div>
      </motion.div>
    </section>
  );
}
