export type StoryAdvanceState = {
  kind: "cover" | "scene" | "mindset" | "quiz" | "finale";
  quizId?: string;
  quizDone: Record<string, boolean>;
  saidIt: Record<string, boolean>;
};

/** Quick questions require both a correct answer and their speaking task. */
export function isStoryAdvanceLocked({ kind, quizId, quizDone, saidIt }: StoryAdvanceState): boolean {
  if (kind !== "quiz" || !quizId) return false;
  return !quizDone[quizId] || !saidIt[quizId];
}
