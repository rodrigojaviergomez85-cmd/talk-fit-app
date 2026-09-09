import type { ReviewGuideCard } from "@/lib/review-types";

/**
 * "ENTIÉNDELO FÁCIL" — the seven Present Perfect Progressive basics
 * (have / has been + -ing). Static hand-written content, never AI generated.
 */
export const PRESENT_PERFECT_PROGRESSIVE_GUIDE: ReviewGuideCard[] = [
  {
    id: "ppp-1-use",
    title: "What it is for",
    titleEs: "Para qué sirve",
    explanation:
      "It talks about an action that started in the past and is still happening now. The focus is the duration.",
    explanationEs:
      "Habla de una acción que empezó antes y TODAVÍA sigue. Lo importante aquí es cuánto tiempo lleva pasando, no el resultado.",
    examples: [
      { en: "I have been working since seven o'clock.", es: "Llevo trabajando desde las siete." },
      { en: "She has been studying for two hours.", es: "Ella lleva dos horas estudiando." },
      { en: "They have been waiting all morning.", es: "Llevan esperando toda la mañana." },
    ],
    check: {
      prompt: "Say how long you have been studying English.",
      promptEs: "Di cuánto tiempo llevas estudiando inglés.",
      answer: "I have been studying English for two years.",
    },
  },
  {
    id: "ppp-2-formula",
    title: "have / has been + -ing",
    titleEs: "have / has been + -ing",
    explanation: "The three parts are always there: have or has, then been, then the verb with -ing.",
    explanationEs:
      "Son tres partes fijas: have/has + been + verbo-ing. I have been working. He has been working. Si quitas been, la oración está mal: “I have working” no existe.",
    examples: [
      { en: "I have been talking to clients all day.", es: "He estado hablando con clientes todo el día." },
      { en: "He has been looking for a new job.", es: "Él ha estado buscando un trabajo nuevo." },
      { en: "We have been practicing every night.", es: "Hemos estado practicando cada noche." },
    ],
    check: {
      prompt: "Change to she: I have been working.",
      promptEs: "Cambia a she: I have been working.",
      answer: "She has been working.",
    },
  },
  {
    id: "ppp-3-how-long",
    title: "How long…?",
    titleEs: "How long…?",
    explanation: "This is the natural question for this tense.",
    explanationEs:
      "How long have you been…? = ¿Cuánto tiempo llevas…? Se contesta con for o since: for six months, since January.",
    examples: [
      { en: "How long have you been working here?", es: "¿Cuánto tiempo llevas trabajando aquí?" },
      { en: "How long has she been living in this city?", es: "¿Cuánto tiempo lleva viviendo en esta ciudad?" },
      { en: "I have been working here for six months.", es: "Llevo seis meses trabajando aquí." },
    ],
    check: {
      prompt: "Ask a coworker how long he has been working there.",
      promptEs: "Pregunta cuánto tiempo lleva él trabajando ahí.",
      answer: "How long have you been working here?",
    },
  },
  {
    id: "ppp-4-for-since",
    title: "for / since",
    titleEs: "for / since",
    explanation: "For + how long it lasts. Since + when it started.",
    explanationEs:
      "For + duración: for two hours, for three years. Since + inicio: since Monday, since 2021, since this morning. No digas “since two hours”.",
    examples: [
      { en: "I have been studying for three hours.", es: "Llevo tres horas estudiando." },
      { en: "He has been calling clients since eight.", es: "Lleva llamando clientes desde las ocho." },
      { en: "We have been living here since 2022.", es: "Vivimos aquí desde 2022." },
    ],
    check: {
      prompt: "Complete: She has been waiting ___ ten o'clock.",
      promptEs: "Completa: She has been waiting ___ ten o'clock.",
      answer: "since",
    },
  },
  {
    id: "ppp-5-vs-perfect",
    title: "Compare: perfect vs. progressive",
    titleEs: "Compara: perfecto vs. progresivo",
    explanation: "Present perfect = the result. Present perfect progressive = the time it has been going on.",
    explanationEs:
      "I have written three emails = el RESULTADO (tres correos listos). I have been writing emails all morning = el TIEMPO que llevo haciéndolo. Las dos son correctas; cambia lo que quieres decir.",
    examples: [
      { en: "I have finished two reports. (result)", es: "He terminado dos reportes. (resultado)" },
      { en: "I have been working on reports all day. (duration)", es: "He estado trabajando en reportes todo el día. (duración)" },
      { en: "She has been training new agents since June.", es: "Ella lleva capacitando agentes nuevos desde junio." },
    ],
    check: {
      prompt: "Say one sentence with the result and one with the duration.",
      promptEs: "Di una oración de resultado y otra de duración.",
      answer: "I have answered ten calls. I have been answering calls since nine.",
    },
  },
  {
    id: "ppp-6-non-progressive",
    title: "Verbs that don't take -ing",
    titleEs: "Verbos que no llevan -ing",
    explanation: "With know, like, want, need, have (possession) and be, use the simple present perfect.",
    explanationEs:
      "Con verbos de estado (know, like, love, want, need, believe, have de posesión, be) NO se usa la forma progresiva: di “I have known her for years”, no “I have been knowing her”.",
    examples: [
      { en: "I have known him for ten years.", es: "Lo conozco desde hace diez años." },
      { en: "She has had that phone since last year.", es: "Ella tiene ese teléfono desde el año pasado." },
      { en: "We have been friends since school.", es: "Somos amigos desde la escuela." },
    ],
    check: {
      prompt: "Fix it: I have been knowing her for years.",
      promptEs: "Corrige: I have been knowing her for years.",
      answer: "I have known her for years.",
    },
  },
  {
    id: "ppp-7-questions-negatives",
    title: "Questions and negatives",
    titleEs: "Preguntas y negativas",
    explanation: "Have / Has goes first. Negatives use haven't been / hasn't been.",
    explanationEs:
      "Pregunta: Have you been working? What have you been doing? Negativa: I haven't been sleeping well. He hasn't been feeling good. Been nunca desaparece.",
    examples: [
      { en: "What have you been doing lately?", es: "¿Qué has estado haciendo últimamente?" },
      { en: "Has he been studying every day?", es: "¿Ha estado estudiando todos los días?" },
      { en: "I haven't been sleeping well this week.", es: "No he estado durmiendo bien esta semana." },
    ],
    check: {
      prompt: "Ask: ¿Qué has estado haciendo hoy?",
      promptEs: "Pregunta en inglés: ¿Qué has estado haciendo hoy?",
      answer: "What have you been doing today?",
    },
  },
];

export const PRESENT_PERFECT_PROGRESSIVE_COMMON_ERRORS: { wrong: string; right: string; es: string }[] = [
  { wrong: "I have working since seven.", right: "I have been working since seven.", es: "Falta been: have + been + verbo-ing." },
  { wrong: "He have been studying.", right: "He has been studying.", es: "Con he, she, it se usa has." },
  { wrong: "She has been study for two hours.", right: "She has been studying for two hours.", es: "Después de been el verbo lleva -ing." },
  { wrong: "I have been working since two hours.", right: "I have been working for two hours.", es: "For + duración; since + momento de inicio." },
  { wrong: "I have been knowing her for years.", right: "I have known her for years.", es: "Los verbos de estado no usan la forma progresiva." },
  { wrong: "How long you have been working here?", right: "How long have you been working here?", es: "En la pregunta, have va antes del sujeto." },
];
