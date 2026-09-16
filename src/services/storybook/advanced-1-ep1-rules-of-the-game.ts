import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/advanced1-ep1-rules-of-the-game/cover.jpg";
import s1 from "@/assets/storybook/advanced1-ep1-rules-of-the-game/s1.jpg";
import s2 from "@/assets/storybook/advanced1-ep1-rules-of-the-game/s2.jpg";
import s3 from "@/assets/storybook/advanced1-ep1-rules-of-the-game/s3.jpg";
import s4 from "@/assets/storybook/advanced1-ep1-rules-of-the-game/s4.jpg";
import s5 from "@/assets/storybook/advanced1-ep1-rules-of-the-game/s5.jpg";
import s6 from "@/assets/storybook/advanced1-ep1-rules-of-the-game/s6.jpg";
import s7 from "@/assets/storybook/advanced1-ep1-rules-of-the-game/s7.jpg";
import s8 from "@/assets/storybook/advanced1-ep1-rules-of-the-game/s8.jpg";
import s9 from "@/assets/storybook/advanced1-ep1-rules-of-the-game/s9.jpg";

export const ADVANCED1_EP1_RULES_OF_THE_GAME: StorybookEpisode = {
  "id": "advanced1-ep1-rules-of-the-game",
  "moduleId": "advanced-1",
  "week": 1,
  "title": "The rules of the game",
  "titleEs": "Las reglas del juego",
  "episodeLabel": {
    "en": "Advanced 1 · Episode 1",
    "es": "Advanced 1 · Episodio 1",
  },
  "previously": [
    {
      "en": "Vale signed the regional agreement with Renata, and Vale Kids will open in Mexico in April.",
      "es": "Vale firmó el acuerdo regional con Renata, y Vale Kids abrirá en México en abril.",
    },
    {
      "en": "Dani was offered a scholarship, but he chose to stay and build the academy he believes in.",
      "es": "A Dani le ofrecieron una beca, pero eligió quedarse a construir la academia en la que cree.",
    },
    {
      "en": "The academy has three programs now, but a bigger stage is about to test them.",
      "es": "La academia ya tiene tres programas, pero un escenario más grande está a punto de ponerlos a prueba.",
    },
  ],
  "reviewWords": [
    {
      "word": "deal",
      "es": "trato; acuerdo",
    },
    {
      "word": "growth",
      "es": "crecimiento",
    },
    {
      "word": "team",
      "es": "equipo",
    },
    {
      "word": "reputation",
      "es": "reputación",
    },
    {
      "word": "program",
      "es": "programa",
    },
  ],
  "blurb": {
    "en": "An international committee wants an English academy for its own employees, and Vale has two weeks to prove hers is the right one.",
    "es": "Un comité internacional busca una academia de inglés para sus propios empleados, y Vale tiene dos semanas para demostrar que la suya es la correcta.",
  },
  "cover": cover,
  "voice": "girl",
  "scenes": [
    {
      "id": "s1",
      "image": s1,
      "imageAlt": "Vale, Dani and Camila talk on Monday morning in the academy office, with a laptop and a blurred whiteboard behind them.",
      "text": "Monday. Vale has big news: a committee wants an English program, and her academy is competing for it.",
      "es": "Lunes. Vale tiene una gran noticia: un comité quiere un programa de inglés, y su academia está compitiendo por él.",
      "speaker": "vale",
      "cast": ["vale", "dani", "camila"],
      "lines": [
        {
          "speaker": "vale",
          "text": "An international committee needs English for its employees, and my academy is competing for the program.",
          "es": "Un comité internacional necesita inglés para sus empleados, y mi academia está compitiendo por el programa.",
        },
        {
          "speaker": "dani",
          "text": "How many academies want those spots?",
          "es": "¿Cuántas academias quieren esos lugares?",
        },
        {
          "speaker": "camila",
          "text": "Four. And what worries me is that this committee never gives second chances; if we lost this one, we would not get another invitation. It is a big deal.",
          "es": "Cuatro. Y lo que me preocupa es que este comité nunca da segundas oportunidades; si perdiéramos esta, no recibiríamos otra invitación. Es algo muy importante.",
        },
      ],
      "words": [
        {
          "word": "committee",
          "es": "comité",
        },
        {
          "word": "competing",
          "es": "compitiendo",
        },
        {
          "word": "spots",
          "es": "lugares; plazas",
        },
      ],
    },
    {
      "id": "s2",
      "image": s2,
      "imageAlt": "The team watches Mr. Reed on a laptop video call in the office.",
      "text": "Vale sets the strategy. Reed agrees: nobody buys a story; they buy what you can prove.",
      "es": "Vale marca la estrategia. Reed coincide: nadie compra una historia; compran lo que puedes demostrar.",
      "speaker": "vale",
      "cast": ["vale", "dani", "camila", "reed"],
      "lines": [
        {
          "speaker": "vale",
          "text": "We have two weeks, so we lead with results: attendance, progress reports, and two client references.",
          "es": "Tenemos dos semanas, así que empezamos con resultados: asistencia, reportes de progreso y dos referencias de clientes.",
        },
        {
          "speaker": "camila",
          "text": "And your founder story. Nobody else can copy that.",
          "es": "Y tu historia como fundadora. Nadie más puede copiar eso.",
        },
        {
          "speaker": "reed",
          "text": "Do not sell a story; sell what can be proved. What separates the winners is simple: the academies that win follow up with visits, documents, and numbers.",
          "es": "No vendas una historia; vende lo que se puede demostrar. Lo que separa a los ganadores es simple: las academias que ganan le dan seguimiento con visitas, documentos y números.",
        },
      ],
      "words": [
        {
          "word": "founder",
          "es": "fundadora",
        },
        {
          "word": "prove",
          "es": "demostrar; comprobar",
        },
        {
          "word": "numbers",
          "es": "números; datos",
        },
      ],
    },
    {
      "id": "s3",
      "image": s3,
      "imageAlt": "Vale takes notes at her desk while Mr. Reed explains his rule on the laptop screen.",
      "text": "Reed shares his rule: a professional introduction has four steps, not a script.",
      "es": "Reed comparte su regla: una presentación profesional tiene cuatro pasos, no un guion memorizado.",
      "speaker": "reed",
      "cast": ["vale", "reed"],
      "lines": [
        {
          "speaker": "reed",
          "text": "Listen to me. A professional introduction has structure, not a script.",
          "es": "Escúchame. Una presentación profesional tiene estructura, no un guion.",
        },
        {
          "speaker": "reed",
          "text": "Say your now, your background, one strength, and one clear goal.",
          "es": "Di tu presente, tu experiencia, una fortaleza y una meta clara.",
        },
        {
          "speaker": "vale",
          "text": "Structure before polish. That is exactly what I teach my students: if they follow those four steps, they never sound memorized, even when they are nervous.",
          "es": "Estructura antes que perfección. Eso es exactamente lo que le enseño a mis estudiantes: si siguen esos cuatro pasos, nunca suenan memorizados, aunque estén nerviosos.",
        },
      ],
      "words": [
        {
          "word": "structure",
          "es": "estructura",
        },
        {
          "word": "background",
          "es": "experiencia; formación",
        },
        {
          "word": "goal",
          "es": "meta; objetivo",
        },
      ],
    },
    {
      "id": "s4",
      "image": s4,
      "imageAlt": "Camila pretends to be the committee and interviews Vale while Dani watches with a notebook.",
      "text": "Camila plays the committee. Vale demonstrates the weak answer on purpose, so the team hears the difference.",
      "es": "Camila hace de comité. Vale demuestra a propósito la respuesta débil, para que el equipo escuche la diferencia.",
      "speaker": "camila",
      "cast": ["vale", "dani", "camila"],
      "lines": [
        {
          "speaker": "camila",
          "text": "Good afternoon. Why should this committee choose your academy?",
          "es": "Buenas tardes. ¿Por qué debería este comité elegir su academia?",
        },
        {
          "speaker": "vale",
          "text": "Weak version first: right now I am focused on my students, my background is teaching, and my strength is that I never give up.",
          "es": "Primero la versión débil: ahora mismo estoy enfocada en mis estudiantes, mi experiencia es enseñar, y mi fortaleza es que nunca me rindo.",
        },
        {
          "speaker": "dani",
          "text": "It is honest; however, it sounds unsure, because nothing in it can be proved.",
          "es": "Es honesta; sin embargo, suena insegura, porque nada de eso se puede demostrar.",
        },
      ],
      "words": [
        {
          "word": "strength",
          "es": "fortaleza",
        },
        {
          "word": "focused",
          "es": "enfocada; concentrada",
        },
        {
          "word": "unsure",
          "es": "inseguro; con dudas",
        },
      ],
    },
    {
      "id": "s5",
      "image": s5,
      "imageAlt": "Vale speaks with confidence while Dani and Camila smile with approval.",
      "text": "Second try. This time Vale sounds clear, calm, and confident.",
      "es": "Segundo intento. Esta vez Vale suena clara, tranquila y segura.",
      "speaker": "vale",
      "cast": ["vale", "dani", "camila"],
      "lines": [
        {
          "speaker": "vale",
          "text": "What your employees need is not another grammar course but English they can use in real meetings. If this program were mine, they would be presenting in English within three months, and every hour would be measured.",
          "es": "Lo que sus empleados necesitan no es otro curso de gramática, sino inglés que puedan usar en reuniones reales. Si este programa fuera mío, estarían presentando en inglés en tres meses, y cada hora estaría medida.",
        },
        {
          "speaker": "camila",
          "text": "That is the version the committee needs: confident, specific, and backed by numbers.",
          "es": "Esa es la versión que el comité necesita: segura, específica y respaldada por números.",
        },
        {
          "speaker": "camila",
          "text": "And speak up; let them hear every word.",
          "es": "Y habla fuerte; que escuchen cada palabra.",
        },
      ],
      "words": [
        {
          "word": "confident",
          "es": "segura; con confianza",
        },
        {
          "word": "real",
          "es": "real; verdadero",
        },
        {
          "word": "word",
          "es": "palabra",
        },
      ],
    },
    {
      "id": "s6",
      "image": s6,
      "imageAlt": "Vale sits in front of her laptop on the real welcome call, with Reed and two blurred committee members on screen.",
      "text": "The real welcome call begins. The committee asks for a professional introduction, and the room goes quiet.",
      "es": "Empieza la verdadera llamada de bienvenida. El comité pide una presentación profesional y la sala se queda en silencio.",
      "speaker": "reed",
      "cast": ["vale", "reed"],
      "lines": [
        {
          "speaker": "reed",
          "text": "Welcome to the first call. Vale, can you introduce yourself professionally?",
          "es": "Bienvenidos a la primera llamada. Vale, ¿puedes presentarte profesionalmente?",
        },
        {
          "speaker": "narrator",
          "text": "For a second, nobody speaks.",
          "es": "Por un segundo, nadie habla.",
        },
      ],
      "words": [
        {
          "word": "welcome",
          "es": "bienvenida",
        },
        {
          "word": "introduce",
          "es": "presentar(se)",
        },
        {
          "word": "professionally",
          "es": "profesionalmente",
        },
      ],
    },
    {
      "id": "s7",
      "image": s7,
      "imageAlt": "Vale laughs with relief, Dani gives a thumbs up and Camila claps while Reed smiles on the laptop screen.",
      "text": "Vale uses the four steps on the real call. The committee notices.",
      "es": "Vale usa los cuatro pasos en la llamada real. El comité lo nota.",
      "speaker": "vale",
      "cast": ["vale", "dani", "camila", "reed"],
      "lines": [
        {
          "speaker": "vale",
          "text": "Right now I lead an academy where adults have been speaking English every single day for two years. My background is teaching; what I have built since then is a method, not a classroom. One strength is clear communication, and my goal is a program your team would actually finish.",
          "es": "Ahora mismo dirijo una academia donde adultos han estado hablando inglés todos los días durante dos años. Mi experiencia es la enseñanza; lo que he construido desde entonces es un método, no un salón. Una fortaleza es la comunicación clara, y mi meta es un programa que su equipo sí terminaría.",
        },
        {
          "speaker": "narrator",
          "text": "A committee member smiles and says: that was a professional introduction.",
          "es": "Un miembro del comité sonríe y dice: esa fue una presentación profesional.",
        },
        {
          "speaker": "camila",
          "text": "They told me afterwards that no other academy had answered with documents. What made the difference was evidence, not confidence.",
          "es": "Me dijeron después que ninguna otra academia había respondido con documentos. Lo que marcó la diferencia fue la evidencia, no la confianza.",
        },
      ],
      "words": [
        {
          "word": "introduction",
          "es": "presentación",
        },
        {
          "word": "afterwards",
          "es": "después; más tarde",
        },
        {
          "word": "evidence",
          "es": "evidencia; pruebas",
        },
      ],
    },
    {
      "id": "s8",
      "image": s8,
      "imageAlt": "The team laughs together with coffee mugs, celebrating in the warm afternoon light.",
      "text": "The team celebrates, but Reed reminds them: this was only the first step.",
      "es": "El equipo celebra, pero Reed les recuerda: esto fue solo el primer paso.",
      "speaker": "vale",
      "cast": ["vale", "dani", "camila"],
      "lines": [
        {
          "speaker": "vale",
          "text": "We did it. They asked for a professional introduction, and our proof did the work.",
          "es": "Lo logramos. Pidieron una presentación profesional, y nuestras pruebas hicieron el trabajo.",
        },
        {
          "speaker": "dani",
          "text": "This was only step one, but what a step.",
          "es": "Esto fue solo el paso uno, pero vaya paso.",
        },
        {
          "speaker": "camila",
          "text": "Friday they will want more, Vale. Your turn is coming.",
          "es": "El viernes van a querer más, Vale. Tu turno se acerca.",
        },
      ],
      "words": [
        {
          "word": "proof",
          "es": "prueba; evidencia",
        },
        {
          "word": "step",
          "es": "paso",
        },
        {
          "word": "turn",
          "es": "turno",
        },
      ],
    },
    {
      "id": "s9",
      "image": s9,
      "imageAlt": "Camila shows a message on her laptop to Vale and Dani; all three look serious in the evening light.",
      "text": "At night, a message arrives: on Friday, Vale must tell one true story from her past, clearly and in order.",
      "es": "Por la noche llega un mensaje: el viernes, Vale debe contar una historia verdadera de su pasado, con claridad y en orden.",
      "speaker": "camila",
      "cast": ["vale", "dani", "camila"],
      "lines": [
        {
          "speaker": "camila",
          "text": "Vale, the committee wrote. They said that on Friday they would not be asking for numbers; what they want is you.",
          "es": "Vale, el comité escribió. Dijeron que el viernes no estarían pidiendo números; lo que quieren es a ti.",
        },
        {
          "speaker": "vale",
          "text": "What do they want to hear?",
          "es": "¿Qué quieren escuchar?",
        },
        {
          "speaker": "camila",
          "text": "One true story from your past, told clearly, in order, with a beginning and an end.",
          "es": "Una historia verdadera de tu pasado, contada con claridad, en orden, con un inicio y un final.",
        },
      ],
      "words": [
        {
          "word": "true",
          "es": "verdadera; real",
        },
        {
          "word": "clearly",
          "es": "con claridad",
        },
        {
          "word": "order",
          "es": "orden",
        },
      ],
    },
  ],
  "quizzes": [
    {
      "id": "q1",
      "afterScene": "s5",
      "questionEn": "What are the four steps of a professional introduction?",
      "questionEs": "¿Cuáles son los cuatro pasos de una presentación profesional?",
      "options": [
        {
          "label": "Name, age, address, and hobby",
          "emoji": "🏠",
        },
        {
          "label": "Now, background, strength, and goal",
          "emoji": "🎯",
        },
        {
          "label": "Joke, story, joke, goodbye",
          "emoji": "😅",
        },
      ],
      "answer": 1,
      "sayIt": "Now, background, strength, and goal.",
      "sayItEs": "Presente, experiencia, fortaleza y meta.",
      "sayItCheck": {
        "target": "Now, background, strength, and goal",
        "altTargets": [
          "The four steps are now, background, strength, and goal",
          "Now background strength and goal",
        ],
      },
    },
    {
      "id": "q2",
      "afterScene": "s7",
      "questionEn": "Your turn: introduce yourself professionally. Say what you are doing now, one strength with proof, and the goal you are working towards.",
      "questionEs": "Tu turno: preséntate profesionalmente. Di qué estás haciendo ahora, una fortaleza con prueba y la meta hacia la que trabajas.",
      "options": [
        {
          "label": "I am ready to answer",
          "emoji": "🎤",
        },
        {
          "label": "I prefer to listen first",
          "emoji": "👂",
        },
        {
          "label": "I will practice later",
          "emoji": "⏰",
        },
      ],
      "answer": 0,
      "sayIt": "Right now, I am working in customer service, and one of my strengths is staying calm; for example, last month I handled forty calls a day. What I am working towards is a position where English is used every day.",
      "sayItEs": "Ahora mismo estoy trabajando en servicio al cliente, y una de mis fortalezas es mantener la calma; por ejemplo, el mes pasado atendí cuarenta llamadas al día. Hacia lo que trabajo es un puesto donde se use inglés todos los días.",
      "sayItAskEn": "What are you doing right now, what is one strength with proof, and what is your goal?",
      "sayItAskEs": "¿Qué estás haciendo ahora, cuál es una fortaleza con prueba y cuál es tu meta?",
      "sayItCheck": {
        "target": "Right now, I am *",
        "altTargets": [
          "Right now, I am focused on *",
          "I am focused on *",
          "I am learning *",
        ],
      },
    },
  ],
  "mindsetCard": {
    "afterScene": "s7",
    "phrase": "A clear structure beats a memorized script.",
    "es": "Una estructura clara le gana a un guion memorizado.",
  },
  "habitCard": {
    "afterScene": "s3",
    "phrase": "English is easier when I follow a structure, not a script.",
    "es": "El inglés es más fácil cuando sigo una estructura, no un guion.",
    "model": "reed",
    "modelActionEs": "Reed le enseñó a Vale los cuatro pasos en lugar de memorizar frases.",
  },
  "expressions": [
    {
      "phrase": "follow up",
      "variants": ["follows up", "followed up", "following up"],
      "es": "dar seguimiento",
      "kind": "phrasal",
      "example": "The academies that win follow up with visits, documents, and numbers.",
      "exampleEs": "Las academias que ganan le dan seguimiento con visitas, documentos y números.",
    },
    {
      "phrase": "speak up",
      "variants": ["speaks up", "spoke up", "speaking up"],
      "es": "hablar fuerte; alzar la voz",
      "kind": "phrasal",
      "example": "And speak up; let them hear every word.",
      "exampleEs": "Y habla fuerte; que escuchen cada palabra.",
    },
    {
      "phrase": "a big deal",
      "es": "algo muy importante",
      "kind": "idiom",
      "example": "This committee does not give second chances; it is a big deal.",
      "exampleEs": "Este comité no da segundas oportunidades; es algo muy importante.",
    },
  ],
  "finaleSeconds": 30,
  "continuePrompt": {
    "en": "Introduce yourself professionally: your now, your background, one strength, and one goal.",
    "es": "Preséntate profesionalmente: tu presente, tu experiencia, una fortaleza y una meta.",
  },
  "continueWith": [
    "Right now, I am focused on ...",
    "My background is ...",
    "One of my strengths is ...",
    "My goal is ...",
  ],
  "cliffhanger": {
    "en": "On Friday, Vale must tell one true story from her past. Which story will she choose?",
    "es": "El viernes, Vale debe contar una historia verdadera de su pasado. ¿Cuál historia elegirá?",
  },
};
