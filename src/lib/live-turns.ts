/**
 * Turn model for the live coach conversation.
 *
 * Transcripts arrive in fragments. Fragments that share a turn id belong to the
 * same spoken turn and are joined; a new turn id always starts a new message,
 * even when the same speaker talks twice in a row (for example when the learner
 * taps "In Spanish" and then "Give me an idea" without speaking in between).
 *
 * The main card always shows the practice question. Translations and hints are
 * short side helps attached to that question, and a slower repetition never
 * duplicates visible text.
 */

export type TurnRole = "you" | "coach";
export type CoachKind = "question" | "spanish" | "idea" | "slow";

export type Turn = {
  id: string;
  role: TurnRole;
  kind?: CoachKind | undefined;

  text: string;
};

export type LiveTranscript = {
  /** Every message of the conversation, separated and in order. */
  turns: Turn[];
  /** Practice question shown as the main content. */
  question: string;
  /** Short Spanish translation attached to the current question. */
  spanish: string;
  /** Short hint attached to the current question. */
  idea: string;
};

export const emptyTranscript: LiveTranscript = {
  turns: [],
  question: "",
  spanish: "",
  idea: "",
};

export type Fragment = {
  id: string;
  role: TurnRole;
  kind?: CoachKind | undefined;
  text: string;
};

export function appendFragment(state: LiveTranscript, fragment: Fragment): LiveTranscript {
  const { id, role, text } = fragment;
  if (!text) return state;
  const kind: CoachKind | undefined = role === "coach" ? fragment.kind ?? "question" : undefined;

  const last = state.turns[state.turns.length - 1];
  const sameTurn = Boolean(last && last.id === id && last.role === role);
  const turns = sameTurn
    ? state.turns.map((turn, index) =>
        index === state.turns.length - 1 ? { ...turn, text: `${turn.text}${text}` } : turn,
      )
    : [...state.turns, { id, role, kind, text }];

  const currentText = (turns[turns.length - 1]?.text ?? "").trim();

  if (role === "you") return { ...state, turns };

  switch (kind) {
    case "spanish":
      return { ...state, turns, spanish: currentText };
    case "idea":
      return { ...state, turns, idea: currentText };
    case "slow":
      // The audio repeats; the visible question stays as it is.
      return { ...state, turns };
    default:
      // A new practice question replaces the card and clears older helps.
      return sameTurn
        ? { ...state, turns, question: currentText }
        : { turns, question: currentText, spanish: "", idea: "" };
  }
}
