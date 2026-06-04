"use client";

import { useEffect, useState } from "react";
import { ArrowDown, ArrowUp } from "lucide-react";

const sectionLinks = [
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
] as const;

const NAV_OFFSET = 88;

export function ScrollAssist() {
  const [progress, setProgress] = useState(0);
  const [activeId, setActiveId] = useState<string>(sectionLinks[0].id);

  const [sectionEls, setSectionEls] = useState<HTMLElement[]>([]);

  useEffect(() => {
    const els = sectionLinks
      .map((section) => document.getElementById(section.id))
      .filter((section): section is HTMLElement => Boolean(section));
    setSectionEls(els);
  }, []);

  useEffect(() => {
    if (sectionEls.length === 0) return;

    const updateProgressAndActive = () => {
      const y = window.scrollY;
      const viewport = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight - viewport;
      const nextProgress = docHeight <= 0 ? 0 : Math.min(100, Math.max(0, (y / docHeight) * 100));
      setProgress(nextProgress);

      const marker = y + NAV_OFFSET + 20;
      let current: string = sectionLinks[0].id;
      for (const section of sectionEls) {
        if (section.offsetTop <= marker) current = section.id;
      }
      setActiveId(current);
    };

    updateProgressAndActive();
    window.addEventListener("scroll", updateProgressAndActive, { passive: true });
    window.addEventListener("resize", updateProgressAndActive);
    return () => {
      window.removeEventListener("scroll", updateProgressAndActive);
      window.removeEventListener("resize", updateProgressAndActive);
    };
  }, [sectionEls]);

  const scrollToY = (top: number) =>
    window.scrollTo({ top: Math.max(0, top - NAV_OFFSET), behavior: "smooth" });

  const scrollToId = (id: string) => {
    const section = document.getElementById(id);
    if (!section) return;
    scrollToY(section.offsetTop);
  };

  const goNext = () => {
    const y = window.scrollY + NAV_OFFSET + 8;
    const nextSection = sectionEls.find((section) => section.offsetTop > y + 1);
    if (nextSection) {
      scrollToY(nextSection.offsetTop);
      return;
    }
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "smooth" });
  };

  const goPrev = () => {
    const y = window.scrollY + NAV_OFFSET + 8;
    const prevSections = sectionEls.filter((section) => section.offsetTop < y - 1);
    const prevSection = prevSections[prevSections.length - 1];
    if (prevSection) {
      scrollToY(prevSection.offsetTop);
      return;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <aside className="pointer-events-none fixed left-3 top-1/2 z-40 hidden -translate-y-1/2 md:block">
      <div className="pointer-events-auto glass-panel flex w-14 flex-col items-center gap-2 rounded-2xl p-2">
        <button
          type="button"
          onClick={goPrev}
          className="rounded-xl border border-border p-2 text-fg-muted transition-colors hover:border-accent hover:text-accent"
          aria-label="Scroll ke bagian sebelumnya"
        >
          <ArrowUp className="h-4 w-4" />
        </button>

        <div className="flex flex-col gap-1">
          {sectionLinks.map((section) => (
            <button
              key={section.id}
              type="button"
              onClick={() => scrollToId(section.id)}
              className="rounded-md px-2 py-1 text-[10px] font-medium text-fg-muted transition-colors hover:text-fg data-[active=true]:bg-accent data-[active=true]:text-accent-fg"
              data-active={activeId === section.id}
              aria-label={`Ke section ${section.label}`}
              title={section.label}
            >
              {section.label[0]}
            </button>
          ))}
        </div>

        <div className="relative h-20 w-2 overflow-hidden rounded-full bg-border" aria-hidden>
          <div
            className="absolute inset-x-0 bottom-0 rounded-full bg-accent transition-[height] duration-200"
            style={{ height: `${progress}%` }}
          />
        </div>

        <button
          type="button"
          onClick={goNext}
          className="rounded-xl border border-border p-2 text-fg-muted transition-colors hover:border-accent hover:text-accent"
          aria-label="Scroll ke bagian selanjutnya"
        >
          <ArrowDown className="h-4 w-4" />
        </button>
      </div>
    </aside>
  );
}
