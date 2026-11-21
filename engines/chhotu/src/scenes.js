// Scene catalog. Each scene: fn(lt, d, t, {i, ln, sc, speaker, last}) and optional fn.cues(ctxL) -> [[t, type, opts]].
// All on-screen text stays inside the Instagram safe zone (x 120..930, y 300..1250; captions own y 1330).
import { ctx, C, W, H, clamp, lerp, eo, eio, eob, pop, font, rr, poly, withA, scaled, screen, circle as circ } from './core/lib.js';
import { L, Le, Wd } from './core/timing.js';
import * as K from './core/kit.js';
import * as R from './core/room.js';
import * as U from './core/ui.js';
import { chhotu, mishti, adult, mini } from './core/cast.js';
const FL = R.FL, ramp = K.ramp;
let SC = null; export const setScript = (s) => { SC = s; };
export const COL = (c) => ({ green: C.green, red: C.red, yellow: C.yellow, blue: C.blue, pink: '#ff5c93', orange: '#e07b00' }[c] || c || C.blue);
/* time of a word in line i (prefix match); falls back to the line start so a typo never breaks a render */
export function at(i, w) { if (w == null || w === '') return L(i) + 0.15; if (typeof w === 'number') return L(i) + w; try { return Wd(String(w), i); } catch { return L(i) + 0.15; } }
const fill = (col) => screen(() => { ctx.fillStyle = col; ctx.fillRect(0, 0, W, H); });
const talk = (t) => Math.abs(Math.sin(t * 13)) * 0.7;
const txt = (s, x, y, size, col, align = 'center', w = 900) => { font(size, w); ctx.fillStyle = col; ctx.textAlign = align; ctx.textBaseline = 'middle'; ctx.fillText(s, x, y); };
const fitTxt = (s, x, y, size, col, maxW) => { font(size); let z = size; while (ctx.measureText(s).width > maxW && z > 22) { z -= 2; font(z); } txt(s, x, y, z, col); };

/* ---------- people ---------- */
const DRAW = {
  chhotu: (x, s, o) => chhotu(x, FL + 6, s, o), mishti: (x, s, o) => mishti(x, FL + 6, s, o),
  mummy: (x, s, o) => adult(x, FL + 6, s * 1.18, 'mummy', o), papa: (x, s, o) => adult(x, FL + 6, s * 1.25, 'papa', o)
};
const SLOTS = { 1: [540], 2: [400, 680], 3: [300, 540, 780] };
function people(sc, t, ctxL, base = {}) {
  const list = (sc.people || base.people || ['chhotu']).filter((p) => DRAW[p]); const xs = SLOTS[Math.min(3, list.length)] || SLOTS[3];
  const moods = sc.moods || {}, arms = sc.arms || {}; let focusX = 540;
  list.forEach((p, k) => { const x = xs[k], spk = ctxL.speaker === p; if (spk) focusX = x;
    const o = { mood: moods[p] || (spk ? 'happy' : 'ok'), arms: arms[p], look: x < 540 ? 1 : x > 540 ? -1 : 0, open: spk ? talk(t) : 0, flip: false };
    if (p === 'chhotu' && sc.headband) o.headband = true; if (p === 'chhotu' && sc.sweat) o.sweat = 1; if (p === 'chhotu' && sc.blush) o.blush = 1;
    DRAW[p](x, 1, o);
    if (sc.prop && (sc.prop_on || 'chhotu') === p) prop(sc.prop, x, t, ctxL, sc); });
  return focusX;
}
function prop(kind, x, t, ctxL, sc) {
  const t0 = at(ctxL.i, sc.prop_at), g = eob(ramp(t, t0, 0.6)); if (g <= 0) return;
  if (kind === 'balloon' && sc.prop_pop_at != null && t > at(ctxL.i, sc.prop_pop_at)) { U.debris(t, at(ctxL.i, sc.prop_pop_at), x + 60, 560, 20, C.red); return; }
  if (kind === 'balloon') { ctx.strokeStyle = '#555'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x, FL - 260); ctx.lineTo(x + 40, 640); ctx.stroke(); circ(x + 60, 560, 110 * g, C.red); fitTxt(sc.prop_text || 'EGO', x + 60, 562, 44 * g + 1, '#fff', 190); }
  if (kind === 'bulb') { circ(x, 610, 60 * g, C.yellow); ctx.fillStyle = '#888'; ctx.fillRect(x - 22, 660, 44, 30 * g); withA(0.4 * g, () => circ(x, 610, 110, C.yellow)); }
  if (kind === 'question') txt('?', x + 70, 640, 150 * g, C.yellow);
  if (kind === 'heart') U.heart(x + 60, 650 - 30 * Math.sin(t * 3), 3 * g, '#ff5c93');
  if (kind === 'zzz') for (let i = 0; i < 3; i++) { const p = ((t * 0.5 + i / 3) % 1); withA(1 - p, () => txt('Z', x - 140 + p * 60 + i * 20, 760 - p * 140, 40 + i * 10, '#b9c3e6')); }
  if (kind === 'sweat') { ctx.fillStyle = 'rgba(120,190,255,.95)'; for (let i = 0; i < 3; i++) { const p = (t * 0.8 + i / 3) % 1; ctx.beginPath(); ctx.ellipse(x - 70 + i * 70, 760 + p * 120, 9, 15, 0, 0, 7); ctx.fill(); } }
}

