"""Split a multi-speaker voiceover into script lines without ASR.
Pauses (silence runs) are candidate cuts; dynamic programming picks len(lines)-1 of them so segment lengths match the
expected line lengths (scratch-voice timing) and each segment's pitch matches its speaker. Prints a report + JSON."""
import json, subprocess, sys, numpy as np
SR = 16000
def load(f):
    out = subprocess.run(['ffmpeg', '-v', 'error', '-i', f, '-f', 'f32le', '-ac', '1', '-ar', str(SR), '-'], capture_output=True, check=True).stdout
    return np.frombuffer(out, np.float32).astype(np.float64)
def pauses(x, thr_db=-35, min_len=0.12):
    hop = 160; n = len(x) // hop; r = np.sqrt(np.mean(x[:n*hop].reshape(n, hop)**2, 1) + 1e-12); db = 20*np.log10(r/r.max())
    q = db < thr_db; runs = []; st = None
    for i, v in enumerate(q):
        if v and st is None: st = i
        if (not v or i == n-1) and st is not None:
            if (i-st)*0.01 >= min_len: runs.append((st*0.01, i*0.01))
            st = None
    return runs
def f0_track(x):
    fr = 640; hop = 160; out = []
    for i in range(0, len(x)-fr, hop):
        s = x[i:i+fr]; e = np.sum(s*s)
        if e < 1e-4: out.append(0); continue
        s = s - s.mean(); ac = np.correlate(s, s, 'full')[fr-1:]; lo, hi = SR//450, SR//70
        k = lo + np.argmax(ac[lo:hi]); out.append(SR/k if ac[k] > 0.35*ac[0] else 0)
    return np.array(out)
def main(audio, script, scratch):
    x = load(audio); dur = len(x)/SR
    S = json.load(open(script)); lines = S['lines']; n = len(lines)
    exp = np.array([l['end']-l['start'] for l in json.load(open(scratch))['lines']])
    idx = np.where(np.abs(x) > 0.02*np.abs(x).max())[0]; t0, t1 = idx[0]/SR, idx[-1]/SR
    P = [p for p in pauses(x) if p[0] > t0+0.3 and p[1] < t1-0.3]
    cuts = [(p[0]+p[1])/2 for p in P]; plen = [p[1]-p[0] for p in P]
    f0 = f0_track(x)
    def seg_f0(a, b):
        v = f0[int(a*100):int(b*100)]; v = v[v > 0]; return float(np.median(v)) if len(v) > 5 else 0
    spk = [l.get('speaker', 'N') for l in lines]
    k = (t1-t0)/exp.sum(); E = exp*k
    m = len(cuts); INF = 1e18
    pts = [t0] + cuts + [t1]; L = [0] + plen + [0]
    # dp[i][j]: line i ends at point j
    dp = np.full((n, m+2), INF); bk = np.zeros((n, m+2), int)
    for j in range(1, m+2):
        d = pts[j]-pts[0]; dp[0][j] = ((d-E[0])/max(E[0], .6))**2 - 2.5*L[j]
    for i in range(1, n):
        for j in range(i+1, m+2):
            if i == n-1 and j != m+1: continue
            best = INF; bj = 0
            for p in range(i, j):
                if dp[i-1][p] >= INF: continue
                d = pts[j]-pts[p]
                c = dp[i-1][p] + ((d-E[i])/max(E[i], .6))**2 - (2.5*L[j] if j <= m else 0)
                if c < best: best, bj = c, p
            dp[i][j] = best; bk[i][j] = bj
    j = m+1; ends = []
    for i in range(n-1, -1, -1): ends.append(j); j = bk[i][j]
    ends = ends[::-1]; starts = [0] + ends[:-1]
    segs = [(pts[s] if s == 0 else P[s-1][1], pts[e] if e == m+1 else P[e-1][0]) for s, e in zip(starts, ends)]
    rep = []
    for i, (a, b) in enumerate(segs): rep.append(dict(i=i, spk=spk[i], start=round(a, 3), end=round(b, 3), dur=round(b-a, 2), exp=round(E[i], 2), f0=round(seg_f0(a, b))))
    return dict(cost=float(dp[n-1][m+1]), dur=dur, segs=rep)
if __name__ == '__main__':
    r = main(sys.argv[1], 'script.json', sys.argv[2]); print('cost', round(r['cost'], 2))
    for s in r['segs']: print(s['i'], s['spk'], s['start'], s['end'], s['dur'], 'exp', s['exp'], 'f0', s['f0'])
    json.dump(r, open(sys.argv[3], 'w'), indent=1)
