"use client";

import { useState } from "react";
import { personal } from "@/content/personal";
import { SectionShell } from "./Section";
import { Check, Copy, ExternalLink, Github, Linkedin, Mail, ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmailToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(personal.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      // Fallback
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <SectionShell id="contact" className="!pt-12 pb-16">
      <footer className="relative rounded-3xl border border-border bg-bg-elevated/30 p-8 sm:p-12 overflow-hidden shadow-sm">
        {/* Subtle decorative mesh background overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(ellipse_at_bottom_right,var(--color-accent-soft),transparent_60%)]" />

        <div className="relative z-10 grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          {/* Main call to action */}
          <div className="flex flex-col justify-between">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                Let&apos;s Connect
              </span>
              <h2 className="serif text-4xl text-fg sm:text-5xl lg:text-6xl mt-4 leading-tight">
                Let&apos;s build something meaningful.
              </h2>
              <p className="mt-4 max-w-lg text-pretty text-base leading-relaxed text-fg-muted sm:text-lg">
                I&apos;m open to collaborations, internship opportunities, and honest conversations around product design, mobile engineering, and building thoughtful software.
              </p>
            </div>

            {/* Email copying widget */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-accent px-6 text-sm font-semibold text-accent-fg transition-all duration-300 hover:bg-accent-hover hover:scale-[1.02] shadow-[0_4px_16px_color-mix(in_oklch,var(--color-accent)_25%,transparent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                href={`mailto:${personal.email}`}
              >
                <Mail className="h-4 w-4" />
                Email me
              </a>

              <div className="relative">
                <button
                  type="button"
                  onClick={copyEmailToClipboard}
                  className="inline-flex h-12 w-full sm:w-auto items-center justify-center gap-2.5 rounded-full border border-border bg-bg/60 px-5 text-sm font-medium text-fg-muted transition-all duration-300 hover:border-border-strong hover:text-fg hover:bg-bg"
                >
                  <AnimatePresence mode="wait">
                    {copied ? (
                      <motion.span
                        key="copied"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        className="inline-flex items-center gap-1.5 text-accent font-semibold"
                      >
                        <Check className="h-4 w-4" />
                        Copied!
                      </motion.span>
                    ) : (
                      <motion.span
                        key="copy"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        className="inline-flex items-center gap-1.5"
                      >
                        <Copy className="h-3.5 w-3.5 text-fg-subtle" />
                        <span>Copy: {personal.email}</span>
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </div>
            </div>
          </div>

          {/* Social Profiles & Resource Grid */}
          <div className="flex flex-col justify-between border-t border-border/60 pt-8 lg:border-t-0 lg:border-l lg:border-border/60 lg:pt-0 lg:pl-12">
            <div>
              <h3 className="text-xs uppercase tracking-[0.16em] text-fg-subtle font-semibold mb-4">
                On the Internet
              </h3>
              <div className="grid gap-3">
                <a
                  href={personal.links.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between rounded-2xl border border-border bg-bg/40 p-4 transition-all duration-300 hover:border-accent hover:bg-bg hover:shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0077B5]/10 text-[#0077B5]">
                      <Linkedin className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="block text-sm font-semibold text-fg">LinkedIn</span>
                      <span className="text-xs text-fg-subtle">Professional networking</span>
                    </div>
                  </div>
                  <ExternalLink className="h-4 w-4 text-fg-subtle transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-fg" />
                </a>

                <a
                  href={personal.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between rounded-2xl border border-border bg-bg/40 p-4 transition-all duration-300 hover:border-accent hover:bg-bg hover:shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-fg/10 text-fg">
                      <Github className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="block text-sm font-semibold text-fg">GitHub</span>
                      <span className="text-xs text-fg-subtle">Repositories & software builds</span>
                    </div>
                  </div>
                  <ExternalLink className="h-4 w-4 text-fg-subtle transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-fg" />
                </a>
              </div>
            </div>

            {/* Quick Links & Scroll back to top */}
            <div className="mt-12 flex items-center justify-between text-xs text-fg-subtle border-t border-border/40 pt-6">
              <p>© {new Date().getFullYear()} • Built by Cahya</p>
              <button
                type="button"
                onClick={scrollToTop}
                className="inline-flex items-center gap-1.5 font-medium text-fg-muted transition-colors hover:text-accent focus-visible:outline-none"
                aria-label="Scroll back to top"
              >
                Back to top
                <ArrowUp className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </footer>
    </SectionShell>
  );
}

