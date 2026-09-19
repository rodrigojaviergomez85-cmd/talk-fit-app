import { mc, mistake, rearrange, type GrammarQuiz } from "./types";

/**
 * BASIC 3 · Día 15 — What Was Happening? (reto de la semana: escena + suddenly).
 * Historia del día: la lluvia en la parada del bus, contada por Kat.
 * Mezcla: 10 pasado progresivo y pasado simple · 6 repaso Basic 1 y 2
 * (going to y will para predecir, presente simple en primera y tercera
 * persona, presente progresivo) · 4 básicos (across / near / at, a / the,
 * there were).
 * 8 ancla · 8 transferencia · 4 trampas.
 */
const DETECTIVE = "Kat contó la lluvia en el chat del equipo. Toca el error antes de que lo mande.";
const CHISME = "Mateo lo contó en desorden. Ordena la frase.";

export const PAST_STORIES_DAY_15: GrammarQuiz = {
  moduleId: "past-stories",
  day: 15,
  title: { en: "Rain at the Bus Stop", es: "Lluvia en la parada del bus" },
  items: [
    // ── Ancla ──────────────────────────────────────────────────────────────
    mc("m3g15-1", "People ___ on the street when the sky turned gray.", "La gente estaba caminando por la calle cuando el cielo se puso gris.", ["were walking", "was walking", "walked walking", "walking"], 0, {
      en: "people = they: were walking.",
      es: "people es plural en inglés: were walking.",
    }),
    mc("m3g15-2", "A man ___ for the bus next to me.", "Un hombre estaba esperando el bus junto a mí.", ["was waiting", "were waiting", "waited waiting", "is waiting"], 0, {
      en: "he was waiting.",
      es: "he was waiting. wait for: esperar algo o a alguien.",
    }),
    mc("m3g15-3", "Suddenly, it ___ to rain.", "De repente, empezó a llover.", ["started", "was starting", "starts", "start"], 0, {
      en: "Suddenly = a short action: started (simple past).",
      es: "Suddenly marca la acción corta: started, pasado simple. Lo que estaba pasando iba con was; lo que pasó de golpe va sin -ing.",
    }),
    mc("m3g15-4", "Everyone ___ for cover.", "Todos corrieron a cubrirse.", ["ran", "was running", "runs", "run"], 0, {
      en: "What happened next: ran (simple past).",
      es: "Lo que pasó después: ran, pasado simple. run → ran, irregular.",
    }),
    mistake("m3g15-5", "A woman was open her umbrella.", "open", "opening", {
      en: "was + opening.",
      es: "was + opening. Con was el verbo lleva -ing.",
    }, DETECTIVE),
    mistake("m3g15-6", "Two people was talking near a store.", "was", "were", {
      en: "two people = they: were talking.",
      es: "two people = they: were talking.",
    }, DETECTIVE),
    rearrange(
      "m3g15-7",
      ["very fast", "was riding", "a bicycle", "Someone"],
      ["Someone", "was riding", "a bicycle", "very fast"],
      { en: "Subject + was riding + object + how.", es: "Sujeto + was riding + objeto + cómo." },
      CHISME,
    ),
    rearrange(
      "m3g15-8",
      ["it", "to rain", "Suddenly,", "started"],
      ["Suddenly,", "it", "started", "to rain"],
      { en: "Suddenly, + it + started + to rain.", es: "Suddenly, + it + started + to rain. Pasado simple para lo repentino." },
      CHISME,
    ),

    // ── Transferencia ──────────────────────────────────────────────────────
    mc("m3g15-9", "Kat: Look at the sky. It ___ rain again.", "Kat: Mirá el cielo. Va a llover otra vez.", ["is going to", "was going to", "will going to", "goes to"], 0, {
      en: "A prediction with evidence you can see: is going to rain.",
      es: "Una predicción con evidencia a la vista: is going to rain. Repaso de Basic 1: Look at the sky. It's going to rain soon.",
    }),
    mc("m3g15-10", "Mateo: I think the bus ___ late today.", "Mateo: Creo que el bus va a venir tarde hoy.", ["will be", "was being", "is", "be"], 0, {
      en: "I think + will: a prediction without evidence.",
      es: "I think + will: predicción sin evidencia, solo opinión. Repaso de Basic 1: I think it will rain.",
    }),
    mc("m3g15-11", "Kat: I ___ the bus every day. Luis ___ his car.", "Kat: Yo tomo el bus todos los días. Luis maneja su carro.", ["take / drives", "takes / drives", "take / drive", "took / drives"], 0, {
      en: "I take (no -s), Luis drives (-s).",
      es: "I take, sin -s; Luis drives, con -s. Primera y tercera persona en la misma frase. Repaso de Basic 2.",
    }),
    mistake("m3g15-12", "Right now it is rain again.", "rain", "raining", {
      en: "Right now: is raining.",
      es: "Right now: is raining. Presente progresivo, be + verbo con -ing. Repaso de Basic 2 semana 4.",
    }, DETECTIVE),
    mistake("m3g15-13", "The bus always arrive late when it rains.", "arrive", "arrives", {
      en: "the bus = it: arrives.",
      es: "the bus = it: arrives, con -s. Rutina en presente, tercera persona.",
    }, DETECTIVE),
    rearrange(
      "m3g15-14",
      ["across the street", "was running", "A dog", "when it started to rain"],
      ["A dog", "was running", "across the street", "when it started to rain"],
      { en: "Subject + was running + place + when + simple past.", es: "Sujeto + was running + lugar + when + pasado simple." },
      CHISME,
    ),
    rearrange(
      "m3g15-15",
      ["going to", "an umbrella", "I'm", "Tomorrow", "bring"],
      ["Tomorrow", "I'm", "going to", "bring", "an umbrella"],
      { en: "Tomorrow + I'm going to + verb + object.", es: "Tomorrow + I'm going to + verbo + objeto. Un plan, repaso de Basic 1." },
      CHISME,
    ),
    mc("m3g15-16", "___ three people at the bus stop and nobody had ___ umbrella.", "Había tres personas en la parada y nadie tenía paraguas.", ["There were / an", "There was / an", "There were / a", "It was / an"], 0, {
      en: "three people: there were. umbrella starts with a vowel sound: an.",
      es: "three people: there were, plural. umbrella empieza con sonido de vocal: an umbrella.",
    }),

    // ── Trampas ────────────────────────────────────────────────────────────
    mc("m3g15-17", "Boss: ___ you waiting for the bus when it started to rain? · Kat: Yes, I was.", "Boss: ¿Estabas esperando el bus cuando empezó a llover? · Kat: Sí.", ["Were", "Did", "Was", "Are"], 0, {
      en: "Question in the past progressive: Were you waiting ...? No Did.",
      es: "Pregunta en pasado progresivo: Were you waiting ...? Sin Did: el pasado ya está en were. Con you siempre es were, no was.",
    }),
    mistake("m3g15-18", "A man was waiting the bus next to me.", "waiting", "waiting for", {
      en: "wait for the bus.",
      es: "wait for the bus: esperar el bus. En inglés wait siempre lleva for antes de la cosa esperada.",
    }, DETECTIVE),
    mistake("m3g15-19", "Everyone was running to cover when the rain started.", "to", "for", {
      en: "run for cover.",
      es: "run for cover: correr a cubrirse. Es una expresión fija con for.",
    }, DETECTIVE),
    mistake("m3g15-20", "When it started to rain, I was run to the store.", "run", "running", {
      en: "was + running.",
      es: "was + running. Con was el verbo lleva -ing: run → running, se dobla la n.",
    }, DETECTIVE),
  ],
};
