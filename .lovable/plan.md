# Bloquear “Siguiente” hasta completar la práctica de Vale

## Cambio
- Mantener **SIGUIENTE** activo normalmente en portada y escenas de lectura.
- En cada **Pregunta rápida**, mostrarlo sombreado y deshabilitado hasta que el estudiante:
  1. seleccione la respuesta correcta; y
  2. grabe la respuesta oral solicitada.
- Si la respuesta oral lleva revisión, habilitarlo después de **“Great job, champion!”** o después de completar los dos intentos y elegir continuar.
- En las tarjetas de afirmación, mantener **SIGUIENTE** habilitado aunque el estudiante no grabe; estas afirmaciones seguirán opcionales y sin calificación de IA.
- Conservar el estado completado si el estudiante regresa a una pantalla anterior.

## Presentación
- Reutilizar el aspecto sombreado/deshabilitado de los botones de las prácticas de audio.
- El botón no responderá a clics mientras falte la respuesta o la grabación.
- Añadir una indicación breve debajo según lo pendiente: responder primero o grabar para continuar.

## Validación
- Probar preguntas con y sin revisión de voz, respuesta incorrecta y dos intentos; confirmar que las afirmaciones permiten avanzar sin grabar.
- Verificar el flujo completo en celular para confirmar que ninguna práctica requerida se pueda saltar.

## Archivos principales
- `src/components/storybook/StorybookPlayer.tsx`
- Pruebas del flujo de cuentos y validación oral
