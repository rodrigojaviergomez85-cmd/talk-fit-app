import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/vale-s4-ep14/cover.jpg";
import s1 from "@/assets/storybook/vale-s4-ep14/s1.jpg";
import s2 from "@/assets/storybook/vale-s4-ep14/s2.jpg";
import s3 from "@/assets/storybook/vale-s4-ep14/s3.jpg";
import s4 from "@/assets/storybook/vale-s4-ep14/s4.jpg";
import s5 from "@/assets/storybook/vale-s4-ep14/s5.jpg";
import s6 from "@/assets/storybook/vale-s4-ep14/s6.jpg";
import s7 from "@/assets/storybook/vale-s4-ep14/s7.jpg";
import s8 from "@/assets/storybook/vale-s4-ep14/s8.jpg";
import s9 from "@/assets/storybook/vale-s4-ep14/s9.jpg";
import s10 from "@/assets/storybook/vale-s4-ep14/s10.jpg";
import s11 from "@/assets/storybook/vale-s4-ep14/s11.jpg";
import s12 from "@/assets/storybook/vale-s4-ep14/s12.jpg";

/**
 * Season 4 · Episode 14 — "The interrupted plan".
 * Basic 3 / Past Stories Week 3 Day 14: past progressive interrupted, "when" clauses.
 * Luis was working when a call changed the team's day.
 */
