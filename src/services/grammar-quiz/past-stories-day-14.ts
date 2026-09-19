import { mc, mistake, rearrange, type GrammarQuiz } from "./types";

/**
 * BASIC 3 · Día 14 — When Something Happened (was doing ... when ... did).
 * Historia del día: la noche en que se fue la luz en el barrio.
 * Mezcla: 10 pasado progresivo + when · 6 repaso Basic 1 y 2 (will en primera
 * y tercera persona, presente simple con -s, don't) · 4 básicos (at / in,
 * this / that, went out).
 * 8 ancla · 8 transferencia · 4 trampas.
 */
const DETECTIVE = "Ana escribió lo que pasó en el chat del barrio. Toca el error antes de que lo mande.";
const CHISME = "Luis lo contó en desorden. Ordena la frase.";

export const PAST_STORIES_DAY_14: GrammarQuiz = {
  moduleId: "past-stories",
  day: 14,
  title: { en: "The Night the Lights Went Out", es: "La noche que se fue la luz" },
  items: [
    // ── Ancla ──────────────────────────────────────────────────────────────
    mc("m3g14-1", "Ana ___ when the lights ___ out.", "Ana estaba estudiando cuando se fue la luz.", ["was studying / went", "studied / was going", "was studying / go", "studies / went"], 0, {
      en: "Long action in progress (was studying) + short action that interrupts (went out).",
      es: "Acción larga en progreso (was studying) + acción corta que interrumpe (went out). La larga con was; la corta en pasado simple.",
    }),
    mc("m3g14-2", "Luis ___ home when he ___ the accident.", "Luis iba manejando a casa cuando vio el accidente.", ["was driving / saw", "drove / was seeing", "was driving / see", "drives / saw"], 0, {
      en: "was driving (background) + saw (the moment).",
      es: "was driving es el fondo; saw es el momento. La interrupción siempre va en pasado simple.",
    }),
    mc("m3g14-3", "Kat ___ when the phone ___.", "Kat estaba cocinando cuando sonó el teléfono.", ["was cooking / rang", "cooked / rang", "was cooking / was ringing", "cooks / rang"], 0, {
      en: "was cooking + rang.",
      es: "was cooking + rang. ring → rang, irregular.",
    }),
    mc("m3g14-4", "We ___ dinner when my mom ___.", "Estábamos cenando cuando llegó mi mamá.", ["were eating / arrived", "was eating / arrived", "were eating / arrive", "ate / was arriving"], 0, {
      en: "we were eating + arrived.",
      es: "we were eating + arrived. we lleva were.",
    }),
    mistake("m3g14-5", "I was sleeping when my alarm go off.", "go", "went", {
      en: "The interruption is in the simple past: went off.",
      es: "La interrupción va en pasado simple: went off. go es presente.",
    }, DETECTIVE),
    mistake("m3g14-6", "They was playing when it started to rain.", "was", "were", {
      en: "they were playing.",
      es: "they were playing. Plural, were.",
    }, DETECTIVE),
    rearrange(
      "m3g14-7",
      ["when", "was working", "I", "my friend called"],
      ["I", "was working", "when", "my friend called"],
      { en: "was doing + when + simple past.", es: "was doing + when + pasado simple. Primero el fondo, luego la interrupción." },
      CHISME,
    ),
    rearrange(
      "m3g14-8",
      ["a candle", "I", "always", "keep", "in the kitchen"],
      ["I", "always", "keep", "a candle", "in the kitchen"],
      { en: "Routine with I: I always keep (no -s).", es: "Rutina con I: I always keep, sin -s. always va entre el sujeto y el verbo. Repaso de Basic 2." },
      CHISME,
    ),

    // ── Transferencia ──────────────────────────────────────────────────────
    mc("m3g14-9", "Ana: The lights are out. I ___ the electric company right now.", "Ana: No hay luz. Voy a llamar a la compañía eléctrica ahora mismo.", ["will call", "called", "was calling", "call"], 0, {
      en: "A decision at the moment: I'll call.",
      es: "Una decisión en el momento: I'll call. Repaso de Basic 1: The phone is ringing. I'll answer it.",
    }),
    mc("m3g14-10", "Luis: Don't worry. The lights ___ back in an hour.", "Luis: Tranquila. La luz va a volver en una hora.", ["will come", "came", "were coming", "come"], 0, {
      en: "A prediction: will come back.",
      es: "Una predicción: will come back. Repaso de Basic 1: I think it will rain.",
    }),
    mc("m3g14-11", "Mateo ___ video games every night, so when the lights went out, he ___.", "Mateo juega videojuegos todas las noches, así que cuando se fue la luz, estaba jugando.", ["plays / was playing", "play / was playing", "plays / played", "played / plays"], 0, {
      en: "Every night: plays (routine). When the lights went out: was playing (in progress).",
      es: "Every night: plays, con -s, rutina. When the lights went out: was playing, en progreso. Las dos en la misma frase.",
    }),
    mistake("m3g14-12", "I promise I not forget the candles next time.", "not", "won't", {
      en: "A promise: I won't forget.",
      es: "Una promesa: I won't forget. «I not forget» es calco de «no olvido». Repaso de Basic 1: Don't worry, I won't forget.",
    }, DETECTIVE),
    mistake("m3g14-13", "Kat was talking on the phone when the call drop suddenly.", "drop", "dropped", {
      en: "The interruption: dropped (simple past).",
      es: "La interrupción: dropped, en pasado simple. drop + ped, se dobla la p.",
    }, DETECTIVE),
    rearrange(
      "m3g14-14",
      ["when", "was studying", "the lights went out", "My sister"],
      ["My sister", "was studying", "when", "the lights went out"],
      { en: "Subject + was doing + when + what happened.", es: "Sujeto + was doing + when + lo que pasó." },
      CHISME,
    ),
    rearrange(
      "m3g14-15",
      ["the candles", "I'll", "bring"],
      ["I'll", "bring", "the candles"],
      { en: "A decision now: I'll + base verb.", es: "Una decisión ahora: I'll + verbo base. Repaso de Basic 1." },
      CHISME,
    ),
    mc("m3g14-16", "The lights went out ___ nine ___ the evening.", "La luz se fue a las nueve de la noche.", ["at / in", "in / at", "on / in", "at / on"], 0, {
      en: "at nine, in the evening.",
      es: "at con la hora (at nine), in con la parte del día (in the evening).",
    }),

    // ── Trampas ────────────────────────────────────────────────────────────
    mc("m3g14-17", "Luis: What ___ when the lights went out? · Ana: I was studying.", "Luis: ¿Qué estabas haciendo cuando se fue la luz? · Ana: Estaba estudiando.", ["were you doing", "did you doing", "you were doing", "were you did"], 0, {
      en: "were + you + doing.",
      es: "were + you + doing. El were va antes de you. Sin did: el pasado ya está en were.",
    }),
    mistake("m3g14-18", "I was cooking while the phone rang.", "while", "when", {
      en: "A short interruption uses when: I was cooking when the phone rang.",
      es: "Una interrupción corta va con when: I was cooking when the phone rang. while es para dos acciones largas al mismo tiempo (while I was cooking, he was watching TV).",
    }, DETECTIVE),
    mistake("m3g14-19", "Those night was terrible. I don't want another one.", "Those", "That", {
      en: "night is singular: that night.",
      es: "night es singular: that night. those es para plural (those nights).",
    }, DETECTIVE),
    mistake("m3g14-20", "My dad don't like the dark.", "don't", "doesn't", {
      en: "my dad = he: doesn't.",
      es: "my dad = he: doesn't. Repaso de Basic 2.",
    }, DETECTIVE),
  ],
};
