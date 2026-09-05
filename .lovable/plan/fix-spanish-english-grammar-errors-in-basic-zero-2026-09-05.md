# Fix Spanish/English grammar errors in Basic Zero

Scope: `src/services/basic-zero-course.ts` only, plus one render-site change in `src/routes/practice.tsx` and two i18n keys in `src/lib/i18n.tsx`. No other course file is touched.

## Fix 1 — "es" vs "son" for plural foods

`foodEs` values like "los tacos", "las hamburguesas", "las baleadas" are plural, but templates hardcode "es" (producing "Mi comida favorita es los tacos."). Add:

```ts
function foodVerb(foodEs: string): string {
  return /^(los|las)\s/i.test(foodEs) ? "son" : "es";
}
```

Use it in the four "comida favorita" Spanish sentences: `selfLinesFoundation` line 6, `selfLinesFluency` line 4, `otherLinesFoundation` line 7, `otherLinesFluency` line 5. English text unchanged.

## Fix 2 — "Esta es mi hermano" (wrong gender)

Add next to `esEl`/`esSu`:

```ts
function esEste(p: Person): string {
  return p.gender === "f" ? "Esta" : "Este";
}
```

Use it in `otherLinesFoundation` line 1 and `otherLinesFluency` line 1 (male relations → "Este es mi hermano / amigo / papá / compañero de trabajo."). Also update `otherPromptsFluency` p1 `starterEs` to "Esta es mi… / Este es mi ______ y su nombre es ______." to match `otherPromptsFoundation` p1.

## Fix 3 — first-person clauses inside third-person sentences

Weeks 3–4 reuse `colorWhy` / `foodWhy` / `free` written in first person. Existing values stay byte-for-byte identical (Weeks 1–2 are correct). Add optional fields to `Person`: `colorWhyOther?`, `colorWhyOtherEs?`, `foodWhyOther?`, `foodWhyOtherEs?`, `freeOther?`, `freeOtherEs?`.

In `otherLinesFoundation` and `otherLinesFluency` ONLY, read with fallback (`p.colorWhyOther ?? p.colorWhy`, same for Es/food/free), then fill exactly these on the base people (no other field touched):

- carlos: foodWhyOther "he loves cheese" / "le encanta el queso"; freeOther "play soccer with his friends" / "jugar fútbol con sus amigos"
- sofia: colorWhyOther "it makes her happy" / "la hace feliz"; foodWhyOther "they remind her of her family" / "le recuerdan a su familia"
- daniel: colorWhyOther "it gives him energy" / "le da energía"
- miguel: foodWhyOther "his mother makes it" / "su mamá la prepara"
- andres: foodWhyOther "they are his weekend food" / "son su comida del fin de semana"
- valeria: freeOther "sing with her friends" / "cantar con sus amigos"

Week 3–4 people spread from these bases with matching gender, so gendered pronouns are safe.

## Fix 4 — translate the intro CTA

`intro.cta` is the raw string "START REP 1" (also used by other modules, e.g. past-stories) rendered directly at `practice.tsx` ~line 831. Add i18n keys in the existing tuple format:

- `"intro.startRep1": ["EMPEZAR REP 1", "START REP 1"]`
- `"intro.startChallenge": ["EMPEZAR RETO", "START CHALLENGE"]`

At the render site, map through those keys when `intro.cta` matches "START REP 1" or "START CHALLENGE"; otherwise render unchanged (Eagles/Get Hired supply their own translated CTAs and must keep working).

## Must not change

- No day/module/line/prompt id renamed, renumbered, added or removed.
- No topic/topicEs/focus/week/weekTitle/goalSeconds change; course-outline stays valid, no outline regeneration.
- Weeks 1–2 render byte-identical in English; Spanish changes only via the plural-food verb (intended) — first-person why/free values untouched.
- No other course module file, no Supabase/migration/recording/progress changes.

## Verification

Print generated model lines for days 2, 12, 16, 18, 19 and confirm:

- Day 2 ES: "Mi comida favorita son los tacos."
- Day 12 ES: "Este es mi hermano." and "Su comida favorita son las hamburguesas."
- Day 16 EN: "…because his mother makes it." ES: "…porque su mamá la prepara."
- Day 18 EN: "…because he loves cheese." and "…with his friends."
- Day 19 EN: "…because it makes her happy." and "…they remind her of her family."
- Day 1 and Day 6 EN/ES unchanged (except the Day 2-style plural-food fix where applicable — Day 1 food is "la pizza", so unchanged).

Then run `bunx tsgo --noEmit`, the course-index/habit vitest suites, and a quick browser check of a Week 3 day.
