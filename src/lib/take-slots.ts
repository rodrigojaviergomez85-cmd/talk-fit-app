/**
 * STEP 5 · YOUR TURN — Take slot rules (pure, shared by TakeBoard and the
 * server-side Final Audio Coach so both derive the SAME maximum Take number
 * from the real CourseDay).
 */
import type { RolePlayTurn } from "./types";

export const TAKE_COUNT = 5;
export const REQUIRED_TAKES = 3;

/**
 * PRESSURE ROUND: when a role play has more turns than the classic required
 * takes (e.g. Tigers with 4 turns, Advanced with more), every turn is one
 * required response and there are no retry slots. Classic role plays
 * (2–3 turns + retries) are unchanged.
 */
export function isPressureRound(turns: RolePlayTurn[] | undefined): boolean {
  return Boolean(turns && turns.length > REQUIRED_TAKES);
}

/** Number of Take slots the learner actually sees: classic = 5, Pressure Round = rep5Turns.length. */
export function takeSlots(turns: RolePlayTurn[] | undefined): number {
  return isPressureRound(turns) ? turns!.length : TAKE_COUNT;
}

export function requiredTakes(turns: RolePlayTurn[] | undefined): number {
  return isPressureRound(turns) ? turns!.length : REQUIRED_TAKES;
}
