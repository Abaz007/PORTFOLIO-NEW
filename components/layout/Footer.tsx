import { siteConfig } from "@/site.config";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-rule py-10">
      <div className="max-w-page mx-auto px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="text-sm text-muted">
          © {year} {siteConfig.owner.name}
        </p>
        <div className="flex items-center gap-6">
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
            className="text-sm text-muted hover:text-ink transition-colors duration-250"
          >
            Resume
          </a>
          <a
            href={`mailto:${siteConfig.owner.email}`}
            className="text-sm text-muted hover:text-ink transition-colors duration-250"
          >
            {siteConfig.owner.email}
          </a>
        </div>
      </div>
    </footer>
  );
}
