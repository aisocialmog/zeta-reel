// AASMAAN MEIN 96 · Ep 5 · Laal Pen (Day 92). 2D night look. One shot per line.
import { ctx, W, H, clamp, lerp, seg, eo, eio, eob, pop, font, rr, poly, withA, scaled, screen } from './core/lib.js';
import { L, Le, Wd } from './core/timing.js';
import * as K from './core/kit.js';
import * as N from './core/night.js';

const at = (w, i) => { try { return Wd(w, i); } catch { return L(i) + 0.3; } };
const rnd = (i) => { const x = Math.sin(i * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };
const KAB = { shirt: '#c9822a', pants: '#2a2f3a', skin: '#b97a55', glasses: true, chubby: true, hair: 'messy' }, TAN = { shirt: '#2f6f6a', pants: '#1d2230', skin: '#c99273', hair: 'pony', bag: '#7a2f4a' }, MAA = { shirt: '#7a1f2b', pants: '#7a1f2b', skin: '#c08560', hair: 'bun', bindi: true, dupatta: '#c9a227' };
function city(t, o = {}) {
  const sky = ctx.createLinearGradient(0, -400, 0, 1300); sky.addColorStop(0, '#030207'); sky.addColorStop(0.6, '#20060c'); sky.addColorStop(1, '#3d0a0c'); ctx.fillStyle = sky; ctx.fillRect(-600, -800, W + 1200, 2400);
  if (o.clock !== false) N.skyClock(540, o.cy ?? 380, o.cr ?? 230, o.clock || '96', t, { flick: o.flick ?? 1 });
  // high-rise skyline with lit windows + a blinking tower light
  for (let i = 0, x = -260; x < W + 260; i++) { const w = 120 + rnd(i) * 140, h = 240 + rnd(i + 4) * 300, y0 = 1080 - h; ctx.fillStyle = ['#120a10', '#160c12', '#0f0910'][i % 3]; ctx.fillRect(x, y0, w, h + 40);
    for (let r = 0; r < h / 46 - 1; r++) for (let c = 0; c < w / 34 - 1; c++) if (rnd(i * 131 + r * 7 + c) > 0.72) { ctx.fillStyle = rnd(r + c + i) > 0.5 ? 'rgba(255,190,110,.75)' : 'rgba(170,200,255,.55)'; ctx.fillRect(x + 14 + c * 34, y0 + 24 + r * 46, 16, 20); }
    if (i % 4 === 1) { ctx.fillStyle = Math.sin(t * 3 + i) > 0 ? '#ff2a1a' : '#4a0805'; ctx.beginPath(); ctx.arc(x + w / 2, y0 - 10, 7, 0, 7); ctx.fill(); }
    x += w + 6; }
  N.haze(760, 1120, '120,15,15', 0.32);
  // metro flyover with a train passing
  ctx.fillStyle = '#0a0709'; ctx.fillRect(-200, 990, W + 400, 34); for (let x = -100; x < W + 200; x += 240) ctx.fillRect(x, 1024, 26, 200);
  const tx = ((t * 260) % 2600) - 1400; for (let k = 0; k < 4; k++) { rr(tx + k * 250, 930, 240, 60, 12); ctx.fillStyle = '#1a1a22'; ctx.fill(); for (let w = 0; w < 6; w++) { ctx.fillStyle = 'rgba(200,230,255,.8)'; ctx.fillRect(tx + k * 250 + 14 + w * 37, 944, 26, 20); } }
  // billboard
  if (o.billboard !== false) { ctx.fillStyle = '#0b0b0d'; ctx.fillRect(700, 760, 12, 230); rr(560, 640, 330, 140, 10); ctx.fillStyle = '#f2efe6'; ctx.fill(); font(30, 900); ctx.fillStyle = '#b3121b'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('BOARD EXAMS', 725, 685); font(44, 900); ctx.fillStyle = '#111'; ctx.fillText('96 DAYS LEFT', 725, 738); }
  // street level: coaching centre, chai stall, auto
  ctx.fillStyle = '#1d1416'; ctx.fillRect(-200, 1100, W + 400, 900); ctx.fillStyle = '#26191a'; ctx.fillRect(-60, 1080, 520, 260); rr(-20, 1100, 440, 70, 8); ctx.fillStyle = '#e6c84a'; ctx.fill(); font(34, 900); ctx.fillStyle = '#1a1a1a'; ctx.textAlign = 'center'; ctx.fillText('TOPPERS ACADEMY', 200, 1137);
  ctx.fillStyle = '#ffd08a'; for (let k = 0; k < 3; k++) rr(10 + k * 140, 1200, 110, 120, 6), ctx.fill();
  ctx.fillStyle = '#2b1d14'; ctx.fillRect(760, 1210, 260, 120); ctx.fillStyle = '#5a2a1a'; ctx.fillRect(740, 1180, 300, 34); font(26, 900); ctx.fillStyle = '#ffdf9a'; ctx.fillText('CHAI', 890, 1199);
  for (let k = 0; k < 3; k++) { const st = (t * 0.6 + k / 3) % 1; withA(1 - st, () => { ctx.fillStyle = 'rgba(220,220,230,.35)'; ctx.beginPath(); ctx.arc(830 + k * 20 + Math.sin(st * 6) * 10, 1170 - st * 90, 10 + st * 18, 0, 7); ctx.fill(); }); }
  ctx.fillStyle = '#c9a227'; rr(470, 1260, 180, 100, 30); ctx.fill(); ctx.fillStyle = '#111'; ctx.beginPath(); ctx.arc(500, 1370, 22, 0, 7); ctx.arc(620, 1370, 22, 0, 7); ctx.fill(); ctx.fillStyle = '#0d1a14'; rr(500, 1272, 70, 50, 10); ctx.fill();
  const rd = ctx.createLinearGradient(0, 1340, 0, 1920); rd.addColorStop(0, '#120a0c'); rd.addColorStop(1, '#050405'); ctx.fillStyle = rd; ctx.fillRect(-600, 1340, W + 1200, 700);
  ctx.fillStyle = 'rgba(255,40,30,.16)'; ctx.beginPath(); ctx.ellipse(540, 1520, 160, 220, 0, 0, 7); ctx.fill();
  // students looking up at the sky (silhouettes with bags)
  if (o.crowd !== false) for (let k = 0; k < 9; k++) { const x = 40 + k * 120 + rnd(k) * 40, sc = 0.75 + rnd(k + 3) * 0.2; ctx.save(); ctx.translate(x, 1560); ctx.scale(sc, sc); ctx.fillStyle = '#07060a'; rr(-34, -230, 68, 150, 24); ctx.fill(); ctx.beginPath(); ctx.ellipse(0, -270, 32, 38, rnd(k) * 0.3 - 0.15, 0, 7); ctx.fill(); ctx.fillRect(-26, -90, 20, 90); ctx.fillRect(6, -90, 20, 90); ctx.fillStyle = '#2a0c10'; rr(26, -220, 26, 90, 8); ctx.fill(); ctx.restore(); }
}
function cityLights(o = {}) { return [{ x: 540, y: o.cy ?? 380, r: 1500, c: [255, 40, 30], i: 0.55 }, { x: 200, y: 1250, r: 520, c: [255, 200, 120], i: 0.65 }, { x: 890, y: 1220, r: 420, c: [255, 180, 100], i: 0.7 }, { x: 725, y: 710, r: 380, c: [240, 240, 255], i: 0.5 }, { x: 540, y: 960, r: 900, c: [140, 60, 70], i: 0.3 }]; }
function chatUI(x, y, w, k, t) { ctx.fillStyle = '#0b141a'; ctx.fillRect(x, y, w, 2000); ctx.fillStyle = '#1f2c34'; ctx.fillRect(x, y, w, 170); ctx.fillStyle = '#ff5a8a'; ctx.beginPath(); ctx.arc(x + 70, y + 100, 34, 0, 7); ctx.fill(); font(36, 900); ctx.fillStyle = '#fff'; ctx.textAlign = 'left'; ctx.textBaseline = 'middle'; ctx.fillText('BOARDS SQUAD 💀', x + 120, y + 88); font(24, 700); ctx.fillStyle = '#8aa'; ctx.fillText('Kabir, Tanya, You', x + 120, y + 126);
  const msgs = [['Kabir', 'DATESHEET AA GAYI 😭', '#ffb03b'], ['Tanya', 'Pehla paper: 96 din.', '#4fd1a5'], ['Kabir', 'abhi bahut time hai 🙂', '#ffb03b']];
  msgs.forEach(([who, m, c], i) => { const a = clamp(k * 3.2 - i * 0.9); if (a <= 0) return; withA(a, () => { const yy = y + 220 + i * 170; rrp(x + 24, yy, w - 60, 150, 26); ctx.fillStyle = '#1f2c34'; ctx.fill(); font(32, 900); ctx.fillStyle = c; ctx.fillText(who, x + 54, yy + 42); font(42, 900); ctx.fillStyle = '#fff'; ctx.fillText(m, x + 60, yy + 95); }); }); }
const AAR = { shirt: '#1f2a3d', pants: '#15171d', skin: '#c58b66', hair: 'messy' }, ROH = { shirt: '#6e2323', pants: '#22252c', skin: '#bd8160', hairC: '#140d09' };

/* ---------- sets ---------- */
function street(t, o = {}) {   // camera space 1080x1920; o.clock: txt, o.cy: clock y, o.examiner: rise 0..1
  const sky = ctx.createLinearGradient(0, -400, 0, 1300); sky.addColorStop(0, '#030207'); sky.addColorStop(0.55, '#1a050b'); sky.addColorStop(0.85, '#3d0a0c'); sky.addColorStop(1, '#1a0608'); ctx.fillStyle = sky; ctx.fillRect(-600, -800, W + 1200, 2400);
  for (let i = 0; i < 80; i++) { ctx.fillStyle = `rgba(255,255,255,${0.15 + rnd(i) * 0.4})`; ctx.fillRect(rnd(i + 3) * W, rnd(i + 5) * 600 - 200, 2, 2); }
  if (o.clock !== false) N.skyClock(540, o.cy ?? 420, o.cr ?? 250, o.clock || '96', t, { flick: o.flick ?? 1, crack: o.crack });
  if (o.examiner) N.examiner(540, lerp(1700, 1000, o.examiner), 1.15, t);
  // far skyline: flat-roof houses with water tanks
  ctx.fillStyle = '#0c0508'; for (let i = 0, x = -200; x < W + 200; i++) { const w = 90 + rnd(i) * 110, h = 140 + rnd(i + 9) * 220; ctx.fillRect(x, 1080 - h, w, h + 20); if (rnd(i + 2) > 0.4) rr(x + w * 0.3, 1080 - h - 40, 50, 40, 8), ctx.fill(); x += w - 4; }
  N.haze(820, 1120, '120,15,15', 0.35);
  // mid row: houses either side of the street with lit windows + balconies
  const side = (sx, dir) => { for (let k = 0; k < 4; k++) { const x0 = sx + dir * k * 120, w = 260 - k * 40, h = 520 - k * 70, y0 = 1180 - h + k * 40, xx = dir > 0 ? x0 : x0 - w;
      ctx.fillStyle = ['#2a1c1a', '#241a1d', '#2c201c', '#1f1820'][k]; ctx.fillRect(xx, y0, w, h + 300);
      for (let f = 0; f < 3; f++) for (let c = 0; c < 2; c++) { const on = rnd(k * 9 + f * 3 + c + (dir > 0 ? 50 : 0)) > 0.45; const wx = xx + 30 + c * (w * 0.5), wy = y0 + 50 + f * 150; rr(wx, wy, w * 0.28, 80, 4); ctx.fillStyle = on ? '#ffb257' : '#0a0809'; ctx.fill(); if (on) N.glow(...N.toScreen(wx + w * 0.14, wy + 40), 90, '255,160,70', 0.35); }
      ctx.fillStyle = '#0b0b0d'; ctx.fillRect(xx, y0 + 180, w, 10); for (let r = 0; r < w; r += 18) ctx.fillRect(xx + r, y0 + 140, 4, 40); } };
  side(-40, 1); side(W + 40, -1);
  // electricity poles + sagging wires
  ctx.strokeStyle = '#08080a'; ctx.lineWidth = 16; for (const [x, y0] of [[150, 560], [930, 600]]) { ctx.beginPath(); ctx.moveTo(x, y0); ctx.lineTo(x + (x < 540 ? 10 : -10), 1600); ctx.stroke(); ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(x - 60, y0 + 30); ctx.lineTo(x + 60, y0 + 30); ctx.stroke(); ctx.lineWidth = 16; }
  ctx.lineWidth = 3; for (let k = 0; k < 4; k++) { ctx.beginPath(); ctx.moveTo(-100, 520 + k * 22); ctx.quadraticCurveTo(540, 700 + k * 20, W + 100, 560 + k * 24); ctx.stroke(); }
  // street: wet asphalt with reflections
  const rd = ctx.createLinearGradient(0, 1180, 0, 1920); rd.addColorStop(0, '#120a0c'); rd.addColorStop(1, '#050405'); ctx.fillStyle = rd; ctx.fillRect(-600, 1180, W + 1200, 900);
  ctx.fillStyle = 'rgba(255,40,30,.18)'; ctx.beginPath(); ctx.ellipse(540, 1350, 120, 260, 0, 0, 7); ctx.fill();
  for (let k = 0; k < 7; k++) { ctx.fillStyle = 'rgba(220,210,170,.55)'; const y = 1210 + k * k * 14, w = 6 + k * 4; ctx.fillRect(540 - w / 2, y, w, 18 + k * 8); }
  // street lamps
  for (const [x, y] of [[270, 840], [820, 820]]) { ctx.strokeStyle = '#0a0a0c'; ctx.lineWidth = 10; ctx.beginPath(); ctx.moveTo(x, 1260); ctx.lineTo(x, y); ctx.lineTo(x + (x < 540 ? 50 : -50), y - 20); ctx.stroke(); }
}
function streetLights(o = {}) { return [{ x: 540, y: (o.cy ?? 420), r: 1500, c: [255, 40, 30], i: 0.55 }, { x: 320, y: 830, r: 420, c: [255, 170, 90], i: 0.7 }, { x: 770, y: 810, r: 420, c: [255, 170, 90], i: 0.7 }, { x: 540, y: 1500, r: 900, c: [120, 40, 50], i: 0.3 }]; }

function bedroom(t, o = {}) {
  // wall: deep blue plaster with texture, wooden floor
  const wg = ctx.createLinearGradient(0, 0, 0, 1300); wg.addColorStop(0, '#1d2333'); wg.addColorStop(1, '#141824'); ctx.fillStyle = wg; ctx.fillRect(-600, -600, W + 1200, 1900);
  for (let i = 0; i < 260; i++) { ctx.fillStyle = `rgba(255,255,255,${0.012 + rnd(i) * 0.02})`; ctx.fillRect(rnd(i + 1) * (W + 400) - 200, rnd(i + 2) * 1300, 30 + rnd(i + 3) * 80, 2 + rnd(i) * 3); }
  ctx.fillStyle = '#3a2618'; ctx.fillRect(-600, 1260, W + 1200, 800); for (let k = 0; k < 12; k++) { ctx.fillStyle = 'rgba(0,0,0,.25)'; ctx.fillRect(-600, 1260 + k * 60, W + 1200, 3); }
  ctx.fillStyle = '#0e1018'; ctx.fillRect(-600, 1236, W + 1200, 26);
  // window (right) with the red sky + clock + town + rain on glass
  const wx = o.winX ?? 600, wy = 330, ww = 400, wh = 500;
  ctx.save(); ctx.beginPath(); ctx.rect(wx, wy, ww, wh); ctx.clip();
  const sk = ctx.createLinearGradient(0, wy, 0, wy + wh); sk.addColorStop(0, '#120306'); sk.addColorStop(1, '#4a0b0d'); ctx.fillStyle = sk; ctx.fillRect(wx, wy, ww, wh);
  if (o.clock !== false) N.skyClock(wx + ww * 0.55, wy + 170, 120, o.clock || '96', t, { flick: o.flick ?? 1 });
  if (o.sil >= 0 && o.sil !== undefined) { const sx = wx + ww * (1.1 - o.sil * 0.8); ctx.fillStyle = '#030203'; ctx.beginPath(); ctx.ellipse(sx, wy + 150, 46, 56, 0, 0, 7); ctx.fill(); ctx.fillRect(sx - 80, wy + 200, 160, 400); ctx.fillStyle = '#ff2a1a'; ctx.beginPath(); ctx.arc(sx + 70, wy + 330, 6, 0, 7); ctx.fill(); }
  if (o.eye) N.giantEye(wx + ww * 0.5 + o.eyeX, wy + 250, 150, t, { look: -0.6, lid: 0.15 });
  ctx.fillStyle = '#0a0406'; for (let i = 0; i < 8; i++) { const h = 60 + rnd(i) * 120; ctx.fillRect(wx + i * 52 - 10, wy + wh - h, 56, h); }
  ctx.strokeStyle = 'rgba(200,210,255,.35)'; ctx.lineWidth = 2; for (let i = 0; i < 46; i++) { const x = wx + rnd(i) * ww, y = wy + ((rnd(i + 7) * wh + t * (60 + rnd(i) * 80)) % wh); ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 2, y + 12 + rnd(i) * 26); ctx.stroke(); }
  ctx.restore();
  ctx.strokeStyle = '#2b2f3b'; ctx.lineWidth = 22; ctx.strokeRect(wx, wy, ww, wh); ctx.lineWidth = 10; ctx.beginPath(); ctx.moveTo(wx + ww / 2, wy); ctx.lineTo(wx + ww / 2, wy + wh); ctx.moveTo(wx, wy + wh * 0.5); ctx.lineTo(wx + ww, wy + wh * 0.5); ctx.stroke();
  ctx.fillStyle = '#2b2f3b'; ctx.fillRect(wx - 30, wy + wh + 8, ww + 60, 22);
  // poster + shelf + books
  rr(120, 380, 200, 270, 6); ctx.fillStyle = '#2a2f45'; ctx.fill(); ctx.fillStyle = '#d9b44a'; font(40, 900); ctx.textAlign = 'center'; ctx.fillText('DREAM', 220, 500); ctx.fillText('BIG', 220, 548);
  ctx.fillStyle = '#2a1d14'; ctx.fillRect(80, 760, 360, 16); const bc = ['#7a2b2b', '#2b4a7a', '#2b6a4a', '#8a6a2b', '#5a2b7a']; for (let i = 0; i < 9; i++) { ctx.fillStyle = bc[i % 5]; ctx.fillRect(96 + i * 36, 690 - (i % 3) * 10, 28, 70 + (i % 3) * 10); }
  // bed (left) with blanket + pillow
  ctx.fillStyle = '#2a1c14'; rr(-60, 1040, 640, 230, 10); ctx.fill(); ctx.fillStyle = '#3d4a63'; rr(-60, 1000, 640, 90, 24); ctx.fill(); ctx.fillStyle = '#2c3850'; rr(200, 990, 380, 110, 30); ctx.fill(); ctx.fillStyle = '#c9c6bd'; rr(-40, 960, 220, 70, 30); ctx.fill();
  ctx.fillStyle = '#1a120c'; ctx.fillRect(-60, 820, 30, 450);
  // desk (right, under window)
  ctx.fillStyle = '#3a2618'; ctx.fillRect(640, 1000, 420, 24); ctx.fillRect(660, 1024, 22, 240); ctx.fillRect(1020, 1024, 22, 240);
  if (o.deskPhone) { rr(800, 984, 90, 18, 4); ctx.fillStyle = '#050505'; ctx.fill(); if (o.deskPhone > 0) { ctx.fillStyle = `rgba(150,190,255,${o.deskPhone})`; rr(804, 984, 82, 8, 3); ctx.fill(); } }
}

