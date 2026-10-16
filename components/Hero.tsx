"use client";
import Image from "next/image";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { motion, useInView, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";
import { useRef, type PointerEvent } from "react";
import { personal } from "@/content/personal";
import { motionTokens, springs } from "@/lib/motion-tokens";
import { useSceneMotion } from "@/lib/use-scene-motion";
import { usePortfolioMotion } from "./PortfolioMotion";

export function Hero() {
  const section = useRef<HTMLElement>(null);
  const inView = useInView(section);
  const { enabled, introReady } = usePortfolioMotion();
  const sceneMotion = useSceneMotion();
  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end start"] });
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, motionTokens.distance.scene]);
  const nameX = useTransform(scrollYProgress, [0, 1], [0, -motionTokens.distance.scene]);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const rotateX = useSpring(pointerY, springs.gentle);
  const rotateY = useSpring(pointerX, springs.gentle);
  const enter = enabled && introReady;

  function movePortrait(event: PointerEvent<HTMLDivElement>) {
    if (!sceneMotion || event.pointerType === "touch") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set(((event.clientX - bounds.left) / bounds.width - 0.5) * motionTokens.tilt * 2);
    pointerY.set(-((event.clientY - bounds.top) / bounds.height - 0.5) * motionTokens.tilt * 2);
  }
  function resetPortrait() { pointerX.set(0); pointerY.set(0); }

  return <section ref={section} className="portfolio-hero portfolio-shell" aria-labelledby="hero-title">
    <div className="hero-eyebrow eyebrow"><span>Software engineer</span><span>Bandung / UTC+7</span></div>
    <div className="hero-composition">
      <motion.h1 id="hero-title" style={sceneMotion ? { x: nameX } : undefined}>
        <span className="hero-name-mask"><motion.span className="hero-first-name" initial={false} animate={enter ? { y: [motionTokens.distance.scene, 0], opacity: [0.5, 1] } : { y: 0, opacity: 1 }} transition={{ duration: motionTokens.duration.slow, ease: motionTokens.easing.smooth }}>Cahya</motion.span></span>
        <span className="hero-name-mask"><motion.span className="hero-last-name" initial={false} animate={enter ? { y: [motionTokens.distance.scene, 0], opacity: [0.5, 1] } : { y: 0, opacity: 1 }} transition={{ duration: motionTokens.duration.slow, delay: enter ? motionTokens.duration.fast : 0, ease: motionTokens.easing.smooth }}>Rizqi<span className="hero-period">.</span></motion.span></span>
      </motion.h1>
      <motion.figure className="hero-portrait" style={sceneMotion ? { y: portraitY } : undefined}>
        <motion.div className="hero-portrait-float" initial={false} animate={sceneMotion && inView && introReady ? { y: [0, -motionTokens.distance.small, 0] } : { y: 0 }} transition={{ duration: sceneMotion && inView && introReady ? motionTokens.duration.float : 0, repeat: sceneMotion && inView ? Infinity : 0, ease: "easeInOut" }}>
          <motion.div className="hero-portrait-image" onPointerMove={movePortrait} onPointerLeave={resetPortrait} style={sceneMotion ? { rotateX, rotateY } : undefined}>
            <motion.div className="hero-portrait-photo" initial={false} animate={enter ? { scale: [1.08, 1] } : { scale: 1 }} transition={{ duration: motionTokens.duration.slow, ease: motionTokens.easing.smooth }}>
              <Image src="/profile/cahya-portrait.webp" alt="Cahya Rizqi wearing glasses and a white shirt, against a brick-red wall" fill priority sizes="(max-width: 600px) 38vw, (max-width: 900px) 40vw, 430px" />
            </motion.div>
          </motion.div>
          <div className="portrait-orbit" aria-hidden>
            <motion.svg viewBox="0 0 80 80" initial={false} animate={{ rotate: enabled && inView ? 360 : 0 }} transition={{ duration: enabled && inView ? motionTokens.duration.orbit : 0, repeat: enabled && inView ? Infinity : 0, ease: "linear" }}><circle cx="40" cy="40" r="31" fill="none" stroke="currentColor" strokeWidth=".8" /><circle cx="40" cy="9" r="4" fill="currentColor" /></motion.svg>
            <span>C.</span>
          </div>
        </motion.div>
        <figcaption><span>Cahya / 2026</span><span aria-hidden>↗</span></figcaption>
      </motion.figure>
      <motion.div className="hero-context" initial={false} animate={enter ? { y: [motionTokens.distance.entrance, 0], opacity: [0.5, 1] } : { y: 0, opacity: 1 }} transition={{ duration: motionTokens.duration.slow, delay: enter ? motionTokens.duration.normal : 0, ease: motionTokens.easing.smooth }}>
        <p className="hero-role">Web products.<br /><em>From interface to API.</em></p>
        <p className="hero-description">Frontend & backend at Yayasan Pendidikan Telkom.</p>
        <div className="hero-actions"><a href="#work" className="portfolio-button">Selected work<ArrowDown size={18} aria-hidden /></a><a href={"mailto:" + personal.email} className="portfolio-link">Get in touch<ArrowUpRight size={17} aria-hidden /></a></div>
      </motion.div>
    </div>
    <a href="#work-iterra" className="hero-next-project">
      <span className="eyebrow">Up next / 01</span>
      <span className="hero-next-image"><Image src="/projects/captures/iterra-overview.png" alt="Iterra trip workspace preview" fill sizes="120px" /></span>
      <span><strong>Iterra</strong><small>Group travel, in one place.</small></span><ArrowUpRight size={22} aria-hidden />
    </a>
  </section>;
}
