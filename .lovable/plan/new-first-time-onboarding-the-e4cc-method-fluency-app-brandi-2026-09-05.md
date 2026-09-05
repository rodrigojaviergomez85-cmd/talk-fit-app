# New first-time onboarding: the E4CC method + "Fluency App" branding

Replaces the current 3 intro screens with 6 compact screens that explain the full E4CC daily method (Natural Method → Teachable → Fluency App) in an E4CC coach voice. The existing placement step and account gate stay exactly where they are, right after the new screens.

## What I confirmed in the project

- The onboarding lives in one route (`/onboarding`) with local screen state: 3 intro screens → placement picker → account gate. Progress dots are hard-coded to 5.
- Home sends a learner to `/onboarding` only when `onboardingCompleted` is false, there is no saved `current_module_id`, no completed days and no pending placement. That guard already protects existing learners; it is not touched.
- `onboardingCompleted` is stored per learner (locally and in `user_preferences.onboarding_completed`). No schema change is needed.
- Mi Cuenta already has a "Ver introducción" link that reopens the onboarding; it will reopen the new screens.
- The learner-facing name "Fluency Reps" appears in the top app bar, page titles/descriptions, and two onboarding strings. Curriculum content is untouched.

## 1. The 6 screens (Spanish UI shown; English UI gets equivalent copy with the same branded English lines)

1. **WELCOME TO FLUENCY APP, CHAMPION! 🔥** — first screen carries "E4CC FLUENCY APP" as a small kicker. Goal: better job in ~3–11 months. Three pills: VOCABULARIO + PRÁCTICA + SPEAKING. "YOU CAN DO IT! 💪" + "No necesitás hacerlo perfecto. Necesitás practicar y seguir avanzando." CTA SIGUIENTE →
2. **STEP 1 · NATURAL METHOD 🧠** — big stat "~10 WORDS A DAY", time badge "1–2 HORAS", three icon rows (SERIES, CARICATURAS, SITUACIONES DE LA VIDA COTIDIANA), 3-step arrow line ESCUCHÁ → ENTENDÉ POR CONTEXTO → ANOTÁ LAS PALABRAS EN TU CUADERNO, line "Tus palabras del día son la base para después poder hablar.", mantra MISTAKES ARE PART OF THE PROCESS. CTA SIGUIENTE →
3. **STEP 2 · TEACHABLE ✅** — one sentence, time badge "5–10 MIN", two short supporting lines, closing "YOU CAN DO IT, CHAMPION!". CTA SIGUIENTE →
4. **STEP 3 · NOW SPEAK 🎙️** — "Después de aprender tus palabras y completar Teachable, venís a Fluency App." Highlight "AUDIOS DIARIOS Y DE REPASO". Two big badges: 🎙️ 3–5 AUDIOS · ⏱️ 5–10 MIN AL DÍA. Progression chips VOCABULARIO ACTIVO → RITMO → FLUIDEZ → CONFIANZA. Close with "No tengás miedo de equivocarte." / MISTAKES ARE PART OF THE PROCESS. / SPEAK. TRY AGAIN. KEEP GOING. CTA SIGUIENTE →
5. **YOUR DAILY E4CC ROUTINE 🔥** — vertical numbered stack with down-arrows: 1 NATURAL METHOD (~10 palabras · 1–2 h) ↓ 2 TEACHABLE (5–10 min) ↓ 3 FLUENCY APP (3–5 audios · 5–10 min) ↓ REPEAT TOMORROW 🔥. Habit lines: "tratá de practicar todos los días aproximadamente a la misma hora", "La meta es volver cada día.", small caption "ONE DAY AT A TIME." (ties to the 66-day habit without any science text; habit logic untouched). CTA SIGUIENTE →
6. **A CHAMPION'S DAILY ROUTINE** — example timeline 6:00 PM Natural Method / 7:30 PM Teachable / 7:40 PM Fluency App, then "DONE FOR TODAY ✅ · Great job, Champion. · See you tomorrow. · YOU CAN DO IT! 🔥". Primary CTA **START MY JOURNEY →**.

Every screen: one idea, large heading, badges/arrows instead of paragraphs, primary CTA pinned at the bottom, secondary SALTAR / EXPLORAR LA APP link kept as today. "Champion" appears on screens 1, 2, 3, 5 and 6 only; the four mantras rotate, one per screen at most.

## 2. Flow after START MY JOURNEY (unchanged behaviour)

START MY JOURNEY → existing placement picker (¿DÓNDE EMPIEZAS?) → existing account gate → Home / Day 1. Signed-in learners with a saved level go straight to Home from screen 6, exactly as the current screen 3 does. Progress dots become 8 (6 method screens + placement + account). Pending-placement handling, `current_module_id`, initial placement, restore and unlock logic are not modified.

## 3. Existing learners

No reset, no forced replay: the Home redirect conditions stay as they are, and `onboardingCompleted` values are not changed. Anyone can still reopen the new intro from Mi Cuenta → "Ver introducción".

## 4. Learner-facing branding: FLUENCY APP

Display-only rename of "Fluency Reps" → "Fluency App" in: the top app bar label, page titles/meta descriptions (Home, Practice, Progress, Recordings, Account, Level, Coach Check, Sprint, Verb Bank, Reset Password, Module, Onboarding), and the onboarding copy. "Fluency Reps" stays as the name of the 5 daily reps themselves (metric labels like "FLUENCY REPS", module meta "5 Fluency Reps per Day") because that is the exercise unit, not the product. No route, ID, storage key, table or module ID changes.

## Technical details

- `src/routes/onboarding.tsx`: replace screens 0–2 with screens 0–5 (small local presentational helpers in the same file: `StepBadge`, `TimePill`, `ArrowFlow`, `RoutineStep`, `TimelineRow`); placement becomes screen 6, account gate screen 7; dots array length 8; CTA branches updated (`screen < 5` → SIGUIENTE, `screen === 5` → START MY JOURNEY / existing signed-in shortcut, 6 and 7 unchanged).
- `src/lib/i18n.tsx`: remove old `onb.1.*`–`onb.3.*` keys, add `onb.s1.*` … `onb.s6.*` keys (ES/EN) plus `action.startJourney`. Branded lines (WELCOME TO FLUENCY APP, CHAMPION, NATURAL METHOD, YOU CAN DO IT!, MISTAKES ARE PART OF THE PROCESS, START MY JOURNEY, ONE DAY AT A TIME) are identical in both languages.
- `src/components/fluency/AppShell.tsx` and the route `head()` titles listed above: text-only "Fluency App".
- No changes to `preferences.ts`, `cloud-sync.ts`, `index.tsx` redirect, `PlacementPicker`, `AuthGate`, progression, habit, practice, recordings, or any course file.

## Verification

Playwright on a 394px viewport as a fresh guest: 6 screens render with the required copy (3–11 months, ~10 words/day, 1–2 horas, series/caricaturas/vida cotidiana, cuaderno, Teachable 5–10 min, 3–5 audios, 5–10 min, same-time habit, mantras), each fits without long paragraphs and the CTA is reachable; START MY JOURNEY opens the placement picker; SALTAR + refresh does not replay; a learner with a saved level or completed days is never redirected. Typecheck and the existing 21 tests pass.
