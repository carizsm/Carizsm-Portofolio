"use client";
import { motion } from "motion/react";
import type { ReactNode } from "react";
import { motionTokens } from "@/lib/motion-tokens";
import { usePortfolioMotion } from "./PortfolioMotion";
export function Reveal({ children, delay = 0, y = motionTokens.distance.entrance, className, as: Tag = "div" }: { children: ReactNode; delay?: number; y?: number; className?: string; as?: "div" | "span" | "li" | "p" | "header" }) {
  const { enabled } = usePortfolioMotion();
  const MotionTag = motion[Tag];
  return <MotionTag initial={false} whileInView={enabled ? { y: [y, 0], opacity: [0.5, 1] } : undefined} animate={!enabled ? { y: 0, opacity: 1 } : undefined} viewport={{ once: true, amount: 0.2 }} transition={{ duration: enabled ? motionTokens.duration.slow : 0, ease: motionTokens.easing.smooth, delay: enabled ? Math.min(delay, motionTokens.duration.normal) : 0 }} className={className}>{children}</MotionTag>;
}
