import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/tigers-ep9-why-are-you-ready/cover.jpg";
import s1 from "@/assets/storybook/tigers-ep9-why-are-you-ready/s1.jpg";
import s2 from "@/assets/storybook/tigers-ep9-why-are-you-ready/s2.jpg";
import s3 from "@/assets/storybook/tigers-ep9-why-are-you-ready/s3.jpg";
import s4 from "@/assets/storybook/tigers-ep9-why-are-you-ready/s4.jpg";
import s5 from "@/assets/storybook/tigers-ep9-why-are-you-ready/s5.jpg";
import s6 from "@/assets/storybook/tigers-ep9-why-are-you-ready/s6.jpg";
import s7 from "@/assets/storybook/tigers-ep9-why-are-you-ready/s7.jpg";
import s8 from "@/assets/storybook/tigers-ep9-why-are-you-ready/s8.jpg";
import s9 from "@/assets/storybook/tigers-ep9-why-are-you-ready/s9.jpg";
import s10 from "@/assets/storybook/tigers-ep9-why-are-you-ready/s10.jpg";
import s11 from "@/assets/storybook/tigers-ep9-why-are-you-ready/s11.jpg";

/**
 * Season 7 (Tigers) Episode 9 — "Why are you ready?"
 * Matches Tigers Day 9 (mixed forms: past + present perfect + present
 * perfect progressive as evidence).
 */
