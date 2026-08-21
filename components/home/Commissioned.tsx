"use client";

import { useMemo, useState } from "react";
import { useContent } from "@/components/content/ContentProvider";
import { CommissionCard } from "@/components/projects/CommissionCard";
import { Container, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";
import type { CommissionKind } from "@/data/types";

type FilterId = "all" | CommissionKind;

export function Commissioned() {
  const { store } = useContent();
  const { commissions, commissionFilters, commissionPeriod } = store;
  const [filter, setFilter] = useState<FilterId>("all");

  const series = commissions.find((item) => item.kind === "series");

  const list = useMemo(() => {
    const items = commissions.filter((item) => item.kind !== "series");
    if (filter === "all") return items;
    if (filter === "campus") {
      return items.filter((item) => item.kind === "campus");
    }
    return items.filter((item) => item.kind === filter);
  }, [filter, commissions]);

  const showSeries =
    Boolean(series) && (filter === "all" || filter === "campus");

  return (
    <Container id="commissioned" className="py-16 sm:py-24" data-gsap-section>
      <Reveal>
        <SectionHeading
          title="交付项目"
          subtitle={`接单周期 ${commissionPeriod}。前端 / 全栈 / 创意网页 / Three.js，给学生、小店和企业做过的真实上线项目。只讲交付，不写报价。`}
          eyebrow="全栈 · 创意网页 · Three.js · 企业业务"
        />
      </Reveal>

      <Reveal delay={0.05}>
        <div className="mb-8 flex flex-wrap gap-2">
          {commissionFilters.map((item) => {
            const active = filter === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setFilter(item.id)}
                className={cn(
                  "focus-ring rounded-full border px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.12em] transition-colors duration-300 ease-out",
                  active
                    ? "border-[#F5F5F7] bg-[#F5F5F7] text-[#09090B]"
                    : "border-[var(--border)] bg-transparent text-[var(--text-secondary)] hover:border-[var(--border-hover)] hover:text-[var(--text)]",
                )}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </Reveal>

      <div className="space-y-3">
        {showSeries && series ? (
          <Reveal>
            <div data-gsap="card-tilt">
              <CommissionCard item={series} large />
            </div>
          </Reveal>
        ) : null}

        <div className="grid grid-cols-1 items-stretch gap-3 md:grid-cols-2 lg:grid-cols-3">
          {list.map((item, index) => (
            <Reveal key={item.id} delay={index * 0.04} className="h-full min-w-0">
              <div data-gsap="card-tilt" className="h-full">
                <CommissionCard item={item} />
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <Reveal delay={0.1}>
        <p className="mt-8 text-sm text-[var(--text-muted)]">
          更多学生单与私密项目仅保留截图归档。有公开链接的会标成「查看网站」。
        </p>
      </Reveal>
    </Container>
  );
}
