/**
 * STEP 5 · YOUR TURN — Take slot rules (pure, shared by TakeBoard and the
 * server-side Final Audio Coach so both derive the SAME maximum Take number
 * from the real CourseDay).
 */
import type { RolePlayTurn } from "./types";

export const TAKE_COUNT = 5;
export const REQUIRED_TAKES = 3;

/**
 * PRESSURE ROUND (ADVANCED only): when a role play has MORE turns than the
 * classic 5 Take slots, every turn is one required response and there are no
 * retry slots. Role plays with 4–5 turns stay classic: 3 required responses,
 * and the extra scripted turns are covered by the optional Takes 4–5 (the
 * learner answers the remaining turn(s) as optional practice).
 */
export function isPressureRound(turns: RolePlayTurn[] | undefined): boolean {
  return Boolean(turns && turns.length > TAKE_COUNT);
}

/** Number of Take slots the learner actually sees: classic = 5, Pressure Round = rep5Turns.length. */
export function takeSlots(turns: RolePlayTurn[] | undefined): number {
  return isPressureRound(turns) ? turns!.length : TAKE_COUNT;
}

export function requiredTakes(turns: RolePlayTurn[] | undefined): number {
  return isPressureRound(turns) ? turns!.length : REQUIRED_TAKES;
}
