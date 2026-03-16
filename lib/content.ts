// lib/content.ts
import fs from "fs";
import path from "path";
import type { CaseStudy } from "./types";

const CONTENT_DIR = path.join(process.cwd(), "content");

// Returns all case study slugs. Used by generateStaticParams().
export function getAllSlugs(): string[] {
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((file) => file.endsWith(".json"))
    .map((file) => file.replace(".json", ""));
}

// Reads and parses a single case study JSON file.
// Throws if file doesn't exist or JSON is malformed (build fails with clear error).
export function getCaseStudy(slug: string): CaseStudy {
  const filePath = path.join(CONTENT_DIR, `${slug}.json`);

  if (!fs.existsSync(filePath)) {
    throw new Error(`Case study not found: ${slug}. Expected file at ${filePath}`);
  }

  const raw = fs.readFileSync(filePath, "utf-8");

  try {
    return JSON.parse(raw) as CaseStudy;
  } catch {
    throw new Error(`Invalid JSON in ${slug}.json. Check for syntax errors.`);
  }
}

// Returns metadata for all case studies — used to populate homepage cards.
export function getAllCaseStudies(): CaseStudy[] {
  return getAllSlugs().map(getCaseStudy);
}

// Returns only the case studies listed in siteConfig.featuredWork, in that order.
export function getFeaturedCaseStudies(featuredSlugs: readonly string[]): CaseStudy[] {
  return featuredSlugs
    .map((slug) => {
      try { return getCaseStudy(slug); }
      catch { return null; }
    })
    .filter(Boolean) as CaseStudy[];
}

// Returns previous and next slugs relative to current slug.
// Used by CaseStudyFooter for Prev/Next navigation.
export function getAdjacentCaseStudies(currentSlug: string): {
  prev: CaseStudy | null;
  next: CaseStudy | null;
} {
  const all = getAllSlugs();
  const idx = all.indexOf(currentSlug);
  return {
    prev: idx > 0 ? getCaseStudy(all[idx - 1]) : null,
    next: idx < all.length - 1 ? getCaseStudy(all[idx + 1]) : null,
  };
}
