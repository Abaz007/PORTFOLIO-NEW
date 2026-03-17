import { Hero } from "@/components/home/Hero";
import { FeaturedWork } from "@/components/home/FeaturedWork";
import { siteConfig } from "@/site.config";
import { getFeaturedCaseStudies } from "@/lib/content";

export default function HomePage() {
  const featured = getFeaturedCaseStudies(siteConfig.featuredWork);

  return (
    <>
      <Hero />
      <FeaturedWork caseStudies={featured} />
    </>
  );
}
