# Refuerzo del sonido -ed en los Pasos 3, 4 y 5 (Día 2 de Simple Past)

Extiende el piloto que ya funciona en el Paso 2 al resto del día, sin cambiar nada del contenido, los límites ni la IA. Todo sigue siendo local (sin consumo de IA) y limitado a `past-stories` día 2.

## Paso 3 (shadowing/karaoke) — marcarlo más

- Los verbos regulares en pasado se colorean igual que en el Paso 2 (azul /d/, rojo /t/, verde /ɪd/) dentro del texto que se resalta mientras suena el audio.
- La leyenda de colores aparece arriba del karaoke, compacta.
- El resaltado por bloque del karaoke se mantiene igual; el color del -ed se suma, no lo reemplaza.
- No se agregan toques ni menús de velocidad aquí (el karaoke va en marcha).

## Paso 4 (haz tuya la respuesta) — recordatorio activo

- Una tira compacta arriba del recuadro de la pregunta: "Recuerda el sonido -ed" con los tres ejemplos coloreados (watchT / callD / wan-TED).
- La frase de arranque ("starter") usa el mismo texto tocable del Paso 2: si trae un verbo en -ed, sale coloreado y al tocarlo se abre el panel de pronunciación lenta (0.25x / 0.5x / 0.75x) con la pista.
- Nada cambia en la grabación, el conteo de preguntas ni el avance.

## Paso 5 (grabación final) — recordatorio antes de hablar

- Un aviso corto, bilingüe, justo antes del botón de grabar: "Antes de grabar: cuida el sonido -ed" con los tres ejemplos coloreados y un botón de escucha lenta de los verbos del día.
- Al tocar ese botón se reproducen, uno por uno y a 0.5x, los verbos en -ed del texto del día (audio ya cacheado, sin costo de IA nuevo).
- No cambia la lógica de tomas, selección de toma final, Coach, cuotas ni progresión.

## Detalles técnicos

- Reutiliza `classifyEdEnding` / `edPronunciationHint` (`src/lib/ed-endings.ts`), `EdLegend`, `TappableSentence` (`highlightEd`) y `SlowWordPanel`.
- Nuevo componente `src/components/fluency/EdReminder.tsx` (tira compacta + lista de verbos del día a 0.5x).
- `ShadowKaraoke` recibe un `highlightEd?: boolean` opcional y aplica las clases de color a los tokens ya renderizados.
- `Rep3Shadow`, `Rep4MakeItYours` y `Rep5FinalRep` reciben la bandera calculada en `practice.tsx` con la misma condición actual: `moduleId === "past-stories" && day.day === 2`.
- Textos nuevos bilingües en `src/lib/i18n.tsx` (`ed.remindTitle`, `ed.remindStep5`, `ed.listenVerbs`).
- Pruebas: extraer los verbos -ed de un día y verificar el orden/clasificación; correr `tsc` y la suite completa; verificación en navegador de los pasos 3, 4 y 5 del día 2.
