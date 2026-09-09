/** Client-safe shared types for learner bug reports. */

export const BUG_REPORT_AREAS = [
  "home",
  "practice",
  "coach",
  "progress",
  "recordings",
  "account",
  "other",
] as const;

export type BugReportArea = (typeof BUG_REPORT_AREAS)[number];

export const BUG_REPORT_STATUSES = ["new", "reviewed", "resolved"] as const;
export type BugReportStatus = (typeof BUG_REPORT_STATUSES)[number];

export const MAX_MESSAGE_CHARS = 2000;
export const MAX_SCREENSHOT_BYTES = 5 * 1024 * 1024;
export const ALLOWED_SCREENSHOT_TYPES = ["image/png", "image/jpeg", "image/webp"] as const;

export type BugReportContext = {
  route?: string;
  moduleId?: string;
  day?: number;
  lang?: string;
  userAgent?: string;
  viewport?: string;
  standalone?: boolean;
};

export type AdminBugReport = {
  id: string;
  createdAt: string;
  status: BugReportStatus;
  message: string;
  area: string;
  expected: string | null;
  email: string | null;
  userId: string | null;
  context: BugReportContext;
  screenshotUrl: string | null;
};

export function isAllowedScreenshotType(type: string): boolean {
  return (ALLOWED_SCREENSHOT_TYPES as readonly string[]).includes(type);
}

export function extensionForType(type: string): string {
  if (type === "image/png") return "png";
  if (type === "image/webp") return "webp";
  return "jpg";
}
