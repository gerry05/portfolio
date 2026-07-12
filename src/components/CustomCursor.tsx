"use client";

import { useEffect, useRef, useState } from "react";

const INTERACTIVE =
  "a, button, [role='button'], input, textarea, select, label, summary, .cursor-pointer, [data-cursor='hover']";

/**
 * Custom cursor for fine pointers. Positioned via direct DOM updates (no
 * full-screen overlay) so it cannot intercept clicks in production browsers.
 */
export function CustomCursor() {
  const pointerRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const sync = () => {
      const on = fine.matches;
      setEnabled(on);
      setReduce(motion.matches);
      document.documentElement.classList.toggle("has-custom-cursor", on);
      if (!on) setVisible(false);
    };

    sync();
    fine.addEventListener("change", sync);
    motion.addEventListener("change", sync);

    const onMove = (e: PointerEvent) => {
      if (!fine.matches) return;
      const node = pointerRef.current;
      if (node) {
        node.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
      setVisible(true);
    };

    const onOver = (e: MouseEvent) => {
      const el = e.target as Element | null;
      setHovering(Boolean(el?.closest?.(INTERACTIVE)));
    };

    const onLeave = () => setVisible(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      fine.removeEventListener("change", sync);
      motion.removeEventListener("change", sync);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      className="custom-cursor"
      aria-hidden="true"
      data-hover={hovering}
      data-reduced={reduce ? "true" : "false"}
      data-visible={visible ? "true" : "false"}
    >
      <div ref={pointerRef} className="custom-cursor__pointer">
        <span className="custom-cursor__glow" />
        <span className="custom-cursor__ring">
          <span className="custom-cursor__ring-spin" />
        </span>
        <span className="custom-cursor__core" />
        <span className="custom-cursor__mark" />
      </div>
    </div>
  );
}
