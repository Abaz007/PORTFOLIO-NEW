import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./site.config.ts",
  ],
  theme: {
    extend: {

      // ── TYPOGRAPHY ────────────────────────────────────────────
      fontFamily: {
        display: ["var(--font-serif)", "Georgia", "serif"],
        body:    ["var(--font-body)", "var(--font-inter)", "system-ui", "sans-serif"],
        mono:    ["var(--font-mono)", "ui-monospace", "monospace"],
      },

      // ── COLOURS ───────────────────────────────────────────────
      colors: {
        ink:    "#111827",   // Near-black — primary text, headings
        muted:  "#6B7280",   // Gray-500 — captions, metadata, sidebar inactive
        rule:   "#E5E7EB",   // Gray-200 — dividers, card borders
        accent: "#1D4ED8",   // Blue-700 — links, active sidebar, stat positive
        ghost:  "#F9FAFB",   // Gray-50 — subtle backgrounds
      },

      // ── LAYOUT ────────────────────────────────────────────────
      maxWidth: {
        reading: "720px",    // Text reading column
        content: "1000px",   // Full-width image breakout
        page:    "1100px",   // Outer page container
      },

      // ── BREAKPOINTS ───────────────────────────────────────────
      screens: {
        // Default Tailwind breakpoints kept (sm:640, md:768, lg:1024, xl:1280)
        sidebar: "1100px",   // SidebarNav appears at this width
      },

      // ── SPACING ───────────────────────────────────────────────
      spacing: {
        "18": "4.5rem",      // 72px — nav height
        "22": "5.5rem",      // 88px — section gap mobile
        "28": "7rem",        // 112px — section gap desktop
      },

      // ── TRANSITIONS ───────────────────────────────────────────
      transitionDuration: {
        "250": "250ms",
      },

    },
  },
  plugins: [],
} satisfies Config;
