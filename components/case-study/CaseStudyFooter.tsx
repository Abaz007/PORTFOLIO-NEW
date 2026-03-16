import Link from "next/link";
import Image from "next/image";
import type { CaseStudy } from "@/lib/types";

type Props = {
  prev: CaseStudy | null;
  next: CaseStudy | null;
};

function NavCard({
  study,
  direction,
}: {
  study: CaseStudy;
  direction: "prev" | "next";
}) {
  return (
    <Link
      href={`/case-study/${study.slug}`}
      className="group flex items-center gap-4 flex-1 p-6 border border-rule hover:border-ink transition-colors duration-250"
    >
      {direction === "prev" && (
        <span className="text-muted group-hover:text-ink transition-colors duration-250 shrink-0 text-lg">
          ←
        </span>
      )}

      <div className="relative w-16 h-10 bg-ghost overflow-hidden shrink-0">
        <Image
          src={study.meta.cover_image}
          alt={study.meta.title}
          fill
          className="object-cover"
          sizes="64px"
        />
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-xs text-muted font-mono uppercase tracking-widest mb-0.5">
          {direction === "prev" ? "Previous" : "Next"}
        </p>
        <p className="text-sm font-medium text-ink truncate group-hover:text-accent transition-colors duration-250">
          {study.meta.title}
        </p>
      </div>

      {direction === "next" && (
        <span className="text-muted group-hover:text-ink transition-colors duration-250 shrink-0 text-lg">
          →
        </span>
      )}
    </Link>
  );
}

export function CaseStudyFooter({ prev, next }: Props) {
  if (!prev && !next) return null;

  return (
    <nav
      aria-label="Case study navigation"
      className="border-t border-rule"
    >
      <div className="max-w-page mx-auto px-6 py-12">
        <p className="font-mono text-sm text-muted tracking-widest uppercase mb-6">
          More work
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          {prev ? (
            <NavCard study={prev} direction="prev" />
          ) : (
            <div className="flex-1" />
          )}
          {next && <NavCard study={next} direction="next" />}
        </div>
      </div>
    </nav>
  );
}
