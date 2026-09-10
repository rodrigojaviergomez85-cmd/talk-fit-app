import type { ReviewGuideCard } from "@/lib/review-types";
import prepIn from "@/assets/review/place-prepositions/prep-in.jpg";
import prepOn from "@/assets/review/place-prepositions/prep-on.jpg";
import prepUnder from "@/assets/review/place-prepositions/prep-under.jpg";
import prepAbove from "@/assets/review/place-prepositions/prep-above.jpg";
import prepNextTo from "@/assets/review/place-prepositions/prep-next-to.jpg";
import prepBetween from "@/assets/review/place-prepositions/prep-between.jpg";
import prepBehind from "@/assets/review/place-prepositions/prep-behind.jpg";
import prepInFrontOf from "@/assets/review/place-prepositions/prep-in-front-of.jpg";
import prepNear from "@/assets/review/place-prepositions/prep-near.jpg";
import prepAcrossFrom from "@/assets/review/place-prepositions/prep-across-from.jpg";

export const PLACE_PREPOSITIONS_GUIDE: ReviewGuideCard[] = [
  {
    id: "pp-in",
    title: "IN — inside",
    titleEs: "IN — adentro",
    explanationEs:
      "Usa IN cuando algo está ADENTRO de un espacio: una caja, un cuarto, una ciudad, un carro. Piensa: si tiene paredes o límites, va IN.",
    explanation: "Use IN when something is inside a space: a box, a room, a city, a car.",
    examples: [
      { en: "The cat is in the box.", es: "El gato está dentro de la caja." },
      { en: "My keys are in my bag.", es: "Mis llaves están en mi bolsa." },
      { en: "She lives in San Salvador.", es: "Ella vive en San Salvador." },
    ],
    image: { src: prepIn, alt: "A cat inside a box", altEs: "Un gato dentro de una caja" },
    check: { promptEs: "Dilo en voz alta:", prompt: "Say it out loud:", answer: "The cat is in the box." },
  },
  {
    id: "pp-on",
    title: "ON — on top of a surface",
    titleEs: "ON — sobre una superficie",
    explanationEs:
      "Usa ON cuando algo TOCA una superficie: la mesa, la pared, el piso. Si está encima y tocando, es ON.",
    explanation: "Use ON when something touches a surface: the table, the wall, the floor.",
    examples: [
      { en: "The cup is on the table.", es: "La taza está sobre la mesa." },
      { en: "The picture is on the wall.", es: "El cuadro está en la pared." },
      { en: "My phone is on the bed.", es: "Mi teléfono está en la cama." },
    ],
    image: { src: prepOn, alt: "A cup on a table", altEs: "Una taza sobre una mesa" },
    check: { promptEs: "Dilo en voz alta:", prompt: "Say it out loud:", answer: "The cup is on the table." },
  },
  {
    id: "pp-under",
    title: "UNDER — debajo",
    titleEs: "UNDER — debajo",
    explanationEs:
      "UNDER significa debajo de algo, generalmente sin tocarlo o cubierto por eso: debajo de la silla, de la mesa, de la cama.",
    explanation: "UNDER means below something: under the chair, the table, the bed.",
    examples: [
      { en: "The mouse is under the chair.", es: "El ratón está debajo de la silla." },
      { en: "My shoes are under the bed.", es: "Mis zapatos están debajo de la cama." },
      { en: "The dog sleeps under the table.", es: "El perro duerme debajo de la mesa." },
    ],
    image: { src: prepUnder, alt: "A mouse under a chair", altEs: "Un ratón debajo de una silla" },
    check: { promptEs: "Dilo en voz alta:", prompt: "Say it out loud:", answer: "The mouse is under the chair." },
  },
  {
    id: "pp-above",
    title: "ABOVE / OVER — por encima",
    titleEs: "ABOVE / OVER — por encima",
    explanationEs:
      "ABOVE y OVER significan por encima de algo, SIN tocarlo: el cuadro está above el sofá, el pájaro vuela over la montaña.",
    explanation: "ABOVE and OVER mean higher than something, without touching it.",
    examples: [
      { en: "The bird is above the mountain.", es: "El pájaro está por encima de la montaña." },
      { en: "The clock is above the window.", es: "El reloj está arriba de la ventana." },
      { en: "The plane flies over the city.", es: "El avión vuela sobre la ciudad." },
    ],
    image: { src: prepAbove, alt: "A bird flying above a mountain", altEs: "Un pájaro volando sobre una montaña" },
    check: { promptEs: "Dilo en voz alta:", prompt: "Say it out loud:", answer: "The bird is above the mountain." },
  },
  {
    id: "pp-next-to-between",
    title: "NEXT TO & BETWEEN",
    titleEs: "NEXT TO y BETWEEN",
    explanationEs:
      "NEXT TO = al lado de (una sola cosa). BETWEEN = entre DOS cosas: the tree is between the two houses.",
    explanation: "NEXT TO = beside one thing. BETWEEN = in the middle of TWO things.",
    examples: [
      { en: "The backpack is next to the desk.", es: "La mochila está al lado del escritorio." },
      { en: "The tree is between the two houses.", es: "El árbol está entre las dos casas." },
      { en: "The bank is next to the pharmacy.", es: "El banco está al lado de la farmacia." },
    ],
    image: { src: prepNextTo, alt: "A backpack next to a desk", altEs: "Una mochila al lado de un escritorio" },
    check: { promptEs: "Dilo en voz alta:", prompt: "Say it out loud:", answer: "The tree is between the two houses." },
  },
  {
    id: "pp-behind-front",
    title: "BEHIND & IN FRONT OF",
    titleEs: "BEHIND e IN FRONT OF",
    explanationEs:
      "BEHIND = detrás de. IN FRONT OF = enfrente de (tapando o de cara). Son opuestos: the dog is behind the bush / the bike is in front of the door.",
    explanation: "BEHIND = at the back. IN FRONT OF = before it, facing it. They are opposites.",
    examples: [
      { en: "The dog is behind the bush.", es: "El perro está detrás del arbusto." },
      { en: "The bike is in front of the door.", es: "La bicicleta está enfrente de la puerta." },
      { en: "The garden is behind the house.", es: "El jardín está detrás de la casa." },
    ],
    image: { src: prepBehind, alt: "A dog behind a bush", altEs: "Un perro detrás de un arbusto" },
    check: { promptEs: "Dilo en voz alta:", prompt: "Say it out loud:", answer: "The bike is in front of the door." },
  },
  {
    id: "pp-near-across",
    title: "NEAR & ACROSS FROM",
    titleEs: "NEAR y ACROSS FROM",
    explanationEs:
      "NEAR = cerca de. ACROSS FROM = al otro lado de la calle o camino, de frente: my house is across from the school.",
    explanation: "NEAR = close to. ACROSS FROM = on the other side of the street, facing it.",
    examples: [
      { en: "The mailbox is near the tree.", es: "El buzón está cerca del árbol." },
      { en: "The blue house is across from the red house.", es: "La casa azul está enfrente de la casa roja." },
      { en: "There is a store near my house.", es: "Hay una tienda cerca de mi casa." },
    ],
    image: { src: prepAcrossFrom, alt: "Two houses across the street from each other", altEs: "Dos casas una frente a la otra" },
    check: { promptEs: "Dilo en voz alta:", prompt: "Say it out loud:", answer: "My house is across from the school." },
  },
];

