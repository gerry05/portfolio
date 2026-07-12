"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type MutableRefObject,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import { useReducedMotion } from "framer-motion";
import type { BookSpread } from "@/components/book/types";
import type { FlatPage } from "@/components/book/flattenSpreads";

const FLIP_MS = 1200;
const SCROLL_COOLDOWN_MS = 900;
const COMMIT_RATIO = 0.22;
const EASE = (t: number) => 1 - Math.pow(1 - t, 3);

export type FlipBookApi = {
  next: () => void;
  prev: () => void;
  goTo: (index: number) => void;
};

type FlipBookProps = {
  spreads: BookSpread[];
  flatPages?: FlatPage[];
  singlePage: boolean;
  index: number;
  onIndexChange: (index: number) => void;
  apiRef?: MutableRefObject<FlipBookApi | null>;
};

type Phase = "idle" | "drag" | "settle";
type Dir = "next" | "prev";

type Leaf = {
  id: string;
  front: ReactNode;
  back: ReactNode;
  isCover: boolean;
};

function buildLeaves(spreads: BookSpread[]): Leaf[] {
  // One leaf per transition between spreads (cover→about, about→skills, …)
  const leaves: Leaf[] = [];
  for (let i = 0; i < spreads.length - 1; i++) {
    leaves.push({
      id: `leaf-${spreads[i].id}`,
      front: spreads[i].right,
      back: spreads[i + 1].left,
      isCover: Boolean(spreads[i].cover),
    });
  }
  return leaves;
}

