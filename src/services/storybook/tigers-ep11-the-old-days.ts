import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/tigers-ep11-the-old-days/cover.jpg";
import s1 from "@/assets/storybook/tigers-ep11-the-old-days/s1.jpg";
import s2 from "@/assets/storybook/tigers-ep11-the-old-days/s2.jpg";
import s3 from "@/assets/storybook/tigers-ep11-the-old-days/s3.jpg";
import s4 from "@/assets/storybook/tigers-ep11-the-old-days/s4.jpg";
import s5 from "@/assets/storybook/tigers-ep11-the-old-days/s5.jpg";
import s6 from "@/assets/storybook/tigers-ep11-the-old-days/s6.jpg";
import s7 from "@/assets/storybook/tigers-ep11-the-old-days/s7.jpg";
import s8 from "@/assets/storybook/tigers-ep11-the-old-days/s8.jpg";
import s9 from "@/assets/storybook/tigers-ep11-the-old-days/s9.jpg";
import s10 from "@/assets/storybook/tigers-ep11-the-old-days/s10.jpg";
import s11 from "@/assets/storybook/tigers-ep11-the-old-days/s11.jpg";

/**
 * Season 7 (Tigers) Episode 11 — "The old days".
 * Matches Tigers Day 11 (used to / didn't use to + past simple).
 */
