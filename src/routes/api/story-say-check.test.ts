import { beforeEach, describe, expect, it, vi } from "vitest";

/**
 * The storybook speaking check must ask Groq for `verbose_json`, because that
 * is the only reply that carries the clip duration the cost log needs.
 */

const consumeQuota = vi.fn();
const sectionDailyLimit = vi.fn();
const verifyRequestUser = vi.fn();
const logGroqCall = vi.fn();

vi.mock("@/lib/route-auth.server", () => ({
  verifyRequestUser: (...a: unknown[]) => verifyRequestUser(...a),
  consumeQuota: (...a: unknown[]) => consumeQuota(...a),
  sectionDailyLimit: (...a: unknown[]) => sectionDailyLimit(...a),
}));

vi.mock("@/lib/groq-call-log.server", () => ({
  logGroqCall: (...a: unknown[]) => logGroqCall(...a),
}));

vi.mock("@/services/storybook", () => ({
  getStorybookEpisode: () => ({
    quizzes: [{ id: "q1", sayItCheck: { target: "my name is vale", altTargets: [] } }],
  }),
}));

type Handler = (ctx: { request: Request }) => Promise<Response>;

async function handler(): Promise<Handler> {
  const mod = (await import("@/routes/api/story-say-check")) as { Route: unknown };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (mod.Route as any).options.server.handlers.POST as Handler;
}

function request(): Request {
  const form = new FormData();
  form.append("file", new File([new Uint8Array(4096)], "take.webm", { type: "audio/webm" }));
  form.append("storyId", "s1");
  form.append("quizId", "q1");
  return new Request("http://localhost/api/story-say-check", { method: "POST", body: form });
}

beforeEach(() => {
  vi.clearAllMocks();
  verifyRequestUser.mockResolvedValue("user-1");
  sectionDailyLimit.mockResolvedValue(30);
  consumeQuota.mockResolvedValue({ allowed: true, requestCount: 1 });
  process.env["GROQ_API_KEY"] = "test-key";
});

describe("story-say-check transcription duration", () => {
  it("asks Groq for verbose_json and logs the returned duration", async () => {
    const fetchMock = vi.fn(async (_url: unknown, init: unknown) =>
      new Response(
        JSON.stringify({
          text: "My name is Vale",
          duration: 12.5,
          segments: [{ avg_logprob: -0.1, no_speech_prob: 0.01 }],
        }),
        { status: 200, headers: { "content-type": "application/json" } },
      ),
    );
    vi.stubGlobal("fetch", fetchMock);

    const post = await handler();
    const res = await post({ request: request() });
    expect(res.status).toBe(200);

    const sent = fetchMock.mock.calls[0]?.[1] as unknown as { body: FormData };
    expect(sent.body.get("response_format")).toBe("verbose_json");

    const call = logGroqCall.mock.calls.find((c) => c[4] === true);
    expect(call?.[3]).toBe(12.5);
  });

  it("logs a null duration when Groq omits it", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () =>
        new Response(JSON.stringify({ text: "My name is Vale" }), {
          status: 200,
          headers: { "content-type": "application/json" },
        }),
      ),
    );

    const post = await handler();
    await post({ request: request() });

    const call = logGroqCall.mock.calls.find((c) => c[4] === true);
    expect(call?.[3]).toBeNull();
  });
});
