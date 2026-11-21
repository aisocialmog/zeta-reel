// SONU KE BOARDS · Ep 5 · Ek Seat (Zeta Galaxy notes page). Warm 2D folk look, light pass.
import { ctx, W, H, clamp, lerp, seg, eo, eio, eob, pop, font, rr, poly, withA, scaled, screen } from './core/lib.js';
import { L, Le, Wd } from './core/timing.js';
import * as K from './core/kit.js';
import * as N from './core/night.js';

const at = (w, i) => { try { return Wd(w, i); } catch { return L(i) + 0.3; } };
const rnd = (i) => { const x = Math.sin(i * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };
const SONU = { shirt: '#2f5f8a', pants: '#2a2a33', skin: '#b97850', hair: 'messy' }, GUD = { shirt: '#d9467a', pants: '#d9467a', skin: '#c08560', hair: 'pony' },
  MAA = { shirt: '#e8a317', pants: '#e8a317', skin: '#b97a55', hair: 'bun', bindi: true, dupatta: '#b3121b' }, PAPA = { shirt: '#5e6e7d', pants: '#3a3f47', skin: '#a8704c', mustache: true };
function rrp(x, y, w, h, r) { ctx.beginPath(); ctx.roundRect(x, y, w, h, r); }

function folkBorder(a = 1) { screen(() => withA(a, () => { ctx.fillStyle = 'rgba(120,20,10,.85)'; ctx.fillRect(0, 0, W, 26); ctx.fillRect(0, H - 26, W, 26);
  ctx.strokeStyle = '#f3c14a'; ctx.lineWidth = 3; for (let x = 20; x < W; x += 60) { ctx.beginPath(); ctx.arc(x, 13, 7, 0, 7); ctx.stroke(); ctx.beginPath(); ctx.arc(x, H - 13, 7, 0, 7); ctx.stroke(); } })); }

function ghat(t, o = {}) {
  const dawn = o.phase !== 'dusk', sky = ctx.createLinearGradient(0, -300, 0, 1150);
  if (dawn) { sky.addColorStop(0, '#2a2f5e'); sky.addColorStop(0.45, '#c9677a'); sky.addColorStop(0.75, '#f6a65a'); sky.addColorStop(1, '#ffd89a'); } else { sky.addColorStop(0, '#3a1e4a'); sky.addColorStop(0.5, '#d4553a'); sky.addColorStop(1, '#ffb347'); }
  ctx.fillStyle = sky; ctx.fillRect(-600, -600, W + 1200, 1800);
  const sy = lerp(1120, 860, o.sun ?? 0.6); N.glow(...N.toScreen(540, sy), 520, '255,200,120', 0.6); ctx.fillStyle = '#ffd35a'; ctx.beginPath(); ctx.arc(540, sy, 110, 0, 7); ctx.fill();
  for (let i = 0; i < 6; i++) { ctx.strokeStyle = 'rgba(60,30,40,.55)'; ctx.lineWidth = 3; const bx = 200 + i * 130 + Math.sin(t + i) * 10, by = 420 + (i % 3) * 40; ctx.beginPath(); ctx.moveTo(bx - 16, by); ctx.quadraticCurveTo(bx - 8, by - 8, bx, by); ctx.quadraticCurveTo(bx + 8, by - 8, bx + 16, by); ctx.stroke(); }
  ctx.fillStyle = '#3a2a3a'; for (let i = 0, x = -200; x < W + 200; i++) { const h = 30 + rnd(i) * 60; ctx.fillRect(x, 1100 - h, 70, h); x += 66; }
  const rv = ctx.createLinearGradient(0, 1100, 0, 1500); rv.addColorStop(0, dawn ? '#e79a6a' : '#c8603e'); rv.addColorStop(1, '#5a3a4a'); ctx.fillStyle = rv; ctx.fillRect(-600, 1100, W + 1200, 420);
  for (let k = 0; k < 14; k++) { const y = 1120 + k * 26, w = 200 - k * 8 + Math.sin(t * 2 + k) * 20; ctx.fillStyle = `rgba(255,220,140,${0.6 - k * 0.04})`; ctx.fillRect(540 - w / 2, y, w, 6); }
  for (let k = 0; k < 5; k++) { ctx.fillStyle = ['#8a6a55', '#7a5c49', '#6b4f3e', '#5c4335', '#4d382c'][k]; ctx.fillRect(-600, 1460 + k * 80, W + 1200, 82); }
  const kosi = (x, y) => { ctx.strokeStyle = '#3f7a32'; ctx.lineWidth = 9; for (let s = -2; s <= 2; s++) { ctx.beginPath(); ctx.moveTo(x + s * 40, y); ctx.lineTo(x, y - 260); ctx.stroke(); } ctx.fillStyle = '#c0392b'; ctx.beginPath(); ctx.moveTo(x - 70, y - 210); ctx.lineTo(x + 70, y - 210); ctx.lineTo(x, y - 280); ctx.fill(); for (let d = -1; d <= 1; d++) { ctx.fillStyle = '#7a3b1a'; ctx.beginPath(); ctx.ellipse(x + d * 40, y - 6, 16, 8, 0, 0, 7); ctx.fill(); ctx.fillStyle = '#ffcc4a'; ctx.beginPath(); ctx.ellipse(x + d * 40, y - 20 - Math.sin(t * 9 + d) * 2, 6, 11, 0, 0, 7); ctx.fill(); N.glow(...N.toScreen(x + d * 40, y - 20), 60, '255,180,80', 0.5); } };
  if (o.kosi !== false) { kosi(120, 1560); kosi(960, 1560); }
  if (o.soop) { ctx.save(); ctx.translate(o.soop[0], o.soop[1]); ctx.fillStyle = '#c9a25a'; ctx.beginPath(); ctx.moveTo(-90, 0); ctx.quadraticCurveTo(0, 60, 90, 0); ctx.lineTo(70, -30); ctx.lineTo(-70, -30); ctx.fill(); ['#f2d24a', '#e8572f', '#7aa83a', '#f29a2e'].forEach((c, k) => { ctx.fillStyle = c; ctx.beginPath(); ctx.arc(-45 + k * 30, -34, 16, 0, 7); ctx.fill(); }); ctx.restore(); }
}
function home(t, o = {}) {
  const wg = ctx.createLinearGradient(0, 0, 0, 1300); wg.addColorStop(0, o.night ? '#3a2a24' : '#c98a5a'); wg.addColorStop(1, o.night ? '#2a1d18' : '#a8683e'); ctx.fillStyle = wg; ctx.fillRect(-600, -600, W + 1200, 1900);
  withA(o.night ? 0.25 : 0.55, () => { ctx.strokeStyle = '#f3e3c3'; ctx.lineWidth = 5; for (let k = 0; k < 3; k++) { const cx = 200 + k * 340, cy = 420; ctx.beginPath(); ctx.arc(cx, cy, 46, 0, 7); ctx.stroke(); for (let r = 0; r < 12; r++) { const a = r / 12 * 6.28; ctx.beginPath(); ctx.moveTo(cx + Math.cos(a) * 54, cy + Math.sin(a) * 54); ctx.lineTo(cx + Math.cos(a) * 80, cy + Math.sin(a) * 80); ctx.stroke(); } } ctx.beginPath(); for (let x = 60; x < W; x += 40) { ctx.moveTo(x, 600); ctx.lineTo(x + 20, 580); ctx.lineTo(x + 40, 600); } ctx.stroke(); });
  ctx.fillStyle = o.night ? '#2c201a' : '#8a5a36'; ctx.fillRect(-600, 1250, W + 1200, 800); ctx.fillStyle = 'rgba(0,0,0,.2)'; ctx.fillRect(-600, 1250, W + 1200, 14);
  if (o.part === 'kitchen') { ctx.fillStyle = '#6b4a35'; rr(560, 1080, 320, 180, 30); ctx.fill(); ctx.fillStyle = '#1a1210'; rr(640, 1150, 160, 70, 20); ctx.fill(); const fl = 0.8 + 0.2 * Math.sin(t * 13); ctx.fillStyle = '#ff9a2a'; ctx.beginPath(); ctx.ellipse(720, 1170, 50 * fl, 28 * fl, 0, 0, 7); ctx.fill();
    ctx.fillStyle = '#4a4a50'; rr(630, 990, 180, 100, 20); ctx.fill(); ctx.fillStyle = '#e8892a'; ctx.beginPath(); ctx.ellipse(720, 995, 86, 18, 0, 0, 7); ctx.fill();
    for (let k = 0; k < 3; k++) { const st = (t * 0.5 + k / 3) % 1; withA(1 - st, () => { ctx.fillStyle = 'rgba(255,255,255,.35)'; ctx.beginPath(); ctx.arc(700 + k * 20, 960 - st * 140, 14 + st * 20, 0, 7); ctx.fill(); }); } }
  if (o.part === 'yard') { ctx.fillStyle = '#efe2c0'; ctx.fillRect(120, 1300, 840, 220); for (let i = 0; i < 260; i++) { ctx.fillStyle = '#c99a3a'; ctx.fillRect(140 + rnd(i) * 800, 1310 + rnd(i + 5) * 200, 6, 3); } }
  if (o.part === 'room') { ctx.fillStyle = '#5a3a24'; ctx.fillRect(560, 1040, 440, 22); ctx.fillRect(590, 1062, 20, 200); ctx.fillRect(960, 1062, 20, 200); const bc = ['#7a2b2b', '#2b4a7a', '#2b6a4a', '#8a6a2b']; for (let i = 0; i < 6; i++) { ctx.fillStyle = bc[i % 4]; ctx.fillRect(600 + i * 34, 960, 28, 80); } }
  if (o.diya) { ctx.fillStyle = '#7a3b1a'; ctx.beginPath(); ctx.ellipse(o.diya[0], o.diya[1], 22, 10, 0, 0, 7); ctx.fill(); ctx.fillStyle = '#ffcc4a'; ctx.beginPath(); ctx.ellipse(o.diya[0], o.diya[1] - 18 - Math.sin(t * 9) * 2, 7, 13, 0, 0, 7); ctx.fill(); }
}
function train(t) {
  ctx.fillStyle = '#1c2228'; ctx.fillRect(-600, -600, W + 1200, 2600); ctx.fillStyle = '#2c353d'; ctx.fillRect(-600, 300, W + 1200, 40); ctx.fillStyle = '#8a8f95'; ctx.fillRect(-600, 330, W + 1200, 8);
  for (let k = 0; k < 3; k++) { const x = 60 + k * 340; rr(x, 520, 260, 300, 20); ctx.fillStyle = '#0a0d12'; ctx.fill(); for (let s = 0; s < 6; s++) { const lx = ((t * 900 + s * 170 + k * 60) % 400) - 60; ctx.fillStyle = 'rgba(255,200,120,.8)'; ctx.fillRect(x + lx, 600 + (s % 3) * 60, 24, 6); } }
  for (let p = 0; p < 7; p++) { const x = -60 + p * 170 + rnd(p) * 40; ctx.fillStyle = '#0d1014'; rr(x - 45, 860, 90, 520, 40); ctx.fill(); ctx.beginPath(); ctx.ellipse(x, 820, 42, 50, 0, 0, 7); ctx.fill(); }
}
function phoneFrame(cx, cy, k, draw) { const w = 640, h = 1300, x = cx - w / 2, y = cy - h / 2; ctx.save(); ctx.translate(cx, cy); ctx.scale(k, k); ctx.translate(-cx, -cy);
  ctx.shadowColor = 'rgba(255,190,110,.5)'; ctx.shadowBlur = 80; rrp(x, y, w, h, 70); ctx.fillStyle = '#060506'; ctx.fill(); ctx.shadowBlur = 0; ctx.save(); rrp(x + 22, y + 22, w - 44, h - 44, 52); ctx.clip(); draw(x + 22, y + 22, w - 44, h - 44); ctx.restore(); ctx.restore(); }
function uiPlanChhath(x, y, w, k) { ctx.fillStyle = '#0d0b1f'; ctx.fillRect(x, y, w, 2000); const g = ctx.createLinearGradient(x, y, x + w, y + 260); g.addColorStop(0, '#3b1d7a'); g.addColorStop(1, '#1a1240'); ctx.fillStyle = g; ctx.fillRect(x, y, w, 270);
  rrp(x + 36, y + 70, 64, 64, 18); ctx.fillStyle = '#ff4fa0'; ctx.fill(); font(42, 900); ctx.fillStyle = '#fff'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('Z', x + 68, y + 104); ctx.textAlign = 'left'; font(34, 800); ctx.fillText('ZetaGalaxy', x + 116, y + 104);
  font(48, 900); ctx.fillText('My Exam Plan', x + 36, y + 190); font(26, 800); ctx.fillStyle = '#c9b8ff'; ctx.fillText('Pre-board test · 5 days', x + 36, y + 236);
  const days = [['Fri', 'Nahay Khay'], ['Sat', 'Kharna'], ['Sun', 'Sandhya Arghya'], ['Mon', 'Usha Arghya'], ['Tue', 'TEST']];
  days.forEach(([d, n], i) => { const yy = y + 310 + i * 130, a = clamp(k * 3 - i * 0.4); withA(0.3 + 0.7 * a, () => { rrp(x + 36, yy, w - 72, 112, 22); ctx.fillStyle = i < 4 ? '#3a2410' : '#3a0d14'; ctx.fill(); font(30, 900); ctx.fillStyle = '#ffd43b'; ctx.fillText(d, x + 66, yy + 40); font(30, 800); ctx.fillStyle = '#fff'; ctx.fillText(i < 4 ? '🪔 ' + n : '📝 ' + n, x + 150, yy + 40); font(26, 800); ctx.fillStyle = i < 4 ? '#4fd1a5' : '#ff8a8a'; ctx.fillText(i < 4 ? '30 min mission' : 'full revision', x + 150, yy + 82); }); });
  if (k > 0.7) withA(clamp((k - 0.7) * 4), () => { rrp(x + 36, y + 980, w - 72, 110, 26); ctx.fillStyle = '#4fd1a5'; ctx.fill(); font(36, 900); ctx.fillStyle = '#0d1a14'; ctx.fillText('✓ Plan adjusted', x + 70, y + 1040); }); }

function uiNotesLight(x, y, w, k) { ctx.fillStyle = '#0d0b1f'; ctx.fillRect(x, y, w, 2000); const g = ctx.createLinearGradient(x, y, x + w, y + 260); g.addColorStop(0, '#3b1d7a'); g.addColorStop(1, '#1a1240'); ctx.fillStyle = g; ctx.fillRect(x, y, w, 270);
  rrp(x + 36, y + 70, 64, 64, 18); ctx.fillStyle = '#ff4fa0'; ctx.fill(); font(42, 900); ctx.fillStyle = '#fff'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('Z', x + 68, y + 104); ctx.textAlign = 'left'; font(34, 800); ctx.fillText('ZetaGalaxy', x + 116, y + 104);
  font(46, 900); ctx.fillText('Revision Notes', x + 36, y + 190); font(26, 800); ctx.fillStyle = '#c9b8ff'; ctx.fillText('Science · Light (Reflection & Refraction)', x + 36, y + 236);
  rrp(x + 30, y + 300, w - 60, 820, 26); ctx.fillStyle = '#f6f1e3'; ctx.fill();
  [['Mirror', '1/v + 1/u = 1/f', '#b3121b'], ['Lens', '1/v − 1/u = 1/f', '#2b4a9a'], ['Mirror m', 'm = −v/u', '#b3121b'], ['Lens m', 'm = v/u', '#2b4a9a'], ['Refractive index', 'n = c/v', '#2f6f3a'], ['Power', 'P = 1/f (metre)', '#8a5a10']].forEach(([a, b, c], i) => { const on = clamp(k * 3 - i * 0.35); withA(0.15 + 0.85 * on, () => { const yy = y + 360 + i * 125; font(26, 900); ctx.fillStyle = c; ctx.fillText(a.toUpperCase(), x + 66, yy); font(42, 900); ctx.fillStyle = '#1a1a2a'; ctx.fillText(b, x + 66, yy + 50); }); });
  if (k > 0.75) withA(clamp((k - 0.75) * 4), () => { rrp(x + 36, y + 1140, w - 72, 90, 24); ctx.fillStyle = '#4fd1a5'; ctx.fill(); font(34, 900); ctx.fillStyle = '#0d1a14'; ctx.fillText('✓ 1 page · poora chapter', x + 66, y + 1186); }); }
function bigDiya(cx, cy, s, t) { ctx.save(); ctx.translate(cx, cy); ctx.scale(s, s); N.glow(...N.toScreen(0, -40), 260 * s, '255,170,60', 0.7); ctx.fillStyle = '#8a3b16'; ctx.beginPath(); ctx.moveTo(-110, -10); ctx.quadraticCurveTo(0, 90, 110, -10); ctx.quadraticCurveTo(0, 10, -110, -10); ctx.fill(); ctx.fillStyle = '#b8562a'; ctx.beginPath(); ctx.ellipse(0, -10, 110, 22, 0, 0, 7); ctx.fill();
  const f = 1 + 0.08 * Math.sin(t * 11); ctx.fillStyle = '#ffb02e'; ctx.beginPath(); ctx.ellipse(60, -60 * f, 20, 46 * f, 0.2, 0, 7); ctx.fill(); ctx.fillStyle = '#fff1b0'; ctx.beginPath(); ctx.ellipse(60, -50 * f, 9, 22 * f, 0.2, 0, 7); ctx.fill(); ctx.restore(); }
function station(t) { ctx.fillStyle = '#1a1416'; ctx.fillRect(-600, -600, W + 1200, 2600); rr(140, 420, 800, 520, 20); ctx.fillStyle = '#0b0b0c'; ctx.fill(); font(40, 900); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = '#ffd43b'; ctx.fillText('PATNA JN · ARRIVALS', 540, 490);
  [['12394', 'DELHI → PATNA', 'LATE 4H'], ['13202', 'LTT → PATNA', 'ON TIME'], ['12310', 'RAJDHANI', 'ON TIME']].forEach(([n, a, b], i) => { const yy = 600 + i * 110; font(34, 900); ctx.fillStyle = '#ffb02e'; ctx.textAlign = 'left'; ctx.fillText(n, 180, yy); ctx.fillText(a, 330, yy); ctx.textAlign = 'right'; ctx.fillStyle = i === 0 ? (Math.sin(t * 8) > 0 ? '#ff4a3a' : '#7a1d1d') : '#4fd1a5'; ctx.fillText(b, 900, yy); });
  ctx.fillStyle = '#2a2224'; ctx.fillRect(-600, 1200, W + 1200, 900); }

/* ---------- Sonu ke Boards Ep 1 ---------- */
function yard(t) {   // sunny courtyard: mud wall, tulsi, clothesline
  const sky = ctx.createLinearGradient(0, -300, 0, 900); sky.addColorStop(0, '#7fb6e6'); sky.addColorStop(1, '#f6dca6'); ctx.fillStyle = sky; ctx.fillRect(-600, -600, W + 1200, 1600);
  ctx.fillStyle = '#c98a5a'; ctx.fillRect(-600, 700, W + 1200, 600); ctx.fillStyle = '#a8683e'; ctx.fillRect(-600, 700, W + 1200, 18);
  withA(0.5, () => { ctx.strokeStyle = '#f3e3c3'; ctx.lineWidth = 5; ctx.beginPath(); for (let x = -40; x < W + 40; x += 40) { ctx.moveTo(x, 900); ctx.lineTo(x + 20, 880); ctx.lineTo(x + 40, 900); } ctx.stroke(); });
  ctx.strokeStyle = '#3a2a1a'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(-100, 560); ctx.quadraticCurveTo(540, 640, W + 100, 560); ctx.stroke(); ['#d9467a', '#2f5f8a', '#e8a317'].forEach((c, k) => { ctx.fillStyle = c; rr(220 + k * 260, 595 - (k === 1 ? 8 : 0), 120, 150, 8); ctx.fill(); });
  ctx.fillStyle = '#8a5a36'; ctx.fillRect(-600, 1250, W + 1200, 800); ctx.fillStyle = '#efe2c0'; ctx.fillRect(-600, 1250, W + 1200, 12);
  ctx.fillStyle = '#b3532a'; rr(820, 1080, 140, 170, 12); ctx.fill(); ctx.fillStyle = '#3f7a32'; for (let k = 0; k < 9; k++) { ctx.beginPath(); ctx.ellipse(890 + Math.cos(k) * 50, 1040 - k * 14, 26, 12, k, 0, 7); ctx.fill(); }
}
function page(x, y, s, rot, o = {}) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); ctx.shadowColor = 'rgba(0,0,0,.3)'; ctx.shadowBlur = 20; ctx.fillStyle = '#fbf6e8'; ctx.fillRect(-90, -120, 180, 240); ctx.shadowBlur = 0;
  ctx.fillStyle = 'rgba(80,120,200,.35)'; for (let k = 0; k < 8; k++) ctx.fillRect(-75, -90 + k * 28, 150, 2); ctx.fillStyle = 'rgba(40,40,90,.6)'; for (let k = 0; k < 6; k++) ctx.fillRect(-70, -84 + k * 28, 60 + rnd(k + (o.seed || 0)) * 80, 6); ctx.restore(); }
