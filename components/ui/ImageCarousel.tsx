"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type ImageCarouselProps = {
  images: string[];
  alt: string;
  className?: string;
  intervalMs?: number;
};

export function ImageCarousel({
  images,
  alt,
  className,
  intervalMs = 3200,
}: ImageCarouselProps) {
  const slides = images.length > 0 ? images : [];
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (slides.length <= 1 || paused) return;
    const id = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [slides.length, paused, intervalMs]);

  if (slides.length === 0) return null;

  return (
    <div
      className={cn(
        "media-frame group/media relative overflow-hidden rounded-[12px] border border-[var(--border)] bg-[#0c0c0f]",
        className,
      )}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {slides.map((src, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={src}
          src={`${src}${src.includes("?") ? "&" : "?"}v=21`}
          alt={`${alt} ${i + 1}`}
          loading={i === 0 ? "eager" : "lazy"}
          decoding="async"
          className={cn(
            "absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-500 ease-out",
            i === index ? "opacity-100" : "opacity-0",
          )}
        />
      ))}

      {slides.length > 1 ? (
        <div className="absolute inset-x-0 bottom-3 z-[4] flex max-w-full flex-wrap items-center justify-center gap-1.5 px-3">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`第 ${i + 1} 张`}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIndex(i);
              }}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300 ease-out",
                i === index
                  ? "w-5 bg-[#F5F5F7]"
                  : "w-1.5 bg-white/35 hover:bg-white/55",
              )}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
