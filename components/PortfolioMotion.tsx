"use client";

import { AnimatePresence, motion, useReducedMotion, useScroll } from "motion/react";
import { usePathname } from "next/navigation";
import { createContext, useCallback, useContext, useEffect, useState, useSyncExternalStore, type ReactNode } from "react";
import { motionTokens, shouldAnimate } from "@/lib/motion-tokens";

const introKey = "carizsm-intro-seen";
const MotionContext = createContext({ enabled: false, introReady: true });
const subscribeHydration = () => () => {};
const clientSnapshot = () => true;
const serverSnapshot = () => false;
export const usePortfolioMotion = () => useContext(MotionContext);

export function PortfolioMotion({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const hydrated = useSyncExternalStore(subscribeHydration, clientSnapshot, serverSnapshot);
  const [introVisible, setIntroVisible] = useState(false);
  const [introReady, setIntroReady] = useState(true);
  const { scrollYProgress } = useScroll();
  const enabled = hydrated && shouldAnimate(reduced);

  const finishIntro = useCallback(() => {
    setIntroVisible(false);
    setIntroReady(true);
    try { sessionStorage.setItem(introKey, "true"); } catch { /* Storage is optional. */ }
  }, []);

  useEffect(() => {
    if (!enabled || pathname !== "/" || window.location.hash) {
      setIntroVisible(false);
      setIntroReady(true);
      return;
    }
    try { if (sessionStorage.getItem(introKey)) return; } catch { /* Continue without persistence. */ }
    // History navigation should preserve the reader's place instead of replaying an intro.
    if (performance.getEntriesByType("navigation").some(entry => (entry as PerformanceNavigationTiming).type === "back_forward")) return;
    setIntroVisible(true);
    setIntroReady(false);
    function complete() { finishIntro(); removeListeners(); }
    const timer = window.setTimeout(complete, motionTokens.duration.intro * 1000);
    const skip = (event: KeyboardEvent) => { if (event.key === "Escape" || event.key === "Tab") complete(); };
    const focus = (event: FocusEvent) => { if (!(event.target as Element)?.closest(".portfolio-intro")) complete(); };
    function removeListeners() { window.removeEventListener("keydown", skip); document.removeEventListener("focusin", focus); }
    window.addEventListener("keydown", skip);
    document.addEventListener("focusin", focus);
    return () => { clearTimeout(timer); removeListeners(); };
  }, [enabled, pathname, finishIntro]);

  return <MotionContext.Provider value={{ enabled, introReady }}>
    <div className="portfolio-motion-root" data-motion={enabled ? "on" : "off"}>
      {children}
      <motion.div className="reading-progress" aria-hidden style={{ scaleX: scrollYProgress }} />
      <AnimatePresence>
        {introVisible && <motion.div className="portfolio-intro" initial={false} exit={enabled ? { y: "-100%" } : { opacity: 0 }} transition={{ duration: enabled ? motionTokens.duration.slow : motionTokens.duration.fast, ease: motionTokens.easing.smooth }}>
          <div className="intro-corner eyebrow" aria-hidden>Carizsm / Portfolio</div>
          <div className="intro-signature" aria-hidden>
            <motion.svg viewBox="0 0 64 64" initial={false} animate={{ rotate: [0, 90, 0] }} transition={{ duration: motionTokens.duration.intro, ease: motionTokens.easing.smooth }}><path d="M43 18a19 19 0 1 0 0 28" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" /><circle cx="47" cy="32" r="3" fill="currentColor" /></motion.svg>
            <motion.span initial={false} animate={{ y: [motionTokens.distance.entrance, 0] }} transition={{ duration: motionTokens.duration.slow, ease: motionTokens.easing.smooth }}>carizsm.</motion.span>
            <small className="eyebrow">By Cahya Rizqi</small>
          </div>
          <button type="button" className="intro-skip" onClick={finishIntro}>Skip intro <span aria-hidden>↗</span></button>
        </motion.div>}
      </AnimatePresence>
    </div>
  </MotionContext.Provider>;
}