function messyCopy(t, k) {   // open notebook: torn edges + Gudiya's elephant doodle over Carbon notes
  ctx.fillStyle = '#3a2618'; ctx.fillRect(0, 0, W, H); ctx.save(); ctx.translate(540, 820); ctx.rotate(-0.03);
  ctx.fillStyle = '#efe6cf'; ctx.fillRect(-440, -420, 430, 840); ctx.fillRect(10, -420, 430, 840); ctx.fillStyle = 'rgba(0,0,0,.25)'; ctx.fillRect(-12, -420, 24, 840);
  ctx.fillStyle = 'rgba(80,120,200,.3)'; for (let r = 0; r < 13; r++) { ctx.fillRect(-420, -330 + r * 60, 390, 2); ctx.fillRect(30, -330 + r * 60, 390, 2); }
  font(34, 900); ctx.fillStyle = '#1a1a2a'; ctx.textAlign = 'left'; ctx.textBaseline = 'middle'; ctx.fillText('CARBON & ITS', -410, -380); ctx.fillText('COMPOUNDS', -410, -340);
  font(26, 700); ctx.fillStyle = '#2b3a7a'; ['valency = 4', 'covalent bond =', '   electrons share', 'CH₄ methane', 'saturated / unsat..'].forEach((s, r) => ctx.fillText(s, -400, -270 + r * 60));
  // torn stubs on right page
  ctx.fillStyle = '#3a2618'; ctx.beginPath(); ctx.moveTo(30, -420); for (let y = -420; y < 420; y += 30) ctx.lineTo(30 + (y / 30 % 2 ? 40 : 14), y); ctx.lineTo(440, 420); ctx.lineTo(440, -420); ctx.fill();
  ctx.fillStyle = '#efe6cf'; ctx.beginPath(); ctx.moveTo(30, -420); for (let y = -420; y < 420; y += 30) ctx.lineTo(30 + (y / 30 % 2 ? 40 : 14), y); ctx.lineTo(30, 420); ctx.fill();
  if (k > 0) withA(clamp(k * 2), () => { ctx.save(); ctx.translate(-220, 160); ctx.strokeStyle = '#d9467a'; ctx.lineWidth = 9; ctx.lineCap = 'round'; ctx.beginPath(); ctx.ellipse(0, 0, 140, 90, 0, 0, 7); ctx.stroke(); ctx.beginPath(); ctx.arc(-150, -30, 55, 0, 7); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(-195, 0); ctx.quadraticCurveTo(-240, 80, -200, 130); ctx.stroke(); for (const lx of [-90, -30, 40, 100]) { ctx.beginPath(); ctx.moveTo(lx, 80); ctx.lineTo(lx, 150); ctx.stroke(); } ctx.fillStyle = '#d9467a'; ctx.beginPath(); ctx.arc(-160, -45, 8, 0, 7); ctx.fill();
    font(40, 900); ctx.fillStyle = '#d9467a'; ctx.textAlign = 'center'; ctx.fillText('CARBON 🐘', 0, -140); ctx.restore(); });
  ctx.restore(); }
