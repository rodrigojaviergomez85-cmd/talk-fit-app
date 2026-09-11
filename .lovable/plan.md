# Onboarding resumido a 3 pasos + selección de semana

## Objetivo
Reducir el onboarding de 8 pantallas a máximo 3, con el flujo:
1. Qué hace Fluency App
2. Elegir nivel → confirmar "¿estás seguro?" → elegir semana (1–4)
3. Empezar directo en la semana elegida (con pantalla de registro/inicio de sesión en medio si no hay cuenta)

## Flujo nuevo

```text
Pantalla 1: ¿Qué es Fluency App?
   - Grabas tus audios y recibes retroalimentación
   - Te prepara para entrevistas
   - Practicas la tarea del día de E4CC
   [Empezar]

Pantalla 2: Elige tu nivel (selector actual, sin cambios visuales)
   → al tocar un nivel: modal "¿Estás seguro?" (ya existe)
   → al confirmar: NUEVA pregunta "¿En qué semana vas?"
       [Semana 1] [Semana 2] [Semana 3] [Semana 4]
   → al elegir semana: guardar nivel + semana

Pantalla 3 (solo si no tiene cuenta): Auth (ya existe)
   → después de entrar, enrollar y navegar a la práctica

Fin: navega directo al primer día de la semana elegida
   (Semana 1 = Día 1, Semana 2 = Día 6, Semana 3 = Día 11, Semana 4 = Día 16)
```

## Qué se elimina
- Pantallas 2–6 del método (vocabulario, rutina, timeline, mantras) — la pantalla 1 nueva resume el mensaje en 3 bullets.
- El texto clave se conserva condensado; nada de lógica de práctica cambia.

## Qué NO cambia
- Selector de niveles (PlacementPicker) y modal de confirmación existentes.
- Pantalla de autenticación, guardado en la nube, reintentos de error, cuentas ilimitadas.
- Reglas de desbloqueo de módulos, límites diarios, Review, streaks, grabaciones, AI.

## Detalle técnico (nuevo): semana de inicio
Hoy `currentDay` devuelve el primer día sin completar, así que alguien en Semana 3 sería regresado al Día 1. Para que la semana elegida sea el punto de partida real:

- Nueva preferencia por usuario: `start_week` (1–4) guardada en `user_preferences` junto al placement (misma escritura, misma transacción lógica que `applyPendingPlacement`).
- Migración SQL: `ALTER TABLE user_preferences ADD COLUMN start_week smallint` (default 1). Sin cambios de RLS (la política existente ya cubre la fila).
- `JourneyService.currentDay`: si el módulo actual es el módulo de placement, no tiene ningún día completado y existe `start_week > 1`, empezar en el día `(start_week - 1) * 5 + 1`. En cuanto completa un día, la lógica secuencial normal toma el control.
- La navegación final del onboarding apunta a `/practice?module=<nivel>&day=<día de la semana>`.
- Los días anteriores quedan disponibles (no se marcan completados, no se bloquean): el estudiante puede retroceder si eligió mal.
- El pending placement local guarda también la semana para sobrevivir el redirect de OAuth.

## Archivos afectados (tentativo)
- `src/routes/onboarding.tsx` — reducir pantallas, nueva pantalla de semana, pasar semana al guardar/navegar.
- `src/services/preferences.ts` — pending placement con semana.
- `src/services/cloud-sync.ts` — `applyPendingPlacement` guarda `start_week`.
- `src/services/journey-service.ts` — `currentDay` respeta `start_week`.
- Migración de base de datos (columna `start_week`).
- Traducciones ES/EN nuevas: título de la app, 3 bullets, "¿En qué semana vas?", "Semana 1–4".

## Verificación
- Flujo completo en el preview: pantalla 1 → nivel → confirmar → semana → auth → aterriza en el día correcto.
- Casos: Semana 1 (igual que hoy), Semana 4 (Día 16), sin cuenta (OAuth redirect conserva nivel+semana), cambiar de nivel después.
- `bunx tsc --noEmit` y suite de tests.
