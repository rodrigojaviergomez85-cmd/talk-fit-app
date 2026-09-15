import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/sharks-ep15-winning-it-back/cover.jpg";
import s1 from "@/assets/storybook/sharks-ep15-winning-it-back/s1.jpg";
import s2 from "@/assets/storybook/sharks-ep15-winning-it-back/s2.jpg";
import s3 from "@/assets/storybook/sharks-ep15-winning-it-back/s3.jpg";
import s4 from "@/assets/storybook/sharks-ep15-winning-it-back/s4.jpg";
import s5 from "@/assets/storybook/sharks-ep15-winning-it-back/s5.jpg";
import s6 from "@/assets/storybook/sharks-ep15-winning-it-back/s6.jpg";
import s7 from "@/assets/storybook/sharks-ep15-winning-it-back/s7.jpg";
import s8 from "@/assets/storybook/sharks-ep15-winning-it-back/s8.jpg";
import s9 from "@/assets/storybook/sharks-ep15-winning-it-back/s9.jpg";
import s10 from "@/assets/storybook/sharks-ep15-winning-it-back/s10.jpg";
import s11 from "@/assets/storybook/sharks-ep15-winning-it-back/s11.jpg";

export const SHARKS_EP15_WINNING_IT_BACK: StorybookEpisode = {
  "id": "sharks-ep15-winning-it-back",
  "moduleId": "sharks",
  "week": 3,
  "title": "Winning it back",
  "titleEs": "Recuperarlo",
  "episodeLabel": {
    "en": "Season 8 · Episode 15",
    "es": "Temporada 8 · Episodio 15"
  },
  "previously": [
    {
      "en": "San Miguel cancelled after complaints and a cheaper offer from a competitor.",
      "es": "San Miguel canceló tras quejas y una oferta más barata de un competidor."
    },
    {
      "en": "Mr. Reed gave Vale thirty days, and the team drove three hours to prove their quality.",
      "es": "El señor Reed le dio treinta días a Vale, y el equipo manejó tres horas para demostrar su calidad."
    }
  ],
  "reviewWords": [
    {
      "word": "cancellation",
      "es": "cancelación"
    },
    {
      "word": "pilot",
      "es": "piloto / de prueba"
    },
    {
      "word": "dashboard",
      "es": "panel de datos"
    }
  ],
  "blurb": {
    "en": "Three hours by car, one box of materials, twenty minutes of live teaching. Vale does not defend the past in San Miguel — she shows the next thirty days, and wins them back.",
    "es": "Tres horas de carretera, una caja de materiales, veinte minutos de clase en vivo. Vale no defiende el pasado en San Miguel: muestra los próximos treinta días, y los recupera."
  },
  "cover": cover,
  "voice": "girl",
  "scenes": [
    {
      "id": "s1",
      "image": s1,
      "imageAlt": "Vale, Dani and Camila arrive at the San Miguel office with a box of class materials.",
      "text": "Three hours in the car, one box of materials, and a whole contract to save. Ready?",
      "es": "Tres horas de carretera, una caja de materiales y un contrato completo que salvar. ¿Listos?",
      "speaker": "dani",
      "cast": ["dani", "vale", "camila"],
      "lines": [
        {
          "speaker": "dani",
          "text": "Three hours in the car, one box of materials, and a whole contract to save. Ready?",
          "es": "Tres horas de carretera, una caja de materiales y un contrato completo que salvar. ¿Listos?"
        },
        {
          "speaker": "vale",
          "text": "Ready. Today we do not defend the past. We show them the next thirty days, step by step.",
          "es": "Lista. Hoy no defendemos el pasado. Les mostramos los próximos treinta días, paso a paso."
        },
        {
          "speaker": "camila",
          "text": "The dashboard is on my laptop: attendance, scores and progress reports, all transparent for Mr. Reed to see.",
          "es": "El panel está en mi laptop: asistencia, notas e informes de progreso, todo transparente para que el señor Reed lo vea."
        }
      ],
      "words": [
        { "word": "save", "es": "salvar" },
        { "word": "defend", "es": "defender" },
        { "word": "transparent", "es": "transparente" }
      ]
    },
    {
      "id": "s2",
      "image": s2,
      "imageAlt": "Mr. Reed joins by video on the meeting room screen and admits he did not expect a visit.",
      "text": "You came in person. I did not expect that, I will admit it.",
      "es": "Vinieron en persona. No lo esperaba, lo admito.",
      "speaker": "reed",
      "cast": ["reed", "vale"],
      "lines": [
        {
          "speaker": "reed",
          "text": "You came in person. I did not expect that, I will admit it.",
          "es": "Vinieron en persona. No lo esperaba, lo admito."
        },
        {
          "speaker": "vale",
          "text": "A client who is leaving after eight months deserves more than a cold email, Mr. Reed.",
          "es": "Un cliente que se va después de ocho meses merece más que un correo frío, señor Reed."
        },
        {
          "speaker": "reed",
          "text": "You have one hour, Vale. Show me why my whole team should stay with your academy and not the cheaper one.",
          "es": "Tiene una hora, Vale. Muéstreme por qué todo mi equipo debería quedarse con su academia y no con la más barata."
        }
      ],
      "words": [
        { "word": "admit", "es": "admitir" },
        { "word": "deserves", "es": "merece" },
        { "word": "stay", "es": "quedarse" }
      ]
    },
    {
      "id": "s3",
      "image": s3,
      "imageAlt": "Camila presents the measurable commitments on her laptop to the San Miguel team.",
      "text": "First, our commitment: every class with a trained teacher, observed weekly, measured monthly.",
      "es": "Primero, nuestro compromiso: cada clase con un maestro capacitado, observado semanalmente, medido mensualmente.",
      "speaker": "vale",
      "cast": ["vale", "reed", "camila"],
      "lines": [
        {
          "speaker": "vale",
          "text": "First, our commitment: every class with a trained teacher, observed weekly, measured monthly.",
          "es": "Primero, nuestro compromiso: cada clase con un maestro capacitado, observado semanalmente, medido mensualmente."
        },
        {
          "speaker": "reed",
          "text": "Measured how, exactly? I need something measurable, not another beautiful promise on paper.",
          "es": "¿Medido cómo, exactamente? Necesito algo medible, no otra promesa bonita en papel."
        },
        {
          "speaker": "camila",
          "text": "Every student gets a progress report. Attendance and scores, updated every Friday.",
          "es": "Cada estudiante recibe un informe de progreso. Asistencia y notas, actualizadas cada viernes."
        }
      ],
      "words": [
        { "word": "commitment", "es": "compromiso" },
        { "word": "measurable", "es": "medible" },
        { "word": "progress report", "es": "informe de progreso" }
      ]
    },
    {
      "id": "s4",
      "image": s4,
      "imageAlt": "Vale answers the guarantee question carefully while Reed tests her honesty.",
      "text": "I cannot guarantee speed, Mr. Reed. I guarantee standards: nobody teaches untrained again.",
      "es": "No puedo garantizar velocidad, señor Reed. Garantizo estándares: nadie vuelve a enseñar sin capacitación.",
      "speaker": "vale",
      "cast": ["reed", "vale"],
      "lines": [
        {
          "speaker": "reed",
          "text": "Your competitor guarantees fluency results in ninety days, in writing. Can you guarantee me the same?",
          "es": "Su competidor garantiza resultados de fluidez en noventa días, por escrito. ¿Puede usted garantizarme lo mismo?"
        },
        {
          "speaker": "vale",
          "text": "I cannot guarantee speed, Mr. Reed. I guarantee standards: nobody teaches untrained again.",
          "es": "No puedo garantizar velocidad, señor Reed. Garantizo estándares: nadie vuelve a enseñar sin capacitación."
        },
        {
          "speaker": "reed",
          "text": "That is a careful answer. Slower, but more credible than your competitor's slogan.",
          "es": "Es una respuesta cuidadosa. Más lenta, pero más creíble que el lema de su competidor."
        }
      ],
      "words": [
        { "word": "guarantee", "es": "garantizar" },
        { "word": "standards", "es": "estándares" },
        { "word": "credible", "es": "creíble" }
      ]
    },
    {
      "id": "s5",
      "image": s5,
      "imageAlt": "Vale stands up and asks permission to teach the room for twenty minutes.",
      "text": "Now, with your permission, I would like to teach your team for twenty minutes.",
      "es": "Ahora, con su permiso, me gustaría enseñarle a su equipo durante veinte minutos.",
      "speaker": "vale",
      "cast": ["vale", "reed"],
      "lines": [
        {
          "speaker": "vale",
          "text": "Now, with your permission, I would like to teach your team for twenty minutes.",
          "es": "Ahora, con su permiso, me gustaría enseñarle a su equipo durante veinte minutos."
        },
        {
          "speaker": "reed",
          "text": "Teach them? Here, right now? Vale, these are busy working adults, not children.",
          "es": "¿Enseñarles? ¿Aquí, ahora mismo? Vale, estos son adultos ocupados que trabajan, no niños."
        },
        {
          "speaker": "vale",
          "text": "Twenty minutes, and they will speak more English than in their last month of classes.",
          "es": "Veinte minutos, y hablarán más inglés que en su último mes de clases."
        }
      ],
      "words": [
        { "word": "permission", "es": "permiso" },
        { "word": "busy", "es": "ocupados" },
        { "word": "speak", "es": "hablar" }
      ]
    },
    {
      "id": "s6",
      "image": s6,
      "imageAlt": "The team talks quietly after the demo class while the employees leave smiling.",
      "text": "They laughed, they moved, they spoke. Did you see the manager taking notes?",
      "es": "Rieron, se movieron, hablaron. ¿Viste al gerente tomando notas?",
      "speaker": "dani",
      "cast": ["dani", "vale", "camila"],
      "lines": [
        {
          "speaker": "dani",
          "text": "They laughed, they moved, they spoke. Did you see the manager taking notes?",
          "es": "Rieron, se movieron, hablaron. ¿Viste al gerente tomando notas?"
        },
        {
          "speaker": "vale",
          "text": "I saw something better: the quiet lady in the back answered three full questions in English.",
          "es": "Vi algo mejor: la señora callada del fondo respondió tres preguntas completas en inglés."
        },
        {
          "speaker": "camila",
          "text": "Her name is on the survey as the most unhappy. Today she asked me how to continue.",
          "es": "Su nombre aparece en la encuesta como la más insatisfecha. Hoy me preguntó cómo continuar."
        }
      ],
      "words": [
        { "word": "notes", "es": "notas" },
        { "word": "quiet", "es": "callada" },
        { "word": "continue", "es": "continuar" }
      ]
    },
    {
      "id": "s7",
      "image": s7,
      "imageAlt": "Mr. Reed admits the method has credibility again after watching the whole class.",
      "text": "I watched the whole class from Houston. Your method has credibility again.",
      "es": "Vi toda la clase desde Houston. Su método tiene credibilidad de nuevo.",
      "speaker": "reed",
      "cast": ["reed", "vale"],
      "lines": [
        {
          "speaker": "reed",
          "text": "I watched the whole class from Houston. Your method has credibility again.",
          "es": "Vi toda la clase desde Houston. Su método tiene credibilidad de nuevo."
        },
        {
          "speaker": "vale",
          "text": "Then let us make up for the bad months: one pilot month free, then you decide with real data.",
          "es": "Entonces déjenos compensar los meses malos: un mes piloto gratis, y luego usted decide con datos reales."
        },
        {
          "speaker": "reed",
          "text": "And if the pilot fails, you leave without argument. Do we understand each other?",
          "es": "Y si el piloto falla, se van sin discutir. ¿Nos entendemos?"
        }
      ],
      "words": [
        { "word": "credibility", "es": "credibilidad" },
        { "word": "make up for", "es": "compensar" },
        { "word": "argument", "es": "discusión" }
      ]
    },
    {
      "id": "s8",
      "image": s8,
      "imageAlt": "Mr. Reed asks for the recovery plan in writing before ending the meeting.",
      "text": "One condition. I want the recovery plan in writing, with real dates and real names.",
      "es": "Una condición. Quiero el plan de recuperación por escrito, con fechas reales y nombres reales.",
      "speaker": "reed",
      "cast": ["reed", "vale"],
      "lines": [
        {
          "speaker": "reed",
          "text": "One condition. I want the recovery plan in writing, with real dates and real names.",
          "es": "Una condición. Quiero el plan de recuperación por escrito, con fechas reales y nombres reales."
        },
        {
          "speaker": "vale",
          "text": "You will have it tonight, in writing: teachers, dates, goals and the dashboard access included.",
          "es": "Lo tendrá esta noche, por escrito: maestros, fechas, metas y el acceso al panel incluido."
        },
        {
          "speaker": "reed",
          "text": "Reliable words, at last. Then we are done here, Vale. You won back your thirty days.",
          "es": "Palabras confiables, por fin. Entonces terminamos aquí, Vale. Se ganó de vuelta sus treinta días."
        }
      ],
      "words": [
        { "word": "condition", "es": "condición" },
        { "word": "in writing", "es": "por escrito" },
        { "word": "reliable", "es": "confiable" }
      ]
    },
    {
      "id": "s9",
      "image": s9,
      "imageAlt": "Dani holds back a celebration shout while Camila and Vale celebrate with him in the hallway.",
      "text": "We did not just keep him. The change is permanent: we raised our standard forever.",
      "es": "No solo lo conservamos. El cambio es permanente: elevamos nuestro estándar para siempre.",
      "speaker": "camila",
      "cast": ["dani", "camila", "vale"],
      "lines": [
        {
          "speaker": "dani",
          "text": "We kept the client! I want to shout it out loud, but the receptionist is looking right at me.",
          "es": "¡Conservamos al cliente! Quiero gritarlo en voz alta, pero la recepcionista me está viendo."
        },
        {
          "speaker": "camila",
          "text": "We did not just keep him. The change is permanent: we raised our standard forever.",
          "es": "No solo lo conservamos. El cambio es permanente: elevamos nuestro estándar para siempre."
        },
        {
          "speaker": "vale",
          "text": "That is the real win. A failure that makes you better is tuition, not a loss.",
          "es": "Esa es la verdadera victoria. Un fracaso que te mejora es una lección pagada, no una pérdida."
        }
      ],
      "words": [
        { "word": "shout", "es": "gritar" },
        { "word": "permanent", "es": "permanente" },
        { "word": "loss", "es": "pérdida" }
      ]
    },
    {
      "id": "s10",
      "image": s10,
      "imageAlt": "The team drives back at sunset and Dani recognizes Vale's extra effort.",
      "text": "You went the extra mile today, Vale. Three hours driving, one free month, zero fear.",
      "es": "Hoy diste la milla extra, Vale. Tres horas manejando, un mes gratis, cero miedo.",
      "speaker": "dani",
      "cast": ["dani", "vale", "camila"],
      "lines": [
        {
          "speaker": "dani",
          "text": "You went the extra mile today, Vale. Three hours driving, one free month, zero fear.",
          "es": "Hoy diste la milla extra, Vale. Tres horas manejando, un mes gratis, cero miedo."
        },
        {
          "speaker": "vale",
          "text": "The extra mile is the only road that is never full of traffic, Dani.",
          "es": "La milla extra es el único camino que nunca está lleno de tráfico, Dani."
        },
        {
          "speaker": "camila",
          "text": "Poetry later. Tonight we write the whole plan, because Mr. Reed reads absolutely everything.",
          "es": "Poesía después. Esta noche escribimos el plan completo, porque el señor Reed lee absolutamente todo."
        }
      ],
      "words": [
        { "word": "extra mile", "es": "esfuerzo adicional" },
        { "word": "traffic", "es": "tráfico" },
        { "word": "tonight", "es": "esta noche" }
      ]
    },
    {
      "id": "s11",
      "image": s11,
      "imageAlt": "Camila opens the map of three countries on her phone and shows the new problem.",
      "text": "She is right. Somebody has to organize this beautiful chaos before it organizes us.",
      "es": "Ella tiene razón. Alguien tiene que organizar este hermoso caos antes de que él nos organice a nosotros.",
      "speaker": "dani",
      "cast": ["vale", "camila", "dani"],
      "lines": [
        {
          "speaker": "vale",
          "text": "One client saved, one teacher in training, one new partner in Mexico. What is next for us?",
          "es": "Un cliente salvado, un maestro en capacitación, una nueva socia en México. ¿Qué sigue para nosotros?"
        },
        {
          "speaker": "camila",
          "text": "Next? Vale, we now operate in three countries with a team made for one city.",
          "es": "¿Qué sigue? Vale, ahora operamos en tres países con un equipo hecho para una ciudad."
        },
        {
          "speaker": "dani",
          "text": "She is right. Somebody has to organize this beautiful chaos before it organizes us.",
          "es": "Ella tiene razón. Alguien tiene que organizar este hermoso caos antes de que él nos organice a nosotros."
        }
      ],
      "words": [
        { "word": "operate", "es": "operar" },
        { "word": "chaos", "es": "caos" },
        { "word": "organize", "es": "organizar" }
      ]
    }
  ],
  "quizzes": [
    {
      "id": "q1",
      "afterScene": "s3",
      "questionEn": "What measurable commitment does Vale's team offer?",
      "questionEs": "¿Qué compromiso medible ofrece el equipo de Vale?",
      "options": [
        {
          "label": "Trained teachers and progress reports updated every Friday.",
          "emoji": "📊"
        },
        {
          "label": "Free coffee in every class.",
          "emoji": "☕"
        },
        {
          "label": "Longer classes with no measurement.",
          "emoji": "⏰"
        }
      ],
      "answer": 0,
      "sayIt": "I would promise trained teachers and weekly reports.",
      "sayItEs": "Ejemplo: «I would promise trained teachers and weekly reports.»",
      "sayItAskEn": "What would you promise a client who is leaving?",
      "sayItAskEs": "¿Qué le prometerías a un cliente que se va?",
      "sayItCheck": {
        "target": "I would promise *",
        "altTargets": [
          "I would promise * and *",
          "I would offer *"
        ]
      }
    },
    {
      "id": "q2",
      "afterScene": "s7",
      "questionEn": "Why does Vale offer a free pilot month?",
      "questionEs": "¿Por qué ofrece Vale un mes piloto gratis?",
      "options": [
        {
          "label": "To prove the method works and let Mr. Reed decide with data.",
          "emoji": "🧪"
        },
        {
          "label": "Because she does not need money.",
          "emoji": "🤑"
        },
        {
          "label": "Because the competitor asked her to.",
          "emoji": "🤷"
        }
      ],
      "answer": 0,
      "sayIt": "Yes, because she proved the quality with a real class.",
      "sayItEs": "Ejemplo: «Yes, because she proved the quality with a real class.»",
      "sayItAskEn": "Would you trust Vale after watching her class? Why?",
      "sayItAskEs": "¿Confiarías en Vale después de ver su clase? ¿Por qué?",
      "sayItCheck": {
        "target": "Yes, because *",
        "altTargets": [
          "I would trust her because *",
          "No, because *"
        ]
      }
    },
    {
      "id": "q3",
      "afterScene": "s11",
      "questionEn": "What is the next challenge the team names?",
      "questionEs": "¿Cuál es el siguiente reto que nombra el equipo?",
      "options": [
        {
          "label": "Organizing a team that now operates in three countries.",
          "emoji": "🗺️"
        },
        {
          "label": "Buying a bigger car.",
          "emoji": "🚙"
        },
        {
          "label": "Learning a third language.",
          "emoji": "🈶"
        }
      ],
      "answer": 0,
      "sayIt": "Vale went to San Miguel, taught a real class, and won back the client.",
      "sayItEs": "Ejemplo: «Vale went to San Miguel, taught a real class, and won back the client.»",
      "sayItAskEn": "Summarize how Vale won the client back.",
      "sayItAskEs": "Resume cómo recuperó Vale al cliente.",
      "sayItCheck": {
        "target": "Vale went to *, taught *, and *",
        "altTargets": [
          "She listened, showed *, and *",
          "Vale won back *"
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
    "modelActionEs": "Vale prepara pruebas medibles en vez de promesas vacías."
  },
  "expressions": [
    {
      "phrase": "win back",
      "variants": ["won back"],
      "es": "recuperar / reconquistar",
      "kind": "phrasal",
      "example": "Reliable words, at last. Then we are done here, Vale. You won back your thirty days.",
      "exampleEs": "Palabras confiables, por fin. Entonces terminamos aquí, Vale. Se ganó de vuelta sus treinta días."
    },
    {
      "phrase": "make up for",
      "es": "compensar",
      "kind": "phrasal",
      "example": "Then let us make up for the bad months: pilot month free, then you decide with data.",
      "exampleEs": "Entonces déjenos compensar los meses malos: mes piloto gratis, y luego usted decide con datos."
    },
    {
      "phrase": "go the extra mile",
      "variants": ["went the extra mile"],
      "es": "dar la milla extra / esforzarse más allá de lo pedido",
      "kind": "idiom",
      "example": "You went the extra mile today, Vale. Three hours driving, one free month, zero fear.",
      "exampleEs": "Hoy diste la milla extra, Vale. Tres horas manejando, un mes gratis, cero miedo."
    }
  ],
  "finaleSeconds": 45,
  "continuePrompt": {
    "en": "Your turn, 45 seconds: tell the story of a mistake you corrected. What went wrong, what did you do, and what was the result?",
    "es": "Tu turno, 45 segundos: cuenta la historia de un error que corregiste. ¿Qué salió mal, qué hiciste y cuál fue el resultado?"
  },
  "continueWith": [
    "Once, something went wrong when ...",
    "To make up for it, I ...",
    "In the end, the result was ..."
  ],
  "cliffhanger": {
    "en": "She is right. Somebody has to organize this beautiful chaos before it organizes us.",
    "es": "Ella tiene razón. Alguien tiene que organizar este hermoso caos antes de que él nos organice a nosotros."
  }
};
