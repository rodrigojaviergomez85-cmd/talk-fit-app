import { useSyncExternalStore } from "react";
import { VerbBank, subscribeVerbBank, type VerbBankState } from "@/services/verb-bank";

const SERVER_STATE: VerbBankState = {};

/** Reactive Past Verb Bank progress for the current learner. */
export function useVerbBank(): VerbBankState {
  return useSyncExternalStore(
    subscribeVerbBank,
    () => VerbBank.load(),
    () => SERVER_STATE,
  );
}
