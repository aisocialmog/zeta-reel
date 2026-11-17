// Zeta blocky kit: brand palette, cast, sets (room, classroom, gully), camera helper and 2D overlays.
import * as THREE from 'three';
import { ctx, clamp, lerp, seg, eo, eio, eob } from './lib.js';
import { camera } from './engine.js';
import * as WD from './world.js';
import { Avatar, ZetaBot, brick, panel, mat } from './blox.js';

export const V3 = (x, y, z) => new THREE.Vector3(x, y, z);
export const mix = (a, b, k) => a.clone().lerp(b, k);
export const blink = (t, off = 0) => (((t + off) % 3.1) < 0.12 ? 1 : 0);
export const Z = { navy: '#0E1530', indigo: '#4B3FD8', mint: '#3DE0B0', coral: '#FF6B5A', cream: '#FFF6EA', red: '#FF4D4D' };

export const LOOKS = {
  chhotu: { skin: '#E0A878', torso: Z.indigo, shirt: 'hoodieZ', shirtA: { logo: Z.coral, cord: Z.mint }, arms: Z.indigo, legs: '#1C2340', hair: 'spiky', hairCol: Z.mint, headphones: Z.coral, name: 'Chhotu' },
  mishti: { skin: '#F1C08F', torso: Z.mint, shirt: 'jacket', shirtA: { accent: Z.coral }, arms: Z.mint, legs: '#3A3F8F', hair: 'buns', hairCol: Z.coral, band: '#FFFFFF', fx: { glasses: 'round', blush: 1 }, name: 'Mishti' },
  mummy: { skin: '#D9A27A', torso: '#8E1B3A', shirt: 'kurti', shirtA: { trim: '#F2C230' }, arms: '#D9A27A', legs: '#B0234A', hair: 'mummy', hairCol: '#1E1612', fx: { bindi: 1 }, name: 'Mummy' },
  sharma: { skin: '#EAC29A', torso: '#FFFFFF', shirt: 'shirtTie', shirtA: { tie: Z.indigo }, arms: '#FFFFFF', legs: '#2A2F45', hair: 'sidepart', hairCol: '#14110F', fx: { glasses: 'thick' }, name: 'Sharma ji ka beta' },
  aunty: { skin: '#E8B48C', torso: '#6A2C91', shirt: 'kurti', shirtA: { trim: '#3DE0B0' }, arms: '#E8B48C', legs: '#4A1E66', hair: 'mummy', hairCol: '#3A2E2A', fx: { bindi: 1, glasses: 'round' }, name: 'Sharma Aunty' },
  kabir: { skin: '#C98F63', torso: Z.navy, shirt: 'stripes', shirtA: { stripe: Z.coral, badge: Z.mint }, arms: Z.navy, legs: '#2A2F45', hair: 'short', hairCol: '#1E1612', beanie: Z.coral, beanieBand: Z.mint, fx: { freckles: 1 }, name: 'Kabir' },
};
export const extras = [
  { skin: '#F4CDA6', torso: '#3DDC97', legs: '#2A2F45', hair: 'short', hairCol: '#3A2A20' },
  { skin: '#8D5A3B', torso: '#FFB703', legs: '#2A2F45', hair: 'spiky', hairCol: '#1E1E1E' },
  { skin: '#F0C08F', torso: '#4CC9F0', legs: '#2A2F45', hair: 'long', hairCol: '#7A4A2E' },
  { skin: '#C98F63', torso: '#B388FF', legs: '#2A2F45', hair: 'buns', hairCol: '#1E1612' },
  { skin: '#E0A878', torso: '#FF8A3D', legs: '#2A2F45', hair: 'sidepart', hairCol: '#2A1E14' },
  { skin: '#F4CDA6', torso: '#E8333F', legs: '#2A2F45', hair: 'long', hairCol: '#1E1612' },
];
export const person = (k) => new Avatar(typeof k === 'string' ? { ...LOOKS[k], fx: { ...(LOOKS[k].fx || {}) } } : k);

