import { cn } from "@/lib/utils";

type MediaFrameProps = {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  placeholderLabel?: string;
  vignette?: boolean;
  objectFit?: "cover" | "contain";
};

export function MediaFrame({
  src,
  alt,
  className,
  priority = false,
  placeholderLabel,
  vignette = true,
  objectFit = "cover",
}: MediaFrameProps) {
  const cacheBustSrc = src.includes("?") ? src : `${src}?v=21`;

  return (
    <div
      className={cn(
        "media-frame group/media relative overflow-hidden rounded-[12px] border border-[var(--border)] bg-[#0c0c0f]",
        className,
      )}
    >
      {placeholderLabel ? (
        <div className="pointer-events-none absolute inset-0 z-[1] flex items-end p-4">
          <span className="text-[10px] uppercase tracking-[0.16em] text-[var(--text-muted)]">
            {placeholderLabel}
          </span>
        </div>
      ) : null}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={cacheBustSrc}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        style={{ objectFit }}
        className="z-[2] transition-transform duration-[420ms] ease-out group-hover/media:scale-[1.03]"
      />
      {vignette ? (
        <div className="pointer-events-none absolute inset-0 z-[3] bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(0,0,0,0.35)_100%)]" />
      ) : null}
    </div>
  );
}
