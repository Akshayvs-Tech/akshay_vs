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
      "ZUSTAND",
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
      "ZUSTAND",  
      "TYPESCRIPT",
      "RESPONSIVE DESIGN",
    ],
  },
  {
    number: "03",
    title: "Software Tester",
    role: "INTERNSHIP",
    period: "07.2025 - 09.2025",
    bullets: [
      "Performed both manual and automated testing to validate functionality, usability, and reliability across web applications.",
      "Designed, developed, and maintained automated test suites using Cypress, improving regression testing coverage and reducing manual QA effort.",
      "Integrated Cypress test suites into CI/CD pipelines, enabling faster feedback loops and catching regressions before deployment.",
    ],
    skills: [
      "MANUAL TESTING",
      "TEST CASES",
      "CYPRESS",
      "AUTOMATED TESTING",
    ],
  },
  {
    number: "01",
    title: "Cochin University College of Engineering Kuttanad",
    role: "BACHELOR OF TECHNOLOGY",
    period: "UG | 09.2023 - 05.2027",
    bullets: [
      "Studying core computer science concepts including data structures, algorithms, and software engineering.",
      "Participated in multiple hackathons and built scalable web applications as part of academic projects.",
    ],
    skills: [
      "COMPUTER SCIENCE",
      "DATA STRUCTURES",
      "ALGORITHMS",
      "WEB DEVELOPMENT",
    ],
  },
  {
    number: "02",
    title: "Kendriya Vidyalaya",
    role: "HIGH SCHOOL",
    period: "04.2020 - 05.2023",
    bullets: [
      "Completed secondary education with a focus on science and mathematics.",
      "Participated actively in extra-curricular activities and school technical clubs.",
    ],
    skills: [
      "MATHEMATICS",
      "PHYSICS",
      "CHEMISTRY",
      "COMPUTER SCIENCE",
    ],
  },
  {
    number: "01",
    title: "HACKP",
    role: "HACKATHON FINALIST",
    period: "2025",
    bullets: [
      "I was one of the frontend developers in HACKP 2025, building two products named Take-it-down and Trace-an-Object.",
      "I was one of the 30 finalists selected among 1000+ candidates."
    ],
    skills: [
      "REACT",
      "TAILWINDCSS",
      "SHADCN",
      "TANSTACK QUERY",
      "ZUSTAND",
      "TYPESCRIPT",
      "RESPONSIVE DESIGN",
    ],
  },
];

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerFixed, setHeaderFixed] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [activeCategory, setActiveCategory] = useState("EXPERIENCE");
  const activeCategoryRef = useRef("EXPERIENCE");

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

      // Track active category
      let newCategory = "EXPERIENCE";

      // Card stacking animation
      cards.forEach((card, i) => {
        let progress = 0;
        const cardRect = card.getBoundingClientRect();
        
        // If card is at the sticky position (with a small buffer), it's the active one
        if (cardRect.top <= hh + 10) {
          if (i >= 5) newCategory = "ACHIEVEMENT";
          else if (i >= 3) newCategory = "EDUCATION";
        }
        
        // Calculate progress for all cards except the last one
        if (i < cards.length - 1) {
          const nextCard = cards[i + 1];
          const nextRect = nextCard.getBoundingClientRect();

          const overlap = cardRect.bottom - nextRect.top;
          progress = Math.max(0, Math.min(1, overlap / cardRect.height));
        }

        // Apply styles to all cards (progress will be 0 for the last card, resetting it to default)
        const scale = 1 - progress * 0.04;
        const opacity = 1 - progress * 0.35;
        card.style.transform = `scale(${scale})`;
        card.style.opacity = `${opacity}`;
        card.style.filter = progress > 0.05 ? `blur(${progress * 1.5}px)` : "";
      });

      if (activeCategoryRef.current !== newCategory) {
        setActiveCategory(newCategory);
        activeCategoryRef.current = newCategory;
      }
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
          <span className="flip-container">
            <span key={activeCategory} className="projects-label flip-text">
              {"//"} {activeCategory}
            </span>
          </span>
        </div>
        <h2 className="exp-section-heading">Journey So Far...</h2>
      </div>

      {/* Stack container — each card is sticky below the pinned header */}
      <div className="exp-stack-container">
        {EXPERTISE.map((item, i) => (
          <div
            key={item.title}
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

          </div>
        ))}
      </div>
    </section>
  );
}
