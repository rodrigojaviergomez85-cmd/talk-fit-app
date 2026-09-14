# Paso 1: Topes de uso + ventana de episodios de Vale

## A. Encender los topes de uso

### Situación actual

Los topes que definimos siguen guardados y correctos:

| Sección | Tope diario | Tope mensual |
|---|---|---|
| Práctica (5 audios) | 5 | — |
| Simulador de entrevista | 2 | — |
| Coach de IA | 5 | 60 |
| Coach del audio final | 5 | — |
| Repetición del coach | 5 | — |

El bloqueo del sexto intento está construido en la base de datos, con protección contra intentos simultáneos y exención para cuentas internas. **Pero el interruptor global de límites está apagado**, y mientras lo esté, el sistema reemplaza cada tope por "ilimitado". Hoy nadie tiene tope real.

### Qué haré

1. Encender el interruptor global de límites (aplica a la vista previa y a la app publicada, porque comparten la misma base).
2. Dejar el cobro apagado, como está hoy. Los topes aplican a todos por igual hasta que decidas activar Pro.
3. Verificar que cada sección devuelve su tope real (5, 2, 5/60) y ya no un número ilimitado.
4. Verificar que las cuentas internas y de prueba sigan sin límite.
5. Revisar que "Mi cuenta" muestre uso y tope correctos, y que el aviso al llegar al límite se vea bien en celular y en español.

## B. Ventana de episodios en el mundo de Vale

### Cómo está hoy

Se abre un episodio por cada día de práctica completado, y cuando el estudiante termina un nivel, **toda** esa temporada queda abierta para siempre.

### Cómo quedará

- El estudiante ve el episodio de su día actual.
- Además puede repasar hasta **3 episodios hacia atrás**, nada más.
- Los episodios más viejos que esos 3 quedan cerrados, con el mensaje de bloqueo que ya existe.
- Los episodios más adelantados siguen cerrados, igual que hoy.
- La ventana avanza sola: al completar un día nuevo, entra el episodio nuevo y sale el más viejo.
- Si la ventana alcanza el final de la temporada anterior, esos episodios también se pueden repasar mientras estén dentro de los 3.
- Las cuentas internas y sin límite siguen viendo todo.

Ajustaré también la lista de episodios y los enlaces de "episodio siguiente" para que muestren candado en lo que ya quedó fuera de la ventana.

## Detalles técnicos

**Topes**
- `app_settings.limits_enabled` pasa de `false` a `true` en la fila `global`, vía `apply_admin_settings` (queda registro en `settings_audit_log`).
- `get_daily_limit` / `get_monthly_limit` devuelven `1000000000` mientras `limits_enabled()` sea falso; al encenderlo devuelven `free_limit * plan_multiplier`.
- `enforce_daily_practice_cap` y `enforce_daily_interview_cap` ya usan `pg_advisory_xact_lock` e `is_unlimited_test_user`; sin cambios.
- `billing_enabled` sigue en `false` y `pro_multiplier` en 4.
- Sin migraciones de esquema.

**Ventana de episodios**
- En `src/services/storybook/seasons.ts`: `unlockedDayInModule` deja de devolver `Number.MAX_SAFE_INTEGER` para módulos completados; se agrega un piso `earliestUnlockedDay = max(1, tope - 3)` y `isDayUnlocked` valida el rango completo, no solo el techo.
- Para módulos ya completados, el rango se calcula desde la posición global del estudiante en la ruta oficial, de modo que la ventana pueda cruzar de una temporada a la anterior.
- Se actualizan los consumidores: `natural-method.audiobooks.tsx`, `natural-method.cuento.$storyId.tsx`, `day.$moduleId.$day.tsx` y `getNextEpisodeSlot`.
- Se amplían `season-route-lock.test.ts` y `seasons.test.ts` con casos de borde: día 1, día 4 (primer cierre hacia atrás), cruce de temporada, módulo completado y cuenta sin límite.
