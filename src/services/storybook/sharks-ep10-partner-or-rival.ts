import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/sharks-ep10-partner-or-rival/cover.jpg";
import s1 from "@/assets/storybook/sharks-ep10-partner-or-rival/s1.jpg";
import s2 from "@/assets/storybook/sharks-ep10-partner-or-rival/s2.jpg";
import s3 from "@/assets/storybook/sharks-ep10-partner-or-rival/s3.jpg";
import s4 from "@/assets/storybook/sharks-ep10-partner-or-rival/s4.jpg";
import s5 from "@/assets/storybook/sharks-ep10-partner-or-rival/s5.jpg";
import s6 from "@/assets/storybook/sharks-ep10-partner-or-rival/s6.jpg";
import s7 from "@/assets/storybook/sharks-ep10-partner-or-rival/s7.jpg";
import s8 from "@/assets/storybook/sharks-ep10-partner-or-rival/s8.jpg";
import s9 from "@/assets/storybook/sharks-ep10-partner-or-rival/s9.jpg";
import s10 from "@/assets/storybook/sharks-ep10-partner-or-rival/s10.jpg";
import s11 from "@/assets/storybook/sharks-ep10-partner-or-rival/s11.jpg";

export const SHARKS_EP10_PARTNER_OR_RIVAL: StorybookEpisode = {
  id: "sharks-ep10-partner-or-rival",
  moduleId: "sharks",
  week: 2,
  title: "A partner or a rival",
  titleEs: "¿Socia o rival?",
  episodeLabel: {
    en: "Season 8 · Episode 10",
    es: "Temporada 8 · Episodio 10"
  },
  previously: [
    {
      en: "Vale won an international contract, but every new opportunity brings a harder decision.",
      es: "Vale ganó un contrato internacional, pero cada oportunidad trae una decisión más difícil."
    }
  ],
  reviewWords: [
    { word: "license", es: "licencia" },
    { word: "partnership", es: "alianza" },
    { word: "compete", es: "competir" }
  ],
  blurb: {
    en: "Your contract says Mexico is exclusive. I will not pay for a surprise. Vale, Lucía is calling. Something went wrong in the first class.",
    es: "Su contrato dice que México es exclusivo. No pagaré por una sorpresa. Vale, Lucía está llamando. Algo salió mal en la primera clase."
  },
  cover: cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Renata appears on the video screen, upset about a contract clause.",
      text: "Your contract says Mexico is exclusive. I will not pay for a surprise.",
      es: "Su contrato dice que México es exclusivo. No pagaré por una sorpresa.",
      speaker: "renata",
      cast: ["renata", "vale"],
      lines: [
        {
          speaker: "renata",
          text: "Your contract says Mexico is exclusive. I will not pay for a surprise.",
          es: "Su contrato dice que México es exclusivo. No pagaré por una sorpresa."
        },
        {
          speaker: "vale",
          text: "Renata, you are right to call us. Let me look at the document with you.",
          es: "Renata, hace bien en llamarnos. Déjeme revisar el documento con usted."
        },
        {
          speaker: "renata",
          text: "I have it in front of me. Page three, second paragraph. Read it.",
          es: "Lo tengo enfrente. Página tres, segundo párrafo. Léalo."
        }
      ],
      words: [
        { word: "exclusive", es: "exclusivo" },
        { word: "surprise", es: "sorpresa" },
        { word: "paragraph", es: "párrafo" }
      ]
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Vale asks for facts while the team opens the contract files.",
      text: "Before we react, let us get the facts right. Which version did you receive?",
      es: "Antes de reaccionar, aclaremos los hechos. ¿Qué versión recibió?",
      speaker: "vale",
      cast: ["vale", "dani"],
      lines: [
        {
          speaker: "vale",
          text: "Before we react, let us get the facts right. Which version did you receive?",
          es: "Antes de reaccionar, aclaremos los hechos. ¿Qué versión recibió?"
        },
        {
          speaker: "dani",
          text: "I am opening both files now, the one we sent and the one she has.",
          es: "Estoy abriendo ambos archivos, el que enviamos y el que ella tiene."
        },
        {
          speaker: "vale",
          text: "Good. We compare line by line before anyone promises anything.",
          es: "Bien. Comparamos línea por línea antes de que alguien prometa algo."
        }
      ],
      words: [
        { word: "react", es: "reaccionar" },
        { word: "facts", es: "hechos" },
        { word: "version", es: "versión" }
      ]
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Dani compares two versions of the contract on his laptop.",
      text: "I compared both files. Houston added the clause after our call.",
      es: "Comparé ambos archivos. Houston agregó la cláusula después de nuestra llamada.",
      speaker: "dani",
      cast: ["dani", "vale"],
      lines: [
        {
          speaker: "dani",
          text: "I compared both files. Houston added the clause after our call.",
          es: "Comparé ambos archivos. Houston agregó la cláusula después de nuestra llamada."
        },
        {
          speaker: "vale",
          text: "So Renata received a version we never approved. No wonder she is upset.",
          es: "Entonces Renata recibió una versión que nunca aprobamos. Con razón está molesta."
        },
        {
          speaker: "dani",
          text: "Exactly. Our copy is clean; hers has one extra paragraph.",
          es: "Exacto. Nuestra copia está limpia; la de ella tiene un párrafo extra."
        }
      ],
      words: [
        { word: "clause", es: "cláusula" },
        { word: "approved", es: "aprobamos" },
        { word: "extra", es: "extra" }
      ]
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Vale explains to Renata on the screen that the error came from the process.",
      text: "Renata, what I mean is that the error came from the document process, not from you.",
      es: "Renata, lo que quiero decir es que el error vino del proceso de documentos, no de usted.",
      speaker: "vale",
      cast: ["vale", "renata"],
      lines: [
        {
          speaker: "vale",
          text: "Renata, what I mean is that the error came from the document process, not from you.",
          es: "Renata, lo que quiero decir es que el error vino del proceso de documentos, no de usted."
        },
        {
          speaker: "renata",
          text: "So I am not crazy. The paper really says exclusive.",
          es: "Entonces no estoy loca. El papel sí dice exclusivo."
        },
        {
          speaker: "vale",
          text: "It does, and it should not. We will fix it today.",
          es: "Así es, y no debería. Lo corregiremos hoy."
        }
      ],
      words: [
        { word: "error", es: "error" },
        { word: "process", es: "proceso" },
        { word: "fix", es: "corregir" }
      ]
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Mr. Reed joins remotely from Houston to admit the mistake on a video screen.",
      text: "Houston assumed the partnership was exclusive. That assumption was wrong.",
      es: "Houston asumió que la alianza era exclusiva. Esa suposición fue un error.",
      speaker: "reed",
      cast: ["reed", "vale"],
      lines: [
        {
          speaker: "reed",
          text: "Houston assumed the partnership was exclusive. That assumption was wrong.",
          es: "Houston asumió que la alianza era exclusiva. Esa suposición fue un error."
        },
        {
          speaker: "vale",
          text: "Thank you for saying it on the call, Mr. Reed. Renata deserves to hear it from you.",
          es: "Gracias por decirlo en la llamada, señor Reed. Renata merece escucharlo de usted."
        },
        {
          speaker: "reed",
          text: "Ms. Renata, my team added that clause without asking Vale. I apologize.",
          es: "Señora Renata, mi equipo agregó esa cláusula sin preguntarle a Vale. Me disculpo."
        }
      ],
      words: [
        { word: "assumed", es: "asumió" },
        { word: "assumption", es: "suposición" },
        { word: "apologize", es: "disculparse" }
      ]
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Camila prepares a corrected invoice at her desk during the call.",
      text: "I will follow up with a corrected invoice today.",
      es: "Daré seguimiento con una factura corregida hoy.",
      speaker: "camila",
      cast: ["camila", "dani"],
      lines: [
        {
          speaker: "camila",
          text: "I will follow up with a corrected invoice today.",
          es: "Daré seguimiento con una factura corregida hoy."
        },
        {
          speaker: "dani",
          text: "I can send the clean contract too, with the date of our original call on top.",
          es: "También puedo enviar el contrato limpio, con la fecha de nuestra llamada original arriba."
        },
        {
          speaker: "camila",
          text: "Perfect. Renata will have both documents before dinner.",
          es: "Perfecto. Renata tendrá ambos documentos antes de la cena."
        }
      ],
      words: [
        { word: "invoice", es: "factura" },
        { word: "corrected", es: "corregida" },
        { word: "original", es: "original" }
      ]
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Vale summarizes the agreement clearly for everyone on the call.",
      text: "Let us straighten this out: no exclusivity fee, and no hidden condition.",
      es: "Aclaremos esto: sin tarifa de exclusividad y sin condición oculta.",
      speaker: "vale",
      cast: ["vale", "renata"],
      lines: [
        {
          speaker: "vale",
          text: "Let us straighten this out: no exclusivity fee, and no hidden condition.",
          es: "Aclaremos esto: sin tarifa de exclusividad y sin condición oculta."
        },
        {
          speaker: "renata",
          text: "And if Houston changes the paper again?",
          es: "¿Y si Houston cambia el papel otra vez?"
        },
        {
          speaker: "vale",
          text: "Then you call me directly, and the contract dies that same day.",
          es: "Entonces me llama directamente, y el contrato muere ese mismo día."
        }
      ],
      words: [
        { word: "fee", es: "tarifa" },
        { word: "hidden", es: "oculta" },
        { word: "directly", es: "directamente" }
      ]
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "Renata smiles for the first time and offers a smaller next step.",
      text: "Now we are on the same page. I can discuss a pilot, not a takeover.",
      es: "Ahora estamos en la misma sintonía. Puedo discutir un piloto, no una adquisición.",
      speaker: "renata",
      cast: ["renata", "camila"],
      lines: [
        {
          speaker: "renata",
          text: "Now we are on the same page. I can discuss a pilot, not a takeover.",
          es: "Ahora estamos en la misma sintonía. Puedo discutir un piloto, no una adquisición."
        },
        {
          speaker: "camila",
          text: "A pilot in one school, three months, with clear goals we both measure.",
          es: "Un piloto en una escuela, tres meses, con metas claras que ambas medimos."
        },
        {
          speaker: "renata",
          text: "Three months. And I choose the school.",
          es: "Tres meses. Y yo elijo la escuela."
        }
      ],
      words: [
        { word: "pilot", es: "piloto" },
        { word: "takeover", es: "adquisición" },
        { word: "goals", es: "metas" }
      ]
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Vale agrees to the pilot and lets results decide the future.",
      text: "A pilot is enough. Results can decide what happens next.",
      es: "Un piloto es suficiente. Los resultados pueden decidir qué pasa después.",
      speaker: "vale",
      cast: ["vale", "dani"],
      lines: [
        {
          speaker: "vale",
          text: "A pilot is enough. Results can decide what happens next.",
          es: "Un piloto es suficiente. Los resultados pueden decidir qué pasa después."
        },
        {
          speaker: "dani",
          text: "If her students speak like ours after three months, the expansion sells itself.",
          es: "Si sus estudiantes hablan como los nuestros después de tres meses, la expansión se vende sola."
        },
        {
          speaker: "vale",
          text: "And if they do not, we walk away with respect. That is the deal.",
          es: "Y si no, nos retiramos con respeto. Ese es el trato."
        }
      ],
      words: [
        { word: "enough", es: "suficiente" },
        { word: "results", es: "resultados" },
        { word: "walk away", es: "retirarse" }
      ]
    },
    {
      id: "s10",
      image: s10,
      imageAlt: "Renata raises the stakes with a challenge between schools.",
      text: "Then prove it. My best school will compete against your Guatemala office.",
      es: "Entonces demuéstrelo. Mi mejor escuela competirá contra su oficina de Guatemala.",
      speaker: "renata",
      cast: ["renata", "vale"],
      lines: [
        {
          speaker: "renata",
          text: "Then prove it. My best school will compete against your Guatemala office.",
          es: "Entonces demuéstrelo. Mi mejor escuela competirá contra su oficina de Guatemala."
        },
        {
          speaker: "vale",
          text: "A friendly competition. Same exam, same month, students from both schools.",
          es: "Una competencia amistosa. Mismo examen, mismo mes, estudiantes de ambas escuelas."
        },
        {
          speaker: "renata",
          text: "Friendly but serious. My students do not like to lose.",
          es: "Amistosa pero seria. A mis estudiantes no les gusta perder."
        }
      ],
      words: [
        { word: "prove", es: "demostrar" },
        { word: "exam", es: "examen" },
        { word: "lose", es: "perder" }
      ]
    },
    {
      id: "s11",
      image: s11,
      imageAlt: "Dani receives an urgent call from Lucía during the meeting.",
      text: "Vale, Lucía is calling. Something went wrong in the first class.",
      es: "Vale, Lucía está llamando. Algo salió mal en la primera clase.",
      speaker: "dani",
      cast: ["dani", "vale"],
      lines: [
        {
          speaker: "dani",
          text: "Vale, Lucía is calling. Something went wrong in the first class.",
          es: "Vale, Lucía está llamando. Algo salió mal en la primera clase."
        },
        {
          speaker: "vale",
          text: "Renata, give me one minute. A class problem always comes first.",
          es: "Renata, déme un minuto. Un problema de clase siempre va primero."
        },
        {
          speaker: "renata",
          text: "Take your time. How you handle bad news tells me more than any contract.",
          es: "Tómese su tiempo. Cómo maneja las malas noticias me dice más que cualquier contrato."
        }
      ],
      words: [
        { word: "urgent", es: "urgente" },
        { word: "handle", es: "manejar" },
        { word: "bad news", es: "malas noticias" }
      ]
    }
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s3",
      questionEn: "Why is Renata upset at the beginning?",
      questionEs: "¿Por qué está molesta Renata al principio?",
      options: [
        {
          label: "Her contract says Mexico is exclusive, a clause Houston added.",
          emoji: "📄"
        },
        {
          label: "Her students failed the exam.",
          emoji: "📝"
        },
        {
          label: "Vale raised the price.",
          emoji: "💰"
        }
      ],
      answer: 0,
      sayIt: "Renata is upset because Houston added an exclusivity clause.",
      sayItEs: "Ejemplo: «Renata is upset because Houston added an exclusivity clause.»",
      sayItAskEn: "Why is Renata upset?",
      sayItAskEs: "¿Por qué está molesta Renata?",
      sayItCheck: {
        target: "* clause *",
        altTargets: [
          "Because *",
          "Houston added *",
          "She is upset *"
        ]
      }
    },
    {
      id: "q2",
      afterScene: "s7",
      questionEn: "How does Vale solve the contract problem?",
      questionEs: "¿Cómo resuelve Vale el problema del contrato?",
      options: [
        {
          label: "No exclusivity fee, no hidden condition, and corrected documents today.",
          emoji: "✅"
        },
        {
          label: "She cancels the partnership forever.",
          emoji: "🚫"
        },
        {
          label: "She asks Renata to pay anyway.",
          emoji: "🤑"
        }
      ],
      answer: 0,
      sayIt: "She removes the fee and sends corrected documents the same day.",
      sayItEs: "Ejemplo: «She removes the fee and sends corrected documents the same day.»",
      sayItAskEn: "What does Vale promise to fix?",
      sayItAskEs: "¿Qué promete corregir Vale?",
      sayItCheck: {
        target: "* no exclusivity *",
        altTargets: [
          "She removes *",
          "She fixes *",
          "No hidden *"
        ]
      }
    },
    {
      id: "q3",
      afterScene: "s11",
      questionEn: "What happens right at the end of the episode?",
      questionEs: "¿Qué pasa justo al final del episodio?",
      options: [
        {
          label: "Lucía calls: something went wrong in the first class.",
          emoji: "📞"
        },
        {
          label: "Renata signs the full contract.",
          emoji: "🖊️"
        },
        {
          label: "The team celebrates with a party.",
          emoji: "🎉"
        }
      ],
      answer: 0,
      sayIt: "Lucía calls because something went wrong in the first class.",
      sayItEs: "Ejemplo: «Lucía calls because something went wrong in the first class.»",
      sayItAskEn: "What bad news arrives at the end?",
      sayItAskEs: "¿Qué mala noticia llega al final?",
      sayItCheck: {
        target: "* went wrong *",
        altTargets: [
          "Something went wrong *",
          "Lucía is calling *",
          "A problem *"
        ]
      }
    }
  ],
  mindsetCard: {
    afterScene: "s6",
    phrase: "I can do hard things. Mistakes are part of the process.",
    es: "Puedo hacer cosas difíciles. Los errores son parte del proceso."
  },
  habitCard: {
    afterScene: "s4",
    phrase: "English is easy when I listen, clarify, and speak again.",
    es: "El inglés es fácil cuando escucho, aclaro y vuelvo a hablar.",
    model: "vale",
    modelActionEs: "Vale escucha, aclara y responde con calma."
  },
  expressions: [
    {
      phrase: "follow up",
      es: "dar seguimiento",
      kind: "phrasal",
      example: "I will follow up with a corrected invoice today.",
      exampleEs: "Daré seguimiento con una factura corregida hoy."
    },
    {
      phrase: "straighten out",
      variants: ["straighten this out"],
      es: "aclarar y resolver",
      kind: "phrasal",
      example: "Let us straighten this out: no exclusivity fee, and no hidden condition.",
      exampleEs: "Aclaremos esto: sin tarifa de exclusividad y sin condición oculta."
    },
    {
      phrase: "on the same page",
      es: "estar en la misma sintonía",
      kind: "idiom",
      example: "Now we are on the same page. I can discuss a pilot, not a takeover.",
      exampleEs: "Ahora estamos en la misma sintonía. Puedo discutir un piloto, no una adquisición."
    }
  ],
  finaleSeconds: 45,
  continuePrompt: {
    en: "Your turn, 45 seconds: explain the problem, compare the options, and defend your decision.",
    es: "Tu turno, 45 segundos: explica el problema, compara las opciones y defiende tu decisión."
  },
  continueWith: [
    "The main issue is ...",
    "If I were responsible, I would ...",
    "The best option is ... because ..."
  ],
  cliffhanger: {
    en: "Vale, Lucía is calling. Something went wrong in the first class.",
    es: "Vale, Lucía está llamando. Algo salió mal en la primera clase."
  }
};
