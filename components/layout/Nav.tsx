import Link from "next/link";
import { siteConfig } from "@/site.config";
import { getFeaturedCaseStudies } from "@/lib/content";

export function Nav() {
  const featured = getFeaturedCaseStudies(siteConfig.featuredWork);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 bg-white/96 backdrop-blur-sm border-b border-rule"
      style={{ height: "var(--nav-height)" }}
    >
      <div className="max-w-page mx-auto px-6 h-full flex items-center justify-between gap-8">

        {/* Logo */}
        <Link
          href="/"
          className="font-display text-[1.05rem] text-ink hover:text-muted transition-colors duration-300 shrink-0"
        >
          {siteConfig.owner.name}
        </Link>

        {/* Case study links — center */}
        <nav className="hidden md:flex items-center gap-7 overflow-x-auto">
          {featured.map((study) => (
            <Link
              key={study.slug}
              href={`/case-study/${study.slug}`}
              className="font-mono text-[11px] text-muted hover:text-ink transition-colors duration-300 tracking-[0.08em] whitespace-nowrap"
            >
              {study.meta.title}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-6 shrink-0">
          <Link
            href="/about"
            className="font-mono text-[11px] text-muted hover:text-ink transition-colors duration-300 tracking-[0.08em]"
          >
            About
          </Link>
          <a
            href={siteConfig.owner.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[11px] text-muted hover:text-ink transition-colors duration-300 tracking-[0.08em]"
          >
            Resume
          </a>
        </div>

      </div>
    </header>
  );
}
