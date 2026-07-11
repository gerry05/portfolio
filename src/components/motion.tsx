"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
  type Variants,
} from "framer-motion";
import {
  createContext,
  useContext,
  useRef,
  type CSSProperties,
  type ReactNode,
} from "react";

type ParallaxContextValue = {
  scrollYProgress: MotionValue<number>;
};

export const ease = [0.22, 1, 0.36, 1] as const;
export const easeOutExpo = [0.16, 1, 0.3, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 36, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.85, ease },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.9, ease },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92, y: 28, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: easeOutExpo },
  },
};

export const slideFromLeft: Variants = {
  hidden: { opacity: 0, x: -48, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: easeOutExpo },
  },
};

export const slideFromRight: Variants = {
  hidden: { opacity: 0, x: 48, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: easeOutExpo },
  },
};

export const clipUp: Variants = {
  hidden: { opacity: 0, y: "110%" },
  visible: {
    opacity: 1,
    y: "0%",
    transition: { duration: 0.85, ease: easeOutExpo },
  },
};

const defaultViewport = {
  once: true,
  amount: 0.2,
  margin: "0px 0px -10% 0px",
} as const;

export function Reveal({
  children,
  className,
  delay = 0,
  variants = fadeUp,
  amount,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  variants?: Variants;
  amount?: number;
}) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ ...defaultViewport, amount: amount ?? defaultViewport.amount }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

export function Stagger({
  children,
  className,
  delay = 0.08,
  delayChildren = 0.08,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  delayChildren?: number;
}) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.12, margin: "0px 0px -8% 0px" }}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: delay, delayChildren },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  variants = fadeUp,
}: {
  children: ReactNode;
  className?: string;
  variants?: Variants;
}) {
  return (
    <motion.div className={className} variants={variants}>
      {children}
    </motion.div>
  );
}

/** Masked line reveal — words rise through a clip window */
export function TextReveal({
  text,
  className,
  as: Tag = "h2",
  delay = 0,
  id,
  immediate = false,
}: {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  delay?: number;
  id?: string;
  /** Animate on mount instead of whileInView (for above-the-fold) */
  immediate?: boolean;
}) {
  const reduce = useReducedMotion();
  const words = text.split(" ");

  if (reduce) {
    const Comp = Tag;
    return (
      <Comp id={id} className={className}>
        {text}
      </Comp>
    );
  }

  return (
    <Tag id={id} className={className}>
      <motion.span
        className="inline"
        initial="hidden"
        {...(immediate
          ? { animate: "visible" as const }
          : {
              whileInView: "visible" as const,
              viewport: { once: true, amount: 0.4 },
            })}
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.055, delayChildren: delay },
          },
        }}
      >
        {words.map((word, i) => (
          <span
            key={`${word}-${i}`}
            className="inline-block overflow-hidden align-bottom pb-[0.12em]"
          >
            <motion.span
              className="inline-block"
              variants={clipUp}
              style={{ willChange: "transform, opacity" }}
            >
              {word}
              {i < words.length - 1 ? "\u00A0" : ""}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}

const ParallaxContext = createContext<ParallaxContextValue | null>(null);

/** Section-scoped scroll progress for nested parallax layers */
export function ParallaxSection({
  children,
  className,
  id,
  style,
  "aria-labelledby": ariaLabelledby,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  style?: CSSProperties;
  "aria-labelledby"?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  return (
    <ParallaxContext.Provider value={{ scrollYProgress }}>
      <section
        ref={ref}
        id={id}
        className={className}
        style={style}
        aria-labelledby={ariaLabelledby}
      >
        {children}
      </section>
    </ParallaxContext.Provider>
  );
}

export function ParallaxLayer({
  children,
  className,
  speed = 0.2,
  style,
}: {
  children?: ReactNode;
  className?: string;
  /** Positive = moves slower (recedes); negative = advances */
  speed?: number;
  style?: CSSProperties;
}) {
  const reduce = useReducedMotion();
  const ctx = useContext(ParallaxContext);

  if (reduce || !ctx) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  return (
    <ParallaxLayerInner
      className={className}
      speed={speed}
      style={style}
      scrollYProgress={ctx.scrollYProgress}
    >
      {children}
    </ParallaxLayerInner>
  );
}

function ParallaxLayerInner({
  children,
  className,
  speed,
  style,
  scrollYProgress,
}: {
  children?: ReactNode;
  className?: string;
  speed: number;
  style?: CSSProperties;
  scrollYProgress: MotionValue<number>;
}) {
  const y = useTransform(scrollYProgress, [0, 1], [speed * -80, speed * 80]);
  const smoothY = useSpring(y, { stiffness: 90, damping: 28, mass: 0.4 });

  return (
    <motion.div className={className} style={{ ...style, y: smoothY }}>
      {children}
    </motion.div>
  );
}

/** Standalone parallax for a single element tied to its own scroll range */
export function useParallaxY(speed = 0.25) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const raw = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? [0, 0] : [speed * -70, speed * 70],
  );
  const y = useSpring(raw, { stiffness: 100, damping: 30, mass: 0.35 });
  return { ref, y };
}

export function Magnetic({
  children,
  className,
  strength = 0.25,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(0, { stiffness: 220, damping: 18, mass: 0.35 });
  const y = useSpring(0, { stiffness: 220, damping: 18, mass: 0.35 });

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x, y }}
      onMouseMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const dx = e.clientX - (rect.left + rect.width / 2);
        const dy = e.clientY - (rect.top + rect.height / 2);
        x.set(dx * strength);
        y.set(dy * strength);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}
