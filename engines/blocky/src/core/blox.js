// Blocky-avatar obby kit (original designs): box avatars with drawn faces, studded plastic bricks, lava, spinners,
// a spiral tower, chat bubbles and name tags.
import * as THREE from 'three';

const mats = new Map();
export const mat = (c, o = {}) => {
  const k = c + JSON.stringify(o); if (mats.has(k)) return mats.get(k);
  const m = new THREE.MeshStandardMaterial({ color: c, roughness: 0.5, metalness: 0, ...o }); mats.set(k, m); return m;
};

// ---------- textures ----------
let studT = null;
export function studTex() {
  if (studT) return studT;
  const c = document.createElement('canvas'); c.width = c.height = 128; const g = c.getContext('2d');
  g.fillStyle = '#fff'; g.fillRect(0, 0, 128, 128);
  for (let y = 0; y < 2; y++) for (let x = 0; x < 2; x++) {
    const cx = 32 + x * 64, cy = 32 + y * 64;
    g.fillStyle = 'rgba(0,0,0,0.13)'; g.beginPath(); g.arc(cx + 3, cy + 4, 17, 0, 7); g.fill();
    g.fillStyle = 'rgba(255,255,255,1)'; g.beginPath(); g.arc(cx, cy, 16, 0, 7); g.fill();
    g.strokeStyle = 'rgba(0,0,0,0.12)'; g.lineWidth = 3; g.stroke();
  }
  g.strokeStyle = 'rgba(0,0,0,0.08)'; g.lineWidth = 2; g.strokeRect(0, 0, 128, 128);
  studT = new THREE.CanvasTexture(c); studT.wrapS = studT.wrapT = THREE.RepeatWrapping; studT.colorSpace = THREE.SRGBColorSpace; studT.anisotropy = 4;
  return studT;
}
function studMat(col, rx, ry, o = {}) {
  const t = studTex().clone(); t.needsUpdate = true; t.repeat.set(rx, ry);
  return new THREE.MeshStandardMaterial({ color: col, map: t, roughness: 0.45, ...o });
}

