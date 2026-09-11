import { useEffect, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Loader2, MessageCircle, Send } from "lucide-react";
import { AppShell } from "@/components/fluency/AppShell";
import { useAppLang } from "@/lib/i18n";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/ai-coach")({
  head: () => ({
    meta: [
      { title: "AI Coach — Fluency App" },
      {
        name: "description",
        content: "Ask short English questions about grammar, vocabulary and how to say something.",
      },
      { property: "og:title", content: "AI Coach — Fluency App" },
      {
        property: "og:description",
        content: "Short answers to your English grammar and vocabulary questions.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AiCoachPage,
});

type Turn = { role: "user" | "coach"; text: string };

function AiCoachPage() {
  const { t } = useAppLang();
  const [turns, setTurns] = useState<Turn[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [limitReached, setLimitReached] = useState(false);
  const [used, setUsed] = useState<number | null>(null);
  const [limit, setLimit] = useState<number | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [turns, busy]);

  async function ask(question: string) {
    const text = question.trim();
    if (!text || busy || limitReached) return;

    setError(null);
    setInput("");
    setTurns((prev) => [...prev, { role: "user", text }]);
    setBusy(true);

    try {
      const { data } = await supabase.auth.getSession();
      const token = data.session?.access_token;
      if (!token) {
        setError(t("aiCoach.authError"));
        return;
      }

      const res = await fetch("/api/ai-coach", {
        method: "POST",
        headers: { "content-type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ question: text }),
      });
      const body = (await res.json().catch(() => null)) as {
        answer?: string;
        used?: number;
        limit?: number | null;
        error?: string;
      } | null;

      if (res.status === 429 || body?.error === "limit") {
        setLimitReached(true);
        setUsed(body?.used ?? null);
        setLimit(body?.limit ?? null);
        return;
      }
      if (res.status === 401) {
        setError(t("aiCoach.authError"));
        return;
      }
      if (!res.ok || !body?.answer) {
        setError(t("aiCoach.error"));
        return;
      }

      setTurns((prev) => [...prev, { role: "coach", text: body.answer as string }]);
      setUsed(typeof body.used === "number" ? body.used : null);
      setLimit(typeof body.limit === "number" ? body.limit : null);
    } catch {
      setError(t("aiCoach.error"));
    } finally {
      setBusy(false);
      inputRef.current?.focus();
    }
  }

  const counter =
    limit !== null && used !== null
      ? t("aiCoach.counter").replace("{used}", String(used)).replace("{limit}", String(limit))
      : null;

  return (
    <AppShell title={t("aiCoach.title")} subtitle={t("aiCoach.subtitle")} hideSync>
      <div className="space-y-4">
        {counter ? (
          <p className="text-center text-[12px] font-semibold text-muted-foreground">{counter}</p>
        ) : null}

        {turns.length === 0 && !limitReached ? (
          <div className="rounded-2xl border border-border bg-card p-4">
            <p className="flex items-center gap-2 text-[13px] font-bold text-foreground">
              <MessageCircle className="size-4 text-primary" aria-hidden />
              {t("aiCoach.suggestionsTitle")}
            </p>
            <div className="mt-3 space-y-2">
              {[t("aiCoach.suggestion1"), t("aiCoach.suggestion2"), t("aiCoach.suggestion3")].map(
                (s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => void ask(s)}
                    className="min-h-[44px] w-full rounded-xl border border-border px-3 py-2 text-left text-[13px] font-semibold text-foreground transition-colors hover:bg-secondary"
                  >
                    {s}
                  </button>
                ),
              )}
            </div>
          </div>
        ) : null}

        <div className="space-y-3">
          {turns.map((turn, i) => (
            <div
              key={`${turn.role}-${i}`}
              className={turn.role === "user" ? "flex justify-end" : "flex justify-start"}
            >
              <div
                className={
                  turn.role === "user"
                    ? "max-w-[85%] rounded-2xl bg-primary px-4 py-2.5 text-[14px] font-semibold text-primary-foreground"
                    : "max-w-[92%] whitespace-pre-wrap text-[14px] leading-relaxed text-foreground"
                }
              >
                {turn.text}
              </div>
            </div>
          ))}
          {busy ? (
            <p className="flex items-center gap-2 text-[13px] font-semibold text-muted-foreground">
              <Loader2 className="size-4 animate-spin" aria-hidden />
              {t("aiCoach.thinking")}
            </p>
          ) : null}
          <div ref={endRef} />
        </div>

        {limitReached ? (
          <div className="rounded-2xl border border-border bg-secondary p-4">
            <p className="text-[14px] font-bold text-foreground">{t("aiCoach.limitTitle")}</p>
            <p className="mt-1 text-[13px] text-muted-foreground">{t("aiCoach.limitBody")}</p>
          </div>
        ) : (
          <form
            onSubmit={(event) => {
              event.preventDefault();
              void ask(input);
            }}
            className="space-y-2"
          >
            <textarea
              ref={inputRef}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault();
                  void ask(input);
                }
              }}
              rows={3}
              maxLength={600}
              placeholder={t("aiCoach.placeholder")}
              className="w-full resize-none rounded-2xl border border-border bg-card p-3 text-[14px] text-foreground outline-none focus:border-primary"
            />
            <button
              type="submit"
              disabled={busy || !input.trim()}
              className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-2xl bg-primary px-4 text-[13px] font-extrabold uppercase tracking-[0.14em] text-primary-foreground disabled:opacity-50"
            >
              <Send className="size-4" aria-hidden />
              {t("aiCoach.send")}
            </button>
          </form>
        )}

        {error ? (
          <p className="text-center text-[13px] font-semibold text-destructive">{error}</p>
        ) : null}

        <p className="pb-2 text-center text-[12px] text-muted-foreground">{t("aiCoach.disclaimer")}</p>
      </div>
    </AppShell>
  );
}
