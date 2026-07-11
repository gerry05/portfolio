"use client";

import { skills } from "@/data/portfolio";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";

export function Skills() {
  return (
    <section
      id="skills"
      className="relative overflow-hidden border-y border-line bg-bg-elevated/70"
      aria-labelledby="skills-heading"
    >
      <div className="pointer-events-none absolute -top-24 right-0 h-64 w-64 rounded-full bg-accent-soft/60 blur-3xl" />
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
        <Reveal>
          <p className="font-[family-name:var(--font-mono)] text-xs tracking-[0.22em] text-accent uppercase">
            Skills
          </p>
          <h2
            id="skills-heading"
            className="mt-4 max-w-xl font-[family-name:var(--font-display)] text-4xl leading-[1.05] font-bold tracking-[-0.03em] text-ink sm:text-5xl"
          >
            Tools I use to ship.
          </h2>
          <p className="mt-4 max-w-2xl text-ink-soft">
            A focused stack for mobile products—from UI to data layer.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {skills.map((group, index) => (
            <Reveal key={group.category} delay={index * 0.08}>
              <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-ink">
                {group.category}
              </h3>
              <Stagger className="mt-5 flex flex-wrap gap-2.5" delay={0.06}>
                {group.items.map((item) => (
                  <StaggerItem key={item}>
                    <span className="skill-chip">{item}</span>
                  </StaggerItem>
                ))}
              </Stagger>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
