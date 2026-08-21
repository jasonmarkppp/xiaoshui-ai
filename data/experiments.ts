import type { Experiment } from "./types";

export const experiments: Experiment[] = [
  {
    id: "014",
    labNumber: "014",
    title: "Prompt 对比查看器",
    description: "把多版 Prompt 并排对比，上线前看清改了什么。",
    status: "EXPERIMENT",
    date: "2026.08.12",
    technology: ["Next.js", "TypeScript"],
  },
  {
    id: "013",
    labNumber: "013",
    title: "本地截图标注工具",
    description: "在浏览器里直接给产品截图做标注，不用来回切软件。",
    status: "BUILDING",
    date: "2026.08.05",
    technology: ["Canvas", "Web"],
  },
  {
    id: "012",
    labNumber: "012",
    title: "迷你更新日志组件",
    description: "给独立产品页嵌入可更新的 changelog 小部件。",
    status: "SHIPPED",
    date: "2026.07.28",
    technology: ["Workers", "JSON"],
  },
  {
    id: "011",
    labNumber: "011",
    title: "AI Commit 叙述器",
    description: "把杂乱 commit 整理成可读的构建说明。",
    status: "ARCHIVED",
    date: "2026.07.14",
    technology: ["CLI", "LLM"],
  },
];
