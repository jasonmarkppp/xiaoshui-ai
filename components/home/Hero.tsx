"use client";

import Image from "next/image";
import { useContent } from "@/components/content/ContentProvider";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { StatusBadge } from "@/components/ui/StatusBadge";

export function Hero() {
  const { store } = useContent();
  const { site, currentProject } = store;

  return (
    <section id="top" className="relative pt-6 pb-10 sm:pt-10 sm:pb-16">
      <div className="radial-light" />
      <Stagger className="mx-auto grid max-w-[1200px] grid-cols-1 gap-3 px-4 sm:px-6 md:grid-cols-2 lg:grid-cols-12 lg:gap-4 lg:px-8">
        {/* Card 1 — Main Identity */}
        <StaggerItem className="md:col-span-2 lg:col-span-7 lg:row-span-2">
          <div className="card-surface relative flex min-h-[340px] flex-col justify-between overflow-hidden p-7 sm:min-h-[420px] sm:p-10 lg:min-h-[520px] lg:p-12">
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[rgba(91,140,255,0.06)] blur-3xl" />
            <div>
              <div className="mb-6 flex items-center gap-3 sm:mb-10">
                <Image
                  src="/logo.png"
                  alt=""
                  width={36}
                  height={36}
                  priority
                  className="h-9 w-9 rounded-lg object-cover"
                />
                <p className="text-sm font-medium tracking-wide text-[var(--accent)]">
                  {site.name}
                </p>
              </div>
              <h1 className="hero-title max-w-[11ch] text-[var(--text)]">
                {site.taglineLines[0]}
                <br />
                {site.taglineLines[1]}
              </h1>
              <p className="mt-6 max-w-md text-sm text-[var(--text-secondary)] sm:mt-8 sm:text-base">
                {site.english}
              </p>
            </div>
            <div className="mt-10 flex flex-wrap gap-3">
              <a href="#work" className="focus-ring btn-primary">
                查看作品
              </a>
              <a href="#now" className="focus-ring btn-secondary">
                最近动态
              </a>
            </div>
          </div>
        </StaggerItem>

        {/* Card 2 — Building Now */}
        <StaggerItem className="lg:col-span-5">
          <div className="card-surface flex h-full min-h-[180px] flex-col justify-between p-6 sm:p-7">
            <StatusBadge
              status="正在开发"
              color="#A3E635"
              className="text-[var(--status-green)]"
            />
            <div className="mt-6">
              <h2 className="text-xl font-semibold tracking-tight text-[var(--text)] sm:text-2xl">
                {currentProject.title}
              </h2>
              <p className="mt-2 max-w-sm text-sm leading-relaxed text-[var(--text-secondary)]">
                {currentProject.description}
              </p>
            </div>
            <div className="mt-8 flex items-center gap-4 text-xs uppercase tracking-[0.12em] text-[var(--text-muted)]">
              <span className="text-[var(--accent)]">{currentProject.version}</span>
              <span className="h-3 w-px bg-[var(--border)]" />
              <span>{currentProject.state}</span>
            </div>
          </div>
        </StaggerItem>

        {/* Card 3 — Identity Typography */}
        <StaggerItem className="lg:col-span-5">
          <div className="card-surface flex h-full min-h-[180px] flex-col justify-center gap-2 p-6 sm:p-7">
            <p className="text-3xl font-bold tracking-tight text-[var(--accent)] sm:text-4xl">
              AI
            </p>
            <p className="text-3xl font-bold tracking-tight text-[var(--text)] sm:text-4xl">
              FULLSTACK
            </p>
            <p className="text-3xl font-bold tracking-tight text-[var(--accent-secondary)] sm:text-4xl">
              CREATIVE
            </p>
            <p className="text-3xl font-bold tracking-tight text-[var(--highlight-orange)] sm:text-4xl">
              THREE.JS
            </p>
          </div>
        </StaggerItem>

        {/* Card 4 — Photo */}
        <StaggerItem className="md:col-span-1 lg:col-span-4">
          <div className="card-surface overflow-hidden p-2">
            <MediaFrame
              src="/portrait.png"
              alt={`${site.name} portrait`}
              className="aspect-square min-h-[280px]"
              priority
              vignette={false}
            />
          </div>
        </StaggerItem>

        {/* Card 5 — Current Project Preview */}
        <StaggerItem className="md:col-span-1 lg:col-span-8">
          <div className="card-surface overflow-hidden p-2 sm:p-3">
            <div className="mb-2 flex items-center justify-between px-2 pt-1 sm:px-3">
              <span className="text-[10px] uppercase tracking-[0.16em] text-[var(--text-muted)]">
                当前项目
              </span>
              <span className="text-[10px] uppercase tracking-[0.16em] text-[var(--accent)]">
                预览
              </span>
            </div>
            <MediaFrame
              src={currentProject.image}
              alt={`${currentProject.title} preview`}
              className="aspect-[16/9] min-h-[200px]"
              priority
              vignette={false}
              objectFit="cover"
            />
          </div>
        </StaggerItem>
      </Stagger>
    </section>
  );
}
