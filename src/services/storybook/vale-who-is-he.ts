import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/vale-ep3/cover.jpg";
import s1 from "@/assets/storybook/vale-ep3/s1.jpg";
import s2 from "@/assets/storybook/vale-ep3/s2.jpg";
import s3 from "@/assets/storybook/vale-ep3/s3.jpg";
import s4 from "@/assets/storybook/vale-ep3/s4.jpg";
import s5 from "@/assets/storybook/vale-ep3/s5.jpg";
import s6 from "@/assets/storybook/vale-ep3/s6.jpg";
import s7 from "@/assets/storybook/vale-ep3/s7.jpg";
import s8 from "@/assets/storybook/vale-ep3/s8.jpg";
import s9 from "@/assets/storybook/vale-ep3/s9.jpg";
import s10 from "@/assets/storybook/vale-ep3/s10.jpg";
import s11 from "@/assets/storybook/vale-ep3/s11.jpg";

/**
 * Episode 3 — "Who is he?" / "¿Quién es él?"
 *
 * Matches Basic Zero Week 1: self-introduction chunks (name, age, country, city,
 * favorite color, hobbies) plus a first natural exposure to third-person "Who
 * is he?". A new teammate, Mateo, models the same lines Vale already knows.
 *
 * Includes the first resilience/mindset card: "English is easy. I love
 * challenges."
 */