const faceCache = new Map();
/** the face drawn on the front of a head: mood = neutral|happy|laugh|sad|shock|smug|angry|worried|cool */
export function faceTex(skin, mood = 'neutral', blink = 0, fx = {}) {
  const k = skin + mood + blink + JSON.stringify(fx); if (faceCache.has(k)) return faceCache.get(k);
  const c = document.createElement('canvas'); c.width = c.height = 256; const g = c.getContext('2d');
  g.fillStyle = skin; g.fillRect(0, 0, 256, 256);
  const ink = '#141418'; g.fillStyle = ink; g.strokeStyle = ink; g.lineCap = 'round'; g.lineJoin = 'round';
  const eye = (x) => {
    if (blink) { g.lineWidth = 9; g.beginPath(); g.moveTo(x - 16, 112); g.lineTo(x + 16, 112); g.stroke(); return; }
    if (mood === 'laugh' || mood === 'happy') { g.lineWidth = 10; g.beginPath(); g.arc(x, 118, 16, Math.PI * 1.1, Math.PI * 1.9); g.stroke(); return; }
    const h = mood === 'shock' ? 30 : 24; g.beginPath(); g.ellipse(x, 108, mood === 'shock' ? 15 : 12, h, 0, 0, 7); g.fill();
    g.fillStyle = '#fff'; g.beginPath(); g.arc(x + 4, 98, 5, 0, 7); g.fill(); g.fillStyle = ink;
  };
  if (mood === 'cool') { g.fillRect(48, 92, 160, 30); g.fillRect(60, 100, 56, 34); g.fillRect(140, 100, 56, 34); }
  else { eye(90); eye(166); }
  g.lineWidth = 9;
  const brow = (x, a) => { g.beginPath(); g.moveTo(x - 22, 70 + a); g.lineTo(x + 22, 70 - a); g.stroke(); };
  if (mood === 'angry') { brow(90, -10); brow(166, 10); }
  if (mood === 'sad' || mood === 'worried') { brow(90, 9); brow(166, -9); }
  if (mood === 'smug') { brow(166, -4); }
  if (fx.open) { g.fillStyle = '#5A1E22'; g.beginPath(); g.ellipse(128, 186, 22, 26, 0, 0, 7); g.fill(); g.fillStyle = '#E25B6B'; g.beginPath(); g.ellipse(128, 200, 13, 8, 0, 0, 7); g.fill(); g.fillStyle = ink; }
  else {
  g.lineWidth = 10;
  if (mood === 'happy' || mood === 'neutral' || mood === 'cool') { g.beginPath(); g.arc(128, 150, mood === 'neutral' ? 34 : 42, 0.2 * Math.PI, 0.8 * Math.PI); g.stroke(); }
  if (mood === 'laugh') { g.beginPath(); g.moveTo(80, 160); g.quadraticCurveTo(128, 240, 176, 160); g.closePath(); g.fill(); g.fillStyle = '#E25B6B'; g.beginPath(); g.ellipse(128, 196, 22, 12, 0, 0, 7); g.fill(); }
  if (mood === 'sad') { g.beginPath(); g.arc(128, 212, 36, 1.2 * Math.PI, 1.8 * Math.PI); g.stroke(); }
  if (mood === 'worried') { g.beginPath(); g.moveTo(96, 190); g.quadraticCurveTo(112, 178, 128, 190); g.quadraticCurveTo(144, 202, 160, 190); g.stroke(); }
  if (mood === 'shock') { g.beginPath(); g.ellipse(128, 190, 20, 28, 0, 0, 7); g.fill(); }
  if (mood === 'smug') { g.beginPath(); g.moveTo(94, 186); g.quadraticCurveTo(140, 196, 170, 168); g.stroke(); }
  if (mood === 'angry') { g.beginPath(); g.moveTo(96, 196); g.lineTo(160, 196); g.stroke(); }
  }
  if (fx.blush) { g.fillStyle = 'rgba(255,110,110,0.35)'; g.beginPath(); g.ellipse(58, 150, 20, 12, 0, 0, 7); g.ellipse(198, 150, 20, 12, 0, 0, 7); g.fill(); }
  if (fx.tears) { g.fillStyle = 'rgba(90,170,255,0.9)'; [[84, 142], [172, 142], [80, 170], [176, 172]].forEach(([x, y]) => { g.beginPath(); g.ellipse(x, y, 7, 11, 0, 0, 7); g.fill(); }); }
  if (fx.bindi) { g.fillStyle = '#C8102E'; g.beginPath(); g.arc(128, 62, 9, 0, 7); g.fill(); }
  if (fx.glasses === 'round') { g.strokeStyle = '#1C1C24'; g.lineWidth = 8; g.beginPath(); g.arc(90, 108, 32, 0, 7); g.stroke(); g.beginPath(); g.arc(166, 108, 32, 0, 7); g.stroke(); g.beginPath(); g.moveTo(122, 104); g.lineTo(134, 104); g.stroke(); }
  if (fx.glasses === 'thick') { g.fillStyle = 'rgba(160,220,255,0.25)'; g.fillRect(50, 80, 70, 56); g.fillRect(136, 80, 70, 56); g.strokeStyle = '#111'; g.lineWidth = 13; g.strokeRect(50, 80, 70, 56); g.strokeRect(136, 80, 70, 56); g.beginPath(); g.moveTo(120, 100); g.lineTo(136, 100); g.stroke();
    g.fillStyle = 'rgba(255,255,255,0.8)'; g.fillRect(58, 86, 14, 8); g.fillRect(144, 86, 14, 8); }
  if (fx.freckles) { g.fillStyle = 'rgba(120,70,40,0.5)'; [[60, 150], [74, 158], [182, 150], [196, 158], [68, 140], [188, 140]].forEach(([x, y]) => { g.beginPath(); g.arc(x, y, 4, 0, 7); g.fill(); }); }
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; faceCache.set(k, t); return t;
}

