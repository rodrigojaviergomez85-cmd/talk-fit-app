import type { RolePlayTurn } from "@/lib/types";

/**
 * Model-voice tone. Mapped to delivery instructions on the server (/api/tts).
 *  - coach:   energetic bilingual call-center coach (Basic model lines, prompts)
 *  - neutral: calm, professional conversational American English (recruiters,
 *             interview questions, Test Ready items)
 *  - tense:   frustrated but controlled customer (complaint role plays)
 *  - story:   natural, human storytelling delivery (storybook narrator and characters)
 *  - playful: bright, playful, slightly shy young woman (storybook characters like Vale)
 *  - cheerful: cheerful, energetic 19-year-old young man (storybook characters like Mateo)
 *  - youthful: relaxed, confident young man (storybook characters like Dylan)
 *  - shy:      soft, timid 17-year-old boy (storybook characters like Beto)
 *  - earnest:  sincere, motivated teenage student (storybook characters like Dani)
 *  - warm:     calm, affectionate mother around 45 (storybook characters like Vale's mom)
 *  - pro:      confident American corporate professional, sitcom-real conversational delivery
 *  - sly:      aggressive, smooth-talking rival salesman with a suspicious edge (BigTalk's Bryan)
 */
export type ModelTone =
  | "coach"
  | "neutral"
  | "tense"
  | "playful"
  | "story"
  | "cheerful"
  | "youthful"
  | "shy"
  | "nervous"
  | "bright"
  | "earnest"
  | "warm"
  | "pro"
  | "sly";

const AUTHORITY = /recruiter|reclutador|interviewer|entrevistador|manager|gerente|hiring|hr\b/i;
const CUSTOMER = /customer|cliente|caller/i;
const COMPLAINT =
  /hasn't|haven't|hasn’t|haven’t|isn't work|not work|stopped|problem|charged|refund|cancel|waiting|still not|nobody|frustrat|unacceptable|already (called|contacted|restarted|tried)|third time|three times|twice|complain|broken|wrong|late|delay|didn't (arrive|work|call)|not what i|ridiculous/i;

/** True when the role play as a whole is a complaint / service-failure scene. */
export function isComplaintContext(turns: readonly RolePlayTurn[] | undefined): boolean {
  if (!turns?.length) return false;
  return turns.some((turn) => CUSTOMER.test(`${turn.label} ${turn.labelEs}`) && COMPLAINT.test(turn.text));
}

/**
 * Tone for one prewritten interlocutor turn.
 * RECRUITER / INTERVIEWER / MANAGER → neutral; CUSTOMER in a complaint context → tense;
 * any other speaker (friend, partner, coach, a relaxed customer) → coach (default).
 */
export function toneForTurn(turn: RolePlayTurn, allTurns?: readonly RolePlayTurn[]): ModelTone {
  const label = `${turn.label} ${turn.labelEs}`;
  if (AUTHORITY.test(label)) return "neutral";
  if (CUSTOMER.test(label)) {
    if (/pressure|objection|presión|objeción|angry|enojad|upset|molest/i.test(label)) return "tense";
    if (isComplaintContext(allTurns ?? [turn])) return "tense";
    return "neutral";
  }
  return "coach";
}
