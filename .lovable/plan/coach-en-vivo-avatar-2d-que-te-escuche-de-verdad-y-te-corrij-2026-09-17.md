# Coach en vivo: avatar 2D, que te escuche de verdad y te corrija

Hoy la pantalla es un círculo naranja: se conecta y corre el tiempo, pero el estudiante habla y no pasa nada — ni saludo, ni respuesta hablada, ni corrección. Además la interfaz no parece un coach. Este plan arregla las dos cosas.

## 1. Avatar 2D del coach (recomendación)

En vez del círculo, un retrato 2D de Vale (mismo estilo de El Mundo de Vale, para que sea la misma maestra que ya conocen), animado de forma simple y liviana para celular:

- Cuatro estados visuales, cambiando la imagen y una animación suave: **escuchando** (respira, aro que late con tu voz), **pensando**, **hablando** (boca animada alternando 2–3 imágenes al ritmo del audio), **en pausa**.
- Se hace con 4–5 ilustraciones optimizadas (768x768, JPG/PNG livianos) más animación por CSS, no video ni 3D: carga rápido en gama media y no consume datos extra.
- Debajo del avatar: el tiempo restante, lo que tú dijiste y lo que dijo el coach, y el botón grande de terminar.

Alternativa si prefieres algo más barato de producir: el mismo avatar pero una sola ilustración con aro de voz animado (sin boca). Puedo hacer la versión completa por defecto.

## 2. Que te escuche y responda (la falla actual)

- **El coach saluda primero**: al tocar, en 1–2 segundos dice una frase corta en inglés y hace una pregunta.
- **Se corrige el envío de tu voz**: en iPhone el audio se está enviando con la velocidad equivocada, por eso el modelo no entiende nada y se queda callado. Se corrige para que llegue limpio.
- **Se oye la respuesta**: se desbloquea el sonido al tocar el botón y se reproduce a la velocidad correcta en iPhone.
- **Avisos en vez de silencio**: si no se detecta tu voz en ~15 segundos o se cae la conexión, aparece un mensaje claro.

## 3. Correcciones cuando se escuchan errores

- **Durante la conversación**: no interrumpe. Si cometes un error importante, el coach repite tu idea bien dicha de forma natural ("Ah, so you went to the meeting yesterday?") y sigue. Los errores se van guardando en la sesión.
- **Al terminar**: antes de cerrar, el coach da (hablado y escrito) un resumen en español con hasta 3 correcciones — lo que dijiste, cómo se dice mejor y por qué — y una frase para practicar. Esto aparece siempre, aunque toques "Terminar" de golpe.
- **Tarjeta de cierre en pantalla** con esas correcciones, para poder leerlas con calma. No se guarda la conversación; solo los minutos usados, como hoy.

## Detalle técnico

- `src/components/fluency/LiveCoach.tsx`: remuestrear el micrófono al ritmo real del dispositivo hacia 16 kHz antes de enviar (Safari iOS ignora `sampleRate: 16000`); crear y `resume()` el contexto de salida dentro del gesto del tap y remuestrear el PCM de 24 kHz al ritmo real del contexto; saludo inicial con `sendClientContent`; al cerrar, pedir el resumen y esperar el `turnComplete` (máx ~8 s) antes de cerrar el socket; temporizador de silencio y errores visibles.
- Nuevo `src/components/fluency/CoachAvatar.tsx` con los estados (idle/listening/thinking/speaking) y las ilustraciones nuevas en `src/assets/coach/`.
- Instrucción del sistema ampliada: recast natural durante la charla, resumen bilingüe con hasta 3 correcciones al final.
- Sin cambios en límites ni costos: 5 min por sesión, 15 min al día, lista privada en `src/routes/api/live-coach.ts`.

## Verificación

- Prueba automatizada en el sandbox: saludo, transcripción, audio de respuesta y tarjeta de correcciones al terminar.
- Prueba manual en tu iPhone: hablar una frase con un error a propósito y confirmar recast + resumen final.
- Confirmar que los minutos usados se siguen registrando.
