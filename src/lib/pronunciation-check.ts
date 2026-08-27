/**
 * Word-level comparison between the model sentence and what the learner said.
 * Accent/punctuation tolerant so Spanish speakers are not punished for
 * transcription noise. Pure and deterministic — runs on the client.
 */

export type WordStatus = "correct" | "missing" | "extra";

export type WordResult = {
  word: string;
  status: WordStatus;
};

export type RepVerdict = "great" | "close" | "retry";

export type RepCheck = {
  accuracy: number;
  verdict: RepVerdict;
  words: WordResult[];
  missing: string[];
  extra: string[];
  hasTranscript: boolean;
};

export function normalizeWord(word: string): string {
  return word
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9']/g, "")
    .replace(/^'+|'+$/g, "");
}

export function tokenize(text: string): string[] {
  return text.split(/\s+/).map(normalizeWord).filter(Boolean);
}

/** Longest common subsequence over normalized tokens. */
function lcsMatrix(a: string[], b: string[]): number[][] {
  const table: number[][] = Array.from({ length: a.length + 1 }, () => new Array<number>(b.length + 1).fill(0));
  for (let i = a.length - 1; i >= 0; i -= 1) {
    for (let j = b.length - 1; j >= 0; j -= 1) {
      table[i]![j]! = a[i] === b[j] ? (table[i + 1]![j + 1]! + 1) : Math.max(table[i + 1]![j]!, table[i]![j + 1]!);
    }
  }
  return table;
}

export function checkRepetition(modelText: string, spokenText: string): RepCheck {
  const modelWordsRaw = modelText.split(/\s+/).filter(Boolean);
  const model = modelWordsRaw.map(normalizeWord).filter(Boolean);
  const spoken = tokenize(spokenText);

  if (model.length === 0 || spoken.length === 0) {
    return {
      accuracy: 0,
      verdict: "retry",
      words: modelWordsRaw.map((word) => ({ word, status: "correct" as const })),
      missing: [],
      extra: [],
      hasTranscript: spoken.length > 0,
    };
  }

  const table = lcsMatrix(model, spoken);
  const words: WordResult[] = [];
  const missing: string[] = [];
  const extra: string[] = [];

  let i = 0;
  let j = 0;
  while (i < model.length && j < spoken.length) {
    if (model[i] === spoken[j]) {
      words.push({ word: modelWordsRaw[i] ?? model[i]!, status: "correct" });
      i += 1;
      j += 1;
    } else if (table[i + 1]![j]! >= table[i]![j + 1]!) {
      words.push({ word: modelWordsRaw[i] ?? model[i]!, status: "missing" });
      missing.push(model[i]!);
      i += 1;
    } else {
      extra.push(spoken[j]!);
      j += 1;
    }
  }
  while (i < model.length) {
    words.push({ word: modelWordsRaw[i] ?? model[i]!, status: "missing" });
    missing.push(model[i]!);
    i += 1;
  }
  while (j < spoken.length) {
    extra.push(spoken[j]!);
    j += 1;
  }

  const matched = words.filter((w) => w.status === "correct").length;
  const accuracy = Math.round((matched / model.length) * 100);
  const verdict: RepVerdict = accuracy >= 85 ? "great" : accuracy >= 60 ? "close" : "retry";

  return { accuracy, verdict, words, missing, extra, hasTranscript: true };
}

export const VERDICT_COPY: Record<RepVerdict, { title: string; sub: string }> = {
  great: { title: "BIEN DICHO", sub: "Sonó natural. Sigue así." },
  close: { title: "CASI", sub: "Te faltaron algunas palabras. Escucha y repite." },
  retry: { title: "INTÉNTALO OTRA VEZ", sub: "Escucha el modelo y copia el ritmo completo." },
};
