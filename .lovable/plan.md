# Corregir el "Target 45–45 sec" en las tarjetas de audio del Paso 5

## Causa

El límite nuevo (30 s básicos / 45 s intermedio-avanzado) sí se aplica al micrófono, pero la etiqueta "Target X–Y sec" y el punto donde el tiempo se pone verde siguen leyendo la meta original de cada día (p. ej. Mixed Tenses día 1 tiene `goalSeconds: [45, 45]`). Resultado: una meta imposible dentro del nuevo límite.

## Cambio (solo `src/components/fluency/TakeBoard.tsx`)

1. Calcular una meta efectiva por nivel antes de renderizar:
   - Básicos: la meta de tiempo se recorta al límite de 30 s → "Target 30–30 sec" pasa a ser coherente; mejor: se muestra el rango recortado `[min(autoral, 20), min(autoral, 30)]` para que quede un rango razonable como 20–30.
   - Intermedio/avanzado: mismo recorte contra 45 s.
   - Turnos con tiempo propio (Pressure Rounds / Advanced): se recortan contra 45 s.
2. Usar esa meta efectiva en los tres lugares que hoy leen la meta original:
   - La etiqueta "Target …" dentro del micrófono (`VoiceRecorder targetSeconds`).
   - El recuadro de resultados que marca el tiempo en verde (`GoalPanel minSeconds`).
   - El panel combinado de role-play (`CombinedGoalPanel`), recortado igual.

## Fuera de alcance

- No se tocan los archivos de contenido de los cursos (las metas autorales se quedan como están; el recorte es solo visual/en la tarjeta).
- No cambian límites, IA, progreso, grabaciones ni el conteo de oraciones.

## Verificación

- `bunx tsc --noEmit` y `bunx vitest run`.
- Revisión visual de Mixed Tenses día 1: la tarjeta debe mostrar Target ≤ 30 s y ponerse verde dentro de ese rango.
