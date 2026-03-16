import type { Metadata } from "next";
import { siteConfig } from "@/site.config";

export const metadata: Metadata = {
  title: "About",
  description: `About ${siteConfig.owner.name} — ${siteConfig.owner.title}`,
};

export default function AboutPage() {
  return (
    <div className="max-w-page mx-auto px-6 py-20">
      <div className="max-w-reading">

        <p className="font-mono text-sm text-muted tracking-widest uppercase mb-8">
          About
        </p>

        <h1 className="font-display text-5xl text-ink leading-tight mb-10">
          {siteConfig.owner.name}
        </h1>

        <div className="space-y-6 text-ink leading-relaxed text-lg">
          <p>
            I&apos;m a {siteConfig.owner.title} based in Lagos, Nigeria. I design
            complex, data-heavy products that feel intuitive to the people who use
            them every day.
          </p>
          <p>
            My work sits at the intersection of systems thinking and human behaviour
            — understanding how products fit into real lives, then crafting interfaces
            that reduce friction and build trust.
          </p>
          <p>
            I&apos;ve led design at fintech startups, enterprise software teams, and
            everything in between. I care deeply about craft, documentation, and
            bringing engineering and product stakeholders along on the design
            journey.
          </p>
        </div>

        <div className="mt-14 pt-10 border-t border-rule">
          <p className="text-sm text-muted mb-4 uppercase tracking-widest font-mono">
            Get in touch
          </p>
          <div className="flex flex-col gap-2">
            <a
              href={`mailto:${siteConfig.owner.email}`}
              className="text-accent hover:underline underline-offset-4 text-sm"
            >
              {siteConfig.owner.email}
            </a>
            <a
              href={siteConfig.owner.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline underline-offset-4 text-sm"
            >
              LinkedIn
            </a>
            <a
              href={siteConfig.owner.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline underline-offset-4 text-sm"
            >
              Download resume
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
