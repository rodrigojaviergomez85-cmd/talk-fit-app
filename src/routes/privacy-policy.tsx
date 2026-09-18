import { Link, createFileRoute } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { LegalFooter } from "@/components/fluency/LegalFooter";
import { useAppLang } from "@/lib/i18n";
import { AUDIO_FINAL_RETENTION_DAYS, LEGAL_EFFECTIVE_DATE, SUPPORT_EMAIL } from "@/lib/legal";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy · Fluency App" },
      {
        name: "description",
        content:
          "Fluency App privacy policy: what data we collect, how we use voice recordings, and your rights.",
      },
      { property: "og:title", content: "Privacy Policy · Fluency App" },
      {
        property: "og:description",
        content:
          "Fluency App privacy policy: what data we collect, how we use voice recordings, and your rights.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "index, follow" },
    ],
  }),
  component: PrivacyPolicyPage,
});

function PrivacyPolicyPage() {
  const { lang, setLang } = useAppLang();
  const es = lang === "es";

  return (
    <div className="min-h-screen bg-background pb-10">
      <header className="bg-navy px-5 pb-6 pt-[max(1.25rem,env(safe-area-inset-top))] text-navy-foreground">
        <div className="mx-auto w-full max-w-lg">
          <Link
            to="/"
            className="inline-flex items-center gap-1 text-[12px] font-extrabold uppercase tracking-[0.18em] text-primary"
          >
            <ChevronLeft className="size-4" />
            {es ? "Volver al inicio" : "Back to home"}
          </Link>
          <h1 className="mt-3 text-2xl font-extrabold tracking-tight">
            {es ? "Política de privacidad" : "Privacy Policy"}
          </h1>
          <p className="mt-1 text-[14px] text-navy-foreground/75">
            Fluency App · fluencye4cc.app
          </p>
        </div>
      </header>

      <main className="mx-auto w-full max-w-lg px-4 py-5">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-[12px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
            {es ? "Idioma" : "Language"}
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setLang("es")}
              className={`rounded-full px-3 py-1 text-[12px] font-extrabold ${
                es
                  ? "bg-primary text-primary-foreground"
                  : "border border-border bg-card text-foreground"
              }`}
            >
              Español
            </button>
            <button
              type="button"
              onClick={() => setLang("en")}
              className={`rounded-full px-3 py-1 text-[12px] font-extrabold ${
                !es
                  ? "bg-primary text-primary-foreground"
                  : "border border-border bg-card text-foreground"
              }`}
            >
              English
            </button>
          </div>
        </div>

        <section className="space-y-5 rounded-3xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
          <p className="text-[13px] font-semibold text-muted-foreground">
            {es
              ? `Fecha efectiva: ${LEGAL_EFFECTIVE_DATE.es}`
              : `Effective date: ${LEGAL_EFFECTIVE_DATE.en}`}
          </p>

          {es ? <SpanishContent /> : <EnglishContent />}

          <div className="pt-4">
            <LegalFooter current="privacidad" />
          </div>

          <p className="pt-2 text-[12px] text-muted-foreground">
            © 2026 E4CC Global · Fluency App.{" "}
            {es ? "Todos los derechos reservados." : "All rights reserved."}
          </p>
        </section>
      </main>
    </div>
  );
}

