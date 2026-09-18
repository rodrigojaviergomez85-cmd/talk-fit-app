# Paso 3 · Gramática del día — piloto Basic 3, Semana 1

Nueva tercera actividad diaria: después de los audios del día, el estudiante hace una evaluación de gramática de 20 ítems sobre el tema exacto de ese día. Piloto en **Basic 3 (Simple Past), días 1 a 5**. Si funciona, se replica al resto del módulo y a los demás módulos sin volver a tocar la mecánica.

## Cómo se ve para el estudiante

- En Home y en Liga aparece una tercera tarjeta del día, junto a "El mundo de Vale" y "Práctica de audios": **Gramática del día**.
- Al entrar: 20 ítems, uno por pantalla, con tres formatos mezclados según el día:
  - **Multiple choice** (elegir la forma correcta)
  - **Find the mistake** (tocar la palabra equivocada de la oración)
  - **Rearrange the sentence** (ordenar las piezas de la oración)
- Al acertar: sonido de acierto y avance.
- Al fallar: sonido distinto, se marca la respuesta correcta y aparece una explicación breve en inglés y español (por ejemplo: "went, no goed — *go* es irregular").
- Al terminar los 20: pantalla de resultado con el puntaje. Con **16 de 20 o más** se ganan **150 puntos de liga**. Con menos, se ofrece repetir solo los ítems fallados hasta llegar al 80%.
- Los puntos se dan una sola vez por día, aunque repita la actividad.
- Todo bilingüe (inglés/español), móvil primero, con el mismo estilo de los pasos actuales.

## Liga

- Solo para la cohorte **Basic 3 · Semana 1** la meta diaria pasa de 300 a **450 puntos** y la meta semanal a **2,250**. Las demás cohortes siguen exactamente igual en 300 / 1,500.
- La barra del día, el detalle por día y la recuperación durante la semana incluyen la nueva actividad.
- El ranking, la paginación, el historial y la opción de ocultarse no cambian.

## Contenido

100 ítems escritos a mano, 20 por día, alineados al contenido real de cada día de Basic 3 Semana 1 (My Day Yesterday · pasado simple): verbos regulares e irregulares, afirmativo, y las estructuras que aparecen en las oraciones modelo de ese día. Cada ítem lleva: enunciado, opciones o piezas, respuesta correcta, y explicación corta EN/ES. Se reutilizan los personajes y el vocabulario ya usados en el módulo.

## Detalles técnicos

- **Contenido**: nuevo `src/services/grammar-quiz/` con tipos (`GrammarItem` con variantes `multiple-choice`, `find-mistake`, `rearrange`) y un archivo por día para `past-stories` semana 1. Registro por módulo/día para que el piloto se extienda luego sin cambiar componentes.
- **UI**: nueva ruta `/gramatica` (module + day en search params) y componentes en `src/components/fluency/` (`GrammarQuiz`, uno por tipo de ítem, y pantalla de resultado). Sonidos con `playCorrectFeedbackSound` / sonido de error en `src/lib/feedback-sounds.ts`. Textos nuevos en `src/lib/i18n.tsx`.
- **Calificación y puntos (servidor manda)**: nueva tabla `grammar_quiz_attempts` (user_id, module_id, day, respuestas, correctas, aprobado, timestamps) con RLS + GRANT. Un server function recibe las respuestas, califica contra el banco en el servidor, guarda el intento y, si es ≥16/20, llama a `league_award`.
- **Base de datos**: migración que agrega `'grammar'` al CHECK de `league_rewards.activity_type` y a la validación de `league_award`, con la rama de validación para grammar (exige intento aprobado del mismo módulo/día). Sin tocar las ramas `story` ni `practice`.
- **Reglas de liga**: `src/lib/league.ts` pasa de constantes fijas a metas por cohorte (`activitiesForCohort(moduleId, week)`), devolviendo 3 solo para `past-stories` semana 1. `LeagueDaySection` y `/liga` muestran la tercera actividad solo en esa cohorte.
- **Sin IA y sin costo**: todo es comparación local/servidor contra respuestas fijas.
- **No se toca**: los 5 pasos de práctica, grabaciones, estrellas, El mundo de Vale, cursos ni otras cohortes de la liga.

## Verificación

- Pruebas nuevas: reglas de metas por cohorte, calificación 16/20, idempotencia de los 150 puntos, forma de los 100 ítems (respuesta válida, explicación EN/ES, 20 por día).
- Suite completa de pruebas + TypeScript.
- Revisión en móvil de los días 1 y 5: acierto con sonido, error con explicación, aprobado con puntos y liga mostrando 450 del día.
