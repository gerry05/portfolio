"use client";

import { motion, useMotionValue, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const INTERACTIVE =
  "a, button, [role='button'], input, textarea, select, label, summary, .cursor-pointer, [data-cursor='hover']";

export function CustomCursor() {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");

    const enable = () => {
      if (!mq.matches) {
        setEnabled(false);
        document.documentElement.classList.remove("has-custom-cursor");
        return;
      }
      setEnabled(true);
      document.documentElement.classList.add("has-custom-cursor");
    };

    enable();

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
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
    mq.addEventListener("change", enable);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      mq.removeEventListener("change", enable);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <div
      className="custom-cursor"
      aria-hidden="true"
      data-hover={hovering}
      data-reduced={reduce ? "true" : "false"}
    >
      <motion.div
        className="custom-cursor__pointer"
        style={{ x, y }}
        initial={false}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.15 }}
      >
        <span className="custom-cursor__glow" />
        <motion.span
          className="custom-cursor__ring"
          initial={false}
          animate={{ scale: hovering ? 1.18 : 1 }}
          transition={
            reduce
              ? { duration: 0 }
              : { type: "spring", stiffness: 420, damping: 28 }
          }
        >
          <span className="custom-cursor__ring-spin" />
        </motion.span>
        <motion.span
          className="custom-cursor__core"
          initial={false}
          animate={{ scale: hovering ? 0.3 : 1 }}
          transition={
            reduce
              ? { duration: 0 }
              : { type: "spring", stiffness: 650, damping: 30 }
          }
        />
        <motion.span
          className="custom-cursor__mark"
          initial={false}
          animate={{
            opacity: hovering ? 1 : 0,
            scale: hovering ? 1 : 0.4,
            rotate: hovering ? 90 : 0,
          }}
          transition={
            reduce
              ? { duration: 0 }
              : { type: "spring", stiffness: 500, damping: 32 }
          }
        />
      </motion.div>
    </div>
  );
}
