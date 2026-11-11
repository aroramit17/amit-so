// Workshop scene for /explore (vertical slice).
// Loaded only after the visitor chooses Explore (dynamic import from explore.astro).
// The renderer owns pixels and motion only. Station content, navigation and
// routing stay in the DOM, which works without this module.

import * as THREE from 'three';

export type StationId = 'build-lab' | 'systems-engine' | 'broadcast-booth' | 'meet-amit';
export type Quality = 'standard' | 'lite';
export type LabelPositions = Record<StationId, { x: number; y: number; visible: boolean }>;

export interface WorkshopOptions {
  canvas: HTMLCanvasElement;
  quality: Quality;
  autoQuality: boolean;
  reducedMotion: boolean;
  skipIntro: boolean;
  onSelect: (id: StationId) => void;
  onFrame: (labels: LabelPositions, controlsVisible: boolean) => void;
  onIntroPhase?: (phase: 'controls' | 'done') => void;
  onContextLost: () => void;
}

export interface WorkshopHandle {
  skipIntro(): void;
  replayIntro(): void;
  focus(id: StationId | null, panelOffsetPx?: number): void;
  poke(id: StationId): void;
  dispose(): void;
}

// ─── Fixed constants ───────────────────────────────────────────
const W = 10; // table width (x)
const D = 7; // table depth (z)
const T_CONTROLS = 4.5; // labels + input arrive before movement ends
const T_END = 6.0;
const SEED = 1729;

const PAPER = 0xf5f1e8;
const INK = 0x101c2d;
const STATIONS: { id: StationId; x: number; z: number; accent: number; anchorY: number }[] = [
  { id: 'build-lab', x: -3.1, z: -0.4, accent: 0x2763ff, anchorY: 1.85 },
  { id: 'systems-engine', x: 0, z: -1.9, accent: 0x8ae0c0, anchorY: 2.25 },
  { id: 'broadcast-booth', x: 3.1, z: -0.4, accent: 0xf07866, anchorY: 2.0 },
  { id: 'meet-amit', x: 0, z: 1.75, accent: INK, anchorY: 1.6 },
];

// ─── Small helpers ─────────────────────────────────────────────
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
const easeInCubic = (t: number) => t * t * t;
const easeOutBack = (t: number) => {
  const c1 = 1.4, c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
};
function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function mix(a: number, b: number, t: number) {
  return new THREE.Color(a).lerp(new THREE.Color(b), t);
}

interface Pose { pos: THREE.Vector3; target: THREE.Vector3 }
interface Tween { start: number; dur: number; fn: (p: number) => void; done?: () => void }

