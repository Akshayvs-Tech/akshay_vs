"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface SkillItem {
  name: string;
  color: string;
  svg: string; // raw SVG string
}

interface SkillCategory {
  title: string;
  skills: SkillItem[];
}

// Inline SVGs — no external domain needed
const ICONS: Record<string, string> = {
  /* ─── JavaScript ─── Yellow square + clean "JS" letterforms (fixed: removed the black overlay rect) */
  javascript: `<svg viewBox="0 0 128 128"><rect width="128" height="128" fill="#F7DF1E"/><path fill="#323330" d="M34.7 108.7l9.8-5.9c1.9 3.4 3.6 6.2 7.7 6.2 3.9 0 6.4-1.5 6.4-7.5V63.2h12.1v38.5c0 12.4-7.2 18-17.8 18-9.5 0-15-4.9-17.8-10.8zm42.1-1.4l9.8-5.7c2.6 4.3 6 7.5 12 7.5 5 0 8.3-2.5 8.3-6 0-4.2-3.3-5.7-8.9-8.1l-3.1-1.3c-8.8-3.8-14.7-8.5-14.7-18.4 0-9.2 7-16.2 17.9-16.2 7.8 0 13.4 2.7 17.4 9.8l-9.5 6.1c-2.1-3.8-4.4-5.3-7.9-5.3-3.6 0-5.9 2.3-5.9 5.3 0 3.7 2.3 5.2 7.6 7.5l3.1 1.3c10.4 4.5 16.3 9 16.3 19.2 0 11-8.6 17-20.2 17-11.3 0-18.6-5.4-22.2-12.4z"/></svg>`,

  /* ─── Java ─── Classic coffee steam / cup in red + blue */
  java: `<svg viewBox="0 0 128 128"><path fill="#0074BD" d="M47.6 98.1s-4.8 2.8 3.4 3.7c9.9 1.1 14.9 1 25.8-1.1 0 0 2.9 1.8 6.9 3.4-24.4 10.5-55.3-.6-36.1-6zm-3-13.7s-5.3 4 2.8 4.8c10.6 1.1 18.9 1.2 33.4-1.6 0 0 2 2 5.1 3.1-29.5 8.6-62.4.7-41.3-6.3z"/><path fill="#EA2D2E" d="M69.8 61.3c6 6.9-1.6 13.2-1.6 13.2s15.3-7.9 8.3-17.8c-6.6-9.2-11.6-13.8 15.6-29.6 0 0-42.7 10.7-22.3 34.2z"/><path fill="#0074BD" d="M102.1 108.2s3.5 2.9-3.9 5.2c-14.1 4.3-58.7 5.6-71.1.2-4.5-1.9 3.9-4.6 6.5-5.2 2.7-.6 4.3-.5 4.3-.5-5-3.5-32 6.8-13.7 9.8 49.8 8.1 90.8-3.6 77.9-9.5zM49.9 71.7s-22.7 5.4-8 7.3c6.2.8 18.5.6 30-.3 9.4-.8 18.8-2.5 18.8-2.5s-3.3 1.4-5.7 3.1c-23 6.1-67.5 3.2-54.7-3 10.8-5.2 19.6-4.6 19.6-4.6zm40.7 22.7c23.4-12.2 12.6-23.9 5-22.3-1.8.4-2.7.7-2.7.7s.7-1.1 2-1.5c15-5.3 26.5 15.5-4.8 23.7 0 0 .4-.3.5-.6z"/><path fill="#EA2D2E" d="M76.5 1.6S89.5 14.6 64.2 34.5c-20.3 16-4.6 25.1 0 35.6-11.8-10.7-20.5-20.1-14.7-28.8C58 28.4 81.7 22.2 76.5 1.6z"/><path fill="#0074BD" d="M52.2 126c22.5 1.4 57-.8 57.8-11.4 0 0-1.6 4-18.6 7.2-19.2 3.6-42.9 3.2-56.9.9 0 0 2.9 2.4 17.7 3.3z"/></svg>`,

  /* ─── HTML5 ─── Orange/red shield with white "5" */
  html5: `<svg viewBox="0 0 128 128"><path fill="#E44D26" d="M19 113.9L9 1.7h110l-10 112.2L64 126.9z"/><path fill="#F16529" d="M64 116.8l36.4-10.1 8.6-95.9H64z"/><path fill="#EBEBEB" d="M64 52.5H45.8l-1.3-14.1H64V24.6H29.5l.3 3.7 3.4 37.9H64zm0 35.7l-.1.1-15.3-4.1-1-11H33.8l1.9 21.6 28.2 7.8.1-.1z"/><path fill="#fff" d="M64 52.5v13.8h16.9l-1.6 17.8-15.3 4.1v14.3l28.2-7.8.2-2.3 3.2-36.2.3-3.7zm0-27.9v13.8h33.2l.3-3.1.6-7 .3-3.7z"/></svg>`,

  /* ─── CSS3 ─── Blue shield */
  css3: `<svg viewBox="0 0 128 128"><path fill="#1572B6" d="M18.8 114.1L8.8 1.4h110.5l-10.1 112.8L64 126.6z"/><path fill="#33A9DC" d="M64 117.1l36.6-10.1 8.6-96.4H64z"/><path fill="#fff" d="M64 51.4h18.3l1.3-14.2H64V23.4h34.7l-.3 3.7-3.4 38.1H64zm0 35.9l-.1.1-15.4-4.2-1-11H33.8l1.9 21.7 28.3 7.9.1-.1z"/><path fill="#EBEBEB" d="M64 51.4v13.8H45.8l-.3-3.1-.6-7-.3-3.7zm0-28v13.8H30.6l-.3-3.1-.6-7-.3-3.7z"/><path fill="#fff" d="M64 87.3l28.4-7.9.2-2.3 2.4-26.9H81.1l-1.7 18.5-15.4 4.2z"/></svg>`,

  /* ─── SQL ─── Database cylinder */
  sql: `<svg viewBox="0 0 128 128"><ellipse cx="64" cy="30" rx="48" ry="18" fill="#00758F"/><path d="M16 30v62c0 10 21.5 18 48 18s48-8 48-18V30c0 10-21.5 18-48 18S16 40 16 30z" fill="#00618A"/><ellipse cx="64" cy="30" rx="48" ry="18" fill="#00A4CC" opacity=".45"/><path d="M112 54c0 10-21.5 18-48 18S16 64 16 54" fill="none" stroke="#00A4CC" stroke-width="1.5" opacity=".3"/><path d="M112 76c0 10-21.5 18-48 18S16 86 16 76" fill="none" stroke="#00A4CC" stroke-width="1.5" opacity=".2"/></svg>`,

  /* ─── Python ─── Blue/yellow dual-snake logo */
  python: `<svg viewBox="0 0 128 128"><linearGradient id="pyg1" x1="70.252" y1="1237.476" x2="170.659" y2="1151.089" gradientUnits="userSpaceOnUse" gradientTransform="matrix(.563 0 0 -.568 -29.215 707.817)"><stop offset="0" stop-color="#5A9FD4"/><stop offset="1" stop-color="#306998"/></linearGradient><linearGradient id="pyg2" x1="209.474" y1="1098.811" x2="173.62" y2="1149.537" gradientUnits="userSpaceOnUse" gradientTransform="matrix(.563 0 0 -.568 -29.215 707.817)"><stop offset="0" stop-color="#FFD43B"/><stop offset="1" stop-color="#FFE873"/></linearGradient><path fill="url(#pyg1)" d="M63.4 2c-4.2 0-8.3.4-11.8 1-10.5 1.8-12.3 5.7-12.3 12.8v9.4h24.7v3.1H30c-7.2 0-13.5 4.3-15.4 12.5-2.3 9.4-2.4 15.3 0 25.1 1.8 7.3 5.9 12.5 13.1 12.5h8.5V67.2c0-8.2 7.1-15.3 15.4-15.3h24.7c6.9 0 12.3-5.7 12.3-12.5V15.8c0-6.7-5.6-11.7-12.3-12.8C72.1 2.3 67.7 2 63.4 2zM50 9.6c2.6 0 4.6 2.1 4.6 4.7s-2.1 4.7-4.6 4.7c-2.6 0-4.6-2.1-4.6-4.7s2.1-4.7 4.6-4.7z"/><path fill="url(#pyg2)" d="M91.7 28.4v11c0 8.5-7.2 15.7-15.4 15.7H51.6c-6.8 0-12.3 5.8-12.3 12.5v23.5c0 6.7 5.8 10.6 12.3 12.5 7.8 2.3 15.3 2.7 24.7 0 6.2-1.8 12.3-5.4 12.3-12.5v-9.4H64v-3.1h37c7.2 0 9.9-5 12.3-12.5 2.6-7.7 2.5-15.2 0-25.1-1.8-7.1-5.2-12.5-12.3-12.5H91.7zM77.8 87.9c2.6 0 4.6 2.1 4.6 4.7s-2.1 4.7-4.6 4.7c-2.6 0-4.6-2.1-4.6-4.7s2.1-4.7 4.6-4.7z"/></svg>`,

  /* ─── React ─── Atom orbits in cyan */
  react: `<svg viewBox="0 0 128 128"><g fill="#61DAFB"><circle cx="64" cy="64" r="11.4"/><path d="M107.3 45.2c-2.2-.8-4.5-1.6-6.9-2.3.6-2.4 1.1-4.8 1.5-7.1 2.1-13.2-.2-22.5-6.6-26.1-1.9-1.1-4-1.6-6.4-1.6-7 0-15.9 5.2-24.9 13.9-9-8.7-17.9-13.9-24.9-13.9-2.4 0-4.5.5-6.4 1.6-6.4 3.7-8.7 13-6.6 26.1.4 2.3.9 4.7 1.5 7.1-2.4.7-4.7 1.4-6.9 2.3C8.2 50 1.4 56.6 1.4 64s6.9 14 19.3 18.8c2.2.8 4.5 1.6 6.9 2.3-.6 2.4-1.1 4.8-1.5 7.1-2.1 13.2.2 22.5 6.6 26.1 1.9 1.1 4 1.6 6.4 1.6 7.1 0 16-5.2 24.9-13.9 9 8.7 17.9 13.9 24.9 13.9 2.4 0 4.5-.5 6.4-1.6 6.4-3.7 8.7-13 6.6-26.1-.4-2.3-.9-4.7-1.5-7.1 2.4-.7 4.7-1.4 6.9-2.3 12.5-4.8 19.3-11.4 19.3-18.8s-6.8-14-19.3-18.8zM92.5 14.7c4.1 2.4 5.5 9.8 3.8 20.3-.3 2.1-.8 4.3-1.4 6.6-5.2-1.2-10.7-2-16.5-2.5-3.4-4.8-6.9-9.1-10.4-13 7.4-7.3 14.9-12.3 21-12.3 1.3 0 2.5.3 3.5.9zM81.3 74c-1.8 3.2-3.9 6.4-6.1 9.6-3.7.3-7.4.4-11.2.4-3.9 0-7.6-.1-11.2-.4-2.2-3.2-4.2-6.4-6-9.6-1.9-3.3-3.7-6.7-5.3-10 1.6-3.3 3.4-6.7 5.3-10 1.8-3.2 3.9-6.4 6.1-9.6 3.7-.3 7.4-.4 11.2-.4 3.9 0 7.6.1 11.2.4 2.2 3.2 4.2 6.4 6 9.6 1.9 3.3 3.7 6.7 5.3 10-1.7 3.3-3.4 6.6-5.3 10zm8.3-3.3c1.5 3.5 2.7 6.9 3.8 10.3-3.4.8-7 1.4-10.8 1.9 1.2-1.9 2.5-3.9 3.6-6 1.2-2.1 2.3-4.2 3.4-6.2zM64 97.8c-2.4-2.6-4.7-5.4-6.9-8.3 2.3.1 4.6.2 6.9.2s4.6-.1 6.9-.2c-2.2 2.9-4.5 5.7-6.9 8.3zm-18.6-15c-3.8-.5-7.4-1.1-10.8-1.9 1.1-3.3 2.3-6.8 3.8-10.3 1.1 2 2.2 4.1 3.4 6.1 1.2 2.2 2.4 4.1 3.6 6.1zm-7-25.5c-1.5-3.5-2.7-6.9-3.8-10.3 3.4-.8 7-1.4 10.8-1.9-1.2 1.9-2.5 3.9-3.6 6-1.2 2.1-2.3 4.2-3.4 6.2zM64 30.2c2.4 2.6 4.7 5.4 6.9 8.3-2.3-.1-4.6-.2-6.9-.2s-4.6.1-6.9.2c2.2-2.9 4.5-5.7 6.9-8.3zm22.2 21l-3.6-6c3.8.5 7.4 1.1 10.8 1.9-1.1 3.3-2.3 6.8-3.8 10.3-1.1-2-2.2-4.1-3.4-6.2zM31.7 35c-1.7-10.5-.3-17.9 3.8-20.3 1-.6 2.2-.9 3.5-.9 6 0 13.5 4.9 21 12.3-3.5 3.8-7 8.2-10.4 13-5.8.5-11.3 1.4-16.5 2.5-.6-2.3-1-4.5-1.4-6.6zM7 64c0-4.7 5.7-9.7 15.7-13.4 2-.8 4.2-1.5 6.4-2.1 1.6 5 3.6 10.3 6 15.6-2.4 5.3-4.5 10.5-6 15.5C15.3 75.6 7 69.6 7 64zm28.5 49.3c-4.1-2.4-5.5-9.8-3.8-20.3.3-2.1.8-4.3 1.4-6.6 5.2 1.2 10.7 2 16.5 2.5 3.4 4.8 6.9 9.1 10.4 13-7.4 7.3-14.9 12.3-21 12.3-1.3 0-2.5-.3-3.5-.9zM96.3 93c1.7 10.5.3 17.9-3.8 20.3-1 .6-2.2.9-3.5.9-6 0-13.5-4.9-21-12.3 3.5-3.8 7-8.2 10.4-13 5.8-.5 11.3-1.4 16.5-2.5.6 2.3 1 4.5 1.4 6.6zm9.5-14.9c-2 .8-4.2 1.5-6.4 2.1-1.6-5-3.6-10.3-6-15.6 2.4-5.3 4.5-10.5 6-15.5 13.8 4 22.1 10 22.1 15.6-.1 4.7-5.8 9.7-15.7 13.4z"/></g></svg>`,

  /* ─── Next.js ─── Black circle with Vercel N mark + stroke for dark-bg visibility */
  nextjs: `<svg viewBox="0 0 128 128"><circle cx="64" cy="64" r="62" fill="#000" stroke="#444" stroke-width="1.5"/><path d="M106.3 112.4L49.5 36H36v56h10.7V48.7l52.3 70.4c3-2 5.7-4.3 8.3-6.8z" fill="url(#nxa)"/><rect x="80" y="36" width="11" height="56" fill="url(#nxb)"/><defs><linearGradient id="nxa" x1="53" y1="54" x2="94" y2="107" gradientUnits="userSpaceOnUse"><stop stop-color="#fff"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient><linearGradient id="nxb" x1="85.5" y1="36" x2="85.5" y2="85" gradientUnits="userSpaceOnUse"><stop stop-color="#fff"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient></defs></svg>`,

  /* ─── TailwindCSS ─── Wind/wave in sky blue */
  tailwind: `<svg viewBox="0 0 128 128"><path d="M64 25.6c-17.1 0-27.7 8.5-32 25.6 6.4-8.5 13.9-11.7 22.4-9.6 4.9 1.2 8.4 4.7 12.2 8.7 6.3 6.4 13.5 13.7 29.4 13.7 17.1 0 27.7-8.5 32-25.6-6.4 8.5-13.9 11.7-22.4 9.6-4.9-1.2-8.3-4.7-12.2-8.7C87.1 32.9 79.9 25.6 64 25.6zM32 64c-17.1 0-27.7 8.5-32 25.6 6.4-8.5 13.9-11.7 22.4-9.6 4.9 1.2 8.4 4.7 12.2 8.7C40.9 95.1 48.1 102.4 64 102.4c17.1 0 27.7-8.5 32-25.6-6.4 8.5-13.9 11.7-22.4 9.6-4.9-1.2-8.3-4.7-12.2-8.7C55.1 71.4 47.9 64 32 64z" fill="#06B6D4"/></svg>`,

  /* ─── shadcn/ui ─── Diagonal lines on dark bg */
  shadcn: `<svg viewBox="0 0 128 128"><rect width="128" height="128" rx="12" fill="#18181B"/><path d="M96 32L56 96" stroke="white" stroke-width="8" stroke-linecap="round"/><path d="M72 32L32 96" stroke="white" stroke-width="8" stroke-linecap="round" opacity=".5"/></svg>`,

  /* ─── Zustand ─── Cute bear face (official branding is a bear) */
  zustand: `<svg viewBox="0 0 128 128"><rect width="128" height="128" rx="16" fill="#433E38"/><circle cx="38" cy="32" r="14" fill="#59473A"/><circle cx="90" cy="32" r="14" fill="#59473A"/><circle cx="38" cy="32" r="8" fill="#7A6454"/><circle cx="90" cy="32" r="8" fill="#7A6454"/><circle cx="64" cy="68" r="36" fill="#59473A"/><circle cx="50" cy="58" r="5" fill="#1B1610"/><circle cx="78" cy="58" r="5" fill="#1B1610"/><circle cx="52" cy="56" r="1.8" fill="#fff"/><circle cx="80" cy="56" r="1.8" fill="#fff"/><ellipse cx="64" cy="78" rx="14" ry="11" fill="#7A6454"/><ellipse cx="64" cy="73" rx="4.5" ry="3" fill="#1B1610"/><path d="M58 78q6 7 12 0" stroke="#1B1610" stroke-width="1.8" fill="none" stroke-linecap="round"/></svg>`,

  /* ─── TanStack Query ─── Three orbital ellipses (atom design) on dark navy */
  tanstack: `<svg viewBox="0 0 128 128"><rect width="128" height="128" rx="16" fill="#002C4B"/><g fill="none" stroke="#FF4154" stroke-width="4"><ellipse cx="64" cy="64" rx="44" ry="16" transform="rotate(-30 64 64)"/><ellipse cx="64" cy="64" rx="44" ry="16" transform="rotate(30 64 64)"/><ellipse cx="64" cy="64" rx="44" ry="16" transform="rotate(90 64 64)"/></g><circle cx="64" cy="64" r="7" fill="#FF4154"/></svg>`,

  /* ─── Node.js ─── Green hexagon (the iconic shape) */
  nodejs: `<svg viewBox="0 0 128 128"><path fill="#43853D" d="M64 2c-2.3 0-4.5.6-6.5 1.7L18.9 28.4c-4 2.3-6.5 6.6-6.5 11.2v49.4c0 4.6 2.5 8.9 6.5 11.2l38.6 22.3c2 1.2 4.2 1.7 6.5 1.7s4.5-.5 6.5-1.7l38.6-22.3c4-2.3 6.5-6.6 6.5-11.2V39.6c0-4.6-2.5-8.9-6.5-11.2L70.5 5.4A13 13 0 0064 2z"/><path fill="#fff" opacity=".15" d="M64 18c-1.4 0-2.7.3-3.9 1L30.8 36c-2.4 1.4-3.9 4-3.9 6.7v34.6c0 2.7 1.5 5.3 3.9 6.7l29.3 16.9c2.4 1.4 5.4 1.4 7.8 0l29.3-16.9c2.4-1.4 3.9-4 3.9-6.7V42.7c0-2.8-1.5-5.3-3.9-6.7L67.9 19A7.8 7.8 0 0064 18z"/></svg>`,

  /* ─── Express.js ─── Geometric "EX" letterforms on dark bg */
  express: `<svg viewBox="0 0 128 128"><rect width="128" height="128" rx="14" fill="#303030"/><rect x="22" y="40" width="10" height="48" fill="#fff"/><rect x="22" y="40" width="26" height="8" fill="#fff"/><rect x="22" y="60" width="22" height="8" fill="#fff"/><rect x="22" y="80" width="26" height="8" fill="#fff"/><line x1="64" y1="42" x2="102" y2="86" stroke="#fff" stroke-width="9" stroke-linecap="round"/><line x1="102" y1="42" x2="64" y2="86" stroke="#fff" stroke-width="9" stroke-linecap="round"/></svg>`,

  /* ─── FastAPI ─── Teal circle with lightning bolt */
  fastapi: `<svg viewBox="0 0 128 128"><circle cx="64" cy="64" r="60" fill="#009688"/><path d="M68 20L36 72h32L60 108l60-56H88L68 20z" fill="white"/></svg>`,

  /* ─── MongoDB ─── Green leaf */
  mongodb: `<svg viewBox="0 0 128 128"><path fill="#439934" d="M88 42.5C78.8 27.3 67.4 2.6 64.3.1c0 5.7-1.1 10.7-4.1 15-7.2 10.7-15.5 20.4-21.5 32.5-5.5 11.2-5.9 22.1-1 33.5 3.2 7.4 8.7 13 15.8 17.2 1.4 1.5-1.1 6.8-1.2 7.4-.3 1.4.1 2 1.5 2.4 6.3 1.7 13.1 2.3 19.3.6 1.4-.4 1.8-1 1.5-2.4-.2-1.1-1.4-6.2.2-7.4 7.1-4.2 12.6-9.8 15.8-17.2 4.9-11.4 4.5-22.3-1-33.5l-.6 0z"/><path fill="#41A247" d="M64 127c0-.1 2.5-8.2 2.5-8.2-5.9-1.7-11.4-4.5-15.5-9.2-5.2-6-7.6-12.9-7.5-20.9.3-13.5 5.5-24.7 13.2-35.1 1-1.4 2.1-2.7 3.3-4.2l4 77.5z"/></svg>`,

  /* ─── Machine Learning ─── Neural network nodes on orange bg */
  tensorflow: `<svg viewBox="0 0 128 128"><rect width="128" height="128" rx="16" fill="#FF6F00"/><g fill="none" stroke="#fff" stroke-width="2.5"><line x1="40" y1="36" x2="64" y2="56"/><line x1="88" y1="36" x2="64" y2="56"/><line x1="40" y1="92" x2="64" y2="72"/><line x1="88" y1="92" x2="64" y2="72"/><line x1="40" y1="36" x2="40" y2="92"/><line x1="88" y1="36" x2="88" y2="92"/></g><circle cx="40" cy="36" r="8" fill="#fff"/><circle cx="88" cy="36" r="8" fill="#fff"/><circle cx="64" cy="56" r="8" fill="#fff"/><circle cx="64" cy="72" r="8" fill="#fff"/><circle cx="40" cy="92" r="8" fill="#fff"/><circle cx="88" cy="92" r="8" fill="#fff"/><circle cx="40" cy="36" r="4" fill="#FF6F00"/><circle cx="88" cy="36" r="4" fill="#FF6F00"/><circle cx="64" cy="56" r="4" fill="#FF6F00"/><circle cx="64" cy="72" r="4" fill="#FF6F00"/><circle cx="40" cy="92" r="4" fill="#FF6F00"/><circle cx="88" cy="92" r="4" fill="#FF6F00"/></svg>`,

  /* ─── Cypress ─── Green "C" target on dark bg */
  cypress: `<svg viewBox="0 0 128 128"><circle cx="64" cy="64" r="60" fill="#1B1E2E"/><circle cx="64" cy="64" r="40" fill="none" stroke="#69D3A7" stroke-width="4"/><path d="M88 48c-6-6-14-10-24-10-18 0-32 14-32 32s14 32 32 32c10 0 18-4 24-10" fill="none" stroke="#69D3A7" stroke-width="6" stroke-linecap="round"/><circle cx="64" cy="64" r="6" fill="#69D3A7"/></svg>`,

  /* ─── Playwright ─── Two stylized figures (red + green) */
  playwright: `<svg viewBox="0 0 128 128"><rect width="128" height="128" rx="16" fill="#2D4552"/><circle cx="44" cy="34" r="11" fill="#E2574C"/><rect x="33" y="48" width="22" height="38" rx="6" fill="#E2574C"/><circle cx="84" cy="34" r="11" fill="#45BA4B"/><rect x="73" y="48" width="22" height="38" rx="6" fill="#45BA4B"/></svg>`,

  /* ─── Selenium ─── Green circle with "Se" */
  selenium: `<svg viewBox="0 0 128 128"><circle cx="64" cy="64" r="60" fill="#43B02A"/><g fill="#fff" font-family="Arial,Helvetica,sans-serif" font-weight="bold"><text x="64" y="76" text-anchor="middle" font-size="40">Se</text></g></svg>`,
};

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Languages",
    skills: [
      { name: "JavaScript", color: "#f7df1e", svg: ICONS.javascript },
      { name: "Java", color: "#0074BD", svg: ICONS.java },
      { name: "HTML5", color: "#E44D26", svg: ICONS.html5 },
      { name: "CSS3", color: "#1572B6", svg: ICONS.css3 },
      { name: "SQL", color: "#00618A", svg: ICONS.sql },
      { name: "Python", color: "#3776AB", svg: ICONS.python },
    ],
  },
  {
    title: "Frontend",
    skills: [
      { name: "React.js", color: "#61DAFB", svg: ICONS.react },
      { name: "Next.js", color: "#ffffff", svg: ICONS.nextjs },
      { name: "TailwindCSS", color: "#38BDF8", svg: ICONS.tailwind },
      { name: "shadcn/ui", color: "#ffffff", svg: ICONS.shadcn },
      { name: "Zustand", color: "#FF6B35", svg: ICONS.zustand },
      { name: "TanStack Query", color: "#EF4444", svg: ICONS.tanstack },
    ],
  },
  {
    title: "Backend & APIs",
    skills: [
      { name: "Node.js", color: "#83CD29", svg: ICONS.nodejs },
      { name: "Express.js", color: "#ffffff", svg: ICONS.express },
      { name: "FastAPI", color: "#009688", svg: ICONS.fastapi },
    ],
  },
  {
    title: "Database",
    skills: [
      { name: "MongoDB", color: "#439934", svg: ICONS.mongodb },
    ],
  },
  {
    title: "AI / ML & Testing",
    skills: [
      { name: "Machine Learning", color: "#FF6F00", svg: ICONS.tensorflow },
      { name: "Cypress", color: "#00BFA5", svg: ICONS.cypress },
      { name: "E2E Testing", color: "#2EAD33", svg: ICONS.playwright },
      { name: "QA Automation", color: "#43B02A", svg: ICONS.selenium },
    ],
  },
];

