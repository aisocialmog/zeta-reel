// Zeta "blocky" avatar: Roblox-story style R6 figure (block legs, torso, straight arms, rounded-cube head, classic face),
// 3-tone shading + dark outline, Zeta "Z" chest badge on students. Shared by the chhotu and aasmaan engines.
// avatar(o) draws in LOCAL units (feet at 0,0, facing camera); caller translates/scales. Dimensions come from o.dim.
import { ctx, clamp } from './lib.js';

export const isBlocky = () => { try { return ((typeof window !== 'undefined' && window.SCRIPT && window.SCRIPT.style) || 'blocky') !== 'classic'; } catch { return true; } };
const OUT = '#16131f';
export function tint(hex, k) { const h = String(hex || '#888').trim(); let r, g, b;
  if (h[0] === '#') { const n = parseInt(h.length === 4 ? h.slice(1).split('').map((c) => c + c).join('') : h.slice(1, 7), 16); r = n >> 16; g = (n >> 8) & 255; b = n & 255; }
  else { const m = h.match(/\d+/g) || [128, 128, 128]; [r, g, b] = m.map(Number); }
  const f = (c) => Math.round(clamp(k < 0 ? c * (1 + k) : c + (255 - c) * k, 0, 255)); return `rgb(${f(r)},${f(g)},${f(b)})`; }
function rrect(x, y, w, h, r) { ctx.beginPath(); ctx.roundRect(x, y, w, h, Math.min(r, w / 2, h / 2)); }
/* one shaded block: front gradient, darker right side strip, top highlight, outline */
export function block(x, y, w, h, col, o = {}) { const r = o.r ?? 7, lw = o.lw ?? 4;
  rrect(x, y, w, h, r); const g = ctx.createLinearGradient(x, y, x, y + h); g.addColorStop(0, tint(col, 0.12)); g.addColorStop(1, tint(col, -0.12)); ctx.fillStyle = g; ctx.fill();
  ctx.save(); rrect(x, y, w, h, r); ctx.clip(); ctx.fillStyle = tint(col, -0.28); ctx.fillRect(x + w * 0.8, y, w * 0.2 + 2, h);
  ctx.fillStyle = 'rgba(255,255,255,.22)'; ctx.fillRect(x, y, w, Math.max(4, h * 0.07)); ctx.restore();
  if (lw) { rrect(x, y, w, h, r); ctx.strokeStyle = OUT; ctx.lineWidth = lw; ctx.stroke(); } }
/* arm poses: [leftLift, leftLen, rightLift, rightLen]; lift = rad away from body (outward/up), len = foreshortening 0.4..1 */
const POSE = {
  stand: [0.1, 1, 0.1, 1], down: [0.1, 1, 0.1, 1], sleep: [0.1, 1, 0.1, 1], sit: [0.06, 1, 0.06, 1],
  hold: [-0.32, 0.62, -0.32, 0.62], tray: [-0.3, 0.62, -0.3, 0.62], dig: [-0.2, 0.7, 0.4, 0.8], crouch: [-0.25, 0.7, -0.25, 0.7],
  point: [0.1, 1, 2.05, 1], scared: [2.55, 0.95, 2.55, 0.95], write: [0.1, 1, -0.45, 0.62], phone: [-0.42, 0.52, -0.42, 0.52],
  wave: [0.1, 1, 2.75, 1], fist: [0.1, 1, 3.05, 1], reach: [0.1, 1, 1.57, 1], hug: [-0.62, 0.7, -0.62, 0.7]
};
/* o: dim {legH, legW, torW, torH, armW, head}, skin, shirt, pants, hair ('boy'|'messy'|'short'|'girl'|'pony'|'long'|'bun'|'none'), hairC,
   pose ('stand'|'sit'|'crouch'), arms, mood ('ok'|'happy'|'scared'|'think'|'tired'|'sad'|'blank'), open 0..1, look -1..1, badge, tie, tieC,
   glasses, bindi, chubby, walk, t (time, for wave) */
