# Volver a mi día, siguiente día con candado y Home actualizado

## Qué cambia para el estudiante

1. **Volver a mi día** te deja exactamente en el día que acabas de practicar, ya con la marca de completado y tus puntos visibles (hoy a veces se ve el día sin actualizar porque los datos guardados en el teléfono se recargan con información vieja de hasta 30 segundos).
2. **Siguiente día bloqueado**: el botón "SIGUIENTE DÍA" solo se activa cuando completaste los audios del día (la actividad obligatoria). Mientras no los completes se ve apagado con la leyenda *"Completa los audios de hoy para abrir el día siguiente"*. La historia no lo desbloquea.
3. **Día anterior** sigue siempre disponible, igual que hoy.
4. **Home se actualiza solo**: al volver a Inicio después de terminar los audios, la tarjeta principal muestra el nuevo día que te toca, sin necesidad de recargar la app. También se refresca al volver a la pestaña.
5. Si ya completaste el día que estás viendo, la tarjeta de audios muestra un ✓ "Completado" para que sepas dónde estás parado.

## Detalles técnicos

- `src/services/journey-service.ts`: limpiar `pullCache` dentro de `completeDay` (y exponer una función `invalidatePull()`), para que el siguiente `pull()` traiga estado fresco y no sobrescriba el día recién completado con la respuesta cacheada de 30 s.
- `src/routes/index.tsx`: volver a ejecutar `load()` en `visibilitychange`/`focus`, así Home muestra el día correcto al regresar desde la práctica.
- `src/routes/day.$moduleId.$day.tsx`:
  - Leer `JourneyService.isDayCompleted(journey, moduleId, day)` y refrescar `journey` en `focus`/`visibilitychange`.
  - Renderizar "SIGUIENTE DÍA" como `Link` solo si el día está completado; si no, mostrarlo como botón deshabilitado + nota de requisito. Cuentas con acceso ilimitado (`hasUnlimitedAccess`) no se bloquean.
  - Añadir el ✓ "Completado" en la tarjeta de audios.
  - Mantener sin cambios "DÍA ANTERIOR" y la leyenda de semana inactiva.
- `src/lib/i18n.tsx`: nuevas claves `day.nextDayLocked` y `day.completedTag` en español e inglés.
- Nada cambia en la autoridad del servidor sobre puntos ni en los topes diarios.

## Pruebas

- Test de unidad: `completeDay` invalida la caché de `pull`.
- Verificación en navegador móvil (393x852): día sin completar muestra el botón bloqueado; tras completar, "SIGUIENTE DÍA" activo y Home muestra el día siguiente.
- `tsgo --noEmit` y la suite de tests existente.
