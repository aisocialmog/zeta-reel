// CHHATH KE 4 DIN · Ep 4 · Usha Arghya (finale) (Zeta Galaxy notes page). Warm 2D folk look: dawn ghat, village home, light pass.
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

export function buildShots() {
  const S = [], CUES = [], add = (o) => S.push({ cam: [540, 960], zoom: 0.03, punch: 0.02, ...o }), cue = (t, type, o = {}) => CUES.push({ t: +Math.max(0, t).toFixed(3), type, ...o });
  const cut = (i) => (i === 0 ? 0 : L(i) - 0.08);
  const Wl = (ls) => { const m = ctx.getTransform(); return ls.map((l) => ({ ...l, x: m.a * l.x + m.e, y: m.d * l.y + m.f, r: l.r * m.a })); };
  const fin = (t, lights, amb, o = {}) => { N.lightPass(lights, amb); N.grade(t, { vig: o.vig ?? 0.45 }); folkBorder(); };
  const pill = (txt, y, k, bg = '#ffd43b', fg = '#1a0e05', size = 46) => { if (k <= 0) return; screen(() => { ctx.save(); ctx.translate(540, y); ctx.scale(k, k); font(size, 900); const tw = ctx.measureText(txt).width + 70; rrp(-tw / 2, -size * 0.95, tw, size * 1.9, size * 0.95); ctx.fillStyle = bg; ctx.fill(); ctx.fillStyle = fg; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(txt, 0, 3); ctx.restore(); }); };
  const PRE = [{ x: 540, y: 1300, r: 1100, c: [255, 170, 90], i: 0.55 }, { x: 540, y: 300, r: 900, c: [120, 140, 220], i: 0.35 }];
  const DAWN = [{ x: 540, y: 900, r: 1300, c: [255, 210, 150], i: 0.95 }, { x: 540, y: 1300, r: 900, c: [255, 170, 110], i: 0.5 }];
  const lc = (lt, d, a, b) => lerp(a, b, eio(clamp(lt / d)));
  const daura = (x, y) => { ctx.fillStyle = '#b08a4a'; ctx.beginPath(); ctx.moveTo(x - 80, y - 60); ctx.lineTo(x + 80, y - 60); ctx.lineTo(x + 60, y); ctx.lineTo(x - 60, y); ctx.fill(); ctx.strokeStyle = '#7a5a2a'; ctx.lineWidth = 3; for (let k = -3; k <= 3; k++) { ctx.beginPath(); ctx.moveTo(x + k * 20, y - 60); ctx.lineTo(x + k * 16, y); ctx.stroke(); } ['#f2d24a', '#e8572f', '#7aa83a'].forEach((c, k) => { ctx.fillStyle = c; ctx.beginPath(); ctx.arc(x - 30 + k * 30, y - 66, 15, 0, 7); ctx.fill(); }); };

  // 0 HOOK: one diya drifts toward camera across the dark river of a thousand lights
  add({ id: 'S01', at: 0, noFlash: true, note: 'pre-dawn river full of diyas, one diya drifts into camera', draw(lt, d, t) { ctx.fillStyle = '#0a0a1a'; ctx.fillRect(-300, -300, W + 600, H + 600);
    screen(() => { const sky = ctx.createLinearGradient(0, 0, 0, 900); sky.addColorStop(0, '#05061a'); sky.addColorStop(1, '#2a2048'); ctx.fillStyle = sky; ctx.fillRect(0, 0, W, 900); const rv = ctx.createLinearGradient(0, 900, 0, H); rv.addColorStop(0, '#1a1838'); rv.addColorStop(1, '#07060f'); ctx.fillStyle = rv; ctx.fillRect(0, 900, W, H - 900);
      for (let i = 0; i < 140; i++) { const dep = rnd(i), yy = 900 + dep * dep * 900, xx = (rnd(i + 9) * 1300 - 110 + t * 20 * (0.3 + dep)) % 1300 - 110, s = 0.12 + dep * 0.5; ctx.fillStyle = 'rgba(255,190,90,.9)'; ctx.beginPath(); ctx.ellipse(xx, yy - 8 * s * 4, 5 * s * 3, 9 * s * 3, 0, 0, 7); ctx.fill(); N.glow(xx, yy, 40 * s * 3, '255,170,60', 0.35); }
      const k = eio(clamp(t / 3.2)); bigDiya(lerp(420, 560, k), lerp(1000, 1180, k), lerp(0.45, 2.1, k), t);
      N.grade(t, { vig: 0.55 }); folkBorder(); });
    pill('🪔 CHHATH · DIN 4 · USHA ARGHYA', 320, eob(seg(t, 0.1, 0.45)), '#b3121b', '#ffe9b0', 40); pill('PAPA ABHI TAK NAHI AAYE 💔', 440, eob(seg(t, at('khaali', 0), at('khaali', 0) + 0.3)), '#ffd43b', '#1a0e05', 40); } });
  cue(0.1, 'riser', { gain: 0.3, dur: 1.5 }); cue(at('khaali', 0), 'sadviolin', { gain: 0.4, dur: 2.5 });
  add({ id: 'S02', at: cut(1), note: 'Patna Jn board: Delhi train LATE 4H', draw(lt, d, t) { K.camera(lc(lt, d, 1.1, 1.2), 540, 760); station(t); const LL = Wl([{ x: 540, y: 680, r: 700, c: [255, 200, 120], i: 0.8 }]); screen(() => fin(t, LL, [50, 40, 44])); pill('KAL SHAAM', 330, eob(seg(t, L(1) + 0.1, L(1) + 0.4)), '#1d2a3a', '#fff', 40); } });
  add({ id: 'S03', at: cut(2), note: 'pre-dawn ghat: Gudiya asks, Sonu holds the daura', draw(lt, d, t) { K.camera(lc(lt, d, 1.6, 1.7), 540, 1300); ghat(t, { sun: 0 }); N.person(420, 1560, 0.85, { ...GUD, arms: 'hug', mood: 'sad', look: 0.8 }); N.person(680, 1560, 1.1, { ...SONU, arms: 'hug', mood: 'ok', look: -0.6 }); daura(680, 1420);
    const LL = Wl(PRE); screen(() => fin(t, LL, [40, 36, 70])); } });
  add({ id: 'S04', at: cut(3), note: 'Sonu reassures Gudiya (close)', draw(lt, d, t) { K.camera(lc(lt, d, 2.2, 2.35), 620, 1260); ghat(t, { sun: 0 }); N.person(420, 1560, 0.85, { ...GUD, arms: 'hug', mood: 'ok', look: 0.8 }); N.person(680, 1560, 1.1, { ...SONU, arms: 'hug', mood: 'happy', look: -0.6 }); daura(680, 1420);
    const LL = Wl([...PRE, { x: 640, y: 1250, r: 400, c: [255, 190, 120], i: 0.6 }]); screen(() => fin(t, LL, [40, 36, 70])); } });
  add({ id: 'S05', at: cut(4), note: 'Maa waist-deep in the river, soop in hands, 36 hrs', draw(lt, d, t) { K.camera(lc(lt, d, 1.6, 1.75), 540, 1120); ghat(t, { sun: 0.05, kosi: false });
    ctx.save(); ctx.beginPath(); ctx.rect(-600, -600, W + 1200, 1320 + 600); ctx.clip(); N.person(540, 1560, 1.4, { ...MAA, arms: 'hug', mood: 'ok', head: -0.1 }); ctx.restore(); ctx.fillStyle = 'rgba(80,70,120,.6)'; ctx.fillRect(-600, 1320, W + 1200, 300);
    const LL = Wl(PRE); screen(() => fin(t, LL, [50, 44, 80])); pill('36 GHANTE · BINA PAANI 🙏', 360, eob(seg(t, at('chhattis', 4), at('chhattis', 4) + 0.3)), '#7a1d1d', '#ffe9b0', 40); } });
  add({ id: 'S06', at: cut(5), note: 'Sonu sits on the steps with phone; TEST: 3 DIN', draw(lt, d, t) { K.camera(lc(lt, d, 1.8, 1.95), 420, 1350); ghat(t, { sun: 0.05 }); N.person(420, 1560, 1.1, { ...SONU, pose: 'sit', arms: 'phone', mood: 'ok', screen: '#c9b8ff' });
    const LL = Wl([...PRE, { x: 420, y: 1440, r: 260, c: [200, 190, 255], i: 0.8 }]); screen(() => fin(t, LL, [40, 36, 70])); pill('📝 TEST: 3 DIN', 380, eob(seg(t, at('test', 5), at('test', 5) + 0.3)), '#b3121b', '#fff', 44); } });
  cue(at('test', 5), 'tick', { gain: 0.5 });
  add({ id: 'S07', at: cut(6), note: 'Zeta revision notes: Light, one page of formulas', draw(lt, d, t) { ctx.fillStyle = '#0a0706'; ctx.fillRect(-300, -300, W + 600, H + 600); screen(() => { const z = lerp(1.2, 1.28, eio(clamp(lt / d))); ctx.translate(540, 760); ctx.scale(z, z); ctx.translate(-540, -700); phoneFrame(540, 900, 1, (x, y, w) => uiNotesLight(x, y, w, clamp((t - L(6)) / 2.6))); });
    screen(() => { const g = ctx.createLinearGradient(0, 1200, 0, 1480); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(0.35, 'rgba(0,0,0,.7)'); g.addColorStop(1, 'rgba(0,0,0,.7)'); ctx.fillStyle = g; ctx.fillRect(0, 1200, W, 280); N.grade(t, { vig: 0.5 }); folkBorder(); }); } });
  for (let k = 0; k < 6; k++) cue(L(6) + 0.3 + k * 0.3, 'tock', { gain: 0.3 }); cue(at('saare', 6), 'sparkle', { gain: 0.5 });
  add({ id: 'S08', at: cut(7), note: 'Sonu: 30 min mission done', draw(lt, d, t) { K.camera(lc(lt, d, 2.2, 2.35), 420, 1330); ghat(t, { sun: 0.08 }); N.person(420, 1560, 1.1, { ...SONU, pose: 'sit', arms: 'reach', mood: 'happy' });
    const LL = Wl([...PRE, { x: 420, y: 1350, r: 380, c: [255, 210, 150], i: 0.6 }]); screen(() => fin(t, LL, [44, 40, 74])); pill('⏱️ 30 MIN ✅', 380, eob(seg(t, L(7) + 0.2, L(7) + 0.5)), '#2f6f3a', '#fff', 56); } });
  cue(L(7) + 0.3, 'cash', { gain: 0.4 });
  add({ id: 'S09', at: cut(8), note: 'Gudiya points up the steps', draw(lt, d, t) { K.camera(lc(lt, d, 1.9, 2.05), 470, 1300); ghat(t, { sun: 0.1 }); N.person(470, 1560, 0.85, { ...GUD, arms: 'reach', mood: 'happy', look: 0.9, head: -0.2 });
    const LL = Wl(PRE); screen(() => fin(t, LL, [50, 44, 80])); } });
  cue(cut(8), 'pop', { gain: 0.5 });
  add({ id: 'S10', at: cut(9), note: 'Papa runs down the ghat steps, dusty, chappal in hand', draw(lt, d, t) { const k = eio(clamp(lt / d)); K.camera(lc(lt, d, 1.3, 1.4), 600, 1200); ghat(t, { sun: 0.12 }); const px = lerp(900, 600, k), bob = Math.abs(Math.sin(t * 10)) * 14; N.person(px, lerp(1480, 1560, k) - bob, 1.15, { ...PAPA, shirt: '#7a7468', arms: 'reach', mood: 'happy', look: -0.8 });
    for (let i = 0; i < 6; i++) { const q = (t * 1.5 + i / 6) % 1; ctx.fillStyle = `rgba(190,160,120,${0.4 * (1 - q)})`; ctx.beginPath(); ctx.arc(px + 40 + q * 90, 1540 - q * 30, 10 + q * 22, 0, 7); ctx.fill(); }
    const LL = Wl(PRE); screen(() => fin(t, LL, [90, 74, 100])); pill('PAPA AA GAYE ❤️', 380, eob(seg(t, at('papa', 9) - 0.1, at('papa', 9) + 0.3)), '#b3121b', '#ffe9b0', 52); } });
  cue(cut(9), 'step', { gain: 0.6 }); cue(cut(9) + 0.3, 'step', { gain: 0.6 }); cue(cut(9) + 0.6, 'step', { gain: 0.6 });
  add({ id: 'S11', at: cut(10), note: 'Papa close: breathless, joins hands', draw(lt, d, t) { K.camera(lc(lt, d, 2.3, 2.45), 600, 1250); ghat(t, { sun: 0.15 }); N.person(600, 1560, 1.15, { ...PAPA, shirt: '#7a7468', arms: 'hug', mood: 'happy', head: -0.08 });
    const LL = Wl([...PRE, { x: 600, y: 1250, r: 420, c: [255, 200, 140], i: 0.6 }]); screen(() => fin(t, LL, [60, 50, 80])); } });
  add({ id: 'S12', at: cut(11), note: 'first ray of the sun over the river', draw(lt, d, t) { const k = eo(clamp(lt / Math.max(1, d))); K.camera(lc(lt, d, 1.15, 1.05), 540, 1000); ghat(t, { sun: lerp(0.15, 0.75, k), kosi: false }); const LL = Wl([{ x: 540, y: 950, r: 1300, c: [255, 210, 150], i: lerp(0.4, 1, k) }]);
    screen(() => { fin(t, LL, [lerp(60, 120, k), lerp(50, 90, k), lerp(80, 110, k)]); N.beam(540, lerp(1120, 860, k), 540, 1500, 40, 500, '255,220,140', 0.25 * k); }); } });
  cue(at('pehli', 11), 'sparkle', { gain: 0.6 }); cue(cut(11), 'riser', { gain: 0.3, dur: 1.5 });
  add({ id: 'S13', at: cut(12), note: 'whole family offers arghya together', draw(lt, d, t) { K.camera(lc(lt, d, 1.3, 1.4), 540, 1180); ghat(t, { sun: 0.8, soop: [540, 1470] });
    N.person(240, 1560, 1.1, { ...PAPA, shirt: '#7a7468', arms: 'hug', mood: 'happy' }); N.person(430, 1560, 1.15, { ...MAA, arms: 'hug', mood: 'happy' }); N.person(650, 1560, 1.05, { ...SONU, arms: 'hug', mood: 'happy' }); N.person(830, 1560, 0.8, { ...GUD, arms: 'hug', mood: 'happy' });
    const LL = Wl(DAWN); screen(() => fin(t, LL, [120, 90, 110])); pill('🌅 USHA ARGHYA · VRAT POORA', 360, eob(seg(t, at('poora', 12) - 0.1, at('poora', 12) + 0.3)), '#e8a317', '#2a1505', 40); } });
  cue(at('poora', 12), 'ding', { gain: 0.5 });
  add({ id: 'S14', at: cut(13), note: 'Maa: roz thoda, par roz', draw(lt, d, t) { K.camera(lc(lt, d, 2.0, 2.15), 520, 1260); ghat(t, { sun: 0.85 }); N.person(520, 1560, 1.2, { ...MAA, arms: 'down', mood: 'happy', look: 0.4 }); N.person(760, 1560, 1.05, { ...SONU, arms: 'down', mood: 'happy', look: -0.6 });
    const LL = Wl(DAWN); screen(() => fin(t, LL, [120, 90, 110])); pill('ROZ THODA, PAR ROZ 🙏', 380, eob(seg(t, at('roz', 13), at('roz', 13) + 0.3)), '#e8a317', '#2a1505', 44); } });
  add({ id: 'S15', at: cut(14), note: 'teaser card: kal se SONU KE BOARDS', draw(lt, d, t) { K.camera(1.4, 560, 980); home(t, { part: 'room' }); N.person(700, 1300, 1.15, { ...SONU, arms: 'phone', mood: 'happy', screen: '#c9b8ff' }); const LL = Wl([{ x: 640, y: 900, r: 800, c: [255, 220, 170], i: 1 }]); screen(() => fin(t, LL, [90, 60, 50]));
    screen(() => { const k = eob(seg(t, at('kal', 14) - 0.1, at('kal', 14) + 0.3)); if (k <= 0) return; ctx.save(); ctx.translate(540, 620); ctx.scale(k, k); rrp(-380, -150, 760, 300, 36); ctx.fillStyle = 'rgba(25,8,5,.9)'; ctx.fill(); ctx.strokeStyle = '#f3c14a'; ctx.lineWidth = 6; ctx.stroke(); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; font(38, 900); ctx.fillStyle = '#f3c14a'; ctx.fillText('KAL SE · NAYI KAHANI', 0, -80); font(84, 900); ctx.fillStyle = '#fff'; ctx.fillText('SONU KE BOARDS', 0, 10); font(32, 800); ctx.fillStyle = '#ffd43b'; ctx.fillText('Ep 1 · 17 Nov', 0, 90); ctx.restore(); }); } });
  cue(at('boards', 14), 'boom', { gain: 0.5 });
  add({ id: 'S16', at: cut(15), note: 'offer: 40% OFF code CHHATH; comment NOTES', draw(lt, d, t) { K.camera(1.05, 540, 980); ghat(t, { sun: 0.9, soop: [540, 1470] }); const LL = Wl(DAWN); screen(() => fin(t, LL, [120, 90, 110]));
    screen(() => { const k = eob(seg(t, at('comment', 15) - 0.2, at('comment', 15) + 0.2)); if (k <= 0) return; ctx.save(); ctx.translate(540, 720); ctx.scale(k, k); rrp(-400, -260, 800, 520, 40); ctx.fillStyle = 'rgba(25,8,5,.88)'; ctx.fill(); ctx.strokeStyle = '#f3c14a'; ctx.lineWidth = 6; ctx.stroke();
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; font(40, 900); ctx.fillStyle = '#f3c14a'; ctx.fillText('🎟️ CHHATH SPECIAL 🪔', 0, -190); font(150, 900); ctx.fillStyle = '#fff'; ctx.fillText('40% OFF', 0, -50); font(46, 900); ctx.fillStyle = '#ffd43b'; ctx.fillText('CODE: CHHATH', 0, 70); font(36, 800); ctx.fillStyle = '#fff'; ctx.fillText('Zeta Galaxy · zetagalaxy.com', 0, 150); font(36, 900); ctx.fillStyle = '#4fd1a5'; ctx.fillText('Comment "NOTES" 👇 notes link DM mein', 0, 215); ctx.restore(); }); } });
  cue(at('comment', 15), 'sparkle', { gain: 0.6 });
  S.forEach((s, i) => { if (i) cue(s.at, 'whoosh', { gain: 0.2 }); });
  return { shots: S, cues: CUES, overlay: null };
}
