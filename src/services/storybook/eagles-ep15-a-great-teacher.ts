import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/eagles-ep15-a-great-teacher/cover.jpg";
import s1 from "@/assets/storybook/eagles-ep15-a-great-teacher/s1.jpg";
import s2 from "@/assets/storybook/eagles-ep15-a-great-teacher/s2.jpg";
import s3 from "@/assets/storybook/eagles-ep15-a-great-teacher/s3.jpg";
import s4 from "@/assets/storybook/eagles-ep15-a-great-teacher/s4.jpg";
import s5 from "@/assets/storybook/eagles-ep15-a-great-teacher/s5.jpg";
import s6 from "@/assets/storybook/eagles-ep15-a-great-teacher/s6.jpg";
import s7 from "@/assets/storybook/eagles-ep15-a-great-teacher/s7.jpg";
import s8 from "@/assets/storybook/eagles-ep15-a-great-teacher/s8.jpg";
import s9 from "@/assets/storybook/eagles-ep15-a-great-teacher/s9.jpg";
import s10 from "@/assets/storybook/eagles-ep15-a-great-teacher/s10.jpg";

/**
 * Season 6 (Eagles) Episode 15 — "A great teacher".
 * Eagles day 15: simple present review — qualities + justification.
 */
export const EAGLES_EP15_A_GREAT_TEACHER: StorybookEpisode = {
  id: "eagles-ep15-a-great-teacher",
  moduleId: "eagles-week-1",
  week: 4,
  title: "A great teacher",
  titleEs: "Una gran maestra",
  episodeLabel: { en: "Season 6 · Episode 15", es: "Temporada 6 · Episodio 15" },
  previously: [
    { en: "Vale defended the best plan.", es: "Vale defendió el mejor plan." },
    { en: "Morgan asked for one more thing.", es: "Morgan pidió una cosa más." },
    { en: "The school needs a second teacher.", es: "La escuela necesita una segunda maestra." },
  ],
  reviewWords: [
    { word: "listens", es: "escucha" },
    { word: "explains", es: "explica" },
    { word: "patience", es: "paciencia" },
  ],
  blurb: {
    en: "Three candidates, one chair. The best English is not always the best teacher, and Vale learns it in one morning.",
    es: "Tres candidatas, una silla. El mejor inglés no siempre es la mejor maestra, y Vale lo aprende en una mañana.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Vale reads three simple job applications at her desk.",
      text: "8:15 a.m. Three names on three papers.",
      es: "8:15 a.m. Tres nombres en tres papeles.",
      speaker: "vale",
      lines: [
        { speaker: "vale", text: "One studied in Canada. One teaches kids. One works at a hotel.", es: "«Uno estudió en Canadá. Una enseña a niños. Una trabaja en un hotel»." },
        { speaker: "camila", text: "What do you look for in a teacher?", es: "«¿Qué buscas en una maestra?»" },
        { speaker: "vale", text: "A great teacher listens more than she talks.", es: "«Una gran maestra escucha más de lo que habla»." },
      ],
      words: [
        { word: "studied", es: "estudió" },
        { word: "teaches", es: "enseña" },
        { word: "listens", es: "escucha" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Dani writes the interview questions on a small notebook.",
      text: "Dani writes the questions.",
      es: "Dani escribe las preguntas.",
      speaker: "dani",
      lines: [
        { speaker: "dani", text: "Question one: what makes a great employee?", es: "«Pregunta uno: ¿qué hace a un gran empleado?»" },
        { speaker: "vale", text: "Question two: what do you do when a student says nothing?", es: "«Pregunta dos: ¿qué haces cuando un estudiante no dice nada?»" },
        { speaker: "dani", text: "That second one answers everything.", es: "«Esa segunda contesta todo»." },
      ],
      words: [
        { word: "employee", es: "empleado" },
        { word: "student", es: "estudiante" },
        { word: "nothing", es: "nada" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "The first candidate, a young man in a suit, speaks with perfect pronunciation.",
      text: "9:00 a.m. The first candidate has perfect English.",
      es: "9:00 a.m. El primer candidato tiene inglés perfecto.",
      speaker: "candidateM",
      lines: [
        { speaker: "candidateM", text: "I correct every mistake immediately. Students need discipline.", es: "«Corrijo cada error de inmediato. Los estudiantes necesitan disciplina»." },
        { speaker: "vale", text: "And when they stop speaking?", es: "«¿Y cuando dejan de hablar?»" },
        { speaker: "candidateM", text: "Then they study more at home.", es: "«Entonces estudian más en casa»." },
      ],
      words: [
        { word: "correct", es: "corregir" },
        { word: "mistake", es: "error" },
        { word: "discipline", es: "disciplina" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Vale and Camila exchange a quick look after the first interview.",
      text: "The door closes. Camila speaks first.",
      es: "La puerta se cierra. Camila habla primero.",
      speaker: "camila",
      lines: [
        { speaker: "camila", text: "His English is better than mine.", es: "«Su inglés es mejor que el mío»." },
        { speaker: "vale", text: "And he makes people quiet. We sell the opposite.", es: "«Y hace que la gente se calle. Nosotros vendemos lo contrario»." },
        { speaker: "camila", text: "So a great teacher is not the person with the best English.", es: "«Entonces una gran maestra no es la persona con el mejor inglés»." },
      ],
      words: [
        { word: "better", es: "mejor" },
        { word: "quiet", es: "callada" },
        { word: "opposite", es: "lo contrario" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "The second candidate arrives late and talks about her salary first.",
      text: "10:00 a.m. The second candidate arrives twenty minutes late.",
      es: "10:00 a.m. La segunda candidata llega veinte minutos tarde.",
      speaker: "candidateF",
      lines: [
        { speaker: "candidateF", text: "Sorry. Traffic. How much do you pay?", es: "«Perdón. Tráfico. ¿Cuánto pagan?»" },
        { speaker: "vale", text: "First tell me what you do when a student is afraid.", es: "«Primero dime qué haces cuando un estudiante tiene miedo»." },
        { speaker: "candidateF", text: "Honestly? I do not know yet.", es: "«¿Honestamente? Todavía no sé»." },
      ],
      words: [
        { word: "sorry", es: "perdón" },
        { word: "pay", es: "pagar" },
        { word: "afraid", es: "con miedo" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "The third candidate, a calm woman in a hotel uniform, sits down.",
      text: "11:00 a.m. The third one still wears her hotel uniform.",
      es: "11:00 a.m. La tercera todavía trae su uniforme del hotel.",
      speaker: "candidateHotel",
      lines: [
        { speaker: "candidateHotel", text: "I work at the front desk. I speak English every day with guests.", es: "«Trabajo en la recepción. Hablo inglés todos los días con huéspedes»." },
        { speaker: "vale", text: "What do you do when a person does not understand you?", es: "«¿Qué hace cuando una persona no la entiende?»" },
        { speaker: "candidateHotel", text: "I say it slower, I use my hands, and I never make them feel small.", es: "«Lo digo más despacio, uso las manos y nunca los hago sentir pequeños»." },
      ],
      words: [
        { word: "guests", es: "huéspedes" },
        { word: "slower", es: "más despacio" },
        { word: "hands", es: "manos" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "The hotel candidate teaches a short demo class to Beto.",
      text: "The demo class lasts eight minutes.",
      es: "La clase de prueba dura ocho minutos.",
      speaker: "beto",
      lines: [
        { speaker: "beto", text: "I... I work in a store.", es: "«Yo… yo trabajo en una tienda»." },
        { speaker: "candidateHotel", text: "Good. Say it again and tell me one thing you sell.", es: "«Bien. Dilo otra vez y dime una cosa que vendes»." },
        { speaker: "beto", text: "I work in a store and I sell shoes!", es: "«¡Trabajo en una tienda y vendo zapatos!»" },
      ],
      words: [
        { word: "store", es: "tienda" },
        { word: "sell", es: "vender" },
        { word: "shoes", es: "zapatos" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "Vale and Dani talk in the hallway after the demo class.",
      text: "Beto spoke more in eight minutes than in two weeks.",
      es: "Beto habló más en ocho minutos que en dos semanas.",
      speaker: "dani",
      lines: [
        { speaker: "dani", text: "She does what you do. She waits.", es: "«Ella hace lo que tú haces. Espera»." },
        { speaker: "vale", text: "A great employee has patience, and patience is not a diploma.", es: "«Un gran empleado tiene paciencia, y la paciencia no es un diploma»." },
        { speaker: "dani", text: "Then we have our teacher.", es: "«Entonces ya tenemos maestra»." },
      ],
      words: [
        { word: "waits", es: "espera" },
        { word: "patience", es: "paciencia" },
        { word: "diploma", es: "diploma" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Vale offers the job and the woman covers her mouth, moved.",
      text: "12:20 p.m. Vale offers the job.",
      es: "12:20 p.m. Vale ofrece el trabajo.",
      speaker: "vale",
      lines: [
        { speaker: "vale", text: "You start Monday with group B. Your English grows here too.", es: "«Empieza el lunes con el grupo B. Su inglés también crece aquí»." },
        { speaker: "ana", text: "I never think I am good enough for this.", es: "«Yo nunca creo que soy suficiente para esto»." },
        { speaker: "vale", text: "Neither did I. Mistakes are part of the process.", es: "«Yo tampoco lo creía. Los errores son parte del proceso»." },
      ],
      words: [
        { word: "start", es: "empezar" },
        { word: "grows", es: "crece" },
        { word: "enough", es: "suficiente" },
      ],
    },
    {
      id: "s10",
      image: s10,
      imageAlt: "Vale reads an email from Morgan on her phone in the street at noon.",
      text: "1:05 p.m. Morgan answers the proposal.",
      es: "1:05 p.m. Morgan responde la propuesta.",
      speaker: "camila",
      lines: [
        { speaker: "camila", text: "Read it out loud. I cannot look.", es: "«Léelo en voz alta. Yo no puedo ver»." },
        { speaker: "vale", text: "\"Approved for a pilot. Come to Miami in three weeks.\"", es: "«Aprobado para un piloto. Ven a Miami en tres semanas»." },
        { speaker: "narrator", text: "Vale has never left the country.", es: "Vale nunca ha salido del país." },
      ],
      words: [
        { word: "approved", es: "aprobado" },
        { word: "weeks", es: "semanas" },
        { word: "country", es: "país" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s4",
      questionEn: "Why does Vale say no to the first candidate?",
      questionEs: "¿Por qué Vale dice que no a la primera candidata?",
      options: [
        { label: "Because she makes students quiet", emoji: "🤐" },
        { label: "Because her English is bad", emoji: "❌" },
        { label: "Because she arrives late", emoji: "⏰" },
      ],
      answer: 0,
      sayIt: "She makes students quiet.",
      sayItEs: "Ejemplo: «She makes students quiet.»",
      sayItAskEn: "What makes a great teacher? Use: A great teacher… because…",
      sayItAskEs: "¿Qué hace a una gran maestra? Usa: A great teacher… because…",
      sayItCheck: {
        target: "A great teacher * because *",
        altTargets: ["A great teacher *", "A good teacher *", "A great teacher listens *"],
      },
    },
    {
      id: "q2",
      afterScene: "s6",
      questionEn: "What does the hotel candidate do when somebody does not understand her?",
      questionEs: "¿Qué hace la candidata del hotel cuando alguien no la entiende?",
      options: [
        { label: "She speaks slower and uses her hands", emoji: "🙌" },
        { label: "She changes to Spanish only", emoji: "🇪🇸" },
        { label: "She stops the conversation", emoji: "🚪" },
      ],
      answer: 0,
      sayIt: "She speaks slower and uses her hands.",
      sayItEs: "Ejemplo: «She speaks slower and uses her hands.»",
      sayItAskEn: "What makes a great employee where you work? Use: A great employee… because…",
      sayItAskEs: "¿Qué hace a un gran empleado donde trabajas? Usa: A great employee… because…",
      sayItCheck: {
        target: "A great employee * because *",
        altTargets: ["A great employee *", "A good employee *", "A great worker *"],
      },
    },
    {
      id: "q3",
      afterScene: "s8",
      questionEn: "What quality does Vale choose?",
      questionEs: "¿Qué cualidad elige Vale?",
      options: [
        { label: "Patience", emoji: "🧘" },
        { label: "A diploma from another country", emoji: "🎓" },
        { label: "A loud voice", emoji: "📣" },
      ],
      answer: 0,
      sayIt: "She chooses patience.",
      sayItEs: "Ejemplo: «She chooses patience.»",
      sayItAskEn: "Describe yourself at work or school in the present. Use: I… every day because…",
      sayItAskEs: "Descríbete en el trabajo o en el estudio en presente. Usa: I… every day because…",
      sayItCheck: {
        target: "I * every day because *",
        altTargets: ["I * because *", "I work * because *", "I study * because *"],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s9",
    phrase: "I am good enough to start. English is easy when I keep going.",
    es: "Soy suficiente para empezar. El inglés es fácil cuando sigo adelante.",
  },
  habitCard: {
    afterScene: "s7",
    phrase: "When somebody speaks, I wait three seconds before I talk.",
    es: "Cuando alguien habla, espero tres segundos antes de hablar.",
    model: "mom",
    modelActionEs: "La candidata del hotel espera y deja que Beto termine su frase.",
  },
  continuePrompt: {
    en: "Describe a great teacher or a great boss you know, and say why.",
    es: "Describe a una gran maestra o a un gran jefe que conozcas, y di por qué.",
  },
  continueWith: ["A great teacher ...", "She listens ...", "because ..."],
  cliffhanger: {
    en: "Episode 16: Miami in three weeks — and Vale has never left the country.",
    es: "Episodio 16: Miami en tres semanas… y Vale nunca ha salido del país.",
  },
};
