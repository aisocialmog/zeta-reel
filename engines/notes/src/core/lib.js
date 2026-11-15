// Survival Cutaway engine: canvas, palette, math and drawing primitives.
// Every drawing function in the kit uses the shared `ctx` exported here (set once by main.js).
export const W = 1080, H = 1920, FPS = 30;
export let ctx = null;
export function setCtx(c) { ctx = c; }

// The style sheet palette. Flat colours only (one darker shade per surface, no gradients except sky/sea).
export const C = {
  ink: '#1B1A19', cream: '#F7F1E3', yellow: '#FFD23F', red: '#FF4B3E', green: '#39D98A', blue: '#4FB3FF', grey: '#A3A8AD', white: '#FFFFFF',
  sand: '#E9C98D', sandD: '#D6B06E', wet: '#B98F55', soil: '#6B4A2F', soilD: '#4D3421', rock: '#6F737B', rockD: '#555960',
  sea: '#2D8FD6', seaD: '#174F86', leaf: '#2F9E57', leafD: '#1F7340', trunk: '#8A5A33',
  skin: '#F0C095', hair: '#1C1A1A', shirt: '#F4F6F8', navy: '#253A6B', tie: '#D9363E', hud: 'rgba(18,17,16,.92)',
};

// ---------- math ----------
export const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
export const lerp = (a, b, t) => a + (b - a) * t;
export const seg = (t, a, b) => clamp((t - a) / ((b - a) || 1e-6));
export const eo = (t) => 1 - Math.pow(1 - clamp(t), 3);
export const eio = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
export const eob = (t) => { t = clamp(t); const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2); };
export const pop = (t, t0, d = 0.25) => eob(seg(t, t0, t0 + d));      // 0 → 1 with overshoot, starting at t0
export const rnd = (i) => { const x = Math.sin(i * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };
export const TAU = Math.PI * 2;

// ---------- primitives ----------
export function font(size, w = 900) { ctx.font = `${w >= 850 ? 900 : 800} ${size}px Inter`; }
export function rr(x, y, w, h, r) { ctx.beginPath(); ctx.roundRect(x, y, w, h, r); }
export function circle(x, y, r, fill) { ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fillStyle = fill; ctx.fill(); }
export function ell(x, y, rx, ry, fill, rot = 0) { ctx.beginPath(); ctx.ellipse(x, y, rx, ry, rot, 0, TAU); ctx.fillStyle = fill; ctx.fill(); }
export function poly(pts, fill, stroke, lw = 3) {
  ctx.beginPath(); pts.forEach((p, i) => (i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]))); ctx.closePath();
  if (fill) { ctx.fillStyle = fill; ctx.fill(); } if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = lw; ctx.stroke(); }
}
export function line(pts, color, w) {
  ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]);
  for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
  ctx.strokeStyle = color; ctx.lineWidth = w; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.stroke();
}
export function fillAll(color) { ctx.fillStyle = color; ctx.fillRect(-400, -400, W + 800, H + 800); }
export function withA(a, fn) { if (a <= 0) return; ctx.save(); ctx.globalAlpha *= clamp(a); fn(); ctx.restore(); }
export function scaled(x, y, s, fn) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.translate(-x, -y); fn(); ctx.restore(); }
/** draw in screen space, ignoring the camera (HUD, tags, stamps, cards) */
export function screen(fn) { ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); fn(); ctx.restore(); }
