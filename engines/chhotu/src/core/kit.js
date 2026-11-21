// Survival Cutaway component zoo (import * as K). Flat side-view CUTAWAY world, original Zeta school kids, HUD + labels.
// World pieces draw in world space (the camera moves them); tag/stamp/titleCard/infoCard/hud/chip/endCard draw in
// SCREEN space (they ignore the camera), labels stay in the world so their pointer follows the object.
import { ctx, C, W, H, clamp, lerp, seg, eo, eob, pop, font, rr, circle, poly, withA, scaled, screen } from './lib.js';
const circ = circle;
/** seeded generator: const r = seeded(7); r() → 0..1 (same scatter every frame) */
function seeded(seed) { let s = seed * 9301 + 49297; return () => ((s = (s * 9301 + 49297) % 233280) / 233280); }
export const ramp = (t, t0, d) => clamp((t - t0) / d);   // 0→1 over d seconds from t0
/** extra camera inside a shot: zoom z toward (cx, cy) */
export function camera(z, cx = W / 2, cy = H / 2) { ctx.translate(W / 2, H / 2); ctx.scale(z, z); ctx.translate(-cx, -cy); }
/* keyframed counter: pts = [[t, value], ...] -> {v (animated), delta (last change), since} */
export function kf(t, pts) {
  let v = pts[0][1], pv = v, ct = -99;
  for (const [tt, val] of pts) if (t >= tt) { pv = v; v = val; ct = tt; }
  const a = eo(ramp(t, ct, 0.55));
  return { v: lerp(pv, v, a), delta: v - pv, since: t - ct };
}

/* ---------- world ---------- */
export const SKY = {
  day: ['#79c3ef', '#d4eef9'], dusk: ['#3d2b5e', '#f39a5b'], night: ['#0b1330', '#22305a'],
  storm: ['#232b36', '#59636e'], dawn: ['#f3b58b', '#fde6c8'], noon: ['#4fb0ec', '#bfe6fa']
};
export function sky(mood, t, hz = 1050) {
  const p = SKY[mood] || SKY.day, gr = ctx.createLinearGradient(0, 0, 0, hz);
  gr.addColorStop(0, p[0]); gr.addColorStop(1, p[1]); ctx.fillStyle = gr; ctx.fillRect(-400, -400, W + 800, hz + 400);
  if (mood === 'night' || mood === 'storm') {
    const r = seeded(7); for (let i = 0; i < 70; i++) { const x = r() * W, y = r() * hz * 0.8, tw = 0.5 + 0.5 * Math.sin(t * 2 + i);
      if (mood === 'night') circ(x, y, 1.5 + r() * 2, `rgba(255,255,255,${0.35 + 0.5 * tw})`); }
  }
  if (mood === 'day' || mood === 'noon') { circ(860, 260, 70, '#fff3b0'); circ(860, 260, 52, '#ffe066'); }
  if (mood === 'dusk' || mood === 'dawn') { circ(300, hz - 60, 90, 'rgba(255,214,150,.9)'); }
  if (mood === 'night') { circ(820, 240, 46, '#f4f1de'); circ(840, 228, 42, p[0]); }
  if (mood !== 'night') for (let i = 0; i < 3; i++) cloud(((i * 420 + t * 18) % (W + 400)) - 200, 220 + i * 110, 1 - i * 0.2, mood === 'storm' ? '#3b444f' : 'rgba(255,255,255,.85)');
  if (mood === 'storm') { ctx.strokeStyle = 'rgba(200,220,255,.35)'; ctx.lineWidth = 3; const r = seeded(3);
    for (let i = 0; i < 90; i++) { const x = (r() * W + t * 300) % W, y = (r() * hz + t * 900) % hz; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x - 12, y + 40); ctx.stroke(); } }
}
export function cloud(x, y, s, col) { ctx.fillStyle = col; ctx.beginPath(); [[0, 0, 50], [50, -20, 60], [110, 0, 48], [55, 15, 55]].forEach(([dx, dy, r]) => { ctx.moveTo(x + dx * s + r * s, y + dy * s); ctx.arc(x + dx * s, y + dy * s, r * s, 0, 7); }); ctx.fill(); }

