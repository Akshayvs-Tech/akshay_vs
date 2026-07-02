import HeroSection from "./component/HeroSection";
import AboutSection from "./component/AboutSection";
import ProjectsSection from "./component/ProjectsSection";
import ExperienceSection from "./component/ExperienceSection";

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
      {/* ── Divider: same border color as the "See my Work" button (#444444) ── */}
      <hr
        style={{
          border: "none",
          borderTop: "1px solid #444444",
          margin: "0",
          width: "100%",
        }}
      />
      {/* Scroll-stack: Projects stays sticky; Experience slides over it */}
      <div className="scroll-stack-wrapper">
        <ProjectsSection />
        <ExperienceSection />
      </div>
    </main>
  );
}

