import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/sharks-ep4-three-offices-one-team/cover.jpg";
import s1 from "@/assets/storybook/sharks-ep4-three-offices-one-team/s1.jpg";
import s2 from "@/assets/storybook/sharks-ep4-three-offices-one-team/s2.jpg";
import s3 from "@/assets/storybook/sharks-ep4-three-offices-one-team/s3.jpg";
import s4 from "@/assets/storybook/sharks-ep4-three-offices-one-team/s4.jpg";
import s5 from "@/assets/storybook/sharks-ep4-three-offices-one-team/s5.jpg";
import s6 from "@/assets/storybook/sharks-ep4-three-offices-one-team/s6.jpg";
import s7 from "@/assets/storybook/sharks-ep4-three-offices-one-team/s7.jpg";
import s8 from "@/assets/storybook/sharks-ep4-three-offices-one-team/s8.jpg";
import s9 from "@/assets/storybook/sharks-ep4-three-offices-one-team/s9.jpg";
import s10 from "@/assets/storybook/sharks-ep4-three-offices-one-team/s10.jpg";
import s11 from "@/assets/storybook/sharks-ep4-three-offices-one-team/s11.jpg";

export const SHARKS_EP4_THREE_OFFICES_ONE_TEAM: StorybookEpisode = {
  "id": "sharks-ep4-three-offices-one-team",
  "moduleId": "sharks",
  "week": 1,
  "title": "Three offices, one team",
  "titleEs": "Tres oficinas, un equipo",
  "episodeLabel": {
    "en": "Season 8 · Episode 4",
    "es": "Temporada 8 · Episodio 4"
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
    "en": "Three offices have three emergencies. First things first: which problem stops the launch? Accounts are ready. But Houston just sent a counteroffer.",
    "es": "Tres oficinas tienen tres emergencias. Primero lo primero: ¿qué problema detiene el lanzamiento? Las cuentas están listas. Pero Houston acaba de enviar una contraoferta."
  },
  "cover": cover,
  "voice": "girl",
  "scenes": [
    {
      "id": "s1",
      "image": s1,
      "imageAlt": "Vale and Dani stand at the office whiteboard listing three emergencies from three offices.",
      "text": "Three offices have three emergencies. First things first: which problem stops the launch?",
      "es": "Tres oficinas tienen tres emergencias. Primero lo primero: ¿qué problema detiene el lanzamiento?",
      "speaker": "vale",
      "cast": [
        "vale",
        "dani"
      ],
      "lines": [
        {
          "speaker": "dani",
          "text": "Vale, it is seven in the morning and three offices already called me with different emergencies. Nothing like this happened when we worked in one country.",
          "es": "Vale, son las siete de la mañana y tres oficinas ya me llamaron con emergencias diferentes. Nada así pasaba cuando trabajábamos en un solo país."
        },
        {
          "speaker": "vale",
          "text": "Three offices have three emergencies. First things first: which problem stops the launch?",
          "es": "Tres oficinas tienen tres emergencias. Primero lo primero: ¿qué problema detiene el lanzamiento?"
        },
        {
          "speaker": "dani",
          "text": "Guatemala, San Salvador, and Houston. Honestly, I do not know which one you should hear first.",
          "es": "Guatemala, San Salvador y Houston. Honestamente, no sé cuál deberías escuchar primero."
        }
      ],
      "words": [
        { "word": "emergencies", "es": "emergencias" },
        { "word": "launch", "es": "lanzamiento" },
        { "word": "problem", "es": "problema" }
      ]
    },
    {
      "id": "s2",
      "image": s2,
      "imageAlt": "Dani shows Camila the crashed Guatemala platform on his laptop while she checks the clock.",
      "text": "The platform is down in Guatemala, but I can sort it out in an hour.",
      "es": "La plataforma está caída en Guatemala, pero puedo resolverlo en una hora.",
      "speaker": "dani",
      "cast": [
        "dani",
        "camila"
      ],
      "lines": [
        {
          "speaker": "camila",
          "text": "Start with Guatemala, Dani. Twenty students are waiting and nobody can open the lesson.",
          "es": "Empieza con Guatemala, Dani. Veinte estudiantes están esperando y nadie puede abrir la lección."
        },
        {
          "speaker": "dani",
          "text": "The platform is down in Guatemala, but I can sort it out in an hour.",
          "es": "La plataforma está caída en Guatemala, pero puedo resolverlo en una hora."
        },
        {
          "speaker": "camila",
          "text": "One hour is acceptable if the teacher keeps the group speaking while you repair the connection.",
          "es": "Una hora es aceptable si la maestra mantiene al grupo hablando mientras reparas la conexión."
        }
      ],
      "words": [
        { "word": "platform", "es": "plataforma" },
        { "word": "students", "es": "estudiantes" },
        { "word": "connection", "es": "conexión" }
      ]
    },
    {
      "id": "s3",
      "image": s3,
      "imageAlt": "Camila explains the incomplete teacher schedule while Mr. Reed listens from Houston on the video screen.",
      "text": "The teacher schedule is incomplete. Without teachers, there is no class.",
      "es": "El horario de maestros está incompleto. Sin maestros, no hay clase.",
      "speaker": "camila",
      "cast": [
        "camila",
        "reed"
      ],
      "lines": [
        {
          "speaker": "camila",
          "text": "The teacher schedule is incomplete. Without teachers, there is no class.",
          "es": "El horario de maestros está incompleto. Sin maestros, no hay clase."
        },
        {
          "speaker": "reed",
          "text": "Good morning from Houston. I hear a problem in your voice, so please describe it precisely.",
          "es": "Buenos días desde Houston. Escucho un problema en su voz, así que descríbalo con precisión."
        },
        {
          "speaker": "camila",
          "text": "Two afternoon groups in San Salvador have no assigned teacher, and classes begin in five hours. If we cancel, those families will ask for their money back.",
          "es": "Dos grupos de la tarde en San Salvador no tienen maestro asignado, y las clases empiezan en cinco horas. Si cancelamos, esas familias pedirán su dinero de vuelta."
        }
      ],
      "words": [
        { "word": "schedule", "es": "horario" },
        { "word": "incomplete", "es": "incompleto" },
        { "word": "assigned", "es": "asignado" }
      ]
    },
    {
      "id": "s4",
      "image": s4,
      "imageAlt": "Mr. Reed insists on the five o'clock deadline from Houston while Vale takes notes.",
      "text": "Houston needs every account ready by five. That is the client priority.",
      "es": "Houston necesita cada cuenta lista a las cinco. Esa es la prioridad del cliente.",
      "speaker": "reed",
      "cast": [
        "reed",
        "vale"
      ],
      "lines": [
        {
          "speaker": "vale",
          "text": "Mr. Reed, we have two internal problems today. May I explain how we plan to solve them?",
          "es": "Señor Reed, hoy tenemos dos problemas internos. ¿Puedo explicarle cómo planeamos resolverlos?"
        },
        {
          "speaker": "reed",
          "text": "Houston needs every account ready by five. That is the client priority.",
          "es": "Houston necesita cada cuenta lista a las cinco. Esa es la prioridad del cliente."
        },
        {
          "speaker": "vale",
          "text": "Understood. Then the accounts stay first, and I will tell you at noon where we stand.",
          "es": "Entendido. Entonces las cuentas van primero, y a mediodía le diré cómo vamos."
        }
      ],
      "words": [
        { "word": "account", "es": "cuenta" },
        { "word": "priority", "es": "prioridad" },
        { "word": "internal", "es": "interno" }
      ]
    },
    {
      "id": "s5",
      "image": s5,
      "imageAlt": "Vale separates urgent and important tasks on the board while Dani writes the plan.",
      "text": "We need to separate urgent from important. Camila, take the schedule.",
      "es": "Necesitamos separar lo urgente de lo importante. Camila, toma el horario.",
      "speaker": "vale",
      "cast": [
        "vale",
        "dani"
      ],
      "lines": [
        {
          "speaker": "dani",
          "text": "Everything feels urgent right now, Vale. How do you decide what the team touches first?",
          "es": "Todo se siente urgente ahora, Vale. ¿Cómo decides qué toca el equipo primero?"
        },
        {
          "speaker": "vale",
          "text": "We need to separate urgent from important. Camila, take the schedule.",
          "es": "Necesitamos separar lo urgente de lo importante. Camila, toma el horario."
        },
        {
          "speaker": "dani",
          "text": "That makes sense. A class we cannot teach today can never be repeated tomorrow, and that is exactly what happened to us last November.",
          "es": "Tiene sentido. Una clase que no podemos dar hoy nunca se puede repetir mañana, y eso es exactamente lo que nos pasó en noviembre."
        }
      ],
      "words": [
        { "word": "urgent", "es": "urgente" },
        { "word": "important", "es": "importante" },
        { "word": "decide", "es": "decidir" }
      ]
    },
    {
      "id": "s6",
      "image": s6,
      "imageAlt": "Dani promises to set up the missing accounts while Camila prepares the name list.",
      "text": "I will set up the missing accounts after I restore the platform.",
      "es": "Configuraré las cuentas faltantes después de restaurar la plataforma.",
      "speaker": "dani",
      "cast": [
        "dani",
        "camila"
      ],
      "lines": [
        {
          "speaker": "camila",
          "text": "Dani, the Houston accounts also need someone. Can you handle both tasks before five o'clock?",
          "es": "Dani, las cuentas de Houston también necesitan a alguien. ¿Puedes con ambas tareas antes de las cinco?"
        },
        {
          "speaker": "dani",
          "text": "I will set up the missing accounts after I restore the platform.",
          "es": "Configuraré las cuentas faltantes después de restaurar la plataforma."
        },
        {
          "speaker": "camila",
          "text": "Perfect. Send me the list when you finish, and I will check every name twice.",
          "es": "Perfecto. Mándame la lista cuando termines, y revisaré cada nombre dos veces."
        }
      ],
      "words": [
        { "word": "missing", "es": "faltante" },
        { "word": "restore", "es": "restaurar" },
        { "word": "list", "es": "lista" }
      ]
    },
    {
      "id": "s7",
      "image": s7,
      "imageAlt": "Camila reports the solved teacher conflict while Mr. Reed follows from the call screen.",
      "text": "I sorted out the teacher conflict. One person was listed in two cities.",
      "es": "Resolví el conflicto de maestros. Una persona aparecía en dos ciudades.",
      "speaker": "camila",
      "cast": [
        "camila",
        "reed"
      ],
      "lines": [
        {
          "speaker": "camila",
          "text": "I sorted out the teacher conflict. One person was listed in two cities.",
          "es": "Resolví el conflicto de maestros. Una persona aparecía en dos ciudades."
        },
        {
          "speaker": "reed",
          "text": "So one teacher was scheduled in two countries at the same hour. How did that happen?",
          "es": "¿Entonces una maestra estaba programada en dos países a la misma hora? ¿Cómo pasó eso?"
        },
        {
          "speaker": "camila",
          "text": "We copied last month's schedule without checking it. Now the system blocks any double booking.",
          "es": "Copiamos el horario del mes pasado sin revisarlo. Ahora el sistema bloquea cualquier doble reservación."
        }
      ],
      "words": [
        { "word": "conflict", "es": "conflicto" },
        { "word": "listed", "es": "registrado" },
        { "word": "double", "es": "doble" }
      ]
    },
    {
      "id": "s8",
      "image": s8,
      "imageAlt": "Vale speaks to the team alone in the office about solving one blocking problem at a time.",
      "text": "Good. Do not solve everything at once; solve what blocks the next step.",
      "es": "Bien. No resuelvan todo a la vez; resuelvan lo que bloquea el siguiente paso.",
      "speaker": "vale",
      "cast": [
        "vale"
      ],
      "lines": [
        {
          "speaker": "vale",
          "text": "Team, listen for a second. Today taught us something more valuable than a repaired platform.",
          "es": "Equipo, escuchen un segundo. Hoy nos enseñó algo más valioso que una plataforma reparada."
        },
        {
          "speaker": "vale",
          "text": "Good. Do not solve everything at once; solve what blocks the next step.",
          "es": "Bien. No resuelvan todo a la vez; resuelvan lo que bloquea el siguiente paso."
        },
        {
          "speaker": "vale",
          "text": "When we work that way, three offices behave like one team instead of three separate companies.",
          "es": "Cuando trabajamos así, tres oficinas se comportan como un equipo y no como tres empresas separadas."
        }
      ],
      "words": [
        { "word": "solve", "es": "resolver" },
        { "word": "blocks", "es": "bloquea" },
        { "word": "team", "es": "equipo" }
      ]
    },
    {
      "id": "s9",
      "image": s9,
      "imageAlt": "Mr. Reed asks Dani what support he needs, with Dani answering beside the test computer.",
      "text": "Your update is clear. What do you need from me?",
      "es": "Su actualización está clara. ¿Qué necesita de mí?",
      "speaker": "reed",
      "cast": [
        "reed",
        "dani"
      ],
      "lines": [
        {
          "speaker": "dani",
          "text": "Mr. Reed, the platform is running, the accounts are open, and testing starts in ten minutes.",
          "es": "Señor Reed, la plataforma funciona, las cuentas están abiertas y las pruebas empiezan en diez minutos."
        },
        {
          "speaker": "reed",
          "text": "Your update is clear. What do you need from me?",
          "es": "Su actualización está clara. ¿Qué necesita de mí?"
        },
        {
          "speaker": "dani",
          "text": "Two things: a direct contact in Houston and permission to test with real student data. Without that access, the test proves almost nothing.",
          "es": "Dos cosas: un contacto directo en Houston y permiso para probar con datos reales de estudiantes. Sin ese acceso, la prueba no demuestra casi nada."
        }
      ],
      "words": [
        { "word": "update", "es": "actualización" },
        { "word": "testing", "es": "pruebas" },
        { "word": "permission", "es": "permiso" }
      ]
    },
    {
      "id": "s10",
      "image": s10,
      "imageAlt": "Vale and Camila write their two requests for Houston on the whiteboard.",
      "text": "One contact in each office and thirty minutes for testing.",
      "es": "Un contacto en cada oficina y treinta minutos para las pruebas.",
      "speaker": "vale",
      "cast": [
        "vale",
        "camila"
      ],
      "lines": [
        {
          "speaker": "camila",
          "text": "Vale, tell him exactly what we need. A vague request always comes back as a slow answer.",
          "es": "Vale, dile exactamente qué necesitamos. Una solicitud vaga siempre regresa como una respuesta lenta."
        },
        {
          "speaker": "vale",
          "text": "One contact in each office and thirty minutes for testing.",
          "es": "Un contacto en cada oficina y treinta minutos para las pruebas."
        },
        {
          "speaker": "camila",
          "text": "That is clear enough for anyone to approve, and it costs Northline almost nothing today.",
          "es": "Eso es bastante claro para que cualquiera lo apruebe, y hoy no le cuesta casi nada a Northline."
        }
      ],
      "words": [
        { "word": "contact", "es": "contacto" },
        { "word": "vague", "es": "vago / impreciso" },
        { "word": "approve", "es": "aprobar" }
      ]
    },
    {
      "id": "s11",
      "image": s11,
      "imageAlt": "Dani reads Houston's counteroffer on screen while Mr. Reed watches the testing finish.",
      "text": "Accounts are ready. But Houston just sent a counteroffer.",
      "es": "Las cuentas están listas. Pero Houston acaba de enviar una contraoferta.",
      "speaker": "dani",
      "cast": [
        "dani",
        "reed"
      ],
      "lines": [
        {
          "speaker": "reed",
          "text": "You have thirty minutes for testing, and I will stay on the line until it finishes. I also expect a written summary immediately afterwards.",
          "es": "Tienen treinta minutos para las pruebas, y me quedaré en la línea hasta que terminen. También espero un resumen escrito inmediatamente después."
        },
        {
          "speaker": "dani",
          "text": "Accounts are ready. But Houston just sent a counteroffer.",
          "es": "Las cuentas están listas. Pero Houston acaba de enviar una contraoferta."
        },
        {
          "speaker": "reed",
          "text": "Read it carefully tonight. My finance team changed the price and moved the launch date.",
          "es": "Léanla con cuidado esta noche. Mi equipo de finanzas cambió el precio y movió la fecha de lanzamiento."
        }
      ],
      "words": [
        { "word": "ready", "es": "listo" },
        { "word": "counteroffer", "es": "contraoferta" },
        { "word": "finance", "es": "finanzas" }
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
          "label": "The teacher schedule is incomplete. Without teachers, there is no class.",
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
          "label": "I sorted out the teacher conflict. One person was listed in two cities.",
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
          "label": "Accounts are ready. But Houston just sent a counteroffer.",
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
      "sayIt": "Accounts are ready. But Houston just sent a counteroffer.",
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
      "phrase": "sort out",
      "variants": [
        "sorted out"
      ],
      "es": "resolver / poner en orden",
      "kind": "phrasal",
      "example": "I sorted out the teacher conflict. One person was listed in two cities.",
      "exampleEs": "Resolví el conflicto de maestros. Una persona aparecía en dos ciudades."
    },
    {
      "phrase": "set up",
      "es": "configurar / establecer",
      "kind": "phrasal",
      "example": "I will set up the missing accounts after I restore the platform.",
      "exampleEs": "Configuraré las cuentas faltantes después de restaurar la plataforma."
    },
    {
      "phrase": "first things first",
      "es": "primero lo primero",
      "kind": "idiom",
      "example": "Three offices have three emergencies. First things first: which problem stops the launch?",
      "exampleEs": "Tres oficinas tienen tres emergencias. Primero lo primero: ¿qué problema detiene el lanzamiento?"
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
    "en": "Accounts are ready. But Houston just sent a counteroffer.",
    "es": "Las cuentas están listas. Pero Houston acaba de enviar una contraoferta."
  }
};
