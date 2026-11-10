"use client";

import { useEffect, useRef } from "react";
import { fireBaseFrac, getPhase, gpu, hydratePhase, kindleProgress, pointer, subscribe } from "@/lib/flame";

/**
 * The 2D layer. Always cheap, always first on screen:
 *  - dormant: a cluster of embers on charred logs, reacting to the cursor/finger
 *  - kindling: embers flare and loose sparks rise
 *  - lit: coals stay at the fire's base; a few motes drift up the page
 * It also draws a fallback flame whenever the GPU fire is not (yet) available.
 */

type Ember = {
  ox: number; oy: number; // offset from base, in units of R
  size: number;
  heat: number;
  phase: number;
  speed: number;
  dx: number; dy: number; // displacement from pointer
};

type Mote = {
  x: number; y: number; vx: number; vy: number;
  life: number; max: number; size: number; spark: boolean;
};

const EMBERS = 54;

function glowSprite(inner: string, mid: string): HTMLCanvasElement {
  const c = document.createElement("canvas");
  c.width = c.height = 64;
  const g = c.getContext("2d")!;
  const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0, inner);
  grad.addColorStop(0.18, mid);
  grad.addColorStop(0.5, "rgba(190,60,10,0.18)");
  grad.addColorStop(1, "rgba(120,30,0,0)");
  g.fillStyle = grad;
  g.fillRect(0, 0, 64, 64);
  return c;
}

