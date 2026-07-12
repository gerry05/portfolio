"use client";

import { projects } from "@/data/portfolio";
import type { BookSpread } from "@/components/book/types";
import { AboutRight } from "@/components/book/pages/AboutPages";
import {
  ContactLeft,
  ContactRight,
} from "@/components/book/pages/ContactPages";
import { CoverBack, CoverFront } from "@/components/book/pages/CoverPages";
import {
  ProjectLeft,
  ProjectRight,
} from "@/components/book/pages/ProjectPages";
import { SkillsLeft, SkillsRight } from "@/components/book/pages/SkillsPages";

export function buildSpreads(): BookSpread[] {
  const projectSpreads: BookSpread[] = projects.map((project, index) => ({
    id: `project-${project.title.toLowerCase().replace(/\s+/g, "-")}`,
    label: project.title,
    left: <ProjectLeft project={project} index={index} />,
    right: <ProjectRight project={project} />,
  }));

  return [
    {
      id: "cover",
      label: "Cover",
      cover: true,
      right: <CoverFront />,
      left: <CoverBack />,
    },
    {
      id: "about",
      label: "About",
      left: <CoverBack />,
      right: <AboutRight />,
    },
    {
      id: "skills",
      label: "Craft",
      left: <SkillsLeft />,
      right: <SkillsRight />,
    },
    ...projectSpreads,
    {
      id: "contact",
      label: "Available",
      left: <ContactLeft />,
      right: <ContactRight />,
    },
  ];
}
