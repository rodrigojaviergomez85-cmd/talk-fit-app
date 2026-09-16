# Liga semanal (piloto: Basic Zero · Semana 1)

Una competencia semanal por módulo y semana del currículo que premia las dos actividades de cada jornada: la historia del Método Natural (El mundo de Vale) y la práctica de audios del día.

## Reglas de puntos

- 150 pts por historia completada + 150 pts por práctica de audios completada = 300 pts por jornada.
- 5 jornadas por semana del currículo (Semana 1 = días 1–5) → meta y máximo 1,500 pts.
- Sin tope por fecha: quien entra el miércoles puede recuperar lunes y martes y ganar 600 pts ese día, siempre dentro de los límites de práctica/IA/entrevistas ya existentes (no se tocan).
- Cada actividad premia una sola vez. Repetir, retakes, recargar o abrir en dos dispositivos no vuelve a pagar.
- Solo cuentan finalizaciones hechas después de activar la funcionalidad y dentro de la semana calendario abierta. Nada retroactivo.

## Semanas y participantes

- Semana del currículo: define las 5 jornadas elegibles.
- Semana calendario: lunes a domingo en America/El Salvador (la misma zona que ya usa el resto de la app), calculada en el servidor.
- Al primer contacto de la semana el servidor fija la asignación del estudiante (módulo + semana del currículo) y no cambia hasta el lunes siguiente, aunque avance en el currículo o cambie de módulo.
- Todos los estudiantes elegibles de esa combinación entran, aunque tengan 0 pts y aunque nunca abran el tablero. Se excluyen cuentas administrativas y de la lista interna ya existente.
- Piloto: solo se crean ligas para Basic Zero · Semana 1. La estructura queda lista para el resto.
- Si a una cohorte le faltan historias publicadas para las 5 jornadas, la meta se marca como no alcanzable y se registra el caso en vez de mostrar 1,500 como real.

## Pantalla del día

Se mantiene el orden actual y se agrega:

- Método Natural: “+150 pts” mientras la recompensa siga disponible; “✓ 150 pts” solo tras confirmación del servidor. Sigue siendo opcional y nunca bloquea los audios.
- Audios del día: “+150 pts”; los puntos se dan al completar la práctica y confirmar el audio final, no por grabación.
- Progreso de esa jornada: “Puntos de esta jornada: 150 / 300” con barra compacta.
- Tarjeta con trofeo “Tu liga semanal”: módulo y semana reales, “900 / 1,500 pts”, “Puesto 24 de 380”, acción “Ver mi liga”, y el aviso “¡Todavía estás a tiempo! Completa tus actividades pendientes antes del domingo.”
- Celebración breve “+150 puntos” (respeta movimiento reducido) y, al cerrar la jornada, “¡Completaste ambas actividades!” con acceso a la liga sin quitar la acción principal.
- Sin pestaña nueva en el menú inferior; mismos colores y tarjetas redondeadas.

## Tablero

Pantalla interna `/liga`:

- “Volver a mi día”, módulo y semana, fechas de competencia y cierre, puntos propios y meta, participantes reales, posición.
- Vista inicial: avance personal, top 3 y la fila del estudiante con sus vecinos, sin duplicados.
- “Ver clasificación completa”: paginación en el servidor de 25 en 25, anterior/siguiente y “Ir a mi posición”. Nunca se descarga la liga entera al teléfono.
- Puesto, iniciales/avatar, nombre público y puntos; fila propia destacada. Nunca correos ni datos privados.
- Empates: mismo puntaje = mismo puesto (no se desempata por rapidez); el orden interno de paginación es estable.
- Desplegable “¿Cómo sumo puntos?” con las reglas y la nota “Los puntos reconocen tu práctica y constancia. No son una calificación de tu inglés.”
- Opción de ocultarse de la clasificación pública conservando puntos y progreso personal.
- Estados de carga, error y liga vacía; los resultados de semanas cerradas se conservan.

## Detalles técnicos

Base de datos (migración con GRANT + RLS):

- `league_competitions`: semana calendario (inicio/cierre), módulo, semana del currículo, estado abierto/cerrado.
- `league_memberships`: asignación fija por estudiante y competencia, bandera `hidden_from_public`, puntos acumulados.
- `league_rewards`: usuario, tipo (`story` | `practice`), módulo, día, identificador estable de la actividad, competencia, puntos, fecha real de finalización y fecha de concesión. Índice único por (usuario, tipo, módulo, día) para soportar doble clic, reintentos y varias pestañas.
- Agregado semanal indexado para el tablero; sin recorrer historial completo.
- RLS: el estudiante lee su membresía y sus recompensas; no puede insertar, modificar ni borrar recompensas, ni cambiar su asignación. El tablero se sirve por función `security definer` que devuelve solo datos públicos y calcula `dense_rank` con paginación de 25.

Servidor (`createServerFn` con `requireSupabaseAuth`, sin llamadas a IA):

- `claimActivityReward`: deriva el usuario de la sesión, resuelve la competencia abierta, verifica que la jornada pertenece a las 5 elegibles, valida la finalización real contra las tablas existentes (`practice_attempts` / `day_progress` para audios; vistas de episodio para la historia) y concede puntos en una sola transacción idempotente.
- Finalización de la historia: hoy depende de un flag del cliente y de `localStorage`. Se agrega un manifiesto de episodios en el servidor (escenas y preguntas requeridas, sin imágenes) y la concesión exige que el avance persistido alcance ese mínimo; el flag del navegador deja de ser suficiente.
- `getMyLeagueSummary` y `getLeagueBoard(page)` para tarjeta y tablero; se refrescan al abrir la liga y después de una recompensa, sin polling ni suscripciones globales.
- La práctica se guarda primero como hoy; si la recompensa falla queda pendiente y se reintenta de forma idempotente, sin bloquear ni perder la práctica.
- Consultas pensadas para 17,000–23,000 estudiantes: agregados indexados y ranking calculado antes de paginar.

## Pruebas

Con Vitest, sobre la lógica pura y las reglas SQL: 150 por historia válida, 150 por práctica completa, 600 en un día por dos jornadas recuperadas, tope de 1,500, incorporación en miércoles, no duplicación ante repeticiones/retakes/concurrencia, rechazo de actividades ajenas, antiguas o fuera de las jornadas asignadas, asignación fija ante cambio de módulo, cierre en la zona horaria institucional, empates compartiendo puesto, paginación con más de 25 participantes, “Ir a mi posición”, imposibilidad de alterar puntos o exponer datos privados, recuperación de recompensa fallida y conservación de los límites actuales. Además se ejecutan la suite completa y la verificación de tipos.

## Entrega

Al terminar se reporta: resumen, migraciones y permisos, criterios exactos de finalización de ambas actividades, reglas de recuperación/asignación/cierre, pruebas ejecutadas y limitaciones pendientes.
