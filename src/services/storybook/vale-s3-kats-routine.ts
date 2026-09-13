import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/vale-s3-ep2/cover.jpg";
import s1 from "@/assets/storybook/vale-s3-ep2/s1.jpg";
import s2 from "@/assets/storybook/vale-s3-ep2/s2.jpg";
import s3 from "@/assets/storybook/vale-s3-ep2/s3.jpg";
import s4 from "@/assets/storybook/vale-s3-ep2/s4.jpg";
import s5 from "@/assets/storybook/vale-s3-ep2/s5.jpg";
import s6 from "@/assets/storybook/vale-s3-ep2/s6.jpg";
import s7 from "@/assets/storybook/vale-s3-ep2/s7.jpg";
import s8 from "@/assets/storybook/vale-s3-ep2/s8.jpg";
import s9 from "@/assets/storybook/vale-s3-ep2/s9.jpg";
import s10 from "@/assets/storybook/vale-s3-ep2/s10.jpg";

/**
 * Season 3 · Episode 2 — "Kat's routine".
 * Matches Basic 2 / Simple Present Week 1 Day 2: third-person routines (he / she / -s).
 */
export const VALE_S3_KATS_ROUTINE: StorybookEpisode = {
  id: "vale-s3-kats-routine",
  moduleId: "simple-present",
  week: 1,
  title: "Kat's routine",
  titleEs: "La rutina de Kat",
  episodeLabel: { en: "Season 3 · Episode 2", es: "Temporada 3 · Episodio 2" },
  previously: [
    { en: "Vale showed her new daily routine.", es: "Vale mostró su nueva rutina diaria." },
    { en: "She wakes up at six, starts at eight and finishes at four.", es: "Ella se despierta a las seis, empieza a las ocho y termina a las cuatro." },
  ],
  reviewWords: [
    { word: "routine", es: "rutina" },
    { word: "schedule", es: "horario" },
    { word: "starts", es: "empieza" },
    { word: "finishes", es: "termina" },
  ],
  blurb: {
    en: "Kat arrives early every day. Today we learn her secret routine.",
    es: "Kat llega temprano todos los días. Hoy aprendemos su rutina secreta.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Kat llega a la oficina antes que todos.",
      text: "Kat arrives at the office at seven o'clock.",
      es: "Kat llega a la oficina a las siete en punto.",
      words: [
        { word: "arrives", es: "llega" },
        { word: "office", es: "oficina" },
        { word: "seven", es: "siete" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Kat revisa la cola de llamadas.",
      text: "First, she checks the call queue.",
      es: "Primero, ella revisa la cola de llamadas.",
      words: [
        { word: "First", es: "primero" },
        { word: "checks", es: "revisa" },
        { word: "call", es: "llamada" },
        { word: "queue", es: "cola" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Kat se prepara un café.",
      text: "Then she makes a strong coffee.",
      es: "Luego se prepara un café fuerte.",
      words: [
        { word: "Then", es: "luego" },
        { word: "makes", es: "prepara / hace" },
        { word: "strong", es: "fuerte" },
        { word: "coffee", es: "café" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Kat ayuda a un nuevo compañero.",
      text: "She helps the new agents before the shift starts.",
      es: "Ella ayuda a los nuevos agentes antes de que empiece el turno.",
      words: [
        { word: "helps", es: "ayuda" },
        { word: "new", es: "nuevo / nueva" },
        { word: "agents", es: "agentes" },
        { word: "before", es: "antes de" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Kat se sienta en su escritorio limpio.",
      text: "She does not eat at her desk.",
      es: "Ella no come en su escritorio.",
      words: [
        { word: "does not", es: "no" },
        { word: "desk", es: "escritorio" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Kat responde llamadas con calma.",
      text: "She answers calls with a calm voice.",
      es: "Ella responde llamadas con voz tranquila.",
      words: [
        { word: "answers", es: "responde" },
        { word: "calls", es: "llamadas" },
        { word: "calm", es: "tranquilo/a" },
        { word: "voice", es: "voz" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Kat toma su almuerzo a la una.",
      text: "She eats lunch at one o'clock.",
      es: "Ella almuerza a la una en punto.",
      words: [
        { word: "eats lunch", es: "almuerza" },
        { word: "one", es: "una" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "Kat camina a casa después del trabajo.",
      text: "At five o'clock she leaves the office.",
      es: "A las cinco en punto ella sale de la oficina.",
      words: [
        { word: "five", es: "cinco" },
        { word: "leaves", es: "sale" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Vale observa a Kat y sonríe.",
      text: "Vale says: \"Kat works hard every day.\"",
      es: "Vale dice: «Kat trabaja duro todos los días.»",
      speaker: "vale",
      words: [
        { word: "works", es: "trabaja" },
        { word: "hard", es: "duro" },
        { word: "every day", es: "todos los días" },
      ],
    },
    {
      id: "s10",
      image: s10,
      imageAlt: "Luis entra tarde a la oficina.",
      text: "But today Luis arrives late. Something is wrong.",
      es: "Pero hoy Luis llega tarde. Algo está mal.",
      words: [
        { word: "But", es: "pero" },
        { word: "late", es: "tarde" },
        { word: "wrong", es: "mal" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s2",
      questionEn: "What does Kat do first?",
      questionEs: "¿Qué hace Kat primero?",
      options: [
        { label: "She checks the call queue", emoji: "📋" },
        { label: "She eats lunch", emoji: "🍱" },
        { label: "She leaves the office", emoji: "🚪" },
      ],
      answer: 0,
      sayIt: "She checks the call queue.",
      sayItEs: "Repite: «She checks the call queue.»",
      sayItCheck: { target: "She checks the call queue" },
    },
    {
      id: "q2",
      afterScene: "s5",
      questionEn: "Does Kat eat at her desk?",
      questionEs: "¿Kat come en su escritorio?",
      options: [
        { label: "No, she doesn't", emoji: "❌" },
        { label: "Yes, she does", emoji: "✅" },
        { label: "Sometimes", emoji: "🤷" },
      ],
      answer: 0,
      sayIt: "No, she doesn't.",
      sayItEs: "Ejemplo: «No, she doesn't.»",
      sayItAskEn: "Do you eat at your desk?",
      sayItAskEs: "¿Tú comes en tu escritorio?",
      sayItCheck: {
        target: "No, I don't",
        altTargets: ["Yes, I do"],
      },
    },
    {
      id: "q3",
      afterScene: "s8",
      questionEn: "What time does Kat leave the office?",
      questionEs: "¿A qué hora sale Kat de la oficina?",
      options: [
        { label: "At five o'clock", emoji: "🕔" },
        { label: "At seven o'clock", emoji: "🕖" },
        { label: "At one o'clock", emoji: "🕐" },
      ],
      answer: 0,
      sayIt: "She leaves at five o'clock.",
      sayItEs: "Ejemplo: «She leaves at five o'clock.»",
      sayItAskEn: "What time do you leave work or school?",
      sayItAskEs: "¿A qué hora sales tú del trabajo o la escuela?",
      sayItCheck: {
        target: "I leave at *",
        altTargets: ["at *"],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s4",
    phrase: "I can do it.",
    es: "Yo puedo hacerlo.",
  },
  continuePrompt: {
    en: "Now talk about someone you admire. What does he or she do every day?",
    es: "Ahora habla de alguien que admiras. ¿Qué hace él o ella todos los días?",
  },
  continueWith: [
    "He/She wakes up at…",
    "He/She eats breakfast at…",
    "He/She starts work/school at…",
    "He/She finishes at…",
  ],
  cliffhanger: {
    en: "Episode 3: Luis is late — and the team has rules.",
    es: "Episodio 3: Luis llega tarde — y el equipo tiene reglas.",
  },
};
