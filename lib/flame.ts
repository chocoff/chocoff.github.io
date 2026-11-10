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

const KEY = "choco:kindled";

let phase: Phase = "dormant";
let kindledAt = 0;
let litAt = 0;

/** Set by the GPU renderer once its first frame is on screen. */
export const gpu = { ready: false, failed: false };

/** Vertical position of the fire's base as a fraction of viewport height.
 *  Centered while dormant, then it settles low so the name can rise above it. */
export const BASE_DORMANT = 0.56;
export const BASE_LIT = 0.9;
/** On narrow screens the bottom tab bar takes the last ~64px. */
const baseLit = () => (typeof window !== "undefined" && window.innerWidth < 900 ? 0.8 : BASE_LIT);
const SETTLE_MS = 1400;

export function fireBaseFrac(now = performance.now()): number {
  if (phase !== "lit") return BASE_DORMANT;
  if (litAt === 0) return baseLit();
  const t = Math.min(1, (now - litAt) / SETTLE_MS);
  const e = 1 - Math.pow(1 - t, 4);
  return BASE_DORMANT + (baseLit() - BASE_DORMANT) * e;
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
  remember();
  window.setTimeout(() => set("lit"), duration);
}

/** Skip straight to the lit page (skip link, reduced motion, return visits). */
export function lightImmediately() {
  kindledAt = 0;
  litAt = 0;
  remember();
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

export function hasKindledBefore(): boolean {
  try {
    return window.localStorage.getItem(KEY) === "1";
  } catch {
    return false;
  }
}

function remember() {
  try {
    window.localStorage.setItem(KEY, "1");
    window.sessionStorage.setItem(KEY, "1");
  } catch {
    /* storage unavailable: the intro simply plays again next time */
  }
}
