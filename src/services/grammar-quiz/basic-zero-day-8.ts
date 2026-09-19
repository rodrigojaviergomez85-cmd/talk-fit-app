import { mc, mistake, rearrange, type GrammarQuiz } from "./types";

/**
 * BASIC ZERO · Día 8 — Favorite food · verb to be review: plural subjects,
 * negative (isn't / aren't), ser y estar (I am in the class).
 * (Semana 2, día 3: FAVORITE FOOD / VERB TO BE REVIEW)
 * 10 ítems: ancla + transferencia + trampas. Aprueba con 7 de 10.
 */
const DETECTIVE = "Lucía escribió sus frases con be. Toca la palabra equivocada.";
const CHISME = "Lucía dijo la frase en desorden. Ordénala.";

export const BASIC_ZERO_DAY_8: GrammarQuiz = {
  moduleId: "basic-zero",
  day: 8,
  title: { en: "Am, Is, Are — Round Two", es: "Am, is, are — segunda vuelta" },
  passScore: 7,
  items: [
    // ── Ancla ──────────────────────────────────────────────────────────────
    mc("bzg8-1", "My favorite food ___ pizza.", "Mi comida favorita es la pizza.", ["is", "are", "am"], 0, {
      en: "My favorite food is.",
      es: "My favorite food is. Una comida → is.",
    }),
    mc("bzg8-2", "Maria and Juan ___ from Mexico.", "María y Juan son de México.", ["are", "is", "am"], 0, {
      en: "Two people: are.",
      es: "Dos personas → are.",
    }),
    mc("bzg8-3", "My family ___ big.", "Mi familia es grande.", ["is", "are", "am"], 0, {
      en: "my family = it: is.",
      es: "my family es una sola cosa → is.",
    }),
    mistake("bzg8-5", "I am in the class and you is in the office.", "is", "are", {
      en: "you are.",
      es: "you → are. Y ojo: be también es «estar»: I am in the class.",
    }, DETECTIVE),
    rearrange(
      "bzg8-7",
      ["pizza", "My favorite food", "is"],
      ["My favorite food", "is", "pizza"],
      { en: "My favorite food + is + food.", es: "My favorite food + is + comida." },
      CHISME,
    ),
    rearrange(
      "bzg8-8",
      ["from El Salvador", "are", "You and I"],
      ["You and I", "are", "from El Salvador"],
      { en: "You and I = we: are.", es: "You and I = we → are." },
      CHISME,
    ),

    // ── Transferencia ──────────────────────────────────────────────────────
    mc("bzg8-10", "I ___ not from Spain. I am from Peru.", "No soy de España. Soy de Perú.", ["am", "is", "are"], 0, {
      en: "I am not.",
      es: "I am not. El not va después de am.",
    }),
    mistake("bzg8-12", "My friends isn't here.", "isn't", "aren't", {
      en: "my friends = they: aren't.",
      es: "my friends → aren't. Plural.",
    }, DETECTIVE),

    // ── Trampas ────────────────────────────────────────────────────────────
    mc("bzg8-19", "My favorite food ___ tacos.", "Mi comida favorita son los tacos.", ["is", "are", "am"], 0, {
      en: "My favorite food is tacos. The subject is food (singular).",
      es: "My favorite food is tacos. En español decimos «son los tacos», pero en inglés el sujeto es food, singular → is.",
    }),
    mistake("bzg8-20", "My favorite food is pizza and my favorite fruits is mango.", "fruits", "fruit", {
      en: "favorite fruit, singular.",
      es: "My favorite fruit is mango: una fruta favorita, singular. Con is va fruit, no fruits.",
    }, DETECTIVE),
  ],
};
