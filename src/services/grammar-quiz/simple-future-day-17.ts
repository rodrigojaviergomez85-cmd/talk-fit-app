import { mc, mistake, rearrange, type GrammarQuiz } from "./types";

/**
 * BASIC 1 · Día 17 — My weekend: planes (going to) + sorpresas (if …, I'll).
 * 8 ancla · 4 transferencia · 4 repaso · 4 básicos.
 */
const DETECTIVE = "Lucía escribió su fin de semana con sorpresas. Toca la palabra equivocada.";
const CHISME = "Lucía dijo la frase en desorden. Ordénala.";

export const SIMPLE_FUTURE_DAY_17: GrammarQuiz = {
  moduleId: "simple-future",
  day: 17,
  title: { en: "Plans and Surprises", es: "Planes y sorpresas" },
  items: [
    // ── Ancla ──────────────────────────────────────────────────────────────
    mc("sfg17-1", "This weekend I'm going to ___ and recharge.", "Este fin de semana voy a descansar y recargar energía.", ["rest", "resting", "rests"], 0, {
      en: "going to rest.",
      es: "going to + rest, verbo solo.",
    }),
    mc("sfg17-2", "If a friend calls me, ___ go out for coffee.", "Si un amigo me llama, salgo a tomar café.", ["I'll", "I'm going to", "I go"], 0, {
      en: "if + present, I'll.",
      es: "If + presente, I'll: sorpresa → will.",
    }),
    mc("sfg17-3", "If I ___ time, I'll study English too.", "Si tengo tiempo, también estudio inglés.", ["have", "will have", "having"], 0, {
      en: "after if: present.",
      es: "Después de if va presente: if I have.",
    }),
    mc("sfg17-4", "I'm not going to ___ my work messages.", "No voy a revisar mis mensajes del trabajo.", ["check", "checking", "checks"], 0, {
      en: "not going to check.",
      es: "going to + check, verbo solo.",
    }),
    mistake("sfg17-5", "On Saturday morning I'm going to exercising at the gym.", "exercising", "exercise", {
      en: "going to exercise.",
      es: "going to + exercise, verbo solo.",
    }, DETECTIVE),
    mistake("sfg17-6", "I think it will is a calm weekend.", "is", "be", {
      en: "will be.",
      es: "will + be: forma base.",
    }, DETECTIVE),
    rearrange(
      "sfg17-7",
      ["cook something special", "On Sunday,", "I'm going to"],
      ["On Sunday,", "I'm going to", "cook something special"],
      { en: "Day + I'm going to + verb.", es: "Día + I'm going to + verbo." },
      CHISME,
    ),
    rearrange(
      "sfg17-8",
      ["tired", "On Monday,", "I won't feel"],
      ["On Monday,", "I won't feel", "tired"],
      { en: "Day + I won't + verb + adjective.", es: "Día + I won't + verbo + adjetivo." },
      CHISME,
    ),

    // ── Transferencia ──────────────────────────────────────────────────────
    mc("sfg17-9", "If Lucia has time, ___ study English too.", "Si Lucía tiene tiempo, también estudia inglés.", ["she'll", "she's going to", "she"], 0, {
      en: "if …, she'll.",
      es: "If + presente, she'll.",
    }),
    mc("sfg17-10", "If it rains, we ___ stay at home.", "Si llueve, nos quedamos en casa.", ["will", "are", "going"], 0, {
      en: "we will stay.",
      es: "If + presente, will.",
    }),
    mistake("sfg17-11", "If my friends call me, I'll going out for coffee.", "going", "go", {
      en: "I'll go out.",
      es: "will + go, verbo solo.",
    }, DETECTIVE),
    rearrange(
      "sfg17-12",
      ["If Carlos calls,", "go to the park", "we'll"],
      ["If Carlos calls,", "we'll", "go to the park"],
      { en: "If + present, we'll + verb.", es: "If + presente, we'll + verbo." },
      CHISME,
    ),

    // ── Repaso ─────────────────────────────────────────────────────────────
    mc("sfg17-13", "Oh, the doorbell! ___ open it.", "¡Ah, el timbre! Yo abro.", ["I'll", "I'm going to", "I open"], 0, {
      en: "decision now: I'll.",
      es: "Decisión del momento → I'll. Repaso del día 16.",
    }),
    mc("sfg17-14", "Lucia is 27. ___ lives in Antigua and ___ house is small.", "Lucía tiene 27. Vive en Antigua y su casa es pequeña.", ["She / her", "Her / she", "She / his"], 0, {
      en: "She lives; her house.",
      es: "she antes del verbo, her antes del sustantivo.",
    }),
    mistake("sfg17-15", "My friend Carlos are going to visit me on Sunday.", "are", "is", {
      en: "Carlos = he: is.",
      es: "Carlos → is going to.",
    }, DETECTIVE),
    mistake("sfg17-16", "Lucia have a small house in Antigua.", "have", "has", {
      en: "she has.",
      es: "Lucia = she → has.",
    }, DETECTIVE),

    // ── Básicos ────────────────────────────────────────────────────────────
    mc("sfg17-17", "___ a good coffee shop near my house.", "Hay una buena cafetería cerca de mi casa.", ["There is", "There are", "It is"], 0, {
      en: "one coffee shop: there is.",
      es: "there is: hay, una cosa.",
    }),
    mc("sfg17-18", "How ___ coffee do you drink? · Two cups a day.", "¿Cuánto café tomas? · Dos tazas al día.", ["much", "many", "long"], 0, {
      en: "How much + coffee.",
      es: "How much: coffee no se cuenta.",
    }),
    mistake("sfg17-19", "I need rest this weekend.", "need", "need to", {
      en: "need to rest.",
      es: "need to + verbo.",
    }, DETECTIVE),
    mistake("sfg17-20", "The coffee shop is close from my house.", "from", "to", {
      en: "close to my house.",
      es: "close to: cerca de.",
    }, DETECTIVE),
  ],
};
