/**
 * Step 2 (COPIA) attempt cap: a learner may record a chunk at most
 * REP2_MAX_ATTEMPTS times (initial take + 2 retries). After that, only
 * NEXT / SKIP remain — no frustration loops. Vale stories keep their own
 * separate 2-attempt cap.
 */
export const REP2_MAX_ATTEMPTS = 3;

/** True while the learner may record again for AI correction. */
export function canRep2Attempt(attempts: number): boolean {
  return attempts < REP2_MAX_ATTEMPTS;
}
