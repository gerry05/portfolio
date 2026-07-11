"use client";

import Image from "next/image";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { withBasePath } from "@/lib/paths";
import { useRef, type MouseEvent } from "react";

type PhoneShowcaseProps = {
  src: string;
  alt: string;
  priority?: boolean;
};

export function PhoneShowcase({ src, alt, priority }: PhoneShowcaseProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), {
    stiffness: 180,
    damping: 22,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), {
    stiffness: 180,
    damping: 22,
  });
  const glareX = useTransform(x, [-0.5, 0.5], [10, 90]);
  const glareY = useTransform(y, [-0.5, 0.5], [20, 80]);
  const glare = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.28), transparent 45%)`;

  function onMove(event: MouseEvent<HTMLDivElement>) {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((event.clientX - rect.left) / rect.width - 0.5);
    y.set((event.clientY - rect.top) / rect.height - 0.5);
  }

  function onLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      className="phone-stage"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={
        reduce
          ? undefined
          : {
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
              perspective: 1000,
            }
      }
    >
      <div className="phone-frame">
        <div className="phone-notch" aria-hidden />
        <div className="phone-screen">
          <Image
            src={withBasePath(src)}
            alt={alt}
            width={1080}
            height={2400}
            priority={priority}
            className="phone-image"
            sizes="(max-width: 768px) 260px, 300px"
          />
          {!reduce && (
            <motion.div
              className="phone-glare"
              style={{ background: glare }}
              aria-hidden
            />
          )}
        </div>
        <div className="phone-home" aria-hidden />
      </div>
    </motion.div>
  );
}