function uiNotesCarbon(x, y, w, k) { ctx.fillStyle = '#0d0b1f'; ctx.fillRect(x, y, w, 2000); const g = ctx.createLinearGradient(x, y, x + w, y + 260); g.addColorStop(0, '#3b1d7a'); g.addColorStop(1, '#1a1240'); ctx.fillStyle = g; ctx.fillRect(x, y, w, 270);
  rrp(x + 36, y + 70, 64, 64, 18); ctx.fillStyle = '#ff4fa0'; ctx.fill(); font(42, 900); ctx.fillStyle = '#fff'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('Z', x + 68, y + 104); ctx.textAlign = 'left'; font(34, 800); ctx.fillText('ZetaGalaxy', x + 116, y + 104);
  font(46, 900); ctx.fillText('Revision Notes', x + 36, y + 190); font(26, 800); ctx.fillStyle = '#c9b8ff'; ctx.fillText('Science · Carbon & its Compounds', x + 36, y + 236);
  rrp(x + 30, y + 300, w - 60, 820, 26); ctx.fillStyle = '#f6f1e3'; ctx.fill();
  [['Valency', 'Carbon = 4 bonds', '#b3121b'], ['Covalent bond', 'electrons SHARE', '#2b4a9a'], ['Saturated', 'single bonds · CH₄', '#2f6f3a'], ['Unsaturated', 'double/triple · C₂H₄', '#8a5a10'], ['Functional group', '-OH alcohol · -COOH acid', '#b3121b'], ['Homologous series', 'har step + CH₂', '#2b4a9a']].forEach(([a, b, c], i) => { const on = clamp(k * 3 - i * 0.35); withA(0.15 + 0.85 * on, () => { const yy = y + 360 + i * 125; font(26, 900); ctx.fillStyle = c; ctx.fillText(a.toUpperCase(), x + 66, yy); font(38, 900); ctx.fillStyle = '#1a1a2a'; ctx.fillText(b, x + 66, yy + 50); }); });
  if (k > 0.75) withA(clamp((k - 0.75) * 4), () => { rrp(x + 36, y + 1140, w - 72, 90, 24); ctx.fillStyle = '#4fd1a5'; ctx.fill(); font(34, 900); ctx.fillStyle = '#0d1a14'; ctx.fillText('✓ chhota · saaf · ek jagah', x + 66, y + 1186); }); }
