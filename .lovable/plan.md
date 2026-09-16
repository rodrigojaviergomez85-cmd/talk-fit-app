# Ver la liga del módulo desde el que entras

## Qué está pasando

Los grupos sí están bien separados en la base de datos: Basic Zero semana 1 tiene 185 personas y Tigers semana 1 tiene 164, y no hay ni una sola persona repetida entre ambos.

El problema es de pantalla: al abrir la liga, la app siempre carga la liga donde compites tú (Basic Zero · Semana 1), sin importar si entraste desde Tigers día 1. Por eso ves la misma tabla y los mismos nombres en los dos casos.

## Qué se va a construir

1. **La liga se abre según el módulo desde el que entras.** Si entras desde Tigers día 1, se abre Tigers · Semana 1; desde Basic Zero día 6, la semana de Basic Zero que te corresponde.
2. **Modo observador para cuentas admin / sin límites.** Cuando la cuenta no compite en ese grupo, la tabla se muestra en solo lectura: se ven puestos, nombres y puntos, con un aviso de que estás observando y no sumas puntos. No aparece el interruptor de ocultarme.
3. **Para el resto de estudiantes no cambia nada.** Si entran desde un módulo donde no compiten (no debería pasar en uso normal), se les sigue mostrando su propia liga, igual que hoy.
4. **Encabezado más claro**: el módulo y la semana que estás viendo quedan visibles arriba de la tabla (ya se muestran, se refuerza con el modo observador).

## Detalles técnicos

- `src/routes/liga.tsx`: `loadFor` deja de derivar módulo/día de `JourneyService.nextPractice` cuando existen los parámetros `from` y `day` de la URL; esos mandan. El selector de semanas y el resto del flujo se mantienen.
- Nueva función de servidor `getCohortLeagueSummary` en `src/lib/league.functions.ts` (con `requireSupabaseAuth`): recibe `moduleId` + `day`, resuelve la competencia de esa cohorte para la semana calendario en curso y devuelve el resumen. Para cuentas admin / sin límites devuelve `observer: true` con `participants`, `rank: null` y `points: 0`; para el resto, si no hay membresía, responde vacío y la UI cae al comportamiento actual.
- Nueva función de base de datos `league_summary_for_cohort(_module_id text, _curriculum_week int)` (security definer, sin GRANT a `anon`): usa `has_role(auth.uid(),'admin')` o `is_unlimited_test_user(auth.uid())` para permitir la lectura observadora; si el usuario sí es miembro, delega en la misma lógica de `league_my_summary`. Ningún cambio en `league_award`, cupos ni puntos.
- `getLeaguePreview` / `getLeagueBoard` ya trabajan por `competitionId`, así que la tabla completa y la paginación funcionan sin cambios; `league_board` se revisa para que un observador autorizado pueda leer la competencia.
- `src/lib/i18n.tsx`: textos bilingües de "modo observador · no sumas puntos en esta liga".
- Se corrige de paso un aviso de hidratación en `src/routes/day.$moduleId.$day.tsx` (botón siguiente día renderizado distinto en servidor y cliente).

## Verificación

- `bunx tsgo --noEmit` y la suite de pruebas de liga.
- Casos nuevos: resumen por cohorte para observador (participantes reales, 0 puntos) y prioridad de los parámetros de la URL sobre el día actual.
- Revisión en navegador móvil: `/liga?from=tigers&day=1` muestra Tigers · Semana 1 con sus 164 participantes; `/liga?from=basic-zero&day=6` muestra Basic Zero · Semana 1 con los 185.
