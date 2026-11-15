// "Aasmaan Mein 96" 2D night look: flat cut-out world + a real light pass (ambient darkness multiplied over the frame,
// coloured light pools punched in, additive glows), haze, rain, grain, vignette. Everything is a pure function of t.
import { ctx, W, H, clamp, lerp, eo, font, rr, poly, withA, circle as circ } from './lib.js';

let LC = null, lg = null;
function lightCanvas() { if (!LC) { LC = document.createElement('canvas'); LC.width = W; LC.height = H; lg = LC.getContext('2d'); } return lg; }
/** lights: [{x, y, r, c:[r,g,b], i}] in SCREEN px. amb = ambient colour [r,g,b] (0..255) */
export function lightPass(lights, amb = [22, 24, 40]) {
  const g = lightCanvas(); g.setTransform(1, 0, 0, 1, 0, 0); g.globalCompositeOperation = 'source-over'; g.fillStyle = `rgb(${amb})`; g.fillRect(0, 0, W, H);
  g.globalCompositeOperation = 'lighter';
  for (const L of lights) { const gr = g.createRadialGradient(L.x, L.y, 0, L.x, L.y, L.r); const [r, gg, b] = L.c, i = L.i ?? 1;
    gr.addColorStop(0, `rgba(${r},${gg},${b},${i})`); gr.addColorStop(0.45, `rgba(${r},${gg},${b},${i * 0.45})`); gr.addColorStop(1, `rgba(${r},${gg},${b},0)`); g.fillStyle = gr; g.fillRect(L.x - L.r, L.y - L.r, L.r * 2, L.r * 2); }
  ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalCompositeOperation = 'multiply'; ctx.drawImage(LC, 0, 0); ctx.restore();
}
/** additive bloom spots */
export function glow(x, y, r, c, a = 1) { ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalCompositeOperation = 'lighter'; const gr = ctx.createRadialGradient(x, y, 0, x, y, r); gr.addColorStop(0, `rgba(${c},${a})`); gr.addColorStop(1, `rgba(${c},0)`); ctx.fillStyle = gr; ctx.fillRect(x - r, y - r, r * 2, r * 2); ctx.restore(); }
export function beam(x0, y0, x1, y1, w0, w1, c, a) { ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalCompositeOperation = 'lighter'; const gr = ctx.createLinearGradient(x0, y0, x1, y1); gr.addColorStop(0, `rgba(${c},${a})`); gr.addColorStop(1, `rgba(${c},0)`); ctx.fillStyle = gr;
  const nx = -(y1 - y0), ny = x1 - x0, L = Math.hypot(nx, ny); ctx.beginPath(); ctx.moveTo(x0 + nx / L * w0, y0 + ny / L * w0); ctx.lineTo(x1 + nx / L * w1, y1 + ny / L * w1); ctx.lineTo(x1 - nx / L * w1, y1 - ny / L * w1); ctx.lineTo(x0 - nx / L * w0, y0 - ny / L * w0); ctx.fill(); ctx.restore(); }
export function grade(t, o = {}) { ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0);
  const v = ctx.createRadialGradient(W / 2, H * 0.45, H * 0.25, W / 2, H * 0.5, H * 0.75); v.addColorStop(0, 'rgba(0,0,0,0)'); v.addColorStop(1, `rgba(0,0,0,${o.vig ?? 0.7})`); ctx.fillStyle = v; ctx.fillRect(0, 0, W, H);
  const n = Math.floor(t * 24); for (let i = 0; i < 900; i++) { const r = Math.sin(i * 12.9898 + n * 78.233) * 43758.5453, f = r - Math.floor(r), r2 = Math.sin(i * 4.1 + n * 9.7) * 9999, f2 = r2 - Math.floor(r2); ctx.fillStyle = f > 0.5 ? 'rgba(255,255,255,.05)' : 'rgba(0,0,0,.07)'; ctx.fillRect(f * W, f2 * H, 2, 2); }
  ctx.restore(); }
