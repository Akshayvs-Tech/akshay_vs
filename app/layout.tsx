import type { Metadata, Viewport } from "next";
import {
  Dela_Gothic_One,
  Montserrat,
  Barlow,
  Barlow_Condensed,
  Oswald,
} from "next/font/google";
import "./globals.css";
import CustomCursor from "../components/CustomCursor";
import JsonLd from "../components/JsonLd";

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
  metadataBase: new URL("https://akshayvs.dev"),
  title: {
    default: "Akshay VS | Portfolio – Frontend Developer",
    template: "%s | Akshay VS",
  },
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
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Akshay VS | Portfolio",
    description:
      "Creative frontend developer crafting premium digital experiences.",
    url: "/",
    type: "website",
    locale: "en_IN",
    siteName: "Akshay VS Portfolio",
    images: [
      {
        url: "/akshay.PNG",
        width: 1200,
        height: 630,
        alt: "Akshay VS – Frontend Developer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Akshay VS | Portfolio",
    description:
      "Creative frontend developer crafting premium digital experiences.",
    creator: "@akshay_vs",
    images: ["/akshay.PNG"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0d0d0d",
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
        <JsonLd />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}

// force reload
