import { cn } from "@/lib/utils";

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
        "relative mx-auto w-full max-w-6xl px-5 py-24 sm:px-8 sm:py-32",
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
    <header className={cn("mb-12 sm:mb-16", className)}>
      <div className="mb-5 flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-fg-subtle">
        <span className="font-mono text-accent">{index}</span>
        <span aria-hidden className="h-px w-8 bg-border-strong" />
        <span>{label}</span>
      </div>
      <h2 className="serif text-balance text-4xl font-normal tracking-tightish text-fg sm:text-5xl">
        {title}
      </h2>
    </header>
  );
}
