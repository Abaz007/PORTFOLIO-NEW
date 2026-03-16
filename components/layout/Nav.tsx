import Link from "next/link";
import { siteConfig } from "@/site.config";
import { getFeaturedCaseStudies } from "@/lib/content";

export function Nav() {
  const featured = getFeaturedCaseStudies(siteConfig.featuredWork);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-rule"
      style={{ height: "var(--nav-height)" }}
    >
      <div className="max-w-page mx-auto px-6 h-full flex items-center justify-between gap-8">

        {/* Logo */}
        <Link
          href="/"
          className="font-display text-lg text-ink hover:text-accent transition-colors duration-250 shrink-0"
        >
          {siteConfig.owner.name}
        </Link>

        {/* Case study links */}
        <nav className="hidden md:flex items-center gap-6 overflow-x-auto">
          {featured.map((study) => (
            <Link
              key={study.slug}
              href={`/case-study/${study.slug}`}
              className="text-sm text-muted hover:text-ink transition-colors duration-250 whitespace-nowrap"
            >
              {study.meta.title}
            </Link>
          ))}
        </nav>

        {/* Contact links */}
        <div className="flex items-center gap-4 shrink-0">
          <Link
            href="/about"
            className="text-sm text-muted hover:text-ink transition-colors duration-250"
          >
            About
          </Link>
          <a
            href={siteConfig.owner.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted hover:text-ink transition-colors duration-250"
          >
            LinkedIn
          </a>
          <a
            href={siteConfig.owner.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-ink border border-ink px-3 py-1.5 hover:bg-ink hover:text-white transition-colors duration-250"
          >
            Resume
          </a>
        </div>

      </div>
    </header>
  );
}
