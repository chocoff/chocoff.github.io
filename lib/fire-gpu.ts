/**
 * The bonfire, on the GPU: a 3D model lit by the fire, plus Three.js WebGPU
 * TSL compute particles for the flames and sparks.
 * WebGPURenderer falls back to WebGL2 on its own where WebGPU is missing.
 * Loaded lazily after the first paint; the 2D ember field covers until it's ready.
 */
import * as THREE from "three/webgpu";
import {
  Fn, If, uniform, float, vec3, vec4, instancedArray, instanceIndex,
  hash, sin, mix, smoothstep, uv, select, varying, attribute,
} from "three/tsl";
import { getPhase, gpu, kindleProgress, pointer, stage, subscribe } from "./flame";
import { loadBonfire } from "./bonfire-model";

const FLAMES = 2600;
const SPARKS = 260;
const COUNT = FLAMES + SPARKS;
const SOOT = "#0c0a08";

export async function startFire(canvas: HTMLCanvasElement, opts: { hasModel: boolean }): Promise<() => void> {
  // Opaque, painted in the page's own soot. A transparent canvas with additive
  // glow leaves colour > alpha, which WebGPU compositing treats as undefined.
  const renderer = new THREE.WebGPURenderer({ canvas, antialias: false, alpha: false });
  renderer.setClearColor(new THREE.Color(SOOT), 1);
  await renderer.init();

  let w = window.innerWidth;
  let h = window.innerHeight;
  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-w / 2, w / 2, h / 2, -h / 2, -4000, 4000);

  // ---- uniforms -----------------------------------------------------------
  const uDt = uniform(0);
  const uTime = uniform(0);
  const uR = uniform(1); // fire radius in px
  const uBaseX = uniform(0); // world x of the fire base
  const uBaseY = uniform(0); // world y of the fire base
  const uIntensity = uniform(0); // 0 dormant → 1 lit (briefly >1 at the flare)
  const uSparks = uniform(0.25);
  // How tall the fire burns. Full during the kindling; lower once lit so the
  // plume stays beneath the hero's contact links.
  const uLift = uniform(1);
  const uPointer = uniform(new THREE.Vector3(9999, 9999, 0));

  // pos.xyz relative to base, pos.w = age; vel.xyz, vel.w = lifetime
  const pos = instancedArray(COUNT, "vec4");
  const vel = instancedArray(COUNT, "vec4");

  const isSpark = instanceIndex.lessThan(SPARKS);

  const respawn = () => {
    const p = pos.element(instanceIndex);
    const v = vel.element(instanceIndex);
    const seed = instanceIndex.toFloat().add(uTime.mul(61.7));
    const h1 = hash(seed);
    const h2 = hash(seed.add(13.1));
    const h3 = hash(seed.add(29.7));
    const h4 = hash(seed.add(47.3));
    const R = uR;

    If(isSpark, () => {
      p.assign(vec4(h1.sub(0.5).mul(R.mul(0.7)), h2.mul(R.mul(0.2)), 0, 0));
      v.assign(vec4(
        h3.sub(0.5).mul(R.mul(1.4)),
        R.mul(float(1.6).add(h4.mul(2.6))).mul(uIntensity.max(0.25)).mul(uLift),
        0,
        float(1.1).add(h2.mul(1.9)).mul(uLift),
      ));
    }).Else(() => {
      // Flames start in a flattened disc on the logs.
      // Triangular distribution: dense at the heart, thin at the edges.
      const spread = R.mul(0.5).mul(uIntensity.mul(0.5).add(0.5));
      const x = h1.add(h3).sub(1).mul(spread);
      p.assign(vec4(x, h2.mul(R.mul(0.1)), 0, 0));
      v.assign(vec4(
        h3.sub(0.5).mul(R.mul(0.3)),
        R.mul(float(0.8).add(h4.mul(1.1))).mul(uIntensity.mul(0.8).add(0.2)),
        0,
        // Flames at the edge die young; the heart burns tallest.
        float(0.55).add(h4.mul(0.65)).mul(float(1).sub(x.abs().div(R).mul(0.9))),
      ));
    });
  };

  const init = Fn(() => {
    respawn();
    // Stagger initial ages so the fire doesn't pulse in lockstep.
    const p = pos.element(instanceIndex);
    p.w.assign(hash(instanceIndex.toFloat().add(7.0)).mul(vel.element(instanceIndex).w));
  })().compute(COUNT);

  const update = Fn(() => {
    const p = pos.element(instanceIndex);
    const v = vel.element(instanceIndex);
    const dt = uDt;
    const R = uR;
    const age = p.w.add(dt);

    If(age.greaterThan(v.w), () => {
      respawn();
    }).Else(() => {
      p.w.assign(age);
      const fi = instanceIndex.toFloat();
      // Turbulence: two sines at different scales.
      const wob = sin(p.y.mul(0.035).add(uTime.mul(5.0)).add(fi.mul(0.13)))
        .add(sin(p.y.mul(0.011).sub(uTime.mul(2.3)).add(fi)).mul(0.6));

      If(isSpark, () => {
        v.x.addAssign(wob.mul(R.mul(0.9)).mul(dt));
        v.y.mulAssign(float(1).sub(dt.mul(0.4)));
      }).Else(() => {
        // Pull toward the axis so flames taper into tongues; buoyancy lifts them.
        v.x.addAssign(p.x.negate().mul(3.2).mul(dt));
        v.x.addAssign(wob.mul(R.mul(1.4)).mul(dt));
        v.x.mulAssign(float(1).sub(dt.mul(1.5)));
        v.y.addAssign(R.mul(1.5).mul(uLift).mul(dt));
      });

      // The pointer is heat: it pushes nearby flame and sparks aside.
      const world = vec3(p.x.add(uBaseX), p.y.add(uBaseY), 0);
      const d = world.sub(uPointer);
      const dist = d.length();
      If(dist.lessThan(160), () => {
        const f = float(1).sub(dist.div(160));
        v.xy.addAssign(d.xy.normalize().mul(f.mul(R.mul(5))).mul(dt));
      });

      p.xyz.addAssign(v.xyz.mul(dt));
    });
  })().compute(COUNT);

  // ---- material -------------------------------------------------------------
  const material = new THREE.SpriteNodeMaterial({
    transparent: true,
    depthWrite: false,
    depthTest: false,
    blending: THREE.AdditiveBlending,
  });

  // Render-side reads go through instanced attributes (works on WebGPU and WebGL2).
  const aPos = pos.toAttribute();
  const aVel = vel.toAttribute();
  const aSpark = attribute("sparkFlag", "float");
  const vLife = varying(aPos.w.div(aVel.w.max(0.001)).clamp(0, 1), "vLife");
  const vSpark = varying(aSpark, "vSpark");
  const sparkOn = aSpark.greaterThan(0.5);

  material.positionNode = vec3(aPos.x.add(uBaseX), aPos.y.add(uBaseY), 0);

  material.scaleNode = Fn(() => {
    const r = aPos.w.div(aVel.w.max(0.001)).clamp(0, 1);
    const flame = uR.mul(0.34).mul(float(1).sub(r.mul(0.75))).mul(uIntensity.mul(0.4).add(0.6));
    const spark = uR.mul(0.035).mul(float(1).sub(r.mul(0.5)));
    return select(sparkOn, spark, flame);
  })();

  material.colorNode = Fn(() => {
    const r = vLife;
    const core = vec3(1.0, 0.78, 0.42);
    const body = vec3(1.0, 0.38, 0.06);
    const tail = vec3(0.45, 0.07, 0.015);
    const flame = mix(mix(core, body, smoothstep(0.05, 0.35, r)), tail, smoothstep(0.4, 0.9, r));
    return mix(flame, vec3(1.0, 0.72, 0.36), vSpark);
  })();

  material.opacityNode = Fn(() => {
    const r = vLife;
    const c = uv().sub(0.5).length().mul(2);
    const disk = float(1).sub(c).clamp(0, 1).pow(1.7);
    const fadeIn = smoothstep(0.0, 0.2, r);
    const flameA = disk.mul(float(1).sub(r).pow(1.2)).mul(fadeIn).mul(0.07).mul(uIntensity);
    const sparkA = disk.mul(float(1).sub(r)).mul(uSparks).mul(1.6);
    return mix(flameA, sparkA, vSpark);
  })();

  const flags = new Float32Array(COUNT);
  flags.fill(1, 0, SPARKS);
  const geometry = new THREE.PlaneGeometry(1, 1);
  geometry.setAttribute("sparkFlag", new THREE.InstancedBufferAttribute(flags, 1));
  const sprites = new THREE.InstancedMesh(geometry, material, COUNT);
  sprites.frustumCulled = false;
  sprites.renderOrder = 2;
  scene.add(sprites);

  // ---- the bonfire itself -----------------------------------------------------
  // tilt (fixed, shows the top of the pile) > spin (scroll-driven) > model
  const tilt = new THREE.Group();
  tilt.rotation.x = 0.24;
  const spin = new THREE.Group();
  tilt.add(spin);
  scene.add(tilt);
  spin.add(await loadBonfire(opts.hasModel));

  const fireLight = new THREE.PointLight(0xff8a3c, 0, 0, 0);
  const fill = new THREE.HemisphereLight(0x6b5a4c, 0x120c08, 0.05);
  // A cool, faint light from behind and above: it draws the sword's edge out of the dark.
  const rim = new THREE.DirectionalLight(0x9fb2cc, 0);
  rim.position.set(-0.6, 0.9, -0.5);
  scene.add(fireLight, fill, rim);

  // ---- sizing ---------------------------------------------------------------
  let baseR = 1;
  const resize = () => {
    w = window.innerWidth;
    h = window.innerHeight;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setSize(w, h, false);
    camera.left = -w / 2; camera.right = w / 2; camera.top = h / 2; camera.bottom = -h / 2;
    camera.updateProjectionMatrix();
    baseR = Math.min(w, h) * (w < 640 ? 0.2 : 0.13);
  };
  resize();
  window.addEventListener("resize", resize);

  await renderer.computeAsync(init);

  // ---- loop -----------------------------------------------------------------
  let last = performance.now();
  let started = false;
  let looping = false;

  const loop = () => {
    const now = performance.now();
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;

    const phase = getPhase();
    const k = kindleProgress(now);
    const st = stage(now);
    const R = baseR * st.scale;
    const bx = st.x * w - w / 2;
    const by = h / 2 - st.y * h;
    uDt.value = dt;
    uTime.value = now / 1000;
    uR.value = R;
    uBaseX.value = bx;
    uBaseY.value = by;

    // Model: one unit of the model is 0.95 R on screen.
    tilt.position.set(bx, by - R * 0.16, 0);
    tilt.scale.setScalar(R * 0.95);
    spin.rotation.y = st.rot;

    // Ease up, overshoot into a flare around 70% of the kindling, then settle.
    const flare = Math.exp(-Math.pow((k - 0.72) / 0.16, 2)) * 0.45;
    uIntensity.value = phase === "dormant" ? 0 : Math.min(1, k * 1.25) + flare;
    uLift.value = phase === "lit" ? (w < 900 ? 0.36 : 0.38) : 1;
    uSparks.value = phase === "kindling" ? 0.5 + k * 0.8 : phase === "lit" ? 0.24 : 0;

    // The fire lights the model from just in front; it flickers.
    const t = now / 1000;
    const flicker = 0.82 + 0.12 * Math.sin(t * 11.3) + 0.06 * Math.sin(t * 23.7 + 1.3);
    const glow = phase === "dormant" ? 0.12 : Math.min(1, k * 1.2) + flare;
    fireLight.intensity = 7 * glow * flicker;
    fireLight.position.set(bx + Math.sin(t * 3.1) * R * 0.1, by + R * 0.7, R * 1.3);
    fill.intensity = 0.06 + 0.55 * Math.min(1, glow);
    rim.intensity = 0.15 + 0.9 * Math.min(1, glow);

    if (pointer.active) uPointer.value.set(pointer.x - w / 2, h / 2 - pointer.y, 0);
    else uPointer.value.set(9999, 9999, 0);

    renderer.compute(update);
    renderer.render(scene, camera);

    if (!started) {
      started = true;
      gpu.ready = true;
      canvas.dataset.ready = "true";
    }
  };

  const setLooping = (on: boolean) => {
    if (on === looping) return;
    looping = on;
    last = performance.now();
    // A paused canvas would keep its last frame (the fire at its old scroll
    // position) on screen; hide it until the loop draws again.
    canvas.style.visibility = on ? "visible" : "hidden";
    renderer.setAnimationLoop(on ? loop : null);
  };

  // Only burn while the fire can be seen.
  const check = () => {
    setLooping(!document.hidden && stage().visible);
  };
  check();
  // FireStage updates the scroll progress first; check on the next frame.
  const onScroll = () => requestAnimationFrame(check);
  window.addEventListener("scroll", onScroll, { passive: true });
  const offPhase = subscribe(check);
  document.addEventListener("visibilitychange", check);

  return () => {
    setLooping(false);
    window.removeEventListener("resize", resize);
    window.removeEventListener("scroll", onScroll);
    offPhase();
    document.removeEventListener("visibilitychange", check);
    gpu.ready = false;
    renderer.dispose();
  };
}