function tipCard(t, k1, k2) { ctx.fillStyle = '#f2ecdc'; ctx.fillRect(0, 0, W, H); ctx.strokeStyle = 'rgba(80,120,200,.25)'; ctx.lineWidth = 2; for (let y = 300; y < 1300; y += 56) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; font(50, 900); ctx.fillStyle = '#b3121b'; ctx.fillText('❌ poora chapter copy', 540, 400); ctx.strokeStyle = '#b3121b'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(250, 400); ctx.lineTo(830, 400); ctx.stroke();
  withA(k1, () => { rr(150, 500, 780, 300, 26); ctx.fillStyle = 'rgba(47,158,87,.14)'; ctx.fill(); font(46, 900); ctx.fillStyle = '#2f9e57'; ctx.fillText('✅ har topic = 1 line', 540, 570); font(40, 800); ctx.fillStyle = '#1a1a2a'; ctx.fillText('Covalent = electrons share', 540, 650); ctx.fillText('Saturated = sirf single bond', 540, 720); });
  withA(k2, () => { rr(150, 850, 780, 220, 26); ctx.fillStyle = 'rgba(58,111,216,.14)'; ctx.fill(); font(46, 900); ctx.fillStyle = '#3a6fd8'; ctx.fillText('+ 1 example', 540, 920); font(56, 900); ctx.fillStyle = '#1a1a2a'; ctx.fillText('CH₄ · C₂H₄ · C₂H₅OH', 540, 1000); }); }
function roofDawn(t) { const sky = ctx.createLinearGradient(0, -300, 0, 1100); sky.addColorStop(0, '#5a6fae'); sky.addColorStop(0.6, '#f0a37a'); sky.addColorStop(1, '#ffd89a'); ctx.fillStyle = sky; ctx.fillRect(-600, -600, W + 1200, 1800);
  N.glow(...N.toScreen(820, 820), 400, '255,200,120', 0.5); ctx.fillStyle = '#ffd35a'; ctx.beginPath(); ctx.arc(820, 860, 80, 0, 7); ctx.fill();
  ctx.fillStyle = '#6a4a3a'; ctx.fillRect(-600, 900, W + 1200, 1100); ctx.fillStyle = '#7a5644'; ctx.fillRect(-600, 900, W + 1200, 30); ctx.fillStyle = '#5a3d30'; ctx.fillRect(560, 700, 600, 220); ctx.fillStyle = '#7a5644'; ctx.fillRect(560, 690, 600, 20);
  ctx.fillStyle = '#3a6fa8'; rr(980, 560, 110, 140, 10); ctx.fill(); }

/* ---------- Sonu ke Boards Ep 2 ---------- */
const PINK = { shirt: '#7a3fa8', pants: '#3a2a4a', skin: '#c08560', hair: 'pony' };
const RAIN = ['#e0322a', '#f08a24', '#f3c14a', '#2f9e57', '#3a6fd8', '#5a3fa8', '#d9467a'];
function notesStack(x, y, s, k) { if (k <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(s * k, s * k); RAIN.forEach((c, i) => { ctx.fillStyle = c; rr(-90 + i * 4, -120 - i * 14, 180, 230, 10); ctx.fill(); ctx.fillStyle = 'rgba(255,255,255,.5)'; ctx.fillRect(-70 + i * 4, -90 - i * 14, 100, 8); }); ctx.restore(); }
function swipes(t, t0) {   // 7 highlighter strokes slash across the screen
  RAIN.forEach((c, i) => { const p = eo(clamp((t - t0 - i * 0.07) / 0.35)); if (p <= 0) return; ctx.save(); ctx.translate(-120, 380 + i * 120); ctx.rotate(-0.12); ctx.globalAlpha = 0.82; ctx.fillStyle = c; rrp(0, -40, (W + 300) * p, 80, 40); ctx.fill(); ctx.restore(); }); }
function uiMnemo(x, y, w, k) { ctx.fillStyle = '#0d0b1f'; ctx.fillRect(x, y, w, 2000); const g = ctx.createLinearGradient(x, y, x + w, y + 260); g.addColorStop(0, '#3b1d7a'); g.addColorStop(1, '#1a1240'); ctx.fillStyle = g; ctx.fillRect(x, y, w, 270);
  rrp(x + 36, y + 70, 64, 64, 18); ctx.fillStyle = '#ff4fa0'; ctx.fill(); font(42, 900); ctx.fillStyle = '#fff'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('Z', x + 68, y + 104); ctx.textAlign = 'left'; font(34, 800); ctx.fillText('ZetaGalaxy', x + 116, y + 104);
  font(44, 900); ctx.fillText('Mnemonic Generator', x + 36, y + 190); font(26, 800); ctx.fillStyle = '#c9b8ff'; ctx.fillText('Science · Carbon compounds', x + 36, y + 236);
  rrp(x + 30, y + 300, w - 60, 130, 24); ctx.fillStyle = '#1d1838'; ctx.fill(); font(26, 800); ctx.fillStyle = '#9c95c9'; ctx.fillText('Yaad karna hai:', x + 60, y + 340); font(36, 900); ctx.fillStyle = '#fff'; ctx.fillText('Meth · Eth · Prop · But', x + 60, y + 392);
  const rows = [['M', 'Meri', 'Methane · 1C', '#e0322a'], ['E', 'Ek', 'Ethane · 2C', '#f08a24'], ['P', 'Pyaari', 'Propane · 3C', '#2f9e57'], ['B', 'Behen', 'Butane · 4C', '#d9467a']];
  rows.forEach(([a, b, c, col], i) => { const on = clamp(k * 3 - 0.5 - i * 0.35); withA(0.1 + 0.9 * on, () => { const yy = y + 480 + i * 140; rrp(x + 30, yy, w - 60, 120, 24); ctx.fillStyle = '#f6f1e3'; ctx.fill(); font(64, 900); ctx.fillStyle = col; ctx.fillText(a, x + 60, yy + 62); font(40, 900); ctx.fillStyle = '#1a1a2a'; ctx.fillText(b, x + 130, yy + 46); font(28, 800); ctx.fillStyle = '#5a5a6a'; ctx.fillText(c, x + 130, yy + 90); }); });
  if (k > 0.8) withA(clamp((k - 0.8) * 5), () => { rrp(x + 36, y + 1060, w - 72, 90, 24); ctx.fillStyle = '#4fd1a5'; ctx.fill(); font(34, 900); ctx.fillStyle = '#0d1a14'; ctx.fillText('✓ Meri Ek Pyaari Behen 💗', x + 66, y + 1106); }); }
function slate(t, k) { ctx.fillStyle = '#5a3a24'; ctx.fillRect(0, 0, W, H); ctx.save(); ctx.translate(540, 760); ctx.rotate(-0.03); ctx.fillStyle = '#8a5a30'; rr(-400, -330, 800, 660, 30); ctx.fill(); ctx.fillStyle = '#1f2a24'; rr(-370, -300, 740, 600, 20); ctx.fill();
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; font(46, 900); ctx.fillStyle = '#f3c14a'; ctx.fillText('GUDIYA KA MUKABLA 🏆', 0, -230); font(40, 800); ctx.fillStyle = 'rgba(240,240,230,.9)'; ctx.fillText('SONU  0   ·   PINKY  0', 0, -150);
  font(84, 900); ['1C', '2C', '3C', '4C'].forEach((s, i) => withA(clamp(k * 4 - i), () => { ctx.fillStyle = 'rgba(240,240,230,.95)'; ctx.fillText(s, -270 + i * 180, 0); ctx.fillStyle = '#ff8a8a'; font(70, 900); ctx.fillText('?', -270 + i * 180, 120); font(84, 900); })); ctx.restore(); }

/* ---------- Sonu ke Boards Ep 3 ---------- */
function qPaper(cx, cy, s, rot, o = {}) { ctx.save(); ctx.translate(cx, cy); ctx.rotate(rot); ctx.scale(s, s); ctx.shadowColor = 'rgba(0,0,0,.45)'; ctx.shadowBlur = 40; ctx.fillStyle = '#fbf7ea'; ctx.fillRect(-300, -400, 600, 800); ctx.shadowBlur = 0;
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; font(30, 900); ctx.fillStyle = '#1a1a2a'; ctx.fillText('PRE-BOARD TEST · SCIENCE', 0, -340); font(24, 800); ctx.fillStyle = '#5a5a6a'; ctx.fillText('Time: 3 hrs · M.M. 80', 0, -296); ctx.fillStyle = '#1a1a2a'; ctx.fillRect(-260, -270, 520, 3);
  ctx.textAlign = 'left'; font(26, 700); ctx.fillStyle = '#2a2a3a'; (o.qs || ['Q1. What is a covalent bond?', 'Q2. Mirror formula likho.', 'Q3. Saturated vs unsaturated', 'Q4. Power of a lens = ?', 'Q5. Butane ka formula?', 'Q6. Homologous series...']).forEach((q, i) => { ctx.fillStyle = i === (o.hl ?? -1) ? '#b3121b' : '#2a2a3a'; ctx.fillText(q, -260, -220 + i * 90); });
  if (o.ans) { font(46, 900); ctx.fillStyle = '#2b4a9a'; ctx.fillText('C₄H₁₀ ✓', 60, -220 + 4 * 90 + 50); } ctx.restore(); }
function autoRick(t, o = {}) {   // inside a shared auto, morning road whizzing past
  const sky = ctx.createLinearGradient(0, -300, 0, 1200); sky.addColorStop(0, '#9fc8ee'); sky.addColorStop(1, '#f6e2b0'); ctx.fillStyle = sky; ctx.fillRect(-600, -600, W + 1200, 1800);
  for (let k = 0; k < 6; k++) { const x = ((k * 320 - t * 700) % 1900 + 1900) % 1900 - 400; ctx.fillStyle = ['#c98a5a', '#b9774a', '#d8a06a'][k % 3]; ctx.fillRect(x, 640 - (k % 2) * 80, 260, 600); ctx.fillStyle = '#5a7a3a'; ctx.beginPath(); ctx.arc(x + 300, 700, 90, 0, 7); ctx.fill(); }
  ctx.fillStyle = '#6a6a6a'; ctx.fillRect(-600, 1150, W + 1200, 300);
  // auto frame: yellow canopy, green body, black bars
  ctx.fillStyle = '#1a1a1a'; ctx.fillRect(-600, -600, W + 1200, 520); ctx.fillStyle = '#e8c21a'; ctx.fillRect(-600, -100, W + 1200, 140); ctx.fillStyle = '#2f7a3a'; ctx.fillRect(-600, 1220, W + 1200, 900);
  ctx.fillStyle = '#111'; ctx.fillRect(40, -100, 26, 1400); ctx.fillRect(1014, -100, 26, 1400); ctx.fillStyle = '#3a2a2a'; rr(80, 1180, 920, 120, 20); ctx.fill();
}
function examHall(t, o = {}) {   // rows of desks, wall clock, board
  const wg = ctx.createLinearGradient(0, 0, 0, 1300); wg.addColorStop(0, '#e3d6b8'); wg.addColorStop(1, '#cbb88f'); ctx.fillStyle = wg; ctx.fillRect(-600, -600, W + 1200, 1900);
  ctx.fillStyle = '#3a4a3a'; ctx.fillRect(220, 330, 640, 260); font(40, 900); ctx.fillStyle = 'rgba(240,240,230,.9)'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('PRE-BOARD · SCIENCE', 540, 420); font(32, 800); ctx.fillText('10:00 – 1:00', 540, 490);
  const cx = 930, cy = 420; ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(cx, cy, 70, 0, 7); ctx.fill(); ctx.strokeStyle = '#3a2a1a'; ctx.lineWidth = 8; ctx.stroke(); const m = (o.min ?? 0) + t * 0.5;
  ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + Math.sin(m / 60 * 6.28) * 50, cy - Math.cos(m / 60 * 6.28) * 50); ctx.stroke(); ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + Math.sin((o.hr ?? 10) / 12 * 6.28) * 32, cy - Math.cos((o.hr ?? 10) / 12 * 6.28) * 32); ctx.stroke();
  ctx.fillStyle = '#8a6a48'; ctx.fillRect(-600, 1240, W + 1200, 800);
  for (let r = 0; r < 2; r++) for (let c = 0; c < 4; c++) { const x = 60 + c * 270, y = 1000 + r * 0; if (r) continue; ctx.fillStyle = '#6a4a2a'; ctx.fillRect(x, 1080, 220, 22); ctx.fillRect(x + 10, 1102, 16, 140); ctx.fillRect(x + 194, 1102, 16, 140); }
}
function videoCall(x, y, w, k, t) { ctx.fillStyle = '#1a1a1a'; ctx.fillRect(x, y, w, 2000);
  // Papa big (in Delhi, construction-site office background)
  ctx.fillStyle = '#3a4a5a'; ctx.fillRect(x, y, w, 1260); ctx.fillStyle = '#5a6a7a'; for (let i = 0; i < 5; i++) ctx.fillRect(x + 20 + i * 120, y + 300, 90, 400);
  N.person(x + w / 2, y + 1260, 1.6, { ...PAPA, mood: k > 0.5 ? 'happy' : 'ok', look: 0 });
  font(30, 900); ctx.fillStyle = '#fff'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('Papa · Delhi', x + w / 2, y + 60); font(24, 800); ctx.fillStyle = '#4fd1a5'; ctx.fillText('● 00:' + String(Math.floor(10 + t) % 60).padStart(2, '0'), x + w / 2, y + 100);
  rrp(x + w - 190, y + 140, 160, 220, 18); ctx.fillStyle = '#c98a5a'; ctx.fill(); ctx.save(); ctx.beginPath(); ctx.roundRect(x + w - 190, y + 140, 160, 220, 18); ctx.clip(); N.person(x + w - 110, y + 420, 0.6, { ...SONU, mood: 'happy', look: 0 }); ctx.restore(); }
