// Screen-space UI for Chhotu ke 100 Din: phone mock + chat, clock, icons, the crashing 100, door, AURA/PHONE HUD.
import { ctx, C, W, H, clamp, lerp, eo, eob, pop, font, rr, circle as circ, poly, withA, scaled, screen } from './lib.js';
import * as K from './kit.js';
export const ramp = K.ramp;
/* text wrap helper */
export function wrap(text, maxW) { const ws = text.split(' '), out = []; let cur = '';
  ws.forEach((w) => { const t = cur ? cur + ' ' + w : w; if (ctx.measureText(t).width > maxW && cur) { out.push(cur); cur = w; } else cur = t; }); if (cur) out.push(cur); return out; }
/* phone mock (screen space). fn(sx, sy, sw, sh) draws the screen content, clipped. */
export function phone(cx, cy, w, h, fn, o = {}) { const x = cx - w / 2, y = cy - h / 2;
  ctx.save(); ctx.shadowColor = 'rgba(0,0,0,.5)'; ctx.shadowBlur = 50; rr(x, y, w, h, 64); ctx.fillStyle = '#0e0f13'; ctx.fill(); ctx.restore();
  const sx = x + 18, sy = y + 18, sw = w - 36, sh = h - 36; ctx.save(); rr(sx, sy, sw, sh, 48); ctx.fillStyle = o.bg || '#f3f1ec'; ctx.fill(); ctx.clip(); fn(sx, sy, sw, sh); ctx.restore();
  rr(cx - 60, y + 30, 120, 30, 15); ctx.fillStyle = '#0e0f13'; ctx.fill();
}
/* chat screen pieces */
export function chatHeader(sx, sy, sw, name, sub = 'online') { ctx.fillStyle = '#ffffff'; ctx.fillRect(sx, sy, sw, 150);
  ctx.fillStyle = 'rgba(0,0,0,.08)'; ctx.fillRect(sx, sy + 150, sw, 2); circ(sx + 80, sy + 96, 36, '#ff8fb5'); font(36, 900); ctx.fillStyle = '#fff'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(name[0], sx + 80, sy + 98);
  ctx.textAlign = 'left'; font(34, 900); ctx.fillStyle = C.ink; ctx.fillText(name, sx + 134, sy + 84); font(22, 800); ctx.fillStyle = C.green; ctx.fillText(sub, sx + 134, sy + 118); }
/* bubble: side 'l' (them) | 'r' (me); returns bottom y */
export function bubble(sx, sw, y, text, side, a = 1, o = {}) { if (a <= 0) return y; font(o.size || 34, 800); const lines = wrap(text, sw * 0.62), lh = (o.size || 34) * 1.3;
  const bw = Math.max(...lines.map((l) => ctx.measureText(l).width)) + 48 + (o.icon ? 56 : 0), bh = lines.length * lh + 34;
  const bx = side === 'r' ? sx + sw - 30 - bw : sx + 30;
  scaled(side === 'r' ? bx + bw : bx, y + bh, eob(a), () => { rr(bx, y, bw, bh, 26); ctx.fillStyle = side === 'r' ? (o.col || '#d9fdd3') : '#ffffff'; ctx.fill();
    ctx.fillStyle = C.ink; ctx.textAlign = 'left'; ctx.textBaseline = 'middle'; lines.forEach((l, i) => ctx.fillText(l, bx + 24, y + 17 + lh * (i + 0.5)));
    if (o.icon) o.icon(bx + bw - 44, y + bh / 2, 1); });
  return y + bh + 18; }
export function typingDots(sx, sw, y, t, side = 'l', a = 1) { if (a <= 0) return; const bx = side === 'r' ? sx + sw - 30 - 130 : sx + 30;
  withA(a, () => { rr(bx, y, 130, 70, 30); ctx.fillStyle = side === 'r' ? '#d9fdd3' : '#fff'; ctx.fill(); for (let i = 0; i < 3; i++) circ(bx + 35 + i * 30, y + 35 - 8 * Math.max(0, Math.sin(t * 9 - i * 0.9)), 9, '#9aa0a6'); }); }
