# Agregar leyenda de pronunciación lenta en corrección del Paso 2

## What
Añadir un texto compacto debajo de la oración corregida ("Intenta") en la tarjeta de retroalimentación del Paso 2 que indique que se puede tocar una palabra marcada para escucharla más lento.

## Why
Los estudiantes no notan que las palabras resaltadas en "Intenta" son interactivas; una leyenda mejora la descubribilidad sin cambiar la lógica de corrección ni las cuotas.

## How
1. **Traducción**: agregar clave `rep2.tapHint` en `src/lib/i18n.tsx`.
   - Spanish: "Toca la palabra marcada para pronunciación más lenta."
   - English: "Tap the marked word for slower pronunciation."
2. **Render**: en `src/components/fluency/Rep2Feedback.tsx`, mostrar la leyenda debajo del contenedor de "Intenta" cuando `result.diff` exista y contenga al menos una palabra cambiada.
3. **Estilo**: texto `text-[11px]`, `text-muted-foreground`, centrado o alineado a la izquierda, con un pequeño ícono de mano/dedo para reforzar; compacto para móvil.

## Scope
- No cambia la comparación, tolerancias, botones, ni el menú de velocidades de `SlowWordPanel`.
- No afecta a "Tú dijiste" (ahí las palabras no son tocables).