/* ---------- phone UI (Zeta Galaxy) ---------- */
function rrp(x, y, w, h, r) { ctx.beginPath(); ctx.roundRect(x, y, w, h, r); }
function phoneFrame(cx, cy, k, draw) { const w = 640, h = 1300, x = cx - w / 2, y = cy - h / 2; ctx.save(); ctx.translate(cx, cy); ctx.scale(k, k); ctx.translate(-cx, -cy);
  ctx.shadowColor = 'rgba(120,150,255,.5)'; ctx.shadowBlur = 80; rrp(x, y, w, h, 70); ctx.fillStyle = '#050506'; ctx.fill(); ctx.shadowBlur = 0; ctx.save(); rrp(x + 22, y + 22, w - 44, h - 44, 52); ctx.clip(); draw(x + 22, y + 22, w - 44, h - 44); ctx.restore(); ctx.restore(); }
function zHead(x, y, w, title, sub) { ctx.fillStyle = '#0d0b1f'; ctx.fillRect(x, y, w, 2000); const g = ctx.createLinearGradient(x, y, x + w, y + 260); g.addColorStop(0, '#3b1d7a'); g.addColorStop(1, '#1a1240'); ctx.fillStyle = g; ctx.fillRect(x, y, w, 270);
  rrp(x + 36, y + 70, 64, 64, 18); ctx.fillStyle = '#ff4fa0'; ctx.fill(); font(42, 900); ctx.fillStyle = '#fff'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('Z', x + 68, y + 104); ctx.textAlign = 'left'; font(34, 800); ctx.fillText('ZetaGalaxy', x + 116, y + 104);
  font(48, 900); ctx.fillText(title, x + 36, y + 190); font(26, 800); ctx.fillStyle = '#c9b8ff'; ctx.fillText(sub, x + 36, y + 236); }