export function rain(t, a = 0.5, n = 140, slant = 0.18) { ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.strokeStyle = `rgba(190,200,230,${a})`; ctx.lineWidth = 2;
  for (let i = 0; i < n; i++) { const s1 = Math.sin(i * 91.3) * 0.5 + 0.5, s2 = Math.sin(i * 17.7 + 2) * 0.5 + 0.5, sp = 1400 + s2 * 900; const y = ((t * sp + s1 * H * 3) % (H + 200)) - 100, x = s2 * (W + 300) - 150 + y * slant; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 34 * slant, y + 34); ctx.stroke(); }
  ctx.restore(); }
export function haze(y0, y1, c, a) { const g = ctx.createLinearGradient(0, y0, 0, y1); g.addColorStop(0, `rgba(${c},0)`); g.addColorStop(0.6, `rgba(${c},${a})`); g.addColorStop(1, `rgba(${c},${a * 0.6})`); ctx.fillStyle = g; ctx.fillRect(-500, y0, W + 1000, y1 - y0); }

/* ---------- the red sky clock (flat, glowing) ---------- */
export function skyClock(x, y, r, txt, t, o = {}) {
  const fl = o.flick ?? 1; if (fl <= 0) return; ctx.save(); ctx.globalAlpha *= fl;
  glow(...toScreen(x, y), r * 2.4, '255,30,20', 0.55 * fl);
  ctx.fillStyle = '#1a0202'; ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill();
  ctx.strokeStyle = '#ff2a1a'; ctx.shadowColor = '#ff1a10'; ctx.shadowBlur = r * 0.25; ctx.lineWidth = r * 0.06; ctx.beginPath(); ctx.arc(x, y, r * 0.95, 0, 7); ctx.stroke();
  for (let i = 0; i < 60; i++) { const a = i / 60 * Math.PI * 2, r0 = r * (i % 5 ? 0.82 : 0.74); ctx.lineWidth = r * (i % 5 ? 0.012 : 0.03); ctx.beginPath(); ctx.moveTo(x + Math.cos(a) * r0, y + Math.sin(a) * r0); ctx.lineTo(x + Math.cos(a) * r * 0.88, y + Math.sin(a) * r * 0.88); ctx.stroke(); }
  ctx.font = `900 ${r * 0.95}px Inter`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = '#ff4a35'; ctx.shadowBlur = r * 0.35; ctx.fillText(txt, x, y + r * 0.05);
  if (o.crack) { ctx.shadowBlur = 0; ctx.strokeStyle = '#000'; ctx.lineWidth = r * 0.03; ctx.beginPath(); let px = x - r * 0.1, py = y - r; ctx.moveTo(px, py); for (let k = 0; k < 9 * o.crack; k++) { px += Math.sin(k * 7.3) * r * 0.16; py += r * 0.22; ctx.lineTo(px, py); } ctx.stroke(); }
  ctx.restore();
}
export function toScreen(x, y) { const m = ctx.getTransform(); return [m.a * x + m.c * y + m.e, m.b * x + m.d * y + m.f]; }

