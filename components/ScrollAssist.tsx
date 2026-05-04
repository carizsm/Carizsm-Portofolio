"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowDown, ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

const sectionLinks = [
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
] as const;

export function ScrollAssist() {
  const [progress, setProgress] = useState(0);
  const [activeId, setActiveId] = useState<string>(sectionLinks[0].id);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const viewport = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight - viewport;
      const nextProgress = docHeight <= 0 ? 0 : Math.min(100, Math.max(0, (scrollTop / docHeight) * 100));
      setProgress(nextProgress);
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  useEffect(() => {
    const sections = sectionLinks
      .map((section) => document.getElementById(section.id))
      .filter((section): section is HTMLElement => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        const current = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (current?.target.id) setActiveId(current.target.id);
      },
      { rootMargin: "-30% 0px -50% 0px", threshold: [0.1, 0.3, 0.6] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const currentIndex = useMemo(
    () => sectionLinks.findIndex((section) => section.id === activeId),
    [activeId],
  );

  const scrollTo = (id: string) => {
    const target = document.getElementById(id);
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const goNext = () => {
    const next = sectionLinks[Math.min(sectionLinks.length - 1, currentIndex + 1)];
    if (next) scrollTo(next.id);
  };

  const goPrev = () => {
    if (currentIndex <= 0) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const prev = sectionLinks[currentIndex - 1];
    if (prev) scrollTo(prev.id);
  };

  return (
    <aside className="pointer-events-none fixed inset-x-0 bottom-4 z-40 mx-auto flex w-full max-w-6xl justify-center px-4 sm:bottom-6 sm:justify-end sm:px-8">
      <div className="pointer-events-auto glass-panel flex items-center gap-2 rounded-full px-2 py-2 sm:gap-3 sm:px-3">
        <button
          type="button"
          onClick={goPrev}
          className="rounded-full border border-border px-2.5 py-2 text-fg-muted transition-colors hover:border-accent hover:text-accent"
          aria-label="Scroll ke bagian sebelumnya"
        >
          <ArrowUp className="h-4 w-4" />
        </button>

        <div className="hidden items-center gap-1 sm:flex">
          {sectionLinks.map((section) => (
            <button
              key={section.id}
              type="button"
              onClick={() => scrollTo(section.id)}
              className={cn(
                "rounded-full px-3 py-1.5 text-xs transition-colors",
                activeId === section.id
                  ? "bg-accent text-accent-fg"
                  : "text-fg-muted hover:text-fg",
              )}
            >
              {section.label}
            </button>
          ))}
        </div>

        <div className="h-2 w-14 overflow-hidden rounded-full bg-border sm:w-20" aria-hidden>
          <div
            className="h-full rounded-full bg-accent transition-[width] duration-200"
            style={{ width: `${progress}%` }}
          />
        </div>

        <button
          type="button"
          onClick={goNext}
          className="rounded-full border border-border px-2.5 py-2 text-fg-muted transition-colors hover:border-accent hover:text-accent"
          aria-label="Scroll ke bagian selanjutnya"
        >
          <ArrowDown className="h-4 w-4" />
        </button>
      </div>
    </aside>
  );
}
