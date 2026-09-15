import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/tigers-ep10-interview-challenge/cover.jpg";
import s1 from "@/assets/storybook/tigers-ep10-interview-challenge/s1.jpg";
import s2 from "@/assets/storybook/tigers-ep10-interview-challenge/s2.jpg";
import s3 from "@/assets/storybook/tigers-ep10-interview-challenge/s3.jpg";
import s4 from "@/assets/storybook/tigers-ep10-interview-challenge/s4.jpg";
import s5 from "@/assets/storybook/tigers-ep10-interview-challenge/s5.jpg";
import s6 from "@/assets/storybook/tigers-ep10-interview-challenge/s6.jpg";
import s7 from "@/assets/storybook/tigers-ep10-interview-challenge/s7.jpg";
import s8 from "@/assets/storybook/tigers-ep10-interview-challenge/s8.jpg";
import s9 from "@/assets/storybook/tigers-ep10-interview-challenge/s9.jpg";
import s10 from "@/assets/storybook/tigers-ep10-interview-challenge/s10.jpg";
import s11 from "@/assets/storybook/tigers-ep10-interview-challenge/s11.jpg";

/**
 * Season 7 (Tigers) Episode 10 — "Job interview challenge".
 * Matches Tigers Day 10 (transfer: a real interview using the same forms —
 * answer, reason, example).
 */
