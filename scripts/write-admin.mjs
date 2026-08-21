import { writeFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>\u5c0f\u6c35AI \u00b7 \u53ef\u89c6\u5316\u540e\u53f0</title>
  <style>
    :root {
      --bg: #09090b;
      --panel: #121216;
      --panel2: #17171c;
      --border: #2a2a30;
      --text: #fafafa;
      --muted: #a1a1aa;
      --accent: #5b8cff;
      --ok: #a3e635;
      --err: #fb7185;
      --danger: #e11d48;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      font-family: ui-sans-serif, system-ui, "Segoe UI", sans-serif;
      background:
        radial-gradient(900px 500px at 8% -10%, rgba(91,140,255,.14), transparent 55%),
        radial-gradient(700px 400px at 100% 0%, rgba(163,230,53,.06), transparent 50%),
        var(--bg);
      color: var(--text);
      min-height: 100vh;
    }
    header {
      position: sticky; top: 0; z-index: 20;
      display: flex; align-items: center; justify-content: space-between; gap: 12px;
      padding: 12px 18px;
      border-bottom: 1px solid var(--border);
      background: rgba(9,9,11,.88);
      backdrop-filter: blur(12px);
    }
    header .left { display: flex; align-items: center; gap: 12px; min-width: 0; }
    header h1 { margin: 0; font-size: 15px; white-space: nowrap; }
    header .sub { color: var(--muted); font-size: 12px; }
    .banner {
      margin: 0 0 14px;
      padding: 10px 12px;
      border-radius: 10px;
      border: 1px solid rgba(91,140,255,.35);
      background: rgba(91,140,255,.1);
      color: var(--muted);
      font-size: 12px;
      line-height: 1.55;
    }
    header a { color: var(--muted); text-decoration: none; font-size: 13px; }
    header a:hover { color: var(--text); }
    .savebar {
      display: flex; align-items: center; gap: 8px; flex-wrap: wrap;
    }
    main { max-width: 1080px; margin: 0 auto; padding: 18px 14px 100px; }
    .tabs {
      display: flex; flex-wrap: wrap; gap: 8px;
      margin-bottom: 16px;
      position: sticky; top: 58px; z-index: 15;
      padding: 8px 0;
      background: linear-gradient(var(--bg), rgba(9,9,11,.92));
    }
    .tabs button {
      background: var(--panel); border: 1px solid var(--border); border-radius: 999px;
      padding: 8px 13px; cursor: pointer; color: var(--muted); font-size: 12px;
    }
    .tabs button.active {
      color: var(--text); border-color: var(--accent);
      background: rgba(91,140,255,.14);
    }
    .card {
      background: var(--panel);
      border: 1px solid var(--border);
      border-radius: 14px;
      padding: 16px;
      margin-bottom: 14px;
    }
    .card.item {
      display: grid;
      grid-template-columns: 120px 1fr;
      gap: 14px;
      background: var(--panel2);
    }
    @media (max-width: 720px) {
      .card.item { grid-template-columns: 1fr; }
    }
    .thumb {
      width: 100%; aspect-ratio: 16/10; object-fit: cover;
      border-radius: 10px; border: 1px solid var(--border); background: #0c0c10;
    }
    .thumb-wrap { display: flex; flex-direction: column; gap: 8px; }
    .upload-row { display: flex; gap: 8px; align-items: center; }
    .upload-row input[type="text"] { flex: 1; min-width: 0; }
    .file-btn { position: relative; overflow: hidden; flex-shrink: 0; }
    .file-btn input[type="file"] {
      position: absolute; inset: 0; opacity: 0; cursor: pointer; width: 100%; height: 100%;
    }
    .gallery-previews {
      display: flex; flex-wrap: wrap; gap: 8px; margin: 8px 0 4px;
    }
    .gallery-previews img {
      width: 64px; height: 40px; object-fit: cover; border-radius: 6px;
      border: 1px solid var(--border); background: #0c0c10;
    }
    label { display: block; font-size: 11px; color: var(--muted); margin: 8px 0 5px; letter-spacing: .04em; }
    input, textarea, select, button { font: inherit; color: var(--text); }
    input, textarea, select {
      width: 100%;
      background: #0c0c10;
      border: 1px solid var(--border);
      border-radius: 10px;
      padding: 9px 11px;
      outline: none;
    }
    input:focus, textarea:focus, select:focus { border-color: var(--accent); }
    textarea { min-height: 72px; resize: vertical; line-height: 1.5; }
    .row { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
    .row3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; }
    @media (max-width: 720px) {
      .row, .row3 { grid-template-columns: 1fr; }
    }
    .btn {
      border: 0; border-radius: 10px; padding: 9px 14px; cursor: pointer;
      background: var(--accent); color: #fff; font-weight: 600; font-size: 13px;
    }
    .btn.ghost {
      background: transparent; border: 1px solid var(--border);
      color: var(--text); font-weight: 500;
    }
    .btn.danger {
      background: transparent; border: 1px solid rgba(225,29,72,.45);
      color: #fb7185;
    }
    .btn.sm { padding: 6px 10px; font-size: 12px; }
    .item-actions {
      display: flex; flex-wrap: wrap; gap: 8px; margin-top: 10px;
    }
    .section-head {
      display: flex; align-items: center; justify-content: space-between;
      gap: 10px; margin-bottom: 12px;
    }
    .section-head h2 { margin: 0; font-size: 15px; }
    #msg { font-size: 12px; color: var(--muted); min-width: 8ch; }
    #msg.ok { color: var(--ok); }
    #msg.err { color: var(--err); }
    .hidden { display: none !important; }
    .hint { font-size: 12px; color: var(--muted); line-height: 1.55; margin: 0 0 10px; }
    .chip {
      display: inline-flex; align-items: center; gap: 6px;
      border: 1px solid var(--border); border-radius: 999px;
      padding: 4px 10px; font-size: 11px; color: var(--muted);
    }
    .list-lines textarea { min-height: 140px; }
    .check {
      display: flex; align-items: center; gap: 8px;
      margin-top: 18px; color: var(--muted); font-size: 13px;
    }
    .check input { width: auto; }
  </style>
</head>
<body>
  <header>
    <div class="left">
      <h1>\u5c0f\u6c35AI \u00b7 \u540e\u53f0</h1>
      <span class="sub">\u53ef\u89c6\u5316\u7f16\u8f91 \u00b7 \u65e0\u5bc6\u7801</span>
    </div>
    <div class="savebar">
      <span id="msg"></span>
      <button class="btn ghost" id="btnReload" type="button">\u91cd\u8f7d</button>
      <button class="btn" id="btnSave" type="button">\u4fdd\u5b58\u5230\u524d\u53f0</button>
      <a href="/" target="_blank">\u67e5\u770b\u524d\u53f0 \u2192</a>
    </div>
  </header>

  <main>
    <div class="banner">
      \u672c\u5730\u53ef\u4fdd\u5b58\u4e0e\u4e0a\u4f20\u3002\u90e8\u7f72\u5230 Netlify \u540e\uff0c\u8bf7\u5728\u672c\u5730\u6539\u597d\u5185\u5bb9\uff0c\u63d0\u4ea4 <code>content/store.json</code> \u4e0e <code>public</code> \u56fe\u7247\u518d\u90e8\u7f72\u3002
    </div>
    <div class="tabs" id="tabs"></div>
    <div id="panels"></div>
  </main>

  <script>
    const STATUS = ["SHIPPED","BUILDING","EXPERIMENT","OPEN SOURCE","ARCHIVED","CLIENT","PRIVATE"];
    const KINDS = [
      { id: "campus", label: "\u6821\u56ed\u5355" },
      { id: "small-site", label: "\u5c0f\u7f51\u7ad9" },
      { id: "enterprise", label: "\u4f01\u4e1a\u7ad9" },
      { id: "commerce", label: "\u7535\u5546\u4e1a\u52a1" },
      { id: "series", label: "\u7cfb\u5217" },
    ];
    const TABS = [
      { id: "site", label: "\u7ad9\u70b9" },
      { id: "hero", label: "Hero" },
      { id: "about", label: "\u5173\u4e8e / NOW" },
      { id: "projects", label: "\u7cbe\u9009\u4f5c\u54c1" },
      { id: "commissions", label: "\u4ea4\u4ed8\u9879\u76ee" },
      { id: "lab", label: "LAB" },
      { id: "logs", label: "\u65e5\u5fd7" },
    ];

    let store = null;
    let activeTab = localStorage.getItem("xiaoshui_admin_tab") || "site";

    const $ = (id) => document.getElementById(id);
    const esc = (s) => String(s ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");

    function setMsg(text, type = "") {
      const el = $("msg");
      el.textContent = text || "";
      el.className = type;
    }

    function field(label, path, value, opts = {}) {
      const id = "f_" + path.replace(/[^a-zA-Z0-9]/g, "_");
      if (opts.type === "textarea") {
        return \`<label for="\${id}">\${label}</label><textarea id="\${id}" data-path="\${path}" rows="\${opts.rows || 3}">\${esc(value)}</textarea>\`;
      }
      if (opts.type === "select") {
        const options = (opts.options || []).map((o) => {
          const v = typeof o === "string" ? o : o.id;
          const t = typeof o === "string" ? o : o.label;
          return \`<option value="\${esc(v)}" \${String(v) === String(value) ? "selected" : ""}>\${esc(t)}</option>\`;
        }).join("");
        return \`<label for="\${id}">\${label}</label><select id="\${id}" data-path="\${path}">\${options}</select>\`;
      }
      if (opts.type === "checkbox") {
        return \`<label class="check"><input id="\${id}" data-path="\${path}" type="checkbox" \${value ? "checked" : ""} /> \${label}</label>\`;
      }
      return \`<label for="\${id}">\${label}</label><input id="\${id}" data-path="\${path}" type="\${opts.type || "text"}" value="\${esc(value)}" />\`;
    }

    function thumb(src) {
      const url = src || "";
      return \`<img class="thumb" src="\${esc(url)}" alt="" onerror="this.style.opacity=.25" />\`;
    }

    function imageField(label, path, value, folder) {
      const id = "f_" + path.replace(/[^a-zA-Z0-9]/g, "_");
      return \`
        <label for="\${id}">\${label}</label>
        <div class="upload-row">
          <input id="\${id}" data-path="\${path}" type="text" value="\${esc(value || "")}" placeholder="/\${folder}/xxx.png" />
          <label class="btn ghost sm file-btn">\u4e0a\u4f20
            <input type="file" accept="image/*" data-upload-to="\${path}" data-folder="\${folder}" />
          </label>
        </div>
      \`;
    }

    function galleryField(label, path, value, folder) {
      const lines = (value || []).filter(Boolean);
      const previews = lines.map((u) => \`<img src="\${esc(u)}" alt="" onerror="this.style.opacity=.25" />\`).join("");
      return \`
        <label>\${label}</label>
        <div class="gallery-previews" data-gallery-for="\${path}">\${previews}</div>
        <textarea data-path="\${path}" rows="4" placeholder="/\${folder}/a.png">\${esc(lines.join("\\n"))}</textarea>
        <div class="item-actions">
          <label class="btn ghost sm file-btn">+\u4e0a\u4f20\u5230\u56fe\u96c6
            <input type="file" accept="image/*" multiple data-upload-gallery="\${path}" data-folder="\${folder}" />
          </label>
        </div>
      \`;
    }

    async function uploadFile(file, folder) {
      const form = new FormData();
      form.append("file", file);
      form.append("folder", folder || "uploads");
      const res = await fetch("/api/admin/upload", { method: "POST", body: form });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "\u4e0a\u4f20\u5931\u8d25");
      return data.url;
    }

    function refreshGalleryPreview(path) {
      const ta = document.querySelector(\`textarea[data-path="\${path}"]\`);
      const box = document.querySelector(\`[data-gallery-for="\${path}"]\`);
      if (!ta || !box) return;
      const lines = ta.value.split("\\n").map((x) => x.trim()).filter(Boolean);
      box.innerHTML = lines.map((u) => \`<img src="\${esc(u)}" alt="" onerror="this.style.opacity=.25" />\`).join("");
    }

    function bindUploads(root) {
      root.querySelectorAll("input[type=file][data-upload-to]").forEach((input) => {
        input.addEventListener("change", async () => {
          const file = input.files && input.files[0];
          if (!file) return;
          const path = input.dataset.uploadTo;
          const folder = input.dataset.folder || "uploads";
          try {
            setMsg("\u4e0a\u4f20\u4e2d\u2026");
            const url = await uploadFile(file, folder);
            const target = document.querySelector(\`[data-path="\${path}"]\`);
            if (target) {
              target.value = url;
              target.dispatchEvent(new Event("input", { bubbles: true }));
            }
            const card = input.closest(".card.item");
            const img = card && card.querySelector("img.thumb");
            if (img) { img.src = url; img.style.opacity = "1"; }
            setMsg("\u56fe\u7247\u5df2\u4e0a\u4f20", "ok");
          } catch (err) {
            setMsg(err.message || "\u4e0a\u4f20\u5931\u8d25", "err");
          } finally {
            input.value = "";
          }
        });
      });

      root.querySelectorAll("input[type=file][data-upload-gallery]").forEach((input) => {
        input.addEventListener("change", async () => {
          const files = Array.from(input.files || []);
          if (!files.length) return;
          const path = input.dataset.uploadGallery;
          const folder = input.dataset.folder || "uploads";
          try {
            setMsg("\u4e0a\u4f20\u4e2d\u2026");
            const urls = [];
            for (const file of files) urls.push(await uploadFile(file, folder));
            const ta = document.querySelector(\`textarea[data-path="\${path}"]\`);
            if (ta) {
              const prev = ta.value.trim();
              ta.value = [prev, ...urls].filter(Boolean).join("\\n");
              refreshGalleryPreview(path);
            }
            setMsg("\u5df2\u6dfb\u52a0 " + urls.length + " \u5f20\u56fe", "ok");
          } catch (err) {
            setMsg(err.message || "\u4e0a\u4f20\u5931\u8d25", "err");
          } finally {
            input.value = "";
          }
        });
      });

      root.querySelectorAll("textarea[data-path$='.images']").forEach((ta) => {
        ta.addEventListener("input", () => refreshGalleryPreview(ta.dataset.path));
      });
    }

    function renderTabs() {
      $("tabs").innerHTML = TABS.map((t) =>
        \`<button type="button" data-tab="\${t.id}" class="\${t.id === activeTab ? "active" : ""}">\${t.label}</button>\`
      ).join("");
      $("tabs").querySelectorAll("button").forEach((btn) => {
        btn.onclick = () => {
          activeTab = btn.dataset.tab;
          localStorage.setItem("xiaoshui_admin_tab", activeTab);
          render();
        };
      });
    }

    function renderSite() {
      const s = store.site;
      return \`
        <div class="card">
          <div class="section-head"><h2>\u7ad9\u70b9\u4fe1\u606f</h2><span class="chip">\u524d\u53f0\u54c1\u724c / SEO</span></div>
          <div class="row">
            \${field("\u7ad9\u70b9\u540d\u79f0", "site.name", s.name)}
            \${field("\u9875\u9762\u6807\u9898", "site.title", s.title)}
          </div>
          \${field("\u63cf\u8ff0", "site.description", s.description, { type: "textarea", rows: 3 })}
          <div class="row">
            \${field("\u6807\u8bed\u884c 1", "site.taglineLines.0", s.taglineLines?.[0])}
            \${field("\u6807\u8bed\u884c 2", "site.taglineLines.1", s.taglineLines?.[1])}
          </div>
          \${field("\u82f1\u6587\u526f\u6807", "site.english", s.english)}
          <div class="row3">
            \${field("\u90ae\u7bb1", "site.email", s.email)}
            \${field("\u6700\u8fd1\u66f4\u65b0", "site.lastUpdated", s.lastUpdated)}
            \${field("\u7ad9\u70b9 URL", "site.url", s.url)}
          </div>
          <div class="row">
            \${field("GitHub", "site.github", s.github)}
            \${field("B\u7ad9", "site.bilibili", s.bilibili)}
          </div>
          \${field("\u5c0f\u7ea2\u4e66", "site.xiaohongshu", s.xiaohongshu)}
          <div class="row3">
            \${field("\u6240\u5728\u5730", "site.basedIn", s.basedIn)}
            \${field("\u5f53\u524d", "site.currently", s.currently)}
            \${field("\u5173\u6ce8\u65b9\u5411", "site.interestedIn", s.interestedIn)}
          </div>
        </div>
        <div class="card">
          <div class="section-head"><h2>\u5bfc\u822a</h2>
            <button class="btn ghost sm" type="button" data-action="add-nav">+\u6dfb\u52a0</button>
          </div>
          \${(store.navLinks || []).map((link, i) => \`
            <div class="card item" style="grid-template-columns:1fr;margin-bottom:10px">
              <div>
                <div class="row3">
                  \${field("\u6587\u6848", "navLinks."+i+".label", link.label)}
                  \${field("\u94fe\u63a5", "navLinks."+i+".href", link.href)}
                  \${field("\u5916\u94fe", "navLinks."+i+".external", !!link.external, { type: "checkbox" })}
                </div>
                <div class="item-actions">
                  <button class="btn ghost sm" type="button" data-action="move-nav" data-i="\${i}" data-dir="-1">\u4e0a\u79fb</button>
                  <button class="btn ghost sm" type="button" data-action="move-nav" data-i="\${i}" data-dir="1">\u4e0b\u79fb</button>
                  <button class="btn danger sm" type="button" data-action="del-nav" data-i="\${i}">\u5220\u9664</button>
                </div>
              </div>
            </div>
          \`).join("")}
        </div>
      \`;
    }

    function renderHero() {
      const c = store.currentProject || {};
      return \`
        <div class="card item">
          <div class="thumb-wrap">
            \${thumb(c.image)}
            <span class="chip">Hero \u9884\u89c8\u56fe</span>
          </div>
          <div>
            <div class="section-head"><h2>\u5f53\u524d\u9879\u76ee\uff08Hero\uff09</h2></div>
            \${field("\u6807\u9898", "currentProject.title", c.title)}
            \${field("\u63cf\u8ff0", "currentProject.description", c.description, { type: "textarea" })}
            <div class="row3">
            \${field("\u7248\u672c", "currentProject.version", c.version)}
            \${field("\u72b6\u6001", "currentProject.state", c.state)}
            \${field("\u94fe\u63a5", "currentProject.url", c.url)}
            </div>
            \${imageField("\u5c01\u9762\u56fe", "currentProject.image", c.image, "projects")}
            <p class="hint">\u53ef\u672c\u5730\u4e0a\u4f20\uff0c\u6216\u624b\u52a8\u586b /projects/xxx.png</p>
          </div>
        </div>
      \`;
    }

    function renderAbout() {
      return \`
        <div class="card list-lines">
          <div class="section-head"><h2>\u5173\u4e8e</h2><span class="chip">\u6bcf\u884c\u4e00\u6bb5</span></div>
          \${field("\u6bb5\u843d", "aboutParagraphs", (store.aboutParagraphs || []).join("\\n"), { type: "textarea", rows: 8 })}
        </div>
        <div class="card list-lines">
          <div class="section-head"><h2>NOW</h2><span class="chip">\u6bcf\u884c\u4e00\u6761</span></div>
          \${field("\u6e05\u5355", "nowItems", (store.nowItems || []).join("\\n"), { type: "textarea", rows: 6 })}
        </div>
      \`;
    }

    function renderProjects() {
      return \`
        <div class="section-head">
          <h2>\u7cbe\u9009\u4f5c\u54c1 <span class="chip">\${store.projects.length} \u9879</span></h2>
          <button class="btn ghost sm" type="button" data-action="add-project">+\u65b0\u5efa\u4f5c\u54c1</button>
        </div>
        \${store.projects.map((p, i) => \`
          <div class="card item">
            <div class="thumb-wrap">
              \${thumb(p.image)}
              \${imageField("\u5c01\u9762\u56fe", "projects."+i+".image", p.image, "projects")}
            </div>
            <div>
              <div class="row">
                \${field("\u6807\u9898", "projects."+i+".title", p.title)}
                \${field("\u5206\u7c7b", "projects."+i+".category", p.category)}
              </div>
              \${field("\u63cf\u8ff0", "projects."+i+".description", p.description, { type: "textarea" })}
              <div class="row3">
                \${field("\u72b6\u6001", "projects."+i+".status", p.status, { type: "select", options: STATUS })}
                \${field("\u65e5\u671f", "projects."+i+".date", p.date)}
                \${field("\u5e8f\u53f7", "projects."+i+".index", p.index)}
              </div>
              <div class="row">
                \${field("\u94fe\u63a5", "projects."+i+".url", p.url || "")}
                \${field("GitHub", "projects."+i+".github", p.github || "")}
              </div>
              \${field("\u6807\u7b7e\uff08\u9017\u53f7\u5206\u9694\uff09", "projects."+i+".tags", (p.tags || []).join(", "))}
              \${galleryField("\u56fe\u96c6", "projects."+i+".images", p.images || [], "projects")}
              <div class="row">
                \${field("ID", "projects."+i+".id", p.id)}
                \${field("\u9996\u9875\u5c55\u793a", "projects."+i+".featured", !!p.featured, { type: "checkbox" })}
              </div>
              <div class="item-actions">
                <button class="btn ghost sm" type="button" data-action="move-project" data-i="\${i}" data-dir="-1">\u4e0a\u79fb</button>
                <button class="btn ghost sm" type="button" data-action="move-project" data-i="\${i}" data-dir="1">\u4e0b\u79fb</button>
                <button class="btn danger sm" type="button" data-action="del-project" data-i="\${i}">\u5220\u9664</button>
              </div>
            </div>
          </div>
        \`).join("")}
      \`;
    }

    function renderCommissions() {
      return \`
        <div class="card">
          \${field("\u63a5\u5355\u5468\u671f", "commissionPeriod", store.commissionPeriod)}
        </div>
        <div class="section-head">
          <h2>\u4ea4\u4ed8\u9879\u76ee <span class="chip">\${store.commissions.length} \u9879</span></h2>
          <button class="btn ghost sm" type="button" data-action="add-commission">+\u65b0\u5efa\u4ea4\u4ed8</button>
        </div>
        \${store.commissions.map((c, i) => \`
          <div class="card item">
            <div class="thumb-wrap">
              \${thumb(c.image)}
              \${imageField("\u5c01\u9762\u56fe", "commissions."+i+".image", c.image, "commissions")}
            </div>
            <div>
              <div class="row">
                \${field("\u6807\u9898", "commissions."+i+".title", c.title)}
                \${field("\u7c7b\u578b", "commissions."+i+".kind", c.kind, { type: "select", options: KINDS })}
              </div>
              \${field("\u7c7b\u578b\u6587\u6848", "commissions."+i+".kindLabel", c.kindLabel)}
              \${field("\u63cf\u8ff0", "commissions."+i+".description", c.description, { type: "textarea" })}
              <div class="row3">
                \${field("\u72b6\u6001", "commissions."+i+".status", c.status, { type: "select", options: STATUS })}
                \${field("\u65e5\u671f", "commissions."+i+".date", c.date)}
                \${field("\u6570\u91cf\u6587\u6848", "commissions."+i+".countLabel", c.countLabel || "")}
              </div>
              <div class="row">
                \${field("\u94fe\u63a5", "commissions."+i+".url", c.url || "")}
                \${field("\u6807\u7b7e\uff08\u9017\u53f7\u5206\u9694\uff09", "commissions."+i+".tags", (c.tags || []).join(", "))}
              </div>
              \${galleryField("\u56fe\u96c6", "commissions."+i+".images", c.images || [], "commissions")}
              <div class="row">
                \${field("ID", "commissions."+i+".id", c.id)}
                \${field("\u9996\u9875\u5c55\u793a", "commissions."+i+".featured", !!c.featured, { type: "checkbox" })}
              </div>
              <div class="item-actions">
                <button class="btn ghost sm" type="button" data-action="move-commission" data-i="\${i}" data-dir="-1">\u4e0a\u79fb</button>
                <button class="btn ghost sm" type="button" data-action="move-commission" data-i="\${i}" data-dir="1">\u4e0b\u79fb</button>
                <button class="btn danger sm" type="button" data-action="del-commission" data-i="\${i}">\u5220\u9664</button>
              </div>
            </div>
          </div>
        \`).join("")}
      \`;
    }

    function renderLab() {
      return \`
        <div class="section-head">
          <h2>LAB <span class="chip">\${store.experiments.length}</span></h2>
          <button class="btn ghost sm" type="button" data-action="add-lab">+\u65b0\u5efa\u5b9e\u9a8c</button>
        </div>
        \${store.experiments.map((e, i) => \`
          <div class="card">
            <div class="row3">
              \${field("\u7f16\u53f7", "experiments."+i+".labNumber", e.labNumber)}
              \${field("\u6807\u9898", "experiments."+i+".title", e.title)}
              \${field("\u72b6\u6001", "experiments."+i+".status", e.status, { type: "select", options: STATUS })}
            </div>
            \${field("\u63cf\u8ff0", "experiments."+i+".description", e.description, { type: "textarea", rows: 2 })}
            <div class="row3">
              \${field("\u65e5\u671f", "experiments."+i+".date", e.date)}
              \${field("\u6280\u672f\uff08\u9017\u53f7\u5206\u9694\uff09", "experiments."+i+".technology", (e.technology || []).join(", "))}
              \${field("ID", "experiments."+i+".id", e.id)}
            </div>
            <div class="item-actions">
              <button class="btn ghost sm" type="button" data-action="move-lab" data-i="\${i}" data-dir="-1">\u4e0a\u79fb</button>
              <button class="btn ghost sm" type="button" data-action="move-lab" data-i="\${i}" data-dir="1">\u4e0b\u79fb</button>
              <button class="btn danger sm" type="button" data-action="del-lab" data-i="\${i}">\u5220\u9664</button>
            </div>
          </div>
        \`).join("")}
      \`;
    }

    function renderLogs() {
      return \`
        <div class="section-head">
          <h2>\u6784\u5efa\u65e5\u5fd7 <span class="chip">\${store.logs.length}</span></h2>
          <button class="btn ghost sm" type="button" data-action="add-log">+\u65b0\u5efa\u65e5\u5fd7</button>
        </div>
        \${store.logs.map((log, i) => \`
          <div class="card">
            <div class="row3">
              \${field("\u7c7b\u578b", "logs."+i+".type", log.type)}
              \${field("\u7f16\u53f7", "logs."+i+".number", log.number)}
              \${field("\u65e5\u671f", "logs."+i+".date", log.date)}
            </div>
            \${field("\u6807\u9898", "logs."+i+".title", log.title)}
            <div class="row">
              \${field("\u94fe\u63a5", "logs."+i+".href", log.href || "#logs")}
              \${field("ID", "logs."+i+".id", log.id)}
            </div>
            <div class="item-actions">
              <button class="btn ghost sm" type="button" data-action="move-log" data-i="\${i}" data-dir="-1">\u4e0a\u79fb</button>
              <button class="btn ghost sm" type="button" data-action="move-log" data-i="\${i}" data-dir="1">\u4e0b\u79fb</button>
              <button class="btn danger sm" type="button" data-action="del-log" data-i="\${i}">\u5220\u9664</button>
            </div>
          </div>
        \`).join("")}
      \`;
    }

    function collectFromDom() {
      const next = structuredClone(store);
      document.querySelectorAll("[data-path]").forEach((el) => {
        const path = el.dataset.path;
        let value;
        if (el.type === "checkbox") value = el.checked;
        else value = el.value;

        if (path === "aboutParagraphs" || path === "nowItems") {
          value = String(value).split("\\n").map((x) => x.trim()).filter(Boolean);
        } else if (/\\.tags$/.test(path) || /\\.technology$/.test(path)) {
          value = String(value).split(",").map((x) => x.trim()).filter(Boolean);
        } else if (/\\.images$/.test(path)) {
          value = String(value).split("\\n").map((x) => x.trim()).filter(Boolean);
        }

        setByPath(next, path, value);
      });

      // sync kindLabel from kind when empty-ish
      (next.commissions || []).forEach((c) => {
        const hit = KINDS.find((k) => k.id === c.kind);
        if (hit && (!c.kindLabel || KINDS.some((k) => k.label === c.kindLabel))) {
          c.kindLabel = hit.label;
        }
      });
      return next;
    }

    function setByPath(obj, path, value) {
      const parts = path.split(".");
      let cur = obj;
      for (let i = 0; i < parts.length - 1; i++) {
        const key = parts[i];
        const nextKey = parts[i + 1];
        const isIndex = /^\\d+$/.test(nextKey);
        if (cur[key] == null) cur[key] = isIndex ? [] : {};
        cur = cur[key];
      }
      cur[parts[parts.length - 1]] = value;
    }

    function moveItem(arr, i, dir) {
      const j = i + dir;
      if (j < 0 || j >= arr.length) return;
      const t = arr[i];
      arr[i] = arr[j];
      arr[j] = t;
    }

    function uid(prefix) {
      return prefix + "-" + Date.now().toString(36).slice(-6);
    }

    function handleAction(e) {
      const btn = e.target.closest("[data-action]");
      if (!btn) return;
      store = collectFromDom();
      const action = btn.dataset.action;
      const i = Number(btn.dataset.i);
      const dir = Number(btn.dataset.dir || 0);

      if (action === "add-project") {
        store.projects.unshift({
          id: uid("project"), title: "\u65b0\u4f5c\u54c1", category: "\u5206\u7c7b",
          description: "", image: "/projects/placeholder.png", images: [],
          tags: [], status: "BUILDING", date: "2026", featured: true, index: String(store.projects.length + 1).padStart(2, "0"),
        });
      }
      if (action === "del-project") store.projects.splice(i, 1);
      if (action === "move-project") moveItem(store.projects, i, dir);

      if (action === "add-commission") {
        store.commissions.push({
          id: uid("commission"), title: "\u65b0\u4ea4\u4ed8", kind: "campus", kindLabel: "\u6821\u56ed\u5355",
          description: "", image: "/commissions/placeholder.png", images: [],
          tags: [], status: "CLIENT", date: "2026", featured: true,
        });
      }
      if (action === "del-commission") store.commissions.splice(i, 1);
      if (action === "move-commission") moveItem(store.commissions, i, dir);

      if (action === "add-lab") {
        store.experiments.unshift({
          id: uid("lab"), labNumber: String(store.experiments.length + 1).padStart(3, "0"),
          title: "\u65b0\u5b9e\u9a8c", description: "", status: "EXPERIMENT", date: "2026", technology: [],
        });
      }
      if (action === "del-lab") store.experiments.splice(i, 1);
      if (action === "move-lab") moveItem(store.experiments, i, dir);

      if (action === "add-log") {
        store.logs.unshift({
          id: uid("log"), type: "\u6784\u5efa\u65e5\u5fd7", number: String(store.logs.length + 1).padStart(3, "0"),
          title: "\u65b0\u65e5\u5fd7", date: new Date().toLocaleDateString("en-US", { month: "2-digit", day: "2-digit", year: "numeric" }).replace(/(\\d+)\\/(\\d+)\\/(\\d+)/, "$1.$2.$3"),
          href: "#logs",
        });
      }
      if (action === "del-log") store.logs.splice(i, 1);
      if (action === "move-log") moveItem(store.logs, i, dir);

      if (action === "add-nav") store.navLinks.push({ label: "\u65b0\u94fe\u63a5", href: "#", external: false });
      if (action === "del-nav") store.navLinks.splice(i, 1);
      if (action === "move-nav") moveItem(store.navLinks, i, dir);

      render();
    }

    function render() {
      renderTabs();
      const map = {
        site: renderSite,
        hero: renderHero,
        about: renderAbout,
        projects: renderProjects,
        commissions: renderCommissions,
        lab: renderLab,
        logs: renderLogs,
      };
      $("panels").innerHTML = (map[activeTab] || renderSite)();
      $("panels").querySelectorAll(".card.item").forEach((card) => {
        const img = card.querySelector("img.thumb");
        const input = card.querySelector('input[data-path$=".image"]');
        if (img && input) {
          input.addEventListener("input", () => {
            img.src = input.value || "";
            img.style.opacity = "1";
          });
        }
      });
      bindUploads($("panels"));
      $("panels").onclick = handleAction;
    }

    async function load() {
      setMsg("\u52a0\u8f7d\u4e2d\u2026");
      const res = await fetch("/api/content", { cache: "no-store" });
      store = await res.json();
      setMsg("");
      render();
    }

    async function save() {
      try {
        store = collectFromDom();
        setMsg("\u4fdd\u5b58\u4e2d\u2026");
        const res = await fetch("/api/admin/content", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ store }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "\u4fdd\u5b58\u5931\u8d25");
        setMsg("\u5df2\u4fdd\u5b58\uff0c\u5237\u65b0\u524d\u53f0\u5373\u53ef", "ok");
      } catch (err) {
        setMsg(err.message || "\u4fdd\u5b58\u5931\u8d25", "err");
      }
    }

    $("btnSave").onclick = save;
    $("btnReload").onclick = load;
    load();
  </script>
</body>
</html>
`;

writeFileSync(path.join(root, "public", "admin.html"), html, "utf8");
console.log("wrote public/admin.html");