/** a bedroom at origin (walls tinted), with window, calendar, bed, desk, door. Returns handles. */
export function room(scene, E, { wall = '#DDE3FF', side = '#C9D1FF', calText = 'BOARDS COUNTDOWN', day = 91, poster = true, rug = Z.coral, blanket = Z.indigo, origin = [0, 0, 0] } = {}) {
  const G = new THREE.Group(); G.position.set(...origin); scene.add(G);
  const floor = brick(10, 0.2, 10, '#B9895E'); floor.position.set(0, -0.1, 0); G.add(floor);
  const wm = new THREE.MeshStandardMaterial({ color: wall, roughness: 0.8 }), sm = new THREE.MeshStandardMaterial({ color: side, roughness: 0.8 });
  const back = new THREE.Mesh(new THREE.BoxGeometry(10, 5, 0.2), wm); back.position.set(0, 2.5, -4.1); back.receiveShadow = true; G.add(back);
  [-5.1, 5.1].forEach((x) => { const w = new THREE.Mesh(new THREE.BoxGeometry(0.2, 5, 10), sm); w.position.set(x, 2.5, 0); w.receiveShadow = true; G.add(w); });
  const sk = brick(10, 0.25, 0.1, Z.indigo); sk.position.set(0, 0.12, -3.98); G.add(sk);
  const win = panel(2.0, 1.6, (g, w, h, night) => {
    const gr = g.createLinearGradient(0, 0, 0, h); gr.addColorStop(0, night ? '#0B1240' : '#58B6FF'); gr.addColorStop(1, night ? '#2A2F6B' : '#CFEFFF'); g.fillStyle = gr; g.fillRect(0, 0, w, h);
    if (night) { g.fillStyle = '#FFF7D6'; g.beginPath(); g.arc(w * 0.72, h * 0.3, 36, 0, 7); g.fill(); g.fillStyle = '#0B1240'; g.beginPath(); g.arc(w * 0.68, h * 0.27, 32, 0, 7); g.fill(); for (let i = 0; i < 30; i++) { g.fillStyle = '#fff'; g.fillRect((i * 97) % w, (i * 53) % (h * 0.6), 3, 3); } }
    else { g.fillStyle = '#FFE58A'; g.beginPath(); g.arc(w * 0.25, h * 0.3, 40, 0, 7); g.fill(); }
    g.fillStyle = night ? '#141A3A' : '#7FA7C8'; for (let i = 0; i < 6; i++) g.fillRect(i * 90, h * 0.62 + (i % 3) * 18, 70, h);
    g.strokeStyle = '#F4F4F4'; g.lineWidth = 26; g.strokeRect(0, 0, w, h); g.lineWidth = 16; g.beginPath(); g.moveTo(w / 2, 0); g.lineTo(w / 2, h); g.moveTo(0, h / 2); g.lineTo(w, h / 2); g.stroke();
  });
  win.material = new THREE.MeshBasicMaterial({ map: win.material.map, toneMapped: false }); win.position.set(-2.4, 2.9, -3.99); G.add(win);
  const cal = panel(1.3, 1.7, (g, w, h, d = day, red = 0) => {
    g.fillStyle = '#FFFFFF'; g.fillRect(0, 0, w, h); g.fillStyle = Z.coral; g.fillRect(0, 0, w, h * 0.2);
    g.fillStyle = '#fff'; g.font = `900 ${h * 0.085}px Inter`; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(calText, w / 2, h * 0.1);
    g.fillStyle = Z.navy; g.font = `900 ${h * 0.12}px Inter`; g.fillText('DAY', w / 2, h * 0.34); g.font = `900 ${h * 0.36}px Inter`; g.fillStyle = red ? '#E8333F' : Z.navy; g.fillText(String(d), w / 2, h * 0.62);
  });
  cal.position.set(0.9, 2.9, -3.99); G.add(cal);
  if (poster) { const p = panel(0.9, 1.2, (g, w, h) => { g.fillStyle = Z.navy; g.fillRect(0, 0, w, h); g.fillStyle = Z.mint; g.font = `900 ${h * 0.42}px Inter`; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('Z', w / 2, h * 0.42);
    g.fillStyle = '#fff'; g.font = `900 ${h * 0.08}px Inter`; g.fillText('ZETA GALAXY', w / 2, h * 0.78); }); p.position.set(5.0, 2.9, -1.6); p.rotation.y = -Math.PI / 2; G.add(p); }
  const door = brick(1.4, 3.0, 0.12, '#7A4E2D'); door.position.set(3.3, 1.5, -3.98); G.add(door);
  { const fr = brick(2.4, 0.5, 4.2, '#8A5A3A'); fr.position.set(-3.7, 0.25, -1.7); G.add(fr); const mt = brick(2.3, 0.3, 4.0, '#F4F1EA'); mt.position.set(-3.7, 0.65, -1.7); G.add(mt);
    const bl = brick(2.35, 0.14, 2.6, blanket); bl.position.set(-3.7, 0.86, -0.9); G.add(bl); const pw = brick(1.4, 0.3, 0.8, '#FFFFFF'); pw.position.set(-3.7, 0.95, -3.3); G.add(pw); }
  const desk = new THREE.Group(); desk.position.set(4.2, 0, 0.6); G.add(desk);
  { const top = brick(1.3, 0.12, 2.6, '#C9935E'); top.position.y = 1.35; desk.add(top);
    [[-0.55, -1.2], [0.55, -1.2], [-0.55, 1.2], [0.55, 1.2]].forEach(([x, z]) => { const l = brick(0.1, 1.3, 0.1, '#8A5A3A'); l.position.set(x, 0.65, z); desk.add(l); });
    const lp = brick(0.12, 0.8, 0.12, '#2A2F45'); lp.position.set(0.4, 1.8, 0.9); desk.add(lp); const sh = brick(0.5, 0.25, 0.5, Z.mint); sh.position.set(0.25, 2.2, 0.75); desk.add(sh);
    const ch = brick(1.0, 0.15, 1.0, Z.indigo); ch.position.set(-1.25, 0.85, 0.1); desk.add(ch); const cb = brick(0.15, 1.0, 1.0, Z.indigo); cb.position.set(-1.75, 1.4, 0.1); desk.add(cb); }
  const book = new THREE.Group(); book.position.set(4.05, 1.43, 0.7); G.add(book);
  { const p1 = brick(0.5, 0.04, 0.7, '#FFFFFF'); p1.position.x = -0.26; p1.rotation.z = 0.06; book.add(p1); const p2 = brick(0.5, 0.04, 0.7, '#FFFFFF'); p2.position.x = 0.26; p2.rotation.z = -0.06; book.add(p2); }
  const rg = brick(3.6, 0.04, 2.6, rug); rg.position.set(0, 0.02, 0.6); G.add(rg);
  let calKey = '', winNight = null;
  return { G, desk, book, setCal: (d, red = 0) => { const k = `${d}${red}`; if (k !== calKey) { cal.userData.draw(d, red); calKey = k; } }, setNight: (n) => { if (n !== winNight) { win.userData.draw(n); winNight = n; } },
    p: (x, y, z) => V3(x + origin[0], y + origin[1], z + origin[2]) };
}

