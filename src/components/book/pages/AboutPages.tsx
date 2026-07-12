"use client";

import { site } from "@/data/portfolio";

export function AboutLeft() {
  return (
    <div className="book-page-inner">
      <p className="book-kicker">Chapter I</p>
      <h2 className="book-heading">Hello.</h2>
      <p className="book-lede">{site.tagline}</p>
      <p className="book-body book-body--muted">
        A short volume on building products people enjoy—mobile, web, and the
        systems underneath.
      </p>
    </div>
  );
}

export function AboutRight() {
  return (
    <div className="book-page-inner">
      <p className="book-kicker">About</p>
      <h2 className="book-heading book-heading--sm">The maker</h2>
      <p className="book-body">{site.summary}</p>
      <p className="book-meta">
        <span>{site.title}</span>
        <span aria-hidden>·</span>
        <span>{site.location}</span>
      </p>
    </div>
  );
}
