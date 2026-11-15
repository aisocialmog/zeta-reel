// Boards series world: a flat side-view CUTAWAY of a student's room (same Survival Cutaway look, new set).
import { ctx, C, W, H, clamp, lerp, eo, eob, font, rr, circle as circ, poly, withA, scaled, screen } from './lib.js';
export const FL = 1090;   // floor line
const WALL = { night: '#1d2546', dark: '#10142a', dawn: '#d9c7a8', day: '#ecdcc0' };
export function room(mood, t, o = {}) {
  ctx.fillStyle = WALL[mood] || WALL.day; ctx.fillRect(-400, -400, W + 800, FL + 400);
  // skirting + floor (cutaway: floor slab, then dark below)
  ctx.fillStyle = 'rgba(0,0,0,.18)'; ctx.fillRect(-400, FL - 22, W + 800, 22);
  ctx.fillStyle = '#8a5f3a'; ctx.fillRect(-400, FL, W + 800, 70); ctx.fillStyle = '#6e4a2c'; for (let x = -400; x < W + 400; x += 140) ctx.fillRect(x, FL, 4, 70);
  ctx.fillStyle = '#3a2a1f'; ctx.fillRect(-400, FL + 70, W + 800, H);
  // window
  const wx = o.winX ?? 690, wy = 380, ww = 290, wh = 300;
  const sk = { night: ['#0a1230', '#1b2a5c'], dark: ['#050915', '#0e1838'], dawn: ['#f2a86f', '#fde2b8'], day: ['#7cc5ef', '#d4eef9'] }[mood] || ['#7cc5ef', '#d4eef9'];
  const g = ctx.createLinearGradient(0, wy, 0, wy + wh); g.addColorStop(0, sk[0]); g.addColorStop(1, sk[1]); ctx.fillStyle = g; ctx.fillRect(wx, wy, ww, wh);
  if (mood === 'night' || mood === 'dark') { for (let i = 0; i < 14; i++) circ(wx + 20 + ((i * 97) % (ww - 40)), wy + 20 + ((i * 53) % (wh - 60)), 2.2, `rgba(255,255,255,${0.4 + 0.4 * Math.sin(t * 2 + i)})`); circ(wx + 210, wy + 80, 30, '#f4f1de'); circ(wx + 224, wy + 70, 28, sk[0]); }
  if (mood === 'dawn') circ(wx + 80, wy + wh - 20, 60, 'rgba(255,220,150,.95)');
  ctx.strokeStyle = '#f2ead8'; ctx.lineWidth = 16; ctx.strokeRect(wx, wy, ww, wh); ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(wx + ww / 2, wy); ctx.lineTo(wx + ww / 2, wy + wh); ctx.moveTo(wx, wy + wh / 2); ctx.lineTo(wx + ww, wy + wh / 2); ctx.stroke();
}
export function dark(a) { withA(a, () => { ctx.fillStyle = '#04060f'; ctx.fillRect(-400, -400, W + 800, H + 800); }); }
export function glow(x, y, r, col, a = 1) { withA(a, () => { ctx.save(); ctx.globalCompositeOperation = 'lighter'; const g = ctx.createRadialGradient(x, y, 0, x, y, r); g.addColorStop(0, col); g.addColorStop(1, 'rgba(0,0,0,0)'); ctx.fillStyle = g; ctx.fillRect(x - r, y - r, 2 * r, 2 * r); ctx.restore(); }); }
export function bed(x, y) { rr(x, y - 120, 420, 90, 14); ctx.fillStyle = '#5b4632'; ctx.fill(); rr(x + 10, y - 150, 400, 50, 18); ctx.fillStyle = '#e9eef5'; ctx.fill(); rr(x + 18, y - 190, 120, 50, 22); ctx.fillStyle = '#fff'; ctx.fill(); rr(x - 10, y - 260, 30, 260, 8); ctx.fillStyle = '#4a3828'; ctx.fill(); ctx.fillStyle = '#4a3828'; ctx.fillRect(x + 390, y - 40, 22, 40); ctx.fillRect(x + 20, y - 40, 22, 40); }
export function blanket(x, y, w) { rr(x, y - 150, w, 70, 30); ctx.fillStyle = '#4f7fd1'; ctx.fill(); ctx.fillStyle = 'rgba(255,255,255,.12)'; for (let i = 0; i < 4; i++) ctx.fillRect(x + 30 + i * (w / 4), y - 150, 18, 70); }
export function table(x, y, w = 360) { rr(x, y - 200, w, 22, 6); ctx.fillStyle = '#9b6b40'; ctx.fill(); ctx.fillStyle = '#7d5532'; ctx.fillRect(x + 16, y - 180, 18, 180); ctx.fillRect(x + w - 34, y - 180, 18, 180); }
export function stool(x, y) { rr(x - 50, y - 110, 100, 18, 6); ctx.fillStyle = '#7d5532'; ctx.fill(); ctx.fillRect(x - 40, y - 95, 12, 95); ctx.fillRect(x + 28, y - 95, 12, 95); }
export function lamp(x, y, on = 0) { ctx.fillStyle = '#2b2f3a'; rr(x - 40, y - 14, 80, 14, 6); ctx.fill(); ctx.strokeStyle = '#2b2f3a'; ctx.lineWidth = 10; ctx.beginPath(); ctx.moveTo(x, y - 14); ctx.lineTo(x - 30, y - 120); ctx.lineTo(x + 30, y - 160); ctx.stroke(); poly([[x + 6, y - 186], [x + 84, y - 150], [x + 60, y - 112]], '#ffb43f'); if (on > 0) glow(x + 70, y - 120, 520, `rgba(255,190,90,${0.45 * on})`); }
export function phone(x, y, s = 1, lit = 1, t = 0) { const bz = lit > 0.5 ? Math.sin(t * 70) * 3 : 0; ctx.save(); ctx.translate(x + bz, y); ctx.scale(s, s); rr(-34, -64, 68, 128, 12); ctx.fillStyle = '#111'; ctx.fill(); rr(-28, -56, 56, 108, 8); ctx.fillStyle = lit > 0 ? `rgba(120,190,255,${0.35 + 0.65 * lit})` : '#1c1f26'; ctx.fill(); ctx.restore(); if (lit > 0) glow(x, y, 380, `rgba(110,170,255,${0.5 * lit})`); }
const SUBJ = [['MATHS', '#e8573f'], ['SCIENCE', '#2f9e57'], ['SST', '#f0a030'], ['ENGLISH', '#4f7fd1'], ['HINDI', '#b05cc8'], ['IT', '#3cb7b0']];
/* stack of subject books; done = how many from the bottom are finished (green tick), rest get red "?" */
export function books(x, y, done = 0, a = 1, n = 6) { for (let i = 0; i < n; i++) { const [nm, col] = SUBJ[i % SUBJ.length], by = y - (i + 1) * 46, off = (i % 2 ? 10 : -8);
  rr(x - 120 + off, by, 240, 40, 6); ctx.fillStyle = col; ctx.fill(); ctx.fillStyle = 'rgba(255,255,255,.85)'; ctx.fillRect(x - 108 + off, by + 6, 6, 28); font(22, 800); ctx.fillStyle = '#fff'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(nm, x + off, by + 21);
  if (a > 0) withA(a, () => { const ok = i < done; circ(x + 150 + off, by + 20, 18, ok ? C.green : C.red); font(24, 900); ctx.fillStyle = '#fff'; ctx.fillText(ok ? '✓' : '?', x + 150 + off, by + 21); }); } }
