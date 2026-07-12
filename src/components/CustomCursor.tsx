"use client";

import { useEffect, useRef, useState } from "react";

const INTERACTIVE =
  "a, button, [role='button'], input, textarea, select, label, summary, .cursor-pointer, [data-cursor='hover']";

/**
 * Custom cursor for fine pointers. Uses mousemove + rAF smoothing so it
 * animates reliably on Windows desktop browsers in production.
 */
export function CustomCursor() {
  const pointerRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");

    const sync = () => {
      const on = fine.matches;
      setEnabled(on);
      document.documentElement.classList.toggle("has-custom-cursor", on);
      if (!on) {
        setVisible(false);
        document.documentElement.classList.remove("is-cursor-visible");
      }
    };

    sync();
    fine.addEventListener("change", sync);

    const tick = () => {
      const node = pointerRef.current;
      if (node) {
        const pos = posRef.current;
        const target = targetRef.current;
        // Eased follow — gives the ring a living, animated feel
        pos.x += (target.x - pos.x) * 0.28;
        pos.y += (target.y - pos.y) * 0.28;
        node.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    const onMove = (e: MouseEvent | PointerEvent) => {
      if (!fine.matches) return;
      targetRef.current = { x: e.clientX, y: e.clientY };
      setVisible(true);
      document.documentElement.classList.add("is-cursor-visible");
    };

    const onOver = (e: MouseEvent) => {
      const el = e.target as Element | null;
      setHovering(Boolean(el?.closest?.(INTERACTIVE)));
    };

    const onLeave = () => {
      setVisible(false);
      document.documentElement.classList.remove("is-cursor-visible");
    };

    // mousemove is more reliable than pointermove on some Windows setups
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      document.documentElement.classList.remove("is-cursor-visible");
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      fine.removeEventListener("change", sync);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      className="custom-cursor"
      aria-hidden="true"
      data-hover={hovering}
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
