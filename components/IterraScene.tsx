"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { iterraChapters } from "@/content/portfolio";
import { getWorkPreview } from "@/content/work-previews";
import { projects } from "@/content/projects";
import { useSceneMotion } from "@/lib/use-scene-motion";
import { motionTokens, springs } from "@/lib/motion-tokens";
import { usePortfolioMotion } from "./PortfolioMotion";
import { Reveal } from "./Reveal";

export function IterraScene() {
  const scene = useRef<HTMLDivElement>(null);
  const chapters = useRef<Array<HTMLElement | null>>([]);
  const [activeChapter, setActiveChapter] = useState(0);
  const [view, setView] = useState(0);
  const [announcement, setAnnouncement] = useState("");
  const { enabled } = usePortfolioMotion();
  const sceneMotion = useSceneMotion();
  const media = getWorkPreview("iterra");
  const project = projects.find(({ id }) => id === "iterra")!;
  const { scrollYProgress } = useScroll({ target: scene, offset: ["start end", "start 0.2"] });
  const progress = useSpring(scrollYProgress, springs.gentle);
  const scale = useTransform(progress, [0, 1], [0.9, 1]);
  const y = useTransform(progress, [0, 1], [motionTokens.distance.entrance, 0]);

  useEffect(() => {
    if (!sceneMotion) return;
    let observer: IntersectionObserver;
    function observeChapters() {
      observer?.disconnect();
      const height = document.documentElement.clientHeight;
      // Pixel margins track viewport height; percentage margins use viewport width.
      observer = new IntersectionObserver(entries => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const index = Number((entry.target as HTMLElement).dataset.chapter);
          setActiveChapter(index);
          setView(iterraChapters[index].mediaIndex);
        }
      }, { rootMargin: `-${Math.round(height * 0.35)}px 0px -${Math.round(height * 0.45)}px 0px`, threshold: 0 });
      chapters.current.forEach(chapter => { if (chapter) observer.observe(chapter); });
    }
    observeChapters();
    window.addEventListener("resize", observeChapters);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", observeChapters);
    };
  }, [sceneMotion]);

  function selectView(index: number) {
    setView(index);
    setAnnouncement("Showing " + media[index].caption.split(" · ")[0] + ".");
  }

  return <article id="work-iterra" className="iterra-project story-product" aria-labelledby="iterra-title">
    <header className="portfolio-shell story-product-heading">
      <div className="story-project-meta"><h3 id="iterra-title" className="eyebrow">Iterra / 2026</h3><span className="eyebrow">Product direction & implementation</span></div>
      <Reveal><p className="story-premise">One trip.<br /><em>One shared place.</em></p></Reveal>
      <p className="story-product-intro">Plans in chats. Costs in notes.<br /> I brought them into one workspace.</p>
    </header>
    <div ref={scene} className="story-product-scene portfolio-shell" data-scene-motion={sceneMotion}>
      <div className="iterra-visual story-product-visual">
        <div className="artifact-toolbar"><span className="eyebrow">Working MVP</span><span className="artifact-status">Sample trip data</span></div>
        <motion.figure id="iterra-view-panel" className="iterra-screen" style={sceneMotion ? { scale, y } : undefined}>
          <div className="iterra-image">
            {media.map((image, index) => <motion.div key={image.src} className="story-capture-layer" data-active={view === index} aria-hidden={view !== index} initial={false} animate={{ opacity: view === index ? 1 : 0 }} transition={{ duration: enabled ? motionTokens.duration.fast : 0 }}>
              <Image src={image.src} alt={image.alt} fill sizes="(max-width: 900px) 90vw, 820px" />
            </motion.div>)}
          </div>
          <figcaption><span>{media[view].caption.split(" · ")[0]}</span><a href={media[view].src} target="_blank" rel="noopener noreferrer">Full image<ArrowUpRight size={15} aria-hidden /><span className="sr-only"> (opens in a new tab)</span></a></figcaption>
        </motion.figure>
        <div className="scene-view-controls" role="group" aria-label="Iterra product views">
          {media.map((image, index) => <button key={image.src} type="button" aria-pressed={view === index} aria-controls="iterra-view-panel" onClick={() => selectView(index)}>
            <span className="eyebrow">0{index + 1}</span>{image.caption.split(" · ")[0]}
            {view === index && <motion.i aria-hidden layoutId="iterra-view" transition={{ duration: enabled ? motionTokens.duration.normal : 0, ease: motionTokens.easing.smooth }} />}
          </button>)}
        </div>
        <p className="story-reading-cue eyebrow" aria-hidden>{sceneMotion ? <><span>0{activeChapter + 1} / 03</span>{iterraChapters[activeChapter].label}</> : "Product direction · Interface · Data model"}</p>
        <p className="sr-only" role="status">{announcement}</p>
      </div>
      <div className="story-product-chapters">
        {iterraChapters.map((chapter, index) => <section
          ref={element => { chapters.current[index] = element; }}
          id={"iterra-chapter-" + index}
          data-chapter={index}
          data-active={!sceneMotion || activeChapter === index}
          className="story-product-chapter"
          key={chapter.label}
          aria-labelledby={"iterra-chapter-title-" + index}
        >
          <span className="eyebrow story-chapter-label"><span>0{index + 1}</span>{chapter.label}</span>
          <h4 id={"iterra-chapter-title-" + index}>{chapter.title}</h4>
          <p>{chapter.body}</p><span className="story-chapter-detail">{chapter.detail}</span>
        </section>)}
        <div className="project-actions story-project-actions">
          <Link href="/projects/iterra" className="portfolio-button">Inside the project<ArrowUpRight size={18} aria-hidden /></Link>
          {project.links?.repo && <a href={project.links.repo} className="portfolio-link" target="_blank" rel="noopener noreferrer">Source code<ArrowUpRight size={16} aria-hidden /><span className="sr-only"> (opens in a new tab)</span></a>}
        </div>
      </div>
    </div>
  </article>;
}
