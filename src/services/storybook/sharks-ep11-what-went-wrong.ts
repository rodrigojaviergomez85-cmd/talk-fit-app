import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/sharks-ep11-what-went-wrong/cover.jpg";
import s1 from "@/assets/storybook/sharks-ep11-what-went-wrong/s1.jpg";
import s2 from "@/assets/storybook/sharks-ep11-what-went-wrong/s2.jpg";
import s3 from "@/assets/storybook/sharks-ep11-what-went-wrong/s3.jpg";
import s4 from "@/assets/storybook/sharks-ep11-what-went-wrong/s4.jpg";
import s5 from "@/assets/storybook/sharks-ep11-what-went-wrong/s5.jpg";
import s6 from "@/assets/storybook/sharks-ep11-what-went-wrong/s6.jpg";
import s7 from "@/assets/storybook/sharks-ep11-what-went-wrong/s7.jpg";
import s8 from "@/assets/storybook/sharks-ep11-what-went-wrong/s8.jpg";
import s9 from "@/assets/storybook/sharks-ep11-what-went-wrong/s9.jpg";
import s10 from "@/assets/storybook/sharks-ep11-what-went-wrong/s10.jpg";
import s11 from "@/assets/storybook/sharks-ep11-what-went-wrong/s11.jpg";

