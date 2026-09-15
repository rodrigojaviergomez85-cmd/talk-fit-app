# Smooth the Episode 8 → Episode 9 transition (Sharks)

## Verification (already done)
- Episode 8 (Vale Kids) ends with Don Tito pointing at Vale's ringing phone: "And Mexico just asked for a call about bringing the idea there… Answer that call before the idea belongs to somebody else."
- Episode 9 (The Mexico call) opens mid-conversation with Renata: "So you want me to buy your brand and run it exactly your way."
- The link is logical (Ep 8's cliffhanger IS this call), but Ep 9 jumps into the middle of the negotiation with no greeting or bridge, which can feel disconnected.

## Change
Edit only `src/services/storybook/sharks-ep9-mexico-call.ts`, scene 1 opening lines:
- Vale answers the phone referencing the end of Episode 8 (e.g. greeting Renata, acknowledging "the call from Mexico" she was about to take).
- Keep the same scene count (11), line count (33), speakers, artwork, quizzes, finales, and cliffhanger.
- Spanish translations and imageAlt updated to match the new lines.
- No new tappable-word or glossary changes needed (add only if new words are tapped).

## QA
- Run storybook test suite (depth/structure/consistency tests) and `bunx tsgo --noEmit`.
