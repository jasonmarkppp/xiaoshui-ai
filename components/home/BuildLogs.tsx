"use client";

import { ArrowUpRight } from "lucide-react";
import { useContent } from "@/components/content/ContentProvider";
import { Container, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

export function BuildLogs() {
  const { store } = useContent();
  const { logs } = store;

  return (
    <Container id="logs" className="py-16 sm:py-24" data-gsap-section>
      <Reveal>
        <SectionHeading
          title="构建日志"
          subtitle="工作台上的笔记与过程记录。"
          eyebrow="来自工作台的笔记"
        />
      </Reveal>

      <div className="space-y-1">
        {logs.map((log, index) => {
          const external = Boolean(log.href && /^https?:\/\//.test(log.href));
          return (
            <Reveal key={log.id} delay={index * 0.05}>
              <a
                href={log.href ?? "#logs"}
                {...(external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="group focus-ring flex items-start justify-between gap-6 rounded-[12px] border border-transparent px-3 py-5 transition-[border-color,background-color] duration-300 ease-out hover:border-[var(--border)] hover:bg-[var(--card)] sm:px-5"
              >
                <div className="min-w-0">
                  <p className="font-mono text-[11px] tracking-[0.14em] text-[var(--text-muted)]">
                    {log.type} / {log.number}
                  </p>
                  <h3 className="mt-2 text-lg font-medium tracking-tight text-[var(--text)] transition-transform duration-300 ease-out group-hover:translate-x-1 sm:text-xl">
                    {log.title}
                  </h3>
                  <time className="mt-2 block font-mono text-xs text-[var(--text-muted)]">
                    {log.date}
                  </time>
                </div>
                <ArrowUpRight
                  aria-hidden
                  className="mt-1 h-4 w-4 shrink-0 text-[var(--text-muted)] transition-colors duration-300 group-hover:text-[var(--text)]"
                />
              </a>
            </Reveal>
          );
        })}
      </div>
    </Container>
  );
}