export const SHARKS_EP11_WHAT_WENT_WRONG: StorybookEpisode = {
  id: "sharks-ep11-what-went-wrong",
  moduleId: "sharks",
  week: 3,
  title: "What went wrong",
  titleEs: "Qué salió mal",
  episodeLabel: {
    en: "Season 8 · Episode 11",
    es: "Temporada 8 · Episodio 11"
  },
  previously: [
    {
      en: "A failure is only a disaster when nobody explains it.",
      es: "Un fracaso solo es un desastre cuando nadie lo explica."
    }
  ],
  reviewWords: [
    { word: "invoice", es: "factura" },
    { word: "clause", es: "cláusula" },
    { word: "pilot", es: "piloto" }
  ],
  blurb: {
    en: "The platform was down for two hours and forty classes were affected. Renata read the report before we sent it.",
    es: "La plataforma estuvo caída dos horas y cuarenta clases se vieron afectadas. Renata leyó el reporte antes de que lo enviáramos."
  },
  cover: cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Lucía reports the platform failure to the team in the office.",
      text: "The platform was down for two hours and forty classes were affected.",
      es: "La plataforma estuvo caída dos horas y cuarenta clases se vieron afectadas.",
      speaker: "lucia",
      cast: ["lucia", "vale"],
      lines: [
        {
          speaker: "lucia",
          text: "The platform was down for two hours and forty classes were affected.",
          es: "La plataforma estuvo caída dos horas y cuarenta clases se vieron afectadas."
        },
        {
          speaker: "vale",
          text: "Two hours in the middle of the morning. That is the worst possible window for our students.",
          es: "Dos horas en plena mañana. Es la peor ventana posible."
        },
        {
          speaker: "lucia",
          text: "I know. The outage started at nine, and teachers had to improvise with paper, phone calls, and a lot of patience.",
          es: "Lo sé. El corte empezó a las nueve, y los maestros tuvieron que improvisar con papel, llamadas y mucha paciencia."
        }
      ],
      words: [
        { word: "platform", es: "plataforma" },
        { word: "down", es: "caída" },
        { word: "affected", es: "afectadas" }
      ]
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Vale asks for the root cause before apologizing to anyone.",
      text: "Okay. Before we apologize, I need the root cause, not a guess.",
      es: "Bien. Antes de disculparnos, necesito la causa raíz, no una suposición.",
      speaker: "vale",
      cast: ["vale", "dani"],
      lines: [
        {
          speaker: "vale",
          text: "Okay. Before we apologize, I need the root cause, not a guess.",
          es: "Bien. Antes de disculparnos, necesito la causa raíz, no una suposición."
        },
        {
          speaker: "dani",
          text: "Give me ten minutes with the server logs and the error reports.",
          es: "Dame diez minutos con los registros del servidor."
        },
        {
          speaker: "vale",
          text: "Take fifteen. A wrong explanation is worse than a slow one, especially with Northline watching us.",
          es: "Toma quince. Una explicación equivocada es peor que una lenta, especialmente con Northline observándonos."
        }
      ],
      words: [
        { word: "root cause", es: "causa raíz" },
        { word: "guess", es: "suposición" },
        { word: "logs", es: "registros" }
      ]
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Dani finds the real origin of the glitch on his computer.",
      text: "The glitch started in the new video server. The downtime was thirty minutes longer than we reported.",
      es: "La falla empezó en el nuevo servidor de video. La caída fue treinta minutos más larga de lo que reportamos.",
      speaker: "dani",
      cast: ["dani", "vale"],
      lines: [
        {
          speaker: "dani",
          text: "The glitch started in the new video server. The downtime was thirty minutes longer than we reported.",
          es: "La falla empezó en el nuevo servidor de video. La caída fue treinta minutos más larga de lo que reportamos."
        },
        {
          speaker: "vale",
          text: "So our first message to clients was wrong too. We have to correct it before they notice.",
          es: "Entonces nuestro primer mensaje a los clientes también fue incorrecto. Tenemos que corregirlo."
        },
        {
          speaker: "dani",
          text: "Yes. The automatic alert fired late, and nobody noticed for half an hour because the dashboard froze too.",
          es: "Sí. La alerta automática se activó tarde, y nadie lo notó por media hora porque el tablero también se congeló."
        }
      ],
      words: [
        { word: "glitch", es: "falla técnica" },
        { word: "downtime", es: "tiempo caído" },
        { word: "alert", es: "alerta" }
      ]
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Camila shares how clients are reacting to the failure.",
      text: "Three clients already asked for a refund, and Northline escalated it to their director.",
      es: "Tres clientes ya pidieron reembolso, y Northline lo escaló a su director.",
      speaker: "camila",
      cast: ["camila", "vale"],
      lines: [
        {
          speaker: "camila",
          text: "Three clients already asked for a refund, and Northline escalated it to their director.",
          es: "Tres clientes ya pidieron reembolso, y Northline lo escaló a su director."
        },
        {
          speaker: "vale",
          text: "Northline is our biggest contract. Who is talking to their director right now?",
          es: "Northline es nuestro contrato más grande. ¿Quién está hablando con su director?"
        },
        {
          speaker: "camila",
          text: "Nobody yet. They are waiting for our report before the call, and their patience is running out.",
          es: "Nadie todavía. Están esperando nuestro reporte antes de la llamada, y su paciencia se está acabando."
        }
      ],
      words: [
        { word: "refund", es: "reembolso" },
        { word: "escalated", es: "escaló" },
        { word: "director", es: "director" }
      ]
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Vale decides the team will take responsibility today.",
      text: "Then we own up to it today. A late apology costs more than an honest one.",
      es: "Entonces lo asumimos hoy. Una disculpa tardía cuesta más que una honesta.",
      speaker: "vale",
      cast: ["vale", "camila"],
      lines: [
        {
          speaker: "vale",
          text: "Then we own up to it today. A late apology costs more than an honest one.",
          es: "Entonces lo asumimos hoy. Una disculpa tardía cuesta más que una honesta."
        },
        {
          speaker: "camila",
          text: "Even with the extra thirty minutes? That makes us look worse than we are.",
          es: "¿Incluso con los treinta minutos extra? Eso nos hace ver peor."
        },
        {
          speaker: "vale",
          text: "Especially with the extra thirty minutes. Clients forgive errors, not cover-ups, and Northline has trusted us since the beginning.",
          es: "Especialmente con los treinta minutos extra. Los clientes perdonan errores, no encubrimientos, y Northline ha confiado en nosotros desde el principio."
        }
      ],
      words: [
        { word: "apology", es: "disculpa" },
        { word: "honest", es: "honesta" },
        { word: "cover-up", es: "encubrimiento" }
      ]
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Lucía offers to review every affected class before noon.",
      text: "I can look into every affected class and build the list by noon.",
      es: "Puedo revisar cada clase afectada y armar la lista al mediodía.",
      speaker: "lucia",
      cast: ["lucia", "dani"],
      lines: [
        {
          speaker: "lucia",
          text: "I can look into every affected class and build the list by noon.",
          es: "Puedo revisar cada clase afectada y armar la lista al mediodía."
        },
        {
          speaker: "dani",
          text: "I will send you the exact time window from the logs so no class is missing.",
          es: "Te enviaré la ventana exacta de tiempo de los registros para que no falte ninguna clase."
        },
        {
          speaker: "lucia",
          text: "Perfect. Each class gets a teacher name, a student count, and a recovery plan anyone can read in one minute.",
          es: "Perfecto. Cada clase tendrá nombre del maestro, número de estudiantes y un plan de recuperación que cualquiera lee en un minuto."
        }
      ],
      words: [
        { word: "noon", es: "mediodía" },
        { word: "missing", es: "faltante" },
        { word: "recovery", es: "recuperación" }
      ]
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Dani admits his mistake in front of the team.",
      text: "I dropped the ball on testing the server before the launch. That one is on me.",
      es: "Fallé al probar el servidor. Esa es mía.",
      speaker: "dani",
      cast: ["dani", "vale"],
      lines: [
        {
          speaker: "dani",
          text: "I dropped the ball on testing the server. That one is on me.",
          es: "Fallé al probar el servidor. Esa es mía."
        },
        {
          speaker: "vale",
          text: "Thank you for saying it. Being accountable is faster than being perfect.",
          es: "Gracias por decirlo. Ser responsable es más rápido que ser perfecto."
        },
        {
          speaker: "dani",
          text: "I will write the new testing checklist tonight so it never happens again on my watch.",
          es: "Escribiré la nueva lista de pruebas esta noche para que no vuelva a pasar en mi turno."
        }
      ],
      words: [
        { word: "testing", es: "pruebas" },
        { word: "accountable", es: "responsable" },
        { word: "checklist", es: "lista de verificación" }
      ]
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "Camila asks how to compensate the affected students.",
      text: "Do we offer a refund, or free classes for the affected students?",
      es: "¿Ofrecemos reembolso o clases gratis para los estudiantes afectados?",
      speaker: "camila",
      cast: ["camila", "vale"],
      lines: [
        {
          speaker: "camila",
          text: "Do we offer a refund, or free classes for the affected students?",
          es: "¿Ofrecemos reembolso o clases gratis para los estudiantes afectados?"
        },
        {
          speaker: "vale",
          text: "Both options, and the client chooses. Send the report with the root cause attached.",
          es: "Ambas opciones, y el cliente elige. Envía el reporte con la causa raíz adjunta."
        },
        {
          speaker: "camila",
          text: "Choosing gives them control. I like it, and it is much cheaper than losing them to BigTalk.",
          es: "Elegir les da control. Me gusta, y es mucho más barato que perderlos ante BigTalk."
        }
      ],
      words: [
        { word: "free", es: "gratis" },
        { word: "chooses", es: "elige" },
        { word: "attached", es: "adjunta" }
      ]
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Vale calls the Northline director herself with the honest report.",
      text: "I will call the Northline director myself, with the real numbers on the table.",
      es: "Llamaré yo misma a la directora de Northline, con los números reales sobre la mesa.",
      speaker: "vale",
      cast: ["vale", "camila"],
      lines: [
        {
          speaker: "vale",
          text: "I will call the Northline director myself, with the real numbers on the table.",
          es: "Llamaré yo misma a la directora de Northline, con los números reales sobre la mesa."
        },
        {
          speaker: "camila",
          text: "Are you sure? A manager could take that difficult call for you.",
          es: "¿Estás segura? Una gerente podría tomar esa llamada por ti."
        },
        {
          speaker: "vale",
          text: "Big contract, big mistake, big name on the phone. That is my job, and I am not delegating it today.",
          es: "Contrato grande, error grande, nombre grande en el teléfono. Ese es mi trabajo, y hoy no lo delego."
        }
      ],
      words: [
        { word: "myself", es: "yo misma" },
        { word: "real", es: "reales" },
        { word: "manager", es: "gerente" }
      ]
    },
    {
      id: "s10",
      image: s10,
      imageAlt: "The Northline director accepts the apology and appreciates the honesty.",
      text: "The director appreciated the honesty. Northline stays, and they want the new checklist.",
      es: "La directora agradeció la honestidad. Northline se queda, y quieren la nueva lista de verificación.",
      speaker: "vale",
      cast: ["vale", "dani"],
      lines: [
        {
          speaker: "vale",
          text: "The director appreciated the honesty. Northline stays, and they want the new checklist.",
          es: "La directora agradeció la honestidad. Northline se queda, y quieren la nueva lista de verificación."
        },
        {
          speaker: "dani",
          text: "They want my checklist? The one that came from my own mistake?",
          es: "¿Quieren mi lista de verificación? ¿La de mi error?"
        },
        {
          speaker: "vale",
          text: "The one from your lesson. There is a difference, and they noticed it on the call.",
          es: "La de tu lección. Hay una diferencia, y ellos la notaron en la llamada."
        }
      ],
      words: [
        { word: "appreciated", es: "agradeció" },
        { word: "honesty", es: "honestidad" },
        { word: "lesson", es: "lección" }
      ]
    },
    {
      id: "s11",
      image: s11,
      imageAlt: "Dani reveals that Renata read the report before it was sent.",
      text: "Vale, one more thing. Renata read the report before we sent it.",
      es: "Vale, una cosa más. Renata leyó el reporte antes de que lo enviáramos.",
      speaker: "dani",
      cast: ["dani", "vale"],
      lines: [
        {
          speaker: "dani",
          text: "Vale, one more thing. Renata read the report before we sent it.",
          es: "Vale, una cosa más. Renata leyó el reporte antes de que lo enviáramos."
        },
        {
          speaker: "vale",
          text: "Before we sent it? How is that possible?",
          es: "¿Antes de que lo enviáramos? ¿Cómo es posible?"
        },
        {
          speaker: "dani",
          text: "She just wrote to me. She says, and I quote, interesting way to handle a crisis. She still wants the pilot.",
          es: "Me acaba de escribir. Dice, y cito, interesante manera de manejar una crisis. Aún quiere el piloto."
        }
      ],
      words: [
        { word: "report", es: "reporte" },
        { word: "possible", es: "posible" },
        { word: "crisis", es: "crisis" }
      ]
    }
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s3",
      questionEn: "What caused the platform failure?",
      questionEs: "¿Qué causó la falla de la plataforma?",
      options: [
        {
          label: "A glitch in the new video server.",
          emoji: "🖥️"
        },
        {
          label: "A storm cut the power.",
          emoji: "⛈️"
        },
        {
          label: "A teacher deleted the classes.",
          emoji: "🗑️"
        }
      ],
      answer: 0,
      sayIt: "The glitch started in the new video server.",
      sayItEs: "Ejemplo: «The glitch started in the new video server.»",
      sayItAskEn: "What was the root cause?",
      sayItAskEs: "¿Cuál fue la causa raíz?",
      sayItCheck: {
        target: "* server *",
        altTargets: [
          "The glitch *",
          "The video server *",
          "It started *"
        ]
      }
    },
    {
      id: "q2",
      afterScene: "s7",
      questionEn: "What does Dani admit in front of the team?",
      questionEs: "¿Qué admite Dani frente al equipo?",
      options: [
        {
          label: "He dropped the ball on testing the server.",
          emoji: "🙋"
        },
        {
          label: "He wants to quit the academy.",
          emoji: "🚪"
        },
        {
          label: "He lost the client list.",
          emoji: "📋"
        }
      ],
      answer: 0,
      sayIt: "Dani dropped the ball on testing the server.",
      sayItEs: "Ejemplo: «Dani dropped the ball on testing the server.»",
      sayItAskEn: "What mistake does Dani admit?",
      sayItAskEs: "¿Qué error admite Dani?",
      sayItCheck: {
        target: "* dropped the ball *",
        altTargets: [
          "He admits *",
          "He failed *",
          "Dani dropped *"
        ]
      }
    },
    {
      id: "q3",
      afterScene: "s11",
      questionEn: "What surprise does Dani share at the end?",
      questionEs: "¿Qué sorpresa comparte Dani al final?",
      options: [
        {
          label: "Renata read the report before they sent it.",
          emoji: "👀"
        },
        {
          label: "Northline cancelled the contract.",
          emoji: "❌"
        },
        {
          label: "The server failed again.",
          emoji: "🔥"
        }
      ],
      answer: 0,
      sayIt: "Renata read the report before they sent it.",
      sayItEs: "Ejemplo: «Renata read the report before they sent it.»",
      sayItAskEn: "What did Renata do, and what did she write?",
      sayItAskEs: "¿Qué hizo Renata y qué escribió?",
      sayItCheck: {
        target: "Renata *",
        altTargets: [
          "She read *",
          "* before *",
          "* crisis *"
        ]
      }
    }
  ],
  mindsetCard: {
    afterScene: "s6",
    phrase: "Mistakes are part of the process. I fix them out loud.",
    es: "Los errores son parte del proceso. Los corrijo en voz alta."
  },
  habitCard: {
    afterScene: "s4",
    phrase: "English is easy when I report the facts before the feelings.",
    es: "El inglés es fácil cuando reporto los hechos antes que los sentimientos.",
    model: "vale",
    modelActionEs: "Vale reporta los hechos con calma."
  },
  expressions: [
    {
      phrase: "look into",
      variants: ["look into"],
      es: "investigar a fondo",
      kind: "phrasal",
      example: "I can look into every affected class and build the list by noon.",
      exampleEs: "Puedo revisar cada clase afectada y armar la lista al mediodía."
    },
    {
      phrase: "own up to",
      variants: ["own up to it"],
      es: "asumir la responsabilidad",
      kind: "phrasal",
      example: "Then we own up to it today. A late apology costs more than an honest one.",
      exampleEs: "Entonces lo asumimos hoy. Una disculpa tardía cuesta más que una honesta."
    },
    {
      phrase: "drop the ball",
      variants: ["dropped the ball"],
      es: "fallar en algo que era tu responsabilidad",
      kind: "idiom",
      example: "I dropped the ball on testing the server. That one is on me.",
      exampleEs: "Fallé al probar el servidor. Esa es mía."
    }
  ],
  finaleSeconds: 30,
  continuePrompt: {
    en: "Your turn, 30 seconds: explain what went wrong, who was accountable, and how you fixed it.",
    es: "Tu turno, 30 segundos: explica qué salió mal, quién fue responsable y cómo lo resolviste."
  },
  continueWith: [
    "The root cause was ...",
    "We owned up to ...",
    "To prevent it, we will ..."
  ],
  cliffhanger: {
    en: "Vale, one more thing. Renata read the report before we sent it.",
    es: "Vale, una cosa más. Renata leyó el reporte antes de que lo enviáramos."
  }
};