/* ---------- sets ---------- */
function bedroomSet(t, sc) { const mood = sc.mood || 'night'; R.room(mood, t, { winX: 720 }); U.door(40, FL, {}); R.bed(270, FL); R.table(720, FL, 340); R.lamp(1000, FL - 200, sc.lamp ? 1 : 0); R.books(830, FL - 200, 0, 0, 3); }
function librarySet() {
  ctx.fillStyle = '#e7d3ad'; ctx.fillRect(-600, -600, W + 1200, FL + 600); ctx.fillStyle = '#8a5f3a'; ctx.fillRect(-600, FL, W + 1200, 70); ctx.fillStyle = '#3a2a1f'; ctx.fillRect(-600, FL + 70, W + 1200, H);
  const cols = ['#e8573f', '#4f7fd1', '#2f9e57', '#f0a030', '#b05cc8', '#3cb7b0', '#c9b48a'];
  for (let sh = 0; sh < 4; sh++) { const y = 300 + sh * 150; ctx.fillStyle = '#7d5532'; ctx.fillRect(-100, y + 120, 1280, 16);
    for (let i = 0, x = -100; x < 1180; i++) { const w = 26 + ((i * 37 + sh * 11) % 22), h = 90 + ((i * 53 + sh) % 30); ctx.fillStyle = cols[(i + sh * 3) % cols.length]; ctx.fillRect(x, y + 120 - h, w, h); x += w + 4; } }
  rr(120, FL - 210, 840, 24, 6); ctx.fillStyle = '#9b6b40'; ctx.fill(); ctx.fillStyle = '#7d5532'; ctx.fillRect(150, FL - 186, 20, 186); ctx.fillRect(910, FL - 186, 20, 186);
}
function homeSet(t, sc) { R.room(sc.mood || 'day', t, { winX: 140 }); // sofa + tv
  rr(560, FL - 170, 420, 110, 30); ctx.fillStyle = '#b5523b'; ctx.fill(); rr(540, FL - 230, 460, 80, 30); ctx.fillStyle = '#9c4430'; ctx.fill(); ctx.fillStyle = '#5b3a2a'; ctx.fillRect(580, FL - 60, 18, 60); ctx.fillRect(940, FL - 60, 18, 60);
  rr(470, 430, 180, 120, 10); ctx.fillStyle = '#222'; ctx.fill(); rr(480, 440, 160, 100, 6); ctx.fillStyle = sc.mood === 'night' ? '#3d5a9c' : '#2b2f3a'; ctx.fill(); }
function classSet(t, sc) { ctx.fillStyle = '#d8e3d0'; ctx.fillRect(-600, -600, W + 1200, FL + 600); ctx.fillStyle = '#8a5f3a'; ctx.fillRect(-600, FL, W + 1200, 70); ctx.fillStyle = '#3a2a1f'; ctx.fillRect(-600, FL + 70, W + 1200, H);
  rr(150, 480, 780, 330, 16); ctx.fillStyle = '#6b4a2f'; ctx.fill(); rr(170, 500, 740, 290, 10); ctx.fillStyle = '#244a35'; ctx.fill();
  if (sc.board) { font(52, 800); ctx.fillStyle = '#eef5ea'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; U.wrap(String(sc.board), 660).slice(0, 4).forEach((l, k, a) => ctx.fillText(l, 540, 645 - (a.length - 1) * 34 + k * 68)); } }
