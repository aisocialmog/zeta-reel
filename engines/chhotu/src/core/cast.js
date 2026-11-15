// Chhotu ke 100 Din cast: Chhotu, Mishti (kids, school uniform), Papa & Mummy (adults: taller, no uniform, moustache/specs, bindi/bun).
import { ctx, C, clamp, lerp, eo, font, rr, circle as circ, poly, withA } from './lib.js';
import * as K from './kit.js';
const headY = (y, s, o) => y + (-196 + ((o.pose === 'crouch' || o.pose === 'dig') ? 28 : 0)) * s;
export function chhotu(x, y, s = 1, o = {}) {
  K.kid(x, y, s, { shirt: '#f4f6f8', ...o }); const hy = headY(y, s, o), f = o.flip ? -1 : 1;
  ctx.save(); ctx.translate(x, hy); ctx.scale(s * f, s);
  if (o.headband) { ctx.fillStyle = C.red; rr(-54, -36, 108, 16, 6); ctx.fill(); poly([[48, -32], [92, -50], [86, -18]], C.red); poly([[48, -26], [96, -14], [80, 0]], '#c9302a'); }
  if (o.shades) { ctx.fillStyle = '#111'; rr(-38, -12, 32, 22, 7); ctx.fill(); rr(6, -12, 32, 22, 7); ctx.fill(); ctx.fillRect(-8, -6, 16, 5); ctx.fillStyle = 'rgba(255,255,255,.5)'; ctx.fillRect(-30, -8, 8, 4); ctx.fillRect(14, -8, 8, 4); }
  if (o.blush) withA(o.blush, () => { circ(-30, 20, 14, 'rgba(255,80,110,.65)'); circ(30, 20, 14, 'rgba(255,80,110,.65)'); });
  if (o.sweat) withA(o.sweat, () => { ctx.fillStyle = 'rgba(120,190,255,.95)'; ctx.beginPath(); ctx.ellipse(-50, -24, 7, 12, 0, 0, 7); ctx.fill(); });
  ctx.restore();
}
export function mishti(x, y, s = 1, o = {}) {
  K.kid(x, y, s, { hair: 'girl', shirt: '#f4f6f8', pants: '#2c4a8a', ...o }); const hy = headY(y, s, o), f = o.flip ? -1 : 1;
  ctx.save(); ctx.translate(x, hy); ctx.scale(s * f, s);
  poly([[38, -52], [64, -66], [62, -38]], '#ff5c93'); poly([[38, -52], [60, -30], [36, -32]], '#ff5c93'); circ(42, -46, 6, '#ff2f78');
  ctx.restore();
}
/* who: 'papa' | 'mummy' */
export function adult(x, y, s, who, o = {}) {
  const pa = who === 'papa';
  K.kid(x, y, s, { tie: false, shirt: pa ? '#e7dcc2' : '#c8406a', pants: pa ? '#4b4b57' : '#c8406a', hair: pa ? 'boy' : 'girl', skin: pa ? '#dca77c' : '#e8b48a', ...o });
  const hy = headY(y, s, o), f = o.flip ? -1 : 1;
  ctx.save(); ctx.translate(x, y); ctx.scale(s * f, s);
  if (pa) { ctx.strokeStyle = 'rgba(0,0,0,.18)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(0, -146); ctx.lineTo(0, -80); ctx.stroke(); for (let i = 0; i < 3; i++) circ(0, -136 + i * 18, 3.5, '#b9a77f'); }
  else { ctx.fillStyle = '#f2c14e'; ctx.beginPath(); ctx.moveTo(-34, -146); ctx.lineTo(-20, -146); ctx.lineTo(30, -66); ctx.lineTo(16, -66); ctx.closePath(); ctx.fill(); }
  ctx.restore();
  ctx.save(); ctx.translate(x, hy); ctx.scale(s * f, s);
  if (pa) {
    ctx.fillStyle = '#2a1d17'; ctx.beginPath(); ctx.moveTo(-26, 14); ctx.quadraticCurveTo(0, 2, 26, 14); ctx.quadraticCurveTo(14, 22, 0, 16); ctx.quadraticCurveTo(-14, 22, -26, 14); ctx.fill();
    ctx.strokeStyle = '#222'; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(-17, 2, 15, 0, 7); ctx.moveTo(32, 2); ctx.arc(17, 2, 15, 0, 7); ctx.moveTo(-2, 0); ctx.lineTo(2, 0); ctx.stroke();
    ctx.fillStyle = '#9a9a9a'; ctx.fillRect(-52, -14, 8, 16); ctx.fillRect(44, -14, 8, 16);
  } else {
    circ(0, -60, 22, C.hair); circ(0, -14, 5, '#d4162c'); ctx.strokeStyle = '#c41f3a'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(0, -56); ctx.lineTo(0, -40); ctx.stroke();
    circ(-48, 20, 5, '#f2c14e'); circ(48, 20, 5, '#f2c14e');
  }
  ctx.restore();
}
/* Sharma ji ka beta: a glowing perfect silhouette with a halo and a "?" for a face */
export function sharmaBeta(x, y, s, a, t) {
  withA(a, () => {
    const g = ctx.createRadialGradient(x, y - 150 * s, 10, x, y - 150 * s, 260 * s); g.addColorStop(0, 'rgba(255,240,170,.85)'); g.addColorStop(1, 'rgba(255,240,170,0)'); ctx.fillStyle = g; ctx.fillRect(x - 300 * s, y - 420 * s, 600 * s, 500 * s);
    K.kid(x, y, s, { shirt: '#fffdf2', pants: '#e9e2c8', skin: '#fff3d6', hair: 'boy', mood: 'happy' });
    ctx.save(); ctx.translate(x, y - 196 * s); ctx.scale(s, s);
    circ(0, 0, 52, '#fff3d6'); font(64, 900); ctx.fillStyle = '#c9a227'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('?', 0, 4);
    ctx.strokeStyle = `rgba(255,214,70,${0.8 + 0.2 * Math.sin(t * 6)})`; ctx.lineWidth = 8; ctx.beginPath(); ctx.ellipse(0, -78, 46, 12, 0, 0, 7); ctx.stroke();
    ctx.restore();
  });
}

/* tiny shoulder Chhotu: kind 'devil' (red, horns, fork) | 'angel' (white, halo, wings) */
export function mini(x, y, s, kind, t, o = {}) { const dv = kind === 'devil';
  if (!dv) { ctx.fillStyle = 'rgba(255,255,255,.9)'; for (const sg of [-1, 1]) { ctx.beginPath(); ctx.ellipse(x + sg * 46 * s, y - 120 * s, 40 * s, 22 * s, sg * 0.5, 0, 7); ctx.fill(); } }
  K.kid(x, y, s, { shirt: dv ? '#d92b20' : '#ffffff', pants: dv ? '#7a1610' : '#dfe6f0', mood: dv ? 'happy' : 'ok', open: o.open || 0, tie: false, look: o.look || 0 });
  const hy = y - 196 * s; ctx.save(); ctx.translate(x, hy); ctx.scale(s, s);
  if (dv) { poly([[-34, -38], [-22, -84], [-10, -44]], '#d92b20'); poly([[34, -38], [22, -84], [10, -44]], '#d92b20'); ctx.strokeStyle = '#d92b20'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(60, 120); ctx.lineTo(60, 260); ctx.stroke(); ctx.beginPath(); ctx.moveTo(44, 120); ctx.lineTo(44, 100); ctx.moveTo(76, 120); ctx.lineTo(76, 100); ctx.moveTo(44, 120); ctx.lineTo(76, 120); ctx.stroke(); }
  else { ctx.strokeStyle = `rgba(255,214,70,${0.85 + 0.15 * Math.sin(t * 6)})`; ctx.lineWidth = 8; ctx.beginPath(); ctx.ellipse(0, -76, 44, 12, 0, 0, 7); ctx.stroke(); }
  ctx.restore(); }
