// 0 SE 95 · Ep 1 (trial reel, final): "jitna padhoge, utna chamkoge" world; Kabir is the only dark one.
import { L, Le, Wd } from './core/timing.js';
import * as K from './core/zkit.js';
const { V3, Z, blink, clamp, lerp, seg, eo, eio, eob, THREE, txt, pill, slam, cross, phoneUI, dim, abCard } = K;

export function buildShots(E) {
  const S = [], CUES = [], add = (o) => (S.push(o), o), cue = (t, type, o = {}) => CUES.push({ t: +t.toFixed(3), type, ...o });
  const cut = (i) => (i === 0 ? 0 : L(i) - 0.06);
  const scene = new THREE.Scene(); scene.background = new THREE.Color('#1A1F3A');
  const sun = K.WD.sunlight(scene, E, { pos: [-6, 9, 8], target: [0, 1, 0], box: 9, i: 1.0, hemi: 0.55 });
  const lamp = new THREE.PointLight('#FFC27A', 0, 9, 1.6); scene.add(lamp);
  const red = new THREE.PointLight('#FF3B3B', 0, 4, 2); scene.add(red);
  const phoneL = new THREE.PointLight('#6CF7CF', 0, 3, 2); scene.add(phoneL);
  // classroom at the origin, Kabir's room at z -40
  const C = K.classroom(scene, { origin: [0, 0, 0], board: 'BOARDS 2027 · 82 DIN' });
  C.desks.forEach((p) => { const s = K.brick(0.9, 0.12, 0.8, '#4B3FD8'); s.position.set(p.x, 0.85, p.z + 0.8); scene.add(s); const b = K.brick(0.9, 0.9, 0.1, '#4B3FD8'); b.position.set(p.x, 1.35, p.z + 1.2); scene.add(b);
    const bk = K.brick(0.6, 0.06, 0.45, '#FFFFFF'); bk.position.set(p.x, 1.3, p.z); scene.add(bk); });
  const R = K.room(scene, E, { origin: [0, 0, -40], wall: '#FFE1C9', side: '#FFD0B0', calText: 'BOARDS', day: 82, rug: Z.mint, blanket: Z.coral });
  const RP = (x, y, z) => R.p(x, y, z);
  const alm = K.brick(1.6, 3.2, 1.0, '#8A5A3A'); alm.position.copy(RP(-1.0, 1.6, -3.5)); scene.add(alm);
  const sealed = new THREE.Group(); scene.add(sealed);
  { const b = K.brick(0.8, 0.14, 1.05, Z.indigo); sealed.add(b); const w = new THREE.Mesh(new THREE.BoxGeometry(0.86, 0.2, 1.1), new THREE.MeshStandardMaterial({ color: '#FFFFFF', transparent: true, opacity: 0.35, roughness: 0.05, metalness: 0.2 })); sealed.add(w);
    const lab = K.panel(0.6, 0.3, (g, w2, h) => { g.fillStyle = '#fff'; g.fillRect(0, 0, w2, h); g.fillStyle = Z.navy; g.font = `900 ${h * 0.45}px Inter`; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('MATHS', w2 / 2, h / 2); }, 256); lab.rotation.x = -Math.PI / 2; lab.position.y = 0.075; sealed.add(lab); }

  // glow: per-avatar materials + additive halo + small light
  const haloTex = (() => { const c = document.createElement('canvas'); c.width = c.height = 128; const g = c.getContext('2d'); const gr = g.createRadialGradient(64, 64, 0, 64, 64, 64); gr.addColorStop(0, 'rgba(120,255,214,0.9)'); gr.addColorStop(0.4, 'rgba(61,224,176,0.35)'); gr.addColorStop(1, 'rgba(61,224,176,0)'); g.fillStyle = gr; g.fillRect(0, 0, 128, 128); return new THREE.CanvasTexture(c); })();
  const glowable = (a) => { a.group.traverse((m) => { if (m.isMesh && m.material) m.material = Array.isArray(m.material) ? m.material.map((x) => x.clone()) : m.material.clone(); });
    const h = new THREE.Sprite(new THREE.SpriteMaterial({ map: haloTex, blending: THREE.AdditiveBlending, depthWrite: false, transparent: true })); h.scale.set(1.8, 2.6, 1); h.position.y = 1.5; a.group.add(h); a.halo = h;
    a.pl = { intensity: 0 };
    a.glow = (k) => { a.halo.material.opacity = k * 0.6; a.halo.visible = k > 0.01; a.pl.intensity = k * 1.2; a.group.traverse((m) => { if (!m.isMesh) return; [].concat(m.material).forEach((x) => { if (x.emissive) { x.emissive.set('#3DE0B0'); x.emissiveIntensity = k * 0.4; } }); }); };
    a.darken = (k) => { a.group.traverse((m) => { if (!m.isMesh) return; [].concat(m.material).forEach((x) => { if (!x.color) return; if (!x.userData.c0) x.userData.c0 = x.color.clone(); x.color.copy(x.userData.c0).multiplyScalar(1 - k * 0.65); }); }); };
    a.glow(0); return a; };
  const kabir = glowable(K.person('kabir')), mummy = K.person('mummy'), bot = new K.ZetaBot();
  const kids = K.extras.concat([{ skin: '#E0A878', torso: '#3DDC97', legs: '#2A2F45', hair: 'buns', hairCol: '#FF6B5A' }]).map((l) => glowable(K.person(l)));
  const all = [kabir, mummy, ...kids]; all.forEach((a) => scene.add(a.group)); scene.add(bot.group);
  const only = (...xs) => { all.forEach((a) => (a.group.visible = xs.includes(a))); bot.group.visible = xs.includes(bot); sealed.visible = false; red.intensity = 0; phoneL.intensity = 0; kabir.glow(0); kabir.darken(0); };
  const SEATS = [0, 1, 2, 3, 5, 6, 8], KAB = 7;
  const seatAt = (a, i) => { const p = C.desks[i]; a.at(p.x, 0.85 - 1.0 + 0.04, p.z + 0.8); a.face(V3(p.x, 0, -10)); };
  const seatKids = (t, st = {}) => kids.forEach((k, j) => { k.group.visible = j < SEATS.length; if (j >= SEATS.length) return; seatAt(k, SEATS[j]); k.set({ sit: 1, mood: 'happy', blink: blink(t, j), nod: 0.25, ...(typeof st === 'function' ? st(k, j) : st) }); });
  const classMood = (k) => { scene.environmentIntensity = lerp(0.6, 0.18, k); sun.key.intensity = lerp(1.6, 0.35, k); sun.group.children.forEach((c) => { if (c.isHemisphereLight) c.intensity = lerp(0.9, 0.35, k); }); lamp.intensity = 0; scene.background = new THREE.Color('#1A1F3A'); sunAt(V3(0, 1, 0)); };
  const roomMood = (night) => { scene.environmentIntensity = night ? 0.2 : 0.45; sun.key.intensity = night ? 0.35 : 2.3; sun.group.children.forEach((c) => { if (c.isHemisphereLight) c.intensity = night ? 0.35 : 1.0; }); lamp.intensity = night ? 9 : 0; lamp.position.copy(RP(4.2, 2.6, 1.6)); R.setNight(night); scene.background = new THREE.Color(night ? '#0B1030' : '#BFE6FF'); sunAt(RP(0, 1, -1)); };
  const sunAt = (v) => { sun.key.target.position.copy(v); sun.key.position.copy(v).add(V3(-6, 9, 8)); };
  const { shoot } = K.makeShoot(E, scene);
  const talk = (t, i) => (t >= L(i) && t <= Le(i) ? t : null);
  const G = { look: { bloom: 0.45, bloomThreshold: 0.75 } };
  const onBed = () => { kabir.at(...RP(-2.8, -0.16, -1.2).toArray()); kabir.group.rotation.y = Math.PI / 2 - 0.4; R.book.position.copy(RP(-2.6, 0.95, -0.2)); };

  // ── 0 · premise ──
  { const st = cut(0), wp = Wd('padhoge', 0), wc = Wd('chamkoge', 0);
    add({ id: 'F00', at: st, note: 'close: a girl turns a page and starts glowing mint; IS DUNIYA MEIN... JITNA PADHO UTNA CHAMKO', draw(lt, d, t, blit) {
      only(...kids); classMood(0.6); seatKids(t); kids.forEach((k, j) => k.glow(j === 1 ? eio(seg(t, wp - 0.4, wc + 0.2)) : 0));
      const p = C.desks[1];
      shoot(V3(p.x + 1.4, 2.7, p.z - 3.0), V3(p.x + 0.9, 2.6, p.z - 2.3), V3(p.x, 1.8, p.z + 0.8), null, eio(clamp(lt / d)), { t, f: 1, fov: 40, ...G });
      blit(); slam(['IS DUNIYA MEIN...'], 330, seg(lt, 0, 0.18), '#FFFFFF', 74); if (t > wp) slam(['JITNA PADHO', 'UTNA CHAMKO'], 520, seg(t, wp, wp + 0.3), Z.mint, 100);
    } });
    cue(st, 'slam', { gain: 0.5 }); cue(wp, 'sparkle', { dur: 1.4, gain: 0.8 }); cue(wc, 'ding', { gain: 0.6 }); }

  // ── 1 · whole class glows ──
  { const st = cut(1), wc = Wd('chamak', 1);
    add({ id: 'F01', at: st, note: 'wide from the back corner: every student glowing; Kabir dark in the foreground row', draw(lt, d, t, blit) {
      only(kabir, ...kids); classMood(lerp(0.6, 0.95, seg(lt, 0, 1))); seatKids(t); kids.forEach((k, j) => k.glow(0.65 + 0.2 * Math.sin(t * 3 + j))); seatAt(kabir, KAB); kabir.set({ sit: 1, mood: 'neutral' }); kabir.darken(1);
      shoot(V3(5.6, 4.6, 7.4), V3(4.8, 4.4, 6.6), V3(-0.8, 1.2, -0.6), null, eio(clamp(lt / d)), { t, f: 1, fov: 54, ...G });
      blit(); if (t > wc) pill('POORI CLASS: GLOW MODE', 300, Z.mint, 'rgba(14,21,48,0.85)', 44);
    } });
    cue(st, 'whoosh', { gain: 0.5 }); cue(wc, 'sparkle', { dur: 1.2, gain: 0.6 }); }

  // ── 2 · Kabir, the only dark one ──
  { const st = cut(2), wa = Wd('andhera', 2), wk = Wd('Kabir.', 2), wpg = Wd('page', 2);
    add({ id: 'F02', at: st, note: 'whip to the last bench: Kabir grey and dark, flickering; KABIR · PAGES PADHE: 0', draw(lt, d, t, blit) {
      only(kabir, ...kids); classMood(0.95); seatKids(t); kids.forEach((k) => k.glow(0.7)); seatAt(kabir, KAB);
      kabir.darken(t > wa ? (Math.sin(t * 37) > 0.6 ? 0.6 : 1) : 1); kabir.set({ sit: 1, mood: t > wk ? 'smug' : 'neutral', blink: blink(t) });
      const p = C.desks[KAB];
      shoot(V3(p.x + 2.4, 2.8, p.z - 2.8), V3(p.x + 0.2, 2.6, p.z - 2.2), V3(p.x, 1.8, p.z + 0.8), null, eo(clamp(lt / 0.6)), { t, f: 1, fov: 42, ...G });
      blit(); if (t > wk) pill('KABIR', 300, Z.coral, 'rgba(14,21,48,0.9)', 60, lerp(1.4, 1, eob(seg(t, wk, wk + 0.25)))); if (t > wpg) pill('PAGES PADHE: 0', 430, '#FFFFFF', 'rgba(232,51,63,0.9)', 42);
    } });
    cue(st, 'whoosh', { gain: 0.8 }); cue(wa, 'thud', { gain: 0.6 }); cue(wk, 'slam', { gain: 0.7 }); }

  // ── 3 · "pachaanve percent" ──
  { const st = cut(3), wp = Wd('pachaanve', 3);
    add({ id: 'F03', at: st, note: 'Kabir stands in the dark, smug; class turns, shocked; 95% slams', draw(lt, d, t, blit) {
      only(kabir, ...kids); classMood(0.95); seatKids(t, () => ({ mood: t > wp ? 'shock' : 'happy' })); kids.forEach((k) => { k.glow(0.7); if (t > wp) k.face(kabir.group.position); });
      const p = C.desks[KAB]; kabir.at(p.x, 0.04, p.z + 1.6).face(V3(p.x, 0, -10)); kabir.darken(1); kabir.set({ mood: 'smug', talk: talk(t, 3), thumbs: t > wp });
      shoot(V3(p.x, 2.7, p.z - 2.4), V3(p.x, 2.6, p.z - 1.7), V3(p.x, 2.3, p.z + 1.6), null, eio(clamp(lt / d)), { t, f: 1, fov: 46, ...G });
      blit(); slam(['95%'], 480, seg(t, wp, wp + 0.3), Z.mint, 230);
    } });
    cue(wp, 'slam', { gain: 1 }); }

  // ── 4 · class laughs (then: Mummy too) ──
  { const st = cut(4), wm = Wd('Mummy', 4);
    add({ id: 'F04', at: st, note: 'from behind Kabir: the glowing class laughs, HAHAHA bubbles', draw(lt, d, t, blit) {
      only(kabir, ...kids); classMood(0.95); const p = C.desks[KAB]; kabir.at(p.x, 0.04, p.z + 1.6).face(V3(p.x, 0, -10)); kabir.darken(1); kabir.set({ mood: 'worried' });
      const says = ['HAHAHA', '95 LOL', 'bhai 9.5', null, 'HAHA', null, 'LMAO'];
      seatKids(t, (k, j) => ({ mood: 'laugh', laugh: t + j, say: says[j] })); kids.forEach((k) => { k.glow(0.7); k.face(kabir.group.position); });
      shoot(V3(1.6, 3.6, 7.6), V3(1.3, 3.4, 7.0), V3(0, 1.5, 0.6), null, eio(clamp(lt / d)), { t, f: 1, fov: 52, ...G });
      blit();
    } });
    [0.1, 0.3, 0.5].forEach((o) => cue(st + o, 'pop', { gain: 0.4 })); cue(wm, 'boing', { gain: 0.4 }); }

  // ── 5 · Mummy ──
  { const st = cut(5);
    add({ id: 'F05', at: st, note: 'Kabir’s room: Mummy at the door, sarcastic; Kabir on the bed', draw(lt, d, t, blit) {
      only(mummy, kabir); roomMood(false); mummy.at(...RP(3.3, 0.04, -3.0).toArray()); mummy.face(RP(-2.8, 0, -1)); mummy.set({ mood: 'smug', point: 1, talk: talk(t, 5), blink: blink(t) });
      onBed(); kabir.set({ sit: 1, mood: 'worried', blink: blink(t, 1) });
      shoot(RP(1.0, 2.6, 1.8), RP(1.5, 2.7, 0.9), RP(3.2, 2.4, -3.0), null, eo(clamp(lt / d)), { t, f: 1.3, fov: 44 });
      blit();
    } });
    cue(st, 'whoosh', { gain: 0.4 }); }

  // ── 6 · sealed book ──
  { const st = cut(6), wp = Wd('Plastic', 6);
    add({ id: 'F06', at: st, note: 'Kabir pulls a still-sealed Maths book from behind the almirah: SEALED', draw(lt, d, t, blit) {
      only(kabir); roomMood(false); sealed.visible = true;
      kabir.at(...RP(0.4, 0.04, -2.2).toArray()); kabir.face(RP(0.4, 0, 6)); kabir.set({ mood: t > wp ? 'shock' : 'happy', talk: talk(t, 6), blink: blink(t) }); kabir.armR.rotation.x = -1.4; kabir.armL.rotation.x = -1.4;
      const k = eo(seg(lt, 0, 0.8)); sealed.position.copy(RP(lerp(-0.4, 0.4, k), 1.45, lerp(-3.0, -1.4, k))); sealed.rotation.set(-0.3, 0.2, 0);
      shoot(RP(1.4, 2.4, 1.6), RP(1.0, 2.2, 0.6), RP(0.4, 1.7, -1.6), null, eio(clamp(lt / d)), { t, f: 1.25, fov: 44 });
      blit(); if (t > wp) slam(['SEALED'], 470, seg(t, wp, wp + 0.25), '#E8333F', 120, 0.08);
    } });
    cue(st, 'slide', { gain: 0.6 }); cue(Wd('mili', 6), 'pop'); cue(wp, 'stamp', { gain: 0.8 }); }

  // ── 7 · Zeta Bot ──
  { const st = cut(7), wz = Wd('Zeta', 7);
    add({ id: 'F07', at: st, note: 'Zeta Bot pops in next to Kabir', draw(lt, d, t, blit) {
      only(kabir, bot); roomMood(false); kabir.at(...RP(-0.5, 0.04, 0.4).toArray()); kabir.group.rotation.y = 0.4; kabir.set({ mood: 'worried', talk: talk(t, 7), blink: blink(t) });
      bot.at(...RP(0.9, 2.6, 0.9).toArray()).face(RP(0, 2, 6)); bot.set({ t, mood: 'happy', scale: eob(seg(t, wz - 0.2, wz + 0.25)), tag: t > wz + 0.3 });
      shoot(RP(0.2, 2.6, 5.6), RP(0.3, 2.6, 4.6), RP(0.2, 2.2, 0.6), null, eio(clamp(lt / d)), { t, fov: 42, look: { bloom: 0.4 } });
      blit();
    } });
    cue(wz - 0.2, 'sparkle', { dur: 1.1, gain: 0.8 }); cue(wz, 'pop'); }

  // ── 8 · no promise ──
  { const st = cut(8), wc = Wd('cheez', 8);
    add({ id: 'F08', at: st, note: 'Zeta Bot close: 95% KA PROMISE ✗, then "ek cheez dekho"', draw(lt, d, t, blit) {
      only(bot); roomMood(false); bot.at(...RP(0.9, 2.6, 0.9).toArray()).face(RP(0.9, 2.6, 6)); bot.set({ t, mood: t > wc ? 'happy' : 'serious', say: t > wc ? 'ek cheez dekho' : null });
      shoot(RP(0.9, 2.8, 4.0), RP(0.9, 2.75, 3.3), RP(0.9, 2.6, 0.9), null, eo(clamp(lt / d)), { t, f: 1.45, fov: 42, look: { bloom: 0.45 } });
      blit(); if (t < wc) { pill('95% KA PROMISE', 360, '#FFFFFF'); cross(840, 360, eob(seg(lt, 0.3, 0.6)) * 1.4); }
    } });
    cue(st + 0.35, 'thud', { gain: 0.6 }); cue(wc, 'ding', { gain: 0.6 }); }

  // ── 9 · exam insights ──
  const bars = [['Triangles', 11.5], ['Trigonometry', 8.9], ['Circles', 8.1], ['Linear Eq.', 7.8], ['Quadratic', 7.8], ['Real Numbers', 7.4]];
  { const st = cut(9), wm = Wd('marks', 9);
    add({ id: 'F09', at: st, note: 'phone (recreated Zeta Exam insights): 104 papers, 6 Maths chapters ≈ 52%', draw(lt, d, t, blit) {
      only(kabir, bot); roomMood(false); kabir.at(...RP(-0.5, 0.04, 0.4).toArray()); kabir.group.rotation.y = 0.4; kabir.set({ mood: 'shock', phone: 1 }); bot.at(...RP(0.9, 2.6, 0.9).toArray()).face(RP(0, 2, 6)); bot.set({ t });
      shoot(RP(0.2, 2.6, 4.6), null, RP(0.2, 2.2, 0.6), null, 0, { t, fov: 42 }); blit(); dim(0.45);
      phoneUI(540, 820, 1.05, () => { const c = K.ctx; c.fillStyle = Z.navy; c.fillRect(-250, -480, 500, 960);
        c.fillStyle = Z.mint; c.beginPath(); c.roundRect(-210, -420, 60, 60, 14); c.fill(); txt('Z', -180, -390, 40, Z.navy, 'center'); txt('Exam insights', -130, -390, 38, '#fff');
        txt('104 real board papers · Maths', -210, -320, 26, '#C9D1FF', 'left', 600);
        bars.forEach(([n, m], i) => { const y = -240 + i * 92, p = eo(seg(t, L(9) + 0.3 + i * 0.25, L(9) + 0.8 + i * 0.25)); txt(n, -210, y - 22, 28, '#fff', 'left', 700);
          c.fillStyle = 'rgba(255,255,255,0.08)'; c.beginPath(); c.roundRect(-210, y + 6, 330, 22, 11); c.fill(); c.fillStyle = i === 0 ? Z.coral : Z.mint; c.beginPath(); c.roundRect(-210, y + 6, 330 * (m / 11.5) * p, 22, 11); c.fill(); txt(`${m}`, 210, y + 16, 30, '#fff', 'right', 800); });
        const q = seg(t, wm, wm + 0.3); if (q > 0) { c.save(); c.globalAlpha = q; c.fillStyle = Z.coral; c.beginPath(); c.roundRect(-210, 330, 420, 90, 45); c.fill(); txt('6 chapters ≈ 52% marks', 0, 375, 32, '#fff', 'center'); c.restore(); }
      });
    } });
    cue(st, 'whoosh', { gain: 0.4 }); for (let i = 0; i < 6; i++) cue(L(9) + 0.3 + i * 0.25, 'pop', { gain: 0.3 }); cue(wm, 'ding'); }

  // ── 10 · Ace My Exams plan ──
  const plan = [['Day 1', 'Triangles'], ['Day 2', 'Triangles'], ['Day 3', 'Trigonometry'], ['Day 4', 'Circles'], ['Day 5', 'Quadratic']];
  { const st = cut(10), wm = Wd('mission', 10);
    add({ id: 'F10', at: st, note: 'phone (recreated Zeta UI): Ace My Exams day-by-day plan, hardest first', draw(lt, d, t, blit) {
      only(kabir, bot); roomMood(false); kabir.at(...RP(-0.5, 0.04, 0.4).toArray()); kabir.group.rotation.y = 0.4; kabir.set({ mood: 'happy', phone: 1 }); bot.at(...RP(0.9, 2.6, 0.9).toArray()).face(RP(0, 2, 6)); bot.set({ t });
      shoot(RP(0.2, 2.6, 4.6), null, RP(0.2, 2.2, 0.6), null, 0, { t, fov: 42 }); blit(); dim(0.45);
      phoneUI(540, lerp(1000, 820, eo(seg(lt, 0, 0.3))), 1.05, () => { const c = K.ctx; c.fillStyle = Z.navy; c.fillRect(-250, -480, 500, 960);
        c.fillStyle = Z.mint; c.beginPath(); c.roundRect(-210, -420, 60, 60, 14); c.fill(); txt('Z', -180, -390, 40, Z.navy, 'center'); txt('Ace My Exams', -130, -390, 38, '#fff');
        txt('Hardest first · roz ek mission', -210, -320, 26, '#C9D1FF', 'left', 600);
        plan.forEach(([dd, ch], i) => { const y = -230 + i * 100, p = eo(seg(t, L(10) + 0.4 + i * 0.3, L(10) + 0.7 + i * 0.3)); c.save(); c.globalAlpha = p; c.translate((1 - p) * 60, 0);
          c.fillStyle = i === 0 ? 'rgba(255,107,90,0.25)' : 'rgba(255,255,255,0.07)'; c.beginPath(); c.roundRect(-210, y - 38, 420, 76, 18); c.fill(); txt(dd, -185, y, 28, i === 0 ? Z.coral : '#9AA3BF', 'left', 800); txt(ch, -60, y, 32, '#fff', 'left', 700); c.restore(); });
        if (t > wm) { c.fillStyle = Z.coral; c.beginPath(); c.roundRect(-210, 300, 420, 90, 45); c.fill(); txt("Today's mission →", 0, 345, 32, '#fff', 'center'); }
      });
    } });
    cue(st, 'whoosh', { gain: 0.4 }); for (let i = 0; i < 5; i++) cue(L(10) + 0.4 + i * 0.3, 'pop', { gain: 0.3 }); cue(wm, 'ding'); }

  // ── 11 · CTA ──
  { const st = cut(11), wp = Wd('PLAN', 11), wc = Wd('Comment', 11);
    add({ id: 'F11', at: st, note: 'Kabir points at the viewer: COMMENT "PLAN"', draw(lt, d, t, blit) {
      only(kabir, bot); roomMood(false); kabir.at(...RP(0, 0.04, 0.6).toArray()); kabir.face(RP(0, 2, 8)); kabir.set({ mood: 'happy', point: 1, talk: talk(t, 11), blink: blink(t) });
      bot.at(...RP(1.3, 3.0, 0.6).toArray()).face(RP(0, 2, 8)); bot.set({ t, mood: 'happy' });
      shoot(RP(0.3, 2.6, 4.2), RP(0.3, 2.5, 3.4), RP(0.3, 2.2, 0.6), null, eio(clamp(lt / d)), { t, fov: 44 });
      blit(); const p = seg(t, wc - 0.1, wc + 0.25); if (p > 0) { const s = lerp(0.4, 1, eob(p)), c = K.ctx; c.save(); c.translate(540, 470); c.scale(s, s); c.fillStyle = Z.coral; c.beginPath(); c.roundRect(-330, -80, 660, 160, 80); c.fill(); txt('COMMENT "PLAN"', 0, 2, 66, '#fff', 'center'); c.restore(); }
      if (t > wp) pill('free plan link DM mein', 610, Z.mint);
    } });
    cue(wc, 'pop'); cue(wp, 'ding', { gain: 0.6 }); }

  // ── 12 · first mission done: his hand glows ──
  { const st = cut(12), wh = Wd('haath,', 12), wc = Wd('chamka.', 12);
    add({ id: 'F12', at: st, note: 'night, on the bed with Triangles: mission done; for the first time his hand glows faintly', draw(lt, d, t, blit) {
      only(kabir); roomMood(true); onBed(); kabir.set({ sit: 1, mood: t > wc ? 'shock' : 'happy', nod: 0.1, armsUp: 0 }); kabir.armR.rotation.x = -1.3;
      const g = eio(seg(t, wh - 0.2, wc + 0.4)) * 0.45; kabir.armR.children[0].material.emissive.set('#3DE0B0'); kabir.armR.children[0].material.emissiveIntensity = g * 2; phoneL.position.copy(RP(-2.4, 2.2, -0.6)); phoneL.intensity = g * 2.5;
      shoot(RP(0.6, 2.5, 3.0), RP(-0.4, 2.3, 1.8), RP(-2.7, 1.9, -1.3), null, eio(clamp(lt / d)), { t, fov: 42, look: { bloom: 0.5, bloomThreshold: 0.7 } });
      blit(); pill('MISSION 1 · TRIANGLES', 230, Z.mint); if (t > wc) slam(['PEHLI BAAR', 'CHAMKA'], 470, seg(t, wc, wc + 0.3), Z.mint, 100);
      kabir.armR.children[0].material.emissiveIntensity = 0;
    } });
    cue(st, 'whoosh', { gain: 0.4 }); cue(Wd('khatam', 12), 'ding', { gain: 0.6 }); cue(wc, 'sparkle', { dur: 1.2, gain: 0.9 }); }

  // ── 13 · the temptation ──
  { const st = cut(13), wa = Wd('aaya,', 13), wr = Wd('Ranked.', 13);
    add({ id: 'F13', at: st, note: 'red glow: phone pops "Bas ek match? RANKED", Kabir tempted', draw(lt, d, t, blit) {
      only(kabir); roomMood(true); onBed(); kabir.set({ sit: 1, mood: t > wr ? 'smug' : 'shock', phone: 1 });
      red.position.copy(RP(-2.0, 2.1, -0.6)); red.intensity = t > wa ? 6 + Math.sin(t * 10) * 2 : 0;
      shoot(RP(-0.6, 2.4, 1.6), RP(-1.0, 2.4, 1.1), RP(-2.7, 2.1, -1.3), null, eo(clamp(lt / d)), { t, f: 1.5, fov: 40, shake: t > wr ? 0.03 : 0 });
      blit(); const p = seg(t, wa - 0.1, wa + 0.25); if (p > 0) { const c = K.ctx; c.save(); c.translate(540, lerp(150, 400, eob(p))); c.fillStyle = 'rgba(255,255,255,0.96)'; c.beginPath(); c.roundRect(-400, -95, 800, 190, 40); c.fill();
        c.fillStyle = '#E8333F'; c.beginPath(); c.roundRect(-370, -60, 110, 110, 24); c.fill(); txt('VS', -315, -5, 44, '#fff', 'center'); txt('Squad', -230, -45, 32, Z.navy, 'left'); txt('now', 370, -45, 26, '#8A90A8', 'right', 600);
        txt(t > wr ? 'Bas ek match? RANKED' : 'Bas ek match?', -230, 15, 38, '#1C1C24', 'left', 800); c.restore(); }
    } });
    cue(wa, 'ding', { gain: 0.9 }); cue(wr, 'heartbeat', { gain: 0.9 }); }

  // ── 14 · A / B ──
  { const st = cut(14);
    add({ id: 'F14', at: st, note: 'Kabir torn between the book and the glowing phone; A AGLA MISSION / B BAS EK MATCH', draw(lt, d, t, blit) {
      only(kabir); roomMood(true); onBed(); kabir.set({ sit: 1, mood: 'worried', phone: 1, turn: Math.sin(t * 3) * 0.3 }); red.position.copy(RP(-2.0, 2.1, -0.6)); red.intensity = 5;
      shoot(RP(0.6, 2.5, 3.0), null, RP(-2.7, 1.9, -1.3), null, 0, { t, fov: 42 });
      blit(); dim(0.3); abCard(Wd('A,', 14) - 0.1, t, 'AGLA MISSION', 'BAS EK MATCH');
      if (lt > 1.4) pill('Ep 2 kal · tum decide karo', 1040, '#FFFFFF');
    } });
    cue(Wd('A,', 14), 'pop'); cue(Wd('B,', 14), 'pop'); }

  return { shots: S, cues: CUES };
}
