/**
 * AboutSection – Server Component shell.
 *
 * The actual scroll-reveal interaction lives entirely inside
 * `ScrollRevealText` ("use client"), so this outer wrapper is a
 * pure Server Component and is SSR-rendered with no client JS.
 *
 * SEO: The section carries a semantic <section> with an id so the
 * navbar "#about" anchor resolves correctly. The `heading` string is
 * forwarded as aria-label on the heading element inside the child
 * component, so crawlers see the full text in HTML.
 */
import ScrollRevealText from "@/components/ScrollRevealText";

const ABOUT_HEADING =
  "I'm a fullstack developer who bridges design and infrastructure. I craft seamless user experiences on the frontend and bulletproof systems on the backend.";

const ABOUT_ACCENT =
  "fullstack developer who bridges design and infrastructure.";

const ABOUT_SUBTEXT =
  "Bringing your vision to life quickly and efficiently—whether it's branding, apps, or websites—I've got it covered, delivering smooth and effective solutions from start to finish.";

export default function AboutSection() {
  return (
    <ScrollRevealText
      id="about"
      heading={ABOUT_HEADING}
      accentText={ABOUT_ACCENT}
      subText={ABOUT_SUBTEXT}
      ctaLabel="See my Work"
    />
  );
}
