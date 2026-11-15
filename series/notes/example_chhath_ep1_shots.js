// CHHATH KE 4 DIN · Ep 1 · Nahay Khay (Zeta Galaxy notes page). Warm 2D folk look: dawn ghat, village home, light pass.
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

export function buildShots() {
  const S = [], CUES = [], add = (o) => S.push({ cam: [540, 960], zoom: 0.03, punch: 0.02, ...o }), cue = (t, type, o = {}) => CUES.push({ t: +Math.max(0, t).toFixed(3), type, ...o });
  const cut = (i) => (i === 0 ? 0 : L(i) - 0.08);
  const Wl = (ls) => { const m = ctx.getTransform(); return ls.map((l) => ({ ...l, x: m.a * l.x + m.e, y: m.d * l.y + m.f, r: l.r * m.a })); };
  const fin = (t, lights, amb, o = {}) => { N.lightPass(lights, amb); N.grade(t, { vig: o.vig ?? 0.45 }); folkBorder(); };
  const pill = (txt, y, k, bg = '#ffd43b', fg = '#1a0e05', size = 46) => { if (k <= 0) return; screen(() => { ctx.save(); ctx.translate(540, y); ctx.scale(k, k); font(size, 900); const tw = ctx.measureText(txt).width + 70; rrp(-tw / 2, -size * 0.95, tw, size * 1.9, size * 0.95); ctx.fillStyle = bg; ctx.fill(); ctx.fillStyle = fg; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(txt, 0, 3); ctx.restore(); }); };
  const DAWN = [{ x: 540, y: 900, r: 1300, c: [255, 210, 150], i: 0.95 }, { x: 540, y: 1300, r: 900, c: [255, 170, 110], i: 0.5 }];
  const lc = (lt, d, a, b) => lerp(a, b, eio(clamp(lt / d)));

  add({ id: 'S01', at: 0, noFlash: true, note: 'dawn ghat, sun rises; CHHATH DIN 1 + test countdown', draw(lt, d, t) { K.camera(lc(lt, d, 1.25, 1.1), 540, 1040); ghat(t, { sun: eo(clamp(t / 4)) }); const LL = Wl(DAWN); screen(() => fin(t, LL, [120, 90, 110]));
    pill('🪔 CHHATH · DIN 1 · NAHAY KHAY', 330, eob(seg(t, 0.15, 0.5)), '#b3121b', '#ffe9b0', 42); pill('PRE-BOARD TEST: 5 DIN ⏳', 450, eob(seg(t, at('pre-board', 0), at('pre-board', 0) + 0.3)), '#ffd43b', '#1a0e05', 40); } });
  cue(0.1, 'riser', { gain: 0.3, dur: 1.5 }); cue(at('pre-board', 0), 'tick', { gain: 0.6 });
  add({ id: 'S02', at: cut(1), note: 'Maa in the river, hands joined to the sun', draw(lt, d, t) { K.camera(lc(lt, d, 1.6, 1.75), 540, 1120); ghat(t, { sun: 0.7, kosi: false });
    ctx.save(); ctx.beginPath(); ctx.rect(-600, -600, W + 1200, 1320 + 600); ctx.clip(); N.person(540, 1560, 1.4, { ...MAA, arms: 'hug', mood: 'ok', head: -0.1 }); ctx.restore(); ctx.fillStyle = 'rgba(200,120,90,.55)'; ctx.fillRect(-600, 1320, W + 1200, 300);
    const LL = Wl(DAWN); screen(() => fin(t, LL, [120, 90, 110])); } });
  add({ id: 'S03', at: cut(2), note: 'chulha kitchen, kaddu-bhaat; NAHAY KHAY tag', draw(lt, d, t) { K.camera(lc(lt, d, 1.5, 1.6), 600, 1020); home(t, { part: 'kitchen' }); N.person(380, 1300, 1.15, { ...MAA, arms: 'reach', mood: 'happy', look: 0.6 });
    const LL = Wl([{ x: 720, y: 1150, r: 520, c: [255, 160, 80], i: 1 }, { x: 300, y: 600, r: 900, c: [255, 220, 170], i: 0.6 }]); screen(() => fin(t, LL, [90, 60, 50])); pill('🍲 KADDU-BHAAT · CHANE KI DAAL', 360, eob(seg(t, L(2) + 0.3, L(2) + 0.6)), '#2f6f3a', '#fff', 38); } });
  add({ id: 'S04', at: cut(3), note: 'yard: Gudiya pulls Sonu to dry wheat for thekua', draw(lt, d, t) { K.camera(lc(lt, d, 1.45, 1.55), 540, 1050); home(t, { part: 'yard' }); N.person(400, 1300, 0.85, { ...GUD, arms: 'reach', mood: 'happy', look: 0.8 }); N.person(680, 1300, 1.1, { ...SONU, mood: 'ok', look: -0.6 });
    const LL = Wl([{ x: 540, y: 700, r: 1100, c: [255, 225, 170], i: 1 }]); screen(() => fin(t, LL, [110, 80, 60])); } });
  add({ id: 'S05', at: cut(4), note: 'Sonu frustrated, test in 5 days', draw(lt, d, t) { K.camera(lc(lt, d, 1.9, 2.05), 640, 960); home(t, { part: 'room' }); N.person(640, 1300, 1.2, { ...SONU, arms: 'phone', mood: 'scared', screen: '#f2e6c9' });
    const LL = Wl([{ x: 640, y: 900, r: 700, c: [255, 220, 170], i: 0.9 }]); screen(() => fin(t, LL, [90, 60, 50])); pill('📝 TEST: 5 DIN', 380, eob(seg(t, at('test', 4), at('test', 4) + 0.3)), '#b3121b', '#fff', 44); } });
  add({ id: 'S06', at: cut(5), note: 'phone rings: PAPA · DELHI', draw(lt, d, t) { ctx.fillStyle = '#120c0a'; ctx.fillRect(-300, -300, W + 600, H + 600); screen(() => { const sh = Math.sin(t * 60) * 6; phoneFrame(540 + sh, 860, 0.95, (x, y, w) => { ctx.fillStyle = '#16231b'; ctx.fillRect(x, y, w, 2000); ctx.fillStyle = '#d9c6a5'; ctx.beginPath(); ctx.arc(x + w / 2, y + 380, 120, 0, 7); ctx.fill(); font(60, 900); ctx.fillStyle = '#fff'; ctx.textAlign = 'center'; ctx.fillText('PAPA ❤️', x + w / 2, y + 600); font(34, 800); ctx.fillStyle = '#9fd9b2'; ctx.fillText('calling from Delhi…', x + w / 2, y + 660); ctx.fillStyle = '#2fbf5a'; ctx.beginPath(); ctx.arc(x + w / 2, y + 960, 70 + Math.sin(t * 8) * 6, 0, 7); ctx.fill(); }); N.grade(t, { vig: 0.5 }); folkBorder(); }); } });
  cue(cut(5), 'ding', { gain: 0.6 }); cue(cut(5) + 0.8, 'ding', { gain: 0.6 });
  add({ id: 'S07', at: cut(6), note: 'Papa standing in a crowded night train', draw(lt, d, t) { K.camera(lc(lt, d, 1.35, 1.5), 540, 1000); train(t); N.person(540, 1420, 1.25, { ...PAPA, arms: 'phone', mood: 'sad', head: 0.1 });
    const LL = Wl([{ x: 540, y: 820, r: 520, c: [210, 230, 255], i: 0.8 }, { x: 540, y: 300, r: 800, c: [255, 220, 160], i: 0.4 }]); screen(() => fin(t, LL, [40, 44, 52])); pill('🚆 KHADE-KHADE · POORI RAAT', 380, eob(seg(t, at('khade', 6), at('khade', 6) + 0.3)), '#1d2a3a', '#fff', 40); } });
  cue(cut(6), 'rustle', { gain: 0.4, dur: 3 });
  add({ id: 'S08', at: cut(7), note: 'Papa far away all year; home only for Chhath', draw(lt, d, t) { K.camera(lc(lt, d, 1.2, 1.3), 540, 980); ghat(t, { phase: 'dusk', sun: 0.4 }); N.person(540, 1460, 1.2, { ...PAPA, arms: 'down', mood: 'happy' });
    const LL = Wl([{ x: 540, y: 900, r: 1100, c: [255, 190, 120], i: 0.9 }]); screen(() => fin(t, LL, [110, 70, 80])); pill('SAAL BHAR BAHAR · BAS CHHATH PE GHAR', 360, eob(seg(t, L(7) + 0.3, L(7) + 0.6)), '#7a1d1d', '#ffe9b0', 34); } });
  cue(cut(7), 'sadviolin', { gain: 0.35, dur: 3 });
  add({ id: 'S09', at: cut(8), note: 'Sonu guilty close-up', draw(lt, d, t) { K.camera(lc(lt, d, 2.6, 2.8), 640, 900); home(t, { part: 'room', night: true }); N.person(640, 1300, 1.2, { ...SONU, arms: 'down', mood: 'sad', head: 0.12 });
    const LL = Wl([{ x: 640, y: 880, r: 360, c: [255, 200, 140], i: 0.9 }]); screen(() => fin(t, LL, [40, 30, 30])); } });
  add({ id: 'S10', at: cut(9), note: 'Zeta exam plan: 4 Chhath days, plan adjusted', draw(lt, d, t) { ctx.fillStyle = '#0a0706'; ctx.fillRect(-300, -300, W + 600, H + 600); screen(() => { const z = lerp(1.2, 1.3, eio(clamp(lt / d))); ctx.translate(540, 760); ctx.scale(z, z); ctx.translate(-540, -640); phoneFrame(540, 900, 1, (x, y, w) => uiPlanChhath(x, y, w, clamp((t - L(9)) / 3))); }); screen(() => { const g = ctx.createLinearGradient(0, 1200, 0, 1480); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(0.35, 'rgba(0,0,0,.7)'); g.addColorStop(1, 'rgba(0,0,0,.7)'); ctx.fillStyle = g; ctx.fillRect(0, 1200, W, 280); N.grade(t, { vig: 0.5 }); folkBorder(); }); } });
  for (let k = 0; k < 5; k++) cue(L(9) + 0.4 + k * 0.4, 'tock', { gain: 0.35 }); cue(at('adjust', 9), 'sparkle', { gain: 0.5 });
  add({ id: 'S11', at: cut(10), note: 'Sonu revising 30 min on the ghat', draw(lt, d, t) { K.camera(lc(lt, d, 1.4, 1.5), 540, 1080); ghat(t, { phase: 'dusk', sun: 0.35, soop: [800, 1470] }); N.person(380, 1520, 1.1, { ...SONU, pose: 'sit', arms: 'phone', mood: 'happy', screen: '#c9b8ff' });
    const LL = Wl([{ x: 540, y: 900, r: 1100, c: [255, 180, 110], i: 0.95 }, { x: 400, y: 1250, r: 280, c: [200, 190, 255], i: 0.6 }]); screen(() => fin(t, LL, [110, 70, 80])); pill('⏱️ 30:00', 360, eob(seg(t, L(10) + 0.2, L(10) + 0.5)), '#ffd43b', '#1a0e05', 64); } });
  add({ id: 'S12', at: cut(11), note: 'Maa with a diya: roz thoda, par roz', draw(lt, d, t) { K.camera(lc(lt, d, 2.0, 2.15), 520, 900); home(t, { part: 'room', night: true, diya: [420, 1080] }); N.person(520, 1300, 1.2, { ...MAA, arms: 'down', mood: 'happy', look: 0.4 });
    const LL = Wl([{ x: 440, y: 1000, r: 520, c: [255, 180, 90], i: 1 }]); const G = Wl([{ x: 420, y: 1062, r: 140 }]); screen(() => { fin(t, LL, [40, 28, 24]); N.glow(G[0].x, G[0].y, G[0].r, '255,180,80', 0.6); }); pill('ROZ THODA, PAR ROZ 🙏', 360, eob(seg(t, at('roz', 11), at('roz', 11) + 0.3)), '#e8a317', '#2a1505', 44); } });
  add({ id: 'S13', at: cut(12), note: 'Kharna kal: 36 ghante nirjala', draw(lt, d, t) { K.camera(1.0, 540, 960); ghat(t, { phase: 'dusk', sun: 0.15 }); const LL = Wl([{ x: 540, y: 1000, r: 1200, c: [255, 160, 100], i: 0.7 }]); screen(() => fin(t, LL, [70, 40, 60]));
    screen(() => { const k = eob(seg(t, at('chhattis', 12) - 0.1, at('chhattis', 12) + 0.3)); if (k <= 0) return; ctx.save(); ctx.translate(540, 640); ctx.scale(k, k); font(170, 900); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.lineWidth = 18; ctx.strokeStyle = 'rgba(60,10,5,.85)'; ctx.strokeText('36 GHANTE', 0, 0); ctx.fillStyle = '#ffe08a'; ctx.fillText('36 GHANTE', 0, 0); font(56, 900); ctx.strokeText('BINA PAANI 💧❌', 0, 130); ctx.fillStyle = '#fff'; ctx.fillText('BINA PAANI 💧❌', 0, 130); ctx.restore(); }); } });
  cue(at('chhattis', 12), 'boom', { gain: 0.6 });
  add({ id: 'S14', at: cut(13), note: 'Sonu decides: 30 min every day', draw(lt, d, t) { K.camera(lc(lt, d, 1.9, 2.1), 640, 940); home(t, { part: 'room', night: true }); N.person(640, 1300, 1.2, { ...SONU, arms: 'reach', mood: 'happy', look: -0.2 });
    const LL = Wl([{ x: 640, y: 880, r: 480, c: [255, 210, 150], i: 1 }]); screen(() => fin(t, LL, [50, 36, 32])); pill('SONU KA NIYAM: ROZ 30 MIN ✅', 360, eob(seg(t, at('tees', 13), at('tees', 13) + 0.3)), '#2f6f3a', '#fff', 40); } });
  cue(at('tees', 13), 'cash', { gain: 0.5 });
  add({ id: 'S15', at: cut(14), note: '12 AM: Papa phone switched off', draw(lt, d, t) { ctx.fillStyle = '#07050a'; ctx.fillRect(-300, -300, W + 600, H + 600); screen(() => { phoneFrame(540, 860, 0.95, (x, y, w) => { ctx.fillStyle = '#0d0d12'; ctx.fillRect(x, y, w, 2000); font(110, 800); ctx.fillStyle = '#dfe3ef'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('12:00', x + w / 2, y + 260); font(44, 900); ctx.fillStyle = '#fff'; ctx.fillText('Calling PAPA ❤️…', x + w / 2, y + 520); if (t > at('band', 14)) { rrp(x + 40, y + 600, w - 80, 150, 30); ctx.fillStyle = '#4a0d14'; ctx.fill(); font(38, 900); ctx.fillStyle = '#ff8a8a'; ctx.fillText('Switched off', x + w / 2, y + 675); } }); N.grade(t, { vig: 0.6 }); folkBorder(); }); } });
  cue(at('band', 14), 'boom', { gain: 0.7 }); cue(at('band', 14) + 0.1, 'heartbeat', { gain: 0.6 });
  add({ id: 'S16', at: cut(15), note: 'Chhath offer: 40% off, code CHHATH; comment CHHATH', draw(lt, d, t) { K.camera(1.05, 540, 980); ghat(t, { phase: 'dusk', sun: 0.3, soop: [540, 1470] }); const LL = Wl([{ x: 540, y: 900, r: 1200, c: [255, 180, 110], i: 0.95 }]); screen(() => fin(t, LL, [110, 70, 80]));
    screen(() => { const k = eob(seg(t, at('comment', 15) - 0.2, at('comment', 15) + 0.2)); if (k <= 0) return; ctx.save(); ctx.translate(540, 700); ctx.scale(k, k); rrp(-400, -260, 800, 520, 40); ctx.fillStyle = 'rgba(25,8,5,.88)'; ctx.fill(); ctx.strokeStyle = '#f3c14a'; ctx.lineWidth = 6; ctx.stroke();
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; font(40, 900); ctx.fillStyle = '#f3c14a'; ctx.fillText('🪔 CHHATH SPECIAL 🪔', 0, -190); font(150, 900); ctx.fillStyle = '#fff'; ctx.fillText('40% OFF', 0, -50); font(46, 900); ctx.fillStyle = '#ffd43b'; ctx.fillText('CODE: CHHATH', 0, 70); font(36, 800); ctx.fillStyle = '#fff'; ctx.fillText('Zeta Galaxy · zetagalaxy.com', 0, 150); font(38, 900); ctx.fillStyle = '#4fd1a5'; ctx.fillText('Comment "CHHATH" 👇 code DM mein', 0, 215); ctx.restore(); }); } });
  cue(at('comment', 15), 'sparkle', { gain: 0.6 });
  S.forEach((s, i) => { if (i) cue(s.at, 'whoosh', { gain: 0.2 }); });
  return { shots: S, cues: CUES, overlay: null };
}
