# Que tu cuenta sí compita en la liga

Hoy tu cuenta no suma puntos porque está marcada como administrador / sin límites, y esas cuentas se excluyen de la liga automáticamente. Vamos a permitir excepciones por cuenta: tú compites normalmente, y el resto de cuentas especiales siguen fuera.

## Qué cambia

- Tu cuenta (`rodrigo`, la que usas hoy) queda inscrita en la liga de Basic Zero · Semana 1 y suma puntos como cualquier estudiante.
- Apareces en la clasificación con tu nombre y tu puesto real.
- El resto de cuentas de administrador o sin límites siguen viendo la liga como observadores, sin puntos.
- Nada más cambia: los 300 puntos diarios, el máximo semanal, los topes de práctica y el resto de la app quedan igual.

## Cómo se hace (técnico)

1. Nueva tabla `public.league_participation_overrides` (`user_id`, `participates boolean`, fechas), solo escribible por el servidor/admin, con lectura propia para el usuario.
2. `league_is_excluded(_user_id)` pasa a consultar primero esa tabla: si hay una fila con `participates = true`, la cuenta NO se excluye, aunque sea admin o sin límites.
3. Se inserta la excepción para tu cuenta (identificada por su correo en `auth.users`).
4. Se ejecuta de nuevo `league_backfill_cohort('basic-zero', 1)` para que tu membresía quede creada en la competencia de esta semana.
5. En la app: el aviso de "modo observador" y el ocultar del toggle solo se muestran a cuentas realmente excluidas — como ahora ya estarás inscrito, verás la vista normal de participante sin cambios de código adicionales.

## Verificación

- Consultar que tu `user_id` aparezca en `league_memberships` de la competencia abierta y que el conteo de participantes suba de 162 a 163.
- Abrir `/liga` y un día de Basic Zero para confirmar que muestra puesto y puntos en vez del aviso de observador.
- Ejecutar los tests de liga y la verificación de tipos.
