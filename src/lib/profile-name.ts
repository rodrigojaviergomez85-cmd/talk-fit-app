/** Shared display-name rules. Used by the UI and enforced again on the server. */

export const NAME_MIN = 2;
export const NAME_MAX = 24;

/** Light blocklist: links and common offensive words (ES/EN). */
const BLOCKED = [
  "http", "www.", ".com", "@",
  "puta", "puto", "mierda", "verga", "pendejo", "pendeja", "culero", "cabron", "cabrón",
  "chinga", "coño", "polla", "zorra", "maricon", "maricón", "pito", "teta", "porno", "sexo", "sexual",
  "fuck", "shit", "bitch", "cunt", "dick", "pussy", "porn", "sex", "nigger", "whore", "slut", "rape",
];

export type NameCheck = { ok: true; value: string } | { ok: false; reason: "short" | "long" | "blocked" };

export function sanitizeName(raw: string): string {
  return raw.replace(/\s+/g, " ").trim();
}

export function checkName(raw: string): NameCheck {
  const value = sanitizeName(raw);
  if (value.length < NAME_MIN) return { ok: false, reason: "short" };
  if (value.length > NAME_MAX) return { ok: false, reason: "long" };
  const low = value.toLowerCase();
  if (BLOCKED.some((word) => low.includes(word))) return { ok: false, reason: "blocked" };
  return { ok: true, value };
}