function stepsSet(t) {   // school steps, noon
  const sky = ctx.createLinearGradient(0, -300, 0, 900); sky.addColorStop(0, '#8fb8e0'); sky.addColorStop(1, '#f4dfb0'); ctx.fillStyle = sky; ctx.fillRect(-600, -600, W + 1200, 1600);
  ctx.fillStyle = '#cbb990'; ctx.fillRect(-600, 1080, W + 1200, 400); ctx.fillStyle = '#d8c7a0'; ctx.fillRect(80, 380, 920, 760); ctx.fillStyle = '#b3532a'; ctx.fillRect(60, 340, 960, 60); font(42, 900); ctx.fillStyle = '#fff'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('GOVT. HIGH SCHOOL', 540, 372);
  for (let c = 0; c < 4; c++) { ctx.fillStyle = '#5a7a9a'; rr(140 + c * 220, 470, 150, 180, 8); ctx.fill(); } ctx.fillStyle = '#4a3020'; rr(430, 760, 220, 380, 10); ctx.fill();
  for (let k = 0; k < 5; k++) { ctx.fillStyle = ['#bfb39a', '#b3a78e', '#a89c84', '#9c907a', '#90856f'][k]; ctx.fillRect(200 - k * 50, 1140 + k * 50, 680 + k * 100, 52); } ctx.fillStyle = '#7a6a50'; ctx.fillRect(-600, 1390, W + 1200, 700); }
function pageStack(x, y, s, n, t, fly) { for (let i = 0; i < n; i++) { const p = fly ? clamp((t * 3 - i * 0.12) % 1) : 0; page(x + (fly ? Math.sin(i) * 40 * p : i * 2), y - i * 3 - (fly ? p * 60 : 0), s, (rnd(i) - 0.5) * 0.15 + (fly ? p * 0.6 : 0), { seed: i }); } }

/* ---------- Sonu ke Boards Ep 4 ---------- */
const MJ = { shirt: '#e8e2cf', pants: '#4a4a4a', skin: '#a8704c', hair: 'short', hairC: '#8a8a8a', glasses: true, mustache: true };
function notesPage(t, o = {}) {   // close-up of Pinky's colour-coded notebook page
  ctx.fillStyle = '#fbf6e8'; ctx.fillRect(0, 0, W, H); ctx.strokeStyle = 'rgba(80,120,200,.25)'; ctx.lineWidth = 2; for (let y = 260; y < 1500; y += 60) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
  ctx.strokeStyle = 'rgba(220,60,60,.4)'; ctx.beginPath(); ctx.moveTo(150, 0); ctx.lineTo(150, H); ctx.stroke();
  for (let r = 0; r < 18; r++) { const y = 300 + r * 60; ctx.fillStyle = RAIN[r % 7]; withA(0.85, () => { rr(190, y - 16, 300 + rnd(r) * 420, 22, 10); ctx.fill(); }); }
  font(44, 900); ctx.fillStyle = '#1a1a2a'; ctx.textAlign = 'left'; ctx.textBaseline = 'middle'; ctx.fillText('Carbon · Page 27 / 40', 190, 220); }
function tearHook(t) { const td = 0.55; notesPage(t);
  if (t < td) { const y = lerp(-80, 760, (t / td) ** 2); ctx.fillStyle = 'rgba(150,200,255,.9)'; ctx.beginPath(); ctx.moveTo(560, y - 70); ctx.quadraticCurveTo(600, y + 10, 560, y + 30); ctx.quadraticCurveTo(520, y + 10, 560, y - 70); ctx.fill(); }
  else { const k = eo(clamp((t - td) / 1.4)); const g = ctx.createRadialGradient(560, 780, 0, 560, 780, 60 + 230 * k); g.addColorStop(0, 'rgba(40,60,140,.55)'); g.addColorStop(0.7, 'rgba(90,63,168,.35)'); g.addColorStop(1, 'rgba(90,63,168,0)'); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(560, 780, 60 + 230 * k, 0, 7); ctx.fill();
    for (let r = 0; r < 3; r++) { const rr2 = 40 + ((t - td) * 260 + r * 80) % 300; withA(clamp(1 - rr2 / 300) * 0.5, () => { ctx.strokeStyle = 'rgba(60,80,160,1)'; ctx.lineWidth = 4; ctx.beginPath(); ctx.ellipse(560, 780, rr2, rr2 * 0.6, 0, 0, 7); ctx.stroke(); }); } } }
