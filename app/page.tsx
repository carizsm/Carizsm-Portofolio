import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Projects } from "@/components/Projects";
import { Experience } from "@/components/Experience";
import { Skills } from "@/components/Skills";
import { Awards } from "@/components/Awards";
import { Contact } from "@/components/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Projects />
      <About />
      <Experience />
      <Skills />
      <Awards />
      <Contact />
    </>
  );
}
