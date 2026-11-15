# AASMAAN MEIN 96 — season bible + daily production guide (Zeta Galaxy, Season 2)

Daily Hinglish horror-thriller reel, ~80 s, counting down to the first board paper (Day 96 = 13 Nov 2026 … Day 0 = 17 Feb 2027).
Engine: this folder (`~/faceless-shorts/zeta-s2-2d`) — 2D night look (flat cut-out world + light pass, haze, rain, grain), renders an episode in ~10 min.
Never mention any class/grade number on screen or in narration. Exam stress is sensitive: "blank" is fantastical and reversible, no one dies, no one is mocked for marks.

## World
The night the datesheet came out, a red clock appeared in the sky. At zero, **the Examiner** (giant faceless invigilator, red eye slits, red tie, red pen) knocks on every door and asks one question. Who answers moves on; who can't goes **blank** (grey, memory foggy). Last year Rohan bhaiya went blank ("kal se pakka").
The survival weapon everyone discovers: **Zeta Galaxy** (only real features — see `../zeta-s2/ZETA_FEATURES.md`): Ace My Exams day-by-day plan (hardest first, missed day → plan adjusted), Exam insights (chapter marks from real board papers), AI teachers (live/chat, always shown as AI), Mock Test / Quiz Me, Flash Cards, Mnemonic Generator, Mind Map, Summarizer, Concept Explainer, Labs, video lessons. Never promise scores ("61→90%" etc.).

## Cast (night.js `person()` presets live in src/shots.js)
| who | personality / relatable trait | look preset | voice (teens = teen voices, never adult) |
|---|---|---|---|
| Aarav (hero) | quiet, guilty, brave when pushed; "padhne baitha, phone utha liya" | AAR: navy hoodie, messy hair | teen boy (narration is the adult storyteller) |
| Rohan bhaiya | blank since last year; gentle, foggy, flickers of memory | ROH, `grey: true` today | young adult male, slow |
| Kabir | funny loyal procrastinator; "bas ek match" (Match #N counter gag) | KAB: chubby, glasses, mustard hoodie | teen boy, fast, higher |
| Tanya | calm topper, secretly anxious, library girl | TAN: ponytail, teal, maroon bag | teen girl |
| Maa | worried, fierce love; "kitna hua?" every night | MAA: saree, bun, bindi, gold dupatta | warm adult female |
| Chhoti (from ep 3+) | Aarav's little sister, cheeky spy | add preset | small child |
| Sharma Sir (from ep 5+) | strict tuition teacher, red herring (red pen!) | add preset | adult male, gravel |
| The Examiner | silent until Day 0 | `N.examiner()`, `N.giantFist()`, `N.giantEye()` | none (Day 0: low echo) |
Narrator: ElevenLabs **Neel – Paranormal Story Narrator** (voiceId `q4KoKwFyTWQ0Fvvsl9LW`), Eleven v4, stability 35 %, similarity 85 %, written in Devanagari with emotion tags.

## Recurring devices
- **Sky clock**: day number on screen in the first second. Colour cools red → amber → white as Aarav gets readier (later phases).
- **Examiner sightings** get closer every week (street end → gate → window → door), each marked by a hidden red ink drop (comment bait: "ink drop kahan tha?").
- **Kabir's "Match #N"** counter rises until he joins the team (phase 4).
- **Sunday Test Night**: Sharma Sir's surprise test on Zeta Mock Test; readiness % climbs.
- Every episode: a NEW visual hook (never reuse), one real study tip, one Zeta feature used in-story, reaction cutaways every 2-3 s during any app screen.

## 96-day arc
| phase | days | story | Zeta weapon |
|---|---|---|---|
| 1 Awakening | 96-80 | Aarav starts bhaiya's plan; Kabir mocks it | Ace My Exams (hardest first, Today's mission) |
| 2 The Map | 79-64 | gang learns the chapter-marks map; Tanya admits she skipped Triangles | Exam insights, Flash Cards |
| 3 The Fall | 63-45 | Aarav misses days (illness), fears it's over | plan auto-adjusts, streak recovery |
| 4 The Squad | 44-28 | Kabir joins; weak spots exposed on test nights | Mock Test, Quiz Me, AI teacher |
| 5 The Cure | 27-10 | Rohan's memory flickers back as Aarav teaches him | Mnemonic Generator, Mind Map, own-notes → quiz |
| 6 The Door | 9-0 | full mocks, the knock, Aarav answers, Rohan recovers | auto revision, full Mock Test |

## Episode template (75-85 s, ~150-190 spoken words, 18-24 lines; a line = a cut)
| s | beat |
|---|---|
| 0-2 | hook: day number + "N DIN · ROZ EK EPISODE" + a new visual hook |
| 2-9 | last vote: if majority = correct → "Kal X% ne bola A… aur sahi bola"; ALWAYS a 5-10 s funny-sad "agar B chunta…" what-if (sepia/alt look), then rewind |
| 9-22 | today's relatable student pain (character moment) |
| 22-35 | tension: Examiner sign / ink drop / clock glitch |
| 35-50 | Zeta weapon in-story + one real study tip (reaction cutaways) |
| 50-58 | ask 1 (≈ 60 %): `COMMENT "PLAN" 👇 free plan link DM mein` pill |
| 58-70 | small win + cost, Kabir gag, cliffhanger image |
| 70-82 | A/B shown on an in-world object (phone buttons/notifs), clock ticks N → N-1, ask 2 over the scariest frame, hard cut (no end card) |
Right option = "start now / small step". A/B keywords go in `ledger.json`.

## CTA + posting kit (every episode)
- Caption: hook line · Aarav's A/B choice · `Comment A ya B 👇 har comment ko free plan link DM mein 🔴` · `Follow karo: roz ek episode, boards tak ⚔️` · 6 hashtags (#BoardExam #Datesheet2027 #BoardExams #StudyTips #ExamTips #ZetaGalaxy).
- Pinned comment: `A ya B? 👇 Comment karo, free plan link DM mein aayega 🔴 (DM nahi aaya? Follow karke dobara comment karo)`
- Auto-DM (Meta automation): `Ye raha bhaiya wala plan 🔴 Zeta Galaxy, 3 din free: din-ba-din plan + kaunse chapters sabse zyada marks laate hain + AI teacher 👉 [link]. Tumhara pehla paper kab hai?`
- Teen accounts may block DMs from accounts they don't follow → always ask to follow.

## Daily procedure (automated — see DAILY.md at the repo root)
Voice is generated by GitHub Actions through the ElevenLabs API: every line needs "speaker", Roman "text", "caps", and a
Devanagari "say" with emotion tags; script.json "voices" maps speakers to ids (see ledger.json "voices"). Teens keep teen voices.
Write shots.js per episode from series/aasmaan/example_shots.js (sets, knock, phone UIs, people presets) with a new hook.
Music "dread" with "calm" windows. Votes arrive in state/votes/<date>.json.

## Ledger
series/aasmaan/ledger.json
