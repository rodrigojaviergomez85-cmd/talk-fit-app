/**
 * ADVANCED — controlled recruiter / customer question bank.
 *
 * Every question is FIXED and prewritten (never generated). Days reference
 * entries from this bank so future weeks can rotate controlled variations
 * without ever repeating the same personal details or follow-ups by accident.
 *
 * Week 1 uses only the approved GET HIRED content below. No rotation logic yet.
 */

export type AdvancedQuestionCategory =
  | "tell_me_about_yourself"
  | "why_hire_you"
  | "strength"
  | "weakness"
  | "behavioral_story"
  | "crazy_question"
  | "customer_service"
  | "sales"
  | "future_goal";

export type AdvancedQuestion = {
  id: string;
  category: AdvancedQuestionCategory;
  /** Who says it: recruiter or customer. */
  speaker: "recruiter" | "customer";
  text: string;
  es: string;
  /** Fixed follow-up that is only revealed after the learner records the first answer. */
  followUp?: { text: string; es: string } | undefined;
};

export const ADVANCED_QUESTION_BANK: Record<string, AdvancedQuestion> = {
  "tmay-1": {
    id: "tmay-1",
    category: "tell_me_about_yourself",
    speaker: "recruiter",
    text: "Tell me about yourself.",
    es: "Háblame de ti.",
    followUp: { text: "Tell me something about you that isn't on your résumé.", es: "Cuéntame algo de ti que no esté en tu currículum." },
  },
  "story-1": {
    id: "story-1",
    category: "behavioral_story",
    speaker: "recruiter",
    text: "Tell me about a first day or a new experience.",
    es: "Cuéntame sobre un primer día o una experiencia nueva.",
    followUp: { text: "What would you do differently if the same situation happened today?", es: "¿Qué harías diferente si la misma situación pasara hoy?" },
  },
  "hire-1": {
    id: "hire-1",
    category: "why_hire_you",
    speaker: "recruiter",
    text: "Why should we hire you?",
    es: "¿Por qué deberíamos contratarte?",
    followUp: { text: "Every candidate says they're responsible. Give me a better reason.", es: "Todos los candidatos dicen que son responsables. Dame una mejor razón." },
  },
  "hire-2": {
    id: "hire-2",
    category: "why_hire_you",
    speaker: "recruiter",
    text: "Why should we hire you?",
    es: "¿Por qué deberíamos contratarte?",
    followUp: { text: "Give me a real example.", es: "Dame un ejemplo real." },
  },
  "weak-1": {
    id: "weak-1",
    category: "weakness",
    speaker: "recruiter",
    text: "What is your greatest weakness?",
    es: "¿Cuál es tu mayor debilidad?",
    followUp: { text: "How could that weakness affect your performance in a call center?", es: "¿Cómo podría esa debilidad afectar tu desempeño en un call center?" },
  },
  "weak-2": {
    id: "weak-2",
    category: "weakness",
    speaker: "recruiter",
    text: "What is your greatest weakness?",
    es: "¿Cuál es tu mayor debilidad?",
    followUp: { text: "Why should that not stop me from hiring you?", es: "¿Por qué eso no debería impedir que te contrate?" },
  },
  "goal-1": {
    id: "goal-1",
    category: "future_goal",
    speaker: "recruiter",
    text: "What are three things you will do when you get the job you want?",
    es: "¿Cuáles son tres cosas que harás cuando consigas el trabajo que quieres?",
  },
  "crazy-1": {
    id: "crazy-1",
    category: "crazy_question",
    speaker: "recruiter",
    text: "If you could be born again, what is one thing you would do differently and why?",
    es: "Si pudieras nacer de nuevo, ¿qué harías diferente y por qué?",
  },
  "cs-tour-1": {
    id: "cs-tour-1",
    category: "customer_service",
    speaker: "customer",
    text: "This is unacceptable. My whole family planned this trip around this reservation!",
    es: "¡Esto es inaceptable! ¡Toda mi familia planeó este viaje alrededor de esta reservación!",
    followUp: { text: "I don't want an apology. I want a solution.", es: "No quiero una disculpa. Quiero una solución." },
  },
};

export function bankQuestion(id: string): AdvancedQuestion {
  const q = ADVANCED_QUESTION_BANK[id];
  if (!q) throw new Error(`Unknown advanced question: ${id}`);
  return q;
}