function uiPhotoNotes(x, y, w, k) { ctx.fillStyle = '#0d0b1f'; ctx.fillRect(x, y, w, 2000); const g = ctx.createLinearGradient(x, y, x + w, y + 260); g.addColorStop(0, '#3b1d7a'); g.addColorStop(1, '#1a1240'); ctx.fillStyle = g; ctx.fillRect(x, y, w, 270);
  rrp(x + 36, y + 70, 64, 64, 18); ctx.fillStyle = '#ff4fa0'; ctx.fill(); font(42, 900); ctx.fillStyle = '#fff'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('Z', x + 68, y + 104); ctx.textAlign = 'left'; font(34, 800); ctx.fillText('ZetaGalaxy', x + 116, y + 104);
  font(46, 900); ctx.fillText('Photo → Notes', x + 36, y + 190); font(26, 800); ctx.fillStyle = '#c9b8ff'; ctx.fillText('Pinky ke 40 page · Carbon', x + 36, y + 236);
  for (let i = 0; i < 6; i++) { const on = clamp(k * 4 - i * 0.25); withA(on, () => { rrp(x + 40 + (i % 3) * 180, y + 310 + Math.floor(i / 3) * 190, 160, 170, 14); ctx.fillStyle = '#fbf6e8'; ctx.fill(); for (let r = 0; r < 5; r++) { ctx.fillStyle = RAIN[(i + r) % 7]; ctx.fillRect(x + 56 + (i % 3) * 180, y + 336 + Math.floor(i / 3) * 190 + r * 28, 90 + rnd(i * 5 + r) * 30, 10); } }); }
  if (k > 0.45) withA(clamp((k - 0.45) * 4), () => { font(60, 900); ctx.fillStyle = '#ffd43b'; ctx.textAlign = 'center'; ctx.fillText('⬇', x + w / 2, y + 700); ctx.textAlign = 'left';
    rrp(x + 36, y + 740, w - 72, 120, 24); ctx.fillStyle = '#f6f1e3'; ctx.fill(); font(38, 900); ctx.fillStyle = '#1a1a2a'; ctx.fillText('📄 Short notes · 2 page', x + 66, y + 802);
    rrp(x + 36, y + 880, w - 72, 120, 24); ctx.fillStyle = '#4fd1a5'; ctx.fill(); font(38, 900); ctx.fillStyle = '#0d1a14'; ctx.fillText('❓ Quiz · 10 sawaal', x + 66, y + 942); }); }
function uiScore(x, y, w, k) { ctx.fillStyle = '#0d0b1f'; ctx.fillRect(x, y, w, 2000); const g = ctx.createLinearGradient(x, y, x + w, y + 260); g.addColorStop(0, '#3b1d7a'); g.addColorStop(1, '#1a1240'); ctx.fillStyle = g; ctx.fillRect(x, y, w, 270);
  font(46, 900); ctx.fillStyle = '#fff'; ctx.textAlign = 'left'; ctx.textBaseline = 'middle'; ctx.fillText('Quiz · Carbon', x + 36, y + 150); font(26, 800); ctx.fillStyle = '#c9b8ff'; ctx.fillText('Pinky · notes se bana', x + 36, y + 210);
  for (let i = 0; i < 10; i++) { const on = clamp(k * 3 - i * 0.12); withA(0.2 + 0.8 * on, () => { const ok = i !== 6; rrp(x + 40 + (i % 5) * 108, y + 330 + Math.floor(i / 5) * 120, 90, 90, 20); ctx.fillStyle = ok ? '#4fd1a5' : '#ff4f6a'; ctx.fill(); font(44, 900); ctx.fillStyle = '#0d1a14'; ctx.textAlign = 'center'; ctx.fillText(ok ? '✓' : '✗', x + 85 + (i % 5) * 108, y + 377 + Math.floor(i / 5) * 120); ctx.textAlign = 'left'; }); }
  if (k > 0.6) withA(clamp((k - 0.6) * 4), () => { font(170, 900); ctx.fillStyle = '#ffd43b'; ctx.textAlign = 'center'; ctx.fillText('9 / 10', x + w / 2, y + 800); font(36, 800); ctx.fillStyle = '#fff'; ctx.fillText('haath kaanpe... par yaad raha 💪', x + w / 2, y + 950); ctx.textAlign = 'left'; }); }
function closedBookTip(t, k1, k2, k3) { ctx.fillStyle = '#f2ecdc'; ctx.fillRect(0, 0, W, H); ctx.strokeStyle = 'rgba(80,120,200,.25)'; ctx.lineWidth = 2; for (let y = 300; y < 1300; y += 56) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; font(54, 900); ctx.fillStyle = '#1a1a2a'; ctx.fillText('KITAAB BAND TIP 📕', 540, 340);
  withA(k1, () => { ctx.fillStyle = '#7a2b2b'; rr(390, 420, 300, 200, 14); ctx.fill(); ctx.fillStyle = '#f3e3c3'; ctx.fillRect(400, 600, 280, 14); font(40, 900); ctx.fillStyle = '#fff'; ctx.fillText('BAND 🔒', 540, 520); });
  [['1. ____________ ✍️', '#3a6fd8'], ['2. ____________ ✍️', '#2f9e57'], ['3. ____________ ✍️', '#b3121b']].forEach(([s, c], i) => withA([k2, k2, k3][i] * clamp(1 - i * 0.2 + 0.2), () => { font(52, 900); ctx.fillStyle = c; ctx.fillText(s, 540, 730 + i * 120); }));
  withA(k3, () => { rr(170, 1080, 740, 110, 24); ctx.fillStyle = 'rgba(47,158,87,.16)'; ctx.fill(); font(40, 900); ctx.fillStyle = '#2f9e57'; ctx.fillText('khud nikaala = yaad raha ✓', 540, 1136); }); }

/* ---------- Sonu ke Boards Ep 5 ---------- */
function glassCoin(t, wl, o = {}) {   // steel tumbler close-up on a wooden plank; wl = water level 0..1; coin appears to rise with water
  ctx.fillStyle = o.bg || '#2a1a12'; ctx.fillRect(0, 0, W, H); ctx.fillStyle = '#7a4a2a'; ctx.fillRect(0, 1180, W, 200); ctx.fillStyle = 'rgba(0,0,0,.25)'; ctx.fillRect(0, 1180, W, 12);
  const top = 480, bot = 1170, wt = 250, wb = 190, cx = 540, lx = (y, s) => cx + s * lerp(wt, wb, (y - top) / (bot - top));
  const wy = lerp(bot - 10, top + 90, wl);
  if (wl > 0) { ctx.fillStyle = 'rgba(120,180,230,.45)'; ctx.beginPath(); ctx.moveTo(lx(wy, -1) + 8, wy); ctx.lineTo(lx(wy, 1) - 8, wy); ctx.lineTo(lx(bot, 1) - 8, bot); ctx.lineTo(lx(bot, -1) + 8, bot); ctx.fill(); ctx.strokeStyle = 'rgba(220,240,255,.8)'; ctx.lineWidth = 4; ctx.beginPath(); ctx.ellipse(cx, wy, lx(wy, 1) - cx - 8, 16, 0, 0, 7); ctx.stroke(); }
  const cy = lerp(bot - 22, bot - 170, wl * (o.rise ?? 1)), ca = o.coinA ?? 1; withA(ca, () => { ctx.fillStyle = '#d9a43a'; ctx.beginPath(); ctx.ellipse(cx, cy, 70, 18, 0, 0, 7); ctx.fill(); ctx.strokeStyle = '#8a6420'; ctx.lineWidth = 4; ctx.stroke(); font(26, 900); ctx.fillStyle = '#8a6420'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('₹1', cx, cy + 1); });
  if (wl > 0.05) withA(0.35 * ca, () => { ctx.fillStyle = '#d9a43a'; ctx.beginPath(); ctx.ellipse(cx, bot - 22, 70, 18, 0, 0, 7); ctx.fill(); });
  const g = ctx.createLinearGradient(cx - wt, 0, cx + wt, 0); g.addColorStop(0, 'rgba(200,205,215,.55)'); g.addColorStop(0.3, 'rgba(255,255,255,.15)'); g.addColorStop(0.7, 'rgba(255,255,255,.05)'); g.addColorStop(1, 'rgba(170,175,190,.55)');
  ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(lx(top, -1), top); ctx.lineTo(lx(top, 1), top); ctx.lineTo(lx(bot, 1), bot); ctx.lineTo(lx(bot, -1), bot); ctx.fill(); ctx.strokeStyle = '#d9dde6'; ctx.lineWidth = 8; ctx.stroke(); ctx.beginPath(); ctx.ellipse(cx, top, wt, 26, 0, 0, 7); ctx.stroke();
  if (o.ray && wl > 0.5) { const sx = cx + 40, sy = wy; ctx.strokeStyle = '#ffd43b'; ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(cx - 20, bot - 22); ctx.lineTo(sx, sy); ctx.lineTo(sx + 330, sy - 300); ctx.stroke(); ctx.setLineDash([16, 12]); ctx.strokeStyle = 'rgba(255,212,59,.7)'; ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(sx - 150, sy + 136); ctx.stroke(); ctx.setLineDash([]); font(64, 900); ctx.textAlign = 'center'; ctx.fillText('👁️', sx + 360, sy - 330); }
  if (o.pour > 0) { ctx.fillStyle = '#c9ccd4'; ctx.save(); ctx.translate(820, 330); ctx.rotate(-0.9); rr(-70, -60, 150, 120, 20); ctx.fill(); ctx.restore(); ctx.strokeStyle = 'rgba(150,200,240,.8)'; ctx.lineWidth = 18; ctx.beginPath(); ctx.moveTo(750, 360); ctx.quadraticCurveTo(620, 380, 600, wy); ctx.stroke(); } }
