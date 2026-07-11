"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { withBasePath } from "@/lib/paths";
import type { ProjectImage } from "@/data/portfolio";
import { useEffect, useId } from "react";
import { createPortal } from "react-dom";

type ImageLightboxProps = {
  images: readonly ProjectImage[];
  index: number;
  open: boolean;
  onClose: () => void;
  onIndexChange: (index: number) => void;
};

export function ImageLightbox({
  images,
  index,
  open,
  onClose,
  onIndexChange,
}: ImageLightboxProps) {
  const titleId = useId();
  const image = images[index];
  const multi = images.length > 1;

  useEffect(() => {
    if (!open) return;

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft" && multi) {
        onIndexChange((index - 1 + images.length) % images.length);
      }
      if (event.key === "ArrowRight" && multi) {
        onIndexChange((index + 1) % images.length);
      }
    }

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, index, images.length, multi, onClose, onIndexChange]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && image ? (
        <motion.div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <button
            type="button"
            className="lightbox-backdrop"
            aria-label="Close fullscreen image"
            onClick={onClose}
          />

          <div className="lightbox-toolbar">
            <p id={titleId} className="lightbox-caption">
              {image.alt}
              {multi ? (
                <span className="lightbox-count">
                  {" "}
                  · {index + 1}/{images.length}
                </span>
              ) : null}
            </p>
            <button
              type="button"
              className="lightbox-close"
              aria-label="Close"
              onClick={onClose}
            >
              ✕
            </button>
          </div>

          {multi ? (
            <button
              type="button"
              className="lightbox-nav lightbox-nav--prev"
              aria-label="Previous image"
              onClick={() =>
                onIndexChange((index - 1 + images.length) % images.length)
              }
            >
              ←
            </button>
          ) : null}

          <motion.div
            key={image.src}
            className="lightbox-stage"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.22 }}
          >
            <Image
              src={withBasePath(image.src)}
              alt={image.alt}
              width={image.frame === "browser" ? 1906 : 1080}
              height={image.frame === "browser" ? 848 : 2400}
              className={
                image.frame === "browser"
                  ? "lightbox-image lightbox-image--browser"
                  : "lightbox-image lightbox-image--phone"
              }
              sizes="100vw"
              priority
            />
          </motion.div>

          {multi ? (
            <button
              type="button"
              className="lightbox-nav lightbox-nav--next"
              aria-label="Next image"
              onClick={() => onIndexChange((index + 1) % images.length)}
            >
              →
            </button>
          ) : null}
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