/** a classroom: blackboard wall, rows of desks. */
export function classroom(scene, { origin = [40, 0, 0], board = 'BOARDS 2027' } = {}) {
  const G = new THREE.Group(); G.position.set(...origin); scene.add(G);
  const floor = brick(14, 0.2, 14, '#9C7A5C'); floor.position.y = -0.1; G.add(floor);
  const back = new THREE.Mesh(new THREE.BoxGeometry(14, 5, 0.2), mat('#EFE3C8')); back.position.set(0, 2.5, -5); back.receiveShadow = true; G.add(back);
  [-7, 7].forEach((x) => { const w = new THREE.Mesh(new THREE.BoxGeometry(0.2, 5, 14), mat('#E2D4B6')); w.position.set(x, 2.5, 0); G.add(w); });
  const bb = panel(5.5, 2.2, (g, w, h) => { g.fillStyle = '#1F4D3A'; g.fillRect(0, 0, w, h); g.strokeStyle = '#8A5A3A'; g.lineWidth = 24; g.strokeRect(0, 0, w, h);
    g.fillStyle = 'rgba(255,255,255,0.9)'; g.font = `700 ${h * 0.16}px Inter`; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(board, w / 2, h * 0.32); g.font = `600 ${h * 0.1}px Inter`; g.fillText('Pre-boards: jaldi', w / 2, h * 0.6); }, 1024);
  bb.position.set(0, 2.6, -4.88); G.add(bb);
  const desks = [];
  for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) { const d = brick(1.6, 0.12, 0.9, '#C9935E'); const x = -4 + c * 4, z = -1.5 + r * 2.6; d.position.set(x, 1.2, z); G.add(d); const l = brick(1.4, 1.15, 0.1, '#8A5A3A'); l.position.set(x, 0.58, z - 0.35); G.add(l); desks.push(V3(x + origin[0], 0, z + origin[2])); }
  return { G, desks, p: (x, y, z) => V3(x + origin[0], y + origin[1], z + origin[2]) };
}

