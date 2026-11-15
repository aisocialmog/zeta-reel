"""Survival Cutaway soundtrack (from Inside Out's, + boom rustle cash riser): narration + soft procedural sound effects + a quiet music bed, all made here with numpy.
No samples, no AI audio, no downloads.

  python3 tools/mix.py [project=.]          → data/mix.wav (48 kHz stereo)

Reads data/cues.json (node tools/capture.mjs cues), data/narration.wav if it exists (voice.py or words.py --audio),
and script.json "music": "bed" (the procedural score, default) · "none" · "audio/your-track.mp3" (your own royalty-free
track, any format ffmpeg reads). The music ducks under the voice.

Sound rules (STYLE.md): every effect is soft and rounded, nothing above ~5 kHz, no ticks / hats / glitches / beeps.
Cue types: boom rustle cash riser whoosh slide pop plop gulp boing bubbles sizzle sparkle thud slam tock zip alarm  (+ gain, dur)
"""
import json, subprocess, sys
from pathlib import Path
import numpy as np
from scipy import signal
from scipy.io import wavfile

P = Path(sys.argv[1] if len(sys.argv) > 1 else '.')
SR = 48000
rng = np.random.default_rng(11)
cj = json.loads((P / 'data/cues.json').read_text())
script = json.loads((P / 'script.json').read_text())
DUR = float(cj['duration'])
N = int(DUR * SR) + SR // 10


def lp(x, f, o=2): b, a = signal.butter(o, min(f, SR / 2 - 100) / (SR / 2), 'low'); return signal.lfilter(b, a, x)
def hp(x, f, o=2): b, a = signal.butter(o, f / (SR / 2), 'high'); return signal.lfilter(b, a, x)
def bp(x, f0, f1, o=2): b, a = signal.butter(o, [f0 / (SR / 2), f1 / (SR / 2)], 'band'); return signal.lfilter(b, a, x)
def db(x): return 10 ** (x / 20)
def tt(d): return np.arange(int(d * SR)) / SR
def env(n, a=0.005, r=None):
    """attack a seconds then exponential release over the rest"""
    e = np.ones(n); na = max(1, int(a * SR)); e[:na] = np.linspace(0, 1, na)
    rest = n - na; e[na:] = np.exp(-np.linspace(0, r or 5, rest)) if rest > 0 else 1; return e
def sweep(f0, f1, d, shape='exp'):
    t = tt(d); f = f0 * (f1 / f0) ** (t / d) if shape == 'exp' else f0 + (f1 - f0) * t / d
    return np.sin(2 * np.pi * np.cumsum(f) / SR)
def noise(d): return rng.standard_normal(int(d * SR))


# ---------- the effects ----------
def whoosh(d=0.38, **_):
    n = noise(d); lo, hi = lp(n, 500), lp(n, 2200)
    k = np.sin(np.pi * np.linspace(0, 1, len(n))); x = (lo * (1 - k) + hi * k) * k ** 1.5
    return x / (np.abs(x).max() + 1e-9) * 0.5
def slide(d=1.0, **_):
    n = lp(noise(d), 700); e = np.sin(np.pi * np.linspace(0, 1, len(n))) ** 2
    return n / (np.abs(n).max() + 1e-9) * e * 0.35 + sweep(260, 120, d) * e * 0.08
def pop(**_): x = sweep(560, 240, 0.11) * env(int(0.11 * SR), 0.002, 6); return lp(x, 3000) * 0.7
def plop(**_): x = sweep(700, 180, 0.14) * env(int(0.14 * SR), 0.002, 5); return lp(x, 2500) * 0.6
def gulp(**_):
    a = sweep(320, 140, 0.16) * env(int(0.16 * SR), 0.01, 4); b = sweep(240, 90, 0.2) * env(int(0.2 * SR), 0.01, 4)
    x = np.concatenate([a, np.zeros(int(0.04 * SR)), b]); return lp(x, 1800) * 0.8
