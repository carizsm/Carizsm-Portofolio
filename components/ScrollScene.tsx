"use client";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";
import { motionTokens, springs } from "@/lib/motion-tokens";
import { useSceneMotion } from "@/lib/use-scene-motion";

export function ScrollScene({ children, className }: { children: ReactNode; className?: string }) {
  const target = useRef<HTMLDivElement>(null);
  const enabled = useSceneMotion();
  const { scrollYProgress } = useScroll({ target, offset: ["start end", "center center"] });
  const progress = useSpring(scrollYProgress, springs.gentle);
  const y = useTransform(progress, [0, 1], [motionTokens.distance.entrance, 0]);
  const scale = useTransform(progress, [0, 1], [0.96, 1]);
  return <motion.div ref={target} className={className} style={enabled ? { y, scale } : undefined}>{children}</motion.div>;
}
