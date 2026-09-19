import { mc, mistake, rearrange, type GrammarQuiz } from "./types";

/**
 * BASIC ZERO · Día 16 — What is his/her favorite food? favorite color? · body parts.
 * (Semana 4, día 1: FOOD // BODY PARTS)
 * 8 ancla · 6 transferencia · 4 repaso · 2 trampas.
 */
const DETECTIVE = "Paola escribió sobre su papá. Toca la palabra equivocada.";
const CHISME = "Paola dijo la frase en desorden. Ordénala.";

export const BASIC_ZERO_DAY_16: GrammarQuiz = {
  moduleId: "basic-zero",
  day: 16,
  title: { en: "His Favorite Food", es: "Su comida favorita" },
  items: [
    // ── Ancla ──────────────────────────────────────────────────────────────
    mc("bzg16-1", "This is my father. ___ favorite food is rice and beans.", "Este es mi papá. Su comida favorita es arroz con frijoles.", ["His", "Her", "He"], 0, {
      en: "father → his favorite food.",
      es: "father → His favorite food.",
    }),
    mc("bzg16-2", "What ___ his favorite color? · It is green.", "¿Cuál es su color favorito? · Es el verde.", ["is", "are", "does"], 0, {
      en: "What is his favorite color?",
      es: "favorite color → is.",
    }),
    mc("bzg16-3", "My mother's favorite food ___ pancakes.", "La comida favorita de mi mamá son los panqueques.", ["is", "are", "am"], 0, {
      en: "food is singular: is.",
      es: "El sujeto es food → is, aunque pancakes sea plural.",
    }),
    mc("bzg16-4", "He has two ___ and two ___.", "Tiene dos brazos y dos piernas.", ["arms / legs", "arm / leg", "arms / leg"], 0, {
      en: "two arms, two legs: plural.",
      es: "two arms, two legs: con two, plural.",
    }),
    mistake("bzg16-5", "This is my mother. His favorite color is blue.", "His", "Her", {
      en: "mother → her.",
      es: "mother → Her favorite color.",
    }, DETECTIVE),
    mistake("bzg16-6", "What are his favorite food?", "are", "is", {
      en: "favorite food is.",
      es: "favorite food → is.",
    }, DETECTIVE),
    rearrange(
      "bzg16-7",
      ["is", "His favorite food", "pizza"],
      ["His favorite food", "is", "pizza"],
      { en: "His favorite food + is + food.", es: "His favorite food + is + comida." },
      CHISME,
    ),
    rearrange(
      "bzg16-8",
      ["her favorite color?", "What", "is"],
      ["What", "is", "her favorite color?"],
      { en: "What + is + her favorite color?", es: "What + is + her favorite color?" },
      CHISME,
    ),

    // ── Transferencia ──────────────────────────────────────────────────────
    mc("bzg16-9", "What is your ___ favorite food? · Their favorite food is tacos.", "¿Cuál es la comida favorita de tus papás? · Su comida favorita son los tacos.", ["parents'", "parents", "parent"], 0, {
      en: "your parents' favorite food.",
      es: "your parents' favorite food: de tus papás, con apóstrofo después de la s.",
    }),
    mc("bzg16-10", "Is her favorite color red? · No, it ___. It is pink.", "¿Su color favorito es el rojo? · No. Es el rosado.", ["isn't", "aren't", "not"], 0, {
      en: "No, it isn't.",
      es: "color = it → isn't.",
    }),
    mc("bzg16-11", "One foot, two ___.", "Un pie, dos pies.", ["feet", "foots", "feets"], 0, {
      en: "foot → feet.",
      es: "foot → feet. Sin -s.",
    }),
    mistake("bzg16-12", "My brother's favorite food are pupusas.", "are", "is", {
      en: "food → is.",
      es: "food → is, singular.",
    }, DETECTIVE),
    rearrange(
      "bzg16-13",
      ["ice cream", "is", "Her favorite food"],
      ["Her favorite food", "is", "ice cream"],
      { en: "Her favorite food + is + food.", es: "Her favorite food + is + comida." },
      CHISME,
    ),
    rearrange(
      "bzg16-14",
      ["two", "He has", "arms"],
      ["He has", "two", "arms"],
      { en: "He has + number + plural noun.", es: "He has + número + sustantivo plural." },
      CHISME,
    ),

    // ── Repaso ─────────────────────────────────────────────────────────────
    mc("bzg16-15", "My father is ___ engineer and he is ___ hardworking person.", "Mi papá es ingeniero y es una persona trabajadora.", ["an / a", "a / a", "an / an"], 0, {
      en: "an engineer, a hardworking person.",
      es: "an engineer (vocal), a hardworking person (consonante).",
    }),
    mc("bzg16-16", "Is your father funny? · Yes, ___.", "¿Tu papá es gracioso? · Sí.", ["he is", "he's", "is"], 0, {
      en: "Yes, he is.",
      es: "Yes, he is, sin acortar.",
    }),
    mistake("bzg16-17", "My father have 58 years old.", "have", "is", {
      en: "He is 58.",
      es: "My father is 58 years old.",
    }, DETECTIVE),
    mistake("bzg16-18", "The car is my father's. The car is her.", "her.", "his.", {
      en: "father → his.",
      es: "father → The car is his. Al final va his, no her.",
    }, DETECTIVE),

    // ── Trampas ────────────────────────────────────────────────────────────
    mc("bzg16-19", "His favorite food is ___.", "Su comida favorita es el pollo.", ["chicken", "the chicken", "a chicken"], 0, {
      en: "chicken, no article, for food in general.",
      es: "chicken, sin the ni a: comida en general va sin artículo. «The chicken» es calco de «el pollo».",
    }),
    mistake("bzg16-20", "My father has brown eyes and one big noses on his face.", "noses", "nose", {
      en: "one nose: singular.",
      es: "one nose: una nariz, singular. La -s solo va con dos o más (eyes, arms).",
    }, DETECTIVE),
  ],
};
