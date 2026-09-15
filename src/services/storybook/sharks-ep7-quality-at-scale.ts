import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/sharks-ep7-quality-at-scale/cover.jpg";
import s1 from "@/assets/storybook/sharks-ep7-quality-at-scale/s1.jpg";
import s2 from "@/assets/storybook/sharks-ep7-quality-at-scale/s2.jpg";
import s3 from "@/assets/storybook/sharks-ep7-quality-at-scale/s3.jpg";
import s4 from "@/assets/storybook/sharks-ep7-quality-at-scale/s4.jpg";
import s5 from "@/assets/storybook/sharks-ep7-quality-at-scale/s5.jpg";
import s6 from "@/assets/storybook/sharks-ep7-quality-at-scale/s6.jpg";
import s7 from "@/assets/storybook/sharks-ep7-quality-at-scale/s7.jpg";
import s8 from "@/assets/storybook/sharks-ep7-quality-at-scale/s8.jpg";
import s9 from "@/assets/storybook/sharks-ep7-quality-at-scale/s9.jpg";
import s10 from "@/assets/storybook/sharks-ep7-quality-at-scale/s10.jpg";
import s11 from "@/assets/storybook/sharks-ep7-quality-at-scale/s11.jpg";

export const SHARKS_EP7_QUALITY_AT_SCALE: StorybookEpisode = {
  "id": "sharks-ep7-quality-at-scale",
  "moduleId": "sharks",
  "week": 2,
  "title": "Quality at scale",
  "titleEs": "Calidad a gran escala",
  "episodeLabel": {
    "en": "Season 8 · Episode 7",
    "es": "Temporada 8 · Episodio 7"
  },
  "previously": [
    {
      "en": "Vale won an international contract, but every new opportunity brings a harder decision.",
      "es": "Vale ganó un contrato internacional, pero cada oportunidad trae una decisión más difícil."
    }
  ],
  "reviewWords": [
    {
      "word": "contract",
      "es": "contrato"
    },
    {
      "word": "quality",
      "es": "calidad"
    },
    {
      "word": "deadline",
      "es": "fecha límite"
    }
  ],
  "blurb": {
    "en": "Have you ever trained three offices at the same time? Vale, the second office just reported that half the class cannot connect.",
    "es": "¿Alguna vez han capacitado tres oficinas al mismo tiempo? Vale, la segunda oficina acaba de informar que la mitad de la clase no puede conectarse."
  },
  "cover": cover,
  "voice": "girl",
  "scenes": [
    {
      "id": "s1",
      "image": s1,
      "imageAlt": "Mr. Reed questions Camila about training three offices at the same time.",
      "text": "Have you ever trained three offices at the same time?",
      "es": "¿Alguna vez han capacitado tres oficinas al mismo tiempo?",
      "speaker": "reed",
      "cast": [
        "reed",
        "camila"
      ],
      "lines": [
        {
          "speaker": "reed",
          "text": "Before we expand this contract, I need evidence that your quality survives in three countries.",
          "es": "Antes de ampliar este contrato, necesito evidencia de que su calidad sobrevive en tres países."
        },
        {
          "speaker": "reed",
          "text": "Have you ever trained three offices at the same time?",
          "es": "¿Alguna vez han capacitado tres oficinas al mismo tiempo?"
        },
        {
          "speaker": "camila",
          "text": "We have, and we can show you the data from the last eight weeks.",
          "es": "Sí lo hemos hecho, y podemos mostrarle los datos de las últimas ocho semanas."
        }
      ],
      "words": [
        { "word": "expand", "es": "ampliar" },
        { "word": "evidence", "es": "evidencia" },
        { "word": "data", "es": "datos" }
      ]
    },
    {
      "id": "s2",
      "image": s2,
      "imageAlt": "Vale and Lucia present the parallel groups data during the quality review.",
      "text": "Yes. We have run parallel groups since the Northline contract.",
      "es": "Sí. Hemos manejado grupos paralelos desde el contrato de Northline.",
      "speaker": "vale",
      "cast": [
        "vale",
        "lucia"
      ],
      "lines": [
        {
          "speaker": "lucia",
          "text": "Vale, he wants proof, not opinions. Show him the numbers we reviewed on Monday.",
          "es": "Vale, él quiere pruebas, no opiniones. Muéstrale los números que revisamos el lunes."
        },
        {
          "speaker": "vale",
          "text": "Yes. We have run parallel groups since the Northline contract.",
          "es": "Sí. Hemos manejado grupos paralelos desde el contrato de Northline."
        },
        {
          "speaker": "lucia",
          "text": "Three groups, three cities, the same lesson plan, and the results stayed within four points.",
          "es": "Tres grupos, tres ciudades, el mismo plan de clase, y los resultados se mantuvieron en cuatro puntos."
        }
      ],
      "words": [
        { "word": "parallel", "es": "paralelo" },
        { "word": "proof", "es": "prueba" },
        { "word": "results", "es": "resultados" }
      ]
    },
    {
      "id": "s3",
      "image": s3,
      "imageAlt": "Camila shows the attendance and speaking-time report while Mr. Reed reads it on screen.",
      "text": "We have tracked attendance and speaking time for every group.",
      "es": "Hemos registrado asistencia y tiempo hablado para cada grupo.",
      "speaker": "camila",
      "cast": [
        "camila",
        "reed"
      ],
      "lines": [
        {
          "speaker": "camila",
          "text": "We have tracked attendance and speaking time for every group.",
          "es": "Hemos registrado asistencia y tiempo hablado para cada grupo."
        },
        {
          "speaker": "reed",
          "text": "Speaking time is unusual. Most providers only report attendance and a final exam score.",
          "es": "El tiempo hablado es inusual. La mayoría de proveedores solo reporta asistencia y una nota final."
        },
        {
          "speaker": "camila",
          "text": "Attendance shows who came. Speaking time shows who practiced, and that predicts real progress.",
          "es": "La asistencia muestra quién vino. El tiempo hablado muestra quién practicó, y eso predice el progreso real."
        }
      ],
      "words": [
        { "word": "tracked", "es": "registrado" },
        { "word": "attendance", "es": "asistencia" },
        { "word": "progress", "es": "progreso" }
      ]
    },
    {
      "id": "s4",
      "image": s4,
      "imageAlt": "Lucia describes her two classroom observations in Guatemala to Vale.",
      "text": "I have already observed the Guatemala teachers twice.",
      "es": "Ya he observado dos veces a los maestros de Guatemala.",
      "speaker": "lucia",
      "cast": [
        "lucia",
        "vale"
      ],
      "lines": [
        {
          "speaker": "vale",
          "text": "Lucía, explain what you saw, because you are the person who visited those classrooms.",
          "es": "Lucía, explica qué viste, porque tú eres quien visitó esas aulas."
        },
        {
          "speaker": "lucia",
          "text": "I have already observed the Guatemala teachers twice.",
          "es": "Ya he observado dos veces a los maestros de Guatemala."
        },
        {
          "speaker": "lucia",
          "text": "Both times I sat at the back, measured speaking time, and met the teacher afterwards.",
          "es": "Las dos veces me senté atrás, medí el tiempo hablado y me reuní con el maestro después."
        }
      ],
      "words": [
        { "word": "observed", "es": "observado" },
        { "word": "classrooms", "es": "aulas" },
        { "word": "measured", "es": "medido" }
      ]
    },
    {
      "id": "s5",
      "image": s5,
      "imageAlt": "Mr. Reed asks Camila whether the team follows through with struggling students.",
      "text": "But have they followed through when a student falls behind?",
      "es": "¿Pero han cumplido cuando un estudiante se queda atrás?",
      "speaker": "reed",
      "cast": [
        "reed",
        "camila"
      ],
      "lines": [
        {
          "speaker": "reed",
          "text": "Observation is useful, although observing a problem and fixing it are completely different things.",
          "es": "Observar es útil, aunque observar un problema y resolverlo son cosas completamente distintas."
        },
        {
          "speaker": "reed",
          "text": "But have they followed through when a student falls behind?",
          "es": "¿Pero han cumplido cuando un estudiante se queda atrás?"
        },
        {
          "speaker": "camila",
          "text": "Yes, and I can prove it with one case from the second week in Guatemala.",
          "es": "Sí, y puedo probarlo con un caso de la segunda semana en Guatemala."
        }
      ],
      "words": [
        { "word": "followed", "es": "cumplido" },
        { "word": "behind", "es": "atrasado" },
        { "word": "case", "es": "caso" }
      ]
    },
    {
      "id": "s6",
      "image": s6,
      "imageAlt": "Vale and Lucia explain the recovery sessions for the students who fell behind.",
      "text": "They have. Lucía called each student and scheduled a recovery session.",
      "es": "Sí. Lucía llamó a cada estudiante y programó una sesión de recuperación.",
      "speaker": "vale",
      "cast": [
        "vale",
        "lucia"
      ],
      "lines": [
        {
          "speaker": "lucia",
          "text": "Four students missed two classes, and normally those four disappear before the month ends.",
          "es": "Cuatro estudiantes faltaron a dos clases, y normalmente esos cuatro desaparecen antes de que acabe el mes."
        },
        {
          "speaker": "vale",
          "text": "They have. Lucía called each student and scheduled a recovery session.",
          "es": "Sí. Lucía llamó a cada estudiante y programó una sesión de recuperación."
        },
        {
          "speaker": "lucia",
          "text": "Three returned that same week, and the fourth moved to the Saturday group instead of quitting.",
          "es": "Tres regresaron esa misma semana, y el cuarto se pasó al grupo del sábado en lugar de abandonar."
        }
      ],
      "words": [
        { "word": "scheduled", "es": "programado" },
        { "word": "recovery", "es": "recuperación" },
        { "word": "quitting", "es": "abandonar" }
      ]
    },
    {
      "id": "s7",
      "image": s7,
      "imageAlt": "Camila defends the early-warning system while Mr. Reed pushes for proof at scale.",
      "text": "We are keeping up with growth because the system shows problems early.",
      "es": "Nos mantenemos al ritmo del crecimiento porque el sistema muestra problemas temprano.",
      "speaker": "camila",
      "cast": [
        "camila",
        "reed"
      ],
      "lines": [
        {
          "speaker": "reed",
          "text": "That is one student. My question is whether your system survives two hundred of them.",
          "es": "Ese es un estudiante. Mi pregunta es si su sistema sobrevive a doscientos de ellos."
        },
        {
          "speaker": "camila",
          "text": "We are keeping up with growth because the system shows problems early.",
          "es": "Nos mantenemos al ritmo del crecimiento porque el sistema muestra problemas temprano."
        },
        {
          "speaker": "reed",
          "text": "Early is the right word. Late information is only an expensive explanation of a failure.",
          "es": "Temprano es la palabra correcta. La información tardía solo es una explicación cara de un fracaso."
        }
      ],
      "words": [
        { "word": "growth", "es": "crecimiento" },
        { "word": "system", "es": "sistema" },
        { "word": "information", "es": "información" }
      ]
    },
    {
      "id": "s8",
      "image": s8,
      "imageAlt": "Lucia admits to Vale that one group still needs coaching support.",
      "text": "One class improved after coaching, but another still needs support.",
      "es": "Una clase mejoró después del acompañamiento, pero otra todavía necesita apoyo.",
      "speaker": "lucia",
      "cast": [
        "lucia",
        "vale"
      ],
      "lines": [
        {
          "speaker": "vale",
          "text": "Lucía, tell him the part we do not like, because honest data includes the weak results.",
          "es": "Lucía, dile la parte que no nos gusta, porque los datos honestos incluyen los resultados débiles."
        },
        {
          "speaker": "lucia",
          "text": "One class improved after coaching, but another still needs support.",
          "es": "Una clase mejoró después del acompañamiento, pero otra todavía necesita apoyo."
        },
        {
          "speaker": "vale",
          "text": "That group has a new teacher, so we added weekly coaching until the numbers improve.",
          "es": "Ese grupo tiene un maestro nuevo, así que agregamos acompañamiento semanal hasta que mejoren los números."
        }
      ],
      "words": [
        { "word": "coaching", "es": "acompañamiento" },
        { "word": "support", "es": "apoyo" },
        { "word": "weak", "es": "débil" }
      ]
    },
    {
      "id": "s9",
      "image": s9,
      "imageAlt": "Mr. Reed demands a higher standard while Camila takes note of it.",
      "text": "Then raise the bar. Good is not enough at international scale.",
      "es": "Entonces eleven el estándar. Bueno no es suficiente a escala internacional.",
      "speaker": "reed",
      "cast": [
        "reed",
        "camila"
      ],
      "lines": [
        {
          "speaker": "camila",
          "text": "So our promise is simple: we show the problem early, and we fix it in writing.",
          "es": "Así que nuestra promesa es simple: mostramos el problema temprano y lo corregimos por escrito."
        },
        {
          "speaker": "reed",
          "text": "Then raise the bar. Good is not enough at international scale.",
          "es": "Entonces eleven el estándar. Bueno no es suficiente a escala internacional."
        },
        {
          "speaker": "camila",
          "text": "Tell me the standard you expect, and we will publish it for every country.",
          "es": "Dígame el estándar que espera, y lo publicaremos para cada país."
        }
      ],
      "words": [
        { "word": "scale", "es": "escala" },
        { "word": "standard", "es": "estándar" },
        { "word": "publish", "es": "publicar" }
      ]
    },
    {
      "id": "s10",
      "image": s10,
      "imageAlt": "Vale and Lucia define the single quality standard for every country.",
      "text": "Agreed. We will publish one quality standard for every country.",
      "es": "De acuerdo. Publicaremos un estándar de calidad para cada país.",
      "speaker": "vale",
      "cast": [
        "vale",
        "lucia"
      ],
      "lines": [
        {
          "speaker": "vale",
          "text": "Agreed. We will publish one quality standard for every country.",
          "es": "De acuerdo. Publicaremos un estándar de calidad para cada país."
        },
        {
          "speaker": "lucia",
          "text": "One standard means the same speaking minutes, the same reports, and the same monthly observation.",
          "es": "Un estándar significa los mismos minutos de habla, los mismos informes y la misma observación mensual."
        },
        {
          "speaker": "vale",
          "text": "Exactly, and if an office cannot reach it, we support that office before we blame it.",
          "es": "Exacto, y si una oficina no lo alcanza, apoyamos a esa oficina antes de culparla."
        }
      ],
      "words": [
        { "word": "quality", "es": "calidad" },
        { "word": "monthly", "es": "mensual" },
        { "word": "blame", "es": "culpar" }
      ]
    },
    {
      "id": "s11",
      "image": s11,
      "imageAlt": "Lucia interrupts with the connection failure in the second office while Mr. Reed watches.",
      "text": "Vale, the second office just reported that half the class cannot connect.",
      "es": "Vale, la segunda oficina acaba de informar que la mitad de la clase no puede conectarse.",
      "speaker": "lucia",
      "cast": [
        "lucia",
        "reed"
      ],
      "lines": [
        {
          "speaker": "reed",
          "text": "Send me that document tomorrow. If it is serious, I will show it to my board.",
          "es": "Envíeme ese documento mañana. Si es serio, se lo mostraré a mi junta."
        },
        {
          "speaker": "lucia",
          "text": "Vale, the second office just reported that half the class cannot connect.",
          "es": "Vale, la segunda oficina acaba de informar que la mitad de la clase no puede conectarse."
        },
        {
          "speaker": "reed",
          "text": "Then your new standard begins today, and I am watching how quickly you respond.",
          "es": "Entonces su nuevo estándar empieza hoy, y estoy observando qué tan rápido responden."
        }
      ],
      "words": [
        { "word": "reported", "es": "informado" },
        { "word": "connect", "es": "conectarse" },
        { "word": "respond", "es": "responder" }
      ]
    }
  ],
  "quizzes": [
    {
      "id": "q1",
      "afterScene": "s3",
      "questionEn": "What is the main problem the team identifies?",
      "questionEs": "¿Cuál es el problema principal que identifica el equipo?",
      "options": [
        {
          "label": "We have tracked attendance and speaking time for every group.",
          "emoji": "🎯"
        },
        {
          "label": "They decide to stop working.",
          "emoji": "🛑"
        },
        {
          "label": "They forget the meeting.",
          "emoji": "❓"
        }
      ],
      "answer": 0,
      "sayIt": "The main problem is clear, so we should act.",
      "sayItEs": "Ejemplo: «The main problem is clear, so we should act.»",
      "sayItAskEn": "What advice would you give the team?",
      "sayItAskEs": "¿Qué consejo le darías al equipo?",
      "sayItCheck": {
        "target": "They should *",
        "altTargets": [
          "They could *",
          "I would *",
          "They must *"
        ]
      }
    },
    {
      "id": "q2",
      "afterScene": "s7",
      "questionEn": "How does the team respond under pressure?",
      "questionEs": "¿Cómo responde el equipo bajo presión?",
      "options": [
        {
          "label": "We are keeping up with growth because the system shows problems early.",
          "emoji": "💬"
        },
        {
          "label": "They ignore the problem.",
          "emoji": "🙈"
        },
        {
          "label": "They cancel every class.",
          "emoji": "🚫"
        }
      ],
      "answer": 0,
      "sayIt": "They respond clearly and protect the result.",
      "sayItEs": "Ejemplo: «They respond clearly and protect the result.»",
      "sayItAskEn": "Describe how you would respond in this situation.",
      "sayItAskEs": "Describe cómo responderías en esta situación.",
      "sayItCheck": {
        "target": "I would * because *",
        "altTargets": [
          "First, I would *",
          "I would try to *"
        ]
      }
    },
    {
      "id": "q3",
      "afterScene": "s11",
      "questionEn": "What changes at the end of the episode?",
      "questionEs": "¿Qué cambia al final del episodio?",
      "options": [
        {
          "label": "Vale, the second office just reported that half the class cannot connect.",
          "emoji": "⚡"
        },
        {
          "label": "Nothing changes.",
          "emoji": "😴"
        },
        {
          "label": "Everyone goes on vacation.",
          "emoji": "🏖️"
        }
      ],
      "answer": 0,
      "sayIt": "Vale, the second office just reported that half the class cannot connect.",
      "sayItEs": "Cuenta el cambio final con tus propias palabras.",
      "sayItAskEn": "Summarize the problem, the response, and the result.",
      "sayItAskEs": "Resume el problema, la respuesta y el resultado.",
      "sayItCheck": {
        "target": "The problem was *, so they *, and *",
        "altTargets": [
          "First *, then *, finally *",
          "They had to *"
        ]
      }
    }
  ],
  "mindsetCard": {
    "afterScene": "s6",
    "phrase": "I can do hard things. Mistakes are part of the process.",
    "es": "Puedo hacer cosas difíciles. Los errores son parte del proceso."
  },
  "habitCard": {
    "afterScene": "s4",
    "phrase": "English is easy when I listen, clarify, and speak again.",
    "es": "El inglés es fácil cuando escucho, aclaro y vuelvo a hablar.",
    "model": "vale",
    "modelActionEs": "Vale escucha, aclara y responde con calma."
  },
  "expressions": [
    {
      "phrase": "follow through",
      "variants": [
        "followed through"
      ],
      "es": "cumplir hasta el final",
      "kind": "phrasal",
      "example": "But have they followed through when a student falls behind?",
      "exampleEs": "¿Pero han cumplido cuando un estudiante se queda atrás?"
    },
    {
      "phrase": "keep up",
      "variants": [
        "keeping up"
      ],
      "es": "mantener el ritmo",
      "kind": "phrasal",
      "example": "Have you ever trained three offices at the same time?",
      "exampleEs": "¿Alguna vez han capacitado tres oficinas al mismo tiempo?"
    },
    {
      "phrase": "raise the bar",
      "es": "elevar el estándar",
      "kind": "idiom",
      "example": "Then raise the bar. Good is not enough at international scale.",
      "exampleEs": "Entonces eleven el estándar. Bueno no es suficiente a escala internacional."
    }
  ],
  "finaleSeconds": 30,
  "continuePrompt": {
    "en": "Your turn, 30 seconds: explain the problem, compare the options, and defend your decision.",
    "es": "Tu turno, 30 segundos: explica el problema, compara las opciones y defiende tu decisión."
  },
  "continueWith": [
    "The main issue is ...",
    "If I were responsible, I would ...",
    "The best option is ... because ..."
  ],
  "cliffhanger": {
    "en": "Vale, the second office just reported that half the class cannot connect.",
    "es": "Vale, la segunda oficina acaba de informar que la mitad de la clase no puede conectarse."
  }
};
