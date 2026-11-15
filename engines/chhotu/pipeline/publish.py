"""After build.sh: put the reel on a GitHub Release (public link), hand it to Zapier, record the episode in state/ledger.json.
env: GH_TOKEN (Actions token) · GITHUB_REPOSITORY · ZAPIER_HOOK_URL"""
import json, os, subprocess, urllib.request
from pathlib import Path
S = json.loads(Path('script.json').read_text()); day = S['day']; repo = os.environ['GITHUB_REPOSITORY']; tag = f'day-{day}'
mp4, cover = f'renders/chhotu_day{day}.mp4', 'renders/cover.jpg'
cap = S['captions']; Path('renders/captions.txt').write_text(
    f"INSTAGRAM\n{cap['instagram']}\n\nYOUTUBE TITLE\n{cap['yt_title']}\n\nYOUTUBE DESCRIPTION\n{cap['yt_desc']}\n\nPINNED COMMENT\n{cap['pinned']}\n")
files = [mp4, cover, 'renders/captions.txt'] + (['renders/safe_sheet.jpg'] if Path('renders/safe_sheet.jpg').exists() else [])
subprocess.run(['gh', 'release', 'delete', tag, '-y', '--cleanup-tag', '-R', repo], capture_output=True)
subprocess.run(['gh', 'release', 'create', tag, *files, '-R', repo, '-t', S['title'], '-n', cap['instagram']], check=True)
base = f'https://github.com/{repo}/releases/download/{tag}'
payload = {'day': day, 'title': S['title'], 'video_url': f'{base}/chhotu_day{day}.mp4', 'cover_url': f'{base}/cover.jpg',
           'safe_sheet_url': f'{base}/safe_sheet.jpg', 'ig_caption': cap['instagram'], 'yt_title': cap['yt_title'][:100], 'yt_description': cap['yt_desc'],
           'pinned_comment': cap['pinned'], 'question': S['choice']['question'], 'release_page': f'https://github.com/{repo}/releases/tag/{tag}'}
hook = os.environ.get('ZAPIER_HOOK_URL')
if hook:
    req = urllib.request.Request(hook, data=json.dumps(payload).encode(), headers={'Content-Type': 'application/json'})
    print('zapier:', urllib.request.urlopen(req, timeout=60).status)
else: print('ZAPIER_HOOK_URL not set: skipped hand-off')
led = json.loads(Path('state/ledger.json').read_text()); ch = S['choice']
led['episodes'] = [e for e in led['episodes'] if e.get('day') != day] + [{
    'day': day, 'hook': S['lines'][0]['scene']['type'], 'question': ch['question'], 'options': {'A': ch['a'], 'B': ch['b']}, 'correct': ch['correct'],
    'keywords': ch.get('keywords'), 'vote_in': S.get('vote'), 'zeta': S.get('zeta_placement'), 'video_url': payload['video_url']}]
led.setdefault('story', []).append(S['story_note'])
Path('state/ledger.json').write_text(json.dumps(led, indent=1, ensure_ascii=False))
Path(f'state/scripts').mkdir(exist_ok=True); Path(f'state/scripts/day{day}.json').write_text(json.dumps(S, indent=1, ensure_ascii=False))
print(json.dumps(payload, indent=1, ensure_ascii=False))