/* ground strata (cutaway). opts: {type:'sand'|'soil', seaFrom:x, water:y} */
export function ground(hz = 1050, o = {}) {
  const L = o.type === 'soil' ? [[C.soil, 0], [C.soilD, 330], [C.rock, 640]] : [[C.sand, 0], [C.wet, 230], [C.rock, 520]];
  L.forEach(([col, dy], i) => { ctx.fillStyle = col; ctx.fillRect(-400, hz + dy, W + 800, H + 400); });
  const r = seeded(11); for (let i = 0; i < 160; i++) { const x = r() * W, y = hz + 30 + r() * (H - hz), rr2 = 3 + r() * 9;
    ctx.fillStyle = y > hz + (o.type === 'soil' ? 640 : 520) ? 'rgba(0,0,0,.18)' : 'rgba(255,255,255,.18)'; ctx.beginPath(); ctx.ellipse(x, y, rr2 * 1.4, rr2, 0, 0, 7); ctx.fill(); }
  ctx.fillStyle = 'rgba(0,0,0,.12)'; ctx.fillRect(-400, hz, W + 800, 10);
  if (o.seaFrom != null) sea(o.seaFrom, hz, o.t || 0);
}
export function sea(x0, hz, t) {
  const top = hz - 18; ctx.beginPath(); ctx.moveTo(x0, hz); ctx.lineTo(x0 + 120, top);
  for (let x = x0 + 120; x <= W + 400; x += 20) ctx.lineTo(x, top + Math.sin(x / 40 + t * 2) * 6);
  ctx.lineTo(W + 400, hz + 620); ctx.lineTo(x0 + 520, hz + 620); ctx.closePath();
  const gr = ctx.createLinearGradient(0, top, 0, hz + 620); gr.addColorStop(0, C.sea); gr.addColorStop(1, C.seaD); ctx.fillStyle = gr; ctx.fill();
  ctx.strokeStyle = 'rgba(255,255,255,.7)'; ctx.lineWidth = 4; ctx.beginPath();
  for (let x = x0 + 120; x <= W + 400; x += 20) { const y = top + Math.sin(x / 40 + t * 2) * 6; x === x0 + 120 ? ctx.moveTo(x, y) : ctx.lineTo(x, y); } ctx.stroke();
}
export function palm(x, y, s = 1, t = 0, lean = 0.15) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.strokeStyle = C.trunk; ctx.lineWidth = 26; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(0, 0); ctx.quadraticCurveTo(40 * lean * 6, -180, 90 * lean * 4, -360); ctx.stroke();
  const tx = 90 * lean * 4, ty = -360, sw = Math.sin(t * 1.5) * 0.05;
  [[-2.6, C.leafD], [-2.0, C.leaf], [-1.1, C.leaf], [-0.5, C.leafD], [0.1, C.leaf]].forEach(([a, col]) => {
    ctx.save(); ctx.translate(tx, ty); ctx.rotate(a + sw); ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(0, 0);
    ctx.quadraticCurveTo(90, -50, 190, 30); ctx.quadraticCurveTo(90, 10, 0, 0); ctx.fill(); ctx.restore(); });
  circ(tx - 6, ty + 8, 14, '#6b4a2f'); circ(tx + 14, ty + 12, 13, '#7a5636'); ctx.restore();
}
export function bush(x, y, s = 1, col = C.leaf) { ctx.fillStyle = col; ctx.beginPath(); [[0, 0, 40], [40, -10, 48], [85, 0, 38]].forEach(([dx, dy, r]) => { ctx.moveTo(x + dx * s + r * s, y + dy * s); ctx.arc(x + dx * s, y + dy * s, r * s, Math.PI, 0); }); ctx.fill(); }
export function rock(x, y, s = 1) { poly([[x - 40 * s, y], [x - 30 * s, y - 34 * s], [x + 10 * s, y - 46 * s], [x + 42 * s, y - 20 * s], [x + 46 * s, y]], C.rock, C.rockD, 4); }

/* ---------- characters (original Zeta school kids) ---------- */
/* kid(x, feetY, scale, {shirt, pants, hair:'boy'|'girl', skin, mood:'ok'|'happy'|'scared'|'think'|'tired',
     pose:'stand'|'dig'|'hold'|'point'|'crouch'|'sleep', flip, open (mouth 0..1), walk (phase), look (-1..1)}) */