function location(setFn, defPeople) {
  const f = (lt, d, t, c) => { const sc = c.sc; const focus = sc.focus === false ? null : (c.speaker !== 'N' ? c.speaker : sc.focus);
    const list = sc.people || defPeople, xs = SLOTS[Math.min(3, list.length)] || SLOTS[3], fx = focus && list.includes(focus) ? xs[list.indexOf(focus)] : 540;
    K.camera(focus && list.includes(focus) ? 1.6 : lerp(1.2, 1.3, eo(lt / 3)), fx, 900); setFn(t, sc);
    if (sc.mood === 'night' && sc.dark !== false && setFn === bedroomSet && !sc.lamp) R.dark(0.3);
    people(sc, t, c, { people: defPeople }); };
  return f;
}
function bedroom(lt, d, t, c) { const sc = c.sc; const pose = sc.chhotu || 'stand';
  K.camera(lerp(1.4, 1.5, eo(lt / 3)), 540, 930); bedroomSet(t, sc);
  if (pose === 'sleep') { R.dark(sc.mood === 'night' ? 0.45 : 0); chhotu(520, FL - 150, 0.85, { pose: 'sleep', mood: 'tired' }); R.blanket(420, FL, 250); prop('zzz', 520, t, c, { prop_at: 0 }); }
  else if (pose === 'sit') { chhotu(420, FL - 40, 0.95, { pose: 'sit', arms: (sc.arms || {}).chhotu || 'fist', mood: (sc.moods || {}).chhotu || 'happy', open: c.speaker === 'chhotu' ? talk(t) : 0 }); }
  else if (pose === 'phone' || pose === 'study') { if (sc.mood === 'night' && !sc.lamp) R.dark(0.35); chhotu(780, FL + 6, 1.0, { arms: pose === 'phone' ? 'phone' : 'write', mood: (sc.moods || {}).chhotu || (pose === 'phone' ? 'happy' : 'think'), look: -0.4, open: c.speaker === 'chhotu' ? talk(t) : 0 });
    if (pose === 'phone') R.phone(800, FL - 106, 0.45, 0.9, 0); }
  else { const others = (sc.people || ['chhotu']); if (sc.mood === 'night' && !sc.lamp) R.dark(0.3); people({ ...sc, people: others }, t, c); }
  if (sc.prop && pose !== 'stand') prop(sc.prop, pose === 'sleep' ? 520 : 600, t, c, sc);
}
/* ---------- phone / cards ---------- */
function chat(lt, d, t, c) { const sc = c.sc, msgs = sc.msgs || []; fill('#0d1124');
  screen(() => U.phone(540, 800, 640, 1040, (sx, sy, sw, sh) => { ctx.fillStyle = '#efe7dc'; ctx.fillRect(sx, sy, sw, sh); U.chatHeader(sx, sy, sw, sc.name || 'Pari', sc.status || 'online');
    let y = sy + 200; const span = Math.max(0.5, Le(c.i) - L(c.i)); msgs.slice(0, 5).forEach((m, k) => { const t0 = m.at != null ? at(c.i, m.at) : L(c.i) + span * k / Math.max(1, msgs.length); y = U.bubble(sx, sw, y, m.text, m.side === 'r' ? 'r' : 'l', pop(t, t0)) + 18; }); })); }
chat.cues = (c) => (c.sc.msgs || []).slice(0, 5).map((m, k, a) => [m.at != null ? at(c.i, m.at) : L(c.i) + Math.max(0.5, Le(c.i) - L(c.i)) * k / a.length, 'pop', { gain: 0.5 }]);
function comment(lt, d, t, c) { const sc = c.sc; fill('#0d1124');
  screen(() => { const a = pop(t, L(c.i) - 0.05); scaled(540, 640, a, () => { rr(120, 480, 840, 320, 40); ctx.fillStyle = '#fff'; ctx.fill(); circ(200, 560, 40, '#8fb5ff'); txt(sc.user || 'ek comment', 260, 552, 28, '#7a7d85', 'left', 800);
    font(40, 900); ctx.fillStyle = C.ink; ctx.textAlign = 'left'; U.wrap('"' + (sc.text || '') + '"', 680).slice(0, 3).forEach((l, k) => ctx.fillText(l, 180, 640 + k * 52)); U.heart(890, 760, 1.2, C.red); });
    if (sc.stamp) K.stamp(sc.stamp, 540, 920, ramp(t, at(c.i, sc.stamp_at), 0.3), COL(sc.stamp_color || 'green'), -0.07); }); }
