import { mc, mistake, rearrange, type GrammarQuiz } from "./types";

/**
 * BASIC 3 · Día 8 — What Didn't Happen? (didn't · contraste con don't / doesn't).
 * Historia del día: el domingo tranquilo de Luis, el que no hizo nada.
 * Mezcla: 12 pasado de la semana · 5 repaso Basic 2 (doesn't, don't, rutina con -s)
 * · 3 básicos (at home / on Sunday, those, sleep well)
 * · organizados en 8 ancla, 8 transferencia, 4 trampas.
 */
const DETECTIVE = "Luis le escribió esto al Boss. Toca el error antes de que lo mande.";
const CHISME = "Ana lo contó en desorden. Ordena la frase.";

export const PAST_STORIES_DAY_8: GrammarQuiz = {
  moduleId: "past-stories",
  day: 8,
  title: { en: "What Luis Didn't Do", es: "Lo que Luis no hizo" },
  items: [
    // ── Ancla ──────────────────────────────────────────────────────────────
    mc("m3g8-1", "Yesterday Luis ___ go to the gym.", "Ayer Luis no fue al gimnasio.", ["don't", "doesn't", "didn't", "not"], 2, {
      en: "Negative past: didn't.",
      es: "Negativo en pasado: didn't. don't y doesn't son presente.",
    }),
    mc("m3g8-2", "He ate breakfast, but he ___ lunch.", "Desayunó, pero no almorzó.", ["didn't eat", "didn't ate", "doesn't eat", "no ate"], 0, {
      en: "didn't + base verb: didn't eat.",
      es: "didn't + verbo base: didn't eat. El pasado ya está en didn't.",
    }),
    mc("m3g8-3", "His sister ___ in the morning, but she ___ in the afternoon.", "Su hermana trabajó en la mañana, pero no trabajó en la tarde.", ["worked / didn't work", "work / didn't work", "worked / didn't worked", "works / didn't work"], 0, {
      en: "worked (affirmative) / didn't work (negative, base form).",
      es: "worked en afirmativo, didn't work en negativo. Después de didn't el verbo vuelve a la base.",
    }),
    mc("m3g8-4", "They ___ a movie at home. They didn't watch the news.", "Vieron una película en casa. No vieron las noticias.", ["watch", "watched", "watches", "watching"], 1, {
      en: "watch + ed = watched.",
      es: "watch + ed = watched. Regular.",
    }),
    mistake("m3g8-5", "Luis didn't went to the gym yesterday.", "went", "go", {
      en: "After didn't, base form: didn't go.",
      es: "Después de didn't el verbo va en forma base: didn't go.",
    }, DETECTIVE),
    mistake("m3g8-6", "Overall, it were a quiet day.", "were", "was", {
      en: "it was.",
      es: "it was. were es para you, we, they.",
    }, DETECTIVE),
    rearrange(
      "m3g8-7",
      ["to the gym", "didn't", "Luis", "yesterday", "go"],
      ["Luis", "didn't", "go", "to the gym", "yesterday"],
      { en: "Subject + didn't + base verb + place + time.", es: "Sujeto + didn't + verbo base + lugar + tiempo." },
      CHISME,
    ),
    rearrange(
      "m3g8-8",
      ["a movie", "We", "at home", "watched"],
      ["We", "watched", "a movie", "at home"],
      { en: "Subject + verb + object + place.", es: "Sujeto + verbo + objeto + lugar." },
      CHISME,
    ),

    // ── Transferencia ──────────────────────────────────────────────────────
    mc("m3g8-9", "Every day Luis ___ at seven, but yesterday he ___ at nine.", "Todos los días Luis se levanta a las siete, pero ayer se levantó a las nueve.", ["gets up / got up", "get up / got up", "gets up / get up", "got up / gets up"], 0, {
      en: "Every day = gets up (routine). Yesterday = got up (past).",
      es: "Every day es rutina: gets up, con -s. Yesterday es pasado: got up. Las dos ideas viven en la misma frase.",
    }),
    mc("m3g8-10", "Luis ___ coffee. He never drinks it.", "A Luis no le gusta el café. Nunca lo toma.", ["doesn't like", "don't like", "didn't like", "no like"], 0, {
      en: "A general fact about him: doesn't like (present).",
      es: "Es un hecho de siempre, no de ayer: doesn't like (presente). didn't like sería solo ayer.",
    }),
    mc("m3g8-11", "His sister ___ TV. She didn't watch the movie either.", "Su hermana no ve tele. Tampoco vio la película.", ["doesn't watch", "don't watch", "didn't watched", "not watch"], 0, {
      en: "Habit: she doesn't watch TV.",
      es: "Hábito: she doesn't watch TV. La segunda frase sí es ayer: didn't watch.",
    }),
    mistake("m3g8-12", "Luis don't work on Sundays.", "don't", "doesn't", {
      en: "he doesn't.",
      es: "he doesn't. don't es para I, you, we, they. Repaso de Basic 2.",
    }, DETECTIVE),
    mistake("m3g8-13", "Yesterday he didn't answered his phone.", "answered", "answer", {
      en: "didn't + base form: didn't answer.",
      es: "didn't + forma base: didn't answer. Con didn't el verbo pierde la -ed.",
    }, DETECTIVE),
    rearrange(
      "m3g8-14",
      ["eat", "His sister", "meat", "doesn't"],
      ["His sister", "doesn't", "eat", "meat"],
      { en: "Present habit: subject + doesn't + base verb.", es: "Hábito en presente: sujeto + doesn't + verbo base. Esto no es ayer, es siempre." },
      CHISME,
    ),
    rearrange(
      "m3g8-15",
      ["the news", "didn't", "last night", "watch", "They"],
      ["They", "didn't", "watch", "the news", "last night"],
      { en: "Subject + didn't + base verb + object + time.", es: "Sujeto + didn't + verbo base + objeto + tiempo." },
      CHISME,
    ),
    mc("m3g8-16", "Luis stayed ___ home ___ Sunday.", "Luis se quedó en casa el domingo.", ["at / on", "in / on", "at / in", "on / at"], 0, {
      en: "at home, on Sunday.",
      es: "at home (en casa) y on Sunday (el domingo). Dos preposiciones que el español no distingue.",
    }),

    // ── Trampas ────────────────────────────────────────────────────────────
    mc("m3g8-17", "Luis: I ___ the gym yesterday. I was too tired.", "Luis: No fui al gimnasio ayer. Estaba muy cansado.", ["didn't go to", "didn't went to", "don't go to", "no went to"], 0, {
      en: "didn't go to. Not didn't went, not no went.",
      es: "didn't go to. Ni didn't went (doble pasado) ni no went (calco de «no fui»).",
    }),
    mistake("m3g8-18", "He didn't do nothing yesterday.", "nothing", "anything", {
      en: "One negative only: didn't do anything.",
      es: "Solo un negativo: didn't do anything. «No hizo nada» en inglés no repite el no.",
    }, DETECTIVE),
    mistake("m3g8-19", "That shoes are new. He bought them on Friday.", "That", "Those", {
      en: "shoes is plural: those shoes.",
      es: "shoes es plural: those shoes. that es para una sola cosa.",
    }, DETECTIVE),
    mistake("m3g8-20", "Luis didn't sleep good last night.", "good", "well", {
      en: "sleep well. good describes things, well describes actions.",
      es: "sleep well. good describe cosas (a good day); well describe cómo se hace algo (sleep well, work well).",
    }, DETECTIVE),
  ],
};
