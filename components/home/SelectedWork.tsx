"use client";

import { useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { useContent } from "@/components/content/ContentProvider";
import DepthCarousel from "@/components/ui/DepthCarousel";
import { Container, SectionHeading } from "@/components/ui/Section";
import { StatusBadge } from "@/components/ui/StatusBadge";

export function SelectedWork() {
  const { store } = useContent();
  const { projects } = store;
  const [active, setActive] = useState(0);

  const slides = useMemo(() => {
    const list: Array<{ image: string; alt: string; projectId: string }> = [];
    for (const p of projects) {
      const imgs = p.images && p.images.length > 0 ? p.images : [p.image];
      for (const image of imgs) {
        list.push({ image, alt: p.title, projectId: p.id });
      }
    }
    return list;
  }, [projects]);

  const items = useMemo(
    () => slides.map(({ image, alt }) => ({ image, alt })),
    [slides],
  );

  const project =
    projects.find((p) => p.id === slides[active]?.projectId) ?? projects[0];

  if (!project) {
    return (
      <Container id="work" className="py-16 sm:py-24" data-gsap-section>
        <SectionHeading
          title="精选作品"
          subtitle="自己做的产品与工具：AI 升学、在线工具箱、Three.js 与开发者工具。"
        />
      </Container>
    );
  }

  return (
    <Container id="work" className="py-16 sm:py-24" data-gsap-section>
      <SectionHeading
        title="精选作品"
        subtitle="自己做的产品与工具：AI 升学、在线工具箱、Three.js 与开发者工具。"
      />

      <div className="grid items-stretch gap-6 lg:grid-cols-[1.35fr_0.65fr] lg:gap-8">
        <div className="relative h-[min(72svh,560px)] overflow-hidden rounded-[16px] border border-[var(--border)] bg-[#0c0c0f] sm:h-[min(74svh,620px)]">
          <DepthCarousel
            items={items}
            cardWidth={620}
            cardHeight={400}
            radius={16}
            tint="#09090B"
            depth={140}
            spread={48}
            tilt={12}
            tiltDirection="right"
            perspective={1100}
            visibleCards={3}
            falloff={0.18}
            blur={4}
            autoplay
            autoplayDelay={3600}
            loop
            showControls
            showIndicators
            onChange={(index) => setActive(index)}
          />
        </div>

        <div className="flex min-w-0 flex-col justify-center rounded-[16px] border border-[var(--border)] bg-[var(--card)] px-6 py-8 sm:px-8">
          <div className="mb-4 flex items-center justify-between gap-3">
            <p className="text-[11px] tracking-[0.14em] text-[var(--accent)]">
              {project.category}
            </p>
            <StatusBadge status={project.status} />
          </div>

          <h3 className="text-2xl font-semibold tracking-tight text-[var(--text)] sm:text-3xl">
            {project.title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)] sm:text-[15px]">
            {project.description}
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-[var(--border)] px-2 py-1 text-[11px] text-[var(--text-muted)]"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-8">
            {project.url ? (
              <a
                href={project.url}
                {...(project.url.startsWith("http")
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="focus-ring inline-flex items-center gap-1.5 text-sm text-[var(--text)]"
              >
                查看项目
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
              </a>
            ) : (
              <span className="text-[11px] tracking-[0.12em] text-[var(--text-muted)]">
                产品演示图 · 链接稍后公开
              </span>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
}
