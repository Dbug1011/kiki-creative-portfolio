import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { DocumentViewerProvider } from "@/components/ui/document-viewer";
import CursorGlow from "@/components/ui/cursor-glow";
import AmbientBackground from "@/components/ui/ambient-background";
import SiteNav from "@/components/site/site-nav";
import SiteFooter from "@/components/site/site-footer";

// One family for everything (design system: Inter for headings, body,
// controls and statistics). `--font-display` points at it too, so older
// `font-display` classes stay consistent.
const sans = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });

const description =
  "Karis Ruth Jumawan: social media management, SaaS explainer videos, and short-form reels and video editing.";

export const metadata: Metadata = {
  // Vercel sets VERCEL_URL on every deployment; OG image paths resolve against it.
  metadataBase: new URL(
    process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3001"
  ),
  title: {
    default: "Karis Ruth Jumawan · Social, Explainers & Reels",
    template: "%s · Karis Ruth Jumawan",
  },
  description,
  icons: { icon: "/assets/logo.svg" },
  openGraph: {
    title: "Karis Ruth Jumawan · Social, Explainers & Reels",
    description,
    siteName: "Karis Ruth Jumawan",
    type: "profile",
    images: ["/work/trust-earned-0.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={sans.variable} style={{ ["--font-display" as string]: "var(--font-sans)" }}>
      <body className="font-sans antialiased">
        {/* One fixed background for the whole site; content sits above it. */}
        <AmbientBackground className="fixed" />
        <DocumentViewerProvider>
          <div className="relative z-10 flex min-h-dvh flex-col">
            <SiteNav />
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </div>
        </DocumentViewerProvider>
        <CursorGlow />
      </body>
    </html>
  );
}
