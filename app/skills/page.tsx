import SkillsSection from "@/app/component/SkillsSection";

export default function SkillsPage() {
  return (
    <main className="skills-page-wrapper" style={{ minHeight: '100vh', background: '#0d0d0d' }}>
      <div className="skills-container" style={{ paddingTop: '80px' }}>
        <SkillsSection />
      </div>
    </main>
  );
}
