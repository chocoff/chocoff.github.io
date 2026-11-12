/**
 * The bonfire as a 3D object.
 *
 * `public/models/bonfire.glb` (bones and a coiled sword, no textures) is loaded
 * when present; otherwise a bonfire is assembled from code. Either way:
 *  - every part is baked into one model space and merged by material, so the
 *    whole bonfire is three draw calls;
 *  - the ash mound is generated here at high resolution;
 *  - surfaces get procedural TSL materials: ash with living embers, bones
 *    charred toward the heart, and iron that glows where it meets the fire.
 * The result sits on y = 0, centred, about 2.4 units tall.
 */
import * as THREE from "three/webgpu";
import { float, mix, mx_fractal_noise_float, mx_noise_float, positionLocal, sin, smoothstep, time, uniform, vec2, vec3 } from "three/tsl";
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";

export const MODEL_URL = "/models/bonfire.glb";
const TARGET_HEIGHT = 2.4;

/** How strongly the bonfire burns: 0 dormant, 1 lit, a little above 1 at the flare. Set by the renderer. */
export const fireGlow = uniform(0.15);

/** Where the heat lives in model space, and the length scale used for surface detail. */
type Space = { core: THREE.Vector3; reach: number; unit: number; mound: Mound };
type Mound = { cx: number; cz: number; radius: number; height: number; y0: number };

export async function loadBonfire(useFile: boolean): Promise<THREE.Object3D> {
  if (useFile) {
    try {
      const [{ GLTFLoader }, { MeshoptDecoder }] = await Promise.all([
        import("three/addons/loaders/GLTFLoader.js"),
        import("three/addons/libs/meshopt_decoder.module.js"),
      ]);
      const loader = new GLTFLoader().setMeshoptDecoder(MeshoptDecoder);
      const gltf = await loader.loadAsync(MODEL_URL);
      return normalise(fromModel(gltf.scene));
    } catch (err) {
      if (process.env.NODE_ENV !== "production") console.warn("Bonfire model failed to load; using the built-in one.", err);
    }
  }
  return normalise(buildBonfire());
}

/* ---- assembling ------------------------------------------------------------- */

type Part = "bone" | "iron" | "ash" | "wood" | "stone";

/** Helpers that some exports carry along and that should never be drawn. */
const HIDE = /smoke|domain|emitter|^circle|sword[ _.]*\.?0\d+$/i;

const partOf = (name: string): Part | null => {
  if (/sword|blade|iron|metal/i.test(name)) return "iron";
  if (/ash|ground|dirt|cube/i.test(name)) return "ash";
  if (/bone|skull/i.test(name)) return "bone";
  if (/wood|log/i.test(name)) return "wood";
  return null;
};

/** Copy a mesh's geometry into plain float position/normal arrays, transformed into model space. */
function bake(mesh: THREE.Mesh): THREE.BufferGeometry {
  const src = mesh.geometry;
  const out = new THREE.BufferGeometry();
  for (const name of ["position", "normal"] as const) {
    const a = src.getAttribute(name);
    if (!a) continue;
    const arr = new Float32Array(a.count * 3);
    for (let i = 0; i < a.count; i++) {
      arr[i * 3] = a.getX(i);
      arr[i * 3 + 1] = a.getY(i);
      arr[i * 3 + 2] = a.getZ(i);
    }
    out.setAttribute(name, new THREE.BufferAttribute(arr, 3));
  }
  if (src.index) out.setIndex(Array.from(src.index.array as ArrayLike<number>));
  out.applyMatrix4(mesh.matrixWorld);
  if (!out.getAttribute("normal")) out.computeVertexNormals();
  return out;
}

