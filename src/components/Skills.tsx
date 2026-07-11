"use client";

import { skills } from "@/data/portfolio";
import {
  Magnetic,
  ParallaxLayer,
  ParallaxSection,
  Reveal,
  Stagger,
  StaggerItem,
  TextReveal,
  scaleIn,
} from "@/components/motion";

export function Skills() {
  return (
    <ParallaxSection
      id="skills"
      className="relative overflow-hidden border-y border-line bg-bg-elevated/70"
      aria-labelledby="skills-heading"
    >
      <ParallaxLayer
        speed={0.45}
        className="pointer-events-none absolute -top-24 right-0 h-64 w-64 rounded-full bg-accent-soft/60 blur-3xl"
      />
      <ParallaxLayer
        speed={-0.2}
        className="pointer-events-none absolute -bottom-20 -left-10 h-52 w-52 rounded-full bg-sky-200/30 blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
        <Reveal>
          <p className="font-[family-name:var(--font-mono)] text-xs tracking-[0.22em] text-accent uppercase">
            Skills
          </p>
          <TextReveal
            as="h2"
            id="skills-heading"
            text="Tools I use to ship."
            delay={0.06}
            className="mt-4 max-w-xl font-[family-name:var(--font-display)] text-4xl leading-[1.05] font-bold tracking-[-0.03em] text-ink sm:text-5xl"
          />
          <p className="mt-4 max-w-2xl text-ink-soft">
            A focused stack for mobile products—from UI to data layer.
          </p>
        </Reveal>

        <Stagger
          className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4"
          delay={0.1}
          delayChildren={0.12}
        >
          {skills.map((group) => (
            <StaggerItem key={group.category} variants={scaleIn}>
              <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-ink">
                {group.category}
              </h3>
              <ul className="mt-5 flex flex-wrap gap-2.5">
                {group.items.map((item) => (
                  <li key={item}>
                    <Magnetic strength={0.35}>
                      <span className="skill-chip inline-block">{item}</span>
                    </Magnetic>
                  </li>
                ))}
              </ul>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </ParallaxSection>
  );
}
