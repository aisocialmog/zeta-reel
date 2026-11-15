// CHHOTU KE 100 DIN · generic, data-driven episode builder.
// Every line of episode/script.json carries a `scene` (from the catalog in src/scenes.js) and optional `fx`, `aura`, `alt`.
// Nothing here is episode-specific: the daily script picks scenes + params, this file places them on the voice clock.
import { ctx, C, W, H, eo, pop, font, rr, withA, scaled } from './core/lib.js';
import { L, Le, T } from './core/timing.js';
import * as K from './core/kit.js';
import * as U from './core/ui.js';
import { SCENES, at, COL, setScript } from './scenes.js';

export function buildShots() {
  const script = window.SCRIPT; setScript(script);
  const S = [], CUES = [], n = script.lines.length;
  const cue = (t, type, o = {}) => CUES.push({ t: +Math.max(0, t).toFixed(3), type, ...o });
  const cut = (i) => (i === 0 ? 0 : L(i) - 0.08);
  // AURA keyframes: each line may set an absolute "aura" value; it animates in at that line's start
  const AURA = [[0, script.aura_start ?? 30]];
  script.lines.forEach((ln, i) => { if (ln.aura != null) AURA.push([L(i) + 0.4, ln.aura]); });
  let prevAlt = false;
  script.lines.forEach((ln, i) => {
    const sc = ln.scene || { type: 'big_text', text: '' };
    const fn = SCENES[sc.type] || SCENES.big_text;
    const ctxL = { i, ln, sc, speaker: ln.speaker || 'N', last: i === n - 1 };
    const rew = prevAlt && !ln.alt;   // first line back on the real path → rewind effect
    S.push({ id: 'S' + String(i + 1).padStart(2, '0'), at: cut(i), cam: [540, 960], zoom: i === 0 ? 0 : 0.02, punch: i === 0 ? 0 : 0.03, noFlash: i === 0,
      note: sc.type, draw(lt, d, t) {
        fn(lt, d, t, ctxL);
        if (ln.alt) withA(1, () => { ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalCompositeOperation = 'color'; ctx.fillStyle = 'rgba(150,110,60,.85)'; ctx.fillRect(0, 0, W, H); ctx.restore();
          K.tag(script.alt_label || 'AGAR B CHUNTE...', 440, '#7a5a30', 1); });
        if (rew) U.rewind(t, 1 - eo((t - L(i)) / 0.9));
        (ln.fx || []).forEach((f) => { const t0 = at(i, f.at), a = K.ramp(t, t0, 0.3); const col = COL(f.color);
          if (f.type === 'stamp') K.stamp(f.text, 540, f.y || 520, a, col, -0.07); else K.tag(f.text, f.y || 1150, col, pop(t, t0)); });
      } });
    if (i) cue(cut(i), 'whoosh', { gain: 0.45 });
    if (rew) cue(L(i), 'slide', { gain: 0.6 });
    (ln.fx || []).forEach((f) => cue(at(i, f.at), f.type === 'stamp' ? 'slam' : 'pop', { gain: 0.55 }));
    (ln.sfx || []).forEach((f) => cue(at(i, f.at), f.type, { gain: f.gain ?? 0.5 }));
    (fn.cues ? fn.cues(ctxL) : []).forEach((c) => cue(c[0], c[1], c[2] || {}));
  });
  // end card holds the A/B frame
  const end = Le(n - 1) + 0.12; { const s = S[S.length - 1]; S.push({ id: 'END', at: end, noCap: true, noFlash: true, zoom: 0, punch: 0, note: 'end card', draw: (lt, d, t) => s.draw(t - s.at, d, t) }); }
  cue(0, 'riser', { gain: 0.4, dur: Math.max(0.5, Le(0) - 0.2) }); cue(end, 'boom', { gain: 0.6 });
  const day = script.day, next = day - 1;
  const overlay = (t) => { const ha = t < 1.2 ? 0 : (t > end ? 0.4 : 1);
    if (ha > 0) U.hud(t, { days: day, aura: AURA, a: ha * K.ramp(t, 1.2, 0.3) }); if (t > 1.2) U.lifePill(t, K.ramp(t, 1.2, 0.3) * (t > end ? 0.4 : 1), 0, 0);
    if (t > end) { const a = K.ramp(t, end, 0.3); withA(eo(a) * 0.8, () => { ctx.fillStyle = '#0a0e1e'; ctx.fillRect(0, 0, W, H); }); K.tag(`DAY ${next} · KAL`, 560, C.blue, pop(t, end));
      withA(eo(K.ramp(t, end + 0.1, 0.3)), () => { font(96, 900); ctx.fillStyle = C.yellow; ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic'; ctx.fillText('A YA B?', W / 2, 760); font(46, 900); ctx.fillStyle = '#fff'; ctx.fillText('COMMENT KARO', W / 2, 840); });
      if (a > 0) scaled(W / 2, 1000, K.ramp(t, end + 0.3, 0.3), () => { rr(W / 2 - 360, 930, 720, 140, 24); ctx.fillStyle = '#fff'; ctx.fill(); font(32, 800); ctx.fillStyle = C.ink; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('Zyada log jo bolenge...', W / 2, 972); font(30, 800); ctx.fillStyle = C.red; ctx.fillText('kal wahi dikhega', W / 2, 1026); });
      withA(K.ramp(t, end + 0.5, 0.3), () => { font(30, 800); ctx.fillStyle = '#b9c3e6'; ctx.textAlign = 'center'; ctx.fillText('CHHOTU KE 100 DIN · ZETAGALAXY', W / 2, 1160); }); } };
  return { shots: S, cues: CUES, overlay };
}
