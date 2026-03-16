"use client"; // IntersectionObserver requires browser APIs

import { useEffect, useState } from "react";
import type { ContentBlock } from "@/lib/types";

type NavItem = {
  text:    string;
  anchor:  string;
  symbol?: string;
};

export function SidebarNav({ blocks }: { blocks: ContentBlock[] }) {
  // Derive nav items from section_heading blocks only
  const navItems: NavItem[] = blocks
    .filter((b): b is Extract<ContentBlock, { type: "section_heading" }> =>
      b.type === "section_heading"
    )
    .map(({ text, anchor, symbol }) => ({ text, anchor, symbol }));

  const [activeAnchor, setActiveAnchor] = useState<string>("");

  useEffect(() => {
    const headings = navItems
      .map(({ anchor }) => document.getElementById(anchor))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        // The topmost visible heading wins
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          setActiveAnchor(visible[0].target.id);
        }
      },
      {
        rootMargin: "-80px 0px -60% 0px",
        threshold:  0,
      }
    );

    headings.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [navItems]);

  if (navItems.length === 0) return null;

  return (
    <nav
      className="cs-sidebar pt-2"
      aria-label="Case study sections"
    >
      <ul className="space-y-1">
        {navItems.map(({ text, anchor, symbol }) => (
          <li key={anchor}>
            <a
              href={`#${anchor}`}
              className={[
                "flex items-center gap-2 text-sm py-1 pl-3 border-l-2 transition-all duration-250",
                activeAnchor === anchor
                  ? "border-accent text-ink font-medium"
                  : "border-transparent text-muted hover:text-ink hover:border-rule",
              ].join(" ")}
            >
              {symbol && (
                <span aria-hidden="true" className="text-muted shrink-0">
                  {symbol}
                </span>
              )}
              <span className="leading-tight">{text}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
