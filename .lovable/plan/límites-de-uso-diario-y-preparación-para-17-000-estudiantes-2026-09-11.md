# Límites de uso diario y preparación para 17,000 estudiantes

## Qué está hoy (verificado en el código)

- Práctica de módulos y práctica de Review comparten un mismo tope: 5 sesiones por día calendario local, por cuenta. Está aplicado en el navegador y también en la base de datos (regla que rechaza la sexta sesión), así que no se puede saltar cambiando de teléfono.
- La segunda grabación de una misma sesión, refrescar o retomar no gasta otro cupo. Los retakes opcionales tampoco.
- Los simuladores de entrevista (B4, Intermedio, Avanzado) **no tienen ningún tope diario**. Un estudiante puede repetirlas ilimitadamente, y cada respuesta llama al conteo de oraciones (servicio pagado).
- Las cuentas internas (tres correos confirmados) quedan exentas.

Con tu decisión: mantener 5 en total (módulos + Review) y agregar **máximo 2 entrevistas al día en total** entre los tres simuladores.

## Cambios a implementar

1. **Tope de entrevistas: 2 por día**
   - Registro por cuenta de cada entrevista iniciada, con la fecha local del estudiante y cuál simulador fue.
   - El cupo se consume con la **primera respuesta grabada**, no al abrir la pantalla. Refrescar o continuar la misma entrevista no gasta otro cupo.
   - Aplicado en el servidor: si ya hay 2 hoy, la app bloquea antes de llamar a cualquier servicio pagado.
   - Mensaje bilingüe claro en el hub de simuladores y dentro de la entrevista: "Has usado 2 / 2 entrevistas hoy. Vuelve mañana." con contador visible.
   - Las cuentas internas siguen sin límite.

2. **Confirmar y dejar visible el tope de 5**
   - Mantener el cupo compartido de 5 (módulos + Review) tal como está.
   - Mostrar el contador de 5 también dentro de Review (hoy solo se ve claramente en Inicio), para que nadie se sorprenda a mitad de una práctica.

3. **Pruebas de aceptación**
   - La segunda entrevista del día se permite y la tercera se bloquea antes del proveedor.
   - Refrescar o continuar una entrevista ya iniciada no consume otro cupo.
   - Cambiar de dispositivo no reinicia el contador; el cambio de día sí.
   - Práctica + Review siguen sumando 5 en total y la sexta se bloquea.
   - Cuentas internas sin límite.

## Detalle técnico

- Nueva tabla `interview_attempts` (user_id, simulator, local_day_key, started_at, first_recording_at) con RLS por `auth.uid()`, GRANT a `authenticated` y `service_role`, y trigger `enforce_daily_interview_cap()` con tope 2, con la misma exención de `is_unlimited_test_user`.
- Cliente: servicio `interview-attempts.ts` espejo de `practice-attempts.ts` (ensure/consumeSlot/status), usado por `review.interview.tsx`, `review.interview-intermediate.tsx` y `review.interview-advanced.tsx`.
- `/api/sentence-count` recibe el `attemptId` de la entrevista y rechaza si el cupo del día ya se agotó (defensa del lado servidor).
- Sin cambios en cuotas de AI Coach, retakes, Test Ready ni TTS.

## Recomendación antes de escalar a 17,000

Verificado hoy: hay límites por endpoint en conteo de oraciones, corrección hablada, voz y Coach final, más el AI Coach con 5/día y 60/mes. Lo que falta y conviene cerrar antes del lanzamiento grande:

- Registro y alerta de costo por servicio (hoy el panel de costos es una estimación de 30 días, no una alerta).
- Prueba de carga de la generación de voz y del conteo de oraciones en hora pico.
- Revisar el almacenamiento de grabaciones: con 17k estudiantes el crecimiento de audio es el costo que más rápido escala; conviene una política de borrado automático.
- Play Store: el paquete, la política de privacidad y los enlaces de verificación ya están listos; falta solo la subida y los formularios de la consola.

Estos tres puntos de escala los puedo abordar en cambios siguientes; este plan cubre solo los topes de uso.
