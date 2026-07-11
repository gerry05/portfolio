"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { site } from "@/data/portfolio";

const links = [
  { href: "#work", label: "Work" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

export function Header() {
  const [overHero, setOverHero] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("top");

    const update = () => {
      if (!hero) {
        setOverHero(window.scrollY < 80);
        return;
      }
      const heroBottom = hero.getBoundingClientRect().bottom;
      setOverHero(heroBottom > 72);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <header
      data-on-hero={overHero ? "true" : "false"}
      className={`site-header fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        overHero
          ? "bg-transparent"
          : "border-b border-line bg-white/80 shadow-[0_8px_30px_rgba(10,10,11,0.04)] backdrop-blur-xl"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:h-[4.5rem] sm:px-8">
        <a href="#top" className="site-header__brand font-[family-name:var(--font-display)] text-xl font-bold tracking-tight">
          {site.brand}
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="site-header__link text-sm font-medium">
              {link.label}
            </a>
          ))}
          <a
            href={site.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="site-header__resume rounded-full px-4 py-1.5 text-sm font-semibold"
          >
            Resume
          </a>
        </nav>

        <button
          type="button"
          className="site-header__menu inline-flex h-10 w-10 items-center justify-center rounded-full border md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="flex w-4 flex-col gap-1.5">
            <span
              className={`site-header__burger h-0.5 w-full transition ${
                open ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`site-header__burger h-0.5 w-full transition ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`site-header__burger h-0.5 w-full transition ${
                open ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="border-t border-line bg-white/95 px-5 py-4 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-1">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="rounded-lg px-2 py-3 text-base font-medium text-ink"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <a
                href={site.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg px-2 py-3 text-base font-semibold text-accent"
                onClick={() => setOpen(false)}
              >
                Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