/* wall calendar; pages = how many pages are flying off (0..1 progress), label = big date */
export function calendar(x, y, label, sub, tear = 0) { rr(x - 130, y - 20, 260, 300, 12); ctx.fillStyle = '#fff'; ctx.fill(); ctx.fillStyle = C.red; rr(x - 130, y - 20, 260, 70, [12, 12, 0, 0]); ctx.fill();
  font(36, 900); ctx.fillStyle = '#fff'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(sub, x, y + 16); font(130, 900); ctx.fillStyle = C.ink; ctx.fillText(label, x, y + 160);
  circ(x - 70, y - 20, 9, '#555'); circ(x + 70, y - 20, 9, '#555');
  for (let i = 0; i < 5; i++) { const p = clamp(tear * 5 - i); if (p <= 0 || p >= 1) continue; ctx.save(); ctx.translate(x + p * (240 + i * 60) * (i % 2 ? -1 : 1), y + 130 - p * 300 + p * p * 500); ctx.rotate(p * 3 * (i % 2 ? -1 : 1)); withA(1 - p, () => { rr(-120, -140, 240, 280, 8); ctx.fillStyle = '#fafafa'; ctx.fill(); ctx.strokeStyle = '#ddd'; ctx.lineWidth = 3; ctx.stroke(); }); ctx.restore(); } }
