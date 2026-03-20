import { getAllSlugs, getCaseStudy, getAdjacentCaseStudies } from "@/lib/content";
import { CaseStudySheet } from "@/components/case-study/CaseStudySheet";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export default async function InterceptedCaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const study    = getCaseStudy(slug);
  const adjacent = getAdjacentCaseStudies(slug);

  return (
    <CaseStudySheet
      study={study}
      prev={adjacent.prev}
      next={adjacent.next}
    />
  );
}
