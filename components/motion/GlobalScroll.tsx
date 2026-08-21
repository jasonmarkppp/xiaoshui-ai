"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Global GSAP scroll layer for the workshop site:
 * - top progress rail
 * - grid parallax
 * - section title scrub
 * - card image depth / soft tilt on enter
 * - subtle velocity skew on main
 */
export function GlobalScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const ctx = gsap.context(() => {
      const progress = document.querySelector<HTMLElement>(".scroll-progress");
      if (progress) {
        gsap.set(progress, { scaleX: 0, transformOrigin: "left center" });
        gsap.to(progress, {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: document.documentElement,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.35,
          },
        });
      }

      const grid = document.querySelector<HTMLElement>(".grid-bg");
      if (grid) {
        gsap.to(grid, {
          backgroundPosition: "center 180px",
          ease: "none",
          scrollTrigger: {
            trigger: document.documentElement,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
          },
        });
      }

      gsap.utils.toArray<HTMLElement>(".section-title").forEach((title) => {
        gsap.fromTo(
          title,
          { y: 28, opacity: 0.35, letterSpacing: "0.04em" },
          {
            y: 0,
            opacity: 1,
            letterSpacing: "0em",
            ease: "none",
            scrollTrigger: {
              trigger: title,
              start: "top 88%",
              end: "top 48%",
              scrub: 0.5,
            },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-gsap='card-tilt']").forEach((el) => {
        const img = el.querySelector<HTMLElement>(".media-frame, img");
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: "top 92%",
            end: "top 42%",
            scrub: 0.6,
          },
        });
        tl.fromTo(
          el,
          { y: 36, rotateX: 4, transformPerspective: 900 },
          { y: 0, rotateX: 0, ease: "none" },
          0,
        );
        if (img) {
          tl.fromTo(img, { scale: 1.08, y: 12 }, { scale: 1, y: 0, ease: "none" }, 0);
        }
      });

      const hero = document.querySelector<HTMLElement>("#top");
      if (hero) {
        gsap.to(hero.querySelectorAll(".card-surface"), {
          y: -28,
          ease: "none",
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });

        const radial = hero.querySelector<HTMLElement>(".radial-light");
        if (radial) {
          gsap.to(radial, {
            opacity: 0.35,
            scale: 1.15,
            ease: "none",
            scrollTrigger: {
              trigger: hero,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          });
        }
      }

      // Soft scan line across commissioned / work sections
      gsap.utils.toArray<HTMLElement>("[data-gsap-section]").forEach((section) => {
        const line = document.createElement("div");
        line.className = "gsap-scanline";
        section.prepend(line);
        gsap.fromTo(
          line,
          { scaleX: 0, opacity: 0 },
          {
            scaleX: 1,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              end: "top 45%",
              scrub: 0.4,
            },
          },
        );
      });
    });

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      ctx.revert();
      document.querySelectorAll(".gsap-scanline").forEach((n) => n.remove());
    };
  }, []);

  return <div className="scroll-progress" aria-hidden />;
}