/* the date sheet paper (screen space), a = drop-in progress, ring = red marker circle progress */
export function datesheet(a, ring, t) { if (a <= 0) return; screen(() => { const y = lerp(-900, 300, eob(a)); ctx.save(); ctx.translate(W / 2, y + 380); ctx.rotate(-0.04);
  ctx.shadowColor = 'rgba(0,0,0,.45)'; ctx.shadowBlur = 40; rr(-380, -380, 760, 760, 14); ctx.fillStyle = '#fbf8f0'; ctx.fill(); ctx.shadowBlur = 0;
  font(40, 900); ctx.fillStyle = C.ink; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('BOARD EXAM', 0, -320); font(54, 900); ctx.fillStyle = C.red; ctx.fillText('DATE SHEET 2027', 0, -258);
  ctx.fillStyle = '#d8d2c4'; ctx.fillRect(-330, -210, 660, 4);
  for (let i = 0; i < 7; i++) { const ry = -150 + i * 80; font(i === 0 ? 46 : 34, 900); ctx.textAlign = 'left'; ctx.fillStyle = i === 0 ? C.ink : '#9a958a'; ctx.fillText(i === 0 ? '16 FEB' : `${16 + i * 3 > 28 ? 'MAR' : 'FEB'}`, -320, ry); rr(-110, ry - 12, 380 - (i * 37) % 120, 24, 12); ctx.fillStyle = i === 0 ? '#bfb7a6' : '#e3ddcf'; ctx.fill(); }
  if (ring > 0) { ctx.strokeStyle = C.red; ctx.lineWidth = 9; ctx.lineCap = 'round'; ctx.beginPath(); ctx.ellipse(-235, -150, 140, 60, -0.06, -1.9, -1.9 + 6.6 * eo(ring)); ctx.stroke(); }
  ctx.restore(); }); }
/* phone notification card (screen space) */
export function notif(a, y = 230) { if (a <= 0) return; screen(() => { const yy = lerp(-200, y, eob(a)); ctx.shadowColor = 'rgba(0,0,0,.5)'; ctx.shadowBlur = 30; rr(50, yy, 980, 210, 38); ctx.fillStyle = 'rgba(248,248,252,.97)'; ctx.fill(); ctx.shadowBlur = 0;
  rr(84, yy + 40, 130, 130, 28); ctx.fillStyle = C.red; ctx.fill(); font(30, 900); ctx.fillStyle = '#fff'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('2027', 149, yy + 106);
  ctx.textAlign = 'left'; font(28, 800); ctx.fillStyle = '#7a7d85'; ctx.fillText('BOARD ALERT  ·  abhi', 245, yy + 60); font(56, 900); ctx.fillStyle = C.ink; ctx.fillText('Date Sheet aa gayi!', 245, yy + 118); font(38, 800); ctx.fillStyle = C.red; ctx.fillText('Exams 16 Feb se shuru', 245, yy + 170); }); }
/* 99-day grid (screen space): planned cells blue, last 9 yellow */
export function dayGrid(x, y, fillBlue, fillYellow) { const cols = 11, sz = 52, gap = 8;
  for (let i = 0; i < 99; i++) { const cx = x + (i % cols) * (sz + gap), cy = y + Math.floor(i / cols) * (sz + gap); const last = i >= 90;
    const on = last ? clamp(fillYellow * 9 - (i - 90)) : clamp(fillBlue * 90 - i);
    rr(cx, cy, sz, sz, 10); ctx.fillStyle = '#e4ded0'; ctx.fill();
    if (on > 0) scaled(cx + sz / 2, cy + sz / 2, eob(on), () => { rr(cx, cy, sz, sz, 10); ctx.fillStyle = last ? C.yellow : C.blue; ctx.fill(); }); } }
