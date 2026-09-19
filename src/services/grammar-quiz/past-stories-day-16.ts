import { mc, mistake, rearrange, type GrammarQuiz } from "./types";

/**
 * BASIC 3 · Día 16 — The Characters & The Beginning (Caperucita: personajes e inicio).
 * Historia del día: Vale le cuenta el cuento a Camila, y Camila interrumpe.
 * Mezcla: 10 pasado simple del cuento · 5 repaso Basic 1 y 2 (presente simple
 * en tercera persona y primera, will en primera persona, going to en tercera)
 * · 5 básicos (posesivo 's, a / the, her / his, in / to).
 * 8 ancla · 8 transferencia · 4 trampas.
 */
const DETECTIVE = "Camila escribió el inicio del cuento. Toca el error antes de que lo lea en clase.";
const CHISME = "Vale contó el cuento en desorden. Ordena la frase.";

export const PAST_STORIES_DAY_16: GrammarQuiz = {
  moduleId: "past-stories",
  day: 16,
  title: { en: "Once Upon a Time", es: "Había una vez" },
  items: [
    // ── Ancla ──────────────────────────────────────────────────────────────
    mc("m3g16-1", "Little Red Riding Hood ___ with her family.", "Caperucita vivía con su familia.", ["lived", "lives", "living", "live"], 0, {
      en: "A story in the past: lived.",
      es: "Un cuento va en pasado: lived. live + d.",
    }),
    mc("m3g16-2", "Her grandmother ___ in another house, near the forest.", "Su abuela vivía en otra casa, cerca del bosque.", ["lived", "was live", "lives", "living"], 0, {
      en: "lived. Same form for she.",
      es: "lived. En pasado no cambia con she.",
    }),
    mc("m3g16-3", "One day, her mother ___ some food.", "Un día, su mamá preparó comida.", ["prepared", "prepares", "was prepare", "prepare"], 0, {
      en: "One day = a specific moment in the story: prepared.",
      es: "One day marca un momento del cuento: prepared, pasado simple.",
    }),
    mc("m3g16-4", "She ___ the food to Little Red Riding Hood.", "Le dio la comida a Caperucita.", ["gave", "give", "gives", "given"], 0, {
      en: "give → gave. Irregular.",
      es: "give → gave. Irregular. given necesita have.",
    }),
    mistake("m3g16-5", "Her mother asked her to visit her grandmother, so she take the food.", "take", "took", {
      en: "take → took.",
      es: "take → took. La segunda acción también va en pasado.",
    }, DETECTIVE),
    mistake("m3g16-6", "She leaved her house in the morning.", "leaved", "left", {
      en: "leave → left. No -ed.",
      es: "leave → left. Irregular; leaved no existe.",
    }, DETECTIVE),
    rearrange(
      "m3g16-7",
      ["toward the forest", "she", "walked", "Then,"],
      ["Then,", "she", "walked", "toward the forest"],
      { en: "Then, + subject + verb + direction.", es: "Then, + sujeto + verbo + dirección. Then conecta la acción con la anterior." },
      CHISME,
    ),
    rearrange(
      "m3g16-8",
      ["lived", "in another house", "Her grandmother"],
      ["Her grandmother", "lived", "in another house"],
      { en: "Subject + lived + place.", es: "Sujeto + lived + lugar." },
      CHISME,
    ),

    // ── Transferencia ──────────────────────────────────────────────────────
    mc("m3g16-9", "Camila: Wait. Does the grandmother live alone? · Vale: Yes, she ___ alone, and she ___ lock the door.", "Camila: Esperá. ¿La abuela vive sola? · Vale: Sí, vive sola, y no cierra la puerta con llave.", ["lives / doesn't", "live / doesn't", "lives / don't", "lived / didn't"], 0, {
      en: "Talking about the character in general: lives (-s), doesn't lock.",
      es: "Hablando del personaje en general, en presente: lives, con -s, y doesn't lock. Repaso de Basic 2, tercera persona.",
    }),
    mc("m3g16-10", "Camila: I ___ this story. My mom told it to me every night.", "Camila: Me encanta este cuento. Mi mamá me lo contaba todas las noches.", ["love", "loves", "loved loving", "am love"], 0, {
      en: "I love: no -s with I.",
      es: "I love: sin -s con I. La -s es solo para he, she, it. Primera persona, repaso de Basic 2.",
    }),
    mc("m3g16-11", "Little Red Riding Hood: Don't worry, Mom. I ___ careful in the forest.", "Caperucita: No te preocupes, mamá. Voy a tener cuidado en el bosque.", ["will be", "was", "am being", "be"], 0, {
      en: "A promise: I'll be careful.",
      es: "Una promesa: I'll be careful. Repaso de Basic 1: I promise I'll ...",
    }),
    mistake("m3g16-12", "Her mother work at the bakery every morning.", "work", "works", {
      en: "her mother = she: works.",
      es: "her mother = she: works, con -s. Presente, rutina, tercera persona.",
    }, DETECTIVE),
    mistake("m3g16-13", "Tomorrow I going to tell you the second part.", "going", "am going", {
      en: "I am going to tell. The am is part of going to.",
      es: "I am going to tell. El am es parte de going to; sin am no hay futuro. Repaso de Basic 1.",
    }, DETECTIVE),
    rearrange(
      "m3g16-14",
      ["her grandmother", "visits", "every Sunday", "She"],
      ["She", "visits", "her grandmother", "every Sunday"],
      { en: "Routine with she: visits (-s).", es: "Rutina con she: visits, con -s. Esto no es el cuento en pasado; es lo que hace siempre." },
      CHISME,
    ),
    rearrange(
      "m3g16-15",
      ["going to", "Is", "eat her?", "the wolf"],
      ["Is", "the wolf", "going to", "eat her?"],
      { en: "Camila predicts: is going to + verb.", es: "Camila predice: is going to + verbo. Tercera persona, repaso de Basic 1." },
      CHISME,
    ),
    mc("m3g16-16", "The girl took ___ basket with ___ bread and ___ apple.", "La niña llevó una canasta con pan y una manzana.", ["a / some / an", "an / a / a", "a / a / an", "the / some / a"], 0, {
      en: "a basket, some bread (uncountable), an apple (vowel sound).",
      es: "a basket (una); some bread (el pan no se cuenta); an apple (sonido de vocal).",
    }),

    // ── Trampas ────────────────────────────────────────────────────────────
    mc("m3g16-17", "She walked to her ___ house.", "Caminó a la casa de su abuela.", ["grandmother's", "grandmother", "grandmothers", "grandmother of"], 0, {
      en: "Possessive: her grandmother's house.",
      es: "Posesivo: her grandmother's house = la casa de su abuela. El 's va en la dueña.",
    }),
    mistake("m3g16-18", "Her mother prepared a food for the grandmother.", "a", "some", {
      en: "food is uncountable: some food, not a food.",
      es: "food no se cuenta: some food, no a food. a es para cosas que se cuentan (a basket, an apple).",
    }, DETECTIVE),
    mistake("m3g16-19", "Her mother gave she the basket.", "she", "her", {
      en: "After a verb: her, not she.",
      es: "Después del verbo va her, no she: gave her. she es solo sujeto (she gave).",
    }, DETECTIVE),
    mistake("m3g16-20", "She walked to the forest for visit her grandmother.", "for", "to", {
      en: "Purpose: to visit. Not for visit.",
      es: "Propósito con verbo: to visit. «For visit» es calco de «para visitar»; for va con sustantivos (for lunch), to con verbos (to visit).",
    }, DETECTIVE),
  ],
};
