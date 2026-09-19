import { mc, mistake, rearrange, type GrammarQuiz } from "./types";

/**
 * BASIC 4 · Día 16 — My Life: Past, Present & Future.
 * Historia: Luis cuenta su vida, del pueblo a la ciudad y a lo que viene.
 * 6 ancla · 6 transferencia · 4 repaso · 4 básicos.
 */
const DETECTIVE = "Luis escribió su historia para la clase. Toca el error antes de que la lea.";
const CHISME = "Kat la contó en desorden. Ordena la frase.";

export const MIXED_TENSES_DAY_16: GrammarQuiz = {
  moduleId: "mixed-tenses",
  day: 16,
  title: { en: "From the Small Town to the City", es: "Del pueblo a la ciudad" },
  items: [
    // ── Ancla ──────────────────────────────────────────────────────────────
    mc("m5g16-1", "When I ___ a kid, I ___ in a small town.", "Cuando era niño, vivía en un pueblo pequeño.", ["was / lived", "am / live", "was / live", "were / lived"], 0, {
      en: "When I was a kid: was, lived.",
      es: "When I was a kid: was, lived. Todo en pasado.",
    }),
    mc("m5g16-2", "Now, I ___ in the city. I ___ to the office every morning.", "Ahora vivo en la ciudad. Manejo a la oficina todas las mañanas.", ["live / drive", "lived / drove", "live / drove", "am living / drives"], 0, {
      en: "Now: live, drive (present, no -s for I).",
      es: "Now: live, drive. Presente, sin -s para I.",
    }),
    mc("m5g16-3", "These days, I ___ to design websites. Next year, I ___ to a quieter place.", "Estos días estoy aprendiendo a diseñar sitios web. El próximo año me voy a mudar a un lugar más tranquilo.", ["am learning / am going to move", "learn / moved", "learned / move", "am learning / moved"], 0, {
      en: "These days: am learning. Next year: am going to move.",
      es: "These days: am learning, progresivo. Next year: am going to move, plan.",
    }),
    mistake("m5g16-4", "I rided my bike everywhere when I was a kid.", "rided", "rode", {
      en: "ride → rode.",
      es: "ride → rode. Irregular; rided no existe.",
    }, DETECTIVE),
    mistake("m5g16-5", "I think I will missing the city a little.", "missing", "miss", {
      en: "will + base verb: will miss.",
      es: "will + verbo base: will miss.",
    }, DETECTIVE),
    rearrange(
      "m5g16-6",
      ["calmer and better", "is going to be", "my future", "But"],
      ["But", "my future", "is going to be", "calmer and better"],
      { en: "But + subject + is going to be + adjectives.", es: "But + sujeto + is going to be + adjetivos." },
      CHISME,
    ),

    // ── Transferencia ──────────────────────────────────────────────────────
    mc("m5g16-7", "Kat: When Luis ___ a kid, he ___ soccer every afternoon. Now he ___ on Sundays only.", "Kat: Cuando Luis era niño, jugaba fútbol todas las tardes. Ahora juega solo los domingos.", ["was / played / plays", "is / plays / played", "was / plays / plays", "were / played / plays"], 0, {
      en: "was, played (past); plays (now, -s).",
      es: "was, played, pasado; plays, ahora, con -s.",
    }),
    mc("m5g16-8", "Luis: These days my sister ___ marketing, and next year she ___ her own shop.", "Luis: Estos días mi hermana está estudiando marketing, y el próximo año va a abrir su propia tienda.", ["is studying / is going to open", "studies / opened", "studied / opens", "is studying / opened"], 0, {
      en: "These days: is studying. Next year: is going to open.",
      es: "These days: is studying. Next year: is going to open.",
    }),
    mc("m5g16-9", "Kat: ___ you ___ your bike to school when you were a kid? · Luis: Yes, every day.", "Kat: ¿Ibas en bici a la escuela cuando eras niño? · Luis: Sí, todos los días.", ["Did / ride", "Do / ride", "Did / rode", "Were / ride"], 0, {
      en: "when you were a kid: Did you ride?",
      es: "when you were a kid: Did you ride? did + base.",
    }),
    mistake("m5g16-10", "My parents still lives in the small town.", "lives", "live", {
      en: "my parents = they: live (no -s).",
      es: "my parents = they: live, sin -s. La -s es solo para he, she, it.",
    }, DETECTIVE),
    rearrange(
      "m5g16-11",
      ["in a small town", "When I was a kid,", "lived", "I"],
      ["When I was a kid,", "I", "lived", "in a small town"],
      { en: "When clause + subject + past verb + place.", es: "Cláusula con when + sujeto + verbo en pasado + lugar." },
      CHISME,
    ),
    rearrange(
      "m5g16-12",
      ["to a quieter place", "I'm going to", "Next year,", "move"],
      ["Next year,", "I'm going to", "move", "to a quieter place"],
      { en: "Time + I'm going to + verb + where.", es: "Tiempo + I'm going to + verbo + a dónde." },
      CHISME,
    ),

    // ── Repaso ─────────────────────────────────────────────────────────────
    mc("m5g16-13", "Luis: When I was a kid, I ___ to the city. I ___ it for the first time at fifteen.", "Luis: Cuando era niño, no iba a la ciudad. La vi por primera vez a los quince.", ["didn't go / saw", "don't go / see", "didn't went / saw", "didn't go / see"], 0, {
      en: "didn't go, saw: both past.",
      es: "didn't go, saw: los dos en pasado. Repaso de Basic 3.",
    }),
    mc("m5g16-14", "Kat: What ___ you ___ right now? · Luis: I'm learning to design websites.", "Kat: ¿Qué estás haciendo ahora mismo? · Luis: Estoy aprendiendo a diseñar sitios web.", ["are / doing", "do / do", "did / do", "are / do"], 0, {
      en: "right now: What are you doing?",
      es: "right now: What are you doing? Presente progresivo. Repaso de Basic 2.",
    }),
    mistake("m5g16-15", "Luis drive to the office every morning.", "drive", "drives", {
      en: "Luis = he: drives.",
      es: "Luis = he: drives, con -s. Repaso de Basic 2.",
    }, DETECTIVE),
    mistake("m5g16-16", "At six yesterday, Luis were driving home.", "were", "was", {
      en: "Luis = he: was driving.",
      es: "Luis = he: was driving. Repaso de Basic 3.",
    }, DETECTIVE),

    // ── Básicos ────────────────────────────────────────────────────────────
    mc("m5g16-17", "I lived ___ a small town, and now I live ___ the city, ___ a small apartment.", "Vivía en un pueblo pequeño, y ahora vivo en la ciudad, en un apartamento pequeño.", ["in / in / in", "at / at / at", "in / at / on", "on / in / in"], 0, {
      en: "in a town, in the city, in an apartment: all in.",
      es: "in a town, in the city, in an apartment: lugares donde uno vive, siempre in.",
    }),
    mc("m5g16-18", "When I was ___ kid, I had ___ old bike and ___ dog.", "Cuando era niño, tenía una bici vieja y un perro.", ["a / an / a", "a / a / a", "an / an / a", "the / an / the"], 0, {
      en: "a kid, an old bike (vowel sound), a dog.",
      es: "a kid, an old bike (sonido de vocal), a dog.",
    }),
    mistake("m5g16-19", "I have 28 years now and I live in the city.", "have", "am", {
      en: "Age: I am 28.",
      es: "La edad con be: I am 28. Calco de «tengo 28 años».",
    }, DETECTIVE),
    mistake("m5g16-20", "My dog was very big and it liked run in the town.", "run", "running", {
      en: "like + verb-ing: liked running.",
      es: "like + verbo con -ing: liked running (o liked to run). Nunca like + verbo base.",
    }, DETECTIVE),
  ],
};