comment.cues = (c) => [[L(c.i), 'pop', {}], ...(c.sc.stamp ? [[at(c.i, c.sc.stamp_at), 'slam', { gain: 0.6 }]] : [])];
function paperCard(cx, cy, title, score, col, ring, rot) { ctx.save(); ctx.translate(cx, cy); ctx.rotate(rot); ctx.shadowColor = 'rgba(0,0,0,.4)'; ctx.shadowBlur = 30; rr(-260, -340, 520, 680, 12); ctx.fillStyle = '#fbf8f0'; ctx.fill(); ctx.shadowBlur = 0;
  fitTxt(title, 0, -280, 34, C.ink, 470); ctx.fillStyle = '#d8d2c4'; ctx.fillRect(-220, -250, 440, 4); for (let k = 0; k < 7; k++) { ctx.fillStyle = '#e3ddcf'; ctx.fillRect(-220, -200 + k * 60, 300 + (k * 47) % 140, 18); }
  if (score) { ctx.strokeStyle = col; ctx.lineWidth = 10; ctx.beginPath(); ctx.ellipse(120, 180, 120, 90, -0.1, 0, Math.PI * 2 * ring); ctx.stroke(); fitTxt(score, 120, 186, 96, col, 220); } ctx.restore(); }
function paper(lt, d, t, c) { const sc = c.sc, t0 = at(c.i, sc.score_at); fill('#10142a');
  screen(() => { scaled(540, 760, eob(ramp(t, L(c.i), 0.35)), () => paperCard(540, 760, sc.title || 'TEST', t > t0 ? sc.score : null, COL(sc.color || 'green'), ramp(t, t0, 0.5), sc.rot ?? -0.03));
    if (sc.was && t > t0) { const a = pop(t, t0 + 0.4); scaled(300, 1180, a, () => { rr(170, 1140, 260, 80, 16); ctx.fillStyle = '#2a2f4a'; ctx.fill(); txt('pehle: ' + sc.was, 300, 1182, 40, C.grey); }); } }); }
paper.cues = (c) => [[L(c.i), 'slam', { gain: 0.5 }], [at(c.i, c.sc.score_at), 'cash', { gain: 0.6 }]];
function notice(lt, d, t, c) { const sc = c.sc; fill('#14182e'); screen(() => { const a = pop(t, at(c.i, sc.at)); if (a <= 0) return; scaled(540, 700, a, () => { rr(170, 500, 740, 420, 26); ctx.fillStyle = C.yellow; ctx.fill();
  fitTxt(sc.top || 'NOTICE', 540, 580, 40, C.ink, 680); fitTxt(sc.big || '', 540, 700, 80, C.ink, 680); fitTxt(sc.bottom || '', 540, 820, 46, C.red, 680); }); }); }
notice.cues = (c) => [[at(c.i, c.sc.at), 'slam', { gain: 0.6 }]];
function bar(lt, d, t, c) { const sc = c.sc, mx = sc.max || 100, v = sc.value ?? 50, tg = sc.target; fill('#10142a');
  screen(() => { const p = eo(ramp(t, L(c.i), 0.8)); fitTxt(sc.label || '', 540, 520, 52, '#fff', 780); rr(160, 640, 760, 90, 20); ctx.fillStyle = '#2a2f4a'; ctx.fill(); rr(160, 640, Math.max(20, 760 * v / mx * p), 90, 20); ctx.fillStyle = COL(sc.color || 'green'); ctx.fill();
    txt(String(Math.round(v * p)), Math.max(220, 160 + 760 * v / mx * p - 50), 686, 44, '#fff');
    if (tg != null) { ctx.fillStyle = C.yellow; ctx.fillRect(160 + 760 * tg / mx, 610, 8, 150); txt(String(tg), 164 + 760 * tg / mx, 580, 44, C.yellow); }
    if (sc.stamp) K.stamp(sc.stamp, 540, 900, ramp(t, at(c.i, sc.stamp_at), 0.3), COL(sc.stamp_color || 'red'), -0.06); }); }
