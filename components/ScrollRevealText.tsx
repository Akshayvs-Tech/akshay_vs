"use client";

import { useRef, useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";


/* ─────────────────────────────────────────────────────────────────────────────
   Types
───────────────────────────────────────────────────────────────────────────── */
interface ScrollRevealTextProps {
  /** The large heading text to reveal character by character */
  heading: string;
  /** Optional: substring(s) of heading that reveal in the accent color (#e05c3a) instead of white */
  accentText?: string | string[];
  /** Optional: smaller paragraph displayed below the heading */
  subText?: string;
  /** Optional: CTA button label */
  ctaLabel?: string;
  /** Optional: CTA button click handler */
  onCtaClick?: () => void;
  /** Optional: unique HTML id for the section (for anchor nav & accessibility) */
  id?: string;
}

/* ─────────────────────────────────────────────────────────────────────────────
   Constants
───────────────────────────────────────────────────────────────────────────── */
const HIDDEN_COLOR = "#2a2a2a";
const WHITE_COLOR = "#ffffff";
const ACCENT_COLOR = "#e05c3a";

/* ─────────────────────────────────────────────────────────────────────────────
   Hover Fill Button – fills with accent color (#e05c3a) from bottom to top
───────────────────────────────────────────────────────────────────────────── */
function HoverFillButton({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      type="button"
      onClick={() => {
        if (onClick) onClick();
      }}
      onMouseEnter={() => {
        // Completely disable the color fill hover effect on mobile
        if (typeof window !== "undefined" && window.innerWidth >= 768) {
          setHovered(true);
        }
      }}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        overflow: "hidden",
        borderRadius: "9999px",
        border: `1px solid ${hovered ? "#e05c3a" : "#444444"}`,
        background: "#0d0d0d",
        color: "#ffffff",
        fontFamily: "var(--font-nav, sans-serif)",
        fontSize: "clamp(0.78rem, 1.5vw, 0.95rem)",
        fontWeight: 300,
        padding: "clamp(0.9rem, 2vw, 1.6rem) clamp(1.4rem, 3vw, 2.5rem)",
        transition: "border-color 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
      }}
    >
      {/* The fill layer — expands as a circle arch from center-bottom on hover */}
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background: "#e05c3a",
          clipPath: hovered
            ? "circle(150% at 50% 100%)"
            : "circle(0% at 50% 100%)",
          transition: "clip-path 1s cubic-bezier(0.22, 1, 0.36, 1)",
          zIndex: 0,
        }}
      />
      {/* Text stays above the fill layer */}
      <span style={{ position: "relative", zIndex: 1 }}>
        {children}
      </span>
    </button>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Component
───────────────────────────────────────────────────────────────────────────── */
export default function ScrollRevealText({
  heading,
  accentText,

  id,
}: ScrollRevealTextProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [revealProgress, setRevealProgress] = useState(0);

  /* ── Scroll listener with rAF throttle ──────────────────────────────────── */
  useEffect(() => {
    let rafId: number;

    const handleScroll = () => {
      rafId = requestAnimationFrame(() => {
        if (!sectionRef.current) return;

        const rect = sectionRef.current.getBoundingClientRect();
        const windowH = window.innerHeight;

        // Reveal starts when the section's top edge crosses 50% of the viewport
        const startTrigger = windowH * 0.5;
        // Reveal completes when the section's top edge is at 5% of the viewport
        const endTrigger = windowH * 0.05;

        const progress =
          1 -
          Math.max(
            0,
            Math.min(
              1,
              (rect.top - endTrigger) / (startTrigger - endTrigger)
            )
          );

        setRevealProgress(progress);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // run once on mount

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  /* ── Memoised derived data ───────────────────────────────────────────────── */
  const chars = useMemo(() => heading.split(""), [heading]);

  const accentRanges = useMemo(() => {
    if (!accentText) return [];
    const phrases = Array.isArray(accentText) ? accentText : [accentText];
    return phrases
      .map((phrase) => {
        const start = heading.indexOf(phrase);
        return start >= 0 ? { start, end: start + phrase.length } : null;
      })
      .filter(Boolean) as { start: number; end: number }[];
  }, [heading, accentText]);

  /* ── Per-character colour ────────────────────────────────────────────────── */
  const revealedCount = Math.floor(revealProgress * chars.length);

  const getCharColor = (i: number): string => {
    if (i >= revealedCount) return HIDDEN_COLOR;
    if (accentRanges.some(({ start, end }) => i >= start && i < end))
      return ACCENT_COLOR;
    return WHITE_COLOR;
  };



  return (
    <section
      ref={sectionRef}
      id={id}
      className="relative w-full overflow-hidden"
      style={{ background: 'var(--background)' }}
      aria-labelledby={id ? `${id}-heading` : undefined}
    >
      {/* ── Sticky Section Header ────────────────────────────────────────────── */}
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
          paddingLeft: "2.5rem",
          marginTop: "1.5rem",
          /* Ensure the label never shows through on a light section above */
          background: "var(--background)",
        }}
      >
        {"//"} INTRO
      </h3>

      {/* ── Centred content wrapper ─────────────────────────────────────────── */}
      <div className="w-full min-h-[65vh] md:min-h-[75vh] lg:min-h-screen flex items-center justify-center">
        <div className="w-[85%] sm:w-[80%] lg:w-full max-w-5xl mx-auto lg:px-10 py-16 lg:py-20">

        {/* Heading — NO CSS transition on spans; colour tracks scroll 1-to-1.
            aria-label on the <p> provides the full text for SEO & screen readers;
            individual <span>s are aria-hidden. */}
        <h2
          id={id ? `${id}-heading` : undefined}
          aria-label={heading}
          className="text-[26px] md:text-[38px] lg:text-[60px] font-bold leading-[1.1] tracking-tight text-left lg:text-justify indent-[50px] md:indent-[120px] lg:indent-[250px] mt-4 md:mt-8 lg:mt-16"
          style={{ fontFamily: "var(--font-body, sans-serif)" }}
        >
          {chars.map((char, i) => (
            <span
              key={i}
              aria-hidden="true"
              style={{ color: getCharColor(i), display: "inline" }}
            >
              {char}
            </span>
          ))}
        </h2>

        {/* Spacer to forcefully push the button down on mobile view */}
        <div className="h-16 sm:h-12 lg:h-0 w-full" aria-hidden="true" />

        <motion.div
          animate={{
            opacity: revealProgress > 0.8 ? 1 : 0,
            y: revealProgress > 0.8 ? 0 : 16,
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex w-full justify-center lg:justify-end lg:mt-8"
        >
          <HoverFillButton onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>
            See my Work
          </HoverFillButton>
        </motion.div>
      </div>
      </div>
    </section>
  );
}
