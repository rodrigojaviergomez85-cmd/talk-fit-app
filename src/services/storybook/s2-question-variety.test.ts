import { describe, expect, it } from "vitest";
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";

const DIR = path.join(process.cwd(), "src/services/storybook");

function seasonTwoFiles(): string[] {
  return readdirSync(DIR)
    .filter((f) => f.startsWith("vale-s2-") && f.endsWith(".ts") && !f.endsWith(".test.ts"))
    .map((f) => path.join(DIR, f));
}

function collect(file: string, field: "questionEn" | "label"): string[] {
  const src = readFileSync(file, "utf8");
  const re = field === "questionEn" ? /questionEn:\s*"([^"]+)"/g : /label:\s*"([^"]+)"/g;
  const out: string[] = [];
  let m: RegExpExecArray | null;
  while ((m = re.exec(src))) out.push(m[1]!);
  return out;
}

// Third-person / auxiliary simple present is not taught yet in Basic 1 (future tense module).
const SIMPLE_PRESENT = /\b(does|do you|do they|doesn't|don't|wants|says|likes|thinks|needs|repeats|promises)\b/i;

describe("Season 2 quick questions", () => {
  const files = seasonTwoFiles();

  it("has all 20 episodes", () => {
    expect(files.length).toBe(20);
  });

  it("never uses simple present in questions or options", () => {
    const offenders: string[] = [];
    for (const file of files) {
      for (const text of [...collect(file, "questionEn"), ...collect(file, "label")]) {
        if (SIMPLE_PRESENT.test(text)) offenders.push(`${path.basename(file)}: ${text}`);
      }
    }
    expect(offenders).toEqual([]);
  });

  it("never has all three questions starting with What", () => {
    const offenders: string[] = [];
    for (const file of files) {
      const qs = collect(file, "questionEn");
      const allWhat = qs.length > 0 && qs.every((q) => /^what\b/i.test(q.trim()));
      if (allWhat) offenders.push(path.basename(file));
    }
    expect(offenders).toEqual([]);
  });

  it("keeps a varied mix of wh-words across the season", () => {
    const all = files.flatMap((f) => collect(f, "questionEn"));
    const starts = (re: RegExp) => all.filter((q) => re.test(q.trim())).length;
    expect(all.length).toBeGreaterThanOrEqual(55);
    expect(starts(/^who\b/i)).toBeGreaterThanOrEqual(3);
    expect(starts(/^when\b/i)).toBeGreaterThanOrEqual(3);
    expect(starts(/^where\b/i)).toBeGreaterThanOrEqual(1);
    expect(starts(/^why\b/i)).toBeGreaterThanOrEqual(2);
    expect(starts(/^how\b/i)).toBeGreaterThanOrEqual(3);
    expect(starts(/^(will|is|are|do)\b/i)).toBeGreaterThanOrEqual(3);
  });
});
