"use client";

import dynamic from "next/dynamic";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { site } from "@/data/portfolio";
import { SoftErrorBoundary } from "@/components/SoftErrorBoundary";
import { BookAtmosphere } from "@/components/book/BookAtmosphere";
import {
  FlipBook,
  FlipBookControls,
  type FlipBookApi,
} from "@/components/book/FlipBook";
import { buildSpreads } from "@/components/book/pages/buildSpreads";

const BookScene = dynamic(
  () => import("@/components/book/BookScene").then((m) => m.BookScene),
  { ssr: false },
);

function subscribeMedia(query: string) {
  return (onChange: () => void) => {
    const mq = window.matchMedia(query);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  };
}

function useMediaQuery(query: string, serverSnapshot = false) {
  return useSyncExternalStore(
    subscribeMedia(query),
    () => window.matchMedia(query).matches,
    () => serverSnapshot,
  );
}

export function BookStage() {
  const reduce = usePrefersReducedMotion();
  const spreads = useMemo(() => buildSpreads(), []);
  const [index, setIndex] = useState(0);
  const [showHint, setShowHint] = useState(true);
  const apiRef = useRef<FlipBookApi | null>(null);

  const belowDesktop = useMediaQuery("(max-width: 1100px)");

  const wasBelow = useRef(belowDesktop);
  useEffect(() => {
    if (wasBelow.current !== belowDesktop) {
      wasBelow.current = belowDesktop;
      setIndex(0);
      setShowHint(true);
    }
  }, [belowDesktop]);

  const webgl = !reduce && !belowDesktop;

  const onIndexChange = useCallback((i: number) => {
    setIndex(i);
    if (i > 0) setShowHint(false);
  }, []);

  const label = spreads[index]?.label ?? "";

  return (
    <div
      className={["book-stage", belowDesktop ? "is-landscape" : ""]
        .filter(Boolean)
        .join(" ")}
    >
      <BookAtmosphere />
      {webgl ? (
        <SoftErrorBoundary>
          <BookScene reducedMotion={Boolean(reduce)} />
        </SoftErrorBoundary>
      ) : null}

      <header className="book-topbar">
        <button
          type="button"
          className="book-topbar-brand"
          onClick={() => apiRef.current?.goTo(0)}
        >
          {site.brand}
        </button>
        <a
          className="book-topbar-resume"
          href={site.resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Résumé
        </a>
      </header>

      <div className="book-stage-center" id="top">
        <div className="book-stage-book">
          <FlipBook
            spreads={spreads}
            singlePage={false}
            index={index}
            onIndexChange={onIndexChange}
            apiRef={apiRef}
          />
        </div>
      </div>

      <div className="book-chrome">
        <FlipBookControls
          index={index}
          total={spreads.length}
          label={label}
          onPrev={() => apiRef.current?.prev()}
          onNext={() => apiRef.current?.next()}
        />
        {showHint ? (
          <p className="book-hint">
            Drag pages to turn — or use edges, scroll, and arrow keys
          </p>
        ) : null}
      </div>
    </div>
  );
}
