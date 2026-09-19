import { mc, mistake, rearrange, type GrammarQuiz } from "./types";

/**
 * BASIC 3 · Día 19 — Grandmother's House (knocked, went inside, noticed,
 * understood, heard, helped · suddenly, finally).
 * Historia del día: la casa de la abuela, con Ana leyendo el final.
 * Mezcla: 10 pasado del cuento · 5 repaso Basic 1 y 2 (will en primera
 * persona para decidir, presente simple en primera y tercera persona,
 * presente progresivo) · 5 básicos (posesivo 's, these / those, a / the, in / into).
 * 8 ancla · 8 transferencia · 4 trampas.
 */
const DETECTIVE = "Ana escribió el final del cuento. Toca el error antes de que lo lea.";
const CHISME = "Ana leyó el final en desorden. Ordena la frase.";

export const PAST_STORIES_DAY_19: GrammarQuiz = {
  moduleId: "past-stories",
  day: 19,
  title: { en: "What Big Eyes You Have", es: "Qué ojos tan grandes tienes" },
  items: [
    // ── Ancla ──────────────────────────────────────────────────────────────
    mc("m3g19-1", "The wolf ___ at grandmother's house and ___ on the door.", "El lobo llegó a la casa de la abuela y tocó la puerta.", ["arrived / knocked", "arrives / knocks", "arrived / knock", "was arrive / knocked"], 0, {
      en: "Two regular verbs in the past: arrived, knocked.",
      es: "Dos verbos regulares en pasado: arrived, knocked. Los dos con -ed.",
    }),
    mc("m3g19-2", "After that, he ___ inside the house.", "Después de eso, entró a la casa.", ["went", "gone", "goes", "going"], 0, {
      en: "go → went.",
      es: "go → went. After that: el paso siguiente del cuento.",
    }),
    mc("m3g19-3", "She was talking to her grandmother when she ___ something strange.", "Estaba hablando con su abuela cuando notó algo extraño.", ["noticed", "was noticing", "notices", "notice"], 0, {
      en: "The moment of surprise: noticed (simple past).",
      es: "El momento de la sorpresa: noticed, pasado simple. Lo largo con was; lo corto sin -ing.",
    }),
    mc("m3g19-4", "Suddenly, she ___ everything.", "De repente, entendió todo.", ["understood", "understand", "understands", "understanding"], 0, {
      en: "understand → understood.",
      es: "understand → understood. Irregular; understanded no existe.",
    }),
    mistake("m3g19-5", "A woodsman hear them and helped them.", "hear", "heard", {
      en: "hear → heard.",
      es: "hear → heard. Los dos verbos en pasado: heard ... and helped.",
    }, DETECTIVE),
    mistake("m3g19-6", "Finally, the wolf ran away and everyone were safe.", "were", "was", {
      en: "everyone is singular: was safe.",
      es: "everyone es singular: was safe. Aunque sean todos, la palabra es una.",
    }, DETECTIVE),
    rearrange(
      "m3g19-7",
      ["arrived", "Little Red Riding Hood", "Later,", "too"],
      ["Later,", "Little Red Riding Hood", "arrived", "too"],
      { en: "Later, + subject + verb + too.", es: "Later, + sujeto + verbo + too. too va al final." },
      CHISME,
    ),
    rearrange(
      "m3g19-8",
      ["was safe", "everyone", "Finally,", "and", "the wolf ran away"],
      ["Finally,", "the wolf ran away", "and", "everyone", "was safe"],
      { en: "Finally, + what happened + and + how it ended.", es: "Finally, + lo que pasó + and + cómo terminó. Finally cierra el cuento." },
      CHISME,
    ),

    // ── Transferencia ──────────────────────────────────────────────────────
    mc("m3g19-9", "Little Red Riding Hood: Someone is knocking. I ___ the door.", "Caperucita: Alguien toca. Yo abro la puerta.", ["will open", "opened", "was opening", "open"], 0, {
      en: "A decision at that moment: I'll open it.",
      es: "Una decisión en el momento: I'll open. Repaso de Basic 1: Someone is at the door. I'll open it.",
    }),
    mc("m3g19-10", "Ana: I ___ this ending. My son ___ it too; he always asks for the wolf.", "Ana: Me gusta este final. A mi hijo también le gusta; siempre pide al lobo.", ["like / likes", "likes / likes", "like / like", "liked / like"], 0, {
      en: "I like (no -s), my son likes (-s).",
      es: "I like, sin -s; my son likes, con -s. Primera y tercera persona. Repaso de Basic 2.",
    }),
    mc("m3g19-11", "Ana: Right now my son ___ the same story in his room.", "Ana: Ahora mismo mi hijo está leyendo el mismo cuento en su cuarto.", ["is reading", "reads", "was reading", "read"], 0, {
      en: "Right now: is reading.",
      es: "Right now: is reading, presente progresivo. Repaso de Basic 2 semana 4.",
    }),
    mistake("m3g19-12", "The grandmother open the door every time someone knocks.", "open", "opens", {
      en: "the grandmother = she: opens.",
      es: "the grandmother = she: opens, con -s. Presente, tercera persona, hábito.",
    }, DETECTIVE),
    mistake("m3g19-13", "When she saw the big teeth, she understand the truth.", "understand", "understood", {
      en: "understand → understood.",
      es: "understand → understood. Después de when + pasado, la segunda parte también va en pasado.",
    }, DETECTIVE),
    rearrange(
      "m3g19-14",
      ["something strange", "when she noticed", "She", "was talking to her grandmother"],
      ["She", "was talking to her grandmother", "when she noticed", "something strange"],
      { en: "was doing + when + simple past + object.", es: "was doing + when + pasado simple + objeto." },
      CHISME,
    ),
    rearrange(
      "m3g19-15",
      ["the woodsman", "I'll", "call"],
      ["I'll", "call", "the woodsman"],
      { en: "A decision now: I'll + base verb.", es: "Una decisión ahora: I'll + verbo base. Repaso de Basic 1." },
      CHISME,
    ),
    mc("m3g19-16", "What big eyes you have! ___ eyes are not my ___ eyes.", "¡Qué ojos tan grandes tienes! Esos ojos no son los ojos de mi abuela.", ["Those / grandmother's", "That / grandmother's", "Those / grandmothers", "This / grandmother"], 0, {
      en: "eyes is plural: those. Possessive: my grandmother's eyes.",
      es: "eyes es plural: those. Posesivo: my grandmother's eyes. Las dos reglas en la frase más famosa del cuento.",
    }),

    // ── Trampas ────────────────────────────────────────────────────────────
    mc("m3g19-17", "The woodsman ___ them and ___ into the house.", "El leñador los oyó y entró corriendo a la casa.", ["heard / ran", "hear / run", "heard / runs", "hears / ran"], 0, {
      en: "hear → heard, run → ran. Both irregular.",
      es: "hear → heard, run → ran. Los dos irregulares, los dos en pasado.",
    }),
    mistake("m3g19-18", "She saw a wolf in the bed. A wolf was wearing grandmother's clothes.", "A", "The", {
      en: "First mention: a wolf. Second mention, the same wolf: the wolf.",
      es: "La primera vez: a wolf. La segunda vez, ya sabemos cuál: the wolf. a presenta; the señala el que ya conocemos.",
    }, DETECTIVE),
    mistake("m3g19-19", "She said the wolf: what big ears you have!", "said", "told", {
      en: "told the wolf. tell + person.",
      es: "told the wolf. Con la persona justo después va tell, no say. «Said the wolf» es calco de «le dijo al lobo».",
    }, DETECTIVE),
    mistake("m3g19-20", "This are not my grandmother's ears.", "This", "These", {
      en: "ears is plural: these ears.",
      es: "ears es plural: these. Y el verbo are ya te lo decía: are va con plural.",
    }, DETECTIVE),
  ],
};
