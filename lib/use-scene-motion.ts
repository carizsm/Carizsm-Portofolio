"use client";
import { useSyncExternalStore } from "react";
import { useReducedMotion } from "motion/react";
import { shouldAnimate } from "./motion-tokens";
import { usePortfolioMotion } from "@/components/PortfolioMotion";
const query = "(min-width: 901px) and (pointer: fine)";
function subscribe(callback: () => void) {
  const media = window.matchMedia(query);
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}
function getSnapshot() {
  return window.matchMedia(query).matches && (navigator.hardwareConcurrency ?? 8) > 4;
}
export function useSceneMotion() {
  const desktop = useSyncExternalStore(subscribe, getSnapshot, () => false);
  const { enabled } = usePortfolioMotion();
  return shouldAnimate(useReducedMotion()) && desktop && enabled;
}
