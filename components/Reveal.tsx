"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

const easing = [0.22, 1, 0.36, 1] as const;

export function Reveal({
  children,
  delay = 0,
  y = 12,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "span" | "li" | "p" | "header";
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[Tag];

  return (
    <MotionTag
      initial={false}
      animate={reduce ? { y: 0 } : undefined}
      whileInView={reduce ? undefined : { y: [y, 0] }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: reduce ? 0 : 0.45, ease: easing, delay: reduce ? 0 : Math.min(delay, 0.12) }}
      className={className}
    >
      {children}
    </MotionTag>
  );
}
