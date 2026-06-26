  "use client";

import { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

/* ─────────────────────────── types ──────────────────────────────────────── */
interface Project {
  year: string;
  title: string;
  description: string;
  tags: string[];
  /** Path relative to /public. Leave null until you supply the real image. */
  image: string | null;
}

/* ─────────────────────────── data ───────────────────────────────────────── */
const PROJECTS: Project[] = [
  {
    year: "2024",
    title: "Formula Vintage",
    description:
      "For Formula Vintage, we crafted a design that honors the rich heritage of classic cars while adding a modern twist. Combining timeless elegance with sleek, contemporary elements, we created an experience that appeals to both enthusiasts and newcomers, celebrating the past with a fresh perspective.",
    tags: ["Landing Page", "Mobile App", "Redesign"],
    image: null, // replace with "/formula-vintage.jpg" when ready
  },
  {
    year: "2023",
    title: "Project Two",
    description:
      "A deep-dive into building a high-performance web application that serves thousands of concurrent users, with a focus on real-time data, elegant UI, and seamless developer experience.",
    tags: ["Web App", "Backend", "Real-time"],
    image: null,
  },
  {
    year: "2023",
    title: "Project Three",
    description:
      "An e-commerce platform redesign that improved conversion rates by 40% through intentional UX decisions, micro-animations, and a component-driven design system built from scratch.",
    tags: ["E-commerce", "UI Design", "Next.js"],
    image: null,
  },
];

/* ─────────────────────────── sub-components ─────────────────────────────── */
function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-15%" });
  const [imgError, setImgError] = useState(false);

  // Track scroll for this specific card
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start start", "start -75vh"], // Fades out over 75vh of scroll
  });

  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0, 0.7]);
  const cardScale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);


  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: "sticky",
        top: "3.5rem",
        display: "grid",
        scale: cardScale,
        gridTemplateColumns: "2fr 1fr",
        gap: "1.25rem",
        minHeight: "560px",
      }}
    >
      {/* Scroll dimming overlay */}
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          background: "black",
          opacity: overlayOpacity,
          zIndex: 10,
          pointerEvents: "none",
          borderRadius: "1.25rem",
        }}
      />

      {/* ── Card 1: Image ─────────────────────────────────────────── */}
      <div
        style={{
          position: "relative",
          background: "#0d0d0d",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "1.25rem",
          overflow: "hidden",
        }}
      >
        {project.image && !imgError ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="55vw"
            style={{ objectFit: "cover" }}
            onError={() => setImgError(true)}
          />
        ) : (
          /* Placeholder shown until you provide the real image */
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "1rem",
              color: "rgba(255,255,255,0.2)",
              fontFamily: "var(--font-nav)",
              fontSize: "0.8rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            <svg width="60" height="60" viewBox="0 0 60 60" fill="none" style={{ opacity: 0.25 }}>
              <rect x="1" y="1" width="58" height="58" rx="4" stroke="white" strokeWidth="1.5" strokeDasharray="6 4" />
              <line x1="30" y1="1" x2="30" y2="59" stroke="white" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="1" y1="30" x2="59" y2="30" stroke="white" strokeWidth="1" strokeDasharray="4 4" />
            </svg>
            <span>Image coming soon</span>
          </div>
        )}
      </div>

      {/* ── Card 2: Info ──────────────────────────────────────────── */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "2.75rem 2.5rem 2.25rem 2.5rem",
          background: "#0d0d0d",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "1.25rem",
          overflow: "hidden",
        }}
      >
        {/* Year */}
        <span
          style={{
            fontFamily: "var(--font-nav)",
            fontSize: "0.78rem",
            letterSpacing: "0.2em",
            color: "rgba(255,255,255,0.45)",
            textTransform: "uppercase",
            marginBottom: "1rem",
          }}
        >
          ({project.year})
        </span>

        {/* Title */}
        <h2
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "clamp(2rem, 3.5vw, 2.75rem)",
            fontWeight: 800,
            lineHeight: 1.1,
            color: "#ffffff",
            marginBottom: "1.5rem",
          }}
        >
          {project.title}
        </h2>

        {/* Description */}
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.93rem",
            lineHeight: 1.7,
            color: "rgba(255,255,255,0.55)",
          }}
        >
          {project.description}
        </p>

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* Tags list */}
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.1)",
            paddingTop: "1.25rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.6rem",
          }}
        >
          {project.tags.map((tag) => (
            <div
              key={tag}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "1px solid rgba(255,255,255,0.07)",
                paddingBottom: "0.55rem",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-nav)",
                  fontSize: "0.82rem",
                  letterSpacing: "0.08em",
                  color: "rgba(255,255,255,0.6)",
                  textTransform: "capitalize",
                }}
              >
                {tag}
              </span>
              {tag === project.tags[project.tags.length - 1] && (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ opacity: 0.5 }}>
                  <path d="M8 1L2 8h5l-1 5 6-7H7l1-5z" fill="white" stroke="white" strokeWidth="0.5" strokeLinejoin="round" />
                </svg>
              )}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────── main section ───────────────────────────────── */
export default function ProjectsSection() {

  return (
    <section
      id="projects"
      aria-label="Projects"
      style={{
        background: "#0d0d0d",
        width: "100%",
        paddingTop: "1.5rem",
      }}
    >
      {/* Section header */}
      <div
        style={{
          maxWidth: "100%",
          margin: "0 auto",
          padding: "0 1.5rem",
        }}
      >
        <h3
          style={{
            position: "sticky",
            top: "1.5rem",
            zIndex: 10,
            fontFamily: "var(--font-nav)",
            fontSize: "0.85rem",
            letterSpacing: "0.15em",
            fontWeight: 700,
            color: "#e05c3a",
            textTransform: "uppercase",
            marginBottom: "0.5rem",
            paddingLeft: "1rem"
          }}
        >
          // PROJECTS
        </h3>

        {/* Project cards */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "75vh",
            paddingBottom: "100vh",
          }}
        >
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
