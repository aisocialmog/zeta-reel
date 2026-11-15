"""CI, every morning: count A/B votes on each series' latest published reel -> state/votes/<today IST>.json.
Rules: one vote per username (own account ignored); a comment counts if it is just A/B (emojis ok), starts with "A "/"B ",
says "option a/b", or contains one of that episode's keywords. Ties or < 5 votes -> majority = correct."""
import json, re, sys
from datetime import datetime, timedelta, timezone
from common import ROOT, CFG
import ig
today = (datetime.now(timezone.utc) + timedelta(hours=5, minutes=30)).date().isoformat()
res = {}
for series, sc in CFG['series'].items():
    led_p = ROOT / 'series' / series / 'published.json'
    pub = json.loads(led_p.read_text()) if led_p.exists() else []
    last = next((e for e in reversed(pub) if e.get('choice')), None)
    if not last:   # first run: reels were posted by hand -> newest post on the account whose caption matches this series
        try:
            tok, uid = ig.creds(sc['account']); media = ig.call('GET', f'{uid}/media', tok, fields='id,caption,permalink,timestamp,media_product_type', limit=15).get('data', [])
            m = next((m for m in media if re.search(sc.get('caption_match', '.'), m.get('caption') or '', re.I)), None)
        except (SystemExit, KeyError) as e: m = None; res[series] = {'error': str(e)}
        if not m: res.setdefault(series, {'note': 'no reel found to count'}); continue
        last = {'id': 'manual post', 'media_id': m['id'], 'permalink': m.get('permalink'), 'choice': {'correct': 'A', 'keywords': {}}}
    ch = last['choice']; own = CFG['accounts'][sc['account']]['handle'].lower()
    try: cs = ig.comments(sc['account'], last['media_id'])
    except SystemExit as e: res[series] = {'error': str(e), 'from': last['id']}; continue
    kw = {k: [w.lower() for w in v] for k, v in (ch.get('keywords') or {}).items()}
    votes = {}
    for c in cs:
        u = (c.get('username') or '').lower(); t = (c.get('text') or '').strip().lower()
        if not u or u == own or u in votes: continue
        bare = re.sub(r'[^a-z0-9 ]', ' ', t).split()
        v = None
        if bare[:1] in (['a'], ['b']): v = bare[0].upper()
        elif re.search(r'option\s*([ab])\b', t): v = re.search(r'option\s*([ab])\b', t).group(1).upper()
        else:
            for k in ('A', 'B'):
                if any(re.search(r'\b' + re.escape(w) + r'\b', t) for w in kw.get(k, []) if len(w) > 1): v = k; break
        if v: votes[u] = v
    a = sum(1 for v in votes.values() if v == 'A'); b = sum(1 for v in votes.values() if v == 'B'); n = a + b
    corr = ch.get('correct', 'A'); win = corr if n < 5 or a == b else ('A' if a > b else 'B')
    top = sorted([c for c in cs if len((c.get('text') or '').split()) >= 3], key=lambda c: -(c.get('like_count') or 0))[:3]
    res[series] = {'from': last['id'], 'permalink': last.get('permalink'), 'A': a, 'B': b, 'total': n, 'a_share': round(a / n, 2) if n else None,
                   'winner': win, 'correct': corr, 'majority_correct': win == corr, 'comments_total': len(cs),
                   'top_comments': [{'user': c.get('username'), 'text': c.get('text'), 'likes': c.get('like_count')} for c in top]}
out = ROOT / 'state' / 'votes' / f'{today}.json'; out.write_text(json.dumps(res, indent=1, ensure_ascii=False)); print(out.read_text())