function uiPlan(x, y, w, k) { zHead(x, y, w, 'Ace My Exams', 'Day-by-day plan · hardest first'); font(30, 900); ctx.fillStyle = '#ffd43b'; ctx.fillText("TODAY'S MISSION", x + 36, y + 320);
  [['Triangles · learn', '40m', '#ff5a5a'], ['Revise · Real Numbers', '15m', '#ffb03b'], ['Quiz · Trigonometry', '10m', '#4fd1a5']].forEach(([a, b, c], i) => { const on = clamp(k * 3 - i * 0.6); withA(0.25 + 0.75 * on, () => { rrp(x + 36, y + 360 + i * 130, w - 72, 110, 24); ctx.fillStyle = '#1d1838'; ctx.fill(); rrp(x + 36, y + 360 + i * 130, 14, 110, 7); ctx.fillStyle = c; ctx.fill(); font(34, 800); ctx.fillStyle = '#fff'; ctx.fillText(a, x + 72, y + 418 + i * 130); ctx.textAlign = 'right'; ctx.fillStyle = '#9c95c9'; ctx.fillText(b, x + w - 60, y + 418 + i * 130); ctx.textAlign = 'left'; }); });
  font(28, 800); ctx.fillStyle = '#9c95c9'; ctx.fillText('96 DAYS · PLAN READY', x + 36, y + 800); for (let i = 0; i < 24; i++) { rrp(x + 36 + (i % 8) * 64, y + 830 + Math.floor(i / 8) * 64, 50, 50, 10); ctx.fillStyle = i === 0 ? '#ff4fa0' : '#221c44'; ctx.fill(); }
  font(28, 800); ctx.fillStyle = '#4fd1a5'; ctx.fillText('Missed a day? Plan adjusted', x + 36, y + 1080); }
function uiMap(x, y, w, k) { zHead(x, y, w, 'Exam insights', 'Maths · 104 real board papers');
  [['Triangles ▲', 11.5], ['Trigonometry', 8.9], ['Circles ▼', 8.1], ['Linear Equations ▲', 7.8], ['Quadratic Eq. ▲', 7.8], ['Real Numbers', 7.4]].forEach(([n, v], i) => { const p = eo(clamp(k * 2.2 - i * 0.18)), yy = y + 330 + i * 112; font(30, 800); ctx.fillStyle = '#fff'; ctx.fillText(n, x + 36, yy); rrp(x + 36, yy + 18, w - 72, 36, 18); ctx.fillStyle = '#221c44'; ctx.fill(); rrp(x + 36, yy + 18, Math.max(36, (w - 72) * v / 12 * p), 36, 18); ctx.fillStyle = i === 0 ? '#ff4f6a' : '#8b6bff'; ctx.fill(); ctx.textAlign = 'right'; ctx.fillStyle = '#ffd43b'; ctx.fillText((v * p).toFixed(1) + ' marks', x + w - 36, yy); ctx.textAlign = 'left'; });
  if (k > 0.6) withA(clamp((k - 0.6) * 4), () => { rrp(x + 36, y + 1020, w - 72, 150, 26); ctx.fillStyle = '#ffd43b'; ctx.fill(); font(40, 900); ctx.fillStyle = '#120e24'; ctx.fillText('6 chapters ≈ 52% marks', x + 62, y + 1085); font(28, 800); ctx.fillText('revise these first', x + 62, y + 1135); }); }
function uiNotStarted(x, y, w, t) { zHead(x, y, w, 'Rohan · Plan', 'Last year'); const p = 0.5 + 0.5 * Math.sin(t * 6); rrp(x + 36, y + 320, w - 72, 280, 30); ctx.fillStyle = `rgba(255,40,40,${0.18 + 0.2 * p})`; ctx.fill(); ctx.strokeStyle = '#ff3b3b'; ctx.lineWidth = 4; ctx.stroke();
  font(44, 900); ctx.fillStyle = '#ff6b6b'; ctx.fillText('DAY 1', x + 70, y + 400); font(64, 900); ctx.fillStyle = '#fff'; ctx.fillText('NOT STARTED', x + 70, y + 490); font(30, 700); ctx.fillStyle = '#c9a0a0'; ctx.fillText('0 of 96 missions done', x + 70, y + 555);
  for (let i = 0; i < 24; i++) { rrp(x + 36 + (i % 8) * 64, y + 660 + Math.floor(i / 8) * 64, 50, 50, 10); ctx.fillStyle = '#2a1416'; ctx.fill(); } }

