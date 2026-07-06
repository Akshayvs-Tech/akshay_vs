"use client";

import Image from "next/image";
import { useRef, useEffect, useCallback } from "react";
import { motion, useInView } from "framer-motion";

interface Project {
  id: number;
  name: string;
  category: string;
  image: string;
  href: string;
  inProgress?: boolean;
}

const PROJECTS: Project[] = [
  {
    id: 1,
    name: "µLearn Dashboard",
    category: "Frontend",
    image: "/projects/mulearn.png",
    href: "https://mulearn.org/",
  },
  {
    id: 2,
    name: "Track Vision",
    category: "Frontend / Backend / AI",
    image: "/projects/mars.jpg",
    href: "#",
    inProgress: true,
  },
  {
    id: 3,
    name: "Blog",
    category: "FRONTEND",
    image: "/projects/blog.png",
    href: "https://blogs.osintjourno.com/",
  },
  {
    id: 4,
    name: "Wild Guard",
    category: "FRONTEND / BACKEND",
    image: "/projects/wildguard.jpg",
    href: "#",
  },
];

function ProjectRow({ project, index }: { project: Project; index: number }) {
  const rowRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(rowRef, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={rowRef}
      className="project-row"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <a
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        className="project-row-inner"
        aria-label={project.name}
        // data-* attribute lets the parent's scroll tracker identify this element
        data-project-row
      >
        {/* Left: name + category */}
        <div className="project-info">
          <span className="project-name">{project.name}</span>
          <span className="project-category">{project.category}</span>
        </div>

        {/* Right: thumbnail or in-progress badge */}
        <div className="project-thumb-wrap">
          {project.inProgress ? (
            <div
              className="project-thumb"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "transparent",
                border: "1.5px solid rgba(255,255,255,0.55)",
                borderRadius: "999px",
                padding: "1rem 2.4rem",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-nav)",
                  fontWeight: 700,
                  fontSize: "0.8rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "#ffffff",
                  whiteSpace: "nowrap",
                }}
              >
                On Progress
              </span>
            </div>
          ) : (
            <div className="project-thumb">
              <Image
                src={project.image}
                alt={project.name}
                fill
                sizes="(max-width: 768px) 40vw, 220px"
                style={{ objectFit: "cover" }}
                onError={(e) => {
                  (e.target as HTMLImageElement).style.opacity = "0";
                }}
              />
            </div>
          )}
        </div>
      </a>

      {/* Divider under each row */}
      <div className="project-divider" aria-hidden="true" />
    </motion.div>
  );
}

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  /**
   * updateHover – called on both mousemove AND scroll.
   * Uses document.elementFromPoint to find which .project-row-inner
   * the cursor is currently over, then applies/removes .is-hovered.
   */
  const cursorPos = useRef({ x: -9999, y: -9999 });

  const updateHover = useCallback(() => {
    const section = sectionRef.current;
    if (!section) return;

    const { x, y } = cursorPos.current;

    // Get all project row anchors inside this section
    const rows = section.querySelectorAll<HTMLElement>("[data-project-row]");

    rows.forEach((row) => {
      const rect = row.getBoundingClientRect();
      const isOver =
        x >= rect.left &&
        x <= rect.right &&
        y >= rect.top &&
        y <= rect.bottom;

      if (isOver) {
        row.classList.add("is-hovered");
      } else {
        row.classList.remove("is-hovered");
      }
    });
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorPos.current = { x: e.clientX, y: e.clientY };
      updateHover();
    };

    const handleScroll = () => {
      // Cursor position doesn't change on scroll, but element positions do.
      // Re-run hover check with the last known cursor position.
      updateHover();
    };

    // Use { passive: true } for scroll – no need to preventDefault
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [updateHover]);

  return (
    <section
      id="projects"
      className="projects-section"
      aria-label="Projects"
      ref={sectionRef}
    >
      {/* Top label */}
      <div className="projects-label-row">
        <span className="projects-label">// PROJECTS</span>
      </div>

      {/* Project list */}
      <div className="projects-list">
        {PROJECTS.map((project, i) => (
          <ProjectRow key={project.id} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}