"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { CaseStudy } from "@/lib/types";

type Props = {
  prev: CaseStudy | null;
  next: CaseStudy | null;
  isModal?: boolean;
};

export function CaseStudyFooter({ prev, next, isModal = false }: Props) {
  const router = useRouter();

  function navigate(slug: string) {
    if (isModal) {
      router.replace(`/case-study/${slug}`);
    } else {
      router.push(`/case-study/${slug}`);
    }
  }

  return (
    <div className="max-w-reading mx-auto px-6 pt-16 pb-24">
      <h2 className="font-display text-[36px] text-[#d4d4d4] leading-[1.4] mb-14">
        Thanks for Reading
      </h2>

      <div className="h-px bg-[#262626]" />

      <div className="flex items-center justify-between mt-6">
        <Link
          href="/"
          className="font-body text-[13px] text-[#737373] tracking-[0.6px] leading-[1.73] uppercase underline decoration-dotted hover:text-[#d4d4d4] transition-colors duration-250"
        >
          All Projects
        </Link>

        {next ? (
          <button
            onClick={() => navigate(next.slug)}
            className="font-body text-[13px] text-[#737373] tracking-[0.6px] leading-[1.73] uppercase underline decoration-dotted hover:text-[#d4d4d4] transition-colors duration-250"
          >
            Next Project
          </button>
        ) : prev ? (
          <button
            onClick={() => navigate(prev.slug)}
            className="font-body text-[13px] text-[#737373] tracking-[0.6px] leading-[1.73] uppercase underline decoration-dotted hover:text-[#d4d4d4] transition-colors duration-250"
          >
            Prev Project
          </button>
        ) : null}
      </div>
    </div>
  );
}
