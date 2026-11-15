// AASMAAN MEIN 96 · Ep 1 (2D night look). One shot per line; cinematic flat world + light pass.
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
export function buildShots() {
  const S = [], CUES = [], add = (o) => S.push({ cam: [540, 960], zoom: 0.03, punch: 0.02, ...o }), cue = (t, type, o = {}) => CUES.push({ t: +Math.max(0, t).toFixed(3), type, ...o });
  const cut = (i) => (i === 0 ? 0 : L(i) - 0.08);
  const Wl = (ls) => { const m = ctx.getTransform(); return ls.map((l) => ({ ...l, x: m.a * l.x + m.e, y: m.d * l.y + m.f, r: l.r * m.a })); };
  const fin = (t, lights, amb, o = {}) => { N.lightPass(lights, amb); if (o.rain) N.rain(t, o.rain); N.grade(t, o); };
  const room = (t, o, lights, cam) => { K.camera(...cam); bedroom(t, o); };

  // 1 HOOK
  add({ id: 'S01', at: 0, noFlash: true, note: 'group chat: datesheet aa gayi; then clock ignites', draw(lt, d, t) {
    if (t < at('aasmaan', 0) - 0.25) { ctx.fillStyle = '#05060a'; ctx.fillRect(-300, -300, W + 600, H + 600); screen(() => { const sh = t < 0.35 ? Math.sin(t * 90) * 8 : 0; ctx.translate(sh, 0); N.glow(540, 300, 900, '255,30,20', 0.35); phoneFrame(540, 930, lerp(1.06, 1.0, eo(clamp(t / 1.5))), (x, y, w) => chatUI(x, y, w, clamp(t / 1.0), t)); N.grade(t, { vig: 0.55 }); font(50, 900); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.lineWidth = 12; ctx.strokeStyle = 'rgba(0,0,0,.9)'; ctx.strokeText('96 DIN · ROZ EK EPISODE', 540, 200); ctx.fillStyle = '#ff4a35'; ctx.fillText('96 DIN · ROZ EK EPISODE', 540, 200); }); return; }
    const ig = seg(t, at('aasmaan', 0) - 0.3, at('ghadi', 0)); K.camera(lerp(2.25, 1.9, eio(clamp(lt / d))), lerp(470, 560, eio(clamp(lt / d))), 880); bedroom(t, { flick: ig }); const LL = Wl([PHONE(430), WIN(0.9 * ig), { x: 800, y: 560, r: 160, c: [255, 60, 40], i: ig }]), G = Wl([{ x: 430, y: 905, r: 90 }, { x: 830, y: 500, r: 200 }]);
    N.person(430, 1230, 1.25, { ...AAR, pose: 'sit', arms: 'phone', head: 0.18, mood: t > at('ghadi', 0) ? 'scared' : 'ok', look: t > at('ghadi', 0) ? 0.6 : 0 });
    screen(() => fin(t, LL, [20, 22, 36]));
    screen(() => { N.glow(G[0].x, G[0].y, G[0].r, '150,190,255', 0.5); if (ig > 0) N.glow(G[1].x, G[1].y, G[1].r, '255,40,25', 0.45 * ig); }); } });
  cue(0.05, 'buzz', { gain: 0.5 }); cue(at('ghadi', 0), 'boom', { gain: 0.8 });
  // 2 TOWN + clock
  add({ id: 'S02', at: cut(1), note: 'city: skyline, metro, billboard, students look up at clock 96', draw(lt, d, t) { K.camera(lerp(1.12, 1.2, eio(clamp(lt / d))), 540, lerp(960, 900, eio(clamp(lt / d)))); city(t, {}); screen(() => fin(t, cityLights(), [28, 20, 30], { rain: 0.3 })); } });
  add({ id: 'S03', at: cut(2), note: 'clock close', draw(lt, d, t) { K.camera(lerp(2.6, 2.9, eio(clamp(lt / d))), 540, 470); street(t, { flick: 0.85 + 0.15 * (Math.floor(t * 2) % 2) }); screen(() => fin(t, streetLights(), [26, 18, 28])); } });
  add({ id: 'S04', at: cut(3), note: 'Kabir+Tanya at chai stall look up; then examiner rises', draw(lt, d, t) {
    if (t < at('jab', 3)) { K.camera(lerp(1.6, 1.7, eio(clamp(lt / 2))), 760, 1160); city(t, { crowd: false, billboard: false, cy: 300 }); N.person(700, 1500, 1.15, { ...KAB, mood: 'scared', head: -0.25 }); N.person(900, 1500, 1.1, { ...TAN, mood: 'ok', head: -0.3 }); const LL = Wl([{ x: 890, y: 1220, r: 420, c: [255, 190, 110], i: 0.9 }, { x: 760, y: 900, r: 700, c: [255, 40, 30], i: 0.5 }]); screen(() => fin(t, LL, [26, 20, 28])); return; }
    K.camera(1.0, 540, 960); street(t, { examiner: eo(seg(t, at('wo', 3), L(4))) }); screen(() => fin(t, streetLights(), [26, 18, 28], { rain: 0.35 })); } });
  add({ id: 'S05', at: cut(4), note: 'EXAMINER close', draw(lt, d, t) { K.camera(lerp(1.7, 1.85, eio(clamp(lt / d))), 600, 520); street(t, { examiner: 1 }); screen(() => fin(t, [...streetLights(), { x: 760, y: 700, r: 500, c: [255, 30, 20], i: 0.9 }], [24, 14, 20])); } });
  // 6 KNOCK
  const knock = (line, word, cam) => (lt, d, t) => {
    const kk = at(word, line); let h = 0; [0, 0.35, 0.7].forEach((o) => { const q = t - kk - o; if (q > -0.22 && q < 0.22) h = Math.max(h, 1 - Math.abs(q) / 0.22); });
    K.camera(...cam(lt, d)); ctx.fillStyle = '#4a3b30'; ctx.fillRect(-300, -300, W + 600, 2600); for (let i = 0; i < 220; i++) { ctx.fillStyle = `rgba(0,0,0,${0.05 + rnd(i) * 0.08})`; ctx.fillRect(rnd(i) * W, rnd(i + 1) * H, 40 + rnd(i + 2) * 120, 3); }
    ctx.fillStyle = '#2a1b12'; ctx.fillRect(170, 440, 560, 1140); ctx.fillStyle = '#5b3b26'; ctx.fillRect(200, 470, 500, 1110); for (let k = 0; k < 9; k++) { ctx.fillStyle = 'rgba(0,0,0,.18)'; ctx.fillRect(200 + k * 56, 470, 4, 1110); } ctx.strokeStyle = 'rgba(0,0,0,.4)'; ctx.lineWidth = 8; ctx.strokeRect(250, 530, 400, 420); ctx.strokeRect(250, 1010, 400, 480);
    ctx.fillStyle = '#c9a45a'; ctx.beginPath(); ctx.arc(640, 1080, 16, 0, 7); ctx.fill(); ctx.fillStyle = '#2a2420'; ctx.fillRect(-100, 1580, W + 200, 400);
    ctx.fillStyle = '#1a1a1a'; rr(790, 360, 70, 90, 10); ctx.fill(); ctx.fillStyle = h > 0.5 ? '#3a2a10' : '#ffd08a'; ctx.beginPath(); ctx.arc(825, 470, 26, 0, 7); ctx.fill();
    N.giantFist(700 - 20 * h, 860, 1.25, { skin: '#6a524a' });   // knuckles touch the door face (x ≈ 700), never past it
    if (h > 0) for (let k = 0; k < 16; k++) { const q = rnd(k + Math.floor(t * 8)); ctx.fillStyle = `rgba(200,180,150,${0.5 * h})`; ctx.beginPath(); ctx.arc(640 + q * 120, 600 + rnd(k * 3) * 600 + (1 - h) * 80, 3 + q * 4, 0, 7); ctx.fill(); }
    screen(() => { const sh = h * 10; ctx.translate(Math.sin(t * 70) * sh, 0); fin(t, [{ x: 825, y: 480, r: 900, c: [255, 190, 110], i: h > 0.5 ? 0.25 : 1 }, { x: 1000, y: 900, r: 900, c: [255, 40, 30], i: 0.55 }], [26, 20, 22]); N.glow(825, 470, 120, '255,200,120', h > 0.5 ? 0.1 : 0.6); }); };
  add({ id: 'S06', at: cut(5), note: 'giant knuckles on the door', draw: knock(5, 'khatkhatata', (lt, d) => [lerp(1.0, 1.12, eio(clamp(lt / d))), 540, 1000]) });
  [0, 0.35, 0.7].forEach((o) => cue(at('khatkhatata', 5) + o, 'thud', { gain: 0.9 }));
  // 7 BLANK kid
  add({ id: 'S07', at: cut(6), note: 'Tanya answers and walks on; then a student goes blank', draw(lt, d, t) {
    if (t < at('nahi', 6) - 0.1) { const k = clamp((t - L(6)) / Math.max(0.5, at('nahi', 6) - L(6))); K.camera(1.9, 560, 1020); ctx.fillStyle = '#0a090c'; ctx.fillRect(-500, -500, W + 1000, H + 1000); N.person(lerp(470, 640, k), 1380, 1.2, { ...TAN, mood: 'happy', look: 0.6 }); const LL = Wl([{ x: lerp(470, 640, k), y: 900, r: 650, c: [255, 225, 160], i: 1 }]); screen(() => { N.beam(540, -100, 540, 1300, 60, 420, '255,230,170', 0.1); fin(t, LL, [10, 10, 14]); K.tag('JAWAB ✓', 420, '#2f8f5a', pop(t, L(6) + 0.3)); }); return; }
    const b = eo(seg(t, at('blank', 6) - 0.2, at('blank', 6) + 0.8)); K.camera(lerp(1.8, 2.1, eio(clamp(lt / d))), 540, 1020); ctx.fillStyle = '#08080b'; ctx.fillRect(-500, -500, W + 1000, H + 1000);
    ctx.fillStyle = '#3a2c20'; ctx.fillRect(300, 1150, 480, 26); ctx.fillRect(330, 1176, 18, 200); ctx.fillRect(730, 1176, 18, 200); ctx.fillStyle = '#ecebe6'; ctx.save(); ctx.translate(540, 1140); ctx.rotate(-0.05); ctx.fillRect(-90, -10, 180, 16); ctx.restore();
    N.person(540, 1380, 1.2, { shirt: '#e9e6de', pants: '#2b3550', pose: 'sit', arms: 'down', mood: b > 0.5 ? 'blank' : 'scared', grey: b > 0.5 });
    screen(() => { N.beam(540, -100, 540, 1300, 60, 420, '200,215,255', 0.12); fin(t, [{ x: 540, y: 900, r: 650, c: [210, 220, 255], i: 1 }, { x: 540, y: 1000, r: 900, c: [255, 30, 20], i: 0.6 * b }], [10, 10, 14]); }); } });
  cue(at('blank', 6), 'glass', { gain: 0.6 });
  // 8-9 warm flashback
  const warm = (lt, d, t, o) => { K.camera(lerp(1.75, 1.85, eio(clamp(lt / d))), 410, 960); bedroom(t, { clock: false });
    const LW = Wl([{ x: 400, y: 800, r: 700, c: [255, 190, 120], i: 1 }, { x: 800, y: 560, r: 500, c: [255, 150, 80], i: 0.6 }]); N.person(260, 1230, 1.2, { ...ROH, pose: 'sit', arms: 'hug', mood: 'happy', head: -0.05 }); N.person(560, 1230, 1.08, { ...AAR, pose: 'sit', arms: 'down', mood: 'happy', head: 0.1, look: -0.6 });
    if (o && o.book) { ctx.save(); ctx.translate(290, 1010); ctx.rotate(-0.12); rr(-70, -50, 140, 100, 8); ctx.fillStyle = '#b8483a'; ctx.fill(); ctx.fillStyle = '#f2e6c9'; ctx.fillRect(-60, -42, 56, 84); ctx.fillRect(4, -42, 56, 84); ctx.restore(); }
    screen(() => { ctx.globalCompositeOperation = 'source-over'; fin(t, LW, [70, 50, 40], { vig: 0.5 }); }); };
  add({ id: 'S08', at: cut(7), note: 'warm: brothers laughing', draw: warm });
  add({ id: 'S09', at: cut(8), note: 'warm: bhaiya with the storybook', draw: (lt, d, t) => warm(lt, d, t, { book: true }) });
  // 10-11 last year
  add({ id: 'S10', at: cut(9), note: 'last year: Rohan scrolling, laughing', draw(lt, d, t) { K.camera(lerp(1.5, 1.65, eio(clamp(lt / d))), 600, 860); bedroom(t, {}); N.person(430, 1230, 1.25, { ...ROH, pose: 'sit', arms: 'phone', mood: t > at('hanste', 9) ? 'happy' : 'ok', head: 0.15 }); const LL = Wl([PHONE(430), WIN(0.6)]), G = Wl([{ x: 430, y: 905, r: 90 }]);
    screen(() => { fin(t, LL, [20, 22, 36]); N.glow(G[0].x, G[0].y, G[0].r, '150,190,255', 0.5); K.tag('PICHHLE SAAL', 330, '#7a1d1d', pop(t, L(9) + 0.1)); }); } });
  add({ id: 'S11', at: cut(10), note: 'days race in the window', draw(lt, d, t) { const n = Math.max(1, Math.round(lerp(96, 1, eio(clamp(lt / d))))); K.camera(1.8, 800, 560); bedroom(t, { clock: String(n).padStart(2, '0') }); const LL = Wl([WIN(1)]); screen(() => fin(t, LL, [20, 22, 36])); } });
  add({ id: 'S12', at: cut(11), note: 'knock that night (low, tight angle)', draw: knock(11, 'dastak', (lt, d) => [lerp(1.5, 1.65, eio(clamp(lt / d))), 600, 880]) });
  // 13 TODAY: Rohan blank
  add({ id: 'S13', at: cut(12), note: 'Rohan grey, blank; Aarav beside', draw(lt, d, t) { K.camera(lerp(1.7, 1.82, eio(clamp(lt / d))), 340, 930); bedroom(t, {}); ctx.fillStyle = '#08070a'; ctx.fillRect(60, 560, 160, 680); N.person(140, 1240, 1.0, { ...MAA, mood: 'sad', look: 0.6 }); const LL = Wl([{ x: 250, y: 850, r: 380, c: [170, 190, 255], i: 0.8 }, WIN(0.6), { x: 560, y: 900, r: 300, c: [120, 130, 170], i: 0.4 }, { x: 140, y: 900, r: 220, c: [255, 190, 120], i: 0.5 }]);
    N.person(250, 1230, 1.22, { ...ROH, pose: 'sit', arms: 'down', mood: 'blank', grey: true }); N.person(560, 1230, 1.1, { ...AAR, pose: 'sit', arms: 'down', mood: 'sad', head: 0.12, look: -0.8 });
    screen(() => fin(t, LL, [18, 20, 32])); } });
  // 14 phone flares
  add({ id: 'S14', at: cut(13), note: 'old phone lights up', draw(lt, d, t) { const on = seg(t, at('jal', 13) - 0.2, at('jal', 13) + 0.2); K.camera(lerp(2.3, 2.6, eio(clamp(lt / d))), 845, 950); bedroom(t, { deskPhone: on }); const LL = Wl([{ x: 845, y: 990, r: 320, c: [150, 190, 255], i: 0.25 + on }, WIN(0.8)]), G = Wl([{ x: 845, y: 985, r: 110 }]);
    screen(() => { fin(t, LL, [26, 28, 42]); N.glow(G[0].x, G[0].y, G[0].r, '150,190,255', 0.6 * on); }); } });
  cue(at('jal', 13), 'buzz', { gain: 0.6 });
  // 15-17 screens
  const react = (t, mood) => { K.camera(3.1, 440, 820); bedroom(t, {}); N.person(430, 1230, 1.25, { ...AAR, pose: 'sit', arms: 'phone', head: 0.15, mood }); const LL = Wl([PHONE(430), WIN(0.5)]); screen(() => fin(t, LL, [18, 20, 32])); };
  const scr = (fn, i, dur, fy, mood) => (lt, d, t) => { const cyc = lt % 3.4; if (lt > 2 && cyc > 2.6) { react(t, mood); return; }
    ctx.fillStyle = '#05060a'; ctx.fillRect(-300, -300, W + 600, H + 600); screen(() => { const z = lerp(1.32, 1.4, eio(clamp(lt / d))), f = typeof fy === 'function' ? fy(t) : fy; ctx.translate(540, 760); ctx.scale(z, z); ctx.translate(-540, -f);
      phoneFrame(540, 900, 1, (x, y, w) => fn(x, y, w, fn === uiNotStarted ? t : clamp((t - L(i)) / dur))); }); screen(() => { const g = ctx.createLinearGradient(0, 1200, 0, 1480); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(0.35, 'rgba(0,0,0,.7)'); g.addColorStop(1, 'rgba(0,0,0,.7)'); ctx.fillStyle = g; ctx.fillRect(0, 1200, W, 280); N.grade(t, { vig: 0.5 }); }); };
  add({ id: 'S15', at: cut(14), note: 'Zeta plan (zoomed on the mission)', draw: scr(uiPlan, 14, 2.5, 560, 'ok') });
  add({ id: 'S16', at: cut(15), note: 'Zeta exam insights (bars, then the 52% box)', draw: scr(uiMap, 15, 3, (t) => lerp(600, 960, eio(seg(t, at('aadhe', 15) - 1.2, at('aadhe', 15))) ), 'scared') });
  add({ id: 'S17', at: cut(16), note: 'Rohan: not started', draw: scr(uiNotStarted, 16, 1, 620, 'sad') });
  // 18 ask 1
  add({ id: 'S18', at: cut(17), note: 'Aarav close in phone light; ask 1', draw(lt, d, t) { K.camera(lerp(3.0, 3.2, eio(clamp(lt / d))), 440, 830); bedroom(t, {}); N.person(430, 1230, 1.25, { ...AAR, pose: 'sit', arms: 'phone', head: 0.15, mood: 'ok' }); const LL = Wl([PHONE(430), WIN(0.6)]);
    screen(() => { fin(t, LL, [18, 20, 32]); const k = pop(t, at('comment', 17)); if (k > 0) { ctx.save(); ctx.translate(540, 400); ctx.scale(k, k); font(46, 900); const tw = ctx.measureText('COMMENT "PLAN" 👇').width + 80; rrp(-tw / 2, -50, tw, 100, 50); ctx.fillStyle = '#ffd43b'; ctx.fill(); ctx.fillStyle = '#111'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('COMMENT "PLAN" 👇', 0, 2); font(32, 800); ctx.fillStyle = '#fff'; ctx.lineWidth = 8; ctx.strokeStyle = 'rgba(0,0,0,.8)'; ctx.strokeText('free plan link DM mein', 0, 90); ctx.fillText('free plan link DM mein', 0, 90); ctx.restore(); } }); } });
  // 19 eye
  add({ id: 'S19', at: cut(18), note: 'eye slides into the window', draw(lt, d, t) { const k = eio(seg(t, at('hila', 18) - 0.4, at('hila', 18) + 0.6)); K.camera(1.9, 800, 600); bedroom(t, { clock: false, eye: k > 0.02, eyeX: lerp(420, 0, k), sil: k <= 0.02 ? clamp((t - L(18)) / Math.max(0.3, at('hila', 18) - 0.4 - L(18))) : -1 }); const LL = Wl([{ x: 800, y: 580, r: 450, c: [255, 50, 35], i: 0.9 }]);
    screen(() => fin(t, LL, [16, 16, 26])); } });
  cue(at('hila', 18), 'boom', { gain: 0.9 });
  // 20 96 -> 95
  add({ id: 'S20', at: cut(19), note: 'clock cracks to 95', draw(lt, d, t) { const tc = at('pachanve', 19); K.camera(1.6, 540, 600); street(t, { clock: t < tc ? '96' : '95', crack: t < tc ? seg(t, L(19), tc) : 0 }); screen(() => fin(t, streetLights(), [26, 18, 28], { rain: 0.35 })); } });
  cue(at('pachanve', 19), 'glass', { gain: 0.7 }); cue(at('pachanve', 19), 'boom', { gain: 0.9 });
  // 21 A/B
  add({ id: 'S21', at: cut(20), note: 'two paths A/B', draw(lt, d, t) { K.camera(1.7, 640, 900); bedroom(t, { clock: '95' }); N.person(430, 1230, 1.25, { ...AAR, pose: 'sit', arms: 'phone', head: 0.05, look: 0.5 }); const LL = Wl([PHONE(430), WIN(0.85)]);
    screen(() => { fin(t, LL, [20, 22, 36]);
      const a = eob(seg(t, at('a', 20) - 0.1, at('a', 20) + 0.2)), b = eob(seg(t, at('b', 20) - 0.1, at('b', 20) + 0.2));
      const card = (x, k, L1, L2, col) => { if (k <= 0) return; ctx.save(); ctx.translate(x, 500); ctx.scale(k, k); ctx.fillStyle = 'rgba(8,8,12,.85)'; ctx.beginPath(); ctx.roundRect(-190, -150, 380, 300, 30); ctx.fill(); ctx.strokeStyle = col; ctx.lineWidth = 6; ctx.stroke(); font(110, 900); ctx.fillStyle = col; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(L1, 0, -55); font(36, 900); ctx.fillStyle = '#fff'; L2.forEach((s, j) => ctx.fillText(s, 0, 50 + j * 46)); ctx.restore(); };
      card(320, a, 'A', ['AAJ RAAT HI', 'PEHLA MISSION'], '#4FD1A5'); card(760, b, 'B', ['KAL SE', 'PAKKA'], '#FF5A5A');
      const nt = (y, who, msg, c, k) => { if (k <= 0) return; withA(k, () => { rrp(130, y, 820, 118, 30); ctx.fillStyle = 'rgba(30,34,44,.95)'; ctx.fill(); font(32, 900); ctx.fillStyle = c; ctx.textAlign = 'left'; ctx.textBaseline = 'middle'; ctx.fillText(who, 166, y + 36); font(38, 900); ctx.fillStyle = '#fff'; ctx.fillText(msg, 166, y + 82); }); };
      nt(720, 'Tanya', 'library kal 7 baje? 📚', '#4fd1a5', eob(seg(t, at('mission', 20) - 0.2, at('mission', 20) + 0.2))); nt(860, 'Kabir', 'bas 1 match BGMI? 🎮', '#ffb03b', eob(seg(t, at('b', 20) - 0.1, at('b', 20) + 0.3))); }); } });
  // 22 ask 2 over the eye
  add({ id: 'S22', at: cut(21), note: 'eye at window, Aarav silhouette; ask 2', draw(lt, d, t) { K.camera(lerp(1.6, 1.7, eio(clamp(lt / d))), 780, 760); bedroom(t, { clock: false, eye: true, eyeX: 0 }); N.person(700, 1500, 1.6, { ...AAR, arms: 'down', mood: 'scared' }); const LL = Wl([{ x: 800, y: 580, r: 450, c: [255, 50, 35], i: 0.95 }]);
    screen(() => { fin(t, LL, [10, 10, 18]); const k = eob(seg(t, at('comment', 21), at('comment', 21) + 0.3)); if (k > 0) { ctx.save(); ctx.translate(540, 360); ctx.scale(k, k); font(72, 900); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; const tw = ctx.measureText('A  ya  B ? 👇').width + 90; rrp(-tw / 2, -62, tw, 124, 62); ctx.fillStyle = '#ffd43b'; ctx.fill(); ctx.fillStyle = '#111'; ctx.fillText('A  ya  B ? 👇', 0, 4); font(36, 800); ctx.lineWidth = 8; ctx.strokeStyle = 'rgba(0,0,0,.85)'; ctx.fillStyle = '#fff'; ctx.strokeText('har comment ko free plan link DM mein', 0, 112); ctx.fillText('har comment ko free plan link DM mein', 0, 112); ctx.restore(); } }); } });
  S.forEach((s, i) => { if (i) cue(s.at, 'whoosh', { gain: 0.25 }); });
  // anxiety layer: risers into every scare, sub hits, a sad sting on Rohan
  const rise = (t, d = 1.2) => cue(t - d, 'riser', { gain: 0.55, dur: d });
  rise(at('wo', 3)); rise(cut(4), 0.9); cue(cut(4), 'boom', { gain: 1.0 }); rise(at('khatkhatata', 5), 0.8); rise(at('blank', 6), 1.0); cue(at('blank', 6), 'boom', { gain: 0.7 });
  rise(at('dastak', 11), 1.0); cue(at('dastak', 11), 'thud', { gain: 1 }); cue(at('dastak', 11) + 0.6, 'creak', { gain: 0.7 }); cue(cut(12), 'sadviolin', { gain: 0.6, dur: 3 });
  rise(at('hila', 18), 1.4); rise(at('pachanve', 19), 1.0); cue(cut(19), 'inhale', { gain: 0.5, dur: 0.8 }); cue(at('bachta', 21), 'boom', { gain: 0.8 });
  cue(cut(1), 'boom', { gain: 0.5 }); cue(cut(13), 'inhale', { gain: 0.4, dur: 0.8 });
  return { shots: S, cues: CUES, overlay: null };
}