// shirt fronts (drawn on the torso's front face)
const shirtCache = new Map();
export function shirtTex(kind, A = {}) {
  const k = kind + JSON.stringify(A); if (shirtCache.has(k)) return shirtCache.get(k);
  const c = document.createElement('canvas'); c.width = 256; c.height = 256; const g = c.getContext('2d');
  g.fillStyle = A.base; g.fillRect(0, 0, 256, 256);
  if (kind === 'hoodieZ') { // indigo hoodie, coral Z badge, mint drawstrings, pocket
    g.fillStyle = 'rgba(0,0,0,0.12)'; g.fillRect(40, 176, 176, 64);
    g.strokeStyle = A.cord; g.lineWidth = 8; g.beginPath(); g.moveTo(104, 0); g.lineTo(100, 70); g.moveTo(152, 0); g.lineTo(156, 70); g.stroke();
    g.fillStyle = A.cord; g.beginPath(); g.arc(100, 74, 7, 0, 7); g.arc(156, 74, 7, 0, 7); g.fill();
    g.fillStyle = A.logo; g.beginPath(); g.roundRect(84, 92, 88, 76, 16); g.fill();
    g.fillStyle = '#FFFFFF'; g.font = '900 64px Inter'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('Z', 128, 133);
  }
  if (kind === 'jacket') { // open mint jacket over a white tee with a coral star
    g.fillStyle = '#FFFFFF'; g.fillRect(86, 0, 84, 256); g.fillStyle = A.accent; g.beginPath();
    for (let i = 0; i < 10; i++) { const r = i % 2 ? 12 : 28, a = -Math.PI / 2 + i * Math.PI / 5; g.lineTo(128 + Math.cos(a) * r, 104 + Math.sin(a) * r); } g.fill();
    g.fillStyle = 'rgba(0,0,0,0.15)'; g.fillRect(80, 0, 8, 256); g.fillRect(168, 0, 8, 256);
    g.fillStyle = A.accent; g.fillRect(0, 224, 256, 32);
  }
  if (kind === 'shirtTie') { // crisp white shirt, collar, indigo tie, pen in pocket
    g.fillStyle = '#E8ECF2'; g.beginPath(); g.moveTo(70, 0); g.lineTo(128, 40); g.lineTo(186, 0); g.fill();
    g.strokeStyle = '#C9D0DA'; g.lineWidth = 4; g.beginPath(); g.moveTo(128, 40); g.lineTo(128, 256); g.stroke();
    g.fillStyle = A.tie; g.beginPath(); g.moveTo(114, 34); g.lineTo(142, 34); g.lineTo(136, 52); g.lineTo(150, 190); g.lineTo(128, 214); g.lineTo(106, 190); g.lineTo(120, 52); g.fill();
    g.fillStyle = '#C9D0DA'; g.fillRect(172, 70, 50, 54); g.fillStyle = '#1B5FD8'; g.fillRect(182, 52, 8, 40); g.fillStyle = '#E8333F'; g.fillRect(196, 56, 8, 36);
  }
  if (kind === 'stripes') { g.fillStyle = A.stripe; for (let y = 10; y < 256; y += 52) g.fillRect(0, y, 256, 24); g.fillStyle = A.badge; g.beginPath(); g.roundRect(150, 60, 56, 56, 12); g.fill(); g.fillStyle = '#fff'; g.font = '900 40px Inter'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('Z', 178, 90); }
  if (kind === 'kurti') { // maroon kurti, gold border neckline and buttons
    g.strokeStyle = A.trim; g.lineWidth = 12; g.beginPath(); g.moveTo(80, 0); g.lineTo(128, 70); g.lineTo(176, 0); g.stroke();
    g.fillStyle = A.trim; for (let i = 0; i < 4; i++) { g.beginPath(); g.arc(128, 100 + i * 34, 7, 0, 7); g.fill(); } g.fillRect(0, 232, 256, 24);
  }
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; shirtCache.set(k, t); return t;
}

const spriteCache = new Map();
/** a chat bubble (white, ink text) or a name tag (no bubble) as a texture + aspect */
function labelTex(text, kind) {
  const k = kind + text; if (spriteCache.has(k)) return spriteCache.get(k);
  const c = document.createElement('canvas'), g = c.getContext('2d'); const fs = kind === 'tag' ? 44 : 58;
  g.font = `900 ${fs}px Inter`; const w = Math.ceil(g.measureText(text).width) + (kind === 'tag' ? 30 : 70), h = kind === 'tag' ? 66 : 112;
  c.width = w; c.height = h + (kind === 'tag' ? 0 : 26); g.font = `900 ${fs}px Inter`; g.textAlign = 'center'; g.textBaseline = 'middle';
  if (kind === 'tag') { g.lineWidth = 9; g.strokeStyle = 'rgba(0,0,0,0.75)'; g.lineJoin = 'round'; g.strokeText(text, w / 2, h / 2 + 2); g.fillStyle = '#fff'; g.fillText(text, w / 2, h / 2 + 2); }
  else {
    g.fillStyle = '#fff'; g.beginPath(); g.roundRect(4, 4, w - 8, h - 8, 34); g.fill();
    g.beginPath(); g.moveTo(w / 2 - 20, h - 6); g.lineTo(w / 2, h + 22); g.lineTo(w / 2 + 20, h - 6); g.fill();
    g.fillStyle = '#16161C'; g.fillText(text, w / 2, h / 2 + 2);
  }
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; const r = { t, a: c.width / c.height }; spriteCache.set(k, r); return r;
}
export function label(text, kind = 'bubble', height = 0.5) {
  const { t, a } = labelTex(text, kind);
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: t, depthTest: kind !== 'tag', toneMapped: false, transparent: true }));
  s.scale.set(height * a, height, 1); s.userData = { text, kind, height }; return s;
}
export function relabel(s, text) { if (s.userData.text === text) return; const { t, a } = labelTex(text, s.userData.kind); s.material.map = t; s.material.needsUpdate = true; s.scale.set(s.userData.height * a, s.userData.height, 1); s.userData.text = text; }

