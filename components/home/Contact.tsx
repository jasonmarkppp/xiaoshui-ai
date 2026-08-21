"use client";

import { useEffect, useId, useState } from "react";
import { X } from "lucide-react";
import { useContent } from "@/components/content/ContentProvider";
import { Container } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

export function Contact() {
  const { store } = useContent();
  const { site } = store;
  const [open, setOpen] = useState(false);
  const titleId = useId();

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
            联系
          </p>
          <h2 className="mx-auto mt-4 max-w-2xl section-title">
            有意思的想法？
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base text-[var(--text-secondary)] sm:text-lg">
            如果你也有 AI 产品、全栈站点、创意网页或 Three.js 想法，
            <br />
            一起来聊聊。
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="focus-ring btn-primary px-6"
            >
              开始对话 →
            </button>
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring btn-secondary px-6"
            >
              GitHub →
            </a>
          </div>
        </div>
      </Reveal>

      {open ? (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          onClick={() => setOpen(false)}
        >
          <div
            className="relative w-full max-w-[360px] overflow-hidden rounded-[16px] border border-[var(--border)] bg-[#121216] p-5 shadow-2xl sm:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              aria-label="关闭"
              onClick={() => setOpen(false)}
              className="focus-ring absolute right-3 top-3 rounded-full border border-[var(--border)] p-1.5 text-[var(--text-muted)] transition-colors hover:text-[var(--text)]"
            >
              <X className="h-4 w-4" aria-hidden />
            </button>

            <h3
              id={titleId}
              className="pr-8 text-left text-base font-semibold text-[var(--text)]"
            >
              微信联系
            </h3>
            <p className="mt-1 text-left text-sm text-[var(--text-secondary)]">
              扫码添加，一起聊项目与想法。
            </p>

            <div className="mt-5 overflow-hidden rounded-[12px] border border-[var(--border)] bg-white p-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/wechat-qr.png?v=1"
                alt="微信二维码"
                className="mx-auto h-auto w-full max-w-[280px]"
              />
            </div>

            <p className="mt-4 text-center text-[12px] text-[var(--text-muted)]">
              扫二维码，添加我为朋友。
            </p>

            <a
              href={`mailto:${site.email}`}
              className="mt-4 inline-flex w-full items-center justify-center text-center text-[12px] text-[var(--accent)]"
            >
              或发邮件 · {site.email}
            </a>
          </div>
        </div>
      ) : null}
    </Container>
  );
}
