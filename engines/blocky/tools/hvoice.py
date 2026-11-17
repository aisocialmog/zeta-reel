"""Hindi preview narration with Kokoro (each line's "say" in Devanagari) -> data/narration.wav, lines.json, words.json.
Caption words (Roman "text") are spread across each line by length, with pauses at commas/full stops."""
import json, os, re, sys
import numpy as np
from scipy.io import wavfile
from kokoro_onnx import Kokoro

P = sys.argv[1]
S = json.load(open(f'{P}/script.json'))
H = os.path.expanduser('~/.faceless-shorts/kokoro/')
k = Kokoro(H + 'kokoro-v1.0.onnx', H + 'voices-v1.0.bin')
SR = 24000
# speaker -> (Kokoro voice, pitch, speed): kids get a raised pitch so they never sound adult
CAST = {'n': ('hm_omega', 1.0, 1.05), 'narrator': ('hm_omega', 1.0, 1.05), 'chhotu': ('hm_psi', 1.28, 1.08), 'kabir': ('hm_psi', 1.22, 1.08), 'sharma': ('hm_omega', 1.3, 1.02),
        'mishti': ('hf_beta', 1.18, 1.08), 'mummy': ('hf_alpha', 1.0, 1.05), 'aunty': ('hf_alpha', 0.94, 1.0)}
CAST['N'] = CAST['n']
lead, gap0 = S.get('lead', 0.25), S.get('gap', 0.22)
buf = [np.zeros(int(lead * SR), np.float32)]; t = lead; lines = []; words = []
for i, ln in enumerate(S['lines']):
    spk = (ln.get('speaker') or 'N').lower(); vv, pitch, spd = CAST.get(spk, CAST['N'])
    a, sr = k.create(ln['say'], voice=vv, speed=spd, lang='hi'); a = a.astype(np.float32)
    if pitch != 1.0:
        import subprocess, tempfile
        with tempfile.TemporaryDirectory() as td:
            wavfile.write(f'{td}/i.wav', SR, a); subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', f'{td}/i.wav', '-af', f'rubberband=pitch={pitch}:formant=shifted', f'{td}/o.wav'], check=True)
            a = wavfile.read(f'{td}/o.wav')[1].astype(np.float32)
    nz = np.where(np.abs(a) > 0.01)[0]; a = a[max(0, nz[0] - 600): nz[-1] + 1200] if len(nz) else a
    d = len(a) / SR; lines.append({'i': i, 'text': ln['text'], 'start': round(t, 3), 'end': round(t + d, 3)})
    ws = ln['text'].split(); wt = [len(re.sub(r'\W', '', w)) + 2 + (4 if re.search(r'[,.!?]$', w) else 0) for w in ws]
    tot = sum(wt); c = t
    for w, x in zip(ws, wt):
        dd = d * x / tot; words.append({'w': w, 'line': i, 's': round(c, 3), 'e': round(c + dd * 0.85, 3)}); c += dd
    g = ln.get('gap', gap0); buf += [a, np.zeros(int(g * SR), np.float32)]; t += d + g
dur = t + S.get('outro', 1.2); buf.append(np.zeros(int(S.get('outro', 1.2) * SR), np.float32))
y = np.concatenate(buf); y = y / max(1e-6, np.abs(y).max()) * 0.9
os.makedirs(f'{P}/data', exist_ok=True)
wavfile.write(f'{P}/data/narration.wav', SR, (y * 32767).astype(np.int16))
json.dump({'duration': round(dur, 3), 'lines': lines}, open(f'{P}/data/lines.json', 'w'), indent=1, ensure_ascii=False)
json.dump(words, open(f'{P}/data/words.json', 'w'), indent=0, ensure_ascii=False)
print(f'{dur:.2f} s'); [print(l['i'], l['start'], l['end'], l['text']) for l in lines]
