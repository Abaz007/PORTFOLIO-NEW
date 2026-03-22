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

If the dev server throws `Cannot find module './[chunk].js'`, the `.next` cache is stale — run `rm -rf .next` and restart.

## Architecture

This is a **fully static Next.js 15 portfolio site** (SSG, no server-side logic). All pages are pre-rendered at build time and deployed to Vercel. Media is hosted on Cloudinary.

### Case study modal routing

Case studies open as a floating modal overlay (URL changes, homepage stays visible behind). This uses **Next.js Parallel Routes + Intercepting Routes**:

- `app/@modal/(.)case-study/[slug]/page.tsx` — intercepts in-app navigation and renders `CaseStudySheet` (the modal)
- `app/@modal/default.tsx` — returns `<></>` when no modal is active (required by Next.js)
- `app/case-study/[slug]/page.tsx` — full-page fallback for direct URL access
- `app/layout.tsx` — accepts both `children` and `modal` slots; renders `{modal}` after `<Footer />`

Both routes require `generateStaticParams()` for SSG. `CaseStudySheet` is a client component that handles scroll lock, Escape key, and backdrop click to close via `router.back()`.

The z-index stack: Nav (`z-50`) → backdrop (`z-[55]`) → modal card (`z-[60]`). Modal animations are defined as CSS keyframes in `globals.css` (`.modal-appear`, `.backdrop-in`) — not Tailwind JIT animations, which are unreliable after cache clears.

### Content system

Case studies live in `/content/*.json`, fully typed in `lib/types.ts`. To add a case study:
1. Create `/content/[slug].json` matching the `CaseStudy` type
2. Add the slug to `siteConfig.featuredWork` in `site.config.ts`

`lib/content.ts` reads JSON files at build time via Node `fs`. Key fields on `CaseStudy`:
- `hero_image` — Cloudinary URL for the banner inside `CaseStudyHero`
- `intro` — optional `string[]` rendered between the hero image and My Role section
- `blocks` — ordered content array rendered by `BlockRenderer`

### Block renderer

`components/case-study/BlockRenderer.tsx` dispatches each block's `type` to a component in `components/blocks/`. Supported types:

`section_heading` · `subheading` · `paragraph` · `blockquote` · `bullet_list` · `stat_row` · `divider` · `image` · `image_grid` · `video` · `canvas_collage`

`paragraph` blocks support inline `**bold**` and `_italic_` (parsed manually in `BodyParagraph.tsx`). All paragraph-level text uses `font-light` (weight 300). `section_heading` blocks no longer render the optional `symbol` field — it is ignored.

### CaseStudyHero

`components/case-study/CaseStudyHero.tsx` renders: Overview label → title → hero image → `intro` paragraphs (if present) → My Role section → divider. The My Role description is hardcoded in the component. Pass `noNavOffset` when rendering inside the modal (skips `padding-top: var(--nav-height)`).

### Global config

`site.config.ts` is the single file edited for non-content changes: owner info, featured case study order, and marquee items.

### Fonts

Loaded via `next/font/local` in `app/layout.tsx`:
- **Recoleta** (`--font-serif` / `font-display`) — headings. Files in `public/recoleta-font/`
- **Helvetica Neue** (`--font-body` / `font-body`) — body text. Files in `public/helvetica-neue/`
- **Inter** (`--font-inter`) — Google Fonts fallback
- **JetBrains Mono** (`--font-mono` / `font-mono`) — section labels

`h1` and `h2` globally inherit `--font-serif` via `globals.css`.

### Tailwind design tokens

- **Colors**: `ink` (#111827), `muted` (#6B7280), `rule` (#E5E7EB), `accent` (#1D4ED8), `ghost` (#F9FAFB)
- **Max widths**: `max-w-reading` (720px), `max-w-content` (1000px), `max-w-page` (1100px)
- **Breakpoint**: `sidebar:` at 1100px

Dark-theme case study pages use raw hex values (`#d4d4d4`, `#a3a3a3`, `#737373`, `#171717`, `#121212`) rather than the Tailwind semantic tokens above, which are light-theme.

### Cloudinary

All image/video URLs in JSON are full Cloudinary URLs. Use plain `<img>` tags (not `next/image`) for Cloudinary URLs — external domains that aren't in `next.config.ts` `images.domains` will throw at runtime. `lib/cloudinary.ts` exports a `cld` helper but most URLs are hardcoded in JSON.
