"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useContent } from "@/components/content/ContentProvider";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { store } = useContent();
  const { site, navLinks } = store;
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-[background-color,backdrop-filter,border-color] duration-300 ease-out",
        scrolled
          ? "border-b border-[var(--border)] bg-[rgba(9,9,11,0.72)] backdrop-blur-md"
          : "border-b border-transparent bg-[rgba(9,9,11,0.35)] backdrop-blur-[2px]",
      )}
    >
      <nav className="mx-auto flex h-14 max-w-[1200px] items-center justify-between px-4 sm:h-16 sm:px-6 lg:px-8">
        <a
          href="#top"
          className="focus-ring group inline-flex items-center gap-2.5 text-[15px] font-semibold tracking-tight text-[var(--text)]"
        >
          <Image
            src="/logo.png"
            alt=""
            width={28}
            height={28}
            priority
            className="h-7 w-7 rounded-md object-cover transition-transform duration-300 ease-out group-hover:scale-[1.04]"
          />
          <span>{site.name}</span>
        </a>
        <ul className="flex max-w-[70%] items-center gap-3 overflow-x-auto whitespace-nowrap sm:max-w-none sm:gap-5 lg:gap-7 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {navLinks.map((link) => (
            <li key={link.label} className="shrink-0">
              <a
                href={link.href}
                className="focus-ring text-[10px] font-medium uppercase tracking-[0.12em] text-[var(--text-secondary)] transition-colors duration-300 ease-out hover:text-[var(--text)] sm:text-[11px] sm:tracking-[0.14em]"
                {...(link.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                {link.label}
                {link.external ? " ↗" : ""}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
