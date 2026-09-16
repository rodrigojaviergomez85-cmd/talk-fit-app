/**
 * B2 vocabulary budget.
 *
 * Baseline measured over every English string in `src/services` (official
 * modules, Review and Seasons 1-8 episodes), grouping inflected forms
 * (plural, -ing, -ed) into one family:
 *
 *   4,214 distinct families seen at least once
 *   2,444 families seen 3+ times  <-- "active" vocabulary
 *
 * Target: 3,500 active families by the end of Advanced 3.
 * Gap: ~1,120 new units over the 70 remaining episodes = 16 per episode.
 *
 * Each budgeted unit must be SPOKEN in the episode (dialogue, glossary
 * expression or speaking prompt) — `vocabulary-budget.test.ts` enforces it.
 */

export const MIN_NEW_UNITS_PER_EPISODE = 16;

/** Active-vocabulary baseline before Sharks Day 11 (families seen 3+ times). */
export const ACTIVE_BASELINE = 2444;

/** Final B2 goal for active vocabulary. */
export const ACTIVE_GOAL = 3500;

/** 16 target units per episode: content words + phrasal verbs + one idiom. */
export const EPISODE_VOCAB_BUDGET: Record<string, string[]> = {
  "advanced1-ep2-the-night-northline-almost-left": [
    "success", "contract", "situation", "result", "lesson", "raining",
    "report", "manager", "demo", "comparing", "signed", "convince",
    "promise", "measure", "win back", "come up with",
  ],
  "advanced1-ep3-why-us": [
    "trap", "weak", "arrogant", "value", "proof", "humble", "fact", "edit",
    "boring", "cancelled", "hire", "role", "coordinate", "owners",
    "bring up", "cut out",
  ],
  "advanced1-ep4-my-honest-weakness": [
    "weakness", "perfectionist", "costume", "fatal", "disaster", "spreadsheet",
    "budget", "brain", "financial", "course", "error", "honesty",
    "imperfect", "victory", "fall asleep", "back up",
  ],
  "advanced1-ep5-pressure-round": [
    "pressure", "breathe", "politely", "waste", "completion", "average",
    "survey", "admitted", "failure", "calm", "accent", "decoration",
    "heartbeat", "interruption", "bet on", "turn into",
  ],
  "advanced1-ep6-a-heartbeat-for-the-proposal": [
    "heartbeat", "budgets", "retention", "decoration", "microphone", "risk",
    "believable", "redesigned", "soul", "brave", "honesty", "survive",
    "typo", "come up with", "hand in", "a bank wrote it",
  ],
  "advanced1-ep7-the-numbers-do-not-lie": [
    "formula", "blame", "repair", "responsibility", "excuse", "audited",
    "rebuilt", "warning", "spreadsheet", "uncomfortable", "figure", "founders",
    "truth", "double-check", "pass through", "own the mistake",
  ],
  "advanced1-ep8-two-right-answers": [
    "intensive", "trailer", "finance", "strategy", "damaged", "valuable",
    "maintenance", "structure", "depth", "distinction", "propose", "intact",
    "summary", "back down", "work out", "meet in the middle",
  ],
  "advanced1-ep9-in-their-own-words": [
    "recorder", "complaint", "avoid", "supervisor", "bakery", "tourists",
    "objections", "module", "freeze", "analysis", "behavioural", "interrupt",
    "skipped", "turn down", "write down", "left outside",
  ],
  "advanced1-ep10-the-behavioural-round": [
    "memorised", "follow-up", "immediately", "resigned", "timetable", "forgive",
    "useless", "feedback", "timing", "discipline", "improvement", "structures",
    "hidden", "keep up", "throw at", "on the short list",
  ],
  "advanced1-ep1-rules-of-the-game": [
    "committee", "compete", "spot", "founder", "introduction", "structure",
    "background", "strength", "goal", "focused", "confident", "evidence",
    "terrified", "welcome call", "follow up", "speak up",
  ],
  "sharks-ep11-what-went-wrong": [
    "root cause", "untrained", "apology", "reschedule", "refund", "report",
    "blame", "reputation", "pause", "honest", "promise", "fault",
    "look into", "own up to", "weakness", "currency",
  ],
  "sharks-ep12-say-it-in-numbers": [
    "revenue", "margin", "forecast", "churn", "retention", "quarterly",
    "average", "spreadsheet", "invoice", "budget", "break down", "add up",
    "the numbers speak for themselves", "growth", "estimate", "retraining",
  ],
  "sharks-ep13-the-hard-negotiation": [
    "verdict", "harsh", "demotion", "punishment", "preparation", "potential",
    "insulted", "attendance", "feedback", "deserves", "contract",
    "point out", "step up", "give him a fair shot", "support", "truth",
  ],
  "sharks-ep14-losing-a-client": [
    "cancellation", "notice", "disappointed", "competitor", "feedback", "pilot",
    "complaint", "reverse", "satisfaction", "survey", "pull out", "follow up",
    "a wake-up call", "unhappy", "listening", "revenue",
  ],
  "sharks-ep15-winning-it-back": [
    "guarantee", "attendance", "commitment", "pilot", "credibility",
    "measurable", "recovery", "transparent", "dashboard", "standard",
    "won back", "make up for", "the extra mile", "reliable", "progress report", "permanent",
  ],
  "sharks-ep16-a-team-in-three-countries": [
    "timezone", "remote", "onboarding", "workload", "coordinate", "delegate",
    "headquarters", "overlap", "policy", "documents", "check in", "sort out",
    "on the same wavelength", "leader", "resigned", "salary",
  ],
  "sharks-ep17-the-investor": [
    "valuation", "equity", "stake", "funding", "board", "investment",
    "profitable", "spreadsheets", "investor", "ownership", "buy into", "scale up",
    "put your money where your mouth is", "calculated", "decision-maker", "veto",
  ],
  "sharks-ep18-say-no-with-respect": [
    "quality", "capacity", "provider", "boundary", "alternative",
    "honestly", "ambition", "smaller", "september", "request",
    "turn down", "pass on", "bite off more than you can chew", "apologize", "trained", "decision",
  ],
  "sharks-ep19-the-regional-deal": [
    "regional", "milestone", "negotiable", "legal", "clause review", "partnership",
    "launch", "territory", "compliance", "agreement", "adaptations", "draw up",
    "seal the deal", "simultaneously", "framework", "annex",
  ],
  "sharks-ep20-sharks-close-deals": [
    "achievement", "legacy", "operation", "retention", "contracts", "global",
    "confidence", "responsibility", "determination", "providers", "wrap up", "take on",
    "the sky is the limit", "regional deal", "classroom", "program",
  ],
};

