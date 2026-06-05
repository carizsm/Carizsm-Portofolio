"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import type { ProjectMedia } from "@/content/projects";
import { cn } from "@/lib/utils";

const easing = [0.22, 1, 0.36, 1] as const;

export function ProjectMediaCarousel({ media }: { media: ProjectMedia[] }) {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();

  if (media.length === 0) return null;

  const active = media[index];
  const prev = () =>
    setIndex((current) => (current - 1 + media.length) % media.length);
  const next = () => setIndex((current) => (current + 1) % media.length);

  return (
    <div className="w-full">
      <div className="relative overflow-hidden rounded-2xl border border-border bg-bg-elevated">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active.src}
            drag={reduce ? false : "x"}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.14}
            onDragEnd={(_, info) => {
              if (info.offset.x < -72) next();
              if (info.offset.x > 72) prev();
            }}
            initial={reduce ? { opacity: 0 } : { opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, x: -32 }}
            transition={{ duration: 0.36, ease: easing }}
            className="relative aspect-[16/10] cursor-grab active:cursor-grabbing"
          >
            <Image
              src={active.src}
              alt={active.alt}
              fill
              sizes="(min-width: 768px) 896px, 100vw"
              className={cn(
                active.fit === "contain"
                  ? "object-contain p-3 sm:p-5"
                  : "object-cover",
              )}
              priority
            />
          </motion.div>
        </AnimatePresence>

        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-fg/[0.03]"
        />

        <div className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-3">
          <p className="rounded-full border border-border bg-bg/85 px-3 py-1.5 text-xs text-fg-muted backdrop-blur">
            {active.caption}
          </p>
          <div className="flex gap-1.5 rounded-full border border-border bg-bg/85 p-1 backdrop-blur">
            <button
              type="button"
              onClick={prev}
              title="Previous image"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full text-fg-muted transition-colors hover:bg-bg-elevated hover:text-accent"
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Previous image</span>
            </button>
            <button
              type="button"
              onClick={next}
              title="Next image"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full text-fg-muted transition-colors hover:bg-bg-elevated hover:text-accent"
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Next image</span>
            </button>
          </div>
        </div>
      </div>

      <div className="mt-3 flex justify-center gap-2">
        {media.map((item, itemIndex) => (
          <button
            key={item.src}
            type="button"
            onClick={() => setIndex(itemIndex)}
            title={item.caption}
            className={cn(
              "h-1.5 rounded-full transition-all",
              itemIndex === index
                ? "w-7 bg-accent"
                : "w-1.5 bg-border-strong hover:bg-fg-subtle",
            )}
          >
            <span className="sr-only">{item.caption}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