/** Group a scene's meshes by part, baked into the scene's space. */
function collect(scene: THREE.Object3D, partFor: (mesh: THREE.Mesh) => Part | null) {
  scene.updateMatrixWorld(true);
  const parts = new Map<Part, THREE.BufferGeometry[]>();
  scene.traverse((o) => {
    const mesh = o as THREE.Mesh;
    if (!mesh.isMesh) return;
    const part = partFor(mesh);
    if (!part) return;
    const list = parts.get(part) ?? [];
    list.push(bake(mesh));
    parts.set(part, list);
  });
  return parts;
}

function assemble(parts: Map<Part, THREE.BufferGeometry[]>, space: Space): THREE.Group {
  const mats = materials(space);
  const g = new THREE.Group();
  for (const [part, geos] of parts) {
    const merged = geos.length === 1 ? geos[0] : mergeGeometries(geos, false);
    if (!merged) continue;
    const mesh = new THREE.Mesh(merged, mats[part]);
    mesh.name = part;
    g.add(mesh);
    if (geos.length > 1) geos.forEach((geo) => geo.dispose());
  }
  return g;
}

/** The downloaded model: bones and sword kept, its coarse ash replaced by a generated mound. */
function fromModel(scene: THREE.Object3D): THREE.Group {
  const found: { ash?: THREE.Box3 } = {};
  const parts = collect(scene, (mesh) => {
    const matName = (mesh.material as THREE.Material | undefined)?.name ?? "";
    if (HIDE.test(mesh.name) || HIDE.test(matName)) return null;
    const part = partOf(matName) ?? partOf(mesh.name) ?? "bone";
    if (part === "ash") {
      found.ash = new THREE.Box3().setFromObject(mesh);
      return null;
    }
    return part;
  });

  // Fit the mound to the original ash, or to the bones when there was none.
  const box = found.ash ?? new THREE.Box3().setFromBufferAttribute(
    (parts.get("bone")?.[0] ?? new THREE.BoxGeometry()).getAttribute("position") as THREE.BufferAttribute,
  );
  const size = box.getSize(new THREE.Vector3());
  const c = box.getCenter(new THREE.Vector3());
  const mound: Mound = { cx: c.x, cz: c.z, radius: Math.max(size.x, size.z) * 0.5, height: size.y * 0.42, y0: box.min.y + size.y * 0.08 };
  parts.set("ash", [moundGeometry(mound, 11)]);

  return assemble(parts, {
    core: new THREE.Vector3(c.x, box.min.y + size.y * 0.42, c.z),
    reach: mound.radius * 1.05,
    unit: mound.radius / 3.3,
    mound,
  });
}

/* ---- the generated mound ------------------------------------------------------ */

/** Smooth 2D value noise with a few octaves. Deterministic, so the pile is the same on every visit. */
function fbm(x: number, y: number, seed: number): number {
  const hash = (i: number, j: number) => {
    const s = Math.sin(i * 127.1 + j * 311.7 + seed * 74.7) * 43758.5453;
    return s - Math.floor(s);
  };
  const noise = (px: number, py: number) => {
    const i = Math.floor(px), j = Math.floor(py);
    const fx = px - i, fy = py - j;
    const u = fx * fx * (3 - 2 * fx), v = fy * fy * (3 - 2 * fy);
    const a = hash(i, j), b = hash(i + 1, j), c = hash(i, j + 1), d = hash(i + 1, j + 1);
    return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
  };
  let sum = 0, amp = 0.5, f = 1;
  for (let o = 0; o < 4; o++) {
    sum += noise(x * f, y * f) * amp;
    f *= 2.1;
    amp *= 0.5;
  }
  return sum - 0.47;
}

