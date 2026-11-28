"""CI build: real ElevenLabs voice -> render -> out/<id>/{reel.mp4, cover.jpg, sheet.jpg, info.json}.
env: ELEVENLABS_API_KEY. Optional script.json "tempo" (e.g. 1.15) speeds the narration (timings rescaled)."""
import json, shutil, subprocess, sys
from pathlib import Path
from common import prepare, run, episode, ROOT
ep = sys.argv[1]; pid, series, sc, meta, date = episode(ep)
if sc.get('prebuilt'):   # finished reel made in a Claude chat: just package it
    src = Path(ep).resolve() / 'reel.mp4'; out = ROOT / 'out' / pid; out.mkdir(parents=True, exist_ok=True)
    shutil.copy(src, out / 'reel.mp4')
    run(['ffmpeg', '-v', 'error', '-y', '-ss', str(meta.get('cover_t', 0.0)), '-i', src, '-frames:v', '1', '-q:v', '2', out / 'cover.jpg'])
    run(['ffmpeg', '-v', 'error', '-y', '-i', src, '-vf', 'fps=1/3,scale=270:-1,tile=6x3', '-frames:v', '1', out / 'sheet.jpg'])
    dur = float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', src], capture_output=True, text=True).stdout)
    (out / 'info.json').write_text(json.dumps({'id': pid, 'series': series, 'duration': round(dur, 2)})); print('prebuilt', pid, dur); sys.exit(0)
b = prepare(ep, ROOT / 'build' / pid); S = json.loads((b / 'script.json').read_text())
run([sys.executable, 'pipeline/voice.py', '.'], cwd=b)
k = float(S.get('tempo', 1.0))
if abs(k - 1) > 0.01:
    d = b / 'data'
    run(['ffmpeg', '-v', 'error', '-y', '-i', d / 'narration.wav', '-af', f'atempo={k}', '-ar', '44100', d / 'n2.wav']); (d / 'n2.wav').replace(d / 'narration.wav')
    L = json.loads((d / 'lines.json').read_text()); W = json.loads((d / 'words.json').read_text())
    for l in L['lines']: l['start'] = round(l['start'] / k, 3); l['end'] = round(l['end'] / k, 3)
    for w in W: w['s'] = round(w['s'] / k, 3); w['e'] = round(w['e'] / k, 3)
    L['duration'] = round(L['duration'] / k, 2); (d / 'lines.json').write_text(json.dumps(L)); (d / 'words.json').write_text(json.dumps(W))
run(['node', 'tools/capture.mjs', 'check'], cwd=b)
run(['node', 'tools/capture.mjs', 'cues'], cwd=b)
run([sys.executable, 'tools/mix.py', '.'], cwd=b)
run(['node', 'tools/capture.mjs', 'video', 'renders/reel.mp4'], cwd=b)
run(['node', 'tools/capture.mjs', 'sheet', 'review/all.jpg', '2', '8'], cwd=b)
run(['node', 'tools/capture.mjs', 'frames', 'review/cover', str(meta.get('cover_t', 0.6))], cwd=b)
out = ROOT / 'out' / pid; out.mkdir(parents=True, exist_ok=True)
shutil.copy(b / 'renders/reel.mp4', out / 'reel.mp4'); shutil.copy(b / 'review/all.jpg', out / 'sheet.jpg')
shutil.copy(next((b / 'review/cover').glob('*.jpg')), out / 'cover.jpg')
lufs = subprocess.run(['ffmpeg', '-hide_banner', '-i', out / 'reel.mp4', '-af', 'ebur128', '-f', 'null', '-'], capture_output=True, text=True).stderr
dur = json.loads((b / 'data/lines.json').read_text())['duration']
info = {'id': pid, 'series': series, 'duration': dur, 'lufs': next((l.split('I:')[1].strip() for l in lufs.splitlines()[::-1] if ' I:' in l), '?')}
(out / 'info.json').write_text(json.dumps(info)); print(json.dumps(info))