/** an evening gully: road, house blocks both sides, wickets. */
export function gully(scene, { origin = [0, 0, 60] } = {}) {
  const G = new THREE.Group(); G.position.set(...origin); scene.add(G);
  const road = brick(8, 0.2, 40, '#8C8C94'); road.position.y = -0.1; G.add(road);
  ['#F2C9D6', '#BFE3F2', '#F7E1A8', '#CDEBC4', '#E8C4A8', '#D7CCF2'].forEach((c, i) => { [-1, 1].forEach((sd) => { const h = 4 + ((i + (sd > 0 ? 1 : 0)) % 3); const b = brick(5, h, 5, c); b.position.set(sd * 7, h / 2, -16 + i * 6.5); G.add(b);
    const w = brick(1.2, 1.0, 0.1, '#3A4A6A'); w.position.set(sd * 4.45, h - 1.4, -16 + i * 6.5); w.rotation.y = Math.PI / 2; G.add(w); }); });
  const wk = new THREE.Group(); [-0.2, 0, 0.2].forEach((x) => { const s = brick(0.08, 1.0, 0.08, '#F4E2B8'); s.position.set(x, 0.5, 0); wk.add(s); }); wk.position.set(0, 0, -6); G.add(wk);
  const ball = new THREE.Mesh(new THREE.SphereGeometry(0.12, 16, 12), mat('#E8333F')); G.add(ball);
  return { G, ball, p: (x, y, z) => V3(x + origin[0], y + origin[1], z + origin[2]) };
}

/** camera + render. o.f scales distance from the target (9:16 needs distance). */
export function makeShoot(E, scene) {
  const cam = camera(40); const LOOK = { aperture: 0, bloom: 0.3, sat: 1.15 };
  const shoot = (from, to, at, at2, k, o = {}) => {
    const fov = o.fov || 40; if (cam.fov !== fov) { cam.fov = fov; cam.updateProjectionMatrix(); }
    cam.position.copy(to ? mix(from, to, k) : from); const tgt = at2 ? mix(at, at2, k) : at.clone();
    const f = o.f ?? 1.6; cam.position.sub(tgt).multiplyScalar(f).add(tgt);
    if (o.shake) { cam.position.x += Math.sin(o.t * 61) * o.shake; cam.position.y += Math.cos(o.t * 53) * o.shake; }
    cam.lookAt(tgt); E.render(scene, cam, { ...LOOK, ...(o.look || {}) });
  };
  return { cam, shoot };
}

