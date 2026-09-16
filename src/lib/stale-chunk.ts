/**
 * Recovery for pages that fail because the browser is still running an old
 * published version and asks for files the new deploy no longer has.
 *
 * Typical signatures across browsers:
 *  - Chrome/Firefox: "Failed to fetch dynamically imported module ..."
 *  - Safari/iOS: "undefined is not an object (evaluating 'e[t??`default`]')"
 *    (the lazy page module resolved to nothing, so reading its export throws)
 */
const STALE_PATTERNS = [
  /dynamically imported module/i,
  /importing a module script failed/i,
  /error loading dynamically imported/i,
  /unable to preload/i,
  /chunkloaderror/i,
  /\[["'`]?default["'`]?\]/i,
  /reading ['"`]default['"`]/i,
  /is not an object \(evaluating .*default/i,
];

const RELOAD_FLAG = "app-update-reloaded";

export function isStaleChunkError(reason: unknown): boolean {
  const message = String(
    (reason as Error | undefined)?.message ?? (reason as { toString?: () => string })?.toString?.() ?? reason ?? "",
  );
  if (!message) return false;
  return STALE_PATTERNS.some((pattern) => pattern.test(message));
}

/** One rescue reload per browser session, so a broken deploy never loops. */
export function reloadOnceForStaleChunk(): void {
  if (typeof window === "undefined") return;
  try {
    if (window.sessionStorage.getItem(RELOAD_FLAG)) return;
    window.sessionStorage.setItem(RELOAD_FLAG, "1");
  } catch {
    /* storage blocked — still reload once */
  }
  window.location.reload();
}
