import Link from "next/link";
import { siteConfig } from "@/site.config";

export function Nav() {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 bg-[#121212]/95 backdrop-blur-sm"
      style={{ height: "var(--nav-height)" }}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 md:px-[72px] py-5 h-full flex items-center justify-between">

        {/* Left — name + title */}
        <Link href="/" className="flex flex-col gap-[2px] shrink-0">
          <span className="font-body font-light text-[14px] md:text-[16px] text-[#d4d4d4] tracking-[0.6px] leading-[1.73]">
            {siteConfig.owner.name}
          </span>
          <span className="font-body font-light text-[12px] md:text-[14px] text-[#737373] tracking-[0.6px] leading-[1.73]">
            Product Designer
          </span>
        </Link>

        {/* Right — resume link + Let's Talk button */}
        <div className="flex items-center gap-4 md:gap-9 shrink-0">
          <a
            href={siteConfig.owner.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:block font-body font-light text-[14px] md:text-[16px] text-[#a3a3a3] hover:text-[#d4d4d4] transition-colors duration-300"
          >
            My Resume
          </a>
          <a
            href={`mailto:${siteConfig.owner.email}`}
            className="flex items-center justify-center border border-[#a3a3a3] rounded-[1000px] px-4 py-2 md:px-[24px] md:py-[14px] md:h-[85px] md:w-[199px] hover:border-[#d4d4d4] transition-colors duration-300 shrink-0"
          >
            <span className="font-bricolage font-light text-[13px] md:text-[16px] text-[#a3a3a3] hover:text-[#d4d4d4] transition-colors duration-300 whitespace-nowrap">
              Let&apos;s Talk
            </span>
          </a>
        </div>

      </div>
    </header>
  );
}