// ---------- the avatar ----------
// proportions: legs 1 tall, torso 1 tall x 1 wide x 0.5 deep, arms 0.5 wide, head 0.62 cube. Total ≈ 2.7.
const BOX = new THREE.BoxGeometry(1, 1, 1);
export class Avatar {
  constructor(look) {
    this.look = { skin: '#F2C9A0', torso: '#3A7BD5', arms: null, legs: '#2D3A55', ...look };
    const L = this.look, G = (this.group = new THREE.Group());
    const part = (w, h, d, col, px, py, pz, parent = G) => { const m = new THREE.Mesh(BOX, mat(col)); m.scale.set(w, h, d); m.position.set(px, py, pz); m.castShadow = true; m.receiveShadow = true; parent.add(m); return m; };
    const pivot = (x, y, parent = G) => { const p = new THREE.Group(); p.position.set(x, y, 0); parent.add(p); return p; };
    this.body = pivot(0, 0); // whole-body bob/lean
    this.legL = pivot(-0.25, 1.0, this.body); this.legR = pivot(0.25, 1.0, this.body);
    part(0.48, 1.0, 0.5, L.legs, 0, -0.5, 0, this.legL); part(0.48, 1.0, 0.5, L.legs, 0, -0.5, 0, this.legR);
    this.torso = part(1.0, 1.0, 0.5, L.torso, 0, 1.5, 0, this.body);
    if (L.shirt) { const side = mat(L.torso); this.torso.material = [side, side, side, side, new THREE.MeshStandardMaterial({ map: shirtTex(L.shirt, { base: L.torso, ...(L.shirtA || {}) }), roughness: 0.55 }), side]; }
    if (L.stripe) part(1.02, 0.18, 0.52, L.stripe, 0, 1.55, 0, this.body);
    this.armL = pivot(-0.75, 1.92, this.body); this.armR = pivot(0.75, 1.92, this.body);
    const ac = L.arms || L.skin;
    part(0.48, 0.95, 0.48, ac, 0, -0.45, 0, this.armL); part(0.48, 0.95, 0.48, ac, 0, -0.45, 0, this.armR);
    this.headG = pivot(0, 2.0, this.body);
    const sk = () => new THREE.MeshStandardMaterial({ color: L.skin, roughness: 0.5 }); const hm = [sk(), sk(), sk(), sk(), new THREE.MeshStandardMaterial({ map: faceTex(L.skin, 'neutral', 0, L.fx || {}), roughness: 0.5 }), sk()];
    this.head = new THREE.Mesh(BOX, hm); this.head.scale.set(0.66, 0.66, 0.66); this.head.position.y = 0.36; this.head.castShadow = true; this.headG.add(this.head);
    this.faceMat = hm[4];
    this.extras = new THREE.Group(); this.headG.add(this.extras); this.dress(L);
    this.tag = null; if (L.name) { this.tag = label(L.name, 'tag', 0.34); this.tag.position.y = 3.25; G.add(this.tag); }
    this.bubble = label('...', 'bubble', 0.5); this.bubble.position.y = 3.4; this.bubble.visible = false; G.add(this.bubble);
    this.mood = 'neutral'; this.blinkOn = 0;
    this.phone = new THREE.Mesh(BOX, mat('#111318')); this.phone.scale.set(0.3, 0.06, 0.52); this.phone.position.set(0, -1.0, 0.18); this.armR.add(this.phone);
    this.scr = new THREE.Mesh(new THREE.PlaneGeometry(0.26, 0.46), new THREE.MeshBasicMaterial({ color: '#9FE8FF', toneMapped: false })); this.scr.rotation.x = -Math.PI / 2; this.scr.position.set(0, -0.965, 0.18); this.scr.rotation.x = Math.PI / 2; this.armR.add(this.scr);
    this.pad = new THREE.Group(); { const b = new THREE.Mesh(BOX, mat('#2A2F45')); b.scale.set(1.0, 0.12, 0.34); this.pad.add(b); [[-0.3, '#FF6B5A'], [0.3, '#3DE0B0']].forEach(([x, c]) => { const k = new THREE.Mesh(BOX, mat(c)); k.scale.set(0.12, 0.06, 0.12); k.position.set(x, 0.08, 0); this.pad.add(k); }); }
    this.pad.position.set(0, 1.5, 0.88); this.body.add(this.pad);
  }
  dress(L) {
    this.extras.clear(); const add = (w, h, d, col, x, y, z, o) => { const m = new THREE.Mesh(BOX, mat(col, o)); m.scale.set(w, h, d); m.position.set(x, y, z); m.castShadow = true; this.extras.add(m); return m; };
    if (L.hair === 'short') { add(0.72, 0.2, 0.72, L.hairCol, 0, 0.74, -0.02); add(0.72, 0.42, 0.14, L.hairCol, 0, 0.52, -0.33); }
    if (L.hair === 'long') { add(0.74, 0.2, 0.74, L.hairCol, 0, 0.74, 0); add(0.76, 0.9, 0.22, L.hairCol, 0, 0.3, -0.3); add(0.12, 0.7, 0.6, L.hairCol, -0.38, 0.4, -0.05); add(0.12, 0.7, 0.6, L.hairCol, 0.38, 0.4, -0.05); }
    if (L.hair === 'spiky') { for (let i = 0; i < 5; i++) { const m = add(0.2, 0.36, 0.2, L.hairCol, -0.28 + i * 0.14, 0.82 + (i % 2) * 0.08, -0.05); m.rotation.z = (i - 2) * 0.25; } add(0.72, 0.16, 0.72, L.hairCol, 0, 0.7, 0); }
    if (L.hair === 'buns') { add(0.72, 0.18, 0.72, L.hairCol, 0, 0.72, 0); add(0.74, 0.5, 0.16, L.hairCol, 0, 0.5, -0.32); add(0.3, 0.3, 0.3, L.hairCol, -0.36, 0.86, -0.05); add(0.3, 0.3, 0.3, L.hairCol, 0.36, 0.86, -0.05);
      add(0.32, 0.06, 0.32, L.band || '#FFFFFF', -0.36, 0.72, -0.05); add(0.32, 0.06, 0.32, L.band || '#FFFFFF', 0.36, 0.72, -0.05); }
    if (L.hair === 'sidepart') { add(0.72, 0.18, 0.72, L.hairCol, 0, 0.74, -0.02, { roughness: 0.2 }); add(0.72, 0.4, 0.14, L.hairCol, 0, 0.52, -0.33, { roughness: 0.2 }); const f = add(0.5, 0.14, 0.2, L.hairCol, 0.12, 0.66, 0.3, { roughness: 0.2 }); f.rotation.z = -0.12; }
    if (L.hair === 'mummy') { add(0.72, 0.16, 0.72, L.hairCol, 0, 0.73, 0); add(0.72, 0.5, 0.14, L.hairCol, 0, 0.5, -0.33); add(0.36, 0.36, 0.3, L.hairCol, 0, 0.42, -0.5); add(0.12, 0.12, 0.12, '#F2C230', 0.18, 0.55, -0.62); }
    if (L.headphones) { const hp = new THREE.Group(); hp.position.y = -0.38; this.extras.add(hp); const b = (w, h, d, x, y, z, c) => { const m = new THREE.Mesh(BOX, mat(c)); m.scale.set(w, h, d); m.position.set(x, y, z); m.castShadow = true; hp.add(m); };
      b(0.86, 0.1, 0.1, 0, 0, -0.26, L.headphones); b(0.1, 0.1, 0.5, -0.43, 0, 0, L.headphones); b(0.1, 0.1, 0.5, 0.43, 0, 0, L.headphones); b(0.16, 0.3, 0.3, -0.44, -0.05, 0.22, '#1C1C24'); b(0.16, 0.3, 0.3, 0.44, -0.05, 0.22, '#1C1C24'); }
    if (L.beanie) { add(0.74, 0.3, 0.74, L.beanie, 0, 0.74, 0); add(0.78, 0.1, 0.78, L.beanieBand || '#FFFFFF', 0, 0.58, 0); add(0.18, 0.18, 0.18, L.beanieBand || '#FFFFFF', 0, 0.98, 0); }
    if (L.cap) { add(0.74, 0.24, 0.74, L.cap, 0, 0.78, 0); add(0.62, 0.06, 0.4, L.cap, 0, 0.68, 0.5); }
    if (L.horns) { const a = add(0.12, 0.4, 0.12, L.horns, -0.26, 0.86, 0); a.rotation.z = 0.4; const b = add(0.12, 0.4, 0.12, L.horns, 0.26, 0.86, 0); b.rotation.z = -0.4; }
    if (L.crown) { const gold = { metalness: 0.9, roughness: 0.25, emissive: '#5A3A00', emissiveIntensity: 0.4 };
      add(0.74, 0.16, 0.74, '#F5C842', 0, 0.76, 0, gold); [[-0.3, -0.3], [0.3, -0.3], [-0.3, 0.3], [0.3, 0.3], [0, 0.34], [0, -0.34], [0.34, 0], [-0.34, 0]].forEach(([x, z]) => add(0.12, 0.26, 0.12, '#F5C842', x, 0.94, z, gold));
      add(0.14, 0.14, 0.04, '#E03A4A', 0, 0.8, 0.38, { emissive: '#E03A4A', emissiveIntensity: 0.6 }); }
  }
  restyle(patch) {
    Object.assign(this.look, patch); const L = this.look;
    if (patch.torso) this.torso.material = mat(L.torso);
    if (patch.legs) { this.legL.children[0].material = mat(L.legs); this.legR.children[0].material = mat(L.legs); }
    if (patch.arms) { this.armL.children[0].material = mat(L.arms); this.armR.children[0].material = mat(L.arms); }
    if (patch.torsoMat) this.torso.material = patch.torsoMat;
    this.dress(L);
  }
  at(x, y, z, ry = null) { this.group.position.set(x, y, z); if (ry != null) this.group.rotation.y = ry; return this; }
  face(v) { this.group.rotation.y = Math.atan2(v.x - this.group.position.x, v.z - this.group.position.z); return this; }
  /** st = { mood, blink, run (phase rad), walk, jump (0..1 air), fall, wave, armsUp, lean, say, tint } */
  set(st = {}) {
    const mood = st.mood || 'neutral', bl = st.blink ? 1 : 0;
    const op = st.talk != null && Math.sin(st.talk * 15) > -0.1 ? 1 : 0, tr = st.tears ? 1 : 0; const fk = mood + bl + op + tr;
    if (fk !== this.fk) { this.faceMat.map = faceTex(this.look.skin, mood, bl, { ...(this.look.fx || {}), ...(op ? { open: 1 } : {}), ...(tr ? { tears: 1 } : {}) }); this.faceMat.needsUpdate = true; this.fk = fk; }
    let lL = 0, lR = 0, aL = 0, aR = 0, aLz = 0, aRz = 0, bob = 0;
    if (st.run != null) { const s = Math.sin(st.run); lL = s * 0.9; lR = -s * 0.9; aL = -s * 1.0; aR = s * 1.0; bob = Math.abs(Math.cos(st.run)) * 0.08; }
    if (st.walk != null) { const s = Math.sin(st.walk); lL = s * 0.5; lR = -s * 0.5; aL = -s * 0.5; aR = s * 0.5; }
    if (st.jump) { const j = st.jump; lL = -0.5 * j; lR = 0.5 * j; aL = -2.6 * j; aR = -2.6 * j; aLz = 0.3 * j; aRz = -0.3 * j; }
    if (st.fall) { const w = st.fall; aL = -2.8 + Math.sin(w * 18) * 0.5; aR = -2.8 + Math.cos(w * 18) * 0.5; aLz = 0.6; aRz = -0.6; lL = Math.sin(w * 14) * 0.6; lR = -Math.sin(w * 14) * 0.6; }
    if (st.wave) { aR = -2.7; aRz = -0.3 + Math.sin(st.wave * 9) * 0.35; }
    if (st.armsUp) { aL = aR = -2.9 * st.armsUp; aLz = 0.35 * st.armsUp; aRz = -0.35 * st.armsUp; }
    if (st.laugh) { aL = aR = -0.6; aLz = 0.5; aRz = -0.5; bob = Math.abs(Math.sin(st.laugh * 14)) * 0.07; }
    if (st.point) { aR = -1.55; }
    if (st.phone) { aR = -1.25; aRz = 0.25; }
    if (st.pad) { aL = aR = -1.15; aLz = -0.25; aRz = 0.25; }
    if (st.thumbs) { aR = -1.9; aRz = -0.1; }
    if (st.sit) { lL = lR = -1.57; }
    if (st.facepalm) { aR = -2.5; aRz = 0.75; }
    this.legL.rotation.x = lL; this.legR.rotation.x = lR; this.armL.rotation.x = aL; this.armR.rotation.x = aR; this.armL.rotation.z = aLz; this.armR.rotation.z = aRz;
    this.body.position.y = bob; this.body.rotation.x = st.lean || 0; this.headG.rotation.x = st.nod || 0; this.headG.rotation.y = st.turn || 0;
    this.phone.visible = this.scr.visible = !!st.phone; this.pad.visible = !!st.pad;
    if (st.say) { this.bubble.visible = true; relabel(this.bubble, st.say); } else this.bubble.visible = false;
    if (this.tag) this.tag.visible = st.tag === true;
    return this;
  }
}