/** A low, lumpy dome whose rim fades into the dark. */
function moundGeometry(m: Mound, seed: number): THREE.BufferGeometry {
  const RINGS = 44;
  const SEGS = 112;
  const SKIRT = 1.08; // a short lip past the dome, sunk below the ground line
  const pos: number[] = [];
  const idx: number[] = [];
  const heightAt = (x: number, z: number, t: number) => {
    const dome = t < 1 ? Math.pow(1 - t * t, 0.85) : -1.5 * (t - 1);
    const n = fbm(x / m.radius * 2.6 + 3, z / m.radius * 2.6 + 7, seed);
    const lumps = n * 0.34 * (1 - Math.min(1, t) * 0.55);
    return m.y0 + m.height * Math.max(-0.06, dome + lumps);
  };
  pos.push(m.cx, heightAt(0, 0, 0), m.cz);
  for (let i = 1; i <= RINGS; i++) {
    const t = Math.pow(i / RINGS, 1.15) * SKIRT;
    for (let j = 0; j < SEGS; j++) {
      const a = (j / SEGS) * Math.PI * 2;
      const wob = 1 + 0.07 * Math.sin(a * 3 + 1.1) + 0.04 * Math.sin(a * 7 + 2.3);
      const r = t * m.radius * wob;
      const x = Math.cos(a) * r, z = Math.sin(a) * r;
      pos.push(m.cx + x, heightAt(x, z, t), m.cz + z);
    }
  }
  for (let j = 0; j < SEGS; j++) idx.push(0, 1 + ((j + 1) % SEGS), 1 + j);
  for (let i = 1; i < RINGS; i++) {
    const a0 = 1 + (i - 1) * SEGS, a1 = 1 + i * SEGS;
    for (let j = 0; j < SEGS; j++) {
      const j1 = (j + 1) % SEGS;
      idx.push(a0 + j, a0 + j1, a1 + j, a0 + j1, a1 + j1, a1 + j);
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
  g.setIndex(idx);
  g.computeVertexNormals();
  return g;
}

/* ---- materials -------------------------------------------------------------- */

/** Colours are linear, not sRGB. */
const SOOT = vec3(0.004, 0.003, 0.0025);
const EMBER = vec3(1.0, 0.26, 0.035);
const HOT = vec3(1.0, 0.55, 0.18);

function materials(s: Space): Record<Part, THREE.Material> {
  const p = positionLocal;
  const q = p.div(s.unit);
  const core = vec3(s.core.x, s.core.y, s.core.z);
  // 1 at the heart of the fire, falling to 0 at its reach.
  const heat = float(1).sub(p.sub(core).length().div(s.reach)).clamp(0, 1);
  const flicker = sin(time.mul(11.3)).mul(0.1).add(sin(time.mul(23.7).add(1.3)).mul(0.06)).add(0.84);
  const glow = fireGlow.mul(flicker);

  // Ash: grey dust with drifting cells of live coal toward the middle.
  const ashN = mx_fractal_noise_float(q.mul(1.3), 4, 2, 0.5, 1).mul(0.5).add(0.5);
  const fromCentre = p.xz.sub(vec2(s.mound.cx, s.mound.cz)).length().div(s.mound.radius);
  // The rim dissolves into the dark instead of ending on a lit edge.
  const ash = new THREE.MeshStandardNodeMaterial({ roughness: 1, metalness: 0, transparent: true });
  ash.opacityNode = float(1).sub(smoothstep(0.62, 0.97, fromCentre));
  const ashBase = mix(vec3(0.05, 0.046, 0.042), vec3(0.2, 0.19, 0.175), ashN);
  ash.colorNode = mix(mix(ashBase, vec3(0.02, 0.014, 0.01), heat.pow(0.7).mul(0.85)), SOOT, smoothstep(0.5, 0.98, fromCentre));
  const cells = mx_noise_float(q.mul(3.4).add(vec3(0, time.mul(0.08), time.mul(0.05)))).mul(0.5).add(0.5);
  const coal = smoothstep(0.66, 0.86, cells).mul(heat.pow(1.6));
  ash.emissiveNode = mix(EMBER, HOT, coal).mul(coal.mul(3).add(heat.pow(5).mul(0.8))).mul(glow);

  // Bones: pale and dry at the edge, charred toward the heart, dusted where they enter the ash.
  const boneN = mx_fractal_noise_float(q.mul(2.4), 3, 2, 0.5, 1).mul(0.5).add(0.5);
  const char = smoothstep(0.3, 0.8, heat.add(boneN.sub(0.5).mul(0.55)));
  const dust = smoothstep(s.mound.y0 + s.mound.height * 0.9, s.mound.y0 + s.mound.height * 0.2, p.y).mul(0.5);
  const bone = new THREE.MeshStandardNodeMaterial({ metalness: 0, side: THREE.DoubleSide });
  const boneBase = mix(vec3(0.2, 0.165, 0.12), vec3(0.46, 0.4, 0.31), boneN);
  bone.colorNode = mix(mix(boneBase, vec3(0.13, 0.12, 0.11), dust), vec3(0.012, 0.009, 0.007), char.mul(0.92));
  bone.roughnessNode = boneN.mul(0.25).add(0.66);
  const cracks = smoothstep(0.62, 0.86, mx_noise_float(q.mul(7)).mul(0.5).add(0.5));
  bone.emissiveNode = EMBER.mul(cracks.mul(smoothstep(0.55, 0.95, heat)).mul(2.4)).mul(glow);

  // Iron: dark, worn, with rust in the hollows; it glows where it stands in the fire.
  const ironN = mx_fractal_noise_float(q.mul(4), 3, 2, 0.5, 1).mul(0.5).add(0.5);
  const iron = new THREE.MeshStandardNodeMaterial({ metalness: 0.88, side: THREE.DoubleSide });
  iron.colorNode = mix(vec3(0.2, 0.2, 0.21), vec3(0.12, 0.055, 0.03), smoothstep(0.62, 0.85, ironN));
  iron.roughnessNode = ironN.mul(0.3).add(0.3);
  const steelHeat = smoothstep(0.45, 0.92, heat);
  iron.emissiveNode = mix(EMBER, HOT, steelHeat).mul(steelHeat.pow(2).mul(4.2)).mul(glow);

  // The built-in bonfire's logs and stones.
  const wood = new THREE.MeshStandardNodeMaterial({ roughness: 0.95, metalness: 0, flatShading: true });
  wood.colorNode = mix(vec3(0.02, 0.013, 0.009), vec3(0.006, 0.004, 0.003), heat);
  wood.emissiveNode = EMBER.mul(smoothstep(0.6, 0.85, mx_noise_float(q.mul(9)).mul(0.5).add(0.5)).mul(heat).mul(3)).mul(glow);
  const stone = new THREE.MeshStandardNodeMaterial({ roughness: 0.9, metalness: 0, flatShading: true });
  stone.colorNode = mix(vec3(0.03, 0.026, 0.023), vec3(0.06, 0.054, 0.048), ashN);

  return { ash, bone, iron, wood, stone };
}

/** Centre on x/z, rest on y = 0, scale to the target height. */
function normalise(obj: THREE.Object3D): THREE.Object3D {
  const box = new THREE.Box3().setFromObject(obj);
  const size = box.getSize(new THREE.Vector3());
  const centre = box.getCenter(new THREE.Vector3());
  const k = TARGET_HEIGHT / Math.max(size.y, 0.0001);
  obj.position.set(-centre.x * k, -box.min.y * k, -centre.z * k);
  obj.scale.multiplyScalar(k);
  const holder = new THREE.Group();
  holder.add(obj);
  return holder;
}

/* ---- built-in bonfire (no model file) ----------------------------------------- */

// Small deterministic random so the pile looks the same on every visit.
function rng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return s / 2147483647;
  };
}

