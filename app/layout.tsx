import type { Metadata, Viewport } from "next";
import {
  Dela_Gothic_One,
  Montserrat,
  Barlow,
  Barlow_Condensed,
  Oswald,
} from "next/font/google";
import "./globals.css";
import CustomCursor from "./component/CustomCursor";

/* ── Fonts (next/font/google – self-hosted, no layout shift) ─────────────── */
const delaGothic = Dela_Gothic_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-dela-gothic",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  style: ["normal", "italic"],
  display: "swap",
});

const barlow = Barlow({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-barlow",
  style: ["normal", "italic"],
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-barlow-condensed",
  display: "swap",
});

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  display: "swap",
});

/* ── SEO Metadata (SSR – Server Component) ───────────────────────────────── */
export const metadata: Metadata = {
  title: "Akshay VS | Portfolio – Frontend Developer",
  description:
    "Akshay VS – creative frontend developer crafting premium digital experiences. Explore my projects, skills and connect with me.",
  keywords: [
    "Akshay VS",
    "Frontend Developer",
    "Portfolio",
    "React",
    "Next.js",
    "Web Developer",
    "UI Developer",
  ],
  authors: [{ name: "Akshay VS" }],
  creator: "Akshay VS",
  openGraph: {
    title: "Akshay VS | Portfolio",
    description:
      "Creative frontend developer crafting premium digital experiences.",
    type: "website",
    locale: "en_IN",
    siteName: "Akshay VS Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Akshay VS | Portfolio",
    description:
      "Creative frontend developer crafting premium digital experiences.",
    creator: "@akshay_vs",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#020d0d",
};

/* ── Root Layout ─────────────────────────────────────────────────────────── */
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${delaGothic.variable} ${montserrat.variable} ${barlow.variable} ${barlowCondensed.variable} ${oswald.variable}`}
    >
      <body>
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