export function FlipBook({
  spreads,
  flatPages = [],
  singlePage,
  index,
  onIndexChange,
  apiRef,
}: FlipBookProps) {
  const reduce = useReducedMotion();
  const leaves = useMemo(() => buildLeaves(spreads), [spreads]);
  const maxFlipped = singlePage
    ? Math.max(0, flatPages.length - 1)
    : leaves.length;

  // flipped mirrors index: 0 closed, 1 first open spread, …
  const flipped = Math.max(0, Math.min(maxFlipped, index));

  const [phase, setPhase] = useState<Phase>("idle");
  const [dir, setDir] = useState<Dir>("next");
  const [progress, setProgress] = useState(0); // 0→1 of the active leaf turn

  const bookRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef(index);
  const phaseRef = useRef<Phase>("idle");
  const progressRef = useRef(0);
  const dirRef = useRef<Dir>("next");
  const lockRef = useRef(false);
  const scrollLockRef = useRef(0);
  const animRef = useRef<number | null>(null);
  const dragRef = useRef<{
    startX: number;
    startY: number;
    dragging: boolean;
    dir: Dir | null;
    width: number;
    pointerId: number;
  } | null>(null);

  useEffect(() => {
    indexRef.current = index;
  }, [index]);
  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);
  useEffect(() => {
    progressRef.current = progress;
  }, [progress]);
  useEffect(() => {
    dirRef.current = dir;
  }, [dir]);

  const duration = reduce ? 0 : FLIP_MS;

  const cancelAnim = useCallback(() => {
    if (animRef.current != null) {
      cancelAnimationFrame(animRef.current);
      animRef.current = null;
    }
  }, []);

  const finishFlip = useCallback(
    (direction: Dir, fromIndex: number) => {
      cancelAnim();
      const nextIndex =
        direction === "next"
          ? Math.min(maxFlipped, fromIndex + 1)
          : Math.max(0, fromIndex - 1);
      onIndexChange(nextIndex);
      setProgress(0);
      progressRef.current = 0;
      setPhase("idle");
      phaseRef.current = "idle";
      lockRef.current = false;
      dragRef.current = null;
    },
    [cancelAnim, maxFlipped, onIndexChange],
  );

  const animateTo = useCallback(
    (target: number, direction: Dir, fromIndex: number) => {
      cancelAnim();
      if (reduce) {
        if (target >= 1) finishFlip(direction, fromIndex);
        else {
          setProgress(0);
          progressRef.current = 0;
          setPhase("idle");
          phaseRef.current = "idle";
          lockRef.current = false;
        }
        return;
      }

      const start = progressRef.current;
      if (target >= 1 && start >= 0.94) {
        finishFlip(direction, fromIndex);
        return;
      }
      if (target <= 0 && start <= 0.06) {
        setProgress(0);
        progressRef.current = 0;
        setPhase("idle");
        phaseRef.current = "idle";
        lockRef.current = false;
        dragRef.current = null;
        return;
      }

      setPhase("settle");
      phaseRef.current = "settle";
      lockRef.current = true;

      const startTime = performance.now();
      const dist = Math.abs(target - start);
      const ms = Math.max(320, FLIP_MS * Math.max(dist, 0.4));

      const tick = (now: number) => {
        const t = Math.min(1, (now - startTime) / ms);
        const value = start + (target - start) * EASE(t);
        progressRef.current = value;
        setProgress(value);

        if (t < 1 && !(target >= 1 && value >= 0.985)) {
          animRef.current = requestAnimationFrame(tick);
          return;
        }

        animRef.current = null;
        if (target >= 1) finishFlip(direction, fromIndex);
        else {
          setProgress(0);
          progressRef.current = 0;
          setPhase("idle");
          phaseRef.current = "idle";
          lockRef.current = false;
          dragRef.current = null;
        }
      };

      animRef.current = requestAnimationFrame(tick);
    },
    [cancelAnim, finishFlip, reduce],
  );

  const goTo = useCallback(
    (nextIndex: number, direction?: Dir) => {
      if (lockRef.current || phaseRef.current !== "idle") return;
      const current = indexRef.current;
      const clamped = Math.max(0, Math.min(maxFlipped, nextIndex));
      if (clamped === current) return;

      const d = direction ?? (clamped > current ? "next" : "prev");
      if (Math.abs(clamped - current) > 1) {
        // Jump multiple pages (home/end) without leaf animation
        onIndexChange(clamped);
        return;
      }

      setDir(d);
      dirRef.current = d;
      setProgress(0);
      progressRef.current = 0;
      animateTo(1, d, current);
    },
    [animateTo, maxFlipped, onIndexChange],
  );

  const next = useCallback(() => goTo(indexRef.current + 1, "next"), [goTo]);
  const prev = useCallback(() => goTo(indexRef.current - 1, "prev"), [goTo]);

  useEffect(() => {
    if (!apiRef) return;
    apiRef.current = {
      next,
      prev,
      goTo: (i) => {
        if (lockRef.current || phaseRef.current !== "idle") return;
        const current = indexRef.current;
        if (i === current) return;
        if (Math.abs(i - current) === 1) goTo(i);
        else onIndexChange(Math.max(0, Math.min(maxFlipped, i)));
      },
    };
    return () => {
      apiRef.current = null;
    };
  }, [apiRef, goTo, maxFlipped, next, onIndexChange, prev]);

  useEffect(() => () => cancelAnim(), [cancelAnim]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
      if (e.key === "ArrowRight" || e.key === "PageDown") {
        e.preventDefault();
        next();
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        prev();
      } else if (e.key === "Home") {
        e.preventDefault();
        if (!lockRef.current) onIndexChange(0);
      } else if (e.key === "End") {
        e.preventDefault();
        if (!lockRef.current) onIndexChange(maxFlipped);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [maxFlipped, next, onIndexChange, prev]);

  useEffect(() => {
    function onWheel(e: WheelEvent) {
      const now = Date.now();
      if (now < scrollLockRef.current) return;
      if (Math.abs(e.deltaY) < 20 && Math.abs(e.deltaX) < 20) return;
      scrollLockRef.current = now + SCROLL_COOLDOWN_MS;
      if (e.deltaY > 0 || e.deltaX > 0) next();
      else prev();
    }
    window.addEventListener("wheel", onWheel, { passive: true });
    return () => window.removeEventListener("wheel", onWheel);
  }, [next, prev]);

  function onPointerDown(e: ReactPointerEvent) {
    if (e.button !== 0) return;
    if (phaseRef.current !== "idle" || lockRef.current) return;
    const target = e.target as HTMLElement;
    if (target.closest("a, button, input, textarea, [role='tab']")) return;

    // Only prevent default for touch/pen — calling it for mouse can suppress
    // clicks in some desktop browsers (notably Windows Chrome/Firefox).
    if (e.pointerType === "touch" || e.pointerType === "pen") {
      e.preventDefault();
    }

    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      dragging: false,
      dir: null,
      width: bookRef.current?.offsetWidth ?? 400,
      pointerId: e.pointerId,
    };
    try {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    } catch {
      /* ignore */
    }
  }

  function onPointerMove(e: ReactPointerEvent) {
    const drag = dragRef.current;
    if (!drag || phaseRef.current === "settle") return;
    if (drag.pointerId != null && e.pointerId !== drag.pointerId) return;

    const dx = e.clientX - drag.startX;
    const dy = e.clientY - drag.startY;
    const absX = Math.abs(dx);
    const absY = Math.abs(dy);

    if (!drag.dragging) {
      // Touch swipes are rarely perfectly horizontal — stay lenient.
      if (absX < 6) return;
      if (absX < absY * 0.4) return;

      const current = indexRef.current;
      const intended: Dir = dx < 0 ? "next" : "prev";
      if (intended === "next" && current >= maxFlipped) return;
      if (intended === "prev" && current <= 0) return;

      drag.dragging = true;
      drag.dir = intended;
      setDir(intended);
      dirRef.current = intended;
      setPhase("drag");
      phaseRef.current = "drag";
      cancelAnim();
    }

    if (e.pointerType === "touch" || e.pointerType === "pen") {
      e.preventDefault();
    }
    if (!drag.dir) return;

    // Shorter span on small books so a normal finger swipe can finish the turn
    const span = Math.max(96, Math.min(280, drag.width * 0.38));
    const raw =
      drag.dir === "next"
        ? Math.min(1, Math.max(0, -dx / span))
        : Math.min(1, Math.max(0, dx / span));
    progressRef.current = raw;
    setProgress(raw);
  }

  function onPointerUp(e: ReactPointerEvent) {
    const drag = dragRef.current;
    if (!drag) return;
    if (drag.pointerId != null && e.pointerId !== drag.pointerId) return;

    if (drag.dragging && drag.dir) {
      const fromIndex = indexRef.current;
      const commit = progressRef.current >= COMMIT_RATIO;
      animateTo(commit ? 1 : 0, drag.dir, fromIndex);
      dragRef.current = null;
      return;
    }

    const wasTap =
      Math.abs(e.clientX - drag.startX) < 10 &&
      Math.abs(e.clientY - drag.startY) < 10;
    dragRef.current = null;
    if (phaseRef.current !== "idle") return;
    if (!wasTap) return;

    // Tap: closed cover opens; open book uses edge zones
    if (indexRef.current === 0) {
      next();
      return;
    }
    const el = bookRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const rel = (e.clientX - rect.left) / Math.max(1, rect.width);
    if (rel > 0.72) next();
    else if (rel < 0.28) prev();
  }

  function onPointerCancel() {
    const drag = dragRef.current;
    if (drag?.dragging && drag.dir) {
      animateTo(0, drag.dir, indexRef.current);
    }
    dragRef.current = null;
  }

  const active = phase !== "idle";
  const closed = flipped === 0 && !active;

  // Which leaf is currently turning?
  // next: turn leaf at `flipped` (top of right stack)
  // prev: turn leaf at `flipped - 1` (top of left stack)
  const turningLeafIndex =
    dir === "next" ? flipped : Math.max(0, flipped - 1);

  // Angle for the turning leaf: 0 on the right, -180 on the left
  const turningAngle =
    dir === "next"
      ? -progress * 180
      : -180 + progress * 180;

  // Stable right-page content under the turning leaf
  const staticRight =
    flipped >= maxFlipped
      ? spreads[spreads.length - 1]?.right
      : leaves[flipped]?.front;

  // During next-turn, peek the upcoming right page under the leaf
  const underRight =
    dir === "next" && active
      ? flipped + 1 >= maxFlipped
        ? spreads[spreads.length - 1]?.right
        : leaves[flipped + 1]?.front
      : staticRight;

  if (singlePage) {
    const page = flatPages[index];
    const peek =
      dir === "next"
        ? flatPages[Math.min(maxFlipped, index + 1)]
        : flatPages[Math.max(0, index - 1)];
    const show = active && progress > 0.45 && peek ? peek : page;

    return (
      <div
        ref={bookRef}
        className={`flipbook flipbook--single ${closed ? "is-closed" : "is-open"} ${active ? `is-flipping-${dir}` : ""}`}
        role="region"
        aria-label="Portfolio book"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerCancel}
        style={
          {
            "--flip-duration": `${duration}ms`,
            "--flip-progress": progress,
          } as CSSProperties
        }
      >
        <div
          className={`flipbook-single-sheet ${show?.cover ? "is-cover" : ""}`}
          style={
            active
              ? {
                  transform: `translateX(${dir === "next" ? -progress * 18 : progress * 18}%)`,
                  opacity: 1 - progress * 0.35,
                }
              : undefined
          }
        >
          {show?.content}
        </div>
      </div>
    );
  }

  return (
    <div
      ref={bookRef}
      className={[
        "flipbook",
        closed ? "is-closed" : "is-open",
        active ? "is-turning" : "",
        active ? `is-flipping-${dir}` : "",
      ]
        .filter(Boolean)
        .join(" ")}
      role="region"
      aria-label="Portfolio book"
      aria-roledescription="interactive book"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerCancel}
      style={
        {
          "--flip-duration": `${duration}ms`,
          "--flip-progress": progress,
        } as CSSProperties
      }
    >
      {/* Hard cover / page block behind everything */}
      <div className="flipbook-shell" aria-hidden>
        <div className="flipbook-shell__left" />
        <div className="flipbook-shell__right" />
      </div>
      <div className="flipbook-spine" aria-hidden />

      {/* Closed: only the cover leaf, full width of the half-book */}
      {closed ? (
        <div
          className="book-leaf book-leaf--cover is-active"
          style={{ transform: "rotateY(0deg)", zIndex: 10 }}
        >
          <div className="book-leaf__face book-leaf__face--front book-leaf__face--cover">
            {leaves[0]?.front}
          </div>
          <div className="book-leaf__face book-leaf__face--back">
            {leaves[0]?.back}
          </div>
        </div>
      ) : (
        <>
          {/* Paper sheets already on the left (fully flipped) */}
          {leaves.map((leaf, i) => {
            if (i >= flipped) return null;
            if (active && dir === "prev" && i === turningLeafIndex) return null;
            const topLeftIndex =
              active && dir === "prev" ? turningLeafIndex - 1 : flipped - 1;
            const isTopLeft = i === topLeftIndex;
            return (
              <div
                key={leaf.id}
                className={`book-leaf ${leaf.isCover ? "book-leaf--cover" : ""} ${isTopLeft ? "is-top-left" : ""}`}
                style={{
                  transform: "rotateY(-180deg)",
                  zIndex: 2 + i,
                }}
                aria-hidden={!isTopLeft}
              >
                <div
                  className={`book-leaf__face book-leaf__face--front ${leaf.isCover ? "book-leaf__face--cover" : ""}`}
                >
                  {leaf.front}
                </div>
                <div className="book-leaf__face book-leaf__face--back">
                  {leaf.back}
                </div>
              </div>
            );
          })}

          <div className="flipbook-static flipbook-static--right">
            <div className="book-page-face">
              {active && dir === "next" ? underRight : staticRight}
            </div>
          </div>

          {/* Right-stack leaves not yet flipped (below the top one) */}
          {leaves.map((leaf, i) => {
            if (i < flipped) return null;
            if (active && dir === "next" && i === turningLeafIndex) return null;
            if (i === flipped && !active) {
              // Top of right stack — rendered as the turning/active leaf below when idle too
              return null;
            }
            if (i > flipped) {
              return (
                <div
                  key={leaf.id}
                  className="book-leaf"
                  style={{
                    transform: "rotateY(0deg)",
                    zIndex: 2 + (leaves.length - i),
                  }}
                  aria-hidden
                >
                  <div className="book-leaf__face book-leaf__face--front">
                    {leaf.front}
                  </div>
                  <div className="book-leaf__face book-leaf__face--back">
                    {leaf.back}
                  </div>
                </div>
              );
            }
            return null;
          })}

          {/* The active leaf (top of right when idle/next, or swinging on prev/next) */}
          {(() => {
            const leaf =
              active
                ? leaves[turningLeafIndex]
                : flipped < maxFlipped
                  ? leaves[flipped]
                  : null;
            if (!leaf) return null;

            const angle = active
              ? turningAngle
              : 0; /* idle top-of-right */

            const z = 40;

            return (
              <div
                key={`active-${leaf.id}`}
                className={`book-leaf is-active ${leaf.isCover ? "book-leaf--cover" : ""}`}
                style={{
                  transform: `rotateY(${angle}deg)`,
                  zIndex: z,
                }}
              >
                <div
                  className={`book-leaf__face book-leaf__face--front ${leaf.isCover ? "book-leaf__face--cover" : ""}`}
                >
                  {leaf.front}
                </div>
                <div className="book-leaf__face book-leaf__face--back">
                  {leaf.back}
                </div>
              </div>
            );
          })()}
        </>
      )}
    </div>
  );
}

export function FlipBookControls({
  index,
  total,
  label,
  onPrev,
  onNext,
}: {
  index: number;
  total: number;
  label: string;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <div className="book-controls">
      <button
        type="button"
        className="book-nav-btn"
        onClick={onPrev}
        disabled={index <= 0}
        aria-label="Previous page"
      >
        ‹
      </button>
      <p className="book-progress" aria-live="polite">
        <span className="book-progress-label">{label}</span>
        <span className="book-progress-count">
          {index + 1} / {total}
        </span>
      </p>
      <button
        type="button"
        className="book-nav-btn"
        onClick={onNext}
        disabled={index >= total - 1}
        aria-label="Next page"
      >
        ›
      </button>
    </div>
  );
}
