# Paso 1: Encender los topes de uso

## Situación actual

Los topes que definimos siguen guardados y correctos:

| Sección | Tope diario | Tope mensual |
|---|---|---|
| Práctica (5 audios) | 5 | — |
| Simulador de entrevista | 2 | — |
| Coach de IA | 5 | 60 |
| Coach del audio final | 5 | — |
| Repetición del coach | 5 | — |

El bloqueo del sexto intento está construido en la base de datos, con protección contra intentos simultáneos y exención para cuentas internas. **Pero el interruptor global de límites está apagado**, y mientras lo esté, el sistema reemplaza cada tope por "ilimitado". Hoy nadie tiene tope real.

## Qué haré

1. Encender el interruptor global de límites (queda activo tanto en la vista previa como en la app publicada, porque comparten la misma base).
2. Dejar el cobro apagado, como está hoy. Los topes aplican a todos por igual hasta que decidas activar Pro.
3. Verificar con consultas que cada sección devuelve su tope real (5, 2, 5/60) y ya no un número ilimitado.
4. Verificar que las cuentas internas y de prueba sigan sin límite.
5. Revisar que la pantalla de "Mi cuenta" muestre el uso y el tope correctos al estudiante, y que el mensaje al alcanzar el límite se vea bien en celular y en español.

## Decisión que necesito de ti

Los topes actuales son 5 prácticas y 2 entrevistas por día. Si quieres otros números para el lanzamiento a 17,000 estudiantes, dímelos y los ajusto en el mismo paso.

## Detalles técnicos

- `app_settings.limits_enabled` pasa de `false` a `true` en la fila `global`, mediante la función existente `apply_admin_settings` (deja registro en `settings_audit_log`).
- `get_daily_limit` / `get_monthly_limit` devuelven `1000000000` cuando `limits_enabled()` es falso; al encenderlo devuelven `free_limit * plan_multiplier`.
- El trigger `enforce_daily_practice_cap` (y su equivalente de entrevistas) ya usa `pg_advisory_xact_lock` y `is_unlimited_test_user`; no requiere cambios.
- `billing_enabled` se mantiene en `false` y `pro_multiplier` en 4 para cuando se active Pro.
- No hay cambios de esquema ni migraciones nuevas.
