# Piloto «Mi vocabulario» — Basic Zero, primeras 5 historias

Práctica opcional de expresiones ya vistas en las historias. No toca audios obligatorios, puntos, liga, racha ni avance de módulo.

## Alcance

Historias: `vale-first-day`, `vale-first-call`, `vale-who-is-he`, `vale-who-is-d`, `vale-support-team` (Temporada 1, días 1–5).

Catálogo: 4–5 expresiones por historia (20–25 en total), escritas a mano y verificadas contra el texto real de cada escena. Cada entrada lleva: ID estable, historia y escena de origen, expresión exacta, significado breve en español, pista en español que no revela el inglés, dos situaciones nuevas de práctica y referencia a audio existente solo si se verifica que existe.

Sin IA, sin reconocimiento de voz, sin generación de audio en tiempo real.

## Qué verá el alumno

- **Home**: tarjeta bajo la historia — «Mi vocabulario», cantidad pendiente, botón Practicar/Continuar, «5–10 min; puedes salir cuando quieras». Sin historias leídas: mensaje de bienvenida y enlace al lector. Sin pendientes: próxima fecha disponible.
- **Método**: acceso «Mi vocabulario» junto al recorrido de historias. Sin pestaña nueva en la navegación inferior.
- **Historia**: acción para guardar/quitar expresiones del catálogo, con estado «Guardada» y sin duplicados.
- **Práctica** (`/mi-vocabulario`): una expresión por pantalla — situación en español, «Ver pista», «Ver respuesta» (significado y «Escuchar» solo si hay audio verificado), y autoevaluación **Me salió / Con ayuda / Todavía no**. Al final, dos expresiones con «Ahora úsalo tú» (situación nueva, ejemplo preparado, «Ya lo intenté») y cierre «Practicaste X expresiones».

## Lógica de repaso

- Sesión automática de hasta 8 expresiones pendientes únicas, orden fijado al iniciar y reanudable entre salidas y dispositivos.
- Expresiones recién encontradas se programan para mañana; consultarlas hoy no mueve el calendario.
- Intervalos 1, 3, 7, 14 días. «Me salió» sin pista avanza; «Con ayuda», pista usada o «Todavía no» reprograma a mañana. Tope en 14 días. Máximo un avance por día local por expresión.
- Días omitidos generan una sola pendiente por expresión. Sin repetir una expresión dentro de la misma sesión.

## Detalles técnicos

Contenido: `src/services/vocabulary/catalog.ts` (catálogo tipado) + `expressions-*.ts` por historia; validado contra las escenas reales en pruebas.

Base de datos (nueva migración, RLS de propietario y GRANTs):
- `vocab_items`: estado por usuario y expresión — elegible, guardada, intervalo, próxima fecha, último avance, variante de situación presentada.
- `vocab_sessions`: sesión con cola fija, posición, estado y marcas de tiempo.
- `vocab_events`: eventos mínimos (sesión iniciada/terminada, autoevaluación, pista abierta) con duración activa; nunca audio, transcripciones ni texto libre.
- `vocab_pilot_cohort`: membresía del piloto, comprobada en servidor.

Servidor: `src/lib/vocabulary.functions.ts` con `requireSupabaseAuth` — obtener estado, iniciar/reanudar sesión, registrar autoevaluación y pista, cerrar sesión. Todas las escrituras idempotentes por (usuario, expresión, día) y por (sesión, posición). Flag `mi_vocabulario` desactivado por defecto y validado en servidor; fuera del piloto la ruta directa deniega acceso sin invitar a participar.

UI: `MiVocabularioCard` en Home, entrada en Método, botón de guardado en `StorybookPlayer`, pantalla de práctica en `src/routes/_authenticated.mi-vocabulario.tsx`.

## Pruebas

Vitest: catálogo verificado contra las escenas; máximo de 8 sin duplicados; guardado repetido idempotente; reanudación tras recarga; cada intervalo con fecha controlada; pista registrada aunque marque «Me salió»; repetir el mismo día no avanza; día inicial sin historias; audio ausente; error de guardado con reintento; aislamiento A/B y cuenta fuera del piloto; puntos, cuotas y avance intactos; sin llamadas a IA/STT/TTS. Revisión móvil a 320 px con foco visible y sin desbordamiento.

## Entrega

Catálogo para revisión, resumen de cambios, capturas móviles y resultados de pruebas, con la cohorte aún desactivada.
