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

**Modal navigation gotcha**: "Next/Prev Project" inside the modal must use `router.replace` (not `router.push`) so the history stack stays `[home → current-study]` regardless of how many studies are stepped through. `CaseStudyFooter` accepts an `isModal` boolean prop — pass `isModal` from `CaseStudySheet` to enable this. The full-page fallback uses `router.push`. Never revert next/prev inside the modal to a plain `<Link>` — it will cause close to return to the previous modal instead of home.

**Modal scrollbar**: The scrollable div inside the modal card has the `.modal-scroll` CSS class (defined in `styles/globals.css`) which styles the webkit scrollbar to match the dark background.

The z-index stack: Nav (`z-50`) → backdrop (`z-[55]`) → modal card (`z-[60]`). Modal animations are defined as CSS keyframes in `globals.css` (`.modal-appear`, `.backdrop-in`) — not Tailwind JIT animations, which are unreliable after cache clears.

### Content system

Case studies live in `/content/*.json`, fully typed in `lib/types.ts`. To add a case study:
1. Create `/content/[slug].json` matching the `CaseStudy` type
2. Add the slug to `siteConfig.featuredWork` in `site.config.ts`

`lib/content.ts` reads JSON files at build time via Node `fs`. Key fields on `CaseStudy`:
- `hero_image` — Cloudinary URL for the banner inside `CaseStudyHero`
- `intro` — optional `string[]` rendered between the hero image and My Role section
- `intro_callout` — optional inline callout block rendered after `intro` paragraphs, before My Role
- `my_role` — optional string overriding the hardcoded My Role description in `CaseStudyHero`
- `no_hero_divider` — if `true`, suppresses the rule at the bottom of the hero section
- `blocks` — ordered content array rendered by `BlockRenderer`

### Block renderer

`components/case-study/BlockRenderer.tsx` dispatches each block's `type` to a component in `components/blocks/`. Block spacing is controlled by `space-y-8` on the wrapper. Full list of supported types (all defined and exported):

`section_heading` · `subheading` · `paragraph` · `blockquote` · `bullet_list` · `stat_row` · `divider` · `image` · `image_grid` · `video` · `canvas_collage` · `callout` · `insight_list` · `pull_quote` · `key_insights` · `mental_models` · `research_callout` · `comparison_table` · `persona_columns` · `numbered_list`

`paragraph` blocks support inline `**bold**` and `_italic_` (parsed manually in `BodyParagraph.tsx`). All paragraph-level text uses `font-light` (weight 300). `section_heading` blocks no longer render the optional `symbol` field — it is ignored.

#### Block variants and flags

- **`section_heading`**: `label_only: true` renders only the small uppercase label with no h2. `no_label: true` suppresses the label. `no_pt: true` suppresses the default `pt-12` top padding (use when a section heading immediately follows another block without needing extra spacing). The label text is auto-derived from the `anchor` field by replacing hyphens with spaces and uppercasing.
- **`key_insights`**: `variant: "table"` (default) renders a 3-column METRIC/BEFORE/AFTER grid. `variant: "list"` renders a vertically ruled list with Recoleta headings — used on safe-haven-mfb.
- **`research_callout`**: `variant: "default"` (default) renders a flat list of items, each with a green filled-circle checkmark icon and separated by `border-[#262626]` horizontal dividers — no card wrapper. `variant: "metrics"` renders a bordered 2-cell layout (label cell + items cell) with green checkmark icons — used on nova-pay.
- **`callout`**: `no_icon: true` suppresses the decorative quotation mark SVG — used on nova-pay.
- **`numbered_list`**: Bordered 2-cell layout. Optional `label` renders a header cell (JetBrains Mono, `#a3a3a3`). Items cell has numbered bubbles (`01`, `02`…) with a mono `heading` in `#d4d4d4` and optional `body` in Helvetica Light `#a3a3a3`.
- **`persona_columns`**: 2-column card layout. Each column has a stacked label cell and name+body cell, all with `border-[#262626]` borders. Uses `flex-1` on the body cell so both columns match height.

### CaseStudyHero

`components/case-study/CaseStudyHero.tsx` renders: Overview label → title → hero image → `intro` paragraphs (if present) → My Role section → optional divider.

