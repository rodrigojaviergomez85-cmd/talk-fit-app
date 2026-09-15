import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/eagles-ep12-which-is-better/cover.jpg";
import s1 from "@/assets/storybook/eagles-ep12-which-is-better/s1.jpg";
import s2 from "@/assets/storybook/eagles-ep12-which-is-better/s2.jpg";
import s3 from "@/assets/storybook/eagles-ep12-which-is-better/s3.jpg";
import s4 from "@/assets/storybook/eagles-ep12-which-is-better/s4.jpg";
import s5 from "@/assets/storybook/eagles-ep12-which-is-better/s5.jpg";
import s6 from "@/assets/storybook/eagles-ep12-which-is-better/s6.jpg";
import s7 from "@/assets/storybook/eagles-ep12-which-is-better/s7.jpg";
import s8 from "@/assets/storybook/eagles-ep12-which-is-better/s8.jpg";
import s9 from "@/assets/storybook/eagles-ep12-which-is-better/s9.jpg";
import s10 from "@/assets/storybook/eagles-ep12-which-is-better/s10.jpg";

/**
 * Season 6 (Eagles) Episode 12 — "Which schedule is better?".
 * Eagles day 12: short comparatives inside real comparisons.
 */
export const EAGLES_EP12_WHICH_IS_BETTER: StorybookEpisode = {
  id: "eagles-ep12-which-is-better",
  moduleId: "eagles-week-1",
  week: 3,
  title: "Which schedule is better?",
  titleEs: "¿Cuál horario es mejor?",
  episodeLabel: { en: "Season 6 · Episode 12", es: "Temporada 6 · Episodio 12" },
  previously: [
    { en: "Luis came back from the call center days.", es: "Luis volvió de los días del call center." },
    { en: "Twelve workers need English in six months.", es: "Doce trabajadores necesitan inglés en seis meses." },
    { en: "Morgan wants a schedule by Friday.", es: "Morgan quiere un horario para el viernes." },
  ],
  reviewWords: [
    { word: "better", es: "mejor" },
    { word: "cheaper", es: "más barato" },
    { word: "faster", es: "más rápido" },
  ],
  blurb: {
    en: "Morning or night? Three people, three opinions, and one calendar that has to be sent on Friday.",
    es: "¿Mañana o noche? Tres personas, tres opiniones y un calendario que hay que enviar el viernes.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Vale, Dani and Camila sit around a table with a paper calendar.",
      text: "9:00 a.m. Two options on the table.",
      es: "9:00 a.m. Dos opciones sobre la mesa.",
      speaker: "vale",
      lines: [
        { speaker: "vale", text: "Morning class at seven, or night class at eight. Which one is better?", es: "«Clase en la mañana a las siete, o clase de noche a las ocho. ¿Cuál es mejor?»" },
        { speaker: "dani", text: "Morning is quieter. The office is empty.", es: "«La mañana es más tranquila. La oficina está vacía»." },
        { speaker: "camila", text: "Night is easier for the parents in the group.", es: "«La noche es más fácil para los papás del grupo»." },
      ],
      words: [
        { word: "morning", es: "mañana" },
        { word: "quieter", es: "más tranquila" },
        { word: "easier", es: "más fácil" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Dani draws a simple chart with two columns on the whiteboard.",
      text: "Dani turns the argument into a chart.",
      es: "Dani convierte la discusión en un cuadro.",
      speaker: "dani",
      lines: [
        { speaker: "dani", text: "Cost, energy, traffic. Three lines, two columns.", es: "«Costo, energía, tráfico. Tres líneas, dos columnas»." },
        { speaker: "vale", text: "Morning is cheaper for us. We pay less for the room.", es: "«La mañana es más barata para nosotros. Pagamos menos por el salón»." },
        { speaker: "dani", text: "And traffic is worse at eight at night.", es: "«Y el tráfico es peor a las ocho de la noche»." },
      ],
      words: [
        { word: "cost", es: "costo" },
        { word: "traffic", es: "tráfico" },
        { word: "worse", es: "peor" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Luis calls from the Northline office with papers in his hand.",
      text: "Luis calls with the real schedules.",
      es: "Luis llama con los horarios reales.",
      speaker: "luis",
      lines: [
        { speaker: "luis", text: "Six people finish at six. Six people start at nine.", es: "«Seis personas terminan a las seis. Seis personas empiezan a las nueve»." },
        { speaker: "vale", text: "So one hour is better for half the team, and worse for the other half.", es: "«O sea que una hora es mejor para la mitad del equipo y peor para la otra mitad»." },
        { speaker: "luis", text: "Welcome to my life.", es: "«Bienvenida a mi vida»." },
      ],
      words: [
        { word: "finish", es: "terminar" },
        { word: "half", es: "mitad" },
        { word: "team", es: "equipo" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Kat speaks during a short break with a cup in her hand.",
      text: "Kat gives an opinion nobody asked for.",
      es: "Kat da una opinión que nadie pidió.",
      speaker: "kat",
      lines: [
        { speaker: "kat", text: "Morning students are faster. Night students are funnier.", es: "«Los estudiantes de la mañana son más rápidos. Los de la noche son más divertidos»." },
        { speaker: "vale", text: "Is that science?", es: "«¿Eso es ciencia?»" },
        { speaker: "kat", text: "That is two years of classes.", es: "«Eso son dos años de clases»." },
      ],
      words: [
        { word: "faster", es: "más rápidos" },
        { word: "funnier", es: "más divertidos" },
        { word: "science", es: "ciencia" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Vale writes two prices on the board and circles one.",
      text: "Money enters the conversation.",
      es: "El dinero entra en la conversación.",
      speaker: "camila",
      lines: [
        { speaker: "camila", text: "The night room is bigger, but it is more expensive.", es: "«El salón de la noche es más grande, pero es más caro»." },
        { speaker: "vale", text: "Bigger is not better if we are twelve people.", es: "«Más grande no es mejor si somos doce personas»." },
        { speaker: "camila", text: "Then small and cheap wins today.", es: "«Entonces pequeño y barato gana hoy»." },
      ],
      words: [
        { word: "bigger", es: "más grande" },
        { word: "expensive", es: "caro" },
        { word: "wins", es: "gana" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Mateo arrives with his motorcycle helmet and joins the talk.",
      text: "Mateo brings the traffic report.",
      es: "Mateo trae el reporte del tráfico.",
      speaker: "mateo",
      lines: [
        { speaker: "mateo", text: "At seven in the morning the road is safer than at nine at night.", es: "«A las siete de la mañana la calle es más segura que a las nueve de la noche»." },
        { speaker: "dani", text: "That is the strongest reason so far.", es: "«Esa es la razón más fuerte hasta ahora»." },
        { speaker: "vale", text: "People learn better when they arrive calm.", es: "«La gente aprende mejor cuando llega tranquila»." },
      ],
      words: [
        { word: "road", es: "calle / carretera" },
        { word: "safer", es: "más segura" },
        { word: "calm", es: "tranquila" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Vale speaks with Morgan on a video call showing the chart.",
      text: "Vale shows Morgan the chart before deciding.",
      es: "Vale le muestra el cuadro a Morgan antes de decidir.",
      speaker: "morgan",
      lines: [
        { speaker: "morgan", text: "Your morning plan is cheaper and faster. Why are you doubting?", es: "«Tu plan de la mañana es más barato y más rápido. ¿Por qué dudas?»" },
        { speaker: "vale", text: "Because six people would arrive tired.", es: "«Porque seis personas llegarían cansadas»." },
        { speaker: "morgan", text: "Then split the group. Smart is better than simple.", es: "«Entonces divide el grupo. Inteligente es mejor que simple»." },
      ],
      words: [
        { word: "plan", es: "plan" },
        { word: "tired", es: "cansadas" },
        { word: "split", es: "dividir" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "The team writes two groups on the calendar, A and B.",
      text: "Two groups. One teacher. Same week.",
      es: "Dos grupos. Una maestra. La misma semana.",
      speaker: "vale",
      lines: [
        { speaker: "vale", text: "Group A at seven. Group B at eight at night.", es: "«Grupo A a las siete. Grupo B a las ocho de la noche»." },
        { speaker: "dani", text: "Your day is longer now.", es: "«Ahora tu día es más largo»." },
        { speaker: "vale", text: "Longer today, stronger next month.", es: "«Más largo hoy, más fuerte el otro mes»." },
      ],
      words: [
        { word: "group", es: "grupo" },
        { word: "longer", es: "más largo" },
        { word: "stronger", es: "más fuerte" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Luis reads the new schedule on his phone and smiles.",
      text: "Luis reads the schedule to the twelve.",
      es: "Luis les lee el horario a los doce.",
      speaker: "luis",
      lines: [
        { speaker: "luis", text: "This is better than I expected. Nobody has to choose between work and class.", es: "«Esto es mejor de lo que esperaba. Nadie tiene que elegir entre el trabajo y la clase»." },
        { speaker: "vale", text: "That was the point.", es: "«Ese era el punto»." },
        { speaker: "luis", text: "English is easy when somebody makes it possible.", es: "«El inglés es fácil cuando alguien lo hace posible»." },
      ],
      words: [
        { word: "expected", es: "esperaba" },
        { word: "between", es: "entre" },
        { word: "point", es: "punto" },
      ],
    },
    {
      id: "s10",
      image: s10,
      imageAlt: "Vale sends an email at night with the finished schedule.",
      text: "Thursday, 10:15 p.m. Sent one day early.",
      es: "Jueves, 10:15 p.m. Enviado un día antes.",
      speaker: "dani",
      lines: [
        { speaker: "dani", text: "Sent. Now the hard question comes.", es: "«Enviado. Ahora viene la pregunta difícil»." },
        { speaker: "vale", text: "Which one? We already chose the hours.", es: "«¿Cuál? Ya elegimos las horas»." },
        { speaker: "narrator", text: "Morgan answers in two minutes: \"Online or in person?\"", es: "Morgan responde en dos minutos: «¿En línea o presencial?»" },
      ],
      words: [
        { word: "sent", es: "enviado" },
        { word: "hours", es: "horas" },
        { word: "question", es: "pregunta" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s2",
      questionEn: "Why is the morning class cheaper?",
      questionEs: "¿Por qué la clase de la mañana es más barata?",
      options: [
        { label: "They pay less for the room", emoji: "🏫" },
        { label: "The students pay double", emoji: "💰" },
        { label: "Nobody teaches in the morning", emoji: "😴" },
      ],
      answer: 0,
      sayIt: "The morning class is cheaper.",
      sayItEs: "Ejemplo: «The morning class is cheaper.»",
      sayItAskEn: "Morning or night to study? Use: … is better than …",
      sayItAskEs: "¿Mañana o noche para estudiar? Usa: … is better than …",
      sayItCheck: {
        target: "* is better than *",
        altTargets: ["Morning is better than *", "Night is better than *", "* better than *"],
      },
    },
    {
      id: "q2",
      afterScene: "s6",
      questionEn: "What did Mateo say about the road?",
      questionEs: "¿Qué dijo Mateo sobre la calle?",
      options: [
        { label: "It is safer in the morning", emoji: "🛵" },
        { label: "It is faster at night", emoji: "🌙" },
        { label: "It is always closed", emoji: "🚧" },
      ],
      answer: 0,
      sayIt: "The road is safer in the morning.",
      sayItEs: "Ejemplo: «The road is safer in the morning.»",
      sayItAskEn: "Compare two ways to go to work or school. Use: … is faster than …",
      sayItAskEs: "Compara dos formas de ir al trabajo o a estudiar. Usa: … is faster than …",
      sayItCheck: {
        target: "* is faster than *",
        altTargets: ["* is cheaper than *", "* is safer than *", "* faster than *"],
      },
    },
    {
      id: "q3",
      afterScene: "s8",
      questionEn: "What did the team decide?",
      questionEs: "¿Qué decidió el equipo?",
      options: [
        { label: "Two groups: seven in the morning and eight at night", emoji: "🗓️" },
        { label: "Only one class at noon", emoji: "🕛" },
        { label: "No classes this month", emoji: "🚫" },
      ],
      answer: 0,
      sayIt: "They made two groups.",
      sayItEs: "Ejemplo: «They made two groups.»",
      sayItAskEn: "Which is cheaper for you: bus or motorcycle? Use: … is cheaper than …",
      sayItAskEs: "¿Cuál es más barato para ti: bus o moto? Usa: … is cheaper than …",
      sayItCheck: {
        target: "* is cheaper than *",
        altTargets: ["* is cheaper *", "The bus is cheaper than *", "* cheaper than *"],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s8",
    phrase: "A longer day today builds a better life tomorrow.",
    es: "Un día más largo hoy construye una vida mejor mañana.",
  },
  habitCard: {
    afterScene: "s2",
    phrase: "Before I argue, I compare the real numbers.",
    es: "Antes de discutir, comparo los números reales.",
    model: "dani",
    modelActionEs: "Dani convierte la discusión en un cuadro de dos columnas.",
  },
  continuePrompt: {
    en: "Compare two options in your week and choose one.",
    es: "Compara dos opciones de tu semana y elige una.",
  },
  continueWith: ["... is better than ...", "... is cheaper than ...", "I choose ..."],
  cliffhanger: {
    en: "Episode 13: Online or in person? Morgan wants the answer with reasons.",
    es: "Episodio 13: ¿En línea o presencial? Morgan quiere la respuesta con razones.",
  },
};
