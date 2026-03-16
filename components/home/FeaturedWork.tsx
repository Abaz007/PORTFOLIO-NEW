import Image from "next/image";
import Link from "next/link";
import type { CaseStudy } from "@/lib/types";

type Props = {
  caseStudies: CaseStudy[];
};

function WorkCard({ study }: { study: CaseStudy }) {
  return (
    <Link
      href={`/case-study/${study.slug}`}
      className="group block"
    >
      {/* Cover image */}
      <div className="relative w-full aspect-[3/2] overflow-hidden bg-ghost mb-4">
        <Image
          src={study.meta.cover_image}
          alt={study.meta.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw"
        />
      </div>

      {/* Card text */}
      <div className="space-y-1">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-display text-xl text-ink group-hover:text-accent transition-colors duration-250">
            {study.meta.title}
          </h3>
          <span className="text-muted text-sm shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-250">
            View →
          </span>
        </div>
        <p className="text-sm text-muted">{study.meta.descriptor}</p>
        <p className="text-xs text-muted/70 font-mono">{study.meta.role} · {study.meta.timeline}</p>
      </div>
    </Link>
  );
}

export function FeaturedWork({ caseStudies }: Props) {
  return (
    <section className="max-w-page mx-auto px-6 py-20">
      <p className="font-mono text-sm text-muted tracking-widest uppercase mb-10">
        Selected work
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {caseStudies.map((study) => (
          <WorkCard key={study.slug} study={study} />
        ))}
      </div>
    </section>
  );
}
