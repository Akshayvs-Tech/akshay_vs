"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [cursorType, setCursorType] = useState("default");
  
  // Track last known mouse position for scroll events
  const mousePos = useRef({ x: -100, y: -100 });
  const currentCursor = useRef("default");

  useEffect(() => {
    const checkCursorTarget = (x: number, y: number) => {
      if (x < 0 || y < 0) return;
      
      // Find what element is currently exactly under the cursor
      const target = document.elementFromPoint(x, y) as HTMLElement | null;
      if (!target) return;
      
      // Look for a data-cursor attribute on the target or its ancestors
      const cursorVal = target.closest('[data-cursor]')?.getAttribute('data-cursor') || "default";
      
      if (cursorVal !== currentCursor.current) {
        currentCursor.current = cursorVal;
        setCursorType(cursorVal);
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
      
      checkCursorTarget(e.clientX, e.clientY);
    };

    const onScroll = () => {
      // When the user scrolls, the mouse doesn't move but the page does,
      // so we must re-evaluate what element is under the static cursor position.
      checkCursorTarget(mousePos.current.x, mousePos.current.y);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className={`custom-cursor-container ${cursorType === "view" ? "is-view" : ""}`}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        pointerEvents: "none",
        zIndex: 9999,
        willChange: "transform",
        mixBlendMode: cursorType === "view" ? "normal" : "difference",
      }}
      aria-hidden="true"
    >
      <AnimatePresence>
        {cursorType === "view" ? (
          <motion.div
            key="view-cursor"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0, transition: { duration: 0 } }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            style={{
              position: "absolute",
              top: "-40px",
              left: "-40px",
              width: "80px",
              height: "80px",
              backgroundColor: "#e05c3a",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff",
              fontFamily: "var(--font-nav, sans-serif)",
              fontSize: "1.1rem",
              fontWeight: 500,
              letterSpacing: "0.05em",
            }}
          >
            View
          </motion.div>
        ) : (
          <motion.div
            key="default-cursor"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0, transition: { duration: 0 } }}
            transition={{ duration: 0.15 }}
            className="custom-cursor"
          />
        )}
      </AnimatePresence>
    </div>
  );
}
