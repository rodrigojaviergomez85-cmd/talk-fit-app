# Review: Modal Verbs

## Objetivo
Agregar un módulo independiente **Modal Verbs** dentro de Review, con cinco prácticas completas y desbloqueo secuencial, reutilizando exactamente la experiencia actual de los Pasos 1–5.

## Contenido
- Crear una guía bilingüe de siete tarjetas que explique:
  - `can / could` para habilidad y solicitudes.
  - `may / might / could` para posibilidad.
  - `should / had better` para consejos, incluyendo la diferencia de urgencia.
  - `must / mustn't` para obligación fuerte y prohibición.
  - `would` para situaciones hipotéticas y solicitudes corteses.
  - Forma base después de todos los modales, negativas y preguntas.
- Incluir errores típicos propios del tema, como `can to go`, `musts`, `should to`, `had better to` y confundir `mustn't` con “no es necesario”.
- Crear cinco prácticas bilingües alternando tercera y primera persona:
  1. Posibilidades y habilidades en el trabajo.
  2. Consejos para una situación personal.
  3. Reglas, obligaciones y prohibiciones.
  4. Decisiones hipotéticas y solicitudes corteses.
  5. Práctica integrada con todos los modales.
- Cada práctica tendrá ocho modelos, vocabulario, preguntas variadas para el Paso 4 y una tarea final para el Paso 5.

## Experiencia
- Mantener los Pasos 1–5 existentes: COPY con corrección hablada, shadowing, tres preguntas WH, tres audios obligatorios más dos opcionales, selección final y AI Coach.
- Solo la práctica 1 inicia desbloqueada; las demás se abren en orden.
- Agregar imágenes de referencia a las cinco prácticas, fieles a sus escenas y al texto que el estudiante repetirá.
- Las imágenes no incluirán palabras, números, rótulos ni interfaces legibles; se revisarán dos veces para detectar anatomía, objetos, acciones o artefactos incoherentes antes de aprobarlas.

## Detalles técnicos
- Registrar `review-modals` como identidad aislada de Review.
- Agregar el contenido confiable al registro usado por las rutas, Paso 2 y AI Coach.
- Habilitar el perfil conservador existente de Paso 2 sin cambiar su arquitectura ni identificadores internos.
- Extender las pruebas para validar cinco prácticas, siete tarjetas, perspectivas alternadas, tres WH distintas por práctica y cobertura de `HOW OFTEN` / `HOW LONG`.
- Verificar tipos, pruebas de Review, rutas del módulo y la experiencia visible en móvil.