// ── 2D overlays ──
export const txt = (s, x, y, size, col, align = 'left', w = 900) => { ctx.font = `${w} ${size}px Inter`; ctx.fillStyle = col; ctx.textAlign = align; ctx.textBaseline = 'middle'; ctx.fillText(s, x, y); };
export const pill = (s, y, col = '#FFFFFF', bg = 'rgba(14,21,48,0.85)', size = 50, sc = 1, x = 540) => {
  ctx.save(); ctx.translate(x, y); ctx.scale(sc, sc); ctx.font = `900 ${size}px Inter`; const w = ctx.measureText(s).width + 70;
  ctx.fillStyle = bg; ctx.beginPath(); ctx.roundRect(-w / 2, -size * 0.85, w, size * 1.7, size * 0.85); ctx.fill();
  ctx.fillStyle = col; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(s, 0, 3); ctx.restore();
};
export const slam = (lines, y, p, fill = Z.mint, size = 120, rot = -0.04) => {
  if (p <= 0) return; ctx.save(); ctx.translate(540, y); ctx.rotate(rot); const s = lerp(2.2, 1, eob(clamp(p))); ctx.scale(s, s); ctx.globalAlpha = clamp(p * 2);
  ctx.font = `900 ${size}px Inter`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.lineJoin = 'round';
  lines.forEach((l, i) => { const yy = (i - (lines.length - 1) / 2) * size * 1.02; const fit = Math.min(1, 940 / ctx.measureText(l).width); ctx.save(); ctx.scale(fit, fit); ctx.lineWidth = size * 0.22; ctx.strokeStyle = '#070B1E'; ctx.strokeText(l, 0, yy / fit); ctx.fillStyle = fill; ctx.fillText(l, 0, yy / fit); ctx.restore(); });
  ctx.restore();
};
export const tick = (x, y, s, col = Z.mint) => { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = col; ctx.beginPath(); ctx.arc(0, 0, 30, 0, 7); ctx.fill(); ctx.strokeStyle = '#fff'; ctx.lineWidth = 8; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-13, 1); ctx.lineTo(-3, 12); ctx.lineTo(15, -10); ctx.stroke(); ctx.restore(); };
export const cross = (x, y, s) => { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = '#E8333F'; ctx.beginPath(); ctx.arc(0, 0, 30, 0, 7); ctx.fill(); ctx.strokeStyle = '#fff'; ctx.lineWidth = 8; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-11, -11); ctx.lineTo(11, 11); ctx.moveTo(11, -11); ctx.lineTo(-11, 11); ctx.stroke(); ctx.restore(); };
export const phoneUI = (x, y, sc, drawScreen) => {
  ctx.save(); ctx.translate(x, y); ctx.scale(sc, sc); ctx.fillStyle = 'rgba(0,0,0,0.35)'; ctx.beginPath(); ctx.roundRect(-262, -492, 540, 1000, 70); ctx.fill();
  ctx.fillStyle = '#0B0E18'; ctx.beginPath(); ctx.roundRect(-270, -500, 540, 1000, 70); ctx.fill(); ctx.save(); ctx.beginPath(); ctx.roundRect(-246, -476, 492, 952, 52); ctx.clip(); drawScreen(); ctx.restore();
  ctx.fillStyle = '#0B0E18'; ctx.beginPath(); ctx.roundRect(-70, -466, 140, 34, 17); ctx.fill(); ctx.restore();
};
export const dim = (a) => { ctx.save(); ctx.fillStyle = `rgba(7,11,30,${a})`; ctx.fillRect(0, 0, 1080, 1920); ctx.restore(); };
/** sepia "what-if" look: tint + film label */
export const sepia = (label, t) => { ctx.save(); ctx.globalCompositeOperation = 'color'; ctx.fillStyle = '#A0784A'; ctx.fillRect(0, 0, 1080, 1920); ctx.restore();
  ctx.save(); ctx.fillStyle = 'rgba(60,40,20,0.18)'; ctx.fillRect(0, 0, 1080, 1920); for (let i = 0; i < 6; i++) { ctx.fillStyle = 'rgba(255,240,210,0.25)'; ctx.fillRect(((i * 173 + t * 900) % 1080), 0, 2, 1920); } ctx.restore();
  pill(label, 230, '#FFE7B0', 'rgba(40,26,12,0.85)', 46); };
/** VHS rewind lines */
export const rewind = (p) => { if (p <= 0 || p >= 1) return; ctx.save(); for (let i = 0; i < 14; i++) { ctx.fillStyle = `rgba(255,255,255,${0.15 + (i % 3) * 0.08})`; ctx.fillRect(0, ((i * 157 + p * 4000) % 1920), 1080, 6 + (i % 4) * 4); }
  ctx.fillStyle = 'rgba(14,21,48,0.6)'; ctx.fillRect(0, 0, 1080, 1920); txt('◀◀ REWIND', 540, 900, 90, '#FFFFFF', 'center'); ctx.restore(); };
export const abCard = (t0, t, a, b, correctSide) => { // two big option buttons, A top / B bottom
  const p = seg(t, t0, t0 + 0.35); if (p <= 0) return;
  [['A', a, Z.coral, 640], ['B', b, Z.indigo, 830]].forEach(([k, s, col, y], i) => { const q = eob(clamp(p * 1.3 - i * 0.25)); ctx.save(); ctx.translate(540, y); ctx.scale(q, q);
    ctx.fillStyle = 'rgba(0,0,0,0.35)'; ctx.beginPath(); ctx.roundRect(-430, -70, 860, 150, 40); ctx.fill(); ctx.fillStyle = col; ctx.beginPath(); ctx.roundRect(-430, -80, 860, 150, 40); ctx.fill();
    ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(-350, -5, 46, 0, 7); ctx.fill(); txt(k, -350, -3, 60, col, 'center'); ctx.font = '900 46px Inter'; const fit = Math.min(1, 640 / ctx.measureText(s).width); ctx.save(); ctx.translate(-280, -3); ctx.scale(fit, fit); txt(s, 0, 0, 46, '#fff', 'left'); ctx.restore(); ctx.restore(); });
};
export { Avatar, ZetaBot, brick, panel, mat, WD, THREE, clamp, lerp, seg, eo, eio, eob, ctx };
