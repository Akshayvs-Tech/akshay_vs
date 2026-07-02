"use client";

import { useRef, useEffect, useState } from "react";

interface ExpertiseItem {
  number: string;
  title: string;
  role?: string;
  period?: string;
  bullets: string[];
  skills: string[];
}

const EXPERTISE: ExpertiseItem[] = [
  {
    number: "01",
    title: "µLearn Foundation",
    role: "FRONTEND DEVELOPER",
    period: "INTERNSHIP | 01.2026 - PRESENT",
    bullets: [
      "Developed and maintained responsive web applications using Next.js and React.",
      "Built reusable and accessible UI components with Shadcn and styled them with Tailwind CSS.",
      "Managed state and data fetching efficiently using TanStack Query and related tools.",
      "Collaborated with the team to optimize performance, implement best practices, and deliver high-quality features.",
    ],
    skills: [
      "REACT",
      "NEXT.JS",
      "TAILWINDCSS",
      "SHADCN",
      "TANSTACK QUERY",
      "TYPESCRIPT",
      "RESPONSIVE DESIGN",
      
    ],
  },
  {
    number: "02",
    title: "Osint Journo",
    role: "FRONTEND DEVELOPER",
    period: "INTERNSHIP | 10.2025 - 01.2026",
    bullets: [
      "Engineered responsive and high-performance web applications using Next.js and React.",
      "Designed and implemented reusable, accessible UI components with Shadcn, styled with Tailwind CSS for consistency.",
      "Streamlined state management and data fetching using TanStack Query, improving app efficiency.",
      "Collaborated with cross-functional teams to optimize code quality, implement best practices, and deliver robust features.",
    ],
    skills: [
      "REACT",
      "NEXT.JS",
      "TAILWINDCSS",
      "SHADCN",
      "TANSTACK QUERY",
      "TYPESCRIPT",
      "RESPONSIVE DESIGN",
    ],
  },
  {
    number: "03",
    title: "Frontend Development",
    bullets: [
      "Building performant, accessible, and responsive web applications using modern frameworks and best practices. Every line of code is crafted with intention.",
    ],
    skills: [
      "REACT / NEXT.JS",
      "TYPESCRIPT",
      "CSS ANIMATIONS",
      "PERFORMANCE OPTIMIZATION",
    ],
  },
  {
    number: "04",
    title: "UI / UX Design",
    bullets: [
      "Crafting intuitive, delightful interfaces that connect users to products seamlessly. I balance aesthetics with usability to create experiences that feel natural and engaging.",
    ],
    skills: [
      "WIREFRAMING",
      "PROTOTYPING",
      "USER RESEARCH",
      "INTERACTION DESIGN",
    ],
  },
];

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerFixed, setHeaderFixed] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    if (!section || !header) return;

    // Measure header height and expose it as a CSS var so cards can offset their sticky top
    const measureHeader = () => {
      const hh = header.offsetHeight;
      setHeaderHeight(hh);
      section.style.setProperty("--exp-header-height", `${hh}px`);
    };
    measureHeader();
    window.addEventListener("resize", measureHeader, { passive: true });

    const cards = Array.from(
      section.querySelectorAll<HTMLDivElement>(".exp-stack-card")
    );

    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const hh = header.offsetHeight;

      // Fix header when section top has scrolled above viewport AND bottom still visible
      const shouldFix = rect.top <= 0 && rect.bottom > hh;
      setHeaderFixed(shouldFix);

      // Card stacking animation (unchanged logic)
      cards.forEach((card, i) => {
        if (i === cards.length - 1) return;

        const cardRect = card.getBoundingClientRect();
        const nextCard = cards[i + 1];
        const nextRect = nextCard.getBoundingClientRect();

        const overlap = cardRect.bottom - nextRect.top;
        const progress = Math.max(0, Math.min(1, overlap / cardRect.height));

        const scale = 1 - progress * 0.04;
        const opacity = 1 - progress * 0.35;
        card.style.transform = `scale(${scale})`;
        card.style.opacity = `${opacity}`;
        card.style.filter = progress > 0.05 ? `blur(${progress * 1.5}px)` : "";
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measureHeader);
    };
  }, []);

  return (
    <section
      id="experience"
      className="exp-section"
      aria-label="Experience"
      ref={sectionRef}
    >
      {/*
       * Spacer: when the header is lifted out of normal flow (position:fixed),
       * this invisible div keeps the cards from jumping up to fill the gap.
       */}
      {headerFixed && (
        <div aria-hidden="true" style={{ height: headerHeight }} />
      )}

      {/*
       * Header: static in normal flow → becomes position:fixed (above everything)
       * the moment the section top crosses the viewport top.
       */}
      <div
        ref={headerRef}
        className={`exp-sticky-header${headerFixed ? " exp-sticky-header--fixed" : ""}`}
      >
        <div className="projects-label-row">
          <span className="projects-label">// EXPERIENCE</span>
        </div>
        <h2 className="exp-section-heading">Journey So Far...</h2>
      </div>

      {/* Stack container — each card is sticky below the pinned header */}
      <div className="exp-stack-container">
        {EXPERTISE.map((item, i) => (
          <div
            key={item.number}
            className="exp-stack-card"
            style={{ zIndex: i + 1 }}
          >
            {/* Left column: number + title + description */}
            <div className="exp-left">
              <div className="exp-number-row">
                <span className="exp-number">{item.number}</span>
                <span className="exp-number-line" aria-hidden="true" />
              </div>
              <h3 className="exp-title">{item.title}</h3>
              {(item.role || item.period) && (
                <div className="exp-role-row">
                  {item.role && <span className="exp-role">{item.role}</span>}
                  {item.period && <span className="exp-period">{item.period}</span>}
                </div>
              )}
              <ul className="exp-bullets">
                {item.bullets.map((b) => (
                  <li key={b} className="exp-bullet-item">{b}</li>
                ))}
              </ul>
            </div>

            {/* Right column: skills list */}
            <ul className="exp-skills" aria-label={`${item.title} skills`}>
              {item.skills.map((skill) => (
                <li key={skill} className="exp-skill-item">
                  {skill}
                </li>
              ))}
            </ul>

            {/* Bottom divider */}
            <div className="exp-card-divider" aria-hidden="true" />
          </div>
        ))}
      </div>
    </section>
  );
}
