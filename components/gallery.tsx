"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { GalleryItem } from "@/lib/projects";
import { imgSize } from "@/lib/img";
import { Reveal } from "./reveal";

export function Gallery({ items }: { items: GalleryItem[] }) {
  const [active, setActive] = useState<number | null>(null);
  const close = useCallback(() => setActive(null), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (active !== null && (e.key === "ArrowRight" || e.key === "ArrowLeft")) {
        setActive((i) =>
          i === null ? i : (i + (e.key === "ArrowRight" ? 1 : items.length - 1)) % items.length,
        );
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, close, items.length]);

  return (
    <>
      <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2">
        {items.map((item, i) => {
          const { w, h } = imgSize(item.src);
          return (
            <Reveal key={item.src} className={item.wide ? "sm:col-span-2" : ""}>
              <figure>
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  className="group block w-full cursor-zoom-in overflow-hidden bg-paper-2"
                  aria-label={`Enlarge: ${item.caption ?? item.alt}`}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    width={w}
                    height={h}
                    sizes={item.wide ? "(min-width: 1024px) 1200px, 100vw" : "(min-width: 640px) 46vw, 100vw"}
                    className="h-auto w-full transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                  />
                </button>
                {item.caption && (
                  <figcaption className="mt-3 text-sm text-muted">{item.caption}</figcaption>
                )}
              </figure>
            </Reveal>
          );
        })}
      </div>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-ink/92 p-4 backdrop-blur-sm sm:p-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          >
            <button
              type="button"
              onClick={close}
              className="absolute right-5 top-5 text-xs uppercase tracking-[0.2em] text-paper/80 hover:text-paper"
            >
              Close ✕
            </button>
            <motion.figure
              key={active}
              className="flex max-h-full max-w-6xl flex-col items-center"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={items[active].src}
                alt={items[active].alt}
                width={imgSize(items[active].src).w}
                height={imgSize(items[active].src).h}
                sizes="100vw"
                className="h-auto max-h-[82vh] w-auto object-contain"
              />
              {items[active].caption && (
                <figcaption className="mt-4 text-center text-sm text-paper/70">
                  {items[active].caption}
                </figcaption>
              )}
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
