export type ProjectStatus =
  | "SHIPPED"
  | "BUILDING"
  | "EXPERIMENT"
  | "OPEN SOURCE"
  | "ARCHIVED"
  | "CLIENT"
  | "PRIVATE";

export type CommissionKind =
  | "campus"
  | "small-site"
  | "enterprise"
  | "commerce"
  | "series";

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  /** Optional gallery for depth / showcase carousel */
  images?: string[];
  tags: string[];
  status: ProjectStatus;
  date: string;
  url?: string;
  github?: string;
  featured: boolean;
  index: string;
}

export interface Commission {
  id: string;
  title: string;
  kind: CommissionKind;
  kindLabel: string;
  description: string;
  image: string;
  /** Optional gallery for auto-play carousel */
  images?: string[];
  tags: string[];
  status: ProjectStatus;
  date: string;
  url?: string;
  /** For Campus Series aggregate card */
  countLabel?: string;
  featured?: boolean;
}

export interface Experiment {
  id: string;
  labNumber: string;
  title: string;
  description: string;
  status: ProjectStatus;
  date: string;
  technology: string[];
}

export interface BuildLog {
  id: string;
  type: string;
  number: string;
  title: string;
  date: string;
  href?: string;
}
