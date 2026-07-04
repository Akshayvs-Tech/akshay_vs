import HeroSection from "./component/HeroSection";
import AboutSection from "./component/AboutSection";
import ProjectsSection from "./component/ProjectsSection";
import ExperienceSection from "./component/ExperienceSection";
import SkillsSection from "./component/SkillsSection";
import ConnectSection from "./component/ConnectSection";

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
      <div className="project-divider" aria-hidden="true" />
      
      <AboutSection />
      <div className="project-divider" aria-hidden="true" />
      
      <SkillsSection />
      <div className="project-divider" aria-hidden="true" />

      {/* Scroll-stack container */}
      <div className="scroll-stack-wrapper">
        <ExperienceSection />
        <div className="project-divider" aria-hidden="true" />
        <ProjectsSection />
      </div>
      
      <div className="project-divider" aria-hidden="true" />
      <ConnectSection />
    </main>
  );
}

