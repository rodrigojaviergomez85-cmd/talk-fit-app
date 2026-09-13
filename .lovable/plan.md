# Un solo botón en Inicio → elegir: mundo de Vale o audios del día

## Qué verá el estudiante

### 1. Inicio

La tarjeta principal del día cambia a tener **un solo botón**:

```text
┌───────────────────────────────────────┐
│ NIVEL · BASIC ZERO          DÍA 3/20  │
│                                       │
│ PRÁCTICA DE HOY                       │
│ Talking about other people            │
│ Háblame de otras personas             │
│                                       │
│ [ EMPEZAR MI PRÁCTICA → ]             │
│ Ver todos los días                    │
└───────────────────────────────────────┘
```

Sin otros botones: el botón ya no lleva directo a grabar; abre la pantalla de opciones del día. Si hay una práctica a medio hacer, el texto sigue diciendo "Continuar" como hoy.

### 2. Pantalla del día — dos opciones

Nueva ruta `/day/$moduleId/$day` con dos tarjetas grandes:

```text
┌───────────────────────────────────────┐
│ Día 3 · Talking about other people    │
│                                       │
│ ┌───────────────────────────────────┐ │
│ │ [teaser image del episodio]       │ │
│ │ RECOMENDADO · 2–3 MIN             │ │
│ │ Método natural                    │ │
│ │ Aprende vocabulario con el mundo  │ │
│ │ de Vale — Episodio 3 "¿Quién es   │ │
│ │ él?"                        →     │ │
│ └───────────────────────────────────┘ │
│                                       │
│ ┌───────────────────────────────────┐ │
│ │ OBLIGATORIO                       │ │
│ │ Audios del día                    │ │
│ │ Tus 5 pasos para fluidez          │ │
│ │ automática                  →     │ │
│ └───────────────────────────────────┘ │
└───────────────────────────────────────┘
```

- **Opción 1 (método natural):** usa la misma imagen de portada/teaser que hoy se muestra en Natural Method, con etiqueta "RECOMENDADO". Abre el episodio del día (`/natural-method/cuento/$storyId`). Opcional: el estudiante puede saltarla.
- **Opción 2 (audios):** etiqueta "OBLIGATORIO", abre la práctica normal (`/practice?module=…&day=…`).
- Si ya vio el episodio, la tarjeta 1 muestra un check discreto ("Ya lo viste · Ver otra vez") y baja de protagonismo, pero sigue accesible.
- Si ese día aún no tiene episodio producido, o el módulo no tiene temporada, solo aparece la opción de audios (sin tarjeta vacía).
- Textos en inglés/español según el idioma elegido.

### 3. Al terminar la historia

Al final del episodio, además del botón de siguiente episodio, se agrega "Ahora graba tus audios" que lleva directo a `/practice` del mismo día, para que la historia alimente la grabación.

## Detalles técnicos

- `src/components/fluency/CurrentModuleCard.tsx`: el CTA pasa a enlazar a `/day/$moduleId/$day` con el módulo y día actuales (usando `JourneyService.nextPractice(state)` ya existente); el texto "Continuar día X · Paso N" se conserva.
- Nueva ruta `src/routes/day.$moduleId.$day.tsx` con `createFileRoute("/day/$moduleId/$day")`: resuelve el episodio con `getSeason(moduleId)` + slot cuyo `day` coincide, verifica `isDayUnlocked`, importa la portada del episodio (el mismo asset que usa `natural-method.audiobooks.tsx`) y enlaza a las dos rutas existentes. `head()` propio con título/descripción.
- Progreso de episodios vistos (hoy no existe): nuevo `src/services/storybook/storybook-progress.ts` con almacenamiento local (`markEpisodeSeen`, `isEpisodeSeen`). `StorybookPlayer` marca el episodio al llegar a la diapositiva final. Solo local, sin cambios de base de datos.
- En `StorybookPlayer` (`FinaleSlide`), se añade el enlace a `/practice?module=<moduleId>&day=<day>` usando el slot del episodio actual.
- Nuevas claves de i18n en `src/lib/i18n.tsx`: `home.startMyPractice`, `day.naturalTitle/body`, `day.recommended`, `day.audiosTitle/body`, `day.required`, `day.seen`, `story.goPractice`.
- Sin cambios en desbloqueo, pasos 1–5, límites diarios ni en la lista de Natural Method (sigue igual y accesible).

## Verificación

Typecheck, tests de storybook, y revisión móvil: inicio con un solo botón → pantalla de opciones con imagen del episodio → abrir el cuento → marcarlo como visto → volver y grabar los audios.
