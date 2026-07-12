"use client";

import { site, skills, projects } from "@/data/portfolio";

export function ContactLeft() {
  return (
    <div className="book-page-inner">
      <p className="book-kicker">Closing</p>
      <h2 className="book-heading">Let&apos;s talk</h2>
      <p className="book-body">
        Open to collaborations, product builds, and thoughtful engineering
        work. Reach out through any of these channels.
      </p>
      <ul className="book-social">
        <li>
          <a
            href={site.social.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </li>
        <li>
          <a
            href={site.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </li>
        <li>
          <a
            href={site.social.facebook}
            target="_blank"
            rel="noopener noreferrer"
          >
            Facebook
          </a>
        </li>
      </ul>
      <a
        className="book-cta"
        href={site.resumeUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        Download résumé
      </a>
    </div>
  );
}

export function ContactRight() {
  const focus = skills
    .flatMap((group) => group.items)
    .filter((item, i, arr) => arr.indexOf(item) === i)
    .slice(0, 8);

  return (
    <div className="book-page-inner">
      <p className="book-kicker">Now</p>
      <h2 className="book-heading book-heading--sm">Available for work</h2>
      <p className="book-body">
        Based in {site.location}. I build mobile and web products end to
        end—especially Flutter apps and Next.js sites with solid backends.
      </p>
      <p className="book-body book-body--muted">
        Recent chapters: {projects.map((p) => p.title).join(", ")}.
      </p>
      <h3 className="book-skill-cat">Focus</h3>
      <p className="book-skill-items">{focus.join(" · ")}</p>
      <p className="book-meta">
        <span>{site.brand}</span>
        <span aria-hidden>·</span>
        <span>{site.title}</span>
      </p>
    </div>
  );
}
