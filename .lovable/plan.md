# Paso 1 · Escucha — nuevo diseño (solo Basic Zero, Week 1)

Rediseño visual de la pantalla de escucha que ves en la referencia: fondo claro, título grande, tarjeta azul marino con el reto del día y tarjeta durazno con el personaje y el reproductor. Solo aparece en Basic Zero, semana 1 (días 1–5), en el Paso 1. Todo lo demás del curso mantiene su apariencia actual.

## Qué verá el estudiante

1. Encabezado compacto: flecha de volver, marca "fluency" y menú de tres puntos con "Siguiente paso" y "Salir" (los mismos botones que hoy, solo reubicados). Debajo: "Día 3 · Paso 1 de 5 · Escucha" con cinco segmentos de progreso, el primero activo.
2. Título "Tu día, en inglés." con subrayado naranja decorativo y la línea "Primero escucha. Después, tú."
3. Tarjeta azul marino "TU RETO" con la pregunta real del día, más "Traducir" y "Oír pregunta".
4. Tarjeta durazno "Escucha a {personaje}" / "Una respuesta de ejemplo": avatar del personaje del día (iniciales si no hay imagen verificada), onda decorativa, tiempo y barra de avance reales, botón naranja grande "Escuchar ejemplo" y, debajo, "Ver texto".
5. Al pie: "Continuar" (desactivado hasta que termine el ejemplo, con la ayuda "Escucha el ejemplo o salta por ahora") y el enlace "Saltar por ahora" siempre visible y funcional.

## Qué se conserva sin cambios

- Pregunta, traducciones, frases del día, voz y personaje vienen del contenido actual de cada día (día 3 = Daniel, no Vale).
- Mismo reproductor y mismo servicio de audio: cargar, pausar, reanudar, repetir, reintentar tras error y sin que suenen pregunta y ejemplo a la vez.
- "Ver texto" muestra todas las frases en orden con sus traducciones y no reinicia el audio.
- Ayuda global en español, confirmación al salir, reanudar sesión, avance desde el encabezado y las ayudas del día (Power Chunks, imagen de escena, tarjetas de verbos, tira de historia) cuando existan.
- Sin grabación, micrófono, puntajes ni intentos en el Paso 1. La barra de progreso es indicador, no deslizador; "1×" es solo informativo.

## Detalles técnicos

- Condición única de activación en `src/routes/practice.tsx`: `moduleId === "basic-zero" && day.week === 1 && stage === 1`. Aplica al encabezado, al fondo y al contenido; cualquier otro caso usa el render actual.
- Nuevo componente de presentación `src/components/fluency/Week1ListenScreen.tsx`, que recibe `day`, `showEs`, `onNext` y reutiliza `AudioPlayer`, `TranslatableText`, `TextToggle`/`LineCard`, `PowerChunks`, `SceneImage`, `PastVerbCards`, `StoryStrip`. El estado `heard` / `showText` sigue igual que en `Rep1Listen` (solo `onEnd` del modelo marca `heard`).
- Encabezado propio compacto (variante nueva, no se toca `RepProgress` para el resto de pantallas) con `onBack`, `onNext`, `onExit` ya existentes; los índices internos (`stage 0…5`, `total={6}`) no cambian, solo se dibujan cinco segmentos.
- Nombre del personaje: se añade un campo opcional (p. ej. `speaker?: { name: string }`) en `CourseDay` y se rellena desde la `Person` ya definida en `src/services/basic-zero-course.ts` (Carlos, Sofia, Daniel, Valeria, Miguel). Sin imagen verificada se muestran iniciales; si no se resuelve el nombre, la tarjeta dice "Escucha el ejemplo".
- Duración/posición desde el `onProgress` del reproductor; si no hay duración se muestra `--:--`. Onda decorativa con `aria-hidden`, sin análisis de audio.
- Textos nuevos de interfaz mediante el sistema de traducciones del proyecto.
- Colores mapeados a los tokens existentes (fondo cálido, navy, naranja, durazno, borde suave); no se alteran valores globales de tema.

## Verificación

- Tipos y pruebas existentes del proyecto.
- Capturas móviles a 360 / 390 / 430 px: estado inicial, texto abierto y traducción abierta.
- Recorrido de los cinco días de Week 1 comprobando pregunta, personaje, voz y frases; y comprobación de que intro, pasos 2–5, Week 2 y otro módulo conservan su diseño actual.
