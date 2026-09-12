import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/vale-ep8/cover.jpg";
import s1 from "@/assets/storybook/vale-ep8/s1.jpg"; import s2 from "@/assets/storybook/vale-ep8/s2.jpg";
import s3 from "@/assets/storybook/vale-ep8/s3.jpg"; import s4 from "@/assets/storybook/vale-ep8/s4.jpg";
import s5 from "@/assets/storybook/vale-ep8/s5.jpg"; import s6 from "@/assets/storybook/vale-ep8/s6.jpg";
import s7 from "@/assets/storybook/vale-ep8/s7.jpg"; import s8 from "@/assets/storybook/vale-ep8/s8.jpg";
import s9 from "@/assets/storybook/vale-ep8/s9.jpg"; import s10 from "@/assets/storybook/vale-ep8/s10.jpg";

export const VALE_FAVORITE_FOOD: StorybookEpisode = {
  id: "vale-favorite-food", moduleId: "basic-zero", week: 2,
  title: "My favorite food", titleEs: "Mi comida favorita", episodeLabel: { en: "Episode 8", es: "Episodio 8" },
  previously: [
    { en: "The team shared their favorite colors.", es: "El equipo compartió sus colores favoritos." },
    { en: "Vale gave a reason with because.", es: "Vale dio una razón con because." },
    { en: "Kat announced food day.", es: "Kat anunció el día de la comida." },
  ],
  reviewWords: [{ word: "favorite", es: "favorito / favorita" }, { word: "because", es: "porque" }, { word: "family", es: "familia" }],
  blurb: { en: "The team shares food, but Vale's lunch is missing.", es: "El equipo comparte comida, pero el almuerzo de Vale no aparece." }, cover, voice: "girl",
  scenes: [
    { id: "s1", image: s1, imageAlt: "El equipo prepara un almuerzo internacional.", text: "It is lunch time. The office smells amazing.", es: "Es la hora del almuerzo. La oficina huele increíble.", words: [{ word: "lunch", es: "almuerzo" }, { word: "smells", es: "huele" }] },
    { id: "s2", image: s2, imageAlt: "Kat celebra el día de comida internacional.", text: '"Today is international food day!" says Kat.', es: "«¡Hoy es el día de la comida internacional!», dice Kat.", speaker: "kat", words: [{ word: "international", es: "internacional" }, { word: "food", es: "comida" }] },
    { id: "s3", image: s3, imageAlt: "Mateo muestra tamales.", text: '"My favorite food is tamales because they remind me of home," says Mateo.', es: "«Mi comida favorita son los tamales porque me recuerdan a casa», dice Mateo.", speaker: "mateo", words: [{ word: "tamales", es: "tamales" }, { word: "remind", es: "recuerdan" }] },
    { id: "s4", image: s4, imageAlt: "Dylan muestra pizza por videollamada.", text: '"My favorite food is pizza because I love cheese," says Dylan.', es: "«Mi comida favorita es la pizza porque me encanta el queso», dice Dylan.", speaker: "dylan", words: [{ word: "pizza", es: "pizza" }, { word: "cheese", es: "queso" }] },
    { id: "s5", image: s5, imageAlt: "Vale abre una lonchera vacía.", text: "Vale opens her lunch box. It is empty.", es: "Vale abre su lonchera. Está vacía.", words: [{ word: "empty", es: "vacía" }, { word: "box", es: "caja" }] },
    { id: "s6", image: s6, imageAlt: "Vale busca sus pupusas.", text: '"Oh no! My pupusas are not here," says Vale.', es: "«¡Oh, no! Mis pupusas no están aquí», dice Vale.", speaker: "vale", words: [{ word: "pupusas", es: "pupusas" }, { word: "here", es: "aquí" }] },
    { id: "s7", image: s7, imageAlt: "Vale respira para calmarse.", text: "Vale feels embarrassed, but she takes a breath.", es: "Vale siente vergüenza, pero respira.", words: [{ word: "embarrassed", es: "avergonzada" }, { word: "breath", es: "respiración" }] },
    { id: "s8", image: s8, imageAlt: "Vale decide intentarlo de nuevo.", text: '"Mistakes are part of the process. I try again," says Vale.', es: "«Los errores son parte del proceso. Lo intento otra vez», dice Vale.", speaker: "vale", words: [{ word: "mistakes", es: "errores" }, { word: "process", es: "proceso" }] },
    { id: "s9", image: s9, imageAlt: "Vale habla de su comida favorita.", text: '"My favorite food is pupusas because they remind me of my family."', es: "«Mi comida favorita son las pupusas porque me recuerdan a mi familia.»", speaker: "vale", words: [{ word: "family", es: "familia" }, { word: "favorite", es: "favorita" }] },
    { id: "s10", image: s10, imageAlt: "Kat entrega la lonchera y una invitación.", text: '"Great answer! Your lunch is in the refrigerator." An invitation is under the box.', es: "«¡Gran respuesta! Tu almuerzo está en el refrigerador.» Hay una invitación debajo de la caja.", speaker: "kat", words: [{ word: "refrigerator", es: "refrigerador" }, { word: "invitation", es: "invitación" }] },
  ],
  quizzes: [
    { id: "q1", afterScene: "s2", questionEn: "Is the office ready for lunch?", questionEs: "¿Está lista la oficina para almorzar?", options: [{ label: "Yes", emoji: "✅" }, { label: "No", emoji: "❌" }, { label: "Maybe", emoji: "🤔" }], answer: 0, sayIt: "The office is ready for lunch.", sayItEs: "Repite: «La oficina está lista para almorzar.»" },
    { id: "q2", afterScene: "s6", questionEn: "What is Vale's favorite food?", questionEs: "¿Cuál es la comida favorita de Vale?", options: [{ label: "Pupusas", emoji: "🫓" }, { label: "Pizza", emoji: "🍕" }, { label: "Tamales", emoji: "🫔" }], answer: 0, sayIt: "My favorite food is…", sayItEs: "Ahora tú: «Mi comida favorita es…»" },
    { id: "q3", afterScene: "s9", questionEn: "Why are pupusas special for Vale?", questionEs: "¿Por qué son especiales para Vale?", options: [{ label: "They remind her of family", emoji: "👨‍👩‍👧" }, { label: "They are purple", emoji: "💜" }, { label: "They are cold", emoji: "🥶" }], answer: 0, sayIt: "My favorite food is… because…", sayItEs: "Ahora di la tuya y una razón." },
  ],
  mindsetCard: { afterScene: "s8", phrase: "Mistakes are part of the process. I try again.", es: "Los errores son parte del proceso. Lo intento otra vez." },
  continuePrompt: { en: "Say your favorite food, one reason and another food you like.", es: "Di tu comida favorita, una razón y otra comida que te gusta." },
  continueWith: ["My favorite food is…", "…because…", "I also like…", "I try again."],
  cliffhanger: { en: "The invitation says: Talent Day — show us what you love.", es: "La invitación dice: Día de talentos — muéstranos lo que amas." },
};