import { avatar, isBlocky } from './blocky.js';
export function kid(x, y, s = 1, o = {}) {
  if (isBlocky()) { ctx.save(); ctx.translate(x, y); ctx.scale((o.flip ? -1 : 1) * s, s); if ((o.pose || 'stand') === 'sleep') { ctx.rotate(-Math.PI / 2); ctx.translate(-60, -20); }
    const hair = o.blockHair || (o.hair === 'girl' ? 'girl' : 'messy');
    avatar({ ...o, hair, hairC: o.hairC || C.hair, skin: o.skin || C.skin, shirt: o.shirt || C.shirt, pants: o.pants || C.navy, tie: o.tie !== false, tieC: C.tie, badge: o.tie !== false, t: o.t });
    if (o.hold) { ctx.save(); ctx.translate(0, -100); o.hold(); ctx.restore(); } ctx.restore(); return; }
  const sk = o.skin || C.skin, sh = o.shirt || C.shirt, pa = o.pants || C.navy, pose = o.pose || 'stand';
  ctx.save(); ctx.translate(x, y); ctx.scale((o.flip ? -1 : 1) * s, s);
  if (pose === 'sleep') { ctx.rotate(-Math.PI / 2); ctx.translate(-60, -20); }
  const crouch = pose === 'crouch' || pose === 'dig' ? 28 : 0, wp = o.walk != null ? Math.sin(o.walk * 8) : 0;
  ctx.lineCap = 'round';
  // legs
  ctx.strokeStyle = pa; ctx.lineWidth = 22;
  if (pose === 'sit') { ctx.beginPath(); ctx.moveTo(-14, -70); ctx.lineTo(-10, -66); ctx.lineTo(-10, -6); ctx.moveTo(14, -70); ctx.lineTo(14, -6); ctx.stroke(); }
  else { ctx.beginPath(); ctx.moveTo(-14, -70 + crouch); ctx.lineTo(-16 - wp * 10, -6); ctx.moveTo(14, -70 + crouch); ctx.lineTo(16 + wp * 10, -6); ctx.stroke(); }
  ctx.fillStyle = '#2a2a2a'; rr(-32 - wp * 10, -12, 30, 14, 6); ctx.fill(); rr(4 + wp * 10, -12, 30, 14, 6); ctx.fill();
  // torso
  rr(-34, -150 + crouch, 68, 86, 18); ctx.fillStyle = sh; ctx.fill(); ctx.strokeStyle = 'rgba(0,0,0,.12)'; ctx.lineWidth = 3; ctx.stroke();
  if (o.tie !== false) { poly([[-4, -146 + crouch], [4, -146 + crouch], [7, -100 + crouch], [0, -92 + crouch], [-7, -100 + crouch]], C.tie);
  circ(20, -126 + crouch, 6, C.yellow); } // Zeta badge
  // arms
  ctx.strokeStyle = sk; ctx.lineWidth = 15;
  const A = {
    stand: [[-30, -140, -42, -86], [30, -140, 42, -86]], dig: [[-28, -138, 20, -70], [28, -138, 46, -80]],
    hold: [[-28, -138, -10, -100], [28, -138, 14, -100]], point: [[-30, -140, -42, -86], [30, -140, 92, -170]],
    crouch: [[-30, -140, -20, -80], [30, -140, 24, -80]], sleep: [[-30, -140, -42, -86], [30, -140, 42, -86]],
    scared: [[-30, -140, -60, -190], [30, -140, 60, -190]], write: [[-30, -140, -40, -96], [30, -140, 70, -112]],
    sit: [[-30, -140, -40, -90], [30, -140, 40, -90]], phone: [[-30, -140, -14, -160], [30, -140, 14, -160]], wave: [[-30, -140, -42, -86], [30, -140, 70, -230]],
    fist: [[-30, -140, -42, -86], [30, -140, 50, -250]], tray: [[-28, -138, 20, -110], [28, -138, 46, -110]]
  }[o.arms ? o.arms : o.mood === 'scared' && pose === 'stand' ? 'scared' : pose] || [];
  A.forEach(([x1, y1, x2, y2]) => { ctx.beginPath(); ctx.moveTo(x1, y1 + crouch); ctx.quadraticCurveTo((x1 + x2) / 2 + (x2 > 0 ? 10 : -10), (y1 + y2) / 2 + crouch + 6, x2, y2 + crouch); ctx.stroke(); circ(x2, y2 + crouch, 9, sk); });
  if (o.hold) { ctx.save(); ctx.translate(0, -100 + crouch); o.hold(); ctx.restore(); }
  // head
  const hy = -196 + crouch, lk = (o.look || 0) * 6;
  circ(0, hy, 50, sk); circ(-48, hy + 4, 10, sk); circ(48, hy + 4, 10, sk);
  ctx.fillStyle = C.hair;
  if (o.hair === 'girl') { ctx.beginPath(); ctx.arc(0, hy - 6, 54, Math.PI * 1.02, Math.PI * 1.98); ctx.fill(); rr(-56, hy - 10, 18, 70, 9); ctx.fill(); rr(38, hy - 10, 18, 70, 9); ctx.fill(); circ(50, hy - 40, 16, C.hair); }
  else { ctx.beginPath(); ctx.moveTo(-52, hy - 4); ctx.quadraticCurveTo(-48, hy - 64, 6, hy - 58); ctx.lineTo(18, hy - 70); ctx.lineTo(24, hy - 56); ctx.quadraticCurveTo(52, hy - 48, 52, hy - 6); ctx.quadraticCurveTo(20, hy - 34, -52, hy - 4); ctx.fill(); }
  // face
  const m = o.mood || 'ok';
  const ey = hy + 2, ew = m === 'scared' ? 9 : 7;
  circ(-17 + lk, ey, ew, '#1a1a1a'); circ(17 + lk, ey, ew, '#1a1a1a'); circ(-15 + lk, ey - 3, 2.5, '#fff'); circ(19 + lk, ey - 3, 2.5, '#fff');
  ctx.strokeStyle = '#1a1a1a'; ctx.lineWidth = 4; ctx.beginPath();
  const bt = m === 'scared' ? -6 : m === 'think' ? 4 : m === 'tired' ? 4 : 0;
  ctx.moveTo(-27, ey - 18 + bt); ctx.lineTo(-8, ey - 20 - bt); ctx.moveTo(27, ey - 18 + bt); ctx.lineTo(8, ey - 20 - bt); ctx.stroke();
  circ(-30, hy + 20, 7, 'rgba(240,120,110,.35)'); circ(30, hy + 20, 7, 'rgba(240,120,110,.35)');
  const op = clamp(o.open || 0); ctx.fillStyle = '#5a1f1f';
  if (op > 0.15 || m === 'scared') { ctx.beginPath(); ctx.ellipse(lk, hy + 26, 9, 5 + 9 * Math.max(op, m === 'scared' ? 0.7 : 0), 0, 0, 7); ctx.fill(); }
  else { ctx.beginPath(); ctx.lineWidth = 4; ctx.strokeStyle = '#3a1a1a';
    if (m === 'happy') ctx.arc(lk, hy + 18, 13, 0.15 * Math.PI, 0.85 * Math.PI); else if (m === 'tired' || m === 'think') { ctx.moveTo(-8 + lk, hy + 28); ctx.lineTo(8 + lk, hy + 26); } else ctx.arc(lk, hy + 20, 9, 0.2 * Math.PI, 0.8 * Math.PI); ctx.stroke(); }
  if (m === 'scared') { ctx.fillStyle = 'rgba(120,190,255,.9)'; ctx.beginPath(); ctx.ellipse(46, hy - 22, 6, 10, 0, 0, 7); ctx.fill(); }
  ctx.restore();
}
/* ---------- props ---------- */
export function bag(x, y, s = 1, col = '#2f6fd6') { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); rr(-60, -150, 120, 150, 26); ctx.fillStyle = col; ctx.fill(); rr(-44, -70, 88, 56, 14); ctx.fillStyle = 'rgba(0,0,0,.18)'; ctx.fill(); ctx.strokeStyle = '#1d3f80'; ctx.lineWidth = 8; ctx.beginPath(); ctx.arc(0, -150, 30, Math.PI, 0); ctx.stroke(); circ(34, -120, 8, C.yellow); ctx.restore(); }
export function bottle(x, y, s = 1, fill = 0.5, cut = false) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  rr(-22, -110, 44, 110, 12); ctx.fillStyle = 'rgba(200,235,255,.55)'; ctx.fill(); ctx.strokeStyle = 'rgba(255,255,255,.9)'; ctx.lineWidth = 3; ctx.stroke();
  if (fill > 0) { rr(-20, -108 * fill, 40, 108 * fill, 10); ctx.fillStyle = 'rgba(70,160,235,.75)'; ctx.fill(); }
  if (!cut) { rr(-10, -128, 20, 20, 4); ctx.fillStyle = '#e8eef3'; ctx.fill(); rr(-12, -140, 24, 14, 4); ctx.fillStyle = '#2f6fd6'; ctx.fill(); }
  ctx.restore(); }