function SkillCategoryRow({ category, index }: { category: SkillCategory; index: number }) {
  const rowRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(rowRef, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={rowRef}
      className="skill-category-row"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="skill-category-inner">
        {/* Left: subheading */}
        <div className="skill-category-title">{category.title}</div>

        {/* Right: skill pills with icons */}
        <div className="skill-items-list">
          {category.skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              className="skill-item"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.35, delay: index * 0.08 + i * 0.04 + 0.15, ease: [0.22, 1, 0.36, 1] }}
              style={{ "--skill-color": skill.color } as React.CSSProperties}
            >
              <span
                className="skill-icon-svg"
                dangerouslySetInnerHTML={{ __html: skill.svg }}
                aria-hidden="true"
              />
              <span className="skill-name">{skill.name}</span>
            </motion.div>
          ))}
        </div>
      </div>

    </motion.div>
  );
}

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      id="skills"
      className="projects-section skills-section"
      aria-label="Skills"
      ref={sectionRef}
    >
      {/* Top label */}
      <div className="projects-label-row">
        <span className="projects-label">// SKILLS</span>
      </div>

      {/* Skills list */}
      <div className="skills-list">
        {SKILL_CATEGORIES.map((cat, i) => (
          <SkillCategoryRow key={cat.title} category={cat} index={i} />
        ))}
      </div>
    </section>
  );
}