export const VALE_WHO_IS_HE: StorybookEpisode = {
  id: "vale-who-is-he",
  moduleId: "basic-zero",
  week: 1,
  title: "Who is he?",
  titleEs: "¿Quién es él?",
  episodeLabel: { en: "Episode 3", es: "Episodio 3" },
  previously: [
    { en: "Vale answered her first phone call in English.", es: "Vale atendió su primera llamada en inglés." },
    { en: "Kat helped Vale stay calm.", es: "Kat ayudó a Vale a mantener la calma." },
    { en: "Mr. Reyes called Vale to his office.", es: "El señor Reyes llamó a Vale a su oficina." },
  ],
  reviewWords: [
    { word: "job", es: "trabajo" },
    { word: "office", es: "oficina" },
    { word: "call", es: "llamada" },
    { word: "name", es: "nombre" },
    { word: "from", es: "de (origen)" },
    { word: "favorite", es: "favorita/o" },
    { word: "food", es: "comida" },
    { word: "hobbies", es: "pasatiempos" },
    { word: "calm", es: "calma" },
    { word: "happy", es: "feliz" },
    { word: "smile", es: "sonrisa" },
    { word: "good", es: "bueno / buena" },
  ],
  blurb: {
    en: "A new teammate arrives. Can Vale introduce herself to him?",
    es: "Llega un nuevo compañero. ¿Podrá Vale presentarse con él?",
  },
  cover,
  voice: "female",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "El señor Reyes llama a Vale a su oficina.",
      text: '"Vale, come in, please," says Mr. Reyes.',
      es: "«Vale, pasa, por favor», dice el señor Reyes.",
      speaker: "boss",
      words: [
        { word: "come", es: "ven / entrar" },
        { word: "in", es: "adentro / dentro" },
        { word: "please", es: "por favor" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Vale está nerviosa en el pasillo de la oficina.",
      text: "Vale is nervous. Her hands are cold.",
      es: "Vale está nerviosa. Sus manos están frías.",
      words: [
        { word: "nervous", es: "nerviosa" },
        { word: "hands", es: "manos" },
        { word: "cold", es: "frío / frías" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "El señor Reyes presenta a Mateo.",
      text: '"You did a great job, Vale. This is Mateo," says Mr. Reyes.',
      es: "«Hiciste un gran trabajo, Vale. Este es Mateo», dice el señor Reyes.",
      speaker: "boss",
      words: [
        { word: "did", es: "hizo" },
        { word: "great", es: "genial" },
        { word: "job", es: "trabajo" },
        { word: "this", es: "este / esta" },
        { word: "Mateo", es: "Mateo" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Mateo sonríe; es un joven de Guatemala.",
      text: "Mateo smiles. He is a young man from Guatemala.",
      es: "Mateo sonríe. Él es un joven de Guatemala.",
      words: [
        { word: "smiles", es: "sonríe" },
        { word: "young", es: "joven" },
        { word: "man", es: "hombre" },
        { word: "Guatemala", es: "Guatemala" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Mateo se presenta con Vale.",
      text: '"Hi, Vale. My name is Mateo. I am twenty years old."',
      es: "«Hola, Vale. Me llamo Mateo. Tengo veinte años.»",
      speaker: "mateo",
      words: [
        { word: "name", es: "nombre" },
        { word: "twenty", es: "veinte" },
        { word: "years", es: "años" },
        { word: "old", es: "de edad" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Mateo muestra su ciudad y su color favorito.",
      text: '"I am from Guatemala, and I live in Antigua. My favorite color is orange."',
      es: "«Soy de Guatemala, y vivo en Antigua. Mi color favorito es el naranja.»",
      speaker: "mateo",
      words: [
        { word: "live", es: "vivir" },
        { word: "Antigua", es: "Antigua" },
        { word: "favorite", es: "favorito/a" },
        { word: "color", es: "color" },
        { word: "orange", es: "naranja" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Vale abre la boca, pero se le olvida su nombre.",
      text: "Vale opens her mouth, but no words come out. She forgets her name.",
      es: "Vale abre la boca, pero no salen palabras. Se le olvida su nombre.",
      words: [
        { word: "opens", es: "abre" },
        { word: "mouth", es: "boca" },
        { word: "but", es: "pero" },
        { word: "words", es: "palabras" },
        { word: "forgets", es: "olvida" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "Mateo le dice a Vale que los errores son parte del proceso.",
      text: '"It\'s OK. Mistakes are part of the process," says Mateo.',
      es: "«Está bien. Los errores son parte del proceso», dice Mateo.",
      speaker: "mateo",
      words: [
        { word: "OK", es: "está bien" },
        { word: "mistakes", es: "errores" },
        { word: "part", es: "parte" },
        { word: "process", es: "proceso" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Vale respira profundo y se presenta con confianza.",
      text: 'Vale takes a deep breath. "My name is Vale. I am from El Salvador. I love challenges."',
      es: "Vale respira profundo. «Me llamo Vale. Soy de El Salvador. Me encantan los retos.»",
      speaker: "vale",
      words: [
        { word: "deep", es: "profundo" },
        { word: "breath", es: "respiro" },
        { word: "love", es: "amar / encantar" },
        { word: "challenges", es: "retos / desafíos" },
      ],
    },
    {
      id: "s10",
      image: s10,
      imageAlt: "Kat los ve y les dice que son increíbles.",
      text: 'Kat sees them. "You two are amazing," she says.',
      es: "Kat los ve. «Ustedes dos son increíbles», dice ella.",
      speaker: "kat",
      words: [
        { word: "sees", es: "ve" },
        { word: "two", es: "dos" },
        { word: "amazing", es: "increíble" },
      ],
    },
    {
      id: "s11",
      image: s11,
      imageAlt: "Vale recibe un mensaje misterioso firmado solo con «D».",
      text: 'Vale\'s phone buzzes. A new message: "Hi, Vale. Tomorrow we talk again. — D." "Who is D?" she asks.',
      es: "El teléfono de Vale vibra. Un mensaje nuevo: «Hola, Vale. Mañana hablamos otra vez. — D.» «¿Quién es D?», pregunta ella.",
      speaker: "vale",
      words: [
        { word: "phone", es: "teléfono" },
        { word: "message", es: "mensaje" },
        { word: "tomorrow", es: "mañana" },
        { word: "again", es: "otra vez / de nuevo" },
        { word: "asks", es: "pregunta" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s5",
      questionEn: "What is his name?",
      questionEs: "¿Cómo se llama él?",
      options: [
        { label: "Mateo", emoji: "👋" },
        { label: "Dylan", emoji: "🇨🇦" },
        { label: "Mr. Reyes", emoji: "👔" },
      ],
      answer: 0,
      sayIt: "What is your name?",
      sayItEs: "Ahora pregúntale tú: «¿Cómo te llamas?»",
    },
    {
      id: "q2",
      afterScene: "s6",
      questionEn: "Where is Mateo from?",
      questionEs: "¿De dónde es Mateo?",
      options: [
        { label: "Guatemala", emoji: "🇬🇹" },
        { label: "El Salvador", emoji: "🇸🇻" },
        { label: "Canada", emoji: "🇨🇦" },
      ],
      answer: 0,
      sayIt: "Where are you from?",
      sayItEs: "Ahora pregúntale tú: «¿De dónde eres?»",
    },
    {
      id: "q3",
      afterScene: "s10",
      questionEn: "How are Vale and Mateo?",
      questionEs: "¿Cómo son Vale y Mateo?",
      options: [
        { label: "Amazing", emoji: "🌟" },
        { label: "Nervous", emoji: "😰" },
        { label: "Angry", emoji: "😠" },
      ],
      answer: 0,
      sayIt: "We are amazing.",
      sayItEs: "Ahora repite: «Somos increíbles.»",
    },
  ],
  mindsetCard: {
    afterScene: "s8",
    phrase: "English is easy. I love challenges.",
    es: "El inglés es fácil. Me encantan los retos.",
  },
  continuePrompt: {
    en: "Now introduce yourself like Mateo and Vale. Don't stop if you forget a word — you can do it!",
    es: "Ahora preséntate como Mateo y Vale. ¡No pares si se te olvida una palabra — tú puedes!",
  },
  continueWith: [
    "My name is…",
    "I am … years old",
    "I am from…",
    "I live in…",
    "My favorite color is…",
    "My hobbies are…",
    "I love challenges.",
  ],
  cliffhanger: {
    en: "To be continued… Episode 4: Who is D?",
    es: "Continuará… Episodio 4: ¿Quién es D?",
  },
};
