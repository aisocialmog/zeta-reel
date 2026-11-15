// Captions, What-If-Survival look: 1-3 words in UPPERCASE Inter Black on the soil band (y 1330), heavy ink outline.
// Words light up as they are SPOKEN (unspoken words of the chunk are dimmed), keywords get a colour.
// script.json line: { "text": "...", "caps": "CHAARON TARAF | *SAMUNDAR HAI, | PAR YE !PAANI | PIYA," }
//   "|" = next chunk · marker before a word = its colour: * yellow (objects, numbers) · ! red (danger)
//   + green (solved) · ~ blue (water, cold). Numbers are yellow automatically.
// Without "caps": auto chunks of up to 3 words, breaking after punctuation.
import { ctx, C, clamp, lerp, seg, eob } from './lib.js';
import { T, lineWords } from './timing.js';

export const CAP = { y: 1330, size: 76, maxW: 820 };
const MARK = { '*': C.yellow, '!': C.red, '+': C.green, '~': C.blue };
let caps = [];
const nm = (w) => String(w).toLowerCase().replace(/[^a-z0-9']+/g, '');

function autoChunks(text) {
  const ws = text.split(/\s+/).filter(Boolean), out = []; let cur = [];
  ws.forEach((w) => { cur.push(w); if (cur.length >= 3 || /[,.!?:…]$/.test(w)) { out.push(cur.join(' ')); cur = []; } });
  if (cur.length) out.push(cur.join(' ')); return out;
}

export function buildCaptions(script) {
  caps = [];
  script.lines.forEach((ln, i) => {
    const chunks = (ln.caps ? ln.caps.split('|') : autoChunks(ln.text)).map((s) => s.trim()).filter(Boolean);
    const ws = lineWords(i); if (!ws.length) return;
    let k = 0;   // spoken-word cursor: chunk words map 1:1 onto spoken words when they match, else by order
    chunks.forEach((c) => {
      const words = c.split(/\s+/).map((raw) => {
        const m = MARK[raw[0]] ? raw[0] : null, txt = (m ? raw.slice(1) : raw).toUpperCase();
        let j = ws.findIndex((w, q) => q >= k && nm(w.w) && nm(w.w) === nm(txt));
        if (j < 0 || j > k + 2) j = Math.min(k, ws.length - 1);
        k = Math.min(j + 1, ws.length - 1);
        return { txt, col: m ? MARK[m] : /\d/.test(txt) ? C.yellow : C.white, s: ws[j].s };
      });
      for (let q = 1; q < words.length; q++) words[q].s = Math.max(words[q].s, words[q - 1].s);
      caps.push({ line: i, s: words[0].s - 0.04, words });
    });
  });
  caps.forEach((c, k) => {
    const next = caps[k + 1], lineEnd = T.lines[c.line].end;
    c.e = next ? (next.s - lineEnd > 0.7 && next.line !== c.line ? lineEnd + 0.3 : next.s) : T.dur;
  });
  return caps;
}
export const captionList = () => caps;

export function drawCaption(t, hide = false) {
  if (hide) return;
  const c = caps.find((c) => t >= c.s && t < c.e); if (!c) return;
  const lt = t - c.s, size = CAP.size;
  ctx.font = `900 ${size}px Inter`; ctx.letterSpacing = '0px';
  const sp = size * 0.28;
  c.words.forEach((w) => (w.w = ctx.measureText(w.txt).width));
  const width = (ws) => ws.reduce((a, w) => a + w.w, 0) + sp * (ws.length - 1);
  let rows = [c.words];
  if (width(c.words) > CAP.maxW && c.words.length > 1) {
    let best = null;
    for (let i = 1; i < c.words.length; i++) { const a = c.words.slice(0, i), b = c.words.slice(i), m = Math.max(width(a), width(b)); if (!best || m < best.m) best = { m, l: [a, b] }; }
    rows = best.l;
  }
  const fit = Math.min(1, CAP.maxW / Math.max(...rows.map(width)));
  const sc = (lt < 0.16 ? lerp(0.82, 1, eob(seg(lt, 0, 0.16))) : 1) * fit;
  ctx.save(); ctx.translate(540, CAP.y); ctx.scale(sc, sc);
  ctx.textBaseline = 'middle'; ctx.textAlign = 'left'; ctx.lineJoin = 'round';
  const lh = size * 1.1, y0 = -(rows.length - 1) * lh / 2;
  rows.forEach((row, ri) => {
    let x = -width(row) / 2; const y = y0 + ri * lh;
    for (const w of row) {
      const said = t >= w.s - 0.02;
      ctx.lineWidth = 16; ctx.strokeStyle = 'rgba(12,12,12,.92)'; ctx.strokeText(w.txt, x, y + 5); ctx.strokeText(w.txt, x, y);
      ctx.fillStyle = said ? w.col : 'rgba(255,255,255,.75)'; ctx.fillText(w.txt, x, y); x += w.w + sp;
    }
  });
  ctx.restore();
}