bar.cues = (c) => (c.sc.stamp ? [[at(c.i, c.sc.stamp_at), 'thud', { gain: 0.7 }]] : []);
function alarm(lt, d, t, c) { const sc = c.sc, ring = sc.ring ? 1 : 0; fill(sc.dark ? '#0d1124' : '#d9c7a8'); screen(() => { U.alarmClock(540, 720, 200, sc.h ?? 6, sc.m ?? 0, ring, t); if (sc.label) K.tag(sc.label, 1100, COL(sc.color || 'red'), pop(t, L(c.i) + 0.2)); }); }
alarm.cues = (c) => (c.sc.ring ? [[L(c.i), 'alarm', { gain: 0.5, dur: Math.min(2, Le(c.i) - L(c.i)) }]] : [[L(c.i), 'tick', {}]]);
function zeta(lt, d, t, c) { const sc = c.sc, pts = (sc.points || []).slice(0, 4); fill('#1d2546');
  screen(() => { const a = pop(t, L(c.i) - 0.05); if (a <= 0) return; scaled(540, 820, a, () => U.phone(540, 820, 600, 940, (sx, sy, sw, sh) => {
    ctx.fillStyle = '#f7f4ee'; ctx.fillRect(sx, sy, sw, sh); ctx.fillStyle = '#1d2546'; ctx.fillRect(sx, sy, sw, 150); circ(sx + 66, sy + 95, 26, C.yellow); txt('Zeta Galaxy · ' + (sc.kind || 'Notes'), sx + 108, sy + 86, 32, '#fff', 'left');
    font(22, 800); ctx.fillStyle = '#b9c3e6'; ctx.fillText((sc.chapter || 'Quick revision').slice(0, 34), sx + 108, sy + 120);
    pts.forEach((s, k) => { const on = ramp(t, L(c.i) + 0.6 + k * 0.35, 0.3); withA(0.3 + 0.7 * on, () => { rr(sx + 30, sy + 190 + k * 120, sw - 60, 96, 18); ctx.fillStyle = '#fff'; ctx.fill(); rr(sx + 30, sy + 190 + k * 120, 12, 96, 6); ctx.fillStyle = k === pts.length - 1 ? C.red : C.yellow; ctx.fill();
      font(30, 800); let z = 30; while (ctx.measureText(s).width > sw - 110 && z > 20) { z -= 2; font(z, 800); } ctx.fillStyle = C.ink; ctx.textAlign = 'left'; ctx.fillText(s, sx + 64, sy + 238 + k * 120); }); }); })); });
  withA(ramp(t, at(c.i, sc.at), 0.3), () => screen(() => txt('zetagalaxy.com', 540, 1240, 26, '#5a6390', 'center', 800))); }
zeta.cues = (c) => [[L(c.i), 'pop', {}], ...(c.sc.points || []).slice(0, 4).map((_, k) => [L(c.i) + 0.6 + k * 0.35, 'tock', { gain: 0.4 }])];
function devilAngel(lt, d, t, c) { const sc = c.sc; K.camera(1.3, 540, 880); bedroomSet(t, { mood: sc.mood || 'night' }); R.dark(0.3); chhotu(540, FL + 6, 1, { mood: 'think', look: 0 });
  const dv = at(c.i, sc.devil_at), an = at(c.i, sc.angel_at); mini(330, 700, 0.6, 'devil', t, { open: t > dv && t < an ? talk(t) : 0, look: 1 }); mini(750, 700, 0.6, 'angel', t, { open: t > an ? talk(t) : 0, look: -1 });
  screen(() => { if (sc.devil) withA(pop(t, dv), () => { rr(130, 360, 400, 110, 24); ctx.fillStyle = '#d92b20'; ctx.fill(); fitTxt(sc.devil, 330, 415, 34, '#fff', 370); });
    if (sc.angel) withA(pop(t, an), () => { rr(550, 360, 400, 110, 24); ctx.fillStyle = '#fff'; ctx.fill(); fitTxt(sc.angel, 750, 415, 34, C.ink, 370); }); }); }
devilAngel.cues = (c) => [[at(c.i, c.sc.devil_at), 'boing', { gain: 0.4 }], [at(c.i, c.sc.angel_at), 'sparkle', { gain: 0.4 }]];
function bigText(lt, d, t, c) { const sc = c.sc; fill(sc.bg || '#10142a'); screen(() => { const a = pop(t, at(c.i, sc.at)); scaled(540, 760, a, () => {
  font(110, 900); const lines = U.wrap(String(sc.text || ''), 780).slice(0, 3); lines.forEach((l, k) => fitTxt(l, 540, 760 - (lines.length - 1) * 60 + k * 120, 110, COL(sc.color || 'yellow'), 800));
  if (sc.sub) fitTxt(sc.sub, 540, 760 + lines.length * 60 + 50, 46, '#fff', 780); }); }); }
