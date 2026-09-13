# Add vocabulary-notebook reminder under storybook cover swipe hint

## Goal
On the storybook episode cover, below the existing "Desliza o toca para pasar la página" helper line, add a second line that reminds students to copy unknown vocabulary into their notebook using the E4CC structure and to practice repeating aloud.

## What will change
- `src/components/storybook/StorybookPlayer.tsx`
  - In the cover slide, after the current centered `text-muted-foreground` hint, add another `<p>` with the same typography.
  - Spanish copy: "Copia el vocabulario que no te sepas en tu cuaderno con la estructura frase-palabras de E4CC y luego practica repetir en voz alta imitando al audio hasta que te salga similar."
  - English copy (for `en` mode): "Copy the vocabulary you don’t know into your notebook using the E4CC sentence-words structure, then practice repeating out loud imitating the audio until it sounds similar."

## How to validate
- `bunx tsgo` passes.
- Existing storybook tests still pass.
- Mobile preview of `/natural-method/cuento/vale-first-call?from=day` shows the new line under the swipe hint with the same font style.
