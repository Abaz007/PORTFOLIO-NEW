// lib/types.ts — complete type definitions

export type CaseStudy = {
  slug:             string;           // Must match filename: root-by-sudo.json → "root-by-sudo"
  meta:             CaseStudyMeta;
  hero_image:       string;           // Cloudinary URL — full-width banner image
  intro?:           string[];         // Optional paragraphs shown between hero image and My Role
  my_role?:         string;           // Overrides the hardcoded My Role description in CaseStudyHero
  no_hero_divider?: boolean;          // If true, suppresses the rule between hero and content blocks
  blocks:           ContentBlock[];   // Ordered array — sequence controls page layout
};

export type CaseStudyMeta = {
  title:        string;               // "Root by Sudo"
  descriptor:   string;               // "B2C fintech mobile app redesign" — shown on homepage card
  role:         string;               // "Head of Design"
  timeline:     string;               // "2022–2024"
  cover_image:  string;               // Cloudinary URL — thumbnail used on homepage grid card
  cover_video?: string;               // Cloudinary video URL — if set, plays instead of cover_image on homepage card
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
  | CanvasCollageBlock
  | CalloutBlock
  | InsightListBlock
  | PullQuoteBlock
  | KeyInsightsBlock
  | MentalModelsBlock
  | ResearchCalloutBlock
  | ComparisonTableBlock
  | PersonaColumnsBlock
  | NumberedListBlock;

// Text blocks
export type SectionHeadingBlock = {
  type:      "section_heading";
  text:      string;
  anchor:    string;         // Unique kebab-case ID. e.g. "why-it-mattered"
  label?:    string;         // Optional override for the small uppercase label. Default: derived from anchor.
  symbol?:   string;         // Optional decorative prefix. e.g. "→" "◊" "∞"
  no_label?:    boolean;     // If true, suppresses the small uppercase label above the h2
  no_pt?:       boolean;     // If true, suppresses pt-12 — use for sub-sections within the same parent section
  label_only?:  boolean;     // If true, renders only the small label — no h2 below it
};

export type SubheadingBlock = {
  type: "subheading";
  text: string;
};

export type ParagraphBlock = {
  type: "paragraph";
  text: string;              // Supports inline **bold** and _italic_
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
  src:      string;          // Full Cloudinary URL
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
  muted?:    boolean;        // Only for Cloudinary. Default: false
  caption?:  string;
};

export type InsightListBlock = {
  type:  "insight_list";
  items: { heading: string; body: string }[];
};

export type PullQuoteBlock = {
  type: "pull_quote";
  text: string;                    // Displayed in Recoleta Light at 20px, between horizontal rules
};

export type MentalModelsBlock = {
  type:    "mental_models";
  heading: string;
  items: {
    icon:  "variable_lock" | "total_lock" | "spending_control";
    label: string;
    body:  string;
  }[];
};

export type KeyInsightsBlock = {
  type:     "key_insights";
  variant?: "table" | "list";  // "table" (default) = 3-col METRIC/BEFORE/AFTER; "list" = ruled insight list
  items:    { heading: string; before?: string; after?: string; body?: string }[];
};

export type CalloutBlock = {
  type:    "callout";
  heading: string;           // Bold label line, e.g. "The guiding principle throughout;"
  body:    string;           // Light text below the left-rule border
  no_icon?: boolean;         // If true, suppresses the decorative quotation mark SVG
};

export type ResearchCalloutBlock = {
  type:     "research_callout";
  variant?: "default" | "metrics"; // "metrics" = bordered table-cell layout with check icons. Default: "default"
  label?:   string;    // Header label text. Default: "KEY FINDINGS". e.g. "STRATEGIC DESIGN DECISION"
  items?:   string[];  // Bullet list items. Use either items or body, not both.
  body?:    string;    // Single paragraph body. Use when content is not a list.
};

export type ComparisonTableBlock = {
  type:         "comparison_table";
  variant?:     "flow";              // "flow" = vertical columns with arrow connectors between rows. Default = standard side-by-side grid.
  left_header:  string;              // e.g. "THE EXISTING SYSTEM" — rendered in #a3a3a3
  right_header: string;              // e.g. "THE TARGET STATE"    — rendered in #4ade80
  rows:         { left: string; right: string }[];
};

export type NumberedListBlock = {
  type:   "numbered_list";
  label?: string;   // Optional header label cell. e.g. "COMPONENT VALIDATION RULES"
  items:  { heading: string; body?: string }[];
};

export type PersonaColumnsBlock = {
  type:    "persona_columns";
  columns: {
    label: string;   // e.g. "INDIVIDUAL" — rendered in mono uppercase #a3a3a3
    name:  string;   // e.g. "Ella" — rendered bold
    body:  string;   // paragraph describing the persona
  }[];
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
