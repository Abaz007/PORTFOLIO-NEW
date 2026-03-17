import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "@/styles/globals.css";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { siteConfig } from "@/site.config";
import { Agentation } from "agentation";

// Body font — Inter (clean, readable sans-serif)
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

// Display font — Fraunces (editorial serif for headings)
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
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
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
      <body className="min-h-screen flex flex-col bg-white">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
        {process.env.NODE_ENV === "development" && <Agentation />}
      </body>
    </html>
  );
}
