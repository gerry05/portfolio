"use client";

import { site } from "@/data/portfolio";
import { Reveal } from "@/components/motion";

export function About() {
  return (
    <section
      id="about"
      className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32"
      aria-labelledby="about-heading"
    >
      <div className="grid gap-12 md:grid-cols-[0.85fr_1.15fr] md:gap-20">
        <Reveal>
          <p className="font-[family-name:var(--font-mono)] text-xs tracking-[0.22em] text-accent uppercase">
            About
          </p>
          <h2
            id="about-heading"
            className="mt-4 font-[family-name:var(--font-display)] text-4xl leading-[1.05] font-bold tracking-[-0.03em] text-ink sm:text-5xl"
          >
            Software with clarity and craft.
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="space-y-5 text-lg leading-relaxed text-ink-soft">
          <p>{site.summary}</p>
          <p>
            Based in the Philippines, I build mobile apps with Flutter and
            websites with Next.js, with solid experience shipping backends on
            Firebase, Supabase, and Node.js. I care about performance,
            thoughtful UX, and products that feel simple on the surface.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
