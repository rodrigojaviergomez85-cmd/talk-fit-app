# Daily ceilings and size limits for the three remaining AI endpoints

Estoy de acuerdo con el plan completo. Lo implemento tal cual, con una sola observación en la Sección E (abajo).

## Qué cambia para el estudiante

Nada. Un estudiante normal termina el PASO 2, la grabación final, las historias y el toque-una-palabra exactamente igual. Lo que cambia es que ahora hay un techo diario por estudiante, visible y ajustable desde la pantalla de límites del admin, y que responde al multiplicador Pro.

## Section A — Migración: cuatro filas nuevas en `section_limits`

`INSERT ... ON CONFLICT (section_key) DO NOTHING`, `enabled` true, `free_monthly_limit` NULL:

| section_key | label | free_limit | sort_order |
| --- | --- | --- | --- |
| rep2_correction | Correcciones del Paso 2 (COPIA) | 60 | 6 |
| sentence_count | Conteo de ideas del audio final | 30 | 7 |
| tts_generate | Voces nuevas generadas (cache miss) | 60 | 8 |
| storybook | Story speaking checks | 30 | 9 |

`storybook` se agrega porque `story-say-check.ts` ya lo pide y hoy no existe: cae al 30 fijo e ignora el multiplicador Pro y la pantalla de admin. El razonamiento de los números (máximo 5 chunks de Rep 2 por día × 3 intentos, tope de 2 días de currículo por día → 30 es el techo honesto y 60 deja margen; sentence-count corre ~1 vez por toma final; los misses de TTS tienden a cero al cachearse) va en un comentario SQL arriba del INSERT.

## Sections B–D — El bloque diario en las tres rutas

Se copia verbatim el bloque de `story-say-check.ts` (`sectionDailyLimit` → `consumeQuota` con sufijo `-daily` y ventana de 24 h → 429 con `outcome: "429-daily"`), colocado inmediatamente **antes** del `consumeQuota` horario existente y **después** de todos los guards previos. No se reordena ningún guard.

- `rep2-correction.ts`: clave `rep2_correction`, fallback 60. Además `MAX_BYTES` baja de 3 MB a 1 MB, con el comentario indicado (45 s a ~128 kbps ≈ 720 KB). `MIN_BYTES` y los demás checks quedan igual.
- `sentence-count.ts`: clave `sentence_count`, fallback 30. `MAX_BYTES` se queda en 3 MB tal cual, junto con su check de tamaño declarado.
- `tts.ts`: dentro de `beforeGenerate`, el check diario (`tts_generate`, fallback 60, ventana 24 h) corre primero y devuelve `false` si no pasa, lo que produce el 429 existente por la rama `not-eligible`. Solo si pasa se ejecuta el `consumeQuota` horario de `tts-generate`. Los cache hits no tocan ningún contador.

## Section E — Lista blanca de textos de voz, en modo reporte

- Nuevo `src/lib/tts-allowlist.server.ts` con `isAllowedTtsText(text)` y un builder memoizado (una vez por proceso). Normalización: trim, espacios internos colapsados, minúsculas; solo texto, no voz ni tono.
- Fuentes: `buildInventory` sobre todos los módulos + banco de verbos, textos de historias de `StorybookPlayer`, prompts de los tres simuladores de entrevista, audiolibros e idioms de `NaturalMethodPager`, líneas de los módulos de Review, y todo lo demás que aparezca siguiendo cada llamada a `AudioService.speak` y `loadModelAudio`. Cada fuente incluida se lista en un comentario al inicio del archivo.
- Además, cada token de palabra de cada texto, usando el mismo `tokenizeWords` que usa `TappableSentence`, porque el toque-una-palabra envía palabras sueltas.
- Migración: columna `tts_allowlist_enforce` en `app_settings`, NOT NULL DEFAULT false, legible por la política SELECT existente. Sin UI de admin: se activa desde SQL.
- Migración: tabla `tts_generation_log` (id, created_at, user_id, clip_key, in_allowlist, enforced, characters, text_preview). `text_preview` = primeros 60 caracteres del texto normalizado, solo cuando `in_allowlist` es false. RLS activa, sin políticas para anon ni authenticated, GRANT ALL solo a service_role, índices en `(created_at)` y `(in_allowlist, created_at)`.
- En `tts.ts`, dentro del mismo `beforeGenerate` y antes del check diario: calcular `allowed`, leer `tts_allowlist_enforce` vía `supabaseAdmin`, escribir una fila de log con patrón fire-and-forget (nunca lanza, nunca retrasa la respuesta). Con enforce false se continúa a las cuotas pase lo que pase; con enforce true y `allowed` false se devuelve `false` y no se consume ninguna cuota.

**Observación (una sola).** El barrido de fuentes autorizadas es la parte más grande y la más propensa a quedar incompleta: hay al menos 14 sitios que reproducen voz y las historias generan texto en varias capas. Por eso el modo reporte es exactamente la decisión correcta, y lo dejo así. Al terminar dejaré escrito en el archivo qué fuentes quedaron cubiertas y cuáles no pude verificar, para que la revisión del log unos días después sea informada y no a ciegas.

## Section F — Sin tocar

Orden de guards, límites horarios y su ventana, `consume_ai_quota`, `ai_usage_limits`, `get_daily_limit`, `plan_multiplier`, `limits_enabled`, filas existentes de `section_limits`, caché / single-flight / storage de `course-audio.server.ts`, `MAX_TEXT`, y todo el lado cliente incluido `audio-service.ts`. No se registra ninguna transcripción, audio ni habla del estudiante.

## Section G — Pruebas

Por ruta: el check diario corre antes del horario; una negativa diaria devuelve 429 con `429-daily` sin consumir el contador horario; un paso diario seguido de negativa horaria sigue devolviendo 429; >1 MB en rep2-correction devuelve 413 antes de consumir cuota; 2 MB en sentence-count sigue aceptándose.

Para la lista blanca: frase autorizada permitida, palabra suelta de esa frase permitida, misma frase con mayúsculas y espacios extra permitida, frase aleatoria no permitida, builder corre una sola vez.

Para `tts.ts`: con enforce false un texto no autorizado genera y escribe log con `in_allowlist` false; con enforce true devuelve 429 sin consumir cuota; un cache hit no escribe log ni consume cuota de generación.

Al final: `npx vitest run` completo, incluidas las 677 pruebas existentes, más la revisión de tipos.
