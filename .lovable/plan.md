# Calificar el "Ahora dilo tú" del cuento (good job / try again)

Objetivo: que cuando el estudiante graba "My name is Rodrigo" el cuento le diga
**¡Muy bien!** o **Intenta otra vez**, igual que el Paso 2 de los módulos, gastando lo mínimo posible.

## Cómo funciona (decidido)

- Se califica **solo** la frase "Ahora dilo tú" de las preguntas rápidas (3 por episodio).
- **Flexible**: basta con que diga la estructura correcta ("My name is ..." + cualquier nombre).
  El nombre propio nunca decide si está bien o mal.
- **2 intentos** por frase. Después del segundo, siempre puede seguir adelante (nunca se traba).
- La grabación final de 15 segundos y la frase de motivación **no** se califican (igual que hoy).

## Lo que ve el estudiante

1. Graba y suelta.
2. Aparece "Revisando…" (1–2 segundos).
3. Resultado:
   - Correcto: "¡Muy bien! +1 ⭐" y puede seguir.
   - Casi: "Intenta otra vez" con la frase correcta resaltada y el botón de escuchar.
   - Si no se entendió el audio (ruido, muy corto): mensaje neutral y no se cuenta el intento.
4. Segundo intento: se califica igual, pero el botón SIGUIENTE queda siempre disponible.

## Por qué es barato

| Control | Efecto |
| --- | --- |
| Solo el motor de transcripción rápido (sin segundo pase) | ~1/3 del costo por audio |
| Audio máximo 8 segundos y mínimo válido | corta subidas largas o vacías |
| Comparación local, sin modelo de lenguaje | 0 costo de IA en la calificación |
| Máximo 2 intentos por frase (6 por episodio) | techo fijo por día |
| Tope por usuario por hora y por día | protege ante abuso |
| No se califica el audio final ni la motivación | menos de la mitad de audios |

Con esto un episodio completo cuesta fracciones de centavo por estudiante; el gasto queda dominado
por los módulos, no por los cuentos.

## Detalles técnicos

- Nuevo campo opcional en `StorybookQuiz`: `sayItCheck` (texto objetivo con hueco, p. ej.
  `"my name is {name}"`). Sin ese campo, la frase no se califica (retrocompatible).
- Nuevo endpoint `src/routes/api/story-say-check.ts`, calcado de `api/rep2-correction.ts`:
  auth con `verifyRequestUser`, validación de subida (mín. 2 KB, máx. ~1 MB / 8 s),
  `consumeQuota(userId, "story-say-check", 40, 3600)` más tope diario vía `sectionDailyLimit`,
  STT con `whisper-large-v3-turbo` **sin fallback**, y comparación con `compareRep2`.
- Cuentas internas (`hasUnlimitedAccess`) quedan exentas del tope, como en el resto de la app.
- Coincidencia flexible: se normaliza el transcript y se exige la secuencia fija de la frase;
  el hueco `{name}` acepta 1–3 palabras cualesquiera. Se reutiliza la tolerancia existente de
  `rep2-match` para diferencias mínimas.
- `StorybookPlayer.tsx`: el bloque "Ahora dilo tú" pasa a tener estados
  idle → checking → good/retry, con contador local de intentos (no persistido) y
  `AudioService.stop()` al empezar a grabar (ya existe).
- Pruebas: casos de coincidencia con hueco ("my name is rodrigo", "my name rodrigo",
  "rodrigo" solo → try again), tope de intentos y retrocompatibilidad de episodios sin `sayItCheck`.
- Piloto: activarlo primero en los episodios 1–5 de Basic Zero; el resto sigue igual hasta validar costo.
