import Link from "next/link";
import { siteConfig } from "@/site.config";

export function Hero() {
  return (
    <section
      className="max-w-page mx-auto px-6 flex flex-col justify-end"
      style={{ paddingTop: "calc(var(--nav-height) + 6rem)", paddingBottom: "5rem" }}
    >
      <p className="font-mono text-sm text-muted tracking-widest uppercase mb-6">
        {siteConfig.owner.title}
      </p>

      <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl text-ink leading-tight tracking-tight mb-8 max-w-3xl">
        {siteConfig.owner.tagline}
      </h1>

      {/* Contact links */}
      <div className="flex flex-wrap items-center gap-6">
        <a
          href={`mailto:${siteConfig.owner.email}`}
          className="text-sm text-muted hover:text-ink transition-colors duration-250 underline underline-offset-4"
        >
          {siteConfig.owner.email}
        </a>
        <a
          href={siteConfig.owner.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-muted hover:text-ink transition-colors duration-250 underline underline-offset-4"
        >
          LinkedIn
        </a>
        <a
          href={siteConfig.owner.resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-muted hover:text-ink transition-colors duration-250 underline underline-offset-4"
        >
          Resume
        </a>
        <Link
          href="/about"
          className="text-sm text-muted hover:text-ink transition-colors duration-250 underline underline-offset-4"
        >
          About
        </Link>
      </div>
    </section>
  );
}