Props threaded from both `CaseStudySheet` and `app/case-study/[slug]/page.tsx`:
- `roleDescription` — from `study.my_role`; falls back to hardcoded default if absent
- `noDivider` — from `study.no_hero_divider`; suppresses the bottom rule
- `noNavOffset` — pass when rendering inside the modal (skips `padding-top: var(--nav-height)`)

### Global config

`site.config.ts` is the single file edited for non-content changes: owner info, featured case study order, and marquee items.

### Fonts

Loaded via `next/font/local` in `app/layout.tsx`:
- **Recoleta** (`--font-serif` / `font-display`) — headings. Files in `public/recoleta-font/`
- **Helvetica Neue** (`--font-body` / `font-body`) — body text. Files in `public/helvetica-neue/`
- **Inter** (`--font-inter`) — Google Fonts fallback
- **JetBrains Mono** (`--font-mono` / `font-mono`) — section labels and mono-styled UI text

`h1` and `h2` globally inherit `--font-serif` via `globals.css`.

### Tailwind design tokens

- **Colors**: `ink` (#111827), `muted` (#6B7280), `rule` (#E5E7EB), `accent` (#1D4ED8), `ghost` (#F9FAFB)
- **Max widths**: `max-w-reading` (720px), `max-w-content` (1000px), `max-w-page` (1100px)
- **Breakpoint**: `sidebar:` at 1100px

Dark-theme case study pages use raw hex values (`#d4d4d4`, `#a3a3a3`, `#737373`, `#171717`, `#121212`) rather than the Tailwind semantic tokens above, which are light-theme.

### Adding a new block type

1. Add the type definition to `lib/types.ts` and add it to the `ContentBlock` union
2. Create `components/blocks/[TypeName].tsx`
3. Export from `components/blocks/index.ts`
4. Add a `case` to the `switch` in `BlockRenderer.tsx`

The TypeScript exhaustiveness check in `BlockRenderer` (`const _exhaustive: never = block`) will catch missing cases at compile time.

### Cloudinary

All image/video URLs in JSON are full Cloudinary URLs. Use plain `<img>` tags (not `next/image`) for Cloudinary URLs — external domains not listed in `next.config.ts` `images.domains` will throw at runtime. `lib/cloudinary.ts` exports a `cld` helper but most URLs are hardcoded in JSON.

### Mobile responsiveness

The site is mobile-first. The standard horizontal padding pattern used across all top-level sections is `px-4 sm:px-8 md:px-[72px]` — this aligns content with the hero's "Selected Projects" label on all screen sizes. Never use a fixed `px-[72px]` without responsive prefixes.

**Nav** is a client component (`"use client"`) with a hamburger menu on mobile. On `md+` the full nav (resume link + Let's Talk button) is shown. Below `md`, a 3-line hamburger toggles a dropdown containing those same items. The dropdown closes on scroll, backdrop tap, or link click.

**FeaturedWork carousel** runs on all screen sizes — there is no separate mobile grid. Card sizes are responsive via Tailwind classes: `w-[260px] h-[340px]` on mobile → `w-[420px] h-[420px]` on tablet → `w-[680px] h-[500px]` on desktop. Touch drag is supported via `onTouchStart/Move/End` handlers. The hover overlay is always visible on mobile (no hover state on touch) and switches to hover-only on `md+`. The custom "View Case Study" cursor pill is hidden on mobile.

**Block components** — responsive behaviour:
- `ComparisonTable` (standard): stacks to 1 column on mobile, 2-col on `sm+`
- `ComparisonTable` (flow): `flex-col` on mobile, `flex-row` on `sm+`
- `KeyInsights` (table): shows stacked card-per-row on mobile, 3-col grid on `sm+`
- `PersonaColumns`: `flex-col` on mobile, `flex-row` on `sm+`
- `StatRow`: uses `auto-fill` grid so columns wrap naturally on smaller screens

### Deployment

- **Production domain**: `www.abazdesigns.com` (DNS via Namecheap → Vercel)
- **Vercel project**: `portfolio-new` (GitHub repo: `Abaz007/PORTFOLIO-NEW`)
- **Production branch**: `main` — every push to `main` triggers an automatic Vercel deploy
- `metadataBase` in `app/layout.tsx` is set to `https://www.abazdesigns.com` for correct social preview URLs
