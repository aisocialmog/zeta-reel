#!/usr/bin/env bash
# script.json -> renders/chhotu_dayNN.mp4 + renders/cover.jpg  (runs on GitHub Actions; needs ELEVEN_API_KEY)
set -euo pipefail
cd "$(dirname "$0")/.."
DAY=$(python3 -c "import json;print(json.load(open('script.json'))['day'])")
python3 pipeline/voice.py .
node tools/capture.mjs check
node tools/capture.mjs cues
python3 tools/mix.py .
mkdir -p renders
node tools/capture.mjs video "renders/chhotu_day${DAY}.mp4"
node tools/capture.mjs frames renders/cover "2.0"
mv renders/cover/*.jpg renders/cover.jpg
python3 tools/ig_safe_sheet.py "renders/chhotu_day${DAY}.mp4" renders/safe_sheet.jpg 2>/dev/null || true
echo "DAY=${DAY}" >> "${GITHUB_ENV:-/dev/null}"
