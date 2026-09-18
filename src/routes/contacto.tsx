import { useEffect, useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, Loader2, Mail, Send } from "lucide-react";
import { AppShell } from "@/components/fluency/AppShell";
import { supabase } from "@/integrations/supabase/client";
import { APP_BUILD_ID } from "@/lib/build-id";
import { cn } from "@/lib/utils";

const SUPPORT_EMAIL = "desarrollo.aplicaciones@e4ccglobal.com";
const LANG_KEY = "fluency-support-lang";

type Lang = "es" | "en";

const CATEGORIES = [
  { value: "problema-tecnico", es: "Problema técnico", en: "Technical issue" },
  { value: "pregunta-cuenta", es: "Pregunta sobre mi cuenta", en: "Question about my account" },
  { value: "facturacion", es: "Facturación", en: "Billing" },
  { value: "privacidad", es: "Privacidad y datos", en: "Privacy and data" },
  { value: "otro", es: "Otro", en: "Other" },
] as const;

const COPY = {
  es: {
    title: "Contacto",
    intro:
      "Cuéntanos qué está pasando y nuestro equipo te responderá por correo.",
    name: "Nombre",
    namePh: "Tu nombre",
    email: "Correo",
    emailPh: "tu@correo.com",
    emailReadonlyHint: "Usamos el correo de tu cuenta.",
    category: "Categoría",
    categoryPh: "Elige una categoría",
    message: "Mensaje",
    messagePh: "Describe tu problema o pregunta con el mayor detalle posible…",
    messageHint: "Mínimo 20 caracteres.",
    submit: "Enviar mensaje",
    sending: "Enviando…",
    errors: {
      name: "Escribe tu nombre.",
      email: "Escribe un correo válido.",
      category: "Elige una categoría.",
      message: "El mensaje debe tener al menos 20 caracteres.",
    },
    successTitle: "¡Mensaje enviado!",
    successBody: "Tu número de ticket es",
    successNote:
      "Guárdalo como referencia. Te responderemos de lunes a viernes en un máximo de 2 días hábiles.",
    successAgain: "Enviar otro mensaje",
    errorTitle: "No pudimos enviar tu mensaje",
    errorBody: "Parece un problema de conexión. Escríbenos directamente a",
    companyTitle: "E4CC Global",
    companyLines: [
      "E4CC Global — Fluency App",
      `Soporte: ${SUPPORT_EMAIL}`,
      "Horario de atención: lunes a viernes, horario de El Salvador (UTC-6)",
    ],
    links: { support: "Soporte", privacy: "Política de privacidad" },
  },
  en: {
    title: "Contact",
    intro: "Tell us what's going on and our team will reply by email.",
    name: "Name",
    namePh: "Your name",
    email: "Email",
    emailPh: "you@email.com",
    emailReadonlyHint: "We use the email from your account.",
    category: "Category",
    categoryPh: "Choose a category",
    message: "Message",
    messagePh: "Describe your issue or question in as much detail as possible…",
    messageHint: "Minimum 20 characters.",
    submit: "Send message",
    sending: "Sending…",
    errors: {
      name: "Please enter your name.",
      email: "Please enter a valid email address.",
      category: "Please choose a category.",
      message: "Your message must be at least 20 characters long.",
    },
    successTitle: "Message sent!",
    successBody: "Your ticket number is",
    successNote:
      "Keep it as a reference. We reply Monday to Friday within 2 business days.",
    successAgain: "Send another message",
    errorTitle: "We couldn't send your message",
    errorBody: "It looks like a connection issue. Write to us directly at",
    companyTitle: "E4CC Global",
    companyLines: [
      "E4CC Global — Fluency App",
      `Support: ${SUPPORT_EMAIL}`,
      "Support hours: Monday to Friday, El Salvador time (UTC-6)",
    ],
    links: { support: "Support", privacy: "Privacy policy" },
  },
} as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const Route = createFileRoute("/contacto")({
  component: ContactPage,
  head: () => ({
    meta: [
      { title: "Contacto — Fluency App" },
      { name: "description", content: "Contacta al equipo de soporte de Fluency App." },
    ],
  }),
});

