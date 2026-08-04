import type { Metadata } from "next";
import { Bricolage_Grotesque, Manrope } from "next/font/google";

import { LivePlayer } from "@/components/live-player";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-body"
});

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-heading"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tvsupreme.lk"),
  title: {
    default: "TV Supreme | Sri Lanka's Boldest Screen",
    template: "%s | TV Supreme"
  },
  description:
    "The rebuilt TV Supreme digital platform with program scheduling, social integrations, and a PostgreSQL-backed content system.",
  openGraph: {
    title: "TV Supreme | Sri Lanka's Boldest Screen",
    description:
      "Programs, news, live windows, and social publishing for TV Supreme on a real content platform.",
    images: ["/images/tv-supreme-logo-final.png"]
  },
  twitter: {
    card: "summary_large_image",
    title: "TV Supreme | Sri Lanka's Boldest Screen",
    description:
      "Programs, news, live windows, and social publishing for TV Supreme on a real content platform.",
    images: ["/images/tv-supreme-logo-final.png"]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${bricolage.variable}`}
      data-scroll-behavior="smooth"
    >
      <body className="bg-supreme-paper font-body text-supreme-ink antialiased">
        <div className="broadcast-shell min-h-screen">
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
          <LivePlayer />
        </div>
      </body>
    </html>
  );
}