function uiLab(x, y, w, k) { ctx.fillStyle = '#0d0b1f'; ctx.fillRect(x, y, w, 2000); const g = ctx.createLinearGradient(x, y, x + w, y + 260); g.addColorStop(0, '#3b1d7a'); g.addColorStop(1, '#1a1240'); ctx.fillStyle = g; ctx.fillRect(x, y, w, 270);
  rrp(x + 36, y + 70, 64, 64, 18); ctx.fillStyle = '#ff4fa0'; ctx.fill(); font(42, 900); ctx.fillStyle = '#fff'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('Z', x + 68, y + 104); ctx.textAlign = 'left'; font(34, 800); ctx.fillText('ZetaGalaxy', x + 116, y + 104);
  font(46, 900); ctx.fillText('Labs · Refraction', x + 36, y + 190); font(26, 800); ctx.fillStyle = '#c9b8ff'; ctx.fillText('Light · interactive lab', x + 36, y + 236);
  const tx = x + 60, ty = y + 360, tw = w - 120, th = 420, wl = clamp(k * 1.6); rrp(tx, ty, tw, th, 16); ctx.strokeStyle = '#8ab4ff'; ctx.lineWidth = 4; ctx.stroke(); const wy = ty + th - th * 0.8 * wl;
  ctx.fillStyle = 'rgba(80,140,255,.35)'; ctx.fillRect(tx + 4, wy, tw - 8, ty + th - wy - 4); const cx0 = tx + 120, cyb = ty + th - 30; ctx.fillStyle = '#d9a43a'; ctx.beginPath(); ctx.ellipse(cx0, cyb, 40, 12, 0, 0, 7); ctx.fill();
  if (wl > 0.3) { const sx = cx0 + 150, sy = wy; ctx.strokeStyle = '#ffd43b'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(cx0, cyb); ctx.lineTo(sx, sy); ctx.lineTo(sx + 200, sy - 150); ctx.stroke(); ctx.setLineDash([12, 10]); ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(sx - 170, sy + 130); ctx.stroke(); ctx.setLineDash([]);
    withA(0.6, () => { ctx.fillStyle = '#d9a43a'; ctx.beginPath(); ctx.ellipse(sx - 170, sy + 130, 40, 12, 0, 0, 7); ctx.fill(); }); font(26, 800); ctx.fillStyle = '#ffd43b'; ctx.fillText('dikhne wala sikka', sx - 250, sy + 175 > ty + th - 70 ? ty + th - 70 : sy + 175); }
  font(30, 800); ctx.fillStyle = '#fff'; ctx.fillText('Paani: ' + Math.round(wl * 100) + '%', x + 60, y + 850); rrp(x + 60, y + 880, w - 120, 20, 10); ctx.fillStyle = '#221c44'; ctx.fill(); rrp(x + 60, y + 880, (w - 120) * wl, 20, 10); ctx.fillStyle = '#4fd1a5'; ctx.fill();
  if (k > 0.65) withA(clamp((k - 0.65) * 4), () => { rrp(x + 36, y + 950, w - 72, 120, 24); ctx.fillStyle = '#ffd43b'; ctx.fill(); font(34, 900); ctx.fillStyle = '#120e24'; ctx.fillText('Roshni mudi → sikka upar dikha ✓', x + 60, y + 1012); }); }
function expTip(t, k1, k2, k3) { ctx.fillStyle = '#f2ecdc'; ctx.fillRect(0, 0, W, H); ctx.strokeStyle = 'rgba(80,120,200,.25)'; ctx.lineWidth = 2; for (let y = 300; y < 1300; y += 56) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; font(54, 900); ctx.fillStyle = '#1a1a2a'; ctx.fillText('YAAD RAKHNE KA TIP ✏️', 540, 350);
  withA(k1, () => { rr(170, 430, 740, 150, 24); ctx.fillStyle = 'rgba(58,111,216,.14)'; ctx.fill(); font(50, 900); ctx.fillStyle = '#3a6fd8'; ctx.fillText('1. Definition likho 📝', 540, 505); });
  withA(k2, () => { rr(170, 630, 740, 150, 24); ctx.fillStyle = 'rgba(224,123,0,.14)'; ctx.fill(); font(50, 900); ctx.fillStyle = '#c06a00'; ctx.fillText('2. Chhota experiment khud 🥛', 540, 705); });
  withA(k3, () => { rr(170, 850, 740, 150, 24); ctx.fillStyle = 'rgba(47,158,87,.16)'; ctx.fill(); font(50, 900); ctx.fillStyle = '#2f9e57'; ctx.fillText('aankhon ne dekha = yaad ✓', 540, 925); font(36, 800); ctx.fillStyle = '#5a5a6a'; ctx.fillText('(sikka + gilaas = refraction)', 540, 1080); }); }

