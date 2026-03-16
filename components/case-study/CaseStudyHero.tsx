import Image from "next/image";
import Link from "next/link";

type Props = {
  heroImage: string;
  title:     string;
  role:      string;
  timeline:  string;
};

export function CaseStudyHero({ heroImage, title, role, timeline }: Props) {
  return (
    <div style={{ paddingTop: "var(--nav-height)" }}>
      {/* Full-width hero image */}
      <div className="relative w-full h-[55vh] min-h-[320px] max-h-[640px] bg-ghost">
        <Image
          src={heroImage}
          alt={title}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </div>

      {/* Metadata strip */}
      <div className="max-w-page mx-auto px-6 py-8 border-b border-rule">
        <Link
          href="/"
          className="text-sm text-muted hover:text-ink transition-colors duration-250 mb-6 inline-block"
        >
          ← All projects
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <h1 className="font-display text-4xl sm:text-5xl text-ink leading-tight">
            {title}
          </h1>
          <dl className="flex gap-8 shrink-0">
            <div>
              <dt className="text-xs text-muted font-mono uppercase tracking-widest mb-1">Role</dt>
              <dd className="text-sm text-ink">{role}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted font-mono uppercase tracking-widest mb-1">Timeline</dt>
              <dd className="text-sm text-ink">{timeline}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