function buildBonfire(): THREE.Group {
  const rand = rng(7);
  const scene = new THREE.Group();
  const tag = (m: THREE.Mesh, part: Part) => ((m.userData.part = part), m);

  // Stones around the edge.
  for (let i = 0; i < 9; i++) {
    const a = (i / 9) * Math.PI * 2 + rand() * 0.4;
    const r = 1.02 + rand() * 0.16;
    const s = 0.12 + rand() * 0.1;
    const m = tag(new THREE.Mesh(new THREE.DodecahedronGeometry(s, 0)), "stone");
    m.position.set(Math.cos(a) * r, s * 0.45, Math.sin(a) * r);
    m.rotation.set(rand() * 3, rand() * 3, rand() * 3);
    m.scale.y = 0.7;
    scene.add(m);
  }

  // Charred logs leaning into the centre.
  for (let i = 0; i < 7; i++) {
    const a = (i / 7) * Math.PI * 2 + rand() * 0.5;
    const len = 0.9 + rand() * 0.5;
    const log = tag(new THREE.Mesh(new THREE.CylinderGeometry(0.045 + rand() * 0.03, 0.07 + rand() * 0.03, len, 8)), "wood");
    log.rotation.set(0, 0, 1.05 + rand() * 0.3);
    log.position.set(0.42, 0.2 + rand() * 0.08, 0);
    const pivot = new THREE.Group();
    pivot.rotation.y = a;
    pivot.add(log);
    scene.add(pivot);
  }

  // A few bones half-buried in the ash.
  for (let i = 0; i < 4; i++) {
    const a = rand() * Math.PI * 2;
    const b = tag(new THREE.Mesh(new THREE.CapsuleGeometry(0.028, 0.34, 4, 8)), "bone");
    b.position.set(Math.cos(a) * 0.6, 0.2, Math.sin(a) * 0.6);
    b.rotation.set(Math.PI / 2 + (rand() - 0.5) * 0.5, 0, a + rand());
    scene.add(b);
  }

  // The sword: a blade twisted along its length, standing in the pile.
  const bladeLen = 1.75;
  const blade = new THREE.BoxGeometry(0.16, bladeLen, 0.035, 1, 48, 1);
  const bp = blade.attributes.position;
  for (let i = 0; i < bp.count; i++) {
    const x = bp.getX(i), y = bp.getY(i), z = bp.getZ(i);
    const t = (y + bladeLen / 2) / bladeLen; // 0 at the tip (buried), 1 at the guard
    const twist = (1 - t) * Math.PI * 2.6;
    const cx = x * (0.45 + t * 0.55);
    bp.setXYZ(i, cx * Math.cos(twist) - z * Math.sin(twist), y, cx * Math.sin(twist) + z * Math.cos(twist));
  }
  blade.computeVertexNormals();
  const sword = new THREE.Group();
  const add = (geo: THREE.BufferGeometry, x: number, y: number, rz = 0) => {
    const m = tag(new THREE.Mesh(geo), "iron");
    m.position.set(x, y, 0);
    m.rotation.z = rz;
    sword.add(m);
  };
  add(blade, 0, bladeLen / 2);
  add(new THREE.BoxGeometry(0.62, 0.06, 0.08), 0, bladeLen + 0.02);
  add(new THREE.ConeGeometry(0.045, 0.14, 8), -0.36, bladeLen + 0.02, Math.PI / 2);
  add(new THREE.ConeGeometry(0.045, 0.14, 8), 0.36, bladeLen + 0.02, -Math.PI / 2);
  add(new THREE.CylinderGeometry(0.035, 0.04, 0.42, 10), 0, bladeLen + 0.26);
  add(new THREE.TorusGeometry(0.075, 0.024, 10, 24), 0, bladeLen + 0.54);
  sword.position.y = 0.12;
  sword.rotation.z = 0.07; // it never stands quite straight
  scene.add(sword);

  const parts = collect(scene, (m) => (m.userData.part as Part | undefined) ?? null);
  const mound: Mound = { cx: 0, cz: 0, radius: 1.05, height: 0.36, y0: 0 };
  parts.set("ash", [moundGeometry(mound, 7)]);
  return assemble(parts, { core: new THREE.Vector3(0, 0.3, 0), reach: 1.0, unit: 0.3, mound });
}