export function book(x, y, s = 1, title = 'SCIENCE') { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); rr(-50, -70, 100, 70, 6); ctx.fillStyle = '#e8573f'; ctx.fill(); ctx.fillStyle = '#fff'; ctx.fillRect(-46, -10, 92, 6); font(16); ctx.textAlign = 'center'; ctx.fillText(title, 0, -32); ctx.restore(); }
export function geobox(x, y, s = 1) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); rr(-60, -24, 120, 24, 5); ctx.fillStyle = '#9aa7b4'; ctx.fill(); ctx.fillStyle = '#c9d3dc'; ctx.fillRect(-56, -20, 112, 6); ctx.restore(); }
export function sheet(pts, a = 1) { ctx.beginPath(); pts.forEach((p, i) => (i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]))); ctx.strokeStyle = `rgba(230,245,255,${0.95 * a})`; ctx.lineWidth = 6; ctx.stroke(); }
export function fire(x, y, s = 1, t = 0, a = 1) { withA(a, () => { ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.strokeStyle = '#6b4226'; ctx.lineWidth = 12; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-40, 0); ctx.lineTo(40, -14); ctx.moveTo(-40, -14); ctx.lineTo(40, 0); ctx.stroke();
  [[0, 90, '#ff7a2f'], [0, 64, '#ffb22e'], [0, 38, '#fff0a0']].forEach(([dx, h, col], i) => { const f = 1 + 0.12 * Math.sin(t * 14 + i * 2);
    ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(-30 + i * 8, -6); ctx.quadraticCurveTo(-34 + i * 8, -h * 0.6 * f, dx + Math.sin(t * 9 + i) * 6, -h * f); ctx.quadraticCurveTo(34 - i * 8, -h * 0.6 * f, 30 - i * 8, -6); ctx.fill(); });
  ctx.restore(); }); }
