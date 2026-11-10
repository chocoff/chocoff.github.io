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

/** The small bonfire mark used on the path. */
export const BonfireMark = (p: P) => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true" {...p}>
    <path className="bf-flame" d="M20 31c-4.4 0-7-2.8-7-6.4 0-4.2 3.8-6 4.3-10.8 2.6 1.6 3.6 4 3.3 6.2 1.2-.7 2.1-2.1 2.4-3.8 2.4 2.1 4 5 4 8.4 0 3.6-2.6 6.4-7 6.4Z" />
    <path className="bf-logs" d="M8 34.5 32 29M32 34.5 8 29" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
