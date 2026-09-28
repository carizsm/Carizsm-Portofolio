"use client";

import { useState } from "react";
import { ArrowUp, ArrowUpRight, Copy } from "lucide-react";
import { personal } from "@/content/personal";
import { SectionShell } from "./Section";

export function Contact() {
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "error">("idle");
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(personal.email);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("error");
    }
  }

  return (
    <SectionShell id="contact" className="studio-contact">
      <footer>
        <div className="studio-contact-top">
          <div>
            <p className="studio-label text-accent">A conversation is a good place to start</p>
            <h2>Have something<br />in mind<span className="text-accent">?</span></h2>
            <p className="studio-contact-copy">A product to build, a problem to untangle, or an idea worth exploring. I’d like to hear about it.</p>
            <a className="studio-contact-email" href={`mailto:${personal.email}`}>{personal.email}<ArrowUpRight size={23} aria-hidden /></a>
            <div className="studio-copy-row">
              <button type="button" onClick={copyEmail}><Copy size={13} aria-hidden />Copy email</button>
              <span role="status">{copyStatus === "copied" ? "Email copied." : copyStatus === "error" ? "Couldn’t copy. The email link is available above." : ""}</span>
            </div>
          </div>
          <div className="studio-contact-links">
            <p className="studio-label">Find me online</p>
            <a href={personal.links.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn<ArrowUpRight size={17} aria-hidden /><span className="sr-only"> (opens in a new tab)</span></a>
            <a href={personal.links.github} target="_blank" rel="noopener noreferrer">GitHub<ArrowUpRight size={17} aria-hidden /><span className="sr-only"> (opens in a new tab)</span></a>
          </div>
        </div>
        <div className="studio-contact-bottom">
          <span>© {new Date().getFullYear()} {personal.shortName}</span>
          <a href="#top">Back to top<ArrowUp size={14} aria-hidden /></a>
        </div>
      </footer>
    </SectionShell>
  );
}
