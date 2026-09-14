# Audio entrecortado en el mundo de Vale: qué pasó y cómo arreglarlo

## Lo que revisé (datos reales de ayer 6-8pm)

- Generación de voz: 220 audios en esa franja, **todos exitosos**, ~1 segundo cada uno. Cero errores.
- Límites por persona: el máximo fue 59 reproducciones y 24 generaciones por usuario, muy debajo de los topes (300 y 30 por hora). **Nadie tocó el límite.**
- No hubo caída ni saturación del servicio de voz.

O sea: no fue "hora pico" del servidor. El corte se produjo en el celular, al reproducir.

## Por qué se oye entrecortado

Hoy la app pide cada frase **justo cuando le toca sonar**, una por una:

- En las escenas con conversación, cada réplica se descarga cuando termina la anterior. En red lenta eso deja silencios de 1 a 3 segundos entre líneas, y se percibe como que el audio "se corta y vuelve".
- Cuando una descarga tarda demasiado o falla, la app salta a la voz del navegador, que suena distinta y a veces se corta a media frase: se oye como si el audio se rompiera.
- Cualquier otro elemento que reproduzca sonido detiene el actual (regla de "un solo audio"), y con la descarga en camino eso produce arranques y cortes.

## Qué propongo cambiar

1. **Descargar antes de sonar.** Al abrir una escena, bajar todas las réplicas de esa escena en paralelo y empezar a hablar solo cuando la primera está lista; las demás ya estarán listas cuando les toque, sin huecos.
2. **Adelantar la siguiente escena.** Mientras el estudiante escucha o lee, ir bajando en segundo plano el audio de la escena siguiente.
3. **Reintento silencioso.** Si una descarga falla, reintentar una vez antes de recurrir a la voz del navegador, así deja de sonar entrecortado por un fallo pasajero.
4. **Guardar los audios en el teléfono.** Conservarlos en el almacenamiento del navegador para que al repetir el episodio suenen al instante y sin red.
5. **Aviso claro si aun así falla.** En vez de un salto raro de voz, un mensaje corto con botón "Tocar para escuchar".

## Detalle técnico

- `src/services/audio-service.ts`: exponer `prefetch(text, voice, tone)` que reutiliza `loadModelAudio` (la caché en memoria ya deduplica); añadir un reintento en el fetch de `/api/tts`; respaldar la caché en Cache Storage (`caches.open("tts-v7")`) con la misma clave `tone::voice::text`.
- `src/services/storybook/dialogue-audio.ts`: precargar todas las líneas con `Promise.all` de `prefetch` antes de `playFrom(0)`, y encadenar sin esperas de red; propagar `onError`.
- `src/components/storybook/StorybookPlayer.tsx`: al montar cada slide, disparar el prefetch de la escena siguiente (líneas o texto único); usar `onError` para el aviso con botón de reintento.
- Sin cambios en `/api/tts`, cuotas, contenido ni voces de los episodios.

## Verificación

- Pruebas y typecheck.
- En celular con red limitada (throttling): abrir un episodio con diálogo y confirmar que las réplicas suenan seguidas, sin silencios ni cambio de voz.
- Repetir el mismo episodio y confirmar reproducción instantánea desde la caché.
