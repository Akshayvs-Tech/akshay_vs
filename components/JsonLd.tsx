/**
 * JsonLd – Server Component (zero client JS overhead).
 *
 * Injects JSON-LD structured data for search engines. Contains:
 * - Person schema (name, jobTitle, sameAs social links)
 * - WebSite schema (name, url, description)
 *
 * @see https://schema.org/Person
 * @see https://schema.org/WebSite
 */

const SITE_URL = "https://akshayvs.dev";

interface JsonLdProps {
  /** Override the base URL (useful when env-specific) */
  url?: string;
}

export default function JsonLd({ url = SITE_URL }: JsonLdProps) {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Akshay VS",
    jobTitle: "Frontend Developer",
    url,
    sameAs: [
      "https://www.linkedin.com/in/akshayvs-tech",
      "https://github.com/Akshayvs-Tech",
      "https://www.instagram.com/k_ich_/",
    ],
    knowsAbout: [
      "React",
      "Next.js",
      "TypeScript",
      "TailwindCSS",
      "Node.js",
      "Frontend Development",
      "Web Development",
    ],
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Cochin University College of Engineering Kuttanad",
    },
    worksFor: {
      "@type": "Organization",
      name: "µLearn Foundation",
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Akshay VS Portfolio",
    url,
    description:
      "Creative frontend developer crafting premium digital experiences. Explore projects, skills and connect.",
    author: {
      "@type": "Person",
      name: "Akshay VS",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
    </>
  );
}