function EnglishContent() {
  return (
    <>
      <PolicySection title="1. Introduction">
        Fluency App (“we”, “us”, or “our”) helps Spanish-speaking adults practice English speaking.
        This Privacy Policy explains what information we collect, how we use it, and your rights.
      </PolicySection>

      <PolicySection title="2. Information we collect">
        <ul className="list-disc space-y-1 pl-5 text-[14px] leading-relaxed text-foreground">
          <li>
            <strong>Account information:</strong> email address, optional name, and authentication
            details provided when you sign up.
          </li>
          <li>
            <strong>Voice recordings:</strong> audio you record while practicing. These are used to
            evaluate pronunciation and fluency.
          </li>
          <li>
            <strong>Practice data:</strong> completed lessons, scores, streaks, progress, and
            device-generated identifiers.
          </li>
          <li>
            <strong>Profile photo (optional):</strong> if you choose to upload one, it is stored in
            private storage and automatically reviewed by an AI safety check before it becomes
            visible. You can remove it at any time.
          </li>
          <li>
            <strong>Support messages:</strong> the name, email and message you send through the
            contact form, so we can reply.
          </li>
          <li>
            <strong>Device data:</strong> device type, operating system, app version, and coarse
            location inferred from IP (for analytics and diagnostics). We never access your camera
            roll without your action, and we never collect GPS location.
          </li>
        </ul>
      </PolicySection>

      <PolicySection title="3. How we use your information">
        <ul className="list-disc space-y-1 pl-5 text-[14px] leading-relaxed text-foreground">
          <li>To provide personalized speaking exercises and feedback.</li>
          <li>To track your learning progress, streaks, and achievements.</li>
          <li>To improve app performance, lessons, and AI coaching.</li>
          <li>To send essential service messages (we do not send marketing emails).</li>
        </ul>
      </PolicySection>

      <PolicySection title="4. Voice recordings, AI and retention">
        Your practice recordings are sent to secure AI speech services for transcription and
        feedback. We do not use them for advertising and we do not use them to train our own models.
        Retention is automatic: intermediate takes are deleted a few hours after practice, and final
        audio is deleted automatically {AUDIO_FINAL_RETENTION_DAYS} days after it is recorded. Full
        transcripts are not stored; we keep only the short quoted fragment the coach needs to explain
        a correction, together with your score and progress.
      </PolicySection>

      <PolicySection title="5. Data sharing and AI providers">
        We do not sell your data. We share the minimum needed with our service providers:{" "}
        <strong>Supabase</strong> (hosting, authentication, database and private audio storage),{" "}
        <strong>Groq</strong> (speech transcription of your recordings) and the{" "}
        <strong>Lovable AI Gateway</strong>, which routes requests to OpenAI models for coaching
        feedback, generated speech and profile-photo safety review. We also share information with
        legal authorities when required by applicable law.
      </PolicySection>

      <PolicySection title="6. Data security">
        We use encryption in transit (HTTPS/TLS), authenticated access controls, and Row-Level
        Security in our database. Recordings are stored in private cloud storage accessible only to
        you and the app.
      </PolicySection>

      <PolicySection title="7. Children’s privacy">
        Fluency App is intended for adults 18 years and older. We do not knowingly collect data from
        children under 13. If you believe a child has provided data, contact us to delete it.
      </PolicySection>

      <PolicySection title="8. Your rights">
        You can access, update, or delete your account and data, request a copy of your data, and
        withdraw consent for optional features at any time. Email us at{" "}
        <a
          href={`mailto:${SUPPORT_EMAIL}`}
          className="font-semibold text-primary underline underline-offset-2"
        >
          {SUPPORT_EMAIL}
        </a>{" "}
        — the same address handles support and privacy requests — or use the{" "}
        <Link to="/contacto" className="font-semibold text-primary underline underline-offset-2">
          contact form
        </Link>
        . We reply Monday to Friday within 2 business days.
      </PolicySection>

      <PolicySection title="9. Changes to this policy">
        We may update this Privacy Policy. The effective date at the top will always reflect the
        latest version.
      </PolicySection>
    </>
  );
}

