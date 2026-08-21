import type { ProjectStatus } from "@/data/types";
import { statusColor, cn } from "@/lib/utils";

const statusLabel: Record<string, string> = {
  SHIPPED: "已上线",
  BUILDING: "开发中",
  EXPERIMENT: "实验中",
  "OPEN SOURCE": "开源",
  ARCHIVED: "已归档",
  CLIENT: "客户交付",
  PRIVATE: "未公开",
};

export function StatusBadge({
  status,
  className,
  size = "sm",
  color,
}: {
  status: ProjectStatus | string;
  className?: string;
  size?: "sm" | "md";
  color?: string;
}) {
  const resolved =
    color ??
    statusColor[status as ProjectStatus] ??
    (status.includes("开发") || status.toUpperCase().includes("BUILDING")
      ? "#A3E635"
      : "var(--text-muted)");

  const label = statusLabel[status] ?? status;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 font-medium tracking-[0.08em] text-[var(--text-secondary)]",
        size === "sm" ? "text-[10px]" : "text-xs",
        className,
      )}
    >
      <span
        className="inline-block h-1.5 w-1.5 rounded-full"
        style={{ backgroundColor: resolved }}
        aria-hidden
      />
      {label}
    </span>
  );
}
