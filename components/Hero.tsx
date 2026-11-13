"use client";

import Image from "next/image";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import { personal } from "@/content/personal";
import { motionTokens } from "@/lib/motion-tokens";
import { usePortfolioMotion } from "./PortfolioMotion";

export function Hero() {
  const { enabled, introReady } = usePortfolioMotion();
  const enter = enabled && introReady;
  const entrance = {
    duration: enter ? motionTokens.duration.slow : 0,
    ease: motionTokens.easing.smooth,
  };

  return (
    <section className="portfolio-hero" aria-labelledby="hero-title">
      <div className="hero-inner portfolio-shell">
        <div className="hero-eyebrow eyebrow"><span>Software engineer</span><span>Bandung</span></div>
        <div className="hero-composition">
          <motion.h1
            id="hero-title"
            initial={false}
            animate={enter ? { y: [motionTokens.distance.entrance, 0], opacity: [0.6, 1] } : { y: 0, opacity: 1 }}
            transition={entrance}
          >
            <span className="hero-first-name">Cahya</span>{" "}
            <span className="hero-last-name">Rizqi<span className="hero-period">.</span></span>
          </motion.h1>
          <motion.div
            className="hero-portrait"
            initial={false}
            animate={enter ? { opacity: [0.65, 1] } : { opacity: 1 }}
            transition={entrance}
          >
            <div className="hero-portrait-image">
              <Image
                src="/profile/cahya-portrait-transparent.png"
                alt="Cahya Rizqi wearing glasses and a white shirt"
                fill
                priority
                sizes="(max-width: 600px) calc(100vw - 40px), (max-width: 900px) 40vw, 400px"
              />
            </div>
          </motion.div>
          <motion.div
            className="hero-context"
            initial={false}
            animate={enter ? { y: [motionTokens.distance.content, 0], opacity: [0.65, 1] } : { y: 0, opacity: 1 }}
            transition={{ ...entrance, delay: enter ? motionTokens.duration.fast : 0 }}
          >
            <p className="hero-role">I shape digital products, from <em>interface to backend.</em></p>
            <p className="hero-description">Frontend and backend developer at Yayasan Pendidikan Telkom.</p>
            <div className="hero-actions">
              <a href="#work" className="portfolio-button">
                View projects
                <span className="hero-action-icon" aria-hidden="true"><ArrowDown size={16} /></span>
              </a>
              <a href={"mailto:" + personal.email} className="portfolio-link">Email me<ArrowUpRight size={17} aria-hidden /></a>
            </div>
          </motion.div>
        </div>
      </div>
      <div className="orbit-system">
        <div className="hero-background-field" aria-hidden="true" />
        <nav className="orbit-nav portfolio-shell" aria-label="Explore the portfolio">
          {[
            { id: "work", label: "Work" },
            { id: "experience", label: "Experience" },
            { id: "about", label: "About" },
            { id: "contact", label: "Contact" },
          ].map((item) => (
            <div className="orbit-path" key={item.id}>
              <a href={`#${item.id}`} aria-label={`Go to ${item.label}`}>
                <span className="orbit-planet" aria-hidden="true" />
                <span className="orbit-label">{item.label}</span>
              </a>
            </div>
          ))}
        </nav>
      </div>
    </section>
  );
}
