# Platform Architecture
## Abasifreke Nkanta — UX Design Portfolio

**Version:** 1.0  
**Date:** March 2026  
**Stack:** Next.js 14 (App Router) · TypeScript · Tailwind CSS · Cloudinary · Vercel · GitHub

---

## Table of Contents

1. [System Overview](#1-system-overview)
2. [Architecture Pattern](#2-architecture-pattern)
3. [System Topology](#3-system-topology)
4. [Request Lifecycle](#4-request-lifecycle)
5. [Repository System](#5-repository-system)
6. [Content System](#6-content-system)
7. [Rendering System](#7-rendering-system)
8. [Component System](#8-component-system)
9. [Media System (Cloudinary)](#9-media-system-cloudinary)
10. [Routing System](#10-routing-system)
11. [Design Token System](#11-design-token-system)
12. [Build System](#12-build-system)
13. [Deployment System (Vercel)](#13-deployment-system-vercel)
14. [Performance System](#14-performance-system)
15. [Data Flow Diagrams](#15-data-flow-diagrams)
16. [Error Boundaries & Edge Cases](#16-error-boundaries--edge-cases)
17. [Environment & Secrets](#17-environment--secrets)
18. [Extension Points](#18-extension-points)

---

## 1. System Overview

The portfolio is a **statically generated website** — at build time, Next.js reads all content JSON files, renders every page to HTML, and uploads the resulting static files to Vercel's global CDN. At runtime, the site is inert: no server processes requests, no database queries run, no API calls fire for content. A visitor loading a case study receives a pre-built HTML file.

The architecture has three distinct phases that never overlap:

```
AUTHOR TIME          BUILD TIME            RUNTIME
─────────────        ──────────            ───────
Edit JSON files  →   Next.js reads     →   Visitor receives
Upload media         JSON, renders         static HTML from
to Cloudinary        all pages,            Vercel CDN edge
                     uploads to            node nearest to
                     Vercel edge           their geography
```

**Why this matters for a portfolio:** Static sites have essentially zero operational complexity. There is no server to crash, no database to go down, no memory leak to monitor. The site either builds successfully or it doesn't — and if it builds, it works. This is the right architecture for a one-person-maintained site that needs to be reliably available when a hiring manager visits at any hour.

---

## 2. Architecture Pattern

### 2.1 Static Site Generation (SSG)

Next.js App Router with full static output. Every route is pre-rendered at build time using `generateStaticParams()`. The result is a folder of HTML, CSS, JS, and image files — identical to what you'd get from hand-writing HTML, but generated programmatically from structured JSON data.

```
next build
  ↓
Reads all /content/*.json files
  ↓
Calls generateStaticParams() → knows which slugs exist
  ↓
Calls generateMetadata() per route → SEO <head> tags per page
  ↓
Renders each page component to HTML string
  ↓
Writes .next/static/ output
  ↓
Vercel uploads to edge network
```

### 2.2 What Does NOT Exist in This Architecture

The following are explicitly absent — understanding what's missing is as important as knowing what's present:

| Absent system | Consequence |
|---|---|
| Server / Node.js runtime | No SSR, no API routes, no middleware |
| Database | No Postgres, Redis, SQLite, or any DB |
| Authentication | No login, sessions, or protected routes |
| CMS API | No Contentful/Sanity API calls at runtime |
| Serverless functions | No Vercel Edge Functions or Lambda |
| Client-side data fetching | No `fetch()` in components, no React Query |
| Build cache invalidation logic | Not needed — full rebuild on every push |

The only runtime network calls a visitor's browser makes are:
1. HTML file from Vercel CDN
2. CSS and JS bundles from Vercel CDN
3. Images and videos from Cloudinary CDN
4. Font files from Vercel CDN (self-hosted via `next/font`)

---

## 3. System Topology

```
┌─────────────────────────────────────────────────────────────────────┐
│  AUTHOR ENVIRONMENT (Abasifreke's machine)                         │
│                                                                     │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────────────┐  │
│  │   Cursor IDE  │    │ Claude Code  │    │  Cloudinary Dashboard│  │
│  │  (code edits) │    │   CLI        │    │  (image/video upload)│  │
│  └──────┬───────┘    └──────┬───────┘    └──────────────────────┘  │
│         │                   │                       │               │
│         └─────────┬─────────┘                       │               │
│                   ▼                                 ▼               │
│          ┌────────────────┐              ┌─────────────────────┐   │
│          │  Local repo    │              │  Cloudinary CDN     │   │
│          │  /content/*.json│              │  res.cloudinary.com │   │
│          │  /components/  │              │  /[cloud]/image/... │   │
│          │  /app/         │              └─────────────────────┘   │
│          └────────┬───────┘                         ↑              │
└───────────────────┼─────────────────────────────────┼──────────────┘
                    │ git push origin main             │ CDN URLs in JSON
                    ▼                                 │
┌─────────────────────────────────┐                  │
│  GITHUB                         │                  │
│  github.com/abasifreke/portfolio│                  │
│                                 │                  │
│  main branch → triggers Vercel  │                  │
│  Webhook → build starts         │                  │
└──────────────┬──────────────────┘                  │
               │ Vercel GitHub App webhook            │
               ▼                                     │
┌─────────────────────────────────────────────────────────────────────┐
│  VERCEL BUILD ENVIRONMENT                                           │
│                                                                     │
│  npm install → next build                                           │
│    ├── Reads /content/*.json                                        │
│    ├── generateStaticParams() → all slugs                           │
│    ├── Renders / (homepage)                                         │
│    ├── Renders /about                                               │
│    ├── Renders /case-study/root-by-sudo                             │
│    ├── Renders /case-study/safe-haven-mfb                           │
│    ├── Renders /case-study/halcyon                                  │
│    └── Outputs .next/static/                                        │
│                                                                     │
│  ENV: NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=abasifreke                  │
└──────────────────────────┬──────────────────────────────────────────┘
                           │ Deploy to edge
                           ▼
┌─────────────────────────────────────────────────────────────────────┐
│  VERCEL EDGE NETWORK (Global CDN)                                   │
│                                                                     │
│  Lagos ──── London ──── New York ──── Singapore ──── São Paulo      │
│    │           │             │              │               │        │
│  Same static HTML/CSS/JS served from nearest edge node              │
│                                                                     │
│  abasifreke.com                                                     │
│    ├── /                          → homepage HTML                   │
│    ├── /about                     → about HTML                      │
│    ├── /case-study/root-by-sudo   → case study HTML                 │
│    ├── /case-study/safe-haven-mfb → case study HTML                 │
│    └── /case-study/halcyon        → case study HTML                 │
└─────────────────────────────────────────────────────────────────────┘
                           ↑
              VISITOR BROWSER REQUEST
```

---

## 4. Request Lifecycle

### 4.1 First Page Load (Homepage)

```
1. Visitor types abasifreke.com in browser
   ↓
2. DNS resolves domain → Vercel edge IP (nearest node)
   ↓
3. Browser sends GET / HTTP/2 request
   ↓
4. Vercel edge returns pre-built index.html (< 10ms)
   Content-Type: text/html
   Cache-Control: public, max-age=0, must-revalidate
   ↓
5. Browser parses HTML, discovers linked resources:
   - /_next/static/css/[hash].css  → fetch from same CDN
   - /_next/static/js/[hash].js    → fetch from same CDN
   - Font files (self-hosted)      → fetch from same CDN
   ↓
6. Browser renders DOM
   ↓
7. Marquee images load lazily:
   https://res.cloudinary.com/abasifreke/image/upload/w_400,q_auto,f_auto/v1/portfolio/root/cover.png
   → Cloudinary CDN serves optimised image (WebP if supported, JPEG fallback)
   ↓
8. Page is fully interactive. Zero JavaScript required for content display.
   JS only activates: marquee pause-on-hover, marquee CSS animation
```

### 4.2 Case Study Page Load

```
1. Visitor clicks "View Case Study" link on homepage card
   ↓
2. Next.js client-side router intercepts click (no full page reload)
   Prefetches /case-study/root-by-sudo HTML in background
   (Next.js prefetches links in viewport automatically)
   ↓
3. HTML is already cached in browser from prefetch
   ↓
4. Page renders instantly (< 100ms perceived)
   ↓
5. Images load progressively:
   - Hero image: loads first (high priority, w_1400,q_auto,f_auto)
   - Body images: lazy-loaded as user scrolls
   - Canvas collage items: lazy-loaded
   ↓
6. SidebarNav JS activates:
   IntersectionObserver watches all section_heading anchor elements
   → Updates active nav item as user scrolls
   ↓
7. Video blocks (if any):
   - Cloudinary MP4: <video> element, browser handles streaming
   - YouTube/Vimeo: iframe loads embed player
```

### 4.3 Content Update Flow (Author perspective)

```
1. Abasifreke opens content/root-by-sudo.json in Cursor
   ↓
2. Edits text, changes an image URL, reorders blocks
   ↓
3. Saves file
   ↓
4. git add content/root-by-sudo.json
   git commit -m "content: update root case study outcomes section"
   git push origin main
   ↓
5. GitHub receives push → fires webhook to Vercel
   ↓
6. Vercel starts build (45–90 seconds):
   - npm install (cached, fast)
   - next build (reads updated JSON, re-renders all pages)
   ↓
7. Vercel deploys new static files to all edge nodes
   ↓
8. Site live with changes. Old files replaced atomically.
   No downtime. Visitors during build see previous version.
```

---

## 5. Repository System

### 5.1 Full Directory Tree

```
portfolio/
│
├── app/                                 # Next.js App Router — all routes
│   ├── layout.tsx                       # Root: HTML shell, fonts, Nav, Footer
│   ├── page.tsx                         # Route: / (homepage)
│   ├── not-found.tsx                    # Route: 404 page
│   ├── about/
│   │   └── page.tsx                     # Route: /about
│   └── case-study/
│       └── [slug]/
│           └── page.tsx                 # Route: /case-study/[slug] (dynamic)
│
├── components/
│   ├── layout/
│   │   ├── Nav.tsx                      # Fixed top navigation bar
│   │   ├── Footer.tsx                   # Site footer with links
│   │   └── SidebarNav.tsx               # Case study sticky sidebar (desktop only)
│   │
│   ├── home/
│   │   ├── Hero.tsx                     # Homepage hero: name, tagline, CTA links
│   │   ├── Marquee.tsx                  # Dual-row auto-scrolling image grid
│   │   └── FeaturedWork.tsx             # Curated case study card grid
│   │
│   ├── case-study/
│   │   ├── CaseStudyHero.tsx            # Full-width hero image + metadata strip
│   │   ├── CaseStudyFooter.tsx          # Prev/Next navigation between case studies
│   │   └── BlockRenderer.tsx            # Maps block.type → correct block component
│   │
│   └── blocks/                          # One component per ContentBlock type
│       ├── SectionHeading.tsx           # type: 'section_heading'
│       ├── Subheading.tsx               # type: 'subheading'
│       ├── BodyParagraph.tsx            # type: 'paragraph'
│       ├── Blockquote.tsx               # type: 'blockquote'
│       ├── BulletList.tsx               # type: 'bullet_list'
│       ├── StatRow.tsx                  # type: 'stat_row'
│       ├── Divider.tsx                  # type: 'divider'
│       ├── ImageBlock.tsx               # type: 'image'
│       ├── ImageGrid.tsx                # type: 'image_grid'
│       ├── VideoBlock.tsx               # type: 'video'
│       └── CanvasCollage.tsx            # type: 'canvas_collage'
│
├── content/                             # ★ AUTHOR-MANAGED — no code knowledge needed
│   ├── root-by-sudo.json
│   ├── safe-haven-mfb.json
│   └── halcyon.json
│
├── lib/
│   ├── types.ts                         # All TypeScript interfaces
│   ├── content.ts                       # File system read utilities
│   └── cloudinary.ts                    # URL builder helpers
│
├── styles/
│   └── globals.css                      # Tailwind directives + CSS custom properties
│
├── public/
│   ├── favicon.ico
│   ├── favicon.svg
│   └── og-default.png                   # Fallback Open Graph image
│
├── site.config.ts                       # ★ AUTHOR-MANAGED — global site settings
├── tailwind.config.ts                   # Design tokens
├── tsconfig.json
├── next.config.ts
├── .env.local                           # Local env vars — NEVER commit
├── .gitignore
└── package.json
```

### 5.2 Author-Managed Files

Only two locations require regular edits. Everything else is framework code set up once and left alone.

| File/Directory | When to edit | Complexity |
|---|---|---|
| `/content/*.json` | Adding/updating case studies, editing text, swapping images | Low — structured data |
| `site.config.ts` | Changing nav links, homepage order, personal info, marquee items | Low — simple config object |

### 5.3 Framework Files (Set Once)

| File | Purpose | Touch again? |
|---|---|---|
| `app/layout.tsx` | Root HTML wrapper, font loading | Only to change fonts |
| `tailwind.config.ts` | Design tokens | Only to change brand colours |
| `next.config.ts` | Build config, Cloudinary domain allow | Only if adding new CDN |
| `lib/types.ts` | TypeScript interfaces | Only if adding new block type |
| `lib/content.ts` | JSON reading utilities | Only if adding new content source |
| `components/blocks/*` | Block renderers | Only if adding new block type |

---

## 6. Content System

### 6.1 Content System Architecture

The content system has three layers:

```
LAYER 1: Raw data
/content/[slug].json     One file per case study. Edited by author.

         ↓  lib/content.ts reads and parses

LAYER 2: Typed data
CaseStudy object         Validated against TypeScript types at build time.
                         If the JSON is malformed, the build fails with a
                         clear error message before anything deploys.

         ↓  BlockRenderer maps types to components

LAYER 3: Rendered HTML
<article>                Every block type rendered to semantic HTML.
  <section>              Output is static — baked into the HTML file.
  <figure>               No client-side rendering of content.
  <blockquote>
```

### 6.2 site.config.ts — Full Schema

```typescript
// site.config.ts
// ★ Edit this file to update global site settings

export const siteConfig = {

  // Personal info — appears in nav, footer, about page, metadata
  owner: {
    name:      "Abasifreke Nkanta",
    title:     "Senior Product Designer",
    tagline:   "I design complex systems that don't feel complex.",
    email:     "your@email.com",
    linkedin:  "https://linkedin.com/in/yourhandle",
    resumeUrl: "https://res.cloudinary.com/abasifreke/raw/upload/v1/portfolio/global/resume.pdf",
  },

  // Homepage: which case studies appear in the Featured Work grid
  // Order here = order on page. Max 6 slugs.
  featuredWork: [
    "root-by-sudo",
    "safe-haven-mfb",
    "halcyon",
  ],

  // Homepage marquee: top row (scrolls left)
  marqueeRow1: [
    {
      image: "https://res.cloudinary.com/abasifreke/image/upload/w_400,q_auto,f_auto/v1/portfolio/root/cover.png",
      name:  "Root by Sudo",
      slug:  "root-by-sudo",    // string = linked; null = decorative only
    },
    {
      image: "https://res.cloudinary.com/abasifreke/image/upload/w_400,q_auto,f_auto/v1/portfolio/safe-haven/cover.png",
      name:  "Safe Haven MFB",
      slug:  "safe-haven-mfb",
    },
    {
      image: "https://res.cloudinary.com/abasifreke/image/upload/w_400,q_auto,f_auto/v1/portfolio/halcyon/cover.png",
      name:  "Halcyon",
      slug:  "halcyon",
    },
    // Add more items — they repeat infinitely in the marquee
  ],

  // Homepage marquee: bottom row (scrolls right, different speed)
  marqueeRow2: [
    // Different selection of images for visual variety
  ],

} as const;

export type SiteConfig = typeof siteConfig;
```

### 6.3 CaseStudy JSON — Full Schema Reference

```typescript
// lib/types.ts — complete type definitions

export type CaseStudy = {
  slug:        string;                // Must match filename: root-by-sudo.json → "root-by-sudo"
  meta:        CaseStudyMeta;
  hero_image:  string;                // Cloudinary URL — full-width banner image
  blocks:      ContentBlock[];        // Ordered array — sequence controls page layout
};

export type CaseStudyMeta = {
  title:        string;               // "Root by Sudo"
  descriptor:   string;               // "B2C fintech mobile app redesign" — shown on homepage card
  role:         string;               // "Head of Design"
  timeline:     string;               // "2022–2024"
  cover_image:  string;               // Cloudinary URL — thumbnail used on homepage grid card
};

// ─── BLOCK TYPES ─────────────────────────────────────────────────────────────

export type ContentBlock =
  | SectionHeadingBlock
  | SubheadingBlock
  | ParagraphBlock
  | BlockquoteBlock
  | BulletListBlock
  | StatRowBlock
  | DividerBlock
  | ImageBlock
  | ImageGridBlock
  | VideoBlock
  | CanvasCollageBlock;

// Text blocks
export type SectionHeadingBlock = {
  type:    "section_heading";
  text:    string;
  anchor:  string;           // Unique kebab-case ID used by sidebar nav. e.g. "why-it-mattered"
  symbol?: string;           // Optional decorative prefix. e.g. "→" "◊" "∞"
};

export type SubheadingBlock = {
  type: "subheading";
  text: string;
};

export type ParagraphBlock = {
  type: "paragraph";
  text: string;              // Supports inline **bold** and _italic_ via markdown-lite renderer
};

export type BlockquoteBlock = {
  type:          "blockquote";
  text:          string;
  attribution?:  string;     // "Senior PM, Sudo Africa" — renders below quote
};

export type BulletListBlock = {
  type:  "bullet_list";
  items: string[];           // Each string is one bullet item
};

// Data blocks
export type StatRowBlock = {
  type:  "stat_row";
  stats: Stat[];             // Min 2, max 4
};

export type Stat = {
  value:  string;            // "3×" | "25%" | "₦30M+" | ">80"
  label:  string;            // "Transaction volume growth"
  sign?:  "positive" | "negative" | "neutral";
                             // Controls value colour tint
                             // positive → green-700
                             // negative → red-600
                             // neutral/undefined → ink (near-black)
};

export type DividerBlock = {
  type: "divider";
};

// Media blocks
export type ImageBlock = {
  type:     "image";
  src:      string;          // Full Cloudinary URL (include transformation params)
  alt:      string;          // Required. Descriptive text for screen readers.
  caption?: string;          // Shown below image in figcaption
  width:    "full" | "contained";
                             // "full"      → max-width 1000px, breaks out of reading column
                             // "contained" → max-width 720px, stays in reading column
};

export type ImageGridBlock = {
  type:    "image_grid";
  columns: 2 | 3;
  images:  GridImage[];
};

export type GridImage = {
  src:      string;
  alt:      string;
  caption?: string;
};

export type VideoBlock = {
  type:      "video";
  src:       string;         // Cloudinary MP4 URL, or full YouTube/Vimeo watch URL
  provider:  "cloudinary" | "youtube" | "vimeo";
  autoplay?: boolean;        // Only for Cloudinary. Default: false
  loop?:     boolean;        // Only for Cloudinary. Default: false
  muted?:    boolean;        // Only for Cloudinary. Default: false (required for autoplay)
  caption?:  string;
};

export type CanvasCollageBlock = {
  type:   "canvas_collage";
  height: number;            // Canvas container height in px. e.g. 480
  items:  CollageItem[];
};

export type CollageItem = {
  src:     string;           // Cloudinary URL
  alt:     string;
  x:       number;           // Left offset from canvas edge in px
  y:       number;           // Top offset from canvas edge in px
  width:   number;           // Item width in px
  rotate?: number;           // Rotation in degrees. Negative = counter-clockwise. e.g. -3
  zIndex?: number;           // Stacking order. Higher = on top. Default: 1
};
```

### 6.4 lib/content.ts — File System Utilities

```typescript
// lib/content.ts
import fs from "fs";
import path from "path";
import type { CaseStudy } from "./types";

const CONTENT_DIR = path.join(process.cwd(), "content");

// Returns all case study slugs. Used by generateStaticParams().
export function getAllSlugs(): string[] {
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((file) => file.endsWith(".json"))
    .map((file) => file.replace(".json", ""));
}

// Reads and parses a single case study JSON file.
// Throws if file doesn't exist or JSON is malformed (build fails with clear error).
export function getCaseStudy(slug: string): CaseStudy {
  const filePath = path.join(CONTENT_DIR, `${slug}.json`);

  if (!fs.existsSync(filePath)) {
    throw new Error(`Case study not found: ${slug}. Expected file at ${filePath}`);
  }

  const raw = fs.readFileSync(filePath, "utf-8");

  try {
    return JSON.parse(raw) as CaseStudy;
  } catch {
    throw new Error(`Invalid JSON in ${slug}.json. Check for syntax errors.`);
  }
}

// Returns metadata for all case studies — used to populate homepage cards.
export function getAllCaseStudies(): CaseStudy[] {
  return getAllSlugs().map(getCaseStudy);
}

// Returns only the case studies listed in siteConfig.featuredWork, in that order.
export function getFeaturedCaseStudies(featuredSlugs: string[]): CaseStudy[] {
  return featuredSlugs
    .map((slug) => {
      try { return getCaseStudy(slug); }
      catch { return null; }
    })
    .filter(Boolean) as CaseStudy[];
}

// Returns previous and next slugs relative to current slug.
// Used by CaseStudyFooter for Prev/Next navigation.
export function getAdjacentCaseStudies(currentSlug: string): {
  prev: CaseStudy | null;
  next: CaseStudy | null;
} {
  const all = getAllSlugs();
  const idx = all.indexOf(currentSlug);
  return {
    prev: idx > 0 ? getCaseStudy(all[idx - 1]) : null,
    next: idx < all.length - 1 ? getCaseStudy(all[idx + 1]) : null,
  };
}
```

### 6.5 lib/cloudinary.ts — URL Builder

```typescript
// lib/cloudinary.ts

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

type ResourceType = "image" | "video" | "raw";

// Build a Cloudinary URL with optional transformation string.
// transformations: Cloudinary transformation chain. e.g. "w_800,q_auto,f_auto"
// path: folder path within your Cloudinary account. e.g. "portfolio/root/hero.png"
export function cloudinaryUrl(
  path: string,
  resourceType: ResourceType = "image",
  transformations: string = "q_auto,f_auto"
): string {
  if (!CLOUD_NAME) {
    throw new Error("NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME environment variable is not set.");
  }
  const t = transformations ? `${transformations}/` : "";
  return `https://res.cloudinary.com/${CLOUD_NAME}/${resourceType}/upload/${t}v1/${path}`;
}

// Preset helpers for common contexts
export const cld = {
  hero:     (path: string) => cloudinaryUrl(path, "image", "w_1400,q_auto,f_auto"),
  cover:    (path: string) => cloudinaryUrl(path, "image", "w_600,q_auto,f_auto"),
  marquee:  (path: string) => cloudinaryUrl(path, "image", "w_400,q_auto,f_auto"),
  full:     (path: string) => cloudinaryUrl(path, "image", "w_1000,q_auto,f_auto"),
  contained:(path: string) => cloudinaryUrl(path, "image", "w_720,q_auto,f_auto"),
  grid:     (path: string) => cloudinaryUrl(path, "image", "w_500,q_auto,f_auto"),
  collage:  (path: string) => cloudinaryUrl(path, "image", "w_600,q_auto,f_auto"),
  video:    (path: string) => cloudinaryUrl(path, "video", ""),
  pdf:      (path: string) => cloudinaryUrl(path, "raw", ""),
};
```

---

## 7. Rendering System

### 7.1 Page Rendering Map

| Route | Component | Data source | Render method |
|---|---|---|---|
| `/` | `app/page.tsx` | `siteConfig` + `getAllCaseStudies()` | SSG |
| `/about` | `app/about/page.tsx` | `siteConfig` | SSG |
| `/case-study/[slug]` | `app/case-study/[slug]/page.tsx` | `getCaseStudy(slug)` | SSG |
| `/404` | `app/not-found.tsx` | Static | SSG |

### 7.2 Case Study Page — Full Render Sequence

```typescript
// app/case-study/[slug]/page.tsx

import { getAllSlugs, getCaseStudy, getAdjacentCaseStudies } from "@/lib/content";
import { CaseStudyHero } from "@/components/case-study/CaseStudyHero";
import { CaseStudyFooter } from "@/components/case-study/CaseStudyFooter";
import { SidebarNav } from "@/components/layout/SidebarNav";
import { BlockRenderer } from "@/components/case-study/BlockRenderer";

// Step 1: Tell Next.js which slugs to pre-build
export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

// Step 2: Generate SEO metadata per page
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const study = getCaseStudy(params.slug);
  return {
    title:       `${study.meta.title} · Abasifreke Nkanta`,
    description: study.meta.descriptor,
    openGraph: {
      title:       study.meta.title,
      description: study.meta.descriptor,
      images:      [{ url: study.meta.cover_image, width: 1200, height: 630 }],
      type:        "article",
    },
    twitter: {
      card:  "summary_large_image",
      image: study.meta.cover_image,
    },
  };
}

// Step 3: Render page
export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const study    = getCaseStudy(params.slug);
  const adjacent = getAdjacentCaseStudies(params.slug);

  return (
    <main>
      <CaseStudyHero
        heroImage={study.hero_image}
        title={study.meta.title}
        role={study.meta.role}
        timeline={study.meta.timeline}
      />

      <div className="cs-layout">
        {/* Sidebar: visible only on sidebar: breakpoint (≥1100px) */}
        <SidebarNav blocks={study.blocks} />

        {/* Reading column */}
        <article className="cs-main">
          <BlockRenderer blocks={study.blocks} />
        </article>
      </div>

      <CaseStudyFooter prev={adjacent.prev} next={adjacent.next} />
    </main>
  );
}
```

### 7.3 BlockRenderer — Discriminated Union Switch

```typescript
// components/case-study/BlockRenderer.tsx
import type { ContentBlock } from "@/lib/types";
import * as B from "@/components/blocks";

export function BlockRenderer({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <>
      {blocks.map((block, index) => {
        switch (block.type) {
          case "section_heading": return <B.SectionHeading key={index} {...block} />;
          case "subheading":      return <B.Subheading     key={index} {...block} />;
          case "paragraph":       return <B.BodyParagraph   key={index} {...block} />;
          case "blockquote":      return <B.Blockquote      key={index} {...block} />;
          case "bullet_list":     return <B.BulletList      key={index} {...block} />;
          case "stat_row":        return <B.StatRow         key={index} {...block} />;
          case "divider":         return <B.Divider         key={index} />;
          case "image":           return <B.ImageBlock      key={index} {...block} />;
          case "image_grid":      return <B.ImageGrid       key={index} {...block} />;
          case "video":           return <B.VideoBlock      key={index} {...block} />;
          case "canvas_collage":  return <B.CanvasCollage   key={index} {...block} />;
          default:
            // TypeScript exhaustiveness check — if a new block type is added to the
            // union but not the switch, this will produce a build-time type error.
            const _exhaustive: never = block;
            return null;
        }
      })}
    </>
  );
}
```

---

## 8. Component System

### 8.1 Component Hierarchy

```
app/layout.tsx (root shell)
├── Nav
│   ├── Logo / name link
│   ├── Case study nav links (from siteConfig.featuredWork)
│   └── Contact links (About, LinkedIn, Resume)
│
├── [page content]
│   │
│   ├── HOME: app/page.tsx
│   │   ├── Hero
│   │   │   ├── Name (display font, large)
│   │   │   ├── Tagline
│   │   │   └── Contact link row
│   │   ├── Marquee
│   │   │   ├── MarqueeRow (row 1, scrolls left)
│   │   │   │   └── MarqueeItem[] (image + hover overlay)
│   │   │   └── MarqueeRow (row 2, scrolls right)
│   │   │       └── MarqueeItem[] (image + hover overlay)
│   │   └── FeaturedWork
│   │       └── WorkCard[] (cover, title, descriptor, link)
│   │
│   ├── ABOUT: app/about/page.tsx
│   │   └── Static prose content (no block system)
│   │
│   └── CASE STUDY: app/case-study/[slug]/page.tsx
│       ├── CaseStudyHero
│       │   ├── Hero image (full-width)
│       │   ├── Back link (← All projects)
│       │   └── Metadata strip (Role | Timeline)
│       ├── cs-layout (two-column grid)
│       │   ├── SidebarNav (left, sticky, desktop only)
│       │   │   └── NavItem[] (derived from section_heading blocks)
│       │   └── article.cs-main (right, reading column)
│       │       └── BlockRenderer → block components
│       └── CaseStudyFooter
│           ├── PrevLink (← previous case study)
│           └── NextLink (next case study →)
│
└── Footer
    └── Name, LinkedIn, Resume links
```

### 8.2 SidebarNav — Detailed Specification

The sidebar automatically derives navigation items from the `blocks` array. No manual configuration.

```typescript
// components/layout/SidebarNav.tsx

"use client"; // IntersectionObserver requires browser APIs → client component

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
    // Watch all section heading elements
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
        rootMargin: "-80px 0px -60% 0px", // Trigger when heading is near top of viewport
        threshold:  0,
      }
    );

    headings.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [navItems]);

  return (
    <nav
      className="cs-sidebar"
      // CSS: position sticky, top 5rem, max-height calc(100vh - 6rem),
      //      overflow-y auto, hidden below sidebar: breakpoint
      aria-label="Case study sections"
    >
      <ul>
        {navItems.map(({ text, anchor, symbol }) => (
          <li key={anchor}>
            <a
              href={`#${anchor}`}
              className={activeAnchor === anchor ? "active" : ""}
              // active class: font-weight 500, left border indicator in accent colour
            >
              {symbol && <span aria-hidden="true">{symbol}</span>}
              {text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
```

### 8.3 Marquee — Detailed Specification

```typescript
// components/home/Marquee.tsx

"use client"; // hover pause requires event listeners

// Architecture:
// - Items array is duplicated (concat with itself) to create seamless loop.
//   When the animation reaches the halfway point, it snaps back to start.
//   The duplication makes the snap invisible.
// - CSS @keyframes moves the track left by 50% (exactly one copy of the items).
// - Each row has a different animation-duration for visual depth.
// - Mouse hover sets animation-play-state: paused on the hovered row via a
//   CSS class toggle (no JS animation manipulation).

// CSS required in globals.css:
/*
  @keyframes marquee-left {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }
  @keyframes marquee-right {
    from { transform: translateX(-50%); }
    to   { transform: translateX(0); }
  }
  .marquee-track-left  { animation: marquee-left  40s linear infinite; }
  .marquee-track-right { animation: marquee-right 50s linear infinite; }
  .marquee-row:hover .marquee-track-left,
  .marquee-row:hover .marquee-track-right {
    animation-play-state: paused;
  }
  @media (prefers-reduced-motion: reduce) {
    .marquee-track-left, .marquee-track-right { animation: none; }
  }
*/

// MarqueeItem hover overlay behaviour:
// - slug !== null: overlay shows project name + "View Case Study →" as a link
// - slug === null: overlay shows project name only (no cursor:pointer, no link)
// - Overlay opacity transitions from 0 to 1 on parent hover via CSS only
```

### 8.4 Block Components — Specification Table

| Component | Key behaviour | HTML output | Tailwind notes |
|---|---|---|---|
| `SectionHeading` | Renders `id={anchor}` for scroll target + sidebar linking | `<h2 id={anchor}>` | Display font, 32px, tracking-tight |
| `Subheading` | No anchor, no sidebar entry | `<h3>` | 22px, font-weight 600 |
| `BodyParagraph` | Parses `**bold**` and `_italic_` inline | `<p>` with `<strong>/<em>` | line-height 1.75, max-width reading |
| `Blockquote` | Attribution renders as `<cite>` | `<blockquote><p><cite>` | Left border accent, italic text |
| `BulletList` | Maps items array to `<li>` | `<ul><li>` per item | Custom bullet, body font size |
| `StatRow` | 2–4 stat cards in flex row | `<div role="list">` with stat items | Clamp font-size for value: 32–56px |
| `Divider` | No props | `<hr>` | border-color rule, margin 3rem 0 |
| `ImageBlock` | `width` controls container class | `<figure><img><figcaption>` | Full: -mx breakout; Contained: max-w-reading |
| `ImageGrid` | `columns` controls grid cols | `<div class="grid">` | gap-4, cols-2 or cols-3, col-1 on mobile |
| `VideoBlock` | Cloudinary: `<video>`. YouTube/Vimeo: 16:9 iframe wrapper | `<figure><video or iframe><figcaption>` | aspect-video container for embeds |
| `CanvasCollage` | Absolute positioning per item, CSS rotate | `<div class="relative"><img>` per item | Mobile: horizontal scroll fallback |

### 8.5 CanvasCollage — Mobile Fallback Detail

```
Desktop (≥768px):
  <div style="position:relative; height:{block.height}px; overflow:hidden;">
    {items.map(item => (
      <img
        style={{
          position: "absolute",
          left:      `${item.x}px`,
          top:       `${item.y}px`,
          width:     `${item.width}px`,
          transform: `rotate(${item.rotate ?? 0}deg)`,
          zIndex:    item.zIndex ?? 1,
        }}
      />
    ))}
  </div>

Mobile (<768px):
  <div style="display:flex; overflow-x:auto; gap:12px; scroll-snap-type:x mandatory; -webkit-overflow-scrolling:touch;">
    {items.map(item => (
      <img style={{ width:"85vw", flex:"0 0 85vw", scroll-snap-align:"start" }} />
    ))}
  </div>

@media (prefers-reduced-motion: reduce):
  All rotate transforms removed (items render flat)
```

---

## 9. Media System (Cloudinary)

### 9.1 Cloudinary Account Structure

```
Cloudinary Account: abasifreke
Cloud Name: abasifreke
Base URL: https://res.cloudinary.com/abasifreke

Folder structure (create these folders manually in Cloudinary dashboard):

portfolio/
├── root-by-sudo/
│   ├── cover.png          # 1200×800 min — homepage card cover
│   ├── hero.png           # 2800×1200 min — full-width case study banner
│   ├── [body-images].png  # Any name — referenced in JSON blocks
│   └── [video].mp4        # Any name — referenced in JSON video blocks
│
├── safe-haven-mfb/
│   └── [same structure]
│
├── halcyon/
│   └── [same structure]
│
└── global/
    ├── og-default.png     # 1200×630 — fallback Open Graph image
    └── resume.pdf         # Current resume PDF
```

### 9.2 URL Transformation Reference

Cloudinary transformations are appended between `/upload/` and `/v1/` in the URL.

```
Full URL anatomy:
https://res.cloudinary.com / [cloud] / [resource] / upload / [transforms] / v1 / [path]
                              ↑          ↑            ↑          ↑           ↑     ↑
                           "abasifreke" "image"    fixed    "w_800,..."  version  folder/file

Transform parameter reference:
  w_{n}     → Resize width to n pixels (height scales proportionally)
  h_{n}     → Resize height to n pixels
  q_auto    → Automatic quality compression (Cloudinary picks optimal level)
  f_auto    → Automatic format (WebP for Chrome/Edge/Firefox, JPEG for Safari older)
  c_fill    → Crop mode: fill dimensions, may crop
  c_limit   → Resize down only, never upscale
  ar_16:9   → Force aspect ratio 16:9
  g_auto    → Smart cropping: auto-detect focal point (faces, objects)
  dpr_auto  → Device pixel ratio: serves 2× for retina displays automatically
```

### 9.3 Transformation by Context

```
Context                    Transformation string          Resulting dimensions
─────────────────────────  ─────────────────────────────  ────────────────────
Homepage: marquee item     w_400,q_auto,f_auto            400px wide
Homepage: featured card    w_600,h_400,c_fill,q_auto,f_auto  600×400 (fixed ratio)
Case study: hero banner    w_1400,q_auto,f_auto           1400px wide
Case study: full image     w_1000,q_auto,f_auto           1000px wide
Case study: contained img  w_720,q_auto,f_auto            720px wide
Case study: grid 2-col     w_500,q_auto,f_auto            500px per item
Case study: grid 3-col     w_340,q_auto,f_auto            340px per item
Case study: collage item   w_600,q_auto,f_auto            600px wide
Open Graph image           w_1200,h_630,c_fill,q_auto     1200×630 (OG spec)
Video                      (none — serve original MP4)    Original dimensions
PDF                        (none — raw file)              n/a
```

### 9.4 Image Upload Guidelines

| Spec | Requirement |
|---|---|
| Hero images | Minimum 2800×1200px, landscape. Crop to subject before upload. |
| Cover images | Minimum 1200×800px. Ensure subject is centred (Cloudinary crops from edges). |
| Body images | Minimum 1440px wide for full-width. 720px minimum for contained. |
| Collage items | Can be screenshots, photos, sticky notes — any size. Cloudinary resizes. |
| Video format | MP4, H.264 codec, AAC audio. Max 100MB per file on free tier. |
| File naming | Lowercase, hyphens not spaces. `hero.png` not `Hero Image Final v2.png`. |

### 9.5 Free Tier Limits

| Resource | Free tier allowance | This portfolio's expected usage |
|---|---|---|
| Storage | 25 GB | ~500MB for full portfolio with videos |
| Bandwidth | 25 GB/month | Sufficient for 10,000+ monthly page views |
| Transformations | 25,000/month | Transformations are cached; actual usage is low |
| Upgrade trigger | Exceeds 25GB storage | Unlikely for a personal portfolio |

---

## 10. Routing System

### 10.1 Route Definitions

```
Route                         Component file                        Type
────────────────────────────  ────────────────────────────────────  ───────
/                             app/page.tsx                          Static
/about                        app/about/page.tsx                    Static
/case-study/root-by-sudo      app/case-study/[slug]/page.tsx        Dynamic → Static
/case-study/safe-haven-mfb    app/case-study/[slug]/page.tsx        Dynamic → Static
/case-study/halcyon           app/case-study/[slug]/page.tsx        Dynamic → Static
/404                          app/not-found.tsx                     Static
```

All dynamic routes are fully resolved at build time via `generateStaticParams()`. There are no runtime-dynamic routes — every URL that will ever be visited is pre-built.

### 10.2 Adding a New Case Study

To add a new case study (e.g. `/case-study/agency-banking`):

```
1. Create content/agency-banking.json following the CaseStudy schema
2. Add "agency-banking" to siteConfig.featuredWork (if it should appear on homepage)
3. Add marquee items to siteConfig.marqueeRow1 or marqueeRow2 (optional)
4. Upload images to Cloudinary under portfolio/agency-banking/
5. git push origin main
6. Vercel rebuilds — new route is live in ~60s
```

No code changes required.

### 10.3 Removing a Case Study

```
1. Remove the slug from siteConfig.featuredWork
2. Remove marquee items referencing the slug (set slug: null to keep the image decorative)
3. Optionally delete the content file (or leave it — it won't render if not in featured list)
   Note: The /case-study/[slug] route will still exist and be accessible by direct URL
   as long as the .json file exists. To fully remove: delete the .json file.
4. git push origin main
```

### 10.4 Navigation Data Flow

```
siteConfig.featuredWork: ["root-by-sudo", "safe-haven-mfb", "halcyon"]
  ↓
getFeaturedCaseStudies() reads each JSON file
  ↓
Nav component: renders case study links in header
  { slug: "root-by-sudo",    title: "Root by Sudo" }  → /case-study/root-by-sudo
  { slug: "safe-haven-mfb",  title: "Safe Haven MFB" } → /case-study/safe-haven-mfb
  { slug: "halcyon",         title: "Halcyon" }         → /case-study/halcyon
  ↓
CaseStudyFooter: getAdjacentCaseStudies() reads all slugs from /content/
  Provides Prev/Next links at bottom of each case study
```

---

## 11. Design Token System

### 11.1 Token Architecture

Three layers. Only Layer 1 (primitives) and Layer 2 (semantics) are defined in code. Components consume Layer 2 tokens via Tailwind classes.

```
Layer 1: Primitives (raw values — not used directly in components)
  #111827 = a specific grey
  #1D4ED8 = a specific blue
  1.75rem = a specific line height

      ↓ mapped to semantic meaning in tailwind.config.ts

Layer 2: Semantic tokens (Tailwind extension — used in components)
  color.ink     = #111827  (primary text colour)
  color.accent  = #1D4ED8  (links, active states, positive indicators)
  color.muted   = #6B7280  (captions, metadata, secondary text)
  color.rule    = #E5E7EB  (dividers, borders)
  maxWidth.reading  = 720px
  maxWidth.content  = 1000px
  maxWidth.page     = 1100px

      ↓ consumed as Tailwind utility classes in JSX

Layer 3: Component usage (in JSX — no new token values introduced here)
  <p className="text-ink leading-relaxed max-w-reading" />
  <a className="text-accent hover:underline" />
  <span className="text-muted text-sm" />
  <hr className="border-rule my-12" />
```

### 11.2 tailwind.config.ts — Complete Definition

```typescript
// tailwind.config.ts
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
        display: ["var(--font-display)", "Georgia", "serif"],
        body:    ["var(--font-body)", "system-ui", "sans-serif"],
        mono:    ["var(--font-mono)", "monospace"],
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
        // Default Tailwind breakpoints are kept (sm:640, md:768, lg:1024, xl:1280)
        // One custom breakpoint added:
        sidebar: "1100px",   // SidebarNav appears at this width
      },

      // ── SPACING ───────────────────────────────────────────────
      spacing: {
        "18": "4.5rem",      // 72px — used for nav height
        "22": "5.5rem",      // 88px — used for section gap on mobile
        "28": "7rem",        // 112px — section gap on desktop
      },

      // ── ANIMATION ─────────────────────────────────────────────
      // Marquee keyframes are defined in globals.css, not here.
      // Only transition config is extended:
      transitionDuration: {
        "250": "250ms",
      },

    },
  },
  plugins: [],
} satisfies Config;
```

### 11.3 globals.css — Custom Properties & Marquee Keyframes

```css
/* styles/globals.css */

@tailwind base;
@tailwind components;
@tailwind utilities;

/* ── CSS Custom Properties (complement Tailwind tokens) ── */
:root {
  --nav-height:     60px;
  --sidebar-width:  240px;
  --reading-width:  720px;
  --content-width:  1000px;
  --page-width:     1100px;
  --section-gap:    5rem;
  --block-gap:      2rem;
}

/* ── Marquee animation ── */
@keyframes marquee-left {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}

@keyframes marquee-right {
  from { transform: translateX(-50%); }
  to   { transform: translateX(0); }
}

.marquee-track-left  { animation: marquee-left  40s linear infinite; }
.marquee-track-right { animation: marquee-right 50s linear infinite; }

.marquee-row:hover .marquee-track-left,
.marquee-row:hover .marquee-track-right {
  animation-play-state: paused;
}

/* ── Reduced motion: pause all animation ── */
@media (prefers-reduced-motion: reduce) {
  .marquee-track-left,
  .marquee-track-right {
    animation: none;
    transform: translateX(0);
  }
}

/* ── Case study layout grid ── */
.cs-layout {
  display: grid;
  grid-template-columns: 1fr;
  max-width: var(--page-width);
  margin: 0 auto;
  padding: 0 1.5rem;
  gap: 0;
}

@media (min-width: 1100px) {
  .cs-layout {
    grid-template-columns: var(--sidebar-width) 1fr;
    gap: 4rem;
    padding: 0 2rem;
  }
}

/* ── Sidebar ── */
.cs-sidebar {
  display: none;
}

@media (min-width: 1100px) {
  .cs-sidebar {
    display: block;
    position: sticky;
    top: calc(var(--nav-height) + 2rem);
    max-height: calc(100vh - var(--nav-height) - 4rem);
    overflow-y: auto;
    align-self: start;
  }
}

/* ── Reading column ── */
.cs-main {
  max-width: var(--reading-width);
  width: 100%;
  padding-bottom: var(--section-gap);
}

/* ── Full-width image breakout (negative margin) ── */
.img-full {
  width: 100%;
  max-width: var(--content-width);
  margin-left: calc((var(--content-width) - var(--reading-width)) / -2);
}

@media (max-width: 1000px) {
  .img-full {
    margin-left: 0;
    max-width: 100%;
  }
}
```

---

## 12. Build System

### 12.1 next.config.ts

```typescript
// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  // Allow next/image to load from Cloudinary (if using next/image component)
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
    ],
  },

  // Strict mode catches potential React bugs during development
  reactStrictMode: true,

  // Output: standalone would create a Node.js server — not needed for pure SSG.
  // Default output (no override) is correct for Vercel SSG deployment.

};

export default nextConfig;
```

### 12.2 Build Output

```
Running: next build

.next/
├── cache/                   # Build cache (module compilation cache)
├── server/
│   └── app/                 # Server-side rendered HTML (even for SSG pages)
│       ├── page.html        # / (homepage)
│       ├── about/
│       │   └── page.html    # /about
│       └── case-study/
│           ├── root-by-sudo/
│           │   └── page.html
│           ├── safe-haven-mfb/
│           │   └── page.html
│           └── halcyon/
│               └── page.html
└── static/
    ├── chunks/              # JavaScript bundles
    ├── css/                 # CSS bundles
    └── media/               # Self-hosted font files (from next/font)
```

### 12.3 Build Phases in Order

```
Phase 1: Dependency install
  npm install
  Installs packages from package.json into node_modules/
  Cached by Vercel on subsequent deploys (only re-installs if package.json changes)

Phase 2: TypeScript compilation
  tsc --noEmit
  Validates all .ts and .tsx files against tsconfig.json
  Any type error → build fails before rendering starts

Phase 3: Static params generation
  generateStaticParams() called for /case-study/[slug]
  Reads /content/ directory → discovers all slugs
  Returns [{ slug: "root-by-sudo" }, { slug: "safe-haven-mfb" }, ...]

Phase 4: Metadata generation
  generateMetadata() called per route
  Reads CaseStudy JSON for each slug
  Outputs <head> tags: title, description, og:image, twitter:card

Phase 5: Page rendering
  Each page component rendered to HTML string
  Block components render from JSON block data
  All HTML output is static — no useEffect, no useState in page-level renders

Phase 6: Asset bundling
  CSS purged (Tailwind removes unused classes)
  JS tree-shaken (unused components removed)
  Fonts extracted and self-hosted

Phase 7: Output
  Static files written to .next/
  Vercel receives output and uploads to edge nodes
```

### 12.4 package.json

```json
{
  "name": "abasifreke-portfolio",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev":   "next dev",
    "build": "next build",
    "start": "next start",
    "lint":  "next lint",
    "type-check": "tsc --noEmit"
  },
  "dependencies": {
    "next":    "14.x",
    "react":   "18.x",
    "react-dom": "18.x"
  },
  "devDependencies": {
    "@types/node":    "^20",
    "@types/react":   "^18",
    "@types/react-dom": "^18",
    "autoprefixer":   "^10",
    "postcss":        "^8",
    "tailwindcss":    "^3",
    "typescript":     "^5"
  }
}
```

---

## 13. Deployment System (Vercel)

### 13.1 Vercel Project Configuration

```
Project name:    abasifreke-portfolio (or chosen name)
Framework:       Next.js (auto-detected)
Root directory:  / (repo root)
Build command:   next build  (Vercel default)
Output dir:      .next  (Vercel default)
Node.js version: 20.x
```

### 13.2 Environment Variables in Vercel

```
Settings → Environment Variables

Name:                        NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
Value:                       abasifreke  (your actual cloud name)
Environments:                Production, Preview, Development (all three)

Note: NEXT_PUBLIC_ prefix exposes this value to the browser bundle.
This is safe — the Cloudinary cloud name is not a secret. It appears
in every image URL that any visitor can see in browser dev tools.
```

### 13.3 Branch Strategy & Deploy Targets

```
Branch          → Deploy target        URL
──────────────────────────────────────────────────────────────────
main            → Production           abasifreke.com (custom domain)
                                       abasifreke-portfolio.vercel.app
any other       → Preview              abasifreke-portfolio-[hash].vercel.app
branch
```

**Workflow:**
1. Make changes in a new branch (e.g. `update-root-case-study`)
2. Push branch → Vercel creates a preview URL automatically
3. Visit preview URL to review changes
4. Merge branch to `main` → Production deploy fires automatically
5. Changes live on `abasifreke.com` in ~60 seconds

### 13.4 Custom Domain Setup (One-time)

```
Vercel Dashboard → Project → Settings → Domains → Add Domain

Enter: abasifreke.com (or your chosen domain)

Vercel provides DNS records:
  Type:  A
  Name:  @
  Value: 76.76.21.21  (Vercel's IP)

  Type:  CNAME
  Name:  www
  Value: cname.vercel-dns.com

Add these at your domain registrar (Namecheap, Google Domains, etc.)
DNS propagation: 5 minutes to 48 hours (usually <30 minutes)
SSL: Automatically provisioned by Vercel via Let's Encrypt
```

### 13.5 Deploy Hook (Optional)

If you ever need to trigger a rebuild without pushing code (e.g. to pick up a Cloudinary image change visible via updated URL):

```
Vercel Dashboard → Settings → Git → Deploy Hooks
Create hook → Gets a unique POST URL
curl -X POST https://api.vercel.com/v1/integrations/deploy/[hook-id]
→ Triggers a full rebuild and deploy
```

---

## 14. Performance System

### 14.1 Performance Strategy Per Layer

| Layer | What happens | Performance gain |
|---|---|---|
| HTML | Pre-built at build time, no server render latency | TTFB < 50ms from edge |
| CSS | Tailwind purges unused classes at build time | CSS bundle < 20KB |
| JS | Next.js code-splits per route automatically | Only current page JS loads |
| Fonts | `next/font` self-hosts and preloads | No FOUT, no render blocking |
| Images | Cloudinary `f_auto,q_auto` + correct `w_` per context | Smallest viable file size |
| Video | Served from Cloudinary CDN, browser streams natively | No JS player overhead |
| CDN | Vercel edge serves from nearest node | Low latency globally |

### 14.2 Core Web Vitals Targets

| Metric | Target | Primary lever |
|---|---|---|
| LCP (Largest Contentful Paint) | < 2.5s | Hero image: preloaded, correct width, Cloudinary CDN |
| CLS (Cumulative Layout Shift) | < 0.1 | Image dimensions always set; `font-display: swap` via next/font |
| FID / INP (Interaction) | < 200ms | Minimal JS; Marquee is CSS-only |
| TTFB (Time to First Byte) | < 200ms | Static file from nearest Vercel edge node |

### 14.3 Image Performance Rules

```
Rule 1: Always set width and height on every <img> element.
        This reserves space in the layout, preventing CLS.
        Cloudinary URLs contain the intrinsic dimensions in the transformation.

Rule 2: Use loading="lazy" on all images except the hero.
        Hero image: no lazy (it's above the fold, needs to load immediately)
        All others: loading="lazy" defers fetch until user scrolls near them

Rule 3: Hero image uses <link rel="preload"> in page <head>
        This tells the browser to start fetching the hero image
        before it's even parsed in the HTML body.
        Next.js generateMetadata() can add this via the headers field.

Rule 4: Cloudinary f_auto serves WebP to modern browsers.
        WebP is 25–35% smaller than JPEG at equivalent quality.
        Safari fallback to JPEG is automatic via f_auto.
```

### 14.4 JavaScript Budget

```
Route           Expected JS bundle size (gzipped)
────────────    ───────────────────────────────────
/               ~80KB  (marquee hover logic, nothing else interactive)
/about          ~40KB  (static page, minimal JS)
/case-study/*   ~90KB  (SidebarNav IntersectionObserver, video embeds)

All within Next.js default performance budget.
No heavy libraries. No analytics script by default (can add Vercel Analytics
which is < 1KB if desired).
```

---

## 15. Data Flow Diagrams

### 15.1 Content Update → Live Site

```
Author edits JSON     Git commit        Vercel webhook
───────────────────   ──────────────    ─────────────────────────────────────
content/              git add .         npm install (cached)
  root-by-sudo.json   git commit        next build
                      git push main       → reads all /content/*.json
                        │                 → renders all routes
                        │                 → outputs .next/
                        ▼               Deploy to edge network
                      GitHub            Site live with changes (~60s total)
```

### 15.2 Build Time Data Flow

```
/content/root-by-sudo.json
        │
        │  getCaseStudy("root-by-sudo")
        ▼
CaseStudy {
  slug: "root-by-sudo"
  meta: { title, descriptor, role, timeline, cover_image }
  hero_image: "https://res.cloudinary.com/..."
  blocks: [
    { type: "stat_row", stats: [...] }
    { type: "section_heading", text: "Why it mattered", anchor: "..." }
    { type: "paragraph", text: "..." }
    { type: "image", src: "...", ... }
    ...
  ]
}
        │
        │  generateStaticParams() → Next.js knows to build this route
        │  generateMetadata()     → <head> tags from meta object
        │  page render            → BlockRenderer processes blocks array
        ▼
<html>
  <head>
    <title>Root by Sudo · Abasifreke Nkanta</title>
    <meta property="og:image" content="https://res.cloudinary.com/..." />
  </head>
  <body>
    <nav>...</nav>
    <CaseStudyHero heroImage="https://res.cloudinary.com/..." />
    <SidebarNav>
      <a href="#why-it-mattered">→ Why it mattered</a>
    </SidebarNav>
    <article>
      <StatRow>...</StatRow>
      <SectionHeading id="why-it-mattered">Why it mattered</SectionHeading>
      <BodyParagraph>...</BodyParagraph>
      <ImageBlock src="https://res.cloudinary.com/..." />
    </article>
    <CaseStudyFooter />
    <footer>...</footer>
  </body>
</html>
        │
        ▼
Uploaded to Vercel edge network as static .html file
```

### 15.3 Sidebar Navigation Data Flow

```
blocks array from JSON
        │
        │  SidebarNav receives blocks prop
        │  .filter(b => b.type === "section_heading")
        ▼
navItems: [
  { text: "Why it mattered", anchor: "why-it-mattered", symbol: "→" }
  { text: "Research",        anchor: "research",         symbol: "◊" }
  { text: "The reframe",     anchor: "the-reframe",      symbol: "∞" }
  { text: "Outcomes",        anchor: "outcomes",         symbol: "∑" }
]
        │
        │  useEffect: IntersectionObserver watches
        │  document.getElementById("why-it-mattered") etc.
        │
        │  User scrolls → observer fires
        │  → setActiveAnchor("research")
        ▼
<nav>
  <a href="#why-it-mattered" class="">→ Why it mattered</a>
  <a href="#research" class="active">◊ Research</a>   ← highlighted
  <a href="#the-reframe" class="">∞ The reframe</a>
  <a href="#outcomes" class="">∑ Outcomes</a>
</nav>
```

### 15.4 Cloudinary Image Flow

```
JSON block:
  { "type": "image", "src": "https://res.cloudinary.com/abasifreke/image/upload/w_720,q_auto,f_auto/v1/portfolio/root/before.png", "width": "contained" }
        │
        │  ImageBlock component renders:
        ▼
<figure class="contained">
  <img
    src="https://res.cloudinary.com/abasifreke/image/upload/w_720,q_auto,f_auto/v1/portfolio/root/before.png"
    alt="Root app before redesign"
    loading="lazy"
    width="720"
    height="480"
  />
  <figcaption>The original onboarding flow before the redesign</figcaption>
</figure>
        │
        │  Browser requests URL from Cloudinary CDN
        ▼
Cloudinary processes transformation (first request only):
  - Resize to 720px wide
  - q_auto: compress to ~80% quality (optimal file size)
  - f_auto: browser sends Accept: image/webp → Cloudinary returns .webp
            browser without WebP support → Cloudinary returns .jpeg
  - Result cached on Cloudinary CDN edge
        │
        ▼
Browser receives optimised image (WebP, ~40–120KB depending on content)
```

---

## 16. Error Boundaries & Edge Cases

### 16.1 Build-Time Errors (fail fast before deploy)

| Error | Cause | Result |
|---|---|---|
| `SyntaxError: JSON.parse` | Malformed JSON in a content file | Build fails with filename and line number |
| TypeScript type error | Block has wrong shape (e.g. `stat_row` with 1 stat) | Build fails with exact property path |
| `Error: Case study not found` | Slug in `siteConfig.featuredWork` has no matching `.json` file | Build fails with the slug name |
| `Error: NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME not set` | Environment variable missing in Vercel | Build fails with clear message |
| Missing `anchor` on `section_heading` | Required field absent | TypeScript error at build time |
| Duplicate `anchor` values in same case study | Two headings with same anchor | Sidebar nav links point to wrong section. Silent at build time — must be caught in review. |

### 16.2 Runtime Edge Cases

| Scenario | Handling |
|---|---|
| Visitor navigates to `/case-study/nonexistent` | Next.js serves `app/not-found.tsx` (404 page) |
| Cloudinary image URL broken (deleted file) | Browser shows broken image icon — alt text is displayed. Not a site crash. |
| Cloudinary video URL broken | `<video>` shows nothing, caption still renders |
| YouTube/Vimeo embed blocked by ad blocker | iframe shows blocked content message. Caption still renders. |
| `canvas_collage` items overflow canvas height | Items are clipped by `overflow: hidden`. No layout break. |
| `stat_row` with 5+ stats | TypeScript prevents this at build time (Stat[] max enforced by type) |
| Very long `section_heading` text | Overflows sidebar nav item — use short, concise heading text |
| `image_grid` with columns: 2 but only 1 image | Renders 1 item in a 2-column grid. Not ideal visually, not a crash. |
| `rotate` value >45 on canvas collage | Items will extend well outside the canvas. Keep rotate between -8 and +8 for legibility. |

### 16.3 Validation Checklist Before Deploying a New Case Study

```
□ JSON is valid (paste into jsonlint.com to check)
□ All anchor values within the file are unique
□ All image src URLs resolve (open each URL in a browser)
□ hero_image and cover_image URLs are set and resolve
□ All alt text is descriptive (not empty, not "image")
□ stat_row blocks have 2–4 stats each
□ video blocks: if provider is "youtube", src is a full YouTube URL
□ canvas_collage: all x/y/width values make visual sense for the height
□ slug in filename matches slug field in JSON
□ Case study is added to siteConfig.featuredWork (if it should appear on homepage)
```

---

## 17. Environment & Secrets

### 17.1 Environment Variable Reference

| Variable | Type | Value | Where set |
|---|---|---|---|
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Public | Your Cloudinary cloud name | Vercel + `.env.local` |

That's it. One variable. No API keys, no database URLs, no secrets.

### 17.2 .env.local (Local Development)

```bash
# .env.local — local development only
# This file is in .gitignore and MUST NOT be committed

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=abasifreke
```

### 17.3 .gitignore

```
# .gitignore
node_modules/
.next/
.env.local
.DS_Store
*.log
```

---

## 18. Extension Points

The architecture is designed to accommodate future additions without changing the core systems.

### 18.1 Adding a New Block Type

1. Add new type to the `ContentBlock` union in `lib/types.ts`
2. Create `components/blocks/NewBlockType.tsx`
3. Add `case "new_block_type": return <B.NewBlockType key={i} {...block} />;` to `BlockRenderer`
4. TypeScript exhaustiveness check in `BlockRenderer` will surface a type error if the case is missing

### 18.2 Adding Analytics

```typescript
// app/layout.tsx
// Option A: Vercel Analytics (< 1KB, no config needed)
import { Analytics } from "@vercel/analytics/react";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />   {/* add this line */}
      </body>
    </html>
  );
}

// Option B: Plausible (privacy-first, no cookies)
// Add to app/layout.tsx <head> via metadata:
export const metadata = {
  // ... existing metadata
  other: {
    "data-domain": "abasifreke.com",
  },
};
// Add <script defer data-domain="abasifreke.com" src="https://plausible.io/js/script.js" />
// via next/script in layout.tsx
```

### 18.3 Migrating to a Headless CMS (Future)

If editing JSON files via GitHub becomes friction, the content system can migrate to Sanity or Contentful by replacing `lib/content.ts` only. The JSON schema, TypeScript types, block components, and rendering system remain unchanged — only the data source changes from `fs.readFileSync()` to a CMS API call.

```typescript
// Current: lib/content.ts
export function getCaseStudy(slug: string): CaseStudy {
  return JSON.parse(fs.readFileSync(`./content/${slug}.json`, "utf-8"));
}

// Future (Sanity): lib/content.ts
export async function getCaseStudy(slug: string): Promise<CaseStudy> {
  return sanityClient.fetch(`*[_type == "caseStudy" && slug.current == $slug][0]`, { slug });
}
// All block components and page components remain identical.
```

### 18.4 Adding Dark Mode (Future)

The Tailwind `dark:` variant is available without additional config. To enable:
1. Add `darkMode: "class"` to `tailwind.config.ts`
2. Toggle `<html class="dark">` via a client component button
3. Add `dark:` variants to component Tailwind classes where needed
4. Cloudinary images: no change needed (same URL, `f_auto` handles format)
5. Marquee: animation unchanged

---

*Architecture v1.0 — Abasifreke Nkanta Portfolio · March 2026*
