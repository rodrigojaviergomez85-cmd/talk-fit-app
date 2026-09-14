# Audio del mundo de Vale: qué pasó anoche y cómo evitarlo

## Lo que revisé (datos reales de 6-8pm de ayer)

- Generación de voz: 220 peticiones en esa franja, **todas exitosas**, ~1 segundo cada una. Cero errores.
- Límites de uso por persona: el máximo de anoche fue 59 reproducciones y 24 generaciones por usuario, muy por debajo de los topes (300 y 30 por hora). **Nadie tocó el límite.**
- No hubo caída del servicio de voz ni saturación por "hora pico".

Conclusión: el problema no estuvo en el servidor. Ocurrió en la app del celular, y el síntoma (se arregla cerrando y abriendo) apunta a la sesión del usuario.

## Causa más probable

Cuando la app pide un audio, primero busca la sesión iniciada del estudiante. Si en ese momento la sesión no está lista —típico cuando el teléfono estuvo en segundo plano o la red se cortó un momento— la app **deja de pedir audios durante 30 segundos** y no avisa nada. Si vuelve a fallar, se repite. Por eso se siente como "no suena nada" hasta que uno cierra y vuelve a abrir la app, que es justo lo que renueva la sesión.

Un segundo factor posible en celular: tras volver de segundo plano, el reproductor queda bloqueado y el sonido no arranca hasta que el usuario toca la pantalla otra vez.

## Qué propongo cambiar

1. **Renovar la sesión en vez de rendirse.** Si no hay sesión al pedir un audio, intentar refrescarla una vez y reintentar; solo si eso falla se aplica una pausa corta (5 segundos en vez de 30).
2. **Reanudar al volver a la app.** Al regresar de segundo plano, limpiar esa pausa para que el siguiente audio se pida de inmediato.
3. **Aviso visible en vez de silencio.** Si aun así no hay audio, mostrar un mensaje corto con botón "Tocar para escuchar", para que el estudiante no crea que la app se trabó.
4. **Registro de fallas de audio.** Guardar un registro liviano cuando un audio no se pueda reproducir (motivo y momento), para poder confirmar la causa la próxima vez con datos, no con suposiciones.

## Detalle técnico

- `src/services/audio-service.ts`: en `loadModelAudio`, si `currentAccessToken()` devuelve null, llamar `supabase.auth.refreshSession()` una vez antes de rendirse; bajar `NO_SESSION_BACKOFF_MS` a 5000; exportar un `resetBackoff()` y llamarlo desde un listener de `visibilitychange`/`focus`.
- `src/components/storybook/StorybookPlayer.tsx`: usar el `onError` que ya acepta `SpeakOptions` para mostrar el aviso con botón de reintento en escenas y diálogos (`speakDialogue` debe propagar el error de la línea actual).
- `src/services/storybook/dialogue-audio.ts`: pasar `onError` y detener la secuencia en vez de seguir en silencio.
- `src/lib/error-capture.ts`: reportar el fallo de audio con motivo (`no-session`, `http-###`, `play-blocked`).
- Sin cambios en `/api/tts`, cuotas ni contenido de los episodios.

## Verificación

- Pruebas y typecheck.
- En celular: abrir un episodio, mandar la app a segundo plano un minuto, volver y comprobar que el audio suena sin reiniciar.
- Simular sesión vencida y confirmar que aparece el botón de reintento y que al tocarlo suena.