const PHONE = (x, s = 1.25) => ({ x, y: 1230 - 258 * s, r: 260, c: [150, 185, 255], i: 1 });
const WIN = (i = 0.85) => ({ x: 800, y: 560, r: 520, c: [255, 40, 30], i });
const ROHG = { ...ROH };
/* ---------- Ep 4 sets ---------- */
const LAMPS = [160, 340, 540, 740, 920];
function library(t, o = {}) {   // dark city library at night; o.lit: array of 0..1 per lamp, o.clock
  const wg = ctx.createLinearGradient(0, 0, 0, 1300); wg.addColorStop(0, '#1a1410'); wg.addColorStop(1, '#120d0b'); ctx.fillStyle = wg; ctx.fillRect(-600, -600, W + 1200, 1900);
  // tall window centre-back with red sky + clock
  const wx = 380, wy = 300, ww = 320, wh = 440; ctx.save(); ctx.beginPath(); ctx.rect(wx, wy, ww, wh); ctx.clip(); const sk = ctx.createLinearGradient(0, wy, 0, wy + wh); sk.addColorStop(0, '#140306'); sk.addColorStop(1, '#4a0b0d'); ctx.fillStyle = sk; ctx.fillRect(wx, wy, ww, wh);
  if (o.clock !== false) N.skyClock(wx + ww / 2, wy + 170, 110, o.clock || '93', t, { flick: o.flick ?? 1 }); ctx.fillStyle = '#0a0406'; for (let i = 0; i < 7; i++) { const h = 50 + rnd(i + 40) * 110; ctx.fillRect(wx + i * 50 - 6, wy + wh - h, 52, h); } ctx.restore();
  ctx.strokeStyle = '#2a2018'; ctx.lineWidth = 18; ctx.strokeRect(wx, wy, ww, wh); ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(wx + ww / 2, wy); ctx.lineTo(wx + ww / 2, wy + wh); ctx.stroke(); ctx.beginPath(); ctx.arc(wx + ww / 2, wy, ww / 2, Math.PI, 0); ctx.stroke();
  // shelves both sides
  const cols = ['#6a2a22', '#2a3e5a', '#2a5a3e', '#6a5222', '#4a2a5a', '#2a5a58'];
  for (const [x0, x1] of [[-200, 340], [740, 1280]]) { ctx.fillStyle = '#2a1c12'; ctx.fillRect(x0, 220, x1 - x0, 1040);
    for (let sh = 0; sh < 6; sh++) { const y = 260 + sh * 160; ctx.fillStyle = '#3d2a1a'; ctx.fillRect(x0, y + 130, x1 - x0, 14);
      for (let i = 0, x = x0 + 10; x < x1 - 30; i++) { const w = 22 + rnd(i * 7 + sh + x0) * 20, h = 80 + rnd(i + sh * 9 + x0) * 40; ctx.fillStyle = cols[(i + sh) % 6]; ctx.fillRect(x, y + 130 - h, w, h); x += w + 3; } } }
  // floor + long table
  ctx.fillStyle = '#20160f'; ctx.fillRect(-600, 1240, W + 1200, 800); for (let k = 0; k < 10; k++) { ctx.fillStyle = 'rgba(0,0,0,.25)'; ctx.fillRect(-600, 1240 + k * 70, W + 1200, 3); }
  ctx.fillStyle = '#4a3020'; ctx.fillRect(80, 1040, 920, 26); ctx.fillStyle = '#33210f'; ctx.fillRect(110, 1066, 22, 190); ctx.fillRect(948, 1066, 22, 190);
  if (o.books !== false) { ctx.fillStyle = '#e9e4d6'; ctx.save(); ctx.translate(540, 1036); ctx.rotate(-0.03); ctx.fillRect(-120, -10, 240, 12); ctx.restore(); ctx.fillStyle = '#7a2b2b'; ctx.fillRect(780, 1000, 70, 40); ctx.fillStyle = '#2b4a7a'; ctx.fillRect(790, 970, 60, 30); }
  // hanging lamps
  const lit = o.lit || LAMPS.map(() => 1);
  LAMPS.forEach((x, k) => { const a = lit[k] ?? 1; ctx.strokeStyle = '#0a0806'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x, -200); ctx.lineTo(x, 760); ctx.stroke(); ctx.fillStyle = '#1a1612'; ctx.beginPath(); ctx.moveTo(x - 60, 820); ctx.lineTo(x + 60, 820); ctx.lineTo(x + 26, 760); ctx.lineTo(x - 26, 760); ctx.fill();
    ctx.fillStyle = a > 0.05 ? `rgba(255,214,140,${0.3 + 0.7 * a})` : '#2a2420'; ctx.beginPath(); ctx.ellipse(x, 822, 56, 10, 0, 0, 7); ctx.fill(); });
}
function libLights(lit, extra = []) { return [...LAMPS.map((x, k) => ({ x, y: 900, r: 560, c: [255, 200, 130], i: 0.85 * (lit ? lit[k] ?? 1 : 1) })), { x: 540, y: 470, r: 420, c: [255, 40, 30], i: 0.6 }, ...extra]; }
function libraryFront(t, o = {}) {   // exterior: steps + door + sign, red sky
  const sky = ctx.createLinearGradient(0, -300, 0, 1200); sky.addColorStop(0, '#030207'); sky.addColorStop(1, '#3d0a0c'); ctx.fillStyle = sky; ctx.fillRect(-600, -600, W + 1200, 2400);
  N.skyClock(860, 300, 130, '93', t, { flick: 1 });
  ctx.fillStyle = '#231a18'; ctx.fillRect(60, 440, 960, 760); for (let c = 0; c < 6; c++) { ctx.fillStyle = '#2e2420'; ctx.fillRect(110 + c * 170, 560, 56, 640); }
  ctx.fillStyle = '#c9b48a'; rr(260, 470, 560, 80, 8); ctx.fill(); font(48, 900); ctx.fillStyle = '#2a1a10'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('CITY LIBRARY', 540, 512);
  ctx.fillStyle = '#100a08'; rr(430, 760, 220, 440, 14); ctx.fill(); ctx.fillStyle = 'rgba(255,200,120,.5)'; rr(450, 780, 180, 400, 10); ctx.fill();
  for (let k = 0; k < 5; k++) { ctx.fillStyle = ['#3a302c', '#342a26', '#2e2521', '#28201c', '#221a17'][k]; ctx.fillRect(160 - k * 40, 1200 + k * 60, 760 + k * 80, 62); ctx.fillStyle = 'rgba(0,0,0,.35)'; ctx.fillRect(160 - k * 40, 1200 + k * 60, 760 + k * 80, 6); }
  ctx.fillStyle = '#0c0808'; ctx.fillRect(-600, 1500, W + 1200, 600);
}
function inkDrop(x, y, s, t) { N.glow(...N.toScreen(x, y), 120 * s, '255,30,20', 0.5 + 0.2 * Math.sin(t * 5)); ctx.fillStyle = '#c4100c'; ctx.beginPath(); ctx.moveTo(x, y - 34 * s); ctx.quadraticCurveTo(x + 22 * s, y - 4 * s, x + 18 * s, y + 10 * s); ctx.arc(x, y + 10 * s, 18 * s, 0, Math.PI); ctx.quadraticCurveTo(x - 22 * s, y - 4 * s, x, y - 34 * s); ctx.fill(); ctx.fillStyle = 'rgba(196,16,12,.7)'; ctx.beginPath(); ctx.ellipse(x + 6 * s, y + 30 * s, 40 * s, 9 * s, 0, 0, 7); ctx.fill(); }
/* ---------- Ep 4 phone UIs ---------- */
function uiMission(x, y, w, k) { zHead(x, y, w, 'Ace My Exams', "Today's mission · hardest first"); font(30, 900); ctx.fillStyle = '#ffd43b'; ctx.fillText("TODAY'S MISSION", x + 36, y + 320);
  [['Triangles · learn', '40m', '#ff5a5a'], ['Revise · Real Numbers', '15m', '#ffb03b'], ['Quiz · Triangles', '10m', '#4fd1a5']].forEach(([a, b, c], i) => { const on = clamp(k * 3 - i * 0.6); withA(0.25 + 0.75 * on, () => { rrp(x + 36, y + 360 + i * 130, w - 72, 110, 24); ctx.fillStyle = i === 0 ? '#3a1830' : '#1d1838'; ctx.fill(); rrp(x + 36, y + 360 + i * 130, 14, 110, 7); ctx.fillStyle = c; ctx.fill(); font(34, 800); ctx.fillStyle = '#fff'; ctx.fillText(a, x + 72, y + 418 + i * 130); ctx.textAlign = 'right'; ctx.fillStyle = '#9c95c9'; ctx.fillText(b, x + w - 60, y + 418 + i * 130); ctx.textAlign = 'left'; }); });
  font(28, 800); ctx.fillStyle = '#9c95c9'; ctx.fillText('93 DAYS LEFT · DAY 4', x + 36, y + 800); for (let i = 0; i < 24; i++) { rrp(x + 36 + (i % 8) * 64, y + 830 + Math.floor(i / 8) * 64, 50, 50, 10); ctx.fillStyle = i < 3 ? '#4fd1a5' : i === 3 ? '#ff4fa0' : '#221c44'; ctx.fill(); } }
function uiReady(x, y, w, k) { zHead(x, y, w, 'Readiness', 'Maths · by topic'); const p = eo(clamp(k * 1.6));
  [['Triangles', 12, 27], ['Real Numbers', 34, 34], ['Trigonometry', 9, 9], ['Circles', 5, 5]].forEach(([n, a, b], i) => { const v = lerp(a, b, p), yy = y + 340 + i * 130; font(32, 800); ctx.fillStyle = '#fff'; ctx.fillText(n, x + 36, yy); rrp(x + 36, yy + 22, w - 72, 38, 19); ctx.fillStyle = '#221c44'; ctx.fill(); rrp(x + 36, yy + 22, Math.max(38, (w - 72) * v / 100), 38, 19); ctx.fillStyle = i === 0 ? '#4fd1a5' : '#8b6bff'; ctx.fill(); ctx.textAlign = 'right'; ctx.fillStyle = i === 0 ? '#4fd1a5' : '#c9b8ff'; ctx.fillText(Math.round(v) + '%' + (i === 0 && p > 0.9 ? ' ▲' : ''), x + w - 36, yy); ctx.textAlign = 'left'; });
  if (k > 0.6) withA(clamp((k - 0.6) * 4), () => { rrp(x + 36, y + 900, w - 72, 130, 26); ctx.fillStyle = '#1f3a32'; ctx.fill(); font(32, 900); ctx.fillStyle = '#4fd1a5'; ctx.fillText('✓ Mission done', x + 66, y + 950); font(26, 800); ctx.fillStyle = '#c9e8dc'; ctx.fillText('Revision auto-scheduled', x + 66, y + 995); }); }
function uiKabir(x, y, w, k) { ctx.fillStyle = '#0b141a'; ctx.fillRect(x, y, w, 2000); ctx.fillStyle = '#1f2c34'; ctx.fillRect(x, y, w, 170); ctx.fillStyle = '#ffb03b'; ctx.beginPath(); ctx.arc(x + 70, y + 100, 34, 0, 7); ctx.fill(); font(38, 900); ctx.fillStyle = '#fff'; ctx.textAlign = 'left'; ctx.textBaseline = 'middle'; ctx.fillText('Kabir 🎮', x + 120, y + 100);
  [['l', 'MATCH #4 😎'], ['l', 'aaja bas ek, pakka'], ['r', 'mission chal raha hai 📚']].forEach(([s, m], i) => { const a = clamp(k * 3 - i * 0.8); if (a <= 0) return; withA(a, () => { font(40, 900); const tw = ctx.measureText(m).width + 60, yy = y + 240 + i * 150, xx = s === 'l' ? x + 30 : x + w - 30 - tw; rrp(xx, yy, tw, 110, 26); ctx.fillStyle = s === 'l' ? '#1f2c34' : '#005c4b'; ctx.fill(); ctx.fillStyle = '#fff'; ctx.fillText(m, xx + 30, yy + 56); }); }); }
function sepia() { screen(() => { ctx.save(); ctx.globalCompositeOperation = 'saturation'; ctx.fillStyle = 'hsl(0,0%,50%)'; ctx.fillRect(0, 0, W, H); ctx.globalCompositeOperation = 'color'; ctx.fillStyle = 'rgb(170,120,60)'; ctx.fillRect(0, 0, W, H); ctx.globalCompositeOperation = 'screen'; ctx.fillStyle = 'rgba(70,45,20,0.35)'; ctx.fillRect(0, 0, W, H); ctx.restore(); }); }
function triTip(t, k1, k2) {   // notebook page: two similar triangles, equal angles same colour
  ctx.fillStyle = '#f2ecdc'; ctx.fillRect(0, 0, W, H); ctx.strokeStyle = 'rgba(80,120,200,.25)'; ctx.lineWidth = 2; for (let y = 300; y < 1300; y += 56) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); } ctx.strokeStyle = 'rgba(220,60,60,.35)'; ctx.beginPath(); ctx.moveTo(140, 250); ctx.lineTo(140, 1300); ctx.stroke();
  const tri = (pts, s) => { ctx.strokeStyle = '#1a1a2a'; ctx.lineWidth = 6; ctx.beginPath(); pts.forEach((p, i) => (i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]))); ctx.closePath(); ctx.stroke();
    const C3 = ['#e0322a', '#2f9e57', '#3a6fd8']; pts.forEach((p, i) => { if (k2 <= 0) return; const a = pts[(i + 1) % 3], b = pts[(i + 2) % 3]; const a1 = Math.atan2(a[1] - p[1], a[0] - p[0]), a2 = Math.atan2(b[1] - p[1], b[0] - p[0]); let s1 = a1, e1 = a2; if (((e1 - s1) + 2 * Math.PI) % (2 * Math.PI) > Math.PI) { const q = s1; s1 = e1; e1 = q; }
      withA(clamp(k2 * 3 - i * 0.7), () => { ctx.fillStyle = C3[i]; ctx.globalAlpha *= 0.75; ctx.beginPath(); ctx.moveTo(p[0], p[1]); ctx.arc(p[0], p[1], 46 * s, s1, e1); ctx.closePath(); ctx.fill(); }); }); };
  withA(k1, () => { tri([[200, 820], [470, 820], [260, 560]], 1); tri([[560, 1080], [960, 1080], [650, 690]], 1.3);
    font(40, 900); ctx.fillStyle = '#1a1a2a'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('1. Pehle figure banao ✏️', 540, 380); });
  if (k2 > 0) withA(clamp(k2 * 2), () => { font(40, 900); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = '#b3121b'; ctx.fillText('2. Same angle = same rang', 540, 460); font(36, 900); ctx.fillStyle = '#1a1a2a'; ctx.fillText('AB/PQ = BC/QR = CA/RP', 540, 1180); }); }