export function smoke(x, y, t, a = 1) { for (let i = 0; i < 5; i++) { const p = ((t * 0.6 + i / 5) % 1); circ(x + Math.sin(p * 6 + i) * 18, y - p * 220, 14 + p * 30, `rgba(200,200,200,${0.45 * (1 - p) * a})`); } }
export function footprints(x, y, n, a = 1, s = 1) { withA(a, () => { for (let i = 0; i < n; i++) { ctx.fillStyle = 'rgba(40,25,10,.85)'; const fx = x + i * 50 * s, fy = y + (i % 2) * 16 * s; ctx.beginPath(); ctx.ellipse(fx, fy, 15 * s, 8 * s, 0, 0, 7); ctx.fill(); for (let k = 0; k < 4; k++) { ctx.beginPath(); ctx.arc(fx + 15 * s, fy - 7 * s + k * 4.5 * s, 2.6 * s, 0, 7); ctx.fill(); } } }); }

/* ---------- UI ---------- */
export function label(x, y, text, a = 1, o = {}) {
  if (a <= 0) return; const col = o.col || C.yellow; font(o.size || 26, 800); const w = ctx.measureText(text).width + 30, h = (o.size || 26) + 20;
  scaled(x, y, eob(a), () => {
    if (o.to) { ctx.strokeStyle = col; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x, y + h / 2 - 4); ctx.lineTo(o.to[0], o.to[1]); ctx.stroke(); circ(o.to[0], o.to[1], 5, col); }
    rr(x - w / 2, y - h / 2, w, h, 8); ctx.fillStyle = 'rgba(20,19,18,.92)'; ctx.fill(); ctx.strokeStyle = col; ctx.lineWidth = 3; ctx.stroke();
    ctx.fillStyle = col; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(text, x, y + 1);
  });
}
export function chip(n, text, a = 1) {           // "3. PAANI" white pill, top centre
  if (a <= 0) return; font(38, 800); const s = `${n}. `, w = ctx.measureText(s + text).width + 40;
  scaled(W / 2, 371, eob(a), () => { rr(W / 2 - w / 2, 340, w, 62, 12); ctx.fillStyle = '#fff'; ctx.fill();
    ctx.textBaseline = 'middle'; ctx.textAlign = 'left'; const x0 = W / 2 - w / 2 + 20; ctx.fillStyle = C.red; ctx.fillText(s, x0, 373); ctx.fillStyle = C.ink; ctx.fillText(text, x0 + ctx.measureText(s).width, 373); });
}
export function tag(text, y, col = C.blue, a = 1) {  // coloured status pill under the chip ("WATER = ENEMY #1", "PREVIOUSLY")
  if (a <= 0) return; screen(() => { font(32, 800); const w = ctx.measureText(text).width + 40;
  scaled(W / 2, y, eob(a), () => { rr(W / 2 - w / 2, y - 26, w, 52, 10); ctx.fillStyle = col; ctx.fill(); ctx.fillStyle = '#fff'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(text, W / 2, y + 1); }); });
}
export function fmtNum(v, unit) {
  const n = Math.round(v); if (unit === '₹') return '₹' + n.toLocaleString('en-IN'); if (unit === '$') return '$' + n.toLocaleString('en-US');
  return n.toLocaleString('en-IN') + (unit ? ' ' + unit : '');
}
/* hud(t, {left:{pts, unit:'DIN', sub:'RESCUE TAK'}, right:{pts, unit:'ml', sub:'PAANI'}}) */
export function hud(t, o, a = 1) {
  if (a <= 0) return; withA(a, () => {
    if (o.left) { const k = kf(t, o.left.pts); font(40, 800); const s = fmtNum(k.v, o.left.unit), w = Math.max(190, ctx.measureText(s).width + 40);
      rr(130, 180, w, 92, 12); ctx.fillStyle = 'rgba(18,17,16,.9)'; ctx.fill(); ctx.strokeStyle = C.red; ctx.lineWidth = 4; ctx.stroke();
      font(22, 600); ctx.fillStyle = C.grey; ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic'; ctx.fillText(o.left.sub || '', 150, 208);
      font(40, 800); ctx.fillStyle = C.red; ctx.fillText(s, 150, 254); }
    if (o.right) { const k = kf(t, o.right.pts); font(40, 800); const s = fmtNum(k.v, o.right.unit), w = Math.max(220, ctx.measureText(s).width + 40);
      rr(W - 130 - w, 180, w, 92, 12); ctx.fillStyle = 'rgba(18,17,16,.9)'; ctx.fill(); ctx.strokeStyle = C.yellow; ctx.lineWidth = 4; ctx.stroke();
      font(22, 600); ctx.fillStyle = C.grey; ctx.textAlign = 'right'; ctx.fillText(o.right.sub || '', W - 150, 208);
      font(40, 800); ctx.fillStyle = C.yellow; ctx.fillText(s, W - 150, 254);
      if (k.delta && k.since < 1.4) { const up = k.delta > 0; withA(1 - ramp(k.since, 1.0, 0.4), () => {
        font(30, 800); ctx.fillStyle = up ? C.green : C.red; ctx.fillText((up ? '+' : '−') + fmtNum(Math.abs(k.delta), o.right.unit), W - 150, 308 - 14 * eo(k.since)); }); } }
  });
}
export function titleCard(big, small, a = 1, y = 380) {
  screen(() => withA(eo(a * 2), () => scaled(W / 2, y, lerp(1.25, 1, eo(a)), () => {
    ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic'; font(140, 800); ctx.lineWidth = 14; ctx.strokeStyle = 'rgba(0,0,0,.25)'; ctx.strokeText(big, W / 2, y);
    ctx.fillStyle = C.red; ctx.fillText(big, W / 2, y); font(46, 800); ctx.fillStyle = '#fff'; ctx.fillText(small, W / 2, y + 66); })));
}
/* infoCard(a, {title, draw(x, y, w, h), foot}) — cream card, NCERT footnote */
export function infoCard(a, o, y = 330) {
  if (a <= 0) return; const w = 840, h = o.h || 560, x = (W - w) / 2;
  screen(() => withA(eo(a * 1.6), () => scaled(W / 2, y + h / 2, lerp(0.85, 1, eob(a)), () => {
    ctx.shadowColor = 'rgba(0,0,0,.35)'; ctx.shadowBlur = 30; rr(x, y, w, h, 22); ctx.fillStyle = C.cream; ctx.fill(); ctx.shadowBlur = 0;
    font(40, 800); ctx.fillStyle = C.ink; ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic'; ctx.fillText(o.title, W / 2, y + 70);
    if (o.draw) { ctx.save(); o.draw(x + 40, y + 100, w - 80, h - 170); ctx.restore(); }
    if (o.foot) { font(22, 600); ctx.fillStyle = '#6d6a63'; ctx.textAlign = 'center'; ctx.fillText(o.foot, W / 2, y + h - 30); }
  })));
}
/* bars inside an info card: data=[[label, value(0..1), text, colour]] */
export function bars(x, y, w, h, data) {
  const bh = Math.min(56, h / data.length - 14); data.forEach(([lab, v, txt, col], i) => { const yy = y + i * (bh + 14);
    font(24, 800); ctx.fillStyle = C.ink; ctx.textAlign = 'left'; ctx.textBaseline = 'middle'; ctx.fillText(lab, x, yy + bh / 2);
    rr(x + 190, yy, (w - 300) * v, bh, 6); ctx.fillStyle = col || C.red; ctx.fill(); ctx.fillStyle = C.ink; ctx.fillText(txt, x + 200 + (w - 300) * v, yy + bh / 2); });
}
export function stamp(text, x, y, a, col = C.red, rot = -0.12) {
  if (a <= 0) return; const s = lerp(2.2, 1, eo(a * 1.4)); screen(() => withA(eo(a * 3), () => { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
    font(54, 800); const w = ctx.measureText(text).width + 50; rr(-w / 2, -44, w, 88, 12); ctx.fillStyle = 'rgba(255,255,255,.93)'; ctx.fill(); ctx.strokeStyle = col; ctx.lineWidth = 8; ctx.stroke();
    ctx.fillStyle = col; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(text, 0, 2); ctx.restore(); }));
}
export function arrowCurve(x1, y1, x2, y2, col = C.yellow, a = 1) {
  const p = eo(a); if (p <= 0) return; const ex = lerp(x1, x2, p), ey = lerp(y1, y2, p);
  ctx.strokeStyle = col; ctx.lineWidth = 6; ctx.setLineDash([14, 10]); ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(ex, ey); ctx.stroke(); ctx.setLineDash([]);
  const an = Math.atan2(y2 - y1, x2 - x1); poly([[ex, ey], [ex - 20 * Math.cos(an - 0.4), ey - 20 * Math.sin(an - 0.4)], [ex - 20 * Math.cos(an + 0.4), ey - 20 * Math.sin(an + 0.4)]], col);
}