/**
 * Reserve pool for Advanced 1-3 (60 episodes x 16 units).
 * Each new Advanced episode draws 16 unused units from its season pool and
 * registers them in EPISODE_VOCAB_BUDGET.
 */
export const ADVANCED_VOCAB_POOL: Record<"advanced1" | "advanced2" | "advanced3", string[]> = {
  advanced1: [
    "stakeholder", "deliverable", "scope", "workflow", "bottleneck", "turnover",
    "efficiency", "benchmark", "incentive", "procurement", "vendor", "logistics",
    "inventory", "warehouse", "shipment", "supply chain", "outsource",
    "in-house", "headcount", "payroll", "reimbursement", "audit", "compliance officer",
    "liability", "insurance", "warranty", "refurbish", "downturn", "recession",
    "inflation", "currency", "exchange rate", "tariff", "customs", "import",
    "export", "distributor", "wholesale", "retail", "markup", "break even",
    "cash flow", "runway", "burn rate", "asset", "liability report", "balance sheet",
    "shareholder", "dividend", "merge", "acquisition", "take over", "spin off",
    "step down", "step up", "carry out", "phase out", "bring forward", "call off",
    "cut corners", "raise the bar", "think outside the box", "get the ball rolling",
  ],
  advanced2: [
    "negotiator", "mediation", "arbitration", "settlement", "dispute", "breach",
    "penalty", "waiver", "amendment", "confidentiality", "intellectual property",
    "trademark", "patent", "licensing", "royalty", "jurisdiction", "regulation",
    "lobby", "campaign", "constituency", "mandate", "reform", "policy maker",
    "public sector", "private sector", "nonprofit", "grant", "subsidy",
    "sustainability", "carbon footprint", "diversity", "inclusion", "equity gap",
    "mentorship", "succession", "retention plan", "burnout", "wellbeing",
    "resilience", "empathy", "accountability", "transparency", "integrity",
    "back down", "back up", "bring about", "carry on", "come up with",
    "figure out", "hold back", "iron out", "lay off", "look up to",
    "read between the lines", "play it by ear", "a level playing field",
    "move the needle", "touch base",
  ],
  advanced3: [
    "globalization", "localization", "market entry", "feasibility", "due diligence",
    "joint venture", "subsidiary", "franchisee", "flagship", "keynote", "panel",
    "delegation", "summit", "alliance", "memorandum", "ratify", "infrastructure",
    "scholarship", "accreditation", "curriculum design", "pedagogy", "literacy",
    "enrollment", "graduation rate", "dropout", "inequality", "opportunity gap",
    "public policy", "civic", "governance", "transparency law", "advocacy",
    "legacy project", "philanthropy", "endowment", "impact report", "milestone review",
    "sustainable growth", "long-term vision", "stewardship",
    "hand over", "give back", "set out", "stand for", "live up to", "follow through",
    "branch out", "usher in", "pay it forward", "leave a mark",
    "against all odds", "come full circle", "raise the stakes", "a seat at the table",
  ],
};

