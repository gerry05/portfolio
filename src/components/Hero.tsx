"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { site } from "@/data/portfolio";
import { withBasePath } from "@/lib/paths";
import { Magnetic, TextReveal, ease } from "@/components/motion";

export function Hero() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 140]);
  const bgScale = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? [1, 1] : [1, 1.12],
  );
  const contentY = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? [0, 0] : [0, 80],
  );
  const contentOpacity = useTransform(
    scrollYProgress,
    [0, 0.55],
    reduce ? [1, 1] : [1, 0],
  );
  const smoothBgY = useSpring(bgY, { stiffness: 80, damping: 28 });
  const smoothContentY = useSpring(contentY, { stiffness: 90, damping: 30 });

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative isolate flex min-h-[100svh] items-end overflow-hidden"
    >
      <div className="absolute inset-0" style={{ background: "var(--hero-mesh)" }} />

      <motion.div
        className="absolute inset-0"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease }}
      >
        <motion.div
          className="absolute inset-0 will-change-transform"
          style={{ y: smoothBgY, scale: bgScale }}
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
      </motion.div>

      <motion.div
        className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-16 pt-28 sm:px-8 sm:pb-24"
        style={{ y: smoothContentY, opacity: contentOpacity }}
      >
        <motion.p
          className="font-[family-name:var(--font-mono)] text-xs tracking-[0.24em] text-accent-bright uppercase sm:text-sm"
          initial={reduce ? false : { opacity: 0, y: 18, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7, ease }}
        >
          {site.title} · {site.location}
        </motion.p>

        {reduce ? (
          <h1 className="mt-5 max-w-4xl font-[family-name:var(--font-display)] text-[clamp(2.8rem,11vw,6.75rem)] leading-[0.92] font-bold tracking-[-0.04em] text-white">
            {site.name}
          </h1>
        ) : (
          <TextReveal
            as="h1"
            text={site.name}
            delay={0.12}
            immediate
            className="mt-5 max-w-4xl font-[family-name:var(--font-display)] text-[clamp(2.8rem,11vw,6.75rem)] leading-[0.92] font-bold tracking-[-0.04em] text-white"
          />
        )}

        <motion.p
          className="mt-6 max-w-lg text-lg text-white/80 sm:text-xl"
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease }}
        >
          {site.tagline}
        </motion.p>

        <motion.div
          className="mt-9 flex flex-wrap items-center gap-3"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.48, ease }}
        >
          <Magnetic strength={0.18}>
            <a href="#work" className="btn-primary">
              View selected work
            </a>
          </Magnetic>
          <Magnetic strength={0.18}>
            <a
              href={site.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
            >
              Download resume
            </a>
          </Magnetic>
        </motion.div>

        <motion.a
          href="#about"
          className="scroll-cue mt-14 hidden items-center gap-3 text-white/45 sm:inline-flex"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.85, duration: 0.8 }}
          aria-label="Scroll to about"
        >
          <span className="scroll-cue__track" aria-hidden>
            <span className="scroll-cue__dot" />
          </span>
          <span className="font-[family-name:var(--font-mono)] text-[11px] tracking-[0.2em] uppercase">
            Scroll
          </span>
        </motion.a>
      </motion.div>
    </section>
  );
}
