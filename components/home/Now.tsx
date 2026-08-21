"use client";

import { useContent } from "@/components/content/ContentProvider";
import { Container } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

export function Now() {
  const { store } = useContent();
  const { nowItems, site } = store;

  return (
    <Container id="now" className="py-16 sm:py-24" data-gsap-section>
      <Reveal>
        <div className="card-surface relative overflow-hidden px-6 py-10 sm:px-10 sm:py-14">
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(ellipse_at_right,rgba(163,230,53,0.06),transparent_60%)]" />
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--status-green)]">
            NOW
          </p>
          <h2 className="mt-4 section-title">最近在做</h2>
          <ul className="mt-8 space-y-3">
            {nowItems.map((item) => (
              <li
                key={item}
                className="flex items-center gap-3 text-lg text-[var(--text)] sm:text-xl"
              >
                <span className="h-1 w-1 rounded-full bg-[var(--accent)]" />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-10 font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--text-muted)]">
            最近更新 · {site.lastUpdated}
          </p>
        </div>
      </Reveal>
    </Container>
  );
}
