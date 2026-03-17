import Link from "next/link";
import { siteConfig } from "@/site.config";

export function Hero() {
  return (
    <section className="max-w-page mx-auto px-6 py-24 lg:py-32">

      {/* Headline */}
      <h1 className="font-display font-light text-5xl sm:text-6xl lg:text-7xl text-ink leading-[1.12] tracking-[-0.02em] mb-8 max-w-4xl">
        {siteConfig.owner.tagline}
      </h1>

      {/* Bio */}
      <p className="font-body text-base text-muted leading-[1.7] mb-10 max-w-xl">
        {siteConfig.owner.bio}
      </p>

      {/* Links */}
      <div className="flex flex-wrap items-center gap-7">
        <a
          href={`mailto:${siteConfig.owner.email}`}
          className="text-sm text-muted hover:text-ink transition-colors duration-300 underline-link"
        >
          Email
        </a>
        <a
          href={siteConfig.owner.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-muted hover:text-ink transition-colors duration-300 underline-link"
        >
          LinkedIn
        </a>
        <a
          href={siteConfig.owner.resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-muted hover:text-ink transition-colors duration-300 underline-link"
        >
          Resume
        </a>
        <Link
          href="/about"
          className="text-sm text-muted hover:text-ink transition-colors duration-300 underline-link"
        >
          About
        </Link>
      </div>

    </section>
  );
}
