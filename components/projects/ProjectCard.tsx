"use client";

import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/types";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { cn } from "@/lib/utils";

export function ProjectCard({
  project,
  featured = false,
}: {
  project: Project;
  featured?: boolean;
}) {
  return (
    <article className="card-surface group flex h-full flex-col overflow-hidden">
      <div className="p-2 sm:p-3">
        <MediaFrame
          src={project.image}
          alt={`${project.title} screenshot`}
          className={cn(
            "w-full",
            featured
              ? "aspect-[16/10] min-h-[240px] sm:min-h-[300px] lg:min-h-[340px]"
              : "aspect-[16/10] min-h-[200px] sm:min-h-[230px]",
          )}
          vignette={false}
        />
      </div>

      <div className="flex flex-1 flex-col px-5 pb-5 pt-2 sm:px-6 sm:pb-6">
        <div className="mb-3 flex justify-end">
          <StatusBadge status={project.status} />
        </div>

        <p className="text-[11px] tracking-[0.14em] text-[var(--accent)]">
          {project.category}
        </p>
        <h3
          className={cn(
            "mt-1.5 font-semibold tracking-tight text-[var(--text)]",
            featured ? "text-2xl sm:text-[1.65rem]" : "text-xl sm:text-[1.35rem]",
          )}
        >
          {project.title}
        </h3>
        <p className="mt-2 line-clamp-3 max-w-lg text-sm leading-relaxed text-[var(--text-secondary)]">
          {project.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-[var(--border)] px-2 py-1 text-[11px] text-[var(--text-muted)]"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-auto pt-5">
          <a
            href={project.url ?? "#work"}
            {...(project.url?.startsWith("http")
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            className="focus-ring inline-flex items-center gap-1.5 text-sm text-[var(--text)] transition-transform duration-300 ease-out group-hover:translate-x-0.5"
          >
            查看项目
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
          </a>
        </div>
      </div>
    </article>
  );
}
