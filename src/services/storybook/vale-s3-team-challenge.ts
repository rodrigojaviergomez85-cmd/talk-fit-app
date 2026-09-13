import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/vale-s3-ep5/cover.jpg";
import s1 from "@/assets/storybook/vale-s3-ep5/s1.jpg";
import s2 from "@/assets/storybook/vale-s3-ep5/s2.jpg";
import s3 from "@/assets/storybook/vale-s3-ep5/s3.jpg";
import s4 from "@/assets/storybook/vale-s3-ep5/s4.jpg";
import s5 from "@/assets/storybook/vale-s3-ep5/s5.jpg";
import s6 from "@/assets/storybook/vale-s3-ep5/s6.jpg";
import s7 from "@/assets/storybook/vale-s3-ep5/s7.jpg";
import s8 from "@/assets/storybook/vale-s3-ep5/s8.jpg";
import s9 from "@/assets/storybook/vale-s3-ep5/s9.jpg";
import s10 from "@/assets/storybook/vale-s3-ep5/s10.jpg";

/**
 * Season 3 · Episode 5 — "The team routine challenge".
 * Matches Basic 2 / Simple Present Week 1 Day 5: routines + review + team roles.
 * Includes natural future review: going to / will.
 */
export const VALE_S3_TEAM_CHALLENGE: StorybookEpisode = {
  id: "vale-s3-team-challenge",
  moduleId: "simple-present",
  week: 1,
  title: "The team routine challenge",
  titleEs: "El reto de la rutina del equipo",
  episodeLabel: { en: "Season 3 · Episode 5", es: "Temporada 3 · Episodio 5" },
  previously: [
    { en: "An angry customer arrived. The team asked do/does questions and solved the problem.", es: "Llegó un cliente enojado. El equipo hizo preguntas con do/does y resolvió el problema." },
    { en: "Vale helped in Spanish and the customer calmed down.", es: "Vale ayudó en español y el cliente se tranquilizó." },
  ],
  reviewWords: [
    { word: "appointment", es: "cita" },
    { word: "bill", es: "factura" },
    { word: "solution", es: "solución" },
    { word: "questions", es: "preguntas" },
  ],
  blurb: {
    en: "Vale leads the shift. Each teammate has a routine, and today the calls don't stop.",
    es: "Vale lidera el turno. Cada compañero tiene una rutina, y hoy las llamadas no paran.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Vale dirige la reunión del equipo por la mañana.",
      text: "Vale leads the morning team meeting.",
      es: "Vale dirige la reunión del equipo por la mañana.",
      speaker: "narrator",
      words: [
        { word: "leads", es: "dirige" },
        { word: "morning", es: "mañana" },
        { word: "meeting", es: "reunión" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Kat revisa la cola de llamadas a las siete.",
      text: "Kat checks the call queue at seven o'clock.",
      es: "Kat revisa la cola de llamadas a las siete en punto.",
      words: [
        { word: "checks", es: "revisa" },
        { word: "call queue", es: "cola de llamadas" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Luis contesta la primera llamada del día.",
      text: "Luis answers the first call.",
      es: "Luis contesta la primera llamada del día.",
      words: [
        { word: "answers", es: "contesta" },
        { word: "first", es: "primera" },
        { word: "call", es: "llamada" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Ana entrena a un nuevo agente con paciencia.",
      text: "Ana trains the new agent.",
      es: "Ana entrena al nuevo agente.",
      words: [
        { word: "trains", es: "entrena" },
        { word: "new", es: "nuevo" },
        { word: "agent", es: "agente" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Mr. Reyes revisa reportes a las diez.",
      text: "Mr. Reyes checks the reports at ten o'clock.",
      es: "Mr. Reyes revisa los reportes a las diez en punto.",
      speaker: "narrator",
      words: [
        { word: "reports", es: "reportes" },
        { word: "ten", es: "diez" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Todos ayudan cuando aumentan las llamadas.",
      text: "The calls increase. Everyone helps.",
      es: "Las llamadas aumentan. Todos ayudan.",
      words: [
        { word: "increase", es: "aumentan" },
        { word: "Everyone", es: "todos" },
        { word: "helps", es: "ayudan" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Vale sonríe y levanta el puño con el equipo.",
      text: "Vale says: \"We are a team.\"",
      es: "Vale dice: «Somos un equipo.»",
      speaker: "vale",
      words: [
        { word: "team", es: "equipo" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "El equipo termina el día fuerte a las cuatro.",
      text: "They finish the day strong at four o'clock.",
      es: "Terminan el día fuerte a las cuatro en punto.",
      words: [
        { word: "finish", es: "terminan" },
        { word: "strong", es: "fuerte" },
        { word: "four", es: "cuatro" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Vale mira su teléfono con una noticia importante.",
      text: "Vale looks at her phone. \"Tomorrow we are going to start earlier,\" she says.",
      es: "Vale mira su teléfono. «Mañana vamos a empezar más temprano», dice.",
      speaker: "vale",
      words: [
        { word: "Tomorrow", es: "mañana" },
        { word: "going to", es: "vamos a" },
        { word: "earlier", es: "más temprano" },
      ],
    },
    {
      id: "s10",
      image: s10,
      imageAlt: "Una llamada difícil parpadea en la pantalla de Vale.",
      text: "A difficult client will call tomorrow. Vale takes a deep breath.",
      es: "Un cliente difícil llamará mañana. Vale respira hondo.",
      words: [
        { word: "difficult", es: "difícil" },
        { word: "client", es: "cliente" },
        { word: "will call", es: "llamará" },
        { word: "deep breath", es: "respiración profunda" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s2",
      questionEn: "Who checks the call queue?",
      questionEs: "¿Quién revisa la cola de llamadas?",
      options: [
        { label: "Kat", emoji: "🙋‍♀️" },
        { label: "Luis", emoji: "👨" },
        { label: "Ana", emoji: "👩" },
      ],
      answer: 0,
      sayIt: "Kat checks the call queue.",
      sayItEs: "Repite: «Kat checks the call queue.»",
      sayItCheck: { target: "Kat checks the call queue", altTargets: ["She checks the call queue"] },
    },
    {
      id: "q2",
      afterScene: "s4",
      questionEn: "What does Ana do?",
      questionEs: "¿Qué hace Ana?",
      options: [
        { label: "She trains the new agent", emoji: "🧑‍🏫" },
        { label: "She checks reports", emoji: "📊" },
        { label: "She answers calls", emoji: "📞" },
      ],
      answer: 0,
      sayIt: "She trains the new agent.",
      sayItEs: "Ejemplo: «She trains the new agent.»",
      sayItAskEn: "What do you do at work or school?",
      sayItAskEs: "¿Qué haces tú en el trabajo o la escuela?",
      sayItCheck: {
        target: "I * at *",
        altTargets: ["I *"],
      },
    },
    {
      id: "q3",
      afterScene: "s6",
      questionEn: "Does everyone help when the calls increase?",
      questionEs: "¿Todos ayudan cuando aumentan las llamadas?",
      options: [
        { label: "Yes, they do", emoji: "✅" },
        { label: "No, they don't", emoji: "❌" },
        { label: "Only Kat helps", emoji: "🤷" },
      ],
      answer: 0,
      sayIt: "Yes, they do.",
      sayItEs: "Ejemplo: «Yes, they do.»",
      sayItAskEn: "Do your teammates help you?",
      sayItAskEs: "¿Tus compañeros te ayudan?",
      sayItCheck: {
        target: "Yes, they do",
        altTargets: ["No, they don't", "yes", "no"],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s7",
    phrase: "I am a champion.",
    es: "Yo soy campeón/campeona.",
  },
  continuePrompt: {
    en: "Now describe your team or family. Who does what? Example: My mom cooks. My dad drives. My friend helps me with English.",
    es: "Ahora describe tu equipo o familia. ¿Quién hace qué? Ejemplo: Mi mamá cocina. Mi papá maneja. Mi amigo/a me ayuda con inglés.",
  },
  continueWith: [
    "My mom/dad * at…",
    "My friend * me with…",
    "We are a team.",
    "I am a champion.",
  ],
  cliffhanger: {
    en: "Episode 6: A difficult client calls. Will Vale find the right words?",
    es: "Episodio 6: Un cliente difícil llama. ¿Encontrará Vale las palabras correctas?",
  },
};
