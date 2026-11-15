"""Writer's check, no voice: lay the episode over its engine, estimate timing, boot the renderer, write a contact sheet.
python3 tools/preview.py episodes/<date>/<series>  -> prints CHECK OK and the sheet path (look at it!)"""
import sys
from pathlib import Path
from common import prepare, run, episode, ROOT
ep = sys.argv[1]; pid, series, sc, meta, date = episode(ep)
out = prepare(ep, ROOT / 'build' / ('preview-' + pid))
if series == 'chhotu': run([sys.executable, 'pipeline/validate.py'], cwd=out)
run([sys.executable, 'pipeline/estimate.py', '.', '--wps', '2.6'], cwd=out)
run(['node', 'tools/capture.mjs', 'check'], cwd=out)
run(['node', 'tools/capture.mjs', 'sheet', 'review/all.jpg', '1', '10'], cwd=out)
print('SHEET', out / 'review' / 'all.jpg')
