# Plan: Modelo de ejemplo de audio en Rep 5

## Objetivo
En el Rep 5 de cada día, agregar un ejemplo de cómo debería sonar el monólogo, que el alumno puede escuchar (o no) antes de grabar sus tomas.

## Cambios

### 1. Datos del curso (`src/services/course-service.ts`, `src/lib/types.ts`)
- Agregar campo opcional `modelExample: { text: string; es: string }` a `CourseDay`.
- Escribir un monólogo de ejemplo por día (5–7 oraciones, ~35–45 segundos hablados), usando las mismas estructuras del día (ej. Día 1: "I usually wake up around six thirty. I have breakfast at home before I start work. I start work at eight and I talk to customers every day. … I like my job because I learn something new every week.").

### 2. UI en Rep 5 (`src/routes/practice.tsx`)
- En `Rep5FinalRep`, arriba de `TakeBoard`, agregar una tarjeta "Listen to an example" / "Escucha un ejemplo":
  - Botón play/stop que reproduce el `modelExample.text` con el mismo servicio TTS existente (`AudioService` / `/api/tts`, voz norteamericana natural, velocidad normal 1×).
  - Toggle para mostrar el texto del ejemplo con su traducción al español (`TranslatableText`), para quien quiera leerlo.
  - Al cambiar de rep o grabar, se detiene el audio del ejemplo.
- No se agrega corrección, feedback ni análisis — solo el modelo de referencia.

## Verificación
- Typecheck, `/practice?day=1` responde 200.
- Playwright móvil: navegar a Rep 5, confirmar que el botón reproduce y detiene el ejemplo, y que el TakeBoard y flujo de completar día siguen iguales.