// ---------- world pieces ----------
export function brick(w, h, d, col, o = {}) {
  const top = studMat(col, Math.max(1, w), Math.max(1, d), o), side = new THREE.MeshStandardMaterial({ color: col, roughness: 0.5, ...o });
  const m = new THREE.Mesh(BOX, [side, side, top, side, side, side]); m.scale.set(w, h, d); m.castShadow = true; m.receiveShadow = true; return m;
}
export function baseplate(size, col = '#6DBB52') {
  const m = new THREE.Mesh(new THREE.PlaneGeometry(size, size), studMat(col, size / 2, size / 2)); m.rotation.x = -Math.PI / 2; m.receiveShadow = true; return m;
}
export function lava(size) {
  const c = document.createElement('canvas'); c.width = c.height = 256; const g = c.getContext('2d');
  g.fillStyle = '#FF4A12'; g.fillRect(0, 0, 256, 256);
  for (let i = 0; i < 60; i++) { const x = (Math.sin(i * 91.7) * 0.5 + 0.5) * 256, y = (Math.sin(i * 37.3) * 0.5 + 0.5) * 256; const gr = g.createRadialGradient(x, y, 0, x, y, 30 + (i % 5) * 8); gr.addColorStop(0, i % 3 ? '#FFC23A' : '#FFE57A'); gr.addColorStop(1, 'rgba(255,74,18,0)'); g.fillStyle = gr; g.fillRect(0, 0, 256, 256); }
  const t = new THREE.CanvasTexture(c); t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(size / 12, size / 12); t.colorSpace = THREE.SRGBColorSpace;
  const m = new THREE.Mesh(new THREE.PlaneGeometry(size, size), new THREE.MeshBasicMaterial({ map: t, toneMapped: false })); m.rotation.x = -Math.PI / 2;
  m.userData.tick = (time) => { t.offset.set(time * 0.03, time * 0.05); }; return m;
}
export function spinner(len = 7, col = '#E8333F') {
  const g = new THREE.Group(); const p = brick(0.7, 1.4, 0.7, '#2B2B33'); p.position.y = 0.7; g.add(p);
  const bar = new THREE.Mesh(BOX, mat(col, { emissive: col, emissiveIntensity: 0.5 })); bar.scale.set(len, 0.35, 0.35); bar.position.y = 1.1; bar.castShadow = true; g.add(bar);
  g.userData.bar = bar; return g;
}
export function doorTex(lines, glow = false) {
  const c = document.createElement('canvas'); c.width = 512; c.height = 768; const g = c.getContext('2d');
  const gr = g.createLinearGradient(0, 0, 0, 768); gr.addColorStop(0, '#FFE58A'); gr.addColorStop(1, '#D99A1E'); g.fillStyle = gr; g.fillRect(0, 0, 512, 768);
  g.strokeStyle = '#A86E0C'; g.lineWidth = 14; g.strokeRect(40, 40, 432, 688); g.strokeRect(80, 360, 352, 320);
  g.fillStyle = '#A86E0C'; g.beginPath(); g.arc(420, 400, 18, 0, 7); g.fill();
  g.textAlign = 'center'; g.textBaseline = 'middle';
  lines.forEach(([txt, y, size], i) => { g.font = `900 ${size}px Inter`; if (glow) { g.shadowColor = '#FFFFFF'; g.shadowBlur = 24; } g.fillStyle = '#5A3400'; g.fillText(txt, 256, y); g.shadowBlur = 0; });
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
}

