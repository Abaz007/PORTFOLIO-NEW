"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { siteConfig } from "@/site.config";

export function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Close menu on route change / scroll
  useEffect(() => {
    if (!menuOpen) return;
    function close() { setMenuOpen(false); }
    window.addEventListener("scroll", close, { passive: true });
    return () => window.removeEventListener("scroll", close);
  }, [menuOpen]);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 bg-[#121212]/95 backdrop-blur-sm"
        style={{ height: "var(--nav-height)" }}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 md:px-[72px] py-5 h-full flex items-center justify-between">

          {/* Left — name + title */}
          <Link href="/" className="flex flex-col gap-[2px] shrink-0" onClick={() => setMenuOpen(false)}>
            <span className="font-body font-light text-[14px] md:text-[16px] text-[#d4d4d4] tracking-[0.6px] leading-[1.73]">
              {siteConfig.owner.name}
            </span>
            <span className="font-body font-light text-[12px] md:text-[14px] text-[#737373] tracking-[0.6px] leading-[1.73]">
              Product Designer
            </span>
          </Link>

          {/* Desktop right — resume + Let's Talk */}
          <div className="hidden md:flex items-center gap-9 shrink-0">
            <a
              href={siteConfig.owner.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-body font-light text-[16px] text-[#a3a3a3] hover:text-[#d4d4d4] transition-colors duration-300"
            >
              My Resume
            </a>
            <a
              href={`mailto:${siteConfig.owner.email}`}
              className="flex items-center justify-center border border-[#a3a3a3] rounded-[1000px] px-[24px] py-[14px] h-[85px] w-[199px] hover:border-[#d4d4d4] transition-colors duration-300 shrink-0"
            >
              <span className="font-bricolage font-light text-[16px] text-[#a3a3a3] hover:text-[#d4d4d4] transition-colors duration-300 whitespace-nowrap">
                Let&apos;s Talk
              </span>
            </a>
          </div>

          {/* Mobile — hamburger button */}
          <button
            className="md:hidden flex flex-col justify-center items-center gap-[5px] w-9 h-9 shrink-0"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <span
              className={`block h-px w-5 bg-[#a3a3a3] transition-transform duration-300 origin-center ${menuOpen ? "translate-y-[6px] rotate-45" : ""}`}
            />
            <span
              className={`block h-px w-5 bg-[#a3a3a3] transition-opacity duration-300 ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-px w-5 bg-[#a3a3a3] transition-transform duration-300 origin-center ${menuOpen ? "-translate-y-[6px] -rotate-45" : ""}`}
            />
          </button>

        </div>
      </header>

      {/* Mobile dropdown menu */}
      <div
        className={`md:hidden fixed left-0 right-0 z-40 bg-[#121212]/98 backdrop-blur-sm border-b border-[#252525] transition-opacity duration-300 ease-in-out ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        style={{ top: "var(--nav-height)" }}
      >
        <div className="px-4 sm:px-8 py-6 flex flex-col gap-5">
          <a
            href={siteConfig.owner.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-body font-light text-[16px] text-[#a3a3a3] hover:text-[#d4d4d4] transition-colors duration-300"
            onClick={() => setMenuOpen(false)}
          >
            My Resume
          </a>
          <a
            href={`mailto:${siteConfig.owner.email}`}
            className="self-start flex items-center justify-center border border-[#d4d4d4] rounded-[1000px] px-6 py-3 hover:border-white transition-colors duration-300"
            onClick={() => setMenuOpen(false)}
          >
            <span className="font-bricolage font-light text-[15px] text-[#d4d4d4] hover:text-white transition-colors duration-300 whitespace-nowrap">
              Let&apos;s Talk
            </span>
          </a>
        </div>
      </div>

      {/* Backdrop to close menu */}
      {menuOpen && (
        <div
          className="md:hidden fixed inset-0 z-30"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}
