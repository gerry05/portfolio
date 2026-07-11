"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { site } from "@/data/portfolio";
import { withBasePath } from "@/lib/paths";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      id="top"
      className="relative isolate flex min-h-[100svh] items-end overflow-hidden"
    >
      <div className="absolute inset-0" style={{ background: "var(--hero-mesh)" }} />

      <motion.div
        className="absolute inset-0"
        initial={reduce ? false : { scale: 1.08, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.4, ease }}
      >
        <Image
          src={withBasePath("/images/me.jpg")}
          alt=""
          fill
          priority
          className="object-cover object-[center_18%] opacity-45 mix-blend-luminosity"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
      </motion.div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-16 pt-28 sm:px-8 sm:pb-24">
        <motion.p
          className="font-[family-name:var(--font-mono)] text-xs tracking-[0.24em] text-accent-bright uppercase sm:text-sm"
          initial={reduce ? false : { opacity: 0, y: 18, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7, ease }}
        >
          {site.title} · {site.location}
        </motion.p>

        <motion.h1
          className="mt-5 max-w-4xl font-[family-name:var(--font-display)] text-[clamp(2.8rem,11vw,6.75rem)] leading-[0.92] font-bold tracking-[-0.04em] text-white"
          initial={reduce ? false : { opacity: 0, y: 28, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.85, delay: 0.1, ease }}
        >
          {site.name}
        </motion.h1>

        <motion.p
          className="mt-6 max-w-lg text-lg text-white/80 sm:text-xl"
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.22, ease }}
        >
          {site.tagline}
        </motion.p>

        <motion.div
          className="mt-9 flex flex-wrap items-center gap-3"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.34, ease }}
        >
          <a href="#work" className="btn-primary">
            View selected work
          </a>
          <a
            href={site.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost"
          >
            Download resume
          </a>
        </motion.div>

        <motion.div
          className="mt-14 hidden items-center gap-3 text-white/45 sm:flex"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          <span className="h-px w-10 bg-white/30" />
          <span className="font-[family-name:var(--font-mono)] text-[11px] tracking-[0.2em] uppercase">
            Scroll
          </span>
        </motion.div>
      </div>
    </section>
  );
}
