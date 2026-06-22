import Image from "next/image";
import Link from "next/link";

/**
 * HeroSection – SSR Server Component (no "use client" needed).
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
  return (
    <section
      id="hero"
      className="hero-section"
      aria-label="Akshay VS – Hero"
    >
      {/* ── Background image ──────────────────────────────────────── */}
      <div className="hero-bg" aria-hidden="true">
        <Image
          src="/akshay-bg.PNG"
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
              <Link
                href={`#${item.toLowerCase()}`}
                className="hero-nav-link"
                aria-label={`Go to ${item}`}
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* ── Main content ──────────────────────────────────────────── */}
      <div className="hero-content">

        {/* H1 – AKSHAY (Dela Gothic One, clamp(3.5rem, 10vw, 9rem)) */}
        <h1 className="hero-akshay" aria-label="AKSHAY">
          <AnimateText
            text="AKSHAY"
            baseDelay={0.5}
            charClass="char-reveal"
            delayIncrement={0.08}
          />
        </h1>

        {/* Vertical ./PORTFOLIO label – left side */}
        <div className="hero-portfolio-label" aria-hidden="true">
          <span className="portfolio-line" />
          <span className="portfolio-text">./&nbsp;PORTFOLIO</span>
        </div>

        {/* Bottom-left CTA (Montserrat SemiBold 600 Italic) */}
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

        {/* VS – bottom right (Dela Gothic One, clamp(3.5rem, 10vw, 9rem)) */}
        <div className="hero-vs" aria-hidden="true">
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
