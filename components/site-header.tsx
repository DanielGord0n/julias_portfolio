"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, site } from "@/lib/site";

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href: string) =>
    href === "/work" ? pathname.startsWith("/work") : pathname === href;

  return (
    <header
      className={`sticky top-0 z-40 transition-colors duration-300 ${
        scrolled ? "border-b border-line bg-paper/85 backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <div className="wrap flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="font-display text-[15px] font-bold uppercase tracking-[0.16em] leading-none"
          aria-label={`${site.name} — home`}
        >
          Julia&nbsp;Schvarzberg
        </Link>

        {/* desktop nav */}
        <nav className="hidden items-center gap-8 sm:flex" aria-label="Primary">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`label link-underline !text-[0.74rem] ${
                isActive(item.href) ? "!text-ink" : "hover:!text-ink"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="label flex items-center gap-2 sm:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {/* mobile menu */}
      {open && (
        <div id="mobile-menu" className="border-t border-line bg-paper sm:hidden">
          <nav className="wrap flex flex-col py-4" aria-label="Mobile">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`py-3 font-display text-2xl font-bold tracking-tight ${
                  isActive(item.href) ? "text-accent" : ""
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
