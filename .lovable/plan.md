# Actualizaciones automáticas de la app

Hoy, cuando publicas una versión nueva, el estudiante que dejó la app abierta sigue viendo la versión vieja hasta que la cierra y la vuelve a abrir. A veces incluso ve una pantalla en blanco o un botón que no responde, porque la app vieja pide piezas que ya no existen.

La idea es que la app se entere sola de que hay una versión nueva y se actualice sin molestar al estudiante en medio de su práctica.

## Cómo funcionaría

1. **La app revisa si hay versión nueva**
   - Cada 2 minutos, y también cuando el estudiante vuelve a la app después de dejarla en segundo plano, la app pregunta al servidor "¿cuál es la versión actual?".
   - Es una consulta muy pequeña y no gasta créditos ni toca la base de datos.

2. **Se actualiza sola cuando es seguro**
   - Si el estudiante está en una pantalla tranquila (Inicio, Progreso, lista de episodios, Mi Cuenta), la app se recarga sola al instante. Él solo ve un parpadeo y ya está en la versión nueva.
   - Si está grabando, escuchando un audio, en medio de una pregunta del Paso 2, en una historia de Vale o en el simulador de entrevista, **no se recarga**. Espera a que termine esa actividad y se actualiza en cuanto vuelva a una pantalla tranquila.

3. **Aviso discreto por si tarda**
   - Si el estudiante lleva rato en una actividad, aparece un aviso pequeño abajo: "Nueva versión disponible · Actualizar" / "New version available · Update". Él decide si toca ahora o sigue y se actualiza solo al terminar.

4. **Rescate automático si algo falla**
   - Si la app vieja intenta cargar una pieza que ya no existe (eso es lo que provoca la pantalla en blanco o los botones muertos), la app se recarga sola una vez y queda en la versión nueva, en lugar de quedarse trabada.

5. **Nada de caché pegada**
   - No se agrega ningún "service worker" ni caché de la app, para no repetir el problema de versiones atoradas. El caché temporal de audios de las historias se mantiene igual.

## Lo que no cambia

- Los audios, las historias, la grabación, los pasos, las cuotas y los cobros quedan exactamente igual.
- El estudiante nunca pierde su progreso: la recarga solo ocurre fuera de actividades y, dentro de una historia, ya se guarda la escena donde iba.

## Detalles técnicos

- Nuevo endpoint público `GET /api/public/version` que devuelve un identificador de build (inyectado en tiempo de build vía `define` en `vite.config.ts`, con fallback a la fecha del despliegue), con `Cache-Control: no-store`.
- Nuevo hook `src/hooks/use-app-update.ts`: polling cada 120s con `setInterval`, más chequeo en `visibilitychange` y `focus`; compara con el build id del bundle actual; expone `updateReady`.
- Nuevo contexto ligero `src/lib/activity-lock.ts` (o `ActivityContext`): las pantallas de actividad (StorybookPlayer, pasos de práctica, simulador, grabación/AI coach) registran `busy = true` mientras hay audio, grabación o pregunta abierta; el resto queda libre.
- Recarga vía `window.location.reload()` cuando `updateReady && !busy`; si `busy`, se muestra el aviso (`sonner`, bilingüe) y se reintenta al liberarse.
- Manejo de `vite:preloadError` y de errores `Failed to fetch dynamically imported module` con una única recarga marcada en `sessionStorage` para evitar bucles.
- Montaje del watcher una sola vez en `src/routes/__root.tsx`; sin service worker ni `vite-plugin-pwa`.
- Verificación: pruebas del hook (versión igual/distinta, bloqueo por actividad, recarga única), typecheck, suite completa y prueba manual en 393px simulando cambio de versión.
