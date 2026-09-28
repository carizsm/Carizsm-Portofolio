"use client";

import Image from "next/image";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useId, useRef, useState } from "react";
import type { KeyboardEvent, PointerEvent } from "react";
import type { ProjectMedia } from "@/content/projects";
import "@/app/project-gallery.css";

export function ProjectMediaCarousel({ media }: { media: ProjectMedia[] }) {
  const [index, setIndex] = useState(0);
  const galleryId = useId();
  const reduceMotion = useReducedMotion();
  const pointerStart = useRef<{ x: number; y: number; id: number } | null>(null);

  if (media.length === 0) return null;

  const activeIndex = Math.min(index, media.length - 1);
  const active = media[activeIndex];
  const hasMultipleItems = media.length > 1;
  const move = (direction: number) =>
    setIndex((current) =>
      (Math.min(current, media.length - 1) + direction + media.length) % media.length,
    );

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (!hasMultipleItems || event.altKey || event.ctrlKey || event.metaKey) return;
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      move(event.key === "ArrowRight" ? 1 : -1);
    }
  }

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    if (!hasMultipleItems || !event.isPrimary || event.button !== 0) return;
    pointerStart.current = { x: event.clientX, y: event.clientY, id: event.pointerId };
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function handlePointerUp(event: PointerEvent<HTMLDivElement>) {
    const start = pointerStart.current;
    pointerStart.current = null;
    if (!start || start.id !== event.pointerId) return;
    const distanceX = event.clientX - start.x;
    const distanceY = event.clientY - start.y;
    if (Math.abs(distanceX) > 64 && Math.abs(distanceX) > Math.abs(distanceY) * 1.5) {
      move(distanceX < 0 ? 1 : -1);
    }
  }

  return (
    <div
      className="project-gallery"
      role="region"
      aria-label="Project images"
      aria-roledescription={hasMultipleItems ? "carousel" : undefined}
      onKeyDown={handleKeyDown}
    >
      <figure className="project-gallery-figure">
        <div
          id={galleryId}
          className="project-gallery-stage"
          data-swipe={hasMultipleItems || undefined}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerCancel={() => { pointerStart.current = null; }}
        >
          <motion.div
            key={active.src}
            className="project-gallery-image"
            initial={reduceMotion ? false : { opacity: 0.5 }}
            animate={{ opacity: 1 }}
            transition={{ duration: reduceMotion ? 0 : 0.18 }}
          >
            <Image
              src={active.src}
              alt={active.alt}
              fill
              sizes="(min-width: 1240px) 1160px, (min-width: 1001px) calc(100vw - 80px), (min-width: 401px) calc(100vw - 48px), calc(100vw - 36px)"
              className={active.fit === "contain" ? "gallery-image-contain" : "gallery-image-cover"}
              draggable={false}
              priority={activeIndex === 0}
            />
          </motion.div>
        </div>

        <figcaption className="project-gallery-caption">
          <p aria-live="polite" aria-atomic="true">
            {hasMultipleItems && (
              <span className="project-gallery-count">
                <span className="sr-only">Image </span>
                {String(activeIndex + 1).padStart(2, "0")}
                <span aria-hidden="true"> / </span>
                <span className="sr-only"> of </span>
                {String(media.length).padStart(2, "0")}
              </span>
            )}
            {active.caption}
          </p>
          <a href={active.src} target="_blank" rel="noopener noreferrer">
            View original <ArrowUpRight size={14} aria-hidden="true" />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </figcaption>
      </figure>

      {hasMultipleItems && (
        <div className="project-gallery-controls">
          <p className="project-gallery-hint">Explore the images</p>
          <div className="project-gallery-navigation" role="group" aria-label="Image navigation">
            <button type="button" onClick={() => move(-1)} aria-label="Previous image" aria-controls={galleryId}>
              <ChevronLeft size={18} aria-hidden="true" />
            </button>
            <div className="project-gallery-selectors">
              {media.map((item, itemIndex) => (
                <button
                  key={item.src}
                  type="button"
                  onClick={() => setIndex(itemIndex)}
                  aria-label={`Show image ${itemIndex + 1}: ${item.caption}`}
                  aria-pressed={itemIndex === activeIndex}
                  aria-controls={galleryId}
                >
                  {String(itemIndex + 1).padStart(2, "0")}
                </button>
              ))}
            </div>
            <button type="button" onClick={() => move(1)} aria-label="Next image" aria-controls={galleryId}>
              <ChevronRight size={18} aria-hidden="true" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
