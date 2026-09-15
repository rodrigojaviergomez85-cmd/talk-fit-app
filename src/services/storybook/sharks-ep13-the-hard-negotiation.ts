import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/sharks-ep13-the-hard-negotiation/cover.jpg";
import s1 from "@/assets/storybook/sharks-ep13-the-hard-negotiation/s1.jpg";
import s2 from "@/assets/storybook/sharks-ep13-the-hard-negotiation/s2.jpg";
import s3 from "@/assets/storybook/sharks-ep13-the-hard-negotiation/s3.jpg";
import s4 from "@/assets/storybook/sharks-ep13-the-hard-negotiation/s4.jpg";
import s5 from "@/assets/storybook/sharks-ep13-the-hard-negotiation/s5.jpg";
import s6 from "@/assets/storybook/sharks-ep13-the-hard-negotiation/s6.jpg";
import s7 from "@/assets/storybook/sharks-ep13-the-hard-negotiation/s7.jpg";
import s8 from "@/assets/storybook/sharks-ep13-the-hard-negotiation/s8.jpg";
import s9 from "@/assets/storybook/sharks-ep13-the-hard-negotiation/s9.jpg";
import s10 from "@/assets/storybook/sharks-ep13-the-hard-negotiation/s10.jpg";
import s11 from "@/assets/storybook/sharks-ep13-the-hard-negotiation/s11.jpg";

