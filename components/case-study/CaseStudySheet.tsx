"use client";

import { useRouter } from "next/navigation";
import { useEffect, useCallback } from "react";
import type { CaseStudy } from "@/lib/types";
import { CaseStudyHero } from "./CaseStudyHero";
import { CaseStudyFooter } from "./CaseStudyFooter";
import { BlockRenderer } from "./BlockRenderer";

type Props = {
  study:    CaseStudy;
  prev:     CaseStudy | null;
  next:     CaseStudy | null;
};

export function CaseStudySheet({ study, prev, next }: Props) {
  const router = useRouter();

  const close = useCallback(() => router.back(), [router]);

  // Lock background scroll while sheet is open
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
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/60 animate-fade-in cursor-pointer"
        onClick={close}
        aria-hidden="true"
      />

      {/* Sheet */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={study.meta.title}
        className="fixed inset-x-0 bottom-0 z-50 h-[95vh] bg-[#121212] rounded-t-[20px] overflow-hidden animate-sheet-up"
      >
        {/* Close button */}
        <button
          onClick={close}
          aria-label="Close case study"
          className="fixed top-5 right-5 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-[#1f1f1f] text-[#737373] hover:text-[#d4d4d4] hover:bg-[#2a2a2a] transition-colors duration-250 text-lg leading-none"
        >
          ×
        </button>

        {/* Drag handle */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-10 h-1 rounded-full bg-[#2a2a2a]" aria-hidden="true" />

        {/* Scrollable content */}
        <div className="h-full overflow-y-auto overscroll-contain">
          <CaseStudyHero
            heroImage={study.hero_image}
            title={study.meta.title}
            descriptor={study.meta.descriptor}
            role={study.meta.role}
            timeline={study.meta.timeline}
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
