import { mc, mistake, rearrange, type GrammarQuiz } from "./types";

/**
 * BASIC ZERO · Día 17 — What is his/her favorite fruit? · fruits · find the mistake.
 * (Semana 4, día 2: WHAT IS HIS FAVORITE FRUIT / FIND THE MISTAKE)
 * 10 ítems: ancla + transferencia + trampas. Aprueba con 7 de 10.
 */
const DETECTIVE = "Camila escribió sobre su amiga. Toca la palabra equivocada.";
const CHISME = "Camila dijo la frase en desorden. Ordénala.";

export const BASIC_ZERO_DAY_17: GrammarQuiz = {
  moduleId: "basic-zero",
  day: 17,
  title: { en: "Her Favorite Fruit", es: "Su fruta favorita" },
  passScore: 7,
  items: [
    // ── Ancla ──────────────────────────────────────────────────────────────
    mc("bzg17-1", "What is ___ favorite fruit? · Her favorite fruit is pineapple.", "¿Cuál es su fruta favorita (de ella)? · Su fruta favorita es la piña.", ["her", "his", "she"], 0, {
      en: "her (she).",
      es: "De ella → her favorite fruit.",
    }),
    mc("bzg17-2", "His favorite fruit ___ oranges.", "Su fruta favorita son las naranjas.", ["is", "are", "am"], 0, {
      en: "fruit is singular: is.",
      es: "El sujeto es fruit → is, aunque oranges sea plural.",
    }),
    mc("bzg17-3", "One cherry, two ___.", "Una cereza, dos cerezas.", ["cherries", "cherrys", "cherry"], 0, {
      en: "cherry → cherries (y → ies).",
      es: "cherry → cherries: la y cambia a ies.",
    }),
    mistake("bzg17-5", "This is my friend Camila. His favorite fruit is pear.", "His", "Her", {
      en: "Camila → her.",
      es: "Camila es mujer → Her favorite fruit.",
    }, DETECTIVE),
    rearrange(
      "bzg17-7",
      ["is", "pineapple", "Her favorite fruit"],
      ["Her favorite fruit", "is", "pineapple"],
      { en: "Her favorite fruit + is + fruit.", es: "Her favorite fruit + is + fruta." },
      CHISME,
    ),
    rearrange(
      "bzg17-8",
      ["his favorite fruit?", "is", "What"],
      ["What", "is", "his favorite fruit?"],
      { en: "What + is + his favorite fruit?", es: "What + is + his favorite fruit?" },
      CHISME,
    ),

    // ── Transferencia ──────────────────────────────────────────────────────
    mc("bzg17-10", "What is ___ favorite fruit? · Our favorite fruit is mango.", "¿Cuál es su fruta favorita (de ustedes)? · Nuestra fruta favorita es el mango.", ["your", "our", "their"], 0, {
      en: "your (asking you) → our (answer).",
      es: "Pregunta con your (de ustedes), respuesta con our (nuestra).",
    }),
    mistake("bzg17-12", "My cousins' favorite fruit are cherries.", "are", "is", {
      en: "fruit → is.",
      es: "fruit → is. Singular, aunque cherries sea plural.",
    }, DETECTIVE),


    // ── Trampas ────────────────────────────────────────────────────────────
    mc("bzg17-19", "I like ___ very much.", "Me gustan mucho las manzanas.", ["apples", "the apples", "apple"], 0, {
      en: "I like apples: plural, no the.",
      es: "I like apples: plural y sin the cuando hablás en general. «The apples» es calco de «las manzanas».",
    }),
    mistake("bzg17-20", "I love mangos and my sister like them too.", "like", "likes", {
      en: "my sister likes (-s).",
      es: "my sister = she → likes, con -s. love va con I sin -s; like va con my sister y necesita la -s.",
    }, DETECTIVE),
  ],
};
