/**
 * Interview simulator prompt TEXT, kept free of asset imports so server code
 * (the TTS allowlist builder) can read it without pulling .mp4 assets into the
 * server bundle. The routes attach their pre-produced Mike clips on top of
 * these arrays; order, ids, texts, seconds and followUp flags live here.
 */

export type BasicTense = "present" | "past" | "future" | null;

export type BasicInterviewPrompt = {
  id: string;
  en: string;
  es: string;
  seconds: number;
  followUp: boolean;
  tense: BasicTense;
};

export type IntermediateSkill =
  | "present"
  | "present-continuous"
  | "third-person"
  | "comparatives"
  | "superlatives"
  | "past"
  | "past-continuous"
  | "present-perfect"
  | "modals"
  | "conditional"
  | "future"
  | "pronunciation"
  | "opinion"
  | null;

export type IntermediateInterviewPrompt = {
  id: string;
  en: string;
  es: string;
  seconds: number;
  followUp: boolean;
  skill: IntermediateSkill;
  /** Text the student reads out loud (no sentence goal). */
  reading?: string;
};

export type AdvancedSkill =
  | "present"
  | "past"
  | "future"
  | "comparatives"
  | "present-perfect"
  | "conditional"
  | "hypothetical"
  | "pronunciation"
  | "customer-service"
  | "sales"
  | "persuasion"
  | "opinion"
  | null;

export type AdvancedInterviewPrompt = {
  id: string;
  en: string;
  es: string;
  seconds: number;
  followUp: boolean;
  skill: AdvancedSkill;
  /** Text the student reads out loud (no sentence goal). */
  reading?: string;
};

const BASIC_MAIN_SECONDS = 30;
const BASIC_FOLLOWUP_SECONDS = 20;
const INTERMEDIATE_MAIN_SECONDS = 35;
const INTERMEDIATE_FOLLOWUP_SECONDS = 25;
const ADVANCED_MAIN_SECONDS = 40;
const ADVANCED_FOLLOWUP_SECONDS = 25;

const GOODBYE_EN =
  "Thank you for applying. It was a pleasure talking with you today. We'll be in touch soon. I wish you the best in the real interview. You can do it, champion!";
const GOODBYE_ES =
  "Gracias por aplicar. Fue un placer hablar contigo hoy. Estaremos en contacto pronto. Te deseo lo mejor en la entrevista real. You can do it, champion!";

export const INTERMEDIATE_ED_TEXT =
  "Yesterday I worked from home. I helped a customer, I asked for her order number, and I thanked her for waiting. Then I called my manager, I explained the problem, I listened to his advice, and I answered two more emails. At the end of the day, I decided to rest.";

export const ADVANCED_ED_TEXT =
  "Last month our team launched a new service. We planned the schedule, we prepared the scripts, and we tested the system twice. A client called and complained because the app crashed, so I apologized, I checked her account, and I promised a solution. We fixed the issue, we updated the report, and the manager thanked us for the effort.";

export const BASIC_INTERVIEW_PROMPTS: readonly BasicInterviewPrompt[] = [
  {
    id: "welcome",
    en: "Hi! Welcome to the interview. I'm Mike, your recruiter today. How's it going?",
    es: "¡Hola! Bienvenido a la entrevista. Soy Mike, tu reclutador de hoy. ¿Cómo vas?",
    seconds: BASIC_MAIN_SECONDS,
    followUp: false,
    tense: "present",
  },
  {
    id: "tell-me",
    en: "Let's get started. Tell me about yourself.",
    es: "Empecemos. Háblame de ti.",
    seconds: BASIC_MAIN_SECONDS,
    followUp: false,
    tense: "present",
  },
  {
    id: "tell-me-more",
    en: "Give me more details, please.",
    es: "Dame más detalles, por favor.",
    seconds: BASIC_FOLLOWUP_SECONDS,
    followUp: true,
    tense: "present",
  },
  {
    id: "routine",
    en: "What do you do every day at work or at school?",
    es: "¿Qué haces todos los días en el trabajo o en la escuela?",
    seconds: BASIC_MAIN_SECONDS,
    followUp: false,
    tense: "present",
  },
  {
    id: "present-progressive",
    en: "What is your mom doing right now?",
    es: "¿Qué está haciendo tu mamá ahora mismo?",
    seconds: BASIC_MAIN_SECONDS,
    followUp: false,
    tense: "present",
  },
  {
    id: "last-job",
    en: "Tell me about your last job or your last vacation. What happened?",
    es: "Háblame de tu último trabajo o de tus últimas vacaciones. ¿Qué pasó?",
    seconds: BASIC_MAIN_SECONDS,
    followUp: false,
    tense: "past",
  },
  {
    id: "explain-why",
    en: "Explain why. Why was that important for you?",
    es: "Explícame por qué. ¿Por qué fue importante para ti?",
    seconds: BASIC_FOLLOWUP_SECONDS,
    followUp: true,
    tense: "past",
  },
  {
    id: "favorite-movie",
    en: "Tell me about your favorite movie or book. What was it about?",
    es: "Háblame de tu película o libro favorito. ¿De qué trataba?",
    seconds: BASIC_MAIN_SECONDS,
    followUp: false,
    tense: "past",
  },
  {
    id: "opinion",
    en: "What do you think about that? Would you recommend it?",
    es: "¿Qué opinas de eso? ¿Lo recomendarías?",
    seconds: BASIC_FOLLOWUP_SECONDS,
    followUp: true,
    tense: "past",
  },
  {
    id: "past-progressive",
    en: "What were you doing at 1 p.m. yesterday?",
    es: "¿Qué estabas haciendo ayer a la 1 p.m.?",
    seconds: BASIC_MAIN_SECONDS,
    followUp: false,
    tense: "past",
  },
  {
    id: "two-years",
    en: "Where do you see yourself in two years?",
    es: "¿Dónde te ves en dos años?",
    seconds: BASIC_MAIN_SECONDS,
    followUp: false,
    tense: "future",
  },
  {
    id: "after-course",
    en: "What are you going to do after this course?",
    es: "¿Qué vas a hacer después de este curso?",
    seconds: BASIC_MAIN_SECONDS,
    followUp: false,
    tense: "future",
  },
  {
    id: "goodbye",
    en: GOODBYE_EN,
    es: GOODBYE_ES,
    seconds: 0,
    followUp: false,
    tense: null,
  },
];