bigText.cues = (c) => [[at(c.i, c.sc.at), 'boom', { gain: 0.4 }]];
function ab(lt, d, t, c) { const ch = SC.choice || {}; fill('#0d1124'); const tA = at(c.i, 'a'), tB = at(c.i, 'b');
  screen(() => { const card = (x, a, letter, lab, col, on, icon) => { if (a <= 0) return; scaled(x + 195, 760, eob(a), () => { rr(x, 400, 390, 760, 30); ctx.fillStyle = on ? '#222a5c' : '#161b3a'; ctx.fill(); ctx.strokeStyle = col; ctx.lineWidth = on ? 10 : 4; ctx.stroke();
      txt(letter, x + 195, 540, 200, col); icon(x + 195, 820); font(46, 900); ctx.fillStyle = '#fff'; const ls = U.wrap(lab, 340).slice(0, 2); ls.forEach((l, k) => fitTxt(l, x + 195, 1040 + k * 54 - (ls.length - 1) * 27, 44, '#fff', 350)); }); };
    const ico = (who) => (cx, cy) => { const w = (who || ['chhotu']); w.slice(0, 2).forEach((p, k, a) => { const xx = cx + (a.length > 1 ? (k ? 60 : -60) : 0); (p === 'mishti' ? mishti : p === 'mummy' ? (x, y, s, o) => adult(x, y, s * 1.1, 'mummy', o) : p === 'papa' ? (x, y, s, o) => adult(x, y, s * 1.1, 'papa', o) : chhotu)(xx, cy + 120, 0.6, { mood: k ? 'happy' : (ch.a_mood || 'happy') }); }); };
    card(130, pop(t, L(c.i)), 'A', ch.a || 'A', C.yellow, t > tA && t < tB, ico(ch.a_people));
    card(560, pop(t, L(c.i) + 0.2), 'B', ch.b || 'B', '#ff8fb5', t > tB, ico(ch.b_people)); }); }
ab.cues = (c) => [[L(c.i), 'boom', { gain: 0.6 }], [at(c.i, 'a'), 'pop', {}], [at(c.i, 'b'), 'pop', {}]];

/* ---------- hooks (line 0; a different one every day) ---------- */
function hook_battery(lt, d, t, c) { const sc = c.sc; K.camera(1.5, 470, 930); bedroomSet(t, { mood: 'night' }); R.dark(0.45); chhotu(520, FL - 150, 0.85, { pose: 'sleep', mood: 'tired' });
  screen(() => { const ch = (sc.from ?? 15) / 100 + (1 - (sc.from ?? 15) / 100) * eo(ramp(t, 0, Le(0))) * ((sc.to ?? 100) / 100); rr(300, 300, 440, 200, 30); ctx.fillStyle = 'rgba(12,14,30,.9)'; ctx.fill(); ctx.strokeStyle = '#fff'; ctx.lineWidth = 8; ctx.stroke(); rr(740, 360, 26, 80, 8); ctx.fillStyle = '#fff'; ctx.fill();
    rr(320, 320, 400 * clamp(ch), 160, 20); ctx.fillStyle = ch < 0.4 ? C.red : ch < 0.75 ? C.yellow : C.green; ctx.fill(); txt((sc.label || 'DIMAAG') + ' ' + Math.round(ch * 100) + '%', 520, 560, 40, '#fff'); chipAt(sc, t, c); }); }
function chipAt(sc, t, c) { if (!sc.chip) return; scaled(540, 690, eob(ramp(t, at(0, sc.chip_at) , 0.3)), () => { font(40, 900); const w = Math.min(820, ctx.measureText(sc.chip).width + 60); rr(540 - w / 2, 650, w, 80, 40); ctx.fillStyle = C.yellow; ctx.fill(); fitTxt(sc.chip, 540, 692, 40, C.ink, w - 40); }); }
function hook_crack(lt, d, t, c) { const sc = c.sc, tc = at(0, sc.crack_at ?? 0.9); fill('#0d1124'); screen(() => { const sh = t > tc && t < tc + 0.3 ? Math.sin(t * 90) * 12 : 0;
  U.hundred(540 + sh, 760, t > tc ? 1 : 0.9 + 0.1 * eo(t / tc), 0, 1, String(t > tc ? (sc.to ?? SC.day) : (sc.from ?? SC.day + 1)));
  if (t > tc) { U.debris(t, tc, 540, 760, 22); withA(1 - ramp(t, tc, 0.4), () => { ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, W, H); }); }
  if (sc.sub) withA(ramp(t, tc + 0.2, 0.3), () => fitTxt(sc.sub, 540, 1060, 50, C.yellow, 800)); chipAt(sc, t, c); }); }
