import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/advanced1-ep17-show-me-dont-tell-me/cover.jpg";
import s1 from "@/assets/storybook/advanced1-ep17-show-me-dont-tell-me/s1.jpg";
import s2 from "@/assets/storybook/advanced1-ep17-show-me-dont-tell-me/s2.jpg";
import s3 from "@/assets/storybook/advanced1-ep17-show-me-dont-tell-me/s3.jpg";
import s4 from "@/assets/storybook/advanced1-ep17-show-me-dont-tell-me/s4.jpg";
import s5 from "@/assets/storybook/advanced1-ep17-show-me-dont-tell-me/s5.jpg";
import s6 from "@/assets/storybook/advanced1-ep17-show-me-dont-tell-me/s6.jpg";
import s7 from "@/assets/storybook/advanced1-ep17-show-me-dont-tell-me/s7.jpg";
import s8 from "@/assets/storybook/advanced1-ep17-show-me-dont-tell-me/s8.jpg";
import s9 from "@/assets/storybook/advanced1-ep17-show-me-dont-tell-me/s9.jpg";

export const ADVANCED1_EP17_SHOW_ME_DONT_TELL_ME: StorybookEpisode = {
  id: "advanced1-ep17-show-me-dont-tell-me",
  moduleId: "advanced-1",
  week: 4,
  title: "The ten-million yes",
  titleEs: "El sí de diez millones",
  episodeLabel: {
    en: "Advanced 1 · Episode 17",
    es: "Advanced 1 · Episodio 17",
  },
  previously: [
    {
      en: "Vale sent the ninety-day plan with dates, names and evidence.",
      es: "Vale envió el plan de noventa días con fechas, nombres y evidencia.",
    },
    {
      en: "Northline wanted proof that the method could work without Vale in every room.",
      es: "Northline quería prueba de que el método podía funcionar sin Vale en cada salón.",
    },
    {
      en: "Dani and Camila helped turn the proposal into something bigger than a pilot.",
      es: "Dani y Camila ayudaron a convertir la propuesta en algo más grande que un piloto.",
    },
  ],
  reviewWords: [
    { word: "committee", es: "comité" },
    { word: "evidence", es: "evidencia" },
    { word: "pilot", es: "plan piloto" },
    { word: "operation", es: "operación" },
    { word: "measurement", es: "medición" },
  ],
  blurb: {
    en: "The board says yes, but the real test is how Vale gives power away.",
    es: "La junta dice que sí, pero la prueba real es cómo Vale reparte el poder.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Vale, Dani and Camila wait outside the board room before Northline's decision.",
      text: "Wednesday, the quiet hallway.",
      es: "Miércoles, el pasillo en silencio.",
      speaker: "dani",
      cast: ["dani", "vale", "camila"],
      lines: [
        { speaker: "dani", text: "My shirt has been ironed twice, and it still looks nervous.", es: "Mi camisa ha sido planchada dos veces, y todavía se ve nerviosa." },
        { speaker: "camila", text: "Your shirt is fine. Your face looks like the Wi-Fi just died during payroll.", es: "Tu camisa está bien. Tu cara parece que el internet murió durante la planilla." },
        { speaker: "vale", text: "Breathe. If they say no, we learn. If they say yes, we grow up in public.", es: "Respiren. Si dicen que no, aprendemos. Si dicen que sí, crecemos en público." },
        { speaker: "dani", text: "That's supposed to calm me down? Because my stomach just opened a group chat.", es: "¿Eso se supone que me calma? Porque mi estómago acaba de abrir un chat grupal." },
      ],
      words: [
        { word: "hallway", es: "pasillo" },
        { word: "payroll", es: "planilla" },
        { word: "calm", es: "calmar" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Barrett opens the Northline board decision in front of Vale.",
      text: "Barrett opens the folder.",
      es: "Barrett abre la carpeta.",
      speaker: "barrett",
      cast: ["barrett", "vale", "reed"],
      lines: [
        { speaker: "barrett", text: "We asked for a pilot. What came back was a system with dates, costs, roles and consequences.", es: "Pedimos un piloto. Lo que recibimos fue un sistema con fechas, costos, roles y consecuencias." },
        { speaker: "reed", text: "So the board is not approving a pilot anymore.", es: "Así que la junta ya no está aprobando un piloto." },
        { speaker: "vale", text: "Then tell me what you are approving, because my team is outside trying not to faint.", es: "Entonces díganme qué están aprobando, porque mi equipo está afuera intentando no desmayarse." },
        { speaker: "barrett", text: "A twelve-month international contract: three countries first, with the option to roll it out worldwide.", es: "Un contrato internacional de doce meses: tres países primero, con la opción de expandirlo mundialmente." },
      ],
      words: [
        { word: "system", es: "sistema" },
        { word: "consequences", es: "consecuencias" },
        { word: "worldwide", es: "a nivel mundial" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Reed names the ten-million-dollar contract while Vale stays composed.",
      text: "The number lands.",
      es: "La cifra cae.",
      speaker: "reed",
      cast: ["reed", "vale", "barrett"],
      lines: [
        { speaker: "reed", text: "Total value: ten million dollars, paid in milestones, not vibes.", es: "Valor total: diez millones de dólares, pagados por hitos, no por buenas vibras." },
        { speaker: "barrett", text: "I know that number is enormous. Do not say yes just because it sounds enormous.", es: "Sé que esa cifra es enorme. No digas que sí solo porque suena enorme." },
        { speaker: "vale", text: "I'm not dazzled by the number. I'm checking whether the promise can survive the number.", es: "La cifra no me deslumbra. Estoy revisando si la promesa puede sobrevivir a la cifra." },
        { speaker: "reed", text: "That is either maturity or the calmest panic attack I have ever seen.", es: "Eso es madurez o el ataque de pánico más calmado que he visto." },
      ],
      words: [
        { word: "ten million dollars", es: "diez millones de dólares" },
        { word: "milestones", es: "hitos" },
        { word: "dazzled", es: "deslumbrada" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Vale calls Dani and Camila into the room for the decision.",
      text: "Bring them in.",
      es: "Que entren.",
      speaker: "vale",
      cast: ["vale", "dani", "camila", "barrett"],
      lines: [
        { speaker: "vale", text: "Before I answer, bring Dani and Camila in. A contract that big cannot be accepted by one face.", es: "Antes de responder, llamen a Dani y Camila. Un contrato así de grande no se acepta con una sola cara." },
        { speaker: "barrett", text: "You understand most founders keep the spotlight when the room says yes.", es: "Entiendes que la mayoría de fundadores se quedan con el foco cuando la sala dice que sí." },
        { speaker: "vale", text: "Then I will stand out by stepping aside at the right moment.", es: "Entonces voy a destacar haciéndome a un lado en el momento correcto." },
        { speaker: "camila", text: "If this is bad news, I wore uncomfortable shoes for nothing.", es: "Si estas son malas noticias, usé zapatos incómodos para nada." },
        { speaker: "dani", text: "Same, except mine are emotional shoes.", es: "Igual, excepto que los míos son zapatos emocionales." },
      ],
      words: [
        { word: "accepted", es: "aceptado" },
        { word: "spotlight", es: "foco, atención" },
        { word: "uncomfortable", es: "incómodos" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Vale appoints Dani as Director of Operations in front of the board.",
      text: "Dani's title changes.",
      es: "El título de Dani cambia.",
      speaker: "vale",
      cast: ["vale", "dani", "barrett"],
      lines: [
        { speaker: "vale", text: "Dani will be Director of Operations. He already runs the invisible work; now the title will catch up with the responsibility.", es: "Dani será Director de Operaciones. Ya dirige el trabajo invisible; ahora el título alcanzará la responsabilidad." },
        { speaker: "dani", text: "I had a joke ready, but my brain just resigned.", es: "Tenía una broma lista, pero mi cerebro acaba de renunciar." },
        { speaker: "barrett", text: "Director of Operations means you own delays, staffing and problems before they become public.", es: "Director de Operaciones significa que eres responsable de retrasos, personal y problemas antes de que se vuelvan públicos." },
        { speaker: "dani", text: "Then I accept, provided that I am allowed to say when the schedule is lying to us.", es: "Entonces acepto, siempre que se me permita decir cuando el horario nos está mintiendo." },
      ],
      words: [
        { word: "Director of Operations", es: "Director de Operaciones" },
        { word: "staffing", es: "personal, contratación" },
        { word: "provided", es: "siempre que" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Camila receives the finance manager role and asks for authority, not applause.",
      text: "Camila's condition.",
      es: "La condición de Camila.",
      speaker: "camila",
      cast: ["camila", "vale", "reed"],
      lines: [
        { speaker: "vale", text: "Camila becomes Financial Manager for the expansion. If the numbers look pretty but the cash flow breaks, the story breaks.", es: "Camila será gerente financiera de la expansión. Si los números se ven bonitos pero el flujo de caja se rompe, la historia se rompe." },
        { speaker: "camila", text: "I accept on one condition: I get to push back before anyone signs something cute and impossible.", es: "Acepto con una condición: puedo oponerme antes de que alguien firme algo lindo e imposible." },
        { speaker: "reed", text: "A financial manager who pushes back can save us more money than a polite one.", es: "Una gerente financiera que se opone puede ahorrarnos más dinero que una amable." },
        { speaker: "camila", text: "Great. I will be aggressively useful and only mildly annoying.", es: "Excelente. Seré agresivamente útil y solo ligeramente molesta." },
      ],
      words: [
        { word: "Financial Manager", es: "gerente financiera" },
        { word: "cash flow", es: "flujo de caja" },
        { word: "mildly", es: "ligeramente" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Vale frames the new company structure for Vale Kids and Vale Adults.",
      text: "Vale names the future.",
      es: "Vale nombra el futuro.",
      speaker: "vale",
      cast: ["vale", "dani", "camila"],
      lines: [
        { speaker: "vale", text: "Then this is the structure: Vale Adults grows through Northline, Vale Kids keeps its own heart, and I stop pretending I can be in every room.", es: "Entonces esta es la estructura: Vale Adults crece con Northline, Vale Kids conserva su propio corazón, y dejo de fingir que puedo estar en cada salón." },
        { speaker: "dani", text: "So you become CEO for real, not CEO plus emergency teacher plus printer technician.", es: "Entonces te vuelves CEO de verdad, no CEO más maestra de emergencia más técnica de impresoras." },
        { speaker: "camila", text: "Please remove printer technician. That role has damaged all of us.", es: "Por favor quiten técnica de impresoras. Ese rol nos ha dañado a todos." },
        { speaker: "vale", text: "CEO, then. But a CEO of classrooms, not a CEO of slides.", es: "CEO, entonces. Pero CEO de salones, no CEO de diapositivas." },
      ],
      words: [
        { word: "structure", es: "estructura" },
        { word: "CEO", es: "directora general" },
        { word: "technician", es: "técnico, técnica" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "Vale turns the contract news into a speaking challenge for the learner.",
      text: "Your turn: accept with conditions.",
      es: "Tu turno: acepta con condiciones.",
      speaker: "vale",
      cast: ["vale", "dani"],
      lines: [
        { speaker: "vale", text: "Your turn. Accept a huge opportunity without losing your standards: yes, condition, reason, next step.", es: "Tu turno. Acepta una oportunidad enorme sin perder tus estándares: sí, condición, razón, siguiente paso." },
        { speaker: "dani", text: "Basically, don't scream yes and then read the contract like a Terms and Conditions zombie.", es: "Básicamente, no grites sí y luego leas el contrato como zombi de términos y condiciones." },
        { speaker: "vale", text: "Exactly. If you are going to take on more responsibility, say what support must come with it.", es: "Exacto. Si vas a asumir más responsabilidad, di qué apoyo debe venir con ella." },
        { speaker: "dani", text: "Noted. Director Dani officially requests coffee, oxygen and zero surprise spreadsheets.", es: "Anotado. Director Dani solicita oficialmente café, oxígeno y cero hojas de cálculo sorpresa." },
      ],
      words: [
        { word: "take on", es: "asumir" },
        { word: "standards", es: "estándares" },
        { word: "support", es: "apoyo" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "The team celebrates the international contract in the academy office.",
      text: "The celebration begins.",
      es: "Empieza la celebración.",
      speaker: "barrett",
      cast: ["barrett", "vale", "dani", "camila"],
      lines: [
        { speaker: "barrett", text: "Then it's official. Northline signs the ten-million-dollar expansion with Vale Academy.", es: "Entonces es oficial. Northline firma la expansión de diez millones de dólares con Academia Vale." },
        { speaker: "camila", text: "Nobody move. I need one professional photo before Dani cries into the contract.", es: "Nadie se mueva. Necesito una foto profesional antes de que Dani llore sobre el contrato." },
        { speaker: "dani", text: "Too late. These are strategic tears.", es: "Demasiado tarde. Son lágrimas estratégicas." },
        { speaker: "vale", text: "Celebrate today. Tomorrow we figure out how to build a worldwide academy without losing the small-room soul that started it.", es: "Celebremos hoy. Mañana averiguamos cómo construir una academia mundial sin perder el alma de salón pequeño que la empezó." },
      ],
      words: [
        { word: "official", es: "oficial" },
        { word: "strategic", es: "estratégico" },
        { word: "worldwide", es: "mundial" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s6",
      questionEn: "What role does Camila receive in the expansion?",
      questionEs: "¿Qué rol recibe Camila en la expansión?",
      options: [
        { label: "Financial Manager", emoji: "💼" },
        { label: "Classroom teacher", emoji: "🏫" },
        { label: "Northline recruiter", emoji: "📞" },
      ],
      answer: 0,
      sayIt: "Camila becomes Financial Manager for the expansion.",
      sayItEs: "Camila se convierte en gerente financiera de la expansión.",
      sayItCheck: {
        target: "Camila becomes Financial Manager",
        altTargets: ["Camila is the Financial Manager", "She becomes Financial Manager"],
      },
    },
    {
      id: "q2",
      afterScene: "s8",
      questionEn: "Accept a big opportunity with one condition, one reason and one next step.",
      questionEs: "Acepta una gran oportunidad con una condición, una razón y un siguiente paso.",
      options: [
        { label: "I am ready to answer", emoji: "🎤" },
        { label: "I want to hear the example again", emoji: "👂" },
        { label: "I will practice later", emoji: "⏰" },
      ],
      answer: 0,
      sayIt: "I accept the opportunity, provided that I get the support to do it well. If the team is ready, the next step is to set a clear deadline.",
      sayItEs: "Acepto la oportunidad, siempre que reciba el apoyo para hacerlo bien. Si el equipo está listo, el siguiente paso es poner una fecha clara.",
      sayItAskEn: "Use four moves: yes, condition, reason, next step. Start with \"I accept ...\".",
      sayItAskEs: "Usa cuatro movimientos: sí, condición, razón, siguiente paso. Empieza con \"I accept …\".",
      sayItCheck: {
        target: "I accept *",
        altTargets: ["I will accept *", "I accept the opportunity *"],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s3",
    phrase: "A big yes still needs clear conditions.",
    es: "Un gran sí todavía necesita condiciones claras.",
  },
  habitCard: {
    afterScene: "s8",
    phrase: "I accept responsibility with the support it requires.",
    es: "Acepto responsabilidad con el apoyo que requiere.",
    model: "dani",
    modelActionEs: "Dani aceptó dirigir operaciones, pero pidió poder decir la verdad sobre horarios y recursos.",
  },
  expressions: [
    {
      phrase: "calm down",
      variants: ["calms down", "calmed down", "calming down"],
      es: "calmarse",
      kind: "phrasal",
      example: "That's supposed to calm me down?",
      exampleEs: "¿Eso se supone que me calma?",
    },
    {
      phrase: "take on",
      variants: ["takes on", "took on", "taking on"],
      es: "asumir una responsabilidad",
      kind: "phrasal",
      example: "If you are going to take on more responsibility, say what support must come with it.",
      exampleEs: "Si vas a asumir más responsabilidad, di qué apoyo debe venir con ella.",
    },
    {
      phrase: "stand out",
      variants: ["stands out", "stood out", "standing out"],
      es: "destacar",
      kind: "idiom",
      example: "Then I will stand out by stepping aside at the right moment.",
      exampleEs: "Entonces voy a destacar haciéndome a un lado en el momento correcto.",
    },
    {
      phrase: "catch up with",
      variants: ["catches up with", "caught up with", "catching up with"],
      es: "alcanzar, ponerse al día con",
      kind: "idiom",
      example: "Now the title will catch up with the responsibility.",
      exampleEs: "Ahora el título alcanzará la responsabilidad.",
    },
  ],
  finaleSeconds: 30,
  continuePrompt: {
    en: "Thirty seconds: accept a major opportunity with one condition and one next step.",
    es: "Treinta segundos: acepta una oportunidad grande con una condición y un siguiente paso.",
  },
  continueWith: [
    "I accept ...",
    "provided that ...",
    "The next step is ...",
  ],
  cliffhanger: {
    en: "The contract is signed. Now Dani has a title, a team, and absolutely no idea how wild management is about to get.",
    es: "El contrato está firmado. Ahora Dani tiene título, equipo y ni idea de lo intensa que se pondrá la gerencia.",
  },
};
