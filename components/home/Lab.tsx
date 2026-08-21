"use client";

import { useContent } from "@/components/content/ContentProvider";
import { Container, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { StatusBadge } from "@/components/ui/StatusBadge";

export function Lab() {
  const { store } = useContent();
  const { experiments } = store;

  return (
    <Container id="lab" className="py-16 sm:py-24" data-gsap-section>
      <Reveal>
        <SectionHeading
          title="小氵 LAB"
          subtitle="一些会拆开、会重做、偶尔能上线的实验。"
          eyebrow="实验场 / 实验记录"
        />
      </Reveal>

      <div className="overflow-hidden rounded-[16px] border border-[var(--border)] bg-[var(--bg-secondary)]">
        {experiments.map((item, index) => (
          <Reveal key={item.id} delay={index * 0.04}>
            <article className="grid grid-cols-1 gap-3 border-b border-[var(--border)] px-5 py-5 last:border-b-0 sm:grid-cols-[120px_1fr_auto] sm:items-center sm:gap-6 sm:px-7 sm:py-6">
              <p className="font-mono text-[11px] tracking-[0.14em] text-[var(--text-muted)]">
                LAB / {item.labNumber}
              </p>
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="text-base font-semibold text-[var(--text)] sm:text-lg">
                    {item.title}
                  </h3>
                  <StatusBadge status={item.status} />
                </div>
                <p className="mt-1.5 text-sm text-[var(--text-secondary)]">
                  {item.description}
                </p>
                <p className="mt-2 text-[11px] uppercase tracking-[0.12em] text-[var(--text-muted)]">
                  {item.technology.join(" · ")}
                </p>
              </div>
              <time className="font-mono text-xs text-[var(--text-muted)] sm:text-right">
                {item.date}
              </time>
            </article>
          </Reveal>
        ))}
      </div>
    </Container>
  );
}
