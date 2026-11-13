"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { motion } from "motion/react";
import { motionTokens } from "@/lib/motion-tokens";
import { usePortfolioMotion } from "./PortfolioMotion";
import { ThemeToggle } from "./ThemeToggle";
import { brand } from "@/content/brand";
import "@/app/navigation.css";

const sections = [
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

export function Nav() {
  const pathname = usePathname();
  const [active, setActive] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const { enabled } = usePortfolioMotion();
  const header = useRef<HTMLElement>(null);
  const menu = useRef<HTMLDetailsElement>(null);
  const menuTrigger = useRef<HTMLElement>(null);
  const current = pathname.startsWith("/projects/") ? "work" : pathname === "/" ? active : "";

  useEffect(() => {
    if (pathname !== "/") return;
    let frame = 0;
    function update() {
      frame = 0;
      const readingLine = (header.current?.getBoundingClientRect().bottom ?? 80) + 80;
      let next = "";
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element && element.getBoundingClientRect().top <= readingLine) next = section.id;
      }
      const contact = document.getElementById("contact");
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      if (atBottom && contact && contact.getBoundingClientRect().top < window.innerHeight) next = "contact";
      setActive(next);
    }
    function schedule() { if (!frame) frame = requestAnimationFrame(update); }
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [pathname]);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 601px)");
    function dismissOnDesktop() { if (desktop.matches && menu.current) menu.current.open = false; }
    function dismiss(event: PointerEvent) {
      if (menu.current?.open && !menu.current.contains(event.target as Node)) menu.current.open = false;
    }
    document.addEventListener("pointerdown", dismiss);
    desktop.addEventListener("change", dismissOnDesktop);
    return () => {
      document.removeEventListener("pointerdown", dismiss);
      desktop.removeEventListener("change", dismissOnDesktop);
    };
  }, []);

  function closeMenu() {
    if (menu.current) menu.current.open = false;
    menuTrigger.current?.focus();
  }

  return <header ref={header} className="portfolio-nav">
    <svg className="nav-constellation" viewBox="0 0 320 64" aria-hidden="true" focusable="false">
      <path d="M36 45 82 26 132 37 174 15 225 32 272 18" fill="none" stroke="currentColor" strokeWidth="0.6" />
      <g fill="currentColor">
        <circle cx="36" cy="45" r="1.25" /><circle cx="82" cy="26" r="1.75" />
        <circle cx="132" cy="37" r="1.25" /><circle cx="174" cy="15" r="2" />
        <circle cx="225" cy="32" r="1.5" /><circle cx="272" cy="18" r="1.25" />
        <circle cx="110" cy="11" r="0.7" /><circle cx="245" cy="53" r="0.75" />
      </g>
    </svg>
    <nav aria-label="Primary" className="portfolio-shell portfolio-nav-inner">
    <Link href="/#top" className="portfolio-brand" aria-label={brand.name + " by Cahya — home"}>
      <svg viewBox="0 0 64 64" aria-hidden="true"><path d="M43 18a19 19 0 1 0 0 28" fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="round"/><circle cx="47" cy="32" r="5" fill="currentColor"/></svg>
      <span>carizsm<small>by Cahya</small></span>
    </Link>
    <div className="portfolio-nav-actions">
      <ul className="nav-desktop">{sections.map(section => <li key={section.id}><Link href={"/#" + section.id} aria-current={current === section.id ? "location" : undefined}>{section.label}</Link></li>)}</ul>
      <details ref={menu} className="nav-mobile" onToggle={event => setMenuOpen(event.currentTarget.open)} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget as Node) && menu.current) menu.current.open = false; }} onKeyDown={event => { if (event.key === "Escape" && menu.current?.open) { event.preventDefault(); closeMenu(); } }}>
        <summary ref={menuTrigger}>Menu<Menu className="nav-menu-open" size={17} aria-hidden /><X className="nav-menu-close" size={17} aria-hidden /></summary>
        <motion.ul initial={false} animate={enabled && menuOpen ? { opacity: [0.8, 1], y: [-motionTokens.distance.small, 0] } : { opacity: 1, y: 0 }} transition={{ duration: enabled ? motionTokens.duration.normal : 0, ease: motionTokens.easing.smooth }}>
          {sections.map((section, index) => <motion.li key={section.id} initial={false} animate={enabled && menuOpen ? { x: [-motionTokens.distance.small, 0], opacity: [0.6, 1] } : { x: 0, opacity: 1 }} transition={{ duration: enabled ? motionTokens.duration.normal : 0, delay: enabled && menuOpen ? index * motionTokens.duration.menuStagger : 0, ease: motionTokens.easing.smooth }}>
            <Link href={"/#" + section.id} aria-label={section.label} aria-current={current === section.id ? "location" : undefined} onClick={closeMenu}><span className="eyebrow" aria-hidden>0{index + 1}</span>{section.label}<ArrowUpRight size={18} aria-hidden /></Link>
          </motion.li>)}
        </motion.ul>
      </details>
      <ThemeToggle />
    </div>
  </nav></header>;
}
