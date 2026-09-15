import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/sharks-ep8-vale-kids/cover.jpg";
import s1 from "@/assets/storybook/sharks-ep8-vale-kids/s1.jpg";
import s2 from "@/assets/storybook/sharks-ep8-vale-kids/s2.jpg";
import s3 from "@/assets/storybook/sharks-ep8-vale-kids/s3.jpg";
import s4 from "@/assets/storybook/sharks-ep8-vale-kids/s4.jpg";
import s5 from "@/assets/storybook/sharks-ep8-vale-kids/s5.jpg";
import s6 from "@/assets/storybook/sharks-ep8-vale-kids/s6.jpg";
import s7 from "@/assets/storybook/sharks-ep8-vale-kids/s7.jpg";
import s8 from "@/assets/storybook/sharks-ep8-vale-kids/s8.jpg";
import s9 from "@/assets/storybook/sharks-ep8-vale-kids/s9.jpg";
import s10 from "@/assets/storybook/sharks-ep8-vale-kids/s10.jpg";
import s11 from "@/assets/storybook/sharks-ep8-vale-kids/s11.jpg";

export const SHARKS_EP8_VALE_KIDS: StorybookEpisode = {
  "id": "sharks-ep8-vale-kids",
  "moduleId": "sharks",
  "week": 2,
  "title": "Vale Kids",
  "titleEs": "Vale Kids",
  "episodeLabel": {
    "en": "Season 8 · Episode 8",
    "es": "Temporada 8 · Episodio 8"
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
    "en": "We have been talking about work for twenty minutes. How have you been, really? And Mexico just asked for a call about bringing the idea there.",
    "es": "Llevamos veinte minutos hablando de trabajo. ¿Cómo has estado, de verdad? Y México acaba de pedir una llamada para llevar la idea allá."
  },
  "cover": cover,
  "voice": "girl",
  "scenes": [
    {
      "id": "s1",
      "image": s1,
      "imageAlt": "Dani asks Vale how she really is during a calm Saturday at the community center.",
      "text": "We have been talking about work for twenty minutes. How have you been, really?",
      "es": "Llevamos veinte minutos hablando de trabajo. ¿Cómo has estado, de verdad?",
      "speaker": "dani",
      "cast": [
        "dani"
      ],
      "lines": [
        {
          "speaker": "dani",
          "text": "It is Saturday, and the community center feels calm for the first time in weeks. The adults are inside, and nobody needs anything from us.",
          "es": "Es sábado, y el centro comunitario se siente tranquilo por primera vez en semanas. Los adultos están adentro, y nadie necesita nada de nosotros."
        },
        {
          "speaker": "dani",
          "text": "We have been talking about work for twenty minutes. How have you been, really?",
          "es": "Llevamos veinte minutos hablando de trabajo. ¿Cómo has estado, de verdad?"
        },
        {
          "speaker": "dani",
          "text": "And please do not answer with a project update. I asked about you, not about Northline.",
          "es": "Y por favor no respondas con una actualización de proyecto. Pregunté por ti, no por Northline."
        }
      ],
      "words": [
        { "word": "talking", "es": "hablando" },
        { "word": "calm", "es": "tranquilo" },
        { "word": "update", "es": "actualización" }
      ]
    },
    {
      "id": "s2",
      "image": s2,
      "imageAlt": "Don Tito sits down on the bench beside Vale while she answers Dani's question.",
      "text": "Honestly, Dani? I have been traveling, solving problems, and sleeping next to my laptop.",
      "es": "¿Sinceramente, Dani? He estado viajando, resolviendo problemas y durmiendo junto a mi laptop.",
      "speaker": "vale",
      "cast": [
        "vale",
        "tito"
      ],
      "lines": [
        {
          "speaker": "vale",
          "text": "Honestly, Dani? I have been traveling, solving problems, and sleeping next to my laptop.",
          "es": "¿Sinceramente, Dani? He estado viajando, resolviendo problemas y durmiendo junto a mi laptop."
        },
        {
          "speaker": "tito",
          "text": "Good morning, you two. Don Tito sits down on the bench, and he heard that last part. That is how young people burn out, Vale. I have seen it many times in this neighborhood.",
          "es": "Buenos días a los dos. Don Tito se sienta en la banca, y escuchó esa última parte. Así es como se agota la gente joven, Vale. Lo he visto muchas veces en este barrio."
        },
        {
          "speaker": "vale",
          "text": "Good morning, Don Tito. You are right, and Dani has been telling me the same thing. Today I promised myself no calls until the afternoon.",
          "es": "Buenos días, Don Tito. Tiene razón, y Dani me ha estado diciendo lo mismo. Hoy me prometí no hacer llamadas hasta la tarde."
        }
      ],
      "words": [
        { "word": "traveling", "es": "viajando" },
        { "word": "laptop", "es": "computadora portátil" },
        { "word": "neighborhood", "es": "barrio" }
      ]
    },

    {
      "id": "s3",
      "image": s3,
      "imageAlt": "Dani tells Vale about the leadership program he is building at his company.",
      "text": "I have been working on a leadership program at my company.",
      "es": "He estado trabajando en un programa de liderazgo en mi empresa.",
      "speaker": "dani",
      "cast": [
        "dani",
        "vale"
      ],
      "lines": [
        {
          "speaker": "vale",
          "text": "And you, Dani? You look different lately, calmer and busier at the same time.",
          "es": "¿Y tú, Dani? Te ves diferente últimamente, más tranquilo y más ocupado a la vez."
        },
        {
          "speaker": "dani",
          "text": "I have been working on a leadership program at my company.",
          "es": "He estado trabajando en un programa de liderazgo en mi empresa."
        },
        {
          "speaker": "vale",
          "text": "Leadership suits you. Five years ago you could barely order a coffee in English.",
          "es": "El liderazgo te queda bien. Hace cinco años apenas podías pedir un café en inglés."
        }
      ],
      "words": [
        { "word": "leadership", "es": "liderazgo" },
        { "word": "lately", "es": "últimamente" },
        { "word": "barely", "es": "apenas" }
      ]
    },
    {
      "id": "s4",
      "image": s4,
      "imageAlt": "Vale notices the children waiting while their parents finish the adult class.",
      "text": "Look at those kids. They have been waiting while their parents finish class.",
      "es": "Mira a esos niños. Han estado esperando mientras sus padres terminan la clase.",
      "speaker": "vale",
      "cast": [
        "vale",
        "dani"
      ],
      "lines": [
        {
          "speaker": "dani",
          "text": "Something is happening behind you. Half of those children have been staring at us for minutes, and they are listening to every word we say in English.",
          "es": "Algo está pasando detrás de ti. La mitad de esos niños lleva minutos mirándonos, y están escuchando cada palabra que decimos en inglés."
        },
        {
          "speaker": "vale",
          "text": "Look at those kids. They have been waiting while their parents finish class.",
          "es": "Mira a esos niños. Han estado esperando mientras sus padres terminan la clase."
        },
        {
          "speaker": "dani",
          "text": "Waiting, and repeating everything they hear. Nobody told them to practice anything.",
          "es": "Esperando, y repitiendo todo lo que escuchan. Nadie les dijo que practicaran nada."
        }
      ],
      "words": [
        { "word": "kids", "es": "niños" },
        { "word": "parents", "es": "padres" },
        { "word": "repeating", "es": "repitiendo" }
      ]
    },
    {
      "id": "s5",
      "image": s5,
      "imageAlt": "Dani and Don Tito watch a boy repeating Vale's question outside the classroom.",
      "text": "That boy has been repeating your opening question for ten minutes.",
      "es": "Ese niño lleva diez minutos repitiendo tu pregunta inicial.",
      "speaker": "dani",
      "cast": [
        "dani",
        "tito"
      ],
      "lines": [
        {
          "speaker": "tito",
          "text": "The small one in the red shirt has not stopped since your class began this morning.",
          "es": "El pequeño de la camisa roja no ha parado desde que empezó su clase esta mañana."
        },
        {
          "speaker": "dani",
          "text": "That boy has been repeating your opening question for ten minutes.",
          "es": "Ese niño lleva diez minutos repitiendo tu pregunta inicial."
        },
        {
          "speaker": "tito",
          "text": "Children copy what they admire, and that boy admires the adults who speak English here.",
          "es": "Los niños copian lo que admiran, y ese niño admira a los adultos que hablan inglés aquí."
        }
      ],
      "words": [
        { "word": "boy", "es": "niño" },
        { "word": "shirt", "es": "camisa" },
        { "word": "admire", "es": "admirar" }
      ]
    },
    {
      "id": "s6",
      "image": s6,
      "imageAlt": "Vale stands alone thinking about teaching the waiting children.",
      "text": "Maybe we should catch up less and listen more. They want a class too.",
      "es": "Quizás deberíamos ponernos al día menos y escuchar más. Ellos también quieren una clase.",
      "speaker": "vale",
      "cast": [
        "vale"
      ],
      "lines": [
        {
          "speaker": "vale",
          "text": "I have spent three years designing courses for adults who already lost their fear, and every course assumed the student had already decided to study.",
          "es": "He pasado tres años diseñando cursos para adultos que ya perdieron el miedo, y cada curso asumía que el estudiante ya había decidido estudiar."
        },
        {
          "speaker": "vale",
          "text": "Maybe we should catch up less and listen more. They want a class too.",
          "es": "Quizás deberíamos ponernos al día menos y escuchar más. Ellos también quieren una clase."
        },
        {
          "speaker": "vale",
          "text": "Imagine reaching them at eight years old, before anybody tells them English is difficult.",
          "es": "Imagina alcanzarlos a los ocho años, antes de que alguien les diga que el inglés es difícil."
        }
      ],
      "words": [
        { "word": "listen", "es": "escuchar" },
        { "word": "adults", "es": "adultos" },
        { "word": "fear", "es": "miedo" }
      ]
    },
    {
      "id": "s7",
      "image": s7,
      "imageAlt": "Dani encourages Vale to create a proper program for kids.",
      "text": "You have been building adult courses. Why not work on a kids program?",
      "es": "Has estado creando cursos para adultos. ¿Por qué no trabajar en un programa para niños?",
      "speaker": "dani",
      "cast": [
        "dani"
      ],
      "lines": [
        {
          "speaker": "dani",
          "text": "Then do it properly, not as a favor on a free Saturday morning.",
          "es": "Entonces hazlo bien, no como un favor en una mañana libre de sábado."
        },
        {
          "speaker": "dani",
          "text": "You have been building adult courses. Why not work on a kids program?",
          "es": "Has estado creando cursos para adultos. ¿Por qué no trabajar en un programa para niños?"
        },
        {
          "speaker": "dani",
          "text": "You already have teachers, materials, and a method. The only missing piece is the decision.",
          "es": "Ya tienes maestros, materiales y un método. La única pieza que falta es la decisión."
        }
      ],
      "words": [
        { "word": "building", "es": "creando" },
        { "word": "courses", "es": "cursos" },
        { "word": "decision", "es": "decisión" }
      ]
    },
    {
      "id": "s8",
      "image": s8,
      "imageAlt": "Don Tito speaks about planting a seed for a whole generation.",
      "text": "A small Saturday class can plant the seed for a whole generation.",
      "es": "Una pequeña clase sabatina puede sembrar la semilla para toda una generación.",
      "speaker": "tito",
      "cast": [
        "tito"
      ],
      "lines": [
        {
          "speaker": "tito",
          "text": "I have watched this neighborhood for forty years, and I will tell you something important.",
          "es": "He observado este barrio durante cuarenta años, y les diré algo importante."
        },
        {
          "speaker": "tito",
          "text": "A small Saturday class can plant the seed for a whole generation.",
          "es": "Una pequeña clase sabatina puede sembrar la semilla para toda una generación."
        },
        {
          "speaker": "tito",
          "text": "Those parents inside the classroom are the proof, and their children are already watching them.",
          "es": "Esos padres dentro del aula son la prueba, y sus hijos ya los están observando."
        }
      ],
      "words": [
        { "word": "generation", "es": "generación" },
        { "word": "proof", "es": "prueba" },
        { "word": "watching", "es": "observando" }
      ]
    },
    {
      "id": "s9",
      "image": s9,
      "imageAlt": "Vale sketches the first Saturday kids class with stories and movement.",
      "text": "Then we start small: stories, movement, and speaking from day one.",
      "es": "Entonces empezamos pequeño: historias, movimiento y habla desde el primer día.",
      "speaker": "vale",
      "cast": [
        "vale"
      ],
      "lines": [
        {
          "speaker": "vale",
          "text": "Fine. One group, twelve children, Saturdays at nine, and absolutely no grammar exercises.",
          "es": "Está bien. Un grupo, doce niños, sábados a las nueve, y absolutamente nada de ejercicios de gramática."
        },
        {
          "speaker": "vale",
          "text": "Then we start small: stories, movement, and speaking from day one.",
          "es": "Entonces empezamos pequeño: historias, movimiento y habla desde el primer día."
        },
        {
          "speaker": "vale",
          "text": "If a child speaks one sentence and laughs, that class already did its job.",
          "es": "Si un niño dice una oración y se ríe, esa clase ya hizo su trabajo."
        }
      ],
      "words": [
        { "word": "movement", "es": "movimiento" },
        { "word": "grammar", "es": "gramática" },
        { "word": "sentence", "es": "oración" }
      ]
    },
    {
      "id": "s10",
      "image": s10,
      "imageAlt": "Dani watches the smiling parents as the first Vale Kids class takes shape.",
      "text": "The parents are smiling. I think Vale Kids has its first class.",
      "es": "Los padres están sonriendo. Creo que Vale Kids tiene su primera clase.",
      "speaker": "dani",
      "cast": [
        "dani"
      ],
      "lines": [
        {
          "speaker": "dani",
          "text": "I asked four mothers while you were talking, and all four said yes immediately.",
          "es": "Le pregunté a cuatro mamás mientras hablabas, y las cuatro dijeron que sí de inmediato."
        },
        {
          "speaker": "dani",
          "text": "The parents are smiling. I think Vale Kids has its first class.",
          "es": "Los padres están sonriendo. Creo que Vale Kids tiene su primera clase."
        },
        {
          "speaker": "dani",
          "text": "And they asked for a second group, because their neighbors will want the same thing. Saturday mornings could become the busiest hours of your week.",
          "es": "Y pidieron un segundo grupo, porque sus vecinos van a querer lo mismo. Las mañanas de sábado podrían volverse las horas más ocupadas de tu semana."
        }
      ],
      "words": [
        { "word": "smiling", "es": "sonriendo" },
        { "word": "mothers", "es": "mamás" },
        { "word": "neighbors", "es": "vecinos" }
      ]
    },
    {
      "id": "s11",
      "image": s11,
      "imageAlt": "Vale reads the message from Mexico while Don Tito comments on the children singing.",
      "text": "And Mexico just asked for a call about bringing the idea there.",
      "es": "Y México acaba de pedir una llamada para llevar la idea allá.",
      "speaker": "vale",
      "cast": [
        "vale",
        "tito"
      ],
      "lines": [
        {
          "speaker": "tito",
          "text": "Look at your phone, Vale. It has been vibrating since the children started singing.",
          "es": "Mira tu teléfono, Vale. Lleva vibrando desde que los niños empezaron a cantar."
        },
        {
          "speaker": "vale",
          "text": "And Mexico just asked for a call about bringing the idea there.",
          "es": "Y México acaba de pedir una llamada para llevar la idea allá."
        },
        {
          "speaker": "tito",
          "text": "So the seed already traveled. Answer that call before the idea belongs to somebody else.",
          "es": "Así que la semilla ya viajó. Contesta esa llamada antes de que la idea sea de alguien más."
        }
      ],
      "words": [
        { "word": "idea", "es": "idea" },
        { "word": "phone", "es": "teléfono" },
        { "word": "seed", "es": "semilla" }
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
          "label": "I have been working on a leadership program at my company.",
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
          "label": "You have been building adult courses. Why not work on a kids program?",
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
          "label": "And Mexico just asked for a call about bringing the idea there.",
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
      "sayIt": "And Mexico just asked for a call about bringing the idea there.",
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
      "phrase": "catch up",
      "es": "ponerse al día",
      "kind": "phrasal",
      "example": "Maybe we should catch up less and listen more. They want a class too.",
      "exampleEs": "Quizás deberíamos ponernos al día menos y escuchar más. Ellos también quieren una clase."
    },
    {
      "phrase": "work on",
      "es": "trabajar en / mejorar",
      "kind": "phrasal",
      "example": "You have been building adult courses. Why not work on a kids program?",
      "exampleEs": "Has estado creando cursos para adultos. ¿Por qué no trabajar en un programa para niños?"
    },
    {
      "phrase": "plant the seed",
      "es": "sembrar la idea inicial",
      "kind": "idiom",
      "example": "A small Saturday class can plant the seed for a whole generation.",
      "exampleEs": "Una pequeña clase sabatina puede sembrar la semilla para toda una generación."
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
    "en": "And Mexico just asked for a call about bringing the idea there.",
    "es": "Y México acaba de pedir una llamada para llevar la idea allá."
  }
};
