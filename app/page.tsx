import HeroSection from "./component/HeroSection";
import AboutSection from "./component/AboutSection";

/**
 * Home page – Server Component (SSR by default in Next.js App Router).
 * Renders the HeroSection as the first visible section.
 * Additional sections (About, Projects, Experience, Connect)
 * can be added below as you build them out.
 */
export default function Home() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      {/* Future sections will be added here */}
    </main>
  );
}
