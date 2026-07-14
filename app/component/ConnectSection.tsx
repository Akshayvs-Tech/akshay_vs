"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

const ROTATING_PHRASES = [
  "Let's chat!",
  "Have a project?",
  "Schedule a Call.",
];

export default function ConnectSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-20%" });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  // Rotate phrases every 2.8 s (only when section is visible)
  useEffect(() => {
    if (!isInView) return;

    const interval = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % ROTATING_PHRASES.length);
        setAnimating(false);
      }, 400);
    }, 2800);

    return () => clearInterval(interval);
  }, [isInView]);

  return (
    <section
      id="connect"
      className="connect-section"
      aria-label="Connect"
      ref={sectionRef}
    >
      {/* Top label — matches // PROJECTS / // SKILLS */}
      <div className="projects-label-row">
        <span className="projects-label">{"//"} CONNECT</span>
      </div>

      {/* Main content block */}
      <div className="connect-body">
        {/* Rotating large phrase */}
        <div className="connect-rotating-wrap" aria-live="polite">
          <span
            key={currentIndex}
            className={`connect-rotating-text${animating ? " connect-rotating-exit" : " connect-rotating-enter"}`}
          >
            {ROTATING_PHRASES[currentIndex]}
          </span>
        </div>

        {/* CTA buttons */}
        <div className="connect-cta-row">
          <a
            href="https://app.cal.com/akshay-vs"
            target="_blank"
            rel="noopener noreferrer"
            className="connect-btn"
            id="connect-book-call"
          >
            Book a Call
          </a>
          <a
            href="mailto:akshay.vs.mail@gmail.com"
            className="connect-btn connect-btn--ghost"
            id="connect-email-me"
          >
            Email Me
          </a>
        </div>

        {/* Social icon buttons */}
        <div className="connect-social-row">
          {/* Resume */}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="connect-social-btn"
            aria-label="Resume"
            id="connect-resume"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
              <polyline points="10 9 9 9 8 9"/>
            </svg>
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/akshayvs-tech"
            target="_blank"
            rel="noopener noreferrer"
            className="connect-social-btn"
            aria-label="LinkedIn"
            id="connect-linkedin"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
              <rect x="2" y="9" width="4" height="12"/>
              <circle cx="4" cy="4" r="2"/>
            </svg>
          </a>

          {/* GitHub */}
          <a
            href="https://github.com/Akshayvs-Tech"
            target="_blank"
            rel="noopener noreferrer"
            className="connect-social-btn"
            aria-label="GitHub"
            id="connect-github"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
            </svg>
          </a>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/k_ich_/"
            target="_blank"
            rel="noopener noreferrer"
            className="connect-social-btn"
            aria-label="Instagram"
            id="connect-instagram"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