def boing(**_):
    d = 0.42; t = tt(d); f = 200 * (1 + 0.6 * t / d) * (1 + 0.08 * np.sin(2 * np.pi * 18 * t))
    return lp(np.sin(2 * np.pi * np.cumsum(f) / SR) * env(len(t), 0.004, 4), 2000) * 0.55
def bubbles(d=2.0, **_):
    x = np.zeros(int(d * SR))
    for _ in range(int(d * 7)):
        st = rng.integers(0, max(1, len(x) - int(0.08 * SR))); f = rng.uniform(380, 900); b = sweep(f, f * 1.6, 0.06) * env(int(0.06 * SR), 0.003, 5)
        x[st:st + len(b)] += b * rng.uniform(0.2, 0.5)
    return lp(x, 2500) * 0.5
def sizzle(d=1.0, **_):
    n = bp(noise(d), 1800, 4500); crack = (rng.random(len(n)) < 0.002).astype(float); crack = lp(crack, 300) * 40
    e = np.minimum(1, np.linspace(0, 6, len(n))) * np.linspace(1, 0.2, len(n)); return n * (0.4 + crack) * e * 0.12
def sparkle(d=1.2, **_):
    notes = [784, 880, 1047, 1175, 1319, 1568]; x = np.zeros(int(d * SR) + SR // 2)
    for k, f in enumerate(notes):
        st = int(k * d / len(notes) * SR); n = int(0.4 * SR); t = tt(0.4)
        x[st:st + n] += (np.sin(2 * np.pi * f * t) + 0.3 * np.sin(4 * np.pi * f * t)) * env(n, 0.004, 6) * 0.22
    return lp(x, 4500)
def thud(**_):
    d = 0.35; t = tt(d); x = np.sin(2 * np.pi * (70 + 40 * np.exp(-t * 30)) * t) * env(len(t), 0.002, 7)
    return x * 0.9 + lp(noise(d), 220) * env(len(t), 0.001, 12) * 0.3
def slam(**_):
    d = 0.5; t = tt(d); x = np.sin(2 * np.pi * (60 + 60 * np.exp(-t * 25)) * t) * env(len(t), 0.002, 6)
    return np.tanh(1.6 * (x + lp(noise(d), 1200) * env(len(t), 0.001, 10) * 0.6)) * 0.9
def tock(**_): d = 0.09; t = tt(d); return (np.sin(2 * np.pi * 420 * t) + 0.3 * np.sin(2 * np.pi * 840 * t)) * env(len(t), 0.001, 9) * 0.35
def zip_(**_):
    d = 0.32; n = bp(noise(d), 400, 3000); k = np.linspace(0, 1, len(n))
    return (n / (np.abs(n).max() + 1e-9) * 0.35 + sweep(300, 1100, d) * 0.12) * np.sin(np.pi * k) ** 1.2
def alarm(d=2.0, **_):
    x = np.zeros(int(d * SR)); one = np.sin(2 * np.pi * 150 * tt(0.22)) * env(int(0.22 * SR), 0.02, 5)
    for st in np.arange(0, d - 0.25, 0.5): i = int(st * SR); x[i:i + len(one)] += one
    return lp(x, 900) * 0.55

def inhale(d=1.0, **_):
    n = bp(noise(d), 300, 2600); k = np.linspace(0, 1, len(n)); e = np.sin(np.pi * np.minimum(1, k * 1.15)) ** 1.5 * (0.6 + 0.4 * k)
    return n / (np.abs(n).max() + 1e-9) * e * 0.5
def heartbeat(**_):
    one = lambda d, f: np.sin(2 * np.pi * f * tt(d)) * env(int(d * SR), 0.004, 7)
    x = np.concatenate([one(0.16, 58), np.zeros(int(0.09 * SR)), one(0.2, 52) * 0.75]); return lp(x, 300) * 1.0

def boom(**_):
    d = 1.4; t = tt(d); x = np.sin(2 * np.pi * (48 + 40 * np.exp(-t * 6)) * t) * env(len(t), 0.003, 2.2)
    return np.tanh(1.4 * (x + lp(noise(d), 300) * env(len(t), 0.002, 4) * 0.5))
def rustle(d=1.2, **_):
    n = bp(noise(d), 1200, 5000); k = np.linspace(0, 1, len(n)); e = (0.5 + 0.5 * np.sin(k * 40 + np.sin(k * 9) * 3)) * np.sin(np.pi * k)
    return n / (np.abs(n).max() + 1e-9) * e * 0.4
def cash(**_):
    a = np.sin(2 * np.pi * 1568 * tt(0.12)) * env(int(0.12 * SR), 0.001, 12); b = np.sin(2 * np.pi * 2093 * tt(0.3)) * env(int(0.3 * SR), 0.002, 7)
    return np.concatenate([a, b]) * 0.4
def riser(d=1.4, **_):
    n = bp(noise(d), 500, 4000); k = np.linspace(0, 1, len(n)); x = n / (np.abs(n).max() + 1e-9) * 0.3 + sweep(180, 720, d) * 0.25
    return x * k ** 2.2

FX = dict(boom=boom, rustle=rustle, cash=cash, riser=riser, inhale=inhale, heartbeat=heartbeat, whoosh=whoosh, slide=slide, pop=pop, plop=plop, gulp=gulp, boing=boing, bubbles=bubbles, sizzle=sizzle,
          sparkle=sparkle, thud=thud, slam=slam, tock=tock, zip=zip_, alarm=alarm)
LEVEL = dict(boom=-9, rustle=-19, cash=-17, riser=-16, inhale=-15, heartbeat=-8, whoosh=-17, slide=-19, pop=-14, plop=-15, gulp=-11, boing=-15, bubbles=-21, sizzle=-18, sparkle=-17,
             thud=-11, slam=-9, tock=-18, zip=-14, alarm=-17)

# ---------- Chhotu series additions ----------
def buzz(d=0.9, **_):
    t = tt(d); x = np.sign(np.sin(2 * np.pi * 150 * t)) * 0.5 + np.sin(2 * np.pi * 300 * t) * 0.3
    gate = ((t * 4) % 1 < 0.6).astype(float); return lp(x * gate, 1200) * env(len(t), 0.01, 1) * 0.8
def ding(**_):
    a = np.sin(2 * np.pi * 1318 * tt(0.5)) * env(int(0.5 * SR), 0.002, 6); b = np.sin(2 * np.pi * 1760 * tt(0.6)) * env(int(0.6 * SR), 0.002, 5)
    x = np.zeros(int(0.75 * SR)); x[:len(a)] += a; x[int(0.12 * SR):int(0.12 * SR) + len(b)] += b; return x * 0.5
def tick(**_):
    x = bp(noise(0.03), 2000, 6000) * env(int(0.03 * SR), 0.0005, 14); return x
def step(**_):
    x = lp(noise(0.12), 400) * env(int(0.12 * SR), 0.002, 9) + np.sin(2 * np.pi * 70 * tt(0.12)) * env(int(0.12 * SR), 0.002, 12) * 0.6; return x
def key(**_):
    x = bp(noise(0.035), 1500, 5000) * env(int(0.035 * SR), 0.0005, 10) + np.sin(2 * np.pi * (900 + 300 * rng.random()) * tt(0.035)) * env(int(0.035 * SR), 0.0005, 14) * 0.3; return x
def glass(**_):
    d = 1.0; n = hp(noise(d), 2500) * env(int(d * SR), 0.001, 7)
    for f in (2600, 3400, 4100, 5200): n += np.sin(2 * np.pi * f * tt(d)) * env(int(d * SR), 0.001, 5 + f / 1000) * 0.25 * rng.random()
    return n
def sadviolin(d=2.2, **_):
    out = np.zeros(int(d * SR)); notes = [(0.0, 659.3, 0.55), (0.55, 622.3, 0.55), (1.1, 587.3, 1.1)]
    for st, f, du in notes:
        t = tt(du); vib = 1 + 0.006 * np.sin(2 * np.pi * 5.5 * t); ph = 2 * np.pi * np.cumsum(f * vib) / SR
        x = sum(np.sin(k * ph) / k for k in range(1, 7)); e = np.minimum(1, t / 0.12) * np.exp(-t * 0.8); i = int(st * SR); out[i:i + len(x)] += (x * e)[:len(out) - i]
    return lp(out, 3500) * 0.5
def creak(d=1.1, **_):
    t = tt(d); f = 180 + 120 * np.sin(np.pi * t / d) + 30 * np.sin(2 * np.pi * 7 * t); ph = 2 * np.pi * np.cumsum(f) / SR
    x = np.sign(np.sin(ph)) * (0.5 + 0.5 * np.sin(2 * np.pi * 23 * t)); return bp(x, 300, 2500) * np.sin(np.pi * t / d) * 0.6
FX.update(buzz=buzz, ding=ding, tick=tick, step=step, key=key, glass=glass, sadviolin=sadviolin, creak=creak)
LEVEL.update(buzz=-13, ding=-14, tick=-20, step=-15, key=-21, glass=-12, sadviolin=-14, creak=-12)
def music_play():
    """sneaky comic pizzicato + soft bass, 108 BPM (desi-sitcom tension), for story episodes (script.json "music": "play")"""
    bpm = 108; beat = 60 / bpm; n = N; out = np.zeros(n)
    pat = [220, 0, 261.6, 0, 329.6, 311.1, 329.6, 0, 246.9, 0, 293.7, 0, 349.2, 329.6, 293.7, 0]
    def pluck(f, d=0.22):
        t = tt(d); return (np.sin(2 * np.pi * f * t) + 0.35 * np.sin(4 * np.pi * f * t)) * np.exp(-t * 18)
    def bass(f, d=0.5):
        t = tt(d); return np.sin(2 * np.pi * f * t) * np.exp(-t * 5)
    k = 0; tcur = 0.0
    while tcur < DUR:
        f = pat[k % len(pat)]; i = int(tcur * SR)
        if f: x = pluck(f); m = min(len(x), n - i); out[i:i + m] += x[:m] * 0.5
        if k % 4 == 0: x = bass(55 if (k // 16) % 2 == 0 else 49); m = min(len(x), n - i); out[i:i + m] += x[:m] * 0.6
        tcur += beat / 2; k += 1
    return lp(out, 2500) / (np.abs(out).max() + 1e-9)


# ---------- the music bed: soft pad + plucked arpeggio, 100 BPM, I–vi–IV–V ----------
def music_bed():
    bpm = 100; beat = 60 / bpm; bar = beat * 4
    chords = [[261.6, 329.6, 392.0], [220.0, 261.6, 329.6], [174.6, 220.0, 261.6], [196.0, 246.9, 293.7]]
    x = np.zeros(N)
    nb = int(np.ceil(DUR / bar)) + 1
    for b in range(nb):
        ch = chords[b % 4]; st = int(b * bar * SR); n = int(bar * SR)
        if st >= N: break
        t = tt(bar); e = np.minimum(1, t / 0.4) * np.minimum(1, (bar - t) / 0.4)
        pad = sum(np.sin(2 * np.pi * f / 2 * t) + 0.25 * np.sin(2 * np.pi * f * t) for f in ch) * e * 0.10
        x[st:st + n] += pad[:max(0, min(n, N - st))]
        for k in range(8):                                                       # eighth-note pluck arpeggio
            f = ch[[0, 1, 2, 1, 2, 0, 1, 2][k]] * (2 if k % 4 == 2 else 1); ps = st + int(k * beat / 2 * SR); pn = int(0.5 * SR)
            if ps + pn >= N: continue
            pt = tt(0.5); pl = (np.sin(2 * np.pi * f * pt) + 0.35 * np.sin(4 * np.pi * f * pt)) * env(pn, 0.003, 7) * 0.12
            x[ps:ps + pn] += pl
    x = lp(x, 3200)
    fade = np.ones(N); fo = int(1.2 * SR); fade[-fo:] = np.linspace(1, 0, fo)
    return x / (np.abs(x).max() + 1e-9) * fade

def music_tension():
    """low drone + slow minor pulse, for mysterious / tense explainers (script.json "music": "tension")"""
    t = np.arange(N) / SR; x = np.zeros(N)
    for f, g in [(55, 0.5), (82.4, 0.3), (110, 0.2), (130.8, 0.12)]: x += np.sin(2 * np.pi * f * t + np.sin(t * 0.3) * 0.5) * g
    x *= 0.55 + 0.45 * np.sin(2 * np.pi * t / 8) ** 2
    beat = 60 / 84; ping = lambda f: (np.sin(2 * np.pi * f * tt(1.2)) + 0.3 * np.sin(4 * np.pi * f * tt(1.2))) * env(int(1.2 * SR), 0.01, 5)
    seq = [220.0, 261.6, 196.0, 174.6]
    for k in range(int(DUR / (beat * 2))):
        i = int(k * beat * 2 * SR); pg = ping(seq[(k // 2) % 4]) * 0.35
        if i + len(pg) < N: x[i:i + len(pg)] += pg
    x = lp(x, 2200); fade = np.ones(N); fo = int(1.5 * SR); fade[-fo:] = np.linspace(1, 0, fo); fi = int(0.8 * SR); fade[:fi] *= np.linspace(0, 1, fi)
    return x / (np.abs(x).max() + 1e-9) * fade


def music_dread():
    """anxiety score: sub drone + detuned cluster swells + a clock tick that speeds up + heartbeat near the end; softens in 'calm' windows"""
    t = np.arange(N) / SR; x = np.zeros(N)
    for f, g in [(41.2, 0.55), (55.0, 0.35), (58.3, 0.18), (82.4, 0.15)]: x += np.sin(2 * np.pi * f * t + 0.7 * np.sin(t * 0.21 + f)) * g
    rum = lp(rng.standard_normal(N), 120) * 2.5; x += rum
    cl = sum(np.sin(2 * np.pi * f * t) for f in (466.2, 493.9, 523.3)) * (0.5 + 0.5 * np.sin(2 * np.pi * t / 7.3)) ** 3 * 0.12; x += lp(cl, 2500)
    calm = np.ones(N)
    for a, b in script.get('calm', []): i0, i1 = int(a * SR), int(b * SR); calm[i0:i1] = 0.25
    calm = signal.lfilter([1 - 0.9998], [1, -0.9998], calm)
    x *= (0.55 + 0.45 * np.clip(t / DUR, 0, 1)) * calm
    k = 0.0
    while k < DUR - 0.3:
        i = int(k * SR); c = tick(); m = min(len(c), N - i); x[i:i + m] += c[:m] * 0.5 * calm[i]
        k += 1.0 if k < DUR * 0.7 else max(0.45, 1.0 - (k - DUR * 0.7) / (DUR * 0.3) * 0.55)
    k = DUR * 0.72
    while k < DUR - 0.5:
        i = int(k * SR); h = heartbeat(); m = min(len(h), N - i); x[i:i + m] += h[:m] * 1.4
        k += max(0.55, 1.05 - (k - DUR * 0.72) / (DUR * 0.28) * 0.5)
    fade = np.ones(N); fi = int(0.4 * SR); fade[:fi] = np.linspace(0, 1, fi); fo = int(0.15 * SR); fade[-fo:] = np.linspace(1, 0, fo)
    return x / (np.abs(x).max() + 1e-9) * fade


def music_warm():
    """devotional warm bed: tanpura-like drone (Sa-Pa) + soft bell every 4 bars"""
    t = np.arange(N) / SR; x = np.zeros(N)
    for f, g in [(130.8, 0.5), (196.0, 0.3), (261.6, 0.22), (392.0, 0.08)]:
        x += np.sin(2 * np.pi * f * t + 0.3 * np.sin(2 * np.pi * 0.25 * t)) * g * (0.7 + 0.3 * np.sin(2 * np.pi * t / 3.1 + f))
    k = 0.0
    while k < DUR:
        i = int(k * SR); d = 2.5; tb = tt(d); b = (np.sin(2 * np.pi * 784 * tb) + 0.5 * np.sin(2 * np.pi * 1568 * tb + 0.3)) * np.exp(-tb * 1.6) * 0.35
        m = min(len(b), N - i); x[i:i + m] += b[:m]; k += 9.6
    x = lp(x, 2600); fade = np.ones(N); fi = int(0.8 * SR); fade[:fi] = np.linspace(0, 1, fi); fo = int(1.2 * SR); fade[-fo:] = np.linspace(1, 0, fo)
    return x / (np.abs(x).max() + 1e-9) * fade


def music_drive():
    """premium promo score, 120 BPM A-minor: sub-boom hook, kick/clap/shaker groove, saw-ish pad + pluck arp, drop on the logo,
    filtered break for the FOMO beat (script.json "drive_break": [a, b]), 'drive_drop' = time of the logo drop, 'drive_in' = groove start"""
    bpm = 120; beat = 60 / bpm; t = np.arange(N) / SR; x = np.zeros(N)
    drop = script.get('drive_drop', 9.2); gin = script.get('drive_in', 2.8); brk = script.get('drive_break', [0, 0])
    prog = [(110.0, [220.0, 261.6, 329.6]), (87.3, [174.6, 220.0, 261.6]), (130.8, [261.6, 329.6, 392.0]), (98.0, [196.0, 246.9, 293.7])]
    bar = beat * 4; pad = np.zeros(N); bass = np.zeros(N); arp = np.zeros(N); drums = np.zeros(N)
    for b in range(int(DUR / bar) + 2):
        root, ch = prog[b % 4]; st = int(b * bar * SR); n = int(bar * SR)
        if st >= N: break
        m = min(n, N - st); tb = tt(bar)[:m]; e = np.minimum(1, tb / 0.05) * np.minimum(1, (bar - tb) / 0.08)
        pad[st:st + m] += sum(sum(np.sin(2 * np.pi * f * dt * tb + k) for k, dt in enumerate((0.997, 1.0, 1.004))) for f in ch) * e * 0.05
        for q in range(8):                                   # 8th-note sub bass, sidechained by the kick
            s0 = st + int(q * beat / 2 * SR); d = int(beat / 2 * SR)
            if s0 + d >= N: continue
            tq = tt(beat / 2); bass[s0:s0 + d] += np.sin(2 * np.pi * root / 2 * tq) * (1 - np.exp(-tq * 60)) * np.exp(-tq * 3) * 0.5
        for q in range(16):                                  # 16th pluck arp
            f = ch[[0, 1, 2, 1, 2, 0, 1, 2][q % 8]] * 2; s0 = st + int(q * beat / 4 * SR); d = int(0.25 * SR)
            if s0 + d >= N: continue
            tq = tt(0.25); arp[s0:s0 + d] += (np.sin(2 * np.pi * f * tq) + 0.3 * np.sin(4 * np.pi * f * tq)) * np.exp(-tq * 22) * 0.12
    k = 0
    while k * beat < DUR:
        i = int(k * beat * SR)
        kd = 0.35; tk = tt(kd); kick = np.sin(2 * np.pi * (45 + 110 * np.exp(-tk * 30)) * tk) * np.exp(-tk * 9)
        m = min(len(kick), N - i); drums[i:i + m] += kick[:m] * 0.9
        if k % 2 == 1:
            cl = bp(noise(0.18), 900, 3500) * np.exp(-tt(0.18) * 22) * 0.35; m = min(len(cl), N - i); drums[i:i + m] += cl[:m]
        for h in (0.5,):
            j = int((k + h) * beat * SR); sh = bp(noise(0.06), 3000, 4800) * np.exp(-tt(0.06) * 60) * 0.12; m = min(len(sh), N - j)
            if m > 0: drums[j:j + m] += sh[:m]
        k += 1
    duck = np.ones(N)
    for k in range(int(DUR / beat) + 1):
        i = int(k * beat * SR); n = int(0.22 * SR); m = min(n, N - i)
        if m > 0: duck[i:i + m] = np.minimum(duck[i:i + m], 0.35 + 0.65 * (np.arange(m) / n))
    groove = (bass * duck + drums) ; harm = (pad + arp) * duck
    gv = np.clip((t - gin) / 0.05, 0, 1) * np.where(t < drop - 0.45, 0.55, 1.0) * np.where((t > drop - 0.45) & (t < drop), 0.0, 1.0)
    inb = (t > brk[0]) & (t < brk[1]); gv = np.where(inb, 0.12, gv)
    hv = np.clip(t / 0.4, 0, 1) * np.where(t < gin, 0.5, 1.0) * np.where(inb, 0.45, 1.0)
    x = groove * gv + harm * hv
    sub = np.sin(2 * np.pi * 36 * t) * np.exp(-t * 1.2) * 0.9; x += sub                            # hook sub hit
    j = int(drop * SR); bd = np.sin(2 * np.pi * (38 + 60 * np.exp(-tt(1.6) * 6)) * tt(1.6)) * np.exp(-tt(1.6) * 2.2); m = min(len(bd), N - j); x[j:j + m] += bd[:m] * 0.9
    x = lp(x, 6000); fade = np.ones(N); fo = int(0.5 * SR); fade[-fo:] = np.linspace(1, 0, fo)
    return x / (np.abs(x).max() + 1e-9) * fade

def load_audio(f):
    out = subprocess.run(['ffmpeg', '-v', 'error', '-i', str(f), '-f', 'f32le', '-ac', '2', '-ar', str(SR), '-'], capture_output=True, check=True).stdout
    a = np.frombuffer(out, dtype=np.float32).reshape(-1, 2).astype(np.float64); return a


mix = np.zeros((N, 2))
# voice
vf = P / 'data/narration.wav'
voice = None
if vf.exists():
    v = load_audio(vf)[:N]; voice = np.zeros((N, 2)); voice[:len(v)] = v
    rms = np.sqrt(np.mean(voice ** 2) + 1e-12); voice *= db(-19) / rms
    mix += voice
# music
mus = script.get('music', 'bed')
if mus and mus != 'none':
    m = music_bed() if mus == 'bed' else music_tension() if mus == 'tension' else music_dread() if mus == 'dread' else music_warm() if mus == 'warm' else music_play() if mus == 'play' else music_drive() if mus == 'drive' else None
    if m is None:
        a = load_audio(P / mus)[:N]; m = np.zeros(N); m[:len(a)] = a.mean(1); m /= np.abs(m).max() + 1e-9
    m = np.stack([m, m], 1) * db((-20 if mus == 'dread' else -21 if mus == 'drive' else -24) if voice is not None else -20)
    if voice is not None:                                                        # duck under the voice
        lev = np.abs(voice.mean(1)); lev = signal.lfilter([1 - 0.9995], [1, -0.9995], lev); lev /= lev.max() + 1e-9
        m *= (1 - 0.55 * np.clip(lev * 3, 0, 1))[:, None]
    mix += m
# effects
for c in cj['cues']:
    fn = FX.get(c['type'])
    if not fn: print('unknown cue type, skipped:', c['type']); continue
    x = fn(**({'d': c['dur']} if c.get('dur') else {}))
    x = lp(x, 5000) * db(LEVEL[c['type']]) * c.get('gain', 1.0) / (np.abs(x).max() + 1e-9) * 0.9
    i = int(c['t'] * SR); n = min(len(x), N - i)
    if n > 0 and i >= 0: pan = c.get('pan', 0.0); mix[i:i + n, 0] += x[:n] * (1 - max(0, pan)); mix[i:i + n, 1] += x[:n] * (1 + min(0, pan))
# master: gentle soft-clip, peak -1 dBFS
mix = np.tanh(mix * 1.2) / 1.2
mix *= db(-1) / (np.abs(mix).max() + 1e-9)
wavfile.write(P / 'data/mix.wav', SR, (mix * 32767).astype(np.int16))
print(f"data/mix.wav: {DUR:.2f} s · voice: {'yes' if voice is not None else 'NO (captions-only)'} · music: {mus} · {len(cj['cues'])} cues")