export function inputBar(sx, sy, sw, sh, text, caret, t) { const y = sy + sh - 120; ctx.fillStyle = '#ffffff'; ctx.fillRect(sx, y - 10, sw, 140);
  rr(sx + 24, y + 10, sw - 140, 80, 40); ctx.fillStyle = '#f0f0f0'; ctx.fill(); font(30, 800); ctx.fillStyle = text ? C.ink : '#9aa0a6'; ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
  const tx = text || 'Message'; ctx.fillText(tx, sx + 54, y + 50); if (caret && Math.sin(t * 10) > 0) { const cw = text ? ctx.measureText(text).width : 0; ctx.fillStyle = C.blue; ctx.fillRect(sx + 56 + cw, y + 30, 4, 40); }
  circ(sx + sw - 68, y + 50, 40, '#25d366'); poly([[sx + sw - 84, y + 30], [sx + sw - 44, y + 50], [sx + sw - 84, y + 70], [sx + sw - 78, y + 50]], '#fff'); }
/* lock-screen style notification card */
export function notif(a, y, name, msg, o = {}) { if (a <= 0) return; screen(() => { const yy = lerp(-260, y, eob(a));
  ctx.save(); ctx.shadowColor = 'rgba(0,0,0,.5)'; ctx.shadowBlur = 40; rr(120, yy, 840, 220, 40); ctx.fillStyle = 'rgba(250,250,252,.97)'; ctx.fill(); ctx.restore();
  circ(210, yy + 110, 52, '#ff8fb5'); font(52, 900); ctx.fillStyle = '#fff'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(name[0], 210, yy + 113);
  ctx.textAlign = 'left'; font(28, 800); ctx.fillStyle = '#7a7d85'; ctx.fillText((o.app || 'MESSAGE') + '  ·  abhi', 290, yy + 62); font(50, 900); ctx.fillStyle = C.ink; ctx.fillText(name, 290, yy + 114);
  font(36, 800); ctx.fillStyle = '#3a3d44'; ctx.fillText(msg, 290, yy + 170); if (o.icon) o.icon(290 + ctx.measureText(msg).width + 36, yy + 168, 0.85); }); }
