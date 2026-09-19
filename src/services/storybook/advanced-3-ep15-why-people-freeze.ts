import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/advanced3-ep15-why-people-freeze/cover.jpg";
import s1 from "@/assets/storybook/advanced3-ep15-why-people-freeze/s1.jpg";
import s2 from "@/assets/storybook/advanced3-ep15-why-people-freeze/s2.jpg";
import s3 from "@/assets/storybook/advanced3-ep15-why-people-freeze/s3.jpg";
import s4 from "@/assets/storybook/advanced3-ep15-why-people-freeze/s4.jpg";
import s5 from "@/assets/storybook/advanced3-ep15-why-people-freeze/s5.jpg";
import s6 from "@/assets/storybook/advanced3-ep15-why-people-freeze/s6.jpg";
import s7 from "@/assets/storybook/advanced3-ep15-why-people-freeze/s7.jpg";
import s8 from "@/assets/storybook/advanced3-ep15-why-people-freeze/s8.jpg";
import s9 from "@/assets/storybook/advanced3-ep15-why-people-freeze/s9.jpg";

export const ADVANCED3_EP15_WHY_PEOPLE_FREEZE: StorybookEpisode = {
  id: "advanced3-ep15-why-people-freeze",
  moduleId: "advanced-3",
  week: 3,
  title: "Why people freeze",
  titleEs: "Por qué la gente se congela",
  episodeLabel: {
    en: "Advanced 3 · Episode 15",
    es: "Advanced 3 · Episodio 15",
  },
  previously: [
    {
      en: "'What if you had taken Crown?' 'I'd be safe, and seventeen people would still be where I was on day one.'",
      es: "'¿Y si hubieras aceptado Crown?' 'Estaría a salvo, y diecisiete personas seguirían donde yo estaba el día uno'.",
    },
    {
      en: "Crown wants to license the program. Keller calls Monday. 'Not without the room. And the room is Vale's.'",
      es: "Crown quiere licenciar el programa. Keller llama el lunes. 'No sin el salón. Y el salón es de Vale'.",
    },
    {
      en: "Twelve parents, Friday at six. Elena: 'I want to know what was inside that room.'",
      es: "Doce padres, viernes a las seis. Elena: 'Quiero saber qué había adentro de ese salón'.",
    },
  ],
  reviewWords: [
    { word: "freeze", es: "congelarse" },
    { word: "alarm", es: "alarma" },
    { word: "similar", es: "parecido" },
    { word: "example", es: "ejemplo" },
    { word: "sense", es: "sentido" },
  ],
  blurb: {
    en: "Friday, 6:00 p.m. The small room, twelve parents in the circle, Vale at the door. Elena asks why her nephew passed the audit and still freezes at the airport. Dani has no slides and no pilot. He defines it, compares it to a first day at a bakery, gives one example, himself, day one on the floor, and asks if it makes sense. One father says no. So he explains it another way.",
    es: "Viernes, 6:00 p.m. El salón pequeño, doce padres en el círculo, Vale en la puerta. Elena pregunta por qué su sobrino pasó la auditoría y todavía se congela en el aeropuerto. Dani no tiene diapositivas ni piloto. Lo define, lo compara con un primer día en una panadería, da un ejemplo, él mismo, el día uno en el piso, y pregunta si tiene sentido. Un padre dice que no. Así que lo explica de otra forma.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Friday, 6:00 p.m.; the small room at the academy; twelve parents of various ages in the circle of chairs, generic, work clothes; Elena among them in her cream apron over the rust blouse with a paper bag of bread on her lap; Dani standing inside the circle; Vale in the doorway, arms folded, not coming in.",
      text: "Friday, 6:00 p.m. Twelve parents. No slides, no pilot, one room.",
      es: "Viernes, 6:00 p.m. Doce padres. Sin diapositivas, sin piloto, un salón.",
      speaker: "elena",
      cast: ["elena", "dani", "vale"],
      lines: [
        {
          speaker: "elena",
          text: "My nephew passed your audit. Last month at the airport a woman asked him 'window or aisle' and he stood there. He had the words. Nothing came out. Why does that happen?",
          es: "Mi sobrino pasó tu auditoría. El mes pasado en el aeropuerto una señora le preguntó 'ventana o pasillo' y se quedó parado. Tenía las palabras. No salió nada. ¿Por qué pasa eso?",
        },
        {
          speaker: "elena",
          text: "And don't use the word 'confidence', I've heard it.",
          es: "Y no usés la palabra 'confianza', ya la oí.",
        },
        {
          speaker: "dani",
          text: "I won't. Four minutes, then tell me if it made sense.",
          es: "No la voy a usar. Cuatro minutos, y luego díganme si tuvo sentido.",
        },
      ],
      words: [
        { word: "aisle", es: "pasillo" },
        { word: "airport", es: "aeropuerto" },
        { word: "confidence", es: "confianza" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Close on Dani in the circle, both hands open, explaining to the parents; behind him the whiteboard with nothing on it; Elena listening with the bread bag held tight.",
      text: "Define it. Without the word 'see', without the word 'confidence'.",
      es: "Definirlo. Sin la palabra 'ver', sin la palabra 'confianza'.",
      speaker: "dani",
      cast: ["dani", "elena"],
      lines: [
        {
          speaker: "dani",
          text: "Freezing is a kind of alarm. It's not a language problem; it's the body deciding the room is dangerous and turning off the mouth to keep you safe.",
          es: "Congelarse es un tipo de alarma. No es un problema de idioma; es el cuerpo decidiendo que la sala es peligrosa y apagando la boca para mantenerte a salvo.",
        },
        {
          speaker: "dani",
          text: "Your nephew didn't forget English. His body decided a stranger with a question was a threat, and it shut the door.",
          es: "Tu sobrino no olvidó el inglés. Su cuerpo decidió que una desconocida con una pregunta era una amenaza, y cerró la puerta.",
        },
        {
          speaker: "elena",
          text: "An alarm. For 'window or aisle'.",
          es: "Una alarma. Por 'ventana o pasillo'.",
        },
        {
          speaker: "dani",
          text: "The alarm doesn't read the question. It reads the stranger.",
          es: "La alarma no lee la pregunta. Lee al desconocido.",
        },
      ],
      words: [
        { word: "alarm", es: "alarma" },
        { word: "dangerous", es: "peligroso" },
        { word: "threat", es: "amenaza" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Elena in her chair, one hand on the bread, half smiling for the first time; the parents around her turning toward her; Dani crouched slightly to her eye level.",
      text: "Compare it to something they already know.",
      es: "Compararlo con algo que ya conocen.",
      speaker: "dani",
      cast: ["dani", "elena"],
      lines: [
        {
          speaker: "dani",
          text: "It's similar to a first day at a job. Elena, your first morning at the bakery. You knew how to make bread. What happened?",
          es: "Es parecido a un primer día en un trabajo. Elena, tu primera mañana en la panadería. Sabías hacer pan. ¿Qué pasó?",
        },
        {
          speaker: "elena",
          text: "I burned forty loaves. My hands knew. My head was somewhere else. The owner was watching.",
          es: "Quemé cuarenta panes. Mis manos sabían. Mi cabeza estaba en otro lado. El dueño estaba mirando.",
        },
        {
          speaker: "dani",
          text: "Exactly. The hands knew and the head left, because someone was watching. English in front of a stranger is a first day at the bakery, every time, until the alarm learns nobody dies.",
          es: "Exactamente. Las manos sabían y la cabeza se fue, porque alguien estaba mirando. El inglés frente a un desconocido es un primer día en la panadería, cada vez, hasta que la alarma aprende que nadie se muere.",
        },
      ],
      words: [
        { word: "bakery", es: "panadería" },
        { word: "loaves", es: "panes" },
        { word: "owner", es: "dueño" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Dani standing straight again in the circle, one hand to his own chest, telling the example; Vale in the doorway, very still; a father in a mechanic's shirt with his arms crossed, unconvinced.",
      text: "One clear example. Himself.",
      es: "Un ejemplo claro. Él mismo.",
      speaker: "dani",
      cast: ["dani", "vale"],
      lines: [
        {
          speaker: "dani",
          text: "For example: my first day on the floor at Northline, a customer said 'it doesn't work' and I lost him in four minutes.",
          es: "Por ejemplo: mi primer día en el piso de Northline, un cliente dijo 'no funciona' y lo perdí en cuatro minutos.",
        },
        {
          speaker: "dani",
          text: "I wasn't missing words. I had all the words. I was missing five seconds.",
          es: "No me faltaban palabras. Tenía todas las palabras. Me faltaban cinco segundos.",
        },
        {
          speaker: "dani",
          text: "The alarm went off, I translated everything twice, and by the time I answered he was gone.",
          es: "La alarma se disparó, traduje todo dos veces, y cuando respondí ya se había ido.",
        },
        {
          speaker: "dani",
          text: "Thursdays, ninety days: your kids practiced hearing the alarm and speaking anyway, badly, in front of someone who wasn't going to fire them. That's what was inside the room.",
          es: "Los jueves, noventa días: sus hijos practicaron oír la alarma y hablar de todos modos, mal, frente a alguien que no los iba a despedir. Eso es lo que había adentro del salón.",
        },
        {
          speaker: "dani",
          text: "Does that make sense, or should I explain it another way?",
          es: "¿Tiene sentido, o lo explico de otra forma?",
        },
      ],
      words: [
        { word: "missing", es: "faltando" },
        { word: "translated", es: "traduje" },
        { word: "anyway", es: "de todos modos" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "The father in the mechanic's shirt speaking, arms still crossed; Elena turning to look at him; Dani nodding, not defensive; the circle tighter now.",
      text: "One father says no. So: another way.",
      es: "Un padre dice que no. Entonces: de otra forma.",
      speaker: "dani",
      cast: ["dani", "elena"],
      lines: [
        {
          speaker: "elena",
          text: "Rubén says no. His son talks to anyone in Spanish, so it's not an alarm, it's the English.",
          es: "Rubén dice que no. Su hijo habla con cualquiera en español, así que no es una alarma, es el inglés.",
        },
        {
          speaker: "dani",
          text: "Fair. Another way, then. Imagine that someone asks your name and you know it. And your mouth waits for permission. That's your son in English.",
          es: "Justo. De otra forma, entonces. Imagine que alguien le pregunta su nombre y usted lo sabe. Y su boca espera permiso. Ese es su hijo en inglés.",
        },
        {
          speaker: "dani",
          text: "The word is on the tip of his tongue and it stays there, because a part of him is asking 'is it safe to say this out loud?'.",
          es: "La palabra está en la punta de la lengua y se queda ahí, porque una parte de él está preguntando '¿es seguro decir esto en voz alta?'.",
        },
        {
          speaker: "dani",
          text: "In Spanish that part never asks.",
          es: "En español esa parte nunca pregunta.",
        },
        {
          speaker: "elena",
          text: "He's uncrossing his arms. That's a yes from Rubén.",
          es: "Está descruzando los brazos. Eso es un sí de Rubén.",
        },
      ],
      words: [
        { word: "permission", es: "permiso" },
        { word: "tongue", es: "lengua" },
        { word: "arms", es: "brazos" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Elena passing the paper bag of bread around the circle; parents taking pieces; Dani sitting down now in an empty chair, part of the circle; Vale still in the doorway, one hand on the frame.",
      text: "6:40 p.m. The bread goes around.",
      es: "6:40 p.m. El pan da la vuelta.",
      speaker: "elena",
      cast: ["elena", "dani", "vale"],
      lines: [
        {
          speaker: "elena",
          text: "And what do we do? We don't speak English. We can't be the person who isn't going to fire them.",
          es: "¿Y nosotros qué hacemos? No hablamos inglés. No podemos ser la persona que no los va a despedir.",
        },
        {
          speaker: "dani",
          text: "One question a night, in English, any question, and you don't correct the answer. You don't need to understand it. You need to be the stranger who asked and didn't leave.",
          es: "Una pregunta por noche, en inglés, cualquier pregunta, y no corrigen la respuesta. No necesitan entenderla. Necesitan ser el desconocido que preguntó y no se fue.",
        },
        {
          speaker: "dani",
          text: "Wrong answers count. Silence doesn't.",
          es: "Las respuestas equivocadas cuentan. El silencio no.",
        },
        {
          speaker: "elena",
          text: "'Window or aisle.' Every night. He's going to hate me.",
          es: "'Ventana o pasillo'. Cada noche. Me va a odiar.",
        },
      ],
      words: [
        { word: "correct", es: "corregir" },
        { word: "silence", es: "silencio" },
        { word: "hate", es: "odiar" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "7:30 p.m.; the room emptying; Camila arriving late in the doorway past Vale, with a thick folder marked APPLICATIONS; Dani stacking two chairs; Elena leaving with the empty bag.",
      text: "7:30 p.m. Camila, late, with a folder.",
      es: "7:30 p.m. Camila, tarde, con una carpeta.",
      speaker: "camila",
      cast: ["camila", "dani", "vale"],
      lines: [
        {
          speaker: "camila",
          text: "Ninety-three applications to the academy. Nobody who applies reads Northline's legal email. They read the clip and the photo of the forty lights.",
          es: "Noventa y tres solicitudes para la academia. Nadie que aplica lee el correo legal de Northline. Leen el clip y la foto de las cuarenta luces.",
        },
        {
          speaker: "dani",
          text: "Ninety-three people and no pilot.",
          es: "Noventa y tres personas y ningún piloto.",
        },
        {
          speaker: "vale",
          text: "Ninety-three people and a room. You had twelve in it an hour ago and nobody paid you. Count that.",
          es: "Noventa y tres personas y un salón. Tenías doce adentro hace una hora y nadie te pagó. Contá eso.",
        },
      ],
      words: [
        { word: "applications", es: "solicitudes" },
        { word: "applies", es: "aplica" },
        { word: "paid", es: "pagó" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "The small room, empty, lights half off; Vale and Dani stacking the last chairs, but leaving one in the middle of the floor; the brass key on the whiteboard ledge.",
      text: "8:00 p.m. The last two chairs. She leaves one out.",
      es: "8:00 p.m. Las últimas dos sillas. Ella deja una afuera.",
      speaker: "vale",
      cast: ["vale", "dani"],
      lines: [
        {
          speaker: "vale",
          text: "Twelve parents came here tonight because a room closed, not because one opened. Whatever you tell Keller on Monday, that's the room. Not Bogotá, not a license.",
          es: "Doce padres vinieron hoy porque un salón se cerró, no porque uno se abrió. Lo que sea que le digás a Keller el lunes, ese es el salón. No Bogotá, no una licencia.",
        },
        {
          speaker: "dani",
          text: "It's a room, Vale.",
          es: "Es un salón, Vale.",
        },
        {
          speaker: "vale",
          text: "It's the room. Leave that chair where it is. Somebody's going to need it before I do.",
          es: "Es el salón. Dejá esa silla donde está. Alguien la va a necesitar antes que yo.",
        },
      ],
      words: [
        { word: "closed", es: "se cerró" },
        { word: "opened", es: "se abrió" },
        { word: "somebody", es: "alguien" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Night; the bus stop; Dani on the bench; Óscar sitting down next to him in his too-big black polo, no badge, headset in his hand, nervous; the Northline sign lit behind them.",
      text: "9:50 p.m. Óscar sits down. He has a question he's carried for a month.",
      es: "9:50 p.m. Óscar se sienta. Tiene una pregunta que ha cargado un mes.",
      speaker: "oscar",
      cast: ["oscar", "dani"],
      lines: [
        {
          speaker: "oscar",
          text: "Elena's nephew is in my club. Can you explain it to me? Why I froze in the audit. Six minutes and ten seconds. I had the words.",
          es: "El sobrino de Elena está en mi club. ¿Me lo podés explicar a mí? Por qué me congelé en la auditoría. Seis minutos con diez segundos. Tenía las palabras.",
        },
        {
          speaker: "dani",
          text: "You had the words and Lidia was watching, and your alarm read her before it read the customer. Monday, seven a.m., the small room at the academy.",
          es: "Tenías las palabras y Lidia estaba mirando, y tu alarma la leyó a ella antes de leer al cliente. El lunes, siete a.m., el salón pequeño de la academia.",
        },
        {
          speaker: "dani",
          text: "There's a chair in the middle of the floor. It's yours.",
          es: "Hay una silla en medio del piso. Es tuya.",
        },
        {
          speaker: "oscar",
          text: "The pilot's suspended.",
          es: "El piloto está suspendido.",
        },
        {
          speaker: "dani",
          text: "The chair isn't.",
          es: "La silla no.",
        },
      ],
      words: [
        { word: "club", es: "club" },
        { word: "audit", es: "auditoría" },
        { word: "middle", es: "medio" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s4",
      questionEn: "How does Dani define freezing?",
      questionEs: "¿Cómo define Dani el congelarse?",
      options: [
        { label: "A kind of alarm: the body decides the room is dangerous and turns off the mouth", emoji: "🚨" },
        { label: "A lack of vocabulary", emoji: "📖" },
        { label: "A lack of confidence", emoji: "😶" },
      ],
      answer: 0,
      sayIt: "Freezing is a kind of alarm. It's similar to a first day at a job: the hands know and the head leaves because someone is watching.",
      sayItEs: "Congelarse es un tipo de alarma. Es parecido a un primer día en un trabajo: las manos saben y la cabeza se va porque alguien está mirando.",
      sayItCheck: {
        target: "* a kind of alarm *",
        altTargets: ["It's similar to *", "* the body decides *", "* turns off the mouth"],
      },
    },
    {
      id: "q2",
      afterScene: "s5",
      questionEn: "Explain something difficult to someone who has never seen it. Define it, compare it to something they know, give one example, and check if it made sense.",
      questionEs: "Explica algo difícil a alguien que nunca lo ha visto. Defínelo, compáralo con algo que conoce, da un ejemplo, y verifica si tuvo sentido.",
      options: [
        { label: "I am ready to answer", emoji: "🎧" },
        { label: "I want to hear Dani's version again", emoji: "👂" },
        { label: "I will practice later", emoji: "⏰" },
      ],
      answer: 0,
      sayIt: "Stress is a kind of alarm inside your body. It's similar to a smoke detector that rings when you burn toast. For example, before an exam your heart goes fast even though nothing is on fire. Does that make sense, or should I explain it another way?",
      sayItEs: "El estrés es un tipo de alarma dentro de tu cuerpo. Es parecido a un detector de humo que suena cuando quemas el pan. Por ejemplo, antes de un examen tu corazón va rápido aunque nada se esté quemando. ¿Tiene sentido, o lo explico de otra forma?",
      sayItAskEn: "Start with \"It's a kind of ...\", then \"It's similar to ...\", then \"For example ...\", and close with \"Does that make sense?\".",
      sayItAskEs: "Empieza con \"It's a kind of …\", luego \"It's similar to …\", después \"For example …\" y cierra con \"Does that make sense?\".",
      sayItCheck: {
        target: "* is a kind of *",
        altTargets: ["It's a kind of *", "It's similar to *", "Does that make sense *"],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s8",
    phrase: "When the program closes, the room is still there. Twelve people came because a door shut. I start with them.",
    es: "Cuando el programa se cierra, el salón sigue ahí. Doce personas vinieron porque una puerta se cerró. Empiezo con ellas.",
  },
  habitCard: {
    afterScene: "s5",
    phrase: "When I explain something hard, I ask 'does that make sense?' and I mean it. If someone says no, I find another way, not a louder one.",
    es: "Cuando explico algo difícil, pregunto '¿tiene sentido?' y lo digo en serio. Si alguien dice que no, busco otra forma, no una más fuerte.",
    model: "dani",
    modelActionEs: "Rubén dijo que no. Dani dijo 'justo' y explicó lo mismo con el nombre que uno sabe hace treinta años y la boca que espera permiso.",
  },
  expressions: [
    {
      phrase: "turn off",
      variants: ["turns off", "turned off", "turning off"],
      es: "apagar",
      kind: "phrasal",
      example: "it's the body deciding the room is dangerous and turning off the mouth to keep you safe.",
      exampleEs: "es el cuerpo decidiendo que la sala es peligrosa y apagando la boca para mantenerte a salvo.",
    },
    {
      phrase: "go off",
      variants: ["went off", "goes off", "gone off"],
      es: "dispararse, sonar (una alarma)",
      kind: "phrasal",
      example: "The alarm went off, I translated everything twice, and by the time I answered he was gone.",
      exampleEs: "La alarma se disparó, traduje todo dos veces, y cuando respondí ya se había ido.",
    },
    {
      phrase: "on the tip of your tongue",
      variants: ["on the tip of my tongue", "on the tip of his tongue"],
      es: "en la punta de la lengua",
      kind: "idiom",
      example: "The word is on the tip of his tongue and it stays there, because a part of him is asking 'is it safe to say this out loud?'.",
      exampleEs: "La palabra está en la punta de la lengua y se queda ahí, porque una parte de él está preguntando '¿es seguro decir esto en voz alta?'.",
    },
    {
      phrase: "make sense",
      variants: ["makes sense", "made sense", "does that make sense"],
      es: "tener sentido",
      kind: "idiom",
      example: "Does that make sense, or should I explain it another way?",
      exampleEs: "¿Tiene sentido, o lo explico de otra forma?",
    },
  ],
  finaleSeconds: 30,
  continuePrompt: {
    en: "Thirty seconds: explain something difficult to a child. Say what kind of thing it is, compare it to something they know, give one example, and check if it made sense.",
    es: "Treinta segundos: explica algo difícil a un niño. Di qué tipo de cosa es, compáralo con algo que conoce, da un ejemplo, y verifica si tuvo sentido.",
  },
  continueWith: [
    "It's a kind of ...",
    "It's similar to ...",
    "For example, ...",
    "Does that make sense, or should I explain it another way?",
  ],
  cliffhanger: {
    en: "Monday, 7:00 a.m., the academy. Before Óscar arrives, before Keller calls, somebody knocks on the door. She's seventeen, and she has Nico's face.",
    es: "Lunes, 7:00 a.m., la academia. Antes de que llegue Óscar, antes de que llame Keller, alguien toca la puerta. Tiene diecisiete años, y tiene la cara de Nico.",
  },
};
