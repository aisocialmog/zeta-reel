"""Instagram Graph API (Instagram API with Instagram Login). Tokens/user ids come from env:
<PREFIX>_TOKEN and <PREFIX>_USER_ID, PREFIX from config.json accounts (IG_MAIN, IG_NOTES)."""
import json, os, time, urllib.parse, urllib.request, urllib.error
from common import CFG
BASE = os.environ.get('IG_GRAPH_BASE') or CFG['graph_base']

def creds(account):
    p = CFG['accounts'][account]['secret_prefix']
    return os.environ[p + '_TOKEN'], os.environ[p + '_USER_ID']

def call(method, path, token, **params):
    params['access_token'] = token
    url = f'{BASE}/{path}'; data = None
    if method == 'GET': url += '?' + urllib.parse.urlencode(params)
    else: data = urllib.parse.urlencode(params).encode()
    req = urllib.request.Request(url, data=data, method=method)
    try:
        with urllib.request.urlopen(req, timeout=120) as r: return json.loads(r.read())
    except urllib.error.HTTPError as e:
        raise SystemExit(f'Instagram API {method} {path}: {e.code} {e.read()[:500]!r}')

def pages(path, token, **params):
    out = []; r = call('GET', path, token, **params)
    while True:
        out += r.get('data', []); nxt = r.get('paging', {}).get('next')
        if not nxt: return out
        with urllib.request.urlopen(nxt, timeout=120) as f: r = json.loads(f.read())

def publish_reel(account, video_url, caption, trial=None, cover_url=None):
    token, uid = creds(account)
    p = dict(media_type='REELS', video_url=video_url, caption=caption, share_to_feed='true')
    if cover_url: p['cover_url'] = cover_url
    if trial: p['trial_params'] = json.dumps({'graduation_strategy': trial})
    c = call('POST', f'{uid}/media', token, **p)['id']
    for _ in range(60):                                     # wait for Instagram to process the video (up to ~10 min)
        st = call('GET', c, token, fields='status_code,status')
        if st.get('status_code') == 'FINISHED': break
        if st.get('status_code') in ('ERROR', 'EXPIRED'): raise SystemExit(f'container {c} failed: {st}')
        time.sleep(10)
    else: raise SystemExit('video processing timed out')
    mid = call('POST', f'{uid}/media_publish', token, creation_id=c)['id']
    info = call('GET', mid, token, fields='permalink,timestamp')
    return mid, info.get('permalink')

def comment(account, media_id, text):
    token, _ = creds(account); return call('POST', f'{media_id}/comments', token, message=text)

def comments(account, media_id):
    token, _ = creds(account); return pages(f'{media_id}/comments', token, fields='id,text,username,like_count,timestamp', limit=50)
