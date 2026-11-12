/**
 * Shared state for the bonfire: one tiny store that the intro,
 * the 2D ember field and the GPU fire all read.
 *
 * phase:  dormant  -> waiting in the dark
 *         kindling -> the click happened, fire is rising (~1.6s)
 *         lit      -> content revealed, fire burns in the hero
 */
export type Phase = "dormant" | "kindling" | "lit";

type Listener = (phase: Phase) => void;

let phase: Phase = "dormant";
let kindledAt = 0;
let litAt = 0;

/** Set by the GPU renderer once its first frame is on screen. */
export const gpu = { ready: false, failed: false };

/**
 * Where the bonfire stands on screen, shared by the 2D and GPU renderers.
 * x, y: the fire's base as fractions of the viewport. scale: size multiplier.
 * rot: rotation of the 3D model around its vertical axis, in radians.
 */
export type Stage = { x: number; y: number; scale: number; rot: number; visible: boolean };

/** Scroll progress values, written by FireStage on scroll. All 0..1. */
export const scroll = {
  /** About section rising into view. */
  aboutIn: 0,
  /** Progress through the pinned About section. */
  aboutPin: 0,
  /** About section leaving. */
  aboutOut: 0,
  /** Contact section arriving. */
  rest: 0,
  /** Bottom edge of the contact links, as a fraction of the viewport height. */
  restContent: -9,
  /** Bottom edge of the contact section (where the footer starts), as a fraction of the viewport height. */
  restBottom: 9,
};

/** The fire's radius in px at scale 1. Shared by the 2D and GPU renderers. */
export const baseRadius = (w: number, h: number) => Math.min(w, h) * (w < 640 ? 0.2 : 0.13);

/** How far the bonfire reaches from its base, in radii: up to the sword's tip, down to the front of the ash. */
const REACH_UP = 2.3;
const REACH_DOWN = 0.5;

const BASE_DORMANT = 0.58;
const SETTLE_MS = 1400;
const wide = () => typeof window !== "undefined" && window.innerWidth >= 900;
/** On narrow screens the bottom tab bar takes the last ~64px. */
const baseLit = () => (wide() ? 0.94 : 0.82);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const ease = (t: number) => t * t * (3 - 2 * t);

const out: Stage = { x: 0.5, y: BASE_DORMANT, scale: 1, rot: 0, visible: true };

export function stage(now = performance.now()): Stage {
  out.x = 0.5;
  out.scale = 1;
  out.visible = true;
  // A slow idle turn so the model is never completely still.
  const idle = now * 0.00006;

  if (phase !== "lit") {
    out.y = BASE_DORMANT;
    out.rot = idle;
    return out;
  }

  let y = baseLit();
  if (litAt !== 0) {
    const t = Math.min(1, (now - litAt) / SETTLE_MS);
    y = lerp(BASE_DORMANT, baseLit(), 1 - Math.pow(1 - t, 4));
  }

  const aIn = ease(scroll.aboutIn);
  const aOut = ease(scroll.aboutOut);
  const rest = ease(scroll.rest);

  if (wide()) {
    // Hero → About: the fire walks to the right and comes closer, turning as it goes.
    out.x = lerp(0.5, 0.74, aIn);
    out.scale = lerp(1, 1.55, aIn);
    y = lerp(y, 0.8, aIn) + aOut * 0.9;
  } else {
    // Narrow screens: a smaller fire that stays behind with the hero.
    out.scale = 0.72;
    y += scroll.aboutIn * 0.9;
  }
  out.rot = idle + aIn * 1.1 + scroll.aboutPin * Math.PI * 2 + aOut * 0.8;

  // Contact: it rises again at the centre for the close, and the whole fire
  // stays between the links and the footer: as the footer scrolls in, the
  // fire rises with the page, and it shrinks only if the gap is too small.
  if (rest > 0) {
    out.x = 0.5;
    const r1 = baseRadius(window.innerWidth, window.innerHeight) / window.innerHeight;
    const room = scroll.restBottom - scroll.restContent - 0.03;
    const scale = Math.max(0.45, Math.min(wide() ? 1.1 : 0.8, room / ((REACH_UP + REACH_DOWN) * r1)));
    out.scale = scale;
    y = Math.min(lerp(1.6, wide() ? 0.9 : 0.82, rest), scroll.restBottom - REACH_DOWN * r1 * scale);
    out.rot = idle + rest * Math.PI;
  }

  out.y = y;
  out.visible = y < 1.45;
  return out;
}

const listeners = new Set<Listener>();

/** Pointer in CSS pixels, viewport space. `active` is false until it moves. */
export const pointer = { x: 0, y: 0, active: false };

/** 0 → 1 over the kindling, read every frame by the renderers. */
export function kindleProgress(now = performance.now()): number {
  if (phase === "dormant") return 0;
  if (phase === "lit" && kindledAt === 0) return 1;
  return Math.min(1, (now - kindledAt) / KINDLE_MS);
}

export const KINDLE_MS = 1700;

export function getPhase(): Phase {
  return phase;
}

export function subscribe(fn: Listener): () => void {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

function set(next: Phase) {
  if (next === phase) return;
  phase = next;
  if (next === "lit") litAt = kindledAt === 0 ? 0 : performance.now();
  document.documentElement.dataset.phase = next;
  listeners.forEach((fn) => fn(next));
}

/** Start the kindling sequence; resolves the page to `lit` when it finishes. */
export function kindle(duration = KINDLE_MS) {
  if (phase !== "dormant") return;
  kindledAt = performance.now() - (KINDLE_MS - duration);
  set("kindling");
  window.setTimeout(() => set("lit"), duration);
}

/** Skip straight to the lit page (skip link, reduced motion, return visits). */
export function lightImmediately() {
  kindledAt = 0;
  litAt = 0;
  set("lit");
}

export function hydratePhase() {
  // Tells the pre-paint failsafe that the app is alive and the intro will work.
  document.documentElement.dataset.ready = "true";
  const initial = document.documentElement.dataset.phase;
  if (initial === "lit") {
    phase = "lit";
    kindledAt = 0;
    litAt = 0;
  }
}
