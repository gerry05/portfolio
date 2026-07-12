"use client";

import Image from "next/image";

import { site } from "@/data/portfolio";
import { withBasePath } from "@/lib/paths";

/** Inside cover / first left page — dedication. */
export function CoverBack() {
  return (
    <div className="book-page-inner book-cover-inside">
      <p className="book-kicker">Chapter I</p>
      <h2 className="book-heading">Hello.</h2>
      <p className="book-lede">{site.tagline}</p>
      <p className="book-body book-body--muted">
        A short volume on building products people enjoy—mobile, web, and the
        systems underneath.
      </p>
      <p className="book-epigraph-meta">— {site.location}</p>
      <a
        className="book-cta"
        href={site.resumeUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        View résumé
      </a>
    </div>
  );
}

export function CoverFront() {
  return (
    <div className="book-page-inner book-cover-face">
      <div className="book-cover-photo" aria-hidden>
        <Image
          src={withBasePath("/images/me.jpg")}
          alt=""
          fill
          priority
          className="book-cover-photo__img"
          sizes="(max-width: 820px) 92vw, 460px"
        />
      </div>
      <div className="book-cover-wash" aria-hidden />
      <div className="book-cover-grain" aria-hidden />
      <div className="book-cover-ornament" aria-hidden />
      <div className="book-cover-bottom">
        <div className="book-cover-content">
          <p className="book-cover-brand">{site.brand}</p>
          <h1 className="book-cover-title">{site.name}</h1>
          <p className="book-cover-role">{site.title}</p>
        </div>
        <p className="book-cover-footer">{site.location}</p>
      </div>
    </div>
  );
}
