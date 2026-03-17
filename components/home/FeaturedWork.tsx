import Image from "next/image";
import Link from "next/link";
import type { CaseStudy } from "@/lib/types";

type Props = {
  caseStudies: CaseStudy[];
};

function WorkCard({ study }: { study: CaseStudy }) {
  return (
    <Link href={`/case-study/${study.slug}`} className="group block">
      {/* Cover image card */}
      <div className="relative w-full h-[474px] bg-[#1e1e1e] rounded-[10px] overflow-hidden mb-4">
        <Image
          src={study.meta.cover_image}
          alt={study.meta.title}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      {/* Card footer */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col leading-[1.73] tracking-[0.6px]">
          <p className="font-body font-normal text-[14px] text-[#d4d4d4]">
            {study.meta.title}
          </p>
          <p className="font-body font-light text-[14px] text-[#a3a3a3]">
            {study.meta.descriptor}
          </p>
        </div>
        <div className="flex items-center gap-1 shrink-0 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
          <span className="font-body font-light text-[12px] text-[#a3a3a3] tracking-[0.6px] underline decoration-dotted underline-offset-2">
            View Case Study
          </span>
          <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 15L15 6M15 6H8M15 6V13" stroke="#a3a3a3" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </Link>
  );
}

export function FeaturedWork({ caseStudies }: Props) {
  return (
    <section className="max-w-[1440px] mx-auto px-[72px] pb-28">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[36px] gap-y-14">
        {caseStudies.map((study) => (
          <WorkCard key={study.slug} study={study} />
        ))}
      </div>
    </section>
  );
}
