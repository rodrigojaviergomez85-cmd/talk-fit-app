# Palabras corregidas con pronunciación táctil en Paso 2

## Objetivo
En la tarjeta de corrección del Paso 2 ("¡CASI!"), SOLO las palabras corregidas de la sección "Intenta" serán tocables para escucharlas con el mismo menú de pronunciación lenta que ya existe arriba en las oraciones del Paso 2 (0.25x, 0.5x, 0.75x), en versión compacta optimizada para móvil. Las palabras de "Tú dijiste" NO serán tocables.

## Cambios

### 1. Reutilizar el menú de pronunciación
- Extraer el menú de velocidades (0.25x / 0.5x / 0.75x) de `src/components/fluency/TappableSentence.tsx` a un componente compartido pequeño, por ejemplo `SlowWordPanel`, en el mismo archivo o en `src/components/fluency/SlowWordPanel.tsx`.
- `TappableSentence` sigue funcionando igual; solo cambia que usa el componente compartido internamente.

### 2. Palabras tocables en la tarjeta de corrección
En `src/components/fluency/Rep2Feedback.tsx`:
- Convertir `DiffTokens` para que las palabras `changed` sean botones:
  - Variante "said" (ámbar): al tocarla, reproduce la palabra dicha a 0.75x y abre el panel con 0.25x / 0.5x / 0.75x.
  - Variante "target" (color primario): igual comportamiento, reproduciendo la palabra correcta.
- Las palabras sin cambios siguen siendo texto normal (no tocables), para no distraer.
- Un solo panel abierto a la vez dentro de la tarjeta; botón X para cerrar; usa la misma voz del día (`voice`).
- Mantener el resaltado visual actual (ámbar para lo dicho, color primario para la corrección), añadiendo solo un indicador sutil de que es tocable (cursor/feedback táctil `active:scale`, sin cambiar tamaños).
- Caso sin `diff` (demasiadas diferencias): se mantiene el resaltado actual de `focus` sin hacerlo tocable, para no arriesgar tocar palabras incorrectas.

### 3. Sin cambios de comportamiento
- No se tocan la corrección, tolerancias, cuotas, botones Try Again / Listen Again / Skip / Next, ni la lógica del servidor.
- Solo es una ayuda de pronunciación en el cliente (TTS local).

## Archivos
- `src/components/fluency/TappableSentence.tsx` — extraer panel compartido.
- `src/components/fluency/Rep2Feedback.tsx` — palabras corregidas tocables.
- Opcional: `src/components/fluency/SlowWordPanel.tsx` — nuevo componente compartido.

## Verificación
- `bunx tsc --noEmit` y suite de tests (`bunx vitest run`).
- Prueba en navegador móvil: grabar con error en Paso 2, tocar palabra ámbar y palabra de corrección, confirmar reproducción a 0.25x/0.5x/0.75x y cierre del panel.
