"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { site } from "@/data/portfolio";
import {
  Magnetic,
  Reveal,
  Stagger,
  StaggerItem,
  TextReveal,
  fadeUp,
  scaleIn,
} from "@/components/motion";

const social = [
  { label: "GitHub", href: site.social.github },
  { label: "LinkedIn", href: site.social.linkedin },
  { label: "Facebook", href: site.social.facebook },
];

export function Contact() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const orbLeftY = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? [0, 0] : [60, -80],
  );
  const orbRightY = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? [0, 0] : [-40, 70],
  );
  const contentScale = useTransform(
    scrollYProgress,
    [0.05, 0.35],
    reduce ? [1, 1] : [0.96, 1],
  );

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative overflow-hidden bg-ink text-white"
      aria-labelledby="contact-heading"
    >
      <motion.div
        className="pointer-events-none absolute -left-20 top-0 h-72 w-72 rounded-full bg-accent/30 blur-3xl"
        style={{ y: orbLeftY }}
      />
      <motion.div
        className="pointer-events-none absolute -right-16 bottom-0 h-64 w-64 rounded-full bg-sky-400/20 blur-3xl"
        style={{ y: orbRightY }}
      />

      <motion.div
        className="relative mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32"
        style={{ scale: contentScale }}
      >
        <Reveal variants={scaleIn}>
          <p className="font-[family-name:var(--font-mono)] text-xs tracking-[0.22em] text-accent-bright uppercase">
            Contact
          </p>
          <TextReveal
            as="h2"
            id="contact-heading"
            text="Let's build something useful."
            delay={0.1}
            className="mt-4 max-w-2xl font-[family-name:var(--font-display)] text-4xl leading-[1.05] font-bold tracking-[-0.03em] sm:text-6xl"
          />
          <p className="mt-5 max-w-xl text-lg text-white/65">
            Open to freelance work, collaborations, and full-time opportunities
            in mobile and cross-platform development.
          </p>
        </Reveal>

        <Reveal delay={0.15} className="mt-10 flex flex-wrap gap-3">
          <Magnetic strength={0.2}>
            <a
              href={site.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Connect on LinkedIn
            </a>
          </Magnetic>
          <Magnetic strength={0.2}>
            <a
              href={site.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
            >
              View resume
            </a>
          </Magnetic>
        </Reveal>

        <Stagger className="mt-14 flex flex-wrap gap-8" delay={0.12} delayChildren={0.2}>
          {social.map((item) => (
            <StaggerItem key={item.label} variants={fadeUp}>
              <Magnetic strength={0.3}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-white/55 transition hover:text-white"
                >
                  {item.label}
                </a>
              </Magnetic>
            </StaggerItem>
          ))}
        </Stagger>
      </motion.div>
    </section>
  );
}