export const INTERMEDIATE_INTERVIEW_PROMPTS: readonly IntermediateInterviewPrompt[] = [
  {
    id: "welcome",
    en: "Hi! Welcome to the interview. I'm Mike, your recruiter today. How's it going?",
    es: "¡Hola! Bienvenido a la entrevista. Soy Mike, tu reclutador de hoy. ¿Cómo vas?",
    seconds: INTERMEDIATE_MAIN_SECONDS,
    followUp: false,
    skill: "present",
  },
  {
    id: "happy-moment",
    en: "Tell me about a happy moment. When was it, who was there, and what happened?",
    es: "Cuéntame sobre un momento feliz. ¿Cuándo fue, quién estaba ahí y qué pasó?",
    seconds: INTERMEDIATE_MAIN_SECONDS,
    followUp: false,
    skill: "past",
  },
  {
    id: "why-happy",
    en: "Why was it a happy moment for you?",
    es: "¿Por qué fue un momento feliz para ti?",
    seconds: INTERMEDIATE_FOLLOWUP_SECONDS,
    followUp: true,
    skill: "past",
  },
  {
    id: "improve-english",
    en: "What are you doing these days to improve your English?",
    es: "¿Qué estás haciendo estos días para mejorar tu inglés?",
    seconds: INTERMEDIATE_MAIN_SECONDS,
    followUp: false,
    skill: "present-continuous",
  },
  {
    id: "third-person",
    en: "Tell me about someone you live with. What does he or she do every day?",
    es: "Háblame de alguien con quien vives. ¿Qué hace él o ella todos los días?",
    seconds: INTERMEDIATE_MAIN_SECONDS,
    followUp: false,
    skill: "third-person",
  },
  {
    id: "compare-parents",
    en: "Compare your mom and dad. Who is taller, and who is more patient?",
    es: "Compara a tu mamá y a tu papá. ¿Quién es más alto y quién es más paciente?",
    seconds: INTERMEDIATE_MAIN_SECONDS,
    followUp: false,
    skill: "comparatives",
  },
  {
    id: "best-worst",
    en: "What is the best day you have had this year, and the worst one?",
    es: "¿Cuál es el mejor día que has tenido este año y cuál el peor?",
    seconds: INTERMEDIATE_MAIN_SECONDS,
    followUp: false,
    skill: "superlatives",
  },
  {
    id: "last-weekend",
    en: "Tell me about your last weekend. What did you do?",
    es: "Háblame de tu último fin de semana. ¿Qué hiciste?",
    seconds: INTERMEDIATE_MAIN_SECONDS,
    followUp: false,
    skill: "past",
  },
  {
    id: "more-details-past",
    en: "Give me more details, please.",
    es: "Dame más detalles, por favor.",
    seconds: INTERMEDIATE_FOLLOWUP_SECONDS,
    followUp: true,
    skill: "past",
  },
  {
    id: "past-progressive",
    en: "What were you doing at 1 p.m. yesterday?",
    es: "¿Qué estabas haciendo ayer a la 1 p.m.?",
    seconds: INTERMEDIATE_MAIN_SECONDS,
    followUp: false,
    skill: "past-continuous",
  },
  {
    id: "how-long",
    en: "How long have you studied English, and what have you learned so far?",
    es: "¿Cuánto tiempo has estudiado inglés y qué has aprendido hasta ahora?",
    seconds: INTERMEDIATE_MAIN_SECONDS,
    followUp: false,
    skill: "present-perfect",
  },
  {
    id: "ever-difficult",
    en: "Have you ever had a difficult customer or a difficult classmate? Tell me what happened.",
    es: "¿Alguna vez has tenido un cliente difícil o un compañero difícil? Cuéntame qué pasó.",
    seconds: INTERMEDIATE_MAIN_SECONDS,
    followUp: false,
    skill: "present-perfect",
  },
  {
    id: "modals",
    en: "Your friend is always late. What should he do, and what can you do to help?",
    es: "Tu amigo siempre llega tarde. ¿Qué debería hacer él y qué puedes hacer tú para ayudar?",
    seconds: INTERMEDIATE_MAIN_SECONDS,
    followUp: false,
    skill: "modals",
  },
  {
    id: "free-week",
    en: "If you had one free week, what would you do?",
    es: "Si tuvieras una semana libre, ¿qué harías?",
    seconds: INTERMEDIATE_MAIN_SECONDS,
    followUp: false,
    skill: "conditional",
  },
  {
    id: "next-weekend",
    en: "What are you going to do next weekend?",
    es: "¿Qué vas a hacer el próximo fin de semana?",
    seconds: INTERMEDIATE_MAIN_SECONDS,
    followUp: false,
    skill: "future",
  },
  {
    id: "read-ed",
    en: "Now, please read this short text out loud. Take your time with the -ed endings.",
    es: "Ahora, por favor lee este texto en voz alta. Cuida las terminaciones -ed.",
    seconds: INTERMEDIATE_MAIN_SECONDS,
    followUp: false,
    skill: "pronunciation",
    reading: INTERMEDIATE_ED_TEXT,
  },
  {
    id: "work-home",
    en: "Do you think it is better to work from home or at the office? Why?",
    es: "¿Crees que es mejor trabajar desde casa o en la oficina? ¿Por qué?",
    seconds: INTERMEDIATE_MAIN_SECONDS,
    followUp: false,
    skill: "opinion",
  },
  {
    id: "opinion-more",
    en: "What do you think about that? Would you recommend it?",
    es: "¿Qué opinas de eso? ¿Lo recomendarías?",
    seconds: INTERMEDIATE_FOLLOWUP_SECONDS,
    followUp: true,
    skill: "opinion",
  },
  {
    id: "goodbye",
    en: GOODBYE_EN,
    es: GOODBYE_ES,
    seconds: 0,
    followUp: false,
    skill: null,
  },
];

