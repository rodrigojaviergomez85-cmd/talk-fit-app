# Plan: Step 1 — Simple Present Intro Screen

## Goal
Create a mobile-first, friendly, visual intro screen for the Simple Present module. It teaches A1 learners to form affirmative sentences with "I" and sends them into the existing daily practice flow.

## What we will build

1. **New route** `src/routes/module.simple-present.tsx`
   - URL: `/module/simple-present`
   - Route-specific `head()` with title, description, og:title, og:description.

2. **Step 1 screen layout**
   - Sticky top bar with back arrow to `/`, "Step 1 of 5" progress indicator, and Exit link.
   - Screen title: "STEP 1 — SIMPLE PRESENT".
   - Subtitle: "Talk about your daily life using 'I'."
   - Spanish toggle button using the existing `SpanishProvider` / `SpanishToggle` / `TranslatableText` pattern.

3. **Section 1 — Objective**
   - Card with icon + heading "Your Goal" / "Tu objetivo".
   - Short explanation: learn Simple Present with "I".
   - Three visual items: Routines, Habits, Your daily life — each with a friendly icon and one-line Spanish translation.

4. **Section 2 — Examples**
   - Four rounded cards, stacked vertically.
   - Each card shows the English sentence prominently, Spanish translation underneath in smaller text.
   - Highlight the word "I" in primary color and the main verb in accent color.
   - Examples:
     - I work every day. / Yo trabajo todos los días.
     - I play soccer every weekend. / Yo juego fútbol todos los fines de semana.
     - I study English at night. / Yo estudio inglés por la noche.
     - I drink coffee in the morning. / Yo tomo café por la mañana.

5. **Section 3 — Easy Rule**
   - Visual formula card: "I + VERB".
   - Four mini example pairs:
     - I work. → Yo trabajo.
     - I study. → Yo estudio.
     - I play. → Yo juego.
     - I eat. → Yo como.
   - One-line confirmation: "With 'I', use the verb in its normal form." / "Con 'I', usa el verbo en su forma normal."

6. **Section 4 — Module Goal**
   - Motivational card with rocket icon.
   - Heading "Your Mission" / "Tu misión".
   - Text: "By the end of this module, you will be able to speak for 35–45 seconds about your routine using 7–10 sentences in English."

7. **Main CTA**
   - Large primary button at the bottom: "LET'S PRACTICE →" / "VAMOS A PRACTICAR →".
   - Uses TanStack `<Link to="/practice">` for navigation.
   - Touch-friendly height and shadow.

## Design approach
- Mobile-first, max-width container (`max-w-lg`), generous padding and rounded-3xl cards.
- Reuse existing tokens: `bg-background`, `bg-card`, `shadow-[var(--shadow-card)]`, `bg-navy`, `text-primary`, `text-accent`.
- Friendly icons from `lucide-react`.
- No long paragraphs; clear visual hierarchy; large readable typography.
- Smooth vertical scroll if content exceeds viewport.

## Out of scope
- We will not change the existing 6-rep `/practice` flow. This intro is a separate module step that links into it.
- We will not build Steps 2–5 of the module now.

## Verification
- Run `bunx tsgo --noEmit -p tsconfig.json`.
- Confirm `/module/simple-present` loads in the preview and matches the requested sections.
- Confirm the CTA navigates to `/practice`.
