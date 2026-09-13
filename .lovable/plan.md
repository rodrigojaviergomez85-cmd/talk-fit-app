# Final del episodio: un solo botón, sin "Siguiente episodio"

## Objetivo
Al terminar un episodio de El mundo de Vale, el estudiante solo debe ver **AHORA GRABA TUS AUDIOS** como único botón de acción. El botón/nivel bloqueado de **Siguiente episodio** desaparece, y el texto de "Continuará…" aclara que el próximo episodio se ve al día siguiente.

## Cambios (todo en `src/components/storybook/StorybookPlayer.tsx`)

1. **Eliminar el botón de siguiente episodio** (tanto el enlace activo como la tarjeta bloqueada con candado) del final del episodio. También se limpia la lógica asociada: `nextEpisode`, `nextLabel`, el `useMemo` que lo calcula y los props que se pasan a `FinaleSlide`.

2. **Actualizar el texto de "Continuará…"**: al cliffhanger existente se le agrega al final, en el mismo cuadrito:
   - Español: `… Lo ves en el siguiente día.`
   - English: `… See you the next day.`
   - El texto del cliffhanger de cada episodio no se toca; solo se añade esta frase al mostrarlo.

3. **Resultado final del episodio (en orden):**
   ```text
   🎉 ¡Terminaste el episodio!  (estrellas)
   Mi cuaderno de vocabulario
   Ahora te toca a ti  (grabación máx 15s + ESCUCHARME)
   [ AHORA GRABA TUS AUDIOS → ]   ← único botón
   Continuará… Episodio N: <teaser>. Lo ves en el siguiente día.
   ```

4. La pantalla de día (`/day/...`) ya desbloquea el siguiente episodio al día siguiente, así que el flujo queda: terminar episodio → grabar audios → volver mañana por el siguiente.

## Verificación
- `bunx vitest run` en los tests de storybook.
- Revisión móvil (Playwright, 394px): terminar Episodio 1 y confirmar que solo aparece "AHORA GRABA TUS AUDIOS", que no hay botón de siguiente episodio, y que el cuadro "Continuará…" incluye "Lo ves en el siguiente día." Navegar el botón a `/practice` correctamente.
