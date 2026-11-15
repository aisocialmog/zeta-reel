"""ElevenLabs voice for script.json -> data/narration.wav + data/lines.json + data/words.json (exact word timings, no ASR).
One API call per line (text-to-speech/with-timestamps), trimmed to the spoken part, joined with a fixed gap.
env: ELEVEN_API_KEY (required) · ELEVEN_MODEL (default eleven_v3; falls back to eleven_multilingual_v2)"""
import base64, json, os, re, subprocess, sys, time, urllib.request, urllib.error
import numpy as np
from pathlib import Path
from scipy.io import wavfile

P = Path(sys.argv[1] if len(sys.argv) > 1 else '.'); S = json.loads((P / 'script.json').read_text())
KEY = os.environ.get('ELEVEN_API_KEY') or os.environ['ELEVENLABS_API_KEY']; SR = 44100; GAP = 0.24; LEAD = 0.04
VOICES = {'N': 'FZkK3TvQ0pjyDmT8fzIW', 'narrator': 'FZkK3TvQ0pjyDmT8fzIW', 'mummy': 'Rg5w9usCZCJdEdW501zk', 'papa': 'efGTHf4ukBiG4n8lptfp',
          'mishti': 'Pbk8E6dlpCANrnpOLIns', 'chhotu': '4iqKdEXMW8NRF8USiS3Q'}   # kids keep kid voices (Mishi / Bittu)
MODELS = [os.environ.get('ELEVEN_MODEL') or 'eleven_v4', 'eleven_v3', 'eleven_multilingual_v2']

def tts(text, voice):
    last = None
    for model in MODELS:
        body = {'text': text, 'model_id': model, 'language_code': 'hi', 'voice_settings': {'stability': 0.35, 'similarity_boost': 0.85}}
        if model == 'eleven_v3': body['voice_settings']['stability'] = 0.5   # v3 accepts 0.0 / 0.5 / 1.0 only
        for attempt in range(3):
            req = urllib.request.Request(f'https://api.elevenlabs.io/v1/text-to-speech/{voice}/with-timestamps?output_format=mp3_44100_128',
                                         data=json.dumps(body).encode(), headers={'xi-api-key': KEY, 'Content-Type': 'application/json'})
            try:
                with urllib.request.urlopen(req, timeout=120) as r: return json.loads(r.read())
            except urllib.error.HTTPError as e:
                last = f'{model}: {e.code} {e.read()[:300]!r}'
                if e.code in (400, 422): break          # model/param not accepted -> next model
                time.sleep(4 * (attempt + 1))
            except Exception as e: last = str(e); time.sleep(4)
    raise SystemExit('ElevenLabs failed: ' + str(last))

def decode(b64):
    mp3 = base64.b64decode(b64)
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', 'pipe:0', '-f', 'f32le', '-ac', '1', '-ar', str(SR), '-'], input=mp3, capture_output=True, check=True).stdout
    return np.frombuffer(raw, np.float32).astype(np.float64)

def words_from(al):
    ch, st, en = al['characters'], al['character_start_times_seconds'], al['character_end_times_seconds']; out, cur = [], None
    for c, s, e in zip(ch, st, en):
        if c.isspace():
            if cur: out.append(cur); cur = None
        else:
            if cur is None: cur = [c, s, e]
            else: cur[0] += c; cur[2] = e
    if cur: out.append(cur)
    return [w for w in out if not re.fullmatch(r'\[[^\]]*\]', w[0])]   # drop v3 audio tags like [laughs]

out = [np.zeros(int(LEAD * SR))]; t = LEAD; lines, words = [], []
VOICES.update(S.get('voices', {}))
for i, ln in enumerate(S['lines']):
    spk = (ln.get('speaker') or 'N').lower(); voice = VOICES.get(spk, VOICES['N'])
    say = ln.get('say') or ln['text']; r = tts(say, voice); x = decode(r['audio_base64'])
    al = r.get('alignment') or r.get('normalized_alignment'); ws = words_from(al)
    a = max(0.0, (ws[0][1] if ws else 0) - 0.05); b = min(len(x) / SR, (ws[-1][2] if ws else len(x) / SR) + 0.14)
    seg = x[int(a * SR):int(b * SR)].copy(); n = int(0.006 * SR); seg[:n] *= np.linspace(0, 1, n); seg[-n:] *= np.linspace(1, 0, n)
    st = t; out.append(seg)
    tw = ln['text'].split()
    if len(tw) == len(ws): spans = [(w[1], w[2]) for w in ws]
    else:   # text and spoken words differ (say != text): map by relative position
        spans = []
        for k in range(len(tw)):
            j = min(len(ws) - 1, int(k * len(ws) / max(1, len(tw)))); spans.append((ws[j][1], ws[j][2]))
    for w, (s0, e0) in zip(tw, spans): words.append(dict(w=w, line=i, s=round(st + s0 - a, 3), e=round(st + e0 - a, 3)))
    t += len(seg) / SR; lines.append(dict(i=i, text=ln['text'], start=round(st + 0.04, 3), end=round(t - 0.08, 3)))
    if i < len(S['lines']) - 1: out.append(np.zeros(int(GAP * SR))); t += GAP
    print(f'line {i} {spk}: {len(seg) / SR:.2f}s', flush=True)
outro = S.get('outro', 2.4); out.append(np.zeros(int(outro * SR))); y = np.concatenate(out)
(P / 'data').mkdir(exist_ok=True)
wavfile.write(P / 'data/narration.wav', SR, (np.clip(y, -1, 1) * 32767).astype(np.int16))
(P / 'data/lines.json').write_text(json.dumps(dict(duration=round(len(y) / SR, 2), voice='elevenlabs-api', lines=lines), indent=1))
(P / 'data/words.json').write_text(json.dumps(words))
print(f'narration {len(y) / SR:.1f} s')
