"use client";
import { motion } from "motion/react";
import type { ReactNode } from "react";
import { motionTokens } from "@/lib/motion-tokens";
import { usePortfolioMotion } from "./PortfolioMotion";
export function Reveal({ children, delay = 0, y = motionTokens.distance.content, className, as: Tag = "div" }: { children: ReactNode; delay?: number; y?: number; className?: string; as?: "div" | "span" | "li" | "p" | "header" }) {
  const { enabled } = usePortfolioMotion();
  const MotionTag = motion[Tag];
  return <MotionTag initial={false} whileInView={enabled ? { y: [y, 0], opacity: [0.75, 1] } : undefined} animate={!enabled ? { y: 0, opacity: 1 } : undefined} viewport={{ once: true, amount: 0.2 }} transition={{ duration: enabled ? motionTokens.duration.reveal : 0, ease: motionTokens.easing.smooth, delay: enabled ? Math.min(delay, motionTokens.duration.normal) : 0 }} className={className}>{children}</MotionTag>;
}