/* ---------- Ep 5 sets ---------- */
const SHR = { shirt: '#d9d3c0', pants: '#33343c', skin: '#a8714f', hair: 'short', hairC: '#5e5e5e', glasses: true };
function tuition(t, o = {}) {   // small tuition room at night: blackboard, window with red sky, benches
  const wg = ctx.createLinearGradient(0, 0, 0, 1300); wg.addColorStop(0, '#1b2420'); wg.addColorStop(1, '#121915'); ctx.fillStyle = wg; ctx.fillRect(-600, -600, W + 1200, 1900);
  for (let i = 0; i < 200; i++) { ctx.fillStyle = `rgba(255,255,255,${0.01 + rnd(i) * 0.02})`; ctx.fillRect(rnd(i + 1) * (W + 400) - 200, rnd(i + 2) * 1250, 30 + rnd(i + 3) * 70, 2 + rnd(i) * 3); }
  // window (left) red sky + clock
  const wx = -40, wy = 330, ww = 260, wh = 420; ctx.save(); ctx.beginPath(); ctx.rect(wx, wy, ww, wh); ctx.clip(); const sk = ctx.createLinearGradient(0, wy, 0, wy + wh); sk.addColorStop(0, '#140306'); sk.addColorStop(1, '#4a0b0d'); ctx.fillStyle = sk; ctx.fillRect(wx, wy, ww, wh);
  if (o.clock !== false) N.skyClock(wx + ww * 0.55, wy + 150, 90, o.clock || '92', t, { flick: o.flick ?? 1 }); if (o.eye) N.giantEye(wx + ww * 0.5, wy + 220, 120, t, { look: 0.6, lid: 0.15 });
  ctx.fillStyle = '#0a0406'; for (let i = 0; i < 6; i++) { const h = 50 + rnd(i + 60) * 100; ctx.fillRect(wx + i * 46 - 6, wy + wh - h, 48, h); } ctx.restore();
  ctx.strokeStyle = '#26302b'; ctx.lineWidth = 18; ctx.strokeRect(wx, wy, ww, wh); ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(wx + ww / 2, wy); ctx.lineTo(wx + ww / 2, wy + wh); ctx.stroke(); for (let k = 1; k < 5; k++) { ctx.beginPath(); ctx.moveTo(wx, wy + k * wh / 5); ctx.lineTo(wx + ww, wy + k * wh / 5); ctx.stroke(); }
  // blackboard
  ctx.fillStyle = '#3a2a1a'; ctx.fillRect(290, 360, 700, 440); ctx.fillStyle = '#1d2b24'; ctx.fillRect(306, 376, 668, 408);
  font(52, 900); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = 'rgba(235,235,225,.85)'; ctx.fillText(o.board1 ?? 'HCF · LCM', 640, 470); font(40, 800); ctx.fillText(o.board2 ?? '12 = 2² × 3', 640, 560); ctx.fillText(o.board3 ?? '18 = 2 × 3²', 640, 630);
  if (o.surprise) { font(56, 900); ctx.fillStyle = '#ff5a4a'; ctx.save(); ctx.translate(640, 720); ctx.rotate(-0.04); ctx.fillText('SURPRISE TEST', 0, 0); ctx.restore(); }
  ctx.fillStyle = '#3a2a1a'; ctx.fillRect(300, 800, 680, 14);
  // sign
  rr(330, 250, 620, 70, 8); ctx.fillStyle = '#c9b48a'; ctx.fill(); font(36, 900); ctx.fillStyle = '#2a1a10'; ctx.textAlign = 'center'; ctx.fillText('SHARMA CLASSES · MATHS', 640, 286);
  // floor + benches
  ctx.fillStyle = '#1e1a16'; ctx.fillRect(-600, 1240, W + 1200, 800); for (let k = 0; k < 10; k++) { ctx.fillStyle = 'rgba(0,0,0,.25)'; ctx.fillRect(-600, 1240 + k * 70, W + 1200, 3); }
  ctx.fillStyle = '#4a3020'; ctx.fillRect(40, 1060, 1000, 24); ctx.fillStyle = '#33210f'; ctx.fillRect(70, 1084, 22, 170); ctx.fillRect(990, 1084, 22, 170);
  // tube light
  ctx.fillStyle = o.tube === 0 ? '#2a2a2a' : '#e8f4ff'; rr(420, 180, 440, 18, 9); ctx.fill();
}
function tuLights(extra = [], o = {}) { return [{ x: 640, y: 200, r: 1100, c: [210, 235, 255], i: (o.tube ?? 0.75) }, { x: 90, y: 500, r: 420, c: [255, 40, 30], i: 0.7 }, ...extra]; }
function redPen(x, y, s, rot) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); rr(-12, -170, 24, 150, 10); ctx.fillStyle = '#b3121b'; ctx.fill(); rr(-12, -200, 24, 40, 8); ctx.fillStyle = '#7a0a10'; ctx.fill(); ctx.fillStyle = '#d8d8d8'; rr(8, -190, 6, 70, 3); ctx.fill();
  ctx.fillStyle = '#e8e2d0'; ctx.beginPath(); ctx.moveTo(-12, -20); ctx.lineTo(12, -20); ctx.lineTo(0, 0); ctx.fill(); ctx.fillStyle = '#c4100c'; ctx.beginPath(); ctx.arc(0, -2, 4, 0, 7); ctx.fill(); ctx.restore(); }
function testPaper(cx, cy, rot, o = {}) { ctx.save(); ctx.translate(cx, cy); ctx.rotate(rot); ctx.shadowColor = 'rgba(0,0,0,.5)'; ctx.shadowBlur = 40; ctx.fillStyle = '#f4efe2'; ctx.fillRect(-300, -400, 600, 800); ctx.shadowBlur = 0;
  font(36, 900); ctx.fillStyle = '#1a1a2a'; ctx.textAlign = 'left'; ctx.textBaseline = 'middle'; ctx.fillText(o.title || 'TEST · REAL NUMBERS', -260, -340); ctx.fillStyle = 'rgba(80,120,200,.35)'; for (let k = 0; k < 11; k++) ctx.fillRect(-260, -280 + k * 58, 520, 2);
  font(30, 700); ctx.fillStyle = '#2b3a7a'; ['Q1. HCF(12, 18) = 6', 'Q2. LCM(12, 18) = 36', 'Q3. HCF × LCM = 12 × 18', 'Q4. 96 = 2⁵ × 3'].forEach((s, k) => ctx.fillText(s, -250, -230 + k * 116)); ctx.restore(); }
function primeTip(t, k1, k2, k3) {   // notebook: factor 12 and 18, HCF small power, LCM big power
  ctx.fillStyle = '#f2ecdc'; ctx.fillRect(0, 0, W, H); ctx.strokeStyle = 'rgba(80,120,200,.25)'; ctx.lineWidth = 2; for (let y = 300; y < 1300; y += 56) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); } ctx.strokeStyle = 'rgba(220,60,60,.35)'; ctx.beginPath(); ctx.moveTo(140, 250); ctx.lineTo(140, 1300); ctx.stroke();
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  withA(k1, () => { font(44, 900); ctx.fillStyle = '#1a1a2a'; ctx.fillText('1. Prime factors todo ✏️', 560, 380); font(76, 900); ctx.fillText('12 = 2² × 3', 560, 520); ctx.fillText('18 = 2 × 3²', 560, 630); });
  withA(k2, () => { rr(170, 720, 780, 170, 24); ctx.fillStyle = 'rgba(58,111,216,.14)'; ctx.fill(); font(40, 900); ctx.fillStyle = '#3a6fd8'; ctx.fillText('HCF: common · CHHOTI power', 560, 770); font(64, 900); ctx.fillText('2 × 3 = 6', 560, 845); });
  withA(k3, () => { rr(170, 930, 780, 170, 24); ctx.fillStyle = 'rgba(47,158,87,.14)'; ctx.fill(); font(40, 900); ctx.fillStyle = '#2f9e57'; ctx.fillText('LCM: sab · BADI power', 560, 980); font(64, 900); ctx.fillText('2² × 3² = 36', 560, 1055); font(34, 800); ctx.fillStyle = '#b3121b'; ctx.fillText('check: 6 × 36 = 12 × 18 ✓', 560, 1160); }); }
