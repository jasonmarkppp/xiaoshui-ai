import type {
  BuildLog,
  Commission,
  CommissionKind,
  Experiment,
  Project,
} from "@/data/types";
import {
  aboutParagraphs as defaultAbout,
  navLinks as defaultNavLinks,
  nowItems as defaultNow,
  site as defaultSite,
} from "@/data/site";
import {
  projects as defaultProjects,
  currentProject as defaultCurrent,
} from "@/data/projects";
import {
  commissionFilters as defaultFilters,
  commissionPeriod as defaultPeriod,
  commissions as defaultCommissions,
} from "@/data/commissions";
import { experiments as defaultExperiments } from "@/data/experiments";
import { logs as defaultLogs } from "@/data/logs";

export type ContentStore = {
  site: typeof defaultSite;
  aboutParagraphs: string[];
  nowItems: string[];
  navLinks: typeof defaultNavLinks;
  currentProject: typeof defaultCurrent;
  projects: Project[];
  commissions: Commission[];
  commissionFilters: Array<{ id: "all" | CommissionKind; label: string }>;
  commissionPeriod: string;
  experiments: Experiment[];
  logs: BuildLog[];
};

export function getDefaultStore(): ContentStore {
  return {
    site: { ...defaultSite },
    aboutParagraphs: [...defaultAbout],
    nowItems: [...defaultNow],
    navLinks: defaultNavLinks.map((l) => ({ ...l })),
    currentProject: { ...defaultCurrent },
    projects: structuredClone(defaultProjects),
    commissions: structuredClone(defaultCommissions),
    commissionFilters: defaultFilters.map((f) => ({ ...f })),
    commissionPeriod: defaultPeriod,
    experiments: structuredClone(defaultExperiments),
    logs: structuredClone(defaultLogs),
  };
}
