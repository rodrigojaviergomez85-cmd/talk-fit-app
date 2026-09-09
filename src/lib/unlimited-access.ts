/**
 * UNLIMITED ACCESS ACCOUNTS
 *
 * A short allow-list of internal accounts that can open every module, every
 * day and every Review practice, with no daily practice cap and no AI quota.
 * The database mirrors this list in `public.is_unlimited_test_user`.
 *
 * The flag is mirrored into localStorage because progression helpers
 * (JourneyService) are plain sync functions with no access to the session.
 */

export const UNLIMITED_ACCESS_EMAILS = [
  "english4callcenters@gmail.com",
  "auxialeman@gmail.com",
] as const;

const KEY = "fluency.unlimitedAccess";

export function isUnlimitedEmail(email?: string | null): boolean {
  if (!email) return false;
  return (UNLIMITED_ACCESS_EMAILS as readonly string[]).includes(email.toLowerCase().trim());
}

/** Called by the auth provider on every session change. */
export function setUnlimitedAccess(email?: string | null): void {
  if (typeof window === "undefined") return;
  try {
    if (isUnlimitedEmail(email)) window.localStorage.setItem(KEY, "1");
    else window.localStorage.removeItem(KEY);
  } catch {
    /* private mode — access simply stays normal */
  }
}

/** True when the signed-in learner is on the unlimited allow-list. */
export function hasUnlimitedAccess(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem(KEY) === "1";
  } catch {
    return false;
  }
}
