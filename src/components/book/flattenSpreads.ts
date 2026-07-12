import type { ReactNode } from "react";
import type { BookSpread } from "@/components/book/types";

export type FlatPage = {
  id: string;
  label: string;
  content: ReactNode;
  cover?: boolean;
};

/** One readable face per mobile step (cover, then each left/right). */
export function flattenSpreads(spreads: BookSpread[]): FlatPage[] {
  const pages: FlatPage[] = [];

  for (const spread of spreads) {
    if (spread.cover) {
      pages.push({
        id: spread.id,
        label: spread.label,
        content: spread.right,
        cover: true,
      });
      continue;
    }
    if (spread.left) {
      pages.push({
        id: `${spread.id}-left`,
        label: spread.label,
        content: spread.left,
      });
    }
    if (spread.right) {
      pages.push({
        id: `${spread.id}-right`,
        label: spread.label,
        content: spread.right,
      });
    }
  }

  return pages;
}
