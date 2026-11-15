"""Take-1 ElevenLabs VO -> data/narration.wav + lines.json + words.json.
Line spans were mapped by hand from the pitch/pause chunk list (speaker anchors: Mummy 31.4, Mishti 54.0/71.9, Chhotu 68.4).
Pauses inside a line are capped at MAXIN, gaps between lines set to GAP (nothing else is touched: no tempo change)."""
import json, re, subprocess, numpy as np, sys
sys.path.insert(0, 'tools'); import dp_align as D
from scipy.io import wavfile
SR = 44100; MAXIN, GAP, LEAD = 0.28, 0.24, 0.0
SPANS = [tuple(x) for x in json.load(open('data/spans.json'))]
src = sys.argv[1]
raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', src, '-f', 'f32le', '-ac', '1', '-ar', str(SR), '-'], capture_output=True, check=True).stdout
x = np.frombuffer(raw, np.float32).astype(np.float64)
x16 = D.load(src); P = D.pauses(x16, -35, 0.12)
S = json.load(open('script.json')); outro = S.get('outro', 2.4)
pad = lambda a, b: (max(0, a - 0.04), b + 0.06)       # keep breaths/consonant tails
out = [np.zeros(int(LEAD * SR))]; t = LEAD; lines = []; words = []
def fade(seg, ms=6):
    n = int(ms / 1000 * SR); 
    if len(seg) > 2 * n: seg = seg.copy(); seg[:n] *= np.linspace(0, 1, n); seg[-n:] *= np.linspace(1, 0, n)
    return seg
for i, (a, b) in enumerate(SPANS):
    a, b = pad(a, b)
    inner = [p for p in P if p[0] > a + 0.05 and p[1] < b - 0.05]
    chunks = []; cur = a
    for p0, p1 in inner:
        chunks.append((cur, p0)); keep = min(p1 - p0, MAXIN); chunks.append(('gap', keep)); cur = p1
    chunks.append((cur, b))
    st = t; spoken = []
    for c in chunks:
        if c[0] == 'gap': out.append(np.zeros(int(c[1] * SR))); t += c[1]
        else:
            seg = fade(x[int(c[0] * SR):int(c[1] * SR)]); out.append(seg); spoken.append((t, t + len(seg) / SR)); t += len(seg) / SR
    lines.append(dict(i=i, text=S['lines'][i]['text'], start=round(st + 0.04, 3), end=round(t - 0.06, 3)))
    # words: split text into phrases at punctuation; map phrases onto spoken chunks (merge/split by length)
    ws = S['lines'][i]['text'].split()
    tot = sum(e - s for s, e in spoken); w8 = np.array([len(re.sub(r'[^A-Za-z0-9]', '', w)) + 1.5 for w in ws])
    # phrase groups end at punctuation
    groups, g = [], []
    for k, w in enumerate(ws):
        g.append(k)
        if re.search(r'[.,!?:…]$', w): groups.append(g); g = []
    if g: groups.append(g)
    if len(groups) == len(spoken):
        for gi, (s, e) in zip(groups, spoken):
            ww = w8[gi]; cs = np.concatenate([[0], np.cumsum(ww)]) / ww.sum() * (e - s - 0.04) + s + 0.02
            for j, k in enumerate(gi): words.append(dict(w=ws[k], line=i, s=round(cs[j], 3), e=round(cs[j + 1], 3)))
    else:   # spread over the concatenated speech time
        tl = np.concatenate([[0], np.cumsum(w8)]) / w8.sum() * tot
        def at(u):
            for s, e in spoken:
                if u <= e - s: return s + u
                u -= e - s
            return spoken[-1][1]
        for k, w in enumerate(ws): words.append(dict(w=w, line=i, s=round(at(tl[k]) + 0.01, 3), e=round(at(tl[k + 1]), 3)))
    if i < len(SPANS) - 1: out.append(np.zeros(int(GAP * SR))); t += GAP
out.append(np.zeros(int(outro * SR))); t += outro
y = np.concatenate(out); y = y / max(1e-9, np.abs(y).max()) * 0.89
wavfile.write('data/narration.wav', SR, (y * 32767).astype(np.int16))
json.dump(dict(duration=round(len(y) / SR, 3), voice='elevenlabs-take1', lines=lines), open('data/lines.json', 'w'), indent=1)
json.dump(words, open('data/words.json', 'w'), indent=0)
open('data/words.txt', 'w').write('\n'.join(f"{w['s']:7.2f} {w['e']:7.2f}  L{w['line']}  {w['w']}" for w in words))
print('duration', round(len(y) / SR, 2)); [print(l['i'], l['start'], l['end'], l['text'][:40]) for l in lines]
