"use client";

import { skills } from "@/data/portfolio";

export function SkillsLeft() {
  const primary = skills.slice(0, 2);

  return (
    <div className="book-page-inner">
      <p className="book-kicker">Chapter II</p>
      <h2 className="book-heading">Craft</h2>
      <ul className="book-skill-list">
        {primary.map((group) => (
          <li key={group.category}>
            <h3 className="book-skill-cat">{group.category}</h3>
            <p className="book-skill-items">{group.items.join(" · ")}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SkillsRight() {
  const rest = skills.slice(2);

  return (
    <div className="book-page-inner">
      <p className="book-kicker">Toolkit</p>
      <h2 className="book-heading book-heading--sm">Tools &amp; workflow</h2>
      <ul className="book-skill-list">
        {rest.map((group) => (
          <li key={group.category}>
            <h3 className="book-skill-cat">{group.category}</h3>
            <p className="book-skill-items">{group.items.join(" · ")}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