export const VALE_S4_INTERRUPTED_PLAN: StorybookEpisode = {
  id: "vale-s4-interrupted-plan",
  moduleId: "past-stories",
  week: 3,
  title: "The interrupted plan",
  titleEs: "El plan interrumpido",
  episodeLabel: { en: "Season 4 · Episode 14", es: "Temporada 4 · Episodio 14" },
  previously: [
    { en: "Dani was practicing English on the bus.", es: "Dani estaba practicando inglés en el bus." },
    { en: "A woman heard him and smiled.", es: "Una señora lo escuchó y sonrió." },
    { en: "He arrived late with a new name.", es: "Llegó tarde con un nombre nuevo." },
  ],
  reviewWords: [
    { word: "was traveling", es: "estaba viajando" },
    { word: "quietly", es: "bajito" },
    { word: "granddaughter", es: "nieta" },
    { word: "arrived late", es: "llegó tarde" },
  ],
  blurb: {
    en: "The team was planning a party. Luis was working. Then one call stopped everything.",
    es: "El equipo estaba planeando una fiesta. Luis estaba trabajando. Luego una llamada paró todo.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Vale y Kat decoran la oficina con globos.",
      text: "At four the team was preparing a small party for Luis.",
      es: "A las cuatro el equipo estaba preparando una fiesta pequeña para Luis.",
      speaker: "vale",
      words: [
        { word: "was preparing", es: "estaba preparando" },
        { word: "small party", es: "fiesta pequeña" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Kat pone un pastel sobre la mesa de la oficina.",
      text: "Kat was hiding a cake. Vale was writing a card in English.",
      es: "Kat estaba escondiendo un pastel. Vale estaba escribiendo una tarjeta en inglés.",
      speaker: "kat",
      words: [
        { word: "was hiding", es: "estaba escondiendo" },
        { word: "cake", es: "pastel" },
        { word: "card", es: "tarjeta" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Luis atiende una llamada con audífonos en su escritorio.",
      text: "Luis wasn't looking. He was working with a difficult customer.",
      es: "Luis no estaba viendo. Estaba trabajando con un cliente difícil.",
      speaker: "luis",
      words: [
        { word: "wasn't looking", es: "no estaba viendo" },
        { word: "was working", es: "estaba trabajando" },
        { word: "difficult customer", es: "cliente difícil" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Luis escucha serio mientras habla por teléfono.",
      text: "While he was talking, his supervisor came with serious news.",
      es: "Mientras estaba hablando, su supervisor llegó con noticias serias.",
      speaker: "luis",
      words: [
        { word: "was talking", es: "estaba hablando" },
        { word: "supervisor", es: "supervisor" },
        { word: "serious news", es: "noticias serias" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "El equipo escucha en silencio en la oficina.",
      text: "The company was closing one floor. Twelve people were losing their jobs.",
      es: "La empresa estaba cerrando un piso. Doce personas estaban perdiendo su trabajo.",
      words: [
        { word: "company", es: "empresa" },
        { word: "was closing", es: "estaba cerrando" },
        { word: "floor", es: "piso" },
        { word: "were losing", es: "estaban perdiendo" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Vale guarda la tarjeta, preocupada.",
      text: "Nobody was smiling. Vale put the card in her bag.",
      es: "Nadie estaba sonriendo. Vale guardó la tarjeta en su bolso.",
      speaker: "vale",
      words: [
        { word: "Nobody", es: "nadie" },
        { word: "put", es: "guardó" },
        { word: "bag", es: "bolso" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Luis se quita los audífonos y respira.",
      text: '"Was I on the list?" Luis asked. "No," the supervisor answered. "Not you."',
      es: "«¿Yo estaba en la lista?», preguntó Luis. «No», contestó el supervisor. «Tú no».",
      speaker: "luis",
      words: [
        { word: "list", es: "lista" },
        { word: "answered", es: "contestó" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "Luis mira a sus compañeros con tristeza.",
      text: "Luis wasn't happy. Two friends of his were on that list.",
      es: "Luis no estaba feliz. Dos amigos suyos estaban en esa lista.",
      speaker: "luis",
      words: [
        { word: "friends", es: "amigos" },
        { word: "on that list", es: "en esa lista" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Vale habla con el equipo alrededor de la mesa.",
      text: '"My Saturday class is free," Vale said. "Bring them. English opens doors."',
      es: "«Mi clase de sábado es gratis», dijo Vale. «Tráelos. El inglés abre puertas».",
      speaker: "vale",
      words: [
        { word: "free", es: "gratis" },
        { word: "Bring them", es: "tráelos" },
        { word: "opens doors", es: "abre puertas" },
      ],
    },
    {
      id: "s10",
      image: s10,
      imageAlt: "Luis escribe el nombre de sus amigos en un papel.",
      text: "Luis wrote two names on a paper. His hand was shaking a little.",
      es: "Luis escribió dos nombres en un papel. Su mano estaba temblando un poco.",
      speaker: "luis",
      words: [
        { word: "wrote", es: "escribió" },
        { word: "names", es: "nombres" },
        { word: "a little", es: "un poco" },
      ],
    },
    {
      id: "s11",
      image: s11,
      imageAlt: "El equipo levanta pequeños vasos con el pastel en la mesa.",
      text: "They ate the cake anyway. Sad days also need sweet things.",
      es: "Se comieron el pastel de todos modos. Los días tristes también necesitan cosas dulces.",
      words: [
        { word: "anyway", es: "de todos modos" },
        { word: "Sad days", es: "días tristes" },
        { word: "sweet things", es: "cosas dulces" },
      ],
    },
    {
      id: "s12",
      image: s12,
      imageAlt: "Vale sale de la oficina de noche, seria y decidida.",
      text: "That night Vale wasn't sleeping. She was counting chairs for Saturday.",
      es: "Esa noche Vale no estaba durmiendo. Estaba contando sillas para el sábado.",
      words: [
        { word: "wasn't sleeping", es: "no estaba durmiendo" },
        { word: "was counting", es: "estaba contando" },
        { word: "chairs", es: "sillas" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s3",
      questionEn: "What was the team doing at four?",
      questionEs: "¿Qué estaba haciendo el equipo a las cuatro?",
      options: [
        { label: "They were preparing a party", emoji: "🎉" },
        { label: "They were sleeping", emoji: "😴" },
        { label: "They were leaving", emoji: "🚪" },
      ],
      answer: 0,
      sayIt: "They were preparing a party.",
      sayItEs: "Ejemplo: «They were preparing a party.»",
      sayItAskEn: "What were you doing at four yesterday?",
      sayItAskEs: "¿Qué estabas haciendo ayer a las cuatro?",
      sayItCheck: {
        target: "I was *",
        altTargets: ["at four I was *", "I was working", "I was studying"],
      },
    },
    {
      id: "q2",
      afterScene: "s7",
      questionEn: "What happened while Luis was talking to a customer?",
      questionEs: "¿Qué pasó mientras Luis hablaba con un cliente?",
      options: [
        { label: "His supervisor came with bad news", emoji: "📉" },
        { label: "The cake fell down", emoji: "🎂" },
        { label: "Vale started the party", emoji: "🥳" },
      ],
      answer: 0,
      sayIt: "His supervisor came with bad news.",
      sayItEs: "Ejemplo: «His supervisor came with bad news.»",
      sayItAskEn: "Why were you tired last week?",
      sayItAskEs: "¿Por qué estabas cansado la semana pasada?",
      sayItCheck: {
        target: "because I was *",
        altTargets: ["I was working *", "I was studying *", "because *"],
      },
    },
    {
      id: "q3",
      afterScene: "s10",
      questionEn: "What did Vale offer to Luis's friends?",
      questionEs: "¿Qué les ofreció Vale a los amigos de Luis?",
      options: [
        { label: "Her free Saturday class", emoji: "🧑‍🏫" },
        { label: "A new job", emoji: "💼" },
        { label: "Money", emoji: "💵" },
      ],
      answer: 0,
      sayIt: "She offered her free Saturday class.",
      sayItEs: "Ejemplo: «She offered her free class.»",
      sayItAskEn: "When were you studying English last week?",
      sayItAskEs: "¿Cuándo estabas estudiando inglés la semana pasada?",
      sayItCheck: {
        target: "I was studying *",
        altTargets: ["at night", "in the morning", "on *", "I was studying at *"],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s9",
    phrase: "I am a champion.",
    es: "Soy un campeón.",
  },
  continuePrompt: {
    en: "Your turn! Tell about a day when your plan changed. What were you doing?",
    es: "¡Tu turno! Cuenta de un día en que tu plan cambió. ¿Qué estabas haciendo?",
  },
  continueWith: [
    "I was…",
    "Then something happened:…",
    "I felt…",
    "At the end…",
  ],
  cliffhanger: {
    en: "Episode 15: The Week 3 challenge — everybody tells what they were doing.",
    es: "Episodio 15: El reto de la Semana 3: todos cuentan qué estaban haciendo.",
  },
};
