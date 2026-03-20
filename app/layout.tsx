import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter, Bricolage_Grotesque, JetBrains_Mono } from "next/font/google";
import "@/styles/globals.css";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { siteConfig } from "@/site.config";
import { Agentation } from "agentation";

// Serif — Recoleta (local, multiple weights via woff2)
const recoleta = localFont({
  src: [
    { path: "../public/recoleta-font/Recoleta-Light.woff2",    weight: "300", style: "normal" },
    { path: "../public/recoleta-font/Recoleta-Regular.woff2",  weight: "400", style: "normal" },
    { path: "../public/recoleta-font/Recoleta-Medium.woff2",   weight: "500", style: "normal" },
    { path: "../public/recoleta-font/Recoleta-SemiBold.woff2", weight: "600", style: "normal" },
    { path: "../public/recoleta-font/Recoleta-Bold.woff2",     weight: "700", style: "normal" },
  ],
  variable: "--font-serif",
  display: "swap",
});

// Body — Helvetica Neue (local, multiple weights via otf)
const helveticaNeue = localFont({
  src: [
    { path: "../public/helvetica-neue/HelveticaNeueLight.otf",  weight: "300", style: "normal" },
    { path: "../public/helvetica-neue/HelveticaNeueRoman.otf",  weight: "400", style: "normal" },
    { path: "../public/helvetica-neue/HelveticaNeueMedium.otf", weight: "500", style: "normal" },
    { path: "../public/helvetica-neue/HelveticaNeueBold.otf",   weight: "700", style: "normal" },
    { path: "../public/helvetica-neue/HelveticaNeueLight.otf",   weight: "300", style: "normal" },
    { path: "../public/helvetica-neue/HelveticaNeueLightItalic.otf", weight: "300", style: "italic" },
    { path: "../public/helvetica-neue/HelveticaNeueItalic.ttf", weight: "400", style: "italic" },
  ],
  variable: "--font-body",
  display: "swap",
});

// Inter — fallback body font loaded from Google Fonts
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Bricolage Grotesque — used for the Let's Talk button
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

// JetBrains Mono — used for section labels (e.g. "SELECTED PROJECTS")
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["300"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.owner.name} — ${siteConfig.owner.title}`,
    template: `%s · ${siteConfig.owner.name}`,
  },
  description: siteConfig.owner.tagline,
  openGraph: {
    type: "website",
    siteName: siteConfig.owner.name,
    images: [{ url: "/og-default.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal:    React.ReactNode;
}) {
  return (
    <html lang="en" className={`${recoleta.variable} ${helveticaNeue.variable} ${inter.variable} ${bricolage.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen flex flex-col bg-[#121212]">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
        {modal}
        {process.env.NODE_ENV === "development" && <Agentation />}
      </body>
    </html>
  );
}
