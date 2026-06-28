import type { Metadata } from "next";
import { Archivo, Inter, Fraunces } from "next/font/google";
import { site } from "@/lib/site";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://julia-schvarzberg.vercel.app"),
  title: {
    default: `${site.name} — Architecture & Design Portfolio`,
    template: `%s — ${site.name}`,
  },
  description:
    "Portfolio of Julia Schvarzberg, architecture student and designer. Selected works across museum, residential, computational, and pavilion design.",
  openGraph: {
    title: `${site.name} — Architecture & Design Portfolio`,
    description:
      "Selected architectural works — museum, residential, computational, and pavilion design.",
    type: "website",
    // social image is provided by app/opengraph-image.png (file convention)
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${inter.variable} ${fraunces.variable}`}
    >
      <body className="min-h-dvh antialiased" suppressHydrationWarning>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
