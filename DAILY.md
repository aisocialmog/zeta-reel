# DAILY RUN — 3 Zeta Galaxy reels (you are the writer + animator; GitHub does voice, render, approval, posting)

Today = the date in IST. Work in this repo. Keep replies short. Do everything below without asking questions.
Facts about Zeta: series/ZETA_FEATURES.md (only real features, never promise scores).

## 0. Start
`git pull`. Read config.json and state/votes/<today>.json (vote counts per series; may be missing or have "error" →
treat majority = correct and show no percentages). If episodes/<today>/<series>/meta.json already exists, skip that series.

## 1. Which episode
- chhotu: Day N = 100 − (today − 2026-11-09). aasmaan: Day N = 96 − (today − 2026-11-13). notes: next episode number in series/notes/ledger.json.
- Stop a series after its Day 0 / when the bible says it ends.

## 2. For each series write episodes/<today>/<series>/
- `script.json` — the voiced script. Every line: speaker, Roman Hinglish "text", "caps" (same word count as text; "|" chunks,
  *yellow !red +green ~blue), Devanagari "say" with emotion tags ([whispers] [excited] ...). "voices" map for the cast.
  Optional "tempo" (1.0-1.2) to speed narration; target 60-85 s.
- `shots.js` — aasmaan and notes only: the full src/shots.js for this episode (start from the previous episode's shots.js in
  episodes/, or the example in series/<series>/). Anchor moments to words with Wd()/at(); keep everything in the safe zone
  (x 100-980, y 250-1550; captions at y ~1330). NEW visual hook in the first 1.5 s every day.
- `meta.json` (write it LAST — pushing it triggers the render):
  {"title", "caption" (full Instagram caption, plain #), "first_comment", "cover_t" (seconds),
   "choice": {"question","a","b","correct","keywords":{"A":[..],"B":[..]}} or null, "notes_for_you" (1 line for the approver)}
- Update the series ledger (series/<series>/ledger.json: append day/ep, hook, zeta feature, options, correct, keywords, 2-3 line story).

Series rules: chhotu → series/chhotu/WRITING.md + SERIES.md · aasmaan → series/aasmaan/SEASON.md (trial reel) ·
notes → series/notes/SERIES.md + offer.json. Continue the story from the ledger; react to yesterday's vote and top comments.

## 3. Check every episode before pushing
`cd tools && python3 preview.py ../episodes/<today>/<series>` must print CHECK OK; open the SHEET image it prints and look at
every frame: text readable, nothing outside the safe zone or under the captions, the hook is strong at 0 s, no empty frames.
Fix and re-run until it's right. (Preview uses estimated timing; the real voice re-times everything on GitHub.)

## 4. Push
`git add -A episodes series engines && git commit -m "<today>: 3 episodes" && git push`.
Reply in 3 lines: what each episode is about + its hook. GitHub renders (~15 min), then Zapier emails approval to the user.
