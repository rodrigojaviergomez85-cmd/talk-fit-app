import type { CourseDay, ModelLine, RepLabel } from "@/lib/types";

/**
 * Pure helpers that decide HOW a day's authored content is split into
 * speaking units. Shared by the Practice screen (runtime) and the course-audio
 * inventory (pre-generation) so both see exactly the same chunks and prompts.
 */

/* -------------------------------- Rep 2 ---------------------------------- */

export type Rep2Chunk = { id: string; lineIds: string[]; lines: ModelLine[] };

/**
 * Groups the day's core lines into recording chunks (2 sentences each).
 * Q/A days pair each question with its answer, so one chunk = 2 Q/A pairs.
 * A day may override the grouping with `rep2Chunks`.
 */
export function rep2Chunks(day: CourseDay): Rep2Chunk[] {
  const byId = new Map(day.lines.map((line) => [line.id, line]));
  const toChunk = (lines: ModelLine[]): Rep2Chunk => ({
    id: lines[0]?.id ?? "chunk",
    lineIds: lines.map((l) => l.id),
    lines,
  });

  if (day.rep2Chunks?.length) {
    const chunks = day.rep2Chunks
      .map((ids) => ids.map((id) => byId.get(id)).filter((l): l is ModelLine => Boolean(l)))
      .filter((lines) => lines.length > 0)
      .map(toChunk);
    if (chunks.length) return chunks;
  }

  const isQa = day.lines.some((line) => line.role === "q") && day.lines.some((line) => line.role === "a");
  const size = isQa ? 4 : 2;
  const chunks: Rep2Chunk[] = [];
  for (let i = 0; i < day.lines.length; i += size) {
    chunks.push(toChunk(day.lines.slice(i, i + size)));
  }
  return chunks;
}

/** The text the model voice reads for one Rep 2 chunk. */
export function rep2ChunkText(chunk: Rep2Chunk): string {
  return chunk.lines.map((line) => line.text).join(" ");
}

/* -------------------------------- Rep 4 ---------------------------------- */

export type Rep4Item = {
  id: string;
  question: string;
  questionEs: string;
  starter: string;
  starterEs: string;
  cues?: string[] | undefined;
  /** WH word shown as a chip above the question (WHERE, WHO…). */
  cue?: string | undefined;
  /** TIGERS reasoning label for this prompt. */
  label?: RepLabel | undefined;
};

/** Rep 4 never shows more than 3 speaking prompts per day. */
export const REP4_MAX = 3;

const WH_WORDS = ["HOW OFTEN", "HOW LONG", "HOW MANY", "HOW MUCH", "WHAT TIME", "WHAT", "WHERE", "WHEN", "WHO", "WHY", "HOW", "WHICH"];

/** Derives the WH cue from the question when the lesson does not define one. */
export function whCue(question: string): string | undefined {
  const upper = question.trim().toUpperCase();
  return WH_WORDS.find((word) => upper.startsWith(word));
}

export function rep4Items(day: CourseDay): Rep4Item[] {
  const items: Rep4Item[] = day.challenges?.length
    ? day.challenges.map((challenge) => ({
        id: challenge.id,
        question: challenge.title,
        questionEs: challenge.titleEs,
        starter: challenge.detail,
        starterEs: challenge.detailEs,
        cues: challenge.cues,
      }))
    : day.prompts.map((prompt) => ({
        id: prompt.id,
        question: prompt.question,
        questionEs: prompt.questionEs,
        starter: prompt.starter,
        starterEs: prompt.starterEs,
        cue: prompt.cue ?? whCue(prompt.question),
        label: prompt.label,
      }));
  return items.slice(0, REP4_MAX);
}
