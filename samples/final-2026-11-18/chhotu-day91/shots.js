// Chhotu ke 100 Din · Day 91 v2 — Boys group vs Girls group (teen humour), Zeta Quiz Me battle, twist: Sharma ji ka beta is in the GIRLS group.
import { L, Le, Wd } from './core/timing.js';
import * as K from './core/zkit.js';
const { V3, Z, blink, clamp, lerp, seg, eo, eio, eob, THREE, txt, pill, slam, tick, cross, phoneUI, dim, abCard, sepia, rewind } = K;

export function buildShots(E) {
  const S = [], CUES = [], add = (o) => (S.push(o), o), cue = (t, type, o = {}) => CUES.push({ t: +t.toFixed(3), type, ...o });
  const cut = (i) => (i === 0 ? 0 : L(i) - 0.06);
  const scene = new THREE.Scene();
  const sun = K.WD.sunlight(scene, E, { pos: [-6, 9, 8], target: [0, 1, -1], box: 9, i: 2.3, hemi: 1.0 });
  const lamp = new THREE.PointLight('#FFC27A', 0, 9, 1.6); scene.add(lamp);
  const R = K.room(scene, E, { day: 91 });                                        // Chhotu's room at origin
  const C = K.classroom(scene, { origin: [40, 0, 0], board: 'SECTION A TEST · KAL' });
  const G = K.gully(scene, { origin: [0, 0, 60] });
  C.desks.forEach((p) => { const s = K.brick(0.9, 0.12, 0.8, '#4B3FD8'); s.position.set(p.x, 0.85, p.z + 0.8); scene.add(s); const bk = K.brick(0.6, 0.06, 0.45, '#FFFFFF'); bk.position.set(p.x, 1.3, p.z); scene.add(bk); });
  const chalk = K.brick(0.12, 0.02, 12, '#FFFFFF', { roughness: 0.9 }); chalk.position.copy(C.p(0, 0.02, 0.5)); scene.add(chalk);

  const chhotu = K.person('chhotu'), pari = K.person('mishti'), sharma = K.person('sharma');
  const girls = [K.extras[2], K.extras[3], K.extras[5]].map((l) => K.person(l)), boys = [K.extras[0], K.extras[1], K.extras[4]].map((l) => K.person(l));
  const all = [chhotu, pari, sharma, ...girls, ...boys]; all.forEach((a) => scene.add(a.group));
  const only = (...xs) => all.forEach((a) => (a.group.visible = xs.includes(a)));
  const light = (m) => { const night = m === 'night', eve = m === 'eve';
    scene.environmentIntensity = night ? 0.2 : 0.45; sun.key.intensity = night ? 0.35 : eve ? 1.8 : 2.3; sun.key.color.set(eve ? '#FFB27A' : '#FFE9CC'); sun.group.children.forEach((c) => { if (c.isHemisphereLight) c.intensity = night ? 0.35 : 1.0; });
    lamp.intensity = night ? 9 : 0; lamp.position.set(4.2, 2.6, 1.6); R.setNight(night); scene.background = new THREE.Color(night ? '#0B1030' : eve ? '#F7A37A' : '#BFE6FF'); };
  const sunAt = (v) => { sun.key.target.position.copy(v); sun.key.position.copy(v).add(V3(-6, 9, 8)); };
  const { shoot } = K.makeShoot(E, scene);
  const talk = (t, i) => (t >= L(i) && t <= Le(i) ? t : null);
  let aura = 620; const auraHud = (v, flash = 0) => { const c = K.ctx; c.save(); c.translate(150, 300); c.fillStyle = 'rgba(14,21,48,0.85)'; c.beginPath(); c.roundRect(-60, -38, 230, 76, 38); c.fill();
    txt('AURA', -36, 0, 26, '#9AA3BF', 'left', 800); txt(String(Math.round(v)), 150, 0, 38, flash < 0 ? '#FF4D4D' : flash > 0 ? Z.mint : '#FFFFFF', 'right', 900); c.restore(); };
  const dayChip = () => pill('Chhotu ke 100 Din · DAY 91', 200, '#FFFFFF', 'rgba(14,21,48,0.85)', 36);
  const onBed = () => { chhotu.at(-2.8, -0.16, -1.2, Math.PI / 2 - 0.4); R.book.position.set(-2.6, 0.95, -0.2); };
  // classroom seating: girls on the LEFT column (x -4), boys on the RIGHT column (x +4)
  const seat = (a, x, z) => { const p = C.p(x, 0, z); a.at(p.x, 0.85 - 1.0 + 0.04, p.z + 0.8); a.face(C.p(x, 0, -10)); };
  const GS = [[-4, -1.5], [-4, 1.1], [-4, 3.7]], BS = [[4, -1.5], [4, 1.1], [4, 3.7]];
  const GP = [[-0.9, 1.6], [-2.0, 2.6], [-1.0, 3.8]], BP = [[0.9, 1.6], [2.0, 2.6], [1.0, 3.8]];
  const classroom = (t, o = {}) => {
    girls.forEach((g, i) => { g.at(...C.p(GP[i][0], 0.04, GP[i][1]).toArray()); g.face(C.p(GP[i][0] * 0.5, 0, -6)); g.set({ mood: o.gMood || 'happy', blink: blink(t, i), ...(o.g ? o.g(g, i) : {}) }); });
    boys.forEach((b, i) => { b.at(...C.p(BP[i][0], 0.04, BP[i][1]).toArray()); b.face(C.p(BP[i][0] * 0.5, 0, -6)); b.set({ mood: o.bMood || 'laugh', laugh: t + i, ...(o.b ? o.b(b, i) : {}) }); });
  };
  // chat bubbles inside a phone
  const bubble = (y, text, side, col, w = 360) => { const c = K.ctx, x = side === 'l' ? -220 : 220 - w; c.fillStyle = col; c.beginPath(); c.roundRect(x, y - 34, w, 68, 22); c.fill(); txt(text, x + 22, y, 26, side === 'l' ? '#1C1C24' : '#FFFFFF', 'left', 700); };
  const chatHead = (title, sub, col) => { const c = K.ctx; c.fillStyle = col; c.fillRect(-250, -480, 500, 140); txt(title, -200, -420, 36, '#fff', 'left'); txt(sub, -200, -378, 22, 'rgba(255,255,255,0.8)', 'left', 600); };

  // ── 0 · hook: the class splits into two countries ──
  { const st = cut(0), wd = Wd('deshon', 0), wl = Wd('Ladkiyon', 0), wb = Wd('ladkon', 0);
    add({ id: 'V00', at: st, note: 'classroom split by a chalk line: girls (left) neat with notes, boys (right) messing about; GIRLS | BOYS', draw(lt, d, t, blit) {
      only(...girls, ...boys); light('day'); sunAt(C.p(0, 1, 0)); classroom(t, { b: (b, i) => ({ armsUp: i === 1 ? 0.6 + 0.3 * Math.sin(t * 8) : 0, say: [null, 'BRO 😂', null][i] }) });
      shoot(C.p(0, 2.9, -4.5), C.p(0, 2.8, -4.0), C.p(0, 1.7, 1.2), null, eio(clamp(lt / d)), { t, f: 1, fov: 62 });
      blit(); slam(['2 DESH'], 420, seg(t, wd, wd + 0.3), '#FFFFFF', 120); if (t > wl) pill('GIRLS ✨', 600, Z.mint, 'rgba(14,21,48,0.85)', 50, eob(seg(t, wl, wl + 0.3)), 290); if (t > wb) pill('BOYS 🔥', 600, Z.coral, 'rgba(14,21,48,0.85)', 50, eob(seg(t, wb, wb + 0.3)), 790);
    } });
    cue(st, 'slam', { gain: 0.5 }); cue(wd, 'thud'); cue(wl, 'pop'); cue(wb, 'pop'); }

  // ── 1 · vote recap → what-if ──
  { const st = cut(1), wa = Wd('A,', 1), wb = Wd('socho', 1);
    add({ id: 'V01', at: st, note: "Chhotu's room: KAL: A ✓; at 'socho' AGAR B CHUNTA...?", draw(lt, d, t, blit) {
      only(chhotu); light('day'); sunAt(V3(0, 1, 0)); chhotu.at(0, 0.04, 0.4).face(V3(0, 2, 8)); chhotu.set({ mood: t > wb ? 'worried' : 'happy', thumbs: t > wa && t < wb, blink: blink(t) });
      shoot(V3(0, 2.6, 4.4), V3(0.2, 2.5, 3.6), V3(0, 2.1, 0.4), null, eio(clamp(lt / d)), { t, fov: 44 });
      blit(); dayChip(); auraHud(aura); if (t > wa) { pill('KAL: A', 470, '#FFFFFF', 'rgba(14,21,48,0.85)', 56); tick(700, 470, eob(seg(t, wa, wa + 0.3)) * 1.3); }
      if (t > wb) pill('AGAR B CHUNTA...?', 610, '#FFE7B0', 'rgba(40,26,12,0.85)', 50, lerp(1.4, 1, eob(seg(t, wb, wb + 0.3))));
    } });
    cue(st, 'whoosh', { gain: 0.4 }); cue(wa, 'ding'); cue(wb, 'zip', { gain: 0.5 }); }

  // ── 2 · what-if: whole evening match ──
  { const st = cut(2), wd = Wd('dus', 2);
    add({ id: 'V02', at: st, note: 'WHAT-IF (sepia): gully match all evening; RAAT 10:00', draw(lt, d, t, blit) {
      only(chhotu, ...boys); light('eve'); const c = G.p(0, 0, 0); sunAt(c);
      chhotu.at(c.x, 0.04, c.z - 4.8).face(G.p(0, 0, 6)); chhotu.set({ mood: 'laugh', armsUp: 0.4 + 0.4 * Math.max(0, Math.sin(t * 6)), laugh: t });
      boys.forEach((k, i) => { k.at(c.x + [-2.2, 2.4, 0.6][i], 0.04, c.z + [2, 3, 6][i]).face(chhotu.group.position); k.set({ mood: 'happy', armsUp: i === 1 ? 0.8 : 0, run: i === 0 ? t * 10 : null }); });
      const bt = (t * 0.8) % 1; G.ball.position.set(c.x + Math.sin(bt * 6) * 1.5, 0.3 + Math.sin(bt * Math.PI) * 3, c.z + lerp(4, -4.5, bt));
      shoot(G.p(2.8, 2.6, 0.5), G.p(2.2, 2.4, -1.2), G.p(0, 1.5, -4.8), null, eio(clamp(lt / d)), { t, fov: 46 });
      blit(); sepia('AGAR B CHUNTA...', t); auraHud(lerp(620, 560, seg(t, st + 0.5, Le(3))), -1); if (t > wd) pill('RAAT 10:00', 470, '#FFFFFF', 'rgba(232,51,63,0.9)', 54);
    } });
    cue(st, 'whoosh', { gain: 0.5 }); cue(st + 0.6, 'thud', { gain: 0.5 }); cue(wd, 'alarm', { dur: 0.7, gain: 0.3 }); }

  // ── 3 · what-if: asleep on proofs ──
  { const st = cut(3);
    add({ id: 'V03', at: st, note: 'WHAT-IF (sepia): asleep on the book: "√2 irrational... ya main?"', draw(lt, d, t, blit) {
      only(chhotu); light('night'); sunAt(V3(0, 1, 0)); onBed(); chhotu.set({ sit: 1, mood: 'sad', talk: talk(t, 3), nod: 0.35, say: '√2 irrational... ya main?' });
      shoot(V3(0.6, 2.5, 3.0), V3(-0.2, 2.4, 2.2), V3(-2.7, 1.9, -1.3), null, eio(clamp(lt / d)), { t, fov: 42 });
      blit(); sepia('AGAR B CHUNTA...', t); auraHud(540, -1);
    } });
    cue(st, 'boing', { gain: 0.4 }); }

  // ── 4 · rewind → real path: opens the group chat ──
  { const st = cut(4), wg = Wd('group', 4);
    add({ id: 'V04', at: st, note: 'REWIND; real path: 1 GHANTA MATCH ✓, Chhotu on the bed opens the group chat', draw(lt, d, t, blit) {
      only(chhotu); light('day'); sunAt(V3(-2, 1, -1)); onBed(); chhotu.set({ sit: 1, mood: 'happy', phone: t > wg - 0.3, blink: blink(t) });
      shoot(V3(0.6, 2.5, 3.0), V3(-0.2, 2.4, 2.2), V3(-2.7, 1.9, -1.3), null, eio(clamp(lt / d)), { t, fov: 42 });
      blit(); dayChip(); auraHud(aura); pill('1 GHANTA MATCH', 470, '#FFFFFF'); tick(820, 470, eob(seg(lt, 0.6, 0.9)) * 1.3); if (t > wg) slam(['GROUP CHAT'], 620, seg(t, wg, wg + 0.3), Z.mint, 100);
      rewind(seg(lt, 0, 0.55));
    } });
    cue(st, 'zip', { gain: 0.8 }); cue(wg, 'pop'); }

  // ── 5 · girls' group chat ──
  { const st = cut(5), wh = Wd('highlighter', 5), wn = Wd('notes.', 5);
    add({ id: 'V05', at: st, note: "phone: GIRLS ✨ STUDY group — colour-coded notes photos, 'Ch 1 done 💯'", draw(lt, d, t, blit) {
      only(chhotu); light('day'); onBed(); chhotu.set({ sit: 1, mood: 'shock', phone: 1 }); shoot(V3(0.6, 2.5, 3.0), null, V3(-2.7, 1.9, -1.3), null, 0, { t, fov: 42 }); blit(); dim(0.5);
      phoneUI(540, lerp(1000, 820, eo(seg(lt, 0, 0.3))), 1.05, () => { const c = K.ctx; c.fillStyle = '#FFF6EA'; c.fillRect(-250, -480, 500, 960); chatHead('GIRLS ✨ STUDY', '5 members', Z.mint);
        const notes = (y, cols) => { c.fillStyle = '#FFFFFF'; c.beginPath(); c.roundRect(-220, y - 80, 300, 160, 18); c.fill(); cols.forEach((col, i) => { c.fillStyle = col; c.fillRect(-200, y - 60 + i * 26, 220 - (i % 2) * 60, 14); }); };
        if (lt > 0.4) bubble(-270, 'Real Numbers done ✅', 'l', '#E8E4FF'); if (t > wh - 0.4) notes(-120, ['#FFE45C', '#7CF5D6', '#FF9AB5', '#9CC8FF', '#FFB86B', '#C9A6FF']);
        if (t > wh) txt('6 highlighters 🖍️', 120, -120, 24, '#4B3FD8', 'left', 800); if (t > wn - 0.3) notes(80, ['#7CF5D6', '#FFE45C', '#FF9AB5', '#9CC8FF']); if (t > wn) bubble(230, 'Proofs ke notes 📚 sabke liye', 'l', '#E8E4FF', 420);
      });
    } });
    cue(st, 'whoosh', { gain: 0.4 }); cue(Wd('highlighter', 5), 'pop'); cue(Wd('notes.', 5), 'ding', { gain: 0.6 }); }

  // ── 6 · boys' group chat ──
  { const st = cut(6), wm = Wd('memes.', 6), ws = Wd('sawaal,', 6);
    add({ id: 'V06', at: st, note: "phone: BOYS 🔥 group — 147 unread, memes, then 'bhai test kis chapter ka hai??'", draw(lt, d, t, blit) {
      only(chhotu); light('day'); onBed(); chhotu.set({ sit: 1, mood: t > ws ? 'shock' : 'laugh', laugh: t, phone: 1 }); shoot(V3(0.6, 2.5, 3.0), null, V3(-2.7, 1.9, -1.3), null, 0, { t, fov: 42 }); blit(); dim(0.5);
      phoneUI(540, 820, 1.05, () => { const c = K.ctx; c.fillStyle = '#10142A'; c.fillRect(-250, -480, 500, 960); chatHead('BOYS 🔥🔥', `${Math.min(147, Math.round(lerp(12, 147, seg(t, st, wm))))} unread`, Z.coral);
        const sc = seg(t, st + 0.3, ws); c.save(); c.translate(0, -sc * 260);
        const memes = ['😂😂😂', 'BRO 💀', '😭😭', 'ye dekh 😂', 'LOL', '🗿', 'kal bunk?', '💀💀💀'];
        memes.forEach((m, i) => { const y = -260 + i * 110; if (i % 3 === 1) { c.fillStyle = '#2A2F55'; c.beginPath(); c.roundRect(-220, y - 45, 260, 90, 16); c.fill(); txt('🖼️ meme.jpg', -200, y, 26, '#9AA3BF', 'left', 700); } else bubble(y, m, i % 2 ? 'r' : 'l', i % 2 ? '#4B3FD8' : '#FFFFFF', 220); });
        c.restore(); if (t > ws) bubble(330, 'bhai test kis chapter ka hai??', 'r', '#E8333F', 440);
      });
    } });
    cue(st, 'whoosh', { gain: 0.4 }); for (let i = 0; i < 6; i++) cue(st + 0.4 + i * 0.35, 'pop', { gain: 0.25 }); cue(ws, 'boing', { gain: 0.6 }); }

  // ── 7 · Pari teases ──
  { const st = cut(7);
    add({ id: 'V07', at: st, note: 'Pari (coral buns, round glasses) at the door, arms crossed, teasing', draw(lt, d, t, blit) {
      only(pari, chhotu); light('day'); sunAt(V3(1, 1, -1)); pari.at(2.6, 0.04, -2.6).face(V3(0, 0, 2)); pari.set({ mood: 'smug', talk: talk(t, 7), point: 1, blink: blink(t) });
      chhotu.at(0.2, 0.04, 0.4).face(V3(2.6, 0, -2.6)); chhotu.set({ mood: 'worried', blink: blink(t, 1) });
      shoot(V3(-0.6, 2.7, 3.6), V3(-0.3, 2.6, 2.8), V3(1.6, 2.1, -1.4), null, eio(clamp(lt / d)), { t, fov: 46 });
      blit(); dayChip(); pill('PARI', 330, Z.coral, 'rgba(14,21,48,0.85)', 44);
    } });
    cue(st, 'whoosh', { gain: 0.4 }); }

  // ── 8 · "we're competitive people" ──
  { const st = cut(8), wc = Wd('competition', 8);
    add({ id: 'V08', at: st, note: 'Chhotu close, puffed-up confident', draw(lt, d, t, blit) {
      only(chhotu, pari); light('day'); chhotu.at(0.2, 0.04, 0.4).face(V3(0.4, 2, 6)); chhotu.set({ mood: 'smug', talk: talk(t, 8), thumbs: t > wc });
      pari.at(2.6, 0.04, -2.6).face(V3(0, 0, 2)); pari.set({ mood: 'neutral' });
      shoot(V3(0.4, 2.6, 3.4), V3(0.4, 2.55, 2.8), V3(0.3, 2.3, 0.4), null, eo(clamp(lt / d)), { t, f: 1.5, fov: 42 });
      blit(); dayChip(); auraHud(aura); if (t > wc) pill('BOYS LOGIC 🧠', 470, Z.coral);
    } });
    cue(wc, 'boing', { gain: 0.4 }); }

  // ── 9 · the challenge: same Zeta Quiz Me, loser pays the canteen bill ──
  { const st = cut(9), wq = Wd('Quiz', 9), wb = Wd('bill', 9);
    add({ id: 'V09', at: st, note: 'Pari close, challenging; card: ZETA QUIZ ME · BOYS vs GIRLS · haarne wala = canteen bill', draw(lt, d, t, blit) {
      only(pari); light('day'); pari.at(2.6, 0.04, -2.6).face(V3(2.0, 2, 4)); pari.set({ mood: 'smug', talk: talk(t, 9), point: 1 });
      shoot(V3(2.0, 2.7, 0.6), V3(2.1, 2.65, 0.0), V3(2.6, 2.45, -2.6), null, eo(clamp(lt / d)), { t, f: 1.4, fov: 40 });
      blit(); const p = seg(t, wq - 0.1, wq + 0.3); if (p > 0) { const c = K.ctx, s = lerp(0.5, 1, eob(p)); c.save(); c.translate(540, 470); c.scale(s, s); c.fillStyle = 'rgba(14,21,48,0.92)'; c.beginPath(); c.roundRect(-400, -150, 800, 300, 40); c.fill();
        c.fillStyle = Z.mint; c.beginPath(); c.roundRect(-360, -120, 60, 60, 14); c.fill(); txt('Z', -330, -90, 40, Z.navy, 'center'); txt('Quiz Me · Real Numbers', -280, -90, 36, '#fff');
        txt('GIRLS', -200, 10, 56, Z.mint, 'center'); txt('vs', 0, 10, 40, '#9AA3BF', 'center', 700); txt('BOYS', 200, 10, 56, Z.coral, 'center');
        if (t > wb) txt('haarne wala = canteen bill 💸', 0, 100, 34, '#FFE58A', 'center', 800); c.restore(); }
    } });
    cue(wq, 'slam', { gain: 0.6 }); cue(wb, 'stamp', { gain: 0.6 }); }

  // ── 10 · boys study proofs till midnight ──
  { const st = cut(10), wb = Wd('baarah', 10), wp = Wd('proofs', 10);
    add({ id: 'V10', at: st, note: "night: Chhotu on the bed typing; boys' chat now only proofs; clock 12:00", draw(lt, d, t, blit) {
      only(chhotu); light('night'); sunAt(V3(0, 1, 0)); onBed(); chhotu.set({ sit: 1, mood: 'neutral', phone: 1, nod: 0.25 });
      shoot(V3(0.6, 2.5, 3.0), V3(-0.4, 2.4, 2.0), V3(-2.7, 1.9, -1.3), null, eio(clamp(lt / d)), { t, fov: 42 });
      blit(); if (t > wb) pill('RAAT 12:00', 230, '#FFFFFF', 'rgba(14,21,48,0.85)', 46);
      phoneUI(820, 1000, 0.55, () => { const c = K.ctx; c.fillStyle = '#10142A'; c.fillRect(-250, -480, 500, 960); chatHead('BOYS 🔥🔥', 'typing...', Z.coral);
        [['√2 wala step 2??', 'l'], ['assume p/q, phir square', 'r'], ['bhai samajh aaya 😭', 'l'], ['ab 3√5 try kar', 'r'], ['canteen bill nahi bharna 😤', 'l']].forEach(([m, sd], i) => { if (t > st + 0.4 + i * 0.6) bubble(-260 + i * 110, m, sd, sd === 'l' ? '#FFFFFF' : '#4B3FD8', 400); });
      });
      if (t > wp) slam(['SIRF PROOFS?!'], 470, seg(t, wp, wp + 0.3), Z.mint, 100);
    } });
    for (let i = 0; i < 5; i++) cue(L(10) + 0.4 + i * 0.6, 'pop', { gain: 0.3 }); cue(Wd('proofs', 10), 'ding', { gain: 0.5 }); }

  // ── 11 · scores ──
  { const st = cut(11), wg = Wd('aath.', 11), wb = Wd('saat.', 11), wd = Wd('das', 11);
    add({ id: 'V11', at: st, note: 'scoreboard over the classroom: GIRLS 8/10, BOYS 7/10, then ??? 10/10', draw(lt, d, t, blit) {
      only(...girls, ...boys); light('day'); sunAt(C.p(0, 1, 0)); classroom(t, { gMood: t > wd ? 'shock' : 'smug', bMood: t > wb ? 'sad' : 'worried', b: () => ({ laugh: null }) });
      shoot(C.p(0, 2.9, -4.5), null, C.p(0, 1.7, 1.2), null, 0, { t, f: 1, fov: 62 }); blit(); dim(0.45);
      const row = (y, label, score, col, at) => { if (t < at) return; const s = eob(seg(t, at, at + 0.3)), c = K.ctx; c.save(); c.translate(540, y); c.scale(s, s); c.fillStyle = 'rgba(14,21,48,0.92)'; c.beginPath(); c.roundRect(-380, -60, 760, 120, 30); c.fill(); txt(label, -340, 0, 46, col, 'left'); txt(score, 340, 0, 56, '#FFFFFF', 'right'); c.restore(); };
      row(380, 'GIRLS ✨', '8/10', Z.mint, wg); row(520, 'BOYS 🔥', '7/10', Z.coral, wb); row(680, '???', '10/10', '#FFE58A', wd);
    } });
    cue(wg, 'ding', { gain: 0.6 }); cue(wb, 'thud', { gain: 0.6 }); cue(wd, 'slam', { gain: 0.9 }); }

  // ── 12 · twist: Sharma ji ka beta was in the GIRLS group ──
  { const st = cut(12), wg = Wd('girls', 12);
    add({ id: 'V12', at: st, note: 'classroom: Sharma ji ka beta sits on the girls’ side of the chalk line; boys stunned', draw(lt, d, t, blit) {
      only(...girls, ...boys, sharma); light('day'); sunAt(C.p(0, 1, 0)); classroom(t, { gMood: 'happy', bMood: 'shock', b: (b) => ({ laugh: null }) });
      sharma.at(...C.p(-1.9, 0.04, 1.3).toArray()); sharma.face(C.p(0, 0, -6)); sharma.set({ mood: 'smug', blink: blink(t) });
      const k = eio(clamp(lt / d)); shoot(C.p(0.4, 2.9, -4.5), C.p(-1.2, 2.6, -3.6), C.p(-1.6, 1.8, 1.8), null, k, { t, f: 1, fov: 52 });
      blit(); pill('SHARMA JI KA BETA', 330, '#FFFFFF'); if (t > wg) slam(['GIRLS GROUP', 'MEIN?!'], 520, seg(t, wg, wg + 0.3), Z.mint, 110);
    } });
    cue(st, 'whoosh', { gain: 0.6 }); cue(Wd('girls', 12), 'slam', { gain: 0.9 }); }

  // ── 13 · "Bhai, notes wahan achhe milte hain" ──
  { const st = cut(13);
    add({ id: 'V13', at: st, note: 'close on Sharma ji ka beta, glasses glint, totally unbothered', draw(lt, d, t, blit) {
      only(sharma, ...girls); light('day'); classroom(t); boys.forEach((b) => (b.group.visible = false)); sharma.at(...C.p(-1.9, 0.04, 1.3).toArray()); sharma.face(C.p(-1.6, 2, -6)); sharma.set({ mood: 'smug', talk: talk(t, 13) });
      shoot(C.p(-1.6, 2.8, -2.8), C.p(-1.7, 2.75, -2.2), C.p(-1.9, 2.3, 1.3), null, eo(clamp(lt / d)), { t, f: 1, fov: 42 });
      blit(); if (lt > 0.5) { const c = K.ctx, a = Math.max(0, Math.sin((lt - 0.5) * 6)); c.save(); c.globalAlpha = a; c.fillStyle = '#FFFFFF'; c.translate(470, 760); c.rotate(0.6); c.fillRect(-40, -6, 80, 12); c.rotate(-1.2); c.fillRect(-40, -6, 80, 12); c.restore(); }
    } });
    cue(st + 0.5, 'sparkle', { dur: 0.6, gain: 0.5 }); }

  // ── 14 · A / B ──
  { const st = cut(14);
    add({ id: 'V14', at: st, note: 'Chhotu on the bed, phone in hand; A GALAT ANSWERS DOBARA SOLVE / B GIRLS KE NOTES COPY', draw(lt, d, t, blit) {
      only(chhotu); light('night'); onBed(); chhotu.set({ sit: 1, mood: 'worried', phone: 1, turn: Math.sin(t * 2.5) * 0.4 });
      shoot(V3(0.6, 2.5, 3.0), null, V3(-2.7, 1.9, -1.3), null, 0, { t, fov: 42 });
      blit(); dim(0.3); dayChip(); auraHud(aura); abCard(Wd('A,', 14) - 0.1, t, 'GALAT ANSWERS DOBARA SOLVE', 'RAAT BHAR GIRLS KE NOTES COPY');
      if (lt > 2.4) pill('Kal wahi dikhega jo zyada log bolenge', 1040, '#FFFFFF', 'rgba(14,21,48,0.85)', 34);
    } });
    cue(Wd('A,', 14), 'pop'); cue(Wd('B,', 14), 'pop'); }

  return { shots: S, cues: CUES };
}