function stickyWall(t, k) { const wg = ctx.createLinearGradient(0, 0, 0, H); wg.addColorStop(0, '#1d2333'); wg.addColorStop(1, '#141824'); ctx.fillStyle = wg; ctx.fillRect(0, 0, W, H);
  ctx.save(); ctx.translate(540, 760); ctx.rotate(-0.05); ctx.shadowColor = 'rgba(0,0,0,.5)'; ctx.shadowBlur = 30; ctx.fillStyle = '#ffd43b'; ctx.fillRect(-300, -300, 600, 600); ctx.shadowBlur = 0; ctx.fillStyle = 'rgba(0,0,0,.08)'; ctx.fillRect(-300, -300, 600, 60);
  font(64, 900); ctx.fillStyle = '#1a1a2a'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('ROZ 5 MIN', 0, -150); ctx.fillText('BHAIYA KO', 0, -60); ctx.fillText('PADH KE', 0, 30); ctx.fillText('SUNAO', 0, 120);
  if (k > 0) { ctx.strokeStyle = '#2f9e57'; ctx.lineWidth = 22; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(150, 200); ctx.lineTo(150 + 40 * Math.min(1, k * 2), 200 + 40 * Math.min(1, k * 2)); if (k > 0.5) ctx.lineTo(190 + 90 * (k - 0.5) * 2, 240 - 120 * (k - 0.5) * 2); ctx.stroke(); } ctx.restore(); }
function diary(t, k) { ctx.fillStyle = '#0a0806'; ctx.fillRect(0, 0, W, H); ctx.save(); ctx.translate(540, 780); ctx.rotate(0.03); ctx.fillStyle = '#3a1418'; ctx.fillRect(-420, -480, 840, 960); ctx.fillStyle = '#efe6cf'; ctx.fillRect(-390, -450, 380, 900); ctx.fillRect(10, -450, 380, 900);
  ctx.fillStyle = 'rgba(0,0,0,.25)'; ctx.fillRect(-12, -450, 24, 900); ctx.fillStyle = 'rgba(80,120,200,.3)'; for (let r = 0; r < 14; r++) { ctx.fillRect(-370, -360 + r * 60, 340, 2); ctx.fillRect(30, -360 + r * 60, 340, 2); }
  font(34, 900); ctx.fillStyle = '#1a1a2a'; ctx.textAlign = 'left'; ctx.textBaseline = 'middle'; ctx.fillText('PURANE STUDENTS', 30, -400); font(30, 700); ctx.fillStyle = '#5a5a6a'; ctx.fillText('notes · fees · tests', -360, -400);
  for (let r = 0; r < 6; r++) { ctx.fillStyle = 'rgba(40,40,60,.35)'; ctx.fillRect(-360, -330 + r * 120, 200 + rnd(r) * 120, 14); }
  withA(clamp(k * 2), () => { font(52, 900); ctx.fillStyle = '#c4100c'; ctx.fillText('1. ROHAN', 40, -320); ctx.strokeStyle = '#c4100c'; ctx.lineWidth = 6; ctx.beginPath(); ctx.ellipse(150, -320, 150, 46, -0.05, 0, 7); ctx.stroke(); font(30, 800); ctx.fillText('“kal se pakka” ✗', 50, -250); });
  font(34, 700); ctx.fillStyle = 'rgba(40,40,60,.55)'; ['2. ———', '3. ———', '4. ———'].forEach((s, r) => ctx.fillText(s, 40, -150 + r * 100)); ctx.restore(); }
function tickPaper(t, k) { ctx.fillStyle = '#0c0b0a'; ctx.fillRect(0, 0, W, H); testPaper(540, 820, 0.03, { title: 'AARAV · SURPRISE TEST' }); if (k > 0) { ctx.save(); ctx.translate(560, 900); ctx.strokeStyle = '#c4100c'; ctx.lineWidth = 34; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); const a = Math.min(1, k * 2.5); ctx.moveTo(-180, 0); ctx.lineTo(-180 + 120 * a, 120 * a); if (k > 0.4) { const b = Math.min(1, (k - 0.4) * 2.5); ctx.lineTo(-60 + 300 * b, 120 - 360 * b); } ctx.stroke(); ctx.restore(); } }
function uiMission5(x, y, w, k) { zHead(x, y, w, 'Ace My Exams', "Today's mission · auto revision"); font(30, 900); ctx.fillStyle = '#ffd43b'; ctx.fillText("TODAY'S MISSION", x + 36, y + 320);
  [['Revise · Real Numbers', '15m', '#ffb03b'], ['HCF & LCM · prime factors', '20m', '#ff5a5a'], ['Quiz · Real Numbers', '10m', '#4fd1a5']].forEach(([a, b, c], i) => { const on = clamp(k * 3 - i * 0.6); withA(0.25 + 0.75 * on, () => { rrp(x + 36, y + 360 + i * 130, w - 72, 110, 24); ctx.fillStyle = '#1d1838'; ctx.fill(); rrp(x + 36, y + 360 + i * 130, 14, 110, 7); ctx.fillStyle = c; ctx.fill(); font(32, 800); ctx.fillStyle = '#fff'; ctx.fillText(a, x + 72, y + 418 + i * 130); ctx.textAlign = 'right'; ctx.fillStyle = on > 0.9 ? '#4fd1a5' : '#9c95c9'; ctx.fillText(on > 0.9 ? '✓' : b, x + w - 60, y + 418 + i * 130); ctx.textAlign = 'left'; }); });
  font(28, 800); ctx.fillStyle = '#9c95c9'; ctx.fillText('92 DAYS LEFT · DAY 5', x + 36, y + 800); for (let i = 0; i < 24; i++) { rrp(x + 36 + (i % 8) * 64, y + 830 + Math.floor(i / 8) * 64, 50, 50, 10); ctx.fillStyle = i < 4 ? '#4fd1a5' : i === 4 ? '#ff4fa0' : '#221c44'; ctx.fill(); }
  font(28, 800); ctx.fillStyle = '#4fd1a5'; ctx.fillText('Revision auto-scheduled', x + 36, y + 1080); }

