"""Shared helpers: repo paths, config, episode folders, running commands."""
import json, shutil, subprocess, sys
from pathlib import Path
ROOT = Path(__file__).resolve().parent.parent
CFG = json.loads((ROOT / 'config.json').read_text())

def run(cmd, cwd=None, **kw):
    print('$', ' '.join(map(str, cmd)), flush=True)
    return subprocess.run(list(map(str, cmd)), cwd=cwd, check=True, **kw)

def episode(ep_dir):
    """episodes/<date>/<series>/ -> (id, series name, series config, meta dict)"""
    ep = Path(ep_dir).resolve(); series = ep.name; date = ep.parent.name
    meta = json.loads((ep / 'meta.json').read_text())
    return f'{date}-{series}', series, CFG['series'][series], meta, date

def prepare(ep_dir, out):
    """Copy the series engine to `out` and lay the episode's files over it (script.json, shots.js, ledger)."""
    ep = Path(ep_dir).resolve(); _, series, sc, meta, _ = episode(ep); out = Path(out)
    if out.exists(): shutil.rmtree(out)
    shutil.copytree(ROOT / sc['engine'], out)
    shutil.copy(ep / 'script.json', out / 'script.json')
    if (ep / 'shots.js').exists(): shutil.copy(ep / 'shots.js', out / 'src' / 'shots.js')
    led = ROOT / 'series' / series / 'ledger.json'
    if led.exists(): (out / 'state').mkdir(exist_ok=True); shutil.copy(led, out / 'state' / 'ledger.json')
    if not (out / 'pipeline' / 'estimate.py').exists(): shutil.copy(ROOT / 'tools' / 'estimate.py', out / 'pipeline' / 'estimate.py')
    (out / 'data').mkdir(exist_ok=True); (out / 'renders').mkdir(exist_ok=True); (out / 'review').mkdir(exist_ok=True)
    return out
