# La liga debe seguir tu nivel actual

## Qué está pasando (verificado en la base de datos)

Tu cuenta tiene el nivel guardado **Tigers**, pero tu única inscripción en la liga es **Basic Zero · Semana 1** con 1,350 puntos de esta semana. Como en Tigers todavía no has ganado puntos, la pantalla de la liga no encuentra nada ahí y, sin avisarte, cae a la única liga donde sí tienes puntos: Basic Zero. Por eso entras desde Tigers y ves Basic Zero.

## Qué va a quedar

1. **La liga que se abre es la de tu nivel actual.** Al entrar desde un día de Tigers (o desde el menú), verás Tigers de esa semana, aunque todavía tengas 0 puntos, con la tabla de ese grupo. Nunca se cambiará sola a otro nivel.
2. **Al cambiar de nivel, la app te pregunta la semana.** Después de elegir el nivel en Mi Cuenta, aparece un paso para escoger Semana 1, 2, 3 o 4 (igual que en el registro inicial, días 1, 6, 11 o 16). Con eso quedas inscrito en la liga correcta de ese nivel.
3. **Te inscribes de inmediato en el nuevo nivel.** Apenas confirmas, apareces en la tabla del nuevo nivel y semana con 0 puntos y puedes empezar a sumar ese mismo día.
4. **Los puntos de la semana en curso del nivel anterior se borran.** Sales de esa liga y tus puntos de la semana desaparecen, tal como acordamos. Las semanas ya cerradas se conservan en el historial para consulta.
5. **Aviso claro antes de confirmar.** El diálogo dirá que perderás los puntos de la liga de esta semana y que empezarás desde cero en el nivel y la semana elegidos.
6. **Cuentas admin / sin límites** siguen pudiendo observar la liga de otros niveles en solo lectura, sin inscribirse ni sumar puntos.

## Detalle técnico

- **Nueva función de base de datos `league_switch_level(_module_id text, _curriculum_week smallint)`** (security definer): para el usuario autenticado borra sus `league_rewards` y `league_memberships` de todas las competencias **abiertas** (`closed = false`) que no sean la cohorte destino, y luego llama a `league_ensure_membership` para crear la membresía en el nuevo módulo/semana con 0 puntos. Las competencias cerradas no se tocan. Sin GRANT a `anon`.
- **`src/lib/league.functions.ts`**: nueva función de servidor `switchLeagueLevel` con `requireSupabaseAuth` que valida la cohorte con `isLeagueCohort` y llama a la RPC.
- **`src/services/cloud-sync.ts` → `changeLevel(moduleId, startWeek)`**: acepta la semana elegida, la guarda en `user_preferences.start_week` junto con `current_module_id`, y llama a `switchLeagueLevel` con esa semana (día 1/6/11/16 según la semana). Si no hay sesión, se omite la parte de liga.
- **`src/routes/level.tsx`**: tras elegir módulo, un segundo paso reutiliza el selector de semana del onboarding (`src/routes/onboarding.tsx`) antes del diálogo de confirmación; al confirmar navega a Inicio como hoy.
- **`src/routes/liga.tsx`**:
  - `loadFor` deja de usar `JourneyService.nextPractice` como origen: usa `from`/`day` de la URL cuando existen y, si no, `JourneyService.currentModule` + su día actual (nivel guardado).
  - Se elimina la condición `(from !== moduleId || fromDay !== day)` que saltaba la consulta por cohorte; siempre se pide la cohorte pedida.
  - El fallback automático al historial deja de cambiar de módulo: si en la cohorte actual no hay inscripción y tampoco modo observador, se muestra la liga vacía de ese nivel con su tabla; el historial sigue disponible en el selector de semanas.
- **`src/routes/level.tsx` / textos en `src/lib/i18n.tsx`**: aviso bilingüe en el diálogo de confirmación sobre la pérdida de puntos de la semana en curso.
- Sin cambios en puntos por actividad (150), tope semanal, recuperación de días, ocultarme de la tabla, progreso de audios, grabaciones ni currículo.

## Verificación

- Consulta en base de datos antes/después del cambio de nivel: la membresía de Basic Zero semana en curso desaparece y aparece una de Tigers con 0 puntos.
- Entrar a `/liga` desde un día de Tigers y desde el menú: siempre muestra Tigers de la semana correspondiente.
- Una semana cerrada anterior sigue visible en el selector de historial.
- Pruebas de liga, verificación de tipos y revisión móvil de `/liga` y `/level`.
