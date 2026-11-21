"""Check script.json before it is pushed: schema, rules, then a real boot of the renderer on estimated timing.
python3 pipeline/validate.py   -> prints OK or the list of problems (exit 1)"""
import json, re, subprocess, sys
from pathlib import Path
P = Path('.'); S = json.loads((P / 'script.json').read_text()); led = json.loads((P / 'state/ledger.json').read_text())
SCENES = {'bedroom', 'library', 'home', 'classroom', 'chat', 'comment', 'paper', 'notice', 'bar', 'alarm', 'zeta', 'devil_angel', 'big_text', 'ab',
          'hook_battery', 'hook_crack', 'hook_vote', 'hook_notifs', 'hook_stamp', 'hook_timer', 'hook_zoom', 'hook_graph'}
SPK = {'N', 'chhotu', 'mishti', 'mummy', 'papa'}; err = []
L = S.get('lines', [])
if not isinstance(S.get('day'), int): err.append('day must be an integer')
if not 10 <= len(L) <= 22: err.append(f'{len(L)} lines: need 10-22')
words = sum(len(l.get('text', '').split()) for l in L)
if not 120 <= words <= 230: err.append(f'{words} spoken words: aim 150-200 (about 60-80 s)')
for i, l in enumerate(L):
    if l.get('speaker') not in SPK: err.append(f'line {i}: speaker must be one of {sorted(SPK)}')
    if re.search(r'\d', l.get('text', '')): err.append(f'line {i}: spell numbers as words in "text" (digits only allowed in caps/scene)')
    t = (l.get('scene') or {}).get('type')
    if t not in SCENES: err.append(f'line {i}: unknown scene type {t!r}')
    if i and t and t.startswith('hook_'): err.append(f'line {i}: hook_* scenes only on line 0')
    if l.get('caps'):
        n1 = len(l['text'].split()); n2 = len(l['caps'].replace('|', ' ').split())
        if n1 != n2: err.append(f'line {i}: caps has {n2} words, text has {n1}')
if L and not str((L[0].get('scene') or {}).get('type', '')).startswith('hook_'): err.append('line 0 must use a hook_* scene')
if L and (L[-1].get('scene') or {}).get('type') != 'ab': err.append('last line must be the ab scene')
if L and not re.search(r'\bA\b', L[-1].get('text', '')) or L and not re.search(r'\bB\b', L[-1].get('text', '')): err.append('last line must say the words "A" and "B" (as standalone words)')
ch = S.get('choice') or {}
for k in ('question', 'a', 'b', 'correct'):
    if not ch.get(k): err.append(f'choice.{k} missing')
cap = S.get('captions') or {}
for k in ('instagram', 'yt_title', 'yt_desc', 'pinned'):
    if not cap.get(k): err.append(f'captions.{k} missing')
if '%23' in json.dumps(cap): err.append('captions: use a plain # for hashtags')
if not any((l.get('scene') or {}).get('type') == 'zeta' or 'zeta' in l.get('text', '').lower() for l in L): err.append('no Zeta Galaxy placement (a zeta scene or a line that mentions Zeta)')
recent = [e.get('hook') for e in [e for e in led.get('episodes', []) if e.get('day') != S.get('day')][-4:] if e.get('hook')]
hk = (L[0].get('scene') or {}).get('type') if L else None
if hk in recent: err.append(f'hook {hk} was used in the last 4 episodes {recent}: pick a different hook_* type')
v = S.get('vote') or {}
if not any(l.get('alt') for l in L[:7]):
    err.append('every episode needs the wrong-option what-if: after the vote, add 2-3 "alt": true lines (5-7 s) showing the funny wrong path, then the real path')
if not S.get('story_note'): err.append('story_note missing')
if err: print('PROBLEMS:\n- ' + '\n- '.join(err)); sys.exit(1)
subprocess.run([sys.executable, 'pipeline/estimate.py', '.'], check=True, capture_output=True)
r = subprocess.run(['node', 'tools/capture.mjs', 'check'], capture_output=True, text=True)
if 'CHECK OK' not in r.stdout: print('RENDER BOOT FAILED:\n' + (r.stdout + r.stderr)[-1500:]); sys.exit(1)
print(f'OK · {len(L)} lines · {words} words · hook {hk}')
