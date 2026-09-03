/**
 * ADVANCED — controlled question VARIANTS (recognition training).
 *
 * Every entry lists 3–4 REAL recruiter / customer phrasings of the SAME
 * question type as the canonical bank entry. All fixed and prewritten —
 * never generated. Repair entries intentionally have no variants.
 *
 * Reps 1–3 always use the canonical phrasing; Rep 5 turn 1 and the
 * week-end recognition round draw from here.
 */

export type QuestionVariant = { text: string; es: string };

export const ADVANCED_QUESTION_VARIANTS: Record<string, QuestionVariant[]> = {
  /* ---------------- TELL ME ABOUT YOURSELF ---------------- */
  "tmay-1": [
    { text: "Walk me through your background.", es: "Cuéntame tu trayectoria." },
    { text: "So, tell me a little about you.", es: "Bueno, cuéntame un poco de ti." },
    { text: "Give me the short version of your story.", es: "Dame la versión corta de tu historia." },
    { text: "Let's start simple — who are you, professionally?", es: "Empecemos sencillo: ¿quién eres, profesionalmente?" },
  ],
  "journey-1": [
    { text: "Take me through your career so far.", es: "Llévame por tu carrera hasta ahora." },
    { text: "How did you get to where you are today?", es: "¿Cómo llegaste a donde estás hoy?" },
    { text: "Give me a quick overview of your work history.", es: "Dame un resumen rápido de tu historial laboral." },
  ],

  /* ---------------- WHY HIRE YOU ---------------- */
  "hire-1": [
    { text: "What makes you the right person for this role?", es: "¿Qué te hace la persona indicada para este puesto?" },
    { text: "Why you, and not the next candidate?", es: "¿Por qué tú y no el siguiente candidato?" },
    { text: "What would you bring to this team?", es: "¿Qué le aportarías a este equipo?" },
    { text: "Convince me you're the one for this job.", es: "Convénceme de que eres la persona para este trabajo." },
  ],
  "hire-2": [
    { text: "Give me one good reason to choose you.", es: "Dame una buena razón para elegirte." },
    { text: "What sets you apart from other applicants?", es: "¿Qué te diferencia de los demás aspirantes?" },
    { text: "Why are you a good fit for us?", es: "¿Por qué encajas bien con nosotros?" },
  ],
  "why-here-1": [
    { text: "What attracted you to our company?", es: "¿Qué te atrajo de nuestra empresa?" },
    { text: "Why us? There are a lot of companies hiring right now.", es: "¿Por qué nosotros? Hay muchas empresas contratando ahora mismo." },
    { text: "What do you know about us, and why do you want to be here?", es: "¿Qué sabes de nosotros y por qué quieres estar aquí?" },
  ],
  "why-job-1": [
    { text: "What interests you about this position?", es: "¿Qué te interesa de este puesto?" },
    { text: "Why did you apply for this role?", es: "¿Por qué aplicaste a este puesto?" },
    { text: "What made you say yes to this interview?", es: "¿Qué te hizo decir que sí a esta entrevista?" },
  ],
  "not-hire-1": [
    { text: "Give me a reason not to hire you.", es: "Dame una razón para no contratarte." },
    { text: "What might make us hesitate about you?", es: "¿Qué podría hacernos dudar de ti?" },
    { text: "If we don't pick you, what will the reason be?", es: "Si no te elegimos, ¿cuál será la razón?" },
  ],
  "strong-1": [
    { text: "What are your strongest qualities for this job?", es: "¿Cuáles son tus mayores cualidades para este trabajo?" },
    { text: "Why do you think you'd do well here?", es: "¿Por qué crees que te iría bien aquí?" },
    { text: "Sell yourself to me in under a minute.", es: "Véndete conmigo en menos de un minuto." },
  ],

  /* ---------------- WEAKNESS ---------------- */
  "weak-1": [
    { text: "What's something you're still working on?", es: "¿Qué es algo en lo que todavía estás trabajando?" },
    { text: "Where do you struggle at work?", es: "¿En qué te cuesta más en el trabajo?" },
    { text: "Tell me about an area where you're not as strong.", es: "Háblame de un área en la que no eres tan fuerte." },
    { text: "What kind of feedback do you get most often?", es: "¿Qué tipo de retroalimentación recibes con más frecuencia?" },
  ],
  "weak-2": [
    { text: "What's a skill you'd like to get better at?", es: "¿Qué habilidad te gustaría mejorar?" },
    { text: "What do you find hardest about your job?", es: "¿Qué es lo más difícil de tu trabajo?" },
    { text: "If I asked your coworkers, what would they say you need to improve?", es: "Si les preguntara a tus compañeros, ¿qué dirían que necesitas mejorar?" },
  ],
  "criticize-1": [
    { text: "What feedback did your last manager give you?", es: "¿Qué retroalimentación te dio tu último jefe?" },
    { text: "What would your last boss say you could do better?", es: "¿Qué diría tu último jefe que podrías hacer mejor?" },
    { text: "Tell me about a time a supervisor was not happy with your work.", es: "Cuéntame de una vez en que un supervisor no quedó contento con tu trabajo." },
  ],
  "improve-1": [
    { text: "What are you working on improving right now?", es: "¿Qué estás tratando de mejorar ahora mismo?" },
    { text: "Where do you see room to grow?", es: "¿Dónde ves espacio para crecer?" },
    { text: "What's your development goal for this year?", es: "¿Cuál es tu meta de desarrollo para este año?" },
  ],

  /* ---------------- BEHAVIORAL STORY ---------------- */
  "story-1": [
    { text: "Tell me about a real experience.", es: "Cuéntame sobre una experiencia real." },
    { text: "Describe your first day at a new job or school.", es: "Describe tu primer día en un trabajo o escuela nueva." },
    { text: "When was the last time you had to start something completely new?", es: "¿Cuándo fue la última vez que tuviste que empezar algo completamente nuevo?" },
    { text: "Walk me through a moment when everything was new to you.", es: "Cuéntame un momento en que todo era nuevo para ti." },
  ],
  "challenge-1": [
    { text: "Describe a difficult situation you faced.", es: "Describe una situación difícil que enfrentaste." },
    { text: "When was a time things didn't go as planned?", es: "¿Cuándo fue una vez que las cosas no salieron como se planeaba?" },
    { text: "Give me an example of a problem you had to push through.", es: "Dame un ejemplo de un problema que tuviste que superar." },
    { text: "Tell me about the hardest thing you've dealt with at work.", es: "Cuéntame lo más difícil con lo que has lidiado en el trabajo." },
  ],
  "mistake-1": [
    { text: "Tell me about a time you got something wrong.", es: "Cuéntame de una vez en que te equivocaste." },
    { text: "Describe a mistake and how you handled it.", es: "Describe un error y cómo lo manejaste." },
    { text: "When did you last mess up at work, and what did you do?", es: "¿Cuándo fue la última vez que metiste la pata en el trabajo, y qué hiciste?" },
  ],
  "difficult-1": [
    { text: "Describe a conflict you had with a coworker or customer.", es: "Describe un conflicto que tuviste con un compañero o cliente." },
    { text: "Tell me about someone who was hard to work with.", es: "Háblame de alguien con quien fue difícil trabajar." },
    { text: "How have you handled a person who was angry with you?", es: "¿Cómo has manejado a una persona que estaba enojada contigo?" },
  ],
  "helped-1": [
    { text: "Give me an example of going the extra mile for someone.", es: "Dame un ejemplo de haber hecho un esfuerzo extra por alguien." },
    { text: "When did you last make a real difference for a customer?", es: "¿Cuándo fue la última vez que marcaste una diferencia real para un cliente?" },
    { text: "Tell me about a time someone needed your help.", es: "Cuéntame de una vez en que alguien necesitó tu ayuda." },
  ],
  "pressure-1": [
    { text: "Describe a time you had a tight deadline.", es: "Describe una vez en que tuviste una fecha límite muy ajustada." },
    { text: "When have you had too much to do and too little time?", es: "¿Cuándo has tenido demasiado que hacer y muy poco tiempo?" },
    { text: "Tell me about a stressful day at work and how you got through it.", es: "Cuéntame de un día estresante en el trabajo y cómo lo superaste." },
  ],
  "fu-next": [
    { text: "And then what did you do?", es: "¿Y luego qué hiciste?" },
    { text: "How did it end?", es: "¿Cómo terminó?" },
    { text: "What was the result?", es: "¿Cuál fue el resultado?" },
  ],
  "fu-learn": [
    { text: "What did you take away from that?", es: "¿Qué te llevaste de eso?" },
    { text: "What would you do differently now?", es: "¿Qué harías diferente ahora?" },
    { text: "How did that change the way you work?", es: "¿Cómo cambió eso tu forma de trabajar?" },
  ],
  "failure-1": [
    { text: "Tell me about a time you didn't succeed.", es: "Cuéntame de una vez en que no tuviste éxito." },
    { text: "Describe a goal you didn't reach.", es: "Describe una meta que no alcanzaste." },
    { text: "When did something you were responsible for go wrong?", es: "¿Cuándo salió mal algo de lo que eras responsable?" },
  ],
  "comp-problem": [
    { text: "Give me an example of a problem you fixed.", es: "Dame un ejemplo de un problema que resolviste." },
    { text: "Describe a situation where you found a solution nobody else saw.", es: "Describe una situación en la que encontraste una solución que nadie más vio." },
    { text: "When did you last figure something out on your own?", es: "¿Cuándo fue la última vez que resolviste algo por tu cuenta?" },
  ],
  "comp-learn": [
    { text: "Tell me about picking up a new skill fast.", es: "Cuéntame de una vez en que aprendiste una habilidad nueva rápido." },
    { text: "Describe a time you had to learn on the job.", es: "Describe una vez en que tuviste que aprender sobre la marcha." },
    { text: "When were you thrown into something you didn't know how to do?", es: "¿Cuándo te lanzaron a algo que no sabías hacer?" },
  ],
  "comp-pressure": [
    { text: "Describe a high-pressure moment and how you handled it.", es: "Describe un momento de mucha presión y cómo lo manejaste." },
    { text: "When have you had to stay calm while everything was urgent?", es: "¿Cuándo has tenido que mantener la calma cuando todo era urgente?" },
    { text: "Give me an example of performing well under stress.", es: "Dame un ejemplo de haber rendido bien bajo estrés." },
  ],
  "difficult-situation": [
    { text: "Describe a tough situation and what you did about it.", es: "Describe una situación complicada y qué hiciste al respecto." },
    { text: "Tell me about a time you were in a difficult spot.", es: "Cuéntame de una vez en que estuviste en una situación difícil." },
    { text: "When was the last time you had to make a hard call at work?", es: "¿Cuándo fue la última vez que tuviste que tomar una decisión difícil en el trabajo?" },
  ],

  /* ---------------- CRAZY / UNEXPECTED ---------------- */
  "crazy-1": [
    { text: "If you could start your life over, what would you change?", es: "Si pudieras empezar tu vida de nuevo, ¿qué cambiarías?" },
    { text: "Looking back, what's one thing you'd do differently, and why?", es: "Mirando atrás, ¿qué es una cosa que harías diferente, y por qué?" },
    { text: "Here's a curveball: what would a second life look like for you?", es: "Una pregunta inesperada: ¿cómo sería una segunda vida para ti?" },
  ],
  "crazy-decision": [
    { text: "What's one decision you wish you could take back?", es: "¿Qué decisión desearías poder deshacer?" },
    { text: "If you had a time machine for one choice, which one would you change?", es: "Si tuvieras una máquina del tiempo para una decisión, ¿cuál cambiarías?" },
    { text: "Tell me about a choice you'd make differently today.", es: "Háblame de una decisión que tomarías diferente hoy." },
  ],
  "crazy-money": [
    { text: "Say you win ten thousand dollars tomorrow. What happens next?", es: "Digamos que mañana ganas diez mil dólares. ¿Qué pasa después?" },
    { text: "What would you do with an unexpected $10,000?", es: "¿Qué harías con diez mil dólares inesperados?" },
    { text: "Quick one: ten thousand dollars lands in your account. First move?", es: "Rápido: diez mil dólares caen en tu cuenta. ¿Primer paso?" },
  ],
  "crazy-live": [
    { text: "If money and visas weren't a problem, where would you move?", es: "Si el dinero y las visas no fueran problema, ¿a dónde te mudarías?" },
    { text: "Pick any city in the world to live in. Which one, and why?", es: "Elige cualquier ciudad del mundo para vivir. ¿Cuál, y por qué?" },
    { text: "Where would you live if you could choose anywhere?", es: "¿Dónde vivirías si pudieras elegir cualquier lugar?" },
  ],
  "crazy-animal": [
    { text: "Which animal best describes you at work?", es: "¿Qué animal te describe mejor en el trabajo?" },
    { text: "Fun one: if you were an animal, what would you be?", es: "Una divertida: si fueras un animal, ¿cuál serías?" },
    { text: "What animal are you most like, and why?", es: "¿A qué animal te pareces más, y por qué?" },
  ],
  "listen-situation": [
    { text: "Picture this: your coworker didn't show up, a customer is on hold, and your boss needs a report in twenty minutes. What's your first move, and what do you tell the customer?", es: "Imagina esto: tu compañero no llegó, un cliente está en espera y tu jefe necesita un reporte en veinte minutos. ¿Cuál es tu primer paso, y qué le dices al cliente?" },
    { text: "Here's a scenario. Three things at once: a sick teammate, a waiting customer, a report due in twenty minutes. Where do you start, and what do you say to the customer?", es: "Aquí va un escenario. Tres cosas a la vez: un compañero enfermo, un cliente esperando y un reporte para dentro de veinte minutos. ¿Por dónde empiezas, y qué le dices al cliente?" },
    { text: "Listen carefully: you're alone on the floor, a customer is holding, and a report is due in twenty minutes. What do you do first?", es: "Escucha con atención: estás solo en el piso, un cliente está en espera y un reporte se entrega en veinte minutos. ¿Qué haces primero?" },
  ],

  /* ---------------- CUSTOMER SERVICE ---------------- */
  "cs-tour-1": [
    { text: "Are you kidding me? We booked this months ago and now the date is wrong?", es: "¿Es en serio? ¡Reservamos esto hace meses y ahora la fecha está mal!" },
    { text: "I don't care whose fault it is. My family is flying in for this tour. Fix it.", es: "No me importa de quién sea la culpa. Mi familia viaja para este tour. Arréglenlo." },
    { text: "This is the second time your company has messed up my booking. What are you going to do about it?", es: "Es la segunda vez que su empresa arruina mi reservación. ¿Qué van a hacer al respecto?" },
  ],
  "cs-calls-1": [
    { text: "Every time I call, someone promises to fix it and nothing happens.", es: "Cada vez que llamo, alguien promete arreglarlo y no pasa nada." },
    { text: "This is my third call about the same issue. I'm done being patient.", es: "Esta es mi tercera llamada por el mismo problema. Ya se me acabó la paciencia." },
    { text: "Why do I have to explain this again? Nobody has solved anything.", es: "¿Por qué tengo que explicar esto otra vez? Nadie ha resuelto nada." },
  ],
  "cs-charge-1": [
    { text: "There are two charges on my card from you and I only bought one thing. I need that money back today.", es: "Hay dos cargos suyos en mi tarjeta y solo compré una cosa. Necesito ese dinero de vuelta hoy." },
    { text: "You took my money twice. Do you understand I can't pay my bills now?", es: "Me cobraron dos veces. ¿Entienden que ahora no puedo pagar mis cuentas?" },
    { text: "I was double charged and nobody is helping me. What are you going to do?", es: "Me cobraron doble y nadie me ayuda. ¿Qué van a hacer?" },
  ],

  /* ---------------- SALES ---------------- */
  "sell-phone": [
    { text: "Okay, convince me to buy this phone.", es: "Bien, convénceme de comprar este teléfono." },
    { text: "I already have a phone. Why would I want this one?", es: "Ya tengo un teléfono. ¿Por qué querría este?" },
    { text: "Pitch me this phone in thirty seconds.", es: "Véndeme este teléfono en treinta segundos." },
  ],

  /* ---------------- FUTURE / CONDITIONS ---------------- */
  "goal-1": [
    { text: "Once you land the job you want, what are your first three priorities?", es: "Cuando consigas el trabajo que quieres, ¿cuáles son tus tres primeras prioridades?" },
    { text: "What's your plan for the first months in the role you're aiming for?", es: "¿Cuál es tu plan para los primeros meses en el puesto al que aspiras?" },
    { text: "Imagine you get the job tomorrow. What are three things you'll do?", es: "Imagina que consigues el trabajo mañana. ¿Cuáles son tres cosas que harás?" },
  ],
  "leave-1": [
    { text: "What made you decide to move on from your last position?", es: "¿Qué te hizo decidir dejar tu último puesto?" },
    { text: "Why are you looking for something new right now?", es: "¿Por qué estás buscando algo nuevo ahora mismo?" },
    { text: "What's the reason for the change?", es: "¿Cuál es la razón del cambio?" },
  ],
  "cond-weekends": [
    { text: "This role includes some weekend shifts. Is that a problem for you?", es: "Este puesto incluye algunos turnos de fin de semana. ¿Es un problema para ti?" },
    { text: "How do you feel about working Saturdays?", es: "¿Qué opinas de trabajar los sábados?" },
    { text: "Can we count on you for weekends?", es: "¿Podemos contar contigo los fines de semana?" },
  ],
  "cond-salary": [
    { text: "What are your salary expectations?", es: "¿Cuáles son tus expectativas salariales?" },
    { text: "What kind of pay range are you looking for?", es: "¿Qué rango de pago estás buscando?" },
    { text: "Let's talk numbers. What do you need to make?", es: "Hablemos de números. ¿Cuánto necesitas ganar?" },
  ],
  "cond-schedule": [
    { text: "How would you handle a sudden change in your shift?", es: "¿Cómo manejarías un cambio repentino en tu turno?" },
    { text: "Schedules here move around. How flexible are you?", es: "Aquí los horarios cambian. ¿Qué tan flexible eres?" },
    { text: "If we moved you to a different shift next month, what would you do?", es: "Si te cambiáramos a otro turno el próximo mes, ¿qué harías?" },
  ],
  "cond-pressure": [
    { text: "How do you handle stress? Give me proof.", es: "¿Cómo manejas el estrés? Dame pruebas." },
    { text: "This job gets intense. Show me you can take it.", es: "Este trabajo se pone intenso. Demuéstrame que lo aguantas." },
    { text: "Everyone says they work well under pressure. Prove it to me.", es: "Todos dicen que trabajan bien bajo presión. Demuéstramelo." },
  ],
  "three-years": [
    { text: "Where do you see yourself in three years?", es: "¿Dónde te ves en tres años?" },
    { text: "What's your career goal for the next few years?", es: "¿Cuál es tu meta profesional para los próximos años?" },
    { text: "Fast-forward three years. What are you doing?", es: "Adelanta tres años. ¿Qué estás haciendo?" },
  ],
};
