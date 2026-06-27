"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * HeroSection – Client Component
 * Background: /akshay-bg.PNG (public folder)
 * Fonts injected via CSS variables from next/font/google in layout.tsx
 */
/**
 * Helper to split text into animated spans
 */
function AnimateText({
  text,
  baseDelay,
  charClass,
  delayIncrement = 0.05,
}: {
  text: string;
  baseDelay: number;
  charClass: string;
  delayIncrement?: number;
}) {
  return (
    <>
      {text.split("").map((char, index) => (
        <span
          key={index}
          className={charClass}
          style={{ animationDelay: `${baseDelay + index * delayIncrement}s` }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </>
  );
}

export default function HeroSection() {
  const { scrollY } = useScroll();
  const akshayRef = useRef<HTMLHeadingElement>(null);
  const vsRef = useRef<HTMLDivElement>(null);
  const maxOffsetRef = useRef(1000); // fallback

  useEffect(() => {
    const measure = () => {
      if (akshayRef.current && vsRef.current) {
        // Calculate the distance between AKSHAY's top and VS's top
        maxOffsetRef.current = vsRef.current.offsetTop - akshayRef.current.offsetTop;
      }
    };
    measure();
    // Re-measure on window resize to ensure accuracy across devices
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);
  
  // Vanish immediately with an effect when scrolling starts (0 to 80px)
  const vanishOpacity = useTransform(scrollY, [0, 80], [1, 0]);
  const vanishY = useTransform(scrollY, [0, 80], [0, 20]);
  
  // Make AKSHAY sticky, but cap it so it stops exactly when it reaches the VS baseline
  const stickyY = useTransform(scrollY, (y) => Math.min(y, maxOffsetRef.current));

  return (
    <section
      id="hero"
      className="hero-section"
      aria-label="Akshay VS – Hero"
    >
      {/* ── Background image ──────────────────────────────────────── */}
      <div className="hero-bg" aria-hidden="true">
        <Image
          src="/akshay.PNG"
          alt="Akshay VS portrait"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center center" }}
        />
        {/* Gradient overlay – keeps text readable */}
        <div className="hero-overlay" />
      </div>

      {/* ── Navigation ────────────────────────────────────────────── */}
      <nav className="hero-nav" aria-label="Primary navigation">
        {/* AKSHAY VS – plain text, not a link */}
        <div className="hero-logo" aria-label="Akshay VS">
          AKSHAY<span className="logo-vs">VS</span>
        </div>

        <ul className="hero-nav-links" role="list">
          {["ABOUT", "PROJECTS", "EXPERIENCE", "CONNECT"].map((item) => (
            <li key={item}>
              <a
                href={`#${item.toLowerCase()}`}
                className="hero-nav-link"
                aria-label={`Go to ${item}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(item.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
                  window.history.pushState(null, '', `#${item.toLowerCase()}`);
                }}
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* ── Main content ──────────────────────────────────────────── */}
      <div className="hero-content">

        {/* H1 – AKSHAY (Dela Gothic One, clamp(3.5rem, 10vw, 9rem)) */}
        <motion.h1 
          ref={akshayRef}
          className="hero-akshay" 
          aria-label="AKSHAY"
          style={{ y: stickyY }}
        >
          <AnimateText
            text="AKSHAY"
            baseDelay={0.5}
            charClass="char-reveal"
            delayIncrement={0.08}
          />
        </motion.h1>

        {/* Vertical ./PORTFOLIO label – left side */}
        <motion.div style={{ gridArea: "port", justifySelf: "start", opacity: vanishOpacity, y: vanishY }}>
          <div className="hero-portfolio-label" aria-hidden="true">
            <span className="portfolio-line" />
            <span className="portfolio-text">./&nbsp;PORTFOLIO</span>
          </div>
        </motion.div>

        {/* Bottom-left CTA (Montserrat SemiBold 600 Italic) */}
        <motion.div style={{ gridArea: "cta", opacity: vanishOpacity, y: vanishY }}>
          <div className="hero-cta">
            <p className="hero-cta-text" aria-label="WANT TO KNOW ABOUT ME">
              <AnimateText
                text="WANT TO KNOW ABOUT ME"
                baseDelay={0.8}
                charClass="char-fade-blur"
                delayIncrement={0.04}
              />
            </p>
            <span className="hero-cta-arrow" aria-hidden="true">↓</span>
          </div>
        </motion.div>

        {/* VS – bottom right (Dela Gothic One, clamp(3.5rem, 10vw, 9rem)) */}
        <div ref={vsRef} className="hero-vs" aria-hidden="true">
          <AnimateText
            text="VS"
            baseDelay={1.0}
            charClass="char-reveal"
            delayIncrement={0.08}
          />
        </div>

      </div>
    </section>
  );
}
