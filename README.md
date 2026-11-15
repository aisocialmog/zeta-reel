# zeta-reels — daily Zeta Galaxy reels, end to end

| time (IST) | what | where |
|---|---|---|
| 14:55 | count A/B votes on yesterday's reels | GitHub Action "1 · Count votes" → state/votes/<date>.json |
| ~15:07 | write + animate 3 episodes (Chhotu main reel, Aasmaan trial reel, notes-page story) | Claude scheduled task (DAILY.md) → pushes episodes/<date>/ |
| +15 min | voice (ElevenLabs) + render + public link | Action "2 · Render" → GitHub Release → Zapier webhook |
| any time | you approve (or reject) each reel | Zapier "Human in the Loop" email |
| 18:30 / 19:00 / 20:00 | post | Zapier waits until post time → Action "3 · Publish" → Instagram API (trial reel for Aasmaan) |
| Mondays | refresh Instagram tokens | Action "4 · Refresh" |

Times and accounts: config.json. Offer for the notes page: series/notes/offer.json.

## Secrets (Settings → Secrets and variables → Actions)
ELEVENLABS_API_KEY · IG_MAIN_TOKEN · IG_MAIN_USER_ID · IG_NOTES_TOKEN · IG_NOTES_USER_ID · ZAPIER_HOOK_URL · REPO_PAT

## Manual controls
- Re-render one: Actions → 2 · Render → Run workflow → `episodes/2026-11-17/chhotu`.
- Post one now: Actions → 3 · Publish → Run workflow → `2026-11-17-chhotu`.
- Change an episode: edit its files and push meta.json again (it re-renders and re-sends for approval).
