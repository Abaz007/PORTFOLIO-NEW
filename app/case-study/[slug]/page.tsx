import type { Metadata } from "next";
import { getAllSlugs, getCaseStudy, getAdjacentCaseStudies } from "@/lib/content";
import { CaseStudyHero } from "@/components/case-study/CaseStudyHero";
import { CaseStudyFooter } from "@/components/case-study/CaseStudyFooter";
import { BlockRenderer } from "@/components/case-study/BlockRenderer";

type Props = {
  params: Promise<{ slug: string }>;
};

// Step 1: Tell Next.js which slugs to pre-build
export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

// Step 2: Generate SEO metadata per page
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  return {
    title:       study.meta.title,
    description: study.meta.descriptor,
    openGraph: {
      title:       study.meta.title,
      description: study.meta.descriptor,
      images:      [{ url: study.meta.cover_image, width: 1200, height: 630 }],
      type:        "article",
    },
    twitter: {
      card:  "summary_large_image",
      images: [study.meta.cover_image],
    },
  };
}

// Step 3: Render page
export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const study    = getCaseStudy(slug);
  const adjacent = getAdjacentCaseStudies(slug);

  return (
    <>
      <CaseStudyHero
        heroImage={study.hero_image}
        title={study.meta.title}
        descriptor={study.meta.descriptor}
        role={study.meta.role}
        timeline={study.meta.timeline}
        intro={study.intro}
        roleDescription={study.my_role}
        noDivider={study.no_hero_divider}
      />

      {/* Reading column — centered, no sidebar */}
      <div className="max-w-reading mx-auto px-6 py-16">
        <article>
          <BlockRenderer blocks={study.blocks} />
        </article>
      </div>

      <CaseStudyFooter prev={adjacent.prev} next={adjacent.next} />
    </>
  );
}
