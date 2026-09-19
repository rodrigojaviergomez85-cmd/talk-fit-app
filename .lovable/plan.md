# Coach en vivo: mantener apretado para hablar (push-to-talk)

## Por qué ahorra tokens

Hoy, al abrir "Hablar en vivo", el micrófono envía audio a Gemini Live de forma continua durante toda la sesión (hasta 5 min). El modelo cobra por segundo de audio recibido: silencios, pausas para pensar y ruido también se facturan. En una sesión de 5 minutos, el estudiante suele hablar solo 1.5–2 minutos; el resto se paga igual.

Con push-to-talk, el audio solo viaja mientras el botón está presionado. Ahorro estimado: 50–70% del costo por sesión, sin cambiar de modelo ni de proveedor.

## Qué cambia

### 1. Botón de hablar (mantener apretado)

En `src/components/fluency/LiveCoach.tsx`:

- Durante la llamada, el área del micrófono pasa a un botón grande "Mantén para hablar" / "Hold to talk" (estilo del ejemplo: círculo grande centrado).
- Al presionar (touchstart/mousedown): se abre el envío de audio y el estado cambia a "Te escucha".
- Al soltar (touchend/mouseup): se deja de enviar audio y se marca fin de turno (`audioStreamEnd`), para que Vale responda sin esperar más.
- Mientras no se presiona, no se envía nada al modelo: eso es lo que deja de facturar.
- Accesibilidad: también funciona con teclado (espacio) y muestra texto claro en español.

### 2. Apagar la detección automática de voz del servidor

- En la configuración de la sesión en vivo, desactivar la detección automática de actividad (VAD automático) y controlar los turnos manualmente: inicio al presionar, `audioStreamEnd` al soltar.
- El botón "Pausar micrófono" se mantiene como está; con push-to-talk sigue siendo útil para silenciar todo.

### 3. Ajustes de experiencia

- Estado visible: "Mantén apretado para hablar" (gris) → "Te escucha…" (activo) → Vale responde.
- Límite de un turno hablado: 60 segundos por presión; al llegar, se corta el envío y Vale responde (evita dedos pegados y costos sorpresa).
- Se conservan: límites de 5 min por sesión y 15 min diarios, lista privada de correos, ayudas (En español / Más lento / Dame una idea), avatar, historial plegable y resumen final.
- El temporizador de la sesión sigue contando igual (tiempo de sesión, no de audio), así el límite diario no cambia de significado; lo que baja es el costo real por minuto.

## Qué NO cambia

- Modelo (Gemini Live), proveedor, tokens efímeros, `/api/live-coach`, cuotas ni registro de segundos.
- La pestaña "Práctica diaria" (turnos por grabación, aún más barata) se mantiene como está; este cambio es solo para "Hablar en vivo".

## Detalles técnicos

- Archivo principal: `src/components/fluency/LiveCoach.tsx` (único archivo de UI tocado).
- Envío de audio: hoy el nodo de audio envía PCM en cada ciclo; se agrega una bandera `talking` (ref) que solo deja pasar `sendRealtimeInput({ audio })` mientras está presionada; al soltar se envía `sendRealtimeInput({ audioStreamEnd: true })`.
- Config de sesión: `realtimeInputConfig` con actividad manual (sin VAD automático) en el `setup` de la conexión.
- Nada de cambios en base de datos, rutas API, prompts ni cuotas.
- Verificación: `bunx tsgo --noEmit`, pruebas existentes, y prueba en móvil del flujo: presionar → hablar → soltar → Vale responde; soltar sin hablar no debe generar respuesta ni gasto.
