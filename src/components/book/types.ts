import type { ReactNode } from "react";

export type BookSpread = {
  id: string;
  label: string;
  left?: ReactNode;
  right?: ReactNode;
  /** Closed cover only — no open spread until turned. */
  cover?: boolean;
};