/* icons */
export function eyesIcon(x, y, s = 1) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); for (const dx of [-14, 14]) { ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.ellipse(dx, 0, 12, 17, 0, 0, 7); ctx.fill(); ctx.strokeStyle = '#333'; ctx.lineWidth = 2.5; ctx.stroke(); circ(dx + 4, 3, 6, '#222'); } ctx.restore(); }
export function shadesIcon(x, y, s = 1) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); circ(0, 0, 22, '#ffcc33'); ctx.fillStyle = '#111'; rr(-20, -9, 17, 12, 4); ctx.fill(); rr(3, -9, 17, 12, 4); ctx.fill(); ctx.fillRect(-4, -6, 8, 3); ctx.strokeStyle = '#7a4a00'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(0, 6, 9, 0.2, Math.PI - 0.2); ctx.stroke(); ctx.restore(); }
export function heart(x, y, s, col = C.red) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(0, 14); ctx.bezierCurveTo(-30, -6, -16, -30, 0, -14); ctx.bezierCurveTo(16, -30, 30, -6, 0, 14); ctx.fill(); ctx.restore(); }
export function flame(x, y, s, t) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s * (1 + 0.08 * Math.sin(t * 20))); poly([[0, -60], [22, -18], [16, 10], [-16, 10], [-22, -18]], '#ff7a1a'); poly([[0, -34], [11, -8], [8, 8], [-8, 8], [-11, -8]], '#ffd23f'); ctx.restore(); }
export function fireIcon(x, y, s, t) { flame(x, y + 20 * s, s * 0.6, t); }
export function pdfIcon(x, y, s = 1) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); rr(-26, -32, 52, 64, 6); ctx.fillStyle = '#fff'; ctx.fill(); ctx.strokeStyle = '#ccc'; ctx.lineWidth = 2; ctx.stroke(); rr(-26, 4, 52, 22, 4); ctx.fillStyle = C.red; ctx.fill(); font(16, 900); ctx.fillStyle = '#fff'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('PDF', 0, 16); ctx.restore(); }
/* analog wall clock (world or screen) */
export function clock(x, y, r, hh, mm, o = {}) { const col = o.col || C.ink;
  circ(x, y, r + 10, o.rim || '#2b2f3a'); circ(x, y, r, '#fbf8f0'); for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; ctx.strokeStyle = col; ctx.lineWidth = i % 3 ? 3 : 7; ctx.beginPath(); ctx.moveTo(x + Math.sin(a) * r * 0.82, y - Math.cos(a) * r * 0.82); ctx.lineTo(x + Math.sin(a) * r * 0.95, y - Math.cos(a) * r * 0.95); ctx.stroke(); }
  const ha = ((hh % 12) + mm / 60) / 12 * Math.PI * 2, ma = mm / 60 * Math.PI * 2; ctx.lineCap = 'round';
  ctx.strokeStyle = col; ctx.lineWidth = r * 0.09; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + Math.sin(ha) * r * 0.5, y - Math.cos(ha) * r * 0.5); ctx.stroke();
  ctx.strokeStyle = o.hand || C.red; ctx.lineWidth = r * 0.06; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + Math.sin(ma) * r * 0.78, y - Math.cos(ma) * r * 0.78); ctx.stroke(); circ(x, y, r * 0.07, col); }
export function digital(x, y, hh, mm, size, col = C.red) { font(size, 900); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; const s = `${String(hh).padStart(2, '0')}:${String(Math.floor(mm)).padStart(2, '0')}`;
  rr(x - ctx.measureText(s).width / 2 - 30, y - size * 0.7, ctx.measureText(s).width + 60, size * 1.4, 18); ctx.fillStyle = 'rgba(12,12,16,.92)'; ctx.fill(); ctx.strokeStyle = col; ctx.lineWidth = 5; ctx.stroke(); ctx.fillStyle = col; ctx.fillText(s, x, y + 3); }
/* THE 100: chunky red extruded number */
export function hundred(x, y, s, rot = 0, a = 1, txt = '100') { withA(a, () => { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); font(420, 900); ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  for (let i = 14; i > 0; i--) { ctx.fillStyle = i > 2 ? '#7a1610' : '#1a0a08'; ctx.fillText(txt, i * 1.6, i * 2.2); }
  ctx.lineWidth = 18; ctx.strokeStyle = '#1a0a08'; ctx.strokeText(txt, 0, 0); const g = ctx.createLinearGradient(0, -160, 0, 160); g.addColorStop(0, '#ff6a5c'); g.addColorStop(1, '#d92b20'); ctx.fillStyle = g; ctx.fillText(txt, 0, 0);
  if (txt === '100') { ctx.fillStyle = 'rgba(255,255,255,.35)'; ctx.fillRect(-380, -120, 760, 14); } ctx.restore(); }); }
/* debris chunks flying from (x, y) after t0 */
export function debris(t, t0, x, y, n = 18, col = '#cbbfa8') { const dt = t - t0; if (dt < 0 || dt > 1.6) return; for (let i = 0; i < n; i++) { const r1 = Math.sin(i * 91.7) * 0.5 + 0.5, r2 = Math.sin(i * 37.3 + 1) * 0.5 + 0.5;
  const vx = (r1 - 0.5) * 900, vy = -200 - r2 * 500; const px = x + vx * dt, py = y + vy * dt + 1400 * dt * dt; withA(1 - dt / 1.6, () => { ctx.save(); ctx.translate(px, py); ctx.rotate(dt * (6 + i)); rr(-10 - r2 * 14, -8, 20 + r2 * 28, 16 + r1 * 14, 3); ctx.fillStyle = i % 3 ? col : '#8f8574'; ctx.fill(); ctx.restore(); }); } }