export function avatar(o) {
  const D = { legH: 70, legW: 32, torW: 92, torH: 86, armW: 27, head: 98, ...(o.dim || {}) }; const sk = o.skin || '#e8b48a', sh = o.shirt || '#f4f6f8', pa = o.pants || '#2c4a8a', hc = o.hairC || '#2a1d17';
  const tw = D.torW * (o.chubby ? 1.16 : 1), sit = o.pose === 'sit', cr = o.pose === 'crouch' || o.pose === 'dig' ? D.legH * 0.3 : 0, wp = o.walk != null ? Math.sin(o.walk * 8) : 0;
  const hip = (sit && D.seat ? -D.seat : -D.legH) + cr, top = hip - D.torH;
  // shadow
  ctx.fillStyle = 'rgba(0,0,0,.18)'; ctx.beginPath(); ctx.ellipse(sit ? D.legW * 1.4 : 0, 2, tw * 0.62, 10, 0, 0, 7); ctx.fill();
  // legs
  if (sit) { for (const sx of [-1, 1]) { const lx = sx < 0 ? -tw / 2 + 4 : 4; block(lx, hip - 4, D.legH * 0.95, D.legW, pa, { r: 6 }); block(lx + D.legH * 0.95 - D.legW, hip - 4, D.legW, Math.max(20, -hip - 8), pa, { r: 6 }); block(lx + D.legH * 0.95 - D.legW - 2, -14, D.legW + 10, 14, '#2b2b33', { r: 5, lw: 3 }); } }
  else for (const sx of [-1, 1]) { const lx = (sx < 0 ? -tw / 2 + tw * 0.06 : tw * 0.02) + sx * wp * 6; ctx.save(); ctx.translate(lx + D.legW / 2, hip); ctx.rotate(-sx * wp * 0.12); block(-D.legW / 2, 0, D.legW + tw * 0.06, D.legH - cr * 0.2, pa, { r: 6 }); ctx.restore();
    block(lx - 2, -14, D.legW + tw * 0.06 + 4, 14, '#2b2b33', { r: 5, lw: 3 }); }
  // arms behind? (lifted arms drawn after torso; hanging arms drawn after torso too: R6 arms sit beside torso)
  const P = POSE[o.arms] || POSE[o.mood === 'scared' && !sit ? 'scared' : (o.pose === 'sit' ? 'sit' : o.pose === 'crouch' ? 'crouch' : 'stand')] || POSE.stand;
  const arm = (side, lift, len) => { const sx = side < 0 ? -tw / 2 - D.armW / 2 + 2 : tw / 2 + D.armW / 2 - 2, wav = o.arms === 'wave' && side > 0 ? Math.sin((o.t || 0) * 9) * 0.25 : 0;
    ctx.save(); ctx.translate(sx, top + D.armW * 0.5); ctx.rotate(side < 0 ? lift : -(lift + wav)); const L = D.torH * 0.98 * len;
    block(-D.armW / 2, -D.armW * 0.45, D.armW, L * 0.62 + D.armW * 0.45, sh, { r: 7 }); block(-D.armW / 2 + 1, L * 0.62 - 2, D.armW - 2, L * 0.38 + 2, sk, { r: 7 }); ctx.restore(); };
  // torso
  block(-tw / 2, top, tw, D.torH, sh, { r: 9 });
  if (o.tie) { ctx.fillStyle = o.tieC || '#c8283a'; ctx.beginPath(); ctx.moveTo(-6, top + 4); ctx.lineTo(6, top + 4); ctx.lineTo(9, top + D.torH * 0.6); ctx.lineTo(0, top + D.torH * 0.7); ctx.lineTo(-9, top + D.torH * 0.6); ctx.closePath(); ctx.fill(); ctx.strokeStyle = OUT; ctx.lineWidth = 2.5; ctx.stroke(); }
  if (o.hoodie) { ctx.strokeStyle = tint(sh, -0.35); ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(-10, top + 6); ctx.lineTo(-12, top + D.torH * 0.45); ctx.moveTo(10, top + 6); ctx.lineTo(12, top + D.torH * 0.45); ctx.stroke(); block(-tw * 0.3, top + D.torH * 0.6, tw * 0.6, D.torH * 0.28, tint(sh, -0.12), { r: 6, lw: 2.5 }); }
  if (o.badge !== false && o.badge) { const bx = tw * 0.16, by = top + D.torH * 0.16, bs = Math.max(16, tw * 0.22); block(bx, by, bs, bs, '#ff5a6e', { r: 5, lw: 2.5 }); ctx.fillStyle = '#fff'; ctx.font = `900 ${Math.round(bs * 0.72)}px Inter, sans-serif`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('Z', bx + bs / 2, by + bs / 2 + 1); }
  arm(-1, P[0], P[1]); arm(1, P[2], P[3]);
  if (o.arms === 'phone' && o.phoneProp !== false) { const py = top + D.torH * 0.38; block(-15, py - 34, 30, 50, '#101014', { r: 6, lw: 3 }); ctx.fillStyle = o.screen || '#9fc4ff'; ctx.fillRect(-11, py - 30, 22, 40); }
  // head (rounded cube) — centre at hc
  const H = D.head, hy = top - H * 0.42, lk = (o.look || 0) * H * 0.07; head(0, hy, H, sk, hc, o, lk);
  return { headY: hy, top, hip };
}
function head(x, y, H, sk, hc, o, lk) {
  const w = H, h = H * 0.94; block(x - H * 0.17, y + h * 0.36, H * 0.34, h * 0.2, tint(sk, -0.12), { r: 4, lw: 3 }); // neck
  const hr = o.hair || 'boy';
  if (hr === 'girl' || hr === 'long') { block(x - w / 2 - 8, y - h * 0.3, w + 16, h * 0.95, hc, { r: 14 }); }
  if (hr === 'pony') block(x + w * 0.38, y - h * 0.32, w * 0.26, h * 0.62, hc, { r: 10 });
  if (hr === 'bun') block(x - w * 0.18, y - h * 0.78, w * 0.36, h * 0.26, hc, { r: 10 });
  // face cube
  rrect(x - w / 2, y - h / 2, w, h, H * 0.24); const g = ctx.createLinearGradient(x - w / 2, 0, x + w / 2, 0); g.addColorStop(0, tint(sk, 0.06)); g.addColorStop(0.7, sk); g.addColorStop(1, tint(sk, -0.22)); ctx.fillStyle = g; ctx.fill();
  ctx.save(); rrect(x - w / 2, y - h / 2, w, h, H * 0.24); ctx.clip(); ctx.fillStyle = 'rgba(255,255,255,.18)'; ctx.fillRect(x - w / 2, y - h / 2, w, h * 0.08); ctx.restore();
  rrect(x - w / 2, y - h / 2, w, h, H * 0.24); ctx.strokeStyle = OUT; ctx.lineWidth = 4; ctx.stroke();
  // hair cap (blocky)
  if (hr !== 'none') { ctx.save(); rrect(x - w / 2 - 4, y - h / 2 - 8, w + 8, h * 0.42, H * 0.22); ctx.fillStyle = hc; ctx.fill(); ctx.strokeStyle = OUT; ctx.lineWidth = 4; ctx.stroke();
    ctx.fillStyle = hc; if (hr === 'messy' || hr === 'boy') { for (let k = 0; k < 4; k++) { const fx = x - w / 2 + 6 + k * w * 0.23; rrect(fx, y - h / 2 + h * 0.2, w * 0.2, h * (k % 2 ? 0.14 : 0.2), 4); ctx.fill(); }
      if (hr === 'messy') for (let k = 0; k < 4; k++) { rrect(x - w * 0.36 + k * w * 0.2, y - h / 2 - 20 - (k % 2) * 6, w * 0.13, 24, 4); ctx.fill(); ctx.strokeStyle = OUT; ctx.lineWidth = 3; ctx.stroke(); } }
    else if (hr === 'girl' || hr === 'long' || hr === 'pony' || hr === 'bun') { rrect(x - w / 2 - 2, y - h / 2 + h * 0.18, w * 0.3, h * 0.24, 6); ctx.fill(); rrect(x + w * 0.2, y - h / 2 + h * 0.18, w * 0.32, h * 0.18, 6); ctx.fill(); }
    else { rrect(x - w / 2 + 2, y - h / 2 + h * 0.18, w - 4, h * 0.08, 4); ctx.fill(); }
    if (hr === 'girl' || hr === 'long') { block(x - w / 2 - 8, y - h * 0.15, 16, h * 0.68, hc, { r: 6, lw: 3 }); block(x + w / 2 - 8, y - h * 0.15, 16, h * 0.68, hc, { r: 6, lw: 3 }); }
    ctx.restore(); }
  // classic face
  const m = o.mood || 'ok', fy = y + h * 0.04, ex = w * 0.17, wide = m === 'scared' || m === 'blank';
  if (m === 'blank') { ctx.fillStyle = 'rgba(255,255,255,.85)'; for (const s of [-1, 1]) { ctx.beginPath(); ctx.ellipse(x + s * ex, fy, w * 0.07, h * 0.08, 0, 0, 7); ctx.fill(); } }
  else { ctx.fillStyle = '#121016'; for (const s of [-1, 1]) { ctx.beginPath(); if (m === 'tired') ctx.ellipse(x + s * ex + lk, fy + 2, w * 0.06, h * 0.028, 0, 0, 7); else ctx.ellipse(x + s * ex + lk, fy, w * (wide ? 0.06 : 0.05), h * (wide ? 0.09 : 0.08), 0, 0, 7); ctx.fill(); }
    ctx.fillStyle = '#fff'; for (const s of [-1, 1]) { ctx.beginPath(); ctx.arc(x + s * ex + lk + w * 0.015, fy - h * 0.03, w * 0.017, 0, 7); ctx.fill(); } }
  ctx.strokeStyle = '#121016'; ctx.lineWidth = Math.max(3, w * 0.04); ctx.lineCap = 'round'; const by = fy - h * 0.15, bt = m === 'scared' ? -h * 0.04 : m === 'sad' || m === 'think' ? h * 0.03 : m === 'tired' ? h * 0.02 : 0;
  ctx.beginPath(); ctx.moveTo(x - ex - w * 0.08, by + bt); ctx.lineTo(x - ex + w * 0.08, by - bt); ctx.moveTo(x + ex + w * 0.08, by + (m === 'think' ? -bt : bt)); ctx.lineTo(x + ex - w * 0.08, by - (m === 'think' ? -bt : bt)); ctx.stroke();
  const op = clamp(o.open || 0), my = fy + h * 0.24;
  if (op > 0.15 || m === 'scared') { ctx.fillStyle = '#4a1418'; ctx.beginPath(); ctx.ellipse(x + lk * 0.6, my, w * 0.09, h * (0.04 + 0.08 * Math.max(op, m === 'scared' ? 0.8 : 0)), 0, 0, 7); ctx.fill(); }
  else { ctx.beginPath(); if (m === 'happy') { ctx.arc(x + lk * 0.6, my - h * 0.08, w * 0.17, 0.18 * Math.PI, 0.82 * Math.PI); } else if (m === 'sad') { ctx.arc(x + lk * 0.6, my + h * 0.08, w * 0.11, 1.2 * Math.PI, 1.8 * Math.PI); } else if (m === 'think' || m === 'tired' || m === 'blank') { ctx.moveTo(x - w * 0.08, my); ctx.lineTo(x + w * 0.08, my - 2); } else { ctx.arc(x + lk * 0.6, my - h * 0.06, w * 0.12, 0.22 * Math.PI, 0.78 * Math.PI); } ctx.stroke(); }
  ctx.fillStyle = 'rgba(255,110,120,.28)'; for (const s of [-1, 1]) { ctx.beginPath(); ctx.ellipse(x + s * w * 0.3, fy + h * 0.15, w * 0.07, h * 0.04, 0, 0, 7); ctx.fill(); }
  if (o.glasses) { ctx.strokeStyle = '#121016'; ctx.lineWidth = 4; for (const s of [-1, 1]) { rrect(x + s * ex - w * 0.12, fy - h * 0.1, w * 0.24, h * 0.2, 5); ctx.stroke(); } ctx.beginPath(); ctx.moveTo(x - ex + w * 0.12, fy); ctx.lineTo(x + ex - w * 0.12, fy); ctx.stroke(); }
  if (o.bindi) { ctx.fillStyle = '#c4102a'; ctx.beginPath(); ctx.arc(x, fy - h * 0.2, w * 0.03, 0, 7); ctx.fill(); }
  if (o.mustache) { ctx.fillStyle = '#2a1d17'; rrect(x - w * 0.2, my - h * 0.12, w * 0.4, h * 0.07, 4); ctx.fill(); }
}