export const PLACE_PREPOSITIONS_COMMON_ERRORS: { wrong: string; right: string; es: string }[] = [
  { wrong: "The cat is ON the box (está adentro).", right: "The cat is IN the box.", es: "Adentro = IN, no ON." },
  { wrong: "The cup is IN the table.", right: "The cup is ON the table.", es: "Sobre una superficie = ON." },
  { wrong: "The bank is NEXT the pharmacy.", right: "The bank is NEXT TO the pharmacy.", es: "Siempre lleva TO: next to." },
  { wrong: "The bike is IN FRONT the door.", right: "The bike is IN FRONT OF the door.", es: "Siempre lleva OF: in front of." },
  { wrong: "The tree is BETWEEN the house.", right: "The tree is BETWEEN the two houses.", es: "BETWEEN necesita DOS cosas." },
  { wrong: "My house is ACROSS the school (al otro lado).", right: "My house is ACROSS FROM the school.", es: "De frente al otro lado = across from." },
];

// Named exports so chunk/scene code can reuse the per-preposition images.
export const PLACE_PREPOSITION_IMAGES = {
  in: prepIn,
  on: prepOn,
  under: prepUnder,
  above: prepAbove,
  nextTo: prepNextTo,
  between: prepBetween,
  behind: prepBehind,
  inFrontOf: prepInFrontOf,
  near: prepNear,
  acrossFrom: prepAcrossFrom,
} as const;
