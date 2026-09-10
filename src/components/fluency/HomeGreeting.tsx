import { useAuth } from "@/lib/auth";
import { useAppLang } from "@/lib/i18n";

/** Greeting + today's local date, in the learner's chosen language. */
export function HomeGreeting() {
  const { user } = useAuth();
  const { lang, t } = useAppLang();
  const es = lang === "es";
  const greeting = es ? "¡Hola" : "Hello";

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
      <h1 className="text-[28px] font-extrabold leading-tight tracking-tight">
        {greeting}
        {pretty ? `, ${pretty}` : ""}!
      </h1>
      <p className="mt-0.5 text-[14px] font-semibold text-muted-foreground">{date}</p>
    </div>
  );
}
