// 15 s VISUAL HOOK sample — "Is duniya mein, jitna padhoge, utna chamkoge" (rule + visible body consequence).
import { L, Le, Wd } from './core/timing.js';
import * as K from './core/zkit.js';
const { V3, Z, blink, clamp, lerp, seg, eo, eio, eob, THREE, txt, pill, slam, dim } = K;

export function buildShots(E) {
  const S = [], CUES = [], add = (o) => (S.push(o), o), cue = (t, type, o = {}) => CUES.push({ t: +t.toFixed(3), type, ...o });
  const cut = (i) => (i === 0 ? 0 : L(i) - 0.06);
  const scene = new THREE.Scene(); scene.background = new THREE.Color('#1A1F3A');
  const sun = K.WD.sunlight(scene, E, { pos: [-6, 9, 8], target: [0, 1, 0], box: 9, i: 1.0, hemi: 0.55 });
  const C = K.classroom(scene, { origin: [0, 0, 0], board: 'BOARDS 2027 · 82 DIN' });
  // chairs behind the desks
  C.desks.forEach((p) => { const s = K.brick(0.9, 0.12, 0.8, '#4B3FD8'); s.position.set(p.x, 0.85, p.z + 0.8); scene.add(s); const b = K.brick(0.9, 0.9, 0.1, '#4B3FD8'); b.position.set(p.x, 1.35, p.z + 1.2); scene.add(b);
    const bk = K.brick(0.6, 0.06, 0.45, '#FFFFFF'); bk.position.set(p.x, 1.3, p.z); scene.add(bk); });

  // glow: per-avatar materials with mint emissive + an additive halo sprite + a small point light
  const haloTex = (() => { const c = document.createElement('canvas'); c.width = c.height = 128; const g = c.getContext('2d'); const gr = g.createRadialGradient(64, 64, 0, 64, 64, 64); gr.addColorStop(0, 'rgba(120,255,214,0.9)'); gr.addColorStop(0.4, 'rgba(61,224,176,0.35)'); gr.addColorStop(1, 'rgba(61,224,176,0)'); g.fillStyle = gr; g.fillRect(0, 0, 128, 128); const t = new THREE.CanvasTexture(c); return t; })();
  const glowable = (a) => { a.group.traverse((m) => { if (m.isMesh && m.material && !Array.isArray(m.material)) m.material = m.material.clone(); if (m.isMesh && Array.isArray(m.material)) m.material = m.material.map((x) => x.clone()); });
    const h = new THREE.Sprite(new THREE.SpriteMaterial({ map: haloTex, blending: THREE.AdditiveBlending, depthWrite: false, transparent: true })); h.scale.set(1.8, 2.6, 1); h.position.y = 1.5; h.material.depthTest = true; a.group.add(h); a.halo = h;
    const pl = new THREE.PointLight('#5CF2C4', 0, 3.5, 2); pl.position.set(0, 2.2, 0.6); a.group.add(pl); a.pl = pl; a.dark = 0;
    a.glow = (k) => { a.halo.material.opacity = k * 0.6; a.halo.visible = k > 0.01; a.pl.intensity = k * 1.2; a.group.traverse((m) => { if (!m.isMesh) return; [].concat(m.material).forEach((x) => { if (x.emissive) { x.emissive.set('#3DE0B0'); x.emissiveIntensity = k * 0.4; } }); }); };
    a.darken = (k) => { a.group.traverse((m) => { if (!m.isMesh) return; [].concat(m.material).forEach((x) => { if (!x.userData.c0) x.userData.c0 = x.color.clone(); x.color.copy(x.userData.c0).multiplyScalar(1 - k * 0.65); }); }); };
    return a; };
  const kabir = glowable(K.person('kabir'));
  const kids = K.extras.concat([{ skin: '#E0A878', torso: '#3DDC97', legs: '#2A2F45', hair: 'buns', hairCol: '#FF6B5A' }, { skin: '#8D5A3B', torso: '#4CC9F0', legs: '#2A2F45', hair: 'short', hairCol: '#1E1612' }]).map((l) => glowable(K.person(l)));
  const all = [kabir, ...kids]; all.forEach((a) => scene.add(a.group));
  const seatAt = (a, i) => { const p = C.desks[i]; a.at(p.x, 0.85 - 1.0 + 0.04, p.z + 0.8, Math.PI); a.group.rotation.y = 0; a.face(V3(p.x, 0, -10)); };
  const KAB = 7;                                                                     // Kabir: last row, middle
  const SEATS = [0, 1, 2, 3, 5, 6, 8];
  const seatKids = (t, st = {}) => kids.forEach((k, j) => { if (j >= SEATS.length) { k.group.visible = false; return; } k.group.visible = true; const i = SEATS[j]; seatAt(k, i); k.set({ sit: 1, mood: 'happy', blink: blink(t, j), nod: 0.25, ...(typeof st === 'function' ? st(k, j) : st) }); });
  const { shoot } = K.makeShoot(E, scene);
  const talk = (t, i) => (t >= L(i) && t <= Le(i) ? t : null);
  const phoneL = new THREE.PointLight('#6CF7CF', 0, 3, 2); scene.add(phoneL);
  const lights = (k) => { scene.environmentIntensity = lerp(0.7, 0.18, k); phoneL.intensity = 0; sun.key.intensity = lerp(1.6, 0.35, k); sun.group.children.forEach((c) => { if (c.isHemisphereLight) c.intensity = lerp(0.9, 0.35, k); }); };

  // ── 0 · premise: one student reads, and starts to glow ──
  { const st = cut(0), wp = Wd('padhoge', 0), wc = Wd('chamkoge', 0);
    add({ id: 'H00', at: st, note: 'extreme close: a girl turns a page and her whole body starts glowing mint; premise text', draw(lt, d, t, blit) {
      lights(0.6); seatKids(t, (k, j) => ({ mood: 'happy' })); kids.forEach((k, j) => k.glow(j === 1 ? eio(seg(t, wp - 0.4, wc + 0.2)) : 0)); kabir.group.visible = false;
      const p = C.desks[1]; const k1 = kids[1];
      shoot(V3(p.x + 1.4, 2.7, p.z - 3.0), V3(p.x + 0.9, 2.6, p.z - 2.3), V3(p.x, 1.8, p.z + 0.8), null, eio(clamp(lt / d)), { t, f: 1, fov: 40, look: { bloom: 0.45, bloomThreshold: 0.75 } });
      blit(); slam(['IS DUNIYA MEIN...'], 330, seg(lt, 0, 0.18), '#FFFFFF', 74); if (t > wp) slam(['JITNA PADHO', 'UTNA CHAMKO'], 520, seg(t, wp, wp + 0.3), Z.mint, 100);
    } });
    cue(st, 'slam', { gain: 0.5 }); cue(wp, 'sparkle', { dur: 1.4, gain: 0.8 }); cue(wc, 'ding', { gain: 0.6 }); }

  // ── 1 · the whole class glows ──
  { const st = cut(1), wc = Wd('chamak', 1);
    add({ id: 'H01', at: st, note: 'wide crane over the class: every student glowing mint, lights dimming', draw(lt, d, t, blit) {
      lights(lerp(0.6, 0.95, seg(lt, 0, 1))); seatKids(t); kids.forEach((k, j) => k.glow(0.65 + 0.2 * Math.sin(t * 3 + j))); kabir.group.visible = true; seatAt(kabir, KAB); kabir.set({ sit: 1, mood: 'neutral' }); kabir.glow(0); kabir.darken(1);
      shoot(V3(5.6, 4.6, 7.4), V3(4.8, 4.4, 6.6), V3(-0.8, 1.2, -0.6), null, eio(clamp(lt / d)), { t, f: 1, fov: 54, look: { bloom: 0.45, bloomThreshold: 0.75 } });
      blit(); if (t > wc) pill('POORI CLASS: GLOW MODE', 300, Z.mint, 'rgba(14,21,48,0.85)', 44);
    } });
    cue(st, 'whoosh', { gain: 0.5 }); cue(wc, 'sparkle', { dur: 1.2, gain: 0.6 }); }

  // ── 2 · one dark spot: Kabir ──
  { const st = cut(2), wa = Wd('andhera', 2), wk = Wd('Kabir.', 2);
    add({ id: 'H02', at: st, note: 'whip to the last bench: Kabir, grey and dark, flickering; KABIR · 0 PAGES', draw(lt, d, t, blit) {
      lights(0.95); seatKids(t); kids.forEach((k, j) => k.glow(0.7)); seatAt(kabir, KAB); kabir.group.visible = true; kabir.glow(0);
      const fl = t > wa ? (Math.sin(t * 37) > 0.6 ? 0.6 : 1) : 1; kabir.darken(fl); kabir.set({ sit: 1, mood: t > wk ? 'smug' : 'neutral', blink: blink(t) });
      const p = C.desks[KAB];
      shoot(V3(p.x + 2.4, 2.8, p.z - 2.8), V3(p.x + 0.2, 2.6, p.z - 2.2), V3(p.x, 1.8, p.z + 0.8), null, eo(clamp(lt / 0.6)), { t, f: 1, fov: 42, look: { bloom: 0.45, bloomThreshold: 0.75 } });
      blit(); if (t > wk) { pill('KABIR', 300, Z.coral, 'rgba(14,21,48,0.9)', 60, lerp(1.4, 1, eob(seg(t, wk, wk + 0.25)))); pill('PAGES PADHE: 0', 430, '#FFFFFF', 'rgba(232,51,63,0.9)', 42); }
    } });
    cue(st, 'whoosh', { gain: 0.8 }); cue(wa, 'thud', { gain: 0.6 }); cue(wk, 'slam', { gain: 0.7 }); }

  // ── 3 · "aur mujhe chahiye 95%" ──
  { const st = cut(3), wp = Wd('pachaanve', 3);
    add({ id: 'H03', at: st, note: 'Kabir stands up in the dark, smug; class turns; 95% slams', draw(lt, d, t, blit) {
      lights(0.95); seatKids(t, (k, j) => ({ mood: t > wp ? 'shock' : 'happy', turn: t > wp ? 0.0 : 0 })); kids.forEach((k, j) => { k.glow(0.7); if (t > wp) k.face(kabir.group.position); });
      const p = C.desks[KAB]; kabir.at(p.x, 0.04, p.z + 1.6).face(V3(p.x, 0, -10)); kabir.glow(0); kabir.darken(1); kabir.set({ mood: 'smug', talk: talk(t, 3), thumbs: t > wp });
      shoot(V3(p.x, 2.7, p.z - 2.4), V3(p.x, 2.6, p.z - 1.7), V3(p.x, 2.3, p.z + 1.6), null, eio(clamp(lt / d)), { t, f: 1, fov: 46, look: { bloom: 0.45, bloomThreshold: 0.75 } });
      blit(); slam(['95%'], 480, seg(t, wp, wp + 0.3), Z.mint, 230);
    } });
    cue(wp, 'slam', { gain: 1 }); }

  // ── 4 · laugh… then his phone glows ──
  { const st = cut(4), wt = Wd('tabhi,', 4), wc = Wd('chamka.', 4);
    add({ id: 'H04', at: st, note: 'glowing class laughing (HAHAHA); hard punch-in: the phone in Kabir’s hand lights up mint', draw(lt, d, t, blit) {
      lights(0.95); const p = C.desks[KAB]; kabir.at(p.x, 0.04, p.z + 1.6).face(V3(p.x, 0, -10)); kabir.glow(t > wc ? 0.12 : 0); kabir.darken(t > wc ? 0.6 : 1);
      kabir.set({ mood: t > wt ? 'shock' : 'worried', phone: t > wt - 0.3 }); kabir.scr.material.color.set(t > wc ? '#7CF5D6' : '#2A2F45');
      const says = ['HAHAHA', '95 LOL', 'bhai 9.5', null, 'HAHA', null, 'LMAO'];
      seatKids(t, (k, j) => ({ mood: 'laugh', laugh: t + j, say: t < wt ? says[j] : null })); kids.forEach((k) => { k.glow(0.7); k.face(kabir.group.position); });
      if (t < wt) shoot(V3(1.6, 3.6, 7.6), V3(1.3, 3.4, 7.0), V3(0, 1.5, 0.6), null, eio(clamp(lt / (wt - st))), { t, f: 1, fov: 52, look: { bloom: 0.45, bloomThreshold: 0.75 } });
      else { phoneL.position.set(p.x + 0.2, 2.2, p.z + 0.9); phoneL.intensity = t > wc ? 1.6 : 0; shoot(V3(p.x + 0.4, 2.75, p.z - 1.2), V3(p.x + 0.2, 2.7, p.z - 0.5), V3(p.x, 2.25, p.z + 1.6), null, eo(seg(t, wt, wt + 0.5)), { t, f: 1, fov: 44, look: { bloom: 0.5, bloomThreshold: 0.7 } }); }
      blit(); if (t > wc) { pill('PART 1 · 0 SE 95', 300, Z.mint, 'rgba(14,21,48,0.9)', 44); }
    } });
    [0.1, 0.3, 0.5].forEach((o) => cue(st + o, 'pop', { gain: 0.4 })); cue(wt, 'whoosh', { gain: 0.7 }); cue(wc, 'sparkle', { dur: 1, gain: 0.9 }); }

  return { shots: S, cues: CUES };
}