export function mountWorkshop(opts: WorkshopOptions): WorkshopHandle {
  const { canvas } = opts;
  const lite = opts.quality === 'lite';
  const rm = opts.reducedMotion;
  const dpr = window.devicePixelRatio || 1;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: !lite, powerPreference: 'default' });
  // Conservative start: auto mode raises pixel ratio only after measuring headroom.
  let pixelRatio = lite || opts.autoQuality ? 1 : Math.min(dpr, 2);
  renderer.setPixelRatio(pixelRatio);
  renderer.toneMapping = THREE.NeutralToneMapping;
  renderer.shadowMap.enabled = !lite;
  renderer.shadowMap.type = THREE.PCFShadowMap;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(PAPER);
  scene.fog = new THREE.Fog(PAPER, 26, 60);

  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 120);

  // Lighting: warm key, cool fill. One shadow-casting light (standard tier ceiling).
  scene.add(new THREE.HemisphereLight(0xfff6e8, 0xbfcaf0, 1.15));
  const key = new THREE.DirectionalLight(0xfff0d8, 2.1);
  key.position.set(6, 11, 7);
  key.castShadow = !lite;
  key.shadow.mapSize.set(1024, 1024);
  key.shadow.camera.left = -9; key.shadow.camera.right = 9;
  key.shadow.camera.top = 9; key.shadow.camera.bottom = -9;
  key.shadow.camera.near = 1; key.shadow.camera.far = 30;
  key.shadow.bias = -0.0006;
  scene.add(key);

  const mats: THREE.Material[] = [];
  const geos: THREE.BufferGeometry[] = [];
  const std = (color: number | THREE.Color, extra: THREE.MeshStandardMaterialParameters = {}) => {
    const m = new THREE.MeshStandardMaterial({ color, roughness: 0.72, metalness: 0.05, ...extra });
    mats.push(m);
    return m;
  };
  const box = (w: number, h: number, d: number) => { const g = new THREE.BoxGeometry(w, h, d); geos.push(g); return g; };
  const cyl = (rt: number, rb: number, h: number, seg = 24, open = false) => {
    const g = new THREE.CylinderGeometry(rt, rb, h, seg, 1, open); geos.push(g); return g;
  };
  const mesh = (g: THREE.BufferGeometry, m: THREE.Material, x = 0, y = 0, z = 0) => {
    const o = new THREE.Mesh(g, m);
    o.position.set(x, y, z);
    o.castShadow = !lite;
    o.receiveShadow = !lite;
    return o;
  };

  // Ground catches the table shadow.
  const ground = new THREE.Mesh((() => { const g = new THREE.PlaneGeometry(80, 80); geos.push(g); return g; })(), std(PAPER, { roughness: 1 }));
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -1.45;
  ground.receiveShadow = !lite;
  scene.add(ground);

  // ─── Cabinet console (static) ────────────────────────────────
  const inkMat = std(INK, { roughness: 0.55 });
  const consoleGroup = new THREE.Group();
  consoleGroup.add(mesh(box(W + 0.6, 1.45, 1.15), inkMat, 0, -0.73, D / 2 + 0.57));
  const startButton = mesh(cyl(0.32, 0.34, 0.2), std(0xf07866, { roughness: 0.4 }), 2.8, 0.08, D / 2 + 0.55);
  consoleGroup.add(startButton);
  consoleGroup.add(mesh(cyl(0.05, 0.05, 0.42, 12), std(0x9aa3b5), -2.8, 0.2, D / 2 + 0.55));
  consoleGroup.add(mesh((() => { const g = new THREE.SphereGeometry(0.16, 20, 14); geos.push(g); return g; })(), std(0x2763ff, { roughness: 0.4 }), -2.8, 0.45, D / 2 + 0.55));
  scene.add(consoleGroup);

  // ─── Screen → world slab (tips from upright to flat) ─────────
  // Pivot sits on the near edge (z = D/2); local z runs from -D (far) to 0 (near).
  const slab = new THREE.Group();
  slab.position.set(0, 0, D / 2);
  scene.add(slab);
  slab.add(mesh(box(W + 0.6, 0.3, D + 0.6), std(0xe6dcc6), 0, -0.16, -D / 2));
  const rimH = 0.34;
  slab.add(mesh(box(W + 0.6, rimH, 0.3), inkMat, 0, rimH / 2, -D - 0.15));
  slab.add(mesh(box(W + 0.6, rimH, 0.3), inkMat, 0, rimH / 2, 0.15));
  slab.add(mesh(box(0.3, rimH, D), inkMat, -W / 2 - 0.15, rimH / 2, -D / 2));
  slab.add(mesh(box(0.3, rimH, D), inkMat, W / 2 + 0.15, rimH / 2, -D / 2));

  // Pixel tiles: one instanced mesh. Standard ≈ 1,120 blocks, lite = 280.
  const cols = lite ? 20 : 40;
  const rows = lite ? 14 : 28;
  const bs = W / cols;
  const count = cols * rows;
  const rng = mulberry32(SEED);
  const tileGeo = box(1, 1, 1);
  const tileMat = std(0xffffff, { roughness: 0.8 });
  const tiles = new THREE.InstancedMesh(tileGeo, tileMat, count);
  tiles.castShadow = !lite;
  tiles.receiveShadow = !lite;
  slab.add(tiles);
  const tx = new Float32Array(count), tz = new Float32Array(count);
  const popH = new Float32Array(count), finalH = new Float32Array(count);
  const ripple = new Float32Array(count), delay = new Float32Array(count);
  const tint = (accent: number) => mix(PAPER, accent, accent === INK ? 0.28 : 0.55);
  for (let r = 0, i = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++, i++) {
      const x = -W / 2 + bs * (c + 0.5);
      const zl = -D + bs * (r + 0.5);
      const zw = D / 2 + zl; // world z once flat
      tx[i] = x; tz[i] = zl;
      const edge = c === 0 || r === 0 || c === cols - 1 || r === rows - 1;
      const st = STATIONS.find((s) => Math.abs(x - s.x) < 1.2 && Math.abs(zw - s.z) < 0.9);
      let color: THREE.Color;
      if (edge) color = new THREE.Color(INK);
      else if (st) color = tint(st.accent);
      else color = new THREE.Color((c + r) % 2 ? 0xefe7d6 : 0xe8dfca).offsetHSL(0, 0, (rng() - 0.5) * 0.025);
      tiles.setColorAt(i, color);
      popH[i] = 0.25 + rng() * 0.95;
      finalH[i] = st ? 0.09 : 0.045 + rng() * 0.07;
      delay[i] = rng();
      // Ripple starts from the start button, measured on the upright screen.
      ripple[i] = Math.hypot(x - 2.8, -zl);
    }
  }
  const tmpM = new THREE.Matrix4(), tmpP = new THREE.Vector3(), tmpS = new THREE.Vector3(), tmpQ = new THREE.Quaternion();
  const BASE_H = 0.05;
  function tileHeight(i: number, t: number) {
    if (t < 1) {
      const p = clamp01((t - 0.25 - ripple[i] * 0.045) / 0.35);
      return BASE_H + 0.3 * Math.sin(Math.PI * p);
    }
    if (t < 2.6) return lerp(BASE_H, popH[i], easeOutCubic(clamp01((t - 1 - delay[i] * 0.55) / 0.9)));
    return lerp(popH[i], finalH[i], easeInOutCubic(clamp01((t - 2.6) / 1.7)));
  }
  let lastTileT = -1;
  function updateTiles(t: number) {
    const tt = Math.min(t, T_END);
    if (tt === lastTileT) return;
    lastTileT = tt;
    for (let i = 0; i < count; i++) {
      const h = tileHeight(i, tt);
      tmpP.set(tx[i], h / 2, tz[i]);
      tmpS.set(bs * 0.9, h, bs * 0.9);
      tmpM.compose(tmpP, tmpQ, tmpS);
      tiles.setMatrixAt(i, tmpM);
    }
    tiles.instanceMatrix.needsUpdate = true;
  }
  function slabAngle(t: number) {
    if (t < 2.5) return Math.PI / 2;
    const p = clamp01((t - 2.5) / 2.0);
    const a = p < 0.82 ? easeInCubic(p / 0.82) : 1 - 0.035 * Math.sin((Math.PI * (p - 0.82)) / 0.18);
    return (Math.PI / 2) * (1 - a);
  }

  // ─── Stations ────────────────────────────────────────────────
  interface StationRig {
    def: (typeof STATIONS)[number];
    group: THREE.Group;
    ring: THREE.Mesh;
    ringMat: THREE.MeshBasicMaterial;
    proxy: THREE.Mesh;
    anchor: THREE.Vector3;
    idle?: (dt: number, now: number) => void;
    poke: () => void;
    highlight: number;
    highlightTarget: number;
  }
  const rigs: StationRig[] = [];
  const tweens: Tween[] = [];
  let clock = 0; // accumulated, clamped scene time (seconds)
  const addTween = (dur: number, fn: (p: number) => void, done?: () => void) => {
    tweens.push({ start: clock, dur: Math.max(0.001, dur), fn, done });
  };
  const pokeScale = rm ? 0.35 : 1;
  const proxyMat = new THREE.MeshBasicMaterial({ colorWrite: false, depthWrite: false, transparent: true, opacity: 0 });
  mats.push(proxyMat);

  function legs(g: THREE.Group, w: number, d: number, h: number, m: THREE.Material) {
    for (const [sx, sz] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) {
      g.add(mesh(cyl(0.05, 0.05, h, 10), m, (sx * w) / 2, h / 2, (sz * d) / 2));
    }
  }

  for (const def of STATIONS) {
    const group = new THREE.Group();
    group.position.set(def.x, 0.11, def.z);
    let idle: StationRig['idle'];
    let poke: () => void = () => {};

    if (def.id === 'build-lab') {
      group.add(mesh(box(2.2, 0.14, 1.2), std(0xc8a476), 0, 0.82, 0));
      legs(group, 1.9, 0.95, 0.75, inkMat);
      const carts: THREE.Mesh[] = [];
      [0x2763ff, 0xf07866, 0x8ae0c0].forEach((col, k) => {
        const cart = mesh(box(0.44, 0.56, 0.11), std(col, { roughness: 0.45 }), -0.62 + k * 0.62, 1.17, -0.22);
        cart.add(mesh(box(0.34, 0.24, 0.02), std(0xfbf8f1), 0, 0.06, 0.065));
        group.add(cart);
        carts.push(cart);
      });
      const slot = mesh(box(0.9, 0.34, 0.5), inkMat, 0, 1.06, 0.33);
      slot.add(mesh(box(0.56, 0.04, 0.2), std(0x2763ff, { emissive: 0x2763ff, emissiveIntensity: 0.4 }), 0, 0.18, 0));
      group.add(slot);
      let n = 0;
      poke = () => {
        const cart = carts[n++ % carts.length];
        addTween(0.6 * pokeScale, (p) => { cart.position.y = 1.17 + 0.42 * Math.sin(Math.PI * p); });
      };
    }

    if (def.id === 'systems-engine') {
      group.add(mesh(cyl(1.0, 1.05, 0.26, 40), inkMat, 0, 0.13, 0));
      group.add(mesh(cyl(1.0, 1.0, 0.12, 40), inkMat, 0, 1.92, 0));
      const glassMat = std(0xcfe3ff, { transparent: true, opacity: 0.22, roughness: 0.1, depthWrite: false });
      const glass = new THREE.Mesh(cyl(0.95, 0.95, 1.6, 40, true), glassMat);
      glass.position.y = 1.06;
      group.add(glass);
      const nodeMat = [0x2763ff, 0x8ae0c0, 0xf07866].map((c) => std(c, { roughness: 0.35, emissive: c, emissiveIntensity: 0.15 }));
      const nodePos = [new THREE.Vector3(-0.5, 0.65, 0.2), new THREE.Vector3(0.05, 1.05, -0.3), new THREE.Vector3(0.5, 1.45, 0.2)];
      const sphere = (r: number) => { const g = new THREE.SphereGeometry(r, 20, 14); geos.push(g); return g; };
      nodePos.forEach((p, k) => group.add(mesh(sphere(0.15), nodeMat[k], p.x, p.y, p.z)));
      for (let k = 0; k < nodePos.length - 1; k++) {
        const a = nodePos[k], b = nodePos[k + 1];
        const len = a.distanceTo(b);
        const pipe = mesh(cyl(0.025, 0.025, len, 8), std(0x9aa3b5), (a.x + b.x) / 2, (a.y + b.y) / 2, (a.z + b.z) / 2);
        pipe.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), b.clone().sub(a).normalize());
        group.add(pipe);
      }
      const ring = new THREE.Mesh((() => { const g = new THREE.TorusGeometry(0.72, 0.035, 10, 48); geos.push(g); return g; })(), std(0x8ae0c0, { emissive: 0x8ae0c0, emissiveIntensity: 0.25 }));
      ring.rotation.x = Math.PI / 2;
      ring.position.y = 1.05;
      group.add(ring);
      const token = mesh(sphere(0.08), std(0xfbf8f1, { emissive: 0xffffff, emissiveIntensity: 0.3 }));
      group.add(token);
      let boost = 0, travel = 0;
      idle = (dt) => {
        const speed = (rm ? 0 : 0.5) + boost;
        ring.rotation.z += dt * speed;
        travel = (travel + dt * (rm ? 0 : 0.35) + dt * boost * 0.2) % 1;
        const seg = travel * 2;
        const k = Math.min(1, Math.floor(seg));
        token.position.lerpVectors(nodePos[k], nodePos[k + 1], seg - k);
        boost = Math.max(0, boost - dt * 3);
      };
      idle(0, 0);
      poke = () => { boost = rm ? 2 : 7; };
    }

    if (def.id === 'broadcast-booth') {
      group.add(mesh(box(2.0, 0.12, 1.05), std(0xc8a476), 0, 0.76, 0));
      legs(group, 1.7, 0.85, 0.7, inkMat);
      const crt = mesh(box(0.95, 0.78, 0.72), std(0xe7dec9, { roughness: 0.6 }), -0.25, 1.21, -0.1);
      crt.add(mesh(box(0.74, 0.56, 0.02), std(0x16323a, { emissive: 0x8ae0c0, emissiveIntensity: 0.35, roughness: 0.2 }), 0, 0.02, 0.37));
      group.add(crt);
      const reels: THREE.Mesh[] = [];
      for (const dz of [-0.18, 0.18]) {
        const reel = mesh(cyl(0.2, 0.2, 0.06, 28), std(0xf07866, { roughness: 0.5 }), 0.62, 1.12 + (dz > 0 ? 0 : 0.24), dz);
        reel.rotation.x = Math.PI / 2;
        group.add(reel);
        reels.push(reel);
      }
      let boost = 0;
      idle = (dt) => {
        const speed = (rm ? 0 : 0.6) + boost;
        reels.forEach((r) => { r.rotation.y += dt * speed; });
        boost = Math.max(0, boost - dt * 3);
      };
      poke = () => { boost = rm ? 2 : 9; };
    }

    if (def.id === 'meet-amit') {
      const easel = new THREE.Group();
      easel.add(mesh(box(0.06, 1.05, 0.06), inkMat, -0.45, 0.52, 0.05));
      easel.add(mesh(box(0.06, 1.05, 0.06), inkMat, 0.45, 0.52, 0.05));
      group.add(easel);
      const card = new THREE.Group();
      card.position.set(0, 1.0, 0);
      card.rotation.x = -0.2;
      card.add(mesh(box(1.4, 0.86, 0.05), std(0xfbf8f1, { roughness: 0.9 })));
      card.add(mesh(box(1.4, 0.14, 0.055), std(0xf07866), 0, 0.36, 0.001));
      card.add(mesh(box(0.78, 0.09, 0.056), inkMat, -0.22, 0.02, 0.002));
      card.add(mesh(box(0.5, 0.06, 0.056), std(0x2763ff), -0.36, -0.16, 0.002));
      group.add(card);
      poke = () => {
        const start = card.rotation.y;
        addTween((rm ? 0.25 : 0.9), (p) => {
          card.rotation.y = rm ? start + Math.sin(Math.PI * p) * 0.25 : start + Math.PI * 2 * easeInOutCubic(p);
        }, () => { card.rotation.y = start; });
      };
    }

    const ringMat = new THREE.MeshBasicMaterial({ color: def.accent, transparent: true, opacity: 0, depthWrite: false });
    mats.push(ringMat);
    const ring = new THREE.Mesh((() => { const g = new THREE.RingGeometry(1.25, 1.42, 56); geos.push(g); return g; })(), ringMat);
    ring.rotation.x = -Math.PI / 2;
    ring.position.set(def.x, 0.14, def.z);
    scene.add(ring);

    const proxy = new THREE.Mesh(box(2.5, 2.3, 2.0), proxyMat);
    proxy.position.set(def.x, 1.15, def.z);
    proxy.userData.station = def.id;
    scene.add(proxy);

    group.visible = false;
    scene.add(group);
    rigs.push({ def, group, ring, ringMat, proxy, anchor: new THREE.Vector3(def.x, def.anchorY, def.z), idle, poke, highlight: 0, highlightTarget: 0 });
  }
  startButton.userData.easter = true;

  function updateStations(t: number) {
    rigs.forEach((rig, k) => {
      const p = clamp01((t - 3.6 - k * 0.14) / 0.8);
      const s = p <= 0 ? 0.0001 : easeOutBack(p);
      rig.group.visible = p > 0;
      rig.group.scale.set(lerp(0.6, 1, Math.min(1, s)), s, lerp(0.6, 1, Math.min(1, s)));
    });
  }

  // ─── Camera choreography ─────────────────────────────────────
  let overviewDist = 14;
  const poses = { stand: null as unknown as Pose, pull: null as unknown as Pose, overview: null as unknown as Pose };
  function fitDistance(w: number, h: number) {
    const vf = THREE.MathUtils.degToRad(camera.fov);
    const hf = 2 * Math.atan(Math.tan(vf / 2) * camera.aspect);
    return Math.max(h / 2 / Math.tan(vf / 2), w / 2 / Math.tan(hf / 2));
  }
  function computePoses() {
    const portrait = camera.aspect < 0.9;
    const standT = new THREE.Vector3(0, D / 2, D / 2);
    const sd = fitDistance(W + 1.4, D + 1.4) * 1.16;
    poses.stand = { target: standT, pos: standT.clone().add(new THREE.Vector3(0, 0.25, sd)) };
    const pullT = new THREE.Vector3(0, 3.0, 3.2);
    poses.pull = { target: pullT, pos: pullT.clone().add(new THREE.Vector3(0, 1.4, sd * 1.18)) };
    const polar = THREE.MathUtils.degToRad(portrait ? 40 : 56);
    const az = THREE.MathUtils.degToRad(portrait ? 0 : 24);
    // Fit the table footprint (plus stations) as seen from this angle.
    overviewDist = fitDistance(portrait ? W - 0.6 : W + 2.2, (D + 2.5) * Math.cos(polar) + 2.6) * (portrait ? 0.98 : 1.28);
    const target = new THREE.Vector3(0, portrait ? 0.2 : 0.35, portrait ? 0.6 : 0.75);
    const dir = new THREE.Vector3(Math.sin(polar) * Math.sin(az), Math.cos(polar), Math.sin(polar) * Math.cos(az));
    poses.overview = { target, pos: target.clone().add(dir.multiplyScalar(overviewDist)) };
  }
  const camTarget = new THREE.Vector3();
  function introCamera(t: number) {
    let a: Pose, b: Pose, p: number;
    if (t < 1) { a = b = poses.stand; p = 0; }
    else if (t < 2.5) { a = poses.stand; b = poses.pull; p = easeInOutCubic((t - 1) / 1.5); }
    else { a = poses.pull; b = poses.overview; p = easeInOutCubic(clamp01((t - 2.5) / 3.5)); }
    camera.position.lerpVectors(a.pos, b.pos, p);
    camTarget.lerpVectors(a.target, b.target, p);
    camera.lookAt(camTarget);
  }

  // Focus state (after intro)
  let focused: StationId | null = null;
  let viewOffset = 0;
  const camFrom = { pos: new THREE.Vector3(), target: new THREE.Vector3(), off: 0 };
  const camTo = { pos: new THREE.Vector3(), target: new THREE.Vector3(), off: 0 };
  let camTween: { start: number; dur: number } | null = null;
  function focusPose(id: StationId | null): Pose {
    if (!id) return poses.overview;
    const rig = rigs.find((r) => r.def.id === id)!;
    const dir = poses.overview.pos.clone().sub(poses.overview.target).normalize();
    const target = new THREE.Vector3(rig.def.x, 0.95, rig.def.z);
    const dist = overviewDist * (camera.aspect < 0.9 ? 0.72 : 0.6);
    return { target, pos: target.clone().add(dir.multiplyScalar(dist)) };
  }
  function applyViewOffset(off: number) {
    viewOffset = off;
    const w = canvas.clientWidth || 1, h = canvas.clientHeight || 1;
    if (off > 0.5) camera.setViewOffset(w, h, off, 0, w, h);
    else camera.clearViewOffset();
  }

  // ─── State + loop ────────────────────────────────────────────
  let t = opts.skipIntro || rm ? T_END : 0;
  let phaseSent: 'none' | 'controls' | 'done' = 'none';
  let raf = 0;
  let last = 0;
  let running = false;
  let disposed = false;
  const frameTimes: number[] = [];
  let shadowsOn = !lite;
  const labels = {} as LabelPositions;
  const tmpV = new THREE.Vector3();

  function snapIntro() {
    slab.rotation.x = slabAngle(t);
    updateTiles(t);
    updateStations(t);
    if (t < T_END) introCamera(t);
  }

  function frame(now: number) {
    if (!running) return;
    raf = requestAnimationFrame(frame);
    const dtRaw = (now - last) / 1000;
    last = now;
    const dt = Math.min(0.1, Math.max(0, dtRaw)); // bounded delta after tab hiding
    clock += dt;

    if (t < T_END) {
      t = Math.min(T_END, t + dt);
      snapIntro();
      if (t >= T_END) { introCamera(T_END); camera.lookAt(poses.overview.target); }
    }
    if (phaseSent === 'none' && t >= T_CONTROLS) { phaseSent = 'controls'; opts.onIntroPhase?.('controls'); }
    if (phaseSent !== 'done' && t >= T_END) { phaseSent = 'done'; opts.onIntroPhase?.('done'); }

    if (camTween) {
      const p = rm ? 1 : easeInOutCubic(clamp01((clock - camTween.start) / camTween.dur));
      camera.position.lerpVectors(camFrom.pos, camTo.pos, p);
      camTarget.lerpVectors(camFrom.target, camTo.target, p);
      camera.lookAt(camTarget);
      applyViewOffset(lerp(camFrom.off, camTo.off, p));
      if (p >= 1) camTween = null;
    }

    for (let i = tweens.length - 1; i >= 0; i--) {
      const tw = tweens[i];
      const p = clamp01((clock - tw.start) / tw.dur);
      tw.fn(p);
      if (p >= 1) { tweens.splice(i, 1); tw.done?.(); }
    }
    for (const rig of rigs) {
      rig.idle?.(dt, clock);
      rig.highlight += (rig.highlightTarget - rig.highlight) * Math.min(1, dt * (rm ? 30 : 10));
      rig.ringMat.opacity = rig.highlight * 0.85;
    }

    renderer.render(scene, camera);

    const w = canvas.clientWidth, h = canvas.clientHeight;
    for (const rig of rigs) {
      tmpV.copy(rig.anchor).project(camera);
      labels[rig.def.id] = { x: ((tmpV.x + 1) / 2) * w, y: ((1 - tmpV.y) / 2) * h, visible: tmpV.z < 1 && rig.group.visible };
    }
    opts.onFrame(labels, t >= T_CONTROLS);

    if (t >= T_END) trackPerformance(dtRaw);
  }

  // Adaptive quality: improve only with headroom, degrade after sustained slow frames.
  function trackPerformance(dtRaw: number) {
    if (!opts.autoQuality || dtRaw <= 0 || dtRaw > 0.5) return;
    frameTimes.push(dtRaw * 1000);
    if (frameTimes.length < 120) return;
    const avg = frameTimes.reduce((a, b) => a + b, 0) / frameTimes.length;
    frameTimes.length = 0;
    const target = Math.min(dpr, 2);
    if (avg < 14 && pixelRatio < target) {
      pixelRatio = target;
      renderer.setPixelRatio(pixelRatio);
      resize();
    } else if (avg > 34) {
      if (pixelRatio > 1) { pixelRatio = 1; renderer.setPixelRatio(1); resize(); }
      else if (shadowsOn) {
        shadowsOn = false;
        renderer.shadowMap.enabled = false;
        key.castShadow = false;
        mats.forEach((m) => { m.needsUpdate = true; });
      }
    }
  }

  function start() {
    if (running || disposed) return;
    running = true;
    last = performance.now();
    raf = requestAnimationFrame(frame);
  }
  function stop() {
    running = false;
    cancelAnimationFrame(raf);
  }

  function resize() {
    const w = canvas.clientWidth || 1, h = canvas.clientHeight || 1;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    computePoses();
    if (t >= T_END && !camTween) {
      const pose = focusPose(focused);
      camera.position.copy(pose.pos);
      camTarget.copy(pose.target);
      camera.lookAt(camTarget);
    } else if (t < T_END) {
      introCamera(t);
    }
    applyViewOffset(viewOffset);
    camera.updateProjectionMatrix();
  }

  // ─── Input ───────────────────────────────────────────────────
  const raycaster = new THREE.Raycaster();
  const ndc = new THREE.Vector2();
  const proxies = rigs.map((r) => r.proxy);
  let down: { x: number; y: number; id: number } | null = null;
  function hit(clientX: number, clientY: number): StationId | 'easter' | null {
    const rect = canvas.getBoundingClientRect();
    ndc.set(((clientX - rect.left) / rect.width) * 2 - 1, -((clientY - rect.top) / rect.height) * 2 + 1);
    raycaster.setFromCamera(ndc, camera);
    const hits = raycaster.intersectObjects([...proxies, startButton], false);
    if (!hits.length) return null;
    const o = hits[0].object;
    if (o.userData.easter) return 'easter';
    return (o.userData.station as StationId) ?? null;
  }
  const onDown = (e: PointerEvent) => { down = { x: e.clientX, y: e.clientY, id: e.pointerId }; };
  const onUp = (e: PointerEvent) => {
    if (!down || down.id !== e.pointerId) return;
    const moved = Math.hypot(e.clientX - down.x, e.clientY - down.y);
    down = null;
    if (moved > 8 || t < T_CONTROLS) return;
    const h = hit(e.clientX, e.clientY);
    if (h === 'easter') { pressButton(); return; }
    if (h) opts.onSelect(h);
  };
  const onMove = (e: PointerEvent) => {
    if (e.pointerType !== 'mouse' || t < T_CONTROLS) return;
    const h = hit(e.clientX, e.clientY);
    canvas.style.cursor = h ? 'pointer' : '';
    for (const rig of rigs) rig.highlightTarget = rig.def.id === h || rig.def.id === focused ? 1 : 0;
  };
  canvas.addEventListener('pointerdown', onDown);
  canvas.addEventListener('pointerup', onUp);
  canvas.addEventListener('pointermove', onMove);

  // Easter egg: the cabinet's start button still presses after the intro.
  function pressButton() {
    addTween(0.3 * pokeScale, (p) => { startButton.position.y = 0.08 - 0.09 * Math.sin(Math.PI * p); });
  }

  const onVisibility = () => { if (document.hidden) stop(); else start(); };
  document.addEventListener('visibilitychange', onVisibility);
  const ro = new ResizeObserver(() => resize());
  ro.observe(canvas);
  const onLost = (e: Event) => { e.preventDefault(); stop(); opts.onContextLost(); };
  canvas.addEventListener('webglcontextlost', onLost);

  resize();
  snapIntro();
  if (t >= T_END) { camera.position.copy(poses.overview.pos); camTarget.copy(poses.overview.target); camera.lookAt(camTarget); }
  if (!document.hidden) start();

  const handle: WorkshopHandle = {
    skipIntro() {
      if (t >= T_END) return;
      t = T_END;
      snapIntro();
      camera.position.copy(poses.overview.pos);
      camTarget.copy(poses.overview.target);
      camera.lookAt(camTarget);
    },
    replayIntro() {
      focused = null;
      camTween = null;
      applyViewOffset(0);
      rigs.forEach((r) => { r.highlightTarget = 0; });
      t = rm ? T_END : 0;
      phaseSent = rm ? phaseSent : 'none';
      lastTileT = -1;
      snapIntro();
    },
    focus(id, panelOffsetPx = 0) {
      if (t < T_END) handle.skipIntro();
      focused = id;
      for (const rig of rigs) rig.highlightTarget = rig.def.id === id ? 1 : 0;
      const pose = focusPose(id);
      camFrom.pos.copy(camera.position);
      camFrom.target.copy(camTarget);
      camFrom.off = viewOffset;
      camTo.pos.copy(pose.pos);
      camTo.target.copy(pose.target);
      camTo.off = id ? panelOffsetPx / 2 : 0;
      camTween = { start: clock, dur: 0.65 };
      if (id) rigs.find((r) => r.def.id === id)?.poke();
    },
    poke(id) { rigs.find((r) => r.def.id === id)?.poke(); },
    dispose() {
      if (disposed) return;
      disposed = true;
      stop();
      canvas.removeEventListener('pointerdown', onDown);
      canvas.removeEventListener('pointerup', onUp);
      canvas.removeEventListener('pointermove', onMove);
      canvas.removeEventListener('webglcontextlost', onLost);
      document.removeEventListener('visibilitychange', onVisibility);
      ro.disconnect();
      tiles.dispose();
      geos.forEach((g) => g.dispose());
      mats.forEach((m) => m.dispose());
      renderer.dispose();
      renderer.forceContextLoss();
    },
  };
  return handle;
}
