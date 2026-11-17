// 0 SE 95 · Ep 1 (trial reel): Kabir didn't study all year, now wants 95%.
import { L, Le, Wd } from './core/timing.js';
import * as K from './core/zkit.js';
const { V3, Z, blink, clamp, lerp, seg, eo, eio, eob, THREE, txt, pill, slam, tick, cross, phoneUI, dim, abCard } = K;

export function buildShots(E) {
  const S = [], CUES = [], add = (o) => (S.push(o), o), cue = (t, type, o = {}) => CUES.push({ t: +t.toFixed(3), type, ...o });
  const cut = (i) => (i === 0 ? 0 : L(i) - 0.06);
  const scene = new THREE.Scene();
  const sun = K.WD.sunlight(scene, E, { pos: [-6, 9, 8], target: [0, 1, -1], box: 8, i: 2.3, hemi: 1.0 });
  const lamp = new THREE.PointLight('#FFC27A', 0, 9, 1.6); scene.add(lamp);
  const red = new THREE.PointLight('#FF3B3B', 0, 4, 2); scene.add(red);
  const R = K.room(scene, E, { wall: '#FFE1C9', side: '#FFD0B0', calText: 'BOARDS', day: 82, rug: Z.mint, blanket: Z.coral });
  const C = K.classroom(scene, { origin: [40, 0, 0], board: 'CLASS 10 · BOARDS 2027' });
  const alm = K.brick(1.6, 3.2, 1.0, '#8A5A3A'); alm.position.set(-1.0, 1.6, -3.5); scene.add(alm);
  const sealed = new THREE.Group(); scene.add(sealed);
  { const b = K.brick(0.8, 0.14, 1.05, Z.indigo); sealed.add(b); const w = new THREE.Mesh(new THREE.BoxGeometry(0.86, 0.2, 1.1), new THREE.MeshStandardMaterial({ color: '#FFFFFF', transparent: true, opacity: 0.35, roughness: 0.05, metalness: 0.2 })); sealed.add(w);
    const lab = K.panel(0.6, 0.3, (g, w2, h) => { g.fillStyle = '#fff'; g.fillRect(0, 0, w2, h); g.fillStyle = Z.navy; g.font = `900 ${h * 0.45}px Inter`; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('MATHS', w2 / 2, h / 2); }, 256); lab.rotation.x = -Math.PI / 2; lab.position.y = 0.075; sealed.add(lab); }

  const kabir = K.person('kabir'), mummy = K.person('mummy'), bot = new K.ZetaBot();
  const kids = K.extras.map((l) => K.person(l));
  const all = [kabir, mummy, ...kids]; all.forEach((a) => scene.add(a.group)); scene.add(bot.group);
  const only = (...xs) => { all.forEach((a) => (a.group.visible = xs.includes(a))); bot.group.visible = xs.includes(bot); sealed.visible = false; red.intensity = 0; };
  const mood = (night) => { sun.key.intensity = night ? 0.35 : 2.3; sun.group.children.forEach((c) => { if (c.isHemisphereLight) c.intensity = night ? 0.35 : 1.0; }); lamp.intensity = night ? 9 : 0; lamp.position.set(4.2, 2.6, 1.6); R.setNight(night); scene.background = new THREE.Color(night ? '#0B1030' : '#BFE6FF'); };
  const sunAt = (v) => { sun.key.target.position.copy(v); sun.key.position.copy(v).add(V3(-6, 9, 8)); };
  const { shoot } = K.makeShoot(E, scene);
  const onBed = () => { kabir.at(-2.8, -0.16, -1.2, Math.PI / 2 - 0.4); R.book.position.set(-2.6, 0.95, -0.2); };
  const talk = (t, i) => (t >= L(i) && t <= Le(i) ? t : null);

  // ── 0 · hook: zero pages, 95% ──
  { const st = cut(0), wp = Wd('pachaanve', 0), wn = Wd('page', 0);
    add({ id: 'T00', at: st, note: 'Kabir (coral beanie, striped Z tee) proud; blank notebook pages fan; 95% slams', draw(lt, d, t, blit) {
      only(kabir); mood(false); sunAt(V3(0, 1, 0)); kabir.at(0, 0.04, 0.4).face(V3(0, 2, 8)); kabir.set({ mood: t > wp ? 'smug' : 'happy', talk: talk(t, 0), thumbs: t > wp, blink: blink(t) });
      shoot(V3(0, 2.6, 4.4), V3(0, 2.5, 3.6), V3(0, 2.1, 0.4), null, eio(clamp(lt / d)), { t, f: 1.5, fov: 44 });
      blit();
      const nb = seg(lt, 0.0, 0.2); if (t < wp) { K.ctx.save(); K.ctx.translate(540, 470); K.ctx.scale(eob(nb) * 1.3, eob(nb) * 1.3); K.ctx.rotate(-0.05);
        for (let i = 0; i < 5; i++) { const a = Math.sin(t * 9 + i) * 0.35 * (t < wn + 0.6 ? 1 : 0); K.ctx.save(); K.ctx.rotate(a * (i - 2) * 0.3); K.ctx.fillStyle = i % 2 ? '#FFFFFF' : '#F7F3E8'; K.ctx.fillRect(-230, -150, 460, 300);
          K.ctx.strokeStyle = '#C9D6F2'; K.ctx.lineWidth = 3; for (let y = -110; y < 150; y += 36) { K.ctx.beginPath(); K.ctx.moveTo(-210, y); K.ctx.lineTo(210, y); K.ctx.stroke(); } K.ctx.restore(); }
        txt('0 PAGES', 0, 0, 80, '#E8333F', 'center'); K.ctx.restore(); }
      slam(['95%'], 520, seg(t, wp, wp + 0.3), Z.mint, 240);
      if (t > wp + 0.5) pill('82 DIN BAAKI', 760, '#FFFFFF', 'rgba(232,51,63,0.9)', 46);
    } });
    cue(st, 'slide', { gain: 0.5 }); cue(wn, 'tock'); cue(wp, 'slam', { gain: 1 }); }

  // ── 1 · class laughs ──
  { const st = cut(1), wh = Wd('hasne', 1);
    add({ id: 'T01', at: st, note: 'classroom: Kabir stands at the board, classmates laugh: HAHAHA bubbles', draw(lt, d, t, blit) {
      only(kabir, ...kids); mood(false); const b = C.p(0, 0, -3.7); sunAt(C.p(0, 1, 0));
      kabir.at(b.x, 0.04, b.z).face(C.p(0, 1, 6)); kabir.set({ mood: t > wh ? 'worried' : 'smug', armsUp: t < wh ? 0.6 : 0, talk: talk(t, 1), blink: blink(t) });
      const says = ['HAHAHA', '95?? LOL', null, 'bhai 9.5', null, 'HAHA'];
      kids.forEach((k, i) => { const p = C.p(...[[-1.35, 0, -0.7], [1.35, 0, -0.7], [-1.6, 0, 1.8], [1.6, 0, 1.8], [-2.0, 0, 4.0], [2.0, 0, 4.0]][i]); k.at(p.x, 0.04, p.z).face(kabir.group.position); k.set({ mood: t > wh ? 'laugh' : 'shock', laugh: t + i, say: t > wh + i * 0.1 ? says[i] : null }); });
      shoot(C.p(0, 4.6, 6.5), C.p(0, 4.0, 4.6), C.p(0, 1.8, -3.0), null, eio(clamp(lt / d)), { t, f: 1, fov: 56 });
      blit();
    } });
    cue(st, 'whoosh', { gain: 0.5 }); cue(wh, 'boing', { gain: 0.5 }); [0.15, 0.3, 0.45].forEach((o) => cue(wh + o, 'pop', { gain: 0.4 })); }

  // ── 2 · Mummy ──
  { const st = cut(2);
    add({ id: 'T02', at: st, note: 'Mummy at the door, sarcastic; Kabir on the bed', draw(lt, d, t, blit) {
      only(mummy, kabir); mood(false); sunAt(V3(1, 1, -2));
      mummy.at(3.3, 0.04, -3.0).face(V3(-2.8, 0, -1)); mummy.set({ mood: 'smug', point: 1, talk: talk(t, 2), blink: blink(t) });
      kabir.at(-2.8, -0.16, -1.2, Math.PI / 2 - 0.4); kabir.set({ sit: 1, mood: 'worried', blink: blink(t, 1) });
      shoot(V3(1.0, 2.6, 1.8), V3(1.5, 2.7, 0.9), V3(3.2, 2.4, -3.0), null, eo(clamp(lt / d)), { t, f: 1.3, fov: 44 });
      blit();
    } });
    cue(st, 'whoosh', { gain: 0.4 }); }

  // ── 3 · the sealed book behind the almirah ──
  { const st = cut(3), wp = Wd('Plastic', 3);
    add({ id: 'T03', at: st, note: 'Kabir pulls a still-sealed Maths book from behind the almirah: SEALED', draw(lt, d, t, blit) {
      only(kabir); mood(false); sunAt(V3(-1, 1, -2)); sealed.visible = true;
      kabir.at(0.4, 0.04, -2.2).face(V3(0.4, 0, 6)); kabir.set({ mood: t > wp ? 'shock' : 'happy', talk: talk(t, 3), blink: blink(t) });
      kabir.armR.rotation.x = -1.4; kabir.armL.rotation.x = -1.4;
      const k = eo(seg(lt, 0, 0.8)); sealed.position.set(lerp(-0.4, 0.4, k), 1.45, lerp(-3.0, -1.4, k)); sealed.rotation.set(-0.3, 0.2, 0);
      shoot(V3(1.4, 2.4, 1.6), V3(1.0, 2.2, 0.6), V3(0.4, 1.7, -1.6), null, eio(clamp(lt / d)), { t, f: 1.2, fov: 44 });
      blit(); if (t > wp) slam(['SEALED'], 470, seg(t, wp, wp + 0.25), '#E8333F', 120, 0.08);
    } });
    cue(st, 'slide', { gain: 0.6 }); cue(Wd('mili', 3), 'pop'); cue(wp, 'stamp', { gain: 0.8 }); }

  // ── 4 · asks Zeta Bot ──
  { const st = cut(4), wz = Wd('Zeta', 4);
    add({ id: 'T04', at: st, note: 'Zeta Bot pops in next to Kabir in his room', draw(lt, d, t, blit) {
      only(kabir, bot); mood(false); sunAt(V3(0, 1, 0)); kabir.at(-0.5, 0.04, 0.4, 0.4); kabir.set({ mood: 'worried', talk: talk(t, 4), blink: blink(t) });
      bot.at(0.9, 2.6, 0.9).face(V3(0, 2, 6)); bot.set({ t, mood: 'happy', scale: eob(seg(t, wz - 0.2, wz + 0.25)), tag: t > wz + 0.3 });
      shoot(V3(0.2, 2.6, 5.6), V3(0.3, 2.6, 4.6), V3(0.2, 2.2, 0.6), null, eio(clamp(lt / d)), { t, fov: 42, look: { bloom: 0.45 } });
      blit();
    } });
    cue(wz - 0.2, 'sparkle', { dur: 1.1, gain: 0.8 }); cue(wz, 'pop'); }

  // ── 5 · no promise ──
  { const st = cut(5), wc = Wd('cheez', 5);
    add({ id: 'T05', at: st, note: 'close on Zeta Bot: 95% KA PROMISE crossed out, then "ek cheez dekho"', draw(lt, d, t, blit) {
      only(bot); mood(false); bot.at(0.9, 2.6, 0.9).face(V3(0.9, 2.6, 6)); bot.set({ t, mood: t > wc ? 'happy' : 'serious', say: t > wc ? 'ek cheez dekho' : null });
      shoot(V3(0.9, 2.8, 4.0), V3(0.9, 2.75, 3.3), V3(0.9, 2.6, 0.9), null, eo(clamp(lt / d)), { t, f: 1.45, fov: 42, look: { bloom: 0.5 } });
      blit(); if (t < wc) { pill('95% KA PROMISE', 360, '#FFFFFF'); cross(840, 360, eob(seg(lt, 0.3, 0.6)) * 1.4); }
    } });
    cue(st + 0.35, 'thud', { gain: 0.6 }); cue(wc, 'ding', { gain: 0.6 }); }

  // ── 6 · exam insights ──
  const bars = [['Triangles', 11.5], ['Trigonometry', 8.9], ['Circles', 8.1], ['Linear Eq.', 7.8], ['Quadratic', 7.8], ['Real Numbers', 7.4]];
  { const st = cut(6), wm = Wd('marks', 6);
    add({ id: 'T06', at: st, note: 'phone (recreated Zeta Exam insights): 104 papers, 6 Maths chapters with average marks', draw(lt, d, t, blit) {
      only(kabir, bot); mood(false); kabir.at(-0.5, 0.04, 0.4, 0.4); kabir.set({ mood: 'shock', phone: 1 }); bot.at(0.9, 2.6, 0.9).face(V3(0, 2, 6)); bot.set({ t });
      shoot(V3(0.2, 2.6, 4.6), null, V3(0.2, 2.2, 0.6), null, 0, { t, fov: 42 }); blit(); dim(0.45);
      phoneUI(540, 820, 1.05, () => { K.ctx.fillStyle = Z.navy; K.ctx.fillRect(-250, -480, 500, 960);
        K.ctx.fillStyle = Z.mint; K.ctx.beginPath(); K.ctx.roundRect(-210, -420, 60, 60, 14); K.ctx.fill(); txt('Z', -180, -390, 40, Z.navy, 'center'); txt('Exam insights', -130, -390, 38, '#fff');
        txt('104 real board papers · Maths', -210, -320, 26, '#C9D1FF', 'left', 600);
        bars.forEach(([n, m], i) => { const y = -240 + i * 92, p = eo(seg(t, L(6) + 0.3 + i * 0.18, L(6) + 0.8 + i * 0.18)); txt(n, -210, y - 22, 28, '#fff', 'left', 700);
          K.ctx.fillStyle = 'rgba(255,255,255,0.08)'; K.ctx.beginPath(); K.ctx.roundRect(-210, y + 6, 330, 22, 11); K.ctx.fill(); K.ctx.fillStyle = i === 0 ? Z.coral : Z.mint; K.ctx.beginPath(); K.ctx.roundRect(-210, y + 6, 330 * (m / 11.5) * p, 22, 11); K.ctx.fill();
          txt(`${m}`, 210, y + 16, 30, '#fff', 'right', 800); });
        const q = seg(t, wm, wm + 0.3); if (q > 0) { K.ctx.save(); K.ctx.globalAlpha = q; K.ctx.fillStyle = Z.coral; K.ctx.beginPath(); K.ctx.roundRect(-210, 330, 420, 90, 45); K.ctx.fill(); txt('6 chapters ≈ 52% marks', 0, 375, 32, '#fff', 'center'); K.ctx.restore(); }
      });
    } });
    cue(st, 'whoosh', { gain: 0.4 }); for (let i = 0; i < 6; i++) cue(L(6) + 0.3 + i * 0.18, 'pop', { gain: 0.3 }); cue(wm, 'ding'); }

  // ── 7 · half the marks ──
  { const st = cut(7), wm = Wd('marks', 7), wc = Wd('chapters', 7);
    add({ id: 'T07', at: st, note: 'Kabir close-up, eyes wide: AADHE MARKS · SIRF 6 CHAPTERS', draw(lt, d, t, blit) {
      only(kabir); mood(false); kabir.at(0, 0.04, 0.4).face(V3(0, 2, 8)); kabir.set({ mood: 'shock', talk: talk(t, 7), armsUp: 0.5 });
      shoot(V3(0, 2.6, 3.2), V3(0, 2.55, 2.6), V3(0, 2.3, 0.4), null, eo(clamp(lt / d)), { t, f: 1.6, fov: 42 });
      blit(); slam(['AADHE MARKS'], 380, seg(t, wm - 0.1, wm + 0.2), Z.mint, 110); slam(['SIRF 6 CHAPTERS'], 530, seg(t, wc - 0.1, wc + 0.2), '#FFFFFF', 90, 0.03);
    } });
    cue(wm, 'slam', { gain: 0.6 }); }

  // ── 8 · Ace My Exams plan ──
  const plan = [['Day 1', 'Triangles'], ['Day 2', 'Triangles'], ['Day 3', 'Trigonometry'], ['Day 4', 'Circles'], ['Day 5', 'Quadratic']];
  { const st = cut(8), wm = Wd('mission', 8);
    add({ id: 'T08', at: st, note: 'phone (recreated Zeta UI): Ace My Exams day-by-day plan, hardest first', draw(lt, d, t, blit) {
      only(kabir, bot); mood(false); kabir.at(-0.5, 0.04, 0.4, 0.4); kabir.set({ mood: 'happy', phone: 1 }); bot.at(0.9, 2.6, 0.9).face(V3(0, 2, 6)); bot.set({ t });
      shoot(V3(0.2, 2.6, 4.6), null, V3(0.2, 2.2, 0.6), null, 0, { t, fov: 42 }); blit(); dim(0.45);
      phoneUI(540, lerp(1000, 820, eo(seg(lt, 0, 0.3))), 1.05, () => { K.ctx.fillStyle = Z.navy; K.ctx.fillRect(-250, -480, 500, 960);
        K.ctx.fillStyle = Z.mint; K.ctx.beginPath(); K.ctx.roundRect(-210, -420, 60, 60, 14); K.ctx.fill(); txt('Z', -180, -390, 40, Z.navy, 'center'); txt('Ace My Exams', -130, -390, 38, '#fff');
        txt('Hardest first · roz ek mission', -210, -320, 26, '#C9D1FF', 'left', 600);
        plan.forEach(([dd, c], i) => { const y = -230 + i * 100, p = eo(seg(t, L(8) + 0.4 + i * 0.25, L(8) + 0.7 + i * 0.25)); K.ctx.save(); K.ctx.globalAlpha = p; K.ctx.translate((1 - p) * 60, 0);
          K.ctx.fillStyle = i === 0 ? 'rgba(255,107,90,0.25)' : 'rgba(255,255,255,0.07)'; K.ctx.beginPath(); K.ctx.roundRect(-210, y - 38, 420, 76, 18); K.ctx.fill(); txt(dd, -185, y, 28, i === 0 ? Z.coral : '#9AA3BF', 'left', 800); txt(c, -60, y, 32, '#fff', 'left', 700); K.ctx.restore(); });
        if (t > wm) { K.ctx.fillStyle = Z.coral; K.ctx.beginPath(); K.ctx.roundRect(-210, 300, 420, 90, 45); K.ctx.fill(); txt("Today's mission →", 0, 345, 32, '#fff', 'center'); }
      });
    } });
    cue(st, 'whoosh', { gain: 0.4 }); for (let i = 0; i < 5; i++) cue(L(8) + 0.4 + i * 0.25, 'pop', { gain: 0.3 }); cue(wm, 'ding'); }

  // ── 9 · CTA mid-video ──
  { const st = cut(9), wp = Wd('PLAN', 9), wc = Wd('Comment', 9);
    add({ id: 'T09', at: st, note: 'Kabir points at the viewer: COMMENT "PLAN" button', draw(lt, d, t, blit) {
      only(kabir, bot); mood(false); kabir.at(0, 0.04, 0.6).face(V3(0, 2, 8)); kabir.set({ mood: 'happy', point: 1, talk: talk(t, 9), blink: blink(t) });
      bot.at(1.3, 3.0, 0.6).face(V3(0, 2, 8)); bot.set({ t, mood: 'happy' });
      shoot(V3(0.3, 2.6, 4.2), V3(0.3, 2.5, 3.4), V3(0.3, 2.2, 0.6), null, eio(clamp(lt / d)), { t, fov: 44 });
      blit(); const p = seg(t, wc - 0.1, wc + 0.25); if (p > 0) { const s = lerp(0.4, 1, eob(p)); K.ctx.save(); K.ctx.translate(540, 470); K.ctx.scale(s, s); K.ctx.fillStyle = Z.coral; K.ctx.beginPath(); K.ctx.roundRect(-330, -80, 660, 160, 80); K.ctx.fill(); txt('COMMENT "PLAN"', 0, 2, 66, '#fff', 'center'); K.ctx.restore(); }
      if (t > wp) pill('free plan link DM mein', 610, Z.mint);
    } });
    cue(wc, 'pop'); cue(wp, 'ding', { gain: 0.6 }); }

  // ── 10 · first mission, night ──
  { const st = cut(10), wu = Wd('uthaya', 10);
    add({ id: 'T10', at: st, note: 'night: Kabir at the desk, Triangles open, reaches for his phone', draw(lt, d, t, blit) {
      only(kabir); mood(true); onBed(); kabir.set({ sit: 1, mood: 'neutral', phone: t > wu, nod: 0.15 });
      shoot(V3(0.6, 2.5, 3.0), V3(-0.2, 2.4, 2.2), V3(-2.7, 1.9, -1.3), null, eio(clamp(lt / d)), { t, fov: 42 });
      blit(); pill('MISSION 1 · TRIANGLES', 230, Z.mint);
    } });
    cue(st, 'whoosh', { gain: 0.4 }); }

  // ── 11 · the temptation ──
  { const st = cut(11), wn = Wd('notification', 11), wr = Wd('Ranked', 11);
    add({ id: 'T11', at: st, note: 'red glow: phone pops "Bas ek match? RANKED", Kabir tempted', draw(lt, d, t, blit) {
      only(kabir); mood(true); onBed(); kabir.set({ sit: 1, mood: t > wr ? 'smug' : 'shock', phone: 1 });
      red.position.set(-2.0, 2.1, -0.6); red.intensity = t > wn ? 6 + Math.sin(t * 10) * 2 : 0;
      shoot(V3(-0.6, 2.4, 1.6), V3(-1.0, 2.4, 1.1), V3(-2.7, 2.1, -1.3), null, eo(clamp(lt / d)), { t, f: 1.5, fov: 40, shake: t > wr ? 0.03 : 0 });
      blit(); const p = seg(t, wn - 0.1, wn + 0.25); if (p > 0) { K.ctx.save(); K.ctx.translate(540, lerp(150, 400, eob(p))); K.ctx.fillStyle = 'rgba(255,255,255,0.96)'; K.ctx.beginPath(); K.ctx.roundRect(-400, -95, 800, 190, 40); K.ctx.fill();
        K.ctx.fillStyle = '#E8333F'; K.ctx.beginPath(); K.ctx.roundRect(-370, -60, 110, 110, 24); K.ctx.fill(); txt('VS', -315, -5, 44, '#fff', 'center'); txt('Squad', -230, -45, 32, Z.navy, 'left'); txt('now', 370, -45, 26, '#8A90A8', 'right', 600);
        txt(t > wr ? 'Bas ek match? RANKED' : 'Bas ek match?', -230, 15, 38, '#1C1C24', 'left', 800); K.ctx.restore(); }
    } });
    cue(wn, 'ding', { gain: 0.9 }); cue(wr, 'heartbeat', { gain: 0.9 }); }

  // ── 12 · A / B ──
  { const st = cut(12);
    add({ id: 'T12', at: st, note: 'Kabir between the book and the glowing phone; A MISSION / B BAS EK MATCH', draw(lt, d, t, blit) {
      only(kabir); mood(true); onBed(); kabir.set({ sit: 1, mood: 'worried', phone: 1, turn: Math.sin(t * 3) * 0.3 });
      red.position.set(-2.0, 2.1, -0.6); red.intensity = 5;
      shoot(V3(0.6, 2.5, 3.0), null, V3(-2.7, 1.9, -1.3), null, 0, { t, fov: 42 });
      blit(); dim(0.3); abCard(st + 0.2, t, 'MISSION · TRIANGLES', 'BAS EK MATCH');
      if (lt > 1.2) pill('Ep 2 kal · tum decide karo', 1040, '#FFFFFF');
    } });
    cue(st + 0.2, 'slam', { gain: 0.7 }); }

  return { shots: S, cues: CUES };
}
