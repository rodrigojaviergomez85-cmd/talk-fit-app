/**
 * Sign-up failures translated for a Spanish-first audience.
 *
 * The auth provider only answers in English ("Password is known to be weak…"),
 * which left new learners retrying the same password over and over.
 */
export const MIN_PASSWORD_LENGTH = 8;

type AuthLikeError = { code?: string | null | undefined; message?: string | null | undefined } | null | undefined;

type SignUpErrorKey = "account.weakPassword" | "account.emailInUse";

/** i18n key for a sign-up error, or null when we have no better wording than the provider's. */
export function signUpErrorKey(error: AuthLikeError): SignUpErrorKey | null {
  if (!error) return null;
  const code = (error.code ?? "").toLowerCase();
  const message = (error.message ?? "").toLowerCase();
  if (code === "weak_password" || message.includes("weak") || message.includes("password should be at least")) {
    return "account.weakPassword";
  }
  if (code === "user_already_exists" || message.includes("already registered")) return "account.emailInUse";
  return null;
}

/** Client-side guard so an obviously too-short password never costs a round trip. */
export function localPasswordIssueKey(password: string): "account.passwordTooShort" | null {
  return password.length < MIN_PASSWORD_LENGTH ? "account.passwordTooShort" : null;
}
