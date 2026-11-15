# NOTES PAGE — "Sonu ke Boards" (daily story, Zeta Galaxy notes page)
Continues the Chhath family after Chhath ends (first episode 17 Nov 2026). Warm small-town Bihar slice of life, ~60-75 s, Hinglish.
Engine: engines/notes (the Chhath engine: folk border, mud-wall home, ghat, train, phone UI, pill(), offer card, warm music).
Write a NEW src shots per episode (start from series/notes/example_chhath_ep1_shots.js; reuse home/ghat/train/phoneFrame/pill
and the cast presets SONU, GUD, MAA, PAPA). Every episode needs a NEW visual hook in the first 1.5 s.

## Cast + voices (kids keep kid voices)
| who | trait | voice id |
|---|---|---|
| Narrator | warm mature storyteller | PboFIQ6kckfADmG3UQYF (Sanjay) — speaker "N" |
| Sonu | Class-10 boy, honest, a bit lazy, big heart | HrEP6VcINSSo6BOoRlQl (Tinku) — "sonu" |
| Gudiya | little sister, cheeky, Sonu's spy & fan | Pbk8E6dlpCANrnpOLIns (Mishi) — "gudiya" |
| Maa | "roz thoda, par roz" | Rg5w9usCZCJdEdW501zk (Vidya) — "maa" |
| Papa | works in Delhi, video calls at night, sacrifices quietly | efGTHf4ukBiG4n8lptfp (Zadok) — "papa" |
| Pinky (new, from Ep 2) | topper next door, colour-coded notes, competitive but kind | Pbk8E6dlpCANrnpOLIns with [older, confident] tags — "pinky" |
| Masterji (new, from Ep 4) | strict tuition sir, "notes banao, ratta nahi" | efGTHf4ukBiG4n8lptfp with [gruff] — "masterji" |
Put the map in script.json "voices": {"n": ..., "sonu": ..., ...}.

## Arc (to the boards, 17 Feb 2027)
1. Pre-board test week (Ep 1-5): test is on 19 Nov; Papa back in Delhi; Sonu's notes are a mess; Zeta revision notes save the night.
2. Result + Pinky rivalry (Ep 6-15): marks come, Pinky's perfect notes vs Sonu's Zeta notes; they become study partners.
3. Winter grind (Dec): cold mornings, chai, Gudiya's quiz-master game (Zeta Quiz Me / Flash Cards), Papa's surprise visit.
4. Pre-boards (Jan) → Boards (Feb).
Each episode: one relatable study pain → one Zeta NOTES moment that fixes it (revision notes, chapter notes, formula sheet,
notes from textbook photo, flash cards from notes) → small win → family emotion → cliffhanger for tomorrow.

## CTA + offer (every episode, last 6-8 s)
- Read series/notes/offer.json. Offer card like Chhath: "🎟️ <discount> · CODE: <code> / Zeta Galaxy · zetagalaxy.com /
  Comment '<comment_keyword>' 👇 notes link DM mein". If code is empty use fallback_if_no_code.
- Narration line before the card, warm, not salesy ("Notes chahiye? Comment karo NOTES...").
- No vote/A-B on this page (keep meta.choice null) unless the bible changes.
- Caption: hook line · 1-2 story lines · "Sonu ke Boards · Ep N" · offer line · comment line · 5 hashtags (#BoardExam #Class10 #StudyNotes #RevisionNotes #ZetaGalaxy).
- first_comment: "Notes chahiye? Comment 'NOTES' 👇 DM mein link aayega 📚 (DM nahi aaya? Follow karke dobara comment karo)"