/* ---------- end card: comment keyword CTA + next episode + WhatsApp QR ---------- */
export function endCard(t, o) {          // o: {next:'EPISODE 2', title:'...', keyword:'ISLAND', a}
  const a = o.a; if (a <= 0) return;
  withA(eo(a * 2), () => { ctx.fillStyle = 'rgba(10,14,30,.72)'; ctx.fillRect(0, 0, W, H); });
  tag(o.next || 'NEXT EPISODE', 520, C.blue, ramp(a, 0.05, 0.3));
  withA(eo(ramp(a, 0.15, 0.3)), () => { font(76, 800); ctx.fillStyle = C.yellow; ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic'; ctx.fillText(o.title || '', W / 2, 650); });
  if (o.keyword) scaled(W / 2, 820, eob(ramp(a, 0.3, 0.3)), () => { rr(W / 2 - 330, 760, 660, 120, 22); ctx.fillStyle = '#fff'; ctx.fill();
    font(30, 600); ctx.fillStyle = C.ink; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('COMMENT KARO', W / 2, 792); font(50, 800); ctx.fillStyle = C.red; ctx.fillText(`"${o.keyword}"`, W / 2, 846); });
  if (window.QR) withA(ramp(a, 0.45, 0.3), () => {
    rr(W / 2 - 150, 1440, 300, 360, 20); ctx.fillStyle = '#fff'; ctx.fill(); ctx.drawImage(window.QR, W / 2 - 120, 1460, 240, 240);
    rr(W / 2 - 120, 1716, 240, 56, 28); ctx.fillStyle = '#25d366'; ctx.fill(); font(24, 800); ctx.fillStyle = '#fff'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('WhatsApp Channel', W / 2, 1745); });
}

