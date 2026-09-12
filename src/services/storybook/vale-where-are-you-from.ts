import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/vale-ep6/cover.jpg";
import s1 from "@/assets/storybook/vale-ep6/s1.jpg";
import s2 from "@/assets/storybook/vale-ep6/s2.jpg";
import s3 from "@/assets/storybook/vale-ep6/s3.jpg";
import s4 from "@/assets/storybook/vale-ep6/s4.jpg";
import s5 from "@/assets/storybook/vale-ep6/s5.jpg";
import s6 from "@/assets/storybook/vale-ep6/s6.jpg";
import s7 from "@/assets/storybook/vale-ep6/s7.jpg";
import s8 from "@/assets/storybook/vale-ep6/s8.jpg";
import s9 from "@/assets/storybook/vale-ep6/s9.jpg";
import s10 from "@/assets/storybook/vale-ep6/s10.jpg";

/**
 * Episode 6 — "Where are you from?" / "¿De dónde eres?"
 *
 * Basic Zero Week 2: connected self-introduction answers with "because".
 * Mindset card: "Mistakes are part of the process."
 *
 * Cast: Vale, Mateo, Kat, Dylan, Mr. Reyes (no new characters).
 */
export const VALE_WHERE_ARE_YOU_FROM: StorybookEpisode = {
  id: "vale-where-are-you-from",
  moduleId: "basic-zero",
  week: 2,
  title: "Where are you from?",
  titleEs: "¿De dónde eres?",
  episodeLabel: { en: "Episode 6", es: "Episodio 6" },
  previously: [
    { en: "Vale introduced herself in front of the whole team.", es: "Vale se presentó frente a todo el equipo." },
    { en: 'She said "I believe in myself".', es: "Ella dijo «Creo en mí misma»." },
    { en: "Mr. Reyes had one more surprise.", es: "El señor Reyes tenía una sorpresa más." },
  ],
  reviewWords: [
    { word: "team", es: "equipo" },
    { word: "turn", es: "turno" },
    { word: "believe", es: "creer" },
    { word: "awesome", es: "genial / increíble" },
    { word: "client", es: "cliente" },
    { word: "screen", es: "pantalla" },
  ],
  blurb: {
    en: "A long answer, not a short one. Vale learns to say why with \"because\".",
    es: "Una respuesta larga, no corta. Vale aprende a decir por qué con «because».",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Mr. Reyes anuncia la sorpresa al equipo.",
      text: '"The surprise is a new project," says Mr. Reyes. "International clients."',
      es: "«La sorpresa es un proyecto nuevo», dice el señor Reyes. «Clientes internacionales.»",
      speaker: "boss",
      words: [
        { word: "surprise", es: "sorpresa" },
        { word: "project", es: "proyecto" },
        { word: "international", es: "internacional" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Vale y Mateo emocionados frente a la computadora.",
      text: "Vale is excited. Mateo is excited too. This is a big opportunity.",
      es: "Vale está emocionada. Mateo también está emocionado. Esta es una gran oportunidad.",
      words: [
        { word: "excited", es: "emocionada / emocionado" },
        { word: "big", es: "grande" },
        { word: "opportunity", es: "oportunidad" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Dylan hace una pregunta en la videollamada.",
      text: '"Vale, where are you from?" asks Dylan.',
      es: "«Vale, ¿de dónde eres?», pregunta Dylan.",
      speaker: "dylan",
      words: [
        { word: "where", es: "dónde" },
        { word: "asks", es: "pregunta" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Vale responde corto y hay un silencio incómodo.",
      text: '"El Salvador." Silence. The answer is very short.',
      es: "«El Salvador.» Silencio. La respuesta es muy corta.",
      speaker: "vale",
      words: [
        { word: "silence", es: "silencio" },
        { word: "answer", es: "respuesta" },
        { word: "short", es: "corta" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Kat le explica algo a Vale en su escritorio.",
      text: '"Say more," says Kat. "Use because. Long answers sound fluent."',
      es: "«Di más», dice Kat. «Usa because. Las respuestas largas suenan fluidas.»",
      speaker: "kat",
      words: [
        { word: "more", es: "más" },
        { word: "because", es: "porque" },
        { word: "long", es: "larga" },
        { word: "fluent", es: "fluido / fluida" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Vale practica en voz baja en su escritorio.",
      text: "Vale practices in a low voice. Her first try is not perfect.",
      es: "Vale practica en voz baja. Su primer intento no es perfecto.",
      words: [
        { word: "practices", es: "practica" },
        { word: "voice", es: "voz" },
        { word: "try", es: "intento" },
        { word: "perfect", es: "perfecto" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Mateo anima a Vale con un pulgar arriba.",
      text: '"Mistakes are part of the process," says Mateo. "Try again."',
      es: "«Los errores son parte del proceso», dice Mateo. «Inténtalo otra vez.»",
      speaker: "mateo",
      words: [
        { word: "mistakes", es: "errores" },
        { word: "again", es: "otra vez" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "Vale contesta de nuevo a Dylan con confianza.",
      text: '"I am from El Salvador, and I live in San Salvador. I love my city because the people are warm."',
      es: "«Soy de El Salvador, y vivo en San Salvador. Amo mi ciudad porque la gente es cálida.»",
      speaker: "vale",
      words: [
        { word: "city", es: "ciudad" },
        { word: "people", es: "gente" },
        { word: "warm", es: "cálida / cálido" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Dylan sonríe impresionado en la pantalla.",
      text: '"Nice! You sound fluent," says Dylan. "I am from Canada because my family is here."',
      es: "«¡Qué bien! Suenas fluida», dice Dylan. «Yo soy de Canadá porque mi familia está aquí.»",
      speaker: "dylan",
      words: [
        { word: "sound", es: "sonar" },
        { word: "family", es: "familia" },
      ],
    },
    {
      id: "s10",
      image: s10,
      imageAlt: "Vale escribe una nota de color en su cuaderno.",
      text: 'Vale writes a note: "Long answers. Always because." Tomorrow: colors.',
      es: "Vale escribe una nota: «Respuestas largas. Siempre because.» Mañana: los colores.",
      words: [
        { word: "writes", es: "escribe" },
        { word: "note", es: "nota" },
        { word: "always", es: "siempre" },
        { word: "colors", es: "colores" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s5",
      questionEn: "What word says why?",
      questionEs: "¿Qué palabra dice por qué?",
      options: [
        { label: "Because", emoji: "💡" },
        { label: "Hello", emoji: "👋" },
        { label: "Please", emoji: "🙏" },
      ],
      answer: 0,
      sayIt: "I love my city because the people are warm.",
      sayItEs: "Ahora repite: «Amo mi ciudad porque la gente es cálida.»",
    },
    {
      id: "q2",
      afterScene: "s8",
      questionEn: "Where does Vale live?",
      questionEs: "¿Dónde vive Vale?",
      options: [
        { label: "San Salvador", emoji: "🇸🇻" },
        { label: "Toronto", emoji: "🇨🇦" },
        { label: "Antigua", emoji: "🇬🇹" },
      ],
      answer: 0,
      sayIt: "I live in…, and I love my city because…",
      sayItEs: "Ahora di el tuyo: «Vivo en…, y amo mi ciudad porque…»",
    },
    {
      id: "q3",
      afterScene: "s9",
      questionEn: "How is Vale's answer now?",
      questionEs: "¿Cómo es la respuesta de Vale ahora?",
      options: [
        { label: "Long and fluent", emoji: "🗣️" },
        { label: "Short", emoji: "🤐" },
        { label: "Angry", emoji: "😠" },
      ],
      answer: 0,
      sayIt: "My answers are long and fluent.",
      sayItEs: "Ahora repite: «Mis respuestas son largas y fluidas.»",
    },
  ],
  mindsetCard: {
    afterScene: "s7",
    phrase: "Mistakes are part of the process. I try again.",
    es: "Los errores son parte del proceso. Lo intento otra vez.",
  },
  continuePrompt: {
    en: "Now answer Dylan with a long answer. Use because at least one time.",
    es: "Ahora contéstale a Dylan con una respuesta larga. Usa because al menos una vez.",
  },
  continueWith: [
    "I am from…",
    "I live in…",
    "I love my city because…",
    "My family is…",
    "I am happy because…",
  ],
  cliffhanger: {
    en: "To be continued… Episode 7: My favorite color.",
    es: "Continuará… Episodio 7: Mi color favorito.",
  },
};
