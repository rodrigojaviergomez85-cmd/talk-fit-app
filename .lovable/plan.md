# Paso 4: alertas de gasto y salud en el panel de admin

Objetivo: que el equipo vea, sin buscar, cuándo el costo o el uso se sale de lo normal antes de escalar a 17 mil estudiantes. Todo se muestra dentro de la app, en la pantalla de administración. Sin correos ni servicios nuevos.

## Qué verá el equipo

Una pantalla nueva "Alertas" (solo administradores) con cuatro bloques y un semáforo por cada uno: verde (normal), amarillo (atención), rojo (actuar ya).

1. Gasto diario de IA
   - Costo estimado de hoy y de ayer (transcripción, coach y voces), y el promedio de los últimos 7 días.
   - Salta en amarillo si hoy supera 1.5 veces el promedio; en rojo si supera 2.5 veces o un tope diario fijo.

2. Crecimiento de archivos
   - MB nuevos de grabaciones hoy y en 7 días, total acumulado y cuánto del disco de 500 GB está usado.
   - Amarillo al 60% del disco, rojo al 80%, o si un solo día crece más de lo esperado.

3. Estudiantes activos y picos
   - Activos hoy, activos en 7 días, y prácticas por hora en las últimas 24 horas para ver la hora pico.
   - Amarillo cuando la hora pico pasa el nivel normal; rojo cuando se acerca al techo probado.

4. Salud de la base
   - Conexiones en uso frente al máximo, memoria y tamaño de la base.
   - Amarillo al 60% de conexiones o memoria, rojo al 80%.

Arriba de las pantallas de administración aparece una franja de aviso cuando hay algo en amarillo o rojo, con un enlace directo a "Alertas". Los umbrales se pueden cambiar desde la misma pantalla, sin tocar código.

## Qué no cambia

Nada para los estudiantes: es solo lectura y solo para administradores. No se modifican límites, precios, contenido ni grabaciones.

## Detalle técnico

- Nueva función de base `admin_health_snapshot()` (security definer, solo admin) que devuelve en una sola llamada: uso de IA por día (`ai_usage_limits`, `ai_coach_usage`), grabaciones y MB por día (`recordings`, `day_progress`), activos por día y prácticas por hora (`practice_attempts`, `interview_attempts`), y métricas de base (`pg_stat_activity`, `pg_database_size`, ajustes de conexiones).
- Nueva tabla `alert_thresholds` (una fila por señal, con GRANT + RLS: lectura para `authenticated` admin vía `has_role`, escritura solo admin) y semilla con los valores por defecto de arriba.
- `src/lib/admin-alerts.ts`: tipos y evaluación pura de umbrales (verde/amarillo/rojo), con pruebas unitarias — sin llamadas de red.
- `src/lib/admin-alerts.functions.ts`: server function con `requireSupabaseAuth`, verifica admin y llama la RPC; reutiliza el patrón de `admin-cost-center.functions.ts`.
- `src/routes/admin.alertas.tsx`: pantalla nueva bilingüe, con el mismo estilo de tarjetas de `admin.metrics.tsx`, botón de recarga y edición de umbrales.
- Franja de aviso reutilizable en las pantallas admin existentes (`admin.metrics`, `admin.limites`, `admin.storage-report`).
- El costo estimado reutiliza los precios ya definidos en `admin-cost-center.ts`, sin duplicarlos.

## Validación

Pruebas de la lógica de umbrales, revisión de tipos, suite completa y una revisión de la pantalla en tamaño de celular con sesión de administrador.
