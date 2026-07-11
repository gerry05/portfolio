"use client";

import { site } from "@/data/portfolio";
import {
  ParallaxLayer,
  ParallaxSection,
  Reveal,
  TextReveal,
  slideFromLeft,
  slideFromRight,
} from "@/components/motion";

export function About() {
  return (
    <ParallaxSection
      id="about"
      className="relative mx-auto max-w-6xl overflow-hidden px-5 py-24 sm:px-8 sm:py-32"
      aria-labelledby="about-heading"
    >
      <ParallaxLayer
        speed={0.35}
        className="pointer-events-none absolute -right-16 top-10 h-48 w-48 rounded-full bg-accent-soft/50 blur-3xl"
      />

      <div className="grid gap-12 md:grid-cols-[0.85fr_1.15fr] md:gap-20">
        <Reveal variants={slideFromLeft}>
          <p className="font-[family-name:var(--font-mono)] text-xs tracking-[0.22em] text-accent uppercase">
            About
          </p>
          <TextReveal
            as="h2"
            id="about-heading"
            text="Software with clarity and craft."
            delay={0.08}
            className="mt-4 font-[family-name:var(--font-display)] text-4xl leading-[1.05] font-bold tracking-[-0.03em] text-ink sm:text-5xl"
          />
        </Reveal>

        <Reveal
          variants={slideFromRight}
          delay={0.12}
          className="space-y-5 text-lg leading-relaxed text-ink-soft"
        >
          <p>{site.summary}</p>
          <p>
            Based in the Philippines, I build mobile apps with Flutter and
            websites with Next.js, with solid experience shipping backends on
            Firebase, Supabase, and Node.js. I care about performance,
            thoughtful UX, and products that feel simple on the surface.
          </p>
        </Reveal>
      </div>
    </ParallaxSection>
  );
}
