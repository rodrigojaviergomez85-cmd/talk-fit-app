import type { ReviewGuideCard, ReviewModule } from "@/lib/review-types";

export const MODAL_PERFECTS_GUIDE: ReviewGuideCard[] = [
  {
    id: "mperf-1-form",
    title: "One formula for the past",
    titleEs: "Una fórmula para el pasado",
    explanation: "modal + have + past participle. The modal never changes and have never becomes has or had.",
    explanationEs: "modal + have + participio pasado. El modal nunca cambia y have nunca se vuelve has ni had: she should have called.",
    examples: [
      { en: "She should have called.", es: "Ella debió haber llamado." },
      { en: "He must have forgotten.", es: "Él seguramente olvidó." },
      { en: "They could have helped.", es: "Ellos pudieron haber ayudado." },
    ],
    check: { prompt: "Correct: He must had forgotten.", promptEs: "Corrige: He must had forgotten.", answer: "He must have forgotten." },
  },
  {
    id: "mperf-2-should",
    title: "should have",
    titleEs: "should have",
    explanation: "Use should have for a good idea that did not happen, and shouldn't have for something you regret doing.",
    explanationEs: "Usa should have para algo bueno que NO pasó y shouldn't have para algo que sí pasó y lamentas.",
    examples: [
      { en: "I should have left earlier.", es: "Debí haber salido más temprano." },
      { en: "She should have asked for help.", es: "Ella debió haber pedido ayuda." },
      { en: "I shouldn't have stayed up late.", es: "No debí haberme desvelado." },
    ],
    check: { prompt: "Say one regret about yesterday with should have.", promptEs: "Di un arrepentimiento de ayer con should have.", answer: "I should have slept more." },
  },
  {
    id: "mperf-3-must",
    title: "must have",
    titleEs: "must have",
    explanation: "Use must have when you are almost sure about a past situation, based on evidence.",
    explanationEs: "Usa must have cuando estás casi seguro de algo del pasado por la evidencia que ves. No es obligación, es deducción.",
    examples: [
      { en: "His desk is empty. He must have left.", es: "Su escritorio está vacío. Seguramente se fue." },
      { en: "You must have been tired.", es: "Seguramente estabas cansado." },
      { en: "They must have missed the bus.", es: "Seguramente perdieron el autobús." },
    ],
    check: { prompt: "The street is wet. Deduce what happened.", promptEs: "La calle está mojada. Deduce qué pasó.", answer: "It must have rained." },
  },
  {
    id: "mperf-4-could",
    title: "could have",
    titleEs: "could have",
    explanation: "Use could have for a past possibility or an ability you did not use.",
    explanationEs: "Usa could have para una posibilidad pasada o una capacidad que no usaste: pudo pasar, pero no pasó.",
    examples: [
      { en: "I could have taken the earlier flight.", es: "Pude haber tomado el vuelo anterior." },
      { en: "She could have won the contract.", es: "Ella pudo haber ganado el contrato." },
      { en: "That could have been dangerous.", es: "Eso pudo haber sido peligroso." },
    ],
    check: { prompt: "Say one thing you could have done last weekend.", promptEs: "Di algo que pudiste haber hecho el fin de semana pasado.", answer: "I could have visited my family." },
  },
  {
    id: "mperf-5-would",
    title: "would have",
    titleEs: "would have",
    explanation: "Use would have for an imagined past result, often with an if clause.",
    explanationEs: "Usa would have para un resultado imaginario del pasado, muchas veces con una cláusula con if (if + had + participio).",
    examples: [
      { en: "I would have accepted the offer.", es: "Yo habría aceptado la oferta." },
      { en: "If I had studied, I would have passed.", es: "Si hubiera estudiado, habría aprobado." },
      { en: "She wouldn't have said that.", es: "Ella no habría dicho eso." },
    ],
    check: { prompt: "Finish: If I had woken up earlier, …", promptEs: "Completa: If I had woken up earlier, …", answer: "I would have arrived on time." },
  },
  {
    id: "mperf-6-might",
    title: "might have and may have",
    titleEs: "might have y may have",
    explanation: "Use might have or may have when the past explanation is possible but not certain.",
    explanationEs: "Usa might have o may have cuando la explicación del pasado es posible pero no segura. Son más suaves que must have.",
    examples: [
      { en: "He might have forgotten the meeting.", es: "Quizá él olvidó la reunión." },
      { en: "She may have called while I was out.", es: "Puede que ella llamara mientras yo no estaba." },
      { en: "They might not have received the email.", es: "Quizá no recibieron el correo." },
    ],
    check: { prompt: "Give an uncertain reason for a late coworker.", promptEs: "Da una razón incierta por un compañero que llegó tarde.", answer: "He might have missed the bus." },
  },
  {
    id: "mperf-7-questions",
    title: "Questions, negatives and contractions",
    titleEs: "Preguntas, negativas y contracciones",
    explanation: "The modal starts the question. Add not after the modal. In speech we say should've, must've and would've.",
    explanationEs: "El modal inicia la pregunta y not va después del modal. Al hablar decimos should've, must've, would've. Nunca escribas should of.",
    examples: [
      { en: "Should I have called her?", es: "¿Debí haberla llamado?" },
      { en: "What would you have done?", es: "¿Qué habrías hecho tú?" },
      { en: "He shouldn't have shared that file.", es: "Él no debió compartir ese archivo." },
    ],
    check: { prompt: "Correct: What did you would have done?", promptEs: "Corrige: What did you would have done?", answer: "What would you have done?" },
  },
];

export const MODAL_PERFECTS_COMMON_ERRORS: ReviewModule["commonErrors"] = [
  { wrong: "I should of called.", right: "I should have called.", es: "Se escribe have, aunque suene como of." },
  { wrong: "She should have went.", right: "She should have gone.", es: "Después de have va el participio pasado, no el pasado simple." },
  { wrong: "He must had forgotten.", right: "He must have forgotten.", es: "Siempre have, nunca had ni has." },
  { wrong: "They could have helping.", right: "They could have helped.", es: "Participio pasado, no -ing." },
  { wrong: "Did you would have gone?", right: "Would you have gone?", es: "La pregunta inicia con el modal, sin did." },
  { wrong: "I don't should have said that.", right: "I shouldn't have said that.", es: "El not va después del modal, sin do." },
];
