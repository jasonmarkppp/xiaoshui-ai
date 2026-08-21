import { readFileSync } from "fs";
const s = readFileSync(new URL("../components/home/Lab.tsx", import.meta.url), "utf8");
const m = s.match(/title="([^"]+)"/);
console.log("title:", m?.[1]);
console.log("codes:", [...(m?.[1] || "")].map((c) => c.codePointAt(0)?.toString(16)).join(" "));