export const ADVANCED_INTERVIEW_PROMPTS: readonly AdvancedInterviewPrompt[] = [
  {
    id: "welcome",
    en: "Hi! Welcome to the interview. I'm Mike, your recruiter today. How's it going?",
    es: "¡Hola! Bienvenido a la entrevista. Soy Mike, tu reclutador de hoy. ¿Cómo vas?",
    seconds: ADVANCED_MAIN_SECONDS,
    followUp: false,
    skill: "present",
  },
  {
    id: "tell-me-about-yourself",
    en: "Let's get started. Tell me about yourself.",
    es: "Empecemos. Háblame de ti.",
    seconds: ADVANCED_MAIN_SECONDS,
    followUp: false,
    skill: "present",
  },
  {
    id: "why-english",
    en: "What made you choose to study English instead of another language or skill?",
    es: "¿Qué te hizo elegir estudiar inglés en lugar de otro idioma u otra habilidad?",
    seconds: ADVANCED_MAIN_SECONDS,
    followUp: false,
    skill: "past",
  },
  {
    id: "routine-compare",
    en: "Describe your daily routine and compare it with someone you live or work with.",
    es: "Describe tu rutina diaria y compárala con la de alguien con quien vives o trabajas.",
    seconds: ADVANCED_MAIN_SECONDS,
    followUp: false,
    skill: "comparatives",
  },
  {
    id: "achievement",
    en: "Tell me about a difficult goal you achieved. What did you have to do?",
    es: "Cuéntame sobre una meta difícil que lograste. ¿Qué tuviste que hacer?",
    seconds: ADVANCED_MAIN_SECONDS,
    followUp: false,
    skill: "past",
  },
  {
    id: "differently",
    en: "Looking back, what would you do differently?",
    es: "Mirando atrás, ¿qué harías diferente?",
    seconds: ADVANCED_FOLLOWUP_SECONDS,
    followUp: true,
    skill: "conditional",
  },
  {
    id: "compare-apps",
    en: "Compare two apps or services you use. Which one is better, and why?",
    es: "Compara dos apps o servicios que usas. ¿Cuál es mejor y por qué?",
    seconds: ADVANCED_MAIN_SECONDS,
    followUp: false,
    skill: "comparatives",
  },
  {
    id: "six-months",
    en: "What will you have achieved with your English in six months?",
    es: "¿Qué habrás logrado con tu inglés en seis meses?",
    seconds: ADVANCED_MAIN_SECONDS,
    followUp: false,
    skill: "future",
  },
  {
    id: "move-city",
    en: "If you had to move to another city tomorrow, how would you handle it?",
    es: "Si tuvieras que mudarte a otra ciudad mañana, ¿cómo lo manejarías?",
    seconds: ADVANCED_MAIN_SECONDS,
    followUp: false,
    skill: "hypothetical",
  },
  {
    id: "read-ed",
    en: "Now, please read this short text out loud. Take your time with the -ed endings.",
    es: "Ahora, por favor lee este texto en voz alta. Cuida las terminaciones -ed.",
    seconds: ADVANCED_MAIN_SECONDS,
    followUp: false,
    skill: "pronunciation",
    reading: ADVANCED_ED_TEXT,
  },
  {
    id: "aliens",
    en: "Here's a fun one. If aliens came to Earth, how would you explain to them what alcohol does to your body?",
    es: "Una divertida. Si los aliens llegaran a la Tierra, ¿cómo les explicarías qué le hace el alcohol al cuerpo?",
    seconds: ADVANCED_MAIN_SECONDS,
    followUp: false,
    skill: "hypothetical",
  },
  {
    id: "dinner",
    en: "If you could have dinner with any historical figure, who would it be, and what would you ask?",
    es: "Si pudieras cenar con cualquier figura histórica, ¿quién sería y qué le preguntarías?",
    seconds: ADVANCED_MAIN_SECONDS,
    followUp: false,
    skill: "hypothetical",
  },
  {
    id: "tiktok",
    en: "If you had to explain TikTok to someone from the 1800s, how would you do it?",
    es: "Si tuvieras que explicarle TikTok a alguien de 1800, ¿cómo lo harías?",
    seconds: ADVANCED_MAIN_SECONDS,
    followUp: false,
    skill: "hypothetical",
  },
  {
    id: "time-travel",
    en: "If you could travel to the past or the future, which would you choose, and why?",
    es: "Si pudieras viajar al pasado o al futuro, ¿cuál elegirías y por qué?",
    seconds: ADVANCED_MAIN_SECONDS,
    followUp: false,
    skill: "hypothetical",
  },
  {
    id: "angry-customer",
    en: "How would you calm down an angry customer on the phone?",
    es: "¿Cómo calmarías a un cliente enojado por teléfono?",
    seconds: ADVANCED_MAIN_SECONDS,
    followUp: false,
    skill: "customer-service",
  },
  {
    id: "sell-pen",
    en: "Okay, sell this pen to me.",
    es: "Bien, véndeme este bolígrafo.",
    seconds: ADVANCED_MAIN_SECONDS,
    followUp: false,
    skill: "sales",
  },
  {
    id: "objection",
    en: "Hmm, but I already have a pen. Why should I buy yours?",
    es: "Mmm, pero ya tengo un bolígrafo. ¿Por qué debería comprar el tuyo?",
    seconds: ADVANCED_FOLLOWUP_SECONDS,
    followUp: true,
    skill: "sales",
  },
  {
    id: "hire",
    en: "Why should I hire you instead of another candidate?",
    es: "¿Por qué debería contratarte a ti y no a otro candidato?",
    seconds: ADVANCED_MAIN_SECONDS,
    followUp: false,
    skill: "persuasion",
  },
  {
    id: "availability",
    en: "What is your schedule availability? Can you work weekends or night shifts?",
    es: "¿Cuál es tu disponibilidad de horario? ¿Puedes trabajar fines de semana o turnos de noche?",
    seconds: ADVANCED_MAIN_SECONDS,
    followUp: false,
    skill: "present",
  },
  {
    id: "work-home",
    en: "Do you think it is better to work from home or at the office? Why?",
    es: "¿Crees que es mejor trabajar desde casa o en la oficina? ¿Por qué?",
    seconds: ADVANCED_MAIN_SECONDS,
    followUp: false,
    skill: "opinion",
  },
  {
    id: "convince",
    en: "Convince me. Give me one strong reason.",
    es: "Convénceme. Dame una razón fuerte.",
    seconds: ADVANCED_FOLLOWUP_SECONDS,
    followUp: true,
    skill: "persuasion",
  },
  {
    id: "goodbye",
    en: GOODBYE_EN,
    es: GOODBYE_ES,
    seconds: 0,
    followUp: false,
    skill: null,
  },
];
