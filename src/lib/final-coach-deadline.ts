import type { FinalCoachState } from "@/lib/final-audio-coach";

/**
 * Learner-facing maximum wait for the STEP 5 AI Coach Review. The day is
 * already committed before the Coach starts, so after this deadline the UI
 * fails open to UNAVAILABLE + CONTINUE. Different concept from the backend's
 * 10-minute lease (which only prevents duplicate paid AI work) and from the
 * 20-second PENDING polling (which is bounded by itself).
 */
export const FINAL_COACH_UI_TIMEOUT_MS = 45_000;

const SETTLED: ReadonlySet<FinalCoachState["status"]> = new Set(["ready", "unclear", "unavailable"]);

export type CoachDeadlineHandle = {
  /** Abort + clear timer (leaving the screen). No state emission. */
  cancel: () => void;
  signal: AbortSignal;
};

type Runner = (
  emit: (state: FinalCoachState) => void,
  signal: AbortSignal,
) => Promise<unknown>;

/**
 * Runs the Final Coach pipeline with a fail-open deadline. Emissions after the
 * deadline or after cancel are ignored; the deadline itself explicitly emits
 * `unavailable` because the pipeline suppresses emissions once aborted.
 * Zero AI calls are introduced: it only aborts client work already in flight.
 */
export function runCoachWithDeadline(
  run: Runner,
  setState: (state: FinalCoachState) => void,
  timeoutMs: number = FINAL_COACH_UI_TIMEOUT_MS,
): CoachDeadlineHandle {
  const abort = new AbortController();
  let active = true;
  let settled = false;

  const timer = setTimeout(() => {
    if (!active || settled) return;
    // Late READY must never replace this UNAVAILABLE in the current screen.
    active = false;
    abort.abort();
    setState({ status: "unavailable" });
  }, timeoutMs);

  const emit = (state: FinalCoachState) => {
    if (!active || abort.signal.aborted) return;
    if (SETTLED.has(state.status)) {
      settled = true;
      clearTimeout(timer);
    }
    setState(state);
  };

  setState({ status: "preparing" });
  void run(emit, abort.signal).catch(() => emit({ status: "unavailable" }));

  return {
    signal: abort.signal,
    cancel: () => {
      active = false;
      clearTimeout(timer);
      abort.abort();
    },
  };
}
