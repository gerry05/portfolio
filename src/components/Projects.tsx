"use client";

import { motion } from "framer-motion";
import { projects } from "@/data/portfolio";
import { PhoneShowcase } from "@/components/PhoneShowcase";
import { Reveal, scaleIn } from "@/components/motion";

export function Projects() {
  return (
    <section
      id="work"
      className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32"
      aria-labelledby="work-heading"
    >
      <Reveal>
        <p className="font-[family-name:var(--font-mono)] text-xs tracking-[0.22em] text-accent uppercase">
          Selected work
        </p>
        <h2
          id="work-heading"
          className="mt-4 max-w-2xl font-[family-name:var(--font-display)] text-4xl leading-[1.05] font-bold tracking-[-0.03em] text-ink sm:text-5xl"
        >
          Things I&apos;ve built.
        </h2>
        <p className="mt-4 max-w-2xl text-ink-soft">
          Mobile and cross-platform products across consumer, learning, and
          utility spaces.
        </p>
      </Reveal>

      <ul className="mt-16 space-y-24 md:space-y-32">
        {projects.map((project, index) => {
          const reverse = index % 2 === 1;

          return (
            <li key={project.title}>
              <div className="grid items-center gap-10 md:grid-cols-[1fr_1.05fr] md:gap-14 lg:gap-20">
                <Reveal
                  className={reverse ? "md:order-2" : ""}
                  variants={scaleIn}
                >
                  <div className="relative flex justify-center rounded-[2rem] bg-gradient-to-b from-zinc-200/80 to-zinc-100 px-6 py-10 sm:px-10 sm:py-12">
                    <div className="pointer-events-none absolute inset-x-10 top-8 h-40 rounded-full bg-accent-bright/15 blur-3xl" />
                    <PhoneShowcase
                      src={project.image}
                      alt={`${project.title} full app screenshot`}
                      priority={index === 0}
                    />
                  </div>
                </Reveal>

                <Reveal
                  className={reverse ? "md:order-1" : ""}
                  delay={0.08}
                >
                  <span className="font-[family-name:var(--font-mono)] text-xs text-muted">
                    {String(index + 1).padStart(2, "0")} /{" "}
                    {String(projects.length).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-bold tracking-[-0.03em] text-ink sm:text-4xl">
                    {project.title}
                  </h3>
                  <p className="mt-4 max-w-md text-base leading-relaxed text-ink-soft sm:text-lg">
                    {project.description}
                  </p>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {project.tools.map((tool) => (
                      <li key={tool}>
                        <span className="skill-chip !py-1.5 !text-xs">
                          {tool}
                        </span>
                      </li>
                    ))}
                  </ul>
                  {"website" in project && project.website ? (
                    <motion.a
                      href={project.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-accent"
                      whileHover={{ x: 4 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    >
                      Visit site
                      <span aria-hidden>→</span>
                    </motion.a>
                  ) : null}
                </Reveal>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