export const TIGERS_EP9_WHY_ARE_YOU_READY: StorybookEpisode = {
  id: "tigers-ep9-why-are-you-ready",
  moduleId: "tigers",
  week: 2,
  title: "Why are you ready?",
  titleEs: "¿Por qué estás lista?",
  episodeLabel: { en: "Season 7 · Episode 9", es: "Temporada 7 · Episodio 9" },
  previously: [
    { en: "Sofía asked for a job and got a demo class on Saturday.", es: "Sofía pidió trabajo y consiguió una clase de prueba el sábado." },
    { en: "Mr. Herrera gave Vale his card after the workshop.", es: "El señor Herrera le dio su tarjeta a Vale después del taller." },
    { en: "Northline's renewal meeting is coming.", es: "La reunión de renovación con Northline se acerca." },
  ],
  reviewWords: [
    { word: "demo", es: "clase de prueba" },
    { word: "renewal", es: "renovación" },
    { word: "evidence", es: "evidencia" },
  ],
  blurb: {
    en: "One week before the renewal meeting, Vale builds her defense: three pieces of evidence that prove the school is ready.",
    es: "Una semana antes de la renovación, Vale construye su defensa: tres evidencias que prueban que la escuela está lista.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Vale abre un correo de Northline en la laptop: reunión de renovación en una semana.",
      text: "Monday. An email arrived from Northline: renewal meeting, next Monday, ten o'clock.",
      es: "Lunes. Llegó un correo de Northline: reunión de renovación, el próximo lunes, diez en punto.",
      speaker: "narrator",
      lines: [
        { speaker: "dani", text: "Next Monday?! Vale, that's in seven days!", es: "«¡¿El próximo lunes?! ¡Vale, eso es en siete días!»" },
        { speaker: "vale", text: "Seven days is a lot of time when you have evidence.", es: "«Siete días es mucho tiempo cuando tienes evidencia»." },
        { speaker: "camila", text: "Do we have evidence?", es: "«¿Tenemos evidencia?»" },
        { speaker: "vale", text: "We have six months of evidence. We just have to organize it.", es: "«Tenemos seis meses de evidencia. Solo hay que organizarla»." },
      ],
      words: [
        { word: "renewal", es: "renovación" },
        { word: "evidence", es: "evidencia" },
        { word: "organize", es: "organizar" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Vale escribe en la pizarra: por qué estamos listos, con tres espacios vacíos.",
      text: "Why are we ready? We answer with three evidences. Not feelings — evidence.",
      es: "«¿Por qué estamos listos? Respondemos con tres evidencias. No sentimientos: evidencia».",
      speaker: "vale",
      lines: [
        { speaker: "vale", text: "The question of the meeting is: why are you ready for a bigger contract?", es: "«La pregunta de la reunión es: ¿por qué están listos para un contrato más grande?»" },
        { speaker: "vale", text: "We answer with three evidences. Not feelings — evidence.", es: "«Respondemos con tres evidencias. No sentimientos: evidencia»." },
        { speaker: "dani", text: "Like a lawyer. Vale the lawyer.", es: "«Como abogada. Vale la abogada»." },
      ],
      words: [
        { word: "feelings", es: "sentimientos" },
        { word: "lawyer", es: "abogada" },
        { word: "answer", es: "responder" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Vale señala la primera evidencia: resultados del pasado en Northline.",
      text: "Evidence one — the past: we taught thirty people, and twenty-eight finished the program.",
      es: "«Evidencia uno — el pasado: enseñamos a treinta personas y veintiocho terminaron el programa».",
      speaker: "vale",
      lines: [
        { speaker: "vale", text: "Evidence one, the past: we taught thirty people at Northline.", es: "«Evidencia uno, el pasado: enseñamos a treinta personas en Northline»." },
        { speaker: "vale", text: "Twenty-eight finished the program. Twenty-five passed the final call test.", es: "«Veintiocho terminaron el programa. Veinticinco pasaron la prueba final de llamada»." },
        { speaker: "camila", text: "That's… actually an amazing number.", es: "«Ese es… realmente un número increíble»." },
      ],
      words: [
        { word: "taught", es: "enseñamos" },
        { word: "finished", es: "terminaron" },
        { word: "passed", es: "pasaron" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Vale señala la segunda evidencia: todo lo que el equipo ha construido.",
      text: "Evidence two — what we have built: workshops, forty students, and a second classroom.",
      es: "«Evidencia dos — lo que hemos construido: talleres, cuarenta estudiantes y un segundo salón».",
      speaker: "vale",
      lines: [
        { speaker: "vale", text: "Evidence two, what we have built so far.", es: "«Evidencia dos, lo que hemos construido hasta ahora»." },
        { speaker: "vale", text: "We have opened a second classroom. We have started a free workshop. We have grown to forty students.", es: "«Hemos abierto un segundo salón. Hemos empezado un taller gratis. Hemos crecido a cuarenta estudiantes»." },
        { speaker: "dani", text: "And we have survived a giant competitor across the street.", es: "«Y hemos sobrevivido a un competidor gigante enfrente»." },
      ],
      words: [
        { word: "built", es: "construido" },
        { word: "grown", es: "crecido" },
        { word: "survived", es: "sobrevivido" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Vale señala la tercera evidencia: el esfuerzo continuo del equipo.",
      text: "Evidence three — we have been improving every single week, without stopping.",
      es: "«Evidencia tres — hemos estado mejorando cada semana, sin parar».",
      speaker: "vale",
      lines: [
        { speaker: "vale", text: "Evidence three: we have been improving every single week.", es: "«Evidencia tres: hemos estado mejorando cada semana»." },
        { speaker: "vale", text: "We have been fixing the school, we have been training new teachers, and we have been calling every student.", es: "«Hemos estado arreglando la escuela, hemos estado entrenando maestras nuevas y hemos estado llamando a cada estudiante»." },
        { speaker: "camila", text: "Since when, exactly?", es: "«¿Desde cuándo, exactamente?»" },
        { speaker: "vale", text: "Since the day BigTalk opened. Their threat became our gym.", es: "«Desde el día que abrió BigTalk. Su amenaza se convirtió en nuestro gimnasio»." },
      ],
      words: [
        { word: "improving", es: "mejorando" },
        { word: "threat", es: "amenaza" },
        { word: "gym", es: "gimnasio" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Dani ensaya la respuesta y se equivoca; todos ríen con cariño.",
      text: "Dani tried the answer and mixed every tense in one sentence. Everyone laughed with love.",
      es: "Dani ensayó la respuesta y mezcló todos los tiempos en una oración. Todos rieron con cariño.",
      speaker: "narrator",
      lines: [
        { speaker: "dani", text: "We have teach thirty people and we are been improving since… no. Wait.", es: "«We have teach thirty people and we are been improving since… no. Espera»." },
        { speaker: "vale", text: "Slowly. Past for the finished story: we taught.", es: "«Despacio. Pasado para la historia terminada: we taught»." },
        { speaker: "vale", text: "Have built for what you can see today. Have been improving for what continues.", es: "«Have built para lo que se ve hoy. Have been improving para lo que continúa»." },
      ],
      words: [
        { word: "tenses", es: "tiempos verbales" },
        { word: "finished", es: "terminada" },
        { word: "continues", es: "continúa" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Dani lo intenta de nuevo, despacio y bien.",
      text: "We taught thirty people. We have built a real school. And we have been improving every week.",
      es: "«Enseñamos a treinta personas. Hemos construido una escuela de verdad. Y hemos estado mejorando cada semana».",
      speaker: "dani",
      lines: [
        { speaker: "dani", text: "Okay. Slowly. We taught thirty people at Northline.", es: "«Bueno. Despacio. Enseñamos a treinta personas en Northline»." },
        { speaker: "dani", text: "We have built a real school with two classrooms.", es: "«Hemos construido una escuela de verdad con dos salones»." },
        { speaker: "dani", text: "And we have been improving every week since January.", es: "«Y hemos estado mejorando cada semana desde enero»." },
        { speaker: "vale", text: "Perfect. That's the defense. Three evidences, three times.", es: "«Perfecto. Esa es la defensa. Tres evidencias, tres tiempos»." },
      ],
      words: [
        { word: "slowly", es: "despacio" },
        { word: "defense", es: "defensa" },
        { word: "times", es: "tiempos" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "Sofía llega a ensayar su clase demo y escucha el final de la reunión.",
      text: "Sofía arrived to rehearse her demo class and heard the end of the meeting.",
      es: "Sofía llegó a ensayar su clase de prueba y escuchó el final de la reunión.",
      speaker: "narrator",
      lines: [
        { speaker: "sofia", text: "Sorry, am I interrupting? I came to rehearse for Saturday.", es: "«Perdón, ¿estoy interrumpiendo? Vine a ensayar para el sábado»." },
        { speaker: "vale", text: "Perfect timing. Why are you ready to teach here? Answer with evidence.", es: "«Tiempo perfecto. ¿Por qué estás lista para enseñar aquí? Responde con evidencia»." },
        { speaker: "sofia", text: "I… taught kids for two years. I have made my own materials. And I have been preparing for this my whole life.", es: "«Yo… enseñé a niños por dos años. He hecho mis propios materiales. Y he estado preparándome para esto toda mi vida»." },
      ],
      words: [
        { word: "interrupting", es: "interrumpiendo" },
        { word: "rehearse", es: "ensayar" },
        { word: "preparing", es: "preparándome" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "El equipo aplaude la respuesta de Sofía.",
      text: "The office clapped. Sofía turned red and smiled like the sun.",
      es: "La oficina aplaudió. Sofía se puso roja y sonrió como el sol.",
      speaker: "narrator",
      lines: [
        { speaker: "dani", text: "She's hired, right? Tell me she's hired.", es: "«Está contratada, ¿verdad? Dime que está contratada»." },
        { speaker: "vale", text: "Saturday decides. But that answer was a ten.", es: "«El sábado decide. Pero esa respuesta fue un diez»." },
        { speaker: "sofia", text: "I have been practicing that answer in the mirror for a week.", es: "«He estado practicando esa respuesta en el espejo por una semana»." },
      ],
      words: [
        { word: "clapped", es: "aplaudió" },
        { word: "hired", es: "contratada" },
        { word: "mirror", es: "espejo" },
      ],
    },
    {
      id: "s10",
      image: s10,
      imageAlt: "Vale cierra la laptop con la presentación terminada para Northline.",
      text: "By Friday, the defense was ready: three slides, three evidences, zero fear.",
      es: "Para el viernes, la defensa estaba lista: tres láminas, tres evidencias, cero miedo.",
      speaker: "narrator",
      lines: [
        { speaker: "camila", text: "Three slides, three evidences, zero fear. I like it.", es: "«Tres láminas, tres evidencias, cero miedo. Me gusta»." },
        { speaker: "vale", text: "On Monday, Northline asks: why are you ready?", es: "«El lunes, Northline pregunta: ¿por qué están listos?»" },
        { speaker: "vale", text: "And we answer with our whole history.", es: "«Y respondemos con toda nuestra historia»." },
      ],
      words: [
        { word: "slides", es: "láminas / diapositivas" },
        { word: "fear", es: "miedo" },
        { word: "history", es: "historia" },
      ],
    },
    {
      id: "s11",
      image: s11,
      imageAlt: "Vale ensaya la defensa completa frente al equipo como si fuera la reunión.",
      text: "Final rehearsal: Vale answers the big question one more time.",
      es: "Ensayo final: Vale responde la gran pregunta una vez más.",
      speaker: "vale",
      lines: [
        { speaker: "camila", text: "Why are you ready for a bigger contract?", es: "«¿Por qué están listos para un contrato más grande?»" },
        { speaker: "vale", text: "First, we taught thirty people at Northline, and twenty-eight finished.", es: "«Primero, enseñamos a treinta personas en Northline y veintiocho terminaron»." },
        { speaker: "vale", text: "Second, we have built a school with two classrooms and a free workshop.", es: "«Segundo, hemos construido una escuela con dos salones y un taller gratis»." },
        { speaker: "vale", text: "And third, we have been improving every week. That's why we're ready.", es: "«Y tercero, hemos estado mejorando cada semana. Por eso estamos listos»." },
      ],
      words: [
        { word: "first", es: "primero" },
        { word: "second", es: "segundo" },
        { word: "third", es: "tercero" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s3",
      questionEn: "What was evidence number one?",
      questionEs: "¿Cuál fue la evidencia número uno?",
      options: [
        { label: "They taught thirty people and twenty-eight finished", emoji: "🎓" },
        { label: "They painted the school", emoji: "🎨" },
        { label: "They bought new computers", emoji: "💻" },
      ],
      answer: 0,
      sayIt: "We taught thirty people, and twenty-eight finished the program.",
      sayItEs: "Ejemplo: «We taught thirty people, and twenty-eight finished the program.»",
      sayItAskEn: "Tell me one thing you did that proves you work hard.",
      sayItAskEs: "Cuéntame una cosa que hiciste que prueba que trabajas duro.",
      sayItCheck: {
        target: "I * and I *",
        altTargets: ["I worked * and I *", "Last year, I *", "I finished *"],
      },
    },
    {
      id: "q2",
      afterScene: "s5",
      questionEn: "What was evidence number three?",
      questionEs: "¿Cuál fue la evidencia número tres?",
      options: [
        { label: "They have been improving every single week", emoji: "📈" },
        { label: "They have been watching TV", emoji: "📺" },
        { label: "They have been sleeping more", emoji: "😴" },
      ],
      answer: 0,
      sayIt: "We have been improving every single week since January.",
      sayItEs: "Ejemplo: «We have been improving every single week since January.»",
      sayItAskEn: "What have you been improving in your life? Since when?",
      sayItAskEs: "¿Qué has estado mejorando en tu vida? ¿Desde cuándo?",
      sayItCheck: {
        target: "I have been *ing * since *",
        altTargets: ["I have been *ing", "I've been *ing * for *", "I have been *ing * for *"],
      },
    },
    {
      id: "q3",
      afterScene: "s8",
      questionEn: "How did Sofía answer 'why are you ready?'",
      questionEs: "¿Cómo respondió Sofía «¿por qué estás lista?»?",
      options: [
        { label: "With three evidences: past, present perfect, and ongoing work", emoji: "🧾" },
        { label: "She ran out of the room", emoji: "🏃" },
        { label: "She asked for more money", emoji: "💵" },
      ],
      answer: 0,
      sayIt: "I taught kids for two years, I have made my own materials, and I have been preparing for this my whole life.",
      sayItEs: "Ejemplo: «I taught kids for two years, I have made my own materials, and I have been preparing for this my whole life.»",
      sayItAskEn: "Why are you ready for your next big step? Give me your conclusion.",
      sayItAskEs: "¿Por qué estás listo para tu próximo paso grande? Dame tu conclusión.",
      sayItCheck: {
        target: "I am ready because *",
        altTargets: ["That's why I am ready", "I have *, so I am ready", "For these reasons, I am ready"],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s6",
    phrase: "Mistakes are part of the process. Slowly is still forward.",
    es: "Los errores son parte del proceso. Despacio también es avanzar.",
  },
  habitCard: {
    afterScene: "s4",
    phrase: "I answer with evidence, not with feelings. Facts make me calm.",
    es: "Respondo con evidencia, no con sentimientos. Los hechos me dan calma.",
    model: "vale",
    modelActionEs: "Vale organiza seis meses de trabajo en tres evidencias claras.",
  },
  continuePrompt: {
    en: "Why are you ready for your next big step? Give two pieces of evidence and one conclusion.",
    es: "¿Por qué estás listo para tu próximo paso grande? Da dos evidencias y una conclusión.",
  },
  continueWith: ["First, I ...", "Also, I have been ...", "That's why I am ready."],
  cliffhanger: {
    en: "Episode 10: Dani interviews for a formal position — in English.",
    es: "Episodio 10: Dani tiene una entrevista para un puesto formal — en inglés.",
  },
};
