"use client";
import { Moon, Sun } from "lucide-react";
import { motion } from "motion/react";
import { useTheme } from "./ThemeProvider";
import { motionTokens } from "@/lib/motion-tokens";
import { usePortfolioMotion } from "./PortfolioMotion";
export function ThemeToggle() {
  const {resolved,toggle} = useTheme();
  const { enabled } = usePortfolioMotion();
  return <motion.button type="button" onClick={toggle} aria-label={"Switch to " + (resolved==="dark"?"light":"dark") + " mode"} className="theme-toggle" whileTap={enabled?{scale:motionTokens.scale.press}:undefined} transition={{duration:enabled ? motionTokens.duration.fast : 0}}>
    {resolved==="dark"?<Sun size={18} strokeWidth={1.6} aria-hidden />:<Moon size={18} strokeWidth={1.6} aria-hidden />}
  </motion.button>;
}