function ContactPage() {
  const [lang, setLang] = useState<Lang>(() => {
    if (typeof window === "undefined") return "es";
    return (window.localStorage.getItem(LANG_KEY) as Lang) || "es";
  });
  const t = COPY[lang];

  const [userId, setUserId] = useState<string | null>(null);
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [emailLocked, setEmailLocked] = useState(false);
  const [categoria, setCategoria] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const [sentId, setSentId] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    window.localStorage.setItem(LANG_KEY, lang);
  }, [lang]);

  useEffect(() => {
    let active = true;
    supabase.auth.getUser().then(({ data }) => {
      if (!active || !data.user) return;
      setUserId(data.user.id);
      if (data.user.email) {
        setEmail(data.user.email);
        setEmailLocked(true);
      }
    });
    return () => {
      active = false;
    };
  }, []);

  const validate = () => {
    const next: Record<string, string> = {};
    if (!nombre.trim()) next.nombre = t.errors.name;
    if (!EMAIL_RE.test(email.trim())) next.email = t.errors.email;
    if (!categoria) next.categoria = t.errors.category;
    if (mensaje.trim().length < 20) next.mensaje = t.errors.message;
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFailed(false);
    if (!validate()) return;
    setSending(true);
    try {
      const { data, error } = await supabase
        .from("support_tickets")
        .insert({
          user_id: userId,
          nombre: nombre.trim(),
          email: email.trim(),
          categoria,
          mensaje: mensaje.trim(),
          app_version: APP_BUILD_ID,
          user_agent: navigator.userAgent,
        })
        .select("id")
        .single();
      if (error) throw error;
      setSentId(data.id);
    } catch {
      setFailed(true);
    } finally {
      setSending(false);
    }
  };

  const inputCls = (bad?: string) =>
    cn(
      "w-full rounded-2xl border bg-card px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary",
      bad ? "border-destructive" : "border-border",
    );

  return (
    <AppShell>
      <main className="mx-auto w-full max-w-xl px-4 py-8 pb-24">
        <header className="flex items-center justify-between gap-3">
          <h1 className="text-3xl font-extrabold tracking-tight text-navy">
            {t.title}
          </h1>
          <div className="flex rounded-full border border-border bg-card p-1 text-xs font-bold">
            {(["es", "en"] as const).map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setLang(l)}
                className={cn(
                  "rounded-full px-3 py-1 uppercase transition-colors",
                  lang === l ? "bg-primary text-primary-foreground" : "text-muted-foreground",
                )}
              >
                {l}
              </button>
            ))}
          </div>
        </header>
        <p className="mt-2 text-sm text-muted-foreground">{t.intro}</p>

        {sentId ? (
          <section className="mt-6 rounded-3xl border border-border bg-card p-6 text-center">
            <CheckCircle2 className="mx-auto h-10 w-10 text-primary" />
            <h2 className="mt-3 text-xl font-bold text-navy">{t.successTitle}</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {t.successBody}{" "}
              <span className="font-mono font-bold text-foreground">
                {sentId.slice(0, 8)}
              </span>
            </p>
            <p className="mt-2 text-xs text-muted-foreground">{t.successNote}</p>
            <button
              type="button"
              onClick={() => {
                setSentId(null);
                setMensaje("");
                setCategoria("");
              }}
              className="mt-4 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground"
            >
              {t.successAgain}
            </button>
          </section>
        ) : (
          <form onSubmit={onSubmit} noValidate className="mt-6 space-y-4">
            <div>
              <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-muted-foreground">
                {t.name}
              </label>
              <input
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder={t.namePh}
                maxLength={100}
                className={inputCls(errors.nombre)}
              />
              {errors.nombre && <p className="mt-1 text-xs text-destructive">{errors.nombre}</p>}
            </div>
            <div>
              <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-muted-foreground">
                {t.email}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.emailPh}
                maxLength={255}
                readOnly={emailLocked}
                className={cn(inputCls(errors.email), emailLocked && "opacity-70")}
              />
              {emailLocked && !errors.email && (
                <p className="mt-1 text-xs text-muted-foreground">{t.emailReadonlyHint}</p>
              )}
              {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
            </div>
            <div>
              <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-muted-foreground">
                {t.category}
              </label>
              <select
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                className={inputCls(errors.categoria)}
              >
                <option value="">{t.categoryPh}</option>
                {CATEGORIES.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c[lang]}
                  </option>
                ))}
              </select>
              {errors.categoria && <p className="mt-1 text-xs text-destructive">{errors.categoria}</p>}
            </div>
            <div>
              <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-muted-foreground">
                {t.message}
              </label>
              <textarea
                value={mensaje}
                onChange={(e) => setMensaje(e.target.value)}
                placeholder={t.messagePh}
                rows={5}
                maxLength={2000}
                className={cn(inputCls(errors.mensaje), "resize-y")}
              />
              <div className="mt-1 flex items-center justify-between">
                <p className={cn("text-xs", errors.mensaje ? "text-destructive" : "text-muted-foreground")}>
                  {errors.mensaje ?? t.messageHint}
                </p>
                <p className="text-xs text-muted-foreground">{mensaje.trim().length}/2000</p>
              </div>
            </div>

            {failed && (
              <div className="rounded-2xl border border-destructive/40 bg-destructive/10 p-4 text-sm">
                <p className="font-bold text-destructive">{t.errorTitle}</p>
                <p className="mt-1 text-muted-foreground">
                  {t.errorBody}{" "}
                  <a href={`mailto:${SUPPORT_EMAIL}`} className="font-semibold text-primary underline">
                    {SUPPORT_EMAIL}
                  </a>
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={sending}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3.5 text-sm font-bold text-primary-foreground transition-opacity disabled:opacity-60"
            >
              {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              {sending ? t.sending : t.submit}
            </button>
          </form>
        )}

        <section className="mt-10 rounded-3xl bg-navy p-6 text-navy-foreground">
          <h2 className="text-lg font-bold">{t.companyTitle}</h2>
          <ul className="mt-3 space-y-1.5 text-sm opacity-90">
            {t.companyLines.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold">
            <Link to="/soporte" className="text-primary-foreground underline underline-offset-4">
              {t.links.support}
            </Link>
            <Link to="/privacy-policy" className="text-primary-foreground underline underline-offset-4">
              {t.links.privacy}
            </Link>
          </div>
          <p className="mt-4 flex items-center gap-1.5 text-xs opacity-70">
            <Mail className="h-3.5 w-3.5" /> {SUPPORT_EMAIL}
          </p>
        </section>
      </main>
    </AppShell>
  );
}