export function buildShots() {
  const S = [], CUES = [], add = (o) => S.push({ cam: [540, 960], zoom: 0.03, punch: 0.02, ...o }), cue = (t, type, o = {}) => CUES.push({ t: +Math.max(0, t).toFixed(3), type, ...o });
  const cut = (i) => (i === 0 ? 0 : L(i) - 0.08);
  const Wl = (ls) => { const m = ctx.getTransform(); return ls.map((l) => ({ ...l, x: m.a * l.x + m.e, y: m.d * l.y + m.f, r: l.r * m.a })); };
  const fin = (t, lights, amb, o = {}) => { N.lightPass(lights, amb); if (o.rain) N.rain(t, o.rain); N.grade(t, o); };
  const lc = (lt, d, a, b) => lerp(a, b, eio(clamp(lt / d)));
  const ALT = 'AGAR REHNE DETA...';
  const sir = (x, s, o = {}) => { N.person(x, 1240, s, { ...SHR, arms: o.arms || 'down', mood: o.mood || 'ok', look: o.look ?? -0.3 }); if (o.pen !== false) { redPen(x + 52 * s, 1240 - 150 * s, 0.45 * s, o.penRot ?? -0.4); } };
  const kids = (t, o = {}) => { N.person(330, 1240, 1.0, { ...AAR, pose: 'sit', mood: o.a || 'ok', look: 0.4 }); N.person(560, 1240, 0.98, { ...TAN, pose: 'sit', mood: o.t || 'ok', look: 0.4 }); if (o.kab) N.person(790, 1240, 1.0, { ...KAB, pose: 'sit', arms: 'phone', mood: o.k || 'ok', look: -0.3 }); };
  const rohanRoom = (lt, d, t, o) => { K.camera(lc(lt, d, o.z0, o.z1), o.cx, o.cy ?? 940); bedroom(t, { clock: '92' }); const col = o.col ? o.col(t) : 0;
    N.person(250, 1230, 1.22, { ...ROH, pose: 'sit', arms: 'down', mood: col > 0.5 ? 'ok' : 'blank', grey: col <= 0.5, look: o.rlook ?? 0 }); if (o.aarav !== false) N.person(560, 1230, 1.1, { ...AAR, pose: 'sit', arms: o.aArms || 'down', mood: o.aMood || 'ok', head: 0.1, look: -0.8 });
    const LL = Wl([{ x: 400, y: 850, r: 600, c: [255, 200, 140], i: 0.6 }, WIN(0.5), { x: 250, y: 950, r: 320, c: [255, 210, 160], i: 0.9 * col }]); screen(() => fin(t, LL, [18, 20, 32])); };

  // 0 HOOK: red pen slashes a red X across a test paper, ink drips
  add({ id: 'S01', at: 0, noFlash: true, note: 'HOOK: red pen draws a huge X on a test paper, ink drips; 92 DIN', draw(lt, d, t) { K.camera(lc(lt, d, 1.15, 1.3), 540, 860);
    ctx.fillStyle = '#0c0a09'; ctx.fillRect(-600, -600, W + 1200, H + 1200); ctx.fillStyle = '#3a2618'; ctx.fillRect(-600, 1100, W + 1200, 900); testPaper(540, 840, -0.04);
    const s1 = eio(seg(t, 0.15, 0.55)), s2 = eio(seg(t, 0.65, 1.05)); ctx.strokeStyle = '#c4100c'; ctx.lineWidth = 30; ctx.lineCap = 'round';
    if (s1 > 0) { ctx.beginPath(); ctx.moveTo(300, 520); ctx.lineTo(300 + 480 * s1, 520 + 640 * s1); ctx.stroke(); } if (s2 > 0) { ctx.beginPath(); ctx.moveTo(780, 520); ctx.lineTo(780 - 480 * s2, 520 + 640 * s2); ctx.stroke(); }
    const px = t < 0.6 ? 300 + 480 * s1 : t < 1.05 ? 780 - 480 * s2 : lerp(300, 420, clamp((t - 1.05) / 0.6)), py = t < 0.6 ? 520 + 640 * s1 : t < 1.05 ? 520 + 640 * s2 : lerp(1160, 900, clamp((t - 1.05) / 0.6));
    for (let k = 0; k < 6; k++) { const tk = 1.1 + k * 0.45; if (t > tk) { const yy = Math.min(py + 30 + (t - tk) * 900, 1260); ctx.fillStyle = '#c4100c'; ctx.beginPath(); ctx.ellipse(px + (k % 2) * 6, yy, 9, 14, 0, 0, 7); ctx.fill(); } }
    if (t > 1.3) { ctx.fillStyle = 'rgba(196,16,12,.85)'; ctx.beginPath(); ctx.ellipse(px, 1262, Math.min(70, (t - 1.3) * 40), 12, 0, 0, 7); ctx.fill(); }
    redPen(px, py, 1.4, 0.5); const LL = Wl([{ x: 540, y: 700, r: 700, c: [255, 220, 170], i: 0.8 }, { x: px, y: py, r: 260, c: [255, 30, 20], i: 0.7 }]);
    screen(() => { fin(t, LL, [20, 14, 16]); font(50, 900); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.lineWidth = 12; ctx.strokeStyle = 'rgba(0,0,0,.9)'; ctx.strokeText('92 DIN · ROZ EK EPISODE', 540, 290); ctx.fillStyle = '#ff4a35'; ctx.fillText('92 DIN · ROZ EK EPISODE', 540, 290); }); } });
  cue(0.15, 'whoosh', { gain: 0.6 }); cue(0.65, 'whoosh', { gain: 0.6 }); cue(1.05, 'boom', { gain: 0.7 }); cue(1.2, 'plop', { gain: 0.6 }); cue(1.65, 'plop', { gain: 0.5 });
  // 1 recap sticky note ✓ -> sepia
  add({ id: 'S02', at: cut(1), note: 'sticky note ROZ 5 MIN BHAIYA KO PADH KE SUNAO + green tick, then sepia', draw(lt, d, t) { screen(() => { stickyWall(t, clamp((t - L(1) - 0.6) / 0.6)); N.grade(t, { vig: 0.5 }); });
    if (t > at('socho', 1)) { sepia(); screen(() => K.tag(ALT, 300, '#7a4a1a', pop(t, at('socho', 1)))); } } });
  cue(L(1) + 0.7, 'ding', { gain: 0.5 });
  // 2-4 ALT
  add({ id: 'S03', at: cut(2), note: 'ALT: grey Rohan by the window, alone', draw(lt, d, t) { rohanRoom(lt, d, t, { z0: 1.5, z1: 1.65, cx: 380, aarav: false, rlook: 0.8 }); sepia(); screen(() => { K.tag(ALT, 300, '#7a4a1a', 1); K.tag('ROZ THODA AUR GREY', 1180, '#5a3a1a', pop(t, at('grey', 2))); }); } });
  add({ id: 'S04', at: cut(3), note: "ALT: Rohan's old plan under dust", draw(lt, d, t) { ctx.fillStyle = '#05060a'; ctx.fillRect(-300, -300, W + 600, H + 600); screen(() => { phoneFrame(540, 880, 0.9, (x, y, w) => uiNotStarted(x, y, w, t)); for (let i = 0; i < 400; i++) { ctx.fillStyle = `rgba(200,190,170,${0.15 + rnd(i) * 0.25})`; ctx.fillRect(260 + rnd(i + 1) * 560, 300 + rnd(i + 2) * 1150, 3 + rnd(i) * 5, 3 + rnd(i + 4) * 5); } N.grade(t, { vig: 0.6 }); }); sepia(); screen(() => K.tag(ALT, 300, '#7a4a1a', 1)); } });
  add({ id: 'S05', at: cut(4), note: 'ALT: Aarav asks, Rohan stays blank', draw(lt, d, t) { rohanRoom(lt, d, t, { z0: 1.9, z1: 2.1, cx: 400, aMood: 'scared', aArms: 'reach' }); sepia(); screen(() => { K.tag(ALT, 300, '#7a4a1a', 1); K.tag('…', 1180, '#5a3a1a', pop(t, at('yaad', 4) + 0.3)); }); } });
  cue(cut(3), 'sadviolin', { gain: 0.5, dur: 2.5 });
  // 5 rewind -> real: 5-minute timer
  add({ id: 'S06', at: cut(5), noFlash: true, note: 'rewind, then Aarav sets a 5:00 timer next to Rohan', draw(lt, d, t) { const rw = lt < 0.5; rohanRoom(lt, d, t, { z0: 1.4, z1: 1.5, cx: 420, aArms: 'phone' });
    if (rw) { sepia(); screen(() => { for (let k = 0; k < 14; k++) { ctx.fillStyle = 'rgba(255,255,255,.25)'; ctx.fillRect(0, (k * 140 + t * 3000) % H, W, 6 + rnd(k) * 10); } font(120, 900); ctx.fillStyle = '#fff'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('◀◀', 540, 700); }); }
    else screen(() => { K.tag('ASLI RAAT', 300, '#2f8f5a', pop(t, L(5) + 0.55)); const k = pop(t, at('timer', 5)); if (k > 0) { ctx.save(); ctx.translate(540, 560); ctx.scale(k, k); rrp(-170, -80, 340, 160, 40); ctx.fillStyle = 'rgba(10,12,20,.85)'; ctx.fill(); ctx.strokeStyle = '#4fd1a5'; ctx.lineWidth = 6; ctx.stroke(); font(96, 900); ctx.fillStyle = '#4fd1a5'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('⏱ 5:00', 0, 4); ctx.restore(); } }); } });
  cue(cut(5), 'slide', { gain: 0.6 }); cue(cut(5) + 0.5, 'whoosh', { gain: 0.4 }); cue(at('timer', 5), 'ding', { gain: 0.5 });
  // 6 Aarav reads
  add({ id: 'S07', at: cut(6), note: 'Aarav reads to Rohan: Real Numbers', draw(lt, d, t) { rohanRoom(lt, d, t, { z0: 2.2, z1: 2.4, cx: 520, aArms: 'phone', aMood: 'happy' }); screen(() => K.tag('HCF · LCM 📖', 330, '#3a6fd8', pop(t, at('hcf', 6)))); } });
  // 7 tip notebook
  add({ id: 'S08', at: cut(7), note: 'notebook tip: prime factors, HCF small power, LCM big power', draw(lt, d, t) { screen(() => { primeTip(t, eo(clamp((t - L(7)) / 0.5)), eo(clamp((t - at('hcf', 7)) / 0.5)), eo(clamp((t - at('lcm', 7)) / 0.5))); N.grade(t, { vig: 0.35 }); }); } });
  cue(at('hcf', 7), 'tock', { gain: 0.4 }); cue(at('lcm', 7), 'sparkle', { gain: 0.5 });
  // 8 Rohan whispers, eyes flicker colour
  add({ id: 'S09', at: cut(8), note: 'Rohan close: whispers chhoti power, colour flickers', draw(lt, d, t) { rohanRoom(lt, d, t, { z0: 2.6, z1: 3.0, cx: 260, cy: 900, col: (tt) => (Math.sin(tt * 18) > 0.4 ? 1 : 0) * (tt > L(8) + 0.3 ? 1 : 0) }); } });
  cue(L(8) + 0.2, 'inhale', { gain: 0.5, dur: 0.8 }); cue(L(8) + 0.4, 'sparkle', { gain: 0.4 });
  // 9 tuition: Sharma Sir
  add({ id: 'S10', at: cut(9), note: 'tuition room: Sharma Sir at the board, never smiles', draw(lt, d, t) { K.camera(lc(lt, d, 1.15, 1.3), 560, 960); tuition(t); kids(t); sir(820, 1.2, { look: -0.5 }); const LL = Wl(tuLights()); screen(() => { fin(t, LL, [20, 22, 24]); K.tag('SHARMA SIR 😐', 1180, '#5a1a1a', pop(t, at('sharma', 9))); }); } });
  cue(at('sharma', 9), 'boom', { gain: 0.5 });
  // 10 Sharma close
  add({ id: 'S11', at: cut(10), note: 'Sharma Sir close, red pen up: SURPRISE TEST on the board', draw(lt, d, t) { K.camera(lc(lt, d, 2.1, 2.3), 780, 900); tuition(t, { surprise: t > at('surprise', 10) }); sir(820, 1.2, { arms: 'reach', penRot: -1.2, look: -0.1 }); const LL = Wl(tuLights([{ x: 860, y: 1000, r: 260, c: [255, 30, 20], i: 0.5 }])); screen(() => fin(t, LL, [20, 22, 24])); } });
  cue(at('surprise', 10), 'slam', { gain: 0.7 }); cue(at('abhi', 10), 'boom', { gain: 0.6 });
  // 11 ink drop on Aarav's paper
  add({ id: 'S12', at: cut(11), note: "red drop from the pen lands on Aarav's paper (ink drop)", draw(lt, d, t) { K.camera(lc(lt, d, 1.2, 1.45), 540, 900); ctx.fillStyle = '#0c0a09'; ctx.fillRect(-600, -600, W + 1200, H + 1200); testPaper(540, 900, 0.02, { title: 'AARAV · SURPRISE TEST' });
    const tb = at('boond', 11), yy = t < tb ? 420 : Math.min(420 + (t - tb) * 1600, 820); redPen(560, 360, 1.3, 0.1); if (t > tb + 0.25) inkDrop(560, 830, 1.1, t); else { ctx.fillStyle = '#c4100c'; ctx.beginPath(); ctx.ellipse(560, yy, 12, 18, 0, 0, 7); ctx.fill(); }
    const LL = Wl([{ x: 540, y: 800, r: 700, c: [255, 220, 170], i: 0.7 }, { x: 560, y: 830, r: 300, c: [255, 30, 20], i: t > tb + 0.25 ? 0.8 : 0.2 }]); screen(() => { fin(t, LL, [16, 12, 14]); K.tag('BILKUL WAISI 🔴', 300, '#7a1d1d', pop(t, at('waisi', 11))); }); } });
  cue(at('boond', 11) + 0.25, 'plop', { gain: 0.8 }); cue(at('waisi', 11), 'boom', { gain: 0.6 });
  // 12 Kabir barges in
  add({ id: 'S13', at: cut(12), note: 'Kabir slides onto the bench, phone: MATCH #5 adhoora', draw(lt, d, t) { K.camera(lc(lt, d, 1.6, 1.7), 680, 960); tuition(t, { surprise: true }); const kx = lerp(1150, 790, eo(clamp((t - L(12)) / 0.6))); N.person(330, 1240, 1.0, { ...AAR, pose: 'sit', look: 0.6 }); N.person(560, 1240, 0.98, { ...TAN, pose: 'sit', look: 0.6 }); N.person(kx, 1240, 1.0, { ...KAB, pose: 'sit', arms: 'phone', mood: 'happy', look: -0.4 });
    const LL = Wl(tuLights()); screen(() => { fin(t, LL, [20, 22, 24]); K.tag('🎮 MATCH #5 · ADHOORA', 330, '#c9822a', pop(t, at('match', 12))); }); } });
  cue(L(12) + 0.1, 'whoosh', { gain: 0.5 });
  // 13 Tanya whisper
  add({ id: 'S14', at: cut(13), note: 'Tanya close, scared whisper', draw(lt, d, t) { K.camera(lc(lt, d, 2.3, 2.5), 470, 930); tuition(t, { surprise: true }); kids(t, { a: 'scared', t: 'scared', kab: true }); const LL = Wl(tuLights([], { tube: 0.5 + 0.25 * (Math.sin(t * 23) > -0.6 ? 1 : 0) })); screen(() => fin(t, LL, [16, 18, 20])); } });
  cue(L(13), 'heartbeat', { gain: 0.5 });
  // 14 Zeta mission screen
  const react = (t, mood) => { K.camera(2.0, 450, 920); tuition(t, { surprise: true }); kids(t, { a: mood, t: mood, kab: true }); const LL = Wl(tuLights([{ x: 330, y: 1000, r: 260, c: [150, 185, 255], i: 0.8 }])); screen(() => fin(t, LL, [20, 22, 24])); };
  const scr = (fn, i, dur, fy, mood) => (lt, d, t) => { const cyc = lt % 3.4; if (lt > 2 && cyc > 2.6) { react(t, mood); return; }
    ctx.fillStyle = '#05060a'; ctx.fillRect(-300, -300, W + 600, H + 600); screen(() => { const z = lerp(1.32, 1.4, eio(clamp(lt / d))); ctx.translate(540, 760); ctx.scale(z, z); ctx.translate(-540, -fy);
      phoneFrame(540, 900, 1, (x, y, w) => fn(x, y, w, clamp((t - L(i)) / dur))); }); screen(() => { const g = ctx.createLinearGradient(0, 1200, 0, 1480); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(0.35, 'rgba(0,0,0,.7)'); g.addColorStop(1, 'rgba(0,0,0,.7)'); ctx.fillStyle = g; ctx.fillRect(0, 1200, W, 280); N.grade(t, { vig: 0.5 }); }); };
  add({ id: 'S15', at: cut(14), note: "Zeta Ace My Exams: last night's mission was Real Numbers HCF/LCM", draw: scr(uiMission5, 14, 2.0, 560, 'ok') });
  for (let k = 0; k < 3; k++) cue(L(14) + 0.5 + k * 0.3, 'tock', { gain: 0.35 });
  // 15 ask 1
  add({ id: 'S16', at: cut(15), note: 'kids writing the test; ask 1 COMMENT PLAN', draw(lt, d, t) { K.camera(lc(lt, d, 1.4, 1.5), 560, 980); tuition(t, { surprise: true }); kids(t, { a: 'ok', kab: true, k: 'scared' }); sir(900, 1.15, {}); const LL = Wl(tuLights()); screen(() => fin(t, LL, [20, 22, 24]));
    const k = pop(t, at('comment', 15)); if (k > 0) screen(() => { ctx.save(); ctx.translate(540, 420); ctx.scale(k, k); font(46, 900); const tw = ctx.measureText('COMMENT "PLAN" 👇').width + 80; rrp(-tw / 2, -50, tw, 100, 50); ctx.fillStyle = '#ffd43b'; ctx.fill(); ctx.fillStyle = '#111'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('COMMENT "PLAN" 👇', 0, 2); font(32, 800); ctx.fillStyle = '#fff'; ctx.lineWidth = 8; ctx.strokeStyle = 'rgba(0,0,0,.8)'; ctx.strokeText('free plan link DM mein', 0, 90); ctx.fillText('free plan link DM mein', 0, 90); ctx.restore(); }); } });
  cue(at('comment', 15), 'pop', { gain: 0.5 });
  // 16 paper back: one red tick
  add({ id: 'S17', at: cut(16), note: 'paper back: one big red tick', draw(lt, d, t) { screen(() => { tickPaper(t, clamp((t - at('tick', 16)) / 0.6)); N.grade(t, { vig: 0.45 }); K.tag('POORA SAHI ✓', 300, '#2f8f5a', pop(t, at('tick', 16) + 0.5)); }); } });
  cue(at('tick', 16), 'sparkle', { gain: 0.6 });
  // 17 diary: ROHAN circled in red
  add({ id: 'S18', at: cut(17), note: "Sharma Sir's open diary: 1. ROHAN circled in red ink", draw(lt, d, t) { const z = lc(lt, d, 1.0, 1.35); screen(() => { ctx.translate(540, 700); ctx.scale(z, z); ctx.translate(-lerp(540, 680, eio(clamp(lt / d))), -lerp(780, 500, eio(clamp(lt / d)))); diary(t, clamp((t - at('rohan', 17)) / 0.4)); }); screen(() => { N.glow(540, 700, 500, '255,30,20', 0.25); N.grade(t, { vig: 0.7 }); }); } });
  cue(at('rohan', 17), 'boom', { gain: 0.9 }); cue(at('rohan', 17) + 0.2, 'heartbeat', { gain: 0.6 });
  // 18 clock 92 -> 91
  add({ id: 'S19', at: cut(18), note: 'sky clock cracks 92 -> 91', draw(lt, d, t) { const tc = at('ikyaanve', 18); K.camera(1.6, 540, 600); street(t, { clock: t < tc ? '92' : '91', crack: t < tc ? seg(t, L(18), tc) : 0 }); screen(() => fin(t, streetLights(), [26, 18, 28], { rain: 0.35 })); } });
  cue(at('tooti', 18), 'glass', { gain: 0.7 }); cue(at('ikyaanve', 18), 'boom', { gain: 0.9 });
  // 19 A/B cards
  add({ id: 'S20', at: cut(19), note: 'A/B cards over the dark tuition room', draw(lt, d, t) { K.camera(1.3, 560, 960); tuition(t, { clock: '91', tube: 0, surprise: true }); sir(840, 1.2, {}); const LL = Wl(tuLights([], { tube: 0.15 }));
    screen(() => { fin(t, LL, [10, 10, 14]); const a = eob(seg(t, at('a', 19) - 0.1, at('a', 19) + 0.2)), b = eob(seg(t, at('b', 19) - 0.1, at('b', 19) + 0.2));
      const card = (x, k, L1, L2, col) => { if (k <= 0) return; ctx.save(); ctx.translate(x, 640); ctx.scale(k, k); ctx.fillStyle = 'rgba(8,8,12,.88)'; ctx.beginPath(); ctx.roundRect(-200, -170, 400, 340, 30); ctx.fill(); ctx.strokeStyle = col; ctx.lineWidth = 6; ctx.stroke(); font(110, 900); ctx.fillStyle = col; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(L1, 0, -70); font(36, 900); ctx.fillStyle = '#fff'; L2.forEach((s, j) => ctx.fillText(s, 0, 40 + j * 46)); ctx.restore(); };
      card(320, a, 'A', ['SIR SE', 'SEEDHA POOCHO'], '#4FD1A5'); card(760, b, 'B', ['CHUPKE SE', 'DIARY PADHO'], '#FFB03B'); }); } });
  // 20 ask 2: Sharma silhouette + eye in the window
  add({ id: 'S21', at: cut(20), noFlash: true, note: 'dark tuition: Sharma Sir silhouette with glowing red pen, eye in the window; ask 2', draw(lt, d, t) { K.camera(lc(lt, d, 1.5, 1.65), 260, 860); tuition(t, { clock: false, eye: true, tube: 0 }); N.person(150, 1240, 1.45, { ...SHR, shirt: '#111', pants: '#0a0a0a', skin: '#151515', hairC: '#0a0a0a', mood: 'ok', look: -0.8 }); redPen(150 + 52 * 1.45, 1240 - 150 * 1.45, 0.65, -0.4);
    const LL = Wl([{ x: 90, y: 560, r: 520, c: [255, 50, 35], i: 1.0 }, { x: 225, y: 1020, r: 220, c: [255, 30, 20], i: 0.9 }]);
    screen(() => { fin(t, LL, [8, 8, 14]); const k = eob(seg(t, at('comment', 20), at('comment', 20) + 0.3)); if (k > 0) { ctx.save(); ctx.translate(540, 360); ctx.scale(k, k); font(72, 900); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; const tw = ctx.measureText('A  ya  B ? 👇').width + 90; rrp(-tw / 2, -62, tw, 124, 62); ctx.fillStyle = '#ffd43b'; ctx.fill(); ctx.fillStyle = '#111'; ctx.fillText('A  ya  B ? 👇', 0, 4); font(36, 800); ctx.lineWidth = 8; ctx.strokeStyle = 'rgba(0,0,0,.85)'; ctx.fillStyle = '#fff'; ctx.strokeText('har comment ko free plan link DM mein', 0, 112); ctx.fillText('har comment ko free plan link DM mein', 0, 112); ctx.restore(); } }); } });
  cue(cut(20), 'boom', { gain: 0.8 });
  S.forEach((s, i) => { if (i > 1) cue(s.at, 'whoosh', { gain: 0.25 }); });
  const rise = (tt, d = 1.2) => cue(tt - d, 'riser', { gain: 0.55, dur: d });
  rise(at('boond', 11), 1.0); rise(at('rohan', 17), 1.0); rise(at('ikyaanve', 18), 1.0); rise(cut(20), 0.8);
  return { shots: S, cues: CUES, overlay: null };
}
