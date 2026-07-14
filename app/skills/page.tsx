import type { Metadata } from "next";
import SkillsSection from "@/app/component/SkillsSection";

export const metadata: Metadata = {
  title: "Skills",
  description:
    "Explore Akshay VS's technical skills — React, Next.js, TypeScript, TailwindCSS, Node.js, Python, and more.",
  alternates: {
    canonical: "/skills",
  },
  openGraph: {
    title: "Skills | Akshay VS",
    description:
      "Explore Akshay VS's technical skills — React, Next.js, TypeScript, TailwindCSS, Node.js, Python, and more.",
    url: "/skills",
  },
};

export default function SkillsPage() {
  return (
    <main className="skills-page-wrapper" style={{ minHeight: '100vh', background: '#0d0d0d' }}>
      <div className="skills-container" style={{ paddingTop: '80px' }}>
        <SkillsSection />
      </div>
    </main>
  );
}
