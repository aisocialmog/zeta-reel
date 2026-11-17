// Chhotu ke 100 Din · Day 91 (blocky look): the twist — Sharma ji ka beta is compared to Chhotu.
import { L, Le, Wd } from './core/timing.js';
import * as K from './core/zkit.js';
const { V3, Z, blink, clamp, lerp, seg, eo, eio, eob, THREE, txt, pill, slam, tick, cross, phoneUI, dim, abCard, sepia, rewind } = K;

export function buildShots(E) {
  const S = [], CUES = [], add = (o) => (S.push(o), o), cue = (t, type, o = {}) => CUES.push({ t: +t.toFixed(3), type, ...o });
  const cut = (i) => (i === 0 ? 0 : L(i) - 0.06);
  const scene = new THREE.Scene();
  const sun = K.WD.sunlight(scene, E, { pos: [-6, 9, 8], target: [0, 1, -1], box: 8, i: 2.3, hemi: 1.0 });
  const lamp = new THREE.PointLight('#FFC27A', 0, 9, 1.6); scene.add(lamp);
  const R = K.room(scene, E, { day: 91 });                                                        // Chhotu's room
  const H = K.room(scene, E, { origin: [0, 0, -40], wall: '#E4F5E9', side: '#CFEBD8', calText: 'TOPPER ROOM', day: 91, poster: false, rug: '#B388FF', blanket: '#6A2C91' }); // Sharma house
  const G = K.gully(scene, { origin: [0, 0, 60] });
  const cast = { chhotu: K.person('chhotu'), mishti: K.person('mishti'), sharma: K.person('sharma'), aunty: K.person('aunty') };
  const kids = K.extras.slice(0, 3).map((l) => K.person(l));
  const all = [...Object.values(cast), ...kids]; all.forEach((a) => scene.add(a.group));
  const { chhotu, mishti, sharma, aunty } = cast;
  const only = (...xs) => all.forEach((a) => (a.group.visible = xs.includes(a)));
  const light = (m) => { const night = m === 'night', eve = m === 'eve';
    sun.key.intensity = night ? 0.35 : eve ? 1.8 : 2.3; sun.key.color.set(eve ? '#FFB27A' : '#FFE9CC'); sun.group.children.forEach((c) => { if (c.isHemisphereLight) c.intensity = night ? 0.35 : 1.0; });
    lamp.intensity = night ? 9 : 0; R.setNight(night); H.setNight(night); scene.background = new THREE.Color(night ? '#0B1030' : eve ? '#F7A37A' : '#BFE6FF'); };
  const sunAt = (v) => { sun.key.target.position.copy(v); sun.key.position.copy(v).add(V3(-6, 9, 8)); };
  const { shoot } = K.makeShoot(E, scene);
  const talk = (t, i) => (t >= L(i) && t <= Le(i) ? t : null);
  let aura = 620; const auraHud = (v, flash = 0) => { K.ctx.save(); K.ctx.translate(150, 300); K.ctx.fillStyle = 'rgba(14,21,48,0.85)'; K.ctx.beginPath(); K.ctx.roundRect(-60, -38, 230, 76, 38); K.ctx.fill();
    txt('AURA', -36, 0, 26, '#9AA3BF', 'left', 800); txt(String(Math.round(v)), 150, 0, 38, flash < 0 ? '#FF4D4D' : flash > 0 ? Z.mint : '#FFFFFF', 'right', 900); K.ctx.restore(); };
  const dayChip = () => pill('Chhotu ke 100 Din · DAY 91', 200, '#FFFFFF', 'rgba(14,21,48,0.85)', 36);
  const onBed = () => { chhotu.at(-2.8, -0.16, -1.2, Math.PI / 2 - 0.4); R.book.position.set(-2.6, 0.95, -0.2); };
  const atDesk = (p, R0) => { const q = R0.p(3.1, -0.06, 0.7); p.at(q.x, q.y, q.z, Math.PI / 2); };

  // ── 0 · hook: Sharma Aunty compares her son to Chhotu ──
  { const st = cut(0), wp = Wd('pehli', 0), wc = Wd('compare', 0);
    add({ id: 'D00', at: st, note: 'Sharma house: Sharma Aunty holds up her phone (Chhotu photo) "Chhotu ko dekho!", Sharma ji ka beta frozen', draw(lt, d, t, blit) {
      only(aunty, sharma); light('day'); const c = H.p(0, 0, 0); sunAt(c);
      aunty.at(c.x - 0.8, 0.04, c.z + 0.2).face(H.p(1, 0, 1)); aunty.set({ mood: 'angry', phone: 1, say: t > wc - 0.6 ? 'Chhotu ko dekho!' : null, blink: blink(t) });
      sharma.at(c.x + 0.8, 0.04, c.z + 0.6).face(H.p(-1, 0, 0)); sharma.set({ mood: t > wc ? 'shock' : 'smug', blink: blink(t, 1) });
      shoot(H.p(0.2, 2.7, 5.4), H.p(0.1, 2.5, 4.4), H.p(0, 2.1, 0.4), null, eio(clamp(lt / d)), { t, fov: 50 });
      blit(); slam(['PEHLI BAAR'], 420, seg(t, wp, wp + 0.3), '#FFFFFF', 110); if (t > wc) slam(['SHARMA JI KA BETA', 'vs CHHOTU'], 600, seg(t, wc, wc + 0.3), Z.coral, 84, 0.04);
    } });
    cue(st, 'slam', { gain: 0.6 }); cue(wp, 'pop'); cue(wc, 'slam', { gain: 0.9 }); }

  // ── 1 · yesterday's vote + "agar B chunta" ──
  { const st = cut(1), wa = Wd('A.', 1), wb = Wd('socho', 1);
    add({ id: 'D01', at: st, note: "Chhotu's room: KAL: A ✓ (1 ghanta match, phir proofs) chip; at 'socho' it tilts into the what-if", draw(lt, d, t, blit) {
      only(chhotu); light('day'); sunAt(V3(0, 1, 0)); chhotu.at(0, 0.04, 0.4).face(V3(0, 2, 8)); chhotu.set({ mood: t > wb ? 'worried' : 'happy', thumbs: t > wa && t < wb, blink: blink(t) });
      shoot(V3(0, 2.6, 4.4), V3(0.2, 2.5, 3.6), V3(0, 2.1, 0.4), null, eio(clamp(lt / d)), { t, fov: 44 });
      blit(); dayChip(); auraHud(aura); if (t > wa) { pill('KAL: A', 470, '#FFFFFF', 'rgba(14,21,48,0.85)', 56); tick(700, 470, eob(seg(t, wa, wa + 0.3)) * 1.3); }
      if (t > wb) pill('AGAR B CHUNTA...?', 610, '#FFE7B0', 'rgba(40,26,12,0.85)', 50, lerp(1.4, 1, eob(seg(t, wb, wb + 0.3))));
    } });
    cue(st, 'whoosh', { gain: 0.4 }); cue(wa, 'ding'); cue(wb, 'zip', { gain: 0.5 }); }

  // ── 2 · what-if: whole evening match (sepia) ──
  { const st = cut(2), wd = Wd('dus', 2);
    add({ id: 'D02', at: st, note: 'WHAT-IF (sepia): gully match all evening, Chhotu batting; clock 10 PM', draw(lt, d, t, blit) {
      only(chhotu, ...kids); light('eve'); const c = G.p(0, 0, 0); sunAt(c);
      chhotu.at(c.x, 0.04, c.z - 4.8).face(G.p(0, 0, 6)); chhotu.set({ mood: 'laugh', armsUp: 0.4 + 0.4 * Math.max(0, Math.sin(t * 6)), laugh: t });
      kids.forEach((k, i) => { k.at(c.x + [-2.2, 2.4, 0.6][i], 0.04, c.z + [2, 3, 6][i]).face(chhotu.group.position); k.set({ mood: 'happy', armsUp: i === 1 ? 0.8 : 0, run: i === 0 ? t * 10 : null }); });
      const bt = (t * 0.8) % 1; G.ball.position.set(c.x + Math.sin(bt * 6) * 1.5, 0.3 + Math.sin(bt * Math.PI) * 3, c.z + lerp(4, -4.5, bt));
      shoot(G.p(2.8, 2.6, 0.5), G.p(2.2, 2.4, -1.2), G.p(0, 1.5, -4.8), null, eio(clamp(lt / d)), { t, fov: 46 });
      blit(); sepia('AGAR B CHUNTA...', t); auraHud(lerp(620, 540, seg(t, st + 0.5, Le(3))), -1); if (t > wd) pill('RAAT 10:00', 470, '#FFFFFF', 'rgba(232,51,63,0.9)', 54);
    } });
    cue(st, 'whoosh', { gain: 0.5 }); cue(st + 0.6, 'thud', { gain: 0.5 }); cue(wd, 'alarm', { dur: 0.7, gain: 0.3 }); }

  // ── 3 · what-if: asleep on the proofs (sepia) ──
  { const st = cut(3);
    add({ id: 'D03', at: st, note: 'WHAT-IF (sepia): night, Chhotu asleep on his book: "root two irrational... ya main?"', draw(lt, d, t, blit) {
      only(chhotu); light('night'); sunAt(V3(0, 1, 0)); chhotu.at(-2.8, -0.16, -1.2, Math.PI / 2 - 0.4); chhotu.set({ sit: 1, mood: 'sad', talk: talk(t, 3), nod: 0.35, say: '√2 irrational... ya main?' });
      R.book.position.set(-2.6, 0.95, -0.2);
      shoot(V3(0.6, 2.5, 3.0), V3(-0.2, 2.4, 2.2), V3(-2.7, 1.9, -1.3), null, eio(clamp(lt / d)), { t, fov: 42 });
      blit(); sepia('AGAR B CHUNTA...', t); auraHud(lerp(560, 540, seg(lt, 0, 1)), -1);
    } });
    cue(st, 'boing', { gain: 0.4 }); }

  // ── 4 · rewind → the real path ──
  { const st = cut(4), wp = Wd('proofs', 4);
    add({ id: 'D04', at: st, note: 'REWIND, then real path: 1 hour match done, Chhotu at the desk with proofs: 1 GHANTA ✓', draw(lt, d, t, blit) {
      only(chhotu); light('day'); sunAt(V3(-2, 1, -1)); onBed(); chhotu.set({ sit: 1, mood: 'happy', nod: 0.1, blink: blink(t) });
      shoot(V3(0.6, 2.5, 3.0), V3(-0.2, 2.4, 2.2), V3(-2.7, 1.9, -1.3), null, eio(clamp(lt / d)), { t, fov: 42 });
      blit(); dayChip(); auraHud(aura); pill('1 GHANTA MATCH', 470, '#FFFFFF'); tick(820, 470, eob(seg(lt, 0.6, 0.9)) * 1.3); if (t > wp) slam(['AB PROOFS'], 620, seg(t, wp, wp + 0.3), Z.mint, 110);
      rewind(seg(lt, 0, 0.55));
    } });
    cue(st, 'zip', { gain: 0.8 }); cue(wp, 'pop'); }

  // ── 5 · Quiz Me: 3 wrong, 4th right ──
  { const st = cut(5), wg = Wd('galat', 5), ws = Wd('sahi', 5);
    add({ id: 'D05', at: st, note: 'phone (recreated Zeta Quiz Me): proof question, ✗ ✗ ✗ then ✓', draw(lt, d, t, blit) {
      only(chhotu); light('day'); onBed(); chhotu.set({ sit: 1, mood: t > ws ? 'happy' : 'worried', phone: 1 });
      shoot(V3(0.6, 2.5, 3.0), null, V3(-2.7, 1.9, -1.3), null, 0, { t, fov: 42 }); blit(); dim(0.45);
      phoneUI(540, lerp(1000, 820, eo(seg(lt, 0, 0.3))), 1.05, () => { K.ctx.fillStyle = Z.navy; K.ctx.fillRect(-250, -480, 500, 960);
        K.ctx.fillStyle = Z.mint; K.ctx.beginPath(); K.ctx.roundRect(-210, -420, 60, 60, 14); K.ctx.fill(); txt('Z', -180, -390, 40, Z.navy, 'center'); txt('Quiz Me', -130, -390, 38, '#fff');
        txt('Real Numbers · proofs', -210, -320, 26, '#C9D1FF', 'left', 600);
        K.ctx.fillStyle = 'rgba(255,255,255,0.07)'; K.ctx.beginPath(); K.ctx.roundRect(-210, -270, 420, 170, 20); K.ctx.fill(); txt('Prove: √2 is irrational', -185, -225, 30, '#fff', 'left', 800); txt('Step 1: Assume √2 = p/q ...', -185, -170, 24, '#9AA3BF', 'left', 600);
        for (let i = 0; i < 4; i++) { const at = lerp(L(5) + 0.9, wg + 0.3, i / 2), show = i < 3 ? t > at : t > ws; if (!show) continue; const y = -30 + i * 95;
          K.ctx.fillStyle = i < 3 ? 'rgba(232,51,63,0.18)' : 'rgba(61,224,176,0.2)'; K.ctx.beginPath(); K.ctx.roundRect(-210, y - 38, 420, 76, 18); K.ctx.fill(); txt(`Try ${i + 1}`, -185, y, 30, '#fff', 'left', 700); (i < 3 ? cross : tick)(170, y, 0.85); }
      });
    } });
    for (let i = 0; i < 3; i++) cue(lerp(L(5) + 0.9, Wd('galat', 5) + 0.3, i / 2), 'thud', { gain: 0.4 }); cue(Wd('sahi', 5), 'ding', { gain: 0.9 }); }

  // ── 6 · Mishti: Section A test tomorrow ──
  { const st = cut(6), wr = Wd('Ready?', 6);
    add({ id: 'D06', at: st, note: 'Mishti (coral buns, round glasses) at the door: "Kal Section A test. Ready?"', draw(lt, d, t, blit) {
      only(mishti, chhotu); light('day'); sunAt(V3(1, 1, -1)); mishti.at(2.6, 0.04, -2.6).face(V3(0, 0, 2)); mishti.set({ mood: 'smug', talk: talk(t, 6), point: t > wr - 0.3, blink: blink(t) });
      chhotu.at(0.2, 0.04, 0.4).face(V3(2.6, 0, -2.6)); chhotu.set({ mood: 'worried', blink: blink(t, 1) });
      shoot(V3(-0.6, 2.7, 3.6), V3(-0.3, 2.6, 2.8), V3(1.6, 2.1, -1.4), null, eio(clamp(lt / d)), { t, fov: 46 });
      blit(); dayChip(); auraHud(aura); pill('SECTION A TEST · KAL', 470, Z.coral);
    } });
    cue(st, 'whoosh', { gain: 0.4 }); }

  // ── 7 · Chhotu: not ready, but more ready ──
  { const st = cut(7), wz = Wd('zyada', 7);
    add({ id: 'D07', at: st, note: 'Chhotu close-up, confident: AURA +50', draw(lt, d, t, blit) {
      only(chhotu, mishti); light('day'); chhotu.at(0.2, 0.04, 0.4).face(V3(0.4, 2, 6)); chhotu.set({ mood: t > wz ? 'smug' : 'neutral', talk: talk(t, 7), thumbs: t > wz });
      mishti.at(2.6, 0.04, -2.6).face(V3(0, 0, 2)); mishti.set({ mood: 'happy' });
      shoot(V3(0.4, 2.6, 3.4), V3(0.4, 2.55, 2.8), V3(0.3, 2.3, 0.4), null, eo(clamp(lt / d)), { t, f: 1.5, fov: 42 });
      const a2 = t > wz ? lerp(620, 670, seg(t, wz, wz + 0.6)) : 620; blit(); dayChip(); auraHud(a2, t > wz ? 1 : 0);
    } });
    cue(wz, 'sparkle', { dur: 0.8, gain: 0.6 }); }

  // ── 8 · the doorbell: Sharma ji ka beta in tears ──
  { const st = cut(8), wg = Wd('ghanti', 8), wb = Wd('beta.', 8), wa = Wd('aansu', 8);
    add({ id: 'D08', at: st, note: 'doorbell; Sharma ji ka beta (thick glasses, tie) at the door, tears', draw(lt, d, t, blit) {
      only(sharma, chhotu, mishti); light('eve'); sunAt(V3(2, 1, -2)); sharma.at(3.3, 0.04, -3.0).face(V3(0, 0, 1)); sharma.set({ mood: 'sad', tears: t > wa - 0.2, blink: blink(t) }); sharma.group.visible = t > wb - 0.4;
      chhotu.at(-0.9, 0.04, 0.3).face(V3(3.3, 0, -3)); chhotu.set({ mood: t > wb ? 'shock' : 'neutral' }); mishti.at(-0.3, 0.04, 1.3).face(V3(3.3, 0, -3)); mishti.set({ mood: t > wb ? 'shock' : 'neutral' });
      shoot(V3(0.6, 2.6, 2.8), V3(1.2, 2.6, 1.6), V3(3.2, 2.3, -3.0), null, eo(clamp(lt / d)), { t, f: 1.35, fov: 44 });
      blit(); dayChip(); if (t > wg && t < wb) slam(['DING DONG'], 470, seg(t, wg, wg + 0.2), '#FFFFFF', 110);
    } });
    cue(wg, 'ding', { gain: 1 }); cue(wg + 0.35, 'ding', { gain: 0.8 }); cue(wb, 'slam', { gain: 0.6 }); cue(wa, 'heartbeat', { gain: 0.8 }); }

  // ── 9 · "Meri mummy roz bolti hai, Chhotu ko dekho" ──
  { const st = cut(9), wc = Wd('Chhotu', 9);
    add({ id: 'D09', at: st, note: 'close on Sharma ji ka beta crying: "Chhotu ko dekho"', draw(lt, d, t, blit) {
      only(sharma); light('eve'); sharma.at(3.3, 0.04, -3.0).face(V3(3.3, 2, 5)); sharma.set({ mood: 'sad', tears: 1, talk: talk(t, 9) });
      shoot(V3(3.3, 2.7, 0.0), V3(3.3, 2.65, -0.6), V3(3.3, 2.45, -3.0), null, eo(clamp(lt / d)), { t, f: 1.45, fov: 40 });
      blit(); if (t > wc) slam(['"CHHOTU KO DEKHO"'], 430, seg(t, wc, wc + 0.3), Z.coral, 90, 0.03);
    } });
    cue(st, 'whoosh', { gain: 0.3 }); cue(wc, 'stamp', { gain: 0.6 }); }

  // ── 10 · Chhotu's mind blown ──
  { const st = cut(10), wk = Wd('khud', 10);
    add({ id: 'D10', at: st, note: 'Chhotu dolly-zoom shock; the comparison arrow flips: CHHOTU → SHARMA JI KA BETA', draw(lt, d, t, blit) {
      only(chhotu); light('eve'); chhotu.at(0.2, 0.04, 0.4).face(V3(0.2, 2, 8)); chhotu.set({ mood: 'shock', facepalm: t > wk + 0.4 });
      const k = eio(clamp(lt / d)); shoot(V3(0.2, 2.6, 0.4 + lerp(6, 2.4, k)), null, V3(0.2, 2.4, 0.4), null, 0, { t, f: 1.4, fov: lerp(22, 50, k) });
      blit(); const p = seg(t, wk - 0.3, wk + 0.3); if (p > 0) { K.ctx.save(); K.ctx.translate(540, 470); pill('SHARMA JI KA BETA', -90, '#FFFFFF', 'rgba(14,21,48,0.85)', 40, 1, 0); pill('CHHOTU', 90, Z.mint, 'rgba(14,21,48,0.85)', 40, 1, 0);
        K.ctx.rotate(Math.PI * eo(p)); K.ctx.fillStyle = Z.coral; K.ctx.beginPath(); K.ctx.moveTo(0, 40); K.ctx.lineTo(-30, -10); K.ctx.lineTo(30, -10); K.ctx.fill(); K.ctx.fillRect(-10, -40, 20, 40); K.ctx.restore(); }
    } });
    cue(st, 'heartbeat', { gain: 0.7 }); cue(wk, 'slam', { gain: 0.7 }); }

  // ── 11 · "mujhe bhi darr lag raha hai" ──
  { const st = cut(11), wd = Wd('darr', 11);
    add({ id: 'D11', at: st, note: 'three of them in the room; Sharma ji ka beta admits he is scared too', draw(lt, d, t, blit) {
      only(sharma, chhotu, mishti); light('eve'); sunAt(V3(1, 1, 0)); sharma.at(1.6, 0.04, -0.6).face(V3(0, 0, 1)); sharma.set({ mood: 'worried', tears: 1, talk: talk(t, 11) });
      chhotu.at(-0.2, 0.04, 0.7).face(V3(1.6, 0, -0.6)); chhotu.set({ mood: 'sad', blink: blink(t) }); mishti.at(-1.5, 0.04, 0.2).face(V3(1.6, 0, -0.6)); mishti.set({ mood: 'sad', blink: blink(t, 1) });
      shoot(V3(0.6, 2.6, 5.4), V3(0.7, 2.6, 4.6), V3(0.7, 2.0, 0.4), null, eio(clamp(lt / d)), { t, fov: 46 });
      blit(); dayChip(); if (t > wd) pill('TOPPER BHI SCARED?', 470, '#FFFFFF');
    } });
    cue(wd, 'heartbeat', { gain: 0.6 }); }

  // ── 12 · toppers are scared too ──
  { const st = cut(12), wt = Wd('Topper', 12);
    add({ id: 'D12', at: st, note: 'soft: Chhotu puts a hand on his shoulder; TOPPER BHI DARTE HAIN', draw(lt, d, t, blit) {
      only(sharma, chhotu, mishti); light('eve'); sharma.at(1.6, 0.04, -0.6).face(V3(0, 0, 1)); sharma.set({ mood: 'sad' });
      chhotu.at(0.6, 0.04, -0.3).face(V3(1.6, 0, -0.6)); chhotu.set({ mood: 'happy', point: 1 }); mishti.at(-1.5, 0.04, 0.2).face(V3(1.6, 0, -0.6)); mishti.set({ mood: 'happy' });
      shoot(V3(0.2, 2.6, 4.2), V3(0.4, 2.5, 3.6), V3(0.6, 2.2, -0.3), null, eio(clamp(lt / d)), { t, f: 1.3, fov: 44, look: { bloom: 0.4 } });
      blit(); if (t > wt) slam(['TOPPER BHI', 'DARTE HAIN'], 470, seg(t, wt, wt + 0.3), Z.mint, 104);
    } });
    cue(wt, 'sparkle', { dur: 1.2, gain: 0.5 }); }

  // ── 13 · A / B ──
  { const st = cut(13);
    add({ id: 'D13', at: st, note: 'Sharma ji ka beta waits; A MANA KARO, COMPETITION / B GROUP MEIN LO, SAATH PADHO', draw(lt, d, t, blit) {
      only(sharma, chhotu, mishti); light('eve'); sharma.at(1.6, 0.04, -0.6).face(V3(0.4, 0, 6)); sharma.set({ mood: 'worried', blink: blink(t) });
      chhotu.at(-0.4, 0.04, 0.6).face(V3(0.4, 0, 6)); chhotu.set({ mood: 'worried', turn: Math.sin(t * 2.5) * 0.4 }); mishti.at(-1.5, 0.04, 0.2).face(V3(0.4, 0, 6)); mishti.set({ mood: 'neutral' });
      shoot(V3(0.6, 2.6, 5.4), null, V3(0.6, 2.0, 0.4), null, 0, { t, fov: 46 });
      blit(); dim(0.3); dayChip(); auraHud(670); abCard(Wd('A,', 13) - 0.1, t, 'MANA KARO, COMPETITION HAI', 'GROUP MEIN LO, SAATH PADHO');
      if (lt > 2.4) pill('Kal wahi dikhega jo zyada log bolenge', 1040, '#FFFFFF', 'rgba(14,21,48,0.85)', 34);
    } });
    cue(Wd('A,', 13), 'pop'); cue(Wd('B,', 13), 'pop'); }

  return { shots: S, cues: CUES };
}
