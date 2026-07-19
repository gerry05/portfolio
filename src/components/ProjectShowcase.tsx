"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { PhoneShowcase } from "@/components/PhoneShowcase";
import { ImageLightbox } from "@/components/ImageLightbox";
import { withBasePath } from "@/lib/paths";
import type { ProjectImage } from "@/data/portfolio";
import { useState } from "react";

type ProjectShowcaseProps = {
  title: string;
  images: readonly ProjectImage[];
  priority?: boolean;
};

function BrowserShowcase({
  src,
  alt,
  priority,
}: {
  src: string;
  alt: string;
  priority?: boolean;
}) {
  return (
    <div className="browser-stage">
      <div className="browser-frame">
        <div className="browser-bar" aria-hidden>
          <span className="browser-dot" />
          <span className="browser-dot" />
          <span className="browser-dot" />
        </div>
        <div className="browser-screen">
          <Image
            src={withBasePath(src)}
            alt={alt}
            width={1906}
            height={848}
            priority={priority}
            className="browser-image"
            sizes="(max-width: 768px) 100vw, 560px"
          />
        </div>
      </div>
    </div>
  );
}

function SlideFrame({
  image,
  priority,
}: {
  image: ProjectImage;
  priority?: boolean;
}) {
  if (image.frame === "browser") {
    return (
      <BrowserShowcase src={image.src} alt={image.alt} priority={priority} />
    );
  }

  return (
    <PhoneShowcase src={image.src} alt={image.alt} priority={priority} />
  );
}

export function ProjectShowcase({
  title,
  images,
  priority,
}: ProjectShowcaseProps) {
  const [active, setActive] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const multi = images.length > 1;
  const current = images[active] ?? images[0];

  function go(delta: number) {
    setActive((i) => (i + delta + images.length) % images.length);
  }

  function openLightbox() {
    setLightboxOpen(true);
  }

  return (
    <>
      <div className="project-carousel">
        <div className="project-carousel__viewport">
          <AnimatePresence mode="wait" initial={false}>
            <motion.button
              key={current.src}
              type="button"
              className="project-carousel__slide"
              onClick={openLightbox}
              aria-label={`View ${current.alt} fullscreen`}
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -18 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <SlideFrame
                image={current}
                priority={priority && active === 0}
              />
              <span className="project-carousel__hint">Click to expand</span>
            </motion.button>
          </AnimatePresence>
        </div>

        {multi ? (
          <div className="project-carousel__controls">
            <button
              type="button"
              className="project-carousel__arrow"
              aria-label={`Previous ${title} screenshot`}
              onClick={() => go(-1)}
            >
              ←
            </button>
            <div className="project-carousel__dots" role="tablist">
              {images.map((image, index) => (
                <button
                  key={image.src}
                  type="button"
                  role="tab"
                  aria-selected={index === active}
                  aria-label={`Show ${image.alt}`}
                  className={
                    index === active
                      ? "project-carousel__dot is-active"
                      : "project-carousel__dot"
                  }
                  onClick={() => setActive(index)}
                />
              ))}
            </div>
            <button
              type="button"
              className="project-carousel__arrow"
              aria-label={`Next ${title} screenshot`}
              onClick={() => go(1)}
            >
              →
            </button>
          </div>
        ) : null}
      </div>

      <ImageLightbox
        images={images}
        index={active}
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onIndexChange={setActive}
      />
    </>
  );
}
