"use client";

import Image from "next/image";
import { useState } from "react";
import type { projects } from "@/data/portfolio";
import { ImageLightbox } from "@/components/ImageLightbox";
import { withBasePath } from "@/lib/paths";

type Project = (typeof projects)[number];

export function ProjectLeft({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const chapter = index + 3;

  return (
    <div className="book-page-inner">
      <p className="book-kicker">Chapter {roman(chapter)}</p>
      <h2 className="book-heading book-heading--sm">{project.title}</h2>
      <p className="book-body">{project.description}</p>
      <p className="book-tools">{project.tools.join(" · ")}</p>
      {"website" in project && project.website ? (
        <a
          className="book-cta book-cta--ghost"
          href={project.website}
          target="_blank"
          rel="noopener noreferrer"
        >
          Visit project
        </a>
      ) : null}
    </div>
  );
}

export function ProjectRight({ project }: { project: Project }) {
  const [lightbox, setLightbox] = useState(false);
  const [active, setActive] = useState(0);
  const images = project.images;
  const current = images[active] ?? images[0];
  const multi = images.length > 1;

  function go(delta: number) {
    setActive((i) => (i + delta + images.length) % images.length);
  }

  return (
    <div className="book-page-inner book-page-inner--media">
      <p className="book-kicker">Plate</p>
      <div className="book-plate-row">
        {multi ? (
          <button
            type="button"
            className="book-plate-arrow"
            onClick={() => go(-1)}
            aria-label="Previous screenshot"
          >
            ‹
          </button>
        ) : null}
        <button
          type="button"
          className="book-plate"
          onClick={() => setLightbox(true)}
          aria-label={`View ${project.title} screenshot larger`}
        >
          <div
            className={
              current.frame === "phone"
                ? "book-plate-phone"
                : "book-plate-browser"
            }
          >
            <Image
              src={withBasePath(current.src)}
              alt={current.alt}
              width={current.frame === "phone" ? 390 : 960}
              height={current.frame === "phone" ? 844 : 540}
              className="book-plate-image"
              sizes={
                current.frame === "phone"
                  ? "(max-width: 768px) 40vw, 280px"
                  : "(max-width: 768px) 90vw, 420px"
              }
            />
          </div>
        </button>
        {multi ? (
          <button
            type="button"
            className="book-plate-arrow"
            onClick={() => go(1)}
            aria-label="Next screenshot"
          >
            ›
          </button>
        ) : null}
      </div>
      {multi ? (
        <div className="book-plate-dots" role="tablist" aria-label="Screenshots">
          {images.map((img, i) => (
            <button
              key={img.src}
              type="button"
              role="tab"
              aria-selected={i === active}
              className={
                i === active ? "book-plate-dot is-active" : "book-plate-dot"
              }
              onClick={() => setActive(i)}
              aria-label={`Screenshot ${i + 1}`}
            />
          ))}
        </div>
      ) : null}
      <ImageLightbox
        images={images}
        index={active}
        open={lightbox}
        onClose={() => setLightbox(false)}
        onIndexChange={setActive}
      />
    </div>
  );
}

function roman(n: number): string {
  const map: [number, string][] = [
    [10, "X"],
    [9, "IX"],
    [5, "V"],
    [4, "IV"],
    [1, "I"],
  ];
  let remaining = n;
  let out = "";
  for (const [value, numeral] of map) {
    while (remaining >= value) {
      out += numeral;
      remaining -= value;
    }
  }
  return out;
}
