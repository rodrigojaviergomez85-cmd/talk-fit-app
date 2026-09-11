/**
 * SINGLE SOURCE OF TRUTH for plan limits (client side).
 *
 * The real numbers live in the `section_limits` table; the server multiplies
 * them by the admin-editable Pro multiplier (app_settings) when the learner
 * has an active subscription. Nothing
 * in the UI should hardcode a cap — read it from `useDailyUsage(sectionKey)`.
 */
export const PRO_PRICE_LABEL = "4.99 USD";

export const SECTION_KEYS = {
  practice: "practice",
  interview: "interview",
  aiCoach: "ai_coach",
  finalCoach: "final_coach",
  coachRetake: "coach_retake",
} as const;

export type SectionKey = (typeof SECTION_KEYS)[keyof typeof SECTION_KEYS];
