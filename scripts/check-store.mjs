import { readFileSync, existsSync } from "fs";

const path = new URL("../content/store.json", import.meta.url);
if (!existsSync(path)) {
  console.log("no store yet");
  process.exit(0);
}
const store = JSON.parse(readFileSync(path, "utf8"));
console.log("site.name:", store.site.name);
console.log("projects[0].tags type:", Array.isArray(store.projects[0].tags), store.projects[0].tags);
console.log("projects[0].images type:", Array.isArray(store.projects[0].images), store.projects[0].images?.length);
console.log("about[0]:", store.aboutParagraphs[0]);
