"use client";

import { Moon, Sun } from "lucide-react";
import { useRef, type MouseEvent } from "react";
import { flushSync } from "react-dom";
import { usePortfolioMotion } from "./PortfolioMotion";
import { useTheme } from "./ThemeProvider";

export function ThemeToggle() {
  const { resolved, toggle } = useTheme();
  const { enabled } = usePortfolioMotion();
  const activeTransition = useRef<ViewTransition | null>(null);

  function changeTheme(event: MouseEvent<HTMLButtonElement>) {
    if (activeTransition.current) {
      activeTransition.current.skipTransition();
      return;
    }

    if (!enabled || !document.startViewTransition) {
      toggle();
      return;
    }

    const { left, top, width, height } = event.currentTarget.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    const root = document.documentElement;
    root.style.setProperty("--theme-origin", `${x}px ${y}px`);
    root.style.setProperty("--theme-radius", `${radius}px`);
    root.classList.add("theme-changing");

    const transition = document.startViewTransition(() => flushSync(toggle));
    activeTransition.current = transition;
    const cleanUp = () => {
      activeTransition.current = null;
      root.classList.remove("theme-changing");
      root.style.removeProperty("--theme-origin");
      root.style.removeProperty("--theme-radius");
    };
    void transition.ready.catch(() => {});
    void transition.finished.then(cleanUp, cleanUp);
  }

  return (
    <button
      type="button"
      onClick={changeTheme}
      aria-label={resolved === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      className="theme-toggle"
    >
      <Moon className="theme-icon-moon" size={18} strokeWidth={1.6} aria-hidden />
      <Sun className="theme-icon-sun" size={18} strokeWidth={1.6} aria-hidden />
    </button>
  );
}
