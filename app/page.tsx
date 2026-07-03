import HeroSection from "./component/HeroSection";
import AboutSection from "./component/AboutSection";
import ProjectsSection from "./component/ProjectsSection";
import ExperienceSection from "./component/ExperienceSection";
import SkillsSection from "./component/SkillsSection";

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
      <SkillsSection />

      {/* Scroll-stack: Projects stays sticky; Experience slides over it */}
      <div className="scroll-stack-wrapper">
        <ProjectsSection />
        <ExperienceSection />
      </div>
    </main>
  );
}

