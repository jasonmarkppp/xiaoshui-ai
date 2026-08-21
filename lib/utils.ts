import type { ProjectStatus } from "@/data/types";

export const statusColor: Record<ProjectStatus, string> = {
  SHIPPED: "#A3E635",
  BUILDING: "#5B8CFF",
  EXPERIMENT: "#8B5CF6",
  "OPEN SOURCE": "#FF8A4C",
  ARCHIVED: "#71717A",
  CLIENT: "#5B8CFF",
  PRIVATE: "#71717A",
};

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}
