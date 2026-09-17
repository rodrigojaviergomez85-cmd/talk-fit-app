import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/advanced1-ep19-now-you-ask/cover.jpg";
import s1 from "@/assets/storybook/advanced1-ep19-now-you-ask/s1.jpg";
import s2 from "@/assets/storybook/advanced1-ep19-now-you-ask/s2.jpg";
import s3 from "@/assets/storybook/advanced1-ep19-now-you-ask/s3.jpg";
import s4 from "@/assets/storybook/advanced1-ep19-now-you-ask/s4.jpg";
import s5 from "@/assets/storybook/advanced1-ep19-now-you-ask/s5.jpg";
import s6 from "@/assets/storybook/advanced1-ep19-now-you-ask/s6.jpg";
import s7 from "@/assets/storybook/advanced1-ep19-now-you-ask/s7.jpg";
import s8 from "@/assets/storybook/advanced1-ep19-now-you-ask/s8.jpg";
import s9 from "@/assets/storybook/advanced1-ep19-now-you-ask/s9.jpg";

export const ADVANCED1_EP19_NOW_YOU_ASK: StorybookEpisode = {
  id: "advanced1-ep19-now-you-ask",
  moduleId: "advanced-1",
  week: 4,
  title: "Now you ask",
  titleEs: "Ahora preguntas tú",
  episodeLabel: {
    en: "Advanced 1 · Episode 19",
    es: "Advanced 1 · Episodio 19",
  },
  previously: [
    {
      en: "Lidia will lead the pilot classroom and Dani the operation.",
      es: "Lidia dirigirá el salón del piloto y Dani la operación.",
    },
    {
      en: "Crown offered Vale a regional role, but she protected the classroom instead of selling the method as content.",
      es: "Crown le ofreció a Vale un puesto regional, pero ella protegió el salón en vez de vender el método como contenido.",
    },
    {
      en: "Friday turns the chairs around: Vale will test whether the pilot works as a real English class.",
      es: "El viernes se dan vuelta las sillas: Vale probará si el piloto funciona como una clase real de inglés.",
    },
  ],
  reviewWords: [
    { word: "follow-up", es: "repregunta, seguimiento" },
    { word: "classroom", es: "salón de clase" },
    { word: "evidence", es: "evidencia" },
    { word: "attendance", es: "asistencia" },
    { word: "teacher", es: "maestro, maestra" },
  ],
  blurb: {
    en: "A classroom doesn't lie. If students hold back, the method fails.",
    es: "Un salón no miente. Si los estudiantes se contienen, el método falla.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Barrett hands the Friday classroom interview over to Vale.",
      text: "Friday, no pitch deck.",
      es: "Viernes, sin presentación.",
      speaker: "barrett",
      cast: ["barrett", "vale"],
      lines: [
        {
          speaker: "barrett",
          text: "Today you interview. Not for a course, not for a call, and not for a pretty deck. I want to see whether this becomes a real English class.",
          es: "Hoy tú entrevistas. No para un curso, no para una llamada y no para una presentación bonita. Quiero ver si esto se vuelve una clase real de inglés.",
        },
        {
          speaker: "vale",
          text: "Then the rule is simple: if the students speak, the answer survives. If only the teacher speaks, the answer fails.",
          es: "Entonces la regla es simple: si los estudiantes hablan, la respuesta sobrevive. Si solo habla la maestra, la respuesta falla.",
        },
        {
          speaker: "barrett",
          text: "You already recommended Lidia for the classroom and Dani for the operation. Why interview them again?",
          es: "Ya recomendaste a Lidia para el salón y a Dani para la operación. ¿Por qué entrevistarlos otra vez?",
        },
        {
          speaker: "vale",
          text: "Because titles are cheap. I want to see the classroom pressure: noise, nerves, missed words, and a student who pretends to understand.",
          es: "Porque los títulos son baratos. Quiero ver la presión del salón: ruido, nervios, palabras perdidas y un estudiante que finge entender.",
        },
        {
          speaker: "barrett",
          text: "So this is less interview, more live class.",
          es: "Entonces esto es menos entrevista y más clase en vivo.",
        },
        {
          speaker: "vale",
          text: "Exactly. Lidia teaches. Dani protects the conditions that let her teach. I ask questions when the room gets honest.",
          es: "Exacto. Lidia enseña. Dani protege las condiciones que le permiten enseñar. Yo pregunto cuando el salón se vuelve honesto.",
        },
        {
          speaker: "barrett",
          text: "And Dani?",
          es: "¿Y Dani?",
        },
        {
          speaker: "vale",
          text: "Outside, pretending to read one page. He's been on that same paragraph since seven, which means he cares.",
          es: "Afuera, fingiendo leer una página. Lleva en el mismo párrafo desde las siete, lo cual significa que le importa.",
        },
      ],
      words: [
        { word: "pitch deck", es: "presentación de venta" },
        { word: "pressure", es: "presión" },
        { word: "pretends", es: "finge" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Lidia leads a short English class while Vale observes Elena speaking.",
      text: "Lidia starts the class.",
      es: "Lidia empieza la clase.",
      speaker: "lidia",
      cast: ["vale", "lidia", "elena"],
      lines: [
        {
          speaker: "lidia",
          text: "No books open yet. Elena, answer this: what changed after you stopped translating every sentence in your head?",
          es: "Todavía no abran libros. Elena, responde esto: ¿qué cambió después de que dejaste de traducir cada frase en tu cabeza?",
        },
        {
          speaker: "elena",
          text: "I stopped waiting for perfect words. Yesterday I made a mistake, corrected it, and kept talking before my brain could panic.",
          es: "Dejé de esperar palabras perfectas. Ayer cometí un error, lo corregí y seguí hablando antes de que mi cerebro entrara en pánico.",
        },
        {
          speaker: "vale",
          text: "Pause. Lidia, why did you start with that question instead of explaining the grammar?",
          es: "Pausa. Lidia, ¿por qué empezaste con esa pregunta en vez de explicar la gramática?",
        },
        {
          speaker: "lidia",
          text: "Because she already owns the experience. If I explain first, she listens like a student. If she speaks first, I can correct what she actually needs.",
          es: "Porque ella ya tiene la experiencia. Si explico primero, escucha como estudiante. Si habla primero, puedo corregir lo que de verdad necesita.",
        },
        {
          speaker: "elena",
          text: "Also, if she starts with grammar, half the class checks their phone. We don't say it, but we all do it.",
          es: "Además, si empieza con gramática, media clase revisa el teléfono. No lo decimos, pero todos lo hacemos.",
        },
        {
          speaker: "lidia",
          text: "Thank you for reporting the crime in public, Elena.",
          es: "Gracias por reportar el crimen en público, Elena.",
        },
      ],
      words: [
        { word: "translating", es: "traduciendo" },
        { word: "panic", es: "entrar en pánico" },
        { word: "actually", es: "en realidad" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Vale digs deeper into Lidia's classroom decision while Elena listens.",
      text: "Vale digs into the class.",
      es: "Vale profundiza en la clase.",
      speaker: "vale",
      cast: ["vale", "lidia", "elena"],
      lines: [
        {
          speaker: "vale",
          text: "Good. Now I want to dig into it. Elena says she made a mistake and kept talking. What exactly do you correct?",
          es: "Bien. Ahora quiero profundizar. Elena dice que cometió un error y siguió hablando. ¿Qué corriges exactamente?",
        },
        {
          speaker: "lidia",
          text: "Only the error that blocks meaning. If I correct every tiny thing, she starts protecting herself instead of speaking.",
          es: "Solo el error que bloquea el significado. Si corrijo cada detalle pequeño, empieza a protegerse en vez de hablar.",
        },
        {
          speaker: "vale",
          text: "That's the question behind the question in an English class: not 'Was it perfect?' but 'Did communication continue?'",
          es: "Esa es la pregunta detrás de la pregunta en una clase de inglés: no '¿fue perfecto?', sino '¿continuó la comunicación?'",
        },
        {
          speaker: "lidia",
          text: "Exactly. I write the correction on the board after she finishes, so the class remembers the sentence, not the embarrassment.",
          es: "Exacto. Escribo la corrección en la pizarra después de que termina, para que la clase recuerde la frase, no la vergüenza.",
        },
        {
          speaker: "vale",
          text: "Show me.",
          es: "Muéstrame.",
        },
        {
          speaker: "lidia",
          text: "Elena said, 'I corrected it and kept talking.' I would upgrade it to: 'I corrected myself and kept the conversation going.'",
          es: "Elena dijo: 'I corrected it and kept talking'. Yo lo subiría a: 'I corrected myself and kept the conversation going'.",
        },
        {
          speaker: "elena",
          text: "That sounds like me, but with better shoes.",
          es: "Eso suena como yo, pero con mejores zapatos.",
        },
        {
          speaker: "vale",
          text: "Perfect. If the correction still sounds like the student, the class trusts it.",
          es: "Perfecto. Si la corrección todavía suena como la estudiante, la clase confía en ella.",
        },
      ],
      words: [
        { word: "dig into", es: "profundizar en" },
        { word: "the question behind the question", es: "la pregunta detrás de la pregunta" },
        { word: "embarrassment", es: "vergüenza" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Dani enters the classroom interview and answers Vale's operations question.",
      text: "Dani enters the room.",
      es: "Dani entra al salón.",
      speaker: "vale",
      cast: ["vale", "dani"],
      lines: [
        {
          speaker: "vale",
          text: "Sit down. Same pilot, different problem: ten students arrive tired, two missed yesterday, and the teacher says the lesson feels too hard. What do you do before class starts?",
          es: "Siéntate. Mismo piloto, otro problema: diez estudiantes llegan cansados, dos faltaron ayer, y la maestra dice que la lección se siente muy difícil. ¿Qué haces antes de que empiece la clase?",
        },
        {
          speaker: "dani",
          text: "First, I don't redesign the lesson in the hallway. I check attendance, ask Lidia which sentence students are avoiding, and protect the speaking minutes.",
          es: "Primero, no rediseño la lección en el pasillo. Reviso asistencia, le pregunto a Lidia qué frase están evitando los estudiantes, y protejo los minutos de habla.",
        },
        {
          speaker: "vale",
          text: "What if the easiest fix is to make it a video lesson and send them home?",
          es: "¿Y si la solución más fácil es hacerlo una lección en video y mandarlos a casa?",
        },
        {
          speaker: "dani",
          text: "Then it stops being our method. A video can review; it cannot notice when a student is hiding behind 'I don't know'.",
          es: "Entonces deja de ser nuestro método. Un video puede repasar; no puede notar cuando un estudiante se esconde detrás de 'I don't know'.",
        },
        {
          speaker: "vale",
          text: "You answered fast. Is that what you'd do, or what you think I want to hear?",
          es: "Respondiste rápido. ¿Eso harías tú, o lo que crees que quiero oír?",
        },
        {
          speaker: "dani",
          text: "It's what I did in March. I moved the room, kept the teacher, and cut the worksheet instead of cutting the speaking.",
          es: "Es lo que hice en marzo. Moví el salón, mantuve a la maestra y recorté la hoja de trabajo en vez de recortar el habla.",
        },
        {
          speaker: "vale",
          text: "Then say the real week first. A clean opinion is cute; evidence gets hired.",
          es: "Entonces empieza con la semana real. Una opinión limpia suena bonita; la evidencia consigue el puesto.",
        },
      ],
      words: [
        { word: "hallway", es: "pasillo" },
        { word: "worksheet", es: "hoja de trabajo" },
        { word: "evidence", es: "evidencia" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Vale challenges Dani to defend a real classroom decision.",
      text: "Vale pushes the boring answer.",
      es: "Vale presiona la respuesta aburrida.",
      speaker: "vale",
      cast: ["vale", "dani"],
      lines: [
        {
          speaker: "vale",
          text: "I'm going to argue against you. Hold your position or change it honestly.",
          es: "Voy a argumentar en tu contra. Sostén tu posición o cámbiala con honestidad.",
        },
        {
          speaker: "dani",
          text: "I'm already sweating, so let's make it useful.",
          es: "Ya estoy sudando, así que hagámoslo útil.",
        },
        {
          speaker: "vale",
          text: "Suppose Northline asks for fewer class hours because everyone is busy. We could replace one lesson with homework, keep the report beautiful, and nobody outside the room would notice for a month.",
          es: "Supón que Northline pide menos horas de clase porque todos están ocupados. Podríamos reemplazar una lección con tarea, mantener el reporte bonito, y nadie fuera del salón lo notaría por un mes.",
        },
        {
          speaker: "dani",
          text: "That's exactly how an English class turns into an online course nobody finishes.",
          es: "Así es exactamente como una clase de inglés se convierte en un curso en línea que nadie termina.",
        },
        {
          speaker: "vale",
          text: "Good line. Now make it professional.",
          es: "Buena línea. Ahora hazla profesional.",
        },
        {
          speaker: "dani",
          text: "If we reduce live speaking during the first month, students will hold back exactly when they should be building confidence. We can shorten explanations, but we cannot remove the room where correction happens.",
          es: "Si reducimos el habla en vivo durante el primer mes, los estudiantes se van a contener justo cuando deberían estar construyendo confianza. Podemos acortar explicaciones, pero no podemos quitar el salón donde ocurre la corrección.",
        },
        {
          speaker: "vale",
          text: "There. Less dramatic, more useful. Keep that version.",
          es: "Ahí está. Menos dramática, más útil. Quédate con esa versión.",
        },
      ],
      words: [
        { word: "hold back", es: "contenerse, no atreverse" },
        { word: "shorten", es: "acortar" },
        { word: "confidence", es: "confianza" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Dani practices a classroom follow-up with Elena while Vale watches.",
      text: "Dani tries the classroom.",
      es: "Dani prueba el salón.",
      speaker: "dani",
      cast: ["dani", "vale", "elena"],
      lines: [
        {
          speaker: "dani",
          text: "Can I try something with Elena? Thirty seconds, no spreadsheet, no safe chair.",
          es: "¿Puedo intentar algo con Elena? Treinta segundos, sin hoja de cálculo, sin silla segura.",
        },
        {
          speaker: "vale",
          text: "Try it. But don't become a motivational poster.",
          es: "Inténtalo. Pero no te conviertas en póster motivacional.",
        },
        {
          speaker: "dani",
          text: "Elena, what do you do when English gets messy in front of people?",
          es: "Elena, ¿qué haces cuando el inglés se vuelve desordenado frente a la gente?",
        },
        {
          speaker: "elena",
          text: "I laugh, then I want to disappear, then Lidia looks at me like disappearing is not on the schedule.",
          es: "Me río, luego quiero desaparecer, luego Lidia me mira como si desaparecer no estuviera en el horario.",
        },
        {
          speaker: "dani",
          text: "So the real skill isn't never getting lost. It's coming back while people are still listening.",
          es: "Entonces la habilidad real no es nunca perderse. Es regresar mientras la gente todavía escucha.",
        },
        {
          speaker: "vale",
          text: "That sentence belongs in the teacher guide. And yes, Dani, that is me giving you a compliment in public. Don't faint.",
          es: "Esa frase va en la guía del maestro. Y sí, Dani, eso soy yo dándote un cumplido en público. No te desmayes.",
        },
        {
          speaker: "dani",
          text: "Too late. I'm professionally fainting.",
          es: "Demasiado tarde. Me estoy desmayando profesionalmente.",
        },
      ],
      words: [
        { word: "spreadsheet", es: "hoja de cálculo" },
        { word: "messy", es: "desordenado, difícil" },
        { word: "faint", es: "desmayarse" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Barrett interrupts Vale's classroom interview to test the final decision.",
      text: "Barrett interrupts the class.",
      es: "Barrett interrumpe la clase.",
      speaker: "barrett",
      cast: ["barrett", "vale", "lidia"],
      lines: [
        {
          speaker: "barrett",
          text: "I'm going to interrupt before this turns too warm. If Lidia owns the classroom and Dani owns the operation, who owns the result?",
          es: "Voy a interrumpir antes de que esto se vuelva demasiado cálido. Si Lidia dirige el salón y Dani dirige la operación, ¿quién es responsable del resultado?",
        },
        {
          speaker: "vale",
          text: "I do. Leadership is not passing the blame down the hallway.",
          es: "Yo. Liderar no es pasar la culpa por el pasillo.",
        },
        {
          speaker: "barrett",
          text: "Then why not lead the class yourself? You teach better than both of them.",
          es: "Entonces, ¿por qué no dirigir la clase tú misma? Enseñas mejor que los dos.",
        },
        {
          speaker: "vale",
          text: "Because a method that needs my face in every room is not a method. It's a personality.",
          es: "Porque un método que necesita mi cara en cada salón no es un método. Es una personalidad.",
        },
        {
          speaker: "lidia",
          text: "And because I don't need Vale to make the class sound like Vale. I need the students to sound like themselves, only clearer.",
          es: "Y porque no necesito a Vale para que la clase suene como Vale. Necesito que los estudiantes suenen como ellos mismos, solo más claros.",
        },
        {
          speaker: "barrett",
          text: "That's the first answer today I want quoted back to me.",
          es: "Esa es la primera respuesta de hoy que quiero que me citen después.",
        },
        {
          speaker: "vale",
          text: "Careful. If you quote Lidia, she'll make you practise pronunciation.",
          es: "Cuidado. Si citas a Lidia, ella te hará practicar pronunciación.",
        },
        {
          speaker: "lidia",
          text: "Only if he says 'comfortable' like it's four different words.",
          es: "Solo si dice 'comfortable' como si fueran cuatro palabras distintas.",
        },
      ],
      words: [
        { word: "owns", es: "se responsabiliza de" },
        { word: "blame", es: "culpa" },
        { word: "quoted", es: "citado" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "Camila confirms Monday's classroom while Vale gives the learner a speaking task.",
      text: "Your turn, then Monday.",
      es: "Tu turno, luego el lunes.",
      speaker: "vale",
      cast: ["vale", "camila"],
      lines: [
        {
          speaker: "vale",
          text: "Your turn, and today you ask like a teacher. Ask me three questions about this class. The third one must use my answer, not your script.",
          es: "Tu turno, y hoy preguntas como maestro. Hazme tres preguntas sobre esta clase. La tercera debe usar mi respuesta, no tu guion.",
        },
        {
          speaker: "camila",
          text: "Sorry to break the teacher moment. Monday is confirmed: nineteen adults in the room, two countries represented, and the board sitting at the back like it's a final exam.",
          es: "Perdón por romper el momento de maestra. El lunes está confirmado: diecinueve adultos en el salón, dos países representados y la junta sentada atrás como si fuera examen final.",
        },
        {
          speaker: "vale",
          text: "Then plan the first ten minutes as if everyone's nervous, because everyone will be.",
          es: "Entonces planea los primeros diez minutos como si todos estuvieran nerviosos, porque todos lo estarán.",
        },
        {
          speaker: "camila",
          text: "Dani asked me not to tell you something, which was an adorable mistake, because I tell you everything useful.",
          es: "Dani me pidió que no te contara algo, lo cual fue un error adorable, porque yo te cuento todo lo útil.",
        },
        {
          speaker: "vale",
          text: "Go on.",
          es: "Sigue.",
        },
        {
          speaker: "camila",
          text: "He came early to move chairs before anyone saw him. He said, 'If the room works, I want them to know I helped build it.'",
          es: "Llegó temprano a mover sillas antes de que alguien lo viera. Dijo: 'Si el salón funciona, quiero que sepan que ayudé a construirlo'.",
        },
        {
          speaker: "vale",
          text: "That's not a small sentence for Dani.",
          es: "Esa no es una frase pequeña para Dani.",
        },
      ],
      words: [
        { word: "script", es: "guion" },
        { word: "confirmed", es: "confirmado" },
        { word: "represented", es: "representados" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Vale explains the classroom decision to Barrett before Monday's pilot.",
      text: "What the room proved.",
      es: "Lo que probó el salón.",
      speaker: "vale",
      cast: ["vale", "barrett"],
      lines: [
        {
          speaker: "barrett",
          text: "Before you tell them, tell me what you were actually testing.",
          es: "Antes de decírselo a ellos, dime qué estabas probando en realidad.",
        },
        {
          speaker: "vale",
          text: "Whether they could read the room before they read the plan: who stopped speaking, who hid behind a joke, who needed correction, and who made the student speak again.",
          es: "Si podían leer el ambiente antes de leer el plan: quién dejó de hablar, quién se escondió detrás de una broma, quién necesitaba corrección y quién hizo que la estudiante hablara otra vez.",
        },
        {
          speaker: "barrett",
          text: "So Lidia teaches Monday.",
          es: "Entonces Lidia enseña el lunes.",
        },
        {
          speaker: "vale",
          text: "Yes. She knows when to explain, when to correct, and when to let the mistake breathe for five seconds.",
          es: "Sí. Sabe cuándo explicar, cuándo corregir y cuándo dejar que el error respire cinco segundos.",
        },
        {
          speaker: "barrett",
          text: "And Dani?",
          es: "¿Y Dani?",
        },
        {
          speaker: "vale",
          text: "Dani owns the operation. But today he finally said the quiet part: he doesn't just want to fix invisible problems; he wants to stand behind the work in public.",
          es: "Dani dirige la operación. Pero hoy por fin dijo la parte silenciosa: no solo quiere arreglar problemas invisibles; quiere respaldar el trabajo en público.",
        },
        {
          speaker: "barrett",
          text: "Which points straight at what comes after this pilot.",
          es: "Eso apunta directo a lo que viene después de este piloto.",
        },
        {
          speaker: "vale",
          text: "Exactly. Advanced 1 got him into the room. Advanced 2 will put the difficult person in front of him, and Advanced 3 will make him defend an opinion without hiding.",
          es: "Exacto. Advanced 1 lo metió al salón. Advanced 2 pondrá a la persona difícil frente a él, y Advanced 3 lo hará defender una opinión sin esconderse.",
        },
        {
          speaker: "barrett",
          text: "Monday, then. The board sits in the back of the first class, and they question you when the students leave.",
          es: "El lunes, entonces. La junta se sienta al fondo de la primera clase, y te interroga cuando los estudiantes salgan.",
        },
      ],
      words: [
        { word: "read the room", es: "leer el ambiente" },
        { word: "correction", es: "corrección" },
        { word: "invisible", es: "invisible" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s6",
      questionEn: "Why does Dani reject replacing live class time with homework in month one?",
      questionEs: "¿Por qué Dani rechaza reemplazar clase en vivo con tarea en el mes uno?",
      options: [
        { label: "Because that's when students hold back from speaking", emoji: "🤐" },
        { label: "Because videos are always more expensive", emoji: "💵" },
        { label: "Because grammar should never be corrected", emoji: "📘" },
      ],
      answer: 0,
      sayIt: "Because month one is when students hold back, and live correction helps them keep speaking.",
      sayItEs: "Porque el mes uno es cuando los estudiantes se contienen, y la corrección en vivo les ayuda a seguir hablando.",
      sayItCheck: {
        target: "Because month one is when students hold back",
        altTargets: ["Students hold back from speaking", "Live correction helps them keep speaking"],
      },
    },
    {
      id: "q2",
      afterScene: "s8",
      questionEn: "Ask like a teacher: three classroom questions, and make the third a real follow-up.",
      questionEs: "Pregunta como maestro: tres preguntas de clase y que la tercera sea una repregunta real.",
      options: [
        { label: "I am ready to ask", emoji: "🎤" },
        { label: "I want to hear the example again", emoji: "👂" },
        { label: "I will practice later", emoji: "⏰" },
      ],
      answer: 0,
      sayIt: "What sentence felt hardest today? What helped you say it anyway? And when you got stuck, what did you do next?",
      sayItEs: "¿Qué frase se sintió más difícil hoy? ¿Qué te ayudó a decirla de todos modos? Y cuando te trabaste, ¿qué hiciste después?",
      sayItAskEn: "Ask three classroom questions. Start the third with \"And when you got stuck ...\".",
      sayItAskEs: "Haz tres preguntas de clase. Empieza la tercera con \"And when you got stuck …\".",
      sayItCheck: {
        target: "What *",
        altTargets: ["What helped you *", "And when you got stuck *"],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s9",
    phrase: "A real class is measured by who speaks next.",
    es: "Una clase real se mide por quién habla después.",
  },
  habitCard: {
    afterScene: "s3",
    phrase: "I correct the mistake that blocks meaning first.",
    es: "Corrijo primero el error que bloquea el significado.",
    model: "vale",
    modelActionEs: "Vale evaluó si Lidia corregía para que la estudiante siguiera hablando, no para sonar perfecta.",
  },
  expressions: [
    {
      phrase: "dig into",
      variants: ["digs into", "dug into", "digging into"],
      es: "profundizar en, investigar a fondo",
      kind: "phrasal",
      example: "Now I want to dig into it.",
      exampleEs: "Ahora quiero profundizar.",
    },
    {
      phrase: "hold back",
      variants: ["holds back", "held back", "holding back"],
      es: "contenerse, no atreverse",
      kind: "phrasal",
      example: "Students will hold back exactly when they should be building confidence.",
      exampleEs: "Los estudiantes se van a contener justo cuando deberían construir confianza.",
    },
    {
      phrase: "read the room",
      variants: ["reads the room", "reading the room"],
      es: "leer el ambiente",
      kind: "idiom",
      example: "They could read the room before they read the plan.",
      exampleEs: "Podían leer el ambiente antes de leer el plan.",
    },
    {
      phrase: "the question behind the question",
      es: "la verdadera razón detrás de una pregunta",
      kind: "idiom",
      example: "That's the question behind the question in an English class.",
      exampleEs: "Esa es la pregunta detrás de la pregunta en una clase de inglés.",
    },
  ],
  finaleSeconds: 30,
  continuePrompt: {
    en: "Thirty seconds: ask three classroom questions — make the third a real follow-up.",
    es: "Treinta segundos: haz tres preguntas de clase — que la tercera sea una repregunta real.",
  },
  continueWith: [
    "What sentence felt hardest?",
    "What helped you say it?",
    "And when you got stuck, ...?",
  ],
  cliffhanger: {
    en: "Monday: the first real class, the board in the back, and questions when the students leave.",
    es: "El lunes: la primera clase real, la junta al fondo y preguntas cuando los estudiantes salgan.",
  },
};
