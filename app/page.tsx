import { Hero } from "@/components/home/Hero";
import { Marquee } from "@/components/home/Marquee";
import { FeaturedWork } from "@/components/home/FeaturedWork";
import { siteConfig } from "@/site.config";
import { getFeaturedCaseStudies } from "@/lib/content";

export default function HomePage() {
  const featured = getFeaturedCaseStudies(siteConfig.featuredWork);

  return (
    <>
      <Hero />
      <Marquee row1={siteConfig.marqueeRow1} row2={siteConfig.marqueeRow2} />
      <FeaturedWork caseStudies={featured} />
    </>
  );
}
