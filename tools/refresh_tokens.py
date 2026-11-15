"""CI weekly: refresh the 60-day Instagram tokens and store them back as repo secrets. env: IG_* secrets, GH_TOKEN (PAT with secrets write)"""
import json, os, subprocess, urllib.request
from common import CFG
for acc in CFG['accounts'].values():
    p = acc['secret_prefix']; tok = os.environ.get(p + '_TOKEN')
    if not tok: print('skip', p); continue
    r = json.loads(urllib.request.urlopen(f'https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token={tok}', timeout=60).read())
    subprocess.run(['gh', 'secret', 'set', p + '_TOKEN', '-R', os.environ['GITHUB_REPOSITORY'], '--body', r['access_token']], check=True)
    print('refreshed', p, 'expires in', r.get('expires_in'))