export const SHARKS_EP13_THE_HARD_NEGOTIATION: StorybookEpisode = {
  "id": "sharks-ep13-the-hard-negotiation",
  "moduleId": "sharks",
  "week": 3,
  "title": "The hard conversation",
  "titleEs": "La conversación difícil",
  "episodeLabel": {
    "en": "Season 8 · Episode 13",
    "es": "Temporada 8 · Episodio 13"
  },
  "previously": [
    {
      "en": "The numbers revealed the truth: Marco's group is two months behind and parents are complaining.",
      "es": "Los números revelaron la verdad: el grupo de Marco está dos meses atrás y los padres se están quejando."
    },
    {
      "en": "Vale accepted the hardest task: telling Marco herself, with respect and a plan.",
      "es": "Vale aceptó la tarea más difícil: decírselo a Marco ella misma, con respeto y con un plan."
    }
  ],
  "reviewWords": [
    {
      "word": "attendance",
      "es": "asistencia"
    },
    {
      "word": "complaints",
      "es": "quejas"
    },
    {
      "word": "deserves",
      "es": "merece"
    }
  ],
  "blurb": {
    "en": "Marco trained half the academy, but his students are falling behind. Vale must tell a beloved teacher he is not ready to lead — and Dani does not agree with the timing.",
    "es": "Marco capacitó a media academia, pero sus estudiantes se están quedando atrás. Vale debe decirle a un maestro querido que no está listo para liderar, y Dani no está de acuerdo con el momento."
  },
  "cover": cover,
  "voice": "girl",
  "scenes": [
    {
      "id": "s1",
      "image": s1,
      "imageAlt": "Dani finds Vale staring at Marco's report early in the morning.",
      "text": "You have been staring at that page for ten minutes. It is Marco's report, isn't it.",
      "es": "Llevas diez minutos mirando esa página. Es el informe de Marco, ¿verdad?",
      "speaker": "dani",
      "cast": ["dani", "vale"],
      "lines": [
        {
          "speaker": "dani",
          "text": "You have been staring at that page for ten minutes. It is Marco's report, isn't it.",
          "es": "Llevas diez minutos mirando esa página. Es el informe de Marco, ¿verdad?"
        },
        {
          "speaker": "vale",
          "text": "Two months behind, three parents left harsh feedback, and his attendance keeps falling.",
          "es": "Dos meses atrás, tres padres dejaron comentarios duros, y su asistencia sigue cayendo."
        },
        {
          "speaker": "dani",
          "text": "He also trained me, Camila, and half the academy. Numbers do not know that part.",
          "es": "Él también nos capacitó a mí, a Camila y a media academia. Los números no saben esa parte."
        }
      ],
      "words": [
        { "word": "staring", "es": "mirando fijamente" },
        { "word": "report", "es": "informe" },
        { "word": "harsh", "es": "duros / severos" }
      ]
    },
    {
      "id": "s2",
      "image": s2,
      "imageAlt": "Vale and Dani debate Marco's future beside the office window.",
      "text": "Then let him. Give him a fair shot. One bad month is not a verdict.",
      "es": "Entonces déjalo. Dale una oportunidad justa. Un mal mes no es un veredicto.",
      "speaker": "dani",
      "cast": ["vale", "dani"],
      "lines": [
        {
          "speaker": "vale",
          "text": "I know his heart, Dani. That is exactly why this is hard. He wants to lead a group.",
          "es": "Conozco su corazón, Dani. Es exactamente por eso que esto es difícil. Él quiere liderar un grupo."
        },
        {
          "speaker": "dani",
          "text": "Then let him stay. He deserves a fair shot. One bad month is not a verdict.",
          "es": "Entonces déjalo quedarse. Merece una oportunidad justa. Un mal mes no es un veredicto."
        },
        {
          "speaker": "vale",
          "text": "Two bad months, and twelve kids paying for it with their Saturdays.",
          "es": "Dos meses malos, y doce niños pagándolo con sus sábados."
        }
      ],
      "words": [
        { "word": "heart", "es": "corazón" },
        { "word": "a fair shot", "es": "una oportunidad justa" },
        { "word": "verdict", "es": "veredicto" }
      ]
    },
    {
      "id": "s3",
      "image": s3,
      "imageAlt": "Camila joins the debate and points out that both are defending different things.",
      "text": "May I point out something? You are both defending Marco. You just defend different things.",
      "es": "¿Puedo señalar algo? Los dos están defendiendo a Marco. Solo defienden cosas distintas.",
      "speaker": "camila",
      "cast": ["camila", "vale", "dani"],
      "lines": [
        {
          "speaker": "camila",
          "text": "May I point out something? You are both defending Marco. You just defend different things.",
          "es": "¿Puedo señalar algo? Los dos están defendiendo a Marco. Solo defienden cosas distintas."
        },
        {
          "speaker": "vale",
          "text": "Explain that, please, because right now I only hear two people arguing about the same man from opposite corners.",
          "es": "Explica eso, por favor, porque ahora mismo solo escucho a dos personas discutiendo sobre el mismo hombre desde esquinas opuestas."
        },
        {
          "speaker": "camila",
          "text": "Dani defends Marco's feelings. You defend his students. Both are love, just pointed in different directions, and the room feels it.",
          "es": "Dani defiende los sentimientos de Marco. Tú defiendes a sus estudiantes. Ambos son cariño, apuntando en direcciones distintas, y la sala lo siente."
        }
      ],
      "words": [
        { "word": "point out", "es": "señalar" },
        { "word": "defending", "es": "defendiendo" },
        { "word": "directions", "es": "direcciones" }
      ]
    },
    {
      "id": "s4",
      "image": s4,
      "imageAlt": "Dani warns about the team's fear while Vale explains the co-teaching plan.",
      "text": "I am not removing him. I am moving him back to co-teaching, with training, paid the same.",
      "es": "No lo estoy despidiendo. Lo regreso a co-enseñanza, con capacitación, con el mismo sueldo.",
      "speaker": "vale",
      "cast": ["dani", "vale"],
      "lines": [
        {
          "speaker": "dani",
          "text": "If you remove him, the other teachers will be afraid to make any mistake.",
          "es": "Si lo quitas, los otros maestros tendrán miedo de cometer cualquier error."
        },
        {
          "speaker": "vale",
          "text": "I am not removing him. I am moving him back to co-teaching, with training, paid the same.",
          "es": "No lo estoy despidiendo. Lo regreso a co-enseñanza, con capacitación, con el mismo sueldo."
        },
        {
          "speaker": "dani",
          "text": "Co-teaching. So he keeps his salary, loses the title. He will still feel it like a demotion.",
          "es": "Co-enseñanza. O sea que conserva su salario, pierde el título. Igual lo va a sentir como una degradación."
        }
      ],
      "words": [
        { "word": "remove", "es": "quitar del puesto" },
        { "word": "co-teaching", "es": "co-enseñanza (enseñar acompañado)" },
        { "word": "demotion", "es": "degradación de puesto" }
      ]
    },
    {
      "id": "s5",
      "image": s5,
      "imageAlt": "Vale practices the exact words she will use with Marco, notebook in hand.",
      "text": "Then I will say it honestly: this is not punishment, it is preparation. He is not ready yet.",
      "es": "Entonces lo diré honestamente: esto no es un castigo, es preparación. Todavía no está listo.",
      "speaker": "vale",
      "cast": ["vale", "dani"],
      "lines": [
        {
          "speaker": "vale",
          "text": "Then I will say it honestly: this is not punishment, it is preparation. He is not ready yet.",
          "es": "Entonces lo diré honestamente: esto no es un castigo, es preparación. Todavía no está listo."
        },
        {
          "speaker": "dani",
          "text": "Not ready yet. Those three words matter more than all the others. He can hear 'not ready yet' without hearing 'never'.",
          "es": "Todavía no está listo. Esas tres palabras importan más que todas las demás. Él puede escuchar 'todavía no' sin escuchar 'nunca'."
        },
        {
          "speaker": "vale",
          "text": "And I will offer him a path: eight weeks, clear goals, my own Saturdays included.",
          "es": "Y le ofreceré un camino: ocho semanas, metas claras, mis propios sábados incluidos."
        }
      ],
      "words": [
        { "word": "punishment", "es": "castigo" },
        { "word": "preparation", "es": "preparación" },
        { "word": "path", "es": "camino" }
      ]
    },
    {
      "id": "s6",
      "image": s6,
      "imageAlt": "Camila raises the risk that Marco feels insulted and quits.",
      "text": "He has real potential. But what if he feels insulted and quits anyway?",
      "es": "Tiene potencial real. ¿Pero qué pasa si se siente ofendido y renuncia de todos modos?",
      "speaker": "camila",
      "cast": ["camila", "vale", "dani"],
      "lines": [
        {
          "speaker": "camila",
          "text": "He has real potential. But what if he feels insulted and quits anyway?",
          "es": "Tiene potencial real. ¿Pero qué pasa si se siente ofendido y renuncia de todos modos?"
        },
        {
          "speaker": "vale",
          "text": "Then I will listen, and I will still choose the students. But I think he steps up.",
          "es": "Entonces escucharé, y aun así elegiré a los estudiantes. Pero creo que él va a aceptar el reto."
        },
        {
          "speaker": "dani",
          "text": "You really believe that? After you tell him his group is the worst in the academy? After you take away the title he worked two years to earn?",
          "es": "¿De verdad lo crees? ¿Después de decirle que su grupo es el peor de la academia? ¿Después de quitarle el título que trabajó dos años para ganar?"
        }
      ],
      "words": [
        { "word": "potential", "es": "potencial" },
        { "word": "insulted", "es": "ofendido" },
        { "word": "steps up", "es": "acepta el reto" }
      ]
    },
    {
      "id": "s7",
      "image": s7,
      "imageAlt": "Dani finally supports the decision even though he disagrees with the timing.",
      "text": "I believe people rise when you respect them enough to tell them the truth.",
      "es": "Creo que la gente se supera cuando la respetas lo suficiente para decirle la verdad.",
      "speaker": "vale",
      "cast": ["vale", "dani"],
      "lines": [
        {
          "speaker": "vale",
          "text": "I believe people rise when you respect them enough to tell them the truth.",
          "es": "Creo que la gente se supera cuando la respetas lo suficiente para decirle la verdad."
        },
        {
          "speaker": "dani",
          "text": "Okay. I disagree with the timing, but I will support the decision. He is my friend too.",
          "es": "Okay. No estoy de acuerdo con el momento, pero apoyaré la decisión. Él también es mi amigo."
        },
        {
          "speaker": "vale",
          "text": "Disagreeing and still helping — that is what a real team does, Dani.",
          "es": "No estar de acuerdo y aun así ayudar — eso es lo que hace un equipo de verdad, Dani."
        }
      ],
      "words": [
        { "word": "rise", "es": "superarse" },
        { "word": "truth", "es": "verdad" },
        { "word": "support", "es": "apoyar" }
      ]
    },
    {
      "id": "s8",
      "image": s8,
      "imageAlt": "Vale walks toward room two where Marco is finishing his class.",
      "text": "No. But ready is not required — honest is. Wish me luck.",
      "es": "No. Pero no se necesita estar lista — se necesita ser honesta. Deséenme suerte.",
      "speaker": "vale",
      "cast": ["camila", "vale", "dani"],
      "lines": [
        {
          "speaker": "camila",
          "text": "He is in room two, finishing his class. Are you ready?",
          "es": "Está en la sala dos, terminando su clase. ¿Estás lista?"
        },
        {
          "speaker": "vale",
          "text": "No. But ready is not required — honest is. Wish me luck.",
          "es": "No. Pero no se necesita estar lista — se necesita ser honesta. Deséenme suerte."
        },
        {
          "speaker": "dani",
          "text": "Hey. Tell him the good part first. There is a good part, right?",
          "es": "Oye. Dile primero la parte buena. Hay una parte buena, ¿verdad?"
        }
      ],
      "words": [
        { "word": "required", "es": "necesario" },
        { "word": "luck", "es": "suerte" },
        { "word": "the good part", "es": "la parte buena" }
      ]
    },
    {
      "id": "s9",
      "image": s9,
      "imageAlt": "Vale returns to the office, tired but calm, and tells Dani and Camila how it went.",
      "text": "He listened. He was angry for five minutes, quiet for ten, and then he asked about the plan.",
      "es": "Él escuchó. Estuvo enojado cinco minutos, callado diez, y luego preguntó por el plan.",
      "speaker": "vale",
      "cast": ["vale", "dani"],
      "lines": [
        {
          "speaker": "vale",
          "text": "He listened. He was angry for five minutes, quiet for ten, and then he asked about the plan.",
          "es": "Él escuchó. Estuvo enojado cinco minutos, callado diez, y luego preguntó por el plan."
        },
        {
          "speaker": "dani",
          "text": "He asked about the plan? That is Marco. Always building something.",
          "es": "¿Preguntó por el plan? Ese es Marco. Siempre construyendo algo."
        },
        {
          "speaker": "vale",
          "text": "He starts co-teaching on Monday. And he asked me to thank you both for the honest numbers.",
          "es": "Empieza la co-enseñanza el lunes. Y me pidió que les agradeciera a los dos los números honestos."
        }
      ],
      "words": [
        { "word": "angry", "es": "enojado" },
        { "word": "quiet", "es": "callado" },
        { "word": "thank", "es": "agradecer" }
      ]
    },
    {
      "id": "s10",
      "image": s10,
      "imageAlt": "Camila smiles in disbelief at how well the hardest conversation ended.",
      "text": "People can carry hard news; they cannot carry feeling small.",
      "es": "La gente puede cargar noticias duras; lo que no puede cargar es sentirse pequeña.",
      "speaker": "vale",
      "cast": ["camila", "vale", "dani"],
      "lines": [
        {
          "speaker": "camila",
          "text": "So the hardest conversation of the month ends with a thank-you. I did not see that coming.",
          "es": "Así que la conversación más difícil del mes termina con un agradecimiento. No lo vi venir."
        },
        {
          "speaker": "vale",
          "text": "Respect does that. People can carry hard news; they cannot carry feeling small.",
          "es": "El respeto hace eso. La gente puede cargar noticias duras; lo que no puede cargar es sentirse pequeña."
        },
        {
          "speaker": "dani",
          "text": "Write that down, Camila. That sentence belongs on our wall.",
          "es": "Escríbelo, Camila. Esa frase merece estar en nuestra pared."
        }
      ],
      "words": [
        { "word": "news", "es": "noticias" },
        { "word": "carry", "es": "cargar / soportar" },
        { "word": "belongs", "es": "merece estar / pertenece" }
      ]
    },
    {
      "id": "s11",
      "image": s11,
      "imageAlt": "Camila reads a new email from the Northline office in San Miguel and her face changes.",
      "text": "They are cancelling their contract. A competitor offered them half our price.",
      "es": "Están cancelando su contrato. Un competidor les ofreció la mitad de nuestro precio.",
      "speaker": "camila",
      "cast": ["camila", "vale"],
      "lines": [
        {
          "speaker": "camila",
          "text": "Vale, one more message. The Northline office in San Miguel just sent an email.",
          "es": "Vale, un mensaje más. La oficina de Northline en San Miguel acaba de enviar un correo."
        },
        {
          "speaker": "vale",
          "text": "Read it to me, please. Slowly.",
          "es": "Léemelo, por favor. Despacio."
        },
        {
          "speaker": "camila",
          "text": "They are cancelling their contract. A competitor offered them half our price.",
          "es": "Están cancelando su contrato. Un competidor les ofreció la mitad de nuestro precio."
        }
      ],
      "words": [
        { "word": "cancelling", "es": "cancelando" },
        { "word": "contract", "es": "contrato" },
        { "word": "price", "es": "precio" }
      ]
    }
  ],
  "quizzes": [
    {
      "id": "q1",
      "afterScene": "s3",
      "questionEn": "What are Vale and Dani really debating?",
      "questionEs": "¿Qué están debatiendo Vale y Dani en realidad?",
      "options": [
        {
          "label": "Whether Marco is ready to lead a group.",
          "emoji": "⚖️"
        },
        {
          "label": "Whether to buy new computers.",
          "emoji": "💻"
        },
        {
          "label": "Whether to cancel Saturday classes.",
          "emoji": "📅"
        }
      ],
      "answer": 0,
      "sayIt": "I would give him a fair shot with clear goals.",
      "sayItEs": "Ejemplo: «I would give him a fair shot with clear goals.»",
      "sayItAskEn": "What would you do with Marco?",
      "sayItAskEs": "¿Qué harías tú con Marco?",
      "sayItCheck": {
        "target": "I would *",
        "altTargets": [
          "I would give him *",
          "I would talk to *"
        ]
      }
    },
    {
      "id": "q2",
      "afterScene": "s7",
      "questionEn": "What does Vale finally decide about Marco?",
      "questionEs": "¿Qué decide finalmente Vale sobre Marco?",
      "options": [
        {
          "label": "Move him to co-teaching with training and a path back.",
          "emoji": "🛤️"
        },
        {
          "label": "Fire him immediately without talking.",
          "emoji": "🚪"
        },
        {
          "label": "Ignore his results forever.",
          "emoji": "🙈"
        }
      ],
      "answer": 0,
      "sayIt": "I agree because the students come first, but the teacher matters too.",
      "sayItEs": "Ejemplo: «I agree because the students come first, but the teacher matters too.»",
      "sayItAskEn": "Do you agree with Vale's decision? Why?",
      "sayItAskEs": "¿Estás de acuerdo con la decisión de Vale? ¿Por qué?",
      "sayItCheck": {
        "target": "I agree because *",
        "altTargets": [
          "I disagree because *",
          "Yes, because *"
        ]
      }
    },
    {
      "id": "q3",
      "afterScene": "s11",
      "questionEn": "How did Marco respond to the hard conversation?",
      "questionEs": "¿Cómo respondió Marco a la conversación difícil?",
      "options": [
        {
          "label": "He was angry, then quiet, and finally asked about the plan.",
          "emoji": "🌱"
        },
        {
          "label": "He shouted and left the building.",
          "emoji": "😡"
        },
        {
          "label": "He laughed at the numbers.",
          "emoji": "😂"
        }
      ],
      "answer": 0,
      "sayIt": "I would tell my friend honestly and offer a plan to improve.",
      "sayItEs": "Ejemplo: «I would tell my friend honestly and offer a plan to improve.»",
      "sayItAskEn": "How would you give hard feedback to a friend?",
      "sayItAskEs": "¿Cómo le darías una crítica difícil a un amigo?",
      "sayItCheck": {
        "target": "I would tell * honestly and *",
        "altTargets": [
          "I would say * with respect",
          "I would * honestly"
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
    "modelActionEs": "Vale escucha el desacuerdo de Dani sin enojarse y ajusta su plan."
  },
  "expressions": [
    {
      "phrase": "point out",
      "es": "señalar / hacer notar",
      "kind": "phrasal",
      "example": "May I point out something? You are both defending Marco. You just defend different things.",
      "exampleEs": "¿Puedo señalar algo? Los dos están defendiendo a Marco. Solo defienden cosas distintas."
    },
    {
      "phrase": "step up",
      "variants": ["steps up"],
      "es": "aceptar el reto / dar la cara",
      "kind": "phrasal",
      "example": "Then I will listen, and I will still choose the students. But I think he steps up.",
      "exampleEs": "Entonces escucharé, y aun así elegiré a los estudiantes. Pero creo que él va a aceptar el reto."
    },
    {
      "phrase": "give someone a fair shot",
      "variants": ["give him a fair shot"],
      "es": "darle a alguien una oportunidad justa",
      "kind": "idiom",
      "example": "Then let him. Give him a fair shot. One bad month is not a verdict.",
      "exampleEs": "Entonces déjalo. Dale una oportunidad justa. Un mal mes no es un veredicto."
    }
  ],
  "finaleSeconds": 30,
  "continuePrompt": {
    "en": "Your turn, 30 seconds: explain the problem with Marco and how Vale handled the hard conversation.",
    "es": "Tu turno, 30 segundos: explica el problema con Marco y cómo manejó Vale la conversación difícil."
  },
  "continueWith": [
    "Marco's problem was ...",
    "Vale told him ...",
    "In the end, Marco ..."
  ],
  "cliffhanger": {
    "en": "They are cancelling their contract. A competitor offered them half our price.",
    "es": "Están cancelando su contrato. Un competidor les ofreció la mitad de nuestro precio."
  }
};
