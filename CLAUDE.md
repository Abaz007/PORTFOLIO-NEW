# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start dev server (defaults to :3000, falls back to :3001)
npm run build        # Production build — run this to verify no type or compile errors
npm run type-check   # TypeScript check without emitting files
npm run lint         # Next.js ESLint
```

There are no tests. Use `npm run build` as the primary correctness check after any change.

## Architecture

This is a **fully static Next.js 15 portfolio site** (SSG, no server-side logic). All pages are pre-rendered at build time and deployed to Vercel. Media is hosted on Cloudinary.

### Content system

Case studies live in `/content/*.json`. The JSON shape is fully typed in `lib/types.ts`. Adding a new case study means:
1. Create `/content/[slug].json` matching the `CaseStudy` type
2. Add the slug to `siteConfig.featuredWork` in `site.config.ts` to surface it on the homepage

`lib/content.ts` reads these files at build time via Node `fs` — no CMS, no API calls.

### Block renderer

Case study pages render content through a block system. Each block in the `blocks` array has a `type` that maps to a component in `components/blocks/`. The `BlockRenderer` component (`components/case-study/BlockRenderer.tsx`) dispatches to the right component based on `type`. Supported block types:

`section_heading` · `subheading` · `paragraph` · `blockquote` · `bullet_list` · `stat_row` · `divider` · `image` · `image_grid` · `video` · `canvas_collage`

`paragraph` blocks support inline `**bold**` and `_italic_` markdown (rendered manually, not via a markdown library).

### Case study page layout

The case study route (`app/case-study/[slug]/page.tsx`) uses a CSS Grid layout class `.cs-layout` defined in `globals.css`. On screens ≥ 1100px (`sidebar:` breakpoint) it becomes a two-column layout: a sticky sidebar (`SidebarNav`) on the left and a reading column (`cs-main`) on the right. The sidebar auto-generates navigation from `section_heading` blocks using their `anchor` field.

### Global config

`site.config.ts` is the single file the author edits for non-content changes: owner info (name, bio, tagline, email, LinkedIn, resume URL), featured case study order, and marquee items. This file is intentionally kept code-free so the non-developer owner can edit it safely.

### Fonts

Loaded via `next/font/local` in `app/layout.tsx`:
- **Recoleta** (`--font-serif`) — serif, used for headings. Files in `public/recoleta-font/`
- **Helvetica Neue** (`--font-body`) — sans-serif body. Files in `public/helvetica-neue/`
- **Inter** (`--font-inter`) — Google Fonts fallback for body

`h1` and `h2` globally inherit `--font-serif` via `globals.css`. The Tailwind utility `font-display` maps to `--font-serif`; `font-body` maps to `--font-body`.

### Tailwind design tokens

Key custom tokens defined in `tailwind.config.ts`:
- **Colors**: `ink` (near-black text), `muted` (gray-500), `rule` (dividers), `accent` (blue-700), `ghost` (gray-50 bg)
- **Max widths**: `max-w-reading` (720px), `max-w-content` (1000px), `max-w-page` (1100px)
- **Breakpoint**: `sidebar:` at 1100px (when sidebar nav appears)

### Cloudinary

All image/video URLs in JSON files are full Cloudinary URLs. `lib/cloudinary.ts` exports a `cld` helper with preset transformations (`cld.hero`, `cld.cover`, etc.) for use when building URLs programmatically, but most URLs are hardcoded directly in the JSON content files.
