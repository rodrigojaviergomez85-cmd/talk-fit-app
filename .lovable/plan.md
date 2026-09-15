# "Ponerme al día desde Básico 1" — modo puesta al día

Un modo opcional que arma automáticamente la ruta de El mundo de Vale desde el primer episodio y le dice al estudiante qué ver hoy, sin bloquear nada.

## Qué verá el estudiante

1. **Tarjeta nueva en la pantalla de historias (Audiolibros / El mundo de Vale)**
   - Si nunca activó el modo: botón "Ponerme al día desde Básico 1" con una línea explicando el plan (2 episodios por día).
   - Si ya lo activó: la tarjeta se convierte en "Tu plan de hoy" con los 2 episodios sugeridos, un botón grande para empezar el siguiente, y el avance ("Episodio 14 de 148").

2. **Plan diario**
   - 2 episodios por día en orden, desde el primer episodio de la Temporada 1 hasta el último episodio publicado.
   - Solo cuenta como avance los episodios que el estudiante termina (llega al final del episodio), no los que abre.
   - Si un día ve más de 2, se le felicita y el plan sigue desde donde quedó; nunca se le bloquea.
   - Si se atrasa, la tarjeta dice cuántos lleva y sugiere retomar, sin regaños.

3. **Al terminar un episodio**
   - Junto a "Siguiente episodio" aparece, cuando ya completó los 2 del día, un mensaje de meta cumplida y la opción de seguir igual.

4. **Salir del modo**
   - Enlace discreto "Ya no quiero el plan" dentro de la tarjeta; se puede volver a activar cuando quiera.

Todo bilingüe (español/inglés) siguiendo el idioma de la app. No cambia los límites de práctica oficiales ni la ruta del currículum.

## Detalles técnicos

- **Orden canónico**: nueva función en `src/services/storybook/seasons.ts` que devuelve la lista plana de episodios producidos (reusando la lógica de `getNextProducedEpisodeId`), para que el plan siga temporadas 1→8 automáticamente cuando se publiquen más.
- **Estado del modo**: se guarda junto al progreso local de historias en `src/services/storybook/storybook-progress.ts` (clave nueva, p. ej. `storybook.catchup.v1`): activo/inactivo, fecha del día local (America/El_Salvador) y episodios completados ese día. Se reutiliza `isEpisodeSeen`/`markEpisodeSeen` para calcular el siguiente episodio pendiente.
- **Cálculo del plan**: helper puro `getCatchUpPlan(seenIds, state)` que devuelve `{ nextEpisodeId, todayRemaining, completedCount, totalCount }`. Con pruebas unitarias (lista vacía, a mitad, todo completado, cambio de día).
- **UI**: componente `CatchUpCard` usado en `src/routes/natural-method.audiobooks.tsx`; en `StorybookPlayer.tsx` solo se añade el mensaje de meta diaria junto al botón existente de "Siguiente episodio".
- Sin cambios de backend, sin migraciones, sin tocar límites de práctica ni la ruta oficial.

## Verificación

- Pruebas del helper + suite Vitest completa y TypeScript.
- Revisión en móvil (393 px) de la tarjeta y del final de episodio.
