"use client";

import { useContent } from "@/components/content/ContentProvider";
import { Container, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

export function About() {
  const { store } = useContent();
  const { aboutParagraphs, site } = store;

  return (
    <Container id="about" className="py-16 sm:py-24" data-gsap-section>
      <Reveal>
        <SectionHeading title="关于" />
      </Reveal>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-7">
          <div className="space-y-5 text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg">
            {aboutParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-5">
          <dl className="space-y-8 rounded-[16px] border border-[var(--border)] bg-[var(--card)] p-6 sm:p-8">
            <div>
              <dt className="text-[11px] uppercase tracking-[0.16em] text-[var(--text-muted)]">
                所在地
              </dt>
              <dd className="mt-2 text-[var(--text)]">{site.basedIn}</dd>
            </div>
            <div>
              <dt className="text-[11px] uppercase tracking-[0.16em] text-[var(--text-muted)]">
                当前
              </dt>
              <dd className="mt-2 text-[var(--accent)]">{site.currently}</dd>
            </div>
            <div>
              <dt className="text-[11px] uppercase tracking-[0.16em] text-[var(--text-muted)]">
                关注方向
              </dt>
              <dd className="mt-2 text-[var(--text)]">{site.interestedIn}</dd>
            </div>
          </dl>
        </Reveal>
      </div>
    </Container>
  );
}
