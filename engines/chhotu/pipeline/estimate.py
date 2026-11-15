"""Rough timing from text only (no voice): data/lines.json + data/words.json. Used by validate.py so a script can be test-booted before any voice exists."""
import json, re, sys
from pathlib import Path
P = Path(sys.argv[1] if len(sys.argv) > 1 else '.'); S = json.loads((P / 'script.json').read_text())
t = 0.05; lines = []; words = []
for i, ln in enumerate(S['lines']):
    st = t
    for w in ln['text'].split():
        d = 0.12 + 0.055 * len(re.sub(r'[^A-Za-z0-9]', '', w)); words.append(dict(w=w, line=i, s=round(t, 3), e=round(t + d, 3))); t += d + (0.18 if re.search(r'[.,!?…]$', w) else 0.03)
    lines.append(dict(i=i, text=ln['text'], start=round(st, 3), end=round(t, 3))); t += 0.3
(P / 'data').mkdir(exist_ok=True)
(P / 'data/lines.json').write_text(json.dumps(dict(duration=round(t + S.get('outro', 2.4), 2), voice='estimate', lines=lines), indent=1))
(P / 'data/words.json').write_text(json.dumps(words))
print(f'estimated {t:.1f} s')