function SpanishContent() {
  return (
    <>
      <PolicySection title="1. Introducción">
        Fluency App (“nosotros”) ayuda a adultos hispanohablantes a practicar inglés hablado. Esta
        Política de Privacidad explica qué información recopilamos, cómo la usamos y cuáles son tus
        derechos.
      </PolicySection>

      <PolicySection title="2. Información que recopilamos">
        <ul className="list-disc space-y-1 pl-5 text-[14px] leading-relaxed text-foreground">
          <li>
            <strong>Información de cuenta:</strong> correo electrónico, nombre opcional y datos de
            autenticación al registrarte.
          </li>
          <li>
            <strong>Grabaciones de voz:</strong> audios que grabas durante la práctica. Se usan
            para evaluar pronunciación y fluidez.
          </li>
          <li>
            <strong>Datos de práctica:</strong> lecciones completadas, puntajes, rachas, progreso e
            identificadores generados por el dispositivo.
          </li>
          <li>
            <strong>Foto de perfil (opcional):</strong> si decides subir una, se guarda en
            almacenamiento privado y pasa por una revisión automática de seguridad con IA antes de
            mostrarse. Puedes quitarla cuando quieras.
          </li>
          <li>
            <strong>Mensajes de soporte:</strong> el nombre, correo y mensaje que envías por el
            formulario de contacto, para poder responderte.
          </li>
          <li>
            <strong>Datos del dispositivo:</strong> tipo de dispositivo, sistema operativo, versión
            de la app y ubicación aproximada desde IP (para análisis y diagnóstico). No accedemos a
            tus fotos sin que tú lo hagas y nunca recogemos ubicación GPS.
          </li>
        </ul>
      </PolicySection>

      <PolicySection title="3. Cómo usamos tu información">
        <ul className="list-disc space-y-1 pl-5 text-[14px] leading-relaxed text-foreground">
          <li>Para ofrecerte ejercicios de speaking y retroalimentación personalizados.</li>
          <li>Para registrar tu progreso, rachas y logros.</li>
          <li>Para mejorar el rendimiento, las lecciones y el coach de IA.</li>
          <li>Para enviar mensajes esenciales del servicio (no enviamos correos de marketing).</li>
        </ul>
      </PolicySection>

      <PolicySection title="4. Grabaciones de voz, IA y conservación">
        Tus grabaciones se envían a servicios seguros de voz e IA para transcripción y
        retroalimentación. No las usamos para publicidad ni para entrenar modelos propios. El borrado
        es automático: las tomas intermedias se eliminan pocas horas después de la práctica y el
        audio final se elimina automáticamente a los {AUDIO_FINAL_RETENTION_DAYS} días de grabarse.
        No guardamos la transcripción completa; solo conservamos la cita corta que el coach necesita
        para explicarte una corrección, junto con tu puntaje y tu progreso.
      </PolicySection>

      <PolicySection title="5. Compartir datos y proveedores de IA">
        No vendemos tus datos. Compartimos lo mínimo necesario con nuestros proveedores:{" "}
        <strong>Supabase</strong> (hosting, autenticación, base de datos y almacenamiento privado de
        audio), <strong>Groq</strong> (transcripción de tus grabaciones) y el{" "}
        <strong>Lovable AI Gateway</strong>, que envía las solicitudes a modelos de OpenAI para la
        retroalimentación del coach, las voces generadas y la revisión de seguridad de la foto de
        perfil. También compartimos información con autoridades legales cuando la ley aplicable lo
        requiera.
      </PolicySection>

      <PolicySection title="6. Seguridad de datos">
        Usamos cifrado en tránsito (HTTPS/TLS), controles de acceso autenticados y seguridad a nivel
        de filas en la base de datos. Las grabaciones se guardan en almacenamiento privado en la nube
        al que solo tú y la app pueden acceder.
      </PolicySection>

      <PolicySection title="7. Privacidad infantil">
        Fluency App está dirigida a adultos de 18 años o más. No recopilamos conscientemente datos de
        menores de 13 años. Si crees que un menor proporcionó datos, contáctanos para eliminarlos.
      </PolicySection>

      <PolicySection title="8. Tus derechos">
        Puedes acceder, actualizar o eliminar tu cuenta y tus datos, solicitar una copia y retirar el
        consentimiento para funciones opcionales en cualquier momento. Escríbenos a{" "}
        <a
          href={`mailto:${SUPPORT_EMAIL}`}
          className="font-semibold text-primary underline underline-offset-2"
        >
          {SUPPORT_EMAIL}
        </a>{" "}
        — el mismo correo atiende soporte y privacidad — o usa el{" "}
        <Link to="/contacto" className="font-semibold text-primary underline underline-offset-2">
          formulario de contacto
        </Link>
        . Respondemos de lunes a viernes en un máximo de 2 días hábiles.
      </PolicySection>

      <PolicySection title="9. Cambios a esta política">
        Podemos actualizar esta Política de Privacidad. La fecha efectiva en la parte superior siempre
        reflejará la versión más reciente.
      </PolicySection>
    </>
  );
}

function PolicySection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-[16px] font-extrabold tracking-tight text-foreground">{title}</h2>
      <div className="mt-2 text-[14px] leading-relaxed text-muted-foreground">{children}</div>
    </div>
  );
}