// ---------- Zeta Bot: the mascot (floating navy cube, mint screen face, coral antenna) ----------
export class ZetaBot {
  constructor() {
    const G = (this.group = new THREE.Group()); this.inner = new THREE.Group(); G.add(this.inner);
    const shell = new THREE.Mesh(BOX, mat('#16204A', { roughness: 0.3, metalness: 0.3 })); shell.scale.set(1.0, 0.82, 0.8); shell.castShadow = true; this.inner.add(shell);
    this.screen = new THREE.Mesh(new THREE.PlaneGeometry(0.84, 0.64), new THREE.MeshBasicMaterial({ map: botFace('happy'), toneMapped: false })); this.screen.position.z = 0.405; this.inner.add(this.screen);
    [-1, 1].forEach((sx) => { const e = new THREE.Mesh(BOX, mat('#3DE0B0', { emissive: '#3DE0B0', emissiveIntensity: 0.6 })); e.scale.set(0.12, 0.34, 0.34); e.position.set(sx * 0.56, 0, 0); this.inner.add(e); });
    const st = new THREE.Mesh(BOX, mat('#C9D0E8')); st.scale.set(0.06, 0.3, 0.06); st.position.y = 0.55; this.inner.add(st);
    this.bulb = new THREE.Mesh(new THREE.SphereGeometry(0.1, 16, 12), new THREE.MeshBasicMaterial({ color: '#FF6B5A', toneMapped: false })); this.bulb.position.y = 0.74; this.inner.add(this.bulb);
    const jet = new THREE.Mesh(new THREE.ConeGeometry(0.22, 0.45, 16), new THREE.MeshBasicMaterial({ color: '#7CF5D6', transparent: true, opacity: 0.55, toneMapped: false })); jet.rotation.x = Math.PI; jet.position.y = -0.62; this.inner.add(jet); this.jet = jet;
    const ring = new THREE.Mesh(BOX, mat('#3DE0B0', { emissive: '#3DE0B0', emissiveIntensity: 0.5 })); ring.scale.set(0.5, 0.06, 0.5); ring.position.y = -0.43; this.inner.add(ring);
    this.tag = label('ZETA BOT', 'tag', 0.3); this.tag.position.y = 1.1; G.add(this.tag);
    this.bubble = label('...', 'bubble', 0.5); this.bubble.position.y = 1.55; this.bubble.visible = false; G.add(this.bubble);
    this.mood = 'happy';
  }
  at(x, y, z) { this.group.position.set(x, y, z); return this; }
  face(v) { this.group.rotation.y = Math.atan2(v.x - this.group.position.x, v.z - this.group.position.z); return this; }
  set({ t = 0, mood = 'happy', say = null, scale = 1, tag = false } = {}) {
    this.inner.position.y = Math.sin(t * 2.4) * 0.08; this.inner.rotation.z = Math.sin(t * 1.7) * 0.05; this.group.scale.setScalar(Math.max(0.001, scale));
    this.jet.scale.y = 0.8 + Math.sin(t * 30) * 0.2; this.bulb.material.color.set(Math.sin(t * 6) > 0 ? '#FF6B5A' : '#FFB4A8');
    if (mood !== this.mood) { this.screen.material.map = botFace(mood); this.screen.material.needsUpdate = true; this.mood = mood; }
    if (say) { this.bubble.visible = true; relabel(this.bubble, say); } else this.bubble.visible = false; this.tag.visible = tag; return this;
  }
}
const botCache = new Map();
function botFace(mood) {
  if (botCache.has(mood)) return botCache.get(mood);
  const c = document.createElement('canvas'); c.width = 256; c.height = 196; const g = c.getContext('2d');
  g.fillStyle = '#0A1030'; g.beginPath(); g.roundRect(0, 0, 256, 196, 30); g.fill();
  g.fillStyle = '#3DE0B0'; g.shadowColor = '#3DE0B0'; g.shadowBlur = 16; g.strokeStyle = '#3DE0B0'; g.lineWidth = 12; g.lineCap = 'round';
  if (mood === 'happy') { g.beginPath(); g.arc(80, 92, 22, Math.PI, 0); g.stroke(); g.beginPath(); g.arc(176, 92, 22, Math.PI, 0); g.stroke(); }
  else { g.beginPath(); g.roundRect(62, 60, 34, 52, 12); g.fill(); g.beginPath(); g.roundRect(160, 60, 34, 52, 12); g.fill(); }
  if (mood === 'serious') { g.beginPath(); g.moveTo(98, 140); g.lineTo(158, 140); g.stroke(); g.beginPath(); g.moveTo(56, 44); g.lineTo(100, 56); g.moveTo(200, 44); g.lineTo(156, 56); g.stroke(); }
  else { g.beginPath(); g.arc(128, 128, 30, 0.15 * Math.PI, 0.85 * Math.PI); g.stroke(); }
  g.fillStyle = 'rgba(255,107,90,0.5)'; g.shadowBlur = 0; g.beginPath(); g.ellipse(48, 132, 16, 9, 0, 0, 7); g.ellipse(208, 132, 16, 9, 0, 0, 7); g.fill();
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; botCache.set(mood, t); return t;
}

// ---------- canvas-texture panel (calendar, poster, clock face) ----------
export function panel(w, h, draw, px = 512) {
  const c = document.createElement('canvas'); c.width = px; c.height = Math.round(px * h / w); const g = c.getContext('2d');
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace;
  const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshStandardMaterial({ map: t, roughness: 0.7 }));
  m.userData.draw = (...a) => { g.clearRect(0, 0, c.width, c.height); draw(g, c.width, c.height, ...a); t.needsUpdate = true; }; m.userData.draw(); return m;
}
