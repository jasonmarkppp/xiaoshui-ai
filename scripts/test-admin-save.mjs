const password = "xiaoshui888";

const get = await fetch("http://localhost:3000/api/admin/content", {
  headers: { "x-admin-password": password },
});
const data = await get.json();
if (!get.ok) {
  console.error("get fail", data);
  process.exit(1);
}

const store = data.store;
store.site.lastUpdated = "AUG 2026 · ADMIN";

const post = await fetch("http://localhost:3000/api/admin/content", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ password, store }),
});
const saved = await post.json();
console.log("save", post.status, saved);

const again = await fetch("http://localhost:3000/api/content");
const publicStore = await again.json();
console.log("public lastUpdated:", publicStore.site.lastUpdated);

// restore
store.site.lastUpdated = "AUG 2026";
await fetch("http://localhost:3000/api/admin/content", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ password, store }),
});
console.log("restored");
