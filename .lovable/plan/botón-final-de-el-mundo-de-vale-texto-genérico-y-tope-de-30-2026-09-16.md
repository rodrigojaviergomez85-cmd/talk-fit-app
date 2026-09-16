# Botón final de El Mundo de Vale: texto genérico y tope de 30 segundos

Al final de cada episodio el botón dice "RECORD MY INTRO" / "GRABAR MI PRESENTACIÓN", lo cual solo tiene sentido en episodios de presentación. Además, algunos episodios permiten hasta 45 segundos de grabación.

## Cambios

1. **Texto genérico del botón**
   - Inglés: `RECORD MY ANSWER` (y `RECORD AGAIN` cuando ya grabó, como hoy).
   - Español: `GRABAR MI RESPUESTA` (y `GRABAR OTRA VEZ`).

2. **Máximo 30 segundos siempre**
   - El tiempo del episodio se limita a 30 segundos: si un episodio pide 45, se recorta a 30.
   - Episodios con menos (15, 20) mantienen su tiempo.
   - El texto "Máximo X segundos" muestra el mismo valor ya recortado.
   - El modo temporizador con cuenta regresiva se mantiene activo (ya lo está).

Aplica a todos los episodios de todas las temporadas, porque el final es un componente compartido.

## Detalle técnico

- Archivo único: `src/components/storybook/StorybookPlayer.tsx`, tarjeta "Now it's your turn".
- Sustituir `episode.finaleSeconds ?? 15` por un valor calculado `Math.min(episode.finaleSeconds ?? 15, 30)`, usado tanto en el texto como en `maxSeconds` del `VoiceRecorder`.
- Actualizar la etiqueta bilingüe del `VoiceRecorder`.
- No se tocan los datos de los episodios ni `finaleSeconds` en los archivos de temporada.
- Verificación: tests de storybook, typecheck y revisión visual de un episodio con 45 s (p. ej. Sharks ep. 20).
