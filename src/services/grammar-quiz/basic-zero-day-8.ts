import { mc, mistake, rearrange, type GrammarQuiz } from "./types";

/**
 * BASIC ZERO · Día 8 — Favorite food · verb to be review: plural subjects,
 * negative (isn't / aren't), ser y estar (I am in the class).
 * (Semana 2, día 3: FAVORITE FOOD / VERB TO BE REVIEW)
 * 8 ancla · 6 transferencia · 4 repaso · 2 trampas.
 */
const DETECTIVE = "Lucía escribió sus frases con be. Toca la palabra equivocada.";
const CHISME = "Lucía dijo la frase en desorden. Ordénala.";

export const BASIC_ZERO_DAY_8: GrammarQuiz = {
  moduleId: "basic-zero",
  day: 8,
  title: { en: "Am, Is, Are — Round Two", es: "Am, is, are — segunda vuelta" },
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
    mc("bzg8-4", "Cats ___ animals.", "Los gatos son animales.", ["are", "is", "am"], 0, {
      en: "Cats (plural): are.",
      es: "cats es plural → are.",
    }),
    mistake("bzg8-5", "I am in the class and you is in the office.", "is", "are", {
      en: "you are.",
      es: "you → are. Y ojo: be también es «estar»: I am in the class.",
    }, DETECTIVE),
    mistake("bzg8-6", "People is friendly here.", "is", "are", {
      en: "people = they: are.",
      es: "people es plural en inglés → are.",
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
    mc("bzg8-9", "El Salvador and Guatemala ___ in Central America.", "El Salvador y Guatemala están en Centroamérica.", ["are", "is", "am"], 0, {
      en: "Two countries: are. (be = estar, too.)",
      es: "Dos países → are. Y aquí be es «estar»: están en Centroamérica.",
    }),
    mc("bzg8-10", "I ___ not from Spain. I am from Peru.", "No soy de España. Soy de Perú.", ["am", "is", "are"], 0, {
      en: "I am not.",
      es: "I am not. El not va después de am.",
    }),
    mc("bzg8-11", "Lucia ___ tired today.", "Lucía no está cansada hoy.", ["isn't", "aren't", "not is"], 0, {
      en: "isn't = is not.",
      es: "isn't = is not. Lucia = she → isn't.",
    }),
    mistake("bzg8-12", "My friends isn't here.", "isn't", "aren't", {
      en: "my friends = they: aren't.",
      es: "my friends → aren't. Plural.",
    }, DETECTIVE),
    rearrange(
      "bzg8-13",
      ["not", "from Spain", "I am"],
      ["I am", "not", "from Spain"],
      { en: "I am + not + from.", es: "I am + not + from. El not después de am." },
      CHISME,
    ),
    rearrange(
      "bzg8-14",
      ["in the office", "are", "We"],
      ["We", "are", "in the office"],
      { en: "We + are + in + place.", es: "We + are + in + lugar. be = estar." },
      CHISME,
    ),

    // ── Repaso ─────────────────────────────────────────────────────────────
    mc("bzg8-15", "Lucia is ___ doctor and Sofia is ___ engineer.", "Lucía es doctora y Sofía es ingeniera.", ["a / an", "an / a", "a / a"], 0, {
      en: "a doctor, an engineer.",
      es: "a doctor (consonante), an engineer (vocal).",
    }),
    mc("bzg8-16", "My birthday is ___ September.", "Mi cumpleaños es en septiembre.", ["in", "on", "at"], 0, {
      en: "in + month.",
      es: "in con el mes.",
    }),
    mistake("bzg8-17", "I have 31 years old.", "have", "am", {
      en: "I am 31.",
      es: "I am 31 years old.",
    }, DETECTIVE),
    mistake("bzg8-18", "Where is you from?", "is", "are", {
      en: "Where are you from?",
      es: "you → are.",
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
