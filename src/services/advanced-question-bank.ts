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
  | "future_goal"
  | "repair";

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

  /* ---------------- WEEK 2 — PROVE WHAT YOU CAN DO ---------------- */
  "challenge-1": {
    id: "challenge-1",
    category: "behavioral_story",
    speaker: "recruiter",
    text: "Tell me about a challenge you faced and how you handled it.",
    es: "Cuéntame sobre un reto que enfrentaste y cómo lo manejaste.",
    followUp: { text: "What exactly did you do?", es: "¿Qué hiciste tú exactamente?" },
  },
  "mistake-1": {
    id: "mistake-1",
    category: "behavioral_story",
    speaker: "recruiter",
    text: "Tell me about a mistake you made.",
    es: "Cuéntame sobre un error que cometiste.",
    followUp: { text: "What would you do differently today?", es: "¿Qué harías diferente hoy?" },
  },
  "difficult-1": {
    id: "difficult-1",
    category: "behavioral_story",
    speaker: "recruiter",
    text: "Tell me about a time you had to deal with a difficult person.",
    es: "Cuéntame sobre una vez que tuviste que lidiar con una persona difícil.",
    followUp: { text: "How did you keep the situation professional?", es: "¿Cómo mantuviste la situación profesional?" },
  },
  "helped-1": {
    id: "helped-1",
    category: "customer_service",
    speaker: "recruiter",
    text: "Tell me about a time you helped a customer, coworker or another person.",
    es: "Cuéntame sobre una vez que ayudaste a un cliente, compañero u otra persona.",
    followUp: { text: "Why did your response matter?", es: "¿Por qué importó tu respuesta?" },
  },
  "pressure-1": {
    id: "pressure-1",
    category: "behavioral_story",
    speaker: "recruiter",
    text: "Tell me about a time you had to work under pressure.",
    es: "Cuéntame sobre una vez que tuviste que trabajar bajo presión.",
    followUp: { text: "What was the result?", es: "¿Cuál fue el resultado?" },
  },
  "fu-next": {
    id: "fu-next",
    category: "behavioral_story",
    speaker: "recruiter",
    text: "What happened next?",
    es: "¿Qué pasó después?",
  },
  "fu-learn": {
    id: "fu-learn",
    category: "behavioral_story",
    speaker: "recruiter",
    text: "What did you learn?",
    es: "¿Qué aprendiste?",
  },

  /* ---------------- WEEK 3 — ANSWER THE HARD QUESTIONS ---------------- */
  "leave-1": {
    id: "leave-1",
    category: "future_goal",
    speaker: "recruiter",
    text: "Why did you leave your last job? Or, if you're still there, why do you want to leave?",
    es: "¿Por qué dejaste tu último trabajo? O, si sigues ahí, ¿por qué quieres irte?",
    followUp: { text: "What are you looking for in your next job?", es: "¿Qué buscas en tu próximo trabajo?" },
  },
  "failure-1": {
    id: "failure-1",
    category: "behavioral_story",
    speaker: "recruiter",
    text: "Tell me about a failure.",
    es: "Cuéntame sobre un fracaso.",
    followUp: { text: "How do I know you won't make the same mistake again?", es: "¿Cómo sé que no vas a cometer el mismo error otra vez?" },
  },
  "why-here-1": {
    id: "why-here-1",
    category: "why_hire_you",
    speaker: "recruiter",
    text: "Why do you want to work here?",
    es: "¿Por qué quieres trabajar aquí?",
    followUp: { text: "What can you bring to our team?", es: "¿Qué puedes aportar a nuestro equipo?" },
  },
  "cond-weekends": {
    id: "cond-weekends",
    category: "future_goal",
    speaker: "recruiter",
    text: "Are you willing to work weekends?",
    es: "¿Estás dispuesto/a a trabajar fines de semana?",
  },
  "cond-salary": {
    id: "cond-salary",
    category: "future_goal",
    speaker: "recruiter",
    text: "What salary are you expecting?",
    es: "¿Qué salario esperas?",
  },
  "cond-schedule": {
    id: "cond-schedule",
    category: "future_goal",
    speaker: "recruiter",
    text: "What would you do if your schedule changed next month?",
    es: "¿Qué harías si tu horario cambiara el próximo mes?",
  },
  "cond-pressure": {
    id: "cond-pressure",
    category: "future_goal",
    speaker: "recruiter",
    text: "Can you work under pressure? Prove it.",
    es: "¿Puedes trabajar bajo presión? Demuéstralo.",
  },
  "why-job-1": {
    id: "why-job-1",
    category: "why_hire_you",
    speaker: "recruiter",
    text: "Why do you want this job?",
    es: "¿Por qué quieres este trabajo?",
    followUp: { text: "Why should I believe you?", es: "¿Por qué debería creerte?" },
  },
  "criticize-1": {
    id: "criticize-1",
    category: "weakness",
    speaker: "recruiter",
    text: "What would your previous supervisor criticize about you?",
    es: "¿Qué criticaría de ti tu supervisor anterior?",
  },
  "not-hire-1": {
    id: "not-hire-1",
    category: "why_hire_you",
    speaker: "recruiter",
    text: "Why shouldn't I hire you?",
    es: "¿Por qué no debería contratarte?",
    followUp: { text: "That sounds like an excuse. Convince me.", es: "Eso suena a excusa. Convénceme." },
  },

  /* ---------------- WEEK 4 — PERFORM UNDER JOB PRESSURE ---------------- */
  "journey-1": {
    id: "journey-1",
    category: "tell_me_about_yourself",
    speaker: "recruiter",
    text: "Walk me through your professional journey.",
    es: "Cuéntame tu trayectoria profesional.",
    followUp: { text: "What was an important turning point for you?", es: "¿Cuál fue un punto de inflexión importante para ti?" },
  },
  "comp-problem": {
    id: "comp-problem",
    category: "behavioral_story",
    speaker: "recruiter",
    text: "Tell me about a time you solved a problem.",
    es: "Cuéntame sobre una vez que resolviste un problema.",
    followUp: { text: "How did you know your solution worked?", es: "¿Cómo supiste que tu solución funcionó?" },
  },
  "comp-learn": {
    id: "comp-learn",
    category: "behavioral_story",
    speaker: "recruiter",
    text: "Tell me about a time you learned something quickly.",
    es: "Cuéntame sobre una vez que aprendiste algo rápido.",
    followUp: { text: "What helped you learn it so fast?", es: "¿Qué te ayudó a aprenderlo tan rápido?" },
  },
  "comp-pressure": {
    id: "comp-pressure",
    category: "behavioral_story",
    speaker: "recruiter",
    text: "Tell me about a time you worked under pressure.",
    es: "Cuéntame sobre una vez que trabajaste bajo presión.",
    followUp: { text: "What did you do to stay focused?", es: "¿Qué hiciste para mantenerte enfocado/a?" },
  },
  "crazy-decision": {
    id: "crazy-decision",
    category: "crazy_question",
    speaker: "recruiter",
    text: "If you could change one decision from your past, what would it be and why?",
    es: "Si pudieras cambiar una decisión de tu pasado, ¿cuál sería y por qué?",
  },
  "crazy-money": {
    id: "crazy-money",
    category: "crazy_question",
    speaker: "recruiter",
    text: "If you suddenly received $10,000, what would you do?",
    es: "Si de repente recibieras $10,000, ¿qué harías?",
  },
  "crazy-live": {
    id: "crazy-live",
    category: "crazy_question",
    speaker: "recruiter",
    text: "If you could live anywhere in the world, where would you live?",
    es: "Si pudieras vivir en cualquier parte del mundo, ¿dónde vivirías?",
  },
  "crazy-animal": {
    id: "crazy-animal",
    category: "crazy_question",
    speaker: "recruiter",
    text: "If you were an animal, which one would you be and why?",
    es: "Si fueras un animal, ¿cuál serías y por qué?",
  },
  "strong-1": {
    id: "strong-1",
    category: "why_hire_you",
    speaker: "recruiter",
    text: "Tell me why you're a strong candidate.",
    es: "Dime por qué eres un/a candidato/a fuerte.",
  },
  "cs-calls-1": {
    id: "cs-calls-1",
    category: "customer_service",
    speaker: "customer",
    text: "I've called three times and nobody has fixed my problem.",
    es: "He llamado tres veces y nadie ha resuelto mi problema.",
    followUp: { text: "I don't want another apology. I want a solution.", es: "No quiero otra disculpa. Quiero una solución." },
  },
  "sell-phone": {
    id: "sell-phone",
    category: "sales",
    speaker: "recruiter",
    text: "Sell me this phone.",
    es: "Véndeme este teléfono.",
    followUp: { text: "It's too expensive. Why would I pay that?", es: "Es muy caro. ¿Por qué pagaría eso?" },
  },
  "difficult-situation": {
    id: "difficult-situation",
    category: "behavioral_story",
    speaker: "recruiter",
    text: "Tell me about a difficult situation you handled.",
    es: "Cuéntame sobre una situación difícil que manejaste.",
    followUp: { text: "What exactly did you do?", es: "¿Qué hiciste tú exactamente?" },
  },
  "improve-1": {
    id: "improve-1",
    category: "weakness",
    speaker: "recruiter",
    text: "What is one area you still need to improve?",
    es: "¿Cuál es un área que todavía necesitas mejorar?",
  },
  "listen-situation": {
    id: "listen-situation",
    category: "customer_service",
    speaker: "recruiter",
    text: "Listen to this situation. Your teammate is out sick, a customer is waiting on the line, and your supervisor just asked you to finish a report in twenty minutes. What do you do first, and what do you say to the customer?",
    es: "Escucha esta situación. Tu compañero está enfermo, un cliente espera en la línea y tu supervisor te acaba de pedir un reporte en veinte minutos. ¿Qué haces primero y qué le dices al cliente?",
  },
  "cs-charge-1": {
    id: "cs-charge-1",
    category: "customer_service",
    speaker: "customer",
    text: "You charged my card twice and now I can't pay my rent. This is your fault!",
    es: "¡Me cobraron dos veces en la tarjeta y ahora no puedo pagar mi renta. Es su culpa!",
    followUp: { text: "How long is that going to take? I need this fixed today.", es: "¿Cuánto va a tardar eso? Necesito que se arregle hoy." },
  },
  "three-years": {
    id: "three-years",
    category: "future_goal",
    speaker: "recruiter",
    text: "Where do you want to be professionally in three years?",
    es: "¿Dónde quieres estar profesionalmente en tres años?",
  },

  /* ---------------- REPAIR MOMENTS (one per day, rotating by type) ---------------- */
  /* Day 1 of each week — NEEDS TIME: a big, open question that deserves a pause. */
  "repair-time-1": {
    id: "repair-time-1",
    category: "repair",
    speaker: "recruiter",
    text: "If I asked you to describe the professional you want to become, and the experiences that shaped that vision the most, what would you say?",
    es: "Si te pidiera describir el profesional en el que quieres convertirte y las experiencias que más han formado esa visión, ¿qué dirías?",
  },
  "repair-time-2": {
    id: "repair-time-2",
    category: "repair",
    speaker: "recruiter",
    text: "Looking back at everything you've handled so far, what would you say has been the defining challenge of your career, and how has it changed the way you work?",
    es: "Mirando todo lo que has manejado hasta ahora, ¿cuál dirías que ha sido el reto que ha definido tu carrera y cómo ha cambiado tu forma de trabajar?",
  },
  "repair-time-3": {
    id: "repair-time-3",
    category: "repair",
    speaker: "recruiter",
    text: "When you think about your career so far — the jobs, the learning, the changes — what does this next move really mean for you?",
    es: "Cuando piensas en tu carrera hasta ahora — los trabajos, el aprendizaje, los cambios — ¿qué significa realmente para ti este próximo paso?",
  },
  "repair-time-4": {
    id: "repair-time-4",
    category: "repair",
    speaker: "recruiter",
    text: "If you had to summarize what your whole journey — work, study, everything — has prepared you to do next, what would that be?",
    es: "Si tuvieras que resumir para qué te ha preparado todo tu camino — trabajo, estudios, todo — ¿qué sería?",
  },
  /* Day 2 of each week — DIDN'T CATCH IT: spoken as one long compound question. */
  "repair-catch-1": {
    id: "repair-catch-1",
    category: "repair",
    speaker: "recruiter",
    text: "So, thinking about that experience, what was the most difficult part, how did you react in the moment, and looking back now, what would you say it taught you?",
    es: "Entonces, pensando en esa experiencia, ¿cuál fue la parte más difícil, cómo reaccionaste en el momento y, mirando atrás, qué dirías que te enseñó?",
  },
  "repair-catch-2": {
    id: "repair-catch-2",
    category: "repair",
    speaker: "recruiter",
    text: "So after that mistake, what changed in the way you work, who noticed the difference, and what would you tell someone in the same situation?",
    es: "Entonces, después de ese error, ¿qué cambió en tu forma de trabajar, quién notó la diferencia y qué le dirías a alguien en la misma situación?",
  },
  "repair-catch-3": {
    id: "repair-catch-3",
    category: "repair",
    speaker: "recruiter",
    text: "When you think about that failure, what was really the cause, what did you change afterward, and how do you make sure it never happens again?",
    es: "Cuando piensas en ese fracaso, ¿cuál fue realmente la causa, qué cambiaste después y cómo te aseguras de que no vuelva a pasar?",
  },
  "repair-catch-4": {
    id: "repair-catch-4",
    category: "repair",
    speaker: "recruiter",
    text: "Considering that situation, what options did you have at that moment, why did you choose the one you chose, and what did the result tell you about yourself?",
    es: "Considerando esa situación, ¿qué opciones tenías en ese momento, por qué elegiste la que elegiste y qué te dijo el resultado sobre ti?",
  },
  /* Day 3 of each week — CONFIRM: an ambiguous question with two possible readings. */
  "repair-confirm-1": {
    id: "repair-confirm-1",
    category: "repair",
    speaker: "recruiter",
    text: "So, how did you find the transition?",
    es: "Entonces, ¿cómo encontraste la transición?",
  },
  "repair-confirm-2": {
    id: "repair-confirm-2",
    category: "repair",
    speaker: "recruiter",
    text: "And looking back, was it worth it?",
    es: "Y mirando atrás, ¿valió la pena?",
  },
  "repair-confirm-3": {
    id: "repair-confirm-3",
    category: "repair",
    speaker: "recruiter",
    text: "Where do you see yourself growing?",
    es: "¿Dónde te ves creciendo?",
  },
  "repair-confirm-4": {
    id: "repair-confirm-4",
    category: "repair",
    speaker: "recruiter",
    text: "If you could start over, what would change?",
    es: "Si pudieras empezar de nuevo, ¿qué cambiaría?",
  },
  /* Day 4 of each week — RESTART: a question that invites a false start. */
  "repair-restart-1": {
    id: "repair-restart-1",
    category: "repair",
    speaker: "recruiter",
    text: "Tell me everything about that — actually, just the part that matters for this job.",
    es: "Cuéntame todo sobre eso — mejor, solo la parte que importa para este trabajo.",
  },
  "repair-restart-2": {
    id: "repair-restart-2",
    category: "repair",
    speaker: "recruiter",
    text: "Tell me about that person — actually, start with what you did for them.",
    es: "Cuéntame sobre esa persona — mejor, empieza con lo que hiciste por ella.",
  },
  "repair-restart-3": {
    id: "repair-restart-3",
    category: "repair",
    speaker: "recruiter",
    text: "Walk me through your availability — actually, first: can you start immediately?",
    es: "Cuéntame tu disponibilidad — mejor, primero: ¿puedes empezar de inmediato?",
  },
  "repair-restart-4": {
    id: "repair-restart-4",
    category: "repair",
    speaker: "recruiter",
    text: "Describe your ideal job — actually, tell me first: what job would you never accept?",
    es: "Describe tu trabajo ideal — mejor, dime primero: ¿qué trabajo nunca aceptarías?",
  },
  /* Day 5 of each week — MIXED, under pressure: any of the four inside the challenge round. */
  "repair-mixed-1": {
    id: "repair-mixed-1",
    category: "repair",
    speaker: "recruiter",
    text: "Before we finish — how does this role fit your goals, what would you do in your first month, and why this company?",
    es: "Antes de terminar — ¿cómo encaja este puesto en tus metas, qué harías en tu primer mes y por qué esta empresa?",
  },
  "repair-mixed-2": {
    id: "repair-mixed-2",
    category: "repair",
    speaker: "recruiter",
    text: "One more thing — what did you take from all that?",
    es: "Una cosa más — ¿qué te llevaste de todo eso?",
  },
  "repair-mixed-3": {
    id: "repair-mixed-3",
    category: "repair",
    speaker: "recruiter",
    text: "Last question — tell me why you're here — actually, no: tell me why I should remember you tomorrow.",
    es: "Última pregunta — dime por qué estás aquí — mejor no: dime por qué debería recordarte mañana.",
  },
  "repair-mixed-4": {
    id: "repair-mixed-4",
    category: "repair",
    speaker: "recruiter",
    text: "One last thing: if you could design your perfect first year with us, what would it look like?",
    es: "Una última cosa: si pudieras diseñar tu primer año perfecto con nosotros, ¿cómo sería?",
  },
};

export function bankQuestion(id: string): AdvancedQuestion {
  const q = ADVANCED_QUESTION_BANK[id];
  if (!q) throw new Error(`Unknown advanced question: ${id}`);
  return q;
}
