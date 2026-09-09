import { useAuth } from "@/lib/auth";
import { useAppLang } from "@/lib/i18n";

/** Time-of-day greeting + today's date. The greeting is always in English
 *  so learners see the target language first, even when the app is in Spanish. */
export function HomeGreeting() {
  const { lang } = useAppLang();
  const { user } = useAuth();
  const es = lang === "es";
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 19 ? "Good afternoon" : "Good evening";

  const meta = (user?.user_metadata ?? {}) as { full_name?: string; name?: string };
  const raw = meta.full_name || meta.name || user?.email?.split("@")[0] || "";
  const name = raw ? raw.split(" ")[0] : "";
  const pretty = name ? name.charAt(0).toUpperCase() + name.slice(1) : "";

  const rawDate = new Date().toLocaleDateString(es ? "es-ES" : "en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
  const date = rawDate.charAt(0).toUpperCase() + rawDate.slice(1);

  return (
    <div>
      <h1 className="text-[22px] font-extrabold leading-tight tracking-tight">
        {greeting}
        {pretty ? `, ${pretty}` : ""}
      </h1>
      <p className="mt-0.5 text-[12px] font-semibold text-muted-foreground">{date}</p>
    </div>
  );
}
