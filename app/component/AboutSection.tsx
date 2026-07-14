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
  "I'm a fullstack developer who bridges design and infrastructure. I'm currently studying at Cochin University College Of Engineering Kuttanad and frontend intern at µLearn Foundation.";

const ABOUT_ACCENT = [
  "fullstack developer ",
  "Cochin University College Of Engineering Kuttanad",
  "µLearn Foundation.",
];  


export default function AboutSection() {
  return (
    <ScrollRevealText
      id="about"
      heading={ABOUT_HEADING}
      accentText={ABOUT_ACCENT}
      ctaLabel="See my Work"
    />
  );
}
