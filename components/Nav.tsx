import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { brand } from "@/content/brand";
export function Nav() {
  return <header className="portfolio-nav"><nav aria-label="Primary" className="portfolio-shell portfolio-nav-inner">
    <Link href="/#top" className="portfolio-brand" aria-label={brand.name + " by Cahya — home"}>
      <svg viewBox="0 0 64 64" aria-hidden="true"><path d="M43 18a19 19 0 1 0 0 28" fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="round"/><circle cx="47" cy="32" r="5" fill="currentColor"/></svg>
      <span>carizsm<small>by Cahya</small></span>
    </Link>
    <div className="portfolio-nav-actions"><ul><li><Link href="/#work">Work</Link></li><li className="nav-experience"><Link href="/#experience">Experience</Link></li><li className="nav-about"><Link href="/#about">About</Link></li><li><Link href="/#contact">Contact</Link></li></ul><ThemeToggle /></div>
  </nav></header>;
}
