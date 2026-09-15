# Bryan (BigTalk) debe sonar agresivo y sospechoso

Hoy Bryan usa exactamente el mismo estilo de voz que Morgan: "manager corporativo amable y directo". Por eso suena plano y robótico, y no transmite que es el rival que está presionando.

## Qué haría

1. Crear un estilo de voz nuevo solo para Bryan: comercial agresivo de BigTalk, seguro de sí mismo, con doble intención — tono meloso que se vuelve cortante, ritmo rápido, pausas calculadas, leve sarcasmo y presión cuando hace una oferta. Nada de narrador ni de locutor.
2. Asignar ese estilo a Bryan en todas sus escenas (temporadas 7 y posteriores), manteniendo su misma voz masculina para que siga siendo reconocible.
3. Como el audio se guarda en caché por personaje y estilo, los clips de Bryan se vuelven a generar automáticamente con la nueva entrega; los demás personajes no se tocan ni se regeneran.
4. Verificar que ningún otro personaje comparta el mismo sonido que Bryan y correr las pruebas de consistencia, TypeScript y la carga del episodio 15 de Tigers.

## Detalle técnico

- Nuevo valor `sly` en `ModelTone` (`src/lib/model-tone.ts`), agregado a `TONES` y a `TONE_INSTRUCTIONS` en `src/lib/course-audio.server.ts` con instrucciones de entrega agresiva/sospechosa.
- `speakerTone("bryan")` pasa de `"pro"` a `"sly"` en `src/services/storybook/voices.ts`; `speakerVoice` sigue en `male` (onyx).
- La clave de caché es `sha256(voice ␀ tone ␀ text)` y la ruta `${tone}/${voice}/${hash}.mp3`, así que el cambio de tono genera clips nuevos sin invalidar los existentes.
- El allowlist de TTS filtra solo por texto, así que no requiere cambios.
- Validación: `src/services/storybook/tigers-consistency.test.ts` (unicidad voz+tono), suite de storybook, `tsgo`, y HTTP 200 en `/natural-method/cuento/tigers-ep15-last-offer`.
