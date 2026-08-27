# Corrección real: "¿Lo dije bien o mal?"

Hoy la app da feedback con reglas locales aproximadas. El objetivo es que en cada repetición y al hablar libre el alumno vea claramente si lo que dijo está bien o mal, y cuál es la versión correcta.

## Qué verá el alumno

**1. En cada repetición (echo, chunks, shadowing, frase modelo)**

Después de grabar, aparece una tarjeta inmediata de resultado:

- Un veredicto grande: **BIEN DICHO** (verde) o **CASI** (ámbar) o **INTÉNTALO OTRA VEZ** (naranja).
- La frase modelo con las palabras marcadas: correctas en verde, faltantes o cambiadas en rojo/tachadas.
- Un porcentaje de coincidencia y un botón **REPETIR** para volver a intentarlo sin salir de la rep.

Esto se calcula comparando palabra por palabra lo que dijo el alumno contra la frase modelo (rápido, sin esperar a la IA).

**2. Al hablar libre (Rep 9 personalización y Rep 10 final)**

La IA real de Lovable AI analiza lo que dijo y devuelve:

- Veredicto general: qué frases estuvieron correctas y cuáles no.
- Lista de correcciones concretas: "dijiste X → correcto: Y" con una explicación de una línea en español sencillo.
- Lo que hizo bien + una sola cosa a mejorar (se mantiene el formato actual, ahora con contenido real).
- Puntaje por las cinco dimensiones (fluidez, pronunciación, gramática, ritmo, estructura objetivo).

El Quick Fix y el banco de errores se alimentan de estas correcciones reales.

## Detalles técnicos

- Nuevo `src/lib/pronunciation-check.ts`: normaliza texto (minúsculas, sin puntuación, tolerante a acentos) y hace un diff palabra por palabra contra la frase modelo; devuelve `accuracy`, palabras faltantes/extra/incorrectas y un veredicto.
- Nuevo componente `src/components/fluency/RepFeedback.tsx`: tarjeta de veredicto + frase resaltada + botón repetir. Se inserta en las reps de `src/routes/practice.tsx` que ya usan `VoiceRecorder` con transcripción.
- Nuevo server function `src/lib/speech-analysis.functions.ts` (`createServerFn`, POST) que llama al AI Gateway de Lovable con `google/gemini-3.7-flash` y salida estructurada (JSON schema simple, sin límites en el esquema) para devolver el mismo shape de `SpeechAnalysis` que ya usan los componentes. `LOVABLE_API_KEY` se lee dentro del handler; se provisiona si falta.
- `src/services/speech-analysis-service.ts` pasa a llamar al server function y conserva el análisis local actual como respaldo si la IA falla o no hay conexión; los errores del gateway (créditos, límite) se muestran en la UI, no se ocultan.
- Sin cambios de esquema de datos: `SpeechAnalysis`, `GrammarIssue` y `QuickFix` ya cubren lo necesario; solo se añade el tipo del chequeo de repetición.
- El prompt del sistema instruye a corregir en inglés A2/B1 y explicar en español, marcando explícitamente cada frase como correcta o incorrecta.