function gauss() {
  let u = 0, v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

export default function EmberField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    hydratePhase();
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d", { alpha: true })!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const hot = glowSprite("rgba(255,244,214,1)", "rgba(255,170,70,0.85)");
    const warm = glowSprite("rgba(255,190,110,0.95)", "rgba(255,110,30,0.6)");

    let w = 0, h = 0, dpr = 1;
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const embers: Ember[] = Array.from({ length: EMBERS }, () => {
      const r = Math.abs(gauss()) * 0.42;
      const a = Math.random() * Math.PI * 2;
      return {
        ox: Math.cos(a) * r * 1.5,
        oy: Math.sin(a) * r * 0.42, // flattened: embers lie on the ground
        size: 0.8 + Math.random() * 2.4,
        heat: 0.25 + Math.random() * 0.75,
        phase: Math.random() * Math.PI * 2,
        speed: 0.6 + Math.random() * 2.2,
        dx: 0, dy: 0,
      };
    });
    const motes: Mote[] = [];

    const onMove = (e: PointerEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      pointer.active = true;
    };
    const onLeave = () => { pointer.active = false; };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    let raf = 0;
    let last = performance.now();
    let running = true;

    const drawLogs = (bx: number, by: number, R: number, light: number, t: number) => {
      // Three charred branches, crossed: round, tapered, lit from beneath.
      const logs: [number, number, number, number, number][] = [
        [-1.3, 0.2, 1.0, -0.02, 0.1],
        [1.25, 0.24, -0.95, -0.06, 0.092],
        [-0.25, 0.3, 0.5, -0.16, 0.07],
      ];
      ctx.lineCap = "round";
      for (const [x1, y1, x2, y2, th] of logs) {
        const ax = bx + x1 * R, ay = by + y1 * R, cx = bx + x2 * R, cy = by + y2 * R;
        const g = ctx.createLinearGradient(bx, by - R * 0.25, bx, by + R * 0.35);
        g.addColorStop(0, `rgb(${46 + 70 * light},${26 + 22 * light},${16 + 6 * light})`);
        g.addColorStop(0.55, "rgb(24,16,11)");
        g.addColorStop(1, "rgb(10,7,5)");
        ctx.strokeStyle = g;
        ctx.lineWidth = th * R * 2;
        ctx.beginPath();
        ctx.moveTo(ax, ay);
        ctx.lineTo(cx, cy);
        ctx.stroke();
        // smouldering seam along the underside
        ctx.globalCompositeOperation = "lighter";
        ctx.strokeStyle = `rgba(255,${90 + 40 * light},30,${0.08 + 0.3 * light * (0.75 + 0.25 * Math.sin(t * 1.3 + x1 * 4))})`;
        ctx.lineWidth = Math.max(1, th * R * 0.35);
        ctx.beginPath();
        ctx.moveTo(ax + (cx - ax) * 0.18, ay + (cy - ay) * 0.18 + th * R * 0.45);
        ctx.lineTo(ax + (cx - ax) * 0.82, ay + (cy - ay) * 0.82 + th * R * 0.45);
        ctx.stroke();
        ctx.globalCompositeOperation = "source-over";
      }
    };

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (!running) return;

      const phase = getPhase();
      const k = kindleProgress(now);
      const scrollY = phase === "lit" ? window.scrollY : 0;
      const bx = w / 2;
      const by = fireBaseFrac(now) * h - scrollY;
      const R = Math.min(w, h) * (w < 640 ? 0.2 : 0.13);
      const t = now / 1000;
      const baseVisible = by > -R * 2 && by < h + R;

      ctx.clearRect(0, 0, w, h);

      // Pointer as a small source of light (not on touch-only, not after lit).
      const pAct = pointer.active && phase !== "lit";
      if (pAct) {
        ctx.globalCompositeOperation = "lighter";
        ctx.globalAlpha = 0.16;
        ctx.drawImage(warm, pointer.x - 90, pointer.y - 90, 180, 180);
        // the cursor itself: a small live coal
        ctx.globalAlpha = 0.9;
        ctx.drawImage(hot, pointer.x - 9, pointer.y - 9, 18, 18);
        ctx.globalAlpha = 1;
        ctx.globalCompositeOperation = "source-over";
      }

      if (baseVisible) {
        // Ground light under the fire.
        const light = Math.min(1, 0.25 + k * 0.9);
        const pool = ctx.createRadialGradient(bx, by + R * 0.1, 0, bx, by + R * 0.1, R * (2.2 + k * 3));
        pool.addColorStop(0, `rgba(255,120,40,${0.1 + k * 0.22})`);
        pool.addColorStop(0.5, `rgba(140,50,15,${0.04 + k * 0.08})`);
        pool.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = pool;
        ctx.fillRect(0, 0, w, h);

        drawLogs(bx, by, R, light, t);

        ctx.globalCompositeOperation = "lighter";
        for (const e of embers) {
          let ex = bx + e.ox * R;
          let ey = by + e.oy * R;
          let boost = 0;
          if (pAct) {
            const ddx = ex - pointer.x, ddy = ey - pointer.y;
            const d = Math.hypot(ddx, ddy);
            const reach = 170;
            if (d < reach) {
              const f = 1 - d / reach;
              boost = f * f;
              e.dx += ((ddx / (d || 1)) * f * 7 - e.dx) * 0.08;
              e.dy += ((ddy / (d || 1)) * f * 4 - e.dy) * 0.08;
              if (!reduce && Math.random() < f * 0.05) spawnSpark(ex, ey, 0.6);
            }
          }
          e.dx *= 0.96; e.dy *= 0.96;
          ex += e.dx; ey += e.dy;
          const flick = 0.55 + 0.45 * Math.sin(t * e.speed + e.phase) * Math.sin(t * e.speed * 0.37 + e.phase * 2);
          const b = Math.min(1.4, e.heat * flick + boost * 0.9 + k * 0.8);
          const s = e.size * (4 + b * 5) * (w < 640 ? 0.9 : 1);
          ctx.globalAlpha = Math.min(1, 0.18 + b * 0.7);
          ctx.drawImage(b > 0.85 ? hot : warm, ex - s, ey - s, s * 2, s * 2);
        }
        ctx.globalAlpha = 1;
        ctx.globalCompositeOperation = "source-over";

        // Kindling: sparks rise from the heart of the fire.
        if (!reduce && phase === "kindling") {
          const rate = 2 + k * 10;
          for (let i = 0; i < rate; i++) if (Math.random() < 0.5) spawnSpark(bx + gauss() * R * 0.35, by - R * 0.05, 1 + k);
        }

        // Fallback flame while the GPU fire is missing.
        if (!reduce && !gpu.ready && phase !== "dormant") {
          const n = 3 + Math.round(k * 5);
          for (let i = 0; i < n; i++) {
            motes.push({
              x: bx + gauss() * R * 0.28, y: by - R * 0.05,
              vx: gauss() * 8, vy: -(60 + Math.random() * 90) * (0.6 + k),
              life: 0, max: 0.6 + Math.random() * 0.7, size: R * (0.18 + Math.random() * 0.22), spark: false,
            });
          }
        }
        // Occasional lazy spark once lit.
        if (!reduce && phase === "lit" && Math.random() < 0.05) spawnSpark(bx + gauss() * R * 0.3, by - R * 0.3, 0.42);
      }

      // Ambient motes across the page after the fire is lit.
      if (!reduce && phase === "lit" && motes.length < 260 && Math.random() < 0.05) {
        motes.push({
          x: Math.random() * w, y: h + 10, vx: gauss() * 6, vy: -(14 + Math.random() * 22),
          life: 0, max: 7 + Math.random() * 6, size: 0.8 + Math.random() * 1.4, spark: true,
        });
      }

      ctx.globalCompositeOperation = "lighter";
      for (let i = motes.length - 1; i >= 0; i--) {
        const m = motes[i];
        m.life += dt;
        if (m.life > m.max || m.y < -20) { motes.splice(i, 1); continue; }
        const r = m.life / m.max;
        m.vx += Math.sin(t * 1.7 + m.y * 0.02) * (m.spark ? 10 : 30) * dt;
        m.x += m.vx * dt;
        m.y += m.vy * dt;
        if (m.spark) {
          const s = m.size * 5 * (1 - r * 0.6);
          ctx.globalAlpha = Math.max(0, (1 - r) * 0.9);
          ctx.drawImage(hot, m.x - s, m.y - s, s * 2, s * 2);
        } else {
          const s = m.size * (1 - r * 0.7);
          ctx.globalAlpha = Math.max(0, (1 - r) * 0.38);
          ctx.drawImage(r < 0.35 ? hot : warm, m.x - s, m.y - s, s * 2, s * 2);
        }
      }
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";
    };

    function spawnSpark(x: number, y: number, power: number) {
      if (motes.length > 420) return;
      motes.push({
        x, y,
        vx: gauss() * 22 * power,
        vy: -(70 + Math.random() * 140) * power,
        life: 0, max: 0.9 + Math.random() * 1.6, size: 0.6 + Math.random() * 1.1, spark: true,
      });
    }

    if (reduce) {
      // One still frame, redrawn on resize.
      const still = () => { last = performance.now(); frame(last); cancelAnimationFrame(raf); };
      still();
      window.addEventListener("resize", still);
      window.addEventListener("scroll", still, { passive: true });
      const offPhase = subscribe(() => still());
      return () => {
        offPhase();
        window.removeEventListener("resize", still);
        window.removeEventListener("scroll", still);
        window.removeEventListener("resize", resize);
      };
    }

    raf = requestAnimationFrame(frame);
    const onVis = () => { running = !document.hidden; last = performance.now(); };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onMove);
      document.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return <canvas ref={ref} className="ember-field" aria-hidden="true" />;
}
