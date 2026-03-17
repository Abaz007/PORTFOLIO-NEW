import { siteConfig } from "@/site.config";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[#252525] py-10">
      <div className="max-w-[1440px] mx-auto px-[72px] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="font-body font-light text-[14px] text-[#525252] tracking-[0.6px]">
          © {year} {siteConfig.owner.name}
        </p>
        <div className="flex items-center gap-6">
          <a
            href={siteConfig.owner.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="font-body font-light text-[14px] text-[#a3a3a3] hover:text-[#d4d4d4] transition-colors duration-300 tracking-[0.6px]"
          >
            LinkedIn
          </a>
          <a
            href={siteConfig.owner.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-body font-light text-[14px] text-[#a3a3a3] hover:text-[#d4d4d4] transition-colors duration-300 tracking-[0.6px]"
          >
            Resume
          </a>
          <a
            href={`mailto:${siteConfig.owner.email}`}
            className="font-body font-light text-[14px] text-[#a3a3a3] hover:text-[#d4d4d4] transition-colors duration-300 tracking-[0.6px]"
          >
            {siteConfig.owner.email}
          </a>
        </div>
      </div>
    </footer>
  );
}