/* ---------- people (flat, cinematic proportions) ---------- */
const SK = '#c48a65';
export function person(x, y, s, o = {}) {   // y = feet. o: shirt, pants, skin, hair:'short'|'messy', pose:'stand'|'sit', arms:'down'|'phone'|'hug'|'reach', head (tilt rad), look (-1..1), mood, grey
  const bw = o.chubby ? 1.18 : 1; const sk = o.skin || SK, sh = o.shirt || '#1e2635', pa = o.pants || '#14161c', hr = o.hairC || '#120c09', sit = o.pose === 'sit';
  ctx.save(); ctx.translate(x, y); ctx.scale((o.flip ? -1 : 1) * s, s); if (o.grey) ctx.filter = 'grayscale(1) brightness(1.15) contrast(.9)';
  ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  // legs
  ctx.strokeStyle = pa; ctx.lineWidth = 34;
  if (sit) { ctx.beginPath(); ctx.moveTo(-18, -150); ctx.lineTo(70, -150); ctx.lineTo(74, -8); ctx.moveTo(18, -150); ctx.lineTo(96, -146); ctx.lineTo(100, -8); ctx.stroke(); rr(56, -14, 50, 18, 8); ctx.fillStyle = '#0b0b0d'; ctx.fill(); rr(82, -14, 50, 18, 8); ctx.fill(); }
  else { ctx.beginPath(); ctx.moveTo(-16, -170); ctx.lineTo(-20, -10); ctx.moveTo(16, -170); ctx.lineTo(20, -10); ctx.stroke(); rr(-44, -16, 46, 18, 8); ctx.fillStyle = '#0b0b0d'; ctx.fill(); rr(6, -16, 46, 18, 8); ctx.fill(); }
  const by = sit ? -150 : -170;
  // torso (hoodie/shirt) with soft shading
  ctx.save(); ctx.translate(0, by); ctx.scale(bw, 1); const tg = ctx.createLinearGradient(-60, 0, 60, 0); tg.addColorStop(0, shade(sh, -0.25)); tg.addColorStop(0.5, sh); tg.addColorStop(1, shade(sh, -0.35)); ctx.fillStyle = tg;
  ctx.beginPath(); ctx.moveTo(-50, 0); ctx.quadraticCurveTo(-60, -90, -46, -150); ctx.quadraticCurveTo(0, -172, 46, -150); ctx.quadraticCurveTo(60, -90, 50, 0); ctx.closePath(); ctx.fill();
  ctx.fillStyle = shade(sh, -0.4); ctx.beginPath(); ctx.ellipse(0, -150, 22, 8, 0, 0, 7); ctx.fill();
  // arms
  ctx.strokeStyle = shade(sh, -0.1); ctx.lineWidth = 26; const A = { down: [[-44, -140, -58, -70, -54, -10], [44, -140, 58, -70, 54, -10]], phone: [[-44, -140, -52, -70, -14, -98], [44, -140, 52, -70, 14, -98]], reach: [[-44, -140, -58, -70, -54, -10], [44, -140, 110, -150, 170, -150]], hug: [[-44, -140, -40, -70, 10, -80], [44, -140, 40, -70, -10, -84]] }[o.arms || 'down'];
  A.forEach(([x1, y1, x2, y2, x3, y3]) => { ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.lineTo(x3, y3); ctx.stroke(); ctx.fillStyle = sk; ctx.beginPath(); ctx.arc(x3, y3, 13, 0, 7); ctx.fill(); });
  if (o.arms === 'phone') { ctx.save(); ctx.translate(0, -108); ctx.rotate(-0.25); rr(-20, -34, 40, 66, 7); ctx.fillStyle = '#060606'; ctx.fill(); rr(-16, -30, 32, 58, 5); ctx.fillStyle = o.screen || '#9fc4ff'; ctx.fill(); ctx.restore(); }
  // neck + head
  ctx.fillStyle = shade(sk, -0.15); rr(-13, -176, 26, 24, 8); ctx.fill();
  ctx.save(); ctx.translate(0, -222); ctx.rotate(o.head || 0); const lk = (o.look || 0) * 7;
  if (o.hair === 'long' || o.hair === 'pony' || o.hair === 'bun') { ctx.fillStyle = hr; if (o.hair === 'long') { ctx.beginPath(); ctx.ellipse(0, 20, 50, 80, 0, 0, 7); ctx.fill(); } if (o.hair === 'pony') { ctx.beginPath(); ctx.ellipse(44, 10, 16, 46, -0.3, 0, 7); ctx.fill(); } if (o.hair === 'bun') { ctx.beginPath(); ctx.arc(0, -52, 22, 0, 7); ctx.fill(); } }
  const hg = ctx.createLinearGradient(-40, 0, 40, 0); hg.addColorStop(0, shade(sk, -0.2)); hg.addColorStop(0.55, sk); hg.addColorStop(1, shade(sk, -0.3)); ctx.fillStyle = hg;
  ctx.beginPath(); ctx.ellipse(0, 0, 38, 48, 0, 0, 7); ctx.fill(); ctx.beginPath(); ctx.ellipse(0, 30, 30, 22, 0, 0, Math.PI); ctx.fill();
  ctx.fillStyle = shade(sk, -0.2); ctx.beginPath(); ctx.ellipse(-38, 4, 7, 12, 0, 0, 7); ctx.ellipse(38, 4, 7, 12, 0, 0, 7); ctx.fill();
  // hair
  ctx.fillStyle = hr; ctx.beginPath(); ctx.moveTo(-41, 0); ctx.quadraticCurveTo(-46, -54, -6, -56); ctx.quadraticCurveTo(38, -60, 42, -10); ctx.quadraticCurveTo(30, -34, 6, -30); ctx.quadraticCurveTo(-20, -40, -30, -20); ctx.quadraticCurveTo(-36, -8, -41, 0); ctx.fill();
  if (o.hair === 'long' || o.hair === 'pony' || o.hair === 'bun') { ctx.beginPath(); ctx.moveTo(-42, 10); ctx.quadraticCurveTo(-48, -56, 0, -56); ctx.quadraticCurveTo(48, -56, 42, 10); ctx.quadraticCurveTo(30, -30, 0, -34); ctx.quadraticCurveTo(-30, -30, -42, 10); ctx.fill(); }
  if (o.hair === 'messy') for (let k = 0; k < 6; k++) { ctx.beginPath(); ctx.moveTo(-30 + k * 12, -46); ctx.lineTo(-24 + k * 12, -64 - (k % 2) * 6); ctx.lineTo(-18 + k * 12, -46); ctx.fill(); }
  // face
  const m = o.mood || 'ok', wide = m === 'scared' || m === 'blank';
  ctx.fillStyle = '#f3efe8'; for (const ex of [-14, 14]) { ctx.beginPath(); ctx.ellipse(ex + lk * 0.3, 2, wide ? 9 : 8, wide ? 7 : 4.5, 0, 0, 7); ctx.fill(); }
  if (m !== 'blank') { ctx.fillStyle = '#1a0f0a'; for (const ex of [-14, 14]) { ctx.beginPath(); ctx.arc(ex + lk, 2, wide ? 4.5 : 4, 0, 7); ctx.fill(); } }
  ctx.strokeStyle = shade(hr, 0.1); ctx.lineWidth = 4; ctx.beginPath(); const bt = m === 'scared' ? -4 : m === 'sad' ? 3 : 0; ctx.moveTo(-22, -12 + bt); ctx.lineTo(-7, -14 - bt); ctx.moveTo(22, -12 + bt); ctx.lineTo(7, -14 - bt); ctx.stroke();
  ctx.strokeStyle = shade(sk, -0.35); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(0 + lk * 0.4, 6); ctx.lineTo(-4 + lk * 0.4, 20); ctx.lineTo(3 + lk * 0.4, 21); ctx.stroke();
  ctx.strokeStyle = '#6b3a30'; ctx.lineWidth = 3.5; ctx.beginPath(); if (m === 'happy') ctx.arc(lk * 0.4, 26, 10, 0.15 * Math.PI, 0.85 * Math.PI); else if (m === 'scared') { ctx.ellipse(lk * 0.4, 33, 6, 8, 0, 0, 7); } else { ctx.moveTo(-8 + lk * 0.4, 33); ctx.lineTo(8 + lk * 0.4, 33); } ctx.stroke();
  if (o.mustache) { ctx.fillStyle = '#1a110b'; ctx.beginPath(); ctx.moveTo(-16, 24); ctx.quadraticCurveTo(0, 16, 16, 24); ctx.quadraticCurveTo(0, 22, -16, 24); ctx.fill(); }
  if (o.glasses) { ctx.strokeStyle = '#111'; ctx.lineWidth = 3.5; ctx.beginPath(); ctx.arc(-14 + lk * 0.3, 2, 11, 0, 7); ctx.moveTo(25 + lk * 0.3, 2); ctx.arc(14 + lk * 0.3, 2, 11, 0, 7); ctx.moveTo(-3, 0); ctx.lineTo(3, 0); ctx.stroke(); }
  if (o.bindi) { ctx.fillStyle = '#c4102a'; ctx.beginPath(); ctx.arc(0, -16, 3.5, 0, 7); ctx.fill(); }
  ctx.restore();
  if (o.dupatta) { ctx.fillStyle = o.dupatta; ctx.beginPath(); ctx.moveTo(-48, -150); ctx.quadraticCurveTo(0, -120, 52, -40); ctx.lineTo(40, 10); ctx.quadraticCurveTo(0, -90, -50, -120); ctx.fill(); }
  if (o.bag) { ctx.fillStyle = o.bag; rr(-62, -140, 18, 120, 8); ctx.fill(); }
  ctx.restore(); ctx.restore();
}
export function shade(hex, k) { const n = parseInt(hex.slice(1), 16); let r = n >> 16, g = (n >> 8) & 255, b = n & 255; const f = (c) => Math.round(clamp(k < 0 ? c * (1 + k) : c + (255 - c) * k, 0, 255)); return `rgb(${f(r)},${f(g)},${f(b)})`; }

