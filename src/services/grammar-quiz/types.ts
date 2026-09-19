/**
 * GRAMMAR QUIZ — Paso 3 del día.
 *
 * Banco de ítems escrito a mano, alineado día por día al contenido real del
 * curso. Sin IA: la respuesta correcta es fija y el servidor califica contra
 * este mismo banco.
 */

export type Bilingual = { en: string; es: string };

type BaseItem = {
  id: string;
  /** Explicación corta que se muestra cuando el estudiante falla. */
  explain: Bilingual;
};

/** Elegir la forma correcta. `answer` es el índice de la opción correcta. */
export type MultipleChoiceItem = BaseItem & {
  kind: "mc";
  prompt: string;
  promptEs: string;
  options: string[];
  answer: number;
};

/** Tocar la palabra equivocada. `answer` es el índice de la palabra mala. */
export type FindMistakeItem = BaseItem & {
  kind: "mistake";
  words: string[];
  answer: number;
  promptEs: string;
  /** Palabra correcta que reemplaza a la equivocada. */
  correction: string;
};

/** Ordenar las piezas. `answer` es el orden correcto de las piezas. */
export type RearrangeItem = BaseItem & {
  kind: "rearrange";
  /** Piezas desordenadas tal como se muestran. */
  pieces: string[];
  answer: string[];
  promptEs: string;
};

export type GrammarItem = MultipleChoiceItem | FindMistakeItem | RearrangeItem;

export type GrammarQuiz = {
  moduleId: string;
  day: number;
  title: Bilingual;
  items: GrammarItem[];
  /** Aciertos mínimos para ganar los puntos. Por defecto GRAMMAR_PASS_SCORE. */
  passScore?: number;
};

export const GRAMMAR_ITEMS_PER_QUIZ = 20;
/** 16 de 20 para ganar los puntos. */
export const GRAMMAR_PASS_SCORE = 16;

export function mc(
  id: string,
  prompt: string,
  promptEs: string,
  options: string[],
  answer: number,
  explain: Bilingual,
): MultipleChoiceItem {
  return { kind: "mc", id, prompt, promptEs, options, answer, explain };
}

export function mistake(
  id: string,
  sentence: string,
  wrongWord: string,
  correction: string,
  explain: Bilingual,
  promptEs = "Toca la palabra equivocada.",
): FindMistakeItem {
  const words = sentence.split(" ");
  const answer = words.indexOf(wrongWord);
  if (answer < 0) throw new Error(`find-mistake item ${id}: "${wrongWord}" not in sentence`);
  return { kind: "mistake", id, words, answer, correction, explain, promptEs };
}

export function rearrange(
  id: string,
  pieces: string[],
  answer: string[],
  explain: Bilingual,
  promptEs = "Ordena la oración.",
): RearrangeItem {
  return { kind: "rearrange", id, pieces, answer, explain, promptEs };
}
