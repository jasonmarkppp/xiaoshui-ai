import { writeFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

const content = `"use client";

import { useEffect, useId, useMemo, useState } from "react";
import { X } from "lucide-react";
import { useContent } from "@/components/content/ContentProvider";
import { Container } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

type Channel = "wechat" | "douyin" | "xiaohongshu" | "xianyu" | "bilibili";

export function Contact() {
  const { store } = useContent();
  const { site } = store;
  const [open, setOpen] = useState(false);
  const [channel, setChannel] = useState<Channel>("wechat");
  const titleId = useId();

  const channels = useMemo(
    () =>
      (
        [
          {
            id: "wechat" as const,
            label: "\\u5fae\\u4fe1",
            title: "\\u5fae\\u4fe1\\u8054\\u7cfb",
            desc: "\\u626b\\u7801\\u6dfb\\u52a0\\uff0c\\u4e00\\u8d77\\u804a\\u9879\\u76ee\\u4e0e\\u60f3\\u6cd5\\u3002",
            tip: "\\u626b\\u4e8c\\u7ef4\\u7801\\uff0c\\u6dfb\\u52a0\\u6211\\u4e3a\\u670b\\u53cb\\u3002",
            qr: "/wechat-qr.png?v=1",
            href: undefined as string | undefined,
            show: true,
          },
          {
            id: "douyin" as const,
            label: "\\u6296\\u97f3",
            title: "\\u6296\\u97f3",
            desc: site.douyinId
              ? \`\\u626b\\u7801\\u5173\\u6ce8\\u5c0f\\u6c35AI \\u00b7 \\u6296\\u97f3\\u53f7 \${site.douyinId}\`
              : "\\u626b\\u7801\\u5173\\u6ce8\\u5c0f\\u6c35AI",
            tip: "\\u6253\\u5f00\\u6296\\u97f3\\u626b\\u4e00\\u626b",
            qr: "/douyin-qr.png",
            href: site.douyin,
            show: Boolean(site.douyin),
          },
          {
            id: "xiaohongshu" as const,
            label: "\\u5c0f\\u7ea2\\u4e66",
            title: "\\u5c0f\\u7ea2\\u4e66",
            desc: site.xiaohongshuId
              ? \`\\u626b\\u7801\\u627e\\u5230\\u6211 \\u00b7 ID \${site.xiaohongshuId}\`
              : "\\u626b\\u7801\\u5728\\u5c0f\\u7ea2\\u4e66\\u627e\\u5230\\u6211",
            tip: "\\u6253\\u5f00\\u5c0f\\u7ea2\\u4e66\\u626b\\u4e00\\u626b",
            qr: "/xiaohongshu-qr.png",
            href: site.xiaohongshu,
            show: Boolean(site.xiaohongshu),
          },
          {
            id: "xianyu" as const,
            label: "\\u5c0f\\u9ec4\\u9c7c",
            title: "\\u95f2\\u9c7c / \\u5c0f\\u9ec4\\u9c7c",
            desc: site.xianyuCode
              ? \`\\u626b\\u7801\\u8fdb\\u5e97 \\u00b7 \\u53e3\\u4ee4 \${site.xianyuCode}\`
              : "\\u626b\\u7801\\u8fdb\\u5165\\u95f2\\u9c7c\\u5e97\\u94fa",
            tip: "\\u6253\\u5f00\\u95f2\\u9c7c\\u626b\\u4e00\\u626b",
            qr: "/xianyu-qr.png",
            href: site.xianyu,
            show: Boolean(site.xianyu),
          },
          {
            id: "bilibili" as const,
            label: "B\\u7ad9",
            title: "\\u54d4\\u54e9\\u54d4\\u54e9",
            desc: "\\u626b\\u7801\\u5173\\u6ce8 UP \\u4e3b \\u5c0f\\u6c35 AI",
            tip: "\\u6253\\u5f00\\u54d4\\u54e9\\u54d4\\u54e9\\u626b\\u4e00\\u626b",
            qr: "/bilibili-qr.png",
            href: site.bilibili,
            show: Boolean(site.bilibili),
          },
        ] as const
      ).filter((c) => c.show),
    [site],
  );

  const active = channels.find((c) => c.id === channel) ?? channels[0];

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <Container id="contact" className="py-16 sm:py-24" data-gsap-section>
      <Reveal>
        <div className="card-surface px-6 py-12 text-center sm:px-10 sm:py-16">
          <p className="text-[11px] uppercase tracking-[0.18em] text-[var(--text-muted)]">
            \\u8054\\u7cfb
          </p>
          <h2 className="mx-auto mt-4 max-w-2xl section-title">
            \\u6709\\u610f\\u601d\\u7684\\u60f3\\u6cd5\\uff1f
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base text-[var(--text-secondary)] sm:text-lg">
            \\u5982\\u679c\\u4f60\\u4e5f\\u6709 AI \\u4ea7\\u54c1\\u3001\\u5168\\u6808\\u7ad9\\u70b9\\u3001\\u521b\\u610f\\u7f51\\u9875\\u6216 Three.js \\u60f3\\u6cd5\\uff0c
            <br />
            \\u4e00\\u8d77\\u6765\\u804a\\u804a\\u3002
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => {
                setChannel("wechat");
                setOpen(true);
              }}
              className="focus-ring btn-primary px-6"
            >
              \\u5f00\\u59cb\\u5bf9\\u8bdd \\u2192
            </button>
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring btn-secondary px-6"
            >
              GitHub \\u2192
            </a>
          </div>
        </div>
      </Reveal>

      {open && active ? (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          onClick={() => setOpen(false)}
        >
          <div
            className="relative w-full max-w-[380px] overflow-hidden rounded-[16px] border border-[var(--border)] bg-[#121216] p-5 shadow-2xl sm:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              aria-label="\\u5173\\u95ed"
              onClick={() => setOpen(false)}
              className="focus-ring absolute right-3 top-3 rounded-full border border-[var(--border)] p-1.5 text-[var(--text-muted)] transition-colors hover:text-[var(--text)]"
            >
              <X className="h-4 w-4" aria-hidden />
            </button>

            <div className="mb-4 flex flex-wrap gap-2 pr-8">
              {channels.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setChannel(c.id)}
                  className={cn(
                    "rounded-full border px-3 py-1 text-xs transition-colors",
                    channel === c.id
                      ? "border-[var(--accent)] bg-[rgba(91,140,255,0.12)] text-[var(--text)]"
                      : "border-[var(--border)] text-[var(--text-muted)]",
                  )}
                >
                  {c.label}
                </button>
              ))}
            </div>

            <h3
              id={titleId}
              className="text-left text-base font-semibold text-[var(--text)]"
            >
              {active.title}
            </h3>
            <p className="mt-1 text-left text-sm text-[var(--text-secondary)]">
              {active.desc}
            </p>

            <div className="mt-5 overflow-hidden rounded-[12px] border border-[var(--border)] bg-white p-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={active.qr}
                alt={\`\${active.label} \\u4e8c\\u7ef4\\u7801\`}
                className="mx-auto h-auto w-full max-w-[280px]"
              />
            </div>

            <p className="mt-4 text-center text-[12px] text-[var(--text-muted)]">
              {active.tip}
            </p>

            {active.href ? (
              <a
                href={active.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex w-full items-center justify-center text-center text-[12px] text-[var(--accent)]"
              >
                \\u6253\\u5f00{active.label} \\u2192
              </a>
            ) : (
              <a
                href={\`mailto:\${site.email}\`}
                className="mt-4 inline-flex w-full items-center justify-center text-center text-[12px] text-[var(--accent)]"
              >
                \\u6216\\u53d1\\u90ae\\u4ef6 \\u00b7 {site.email}
              </a>
            )}
          </div>
        </div>
      ) : null}
    </Container>
  );
}
`;

const decoded = content.replace(/\\u([0-9a-fA-F]{4})/g, (_, h) =>
  String.fromCharCode(parseInt(h, 16)),
);

writeFileSync(path.join(root, "components/home/Contact.tsx"), decoded, "utf8");
console.log("ok");
