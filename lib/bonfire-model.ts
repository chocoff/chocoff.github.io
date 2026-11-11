/**
 * The bonfire as a 3D object.
 *
 * If `public/models/bonfire.glb` exists it is loaded and used. Otherwise a
 * built-in bonfire is assembled from code: an ash mound, charred logs and
 * stones, and a twisted sword standing in the pile.
 *
 * Either way the result is normalised: base centred on the origin, sitting on
 * y = 0, about 2.4 units tall, so the stage can scale and turn it the same way.
 */
import * as THREE from "three/webgpu";

export const MODEL_URL = "/models/bonfire.glb";
const TARGET_HEIGHT = 2.4;

export async function loadBonfire(useFile: boolean): Promise<THREE.Object3D> {
  if (useFile) {
    try {
      const { GLTFLoader } = await import("three/addons/loaders/GLTFLoader.js");
      const gltf = await new GLTFLoader().loadAsync(MODEL_URL);
      return normalise(prepare(gltf.scene));
    } catch (err) {
      if (process.env.NODE_ENV !== "production") console.warn("Bonfire model failed to load; using the built-in one.", err);
    }
  }
  return normalise(buildBonfire());
}

/** Helper objects exported along with a model that should not be drawn. */
// (a duplicated sword, e.g. "Coiled Sword.001", is an export leftover too)
const HIDE = /smoke|domain|emitter|^circle|sword[ _.]*\.?0\d+$/i;

/** Colours for models exported without textures, matched on the material's name. */
const TINTS: [RegExp, number, number, number][] = [
  // [name, colour, roughness, metalness]
  [/sword|blade|iron|metal/i, 0x8a8078, 0.5, 0.3],
  [/bone|skull/i, 0x9a8f7e, 0.85, 0],
  [/wood|log/i, 0x2a1d15, 0.95, 0],
  [/ash|ground|dirt/i, 0x4a443f, 1, 0],
];

/** Strip lights and helpers, and give untextured white materials a colour. */
function prepare(scene: THREE.Object3D): THREE.Object3D {
  const drop: THREE.Object3D[] = [];
  scene.traverse((o) => {
    const mesh = o as THREE.Mesh;
    if ((o as THREE.Light).isLight) drop.push(o);
    else if (mesh.isMesh) {
      const mat = mesh.material as THREE.MeshStandardMaterial;
      if (HIDE.test(o.name) || HIDE.test(mat?.name ?? "")) drop.push(o);
      else if (mat?.isMeshStandardMaterial && !mat.map && mat.color.getHex() === 0xffffff) {
        const tint = TINTS.find(([re]) => re.test(mat.name) || re.test(o.name));
        if (tint) {
          mat.color.setHex(tint[1]);
          mat.roughness = tint[2];
          mat.metalness = tint[3];
        } else mat.color.setHex(0x5a5048);
      }
    }
  });
  drop.forEach((o) => o.removeFromParent());
  return scene;
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

/* ---- built-in bonfire ------------------------------------------------------ */

// Small deterministic random so the pile looks the same on every visit.
function rng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return s / 2147483647;
  };
}

