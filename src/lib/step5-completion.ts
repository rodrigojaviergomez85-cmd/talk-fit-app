/**
 * STEP 5 completion controller (pure, framework-free).
 *
 * Confirming the Final Audio must COMMIT THE DAY EXACTLY ONCE and only then
 * start the AI Coach review. The learner stays inside STEP 5 (review screen);
 * Day Complete is shown when they tap CONTINUE. AI failure can never lose the
 * day because the commit happens before any AI work.
 *
 * Order enforced by `confirm()`:
 *   commitDay → clearSession → completeSession → cloudSave → onReviewActive → startCoach
 *
 * Idempotency: a second `confirm()` (double tap, re-render, stale closure) is a
 * no-op — no second completeDay, no second habit event, no second pipeline.
 * `continueToDayComplete()` only advances the UI and never touches the commit.
 */
export type Step5CompletionDeps<TCommit> = {
  /** JourneyService.completeDay + habit/streak side effects. Must run exactly once. */
  commitDay: () => TCommit;
  clearSession: () => void;
  completeSession: () => void;
  cloudSave: (committed: TCommit) => void;
  /** UI enters the in-Step-5 review state (coachReviewActive = true). */
  onReviewActive: (committed: TCommit) => void;
  /** Starts the Final Coach pipeline once (guarantee upload → mark final → analysis). */
  startCoach: (committed: TCommit) => void;
  /** UI shows DayCompleteScreen (setDone(true)). */
  onDayComplete: () => void;
};

export type Step5CompletionController = {
  /** True once the selected Final Audio has committed the day in this flow. */
  readonly committed: boolean;
  /** Returns true only on the single call that actually committed. */
  confirm: () => boolean;
  /** Returns false when nothing was committed yet (CONTINUE is only valid after the review). */
  continueToDayComplete: () => boolean;
};

export function createStep5CompletionController<TCommit>(deps: Step5CompletionDeps<TCommit>): Step5CompletionController {
  let committed = false;
  let advanced = false;
  return {
    get committed() {
      return committed;
    },
    confirm() {
      if (committed) return false;
      committed = true;
      const result = deps.commitDay();
      deps.clearSession();
      deps.completeSession();
      deps.cloudSave(result);
      deps.onReviewActive(result);
      deps.startCoach(result);
      return true;
    },
    continueToDayComplete() {
      if (!committed || advanced) return false;
      advanced = true;
      deps.onDayComplete();
      return true;
    },
  };
}
