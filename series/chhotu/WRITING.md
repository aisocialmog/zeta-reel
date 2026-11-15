# Chhotu ke 100 Din — writing rules + scene catalog
(Engine: engines/chhotu, data-driven: you write ONLY script.json; no shots.js.)

## script.json (same shape as series/chhotu/example_script.json)
- `day` N. `vote`: {a, b (shares 0..1), winner, correct, post: "Day N+1"}. `aura_start` = last AURA of yesterday (default 200).
- Majority = correct → open with the vote ("Kal X percent ne bola A… aur sahi bola!"), then STILL play a short 5-10 s
  "agar Chhotu B chunta..." what-if (3-4 `"alt": true` lines, funny + a little sad), then the real path.
- Majority = WRONG → line 1-3 are `"alt": true` lines (about 5-7 s, funny + a little sad): what would have happened on the
  wrong path (e.g. Chhotu alone, no Mishti, same mistake again, AURA drops). Then the real path continues (a rewind plays
  automatically on the first non-alt line). Set `alt_label` e.g. "AGAR B CHUNTE...".
- Line 0 = the hook, a `hook_*` scene NOT used in the last 4 ledger episodes (`hook` field). Show the vote % in the first 3 s
  when you have it (`chip` like "KAL: A 57% · B 43%", or `hook_vote`).
- 12-18 lines, 150-200 spoken words total (60-80 s). Hinglish in Roman script, Gen Z humour, wholesome Mishti tease (never romance),
  stakes (Papa's 90% deal, Section A, PHONE ❤️, AURA), a micro-hook every 2-3 lines, one real study tip in plain words.
- In `text` spell every number as Hindi words (sattavan, chaudah). Digits are fine in `caps` and scene fields; `caps` must
  have exactly as many words as `text` ("|" separates chunks, *word yellow, !word red, +word green, ~word blue).
- Speakers: N (narrator), chhotu, mishti, mummy, papa. Kids keep kid voices automatically.
- One subtle Zeta Galaxy moment that is part of the story (a `zeta` scene: Chhotu uses Zeta Galaxy notes / PYQs / mistakes list /
  formula sheet; someone reacts). Never an ad voice, never "link in bio". Vary what Zeta is used for each day. Fill `zeta_placement`.
- You can shout out 1 real commenter: a `comment` scene with their text (username shown as "@handle" only).
- Last line = `ab` scene; its text must contain the standalone words "A" and "B". `choice`: question, a, b (short, CAPS ok),
  correct ("A" or "B": what a smart, honest student would do — mix up whether the right one is A or B across days),
  a_people/b_people, keywords {A:[...], B:[...]}.
- `captions`: instagram (starts "A ya B? Kal wahi dikhega jo zyada log bolenge 👇", 5 hashtags, plain #), yt_title (≤ 90 chars,
  ends "| Chhotu ke 100 Din · Day N #shorts"), yt_desc (mentions "zetagalaxy.com" once, naturally), pinned.
- `story_note`: 2-3 lines of what happened + the question (it becomes the story memory).

### Scene catalog (`scene.type` + params; everything optional unless noted)
- Hooks (line 0 only): `hook_battery` {label, from, to, chip, chip_at} · `hook_crack` {from, to, sub, crack_at, chip} ·
  `hook_vote` {a (0..1), stamp, stamp_color, stamp_at} · `hook_notifs` {items:[{name,msg}] ≤4} · `hook_stamp` {text, sub, color, chip} ·
  `hook_timer` {minutes, label, chip} · `hook_zoom` {set:"bedroom|library", people, moods, text, text_at, chip}
- Places with people: `bedroom` {mood: night|dawn|day, chhotu: sleep|sit|stand|phone|study, lamp, people, moods, arms, prop} ·
  `library` / `home` / `classroom` {people (≤3 of chhotu, mishti, mummy, papa), moods, arms, prop, board (classroom text), mood}.
  The speaker's mouth moves and the camera focuses on them automatically.
  moods: ok happy scared think tired · arms: stand wave fist point phone write hold scared ·
  prop: balloon (+prop_text) bulb question heart zzz sweat (prop_on, prop_at)
- Cards: `chat` {name, msgs:[{side:"l|r", text, at}] ≤5} · `comment` {user, text, stamp, stamp_color, stamp_at} ·
  `paper` {title, score "14/20", color, score_at, was} · `notice` {top, big, bottom, at} · `bar` {label, value, target, max, color, stamp} ·
  `alarm` {h, m, ring, label} · `zeta` {kind: Notes|PYQs|Formula sheet|Mistakes list, chapter, points[≤4 short]} ·
  `devil_angel` {devil, angel, devil_at, angel_at} · `big_text` {text, sub, color, at} · `ab` {} (last line only)
- Per line: `fx` [{type: stamp|tag, text, at (a word of that line), color}] · `aura` (new absolute AURA value) · `sfx` [{type, at}]
  (pop ding cash boom slam thud sparkle boing tick glass alarm buzz sadviolin)
- `at` / `*_at` = a word from that line's `text` (first match); omit to use the line start.
- Colors: green red yellow blue pink orange.


## User rules (always)
- Line 0 = a hook for board students, NEVER the vote recap. The vote % can appear as a chip in the first 3 s.
- ALWAYS a 5-10 s funny "agar B chunta..." what-if, even when the majority was right.
- New hook every day: never repeat any hook in the ledger's last 4 episodes. If no unused catalog hook fits, add a new hook_* scene to engines/chhotu/src/scenes.js (and to SCENES in pipeline/validate.py) and commit it with the episode.
