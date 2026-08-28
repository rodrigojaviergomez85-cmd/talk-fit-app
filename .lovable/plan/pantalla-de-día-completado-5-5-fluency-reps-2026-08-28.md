# Pantalla de día completado (5/5 Fluency Reps)

Al terminar la rep 5 del paso 6, la práctica pasa directo a una pantalla de celebración. Se eliminan la rep final (paso 7) y la pantalla de resumen con puntaje.

## Qué ve el estudiante

1. 🎉 **GREAT JOB!** en grande + "You completed your 5 Fluency Reps today!"
2. "You practiced. You spoke. You improved."
3. Frase destacada en tarjeta grande: **"Every rep makes your English more automatic."**
4. Progreso diario: 🔥 **5 / 5 Reps Completed** con barra/círculo lleno al 100% y un check animado al cargar.
5. Tarjeta motivacional: "Today you practiced speaking in English. Tomorrow, we'll do it again and make it easier, faster, and more natural." + "⭐ Keep going! Small practice every day = big progress."
6. Racha: 🔥 **X Day Streak** — "Come back tomorrow to keep your streak alive."
7. "See you tomorrow! 🚀"
8. Botón grande: **COMPLETE DAY ✓**

Celebración sutil de 1–2 s al entrar (confeti ligero + check animado), sin distraer. Diseño mobile-first, tipografía grande, tarjetas redondeadas, mucho aire. Todo el texto con su versión en español mediante el toggle existente.

## Lógica de racha y día completado

- Terminar las 5 reps del día = un día completado.
- Al pulsar COMPLETE DAY se guarda la fecha de hoy y se actualiza la racha:
  - si el último día completado fue ayer → racha +1
  - si fue hoy → no cambia nada (no se duplica el registro)
  - si fue hace 2 días o más → racha vuelve a 1
- Abrir la app no cambia la racha.
- Después de guardar, se va al inicio.

## Inicio (home)

- La tarjeta de práctica de hoy muestra **✓ 5/5 Reps Completed** cuando el día ya está completado, con el botón cambiado a "PRACTICE AGAIN" (secundario) en lugar de pedir repetir.
- El contador de racha del home usa el valor real guardado.

## Detalles técnicos

- `src/lib/types.ts`: `LearnerProfile` gana `lastCompletedDate?: string` (YYYY-MM-DD local) y `repsCompletedToday?: number`.
- `src/services/profile-service.ts`: nuevos helpers `isTodayCompleted(profile)` y `completeToday(profile)` con la regla de racha descrita; escritura idempotente vía `save`.
- `src/routes/practice.tsx`: al terminar la rep 5, `RepSeries` llama a un nuevo `onSeriesComplete` que fija `stage = { kind: "complete" }`. Se eliminan la etapa de rep final (`Rep10`), `SummaryStage` y el análisis final asociado; se limpian estados/imports huérfanos. El título del header pasa a "DAY COMPLETE" y la barra de progreso a 6/6.
- `src/components/fluency/DailyCompleteScreen.tsx` (nuevo): toda la pantalla de celebración, con animación de check (`animate-scale-in`) y confeti CSS ligero de ~1.5 s con `prefers-reduced-motion` respetado. Botón COMPLETE DAY → `ProfileService.completeToday` + `navigate({ to: "/" })`.
- `src/components/fluency/DailyPracticeCard.tsx`: nuevo prop `completed` para el estado 5/5 en el home; `src/routes/index.tsx` lo calcula con `isTodayCompleted`.
- Sin backend: todo persiste en localStorage como el resto del perfil.