const STRIP = /[^a-z0-9'\s-]/g;

/** All English text a learner actually hears or reads in one episode. */
export function episodeEnglishCorpus(episode: {
  scenes: { text: string; lines?: { text: string }[] }[];
  quizzes?: { questionEn?: string; sayIt?: string; sayItAskEn?: string }[];
  expressions?: { phrase: string; example?: string }[];
  continuePrompt?: { en: string };
  continueWith?: string[];
  blurb?: { en: string };
}): string {
  const parts: string[] = [];
  for (const scene of episode.scenes) {
    parts.push(scene.text);
    for (const line of scene.lines ?? []) parts.push(line.text);
  }
  for (const quiz of episode.quizzes ?? []) {
    parts.push(quiz.questionEn ?? "", quiz.sayIt ?? "", quiz.sayItAskEn ?? "");
  }
  for (const expression of episode.expressions ?? []) {
    parts.push(expression.phrase, expression.example ?? "");
  }
  parts.push(episode.continuePrompt?.en ?? "", episode.blurb?.en ?? "", ...(episode.continueWith ?? []));
  return ` ${parts.join(" ").toLowerCase().replace(STRIP, " ").replace(/\s+/g, " ")} `;
}

/** True when a target unit (word or multi-word expression) is really spoken. */
export function corpusContainsUnit(corpus: string, unit: string): boolean {
  const base = unit.toLowerCase().replace(STRIP, " ").replace(/\s+/g, " ").trim();
  if (!base) return false;
  if (corpus.includes(` ${base} `)) return true;
  const words = base.split(" ");
  const head = words[0]!;
  const rest = words.slice(1).join(" ");
  // allow inflected head: escalate/escalated, walk away/walked away, own up to/owns up to
  const inflections = [`${head}s`, `${head}es`, `${head}d`, `${head}ed`, `${head}ing`];
  if (head.endsWith("e")) inflections.push(`${head.slice(0, -1)}ing`, `${head}d`);
  for (const form of inflections) {
    const candidate = rest ? `${form} ${rest}` : form;
    if (corpus.includes(` ${candidate} `)) return true;
  }
  // pronoun slots: "put your money ..." spoken as "put my money ..."
  const pronoun = base.replace(/\b(your|my|our|his|her|their)\b/g, "@");
  if (pronoun !== base) {
    const pattern = new RegExp(` ${pronoun.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/@/g, "(your|my|our|his|her|their|we|us)")} `);
    if (pattern.test(corpus)) return true;
  }
  return false;
}