export const TIGERS_EP11_THE_OLD_DAYS: StorybookEpisode = {
  id: "tigers-ep11-the-old-days",
  moduleId: "tigers",
  week: 3,
  title: "The old days",
  titleEs: "Los viejos tiempos",
  episodeLabel: { en: "Season 7 · Episode 11", es: "Temporada 7 · Episodio 11" },
  previously: [
    { en: "Dani passed his interview and became coordinator.", es: "Dani pasó su entrevista y se convirtió en coordinador." },
    { en: "The renewal meeting with Northline is today.", es: "La reunión de renovación con Northline es hoy." },
    { en: "Sofía taught her demo class on Saturday.", es: "Sofía dio su clase de prueba el sábado." },
  ],
  reviewWords: [
    { word: "coordinator", es: "coordinador" },
    { word: "evidence", es: "evidencia" },
    { word: "hired", es: "contratado" },
  ],
  blurb: {
    en: "Before the big meeting, Don Tito brings old photos — and everyone remembers how this street used to be.",
    es: "Antes de la gran reunión, Don Tito trae fotos viejas — y todos recuerdan cómo era esta calle antes.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Mañana de la reunión: Vale revisa la presentación una última vez.",
      text: "Renewal Monday. Vale checked the presentation for the last time before noon.",
      es: "Lunes de renovación. Vale revisó la presentación por última vez antes del mediodía.",
      speaker: "narrator",
      lines: [
        { speaker: "dani", text: "The meeting is at twelve. It's nine. Why are you so calm?", es: "«La reunión es a las doce. Son las nueve. ¿Por qué estás tan tranquila?»" },
        { speaker: "vale", text: "Because we prepared. Nervous is what you feel when you didn't prepare.", es: "«Porque nos preparamos. Los nervios son lo que sientes cuando no te preparaste»." },
      ],
      words: [
        { word: "meeting", es: "reunión" },
        { word: "calm", es: "tranquila" },
        { word: "prepared", es: "preparados" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Don Tito entra con una caja de fotos viejas del barrio.",
      text: "Then Don Tito walked in with a shoe box full of old photos.",
      es: "Entonces Don Tito entró con una caja de zapatos llena de fotos viejas.",
      speaker: "narrator",
      lines: [
        { speaker: "tito", text: "Before your big meeting, look at this. Photos of the neighborhood, from before.", es: "«Antes de tu gran reunión, mira esto. Fotos del barrio, de antes»." },
        { speaker: "vale", text: "Don Tito! Is this our street?!", es: "«¡Don Tito! ¡¿Esta es nuestra calle?!»" },
        { speaker: "tito", text: "The very same street. It used to be very different.", es: "«La misma calle. Antes era muy diferente»." },
      ],
      words: [
        { word: "photos", es: "fotos" },
        { word: "before", es: "antes" },
        { word: "different", es: "diferente" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Foto vieja: la calle vacía, sin tiendas; Don Tito señala.",
      text: "This street used to be empty. There used to be no shops, no lights, nothing.",
      es: "«Esta calle antes estaba vacía. No había tiendas, no había luces, nada».",
      speaker: "tito",
      lines: [
        { speaker: "tito", text: "This street used to be empty at six o'clock. Everybody went home early.", es: "«Esta calle antes estaba vacía a las seis. Todos se iban temprano a casa»." },
        { speaker: "tito", text: "There used to be no shops here. Just my pupusa stand and the wind.", es: "«Antes no había tiendas aquí. Solo mi puesto de pupusas y el viento»." },
        { speaker: "dani", text: "And the wind didn't buy pupusas, I imagine.", es: "«Y el viento no compraba pupusas, imagino»." },
      ],
      words: [
        { word: "empty", es: "vacía" },
        { word: "stand", es: "puesto" },
        { word: "wind", es: "viento" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Otra foto: Don Tito joven con su carrito; Vale sonríe.",
      text: "I used to sell pupusas from a bicycle cart. I didn't use to have a motorcycle.",
      es: "«Antes vendía pupusas desde un carrito de bicicleta. No tenía motocicleta».",
      speaker: "tito",
      lines: [
        { speaker: "tito", text: "I used to sell pupusas from a bicycle cart, can you believe it?", es: "«Antes vendía pupusas desde un carrito de bicicleta, ¿lo pueden creer?»" },
        { speaker: "tito", text: "I didn't use to have a motorcycle. My legs were my motorcycle.", es: "«Antes no tenía motocicleta. Mis piernas eran mi motocicleta»." },
        { speaker: "camila", text: "And now the motorcycle is your legs.", es: "«Y ahora la motocicleta son sus piernas»." },
      ],
      words: [
        { word: "bicycle", es: "bicicleta" },
        { word: "cart", es: "carrito" },
        { word: "believe", es: "creer" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Vale recuerda: foto mental de cuando la escuela era un cuarto pequeño.",
      text: "And this school? We used to have four students and one broken fan.",
      es: "«¿Y esta escuela? Antes teníamos cuatro estudiantes y un ventilador descompuesto».",
      speaker: "vale",
      lines: [
        { speaker: "vale", text: "And this school… we used to have four students and one broken fan.", es: "«Y esta escuela… antes teníamos cuatro estudiantes y un ventilador descompuesto»." },
        { speaker: "vale", text: "I used to teach, clean, and answer the phone, all at the same time.", es: "«Antes enseñaba, limpiaba y contestaba el teléfono, todo al mismo tiempo»." },
        { speaker: "dani", text: "Wait, you used to answer the phone? That's MY job!", es: "«¡¿Espera, antes contestabas el teléfono?! ¡Ese es MI trabajo!»" },
      ],
      words: [
        { word: "broken", es: "descompuesto" },
        { word: "fan", es: "ventilador" },
        { word: "clean", es: "limpiar" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Dani recuerda su primer día: no hablaba nada de inglés.",
      text: "And me… I didn't use to speak English at all. Not one word.",
      es: "«Y yo… antes no hablaba nada de inglés. Ni una palabra».",
      speaker: "dani",
      lines: [
        { speaker: "dani", text: "And me… I didn't use to speak English at all. Not one word.", es: "«Y yo… antes no hablaba nada de inglés. Ni una palabra»." },
        { speaker: "dani", text: "I used to hide when a client spoke English at the front desk.", es: "«Antes me escondía cuando un cliente hablaba inglés en la recepción»." },
        { speaker: "vale", text: "And yesterday you passed a full interview in English.", es: "«Y ayer pasaste una entrevista completa en inglés»." },
      ],
      words: [
        { word: "hide", es: "esconderse" },
        { word: "word", es: "palabra" },
        { word: "passed", es: "pasaste" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Don Tito enseña la estructura con las fotos: antes, ahora.",
      text: "Look at the photos and repeat with me: it used to be… but now…",
      es: "«Mira las fotos y repite conmigo: antes era… pero ahora…»",
      speaker: "tito",
      lines: [
        { speaker: "tito", text: "Repeat with me, kids. The street used to be empty. Now it's full of life.", es: "«Repitan conmigo, muchachos. La calle antes estaba vacía. Ahora está llena de vida»." },
        { speaker: "tito", text: "I used to have a bicycle cart. Now I have a motorcycle with a speaker.", es: "«Antes tenía un carrito de bicicleta. Ahora tengo una motocicleta con altavoz»." },
        { speaker: "vale", text: "The school used to have four students. Now it has forty.", es: "«La escuela antes tenía cuatro estudiantes. Ahora tiene cuarenta»." },
      ],
      words: [
        { word: "repeat", es: "repetir" },
        { word: "full", es: "llena" },
        { word: "speaker", es: "altavoz" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "Camila encuentra una foto del local donde hoy está BigTalk, vacío.",
      text: "Look at this one. The BigTalk building used to be an empty warehouse.",
      es: "«Mira esta. El edificio de BigTalk antes era una bodega vacía».",
      speaker: "camila",
      lines: [
        { speaker: "camila", text: "Look at this photo. The BigTalk building used to be an empty warehouse.", es: "«Mira esta foto. El edificio de BigTalk antes era una bodega vacía»." },
        { speaker: "camila", text: "There used to be mice in that building. Now there's a giant sign.", es: "«Antes había ratones en ese edificio. Ahora hay un letrero gigante»." },
        { speaker: "tito", text: "Big sign, small soul, mija. The mice had more personality.", es: "«Letrero grande, alma pequeña, mija. Los ratones tenían más personalidad»." },
      ],
      words: [
        { word: "warehouse", es: "bodega" },
        { word: "mice", es: "ratones" },
        { word: "soul", es: "alma" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Vale guarda una foto del barrio viejo dentro de su carpeta de la presentación.",
      text: "Vale put one old photo inside her presentation folder.",
      es: "Vale puso una foto vieja dentro de su carpeta de la presentación.",
      speaker: "narrator",
      lines: [
        { speaker: "dani", text: "Why are you taking that photo to the meeting?", es: "«¿Por qué llevas esa foto a la reunión?»" },
        { speaker: "vale", text: "Because Northline should see where we come from.", es: "«Porque Northline debería ver de dónde venimos»." },
        { speaker: "vale", text: "This school used to be nothing. Now it's a place that changes lives.", es: "«Esta escuela antes no era nada. Ahora es un lugar que cambia vidas»." },
      ],
      words: [
        { word: "folder", es: "carpeta" },
        { word: "come from", es: "venir de" },
        { word: "changes", es: "cambia" },
      ],
    },
    {
      id: "s10",
      image: s10,
      imageAlt: "Once y media: el equipo camina hacia la reunión; Don Tito les desea suerte.",
      text: "At eleven thirty, the team walked to the meeting. Don Tito raised his fist.",
      es: "A las once y media, el equipo caminó a la reunión. Don Tito levantó el puño.",
      speaker: "narrator",
      lines: [
        { speaker: "tito", text: "Go, kids! And remember: nothing here used to be easy!", es: "«¡Vayan, muchachos! ¡Y recuerden: nada aquí era fácil antes!»" },
        { speaker: "vale", text: "That's exactly my opening line, Don Tito.", es: "«Esa es exactamente mi primera frase, Don Tito»." },
        { speaker: "dani", text: "Deep breaths. Answer, reason, example. Here we go.", es: "«Respira hondo. Respuesta, razón, ejemplo. Allá vamos»." },
      ],
      words: [
        { word: "fist", es: "puño" },
        { word: "opening line", es: "primera frase" },
        { word: "easy", es: "fácil" },
      ],
    },
    {
      id: "s11",
      image: s11,
      imageAlt: "Vale practica su primera frase frente al edificio de Northline.",
      text: "Vale practices her opening line in front of the Northline building.",
      es: "Vale practica su primera frase frente al edificio de Northline.",
      speaker: "vale",
      lines: [
        { speaker: "vale", text: "Five years ago, this school didn't exist. We used to teach in one small room.", es: "«Hace cinco años, esta escuela no existía. Enseñábamos en un cuarto pequeño»." },
        { speaker: "vale", text: "We used to have four students and a broken fan. Now we have forty students and two classrooms.", es: "«Antes teníamos cuatro estudiantes y un ventilador descompuesto. Ahora tenemos cuarenta estudiantes y dos salones»." },
        { speaker: "vale", text: "Growth is not our plan, gentlemen. Growth is our habit.", es: "«El crecimiento no es nuestro plan, caballeros. El crecimiento es nuestra costumbre»." },
      ],
      words: [
        { word: "exist", es: "existir" },
        { word: "growth", es: "crecimiento" },
        { word: "habit", es: "costumbre" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s3",
      questionEn: "How did Don Tito's street use to be?",
      questionEs: "¿Cómo era antes la calle de Don Tito?",
      options: [
        { label: "It used to be empty, with no shops", emoji: "🌵" },
        { label: "It used to be a beach", emoji: "🏖️" },
        { label: "It used to be an airport", emoji: "✈️" },
      ],
      answer: 0,
      sayIt: "This street used to be empty. There used to be no shops.",
      sayItEs: "Ejemplo: «This street used to be empty. There used to be no shops.»",
      sayItAskEn: "How did your neighborhood or town use to be?",
      sayItAskEs: "¿Cómo era antes tu barrio o tu pueblo?",
      sayItCheck: {
        target: "* used to be *",
        altTargets: ["There used to be *", "It used to *", "My town used to be *"],
      },
    },
    {
      id: "q2",
      afterScene: "s6",
      questionEn: "What did Dani use to do when a client spoke English?",
      questionEs: "¿Qué hacía Dani antes cuando un cliente hablaba inglés?",
      options: [
        { label: "He used to hide at the front desk", emoji: "🙈" },
        { label: "He used to sing", emoji: "🎤" },
        { label: "He used to translate perfectly", emoji: "📖" },
      ],
      answer: 0,
      sayIt: "I didn't use to speak English. I used to hide at the front desk.",
      sayItEs: "Ejemplo: «I didn't use to speak English. I used to hide at the front desk.»",
      sayItAskEn: "What did you use to do that you don't do anymore?",
      sayItAskEs: "¿Qué hacías antes que ya no haces?",
      sayItCheck: {
        target: "I used to *",
        altTargets: ["I didn't use to *", "I used to *, but now *", "Before, I used to *"],
      },
    },
    {
      id: "q3",
      afterScene: "s9",
      questionEn: "Why did Vale take an old photo to the meeting?",
      questionEs: "¿Por qué Vale llevó una foto vieja a la reunión?",
      options: [
        { label: "To show where the school comes from", emoji: "🌱" },
        { label: "To sell the photo", emoji: "💵" },
        { label: "Because she forgot it in the folder", emoji: "😅" },
      ],
      answer: 0,
      sayIt: "This school used to be nothing. Now it changes lives.",
      sayItEs: "Ejemplo: «This school used to be nothing. Now it changes lives.»",
      sayItAskEn: "Tell me one thing that used to be true about you and one thing that is true now.",
      sayItAskEs: "Dime algo que era cierto de ti antes y algo que es cierto ahora.",
      sayItCheck: {
        target: "I used to *, but now *",
        altTargets: ["* used to be *, but now *", "Before I *, now I *", "I used to be *. Now I am *"],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s5",
    phrase: "I remember where I come from. That is my fuel, not my shame.",
    es: "Me acuerdo de dónde vengo. Ese es mi combustible, no mi vergüenza.",
  },
  habitCard: {
    afterScene: "s3",
    phrase: "English is easy when I compare: used to, now, next. Three photos, three sentences.",
    es: "El inglés es fácil cuando comparo: antes, ahora, después. Tres fotos, tres oraciones.",
    model: "tito",
    modelActionEs: "Don Tito enseñó inglés con una caja de fotos viejas.",
  },
  continuePrompt: {
    en: "Tell me about your street, your school, or your family: what used to be different? And how is it now?",
    es: "Cuéntame de tu calle, tu escuela o tu familia: ¿qué era diferente antes? ¿Y cómo es ahora?",
  },
  continueWith: ["It used to be ...", "I used to ...", "But now ..."],
  cliffhanger: {
    en: "Episode 12: Inside the renewal meeting — Morgan compares Vale's school and BigTalk, line by line.",
    es: "Episodio 12: Dentro de la reunión de renovación — Morgan compara la escuela de Vale y BigTalk, línea por línea.",
  },
};
