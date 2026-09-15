import { supabase } from "@/integrations/supabase/client";
import { localDayKey } from "./practice-attempts";

/**
 * The practice day belongs to the SERVER, in a fixed timezone
 * (America/El_Salvador). The database stamps every attempt row with it, so the
 * client only needs to know it to keep its local cache and counters honest.
 *
 * Cached in memory, refreshed on load and whenever the app regains focus.
 * Until the first answer arrives we fall back to localDayKey(), which computes
 * the same timezone from the device and only differs when the clock is wrong.
 */

let cached: string | null = null;
let inFlight: Promise<string | null> | null = null;

export function serverDayKey(): string {
  return cached ?? localDayKey();
}

export function cachedServerDayKey(): string | null {
  return cached;
}

/** Test seam. */
export function __setServerDayKey(value: string | null): void {
  cached = value;
  inFlight = null;
}

export async function refreshServerDayKey(): Promise<string | null> {
  if (inFlight) return inFlight;
  inFlight = (async () => {
    try {
      const { data, error } = await (supabase.rpc as unknown as (fn: string) => Promise<{ data: unknown; error: unknown }>)(
        "practice_day_key",
      );
      if (error || typeof data !== "string") return cached;
      cached = data;
      return cached;
    } catch {
      return cached;
    } finally {
      inFlight = null;
    }
  })();
  return inFlight;
}

let started = false;

/** Called once at app start. Safe to call again; it only wires up once. */
export function startServerDayWatcher(): void {
  if (started || typeof window === "undefined") return;
  started = true;
  void refreshServerDayKey();
  window.addEventListener("focus", () => {
    void refreshServerDayKey();
  });
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") void refreshServerDayKey();
  });
}
