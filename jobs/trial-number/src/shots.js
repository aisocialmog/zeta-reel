// SAR KE UPAR NUMBER (trial): in this town your Class 10 % floats above your head for life. Kabir has only a "?".
import { L, Le, Wd } from './core/timing.js';
import * as K from './core/zkit.js';
const { V3, Z, blink, clamp, lerp, seg, eo, eio, eob, THREE, txt, pill, slam, phoneUI, dim } = K;

export function buildShots(E) {
  const S = [], CUES = [], add = (o) => (S.push(o), o), cue = (t, type, o = {}) => CUES.push({ t: +t.toFixed(3), type, ...o });
  const cut = (i) => (i === 0 ? 0 : L(i) - 0.06);
  const scene = new THREE.Scene();
  const sun = K.WD.sunlight(scene, E, { pos: [-6, 9, 8], target: [0, 1, 0], box: 10, i: 2.3, hemi: 1.0 });
  K.WD.sky(scene, { top: '#2F7FE0', horizon: '#BFE6FF', ground: '#BFE6FF', r: 300 });
  K.WD.clouds(scene, [[-40, 30, 0, 18], [30, 36, 20, 22], [10, 28, 120, 20]]);
  const lamp = new THREE.PointLight('#FFC27A', 0, 9, 1.6); scene.add(lamp);
  const mint = new THREE.PointLight('#6CF7CF', 0, 3, 2); scene.add(mint);
  const H = K.room(scene, E, { origin: [0, 0, 0], wall: '#FBE7D3', side: '#F4D6BC', calText: 'BOARDS', day: 90, poster: false, rug: '#C8734A', blanket: '#B388FF' });   // home: dinner
  const R = K.room(scene, E, { origin: [0, 0, -40], wall: '#FFE1C9', side: '#FFD0B0', calText: 'BOARDS', day: 90, rug: Z.mint, blanket: Z.coral });                        // Kabir's room
  const G = K.gully(scene, { origin: [0, 0, 60] }); G.ball.visible = false; [...G.G.children].filter((m) => m.geometry && m.position.y === 0.5 && m.position.z === 0).forEach((m) => (m.visible = false));
  const RP = (x, y, z) => R.p(x, y, z);
  // dinner table in the home
  { const tt = K.brick(2.6, 0.12, 1.4, '#B07A4E'); tt.position.set(0, 1.25, 0.4); scene.add(tt); [[-1.1, -0.5], [1.1, -0.5], [-1.1, 1.3], [1.1, 1.3]].forEach(([x, z]) => { const l = K.brick(0.1, 1.2, 0.1, '#7A4E2D'); l.position.set(x, 0.62, z); scene.add(l); });
    [[-0.7, 0.2], [0, 0.2], [0.7, 0.2]].forEach(([x, z]) => { const p = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.18, 0.05, 24), K.mat('#FFFFFF')); p.position.set(x, 1.34, z); scene.add(p); const f = new THREE.Mesh(new THREE.SphereGeometry(0.1, 12, 8), K.mat('#E8B04A')); f.position.set(x, 1.4, z); scene.add(f); }); }
  // samosa cart on the street
  const cart = new THREE.Group(); cart.position.copy(G.p(-2.2, 0, -2)); scene.add(cart);
  { const b = K.brick(2.2, 1.0, 1.1, '#3DB7A8'); b.position.y = 0.8; cart.add(b); const top = K.brick(2.3, 0.08, 1.2, '#E9ECEF'); top.position.y = 1.34; cart.add(top);
    for (let i = 0; i < 7; i++) { const s = new THREE.Mesh(new THREE.ConeGeometry(0.16, 0.22, 3), K.mat('#E3A040')); s.rotation.z = Math.PI / 2; s.position.set(-0.7 + (i % 4) * 0.25, 1.48, -0.2 + Math.floor(i / 4) * 0.3); cart.add(s); }
    const um = new THREE.Mesh(new THREE.ConeGeometry(1.5, 0.5, 6), K.mat('#E8333F')); um.position.y = 4.5; cart.add(um); const pole = K.brick(0.06, 2.2, 0.06, '#444'); pole.position.set(0, 2.9, 0.5); pole.scale.y = 1.4; cart.add(pole);
    const sign = K.panel(1.6, 0.4, (g, w, h) => { g.fillStyle = '#FFE45C'; g.fillRect(0, 0, w, h); g.fillStyle = '#B5372E'; g.font = `900 ${h * 0.6}px Inter`; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('SAMOSA ₹15', w / 2, h / 2); }, 512); sign.position.set(0, 0.85, 0.56); cart.add(sign); }
  // wedding gate
  const gate = new THREE.Group(); gate.position.copy(G.p(1.5, 0, 8)); scene.add(gate);
  { [-1.6, 1.6].forEach((x) => { const p = K.brick(0.3, 3.4, 0.3, '#B5372E'); p.position.set(x, 1.7, 0); gate.add(p); }); const tp = K.brick(3.6, 0.4, 0.4, '#B5372E'); tp.position.y = 3.5; gate.add(tp);
    for (let i = 0; i < 9; i++) for (let k = 0; k < 4; k++) { const m = new THREE.Mesh(new THREE.SphereGeometry(0.09, 10, 8), K.mat(k % 2 ? '#FF9F1C' : '#FFD23F')); m.position.set(-1.6 + i * 0.4, 3.2 - k * 0.2, 0.25); gate.add(m); } }

  // floating number sprite
  const numTex = (text, col) => { const c = document.createElement('canvas'); c.width = 512; c.height = 192; const g = c.getContext('2d'); g.font = '900 130px Inter'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.lineJoin = 'round';
    g.shadowColor = col; g.shadowBlur = 24; g.lineWidth = 18; g.strokeStyle = 'rgba(10,12,24,0.9)'; g.strokeText(text, 256, 100); g.fillStyle = col; g.fillText(text, 256, 100); const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t; };
  const num = (a, text, col = '#FF8A5C', h = 0.55) => { const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: numTex(text, col), transparent: true, depthWrite: false, toneMapped: false })); s.scale.set(h * 512 / 192, h, 1); s.position.y = 3.35; a.group.add(s); a.num = s; s.userData = { text, col, h }; return a; };
  const setNum = (a, text, col = a.num.userData.col, op = 1) => { if (a.num.userData.text !== text || a.num.userData.col !== col) { a.num.material.map = numTex(text, col); a.num.material.needsUpdate = true; a.num.userData.text = text; a.num.userData.col = col; } a.num.material.opacity = op; a.num.visible = op > 0.01; };

  // cast
  const town = [['#F4CDA6', '#3DDC97', 'short', '#3A2A20', '62%'], ['#8D5A3B', '#FFB703', 'spiky', '#1E1E1E', '88%'], ['#F0C08F', '#4CC9F0', 'long', '#7A4A2E', '47%'], ['#C98F63', '#B388FF', 'buns', '#1E1612', '93%'], ['#E0A878', '#FF8A3D', 'sidepart', '#2A1E14', '71%'], ['#F4CDA6', '#E8333F', 'long', '#1E1612', '55%']]
    .map(([sk, c, h, hc, n]) => num(K.person({ skin: sk, torso: c, legs: '#2A2F45', hair: h, hairCol: hc }), n));
  const dada = num(K.person({ skin: '#D9A27A', torso: '#7A8BA8', legs: '#4A4F5F', hair: 'short', hairCol: '#E8E8EE', fx: { glasses: 'round' } }), '54%');
  const chacha = num(K.person({ skin: '#B87A4E', torso: '#FFFFFF', legs: '#4A3A2A', cap: '#E9ECEF', hair: 'short', hairCol: '#1E1612' }), '46%');
  const aunty = num(K.person('aunty'), '79%');
  const dulha = num(K.person({ skin: '#E0A878', torso: '#F2E2B8', shirt: 'kurti', shirtA: { trim: '#C99A2E' }, legs: '#F2E2B8', hair: 'sidepart', hairCol: '#1E1612', cap: '#C9302C' }), '61%');
  const papa = K.person({ skin: '#C98F63', torso: '#4A6FA5', legs: '#2A2F45', hair: 'short', hairCol: '#1E1612' });
  { const hm = new THREE.Mesh(K.RB(0.86, 0.6, 0.86, 0.25), K.mat('#C9302C', { roughness: 0.25, clearcoat: 1 })); hm.position.y = 0.62; papa.headG.add(hm); const vz = new THREE.Mesh(K.RB(0.7, 0.22, 0.08, 0.04), K.mat('#1C1C24', { roughness: 0.1, metalness: 0.4 })); vz.position.set(0, 0.42, 0.42); papa.headG.add(vz); }
  const mummy = num(K.person('mummy'), '90%', '#FFD23F');
  const kabir = num(K.person('kabir'), '?', '#FFFFFF', 0.9);
  const bot = new K.ZetaBot();
  const all = [...town, dada, chacha, aunty, dulha, papa, mummy, kabir]; all.forEach((a) => scene.add(a.group)); scene.add(bot.group);
  const only = (...xs) => { all.forEach((a) => (a.group.visible = xs.includes(a))); bot.group.visible = xs.includes(bot); mint.intensity = 0; };
  const sunAt = (v) => { sun.key.target.position.copy(v); sun.key.position.copy(v).add(V3(-6, 9, 8)); };
  const out = () => { scene.environmentIntensity = 0.5; sun.key.intensity = 2.4; sun.group.children.forEach((c) => { if (c.isHemisphereLight) c.intensity = 1.0; }); lamp.intensity = 0; scene.background = new THREE.Color('#BFE6FF'); };
  const home = (night, room = H) => { scene.environmentIntensity = night ? 0.2 : 0.45; sun.key.intensity = night ? 0.35 : 2.3; sun.group.children.forEach((c) => { if (c.isHemisphereLight) c.intensity = night ? 0.35 : 1.0; }); lamp.intensity = night ? 8 : 0; lamp.position.copy(room.p(1.5, 3.2, 1.2)); room.setNight(night); scene.background = new THREE.Color(night ? '#0B1030' : '#BFE6FF'); sunAt(room.p(0, 1, 0)); };
  const { shoot } = K.makeShoot(E, scene);
  const bob = (a, t, k = 0) => { if (a.num) a.num.position.y = 3.35 + Math.sin(t * 2 + k) * 0.06; };

  // ── 0 · the town: everyone has a floating % ──
  { const st = cut(0), wm = Wd('marks,', 0), wt = Wd('tairte', 0);
    add({ id: 'N00', at: st, note: 'street, crane down: townspeople walking, each with their Class 10 % floating over the head', draw(lt, d, t, blit) {
      only(...town); out(); sunAt(G.p(0, 1, 0));
      town.forEach((a, i) => { const z = -6 + i * 2.2 + ((t * (i % 2 ? 0.7 : -0.6)) % 2); a.at(...G.p((i % 2 ? 1.6 : -1.4) + (i % 3) * 0.3, 0.04, z).toArray()); a.group.rotation.y = i % 2 ? Math.PI : 0; a.set({ walk: t * 7 + i, mood: 'neutral', blink: blink(t, i) }); bob(a, t, i); });
      shoot(G.p(0.5, 9, 10), G.p(0.2, 3.4, 6.5), G.p(0, 1.4, -2), G.p(0, 2.6, 0), eio(clamp(lt / d)), { t, f: 1, fov: 50 });
      blit(); if (t > wm) slam(['CLASS 10 KE MARKS'], 420, seg(t, wm, wm + 0.3), '#FFFFFF', 92); if (t > wt) slam(['SAR KE UPAR'], 540, seg(t, wt, wt + 0.3), '#FF8A5C', 100, 0.03);
    } });
    cue(st, 'whoosh', { gain: 0.6 }); cue(wm, 'pop'); cue(wt, 'slam', { gain: 0.6 }); }

  // ── 1 · forever ──
  { const st = cut(1);
    add({ id: 'N01', at: st, note: 'close on an old dada, his 54% still floating; ZINDAGI BHAR', draw(lt, d, t, blit) {
      only(dada); out(); const p = G.p(-1.5, 0.04, 1); dada.at(p.x, p.y, p.z); dada.face(G.p(-1.5, 0, 8)); dada.set({ mood: 'sad', blink: blink(t), nod: 0.1 }); bob(dada, t);
      shoot(G.p(-1.5, 2.9, 5.6), G.p(-1.5, 3.0, 4.8), G.p(-1.5, 2.8, 1), null, eo(clamp(lt / d)), { t, f: 1, fov: 44 });
      blit(); slam(['ZINDAGI BHAR'], 780, seg(lt, 0.1, 0.4), '#FFFFFF', 110);
    } });
    cue(st + 0.1, 'thud', { gain: 0.8 }); }

  // ── 2 · samosa chacha ──
  { const st = cut(2), ws = Wd('samose,', 2);
    add({ id: 'N02', at: st, note: 'samosa cart: chacha 46%, then SAMOSE: 100% ⭐', draw(lt, d, t, blit) {
      only(chacha); out(); sunAt(cart.position); const p = cart.position.clone().add(V3(0, 0.04, -1.0)); chacha.at(p.x, p.y, p.z); chacha.face(cart.position.clone().add(V3(0, 0, 8))); chacha.set({ mood: t > ws ? 'happy' : 'neutral', wave: t > ws ? t : 0, blink: blink(t) }); bob(chacha, t);
      shoot(cart.position.clone().add(V3(1.4, 2.9, 7.0)), cart.position.clone().add(V3(1.0, 2.8, 6.2)), cart.position.clone().add(V3(0, 2.4, -0.6)), null, eio(clamp(lt / d)), { t, f: 1, fov: 46 });
      blit(); if (t > ws) pill('SAMOSE: 100% ⭐', 470, '#FFE45C', 'rgba(14,21,48,0.88)', 54, lerp(1.3, 1, eob(seg(t, ws, ws + 0.3))));
    } });
    cue(st, 'whoosh', { gain: 0.5 }); cue(Wd('samose,', 2), 'ding', { gain: 0.6 }); }

  // ── 3 · wedding: aunty checks the number first ──
  { const st = cut(3), wn = Wd('number', 3), wl = Wd('ladka.', 3);
    add({ id: 'N03', at: st, note: 'wedding gate with marigolds: rishta aunty squints at the dulha’s 61% before looking at him', draw(lt, d, t, blit) {
      only(aunty, dulha); out(); sunAt(gate.position); const g0 = gate.position;
      dulha.at(g0.x + 0.6, 0.04, g0.z + 0.4); dulha.face(V3(g0.x - 1, 0, g0.z + 3)); dulha.set({ mood: t > wl ? 'happy' : 'worried', blink: blink(t) }); bob(dulha, t);
      aunty.at(g0.x - 0.9, 0.04, g0.z + 1.4); aunty.face(dulha.group.position); aunty.set({ mood: t > wl ? 'smug' : 'shock', nod: t > wl ? 0 : -0.45, say: t > wn && t < wl ? 'hmm... 61?' : t > wl ? 'chalega 😏' : null }); bob(aunty, t, 1);
      shoot(V3(g0.x - 0.2, 2.8, g0.z + 7.6), V3(g0.x - 0.1, 2.7, g0.z + 6.6), V3(g0.x - 0.1, 2.3, g0.z + 0.9), null, eio(clamp(lt / d)), { t, f: 1, fov: 48 });
      blit(); pill('SHAADI', 300, '#FFD23F', 'rgba(14,21,48,0.85)', 44);
    } });
    cue(st, 'chirp', { dur: 1, gain: 0.3 }); cue(Wd('number', 3), 'tock'); cue(Wd('ladka.', 3), 'boing', { gain: 0.5 }); }

  // ── 4 · Papa never takes his helmet off ──
  const dinner = (t, o = {}) => { papa.at(-0.75, -0.06, -0.6); papa.face(V3(-0.75, 0, 6)); papa.set({ sit: 1, mood: 'neutral', blink: blink(t), ...(o.papa || {}) });
    mummy.at(0.75, -0.06, -0.6); mummy.face(V3(0.75, 0, 6)); mummy.set({ sit: 1, mood: 'happy', blink: blink(t, 1), ...(o.mummy || {}) }); bob(mummy, t);
    kabir.at(2.1, -0.06, 0.5); kabir.face(V3(-3, 0, 0.5)); kabir.set({ sit: 1, mood: 'neutral', blink: blink(t, 2), ...(o.kabir || {}) }); bob(kabir, t, 2); };
  { const st = cut(4), wh = Wd('helmet', 4);
    add({ id: 'N04', at: st, note: 'dinner at home: Papa eats with a red motorbike helmet on; no number visible', draw(lt, d, t, blit) {
      only(papa, mummy, kabir); home(false); dinner(t); setNum(kabir, '?');
      shoot(V3(-0.2, 2.7, 5.4), V3(-0.5, 2.6, 4.4), V3(-0.4, 2.1, -0.4), null, eio(clamp(lt / d)), { t, f: 1, fov: 46 });
      blit(); if (t > wh) slam(['HELMET 24×7'], 470, seg(t, wh, wh + 0.3), '#FF8A5C', 100);
    } });
    cue(st, 'whoosh', { gain: 0.4 }); cue(Wd('helmet', 4), 'thud', { gain: 0.6 }); }

  // ── 5 · Mummy: 90% ──
  { const st = cut(5), wn = Wd('Nabbe', 5), wc = Wd('chalti', 5);
    add({ id: 'N05', at: st, note: 'Mummy close with a glowing gold 90%; Papa shrinks behind his helmet', draw(lt, d, t, blit) {
      only(papa, mummy); home(false); dinner(t, { mummy: { mood: 'smug', point: t > wc }, papa: { mood: 'worried', nod: 0.3 } });
      shoot(V3(0.6, 3.0, 4.6), V3(0.7, 3.0, 4.0), V3(0.75, 2.6, -0.6), null, eo(clamp(lt / d)), { t, f: 1, fov: 44, look: { bloom: 0.4 } });
      blit(); if (t > wc) pill('GHAR KI BOSS 👑', 470, '#FFD23F', 'rgba(14,21,48,0.88)', 52, lerp(1.3, 1, eob(seg(t, wc, wc + 0.3))));
    } });
    cue(Wd('Nabbe', 5), 'sparkle', { dur: 1, gain: 0.7 }); cue(Wd('chalti', 5), 'ding', { gain: 0.6 }); }

  // ── 6 · Kabir: only a question mark ──
  { const st = cut(6), ws = Wd('sawaal', 6);
    add({ id: 'N06', at: st, note: 'Kabir (coral beanie) at the table, a big white "?" floating over his head', draw(lt, d, t, blit) {
      only(papa, mummy, kabir); home(false); dinner(t, { kabir: { mood: 'worried' } }); setNum(kabir, '?', '#FFFFFF', 1); kabir.num.scale.set(0.9 * 512 / 192 * (1 + 0.08 * Math.sin(t * 6)), 0.9 * (1 + 0.08 * Math.sin(t * 6)), 1);
      shoot(V3(-0.6, 3.0, 2.6), V3(-0.4, 3.0, 2.0), V3(2.1, 2.8, 0.5), null, eio(clamp(lt / d)), { t, f: 1, fov: 44 });
      blit(); pill('KABIR', 300, Z.coral, 'rgba(14,21,48,0.88)', 50);
    } });
    cue(st, 'whoosh', { gain: 0.4 }); cue(Wd('sawaal', 6), 'boing', { gain: 0.5 }); }

  // ── 7 · 90 days left ──
  { const st = cut(7), wn = Wd('nabbe', 7);
    add({ id: 'N07', at: st, note: 'Kabir’s room: calendar BOARDS DAY 90 in red; the ? pulses', draw(lt, d, t, blit) {
      only(kabir); home(false, R); R.setCal(90, 1); kabir.at(...RP(0.2, 0.04, -1.6).toArray()); kabir.face(RP(0.2, 0, 6)); kabir.set({ mood: 'shock', blink: blink(t) }); setNum(kabir, '?', '#FFFFFF'); bob(kabir, t);
      shoot(RP(0.6, 2.9, 2.6), RP(0.7, 2.9, 1.6), RP(0.7, 2.9, -3.0), null, eio(clamp(lt / d)), { t, f: 1, fov: 46 });
      blit(); if (t > wn) slam(['90 DIN'], 470, seg(t, wn, wn + 0.3), '#FF4D4D', 150);
    } });
    cue(st, 'heartbeat', { gain: 0.7 }); cue(Wd('nabbe', 7), 'slam', { gain: 0.7 }); }

  // ── 8 · Zeta plan ──
  const plan = [['Day 1', 'Triangles'], ['Day 2', 'Trigonometry'], ['Day 3', 'Circles'], ['Day 4', 'Quadratic'], ['Day 5', 'Real Numbers']];
  { const st = cut(8), wz = Wd('Zeta', 8), wm = Wd('mission.', 8);
    add({ id: 'N08', at: st, note: 'phone (recreated Zeta UI): Ace My Exams plan, roz ek mission; Zeta Bot beside Kabir', draw(lt, d, t, blit) {
      only(kabir, bot); home(false, R); kabir.at(...RP(-0.5, 0.04, 0.4).toArray()); kabir.group.rotation.y = 0.4; kabir.set({ mood: 'happy', phone: 1 }); setNum(kabir, '?'); bot.at(...RP(0.9, 2.6, 0.9).toArray()).face(RP(0, 2, 6)); bot.set({ t });
      shoot(RP(0.2, 2.7, 4.8), null, RP(0.2, 2.3, 0.6), null, 0, { t, fov: 44 }); blit(); dim(0.45);
      if (t > wz - 0.3) phoneUI(540, lerp(1000, 820, eo(seg(t, wz - 0.3, wz))), 1.05, () => { const c = K.ctx; c.fillStyle = Z.navy; c.fillRect(-250, -480, 500, 960);
        c.fillStyle = Z.mint; c.beginPath(); c.roundRect(-210, -420, 60, 60, 14); c.fill(); txt('Z', -180, -390, 40, Z.navy, 'center'); txt('Ace My Exams', -130, -390, 38, '#fff'); txt('Hardest first · roz ek mission', -210, -320, 26, '#C9D1FF', 'left', 600);
        plan.forEach(([dd, ch], i) => { const y = -230 + i * 100, p = eo(seg(t, wz + 0.2 + i * 0.25, wz + 0.5 + i * 0.25)); c.save(); c.globalAlpha = p; c.translate((1 - p) * 60, 0);
          c.fillStyle = i === 0 ? 'rgba(255,107,90,0.25)' : 'rgba(255,255,255,0.07)'; c.beginPath(); c.roundRect(-210, y - 38, 420, 76, 18); c.fill(); txt(dd, -185, y, 28, i === 0 ? Z.coral : '#9AA3BF', 'left', 800); txt(ch, -60, y, 32, '#fff', 'left', 700); c.restore(); });
        if (t > wm) { c.fillStyle = Z.coral; c.beginPath(); c.roundRect(-210, 300, 420, 90, 45); c.fill(); txt("Today's mission →", 0, 345, 32, '#fff', 'center'); }
      });
    } });
    cue(Wd('Zeta', 8), 'pop'); for (let i = 0; i < 5; i++) cue(Wd('Zeta', 8) + 0.2 + i * 0.25, 'pop', { gain: 0.3 }); cue(Wd('mission.', 8), 'ding'); }

  // ── 9 · something appears under the ? ──
  { const st = cut(9), wd = Wd('neeche,', 9);
    add({ id: 'N09', at: st, note: 'night, Kabir studying on the bed; under the ? a faint mint "6_%" flickers into view', draw(lt, d, t, blit) {
      only(kabir); home(true, R); kabir.at(...RP(-2.8, -0.16, -1.2).toArray()); kabir.group.rotation.y = Math.PI / 2 - 0.4; R.book.position.copy(RP(-2.6, 0.95, -0.2)); kabir.set({ sit: 1, mood: t > wd ? 'shock' : 'neutral', nod: t > wd ? -0.3 : 0.2 }); setNum(kabir, '?');
      mint.position.copy(RP(-2.6, 3.0, -1.0)); mint.intensity = t > wd ? 1.5 : 0;
      shoot(RP(0.6, 2.8, 3.0), RP(-0.3, 2.9, 1.6), RP(-2.7, 2.6, -1.3), null, eio(clamp(lt / d)), { t, f: 1, fov: 42, look: { bloom: 0.5 } });
      blit(); const p = seg(t, wd - 0.2, wd + 0.8); if (p > 0) { const c = K.ctx, fl = Math.sin(t * 23) > 0.2 ? 1 : 0.55; c.save(); c.globalAlpha = p * fl; c.font = '900 120px Inter'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.shadowColor = Z.mint; c.shadowBlur = 40; c.fillStyle = Z.mint; c.fillText('6_%', 540, 560); c.restore(); }
    } });
    cue(st, 'whoosh', { gain: 0.4 }); cue(Wd('dikhne', 9), 'sparkle', { dur: 1.4, gain: 0.9 }); }

  // ── 10 · CTA ──
  { const st = cut(10), wc = Wd('Comment', 10);
    add({ id: 'N10', at: st, note: 'Kabir points at the viewer: TUMHARA NUMBER? · COMMENT 👇', draw(lt, d, t, blit) {
      only(kabir); home(false, R); kabir.at(...RP(0, 0.04, 0.6).toArray()); kabir.face(RP(0, 2, 8)); kabir.set({ mood: 'happy', point: 1, blink: blink(t) }); setNum(kabir, '?'); bob(kabir, t);
      shoot(RP(0.2, 2.8, 4.4), RP(0.2, 2.7, 3.6), RP(0.2, 2.6, 0.6), null, eio(clamp(lt / d)), { t, fov: 44 });
      blit(); slam(['TUMHARA NUMBER?'], 420, seg(lt, 0.1, 0.4), '#FF8A5C', 96);
      const p = seg(t, wc - 0.1, wc + 0.25); if (p > 0) { const s = lerp(0.4, 1, eob(p)), c = K.ctx; c.save(); c.translate(540, 1700); c.scale(s, s); c.fillStyle = Z.coral; c.beginPath(); c.roundRect(-300, -80, 600, 160, 80); c.fill(); txt('COMMENT 👇', 0, 2, 66, '#fff', 'center'); c.restore(); }
    } });
    cue(Wd('Comment', 10), 'pop'); cue(Le(10) + 0.2, 'ding', { gain: 0.6 }); }

  return { shots: S, cues: CUES };
}
