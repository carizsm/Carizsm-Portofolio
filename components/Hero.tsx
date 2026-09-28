import Image from "next/image";
import { ArrowDown, ArrowUpRight, MoveUpRight } from "lucide-react";
import { personal } from "@/content/personal";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="studio-hero studio-shell">
      <div className="studio-hero-top studio-label">
        <span>Cahya Rizqi Syah Maulana</span>
        <span className="hidden sm:inline">{personal.location} / UTC+7</span>
      </div>
      <div className="studio-hero-grid">
        <div className="studio-intro">
          <p className="studio-label text-accent">Software engineer & product-minded builder</p>
          <h1 id="hero-title" className="studio-title">
            A little<br />curious.<br />
            <span className="studio-title-last">Very hands-on<span className="text-accent">.</span></span>
          </h1>
          <p className="studio-intro-copy">
            I’m Cahya. I turn questions into software, product experiments,
            and things that work beyond the screen.
          </p>
          <a href="#work" className="studio-cta">
            Take a look around <ArrowDown aria-hidden size={17} />
          </a>
        </div>
        <div className="studio-desk" aria-label="A few things I’m working on">
          <div className="celestial-orbit" aria-hidden="true"><span /></div>
          <span className="studio-desk-label studio-label">On the worktable</span>
          <a href="#work-iterra" className="desk-trip desk-object">
            <div className="flex items-center justify-between gap-3 studio-label">
              <span>01 / Product</span><ArrowUpRight aria-hidden size={18} />
            </div>
            <span className="desk-trip-title">Going places.<br />Together.</span>
            <div className="desk-route" aria-hidden="true">
              <span>A</span><i /><span>B</span><i /><span>C</span>
            </div>
            <div className="desk-trip-footer">
              <strong>Iterra</strong><span>Travel planning MVP</span>
            </div>
          </a>
          <a href="#work-adaptive-pomodoro" className="desk-research desk-object">
            <div className="studio-label flex items-center justify-between gap-2">
              <span>02 / Research</span><ArrowUpRight aria-hidden size={16} />
            </div>
            <span className="desk-research-title">Can a timer<br />pay attention?</span>
            <div className="desk-research-plot">
              <Image src="/projects/adaptive-pomodoro-probability.png"
                alt="Focus-probability distribution from the Adaptive Pomodoro P1 evaluation"
                width={2360} height={1280} sizes="240px" />
            </div>
            <span className="studio-label">Adaptive Pomodoro ↗</span>
          </a>
          <a href="#about" className="desk-portrait desk-object" aria-label="Meet Cahya, the person behind the work">
            <div className="desk-portrait-image">
              <Image src="/profile/cahya-hero.png" alt="Cahya sitting on a stool" fill priority sizes="(max-width: 640px) 140px, 175px" />
            </div>
            <span>Hi, I’m Cahya.<ArrowUpRight aria-hidden size={14} /></span>
          </a>
          <span aria-hidden="true" className="desk-note">a person behind<br />the pixels <MoveUpRight size={25} strokeWidth={1} /></span>
        </div>
      </div>
      <div className="studio-hero-bottom">
        <span className="studio-label">Web products / Applied research / Connected devices</span>
        <a href="#work-index" className="studio-text-link">Browse the work index <ArrowUpRight aria-hidden size={15} /></a>
      </div>
    </section>
  );
}
