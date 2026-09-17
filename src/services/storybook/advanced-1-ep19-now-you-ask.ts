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
  title: "The room chooses Dani",
  titleEs: "El salón elige a Dani",
  episodeLabel: {
    en: "Advanced 1 · Episode 19",
    es: "Advanced 1 · Episodio 19",
  },
  previously: [
    {
      en: "Vale became CEO after the ten-million-dollar Northline contract.",
      es: "Vale se convirtió en CEO después del contrato de diez millones con Northline.",
    },
    {
      en: "Dani survived his first day as Director of Operations.",
      es: "Dani sobrevivió su primer día como Director de Operaciones.",
    },
    {
      en: "Advanced 2 will follow Dani when people, not schedules, become the problem.",
      es: "Advanced 2 seguirá a Dani cuando el problema sean personas, no horarios.",
    },
  ],
  reviewWords: [
    { word: "director", es: "director" },
    { word: "classroom", es: "salón de clase" },
    { word: "confidence", es: "confianza" },
    { word: "support", es: "apoyo" },
    { word: "evidence", es: "evidencia" },
  ],
  blurb: {
    en: "A Gen Z class pushes Dani into the spotlight, and his first real speech does not go as planned.",
    es: "Una clase Gen Z empuja a Dani al centro, y su primer discurso real no sale como planeó.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Vale watches a live English class while Dani stands near the back of the room.",
      text: "Friday, the live room.",
      es: "Viernes, el salón en vivo.",
      speaker: "vale",
      cast: ["vale", "dani", "lidia"],
      lines: [
        { speaker: "vale", text: "Today is not a presentation. It is a real English class, with real students and real side-eyes.", es: "Hoy no es una presentación. Es una clase real de inglés, con estudiantes reales y miradas reales de juicio." },
        { speaker: "dani", text: "Side-eyes should be included in the budget. They are emotionally expensive.", es: "Las miradas de juicio deberían estar en el presupuesto. Son emocionalmente caras." },
        { speaker: "lidia", text: "If you stand near the door, they will think you are security.", es: "Si te paras cerca de la puerta, van a creer que eres seguridad." },
        { speaker: "dani", text: "At this point, I would accept any role with clear instructions.", es: "A este punto, aceptaría cualquier rol con instrucciones claras." },
      ],
      words: [
        { word: "side-eyes", es: "miradas de juicio" },
        { word: "budget", es: "presupuesto" },
        { word: "security", es: "seguridad" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Elena speaks during the English class while Lidia guides the discussion.",
      text: "Elena breaks the ice.",
      es: "Elena rompe el hielo.",
      speaker: "elena",
      cast: ["elena", "lidia", "vale"],
      lines: [
        { speaker: "lidia", text: "Elena, tell the room what changed when English stopped feeling like a test.", es: "Elena, dile al salón qué cambió cuando el inglés dejó de sentirse como examen." },
        { speaker: "elena", text: "I started answering before I had the perfect sentence. That sounds small, but for me it was basically emotional parkour.", es: "Empecé a responder antes de tener la frase perfecta. Suena pequeño, pero para mí fue básicamente parkour emocional." },
        { speaker: "vale", text: "And what did Lidia correct?", es: "¿Y qué corrigió Lidia?" },
        { speaker: "elena", text: "The sentence that blocked meaning. She did not turn my mistake into a public crime scene.", es: "La frase que bloqueaba el significado. No convirtió mi error en escena de crimen pública." },
      ],
      words: [
        { word: "breaks the ice", es: "rompe el hielo" },
        { word: "parkour", es: "parkour" },
        { word: "blocked", es: "bloqueó" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "A student asks Dani what operations has to do with English speaking.",
      text: "The question turns.",
      es: "La pregunta gira.",
      speaker: "elena",
      cast: ["elena", "dani", "lidia"],
      lines: [
        { speaker: "elena", text: "Can I ask Dani something? If Lidia teaches us, what do operations people actually do, besides look stressed with a laptop?", es: "¿Puedo preguntarle algo a Dani? Si Lidia nos enseña, ¿qué hace realmente la gente de operaciones, además de verse estresada con una laptop?" },
        { speaker: "dani", text: "That is a violent but fair question.", es: "Esa es una pregunta violenta pero justa." },
        { speaker: "lidia", text: "Answer it. And please do not say 'synergy'.", es: "Respóndela. Y por favor no digas 'sinergia'." },
        { speaker: "dani", text: "Operations protects the room so speaking can happen. If the teacher has no room, no time or no support, the method becomes a beautiful theory.", es: "Operaciones protege el salón para que hablar pueda ocurrir. Si la maestra no tiene salón, tiempo o apoyo, el método se vuelve una teoría bonita." },
      ],
      words: [
        { word: "operations", es: "operaciones" },
        { word: "stressed", es: "estresado" },
        { word: "theory", es: "teoría" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Vale asks Dani to explain his answer in stronger B2 English.",
      text: "Vale levels it up.",
      es: "Vale lo sube de nivel.",
      speaker: "vale",
      cast: ["vale", "dani"],
      lines: [
        { speaker: "vale", text: "Good. Now level it up. Use contrast: although the work is invisible, the result is visible.", es: "Bien. Ahora súbelo de nivel. Usa contraste: aunque el trabajo es invisible, el resultado es visible." },
        { speaker: "dani", text: "Although operations is invisible, the result is visible: students speak longer because the class is protected before problems reach the teacher.", es: "Aunque operaciones es invisible, el resultado es visible: los estudiantes hablan más tiempo porque la clase se protege antes de que los problemas lleguen a la maestra." },
        { speaker: "vale", text: "There. That is B2: not fancy, just precise.", es: "Ahí está. Eso es B2: no elegante, solo preciso." },
        { speaker: "dani", text: "I would like that printed on a mug immediately.", es: "Quiero eso impreso en una taza de inmediato." },
      ],
      words: [
        { word: "although", es: "aunque" },
        { word: "visible", es: "visible" },
        { word: "precise", es: "preciso" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Camila interrupts the class with a finance reality check.",
      text: "Camila brings reality.",
      es: "Camila trae realidad.",
      speaker: "camila",
      cast: ["camila", "dani", "vale"],
      lines: [
        { speaker: "camila", text: "Since everyone is being inspiring, let me ruin the vibe responsibly. Extra rooms cost money.", es: "Ya que todos están inspiradores, permítanme arruinar el ambiente responsablemente. Salones extra cuestan dinero." },
        { speaker: "dani", text: "And this is why Camila is Financial Manager: she can make a spreadsheet sound like a boundary.", es: "Y por eso Camila es gerente financiera: puede hacer que una hoja de cálculo suene como un límite." },
        { speaker: "camila", text: "Because it is a boundary. If we scale up too fast, quality becomes a rumor with branding.", es: "Porque sí es un límite. Si crecemos demasiado rápido, la calidad se vuelve un rumor con marca." },
        { speaker: "vale", text: "That's the line. Growth is exciting only if the class remains real.", es: "Esa es la frase. El crecimiento emociona solo si la clase sigue siendo real." },
      ],
      words: [
        { word: "scale up", es: "crecer, escalar" },
        { word: "boundary", es: "límite" },
        { word: "branding", es: "marca, imagen" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Dani admits his fear in front of the class and laughs with Elena.",
      text: "The honest minute.",
      es: "El minuto honesto.",
      speaker: "dani",
      cast: ["dani", "elena", "vale"],
      lines: [
        { speaker: "dani", text: "Can I say the embarrassing part? I wanted the title, and now I am scared that the title will expose me.", es: "¿Puedo decir la parte vergonzosa? Quería el título, y ahora me da miedo que el título me exponga." },
        { speaker: "elena", text: "That is literally every student when the teacher says, 'Who wants to answer?'", es: "Eso es literalmente cada estudiante cuando la maestra dice: '¿Quién quiere responder?'" },
        { speaker: "vale", text: "Exactly. Leadership and speaking are cousins: both feel fake until you do them while nervous.", es: "Exacto. Liderazgo y habla son primos: ambos se sienten falsos hasta que los haces con nervios." },
        { speaker: "dani", text: "Then I will stop waiting to feel ready and start showing up prepared.", es: "Entonces dejaré de esperar sentirme listo y empezaré a presentarme preparado." },
      ],
      words: [
        { word: "embarrassing", es: "vergonzoso" },
        { word: "literally", es: "literalmente" },
        { word: "showing up", es: "presentándome" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Vale gives the learner a B2 speaking challenge from the classroom.",
      text: "Your turn: ask and build.",
      es: "Tu turno: pregunta y construye.",
      speaker: "vale",
      cast: ["vale", "elena"],
      lines: [
        { speaker: "vale", text: "Your turn. Ask a follow-up question, use the answer, and build a stronger sentence from it.", es: "Tu turno. Haz una repregunta, usa la respuesta y construye una frase más fuerte con ella." },
        { speaker: "elena", text: "So not just 'Why?' like a suspicious aunt?", es: "¿Entonces no solo 'Why?' como una tía sospechosa?" },
        { speaker: "vale", text: "Exactly. Ask with purpose: What made it difficult? What changed? What would you do differently next time?", es: "Exacto. Pregunta con propósito: ¿Qué lo hizo difícil? ¿Qué cambió? ¿Qué harías distinto la próxima vez?" },
      ],
      words: [
        { word: "follow-up", es: "repregunta" },
        { word: "suspicious", es: "sospechosa" },
        { word: "purpose", es: "propósito" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "Barrett listens as Dani connects Advanced 2 and Advanced 3 to his new role.",
      text: "Barrett hears the bridge.",
      es: "Barrett escucha el puente.",
      speaker: "barrett",
      cast: ["barrett", "dani", "vale"],
      lines: [
        { speaker: "barrett", text: "Dani, say what happens next, without hiding behind a joke.", es: "Dani, di qué pasa después, sin esconderte detrás de una broma." },
        { speaker: "dani", text: "Advanced 2 should put me in front of upset people: parents, clients, teachers and students who need answers fast. Advanced 3 should force me to defend decisions in public, even when half the room disagrees.", es: "Advanced 2 debería ponerme frente a personas molestas: padres, clientes, maestros y estudiantes que necesitan respuestas rápido. Advanced 3 debería obligarme a defender decisiones en público, incluso cuando media sala no está de acuerdo." },
        { speaker: "vale", text: "That is the bridge. He is not becoming perfect; he is becoming responsible out loud.", es: "Ese es el puente. No se está volviendo perfecto; se está volviendo responsable en voz alta." },
      ],
      words: [
        { word: "hide behind", es: "esconderse detrás de" },
        { word: "defend", es: "defender" },
        { word: "disagrees", es: "no está de acuerdo" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "The class applauds Dani after his honest answer about leadership.",
      text: "The room answers back.",
      es: "El salón responde.",
      speaker: "elena",
      cast: ["elena", "dani", "vale", "camila"],
      lines: [
        { speaker: "elena", text: "For the record, Director Dani, your first public speech was less boring than the school assemblies I survived.", es: "Para que conste, Director Dani, tu primer discurso público fue menos aburrido que las asambleas escolares que sobreviví." },
        { speaker: "dani", text: "That is painfully specific and somehow beautiful.", es: "Eso es dolorosamente específico y de alguna manera hermoso." },
        { speaker: "camila", text: "Put it on the website: 'less boring than assemblies.' Very premium.", es: "Pónganlo en el sitio web: 'menos aburrido que asambleas'. Muy premium." },
        { speaker: "vale", text: "Laugh now. Tomorrow we close the season and choose the first problem Dani will own alone.", es: "Rían ahora. Mañana cerramos la temporada y elegimos el primer problema que Dani asumirá solo." },
      ],
      words: [
        { word: "for the record", es: "para que conste" },
        { word: "assemblies", es: "asambleas" },
        { word: "premium", es: "premium, de alta categoría" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s4",
      questionEn: "How does Vale ask Dani to improve his answer?",
      questionEs: "¿Cómo le pide Vale a Dani mejorar su respuesta?",
      options: [
        { label: "Use contrast and be precise", emoji: "🎯" },
        { label: "Make it longer and more dramatic", emoji: "🎭" },
        { label: "Avoid answering Elena's question", emoji: "🙈" },
      ],
      answer: 0,
      sayIt: "Although the work is invisible, the result is visible.",
      sayItEs: "Aunque el trabajo es invisible, el resultado es visible.",
      sayItCheck: {
        target: "Although the work is invisible, the result is visible",
        altTargets: ["Although operations is invisible, the result is visible", "The result is visible"],
      },
    },
    {
      id: "q2",
      afterScene: "s7",
      questionEn: "Ask three purposeful follow-up questions about someone's answer.",
      questionEs: "Haz tres repreguntas con propósito sobre la respuesta de alguien.",
      options: [
        { label: "I am ready to ask", emoji: "🎤" },
        { label: "I want to hear the example again", emoji: "👂" },
        { label: "I will practice later", emoji: "⏰" },
      ],
      answer: 0,
      sayIt: "What made it difficult? What changed after that? And what would you do differently next time?",
      sayItEs: "¿Qué lo hizo difícil? ¿Qué cambió después de eso? ¿Y qué harías diferente la próxima vez?",
      sayItAskEn: "Ask three follow-up questions. Make the third question use the previous answer.",
      sayItAskEs: "Haz tres repreguntas. Que la tercera use la respuesta anterior.",
      sayItCheck: {
        target: "What *",
        altTargets: ["What made it difficult", "What would you do differently"],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s6",
    phrase: "I can be nervous and still show up prepared.",
    es: "Puedo estar nervioso y aun así presentarme preparado.",
  },
  habitCard: {
    afterScene: "s4",
    phrase: "I use contrast to make my point clearer.",
    es: "Uso contraste para aclarar mi punto.",
    model: "dani",
    modelActionEs: "Dani subió su respuesta usando although y conectando trabajo invisible con resultado visible.",
  },
  expressions: [
    {
      phrase: "scale up",
      variants: ["scales up", "scaled up", "scaling up"],
      es: "crecer, escalar",
      kind: "phrasal",
      example: "If we scale up too fast, quality becomes a rumor with branding.",
      exampleEs: "Si crecemos demasiado rápido, la calidad se vuelve un rumor con marca.",
    },
    {
      phrase: "hide behind",
      variants: ["hides behind", "hid behind", "hiding behind"],
      es: "esconderse detrás de",
      kind: "phrasal",
      example: "Say what happens next, without hiding behind a joke.",
      exampleEs: "Di qué pasa después, sin esconderte detrás de una broma.",
    },
    {
      phrase: "break the ice",
      variants: ["breaks the ice", "broke the ice", "breaking the ice"],
      es: "romper el hielo",
      kind: "idiom",
      example: "Elena breaks the ice.",
      exampleEs: "Elena rompe el hielo.",
    },
    {
      phrase: "for the record",
      es: "para que conste",
      kind: "idiom",
      example: "For the record, Director Dani, your first public speech was less boring.",
      exampleEs: "Para que conste, Director Dani, tu primer discurso público fue menos aburrido.",
    },
  ],
  finaleSeconds: 30,
  continuePrompt: {
    en: "Thirty seconds: ask three follow-up questions that make the other person keep speaking.",
    es: "Treinta segundos: haz tres repreguntas que hagan que la otra persona siga hablando.",
  },
  continueWith: [
    "What made it difficult?",
    "What changed after that?",
    "What would you do differently?",
  ],
  cliffhanger: {
    en: "The class believes Dani can lead. Now Vale has to choose the first problem he will own without her.",
    es: "La clase cree que Dani puede liderar. Ahora Vale debe escoger el primer problema que él asumirá sin ella.",
  },
};
