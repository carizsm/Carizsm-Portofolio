import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { personal } from "@/content/personal";

export function Nav() {
  return (
    <header className="studio-nav">
      <nav aria-label="Primary" className="studio-shell studio-nav-inner">
        <Link href="/#top" className="studio-wordmark" aria-label={`${personal.name} — home`}>
          cahya<span>.</span>
        </Link>
        <div className="flex items-center gap-2 sm:gap-6">
          <ul className="studio-nav-links">
            <li><Link href="/#work">Work</Link></li>
            <li><Link href="/#about">About</Link></li>
            <li><Link href="/#contact">Contact <ArrowUpRight aria-hidden size={13} className="hidden sm:block" /></Link></li>
          </ul>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
