"use client";

import { ArrowUpRight } from "lucide-react";
import type { Commission } from "@/data/types";
import { ImageCarousel } from "@/components/ui/ImageCarousel";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { cn } from "@/lib/utils";

export function CommissionCard({
  item,
  large = false,
}: {
  item: Commission;
  large?: boolean;
}) {
  const isExternal = Boolean(item.url && /^https?:\/\//.test(item.url));
  const gallery =
    item.images && item.images.length > 0 ? item.images : [item.image];

  const meta = (
    <div
      className={cn(
        "flex flex-1 flex-col",
        large
          ? "justify-center px-5 pb-6 pt-2 sm:px-7 md:w-[42%] md:py-8"
          : "px-4 pb-5 pt-1 sm:px-5",
      )}
    >
      <div className="mb-3 flex items-center justify-between gap-2">
        <span className="text-[10px] uppercase tracking-[0.14em] text-[var(--accent)]">
          {item.kindLabel}
        </span>
        <StatusBadge status={item.status} />
      </div>

      <h3
        className={cn(
          "min-h-[1.75em] font-semibold tracking-tight text-[var(--text)]",
          large ? "text-2xl" : "text-lg sm:text-xl",
        )}
      >
        {item.title}
      </h3>

      {item.countLabel ? (
        <p className="mt-2 font-mono text-xs tracking-[0.08em] text-[var(--status-green)]">
          {item.countLabel}
        </p>
      ) : null}

      <p className="mt-3 line-clamp-3 min-h-[4.5em] text-sm leading-relaxed text-[var(--text-secondary)]">
        {item.description}
      </p>

      <div className="mt-4 flex min-h-[2rem] flex-wrap gap-2">
        {item.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-md border border-[var(--border)] px-2 py-1 text-[11px] text-[var(--text-muted)]"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-auto flex items-center justify-between pt-5">
        <time className="font-mono text-[11px] text-[var(--text-muted)]">
          {item.date}
        </time>
        {isExternal ? (
          <span className="inline-flex items-center gap-1 text-sm text-[var(--text)]">
            查看网站
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
          </span>
        ) : (
          <span className="text-[11px] tracking-[0.12em] text-[var(--text-muted)]">
            {item.kind === "series" ? "系列合集" : "暂无公开链接"}
          </span>
        )}
      </div>
    </div>
  );

  const frameClass = cn(
    large
      ? "aspect-[16/10] min-h-[200px] md:aspect-auto md:h-full md:min-h-[280px]"
      : "aspect-[16/10] w-full",
  );

  const media = (
    <div
      className={cn("p-2 sm:p-3", large && "md:h-full md:w-[58%]")}
      onClick={(e) => {
        if ((e.target as HTMLElement).closest("button")) {
          e.preventDefault();
          e.stopPropagation();
        }
      }}
    >
      {gallery.length > 1 ? (
        <ImageCarousel
          images={gallery}
          alt={item.title}
          className={frameClass}
        />
      ) : (
        <MediaFrame
          src={gallery[0]}
          alt={`${item.title} screenshot`}
          className={frameClass}
          vignette={false}
        />
      )}
    </div>
  );

  const className = cn(
    "card-surface group flex h-full flex-col overflow-hidden",
    large && "md:flex-row md:items-stretch",
  );

  const content = (
    <>
      {media}
      {meta}
    </>
  );

  if (isExternal && item.url) {
    return (
      <a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {content}
      </a>
    );
  }

  return <article className={className}>{content}</article>;
}
