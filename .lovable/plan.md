# Cuentos animados interactivos (piloto)

Reemplazamos el formato de "4 pasos" de la historia interactiva actual por un **cuento ilustrado que se lee como libro**, con animaciones y TPRS integrado. La historia actual (`Luna and the Lost Phone` con Escucha/Entiende/Lee/Habla) se retira y se sustituye por esta experiencia.

## Concepto: "Pasa la página"

La historia se cuenta en **escenas** (como un libro de caricaturas). Cada escena es una pantalla completa:

```text
┌─────────────────────────┐
│   ILUSTRACIÓN ANIMADA   │  ← imagen generada, con movimiento sutil
│   (ocupa ~55% pantalla) │     (zoom lento, personaje que "respira",
│                         │      partículas, parpadeos — CSS/JS, no video)
├─────────────────────────┤
│  "Luna finds a shiny    │  ← 1 frase grande por escena
│   phone under a bench." │     con audio automático al pasar la página
│                         │
│  [🔊]  toca una palabra │  ← cada palabra se toca: significado ES
│  para ver su significado│     + pronunciación lenta
└─────────────────────────┘
        → desliza/toca para avanzar
```

- Se avanza deslizando o tocando (gesto de "pasar página"), con transición animada.
- El audio de la frase suena solo al entrar a la escena (voz TTS cacheada, como hoy).
- Al tocar una palabra: globito con su significado en español + botón de escucharla lento.

## Qué lo hace adictivo

1. **Escenas cortas con gancho**: cada 3-4 escenas pasa algo (el teléfono suena, aparece el niño llorando) y la última escena termina en suspenso → "Continuará… Episodio 2".
2. **TPRS dentro del cuento**: entre escenas aparecen **micro-preguntas habladas** en vez de un examen al final. Ejemplo: después de la escena del teléfono → "¿Qué encuentra Luna?" con 3 opciones ilustradas; el estudiante toca la respuesta y la dice en voz alta. Respuestas correctas = ⭐.
3. **Colección de estrellas/palabras**: cada palabra tocada se guarda en "Mi cuaderno" y cada micro-pregunta acertada da una estrella; al terminar el episodio se muestra el resumen (estrellas + palabras aprendidas) con animación de celebración.
4. **Episodios**: la historia se divide en episodios de 8-12 escenas (~3 minutos). El piloto es el Episodio 1 de "Luna y el teléfono perdido".

## Animaciones (sin video, sin costo de IA en runtime)

- Ilustraciones generadas por mí una sola vez (estilo caricatura infantil consistente con los teasers de audiolibros).
- Movimiento con CSS/JS: zoom/pan lento (efecto Ken Burns), capas con parallax ligero, partículas (hojas, destellos), y "latido" sutil del personaje. Nada de video generado: ligero y rápido en móvil.

## Contenido del piloto

- Reescribo "Luna and the Lost Phone" como **Episodio 1** en 10-12 escenas (1 frase simple por escena), con:
  - Ilustración por escena (10-12 imágenes).
  - Significado por palabra tocable (las palabras clave de cada frase).
  - 3 micro-preguntas TPRS ilustradas repartidas en el episodio.
  - Mini-final: "Continúa la historia" (grabación de voz con palabras sugeridas), que se mantiene del formato anterior porque es el corazón TPRS.
  - Pantalla final de celebración con estrellas y cuaderno de vocabulario.

## Cambios técnicos

- Nuevo tipo de contenido: `src/services/storybook/` con escenas (texto, palabras tocables, imagen, pregunta opcional) — texto escrito a mano, sin IA en runtime.
- Nueva ruta `src/routes/natural-method.cuento.$storyId.tsx` con `head()` propio.
- Componente `StorybookPlayer`: paginación por escena, transiciones, capas de animación, globitos de vocabulario, micro-preguntas TPRS.
- Reutilizo `AudioService`/`/api/tts`, `src/lib/syllables.ts` y `VoiceRecorder` para la continuación final.
- La tarjeta en Audiolibros cambia a "Cuento animado · Episodio 1". Se elimina la ruta vieja `natural-method.story.$storyId.tsx` y sus archivos.
- Grabaciones locales de la pantalla; no toca progreso, cuotas ni navegación.

## Verificación

- Typecheck + tests existentes.
- Móvil (393 px) ES/EN: pasar páginas, audio automático por escena, palabras tocables con significado, micro-preguntas con estrellas, grabación final y pantalla de celebración.
