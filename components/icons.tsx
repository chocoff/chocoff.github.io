import type { SVGProps } from "react";

/** One drawn family: 24px grid, 1.5 stroke, round joins. */
type P = SVGProps<SVGSVGElement>;
const base = {
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export const MailIcon = (p: P) => (
  <svg {...base} {...p}><rect x="3" y="5.5" width="18" height="13" rx="1.5" /><path d="m3.5 7 8.5 6.5L20.5 7" /></svg>
);
export const ChatIcon = (p: P) => (
  <svg {...base} {...p}><path d="M4.5 19.5 6 15.6A7.5 7.5 0 1 1 9 18.6z" /><path d="M9.2 9.4c.3 2 2.4 4.3 4.6 4.8l1-1.2 1.6.8" /></svg>
);
export const DownloadIcon = (p: P) => (
  <svg {...base} {...p}><path d="M12 4v11" /><path d="m7.5 10.5 4.5 4.5 4.5-4.5" /><path d="M5 19.5h14" /></svg>
);
export const ArrowOutIcon = (p: P) => (
  <svg {...base} {...p}><path d="M8 16 16 8" /><path d="M9.5 8H16v6.5" /></svg>
);
export const CopyIcon = (p: P) => (
  <svg {...base} {...p}><rect x="8.5" y="8.5" width="11" height="11" rx="1.5" /><path d="M15.5 8.5V6A1.5 1.5 0 0 0 14 4.5H6A1.5 1.5 0 0 0 4.5 6v8A1.5 1.5 0 0 0 6 15.5h2.5" /></svg>
);
export const CheckIcon = (p: P) => (
  <svg {...base} {...p}><path d="m5 12.5 4.5 4.5L19 7.5" /></svg>
);

/* ---- Brand marks: filled, drawn to their own official shapes. ---------------- */

const brand = { width: 24, height: 24, viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": true } as const;

export const LinkedInIcon = (p: P) => (
  <svg {...brand} {...p}><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" /></svg>
);
export const GitHubIcon = (p: P) => (
  <svg {...brand} {...p}><path d="M12 .3a12 12 0 0 0-3.8 23.38c.6.12.83-.26.83-.57L9 21.07c-3.34.72-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.08-.74.09-.73.09-.73 1.2.09 1.83 1.24 1.83 1.24 1.07 1.83 2.81 1.3 3.5 1 .1-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.14-.3-.54-1.52.1-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.28-1.55 3.29-1.23 3.29-1.23.64 1.66.24 2.88.12 3.18a4.65 4.65 0 0 1 1.23 3.22c0 4.61-2.8 5.63-5.48 5.92.42.36.81 1.1.81 2.22l-.01 3.29c0 .31.2.69.82.57A12 12 0 0 0 12 .3Z" /></svg>
);

/* ---- Sigils: the section marks. Drawn, not lettered. ---------------------- */

export const SigilFlame = (p: P) => (
  <svg {...base} {...p}><path d="M12 21c-3.6 0-6-2.4-6-5.6 0-3.6 3.2-5.2 3.6-9.4 2.2 1.4 3 3.4 2.8 5.2 1-.6 1.8-1.8 2-3.2 2 1.8 3.6 4.4 3.6 7.4 0 3.2-2.4 5.6-6 5.6Z" /><path d="M12 21c-1.4 0-2.4-1-2.4-2.4 0-1.6 1.4-2.4 2.4-4 1 1.6 2.4 2.4 2.4 4 0 1.4-1 2.4-2.4 2.4Z" /></svg>
);
export const SigilPath = (p: P) => (
  <svg {...base} {...p}><circle cx="5" cy="19" r="1.8" /><circle cx="12" cy="12" r="1.8" /><circle cx="19" cy="5" r="1.8" /><path d="M6.6 18c3-.6 1.4-4 3.8-5.2M13.6 11c2.4-1 .8-4.4 3.8-5" strokeDasharray="1.5 2.2" /></svg>
);
export const SigilAnvil = (p: P) => (
  <svg {...base} {...p}><path d="M3 8.5h13.5c0 2.4 2 3.6 4.5 3.6v-3.6" /><path d="M3 8.5c0 2.6 2.4 4 5.5 4h7" /><path d="M9.5 12.5 8.5 16h7l-1-3.5" /><path d="M6.5 19.5h11L15.5 16h-7z" /></svg>
);
export const SigilSeal = (p: P) => (
  <svg {...base} {...p}><circle cx="12" cy="9.5" r="5.5" /><circle cx="12" cy="9.5" r="2.6" /><path d="m8.6 13.8-1.6 6.7 2.6-1.4 1.4 2.4 1-5.5M15.4 13.8l1.6 6.7-2.6-1.4-1.4 2.4" /></svg>
);
export const SigilBook = (p: P) => (
  <svg {...base} {...p}><path d="M12 6.5c-2-1.6-5-2-8.5-1.5v13c3.5-.5 6.5-.1 8.5 1.5 2-1.6 5-2 8.5-1.5V5c-3.5-.5-6.5-.1-8.5 1.5Z" /><path d="M12 6.5v13" /><path d="m16 8.2.5 1.3 1.3.5-1.3.5-.5 1.3-.5-1.3-1.3-.5 1.3-.5z" /></svg>
);
export const SigilLantern = (p: P) => (
  <svg {...base} {...p}><path d="M9.5 4.5h5M12 2.5v2M8 7h8l-.5 11h-7z" /><path d="M7 18h10v2.5H7zM8 7l-1-1.5M16 7l1-1.5" /><path d="M12 10c1.2 1.2 1.6 2.2 1.6 3.2a1.6 1.6 0 0 1-3.2 0c0-1 .4-2 1.6-3.2Z" /></svg>
);
