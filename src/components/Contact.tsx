"use client";

import { site } from "@/data/portfolio";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";

const social = [
  { label: "GitHub", href: site.social.github },
  { label: "LinkedIn", href: site.social.linkedin },
  { label: "Facebook", href: site.social.facebook },
];

export function Contact() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-ink text-white"
      aria-labelledby="contact-heading"
    >
      <div className="pointer-events-none absolute -left-20 top-0 h-72 w-72 rounded-full bg-accent/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 bottom-0 h-64 w-64 rounded-full bg-sky-400/20 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
        <Reveal>
          <p className="font-[family-name:var(--font-mono)] text-xs tracking-[0.22em] text-accent-bright uppercase">
            Contact
          </p>
          <h2
            id="contact-heading"
            className="mt-4 max-w-2xl font-[family-name:var(--font-display)] text-4xl leading-[1.05] font-bold tracking-[-0.03em] sm:text-6xl"
          >
            Let&apos;s build something useful.
          </h2>
          <p className="mt-5 max-w-xl text-lg text-white/65">
            Open to freelance work, collaborations, and full-time opportunities
            in mobile and cross-platform development.
          </p>
        </Reveal>

        <Reveal delay={0.12} className="mt-10 flex flex-wrap gap-3">
          <a
            href={site.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Connect on LinkedIn
          </a>
          <a
            href={site.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost"
          >
            View resume
          </a>
        </Reveal>

        <Stagger className="mt-14 flex flex-wrap gap-8" delay={0.1}>
          {social.map((item) => (
            <StaggerItem key={item.label}>
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-white/55 transition hover:text-white"
              >
                {item.label}
              </a>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
