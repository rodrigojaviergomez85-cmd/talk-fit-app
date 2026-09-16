# Calendario diario de actividad (admin)

Un calendario mes por mes dentro de la pantalla de Métricas de admin que guarda y muestra, día por día, cuánta gente estuvo activa y qué hicieron.

## Qué verá el admin

Una sección nueva "Calendario de actividad" en `/admin/metrics`, en tres partes:

**1. Últimos 7 días en cuadros pequeños**
Una fila de 7 recuadros compactos (uno por día, el de hoy al final). Cada uno muestra la fecha corta y los estudiantes únicos activos de ese día.

**2. Gráfica lineal con selector de rango**
Debajo, una gráfica de línea de estudiantes activos por día, con botones para elegir: últimos 7 días, últimos 15, últimos 30, o mes por mes (con navegación de mes anterior / siguiente, sin pasar del mes actual).

**3. Detalle del día**
Al tocar un cuadro o un punto de la gráfica se abre el desglose de ese día:
  - Total de estudiantes únicos activos
  - Prácticas de módulos: estudiantes únicos + total de prácticas
  - El Mundo de Vale: estudiantes únicos + total de episodios abiertos
  - Simulador de entrevistas: estudiantes únicos + total de simulaciones
  - Review: estudiantes únicos + total de prácticas de review
  - Coach IA: estudiantes únicos + total de preguntas

Además, un resumen del rango seleccionado: promedio de activos por día, mejor día y días con actividad.


Los días se cuentan con la hora de El Salvador, igual que los topes diarios, para que coincidan con lo que vive el estudiante.

## Registro histórico

No hace falta empezar a registrar desde cero: la actividad ya queda guardada en las tablas existentes, así que el calendario muestra historial completo desde el primer día de uso. Un estudiante cuenta como activo si ese día hizo una práctica, abrió un episodio, hizo un simulador, un review o usó el Coach IA.

## Detalles técnicos

- Nueva función de base de datos `admin_daily_activity(_from date, _to date)` (security definer, verifica rol admin igual que `admin_engagement_metrics`), que devuelve un arreglo de días del rango con:
  - `active_users`: unión distinta de usuarios de todas las fuentes
  - por fuente: `users` y `count`
  El mismo RPC sirve para 7/15/30 días y para un mes completo; el front pasa el rango.
- Fuentes y reglas de conteo (día local `America/El_Salvador`):
  - Prácticas: `practice_attempts` con `completed_at` no nulo y `module_id` que NO empieza con `review-`, agrupado por `local_day_key`
  - Review: mismas filas con `module_id like 'review-%'`
  - Vale: `story_episode_views.last_opened_at` (y `first_opened_at` para el conteo de aperturas del día)
  - Simulador: `interview_attempts` con `completed_at` no nulo, por `local_day_key`
  - Coach IA: `ai_coach_usage` con `period_type='day'` y `period_key` del día (`used` como total)
- Server fn `getAdminDailyActivity` en `src/lib/admin-daily-activity.functions.ts` con `requireSupabaseAuth`, llamando el RPC (mismo patrón que `getAdminMetrics`).
- Tipos y helpers en `src/lib/admin-daily-activity.ts`.
- Componente `ActivityCalendar` en `src/components/fluency/`: fila de 7 cuadros + gráfica de línea (recharts, ya usado en el proyecto vía shadcn) con selector de rango, y panel de detalle del día; montado en `src/routes/admin.metrics.tsx`.
- Índices de apoyo si faltan: `practice_attempts(local_day_key)`, `interview_attempts(local_day_key)`, `story_episode_views(last_opened_at)`.
- Pruebas: helpers de agregación/formato de mes y una prueba de que el RPC rechaza a no-admin.
