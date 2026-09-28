import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

export function SectionShell({
  id,
  className,
  children,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn(
        "studio-shell studio-section",
        className,
      )}
    >
      {children}
    </section>
  );
}

export function SectionHead({
  index,
  label,
  title,
  className,
}: {
  index: string;
  label: string;
  title: React.ReactNode;
  className?: string;
}) {
  return (
    <Reveal as="header" className={cn("studio-section-heading", className)}>
      <div className="studio-label mb-5 flex items-center gap-3 text-fg-muted">
        <span className="font-mono text-accent">{index}</span>
        <span aria-hidden className="h-px w-8 bg-border-strong" />
        <span>{label}</span>
      </div>
      <h2 className="text-balance">
        {title}
      </h2>
    </Reveal>
  );
}
