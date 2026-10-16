"use client";
import { useState } from "react";
import { ArrowUpRight, ArrowUp, Copy } from "lucide-react";
import { personal } from "@/content/personal";
import { Reveal } from "./Reveal";
export function Contact() {
  const [copyStatus,setCopyStatus] = useState<"idle"|"copied"|"error">("idle");
  async function copyEmail() {
    try { await navigator.clipboard.writeText(personal.email); setCopyStatus("copied"); }
    catch { setCopyStatus("error"); }
  }
  return <section id="contact" className="portfolio-contact" aria-labelledby="contact-title"><footer className="portfolio-shell">
    <Reveal className="contact-heading"><p className="eyebrow">06 / Contact</p><h2 id="contact-title">Let’s<br /><em>talk.</em><ArrowUpRight aria-hidden /></h2></Reveal>
    <div className="contact-details"><a href={"mailto:" + personal.email} className="contact-email">{personal.email}<ArrowUpRight size={20} aria-hidden /></a><div className="contact-copy"><button onClick={copyEmail} type="button"><Copy size={15} aria-hidden />Copy email</button><span role="status">{copyStatus==="copied"?"Email copied.":copyStatus==="error"?"Couldn’t copy. You can use the email link.":""}</span></div><div className="contact-socials"><a href={personal.links.github} target="_blank" rel="noopener noreferrer">GitHub<ArrowUpRight size={17} aria-hidden /><span className="sr-only"> (opens in a new tab)</span></a><a href={personal.links.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn<ArrowUpRight size={17} aria-hidden /><span className="sr-only"> (opens in a new tab)</span></a></div></div>
    <div className="contact-bottom"><span>© {new Date().getFullYear()} Carizsm / Cahya Rizqi</span><span>Bandung, Indonesia</span><a href="#top">Back to top<ArrowUp size={15} aria-hidden /></a></div>
  </footer></section>;
}
