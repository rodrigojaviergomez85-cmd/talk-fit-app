# Palabras corregidas con pronunciación táctil en Paso 2

## Objetivo
En la tarjeta de corrección del Paso 2 ("¡CASI!"), SOLO las palabras corregidas de la sección "Intenta" serán tocables para escucharlas con el mismo menú de pronunciación lenta que ya existe arriba en las oraciones del Paso 2 (0.25x, 0.5x, 0.75x), en versión compacta optimizada para móvil. Las palabras de "Tú dijiste" NO serán tocables.

## Cambios

### 1. Reutilizar el menú de pronunciación
- Extraer el menú de velocidades (0.25x / 0.5x / 0.75x) de `src/components/fluency/TappableSentence.tsx` a un componente compartido pequeño, por ejemplo `SlowWordPanel`, en el mismo archivo o en `src/components/fluency/SlowWordPanel.tsx`.
- `TappableSentence` sigue funcionando igual; solo cambia que usa el componente compartido internamente.

### 2. Palabras tocables solo en "Intenta"
En `src/components/fluency/Rep2Feedback.tsx`:
- Sección "Tú dijiste": se queda exactamente como está (solo resaltado ámbar, sin toque).
- Sección "Intenta": las palabras `changed` (resaltadas en color primario) se convierten en botones. Al tocar una, reproduce la palabra correcta a 0.75x y abre el panel compacto con 0.25x / 0.5x / 0.75x.
- Las palabras sin cambios siguen siendo texto normal (no tocables).
- Panel compacto para móvil: una sola fila de 3 botones pequeños (min-h ~36px, texto 11px, padding reducido), sin encabezado grande; botón X pequeño para cerrar. Un solo panel abierto a la vez; usa la voz del día (`voice`).
- Mantener el resaltado visual actual, añadiendo solo feedback táctil sutil (`active:scale`), sin aumentar el tamaño de la tarjeta.
- Caso sin `diff` (demasiadas diferencias): se mantiene el resaltado actual de `focus` sin hacerlo tocable.

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
