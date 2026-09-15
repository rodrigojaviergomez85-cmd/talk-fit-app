import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/sharks-ep12-say-it-in-numbers/cover.jpg";
import s1 from "@/assets/storybook/sharks-ep12-say-it-in-numbers/s1.jpg";
import s2 from "@/assets/storybook/sharks-ep12-say-it-in-numbers/s2.jpg";
import s3 from "@/assets/storybook/sharks-ep12-say-it-in-numbers/s3.jpg";
import s4 from "@/assets/storybook/sharks-ep12-say-it-in-numbers/s4.jpg";
import s5 from "@/assets/storybook/sharks-ep12-say-it-in-numbers/s5.jpg";
import s6 from "@/assets/storybook/sharks-ep12-say-it-in-numbers/s6.jpg";
import s7 from "@/assets/storybook/sharks-ep12-say-it-in-numbers/s7.jpg";
import s8 from "@/assets/storybook/sharks-ep12-say-it-in-numbers/s8.jpg";
import s9 from "@/assets/storybook/sharks-ep12-say-it-in-numbers/s9.jpg";
import s10 from "@/assets/storybook/sharks-ep12-say-it-in-numbers/s10.jpg";
import s11 from "@/assets/storybook/sharks-ep12-say-it-in-numbers/s11.jpg";

