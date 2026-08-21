import { readFileSync } from "fs";

const h = readFileSync(new URL("../public/admin.html", import.meta.url), "utf8");

// spot-check critical snippets
const checks = [
  ["join newline", 'join("\\n")'],
  ["split newline", 'split("\\n")'],
  ["no login", !h.includes("btnLogin")],
  ["has projects tab", h.includes("精选作品") || h.includes("\u7cbe\u9009\u4f5c\u54c1")],
  ["has save", h.includes("btnSave")],
];

for (const [name, ok] of checks) {
  const pass = typeof ok === "boolean" ? ok : h.includes(ok);
  console.log(pass ? "OK" : "FAIL", name, typeof ok === "string" ? ok : "");
}

// syntax-ish: ensure template literals in browser script exist
console.log("browser templates:", (h.match(/return `/g) || []).length);