function buildBonfire(): THREE.Group {
  const g = new THREE.Group();
  const rand = rng(7);

  const iron = new THREE.MeshStandardNodeMaterial({ color: 0x8a8078, roughness: 0.5, metalness: 0.3 });
  const hilt = new THREE.MeshStandardNodeMaterial({ color: 0x4a3626, roughness: 0.8, metalness: 0.1 });
  const ash = new THREE.MeshStandardNodeMaterial({ color: 0x4a443f, roughness: 1, metalness: 0, flatShading: true });
  const wood = new THREE.MeshStandardNodeMaterial({ color: 0x1c1410, roughness: 0.95, metalness: 0, flatShading: true });
  const stone = new THREE.MeshStandardNodeMaterial({ color: 0x35302c, roughness: 0.9, metalness: 0, flatShading: true });
  const bone = new THREE.MeshStandardNodeMaterial({ color: 0x8d8272, roughness: 0.85, metalness: 0 });

  // Ash mound: a low dome with an uneven surface.
  const mound = new THREE.SphereGeometry(1, 28, 12, 0, Math.PI * 2, 0, Math.PI / 2);
  const mp = mound.attributes.position;
  for (let i = 0; i < mp.count; i++) {
    const x = mp.getX(i), y = mp.getY(i), z = mp.getZ(i);
    const n = 1 + (Math.sin(x * 9.1 + z * 4.3) + Math.sin(z * 11.7 - x * 3.1)) * 0.035 + (rand() - 0.5) * 0.05;
    mp.setXYZ(i, x * n * 1.05, y * 0.34 * n, z * n * 1.05);
  }
  mound.computeVertexNormals();
  g.add(new THREE.Mesh(mound, ash));

  // Stones around the edge.
  for (let i = 0; i < 9; i++) {
    const a = (i / 9) * Math.PI * 2 + rand() * 0.4;
    const r = 1.02 + rand() * 0.16;
    const s = 0.12 + rand() * 0.1;
    const m = new THREE.Mesh(new THREE.DodecahedronGeometry(s, 0), stone);
    m.position.set(Math.cos(a) * r, s * 0.45, Math.sin(a) * r);
    m.rotation.set(rand() * 3, rand() * 3, rand() * 3);
    m.scale.y = 0.7;
    g.add(m);
  }

  // Charred logs leaning into the centre.
  for (let i = 0; i < 7; i++) {
    const a = (i / 7) * Math.PI * 2 + rand() * 0.5;
    const len = 0.9 + rand() * 0.5;
    const log = new THREE.Mesh(new THREE.CylinderGeometry(0.045 + rand() * 0.03, 0.07 + rand() * 0.03, len, 6), wood);
    const lean = 1.05 + rand() * 0.3; // radians from vertical
    log.rotation.set(0, 0, lean);
    const pivot = new THREE.Group();
    pivot.rotation.y = a;
    log.position.set(0.42, 0.2 + rand() * 0.08, 0);
    pivot.add(log);
    g.add(pivot);
  }

  // A few bones half-buried in the ash.
  for (let i = 0; i < 4; i++) {
    const a = rand() * Math.PI * 2;
    const b = new THREE.Mesh(new THREE.CapsuleGeometry(0.028, 0.34, 3, 6), bone);
    b.position.set(Math.cos(a) * 0.6, 0.2, Math.sin(a) * 0.6);
    b.rotation.set(Math.PI / 2 + (rand() - 0.5) * 0.5, 0, a + rand());
    g.add(b);
  }

  // The sword: a blade twisted along its length, standing in the pile.
  const sword = new THREE.Group();
  const bladeLen = 1.75;
  const blade = new THREE.BoxGeometry(0.16, bladeLen, 0.035, 1, 40, 1);
  const bp = blade.attributes.position;
  for (let i = 0; i < bp.count; i++) {
    const x = bp.getX(i), y = bp.getY(i), z = bp.getZ(i);
    const t = (y + bladeLen / 2) / bladeLen; // 0 at the tip (buried), 1 at the guard
    const twist = (1 - t) * Math.PI * 2.6; // the coil
    const taper = 0.45 + t * 0.55;
    const cx = x * taper, cz = z;
    bp.setXYZ(i, cx * Math.cos(twist) - cz * Math.sin(twist), y, cx * Math.sin(twist) + cz * Math.cos(twist));
  }
  blade.computeVertexNormals();
  const bladeMesh = new THREE.Mesh(blade, iron);
  bladeMesh.position.y = bladeLen / 2;
  sword.add(bladeMesh);

  const guard = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.06, 0.08), iron);
  guard.position.y = bladeLen + 0.02;
  sword.add(guard);
  for (const sx of [-1, 1]) {
    const tip = new THREE.Mesh(new THREE.ConeGeometry(0.045, 0.14, 6), iron);
    tip.position.set(sx * 0.36, bladeLen + 0.02, 0);
    tip.rotation.z = -sx * Math.PI / 2;
    sword.add(tip);
  }
  const grip = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.04, 0.42, 8), hilt);
  grip.position.y = bladeLen + 0.26;
  sword.add(grip);
  const pommel = new THREE.Mesh(new THREE.TorusGeometry(0.075, 0.024, 8, 18), iron);
  pommel.position.y = bladeLen + 0.54;
  sword.add(pommel);

  sword.position.y = 0.12;
  sword.rotation.z = 0.07; // it never stands quite straight
  g.add(sword);

  return g;
}
