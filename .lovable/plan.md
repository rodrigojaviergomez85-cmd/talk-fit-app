# Nuevo onboarding: 4 slides con imágenes + nivel + semana

## Objetivo
Reemplazar el onboarding actual (8 pantallas de texto) por un carrusel de 4 slides con las imágenes exactas que subiste, seguido de la elección de nivel, confirmación, elección de semana (1–4) y registro. Máximo 4 slides + nivel + semana.

## Flujo nuevo

```text
Slide 1 — "Tu inglés, para la vida y el trabajo"
   Práctica para clases, entrevistas y trabajo.   [Vamos, Champion]
Slide 2 — "Siempre sabrás qué hacer"
   Abre tu práctica del día y sigue los 5 pasos.  [Siguiente]
Slide 3 — "Cada intento te ayuda a mejorar"
   Grábate, recibe sugerencias y reintenta.       [Siguiente]
Slide 4 — "¿Te trabaste? Aquí tienes ayuda"
   Review + AI Coach.                              [Empezar mi práctica]

→ Pantalla de nivel (selector actual, sin cambios)
   → modal "¿Estás seguro?" (ya existe)
   → NUEVA pregunta: "¿En qué semana vas?"  [Semana 1] [Semana 2] [Semana 3] [Semana 4]
→ Pantalla de registro/login (solo si no tiene cuenta)
→ Aterriza en la práctica del día correcto:
   Semana 1 = Día 1 · Semana 2 = Día 6 · Semana 3 = Día 11 · Semana 4 = Día 16
```

- Botón "Omitir" arriba a la derecha en los 4 slides (salta directo a elegir nivel).
- Puntos de progreso (4 dots) debajo del texto, como en tus imágenes.
- Botón naranja grande de ancho completo, igual que en el diseño.

## Las imágenes
- Se usan exactamente tus 4 imágenes subidas. Como cada una incluye texto y botones "quemados" en la imagen, **recortaré solo la parte de la ilustración** (la mitad superior) y el texto/botones se dibujan en la app — así funcionan en español e inglés y los botones son táctiles de verdad.
- Se suben como assets CDN (`.asset.json`), no pesan en el repositorio.

## Detalle técnico: semana de inicio
Hoy la app siempre apunta al "primer día sin completar", así que alguien que elige Semana 3 sería regresado al Día 1. Para que la semana elegida sea el punto de partida real:

- Nueva columna `start_week` (1–4, default 1) en `user_preferences` — migración SQL simple, sin cambios de acceso.
- Se guarda junto al nivel en el mismo paso (`applyPendingPlacement`), y también en el almacenamiento local para sobrevivir el redirect de login con Google.
- `JourneyService.currentDay`: si el módulo no tiene días completados y hay `start_week > 1`, empieza en el día `(semana - 1) * 5 + 1`. Al completar el primer día, la secuencia normal toma el control.
- Los días anteriores NO se marcan completados ni se bloquean: si eligió mal, puede retroceder.

## Qué NO cambia
- Selector de niveles, modal de confirmación, pantalla de auth, guardado en la nube, cuentas ilimitadas, límites diarios, Review, streaks, grabaciones, AI.
- El acceso desde `/onboarding` sigue igual; quien ya completó onboarding nunca lo vuelve a ver.

## Archivos afectados (tentativo)
- `src/routes/onboarding.tsx` — reescritura a carrusel de 4 slides + nivel + semana.
- `src/services/preferences.ts`, `src/services/cloud-sync.ts` — semana en pending placement y guardado.
- `src/services/journey-service.ts` — `currentDay` respeta `start_week`.
- Migración SQL (`start_week`) + traducciones ES/EN de los 4 slides y la pregunta de semana.
- Assets: 4 ilustraciones recortadas en `src/assets/onboarding/`.

## Verificación
- Preview: 4 slides → Omitir en cada uno → nivel → confirmar → semana → auth → aterriza en el día correcto (Semana 4 = Día 16).
- Casos: Semana 1 (igual que hoy), login con Google conserva nivel+semana, cambiar de nivel después.
- `bunx tsc --noEmit` y suite de tests.
