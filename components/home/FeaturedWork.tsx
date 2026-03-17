import Image from "next/image";
import Link from "next/link";
import type { CaseStudy } from "@/lib/types";

type Props = {
  caseStudies: CaseStudy[];
};

function WorkCard({ study, index }: { study: CaseStudy; index: number }) {
  return (
    <Link
      href={`/case-study/${study.slug}`}
      className="group block work-card"
    >
      {/* Index number */}
      <p className="font-mono text-[11px] text-muted tracking-[0.18em] mb-4">
        {String(index + 1).padStart(2, "0")}
      </p>

      {/* Cover image */}
      <div className="relative w-full aspect-[4/3] overflow-hidden bg-ghost mb-5">
        <Image
          src={study.meta.cover_image}
          alt={study.meta.title}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      {/* Text row */}
      <div className="space-y-2">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="font-display text-[1.4rem] text-ink leading-snug">
            {study.meta.title}
          </h3>
          <span className="text-sm text-muted opacity-0 translate-x-[-4px] group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 shrink-0">
            View →
          </span>
        </div>
        <p className="text-sm text-muted leading-relaxed">
          {study.meta.descriptor}
        </p>
        <p className="font-mono text-[11px] text-muted/60 tracking-wide">
          {study.meta.role} · {study.meta.timeline}
        </p>
      </div>
    </Link>
  );
}

export function FeaturedWork({ caseStudies }: Props) {
  return (
    <section className="max-w-page mx-auto px-6 pb-28">
      {/* Section label */}
      <p className="font-mono text-[11px] text-muted tracking-[0.18em] uppercase mb-14 border-t border-rule pt-10">
        Selected work
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20">
        {caseStudies.map((study, i) => (
          <WorkCard key={study.slug} study={study} index={i} />
        ))}
      </div>
    </section>
  );
}
