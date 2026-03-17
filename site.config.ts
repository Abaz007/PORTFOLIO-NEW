// site.config.ts
// ★ AUTHOR-MANAGED — edit this file to update global site settings

export const siteConfig = {

  // Personal info — appears in nav, footer, about page, metadata
  owner: {
    name:      "Abasifreke Emmanuel",
    title:     "Senior Product Designer",
    tagline:   "A multidisciplinary designer who is shaping the world by crafting delightful experiences.",
    // ★ Edit this bio — appears below the headline on the homepage
    bio:       "More than a decade of design experience, building and shipping complex infrastructure that businesses and millions of people rely on. My expertise spans multiple industries globally, from startups and agencies to enterprise-level organizations. I have led design efforts across several teams, redefining UX through strategic approaches, setting outcome-driven goals, growing design teams, and raising UX maturity across organizations. I specialize in high-stakes workflows where clarity is not optional but highly critical.",
    email:     "abasifreke55@gmail.com",
    linkedin:  "https://www.linkedin.com/in/abasifreke-emmanuel/",
    resumeUrl: "https://res.cloudinary.com/dbtws7amv/image/upload/Abasifreke_s_Resume_thsizp.pdf",
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
    {
      image: "https://res.cloudinary.com/abasifreke/image/upload/w_400,q_auto,f_auto/v1/portfolio/halcyon/cover.png",
      name:  "Halcyon",
      slug:  "halcyon",
    },
    {
      image: "https://res.cloudinary.com/abasifreke/image/upload/w_400,q_auto,f_auto/v1/portfolio/safe-haven/cover.png",
      name:  "Safe Haven MFB",
      slug:  "safe-haven-mfb",
    },
    {
      image: "https://res.cloudinary.com/abasifreke/image/upload/w_400,q_auto,f_auto/v1/portfolio/root/cover.png",
      name:  "Root by Sudo",
      slug:  "root-by-sudo",
    },
  ],

} as const;

export type SiteConfig = typeof siteConfig;