/* door in the room's left wall; open 0..1 (swings in), handle 0..1 (lever turns), light under the door, feet shadows */
export function door(x, fl, o = {}) { const w = 190, h = 440, y = fl - h;
  ctx.fillStyle = '#5b3a22'; ctx.fillRect(x - 14, y - 14, w + 28, h + 14);
  if (o.open > 0) { ctx.fillStyle = '#fff3c4'; ctx.fillRect(x, y, w, h); }
  ctx.save(); ctx.translate(x, y); ctx.scale(1 - 0.75 * (o.open || 0), 1); rr(0, 0, w, h, 4); ctx.fillStyle = '#9b6b40'; ctx.fill(); ctx.strokeStyle = '#7d5532'; ctx.lineWidth = 6; ctx.strokeRect(24, 30, w - 48, 160); ctx.strokeRect(24, 230, w - 48, 180);
  ctx.save(); ctx.translate(w - 34, 250); ctx.rotate(-0.9 * (o.handle || 0)); circ(0, 0, 13, '#d9c27a'); rr(-46, -7, 46, 14, 7); ctx.fillStyle = '#d9c27a'; ctx.fill(); ctx.restore(); ctx.restore();
  if (o.light > 0) withA(o.light, () => { ctx.fillStyle = '#ffe9a8'; ctx.fillRect(x, fl - 8, w, 8); const g = ctx.createLinearGradient(0, fl, 0, fl + 70); g.addColorStop(0, 'rgba(255,225,150,.55)'); g.addColorStop(1, 'rgba(255,225,150,0)'); ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(x, fl); ctx.lineTo(x + w, fl); ctx.lineTo(x + w + 120, fl + 70); ctx.lineTo(x - 60, fl + 70); ctx.fill();
    if (o.feet > 0) withA(o.feet, () => { ctx.fillStyle = '#2a1f14'; ctx.fillRect(x + 50, fl - 8, 34, 8); ctx.fillRect(x + 108, fl - 8, 34, 8); }); }); }
export function chair(x, fl) { ctx.fillStyle = '#6b4a2f'; rr(x - 60, fl - 112, 120, 16, 5); ctx.fill(); ctx.fillRect(x - 54, fl - 98, 12, 98); ctx.fillRect(x + 42, fl - 98, 12, 98); ctx.fillRect(x - 64, fl - 260, 14, 160); rr(x - 70, fl - 262, 26, 90, 6); ctx.fill(); }
/* HUD: left = days, right = AURA (keyframed), under left = PHONE life */
export function hud(t, o) { K.hud(t, { left: { pts: [[0, o.days]], unit: 'DIN', sub: 'BOARDS TAK' }, right: { pts: o.aura, unit: '', sub: 'AURA' } }, o.a ?? 1); }
export function lifePill(t, a, lost = 0, blink = 0) { if (a <= 0) return; screen(() => withA(a, () => scaled(225, 314, eob(clamp(a)), () => {
  rr(130, 288, 190, 52, 26); ctx.fillStyle = 'rgba(18,17,16,.9)'; ctx.fill(); ctx.strokeStyle = C.red; ctx.lineWidth = 3; ctx.stroke();
  font(24, 800); ctx.fillStyle = '#fff'; ctx.textAlign = 'left'; ctx.textBaseline = 'middle'; ctx.fillText('PHONE', 150, 315); const on = blink ? (Math.sin(t * 14) > -0.2 ? 1 : 0.25) : 1;
  withA(on, () => heart(256, 314, 0.75, lost ? '#555' : C.red)); font(24, 900); ctx.fillStyle = '#fff'; ctx.fillText('×1', 276, 315); }))); }