export const SHARKS_EP12_SAY_IT_IN_NUMBERS: StorybookEpisode = {
  id: "sharks-ep12-say-it-in-numbers",
  moduleId: "sharks",
  week: 3,
  title: "Say it in numbers",
  titleEs: "Dilo con números",
  episodeLabel: {
    en: "Season 8 · Episode 12",
    es: "Temporada 8 · Episodio 12"
  },
  previously: [
    {
      en: "Vale can tell the story. Now she has to tell it in numbers.",
      es: "Vale sabe contar la historia. Ahora tiene que contarla con números."
    }
  ],
  reviewWords: [
    { word: "refund", es: "reembolso" },
    { word: "root cause", es: "causa raíz" },
    { word: "checklist", es: "lista de verificación" }
  ],
  blurb: {
    en: "Our quarterly revenue went up eleven percent, but the margin stayed flat. The investor wants a meeting.",
    es: "Nuestros ingresos trimestrales subieron once por ciento, pero el margen se quedó igual. El inversionista quiere una reunión."
  },
  cover: cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Camila presents the quarterly numbers on a screen in the academy office.",
      text: "Our quarterly revenue went up eleven percent, but the margin stayed flat.",
      es: "Nuestros ingresos trimestrales subieron once por ciento, pero el margen se quedó igual.",
      speaker: "camila",
      cast: ["camila", "vale"],
      lines: [
        {
          speaker: "camila",
          text: "Our quarterly revenue went up eleven percent, but the margin stayed completely flat.",
          es: "Nuestros ingresos trimestrales subieron once por ciento, pero el margen se quedó igual."
        },
        {
          speaker: "vale",
          text: "Eleven percent up is good news. A flat margin is the question we have to answer today.",
          es: "Once por ciento arriba es buena noticia. El margen plano es la pregunta."
        },
        {
          speaker: "camila",
          text: "Exactly. We are selling more and more every month, but we are not keeping more at the end of it.",
          es: "Exacto. Vendemos más cada mes, pero no nos queda más al final."
        }
      ],
      words: [
        { word: "quarterly", es: "trimestral" },
        { word: "revenue", es: "ingresos" },
        { word: "margin", es: "margen" }
      ]
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Vale asks the team to review the costs before celebrating.",
      text: "Then let us break down the costs line by line before we celebrate anything.",
      es: "Entonces desglosemos los costos línea por línea antes de celebrar.",
      speaker: "vale",
      cast: ["vale", "dani"],
      lines: [
        {
          speaker: "vale",
          text: "Then let us break down the costs line by line before we celebrate.",
          es: "Entonces desglosemos los costos línea por línea antes de celebrar."
        },
        {
          speaker: "dani",
          text: "I have the full list here: teachers, platform, rent, marketing, and the new video server.",
          es: "Aquí tengo la lista completa: maestros, plataforma, alquiler, marketing y el nuevo servidor de video."
        },
        {
          speaker: "vale",
          text: "Perfect. Celebration comes after understanding, not before, and today we understand the numbers first.",
          es: "Perfecto. La celebración viene después de entender, no antes, y hoy entendemos primero."
        }
      ],
      words: [
        { word: "costs", es: "costos" },
        { word: "line by line", es: "línea por línea" },
        { word: "rent", es: "alquiler" }
      ]
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Dani points at the biggest cost on the spreadsheet.",
      text: "Teacher hours are the biggest cost. The average class costs us nine dollars right now.",
      es: "Las horas de los maestros son el costo más grande. La clase promedio nos cuesta nueve dólares.",
      speaker: "dani",
      cast: ["dani", "camila"],
      lines: [
        {
          speaker: "dani",
          text: "Teacher hours are the biggest cost. The average class costs us nine dollars.",
          es: "Las horas de los maestros son el costo más grande. La clase promedio nos cuesta nueve dólares."
        },
        {
          speaker: "camila",
          text: "And the average student pays fourteen, so each class leaves only five for us.",
          es: "Y el estudiante promedio paga catorce, así que cada clase deja cinco."
        },
        {
          speaker: "dani",
          text: "Five dollars per class before rent and platform. That is the real margin problem we have to solve this quarter.",
          es: "Cinco dólares antes de alquiler y plataforma. Ese es el verdadero problema de margen que debemos resolver este trimestre."
        }
      ],
      words: [
        { word: "average", es: "promedio" },
        { word: "per class", es: "por clase" },
        { word: "real", es: "verdadero" }
      ]
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Camila shares the good retention numbers with the team.",
      text: "Retention is ninety-four percent, so churn is very low for this market.",
      es: "La retención es noventa y cuatro por ciento, así que la fuga es muy baja para este mercado.",
      speaker: "camila",
      cast: ["camila", "vale"],
      lines: [
        {
          speaker: "camila",
          text: "Retention is ninety-four percent, so churn is very low for this kind of market.",
          es: "La retención es noventa y cuatro por ciento, así que la fuga es muy baja para este mercado."
        },
        {
          speaker: "vale",
          text: "Ninety-four percent means students stay because they speak. That is our best number of all.",
          es: "Noventa y cuatro por ciento significa que los estudiantes se quedan porque hablan. Es nuestro mejor número."
        },
        {
          speaker: "camila",
          text: "It is. BigTalk loses almost twenty percent of their students every quarter, and they spend double on ads.",
          es: "Lo es. BigTalk pierde casi veinte por ciento de estudiantes cada trimestre, y gastan el doble en anuncios."
        }
      ],
      words: [
        { word: "retention", es: "retención" },
        { word: "churn", es: "fuga de clientes" },
        { word: "market", es: "mercado" }
      ]
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Vale explains how to present the numbers clearly.",
      text: "Good. In a proposal, the numbers speak for themselves if we present them clearly, honestly, and in the right order.",
      es: "Bien. En una propuesta, los números hablan por sí solos si los presentamos con claridad.",
      speaker: "vale",
      cast: ["vale", "camila"],
      lines: [
        {
          speaker: "vale",
          text: "Good. In a proposal, the numbers speak for themselves if we present them clearly.",
          es: "Bien. En una propuesta, los números hablan por sí solos si los presentamos con claridad."
        },
        {
          speaker: "camila",
          text: "So: one number, one meaning, one decision. No walls of data that nobody reads.",
          es: "Entonces: un número, un significado, una decisión. Sin muros de datos que nadie lee."
        },
        {
          speaker: "vale",
          text: "Exactly. Nobody remembers twenty numbers. Everyone remembers three good ones.",
          es: "Exacto. Nadie recuerda veinte números. Todos recuerdan tres."
        }
      ],
      words: [
        { word: "proposal", es: "propuesta" },
        { word: "clearly", es: "con claridad" },
        { word: "remember", es: "recordar" }
      ]
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Dani shows a forecast spreadsheet for the next two quarters.",
      text: "I built a spreadsheet with the full forecast for the next two quarters, including the Mexico pilot.",
      es: "Hice una hoja de cálculo con el pronóstico para los próximos dos trimestres.",
      speaker: "dani",
      cast: ["dani", "vale"],
      lines: [
        {
          speaker: "dani",
          text: "I built a spreadsheet with the forecast for the next two quarters.",
          es: "Hice una hoja de cálculo con el pronóstico para los próximos dos trimestres."
        },
        {
          speaker: "vale",
          text: "Does it include the Mexico pilot with Renata and her six schools?",
          es: "¿Incluye el piloto de México con Renata?"
        },
        {
          speaker: "dani",
          text: "Yes, with three scenarios: slow, normal, and the one Renata dreams about at night.",
          es: "Sí, con tres escenarios: lento, normal y el con el que Renata sueña de noche."
        }
      ],
      words: [
        { word: "spreadsheet", es: "hoja de cálculo" },
        { word: "forecast", es: "pronóstico" },
        { word: "scenario", es: "escenario" }
      ]
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Vale tests the forecast with a harder question.",
      text: "Does the whole forecast add up if Mexico starts in March instead of January?",
      es: "¿El pronóstico cuadra si México empieza en marzo en lugar de enero?",
      speaker: "vale",
      cast: ["vale", "dani", "camila"],
      lines: [
        {
          speaker: "vale",
          text: "Does the forecast add up if Mexico starts in March instead of January?",
          es: "¿El pronóstico cuadra si México empieza en marzo en lugar de enero?"
        },
        {
          speaker: "camila",
          text: "It still adds up, but the growth is slower and the budget gets tight in April and May.",
          es: "Todavía cuadra, pero el crecimiento es más lento y el presupuesto se aprieta en abril y mayo."
        },
        {
          speaker: "vale",
          text: "Tight is okay. Broken is not. We can survive slow, not empty, and slow gives us time to train the new teachers well.",
          es: "Apretado está bien. Roto no. Podemos sobrevivir lento, no vacío, y lo lento nos da tiempo de capacitar bien a los nuevos maestros."
        }
      ],
      words: [
        { word: "instead of", es: "en lugar de" },
        { word: "growth", es: "crecimiento" },
        { word: "tight", es: "apretado" }
      ]
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "Dani reports two late invoices that change the month's estimate.",
      text: "Two invoices are late, and that changes the estimate for this month completely.",
      es: "Dos facturas están atrasadas, y eso cambia la estimación de este mes.",
      speaker: "dani",
      cast: ["dani", "camila"],
      lines: [
        {
          speaker: "dani",
          text: "Two invoices are late, and that changes the estimate for this month.",
          es: "Dos facturas están atrasadas, y eso cambia la estimación de este mes."
        },
        {
          speaker: "camila",
          text: "How late are we talking about? Days or weeks?",
          es: "¿De qué tan atrasadas hablamos?"
        },
        {
          speaker: "dani",
          text: "One is twelve days late, the other three weeks. Both clients answered my email yesterday with excuses.",
          es: "Una de doce días, la otra de tres semanas. Ambos clientes respondieron mi correo ayer con excusas."
        }
      ],
      words: [
        { word: "late", es: "atrasadas" },
        { word: "estimate", es: "estimación" },
        { word: "answered", es: "respondieron" }
      ]
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Vale tells the team to collect the late payments today.",
      text: "Chase them today. A number nobody collects is not revenue, it is hope, and hope does not pay salaries.",
      es: "Cóbralas hoy. Un número que nadie cobra no es ingreso, es esperanza.",
      speaker: "vale",
      cast: ["vale", "camila"],
      lines: [
        {
          speaker: "vale",
          text: "Chase them today. A number nobody collects is not revenue, it is hope.",
          es: "Cóbralas hoy. Un número que nadie cobra no es ingreso, es esperanza."
        },
        {
          speaker: "camila",
          text: "I will call both clients this morning with a friendly reminder and a payment link they can use in two easy clicks.",
          es: "Llamaré a ambos clientes esta mañana con un recordatorio amable y un enlace de pago que pueden usar en dos clics."
        },
        {
          speaker: "vale",
          text: "Friendly first. Firm second. Legal, never, I hope, because lawyers are expensive.",
          es: "Amable primero. Firme después. Legal, nunca, espero."
        }
      ],
      words: [
        { word: "chase", es: "perseguir / cobrar" },
        { word: "collect", es: "cobrar" },
        { word: "reminder", es: "recordatorio" }
      ]
    },
    {
      id: "s10",
      image: s10,
      imageAlt: "The team reviews the three key numbers they will present.",
      text: "So our three numbers are: eleven percent growth, ninety-four percent retention, five dollars per class.",
      es: "Entonces nuestros tres números son: once por ciento de crecimiento, noventa y cuatro de retención, cinco dólares por clase.",
      speaker: "dani",
      cast: ["dani", "vale", "camila"],
      lines: [
        {
          speaker: "dani",
          text: "So our three numbers are: eleven percent growth, ninety-four percent retention, five dollars per class.",
          es: "Entonces nuestros tres números son: once por ciento de crecimiento, noventa y cuatro de retención, cinco dólares por clase."
        },
        {
          speaker: "vale",
          text: "And the story behind them is simple: we grow, students stay, and each class pays for itself.",
          es: "Y la historia detrás de ellos: crecemos, los estudiantes se quedan, y cada clase se paga sola."
        },
        {
          speaker: "camila",
          text: "That is a story any investor can repeat at lunch without opening a single spreadsheet or report.",
          es: "Esa es una historia que cualquier inversionista puede repetir en un almuerzo sin abrir una sola hoja de cálculo."
        }
      ],
      words: [
        { word: "growth", es: "crecimiento" },
        { word: "story", es: "historia" },
        { word: "pays for itself", es: "se paga sola" }
      ]
    },
    {
      id: "s11",
      image: s11,
      imageAlt: "Camila announces that the investor wants a meeting with Vale.",
      text: "Vale, the investor asked for these numbers too. He wants a meeting.",
      es: "Vale, el inversionista también pidió estos números. Quiere una reunión.",
      speaker: "camila",
      cast: ["camila", "vale"],
      lines: [
        {
          speaker: "camila",
          text: "Vale, the investor asked for these numbers too. He wants a meeting.",
          es: "Vale, el inversionista también pidió estos números. Quiere una reunión."
        },
        {
          speaker: "vale",
          text: "Which investor? The one from the education fund, or Renata's friend?",
          es: "¿Cuál inversionista? ¿El del fondo de educación o el amigo de Renata?"
        },
        {
          speaker: "camila",
          text: "Both. They are coming together next Tuesday, and they want to meet the founder and the team in person.",
          es: "Ambos. Vienen juntos el próximo martes, y quieren conocer a la fundadora en persona."
        }
      ],
      words: [
        { word: "investor", es: "inversionista" },
        { word: "meeting", es: "reunión" },
        { word: "founder", es: "fundadora" }
      ]
    }
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s3",
      questionEn: "What is the academy's biggest cost?",
      questionEs: "¿Cuál es el costo más grande de la academia?",
      options: [
        {
          label: "Teacher hours, about nine dollars per class.",
          emoji: "👩‍🏫"
        },
        {
          label: "The office rent.",
          emoji: "🏢"
        },
        {
          label: "The marketing campaigns.",
          emoji: "📣"
        }
      ],
      answer: 0,
      sayIt: "Teacher hours are the biggest cost, nine dollars per class.",
      sayItEs: "Ejemplo: «Teacher hours are the biggest cost, nine dollars per class.»",
      sayItAskEn: "What is the biggest cost and how much is it?",
      sayItAskEs: "¿Cuál es el costo más grande y cuánto es?",
      sayItCheck: {
        target: "Teacher hours *",
        altTargets: [
          "* nine dollars *",
          "The biggest cost is *",
          "Teachers *"
        ]
      }
    },
    {
      id: "q2",
      afterScene: "s7",
      questionEn: "What happens if the Mexico pilot starts in March?",
      questionEs: "¿Qué pasa si el piloto de México empieza en marzo?",
      options: [
        {
          label: "It still adds up, but growth is slower and the budget gets tight.",
          emoji: "📉"
        },
        {
          label: "The academy loses all its money.",
          emoji: "🔥"
        },
        {
          label: "Nothing changes at all.",
          emoji: "😴"
        }
      ],
      answer: 0,
      sayIt: "It still adds up, but growth is slower and the budget gets tight.",
      sayItEs: "Ejemplo: «It still adds up, but growth is slower and the budget gets tight.»",
      sayItAskEn: "What changes if Mexico starts later?",
      sayItAskEs: "¿Qué cambia si México empieza más tarde?",
      sayItCheck: {
        target: "* adds up *",
        altTargets: [
          "* slower *",
          "The budget *",
          "Growth is *"
        ]
      }
    },
    {
      id: "q3",
      afterScene: "s11",
      questionEn: "What does Camila announce at the end?",
      questionEs: "¿Qué anuncia Camila al final?",
      options: [
        {
          label: "The investors want a meeting with the founder.",
          emoji: "🤝"
        },
        {
          label: "The invoices were never paid.",
          emoji: "🧾"
        },
        {
          label: "The platform failed again.",
          emoji: "💻"
        }
      ],
      answer: 0,
      sayIt: "The investors asked for the numbers and want to meet the founder.",
      sayItEs: "Ejemplo: «The investors asked for the numbers and want to meet the founder.»",
      sayItAskEn: "Who wants a meeting, and with whom?",
      sayItAskEs: "¿Quién quiere una reunión y con quién?",
      sayItCheck: {
        target: "* investor *",
        altTargets: [
          "* meeting *",
          "They want to meet *",
          "The founder *"
        ]
      }
    }
  ],
  mindsetCard: {
    afterScene: "s6",
    phrase: "I can do hard things, even in numbers.",
    es: "Puedo hacer cosas difíciles, incluso con números."
  },
  habitCard: {
    afterScene: "s4",
    phrase: "English is easy when I say the number, then the meaning.",
    es: "El inglés es fácil cuando digo el número y luego el significado.",
    model: "camila",
    modelActionEs: "Camila dice el dato y después lo explica."
  },
  expressions: [
    {
      phrase: "break down",
      variants: ["break down", "breaks down"],
      es: "desglosar en partes",
      kind: "phrasal",
      example: "Then let us break down the costs line by line before we celebrate.",
      exampleEs: "Entonces desglosemos los costos línea por línea antes de celebrar."
    },
    {
      phrase: "add up",
      variants: ["adds up"],
      es: "cuadrar / tener sentido matemático",
      kind: "phrasal",
      example: "Does the forecast add up if Mexico starts in March instead of January?",
      exampleEs: "¿El pronóstico cuadra si México empieza en marzo en lugar de enero?"
    },
    {
      phrase: "the numbers speak for themselves",
      es: "los resultados son evidentes por sí solos",
      kind: "idiom",
      example: "In a proposal, the numbers speak for themselves if we present them clearly.",
      exampleEs: "En una propuesta, los números hablan por sí solos si los presentamos con claridad."
    }
  ],
  finaleSeconds: 30,
  continuePrompt: {
    en: "Your turn, 30 seconds: report three numbers and say what they mean for the business.",
    es: "Tu turno, 30 segundos: reporta tres números y di qué significan para el negocio."
  },
  continueWith: [
    "Revenue went up ...",
    "The margin is ... because ...",
    "My forecast for next month is ..."
  ],
  cliffhanger: {
    en: "Vale, the investor asked for these numbers too. He wants a meeting.",
    es: "Vale, el inversionista también pidió estos números. Quiere una reunión."
  }
};
