"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/**
 * ProjectsSection – matches the reference design:
 *  • White background
 *  • "//PROJECTS" label top-left
 *  • Each project is a full-width row: name left, thumbnail right
 *  • Rows separated by 1px #e0e0e0 dividers
 *  • Subtle hover: name slides right, image scales slightly
 */

interface Project {
  id: number;
  name: string;
  category: string;
  image: string;
  href: string;
}

const PROJECTS: Project[] = [
  {
    id: 1,
    name: "Mulearn Dashboard",
    category: "Frontend",
    image: "/mulearn.png",
    href: "https://mulearn.org/",
  },
  {
    id: 2,
    name: "Track Vision",
    category: "Frontend / Backend / AI",
    image: "/projects/mars.jpg",
    href: "#",
  },
  {
    id: 3,
    name: "Supra Home",
    category: "App Design",
    image: "/projects/supra.jpg",
    href: "#",
  },
  {
    id: 4,
    name: "Neon District",
    category: "Branding",
    image: "/projects/neon.jpg",
    href: "#",
  },
  {
    id: 5,
    name: "Orbit Dashboard",
    category: "Product Design",
    image: "/projects/orbit.jpg",
    href: "#",
  },
];

function ProjectRow({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  
  // For the initial slide-up animation
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  
  // For the scroll-based hover effect (active in the middle 70% of the screen)
  const isActive = useInView(ref, { margin: "-15% 0px -15% 0px" });

  return (
    <motion.div
      ref={ref}
      className="project-row"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <a 
        href={project.href} 
        target="_blank"
        rel="noopener noreferrer"
        className={`project-row-inner ${isActive ? "is-active" : ""}`} 
        aria-label={project.name}
      >
        {/* Left: name + category */}
        <div className="project-info">
          <span className="project-name">{project.name}</span>
          <span className="project-category">{project.category}</span>
        </div>

        {/* Right: thumbnail */}
        <div className="project-thumb-wrap">
          <div className="project-thumb">
            <Image
              src={project.image}
              alt={project.name}
              fill
              sizes="(max-width: 768px) 40vw, 220px"
              style={{ objectFit: "cover" }}
              onError={(e) => {
                // Hide broken image; placeholder bg takes over
                (e.target as HTMLImageElement).style.opacity = "0";
              }}
            />
          </div>
        </div>
      </a>

      {/* Divider under each row */}
      <div className="project-divider" aria-hidden="true" />
    </motion.div>
  );
}

export default function ProjectsSection() {
  return (
    <section id="projects" className="projects-section" aria-label="Projects">
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
