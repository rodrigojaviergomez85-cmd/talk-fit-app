# Idioma de la app, onboarding y avisos útiles

Actualización incremental de UX. No se toca currículo, audio, grabaciones, Rep 1–5, contador de oraciones, ni la lógica de reanudar práctica.

## 1. Dos ajustes independientes

- **IDIOMA DE LA APP (ES / EN)**: controla solo la interfaz (navegación, botones, títulos, estados vacíos, diálogos). Por defecto **Español** para usuarios nuevos.
- **AYUDA EN ESPAÑOL (ON / OFF)**: controla las traducciones dentro de la práctica. Ya existe (`ES support`) y se mantiene; solo se renombra a "Ayuda en español · ON/OFF" (o "Spanish support" si la app está en inglés).

Son independientes: se puede tener la app en español con la ayuda apagada, y viceversa. El botón "ES · traducir" individual sigue disponible aunque la ayuda esté apagada.

El contenido de aprendizaje (frases modelo, verbos, historias) **siempre queda en inglés**. Los nombres de los 5 pasos siguen en inglés (LISTEN, COPY, SHADOW, MAKE IT YOURS, YOUR TURN) con una línea corta de apoyo en español cuando la app está en español.

## 2. Onboarding de primera vez (3 pantallas)

Se muestra solo si no hay onboarding completado **y** el usuario no tiene días completados (los usuarios activos nunca lo ven).

1. **HABLA INGLÉS TODOS LOS DÍAS** — qué es la app, mención de que se usará el micrófono. SIGUIENTE / SALTAR.
2. **5 REPS. UNA PRÁCTICA.** — los cinco pasos en tarjetas visuales + "6–9 minutos". SIGUIENTE / SALTAR.
3. **HABLA UN POCO MÁS CADA DÍA** — constancia, escuchar tus grabaciones, racha sin culpa. **EMPEZAR DÍA 1** (va a Módulo 1, Día 1) / EXPLORAR LA APP.

Al completar o saltar se guarda la preferencia y no vuelve a aparecer. Se puede reabrir desde Mi cuenta ("Ver introducción"). No se pide permiso de micrófono aquí.

## 3. Estado vacío de Grabaciones

Se mejora el bloque actual: título "TUS GRABACIONES APARECERÁN AQUÍ", texto "Completa una práctica para guardar tu primer Final Rep" y CTA dinámico:
- usuario nuevo (0 días completados) → **EMPEZAR DÍA 1**
- usuario con avance → **CONTINUAR PRÁCTICA**, hacia su día actual.

## 4. Aviso de guardar progreso (una sola vez)

Después de que un **invitado** completa su primer día (Módulo 1, Día 1), en la pantalla de día completado aparece una tarjeta ligera: GUARDA TU PROGRESO, con Continuar con Google, Crear cuenta con email y "Seguir como invitado". No bloquea nada. Si elige seguir como invitado se guarda el descarte y no vuelve a aparecer automáticamente (reaparece, como mucho, tras varias prácticas más); registrarse siempre está disponible en Mi cuenta.

## 5. Consistencia de idioma

Se traduce el "chrome" de la app en Home, Módulo, Práctica (etiquetas de UI, no contenido), Progreso, Grabaciones y Mi cuenta: INICIO, PROGRESO, GRABACIONES, MI CUENTA, CONTINUAR PRÁCTICA, EMPEZAR, ATRÁS, SALIR, INTENTAR DE NUEVO, DÍAS COMPLETADOS, TIEMPO HABLANDO, ACTUAL, COMPLETADO, SIGUIENTE, etc. Nada de pantallas mezcladas.

## Detalles técnicos

- Nuevo `src/lib/i18n.tsx`: `AppLangProvider` + `useT()` con un diccionario plano `{ key: { es, en } }`, montado en `src/routes/__root.tsx`. Sin librería nueva.
- Nuevo `src/services/preferences.ts`: `appLanguage`, `spanishSupport`, `onboardingCompleted`, `accountPromptDismissedAt`, en localStorage con clave por ámbito (`guest` o `userId`), igual que `practice-session.ts`, para no mezclar preferencias entre cuentas en un mismo dispositivo. Sin migración de base de datos.
- La preferencia existente `fluency-reps:es-support` se migra al nuevo servicio conservando el valor.
- Onboarding: nueva ruta `src/routes/onboarding.tsx` (3 pasos en una sola ruta con estado local); Home redirige allí si corresponde. Enlace de reapertura en `profile.tsx`.
- Selector de idioma y switch de ayuda en español: en `src/routes/profile.tsx`, con etiquetas de texto accesibles ("Español" / "English"), no banderas.
- `recordings.tsx`: estado vacío con CTA dinámico usando `JourneyService.nextPractice`.
- `DayCompleteScreen.tsx`: tarjeta de guardar progreso condicionada a invitado + primer día + no descartado, reutilizando el sign-in de `profile.tsx` (Google / email).
- Todos los textos de UI pasan por `useT()`; el contenido de lección no se toca.

## Verificación

Playwright en viewport móvil: primera visita muestra onboarding en español; saltar + refrescar no lo repite; EMPEZAR DÍA 1 abre Módulo 1 Día 1; cambio de idioma solo cambia la UI; ES support ON/OFF independiente del idioma; estado vacío de grabaciones con ambos CTA; aviso de cuenta una sola vez.
