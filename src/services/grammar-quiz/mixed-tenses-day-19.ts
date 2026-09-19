import { mc, mistake, rearrange, type GrammarQuiz } from "./types";

/**
 * BASIC 4 · Día 19 — Real Conversation Challenge (Daniel, nuevo en la ciudad).
 * Historia: Beto conoce a Daniel, el compañero nuevo, en su primer día.
 * 6 ancla · 6 transferencia · 4 repaso · 4 básicos.
 */
const DETECTIVE = "Beto escribió la conversación para practicar. Toca el error.";
const CHISME = "Daniel mezcló las tarjetas. Ordena la frase.";

export const MIXED_TENSES_DAY_19: GrammarQuiz = {
  moduleId: "mixed-tenses",
  day: 19,
  title: { en: "New in Town", es: "Nuevo en la ciudad" },
  items: [
    // ── Ancla ──────────────────────────────────────────────────────────────
    mc("m5g19-1", "Daniel: Where ___ before this? · Beto: I ___ phones at a hotel.", "Daniel: ¿Dónde trabajabas antes de esto? · Beto: Contestaba teléfonos en un hotel.", ["did you work / answered", "do you work / answer", "did you work / answer", "were you work / answered"], 0, {
      en: "before this: did you work / answered.",
      es: "before this: did you work, y la respuesta answered. Pasado.",
    }),
    mc("m5g19-2", "Daniel: ___ you ___ your new job? · Beto: Yes, I love it. Everyone ___ really friendly.", "Daniel: ¿Te gusta tu nuevo trabajo? · Beto: Sí, me encanta. Todos son muy amables.", ["Do / like / is", "Did / like / was", "Do / likes / are", "Are / like / is"], 0, {
      en: "Do you like? Everyone is (singular).",
      es: "Do you like? Y everyone is: everyone es singular.",
    }),
    mc("m5g19-3", "Daniel: What ___ this weekend? · Beto: I ___ my parents on Saturday.", "Daniel: ¿Qué vas a hacer este fin de semana? · Beto: Voy a visitar a mis papás el sábado.", ["are you doing / 'm going to visit", "did you do / visited", "do you do / visit", "are you doing / visited"], 0, {
      en: "this weekend (plan): are you doing / 'm going to visit.",
      es: "this weekend, plan: What are you doing? I'm going to visit.",
    }),
    mistake("m5g19-4", "Did you moved here recently?", "moved", "move", {
      en: "Did + base form: Did you move?",
      es: "Did + forma base: Did you move?",
    }, DETECTIVE),
    mistake("m5g19-5", "Yes, I moved two months ago. I'm still explore the city.", "explore", "exploring", {
      en: "I'm still exploring: present progressive.",
      es: "I'm still exploring: presente progresivo, -ing.",
    }, DETECTIVE),
    rearrange(
      "m5g19-6",
      ["at a hotel", "I", "phones", "answered"],
      ["I", "answered", "phones", "at a hotel"],
      { en: "Subject + answered + object + place.", es: "Sujeto + answered + objeto + lugar." },
      CHISME,
    ),

    // ── Transferencia ──────────────────────────────────────────────────────
    mc("m5g19-7", "Beto: Where ___ Daniel ___ before? · Kat: He ___ at a bank in Santa Ana.", "Beto: ¿Dónde trabajaba Daniel antes? · Kat: Trabajaba en un banco en Santa Ana.", ["did / work / worked", "does / work / works", "did / worked / worked", "was / work / worked"], 0, {
      en: "before: did he work / worked.",
      es: "before: Where did Daniel work? He worked.",
    }),
    mc("m5g19-8", "Kat: ___ Daniel ___ the city? · Beto: Yes, he ___. He says it's big but friendly.", "Kat: ¿A Daniel le gusta la ciudad? · Beto: Sí. Dice que es grande pero amable.", ["Does / like / does", "Do / like / do", "Does / likes / does", "Did / like / did"], 0, {
      en: "Does Daniel like? Yes, he does.",
      es: "Does Daniel like? Yes, he does. Tercera persona en presente.",
    }),
    mc("m5g19-9", "Beto: What ___ Daniel ___ this weekend? · Kat: He ___ the old town.", "Beto: ¿Qué va a hacer Daniel este fin de semana? · Kat: Va a visitar el centro histórico.", ["is / doing / is going to visit", "does / do / visits", "did / do / visited", "is / do / visits"], 0, {
      en: "this weekend: What is Daniel doing? He is going to visit.",
      es: "this weekend: What is Daniel doing? He is going to visit. Plan en tercera persona.",
    }),
    mistake("m5g19-10", "Daniel move here two months ago.", "move", "moved", {
      en: "two months ago: moved.",
      es: "two months ago: moved, pasado.",
    }, DETECTIVE),
    rearrange(
      "m5g19-11",
      ["recently?", "Did", "move", "Daniel", "here"],
      ["Did", "Daniel", "move", "here", "recently?"],
      { en: "Did + subject + base verb + here + recently.", es: "Did + sujeto + verbo base + here + recently." },
      CHISME,
    ),
    rearrange(
      "m5g19-12",
      ["his parents", "is going to", "on Saturday", "visit", "Beto"],
      ["Beto", "is going to", "visit", "his parents", "on Saturday"],
      { en: "Subject + is going to + verb + object + when.", es: "Sujeto + is going to + verbo + objeto + cuándo." },
      CHISME,
    ),

    // ── Repaso ─────────────────────────────────────────────────────────────
    mc("m5g19-13", "Daniel: What ___ you ___ when I came in? · Beto: I was checking emails.", "Daniel: ¿Qué estabas haciendo cuando entré? · Beto: Estaba revisando correos.", ["were / doing", "did / doing", "do / do", "are / doing"], 0, {
      en: "when I came in, in progress: were you doing.",
      es: "when I came in, en progreso: were you doing. Repaso de Basic 3.",
    }),
    mc("m5g19-14", "Beto: I ___ this city at first, but now I love it.", "Beto: Al principio no me gustaba esta ciudad, pero ahora me encanta.", ["didn't like", "don't like", "didn't liked", "not liked"], 0, {
      en: "at first (past): didn't like.",
      es: "at first, pasado: didn't like. Repaso de Basic 3.",
    }),
    mistake("m5g19-15", "Daniel don't know the city yet.", "don't", "doesn't", {
      en: "Daniel = he: doesn't.",
      es: "Daniel = he: doesn't. Repaso de Basic 2.",
    }, DETECTIVE),
    mistake("m5g19-16", "I think Daniel will likes the old town.", "likes", "like", {
      en: "will + base verb: will like.",
      es: "will + verbo base: will like, sin -s. Repaso de Basic 1.",
    }, DETECTIVE),

    // ── Básicos ────────────────────────────────────────────────────────────
    mc("m5g19-17", "I answered phones ___ a hotel ___ the beach, ___ La Libertad.", "Contestaba teléfonos en un hotel en la playa, en La Libertad.", ["at / on / in", "in / in / at", "at / at / on", "on / in / in"], 0, {
      en: "at a hotel, on the beach, in La Libertad.",
      es: "at a hotel: lugar de trabajo. on the beach: sobre la playa. in La Libertad: dentro del lugar.",
    }),
    mc("m5g19-18", "Nice to meet you. ___ name is Daniel. What's ___ name?", "Mucho gusto. Me llamo Daniel. ¿Cómo te llamas?", ["My / your", "Me / you", "Mine / yours", "My / you"], 0, {
      en: "my name, your name.",
      es: "my name, your name. Posesivos antes del sustantivo.",
    }),
    mistake("m5g19-19", "Everyone in the office are really friendly.", "are", "is", {
      en: "everyone is singular.",
      es: "everyone es singular: is. Aunque hable de muchas personas.",
    }, DETECTIVE),
    mistake("m5g19-20", "I moved here two months ago and I am still exploring the city with my wife and my two childrens every weekend.", "childrens", "children", {
      en: "children is already plural.",
      es: "children ya es plural: nunca childrens.",
    }, DETECTIVE),
  ],
};
