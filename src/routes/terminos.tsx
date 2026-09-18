import { Link, createFileRoute } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { LegalFooter } from "@/components/fluency/LegalFooter";
import { useAppLang } from "@/lib/i18n";
import { AUDIO_FINAL_RETENTION_DAYS, LEGAL_EFFECTIVE_DATE, SUPPORT_EMAIL } from "@/lib/legal";

export const Route = createFileRoute("/terminos")({
  head: () => ({
    meta: [
      { title: "Términos y condiciones · Fluency App" },
      {
        name: "description",
        content:
          "Términos y condiciones de Fluency App: uso del servicio, cuenta, grabaciones, retroalimentación de IA y responsabilidad.",
      },
      { property: "og:title", content: "Términos y condiciones · Fluency App" },
      {
        property: "og:description",
        content:
          "Términos y condiciones de Fluency App: uso del servicio, cuenta, grabaciones, retroalimentación de IA y responsabilidad.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "index, follow" },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
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
            {es ? "Términos y condiciones" : "Terms & Conditions"}
          </h1>
          <p className="mt-1 text-[14px] text-navy-foreground/75">
            Fluency App · E4CC Global · fluencye4cc.app
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
                es ? "bg-primary text-primary-foreground" : "border border-border bg-card text-foreground"
              }`}
            >
              Español
            </button>
            <button
              type="button"
              onClick={() => setLang("en")}
              className={`rounded-full px-3 py-1 text-[12px] font-extrabold ${
                !es ? "bg-primary text-primary-foreground" : "border border-border bg-card text-foreground"
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

          {es ? <SpanishTerms /> : <EnglishTerms />}

          <div className="pt-4">
            <LegalFooter current="terminos" />
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

function TermsSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-[16px] font-extrabold tracking-tight text-foreground">{title}</h2>
      <div className="mt-2 text-[14px] leading-relaxed text-muted-foreground">{children}</div>
    </div>
  );
}

function SupportMail() {
  return (
    <a
      href={`mailto:${SUPPORT_EMAIL}`}
      className="font-semibold text-primary underline underline-offset-2"
    >
      {SUPPORT_EMAIL}
    </a>
  );
}

function SpanishTerms() {
  return (
    <>
      <TermsSection title="1. Objeto del servicio">
        Fluency App es un servicio de entrenamiento de inglés hablado operado por E4CC Global. Ofrece
        lecciones diarias, historias, ejercicios de gramática, grabación de voz y retroalimentación
        automática generada con inteligencia artificial. Es una herramienta de práctica: no otorga
        títulos, certificaciones oficiales ni garantiza un resultado en ningún examen o proceso de
        selección. Al crear una cuenta o usar la app aceptas estos términos.
      </TermsSection>

      <TermsSection title="2. Edad mínima">
        Fluency App está dirigida a personas adultas de 18 años o más. No está diseñada para menores
        y no recopilamos conscientemente datos de menores de 13 años, como indica nuestra{" "}
        <Link to="/privacy-policy" className="font-semibold text-primary underline underline-offset-2">
          política de privacidad
        </Link>
        . Si detectamos una cuenta de una persona menor de edad podemos suspenderla y eliminar sus
        datos.
      </TermsSection>

      <TermsSection title="3. Tu cuenta y tus credenciales">
        Tu cuenta es personal e intransferible. Eres responsable de mantener la confidencialidad de
        tus credenciales y de toda la actividad realizada desde tu cuenta. Debes darnos información
        de registro veraz y avisarnos a <SupportMail /> si sospechas de un uso no autorizado. El
        progreso, las grabaciones, los puntos de liga y las recompensas pertenecen a tu cuenta y no
        pueden venderse ni transferirse.
      </TermsSection>

      <TermsSection title="4. Uso aceptable">
        <ul className="list-disc space-y-1 pl-5 text-[14px] leading-relaxed text-foreground">
          <li>No compartas tu cuenta ni uses la de otra persona.</li>
          <li>
            No subas contenido ilegal, ofensivo, sexual, discriminatorio ni grabaciones de terceros
            sin su permiso.
          </li>
          <li>
            No intentes acceder a datos de otros usuarios, saltarte límites de uso, automatizar la
            práctica ni manipular la clasificación de la liga.
          </li>
          <li>
            No hagas ingeniería inversa del servicio ni extraigas masivamente su contenido, audios o
            imágenes.
          </li>
        </ul>
        El incumplimiento puede terminar en suspensión o cierre de la cuenta.
      </TermsSection>

      <TermsSection title="5. Propiedad intelectual del contenido">
        Todo el contenido del curso —lecciones, guiones, historias, ilustraciones, audios generados,
        marca y software— es propiedad de E4CC Global o de sus licenciantes. Te concedemos una
        licencia personal, limitada, revocable y no exclusiva para usarlo dentro de la app con fines
        de aprendizaje propio. No puedes copiarlo, redistribuirlo, publicarlo ni usarlo con fines
        comerciales o docentes sin nuestro permiso escrito.
      </TermsSection>

      <TermsSection title="6. Tus grabaciones">
        Las grabaciones de tu voz son tuyas. Al grabarlas nos concedes una licencia limitada,
        mundial y libre de regalías para almacenarlas, transmitirlas y procesarlas con nuestros
        proveedores de transcripción e IA con un único fin: darte retroalimentación y mostrarte tu
        progreso dentro de la app. No las vendemos, no las usamos para publicidad y no las usamos
        para entrenar modelos propios. Los audios finales se borran automáticamente a los{" "}
        {AUDIO_FINAL_RETENTION_DAYS} días y las tomas intermedias antes; el detalle está en la
        política de privacidad. Puedes pedir su eliminación anticipada escribiendo a <SupportMail />.
      </TermsSection>

      <TermsSection title="7. Retroalimentación de IA">
        La corrección, la transcripción y los comentarios del coach se generan automáticamente y
        pueden contener errores, malinterpretar tu audio o dar sugerencias imprecisas. Son una ayuda
        de práctica y <strong>no sustituyen a un profesor, a un evaluador oficial ni a un asesor
        profesional</strong>. No debes tomar decisiones académicas, laborales o de otro tipo basándote
        únicamente en esta retroalimentación.
      </TermsSection>

      <TermsSection title="8. Disponibilidad y cambios del servicio">
        Trabajamos para mantener el servicio disponible, pero puede haber interrupciones por
        mantenimiento, fallos de proveedores externos o causas fuera de nuestro control. Podemos
        añadir, modificar o retirar funciones, contenido y límites de uso. Si un cambio en estos
        términos es importante, te lo avisaremos dentro de la app; seguir usándola después implica
        aceptarlo.
      </TermsSection>

      <TermsSection title="9. Suscripciones y pagos">
        Algunas funciones requieren una suscripción de pago. El precio, la periodicidad y la
        renovación se muestran antes de contratar. Puedes cancelar cuando quieras: la cancelación
        surte efecto al final del periodo ya pagado y no genera reembolsos parciales, salvo cuando la
        ley aplicable lo exija.
      </TermsSection>

      <TermsSection title="10. Limitación de responsabilidad">
        El servicio se ofrece «tal cual». En la medida permitida por la ley, E4CC Global no responde
        por daños indirectos, pérdida de oportunidades, pérdida de datos derivada del borrado
        automático descrito en estos términos, ni por resultados de exámenes, entrevistas o procesos
        laborales. Nada en estos términos limita responsabilidades que la ley no permita excluir.
      </TermsSection>

      <TermsSection title="11. Terminación">
        Puedes dejar de usar la app en cualquier momento y solicitar la eliminación de tu cuenta
        desde la página de{" "}
        <Link to="/eliminar-cuenta" className="font-semibold text-primary underline underline-offset-2">
          eliminar cuenta
        </Link>
        . Nosotros podemos suspender o cerrar una cuenta que incumpla estos términos, que suponga un
        riesgo de seguridad o cuando la ley lo exija; cuando sea razonable te avisaremos antes.
      </TermsSection>

      <TermsSection title="12. Ley aplicable y jurisdicción">
        Estos términos se rigen por las leyes de la República de El Salvador. Cualquier controversia
        se someterá a los tribunales competentes de San Salvador, El Salvador, sin perjuicio de los
        derechos que te correspondan como consumidor en tu país de residencia.
      </TermsSection>

      <TermsSection title="13. Contacto">
        Para dudas sobre estos términos escríbenos a <SupportMail /> o desde la página de{" "}
        <Link to="/contacto" className="font-semibold text-primary underline underline-offset-2">
          contacto
        </Link>
        . Respondemos de lunes a viernes en un máximo de 2 días hábiles.
      </TermsSection>
    </>
  );
}

function EnglishTerms() {
  return (
    <>
      <TermsSection title="1. The service">
        Fluency App is a spoken-English training service operated by E4CC Global. It provides daily
        lessons, stories, grammar exercises, voice recording and automated AI feedback. It is a
        practice tool: it does not grant degrees or official certifications and does not guarantee a
        result in any exam or hiring process. By creating an account or using the app you accept
        these terms.
      </TermsSection>

      <TermsSection title="2. Minimum age">
        Fluency App is intended for adults aged 18 or older. It is not designed for minors and we do
        not knowingly collect data from children under 13, as stated in our{" "}
        <Link to="/privacy-policy" className="font-semibold text-primary underline underline-offset-2">
          privacy policy
        </Link>
        . If we identify an account belonging to a minor we may suspend it and delete its data.
      </TermsSection>

      <TermsSection title="3. Your account and credentials">
        Your account is personal and non-transferable. You are responsible for keeping your
        credentials confidential and for all activity carried out from your account. You must provide
        accurate registration details and tell us at <SupportMail /> if you suspect unauthorized use.
        Progress, recordings, league points and rewards belong to your account and cannot be sold or
        transferred.
      </TermsSection>

      <TermsSection title="4. Acceptable use">
        <ul className="list-disc space-y-1 pl-5 text-[14px] leading-relaxed text-foreground">
          <li>Do not share your account or use someone else's.</li>
          <li>
            Do not upload illegal, offensive, sexual or discriminatory content, or recordings of
            other people without their permission.
          </li>
          <li>
            Do not try to access other users' data, bypass usage limits, automate practice or
            manipulate league standings.
          </li>
          <li>
            Do not reverse-engineer the service or bulk-extract its content, audio or images.
          </li>
        </ul>
        Breaking these rules may lead to suspension or closure of your account.
      </TermsSection>

      <TermsSection title="5. Intellectual property">
        All course content — lessons, scripts, stories, illustrations, generated audio, branding and
        software — belongs to E4CC Global or its licensors. We grant you a personal, limited,
        revocable, non-exclusive licence to use it inside the app for your own learning. You may not
        copy, redistribute, publish or use it commercially or for teaching without our written
        permission.
      </TermsSection>

      <TermsSection title="6. Your recordings">
        Your voice recordings are yours. By recording, you grant us a limited, worldwide,
        royalty-free licence to store, transmit and process them with our transcription and AI
        providers for one purpose only: giving you feedback and showing your progress inside the app.
        We do not sell them, use them for advertising, or use them to train our own models. Final
        audio is deleted automatically after {AUDIO_FINAL_RETENTION_DAYS} days and intermediate takes
        sooner; details are in the privacy policy. You may request earlier deletion at <SupportMail />
        .
      </TermsSection>

      <TermsSection title="7. AI feedback">
        Corrections, transcription and coach comments are generated automatically and may contain
        errors, misread your audio or give inaccurate suggestions. They are a practice aid and{" "}
        <strong>do not replace a teacher, an official examiner or a professional advisor</strong>. You
        should not make academic, employment or other decisions based solely on this feedback.
      </TermsSection>

      <TermsSection title="8. Availability and changes">
        We work to keep the service available, but there may be interruptions due to maintenance,
        third-party provider failures or causes outside our control. We may add, change or remove
        features, content and usage limits. If a change to these terms is significant we will notify
        you in the app; continuing to use it afterwards means you accept the change.
      </TermsSection>

      <TermsSection title="9. Subscriptions and payments">
        Some features require a paid subscription. Price, billing period and renewal are shown before
        you subscribe. You can cancel at any time: cancellation takes effect at the end of the period
        already paid and does not generate partial refunds, except where applicable law requires it.
      </TermsSection>

      <TermsSection title="10. Limitation of liability">
        The service is provided “as is”. To the extent permitted by law, E4CC Global is not liable for
        indirect damages, lost opportunities, data loss resulting from the automatic deletion
        described in these terms, or outcomes of exams, interviews or hiring processes. Nothing here
        limits liabilities that the law does not allow us to exclude.
      </TermsSection>

      <TermsSection title="11. Termination">
        You may stop using the app at any time and request account deletion from the{" "}
        <Link to="/eliminar-cuenta" className="font-semibold text-primary underline underline-offset-2">
          delete account
        </Link>{" "}
        page. We may suspend or close an account that breaks these terms, poses a security risk, or
        where the law requires it; where reasonable we will notify you first.
      </TermsSection>

      <TermsSection title="12. Governing law and jurisdiction">
        These terms are governed by the laws of the Republic of El Salvador. Any dispute will be
        submitted to the competent courts of San Salvador, El Salvador, without prejudice to consumer
        rights available to you in your country of residence.
      </TermsSection>

      <TermsSection title="13. Contact">
        Questions about these terms: <SupportMail /> or the{" "}
        <Link to="/contacto" className="font-semibold text-primary underline underline-offset-2">
          contact
        </Link>{" "}
        page. We reply Monday to Friday within 2 business days.
      </TermsSection>
    </>
  );
}
