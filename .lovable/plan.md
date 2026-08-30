# Días desbloqueados + voces con energía

## 1. Todos los días desbloqueados

Los 20 días de BASIC ZERO y los 5 días del módulo SIMPLE PRESENT (Fluency Journey) quedan disponibles desde el inicio: el estudiante puede entrar a cualquier día cuando quiera.

- En la lista de días de cada módulo (Home) desaparece el candado y la opacidad de "bloqueado": todas las filas son tocables y llevan a su día.
- Se mantienen los estados visuales COMPLETADO (check verde) y ACTUAL (día sugerido, resaltado en naranja), para que el estudiante siga sabiendo dónde va.
- El botón principal sigue apuntando al día actual sugerido; la práctica, audio, grabación y progreso no cambian.

Detalle técnico: `JourneyService.isDayUnlocked` devuelve siempre `true`; en `JourneyDayRow` se elimina el ícono de candado y el estilo de bloqueado y siempre se renderiza el link al día.

## 2. Voces del modelo con energía (hombres y mujeres)

Las voces del modelo (male `onyx`, female `nova`, neutral `alloy`) deben sonar muy enérgicas, alegres y emocionadas — estilo entrenador de call center bilingüe — en lugar de apagadas.

- `src/routes/api/tts.ts`: agregar el campo `instructions` de OpenAI TTS a la petición, con dirección de tono en inglés (voz muy energética, cálida, alegre y entusiasta, como coach de call center motivando a su equipo; sonriendo al hablar; ritmo dinámico). Se aplica a todas las voces del modelo.
- La caché de audio (`audio-service.ts`) no cambia de clave, pero al cambiar el prompt se recomienda incluir un marcador de versión en la clave de caché para que los audios viejos "apagados" no se reutilicen.
- Sin cambios visuales ni de velocidad; solo el tono de la voz generada.

## Verificación

- Typecheck.
- Navegador móvil: abrir Basic Zero día 12 y Simple Present día 4 sin completar los anteriores.
- Probar TTS male y female y confirmar que el tono suena enérgico y alegre.
