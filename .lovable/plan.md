# Cuento animado piloto: enganche TikTok + vocabulario de Básico Zero Semana 1

Reemplazamos la historia interactiva actual (`Luna and the Lost Phone`, formato de 4 pasos) por un **cuento ilustrado que se lee como libro**, con animaciones y TPRS integrado, hecho a la medida del estudiante real: **joven de 18-24 años en LATAM, clase media-baja, enganchado a TikTok e Instagram**.

## La historia (match con Básico Zero Semana 1)

La Semana 1 de Básico Zero enseña **presentarse**: `My name is…`, `I am __ years old`, `I am from…`, `I live in…`, `My favorite color/food is…`, `My hobbies are…`. El cuento usa exactamente esos chunks dentro de una historia con gancho para jóvenes:

**"El primer día de Vale"** — Vale, 19, de El Salvador, llega a su primer trabajo en un call center bilingüe… y le toca presentarse en inglés frente a todos. Drama, vergüenza, risa y un final con gancho ("Continuará: la primera llamada").

- Cada escena suelta un chunk de Semana 1 dentro del diálogo de los personajes.
- Tono TikTok: humor, momento incómodo, giro rápido. Nada de caricatura infantil: ilustración estilo webtoon/cómic juvenil.
- Episodios cortos (8-12 escenas, ~3 min) con cliffhanger: este es el **Episodio 1**.

## Experiencia: "Pasa la página"

Cada escena es una pantalla completa:

```text
┌─────────────────────────┐
│   ILUSTRACIÓN ANIMADA   │  ← webtoon juvenil, movimiento sutil
│   (ocupa ~55% pantalla) │     (zoom lento, personaje "respira",
│                         │      partículas — CSS/JS, no video)
├─────────────────────────┤
│  "My name is Vale and   │  ← 1 frase grande, audio automático
│   I'm from El Salvador" │     al pasar la página
│                         │
│  toca una palabra →     │  ← significado ES + pronunciación lenta
└─────────────────────────┘
        desliza / toca para avanzar
```

- Audio TTS cacheado (como hoy), velocidad 0.5x/0.75x/1x.
- Al tocar una palabra: globito con significado en español + escucharla lenta.

## TPRS y adicción

1. **Micro-preguntas ilustradas entre escenas** (no examen al final): "¿De dónde es Vale?" con 3 opciones con imagen; toca la respuesta y la dice en voz alta → ⭐.
2. **Estrellas y cuaderno**: palabra tocada se guarda en "Mi cuaderno"; aciertos dan estrellas; pantalla final de celebración con resumen.
3. **Cliffhanger + "Continúa la historia"**: grabación final donde el estudiante se presenta como si estuviera en la escena (usa los chunks de Semana 1 — `My name is…`, `I am from…` — mostrados como recordatorio).

## Cambios técnicos

- Nuevo contenido: `src/services/storybook/` con escenas (texto, palabras tocables, imagen, pregunta opcional) — texto escrito a mano, sin IA en runtime.
- Nueva ruta `src/routes/natural-method.cuento.$storyId.tsx` con `head()` propio; componente `StorybookPlayer` (paginación, transiciones, animación por capas, globitos de vocabulario, micro-preguntas).
- Reutilizo `AudioService`/`/api/tts`, `src/lib/syllables.ts` y `VoiceRecorder`.
- Ilustraciones generadas una sola vez (estilo webtoon consistente), en `src/assets/storybook/`.
- En Audiolibros, la tarjeta cambia a "Cuento animado · Episodio 1". Se elimina la ruta vieja `natural-method.story.$storyId.tsx` y sus archivos.
- Grabaciones locales de la pantalla; no toca progreso, cuotas ni navegación.

## Verificación

- Typecheck + tests existentes.
- Móvil (393 px) ES/EN: pasar páginas, audio automático por escena, palabras tocables, micro-preguntas con estrellas, grabación final y celebración.
