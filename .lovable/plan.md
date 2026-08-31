# Pulido final antes del lanzamiento: español, CTA inteligente y toques más grandes

## 1. Traducir el texto de interfaz que sigue en inglés

Todo pasa por el sistema de idioma existente (`src/lib/i18n.tsx`), así que la opción "English" sigue funcionando. El contenido de aprendizaje (frases de práctica, nombres de módulo tipo "BASIC ZERO", títulos de lección) se queda en inglés.

Nuevas claves en el diccionario y su uso:

- **Home (tarjeta principal)**: la etiqueta "MODULE 1" se muestra como "MÓDULO 1"; el botón usa "EMPEZAR DÍA 1".
- **Práctica**: `ESCUCHAR`, `ESCUCHAR EL MODELO`, `GRABAR`, `GRABARME`, `ESCUCHARME`, `RESPONDER`, `SIGUIENTE REP`, `EMPEZAR SHADOWING`, `ESCUCHAR LA PREGUNTA`, `ESCUCHAR EJEMPLO`, `VER TEXTO DE EJEMPLO`.
- **Rep 5 (tablero de tomas)**: `TOMA 1..5`, `OPCIONAL`, `Listo para grabar`, `TIEMPO`, `ORACIONES`, y una sola línea de meta ("META DE HOY · …") sin la versión duplicada en inglés.
- **Progreso**: `CONTINUAR PRÁCTICA` y el resumen de semana como `SEMANA 1 · 0/5 DÍAS`.
- **Otros textos de chrome**: enlaces de saltar, prueba de micrófono, tarjeta de día completado, verb bank — se auditan pantalla por pantalla y se pasan al mismo sistema.

Punto importante: hoy varios de estos textos dependen del interruptor "Ayuda en español" (soporte de aprendizaje), no del idioma de la app. Se cambian para que el idioma de la interfaz sea el que manda.

**Encabezados de instrucción bilingües** (ej. "Just listen. Don't speak yet." con el español debajo): cuando el idioma de la app es español, la línea española pasa a ser la principal (grande) y la inglesa la secundaria pequeña; en inglés se mantiene el orden actual.

## 2. CTA inteligente en Home

Si existe una sesión guardada en curso para el día que toca, el botón dice `CONTINUAR DÍA 1 · REP 3` (con el número de rep guardado). Si no hay sesión guardada, sigue diciendo `EMPEZAR DÍA 1`. Solo se lee la sesión guardada; no se modifica nada de cómo se guarda ni se reanuda.

## 3. Áreas táctiles más grandes

Mínimo 44x44 px de área tocable (solo relleno, mismo tamaño de letra) en:

- "Saltar por ahora", "Saltar esta frase", "Saltar esta pregunta" (componente `SkipLink`)
- "Omitir prueba" en la prueba de micrófono
- Flechas atrás/adelante y "Exit" del encabezado de práctica

## Detalles técnicos

- Nuevas entradas en `DICT` de `src/lib/i18n.tsx` (grupos `practice.*`, `take.*`, `prog.*`, `home.*`).
- Archivos afectados: `src/routes/practice.tsx`, `src/routes/progress.tsx`, `src/routes/index.tsx`, `src/components/fluency/ContinueCard.tsx`, `TakeBoard.tsx`, `MicTest.tsx`, `RepProgress.tsx`, `AudioPlayer.tsx`, `VoiceRecorder.tsx`, `PastVerbCard.tsx`, `PastVerbCards.tsx`, `DayCompleteScreen.tsx`.
- `ContinueCard` lee `PracticeSessionService.load(moduleId, day)` para el texto del botón (solo lectura).
- No se toca la lógica de práctica, el gating, el guardado de progreso ni el flujo de grabación.
