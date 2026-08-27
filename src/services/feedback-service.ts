import type { GrammarIssue, QuickFix, SpeechAnalysis } from "@/lib/types";

/**
 * FeedbackService — turns analysis into personalized micro-reps (Version 2).
 * Generates 2–3 variations so the learner practices the pattern, not one
 * memorized sentence.
 */

const VARIATION_SUBJECTS = ["My sister", "My manager", "My best friend"];

function conjugate(verb: string): string {
  if (verb === "have") return "has";
  if (verb === "go" || verb === "do" || verb === "watch" || verb === "finish") return `${verb}es`;
  return `${verb}s`;
}

export const FeedbackService = {
  buildQuickFix(analysis: SpeechAnalysis): QuickFix | null {
    const issue: GrammarIssue | undefined = analysis.grammarIssues[0];
    if (!issue) return null;

    if (issue.category === "third-person-s") {
      const verb = issue.correct.toLowerCase().split(/\s+/).pop() ?? "works";
      const base = verb.replace(/es$|s$/, "");
      return {
        focusLabel: "HE / SHE + S",
        variations: [
          issue.correct.endsWith(".") ? issue.correct : `${issue.correct}.`,
          `${VARIATION_SUBJECTS[0]} ${conjugate(base)} from home.`,
          `${VARIATION_SUBJECTS[1]} ${conjugate(base)} early every day.`,
        ],
      };
    }

    if (issue.category === "future") {
      return {
        focusLabel: "TOMORROW I AM GOING TO",
        variations: [
          "Tomorrow I am going to start earlier.",
          "Tomorrow I am going to practice English for ten minutes.",
          "Next week I am going to speak with more customers.",
        ],
      };
    }

    if (issue.category === "because") {
      return {
        focusLabel: "BECAUSE + SUBJECT",
        variations: [
          "I like my job because it is interesting.",
          "She works from home because she has two kids.",
          "Sometimes I feel tired because my days are busy.",
        ],
      };
    }

    return {
      focusLabel: "SIMPLE PRESENT",
      variations: [issue.correct, "I usually start work at eight.", "I always have breakfast at home."],
    };
  },

  /** Compares Rep 9 with Rep 10 to show visible improvement. */
  compare(before: SpeechAnalysis, after: SpeechAnalysis) {
    const afterKeys = new Set(after.grammarIssues.map((issue) => `${issue.category}-${issue.said.toLowerCase()}`));
    const fixed = before.grammarIssues.filter((issue) => !afterKeys.has(`${issue.category}-${issue.said.toLowerCase()}`));
    return {
      fixed,
      scoreDelta: after.score - before.score,
      secondsDelta: after.fluency.seconds - before.fluency.seconds,
      stillWorkingOn: after.grammarIssues,
    };
  },

  /** Daily adaptation rules — what tomorrow's session should emphasize. */
  nextTarget(analysis: SpeechAnalysis): string {
    if (analysis.fluency.seconds < 30) return "Tomorrow we'll train idea expansion so you speak longer.";
    if (analysis.fluency.longPauses > 2) return "Tomorrow we'll work on connecting your ideas more naturally.";
    if (analysis.grammarIssues.length > 0) return "Tomorrow we'll add extra micro-reps for your target structure.";
    if (analysis.breakdown.pronunciation < 75) return "Tomorrow we'll focus on clearer word endings.";
    return "Tomorrow we'll push your speaking time toward 60 seconds.";
  },
};