/* AURA shatter: shards flying from the right HUD box */
export function shatter(t, t0) { const dt = t - t0; if (dt < 0 || dt > 1.4) return; screen(() => { for (let i = 0; i < 16; i++) { const a = i / 16 * Math.PI * 2 + 0.3, sp = 300 + (i % 4) * 120;
  withA(1 - dt / 1.4, () => { ctx.save(); ctx.translate(W - 240 + Math.cos(a) * sp * dt, 226 + Math.sin(a) * sp * dt + 600 * dt * dt); ctx.rotate(dt * 8 + i); poly([[-14, -10], [16, -4], [4, 14]], i % 2 ? C.yellow : '#fff'); ctx.restore(); }); } }); }

export function bookIcon(x, y, s = 1) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); rr(-24, -18, 22, 36, 3); ctx.fillStyle = '#4f7fd1'; ctx.fill(); rr(2, -18, 22, 36, 3); ctx.fillStyle = '#e8573f'; ctx.fill(); ctx.fillStyle = '#fff'; ctx.fillRect(-2, -18, 4, 36); ctx.restore(); }
export function alarmClock(x, y, r, hh, mm, ring = 0, t = 0) { const sh = ring ? Math.sin(t * 60) * 6 * ring : 0; ctx.save(); ctx.translate(x + sh, y);
  circ(-r * 0.7, -r * 0.85, r * 0.32, '#d92b20'); circ(r * 0.7, -r * 0.85, r * 0.32, '#d92b20'); ctx.strokeStyle = '#333'; ctx.lineWidth = r * 0.08; ctx.beginPath(); ctx.moveTo(-r * 0.6, r * 0.85); ctx.lineTo(-r * 0.8, r * 1.1); ctx.moveTo(r * 0.6, r * 0.85); ctx.lineTo(r * 0.8, r * 1.1); ctx.stroke();
  ctx.restore(); clock(x + sh, y, r, hh, mm, { rim: '#d92b20', hand: '#222' }); }
/* vote board: pa = A share 0..1, prog = fill progress */
export function voteBoard(cx, y, pa, prog, win = 0) { const w = 760, x = cx - w / 2;
  rr(x, y, w, 300, 28); ctx.fillStyle = 'rgba(12,14,30,.94)'; ctx.fill(); ctx.strokeStyle = '#3a4478'; ctx.lineWidth = 4; ctx.stroke();
  font(34, 900); ctx.fillStyle = '#fff'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('KAL KA VOTE', cx, y + 44);
  const row = (yy, lab, v, col, on) => { font(52, 900); ctx.fillStyle = col; ctx.textAlign = 'left'; ctx.fillText(lab, x + 40, yy); rr(x + 110, yy - 30, (w - 300) * v * prog, 60, 14); ctx.fillStyle = col; ctx.fill(); font(44, 900); ctx.fillStyle = '#fff'; ctx.fillText(Math.round(v * 100) + '%', x + 130 + (w - 300) * v * prog, yy + 2);
    if (on > 0) withA(on, () => { ctx.strokeStyle = C.green; ctx.lineWidth = 6; rr(x + 20, yy - 44, w - 40, 88, 18); ctx.stroke(); }); };
  row(y + 130, 'A', pa, C.yellow, win); row(y + 230, 'B', 1 - pa, '#ff8fb5', 0); }
export function rewind(t, a) { if (a <= 0) return; withA(a, () => { ctx.fillStyle = 'rgba(255,255,255,.08)'; for (let i = 0; i < 14; i++) { const y = ((t * 900 + i * 157) % H); ctx.fillRect(0, y, W, 6 + (i % 3) * 4); }
  for (const dx of [-60, 10]) poly([[540 + dx + 60, 380], [540 + dx + 60, 500], [540 + dx, 440]], '#fff'); font(44, 900); ctx.fillStyle = '#fff'; ctx.textAlign = 'center'; ctx.fillText('REWIND', 540, 560); }); }
