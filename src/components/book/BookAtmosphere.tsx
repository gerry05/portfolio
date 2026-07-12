"use client";

/** Quiet paper stage — empty page behind the book. */
export function BookAtmosphere() {
  return (
    <div className="book-atmosphere" aria-hidden>
      <div className="book-atmosphere__paper" />
      <div className="book-atmosphere__grain" />
      <div className="book-atmosphere__margin" />
    </div>
  );
}
