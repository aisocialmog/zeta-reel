"""CI (after you approve in Zapier): publish one episode to Instagram and record it in the series ledger.
python3 tools/publish.py <id like 2026-11-17-chhotu>   env: IG_* secrets, GITHUB_REPOSITORY"""
import json, os, sys
from datetime import datetime, timezone
from common import ROOT, CFG, episode
import ig
pid = sys.argv[1]; date, series = pid[:10], pid[11:]
ep = ROOT / 'episodes' / date / series; _, _, sc, meta, _ = episode(ep)
led_p = ROOT / 'series' / series / 'published.json'; led = json.loads(led_p.read_text()) if led_p.exists() else []
if any(e['id'] == pid for e in led): sys.exit(f'{pid} already published')
base = f"https://github.com/{os.environ['GITHUB_REPOSITORY']}/releases/download/{pid}"
trial = sc.get('graduation', 'MANUAL') if sc.get('trial') else None
mid, link = ig.publish_reel(sc['account'], f'{base}/reel.mp4', meta['caption'], trial=trial, cover_url=f'{base}/cover.jpg')
if meta.get('first_comment'):
    try: ig.comment(sc['account'], mid, meta['first_comment'])
    except SystemExit as e: print('first comment failed:', e)
led.append({'id': pid, 'date': date, 'media_id': mid, 'permalink': link, 'trial': bool(trial), 'choice': meta.get('choice'),
            'published_at': datetime.now(timezone.utc).isoformat(timespec='seconds')})
led_p.write_text(json.dumps(led, indent=1, ensure_ascii=False)); print('published', pid, mid, link)
