"use client";

import Image from "next/image";
import { useContent } from "@/components/content/ContentProvider";

export function Footer() {
  const { store } = useContent();
  const { site } = store;

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg-secondary)]">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-6 px-4 py-8 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <p className="inline-flex items-center gap-2.5 text-sm text-[var(--text-secondary)]">
          <Image
            src="/logo.png"
            alt=""
            width={18}
            height={18}
            className="h-[18px] w-[18px] rounded-sm object-cover"
          />
          {site.name} © 2026
        </p>
        <p className="text-sm text-[var(--text-muted)]">公开设计与构建中。</p>
        <div className="flex flex-wrap items-center gap-5 text-sm text-[var(--text-secondary)]">
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring transition-colors hover:text-[var(--text)]"
          >
            GitHub
          </a>
          <a
            href={site.bilibili}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring transition-colors hover:text-[var(--text)]"
          >
            哔哩哔哩
          </a>
          <a
            href={site.xiaohongshu}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring transition-colors hover:text-[var(--text)]"
          >
            小红书
          </a>
          {site.xianyu ? (
            <a
              href={site.xianyu}
              target="_blank"
              rel="noopener noreferrer"
              title={
                site.xianyuCode ? `打开后口令：${site.xianyuCode}` : undefined
              }
              className="focus-ring transition-colors hover:text-[var(--text)]"
            >
              小黄鱼
              {site.xianyuCode ? (
                <span className="ml-1 text-[11px] text-[var(--text-muted)]">
                  {site.xianyuCode}
                </span>
              ) : null}
            </a>
          ) : null}
          {site.douyin ? (
            <a
              href={site.douyin}
              target="_blank"
              rel="noopener noreferrer"
              title={
                site.douyinId
                  ? `抖音号 ${site.douyinId}${site.douyinCode ? ` · 口令 ${site.douyinCode}` : ""}`
                  : undefined
              }
              className="focus-ring transition-colors hover:text-[var(--text)]"
            >
              抖音
            </a>
          ) : null}
          <span className="inline-flex items-center gap-1.5 text-[11px] tracking-[0.14em] text-[var(--status-green)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--status-green)]" />
            在线
          </span>
        </div>
      </div>
    </footer>
  );
}