hook_crack.cues = (c) => [[at(0, c.sc.crack_at ?? 0.9), 'glass', { gain: 0.7 }], [at(0, c.sc.crack_at ?? 0.9), 'boom', { gain: 0.5 }]];
function hook_vote(lt, d, t, c) { const sc = c.sc, pa = sc.a ?? (SC.vote && SC.vote.a) ?? 0.6; fill('#0d1124'); screen(() => { U.voteBoard(540, 520, pa, eo(ramp(t, 0.1, 1.2)), ramp(t, 1.4, 0.3));
  if (sc.stamp) K.stamp(sc.stamp, 540, 980, ramp(t, at(0, sc.stamp_at ?? 1.6), 0.3), COL(sc.stamp_color || 'green'), -0.07); }); }
hook_vote.cues = (c) => [[1.4, 'cash', { gain: 0.6 }], ...(c.sc.stamp ? [[at(0, c.sc.stamp_at ?? 1.6), 'slam', {}]] : [])];
function hook_notifs(lt, d, t, c) { const sc = c.sc, items = (sc.items || [{ name: 'Pari', msg: 'Kal ka result aa gaya 👀' }]).slice(0, 4); K.camera(1.5, 560, 930); bedroomSet(t, { mood: 'night' }); R.dark(0.4);
  chhotu(640, FL + 6, 1, { arms: 'phone', mood: 'scared', look: -0.3 }); R.phone(660, FL - 106, 0.45, 1, t);
  items.forEach((it, k) => U.notif(ramp(t, 0.1 + k * 0.45, 0.35), 300 + k * 200, it.name || 'Pari', it.msg || '')); }
hook_notifs.cues = (c) => (c.sc.items || [1]).slice(0, 4).map((_, k) => [0.1 + k * 0.45, 'ding', { gain: 0.5 }]);
function hook_stamp(lt, d, t, c) { const sc = c.sc; fill(sc.bg || '#14060a'); screen(() => { const sh = t < 0.5 ? Math.sin(t * 80) * 10 * (1 - t / 0.5) : 0; ctx.translate(sh, 0);
  withA(0.18 + 0.08 * Math.sin(t * 6), () => U.hundred(540, 760, 1.15, 0, 1, String(SC.day))); K.stamp(sc.text || 'ALERT', 540, 820, ramp(t, 0.05, 0.3), COL(sc.color || 'red'), -0.08); if (sc.sub) withA(ramp(t, 0.6, 0.3), () => fitTxt(sc.sub, 540, 1000, 50, '#fff', 800)); if (sc.chip) { const cc = { ...sc, chip_at: 0 }; ctx.save(); ctx.translate(0, -230); chipAt(cc, t, c); ctx.restore(); } }); }
hook_stamp.cues = () => [[0.05, 'slam', { gain: 0.8 }], [0.05, 'boom', { gain: 0.5 }]];
function hook_timer(lt, d, t, c) { const sc = c.sc, m0 = sc.minutes ?? 10; fill('#120a0a'); screen(() => { const left = Math.max(0, m0 * 60 - t * (sc.speed ?? 40)); const blink = Math.floor(t * 4) % 2;
  U.digital(540, 700, Math.floor(left / 60), left % 60, 230, blink ? C.red : '#ff8a80'); if (sc.label) fitTxt(sc.label, 540, 900, 50, '#fff', 800); chipAt(sc, t, c); }); }
hook_timer.cues = (c) => Array.from({ length: Math.ceil(Le(0) / 0.5) }, (_, k) => [k * 0.5, 'tick', { gain: 0.5 }]);
function hook_zoom(lt, d, t, c) { const sc = c.sc; const z = lerp(1.0, 2.6, eio(clamp(t / Math.max(1, Le(0))))); K.camera(z, sc.x ?? 540, 820); (sc.set === 'library' ? librarySet : bedroomSet)(t, { mood: sc.mood || 'day' });
  people({ people: sc.people || ['chhotu'], moods: sc.moods || { chhotu: 'scared' } }, t, c, {}); screen(() => { if (sc.text) K.stamp(sc.text, 540, 420, ramp(t, at(0, sc.text_at ?? 0.8), 0.3), COL(sc.color || 'red'), -0.06); chipAt(sc, t, c); }); }
