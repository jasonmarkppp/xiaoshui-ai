import { cn } from "@/lib/utils";
import type { HTMLAttributes, ReactNode } from "react";

export function SectionHeading({
  title,
  subtitle,
  eyebrow,
  className,
}: {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  className?: string;
}) {
  return (
    <div className={cn("mb-8 md:mb-12", className)}>
      {eyebrow ? (
        <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--text-muted)]">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="section-title text-[var(--text)]">{title}</h2>
      {subtitle ? (
        <p className="mt-3 max-w-xl text-base text-[var(--text-secondary)] md:text-lg">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

export function Container({
  children,
  className,
  id,
  ...rest
}: {
  children: ReactNode;
  className?: string;
  id?: string;
} & HTMLAttributes<HTMLElement>) {
  return (
    <section
      id={id}
      className={cn(
        "relative mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8",
        className,
      )}
      {...rest}
    >
      {children}
    </section>
  );
}