export const TIGERS_EP10_INTERVIEW_CHALLENGE: StorybookEpisode = {
  id: "tigers-ep10-interview-challenge",
  moduleId: "tigers",
  week: 2,
  title: "Job interview challenge",
  titleEs: "El reto de la entrevista",
  episodeLabel: { en: "Season 7 · Episode 10", es: "Temporada 7 · Episodio 10" },
  previously: [
    { en: "Vale prepared the contract defense with three evidences.", es: "Vale preparó la defensa del contrato con tres evidencias." },
    { en: "Sofía rehearsed her demo class for Saturday.", es: "Sofía ensayó su clase de prueba para el sábado." },
    { en: "The renewal meeting with Northline is on Monday.", es: "La reunión de renovación con Northline es el lunes." },
  ],
  reviewWords: [
    { word: "evidence", es: "evidencia" },
    { word: "improving", es: "mejorando" },
    { word: "ready", es: "listo / lista" },
  ],
  blurb: {
    en: "Vale makes it official: Dani interviews for the position of academic coordinator — in English, with no script.",
    es: "Vale lo hace oficial: Dani entrevista para el puesto de coordinador académico — en inglés, sin guion.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Vale llama a Dani a su escritorio con una cara seria que luego se convierte en sonrisa.",
      text: "Dani, sit down. We need to talk about your future in this school.",
      es: "«Dani, siéntate. Tenemos que hablar de tu futuro en esta escuela».",
      speaker: "vale",
      lines: [
        { speaker: "vale", text: "Dani, sit down. We need to talk about your future.", es: "«Dani, siéntate. Tenemos que hablar de tu futuro»." },
        { speaker: "dani", text: "Am I fired? Oh no. I'm fired. My mom is going to kill me.", es: "«¿Estoy despedido? Oh no. Estoy despedido. Mi mamá me va a matar»." },
        { speaker: "vale", text: "You're not fired. The opposite. I want to hire you formally: academic coordinator.", es: "«No estás despedido. Lo contrario. Quiero contratarte formalmente: coordinador académico»." },
      ],
      words: [
        { word: "fired", es: "despedido" },
        { word: "opposite", es: "lo contrario" },
        { word: "coordinator", es: "coordinador" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Dani se emociona y luego se pone serio cuando escucha la condición.",
      text: "But there's one condition: you have to pass a real interview, in English.",
      es: "«Pero hay una condición: tienes que pasar una entrevista de verdad, en inglés».",
      speaker: "vale",
      lines: [
        { speaker: "dani", text: "Coordinator! Me! Yes! A thousand times yes!", es: "«¡Coordinador! ¡Yo! ¡Sí! ¡Mil veces sí!»" },
        { speaker: "vale", text: "One condition: you have to pass a real interview. In English. No script.", es: "«Una condición: tienes que pasar una entrevista de verdad. En inglés. Sin guion»." },
        { speaker: "dani", text: "…Can I take back my yes?", es: "«…¿Puedo retirar mi sí?»" },
      ],
      words: [
        { word: "condition", es: "condición" },
        { word: "interview", es: "entrevista" },
        { word: "script", es: "guion" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Camila y Sofía ayudan a Dani a prepararse con tarjetas de preguntas.",
      text: "All week, Camila and Sofía trained Dani with question cards.",
      es: "Toda la semana, Camila y Sofía entrenaron a Dani con tarjetas de preguntas.",
      speaker: "narrator",
      lines: [
        { speaker: "camila", text: "Rule one: every answer has three parts — answer, reason, example.", es: "«Regla uno: cada respuesta tiene tres partes: respuesta, razón, ejemplo»." },
        { speaker: "sofia", text: "And breathe before you answer. A calm breath is free.", es: "«Y respira antes de responder. Una respiración tranquila es gratis»." },
        { speaker: "dani", text: "Answer, reason, example. Breathe. Got it.", es: "«Respuesta, razón, ejemplo. Respirar. Entendido»." },
      ],
      words: [
        { word: "breathe", es: "respirar" },
        { word: "calm", es: "tranquila" },
        { word: "free", es: "gratis" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "La entrevista: Morgan por videollamada hace la primera pregunta a Dani.",
      text: "Friday. Morgan joined by video call as the external interviewer.",
      es: "Viernes. Morgan se conectó por videollamada como entrevistadora externa.",
      speaker: "narrator",
      lines: [
        { speaker: "morgan", text: "Good morning, Dani. Let's begin. Tell me about yourself.", es: "«Buenos días, Dani. Empecemos. Cuéntame de ti»." },
        { speaker: "dani", text: "Good morning. I'm Dani. I have worked at this school for a year, and I run the front desk.", es: "«Buenos días. Soy Dani. He trabajado en esta escuela por un año y atiendo la recepción»." },
        { speaker: "dani", text: "I started with zero English. Now I speak with clients every day.", es: "«Empecé con cero inglés. Ahora hablo con clientes todos los días»." },
      ],
      words: [
        { word: "begin", es: "empezar" },
        { word: "front desk", es: "recepción" },
        { word: "zero", es: "cero" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Morgan hace la segunda pregunta; Dani respira antes de responder.",
      text: "Why should we hire you as coordinator?",
      es: "«¿Por qué deberíamos contratarte como coordinador?»",
      speaker: "morgan",
      lines: [
        { speaker: "morgan", text: "Why should we hire you as coordinator?", es: "«¿Por qué deberíamos contratarte como coordinador?»" },
        { speaker: "dani", text: "You should hire me because I know every student by name.", es: "«Deberían contratarme porque conozco a cada estudiante por su nombre»." },
        { speaker: "dani", text: "For example, when Ana missed two classes, I called her, and she came back.", es: "«Por ejemplo, cuando Ana faltó a dos clases, la llamé y regresó»." },
      ],
      words: [
        { word: "hire", es: "contratar" },
        { word: "missed", es: "faltó a" },
        { word: "came back", es: "regresó" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Morgan hace una pregunta trampa sobre errores; Dani sonríe.",
      text: "Tell me about a mistake you have made at work.",
      es: "«Cuéntame de un error que hayas cometido en el trabajo».",
      speaker: "morgan",
      lines: [
        { speaker: "morgan", text: "Tell me about a mistake you have made at work.", es: "«Cuéntame de un error que hayas cometido en el trabajo»." },
        { speaker: "dani", text: "In March, I gave a student the wrong schedule, and he lost his class.", es: "«En marzo, le di a un estudiante el horario equivocado y perdió su clase»." },
        { speaker: "dani", text: "I apologized, I printed his schedule, and now I check every schedule twice.", es: "«Me disculpé, le imprimí su horario, y ahora reviso cada horario dos veces»." },
        { speaker: "morgan", text: "Good. Mistake, action, change. That's the right order.", es: "«Bien. Error, acción, cambio. Ese es el orden correcto»." },
      ],
      words: [
        { word: "wrong", es: "equivocado" },
        { word: "apologized", es: "me disculpé" },
        { word: "twice", es: "dos veces" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Última pregunta: dónde te ves en dos años; Dani se imagina.",
      text: "Where do you see yourself in two years?",
      es: "«¿Dónde te ves en dos años?»",
      speaker: "morgan",
      lines: [
        { speaker: "morgan", text: "Last question. Where do you see yourself in two years?", es: "«Última pregunta. ¿Dónde te ves en dos años?»" },
        { speaker: "dani", text: "In two years, I see myself leading the academic team of this school.", es: "«En dos años, me veo liderando el equipo académico de esta escuela»." },
        { speaker: "dani", text: "I have been preparing for this every day, even when nobody was watching.", es: "«Me he estado preparando para esto todos los días, aun cuando nadie miraba»." },
      ],
      words: [
        { word: "leading", es: "liderando" },
        { word: "preparing", es: "preparando" },
        { word: "watching", es: "mirando" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "Morgan sonríe y da su veredicto mientras Vale observa orgullosa.",
      text: "Dani, in my professional opinion, this school would be lucky to have you.",
      es: "«Dani, en mi opinión profesional, esta escuela tendría suerte de tenerte».",
      speaker: "morgan",
      lines: [
        { speaker: "morgan", text: "Dani, in my professional opinion, this school would be lucky to have you.", es: "«Dani, en mi opinión profesional, esta escuela tendría suerte de tenerte»." },
        { speaker: "morgan", text: "Vale, he answered every question with a reason and an example. Hire him before I do.", es: "«Vale, respondió cada pregunta con una razón y un ejemplo. Contrátalo antes de que yo lo haga»." },
        { speaker: "vale", text: "Thank you, Morgan. See you on Monday — at the renewal meeting.", es: "«Gracias, Morgan. Nos vemos el lunes… en la reunión de renovación»." },
      ],
      words: [
        { word: "professional", es: "profesional" },
        { word: "lucky", es: "afortunada" },
        { word: "renewal", es: "renovación" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Dani cuelga y grita de felicidad mientras el equipo celebra.",
      text: "Dani hung up and screamed so loudly that BigTalk probably heard him.",
      es: "Dani colgó y gritó tan fuerte que probablemente BigTalk lo escuchó.",
      speaker: "narrator",
      lines: [
        { speaker: "dani", text: "I DID IT! Answer, reason, example! It works!", es: "«¡LO LOGRÉ! ¡Respuesta, razón, ejemplo! ¡Funciona!»" },
        { speaker: "sofia", text: "And you breathed! I saw you breathe!", es: "«¡Y respiraste! ¡Te vi respirar!»" },
        { speaker: "vale", text: "Welcome to the team, Coordinator Dani. Formal contract on Monday.", es: "«Bienvenido al equipo, coordinador Dani. Contrato formal el lunes»." },
      ],
      words: [
        { word: "screamed", es: "gritó" },
        { word: "loudly", es: "fuerte" },
        { word: "formal", es: "formal" },
      ],
    },
    {
      id: "s10",
      image: s10,
      imageAlt: "Don Tito llega con pupusas para celebrar el nuevo puesto de Dani.",
      text: "Don Tito appeared with pupusas, because good news travels faster than his motorcycle.",
      es: "Don Tito apareció con pupusas, porque las buenas noticias viajan más rápido que su motocicleta.",
      speaker: "narrator",
      lines: [
        { speaker: "tito", text: "I heard! The boy is a coordinator now!", es: "«¡Me enteré! ¡El muchacho ahora es coordinador!»" },
        { speaker: "dani", text: "Don Tito! How do you always know?", es: "«¡Don Tito! ¿Cómo siempre se entera?»" },
        { speaker: "tito", text: "This neighborhood has ears, kid. Now eat. Champions eat pupusas.", es: "«Este barrio tiene oídos, muchacho. Ahora come. Los campeones comen pupusas»." },
      ],
      words: [
        { word: "ears", es: "oídos" },
        { word: "champions", es: "campeones" },
        { word: "know", es: "saber / enterarse" },
      ],
    },
    {
      id: "s11",
      image: s11,
      imageAlt: "Dani repasa su mejor respuesta una vez más, con calma y seguridad.",
      text: "Dani repeats his best answer one more time — answer, reason, example.",
      es: "Dani repite su mejor respuesta una vez más: respuesta, razón, ejemplo.",
      speaker: "dani",
      lines: [
        { speaker: "vale", text: "One more time, coordinator. Why should we hire you?", es: "«Una vez más, coordinador. ¿Por qué deberíamos contratarte?»" },
        { speaker: "dani", text: "You should hire me because I know every student by name.", es: "«Deberían contratarme porque conozco a cada estudiante por su nombre»." },
        { speaker: "dani", text: "For example, when Ana missed two classes, I called her, and she came back.", es: "«Por ejemplo, cuando Ana faltó a dos clases, la llamé y regresó»." },
        { speaker: "dani", text: "That's my answer: short, true, and with evidence.", es: "«Esa es mi respuesta: corta, verdadera y con evidencia»." },
      ],
      words: [
        { word: "short", es: "corta" },
        { word: "true", es: "verdadera" },
        { word: "evidence", es: "evidencia" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s4",
      questionEn: "What was the three-part formula for every answer?",
      questionEs: "¿Cuál fue la fórmula de tres partes para cada respuesta?",
      options: [
        { label: "Answer, reason, example", emoji: "🧩" },
        { label: "Name, age, address", emoji: "🪪" },
        { label: "Yes, no, maybe", emoji: "🎲" },
      ],
      answer: 0,
      sayIt: "Every answer has three parts: answer, reason, example.",
      sayItEs: "Ejemplo: «Every answer has three parts: answer, reason, example.»",
      sayItAskEn: "Tell me about yourself. Who are you and what do you do?",
      sayItAskEs: "Cuéntame de ti. ¿Quién eres y qué haces?",
      sayItCheck: {
        target: "I am * and I *",
        altTargets: ["I'm *. I *", "My name is * and I *", "I have worked *"],
      },
    },
    {
      id: "q2",
      afterScene: "s6",
      questionEn: "How did Dani answer the question about a mistake?",
      questionEs: "¿Cómo respondió Dani la pregunta sobre un error?",
      options: [
        { label: "Mistake, action, change — with a real example", emoji: "🔧" },
        { label: "He said he never makes mistakes", emoji: "😇" },
        { label: "He blamed Camila", emoji: "👉" },
      ],
      answer: 0,
      sayIt: "I gave a student the wrong schedule. I apologized, and now I check every schedule twice.",
      sayItEs: "Ejemplo: «I gave a student the wrong schedule. I apologized, and now I check every schedule twice.»",
      sayItAskEn: "Tell me about a mistake you made, and what you did after.",
      sayItAskEs: "Cuéntame de un error que cometiste y qué hiciste después.",
      sayItCheck: {
        target: "I * and then I *",
        altTargets: ["I made a mistake: I *. After that, I *", "I *, so I *", "Once, I *"],
      },
    },
    {
      id: "q3",
      afterScene: "s7",
      questionEn: "Where does Dani see himself in two years?",
      questionEs: "¿Dónde se ve Dani en dos años?",
      options: [
        { label: "Leading the academic team of the school", emoji: "🧭" },
        { label: "Working at BigTalk", emoji: "🏢" },
        { label: "Sleeping all day", emoji: "😴" },
      ],
      answer: 0,
      sayIt: "In two years, I see myself leading the academic team.",
      sayItEs: "Ejemplo: «In two years, I see myself leading the academic team.»",
      sayItAskEn: "Where do you see yourself in two years? Why there?",
      sayItAskEs: "¿Dónde te ves en dos años? ¿Por qué ahí?",
      sayItCheck: {
        target: "In two years, I see myself *",
        altTargets: ["I see myself * because *", "In two years, I * because *", "I want to * because *"],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s5",
    phrase: "I can do it. I breathe, I answer, I give an example.",
    es: "Yo puedo hacerlo. Respiro, respondo, doy un ejemplo.",
  },
  habitCard: {
    afterScene: "s3",
    phrase: "I prepare before the big moment. Practice in the quiet wins in public.",
    es: "Me preparo antes del gran momento. Practicar en silencio gana en público.",
    model: "dani",
    modelActionEs: "Dani entrenó toda la semana con tarjetas antes de su entrevista real.",
  },
  continuePrompt: {
    en: "Your interview: Why should someone hire you or trust you? Answer with a reason and one real example.",
    es: "Tu entrevista: ¿por qué alguien debería contratarte o confiar en ti? Responde con una razón y un ejemplo real.",
  },
  continueWith: ["You should trust me because ...", "For example, ...", "That's why I am ready."],
  cliffhanger: {
    en: "Episode 11: Monday arrives — the renewal meeting, and Don Tito remembers how things used to be.",
    es: "Episodio 11: Llega el lunes — la reunión de renovación, y Don Tito recuerda cómo eran las cosas antes.",
  },
};
