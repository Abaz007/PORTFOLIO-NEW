"use client";

import { useRouter } from "next/navigation";
import { useEffect, useCallback } from "react";
import type { CaseStudy } from "@/lib/types";
import { CaseStudyHero } from "./CaseStudyHero";
import { CaseStudyFooter } from "./CaseStudyFooter";
import { BlockRenderer } from "./BlockRenderer";

type Props = {
  study: CaseStudy;
  prev:  CaseStudy | null;
  next:  CaseStudy | null;
};

export function CaseStudySheet({ study, prev, next }: Props) {
  const router = useRouter();
  const close = useCallback(() => router.back(), [router]);

  // Lock background scroll while modal is open
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = original; };
  }, []);

  // Close on Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [close]);

  return (
    <>
      {/* Backdrop — rgba(30,30,30,0.9) per Figma, sits above the nav */}
      <div
        className="fixed inset-0 z-[55] backdrop-in cursor-pointer"
        style={{ background: "rgba(30, 30, 30, 0.92)" }}
        onClick={close}
        aria-hidden="true"
      />

      {/* Modal card — 72px margins on desktop, 12px on mobile */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={study.meta.title}
        className="fixed z-[60] top-4 bottom-4 left-3 right-3 md:left-[72px] md:right-[72px] bg-[#121212] rounded-[20px] overflow-hidden modal-appear"
        style={{ boxShadow: "0px 4px 30px 0px rgba(0, 0, 0, 0.3)" }}
      >
        {/* Close button — top right of the card */}
        <button
          onClick={close}
          aria-label="Close case study"
          className="absolute top-5 right-5 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-[#1f1f1f] text-[#737373] hover:text-[#d4d4d4] hover:bg-[#2a2a2a] transition-colors duration-250 text-xl leading-none"
        >
          ×
        </button>

        {/* Scrollable content inside the card */}
        <div className="h-full overflow-y-auto overscroll-contain">
          <CaseStudyHero
            heroImage={study.hero_image}
            title={study.meta.title}
            descriptor={study.meta.descriptor}
            role={study.meta.role}
            timeline={study.meta.timeline}
            intro={study.intro}
            roleDescription={study.my_role}
            noDivider={study.no_hero_divider}
            noNavOffset
          />

          <div className="max-w-reading mx-auto px-6 py-16">
            <article>
              <BlockRenderer blocks={study.blocks} />
            </article>
          </div>

          <CaseStudyFooter prev={prev} next={next} />
        </div>
      </div>
    </>
  );
}