hook_zoom.cues = (c) => [[0.1, 'riser', { gain: 0.5, dur: 1.2 }], [at(0, c.sc.text_at ?? 0.8), 'slam', {}]];

const invEio = (y) => { let lo = 0, hi = 1; for (let k = 0; k < 30; k++) { const m = (lo + hi) / 2; eio(m) < y ? (lo = m) : (hi = m); } return lo; };
/* hook_graph: a parabola draws itself on graph paper; the points where it cuts the x-axis pop as red "ZERO" dots */
function hook_graph(lt, d, t, c) { const sc = c.sc, ax = 900, r = sc.root ?? 220, k = 260 / (r * r), x0 = 160, x1 = 920, dur = sc.draw ?? 1.3;
  const Y = (x) => ax + 260 - k * (x - 540) * (x - 540), p = eio(ramp(t, 0.1, dur)); fill(sc.bg || '#0b1a2e');
  screen(() => { ctx.strokeStyle = 'rgba(120,170,255,.16)'; ctx.lineWidth = 2; for (let x = 140; x <= 940; x += 40) { ctx.beginPath(); ctx.moveTo(x, 320); ctx.lineTo(x, 1200); ctx.stroke(); } for (let y = 320; y <= 1200; y += 40) { ctx.beginPath(); ctx.moveTo(140, y); ctx.lineTo(940, y); ctx.stroke(); }
    ctx.strokeStyle = '#cfe0ff'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(130, ax); ctx.lineTo(950, ax); ctx.stroke(); ctx.beginPath(); ctx.moveTo(540, 330); ctx.lineTo(540, 1200); ctx.stroke(); txt('x', 925, ax - 32, 40, '#cfe0ff'); txt('y', 572, 350, 40, '#cfe0ff');
    const xe = x0 + (x1 - x0) * p; ctx.strokeStyle = C.yellow; ctx.lineWidth = 14; ctx.lineCap = 'round'; ctx.shadowColor = C.yellow; ctx.shadowBlur = 24; ctx.beginPath();
    for (let x = x0; x <= xe; x += 6) { x === x0 ? ctx.moveTo(x, Y(x)) : ctx.lineTo(x, Y(x)); } ctx.stroke(); ctx.shadowBlur = 0;
    if (p > 0 && p < 1) circ(xe, Y(xe), 16, '#fff');
    [540 - r, 540 + r].forEach((xr) => { const tr = 0.1 + dur * invEio((xr - x0) / (x1 - x0)); const a = eob(ramp(t, tr, 0.3)); if (a <= 0) return;
      withA(0.35 * a, () => circ(xr, ax, 60 * a, C.red)); circ(xr, ax, 22 * a, C.red); scaled(xr, ax + 70, a, () => { rr(xr - 80, ax + 42, 160, 58, 29); ctx.fillStyle = C.red; ctx.fill(); txt(sc.root_label || 'ZERO', xr, ax + 72, 34, '#fff'); }); });
    if (sc.text) K.stamp(sc.text, 540, 470, ramp(t, at(0, sc.text_at ?? 1.6), 0.3), COL(sc.color || 'green'), -0.06);
    if (sc.chip) { ctx.save(); ctx.translate(0, 1180 - 690); chipAt(sc, t, c); ctx.restore(); } }); }
hook_graph.cues = (c) => { const r = c.sc.root ?? 220, dur = c.sc.draw ?? 1.3; return [[0.1, 'riser', { gain: 0.5, dur: dur }], ...[540 - r, 540 + r].map((xr) => [0.1 + dur * invEio((xr - 160) / 760), 'pop', { gain: 0.7 }]), ...(c.sc.text ? [[at(0, c.sc.text_at ?? 1.6), 'slam', {}]] : [])]; };

export const SCENES = {
  bedroom, library: location(librarySet, ['mishti', 'chhotu']), home: location(homeSet, ['mummy', 'chhotu']), classroom: location(classSet, ['chhotu', 'mishti']),
  chat, comment, paper, notice, bar, alarm, zeta, devil_angel: devilAngel, big_text: bigText, ab,
  hook_battery, hook_crack, hook_vote, hook_notifs, hook_stamp, hook_timer, hook_zoom, hook_graph
};
for (const k of ['library', 'home', 'classroom']) SCENES[k].cues = () => [];
