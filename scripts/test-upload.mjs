import { writeFileSync, readFileSync, unlinkSync, existsSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
// 1x1 png
const png = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==",
  "base64",
);
const tmp = path.join(root, "scripts", "_tmp-upload.png");
writeFileSync(tmp, png);

const form = new FormData();
form.append("file", new Blob([png], { type: "image/png" }), "test-upload.png");
form.append("folder", "uploads");

const res = await fetch("http://localhost:3000/api/admin/upload", {
  method: "POST",
  body: form,
});
const data = await res.json();
console.log(res.status, data);

if (data.url) {
  const filePath = path.join(root, "public", data.url.replace(/^\//, ""));
  console.log("exists", existsSync(filePath));
  if (existsSync(filePath)) unlinkSync(filePath);
}
unlinkSync(tmp);
