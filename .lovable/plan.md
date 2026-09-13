# Temporada 4 — verificación de los episodios 1–5 y plan para el 6–20

## Resultado de la revisión (episodios 1–5)

Todo está en orden y listo para continuar:

- Los 5 episodios existen, están registrados y aparecen como días 1 a 5 de "Historias en pasado".
- Cada episodio tiene 11 ilustraciones (portada + 10 escenas): 55 imágenes en total, todas bien por debajo del límite de peso (la más pesada, 252 KB).
- Las 615 pruebas pasan, la revisión de tipos pasa, y los episodios 4 y 5 abren sin errores en pantalla de celular.
- Los días 6 al 20 hoy son solo títulos de adelanto: no existe ningún guion ni ninguna imagen todavía.

## Qué falta para el 6–20

15 episodios completos: guion, 11 ilustraciones cada uno, registro y control de calidad. Eso son 165 imágenes nuevas.

## Alineación con el curso (Basic 3)

Cada bloque sigue exactamente el tema del curso de esos días:

- **Días 6–10 · Otras personas (Did / Didn't)**: la primera clase de sábado de Vale; qué hicieron Kat, Mateo, Luis y su mamá; preguntas "¿Hiciste…?"; el día 10 es el reto de repaso.
- **Días 11–15 · Qué estaba pasando (pasado progresivo)**: escenas interrumpidas — Vale enseñando cuando entra una llamada, la oficina a las ocho de la noche, un plan que se rompe; el día 15 es el reto.
- **Días 16–20 · Contar una historia (Caperucita Roja)**: Vale narra el cuento con conectores (primero, luego, de repente, al final) y termina contando su propia historia completa; el día 20 cierra la temporada con un gancho hacia la Temporada 5.

## Reglas que se mantienen sin cambios

- Un episodio por día, se desbloquea al completar el día anterior.
- 10 escenas, vocabulario tocable con significado en español, 3 preguntas rápidas con audio automático, variedad de preguntas (qué, quién, cuándo, dónde, por qué).
- 2 preguntas personales evaluadas por la IA (máximo 2 intentos más "Saltar por ahora"); las frases de motivación y la grabación final nunca se evalúan.
- Cierre de 15 segundos con un solo botón: "AHORA GRABA TUS AUDIOS", más el gancho para el día siguiente.
- Personajes y voces oficiales (Vale, Kat, Mateo, Luis, Ana, el jefe) sin cambios; los personajes nuevos de la escuela reciben su propia ficha oficial antes de dibujarlos.

## Cómo lo entregaría

Tres bloques de cinco episodios (6–10, 11–15, 16–20). En cada bloque: guiones, ilustraciones, revisión visual una por una (identidad, tono de piel, manos, personas de más, objetos, nada de texto dentro del dibujo), optimización de peso, registro y pruebas completas. Al terminar los tres, agrego la tarjeta plegable de la Temporada 4 en Método Natural y la registro en los audiolibros.

## Detalles técnicos

- Un archivo `vale-s4-*.ts` por episodio en `src/services/storybook/`, registrado en `index.ts` y enlazado a su día en `seasons.ts` (hoy con `episodeId: null`).
- Arte en `src/assets/storybook/vale-s4-epN/` (`cover.jpg` + `s1`–`s10`), JPG optimizado por debajo de 300 KB, generado contra las referencias de `_canon/`.
- `sayItCheck` por episodio con marcos del bloque correspondiente (`Did you *`, `I was *-ing`, narración con conectores), sin temas que aún no se han visto.
- QA por bloque: `bunx vitest run`, `bunx tsgo --noEmit`, apertura de rutas y revisión a 394 px.
