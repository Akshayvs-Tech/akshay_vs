"use client";

import { useRef, useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";


/* ─────────────────────────────────────────────────────────────────────────────
   Types
───────────────────────────────────────────────────────────────────────────── */
interface ScrollRevealTextProps {
  /** The large heading text to reveal character by character */
  heading: string;
  /** Optional: substring of heading that reveals in the accent color (#e05c3a) instead of white */
  accentText?: string;
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
   Lightning Bolt SVG (bottom-right icon)
───────────────────────────────────────────────────────────────────────────── */
function LightningBolt() {
  return (
    <div
      aria-hidden="true"
      className="absolute bottom-8 right-8 w-9 h-9 border border-white/20 rounded-md flex items-center justify-center bg-black/50 backdrop-blur-sm"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-4 h-4 text-white"
      >
        <path d="M11.9997 22C11.7582 22 11.5249 21.9126 11.3414 21.7538C11.1091 21.5532 10.9859 21.2519 11.0108 20.9472L11.5835 13.9995H6.99965C6.67104 13.9995 6.3666 13.8407 6.17706 13.5701C5.98753 13.2995 5.94273 12.9567 6.05608 12.645L10.0561 1.64495C10.1983 1.25367 10.5694 1.00003 10.9997 1.00003H15.9997C16.3421 1.00003 16.666 1.14441 16.8924 1.39665C17.1189 1.64889 17.2263 1.98485 17.1868 2.3242L16.2731 10.0003H19.9997C20.3061 10.0003 20.596 10.1412 20.7819 10.3802C20.9678 10.6191 21.0287 10.9298 20.9463 11.2185L13.9463 21.7185C13.7915 21.8798 13.5901 21.9859 13.3703 21.9984C13.3673 21.9985 13.3643 21.9985 13.3614 21.9985C13.1259 21.9985 12.8986 21.9056 12.7302 21.7416L11.9997 22Z" />
      </svg>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Hover Fill Button – fills with accent color (#e05c3a) from bottom to top
───────────────────────────────────────────────────────────────────────────── */
function HoverFillButton({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        overflow: "hidden",
        borderRadius: "9999px",
        border: `1px solid ${hovered ? "#e05c3a" : "#444444"}`,
        background: "#0d0d0d",
        color: "#ffffff",
        fontFamily: "var(--font-nav, sans-serif)",
        fontSize: "0.95rem",
        fontWeight: 300,
        padding: "1.6rem 2.5rem",
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
  subText,
  ctaLabel,
  onCtaClick,
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

  const { accentStart, accentEnd } = useMemo(() => {
    if (!accentText) return { accentStart: -1, accentEnd: -1 };
    const start = heading.indexOf(accentText);
    return { accentStart: start, accentEnd: start + accentText.length };
  }, [heading, accentText]);

  /* ── Per-character colour ────────────────────────────────────────────────── */
  const revealedCount = Math.floor(revealProgress * chars.length);

  const getCharColor = (i: number): string => {
    if (i >= revealedCount) return HIDDEN_COLOR;
    if (accentStart >= 0 && i >= accentStart && i < accentEnd)
      return ACCENT_COLOR;
    return WHITE_COLOR;
  };

  /* ── Sub-text / CTA fade-in ──────────────────────────────────────────────── */
  const ctaSectionVisible = revealProgress > 0.8;

  return (
    <section
      ref={sectionRef}
      id={id}
      className="relative w-full overflow-hidden bg-[#0d0d0d]"
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
        }}
      >
        // INTRO
      </h3>

      {/* ── Centred content wrapper ─────────────────────────────────────────── */}
      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="w-full max-w-5xl mx-auto px-10 py-20">

        {/* Heading — NO CSS transition on spans; colour tracks scroll 1-to-1.
            aria-label on the <p> provides the full text for SEO & screen readers;
            individual <span>s are aria-hidden. */}
        <p
          id={id ? `${id}-heading` : undefined}
          role="heading"
          aria-level={1}
          aria-label={heading}
          className="text-[60px] font-bold leading-[1.1] tracking-tight text-justify indent-[250px] mt-16"
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
        </p>

        <motion.div
          animate={{
            opacity: revealProgress > 0.8 ? 1 : 0,
            y: revealProgress > 0.8 ? 0 : 16,
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex justify-end"
          style={{ marginTop: "2rem" }}
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
