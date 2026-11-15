"""CI: put a built reel on a public GitHub Release and hand it to Zapier for approval.
env: GH_TOKEN, GITHUB_REPOSITORY, ZAPIER_HOOK_URL"""
import json, os, subprocess, sys, urllib.request
from common import episode, ROOT, CFG
ep = sys.argv[1]; pid, series, sc, meta, date = episode(ep); repo = os.environ['GITHUB_REPOSITORY']; out = ROOT / 'out' / pid
info = json.loads((out / 'info.json').read_text())
subprocess.run(['gh', 'release', 'delete', pid, '-y', '--cleanup-tag', '-R', repo], capture_output=True)
subprocess.run(['gh', 'release', 'create', pid, out / 'reel.mp4', out / 'cover.jpg', out / 'sheet.jpg', '-R', repo, '--latest=false',
                '-t', meta.get('title', pid), '-n', meta['caption']], check=True)
base = f'https://github.com/{repo}/releases/download/{pid}'
acct = CFG['accounts'][sc['account']]
payload = {'id': pid, 'series': sc['title'], 'account': '@' + acct['handle'], 'type': 'TRIAL reel' if sc.get('trial') else 'normal reel',
           'post_at': f"{date}T{sc['post_time']}:00+05:30", 'title': meta.get('title', pid), 'duration_s': info['duration'],
           'video_url': f'{base}/reel.mp4', 'cover_url': f'{base}/cover.jpg', 'sheet_url': f'{base}/sheet.jpg',
           'caption': meta['caption'], 'first_comment': meta.get('first_comment', ''), 'notes_for_you': meta.get('notes_for_you', ''),
           'release_page': f'https://github.com/{repo}/releases/tag/{pid}'}
hook = os.environ.get('ZAPIER_HOOK_URL')
if hook:
    r = urllib.request.urlopen(urllib.request.Request(hook, data=json.dumps(payload).encode(), headers={'Content-Type': 'application/json'}), timeout=60)
    print('zapier', r.status)
else: print('ZAPIER_HOOK_URL not set; skipped')
print(json.dumps(payload, indent=1, ensure_ascii=False))