/* ---------- the Examiner (giant faceless silhouette) ---------- */
export function examiner(x, y, s, t, o = {}) {  // y = waist line; draws upward
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.fillStyle = '#050507'; ctx.beginPath(); ctx.moveTo(-170, 400); ctx.lineTo(-190, 0); ctx.quadraticCurveTo(-200, -260, -150, -330); ctx.quadraticCurveTo(0, -380, 150, -330); ctx.quadraticCurveTo(200, -260, 190, 0); ctx.lineTo(170, 400); ctx.fill();
  ctx.fillStyle = '#0d0d12'; ctx.beginPath(); ctx.moveTo(-40, -350); ctx.lineTo(0, -200); ctx.lineTo(40, -350); ctx.fill();   // shirt V
  ctx.fillStyle = '#5a0a08'; ctx.beginPath(); ctx.moveTo(-10, -340); ctx.lineTo(10, -340); ctx.lineTo(14, -220); ctx.lineTo(0, -200); ctx.lineTo(-14, -220); ctx.fill();   // tie
  ctx.fillStyle = '#050507'; rr(-34, -420, 68, 80, 20); ctx.fill(); ctx.beginPath(); ctx.ellipse(0, -500, 86, 104, 0, 0, 7); ctx.fill();   // neck + head
  // red eye slits
  const bl = Math.sin(t * 0.7) > 0.97 ? 0.1 : 1; ctx.fillStyle = '#ff2416'; ctx.shadowColor = '#ff1a10'; ctx.shadowBlur = 30;
  for (const ex of [-30, 30]) { ctx.beginPath(); ctx.ellipse(ex, -510, 18, 4 * bl, 0, 0, 7); ctx.fill(); }
  // arm + red pen
  ctx.shadowBlur = 0; ctx.fillStyle = '#050507'; ctx.beginPath(); ctx.moveTo(150, -320); ctx.quadraticCurveTo(260, -200, 250, -40); ctx.lineTo(200, -40); ctx.quadraticCurveTo(205, -180, 140, -260); ctx.fill(); ctx.beginPath(); ctx.ellipse(226, -30, 34, 40, 0, 0, 7); ctx.fill();
  ctx.strokeStyle = '#ff2416'; ctx.lineWidth = 12; ctx.shadowColor = '#ff1a10'; ctx.shadowBlur = 40; ctx.beginPath(); ctx.moveTo(214, -40); ctx.lineTo(262, -150); ctx.stroke();
  ctx.restore();
}
/* ---------- a giant hand (knuckles), x,y = knuckle contact point, facing left ---------- */
export function giantFist(x, y, s, o = {}) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); const sk = o.skin || '#2a2422';
  ctx.fillStyle = '#060608'; ctx.beginPath(); ctx.moveTo(150, -110); ctx.lineTo(700, -160); ctx.lineTo(700, 230); ctx.lineTo(150, 150); ctx.fill();   // sleeve
  ctx.fillStyle = '#d8d4cc'; rr(120, -100, 40, 240, 10); ctx.fill();   // cuff
  const g = ctx.createLinearGradient(0, -90, 0, 130); g.addColorStop(0, shade(sk, 0.25)); g.addColorStop(1, shade(sk, -0.4)); ctx.fillStyle = g;
  rr(20, -90, 120, 220, 50); ctx.fill();   // back of hand
  for (let k = 0; k < 4; k++) { rr(0, -88 + k * 54, 70, 50, 24); ctx.fill(); ctx.strokeStyle = shade(sk, -0.5); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(10, -40 + k * 54); ctx.lineTo(60, -40 + k * 54); ctx.stroke(); }
  rr(40, 110, 90, 46, 22); ctx.fill();   // thumb
  ctx.restore();
}
/* ---------- giant eye (outside a window) ---------- */
export function giantEye(x, y, r, t, o = {}) {
  ctx.save(); ctx.translate(x, y);
  ctx.fillStyle = '#1c1210'; ctx.beginPath(); ctx.ellipse(0, 0, r * 2.2, r * 1.5, 0, 0, 7); ctx.fill();
  const lid = o.lid ?? 0.2; ctx.save(); ctx.beginPath(); ctx.ellipse(0, 0, r * 1.6, r * (0.95 - lid * 0.6), 0, 0, 7); ctx.clip();
  const sc = ctx.createRadialGradient(0, 0, r * 0.2, 0, 0, r * 1.6); sc.addColorStop(0, '#efe6dc'); sc.addColorStop(1, '#8e6f66'); ctx.fillStyle = sc; ctx.fillRect(-r * 2, -r * 2, r * 4, r * 4);
  ctx.strokeStyle = 'rgba(170,30,30,.5)'; ctx.lineWidth = 2; for (let i = 0; i < 24; i++) { const a = i / 24 * 6.28; ctx.beginPath(); ctx.moveTo(Math.cos(a) * r * 1.6, Math.sin(a) * r); ctx.quadraticCurveTo(Math.cos(a + 0.4) * r * 0.9, Math.sin(a + 0.4) * r * 0.7, Math.cos(a) * r * 0.62, Math.sin(a) * r * 0.62); ctx.stroke(); }
  const ix = (o.look || 0) * r * 0.4, ir = ctx.createRadialGradient(ix, 0, r * 0.1, ix, 0, r * 0.62); ir.addColorStop(0, '#2a0503'); ir.addColorStop(0.45, '#b3260f'); ir.addColorStop(0.85, '#5a0d06'); ir.addColorStop(1, '#120201'); ctx.fillStyle = ir; ctx.beginPath(); ctx.arc(ix, 0, r * 0.62, 0, 7); ctx.fill();
  ctx.fillStyle = '#000'; ctx.beginPath(); ctx.ellipse(ix, 0, r * 0.12, r * 0.42, 0, 0, 7); ctx.fill();
  ctx.fillStyle = 'rgba(255,255,255,.75)'; ctx.beginPath(); ctx.arc(ix - r * 0.22, -r * 0.24, r * 0.09, 0, 7); ctx.fill();
  ctx.restore(); ctx.strokeStyle = '#0c0706'; ctx.lineWidth = r * 0.12; ctx.beginPath(); ctx.ellipse(0, 0, r * 1.6, r * (0.95 - lid * 0.6), 0, 0, 7); ctx.stroke();
  ctx.restore();
}