export function buildShots() {
  const S = [], CUES = [], add = (o) => S.push({ cam: [540, 960], zoom: 0.03, punch: 0.02, ...o }), cue = (t, type, o = {}) => CUES.push({ t: +Math.max(0, t).toFixed(3), type, ...o });
  const cut = (i) => (i === 0 ? 0 : L(i) - 0.08);
  const Wl = (ls) => { const m = ctx.getTransform(); return ls.map((l) => ({ ...l, x: m.a * l.x + m.e, y: m.d * l.y + m.f, r: l.r * m.a })); };
  const fin = (t, lights, amb, o = {}) => { N.lightPass(lights, amb); N.grade(t, { vig: o.vig ?? 0.45 }); folkBorder(); };
  const pill = (txt, y, k, bg = '#ffd43b', fg = '#1a0e05', size = 46) => { if (k <= 0) return; screen(() => { ctx.save(); ctx.translate(540, y); ctx.scale(k, k); font(size, 900); const tw = Math.min(900, ctx.measureText(txt).width + 70); rrp(-tw / 2, -size * 0.95, tw, size * 1.9, size * 0.95); ctx.fillStyle = bg; ctx.fill(); ctx.fillStyle = fg; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(txt, 0, 3); ctx.restore(); }); };
  const lc = (lt, d, a, b) => lerp(a, b, eio(clamp(lt / d)));
  const DAY = [{ x: 540, y: 300, r: 1500, c: [255, 225, 180], i: 0.95 }];
  const aangan = (lt, d, t, o) => { K.camera(lc(lt, d, o.z0, o.z1), o.cx, o.cy ?? 1050); yard(t);
    N.person(330, 1300, 1.0, { ...PINK, arms: o.pArms || 'hug', mood: o.pMood || 'ok', look: 0.4 }); if (o.gud !== false) N.person(o.gx ?? 560, 1300, 0.75, { ...GUD, arms: o.gArms || 'down', mood: o.gMood || 'happy', look: o.gLook ?? -0.3 }); N.person(780, 1300, 1.05, { ...SONU, arms: o.sArms || 'down', mood: o.sMood || 'ok', look: o.sLook ?? -0.4, screen: '#c9b8ff' });
    if (o.mj !== false) N.person(1000, 1300, 1.15, { ...MJ, arms: o.mArms || 'down', mood: o.mMood || 'ok', look: -0.8 });
    const LL = Wl(DAY); screen(() => { fin(t, LL, [180, 160, 140], { vig: o.vig ?? 0.4 }); if (o.tag) pill(o.tag[0], 330, pop(t, o.tag[1]), o.tag[2] || '#ffd43b', o.tag[3] || '#1a0e05', 40); }); };
  const phone = (fn, i, dur) => (lt, d, t) => { ctx.fillStyle = '#0a0706'; ctx.fillRect(-300, -300, W + 600, H + 600); screen(() => { const z = lerp(0.95, 1.0, eio(clamp(lt / d))); ctx.translate(540, 760); ctx.scale(z, z); ctx.translate(-540, -860); phoneFrame(540, 900, 1, (x, y, w) => fn(x, y, w, clamp((t - L(i) + 0.2) / dur))); }); screen(() => { N.grade(t, { vig: 0.5 }); folkBorder(); }); };
  const glass = (lt, d, t, o) => { const z = lc(lt, d, o.z0 ?? 1.0, o.z1 ?? 1.08); screen(() => { ctx.translate(540, 800); ctx.scale(z, z); ctx.translate(-540, -800); glassCoin(t, o.wl, o); N.glow(540, 700, 500, '255,190,110', 0.25); N.grade(t, { vig: 0.5 }); folkBorder(); }); if (o.tag) pill(o.tag[0], 330, pop(t, o.tag[1]), o.tag[2] || '#ffd43b', o.tag[3] || '#1a0e05', 40); };

  // 0 HOOK: water pours into a steel glass and the coin at the bottom floats up into view
  add({ id: 'S01', at: 0, noFlash: true, note: 'HOOK: steel glass with a coin, water already pouring at 0 s, coin appears to rise; pill SIKKA UPAR KAISE? 🪙', draw(lt, d, t) { glass(lt, d, t, { wl: eio(clamp((t - 0.0) / 1.6)) * 0.9, pour: t < 1.7 ? 1 : 0, z0: 1.12, z1: 1.0 });
    pill('SIKKA KHUD UPAR? 🪙', 330, pop(t, 0.5), '#b3121b', '#fff', 44); } });
  cue(0.02, 'bubbles', { gain: 0.6 }); cue(1.6, 'ding', { gain: 0.5 }); cue(0.5, 'pop', { gain: 0.5 });
  add({ id: 'S02', at: cut(1), note: 'next morning: Masterji’s courtyard, Pinky and Sonu face him', draw: (lt, d, t) => aangan(lt, d, t, { z0: 1.15, z1: 1.3, cx: 660, gud: false, tag: ['1 SEAT · 2 BACHCHE · 1 SHART', at('seat', 1), '#b3121b', '#fff'] }) });
  cue(at('shart', 1), 'slam', { gain: 0.5 });
  add({ id: 'S03', at: cut(2), note: 'Masterji close, strict: ratta nahi', draw: (lt, d, t) => aangan(lt, d, t, { z0: 2.2, z1: 2.35, cx: 960, cy: 1020, gud: false, mArms: 'reach', tag: ['RATTA NAHI ❌', at('ratta', 2), '#3a2a1a', '#fff'] }) });
  add({ id: 'S04', at: cut(3), note: 'Pinky reads the perfect definition from her 7-colour notes', draw: (lt, d, t) => aangan(lt, d, t, { z0: 2.2, z1: 2.35, cx: 380, cy: 1040, gud: false, pArms: 'reach', pMood: 'happy', tag: ['🌈 REFRACTION = MUDNA', at('refraction', 3), '#5a3fa8', '#fff'] }) });
  add({ id: 'S05', at: cut(4), note: 'Masterji: but WHY up?', draw: (lt, d, t) => aangan(lt, d, t, { z0: 1.9, z1: 2.0, cx: 900, cy: 1030, gud: false, mArms: 'reach', tag: ['PAR KYUN? 🤨', at('kyun', 4), '#3a2a1a', '#fff'] }) });
  cue(at('kyun', 4), 'thud', { gain: 0.5 });
  add({ id: 'S06', at: cut(5), note: 'Zeta Labs: refraction lab, water slider, ray bends, apparent coin', draw: phone(uiLab, 5, 3.0) });
  cue(at('zeta', 5), 'ding', { gain: 0.5 }); cue(at('experiment', 5), 'bubbles', { gain: 0.4 });
  add({ id: 'S07', at: cut(6), note: 'Sonu steps forward: glass dijiye', draw: (lt, d, t) => aangan(lt, d, t, { z0: 2.0, z1: 2.1, cx: 820, cy: 1030, gud: false, sArms: 'reach', sMood: 'happy', tag: ['SONU 🙋', L(6) + 0.2, '#2f5f8a', '#fff'] }) });
  add({ id: 'S08', at: cut(7), note: 'glass close: Sonu pours, coin rises', draw: (lt, d, t) => glass(lt, d, t, { wl: eio(clamp((t - at('paani', 7)) / 2.0)) * 0.9, pour: t < at('sikka', 7) + 1 ? 1 : 0, tag: ['🪙 ↑', at('upar', 7)] }) });
  cue(at('paani', 7), 'bubbles', { gain: 0.6 }); cue(at('upar', 7), 'sparkle', { gain: 0.5 });
  add({ id: 'S09', at: cut(8), note: 'glass with ray diagram: light bends at the surface, eye traces it back straight', draw: (lt, d, t) => glass(lt, d, t, { wl: 0.9, ray: true, z0: 1.0, z1: 1.0, tag: ['AANKH = SEEDHI LINE 👁️', at('aankh', 8), '#3a6fd8', '#fff'] }) });
  cue(at('mudti', 8), 'pop', { gain: 0.5 });
  add({ id: 'S10', at: cut(9), note: 'tip card: definition + one small experiment', draw(lt, d, t) { screen(() => { expTip(t, eo(clamp((t - at('definition', 9)) / 0.4)), eo(clamp((t - at('experiment', 9)) / 0.5)), eo(clamp((t - at('aankhon', 9)) / 0.5))); N.grade(t, { vig: 0.35 }); folkBorder(); }); } });
  cue(at('definition', 9), 'pop', { gain: 0.5 }); cue(at('experiment', 9), 'pop', { gain: 0.5 }); cue(at('aankhon', 9), 'ding', { gain: 0.5 });
  add({ id: 'S11', at: cut(10), note: 'Masterji points at Sonu: seat tumhari', draw: (lt, d, t) => aangan(lt, d, t, { z0: 1.5, z1: 1.6, cx: 800, gud: false, mArms: 'reach', sMood: 'happy', pMood: 'sad', tag: ['SEAT: SONU ✓', at('seat', 10), '#2f9e57', '#fff'] }) });
  cue(at('seat', 10), 'cash', { gain: 0.5 });
  add({ id: 'S12', at: cut(11), note: 'Sonu looks at Pinky and proposes half-half', draw: (lt, d, t) => aangan(lt, d, t, { z0: 1.6, z1: 1.75, cx: 560, gud: false, sLook: -0.9, sArms: 'reach', pMood: 'happy', tag: ['AADHI-AADHI SEAT 🤝', at('aadhi', 11), '#f3c14a'] }) });
  cue(at('aadhi', 11), 'sparkle', { gain: 0.5 });
  add({ id: 'S13', at: cut(12), note: 'Masterji smiles for the first time; Gudiya runs in', draw: (lt, d, t) => aangan(lt, d, t, { z0: 1.25, z1: 1.3, cx: 640, mMood: 'happy', pMood: 'happy', sMood: 'happy', gx: lerp(-120, 560, eo(clamp((t - at('gudiya', 12)) / 0.8))), gArms: 'reach', tag: ['MASTERJI 🙂 (PEHLI BAAR)', at('muskuraye', 12), '#f3c14a'] }) });
  add({ id: 'S14', at: cut(13), note: 'Gudiya close: result tomorrow on the notice board', draw: (lt, d, t) => aangan(lt, d, t, { z0: 2.4, z1: 2.55, cx: 560, cy: 1080, gArms: 'reach', gLook: 0, sMood: 'scared', pMood: 'scared', tag: ['RESULT: KAL SUBAH 😳', at('result', 13), '#b3121b', '#fff'] }) });
  cue(at('result', 13), 'boom', { gain: 0.6 }); cue(at('kal', 13), 'heartbeat', { gain: 0.5 });
  add({ id: 'S15', at: cut(14), note: 'offer card: 40% OFF code CHHATH; comment NOTES', draw(lt, d, t) { aangan(lt, d, t, { z0: 1.2, z1: 1.2, cx: 600, mMood: 'happy', pMood: 'ok', sMood: 'ok' });
    screen(() => { const k = eob(seg(t, at('comment', 14) - 0.2, at('comment', 14) + 0.2)); if (k <= 0) return; ctx.save(); ctx.translate(540, 720); ctx.scale(k, k); rrp(-400, -260, 800, 520, 40); ctx.fillStyle = 'rgba(25,8,5,.9)'; ctx.fill(); ctx.strokeStyle = '#f3c14a'; ctx.lineWidth = 6; ctx.stroke();
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; font(40, 900); ctx.fillStyle = '#f3c14a'; ctx.fillText('🎟️ CHAPTER NOTES 📚', 0, -190); font(150, 900); ctx.fillStyle = '#fff'; ctx.fillText('40% OFF', 0, -50); font(46, 900); ctx.fillStyle = '#ffd43b'; ctx.fillText('CODE: CHHATH', 0, 70); font(36, 800); ctx.fillStyle = '#fff'; ctx.fillText('Zeta Galaxy · zetagalaxy.com', 0, 150); font(36, 900); ctx.fillStyle = '#4fd1a5'; ctx.fillText('Comment "NOTES" 👇 notes link DM mein', 0, 215); ctx.restore(); }); } });
  cue(at('comment', 14), 'sparkle', { gain: 0.6 });
  S.forEach((s, i) => { if (i) cue(s.at, 'whoosh', { gain: 0.2 }); });
  return { shots: S, cues: CUES, overlay: null };
}
