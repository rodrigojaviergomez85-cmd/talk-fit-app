import { useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { ChevronDown, Mail } from "lucide-react";
import { AppShell } from "@/components/fluency/AppShell";
import { APP_BUILD_ID } from "@/lib/build-id";
import { cn } from "@/lib/utils";

const SUPPORT_EMAIL = "desarrollo.aplicaciones@e4ccglobal.com";
const LANG_KEY = "fluency-support-lang";

type Lang = "es" | "en";

const COPY = {
  es: {
    title: "Soporte",
    contactTitle: "Contáctanos",
    contactBody:
      "Escríbenos y te ayudamos con tu cuenta, tus grabaciones o cualquier problema técnico.",
    contactCta: "Escribir a soporte",
    contactNote: "Respondemos de lunes a viernes en un máximo de 2 días hábiles.",
    mailSubject: "Soporte – Fluency App",
    mailBody:
      "Correo de la cuenta:\nDispositivo (modelo y versión):\nDescripción del problema:\n",
    faqTitle: "Preguntas frecuentes",
    faq: [
      {
        q: "La app no graba mi voz",
        a: "Revisa en tu teléfono: Ajustes > Fluency App > Micrófono y activa el permiso. Después cierra la app por completo y vuelve a abrirla.",
      },
      {
        q: "No escucho el audio",
        a: "Revisa el interruptor de silencio de tu teléfono, sube el volumen y desconecta los auriculares Bluetooth para descartar que el sonido salga por otro dispositivo.",
      },
      {
        q: "No puedo iniciar sesión",
        a: "Si te registraste con Google, tu cuenta no tiene contraseña: entra con el botón de Google. Si te registraste con correo, usa «¿Olvidaste tu contraseña?» en la pantalla de inicio de sesión.",
      },
      {
        q: "Perdí mi progreso",
        a: "Tu progreso vive en tu cuenta, no en tu teléfono. Verifica que iniciaste sesión con la misma cuenta (mismo correo o mismo Google) que usaste antes.",
      },
      {
        q: "Quiero eliminar mi cuenta",
        a: "Puedes solicitar la eliminación de tu cuenta y tus datos desde nuestra página de eliminación de cuenta.",
        link: { to: "/eliminar-cuenta", label: "Eliminar mi cuenta" },
      },
    ],
    reqTitle: "Requisitos",
    reqs: [
      "iOS 15 o posterior",
      "Conexión a internet",
      "Micrófono con permiso concedido",
    ],
    version: "Versión",
  },
  en: {
    title: "Support",
    contactTitle: "Contact us",
    contactBody:
      "Write to us and we'll help with your account, your recordings or any technical issue.",
    contactCta: "Email support",
    contactNote: "We reply Monday to Friday within 2 business days.",
    mailSubject: "Support – Fluency App",
    mailBody:
      "Account email:\nDevice (model and version):\nProblem description:\n",
    faqTitle: "Frequently asked questions",
    faq: [
      {
        q: "The app doesn't record my voice",
        a: "On your phone go to Settings > Fluency App > Microphone and enable the permission. Then fully close the app and open it again.",
      },
      {
        q: "I can't hear the audio",
        a: "Check your phone's silent switch, turn the volume up, and disconnect Bluetooth headphones to rule out the sound playing on another device.",
      },
      {
        q: "I can't sign in",
        a: "If you signed up with Google, your account has no password: use the Google button. If you signed up with email, use “Forgot your password?” on the sign-in screen.",
      },
      {
        q: "I lost my progress",
        a: "Your progress lives in your account, not on your phone. Make sure you signed in with the same account (same email or same Google) you used before.",
      },
      {
        q: "I want to delete my account",
        a: "You can request deletion of your account and data from our account deletion page.",
        link: { to: "/eliminar-cuenta", label: "Delete my account" },
      },
    ],
    reqTitle: "Requirements",
    reqs: [
      "iOS 15 or later",
      "Internet connection",
      "Microphone with permission granted",
    ],
    version: "Version",
  },
} as const;

export const Route = createFileRoute("/soporte")({
  head: () => ({
    meta: [
      { title: "Soporte — Fluency App" },
      {
        name: "description",
        content:
          "Contacta al equipo de Fluency App, resuelve problemas de micrófono, audio o inicio de sesión y consulta los requisitos de la app.",
      },
      { property: "og:title", content: "Soporte — Fluency App" },
      {
        property: "og:description",
        content: "Ayuda y contacto de Fluency App: micrófono, audio, sesión y progreso.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: SupportPage,
});

function readLang(): Lang {
  if (typeof window === "undefined") return "es";
  return window.localStorage.getItem(LANG_KEY) === "en" ? "en" : "es";
}

function SupportPage() {
  const [lang, setLang] = useState<Lang>(() => readLang());
  const c = COPY[lang];

  const pick = (next: Lang) => {
    setLang(next);
    try {
      window.localStorage.setItem(LANG_KEY, next);
    } catch {
      /* private mode */
    }
  };

  const mailto = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(
    c.mailSubject,
  )}&body=${encodeURIComponent(c.mailBody)}`;

  return (
    <AppShell title={c.title}>
      <div className="space-y-5">
        <div className="flex justify-end">
          <div
            className="inline-flex rounded-full border border-border bg-card p-1"
            role="group"
            aria-label="Language / Idioma"
          >
            {(["es", "en"] as const).map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => pick(l)}
                aria-pressed={lang === l}
                className={cn(
                  "rounded-full px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em]",
                  lang === l
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground",
                )}
              >
                {l === "es" ? "ES" : "EN"}
              </button>
            ))}
          </div>
        </div>

        <section className="space-y-3 rounded-3xl bg-card p-5 shadow-[var(--shadow-card)]">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
            {c.contactTitle}
          </p>
          <p className="text-[14px] text-muted-foreground">{c.contactBody}</p>
          <p className="break-all text-[15px] font-bold">{SUPPORT_EMAIL}</p>
          <a
            href={mailto}
            className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-2xl bg-primary px-5 text-[13px] font-bold uppercase tracking-[0.14em] text-primary-foreground"
          >
            <Mail className="size-4" aria-hidden /> {c.contactCta}
          </a>
          <p className="text-[12px] text-muted-foreground">{c.contactNote}</p>
        </section>

        <section className="space-y-3">
          <p className="px-1 text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
            {c.faqTitle}
          </p>
          <div className="space-y-2">
            {c.faq.map((item) => (
              <Faq
                key={item.q}
                q={item.q}
                a={item.a}
                link={"link" in item ? item.link : undefined}
              />
            ))}
          </div>
        </section>

        <section className="space-y-3 rounded-3xl bg-card p-5 shadow-[var(--shadow-card)]">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
            {c.reqTitle}
          </p>
          <ul className="list-disc space-y-1.5 pl-5 text-[14px] text-muted-foreground">
            {c.reqs.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </section>

        <footer className="space-y-3 pb-2 pt-1 text-center">
          <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[12px] font-bold">
            <Link to="/privacy-policy" className="text-primary underline underline-offset-2">
              {lang === "es" ? "Política de privacidad" : "Privacy policy"}
            </Link>
            <Link to="/terminos" className="text-primary underline underline-offset-2">
              {lang === "es" ? "Términos" : "Terms"}
            </Link>
            <Link to="/eliminar-cuenta" className="text-primary underline underline-offset-2">
              {lang === "es" ? "Eliminar cuenta" : "Delete account"}
            </Link>
            <Link to="/contacto" className="text-primary underline underline-offset-2">
              {lang === "es" ? "Contacto" : "Contact"}
            </Link>
          </nav>
          <p className="text-[11px] text-muted-foreground">
            {c.version} {APP_BUILD_ID}
          </p>
        </footer>
      </div>
    </AppShell>
  );
}

function Faq({
  q,
  a,
  link,
}: {
  q: string;
  a: string;
  link?: { to: string; label: string } | undefined;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex min-h-[52px] w-full items-center justify-between gap-3 px-4 py-3 text-left"
      >
        <span className="text-[14px] font-bold">{q}</span>
        <ChevronDown
          className={cn("size-4 shrink-0 text-muted-foreground transition-transform", open && "rotate-180")}
          aria-hidden
        />
      </button>
      {open ? (
        <div className="space-y-3 border-t border-border px-4 py-3.5">
          <p className="text-[13px] leading-snug text-muted-foreground">{a}</p>
          {link ? (
            <Link
              to={link.to}
              className="inline-flex min-h-[44px] items-center rounded-xl border border-border px-4 text-[12px] font-bold uppercase tracking-[0.12em] text-primary"
            >
              {link.label}
            </Link>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
