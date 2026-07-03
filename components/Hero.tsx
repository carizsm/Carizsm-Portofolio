"use client";

import Image from "next/image";
import { useEffect, useReducer, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowDown, MapPin } from "lucide-react";
import { personal } from "@/content/personal";

const rotatingWords = ["human-centered", "considered", "useful", "joyful"];

const easing = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const [idx, advance] = useReducer(
    (s: number) => (s + 1) % rotatingWords.length,
    0,
  );
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    if (mq.matches) return;
    const t = window.setInterval(advance, 2400);
    return () => window.clearInterval(t);
  }, []);

  const longest = rotatingWords.reduce((a, b) =>
    a.length > b.length ? a : b,
  );

  const firstLine = personal.name.split(" ").slice(0, 2).join(" ");
  const secondLine = personal.name.split(" ").slice(2).join(" ");

  return (
    <section
      aria-labelledby="hero-name"
      className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden pb-16 pt-28 sm:pb-14 sm:pt-24"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute -right-32 -top-32 h-[60vh] w-[60vh] rounded-full opacity-60 blur-[120px]"
          style={{
            background:
              "radial-gradient(closest-side, var(--color-accent-soft), transparent)",
          }}
        />
        <div className="absolute inset-0 opacity-[0.06] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]">
          <div className="grid-lines absolute inset-0" />
        </div>
      </div>

      <motion.div
        aria-hidden
        initial={{ x: 24 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.8, ease: easing, delay: 0.2 }}
        className="pointer-events-none absolute bottom-[-3rem] right-[-9rem] z-0 h-[46svh] w-[88vw] max-w-[36rem] opacity-[0.12] [mask-image:linear-gradient(90deg,transparent_0%,black_48%,black_100%)] sm:bottom-24 sm:right-[max(-8rem,calc((100vw-72rem)/2-9rem))] sm:h-[72svh] sm:w-[48vw] sm:max-w-[40rem] sm:opacity-70 sm:[mask-image:linear-gradient(90deg,transparent_0%,black_34%,black_100%)] lg:bottom-36 lg:h-[80svh]"
      >
        <Image
          src="/profile/cahya-hero.png"
          alt=""
          width={1467}
          height={2200}
          priority
          sizes="(max-width: 640px) 88vw, (max-width: 1024px) 48vw, 672px"
          className="h-full w-full object-contain object-bottom grayscale-[0.76] sepia-[0.16] saturate-[0.72] contrast-[1.08] brightness-[1.02] drop-shadow-[0_28px_70px_rgba(0,0,0,0.18)] dark:brightness-[0.84] dark:contrast-[1.12] dark:drop-shadow-[0_32px_80px_rgba(0,0,0,0.38)]"
        />
      </motion.div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: easing }}
          className="mb-8 inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-fg-muted sm:mb-7"
        >
          <span className="relative grid h-2 w-2 place-items-center">
            <span className="absolute h-2 w-2 rounded-full bg-accent" />
            {!reduceMotion && (
              <motion.span
                className="absolute h-2 w-2 rounded-full bg-accent"
                animate={{ scale: [1, 2.4], opacity: [0.6, 0] }}
                transition={{
                  duration: 1.6,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
              />
            )}
          </span>
          <span>Available · Product-minded developer & designer</span>
        </motion.div>

        <h1
          id="hero-name"
          className="serif text-balance text-[clamp(3rem,9.5vw,7.25rem)] font-normal leading-[0.95] tracking-tighter text-fg"
        >
          <SplitReveal text={firstLine} />
          <span className="block" />
          <SplitReveal text={secondLine} delay={0.18} italic />
        </h1>

        <div className="mt-10 grid gap-12 sm:mt-9 sm:grid-cols-12 sm:gap-8">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: easing, delay: 0.45 }}
            className="text-balance text-base text-fg-muted sm:col-span-7 sm:text-lg"
          >
            Final-year IT student turning ideas into{" "}
            <span className="relative inline-block whitespace-nowrap align-baseline">
              <span className="invisible">{longest}</span>
              <span className="absolute inset-0 grid place-items-start">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={rotatingWords[idx]}
                    initial={
                      reduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }
                    }
                    animate={{ opacity: 1, y: 0 }}
                    exit={
                      reduceMotion ? { opacity: 1 } : { opacity: 0, y: -10 }
                    }
                    transition={{ duration: 0.32, ease: easing }}
                    className="text-accent"
                  >
                    {rotatingWords[idx]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </span>{" "}
            products.
          </motion.p>

          <motion.dl
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: easing, delay: 0.55 }}
            className="grid grid-cols-2 gap-x-6 gap-y-4 text-sm sm:col-span-5"
          >
            <div className="flex flex-col gap-1">
              <dt className="text-xs uppercase tracking-[0.16em] text-fg-subtle">
                Based in
              </dt>
              <dd className="inline-flex items-center gap-1.5 text-fg">
                <MapPin className="h-3.5 w-3.5 text-fg-muted" />
                {personal.location}
              </dd>
            </div>
            <div className="flex flex-col gap-1">
              <dt className="text-xs uppercase tracking-[0.16em] text-fg-subtle">
                Studying
              </dt>
              <dd className="text-fg">B.Sc. IT, Telkom Univ.</dd>
            </div>
            <div className="flex flex-col gap-1">
              <dt className="text-xs uppercase tracking-[0.16em] text-fg-subtle">
                Working on
              </dt>
              <dd className="text-fg">Adaptive Pomodoro · Frontend at YPT</dd>
            </div>
            <div className="flex flex-col gap-1">
              <dt className="text-xs uppercase tracking-[0.16em] text-fg-subtle">
                Open to
              </dt>
              <dd className="text-fg">Frontend · Product collaborations</dd>
            </div>
          </motion.dl>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-16 flex items-center gap-4 text-sm text-fg-muted sm:mt-12"
        >
          <a
            href="#work"
            className="group inline-flex items-center gap-2 rounded-full border border-border-strong bg-bg-elevated px-4 py-2 text-fg transition-colors hover:border-accent hover:text-accent"
          >
            <span>See selected work</span>
            <ArrowDown className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-y-0.5" />
          </a>
          <span aria-hidden className="h-px w-12 bg-border-strong" />
          <a
            href="#contact"
            className="hidden text-fg-muted transition-colors hover:text-fg sm:inline"
          >
            Get in touch →
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function SplitReveal({
  text,
  delay = 0,
  italic = false,
}: {
  text: string;
  delay?: number;
  italic?: boolean;
}) {
  const words = text.split(" ");
  return (
    <span className={italic ? "italic" : ""}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="inline-block overflow-hidden align-baseline pb-[0.06em]"
        >
          <motion.span
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            transition={{
              duration: 0.7,
              ease: easing,
              delay: delay + i * 0.06,
            }}
            className="inline-block"
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
