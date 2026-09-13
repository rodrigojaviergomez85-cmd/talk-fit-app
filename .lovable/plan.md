# El mundo de Vale en el inicio, antes de grabar

Hoy la historia vive solo dentro de Natural Method, así que casi nadie la usa antes de practicar. La propuesta es mostrar el episodio del día en el inicio, justo arriba del botón de práctica, como un paso previo **opcional**.

## Qué verá el estudiante

En Inicio, dentro de la tarjeta de "Práctica de hoy", aparece un bloque nuevo:

```text
┌───────────────────────────────────────────┐
│ NIVEL · BASIC ZERO              DÍA 3/20  │
│                                           │
│ PASO OPCIONAL · ANTES DE GRABAR           │
│ ▶ El mundo de Vale — Episodio 3           │
│   "¿Quién es él?"          2–3 min  ›     │
│                                           │
│ PRÁCTICA DE HOY                           │
│ Talking about other people                │
│ [ EMPEZAR DÍA 3 → ]                       │
│ Ver todos los días                        │
└───────────────────────────────────────────┘
```

- El episodio mostrado es siempre el que corresponde al módulo y día actual del estudiante.
- Es opcional: el botón naranja de práctica sigue siendo el principal y nunca se bloquea.
- Si ya vio el episodio, el bloque se marca con un check ("Ya lo viste · Ver otra vez") y pierde protagonismo visual.
- Si ese día todavía no tiene episodio producido, o el módulo no tiene temporada, el bloque simplemente no aparece.
- Textos en inglés/español según el idioma elegido.

## Recordatorio suave al terminar la historia

Al final del episodio, además del botón de siguiente episodio, se agrega un botón para ir directo a la práctica del día ("Ahora practica y graba"). Así la historia alimenta la grabación en lugar de competir con ella.

## Detalles técnicos

- Nuevo componente `src/components/fluency/TodayStoryCard.tsx`, renderizado dentro de `CurrentModuleCard` arriba del bloque "Práctica de hoy". Resuelve el episodio con `getSeason(next.moduleId)` + el slot cuyo `day === next.day` (de `src/services/storybook/seasons.ts`) y enlaza a `/natural-method/cuento/$storyId`. No renderiza nada si no hay season, no hay `episodeId`, o el día está bloqueado (`isDayUnlocked`).
- Progreso de episodios vistos: hoy no se guarda nada. Se agrega `src/services/storybook/storybook-progress.ts` con almacenamiento local (`markEpisodeSeen`, `isEpisodeSeen`, lista de ids). `StorybookPlayer` marca el episodio al llegar a la diapositiva final. Solo local, sin cambios de base de datos.
- En `StorybookPlayer` (`FinaleSlide`), se añade el enlace a `/practice?module=<moduleId>&day=<day>` usando el slot del episodio actual.
- Nuevas claves de i18n en `src/lib/i18n.tsx`: `home.storyOptional`, `home.storyWatchAgain`, `home.storySeen`, `story.goPractice`.
- Sin cambios en la lógica de desbloqueo, en los pasos 1–5 ni en los límites diarios.

## Verificación

Typecheck, tests de storybook, y revisión móvil del inicio: el bloque aparece para el día actual, abre el episodio correcto, queda marcado como visto al terminar, y el botón de práctica sigue funcionando igual.
